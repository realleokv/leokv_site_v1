import { useEffect, useRef, type ReactNode, type PointerEvent } from 'react';
import { gsap } from '../lib/motion';
import { useMotionSettings } from './MotionProvider';

export function Magnetic({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { reduced, coarse } = useMotionSettings();
  useEffect(() => { const target = ref.current; return () => { if (target) gsap.killTweensOf(target); }; }, []);
  const move = (event: PointerEvent<HTMLSpanElement>) => {
    if (coarse || reduced || !ref.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    gsap.to(ref.current, { x: (event.clientX - bounds.left - bounds.width / 2) * 0.22,
      y: (event.clientY - bounds.top - bounds.height / 2) * 0.24, duration: 0.6, overwrite: true });
  };
  return <span className={`magnetic ${className}`} onPointerMove={move}
    onPointerLeave={() => gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, overwrite: true })}>
    <span ref={ref}>{children}</span>
  </span>;
}
