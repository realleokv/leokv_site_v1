import { site } from '../data/site';
import { Asterisk, Arrow } from './Icons';
import { Magnetic } from './Magnetic';

export function About() {
  return <section id="sobre" className="about section-pad" aria-labelledby="about-heading">
    <div className="section-label mono"><span><span className="tiny-square" />01 / QUEM TÁ POR TRÁS</span><span>UM POUCO DE CONTEXTO</span></div>
    <div className="about-grid">
      <div className="about-title"><h2 id="about-heading" tabIndex={-1} data-reveal="lines">UM PÉ NA RUA.<br />OUTRO NO<br /><span>CÓDIGO.</span></h2>
        <div className="about-stamp"><Asterisk /><span className="mono">FEITO DE<br />CURIOSIDADE.</span></div>
      </div>
      <div className="about-copy" data-fade>
        <span className="mono eyebrow">PRAZER, LEO.</span>
        <p>{site.about}</p><p className="secondary-copy">{site.approach}</p>
        <Magnetic><a className="text-link" href={site.github} target="_blank" rel="noopener noreferrer" data-cursor="LINK">O lado do código<Arrow /></a></Magnetic>
      </div>
    </div>
    <div className="disciplines" data-fade><span className="mono">O QUE ME MOVE</span><div>{site.skills.map((skill, i) => <span key={skill}><sup>0{i + 1}</sup>{skill}</span>)}</div></div>
  </section>;
}
