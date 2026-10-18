import { useLayoutEffect, type RefObject } from 'react';
import { gsap, ScrollTrigger, SplitText } from '../lib/motion';
import { useMotionSettings } from '../components/MotionProvider';

export function useScrollTL(scope: RefObject<HTMLElement | null>) {
  const { reduced, ready } = useMotionSettings();
  useLayoutEffect(() => {
    if (!scope.current || reduced || !ready) return;
    let cancelled = false;
    let context: gsap.Context | undefined;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
          SplitText.create(element, {
            type: element.dataset.reveal === 'chars' ? 'lines,words,chars' : 'lines',
            mask: 'lines', autoSplit: true,
            onSplit(split) {
              return gsap.from(split.chars.length ? split.chars : split.lines, {
                yPercent: 115, rotate: element.dataset.reveal === 'chars' ? 3 : 0,
                duration: 1.05, stagger: element.dataset.reveal === 'chars' ? 0.026 : 0.12,
                scrollTrigger: { trigger: element, start: 'top 92%', once: true },
              });
            },
          });
        });
        gsap.utils.toArray<HTMLElement>('[data-fade]').forEach((element) => {
          gsap.from(element, { y: 35, autoAlpha: 0, duration: 0.85,
            scrollTrigger: { trigger: element, start: 'top 94%', once: true } });
        });
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((element) => {
          gsap.fromTo(element, { yPercent: -Number(element.dataset.parallax) }, {
            yPercent: Number(element.dataset.parallax), ease: 'none',
            scrollTrigger: { trigger: element.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1 },
          });
        });
        ScrollTrigger.refresh();
      }, scope);
    });
    return () => { cancelled = true; context?.revert(); };
  }, [scope, reduced, ready]);
}
