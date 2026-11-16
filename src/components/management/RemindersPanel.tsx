import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getBarber, getService } from '../../data/catalog';
import { dayLabel } from '../../lib/dates';
import { firstName } from '../../lib/format';
import { Icon } from '../ui/Icon';

type ReminderStatus = 'scheduled' | 'sent' | 'confirmed' | 'rescheduled';
const STATUS: Record<ReminderStatus, { label: string; cls: string }> = {
  scheduled: { label: 'agendado', cls: 'st-next' },
  sent: { label: 'enviado', cls: 'st-done' },
  confirmed: { label: 'confirmado', cls: 'st-now' },
  rescheduled: { label: 'remarcou', cls: 'st-warn' },
};

const SAMPLE = [
  { client: 'Carlos Mendes', info: 'Corte + Barba · hoje 15:30', status: 'confirmed' as ReminderStatus },
  { client: 'Gustavo Reis', info: 'Barba · hoje 16:30', status: 'confirmed' as ReminderStatus },
  { client: 'Pedro Nunes', info: 'Corte · hoje 17:30', status: 'sent' as ReminderStatus },
  { client: 'Bruno Alves', info: 'Corte · amanhã 10:00', status: 'rescheduled' as ReminderStatus },
];

const AUTOMATIONS = [
  { id: 'r24', label: 'Lembrete 24h antes do horário', on: true },
  { id: 'r2', label: 'Lembrete 2h antes do horário', on: true },
  { id: 'bday', label: 'Mensagem de aniversário com cupom', on: true },
  { id: 'away', label: 'Cliente sumido há 30 dias: convite para voltar', on: false },
];

export function RemindersPanel() {
  const { bookings } = useApp();
  const [auto, setAuto] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(AUTOMATIONS.map((a) => [a.id, a.on])),
  );

  return (
    <>
      <div className="panel-head">
        <h3>Lembretes no WhatsApp</h3>
        <span className="muted small">Enviados sozinhos, sem ninguém da equipe digitar</span>
      </div>

      <div className="rem-grid">
        <div>
          <p className="rem-sub">Próximos envios</p>
          <ul className="rem-list">
            {[...bookings].reverse().map((b) => (
              <li key={b.id} className="rem is-new">
                <Icon name="wa" />
                <span className="rem-main">
                  <b>{firstName(b.name)}</b>
                  <small>
                    {getService(b.serviceId).name} com {getBarber(b.barberId).name} · {dayLabel(b.date)} {b.time}
                  </small>
                </span>
                <span className={`st ${STATUS.scheduled.cls}`}>{STATUS.scheduled.label}</span>
              </li>
            ))}
            {SAMPLE.map((r) => (
              <li key={r.client} className="rem">
                <Icon name="wa" />
                <span className="rem-main">
                  <b>{r.client}</b>
                  <small>{r.info}</small>
                </span>
                <span className={`st ${STATUS[r.status].cls}`}>{STATUS[r.status].label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="rem-sub">Automações</p>
          <ul className="rem-auto">
            {AUTOMATIONS.map((a) => (
              <li key={a.id}>
                <label className="switch">
                  <input
                    type="checkbox"
                    role="switch"
                    checked={auto[a.id]}
                    onChange={(e) => setAuto((s) => ({ ...s, [a.id]: e.target.checked }))}
                  />
                  <span className="switch-track" aria-hidden="true" />
                  <span>{a.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
