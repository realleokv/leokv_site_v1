import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/motion';
import { useMotionSettings } from './MotionProvider';
import { Asterisk } from './Icons';

export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);
  const { reduced, setReady } = useMotionSettings();

  useEffect(() => {
    let cancelled = false;
    let timeout: ReturnType<typeof setTimeout>;
    let context: gsap.Context | undefined;
    const loaded = Promise.race([
      document.fonts.ready,
      new Promise((resolve) => { timeout = setTimeout(resolve, 1800); }),
    ]);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const finish = () => {
      if (cancelled) return;
      document.body.style.overflow = previousOverflow;
      setReady(true); setDone(true);
    };
    if (reduced) { finish(); return; }
    const number = { value: 0 };
    context = gsap.context(() => {
      const tl = gsap.timeline();
      tl.to(number, { value: 92, duration: 1.15, ease: 'editorial', onUpdate: () => {
        if (counter.current) counter.current.textContent = String(Math.floor(number.value)).padStart(3, '0');
      } });
      loaded.then(() => {
        clearTimeout(timeout);
        if (cancelled) return;
        tl.to(number, { value: 100, duration: 0.3, onUpdate: () => {
          if (counter.current) counter.current.textContent = String(Math.floor(number.value)).padStart(3, '0');
        } }).to('.preloader-inner', { yPercent: -15, opacity: 0, duration: 0.4 }, '+=0.12')
          .to(ref.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.85, ease: 'editorial', onComplete: finish }, '-=0.1');
      });
    }, ref);
    return () => {
      cancelled = true; clearTimeout(timeout); context?.revert();
      document.body.style.overflow = previousOverflow;
    };
  }, [reduced, setReady]);

  if (done) return null;
  return <div ref={ref} className="preloader" role="status" aria-label="Preparando o portfólio">
    <div className="preloader-inner">
      <div className="preloader-top mono"><span>LEONARDO CARVALHO®</span><span>CARREGANDO IDEIAS</span></div>
      <Asterisk className="preloader-star" />
      <div className="preloader-bottom"><span className="mono">DESIGN. CÓDIGO.<br />E UM POUCO DE INQUIETAÇÃO.</span><span ref={counter} className="preloader-count" aria-hidden="true">000</span></div>
    </div>
  </div>;
}
