import { SHOP, SHOP_MESSAGE } from '../../config';
import { AMENITIES, HOURS } from '../../data/shop';
import { useNow } from '../../hooks/useNow';
import { openStatus } from '../../lib/hours';
import { waUrl } from '../../lib/whatsapp';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import { SectionHead } from '../ui/SectionHead';
import './sections.css';

export function Location() {
  const now = useNow();
  const status = openStatus(now);
  const today = now.getDay();
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${SHOP.address}, ${SHOP.district}`)}`;

  return (
    <section className="section" id="contato" aria-labelledby="contato-title">
      <div className="container">
        <SectionHead id="contato-title" eyebrow="Localização e horários" title="Passa aqui na barbearia" />
        <div className="location">
          <Reveal className="map-card">
            <svg className="map" viewBox="0 0 400 230" aria-hidden="true">
              <rect width="400" height="230" fill="#1a1712" />
              <path d="M0 150 L400 80" stroke="#2e281f" strokeWidth="18" />
              <path d="M120 0 L180 230" stroke="#2e281f" strokeWidth="14" />
              <path d="M300 0 L280 230" stroke="#26211a" strokeWidth="9" />
              <path d="M0 50 L400 200" stroke="#26211a" strokeWidth="7" />
              <rect x="20" y="170" width="70" height="44" rx="6" fill="#1d2e22" />
              <rect x="310" y="16" width="74" height="40" rx="6" fill="#1d2e22" />
              <rect x="215" y="140" width="50" height="30" rx="4" fill="#221e18" />
              <g transform="translate(204 64)">
                <ellipse cx="0" cy="44" rx="18" ry="6" fill="#000" opacity="0.45" />
                <circle cx="0" cy="0" r="34" fill="#c9a24b" opacity="0.12" className="map-pulse" />
                <path className="map-pin" d="M0 42 C-16 22 -16 8 -16 0 a16 16 0 0 1 32 0 c0 8 0 22 -16 42z" fill="#c9a24b" />
                <circle cx="0" cy="0" r="6" fill="#0e0d0b" />
              </g>
            </svg>
            <div className="map-info">
              <b>{SHOP.fullName}</b>
              <span className="muted">
                {SHOP.address} · {SHOP.district}
              </span>
              <div className="map-actions">
                <a className="btn btn-gold btn-sm" href={mapsUrl} target="_blank" rel="noopener noreferrer">
                  <Icon name="navigation" /> Como chegar
                </a>
                <a className="btn btn-ghost btn-sm" href={waUrl(SHOP.whatsapp, SHOP_MESSAGE)} target="_blank" rel="noopener noreferrer">
                  <Icon name="wa" /> WhatsApp
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal className="hours-card" delay={120}>
            <p className={`open-status ${status.open ? 'is-open' : 'is-closed'}`}>
              <span className="dot" aria-hidden="true" />
              {status.text}
            </p>
            <table className="hours">
              <caption className="sr-only">Horário de funcionamento</caption>
              <tbody>
                {HOURS.map((h) => {
                  const isToday = h.days.includes(today);
                  return (
                    <tr key={h.label} className={isToday ? 'today' : undefined}>
                      <th scope="row">
                        {h.label}
                        {isToday && <span className="today-tag">hoje</span>}
                      </th>
                      <td>{h.time}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <ul className="amenities" aria-label="Comodidades">
              {AMENITIES.map((a) => (
                <li key={a}>
                  <Icon name="check" />
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
