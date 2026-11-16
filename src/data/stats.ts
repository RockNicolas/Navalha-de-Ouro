import type { BarberId, ServiceId } from '../types';
import { BARBERS, SERVICES } from './catalog';
import { BARBER_MONTH, WEEK_DAYS } from './demo';

/* Números do painel calculados a partir de BARBER_MONTH (dados de exemplo). */

export interface ServiceLine {
  serviceId: ServiceId;
  name: string;
  count: number;
  value: number;
}

/** Serviços feitos no mês pelo barbeiro, do mais feito para o menos feito. */
export function barberServices(id: BarberId): ServiceLine[] {
  const done = BARBER_MONTH[id].services;
  return SERVICES.map((s) => {
    const count = done[s.id] ?? 0;
    return { serviceId: s.id, name: s.name, count, value: count * s.price };
  })
    .filter((l) => l.count > 0)
    .sort((a, b) => b.count - a.count);
}

export const barberAppointments = (id: BarberId): number =>
  barberServices(id).reduce((sum, l) => sum + l.count, 0);

export const barberSales = (id: BarberId): number => barberServices(id).reduce((sum, l) => sum + l.value, 0);

/** Cortes de cabelo (corte, corte infantil e o corte do combo). */
export const barberCuts = (id: BarberId): number =>
  barberServices(id)
    .filter((l) => l.serviceId === 'corte' || l.serviceId === 'infantil' || l.serviceId === 'combo')
    .reduce((sum, l) => sum + l.count, 0);

export const totalSales = (): number => BARBERS.reduce((sum, b) => sum + barberSales(b.id), 0);

export const totalAppointments = (): number => BARBERS.reduce((sum, b) => sum + barberAppointments(b.id), 0);

/** Faturamento da semana: de um barbeiro ou da barbearia inteira. */
export function weekRevenue(id?: BarberId): { day: string; value: number }[] {
  return WEEK_DAYS.map((day, i) => ({
    day,
    value: id ? BARBER_MONTH[id].week[i] : BARBERS.reduce((sum, b) => sum + BARBER_MONTH[b.id].week[i], 0),
  }));
}
