import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import { Arrow } from '../components/Icons';
import { DistortionImage } from '../components/DistortionImage';
import { useScrollTL } from '../hooks/useScrollTL';
import { safeLink } from '../lib/utils';
import { Contact } from '../components/Contact';
import NotFound from './NotFound';

export default function Project() {
  const { slug } = useParams();
  const ref = useRef<HTMLDivElement>(null);
  useScrollTL(ref);
  const index = projects.findIndex((item) => item.slug === slug);
  if (index === -1) return <NotFound />;
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  return <div ref={ref} className="project-page">
    <section className="project-intro section-pad">
      <Link to="/#trabalhos" className="text-link project-back"><Arrow style={{ transform: 'rotate(225deg)' }} />Voltar ao arquivo</Link>
      <div className="section-label mono"><span>ARQUIVO / {project.number}</span><span>{project.kind === 'placeholder' ? 'ESPAÇO RESERVADO' : project.year}</span></div>
      <h1 tabIndex={-1} data-reveal="chars">{project.title}</h1>
      <div className="project-subtitle"><p>{project.summary}</p><span className="mono">{project.category} ↗</span></div>
    </section>
    <div className="project-cover section-pad"><DistortionImage src={project.cover} alt={project.coverAlt} priority /></div>
    <section className="project-description section-pad">
      <div><span className="mono">{project.kind === 'placeholder' ? 'A PRÓXIMA PÁGINA' : 'SOBRE O PROJETO'}</span>
        <h2 data-reveal="lines">{project.kind === 'placeholder' ? 'Ainda tem muita\ncoisa vindo aí.' : 'Da ideia\npara a prática.'}</h2></div>
      <div><p>{project.description}</p>
        {project.tools.length > 0 && <div className="project-tools">{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>}
        {safeLink(project.liveUrl) && <a className="text-link" href={safeLink(project.liveUrl)} target="_blank" rel="noopener noreferrer">Ver projeto no ar<Arrow /></a>}
        {safeLink(project.sourceUrl) && <a className="text-link" href={safeLink(project.sourceUrl)} target="_blank" rel="noopener noreferrer">Ver código<Arrow /></a>}
        {project.kind === 'placeholder' && <span className="project-note mono">CAPA CONCEITUAL DO PORTFÓLIO.<br />NENHUM CLIENTE OU CASE PUBLICADO NESTE ESPAÇO.</span>}
      </div>
    </section>
    {project.gallery.length > 0 && <div className="project-gallery section-pad">{project.gallery.map((image) => <figure key={image.src} data-fade><img src={image.src} alt={image.alt} loading="lazy" /></figure>)}</div>}
    <Link to={`/trabalho/${next.slug}`} className="next-project section-pad" data-cursor="VER"><span className="mono">PRÓXIMO NO ARQUIVO / {next.number}</span><span>{next.title}</span><Arrow /></Link>
    <Contact />
  </div>;
}
