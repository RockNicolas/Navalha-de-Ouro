import { useApp } from '../../context/AppContext';
import { Icon, type IconName } from '../ui/Icon';
import './hero.css';

const CHIPS: { icon: IconName; label: string }[] = [
  { icon: 'globe', label: 'Site' },
  { icon: 'calendar', label: 'Agendamento' },
  { icon: 'bell', label: 'WhatsApp' },
  { icon: 'chart', label: 'Gestão' },
  { icon: 'card', label: 'Fidelidade' },
];

export function Hero() {
  const { shop } = useApp();

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="pole-dot" aria-hidden="true" />
            Rock Software Solutions · Tecnologia para barbearias
          </p>
          <h1 id="hero-title">
            Sua barbearia <em>lotada</em>.<br />
            Sua agenda <em>no automático</em>.
          </h1>
          <p className="lead">
            Site profissional, agendamento online, lembretes por WhatsApp, gestão completa e clube de assinatura.
            Tudo pensado pra rotina da <strong>{shop}</strong>, e dá pra testar cada parte aqui mesmo.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-gold" href="#site">
              Ver na prática <Icon name="arrow" />
            </a>
            <a className="btn btn-ghost" href="#contato">
              Quero para minha barbearia
            </a>
          </div>
          <ul className="chips" aria-label="O que está incluso">
            {CHIPS.map((c) => (
              <li key={c.label}>
                <Icon name={c.icon} />
                {c.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="pole-bar" />
          <div className="phone">
            <div className="phone-notch" />
            <div className="phone-screen">
              <div className="ps-head">
                <span className="ps-logo">{shop.charAt(0).toUpperCase()}</span>
                <div>
                  <b>{shop}</b>
                  <small>Agendar horário</small>
                </div>
              </div>
              <p className="ps-label">Serviço</p>
              <div className="ps-chips">
                <span>Corte</span>
                <span className="on">Corte + Barba</span>
                <span>Barba</span>
              </div>
              <p className="ps-label">Profissional</p>
              <div className="ps-barbers">
                <span className="av" style={{ ['--hue' as string]: 38 }}>R</span>
                <span className="av on" style={{ ['--hue' as string]: 4 }}>D</span>
                <span className="av" style={{ ['--hue' as string]: 212 }}>T</span>
              </div>
              <p className="ps-label">Horário · amanhã</p>
              <div className="ps-slots">
                <span>09:00</span>
                <span className="off">09:30</span>
                <span>10:00</span>
                <span className="off">13:30</span>
                <span className="on">15:30</span>
                <span>16:00</span>
              </div>
              <span className="ps-btn">Confirmar agendamento</span>
            </div>
          </div>
          <div className="float-card fc-1">
            <span className="fc-ico wa">
              <Icon name="wa" />
            </span>
            <div>
              <b>Lembrete enviado</b>
              <small>Amanhã, 15:30 · confirmado ✓</small>
            </div>
          </div>
          <div className="float-card fc-2">
            <span className="fc-ico gold">
              <Icon name="gift" />
            </span>
            <div>
              <b>Cartão fidelidade</b>
              <small>9 de 10 · falta 1 pro corte grátis</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
