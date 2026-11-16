import { ROCK_MESSAGE, ROCK_WHATSAPP, SHOP, SHOP_MESSAGE } from '../../config';
import { HOURS } from '../../data/shop';
import { waUrl } from '../../lib/whatsapp';
import { Icon } from '../ui/Icon';
import { Brand } from './Brand';
import './layout.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="pole-divider" aria-hidden="true" />
      <div className="container footer-grid">
        <div className="footer-brand">
          <Brand />
          <p className="muted small">Corte, barba e cuidado de verdade desde {SHOP.since}.</p>
          <span className="footer-ig">
            <Icon name="instagram" />
            {SHOP.instagram}
          </span>
        </div>

        <div>
          <p className="footer-h">Onde estamos</p>
          <p className="muted small">
            {SHOP.address}
            <br />
            {SHOP.district}
          </p>
        </div>

        <div>
          <p className="footer-h">Horários</p>
          <ul className="footer-list muted small">
            {HOURS.map((h) => (
              <li key={h.label}>
                {h.label}: {h.time}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="footer-h">Atalhos</p>
          <ul className="footer-list small">
            <li>
              <a href="#agendar">Agendar horário</a>
            </li>
            <li>
              <a href="#clube">Clube de assinatura</a>
            </li>
            <li>
              <a href={waUrl(SHOP.whatsapp, SHOP_MESSAGE)} target="_blank" rel="noopener noreferrer">
                WhatsApp da barbearia
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="muted small">
            © {new Date().getFullYear()} {SHOP.fullName}. Barbearia fictícia, criada para demonstração.
          </p>
          <a className="rock-credit" href={waUrl(ROCK_WHATSAPP, ROCK_MESSAGE)} target="_blank" rel="noopener noreferrer">
            <span>
              Site, agendamento e sistema por <b>Rock Software Solutions</b>
            </span>
            <Icon name="arrow" />
          </a>
        </div>
      </div>
    </footer>
  );
}
