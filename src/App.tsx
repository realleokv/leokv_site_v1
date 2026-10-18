
import { HashRouter } from 'react-router-dom';
import { MotionProvider } from './components/MotionProvider';
import { Header } from './components/Header';
import { Cursor } from './components/Cursor';
import { ClickEffects } from './components/ClickEffects';
import { Preloader } from './components/Preloader';
import { RouteTransition } from './components/RouteTransition';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  return (
    <HashRouter>
      <MotionProvider>
        <a
          className="skip-link"
          href="#main-content"
          onClick={(event) => {
            event.preventDefault();
            document.getElementById('main-content')?.focus();
          }}
        >
          Pular para o conteúdo
        </a>

        <Header />
        <RouteTransition />
        <Cursor />
        <ClickEffects />
        <Preloader />

        <div className="grain" aria-hidden="true" />

        <Analytics />
      </MotionProvider>
    </HashRouter>
  );
}
