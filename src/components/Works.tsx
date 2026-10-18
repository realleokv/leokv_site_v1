import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { DistortionImage } from './DistortionImage';
import { Arrow } from './Icons';
import { gsap, ScrollTrigger } from '../lib/motion';
import { useMotionSettings } from './MotionProvider';
import { useHorizontalDrag } from '../hooks/useHorizontalDrag';

export function Works() {
  const hasPublished = projects.some((project) => project.kind === 'published');
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const { reduced, ready, scrollTo } = useMotionSettings();
  useHorizontalDrag(windowRef);

  useLayoutEffect(() => {
    if (reduced || !ready || !root.current || !track.current) return;
    const media = gsap.matchMedia();
    media.add('(min-width: 900px)', () => {
      const distance = () => Math.max(0, track.current!.scrollWidth - window.innerWidth + window.innerWidth * 0.055);
      // O mesmo progresso move o trilho, revela as imagens e preenche o índice.
      const tween = gsap.to(track.current, {
        x: () => -distance(), ease: 'none',
        scrollTrigger: {
          id: 'works-horizontal',
          trigger: root.current, start: 'top top', end: () => `+=${Math.max(distance() * 1.2, 850)}`,
          scrub: 1.1, pin: true, anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: (self) => { if (progress.current) progress.current.style.transform = `scaleX(${self.progress})`; },
        },
      });
      gsap.utils.toArray<HTMLElement>('.work-visual', root.current).forEach((element) => {
        gsap.fromTo(element, { clipPath: 'inset(10% 8% 10% 8%)' }, {
          clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
          scrollTrigger: { trigger: element, containerAnimation: tween, start: 'left 100%', end: 'left 45%', scrub: true },
        });
      });
    }, root);
    ScrollTrigger.refresh();
    return () => media.revert();
  }, [reduced, ready]);

  return <section ref={root} id="trabalhos" className="works" aria-labelledby="works-heading">
    <div className="works-heading section-pad">
      <div className="section-label mono"><span><span className="tiny-square" />02 / ARQUIVO ABERTO</span><span className="horizontal-hint">CONTINUE ROLANDO ↗</span></div>
      <div className="works-title-row"><h2 id="works-heading" tabIndex={-1} data-reveal="chars">{hasPublished ? 'TRABALHOS' : 'EM CONSTRUÇÃO'}<span>→</span></h2>
        <p>{hasPublished ? 'Um recorte do que eu faço.' : 'As próximas ideias moram aqui.'}<br /><span>{hasPublished ? 'Cada projeto, uma pergunta diferente.' : 'Os trabalhos chegam em breve.'}</span></p></div>
    </div>
    <div ref={windowRef} className="works-window" data-cursor="ARRASTE">
      <div ref={track} className="works-track">
        {projects.map((project, index) => <article className="work-card" key={project.slug}>
          <Link className="work-link" to={`/trabalho/${project.slug}`} data-cursor="VER" data-burst aria-label={`Ver ${project.title}`}
            onFocus={(event) => {
              const trigger = ScrollTrigger.getById('works-horizontal');
              if (trigger && event.currentTarget.matches(':focus-visible')) scrollTo(trigger.start + (trigger.end - trigger.start) * index / projects.length, true);
            }}>
            <div className="work-visual">
              <DistortionImage src={project.cover} alt={project.coverAlt} />
              <span className="work-badge mono">{project.kind === 'placeholder' ? 'EM BREVE' : project.year}</span>
              <span className="work-open" aria-hidden="true"><Arrow /></span>
            </div>
            <div className="work-info"><span className="work-number mono">/{project.number}</span><div><h3>{project.title}</h3><span className="mono">{project.category}</span></div><Arrow /></div>
          </Link>
        </article>)}
        <div className="work-end"><span className="mono">O ARQUIVO<br />CONTINUA.</span><Arrow /><p>A próxima página<br />ainda está em branco.</p><Link to="/contato" className="text-link">Vamos preencher?<Arrow /></Link></div>
      </div>
    </div>
    <div className="works-footer section-pad mono"><span>{hasPublished ? 'SELEÇÃO DE TRABALHOS / ARQUIVO EM MOVIMENTO' : 'ESTUDOS DE CAPA / PROJETOS EM BREVE'}</span><div className="works-progress"><div ref={progress} /></div><span>01 — {String(projects.length).padStart(2, '0')}</span></div>
  </section>;
}
