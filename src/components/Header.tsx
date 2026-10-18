import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Magnetic } from './Magnetic';
import { Arrow } from './Icons';
import { useMotionSettings } from './MotionProvider';
import { wipeEase } from '../lib/motion';

const links = [{ id: 'sobre', text: 'Sobre' }, { id: 'trabalhos', text: 'Trabalhos' }, { id: 'contato', text: 'Contato' }];

export function Header() {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const { reduced, ready, scrollTo } = useMotionSettings();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const first = dialog.current?.querySelector<HTMLAnchorElement>('a');
    first?.focus();
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
      if (event.key !== 'Tab') return;
      const items = [toggle.current, ...Array.from(dialog.current?.querySelectorAll<HTMLAnchorElement>('a') || [])].filter(Boolean) as HTMLElement[];
      if (event.shiftKey && document.activeElement === items[0]) { event.preventDefault(); items.at(-1)?.focus(); }
      else if (!event.shiftKey && document.activeElement === items.at(-1)) { event.preventDefault(); items[0]?.focus(); }
    };
    document.addEventListener('keydown', keyboard);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', keyboard); };
  }, [open]);

  function visit(id: string) {
    setOpen(false);
    if (location.pathname !== '/') navigate(`/#${id}`);
    else {
      scrollTo(`#${id}`);
      const heading = document.querySelector<HTMLElement>(`#${id} h2`);
      heading?.focus({ preventScroll: true });
    }
  }

  return <>
    <header className="header" inert={!ready}>
      <Link to="/" className="brand" aria-label="Leonardo Carvalho, início" data-cursor="LINK"
        onClick={() => { setOpen(false); if (location.pathname === '/') scrollTo(0); }}>
        <span className="brand-mark">lc<span>↗</span></span>
        <span className="brand-name">LEONARDO<br />CARVALHO</span>
      </Link>
      <div className="header-note mono"><span className="status-dot" />DISPONÍVEL PARA IDEIAS</div>
      <nav className="desktop-nav" aria-label="Navegação principal">
        {links.map((link, i) => <Magnetic key={link.id}>
          <a href={`/#/#${link.id}`} onClick={(event) => { event.preventDefault(); visit(link.id); }} data-cursor="LINK">
            <sup>0{i + 1}</sup>{link.text}{link.id === 'contato' && <Arrow />}
          </a>
        </Magnetic>)}
      </nav>
      <button ref={toggle} className={`menu-toggle ${open ? 'is-open' : ''}`} aria-expanded={open}
        aria-controls="mobile-menu" aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={() => setOpen(!open)}>
        <span /><span />
      </button>
    </header>
    <AnimatePresence>
      {open && <motion.div id="mobile-menu" ref={dialog} className="mobile-menu" role="dialog" aria-label="Menu" aria-modal="true"
        initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }}
        transition={{ duration: reduced ? 0 : 0.55, ease: wipeEase }}>
        <nav aria-label="Navegação móvel">{links.map((link, i) => <a key={link.id} href={`/#/#${link.id}`}
          onClick={(event) => { event.preventDefault(); visit(link.id); }}><sup>0{i + 1}</sup>{link.text}<Arrow /></a>)}</nav>
        <span className="mono">DA ZONA LESTE PARA A TELA.</span>
      </motion.div>}
    </AnimatePresence>
  </>;
}
