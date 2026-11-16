import { pad } from './format';

export const DOW_SHORT = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
export const DOW_LONG = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
export const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
export const MONTHS_LONG = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

/** Data local → AAAA-MM-DD (sem fuso). */
export const toIso = (d: Date): string => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export function fromIso(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function upcomingDays(count: number): Date[] {
  const base = startOfToday();
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    return d;
  });
}

/** Diferença em dias entre a data e hoje (0 = hoje). */
export function dayDiff(iso: string): number {
  return Math.round((fromIso(iso).getTime() - startOfToday().getTime()) / 86_400_000);
}

export const toMinutes = (t: string): number => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

export const fromMinutes = (m: number): string => `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;

/** "hoje", "amanhã" ou "quarta, 18/11". */
export function dayLabel(iso: string): string {
  const diff = dayDiff(iso);
  if (diff === 0) return 'hoje';
  if (diff === 1) return 'amanhã';
  const d = fromIso(iso);
  return `${DOW_LONG[d.getDay()]}, ${pad(d.getDate())}/${pad(d.getMonth() + 1)}`;
}

export const whenLabel = (iso: string, time: string): string => `${dayLabel(iso)} às ${time}`;
