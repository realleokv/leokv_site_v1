import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Center, Environment, Lightformer, useGLTF } from '@react-three/drei';
import { MathUtils, type Group, type Mesh } from 'three';
import { gsap, ScrollTrigger } from '../lib/motion';
import { site } from '../data/site';

function UserModel() {
  const { scene } = useGLTF(site.modelUrl, site.dracoPath);
  return <Center><primitive object={scene} scale={1.4} /></Center>;
}

function Sculpture({ mobile, impulse, reduced }: { mobile: boolean; impulse: number; reduced: boolean }) {
  const group = useRef<Group>(null);
  const mesh = useRef<Mesh>(null);
  const spin = useRef(0);
  const progress = useRef(0);
  const scrollTrigger = useRef<ScrollTrigger | null>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const { camera, invalidate } = useThree();
  useEffect(() => {
    if (mobile || reduced) return;
    const move = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = 1 - (event.clientY / window.innerHeight) * 2;
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [mobile, reduced]);
  useEffect(() => {
    if (reduced) return;
    scrollTrigger.current = ScrollTrigger.create({
      trigger: '#inicio', start: 'top top', end: 'bottom top',
      onUpdate: (self) => { progress.current = self.progress; },
    });
    return () => { scrollTrigger.current?.kill(); };
  }, [reduced]);
  useEffect(() => {
    if (reduced) { invalidate(); return; }
    const tween = gsap.to(spin, { current: impulse * Math.PI, duration: 1.6, ease: 'editorial' });
    return () => { tween.kill(); };
  }, [impulse, reduced, invalidate]);

  useFrame((state, delta) => {
    if (!group.current || reduced) return;
    const t = state.clock.elapsedTime;
    const d = Math.min(delta, 0.05);
    group.current.rotation.x = MathUtils.damp(group.current.rotation.x, 0.28 + pointer.current.y * 0.25 + progress.current * 0.7, 4, d);
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, -0.35 + pointer.current.x * 0.4 + t * 0.12 + spin.current + progress.current * 1.8, 3, d);
    group.current.rotation.z = MathUtils.damp(group.current.rotation.z, -0.22 + pointer.current.x * 0.08, 4, d);
    group.current.position.y = Math.sin(t * 0.65) * 0.1 - progress.current * 0.35;
    camera.position.z = MathUtils.damp(camera.position.z, 5.6 + progress.current * 1.5, 3, d);
  });

  return <group ref={group} rotation={[0.35, -0.5, -0.22]} scale={mobile ? 0.9 : 1}>
    {site.modelUrl ? <Suspense fallback={null}><UserModel /></Suspense> : <mesh ref={mesh}>
      <torusKnotGeometry args={[1.02, 0.34, mobile ? 100 : 192, mobile ? 16 : 32, 2, 3]} />
      <meshPhysicalMaterial color="#ff4328" metalness={0.77} roughness={0.24} clearcoat={1} clearcoatRoughness={0.16} />
    </mesh>}
  </group>;
}

function ContextGuard({ onLost }: { onLost: () => void }) {
  const { gl } = useThree();
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = (event: Event) => { event.preventDefault(); onLost(); };
    canvas.addEventListener('webglcontextlost', lost);
    return () => canvas.removeEventListener('webglcontextlost', lost);
  }, [gl, onLost]);
  return null;
}

export default function HeroScene({ mobile, active, impulse, reduced, onReady, onLost }: {
  mobile: boolean; active: boolean; impulse: number; reduced: boolean; onReady: () => void; onLost: () => void;
}) {
  return <Canvas camera={{ position: [0, 0, 5.6], fov: 36 }} dpr={[1, mobile ? 1.2 : 1.6]}
    frameloop={active && !reduced ? 'always' : 'demand'} gl={{ antialias: !mobile, alpha: true, powerPreference: 'low-power' }}
    onCreated={({ gl }) => {
      gl.setClearAlpha(0);
      onReady();
    }}
    onContextMenu={(event) => event.preventDefault()} aria-hidden="true">
    <ContextGuard onLost={onLost} />
    <ambientLight intensity={0.4} />
    <directionalLight position={[3, 4, 5]} intensity={3.5} color="#fff5df" />
    <directionalLight position={[-3, -1, 2]} intensity={1.5} color="#ff482c" />
    <Suspense fallback={null}>
      <Environment resolution={mobile ? 64 : 128}>
        <Lightformer form="rect" intensity={5} color="#f2efe5" position={[-3, 3, 3]} scale={[4, 6, 1]} />
        <Lightformer form="rect" intensity={3} color="#fff5df" position={[4, 0, -2]} rotation-y={Math.PI / 2} scale={[3, 5, 1]} />
        <Lightformer form="rect" intensity={2} color="#ff482c" position={[0, -4, 1]} rotation-x={Math.PI / 2} scale={[6, 2, 1]} />
      </Environment>
      <Sculpture mobile={mobile} impulse={impulse} reduced={reduced} />
    </Suspense>
  </Canvas>;
}
