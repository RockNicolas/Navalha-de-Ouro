import { useEffect, useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getBarber, getService } from '../../data/catalog';
import { SAMPLE_AGENDA } from '../../data/demo';
import { dayLabel, toMinutes } from '../../lib/dates';
import { brl } from '../../lib/format';
import type { BarberId } from '../../types';
import { Avatar } from '../ui/Avatar';

type Status = 'done' | 'now' | 'next';
const STATUS_LABEL: Record<Status, string> = { done: 'concluído', now: 'em andamento', next: 'próximo' };

/** Minutos desde a meia-noite, atualizado a cada minuto. */
function useNowMinutes(): number {
  const read = () => {
    const d = new Date();
    return d.getHours() * 60 + d.getMinutes();
  };
  const [now, setNow] = useState(read);
  useEffect(() => {
    const id = window.setInterval(() => setNow(read()), 60_000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

export function AgendaPanel({ barberId }: { barberId?: BarberId }) {
  const { bookings } = useApp();
  const now = useNowMinutes();

  const online = useMemo(
    () =>
      bookings
        .filter((b) => !barberId || b.barberId === barberId)
        .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)),
    [bookings, barberId],
  );
  const agenda = barberId ? SAMPLE_AGENDA.filter((a) => a.barberId === barberId) : SAMPLE_AGENDA;

  return (
    <>
      <div className="panel-head">
        <h3>{barberId ? 'Minha agenda de hoje' : 'Agenda de hoje'}</h3>
        <div className="legend" aria-hidden="true">
          <span className="st st-done">concluído</span>
          <span className="st st-now">em andamento</span>
          <span className="st st-next">próximo</span>
        </div>
      </div>

      {online.length > 0 && (
        <div className="agenda-new">
          <p className="agenda-new-title">
            <span className="pulse" aria-hidden="true" /> Agendados pelo site agora há pouco
          </p>
          <ul className="agenda">
            {online.map((b) => {
              const s = getService(b.serviceId);
              const barber = getBarber(b.barberId);
              return (
                <li key={b.id} className="agenda-item is-new">
                  <span className="ag-time">
                    {b.time}
                    <small>{dayLabel(b.date)}</small>
                  </span>
                  <span className="ag-main">
                    <b>{b.name}</b>
                    <small>
                      {s.name} · {brl(s.price)}
                    </small>
                  </span>
                  <span className="ag-barber">
                    <Avatar name={barber.name} hue={barber.hue} size="sm" />
                    <span>{barber.name}</span>
                  </span>
                  <span className="badge-new">novo · online</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <ul className="agenda">
        {agenda.map((a) => {
          const s = getService(a.serviceId);
          const barber = getBarber(a.barberId);
          const start = toMinutes(a.time);
          const status: Status = now >= start + s.minutes ? 'done' : now >= start ? 'now' : 'next';
          return (
            <li key={a.time + a.client} className={`agenda-item st-${status}`}>
              <span className="ag-time">{a.time}</span>
              <span className="ag-main">
                <b>{a.client}</b>
                <small>
                  {s.name} · {brl(s.price)}
                </small>
              </span>
              <span className="ag-barber">
                <Avatar name={barber.name} hue={barber.hue} size="sm" />
                <span>{barber.name}</span>
              </span>
              <span className={`st st-${status}`}>{STATUS_LABEL[status]}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
