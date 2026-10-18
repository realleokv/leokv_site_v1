import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useMotionSettings } from './MotionProvider';
import { useInView } from '../hooks/useInView';
import { SceneBoundary } from './SceneBoundary';
import { canUseWebGL } from '../lib/utils';

const DistortionCanvas = lazy(() => import('./DistortionCanvas'));

export function DistortionImage({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, '80px');
  const { reduced, coarse } = useMotionSettings();
  const [hovered, setHovered] = useState(false);
  const [requested, setRequested] = useState(false);
  const [ready, setReady] = useState(false);
  const [point, setPoint] = useState({ x: 0.5, y: 0.5 });
  const onReady = useCallback(() => setReady(true), []);
  useEffect(() => { if (!visible) setReady(false); }, [visible]);
  return <div ref={ref} className={`distortion-image ${ready && !reduced && !coarse ? 'shader-ready' : ''}`}
    onPointerEnter={() => { if (!coarse && !reduced) { setHovered(true); if (!requested && canUseWebGL()) setRequested(true); } }}
    onPointerLeave={() => setHovered(false)} onPointerMove={(event) => {
      if (coarse || reduced) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      setPoint({ x: (event.clientX - bounds.left) / bounds.width, y: 1 - (event.clientY - bounds.top) / bounds.height });
    }}>
    <img src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} decoding="async" width="1200" height="1400" />
    {requested && visible && !reduced && !coarse && <div className="distortion-canvas"><SceneBoundary><Suspense fallback={null}>
      <DistortionCanvas src={src} hovered={hovered} point={point} onReady={onReady} />
    </Suspense></SceneBoundary></div>}
  </div>;
}
