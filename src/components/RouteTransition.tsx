import { useEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Home from '../pages/Home';
import Project from '../pages/Project';
import ContactPage from '../pages/ContactPage';
import NotFound from '../pages/NotFound';
import { useMotionSettings } from './MotionProvider';
import { gsap, ScrollTrigger, wipeEase } from '../lib/motion';
import { projects } from '../data/projects';

export function RouteTransition() {
  const location = useLocation();
  const latest = useRef(location);
  latest.current = location;
  const [displayed, setDisplayed] = useState(location);
  const [stage, setStage] = useState<'idle' | 'cover' | 'reveal'>('idle');
  const { reduced, ready, scrollTo } = useMotionSettings();
  const mounted = useRef(false);
  const swapping = location.pathname !== displayed.pathname;

  useEffect(() => {
    if (!swapping) return;
    if (reduced) { setDisplayed(location); scrollTo(0, true); }
    else setStage('cover');
  }, [location, swapping, reduced, scrollTo]);

  useEffect(() => {
    if (!ready) return;
    const slug = displayed.pathname.split('/')[2];
    const project = projects.find((item) => item.slug === slug);
    document.title = `${displayed.pathname === '/contato' ? 'Vamos conversar' : project?.title || 'Design & Código'} — Leonardo Carvalho`;
    const delay = gsap.delayedCall(0.12, () => {
      ScrollTrigger.refresh();
      const hash = latest.current.hash;
      if (hash && displayed.pathname === '/') {
        const target = document.getElementById(hash.slice(1));
        if (target) scrollTo(target, true);
      }
      if (mounted.current) {
        const hashHeading = hash && displayed.pathname === '/' ? document.getElementById(hash.slice(1))?.querySelector<HTMLElement>('h2') : null;
        const heading = hashHeading || document.querySelector<HTMLElement>('main h1');
        heading?.focus({ preventScroll: true });
      }
      mounted.current = true;
    });
    return () => { delay.kill(); };
  }, [displayed.pathname, ready, scrollTo]);

  const clip = stage === 'cover' ? 'inset(0% 0 0% 0)' : stage === 'reveal' ? 'inset(0% 0 100% 0)' : 'inset(100% 0 0% 0)';
  return <>
    <main id="main-content" tabIndex={-1} inert={!ready || stage === 'cover'}>
      <Routes location={displayed}>
        <Route path="/" element={<Home />} /><Route path="/trabalho/:slug" element={<Project key={displayed.pathname} />} />
        <Route path="/contato" element={<ContactPage />} /><Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <motion.div className="route-wipe" aria-hidden="true" initial={false} animate={{ clipPath: clip }}
      transition={{ duration: reduced || stage === 'idle' ? 0 : 0.6, ease: wipeEase }}
      onAnimationComplete={() => {
        if (stage === 'cover') {
          setDisplayed(latest.current); scrollTo(0, true); setStage('reveal');
        } else if (stage === 'reveal') setStage('idle');
      }}><span>OUTRA PÁGINA.<br />A MESMA INQUIETAÇÃO.</span><span className="mono">LEONARDO CARVALHO ↗</span></motion.div>
  </>;
}
