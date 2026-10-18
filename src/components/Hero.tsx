import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useMotionSettings } from './MotionProvider';
import { useInView } from '../hooks/useInView';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { canUseWebGL } from '../lib/utils';
import { SceneBoundary } from './SceneBoundary';
import { Magnetic } from './Magnetic';
import { Arrow, Asterisk } from './Icons';

const HeroScene = lazy(() => import('./HeroScene'));

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const active = useInView(ref, '100px');
  const mobile = useMediaQuery('(max-width: 767px)');
  const { ready, reduced, scrollTo } = useMotionSettings();
  const [webgl, setWebgl] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [impulse, setImpulse] = useState(0);
  useEffect(() => { setWebgl(canUseWebGL()); }, []);
  const onReady = useCallback(() => setRendered(true), []);
  const onLost = useCallback(() => { setWebgl(false); setRendered(false); }, []);

  return <section ref={ref} id="inicio" className="hero" aria-labelledby="hero-heading">
    <div className="hero-eyebrow mono"><span>PORTFÓLIO INDEPENDENTE / VOL. 01</span><span>SP, BR ↗</span></div>
    <div className="hero-heading-wrap">
      <h1 id="hero-heading" className="hero-heading" tabIndex={-1}>
        <span data-reveal="chars">LEONARDO</span>
        <span className="name-second" data-reveal="chars">CARVALHO<span className="hero-period">.</span></span>
      </h1>
      <span className="hero-registered mono" aria-hidden="true">©<br />26</span>
    </div>
    <div className={`hero-art ${rendered ? 'is-rendered' : ''}`}>
      <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
      <div className="sculpture-fallback" aria-hidden="true"><Asterisk /></div>
      {ready && webgl && <SceneBoundary onError={onLost}><Suspense fallback={null}>
        <HeroScene mobile={mobile} active={active} impulse={impulse} reduced={reduced} onReady={onReady} onLost={onLost} />
      </Suspense></SceneBoundary>}
      <button className="sculpture-hit" onClick={() => setImpulse(impulse + 1)} data-cursor="GIRE" data-burst
        aria-label="Girar a escultura abstrata" disabled={reduced || !webgl} />
      <div className="art-caption mono"><span className="crosshair">+</span> OBJETO 001<br /><span className="art-caption-sub">IDEIA EM ESTADO BRUTO</span></div>
      <span className="art-coordinate mono" aria-hidden="true">X.023 / Y.046</span>
    </div>
    <div className="hero-bottom">
      <p className="hero-description" data-fade>Design com presença.<br />Código com propósito.<br /><span>Inquietação de sobra.</span></p>
      <Magnetic className="hero-cta"><a className="round-link" href="/#/#trabalhos" data-burst data-cursor="LINK"
        onClick={(event) => { event.preventDefault(); scrollTo('#trabalhos'); }}>
        <span>EXPLORAR<br />TRABALHOS</span><Arrow direction="down" />
      </a></Magnetic>
      <div className="hero-location mono"><span className="status-dot" />DA ZONA LESTE<br /><span>PARA QUALQUER LUGAR.</span></div>
    </div>
    <div className="hero-floor mono"><span>DESIGNER & DESENVOLVEDOR</span><span>ROLE PARA DESCOBRIR <span className="scroll-glyph">↓</span></span><span>(01 — 04)</span></div>
  </section>;
}
