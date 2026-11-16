import { BARBERS } from '../data/catalog';
import type { BarberChoice, BarberId, Booking } from '../types';
import { fromMinutes, toIso, upcomingDays } from './dates';
import { hoursFor } from './hours';

const LUNCH_START = 12 * 60;
const LUNCH_END = 13 * 60;
const STEP = 30;
/** Antecedência mínima para agendar no mesmo dia (minutos). */
const MIN_NOTICE = 30;

export const isClosed = (d: Date): boolean => hoursFor(d.getDay()) === null;

/** Hash FNV-1a: gera horários "ocupados" sempre iguais para a mesma data. */
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function isTaken(dateIso: string, barberId: BarberId, time: string, bookings: Booking[]): boolean {
  if (hash(`${dateIso}|${barberId}|${time}`) % 100 < 32) return true;
  return bookings.some((b) => b.date === dateIso && b.time === time && b.barberId === barberId);
}

export interface Slot {
  time: string;
  available: boolean;
  past: boolean;
}

export function slotsFor(date: Date, barber: BarberChoice, bookings: Booking[]): Slot[] {
  const hours = hoursFor(date.getDay());
  if (!hours) return [];
  const iso = toIso(date);
  const now = new Date();
  const isToday = iso === toIso(now);
  const nowMin = now.getHours() * 60 + now.getMinutes() + MIN_NOTICE;
  const slots: Slot[] = [];

  for (let m = hours.open; m < hours.close; m += STEP) {
    if (m >= LUNCH_START && m < LUNCH_END) continue;
    const time = fromMinutes(m);
    const past = isToday && m < nowMin;
    const free =
      barber === 'any'
        ? BARBERS.some((b) => !isTaken(iso, b.id, time, bookings))
        : !isTaken(iso, barber, time, bookings);
    slots.push({ time, available: !past && free, past });
  }
  return slots;
}

/** Para "sem preferência": devolve o primeiro profissional livre no horário. */
export function resolveBarber(dateIso: string, time: string, bookings: Booking[]): BarberId | null {
  return BARBERS.find((b) => !isTaken(dateIso, b.id, time, bookings))?.id ?? null;
}

/** Primeiro horário livre (qualquer barbeiro) nos próximos dias. */
export function nextFreeSlot(bookings: Booking[]): { date: string; time: string } | null {
  for (const d of upcomingDays(10)) {
    const slot = slotsFor(d, 'any', bookings).find((s) => s.available);
    if (slot) return { date: toIso(d), time: slot.time };
  }
  return null;
}
