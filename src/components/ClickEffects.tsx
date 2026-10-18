import { useEffect } from 'react';
import { gsap } from '../lib/motion';
import { useMotionSettings } from './MotionProvider';

export function ClickEffects() {
  const { reduced } = useMotionSettings();
  useEffect(() => {
    if (reduced) return;
    const active = new Map<HTMLElement, gsap.core.Tween>();
    const click = (event: MouseEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest('[data-burst]')) return;
      for (let i = 0; i < 8; i++) {
        const dot = document.createElement('i');
        dot.className = 'click-particle';
        dot.setAttribute('aria-hidden', 'true');
        dot.style.left = `${event.clientX}px`; dot.style.top = `${event.clientY}px`;
        document.body.appendChild(dot);
        const angle = (i / 8) * Math.PI * 2;
        const tween = gsap.to(dot, { x: Math.cos(angle) * 65, y: Math.sin(angle) * 65,
          rotate: i * 45, scale: 0, opacity: 0, duration: 0.75,
          onComplete: () => { active.delete(dot); dot.remove(); } });
        active.set(dot, tween);
      }
    };
    window.addEventListener('click', click);
    return () => {
      window.removeEventListener('click', click);
      active.forEach((tween, dot) => { tween.kill(); dot.remove(); });
    };
  }, [reduced]);
  return null;
}
