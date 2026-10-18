import { useRef } from 'react';
import { Hero } from '../components/Hero';
import { Marquee } from '../components/Marquee';
import { About } from '../components/About';
import { Works } from '../components/Works';
import { Manifesto } from '../components/Manifesto';
import { Contact } from '../components/Contact';
import { useScrollTL } from '../hooks/useScrollTL';

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollTL(ref);
  return <div ref={ref}><Hero /><Marquee /><About /><Works /><Manifesto /><Contact /></div>;
}
