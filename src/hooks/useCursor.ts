import { useEffect, type RefObject } from 'react';
import { gsap } from '../lib/motion';
import { lerp } from '../lib/utils';
import { useMotionSettings } from '../components/MotionProvider';

export function useCursor(ref: RefObject<HTMLDivElement | null>) {
  const { coarse, reduced } = useMotionSettings();
  useEffect(() => {
    const el = ref.current;
    if (!el || coarse || reduced) return;
    let x = -100, y = -100, tx = -100, ty = -100;
    let shown = false;
    const move = (event: PointerEvent) => {
      tx = event.clientX; ty = event.clientY;
      if (!shown) { x = tx; y = ty; shown = true; }
      el.style.opacity = '1';
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-cursor], a, button') : null;
      const label = target?.dataset.cursor || (target ? 'LINK' : '');
      el.dataset.mode = label;
      const text = el.querySelector('span');
      if (text) text.textContent = ['VER', 'ARRASTE', 'GIRE', 'ABRIR'].includes(label) ? label : '';
    };
    const leave = () => { el.style.opacity = '0'; shown = false; };
    const tick = () => {
      const alpha = 1 - Math.pow(0.82, gsap.ticker.deltaRatio());
      x = lerp(x, tx, alpha); y = lerp(y, ty, alpha);
      el.style.transform = `translate3d(${x}px,${y}px,0)`;
    };
    document.documentElement.classList.add('has-custom-cursor');
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    window.addEventListener('blur', leave);
    gsap.ticker.add(tick);
    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      window.removeEventListener('blur', leave);
      gsap.ticker.remove(tick);
    };
  }, [ref, coarse, reduced]);
}
