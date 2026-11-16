import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getBarber, getService } from '../../data/catalog';
import { fromMinutes, toMinutes } from '../../lib/dates';
import { firstName, slugify } from '../../lib/format';
import { prefersReducedMotion } from '../../lib/whatsapp';
import { Icon } from '../ui/Icon';

type Lead = 24 | 2;

interface Msg {
  id: number;
  from: 'bot' | 'me';
  text: string;
  time: string;
}

/** Chat estilo WhatsApp que mostra o lembrete automático do último agendamento. */
export function ReminderChat() {
  const { bookings, shop } = useApp();
  const [lead, setLead] = useState<Lead>(24);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [round, setRound] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);

  const latest = bookings[bookings.length - 1];
  const ctx = useMemo(() => {
    if (!latest) return { name: 'Carlos', service: 'Corte + Barba', barber: 'Rafael', time: '15:30', sample: true };
    return {
      name: firstName(latest.name) || 'cliente',
      service: getService(latest.serviceId).name,
      barber: getBarber(latest.barberId).name,
      time: latest.time,
      sample: false,
    };
  }, [latest]);

  const sentAt = lead === 24 ? ctx.time : fromMinutes(Math.max(0, toMinutes(ctx.time) - 120));

  const reminderText =
    lead === 24
      ? `Olá, ${ctx.name}! 👋 Passando pra lembrar do seu horário amanhã às ${ctx.time} com o ${ctx.barber} (${ctx.service}) na ${shop}.\n\nResponda 1 para confirmar ou 2 para remarcar.`
      : `Oi, ${ctx.name}! Seu horário na ${shop} é daqui a 2 horas, às ${ctx.time}, com o ${ctx.barber}. ✂️\n\nResponda 1 para confirmar ou 2 para remarcar.`;

  /* Reinicia a conversa quando muda o agendamento, a antecedência ou o nome. */
  useEffect(() => {
    window.clearTimeout(timer.current);
    setMsgs([{ id: 1, from: 'bot', text: reminderText, time: sentAt }]);
    setTyping(false);
    setAnswered(false);
  }, [reminderText, sentAt, round]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, typing]);

  const reply = useCallback(
    (choice: '1' | '2') => {
      if (answered) return;
      setAnswered(true);
      const now = fromMinutes(Math.min(23 * 60 + 59, toMinutes(sentAt) + 1));
      setMsgs((m) => [...m, { id: m.length + 1, from: 'me', text: choice, time: now }]);
      setTyping(true);
      const answer =
        choice === '1'
          ? `Confirmado ✅ Te esperamos às ${ctx.time}. Se surgir algum imprevisto, é só avisar por aqui.`
          : `Sem problema! Escolha um novo horário por este link: ${slugify(shop)}.com.br/agendar 📅`;
      timer.current = window.setTimeout(
        () => {
          setTyping(false);
          setMsgs((m) => [...m, { id: m.length + 1, from: 'bot', text: answer, time: now }]);
        },
        prefersReducedMotion() ? 0 : 1100,
      );
    },
    [answered, ctx.time, sentAt, shop],
  );

  return (
    <>
      <p className="eyebrow">
        <span className="num">03</span>Lembretes automáticos
      </p>
      <h3 id="lembretes-title">O WhatsApp avisa por vocês</h3>
      <p className="muted">
        Aviso automático antes do horário, com confirmação em um toque. Menos falta, menos cadeira vazia.
        {ctx.sample ? ' Faça um agendamento ao lado e veja o lembrete mudar.' : ''}
      </p>

      <div className="seg" role="group" aria-label="Quando enviar o lembrete">
        {([24, 2] as Lead[]).map((l) => (
          <button key={l} type="button" aria-pressed={lead === l} onClick={() => setLead(l)}>
            {l}h antes
          </button>
        ))}
      </div>

      <div className="wa-phone">
        <div className="wa-head">
          <span className="wa-av" aria-hidden="true">
            {shop.charAt(0).toUpperCase()}
          </span>
          <div>
            <b>{shop}</b>
            <small>{typing ? 'digitando…' : 'conta comercial'}</small>
          </div>
        </div>
        <div className="wa-body" ref={bodyRef} aria-live="polite">
          <span className="wa-day">{lead === 24 ? 'Ontem' : 'Hoje'}</span>
          {msgs.map((m) => (
            <div key={m.id} className={`bubble ${m.from}`}>
              <span className="bubble-text">{m.text}</span>
              <span className="bubble-time">
                {m.time}
                {m.from === 'me' && <span className="ticks" aria-label="lida">✓✓</span>}
              </span>
            </div>
          ))}
          {typing && (
            <div className="bubble bot typing" aria-label="digitando">
              <i />
              <i />
              <i />
            </div>
          )}
        </div>
        <div className="wa-replies">
          <button type="button" disabled={answered} onClick={() => reply('1')}>
            1 · Confirmar
          </button>
          <button type="button" disabled={answered} onClick={() => reply('2')}>
            2 · Remarcar
          </button>
        </div>
      </div>

      <button type="button" className="btn btn-ghost btn-sm" onClick={() => setRound((r) => r + 1)}>
        <Icon name="bell" /> Reenviar demonstração
      </button>
    </>
  );
}
