import { useLayoutEffect, useRef } from 'react';
import { gsap, SplitText } from '../lib/motion';
import { useMotionSettings } from './MotionProvider';
import { Asterisk } from './Icons';

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const text = useRef<HTMLParagraphElement>(null);
  const { reduced, ready } = useMotionSettings();
  useLayoutEffect(() => {
    if (reduced || !ready || !text.current) return;
    const ctx = gsap.context(() => {
      SplitText.create(text.current, { type: 'words', onSplit(split) {
        return gsap.fromTo(split.words, { opacity: 0.22 }, {
          opacity: 1, stagger: 0.2, ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top 65%', end: 'bottom 75%', scrub: true },
        });
      } });
    }, ref);
    return () => ctx.revert();
  }, [reduced, ready]);
  return <section ref={ref} className="manifesto section-pad" aria-labelledby="manifesto-heading">
    <div className="section-label mono"><h2 id="manifesto-heading">03 / NOTA PESSOAL</h2><span>SEM FÓRMULA PRONTA.</span></div>
    <div className="manifesto-body"><Asterisk className="manifesto-star" data-parallax="25" />
      <p ref={text}>O que me interessa<br />é o encontro entre<br /><span>o que funciona</span><br />e o que faz sentir.</p>
      <span className="manifesto-signature">Leo Carvalho</span>
    </div>
    <div className="manifesto-bottom mono"><span>OLHAR. QUESTIONAR. FAZER. REFAZER.</span><span>É ASSIM QUE EU CRIO. ↗</span></div>
  </section>;
}
