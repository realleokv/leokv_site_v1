import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { MathUtils, SRGBColorSpace, Vector2, type ShaderMaterial } from 'three';
import { fragmentShader, vertexShader } from '../shaders/ripple';

function ImagePlane({ src, hovered, point, onReady }: {
  src: string; hovered: boolean; point: { x: number; y: number }; onReady: () => void;
}) {
  const texture = useTexture(src);
  const image = texture.image as HTMLImageElement;
  const ref = useRef<ShaderMaterial>(null);
  const { viewport, size, invalidate } = useThree();
  const uniforms = useMemo(() => ({
    uTexture: { value: texture }, uTime: { value: 0 }, uHover: { value: 0 },
    uPointer: { value: new Vector2(0.5, 0.5) },
    uResolution: { value: new Vector2(1, 1) },
    uImageSize: { value: new Vector2(image.width, image.height) },
  }), [texture, image]);
  useEffect(() => { texture.colorSpace = SRGBColorSpace; texture.needsUpdate = true; onReady(); }, [texture, onReady]);
  useEffect(() => { uniforms.uResolution.value.set(size.width, size.height); invalidate(); }, [size, uniforms, invalidate]);
  useEffect(() => { invalidate(); }, [hovered, point, invalidate]);
  useFrame((state, delta) => {
    if (!ref.current) return;
    const u = ref.current.uniforms;
    u.uTime.value = state.clock.elapsedTime;
    u.uHover.value = MathUtils.damp(u.uHover.value, hovered ? 1 : 0, 6, Math.min(delta, 0.05));
    u.uPointer.value.lerp(new Vector2(point.x, point.y), 0.12);
    if (hovered || u.uHover.value > 0.001) invalidate();
  });
  return <mesh scale={[viewport.width, viewport.height, 1]}>
    <planeGeometry args={[1, 1]} /><shaderMaterial ref={ref} uniforms={uniforms}
      vertexShader={vertexShader} fragmentShader={fragmentShader} toneMapped={false} />
  </mesh>;
}

export default function DistortionCanvas(props: { src: string; hovered: boolean; point: { x: number; y: number }; onReady: () => void }) {
  return <Canvas orthographic camera={{ position: [0, 0, 2], zoom: 1 }} dpr={[1, 1.25]} frameloop="demand"
    gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }} aria-hidden="true">
    <Suspense fallback={null}><ImagePlane {...props} /></Suspense>
  </Canvas>;
}
