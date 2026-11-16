import type { Barber, Booking, Service } from '../types';
import { fromIso, toMinutes } from './dates';
import { pad, slugify } from './format';

const local = (d: Date) =>
  `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

const utc = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

const esc = (s: string) =>
  s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');

/** Gera e baixa um arquivo .ics (calendário) com lembrete 2h antes. */
export function downloadIcs(booking: Booking, service: Service, barber: Barber, shop: string): void {
  const start = fromIso(booking.date);
  start.setMinutes(toMinutes(booking.time));
  const end = new Date(start.getTime() + service.minutes * 60_000);

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Rock Software Solutions//Agendamento//PT-BR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${booking.id}@rocksoftware.demo`,
    `DTSTAMP:${utc(new Date())}`,
    `DTSTART:${local(start)}`,
    `DTEND:${local(end)}`,
    `SUMMARY:${esc(`${service.name} com ${barber.name} · ${shop}`)}`,
    `DESCRIPTION:${esc(`Agendamento feito online para ${booking.name}.`)}`,
    `LOCATION:${esc(shop)}`,
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'ACTION:DISPLAY',
    `DESCRIPTION:${esc(`Seu horário na ${shop}`)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  const blob = new Blob([lines.join('\r\n') + '\r\n'], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `agendamento-${slugify(shop)}-${booking.date}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
