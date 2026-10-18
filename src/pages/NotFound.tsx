import { Link } from 'react-router-dom';
import { Arrow, Asterisk } from '../components/Icons';

export default function NotFound() {
  return <section className="not-found section-pad"><span className="mono">ERRO 404 / FORA DO MAPA</span><h1 tabIndex={-1}>ESSA IDEIA<br />NÃO TÁ AQUI.</h1>
    <Asterisk /><p>Talvez o endereço tenha mudado. O arquivo continua aberto.</p><Link className="fill-button" to="/"><span>Voltar ao início</span><Arrow /></Link></section>;
}
