import { Link } from 'react-router-dom';
import { site } from '../data/site';
import { Arrow, Asterisk } from './Icons';
import { Magnetic } from './Magnetic';
import { useMotionSettings } from './MotionProvider';

export function Contact() {
  const { scrollTo } = useMotionSettings();
  return <footer id="contato" className="contact section-pad" aria-labelledby="contact-heading">
    <div className="section-label mono"><span><span className="tiny-square" />04 / A PRÓXIMA CONVERSA</span><span>SÃO PAULO, BRASIL</span></div>
    <div className="contact-intro"><p>Tem uma ideia na cabeça?<br /><span>Já é um bom começo.</span></p><Asterisk /></div>
    <Magnetic className="contact-magnetic"><Link to="/contato" className="contact-big-link" data-cursor="ABRIR" data-burst>
      <h2 id="contact-heading" tabIndex={-1} data-reveal="chars">BORA CRIAR.</h2><Arrow />
    </Link></Magnetic>
    <div className="contact-details"><span className="mono">UMA MENSAGEM.<br />MUITAS POSSIBILIDADES.</span>
      <div className="contact-socials"><a href={site.instagram} target="_blank" rel="noopener noreferrer" className="text-link">Instagram<Arrow /></a>
        <a href={site.github} target="_blank" rel="noopener noreferrer" className="text-link">GitHub<Arrow /></a>
        <Link to="/contato" className="text-link">Começar uma conversa<Arrow /></Link></div>
    </div>
    <div className="footer-bottom mono"><span>© {new Date().getFullYear()} LEONARDO CARVALHO</span><span>IDEIAS PRÓPRIAS. MÃOS À OBRA.</span>
      <button onClick={() => scrollTo(0)} data-cursor="LINK">VOLTAR AO TOPO ↑</button></div>
  </footer>;
}
