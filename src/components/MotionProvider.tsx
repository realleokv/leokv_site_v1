import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/motion';
import { useMediaQuery } from '../hooks/useMediaQuery';

type MotionContextValue = {
  reduced: boolean;
  coarse: boolean;
  ready: boolean;
  setReady: (ready: boolean) => void;
  scrollTo: (target: number | string | HTMLElement, immediate?: boolean) => void;
};
const MotionContext = createContext<MotionContextValue | null>(null);

export function MotionProvider({ children }: { children: ReactNode }) {
  const systemReduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const coarse = useMediaQuery('(pointer: coarse)');
  const [paused, setPaused] = useState(false);
  const reduced = systemReduced || paused;
  const [ready, setReady] = useState(false);
  const lenis = useRef<Lenis | null>(null);
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;

  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? 'reduced' : 'full';
    if (reduced) return;
    const instance = new Lenis({
      duration: 1.12,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      syncTouch: false,
      anchors: false,
    });
    lenis.current = instance;
    instance.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      instance.off('scroll', ScrollTrigger.update);
      instance.destroy();
      lenis.current = null;
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, [reduced]);

  useEffect(() => {
    if (ready) lenis.current?.start();
    else lenis.current?.stop();
  }, [ready, reduced]);

  const scrollTo = useCallback<MotionContextValue['scrollTo']>((target, immediate = false) => {
      if (lenis.current) {
        lenis.current.scrollTo(target, { immediate, offset: typeof target === 'number' ? 0 : -90 });
      } else {
        const el = typeof target === 'string' ? document.querySelector(target) : target;
        const top = typeof el === 'number' ? el : el instanceof HTMLElement ? el.getBoundingClientRect().top + window.scrollY - 90 : 0;
        window.scrollTo({ top, behavior: immediate || reducedRef.current ? 'instant' : 'smooth' });
      }
  }, []);
  const value = useMemo<MotionContextValue>(() => ({
    reduced, coarse, ready, setReady, scrollTo,
  }), [reduced, coarse, ready, scrollTo]);

  return <MotionContext.Provider value={value}>
    {children}
    <button className="motion-switch" onClick={() => setPaused(!paused)} aria-pressed={reduced}
      aria-label={reduced ? 'Ativar animações, se permitido pelo sistema' : 'Pausar animações'} data-cursor="LINK">
      <span aria-hidden="true">{reduced ? '▶' : 'Ⅱ'}</span><span>Motion {reduced ? 'off' : 'on'}</span>
    </button>
  </MotionContext.Provider>;
}

export function useMotionSettings() {
  const context = useContext(MotionContext);
  if (!context) throw new Error('useMotionSettings precisa de MotionProvider.');
  return context;
}
