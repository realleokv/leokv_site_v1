import { useEffect, type RefObject } from 'react';
import { ScrollTrigger } from '../lib/motion';
import { clamp } from '../lib/utils';
import { useMotionSettings } from '../components/MotionProvider';

export function useHorizontalDrag(ref: RefObject<HTMLDivElement | null>) {
  const { reduced, coarse, scrollTo } = useMotionSettings();
  useEffect(() => {
    const element = ref.current;
    if (!element || reduced || coarse) return;
    let startX = 0, startScroll = 0, pressed = false, dragged = false;
    const down = (event: PointerEvent) => {
      const trigger = ScrollTrigger.getById('works-horizontal');
      if (!trigger || event.button !== 0) return;
      startX = event.clientX;
      startScroll = clamp(window.scrollY, trigger.start, trigger.end);
      pressed = true; dragged = false;
    };
    const move = (event: PointerEvent) => {
      if (!pressed) return;
      const trigger = ScrollTrigger.getById('works-horizontal');
      if (!trigger) return;
      const delta = event.clientX - startX;
      if (Math.abs(delta) > 7) dragged = true;
      if (!dragged) return;
      scrollTo(clamp(startScroll - delta * 1.2, trigger.start, trigger.end), true);
    };
    const up = () => { pressed = false; };
    const click = (event: MouseEvent) => {
      if (dragged) { event.preventDefault(); event.stopPropagation(); dragged = false; }
    };
    const preventNativeDrag = (event: DragEvent) => event.preventDefault();
    element.addEventListener('pointerdown', down);
    element.addEventListener('click', click, true);
    element.addEventListener('dragstart', preventNativeDrag);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    return () => {
      element.removeEventListener('pointerdown', down);
      element.removeEventListener('click', click, true);
      element.removeEventListener('dragstart', preventNativeDrag);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
  }, [ref, reduced, coarse, scrollTo]);
}
