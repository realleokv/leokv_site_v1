import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { site } from '../data/site';
import { Arrow, Asterisk } from '../components/Icons';
import { Magnetic } from '../components/Magnetic';
import { useScrollTL } from '../hooks/useScrollTL';

export function createMessage(name: string, subject: string, message: string) {
  return `Oi, Leo! Sou ${name.trim()}.\n\nQuero conversar sobre ${subject.toLowerCase()}.\n\n${message.trim()}`;
}

export default function ContactPage() {
  const ref = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLTextAreaElement>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('Design visual');
  const [message, setMessage] = useState('');
  const [draft, setDraft] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  useScrollTL(ref);
  useEffect(() => () => clearTimeout(timeout.current), []);
  useEffect(() => { if (draft) preview.current?.focus(); }, [draft]);
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || message.trim().length < 20) return;
    setDraft(createMessage(name, subject, message));
    setCopied(false); setCopyError(false);
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true); setCopyError(false);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setCopied(false), 3000);
    } catch {
      preview.current?.focus(); preview.current?.select(); setCopyError(true);
    }
  }

  return <div ref={ref} className="contact-page section-pad">
    <Link to="/" className="text-link project-back"><Arrow style={{ transform: 'rotate(225deg)' }} />Voltar ao início</Link>
    <div className="section-label mono"><span>CONTATO / VAMOS CONVERSAR</span><span>SEM ROTEIRO ENSAIADO.</span></div>
    <div className="contact-page-grid"><div className="contact-page-heading">
      <h1 data-reveal="lines" tabIndex={-1}>BOAS IDEIAS<br />COMEÇAM<br /><span>COM UM OI.</span></h1>
      <p>Me conta o que você tem em mente.<br />O resto a gente constrói na conversa.</p>
      <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="text-link">{site.instagramHandle}<Arrow /></a>
      <Asterisk className="contact-page-star" />
    </div><div className="contact-form-wrap" data-fade>
      <form onSubmit={prepare} className="contact-form">
        <label htmlFor="name"><span className="mono">01 / COMO VOCÊ SE CHAMA?</span><input id="name" name="name" autoComplete="name"
          placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} required maxLength={80} pattern=".*\S.*" /></label>
        <label htmlFor="subject"><span className="mono">02 / QUAL É A IDEIA?</span><select id="subject" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
          {['Design visual', 'Desenvolvimento web', 'Identidade visual', 'Uma colaboração', 'Outra ideia'].map((item) => <option key={item}>{item}</option>)}
        </select></label>
        <label htmlFor="message"><span className="mono">03 / ME CONTA UM POUCO MAIS</span><textarea id="message" name="message"
          placeholder="O que você quer tirar do papel?" rows={4} value={message} onChange={(e) => {
            setMessage(e.target.value);
            e.target.setCustomValidity(e.target.value.length >= 20 && e.target.value.trim().length < 20 ? 'Conte um pouco mais, usando pelo menos 20 caracteres além dos espaços nas pontas.' : '');
          }}
          required minLength={20} maxLength={3000} aria-describedby="message-help" /></label>
        <span id="message-help" className="field-hint">Pelo menos 20 caracteres. Uma ideia simples já vale.</span>
        <Magnetic><button className="fill-button" type="submit" data-burst data-cursor="LINK"><span>Preparar mensagem</span><Arrow /></button></Magnetic>
        <p className="form-note">A mensagem fica pronta aqui. Depois, é só copiar e me enviar pelo Instagram.</p>
      </form>
      {draft && <div className="message-preview"><span className="mono">PRONTO. AGORA É COM A GENTE.</span>
        <label className="sr-only" htmlFor="prepared-message">Mensagem pronta para copiar</label>
        <textarea ref={preview} id="prepared-message" readOnly value={draft} rows={6} />
        <div className="message-actions"><button onClick={copy} className="fill-button" data-burst><span>{copied ? 'Mensagem copiada!' : 'Copiar mensagem'}</span><Arrow /></button>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="text-link">Abrir Instagram<Arrow /></a>
          {site.email && <a href={`mailto:${site.email}?subject=${encodeURIComponent(`Portfólio — ${subject}`)}&body=${encodeURIComponent(draft)}`} className="text-link">Enviar por e-mail<Arrow /></a>}
        </div>
        <p role="status">{copyError ? 'Não foi possível copiar automaticamente. O texto está selecionado: copie e cole no Instagram.' : copied ? 'Copiado! Abra o Instagram e cole na conversa.' : 'Sua mensagem está preparada. Ela ainda não foi enviada.'}</p>
      </div>}
    </div></div>
    <div className="footer-bottom mono"><span>© {new Date().getFullYear()} LEONARDO CARVALHO</span><a href={site.github} target="_blank" rel="noopener noreferrer">GITHUB ↗</a><span>SÃO PAULO, BRASIL</span></div>
  </div>;
}
