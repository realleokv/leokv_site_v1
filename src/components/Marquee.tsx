import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/motion';
import { useMotionSettings } from './MotionProvider';
import { useInView } from '../hooks/useInView';
import { Asterisk } from './Icons';

export function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, '100px');
  const { reduced } = useMotionSettings();
  useEffect(() => {
    if (reduced || !visible || !track.current) return;
    let position = 0, speed = 0.65;
    const update = () => {
      const scrollVelocity = Math.min(Math.abs(ScrollTrigger.getAll()[0]?.getVelocity() || 0), 3000);
      speed += (0.65 + scrollVelocity / 600 - speed) * 0.06;
      const width = track.current!.scrollWidth / 2;
      position = (position + speed * gsap.ticker.deltaRatio()) % width;
      track.current!.style.transform = `translate3d(${-position}px,0,0)`;
    };
    gsap.ticker.add(update);
    return () => { gsap.ticker.remove(update); };
  }, [visible, reduced]);
  return <div ref={ref} className="marquee" aria-label="Design, código, cultura e movimento">
    <div ref={track} className="marquee-track" aria-hidden="true">{[0, 1].map((copy) =>
      <div className="marquee-group" key={copy}>{['DESIGN', 'CÓDIGO', 'CULTURA', 'MOVIMENTO'].map((word) =>
        <span key={word}>{word}<Asterisk /></span>)}</div>)}</div>
  </div>;
}
