import { useApp } from '../../context/AppContext';
import { SERVICES } from '../../data/catalog';
import { brl, slugify } from '../../lib/format';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import './sections.css';

const FEATURES = [
  'Fotos do espaço e dos cortes, serviços e preços sempre atualizados',
  'Localização com mapa e rota em um toque',
  'Avaliações dos clientes em destaque',
  'Preparado pro Google: SEO local e Perfil da Empresa',
  'Botões de WhatsApp e “Agendar” sempre à mão',
];

const REVIEWS = [
  { text: 'Melhor degradê da região, atendimento nota 10.', who: 'Lucas' },
  { text: 'Agendei pelo site em 1 minuto.', who: 'Rafael' },
  { text: 'Ambiente top e pontualidade.', who: 'André' },
];

export function SiteDemo() {
  const { shop } = useApp();

  return (
    <section className="section" id="site" aria-labelledby="site-title">
      <div className="container demo-grid">
        <Reveal className="demo-copy">
          <p className="eyebrow">
            <span className="num">01</span>Site profissional
          </p>
          <h2 id="site-title">
            Quem procura “barbearia perto de mim” precisa achar <span className="gold">vocês</span>.
          </h2>
          <p className="lead">
            Um site rápido, bonito e feito pro celular, com tudo que o cliente quer ver antes de escolher onde cortar.
          </p>
          <ul className="checks">
            {FEATURES.map((f) => (
              <li key={f}>
                <Icon name="check" />
                {f}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="browser" delay={120}>
          <div className="browser-bar" aria-hidden="true">
            <span className="dots">
              <i />
              <i />
              <i />
            </span>
            <span className="url">
              <Icon name="globe" />
              {slugify(shop)}.com.br
            </span>
          </div>
          <div className="mini-site" role="img" aria-label={`Exemplo de site da ${shop} com serviços, preços, mapa e avaliações`}>
            <div className="ms-hero">
              <span className="ms-badge">Exemplo de site</span>
              <b className="ms-title">{shop}</b>
              <span className="ms-sub">Corte, barba e cuidado de verdade</span>
              <span className="ms-cta">
                <Icon name="calendar" /> Agendar horário
              </span>
            </div>
            <div className="ms-body">
              <div className="ms-col">
                <p className="ms-h">Serviços</p>
                <ul className="ms-prices">
                  {SERVICES.filter((s) => s.id !== 'sobrancelha').map((s) => (
                    <li key={s.id}>
                      <span>{s.name}</span>
                      <i />
                      <b>{brl(s.price).replace(',00', '')}</b>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ms-col">
                <p className="ms-h">Onde estamos</p>
                <svg className="ms-map" viewBox="0 0 200 110">
                  <rect width="200" height="110" rx="8" fill="#211d17" />
                  <path d="M0 70 L200 40" stroke="#3a3328" strokeWidth="10" />
                  <path d="M60 0 L90 110" stroke="#3a3328" strokeWidth="8" />
                  <path d="M140 0 L130 110" stroke="#2d281f" strokeWidth="5" />
                  <path d="M0 25 L200 95" stroke="#2d281f" strokeWidth="4" />
                  <rect x="12" y="80" width="30" height="20" rx="3" fill="#1f3326" />
                  <rect x="150" y="10" width="38" height="22" rx="3" fill="#1f3326" />
                  <g transform="translate(100 28)">
                    <ellipse cx="0" cy="28" rx="12" ry="4" fill="#000" opacity=".35" />
                    <path className="map-pin" d="M0 26 C-10 14 -10 4 -10 0 a10 10 0 0 1 20 0 c0 4 0 14 -10 26z" fill="#c9a24b" />
                    <circle cx="0" cy="0" r="4" fill="#0e0d0b" />
                  </g>
                </svg>
                <span className="ms-addr">
                  <Icon name="pin" />
                  Rua Exemplo, 123 · Centro
                </span>
              </div>
            </div>
            <div className="ms-reviews">
              <div className="ms-rating">
                <b>4,9</b>
                <span className="stars">★★★★★</span>
                <small>avaliações de exemplo</small>
              </div>
              <div className="ms-rev-list">
                {REVIEWS.map((r) => (
                  <p key={r.who}>
                    “{r.text}” <small>— {r.who}</small>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
