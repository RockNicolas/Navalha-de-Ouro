import { useMemo } from 'react';
import { SHOP } from '../../config';
import { useApp } from '../../context/AppContext';
import { useNow } from '../../hooks/useNow';
import { dayLabel } from '../../lib/dates';
import { openStatus } from '../../lib/hours';
import { nextFreeSlot } from '../../lib/slots';
import { Icon } from '../ui/Icon';
import { Emblem } from './Emblem';
import './hero.css';

export function Hero() {
  const { bookings, requestBooking } = useApp();
  const now = useNow();
  const status = openStatus(now);
  /* Recalcula a cada minuto (now) e a cada novo agendamento. */
  const next = useMemo(() => nextFreeSlot(bookings), [bookings, now]);

  return (
    <section className="hero" id="topo" aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="pole-dot" aria-hidden="true" />
            Barbearia · desde {SHOP.since} · {SHOP.district}
          </p>
          <h1 id="hero-title">
            Corte na régua, <em>barba no capricho</em>.
          </h1>
          <p className="lead">
            Escolha o serviço, o barbeiro e o horário pelo celular, receba o lembrete no WhatsApp e ganhe corte grátis
            no cartão fidelidade. Simples assim na {SHOP.name}.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-gold" href="#agendar">
              <Icon name="calendar" /> Agendar horário
            </a>
            <a className="btn btn-ghost" href="#servicos">
              Ver serviços e preços
            </a>
          </div>
          <ul className="hero-meta">
            <li>
              <span className="stars" aria-hidden="true">★★★★★</span>
              <span>
                <b>{SHOP.rating.toLocaleString('pt-BR')}</b> · {SHOP.reviewCount} avaliações no Google
              </span>
            </li>
            <li className={status.open ? 'is-open' : 'is-closed'}>
              <span className="dot" aria-hidden="true" />
              {status.text}
            </li>
            <li>
              <Icon name="pin" />
              {SHOP.address} · {SHOP.district}
            </li>
          </ul>
        </div>

        <div className="hero-visual">
          <div className="pole-bar" aria-hidden="true" />
          <Emblem />
          {next && (
            <button
              type="button"
              className="float-card fc-next"
              onClick={() => requestBooking()}
              aria-label={`Próximo horário livre: ${dayLabel(next.date)} às ${next.time}. Agendar`}
            >
              <span className="fc-ico gold">
                <Icon name="clock" />
              </span>
              <span>
                <b>Próximo horário livre</b>
                <small>
                  {dayLabel(next.date)} às {next.time} · agendar
                </small>
              </span>
            </button>
          )}
          <div className="float-card fc-wa" aria-hidden="true">
            <span className="fc-ico wa">
              <Icon name="wa" />
            </span>
            <span>
              <b>Lembrete no WhatsApp</b>
              <small>Seu horário é amanhã às 15:30 ✓</small>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
