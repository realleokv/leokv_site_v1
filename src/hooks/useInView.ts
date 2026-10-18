import { useEffect, useState, type RefObject } from 'react';

export function useInView(ref: RefObject<HTMLElement | null>, rootMargin = '180px', once = false) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (once && entry.isIntersecting) observer.disconnect();
    }, { rootMargin });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin, once]);
  return visible;
}
