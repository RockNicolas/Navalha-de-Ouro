import { DOW_LONG, fromMinutes } from './dates';

/** Horário de funcionamento em minutos (null = fechado). Mesma regra usada nos horários do agendamento. */
export function hoursFor(dow: number): { open: number; close: number } | null {
  if (dow === 0) return null;
  return { open: 9 * 60, close: dow === 6 ? 16 * 60 : 19 * 60 };
}

export function openStatus(now: Date): { open: boolean; text: string } {
  const mins = now.getHours() * 60 + now.getMinutes();
  const today = hoursFor(now.getDay());

  if (today && mins >= today.open && mins < today.close) {
    return { open: true, text: `Aberto agora · fecha às ${fromMinutes(today.close)}` };
  }
  if (today && mins < today.open) {
    return { open: false, text: `Fechado · abre hoje às ${fromMinutes(today.open)}` };
  }
  for (let i = 1; i <= 7; i++) {
    const dow = (now.getDay() + i) % 7;
    const h = hoursFor(dow);
    if (h) return { open: false, text: `Fechado · abre ${i === 1 ? 'amanhã' : DOW_LONG[dow]} às ${fromMinutes(h.open)}` };
  }
  return { open: false, text: 'Fechado' };
}
