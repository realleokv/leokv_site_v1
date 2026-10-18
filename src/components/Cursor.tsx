import { useRef } from 'react';
import { useCursor } from '../hooks/useCursor';

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useCursor(ref);
  return <div ref={ref} className="cursor" aria-hidden="true"><div className="cursor-disc"><span /></div></div>;
}
