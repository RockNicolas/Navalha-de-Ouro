import { getBarber, getService } from '../../data/catalog';
import { dayLabel } from '../../lib/dates';
import { brl } from '../../lib/format';
import type { BarberChoice, ServiceId } from '../../types';

interface BookingSummaryProps {
  serviceId: ServiceId | null;
  barber: BarberChoice | null;
  date: string | null;
  time: string | null;
}

/** Resumo do que já foi escolhido, sempre visível no rodapé do widget. */
export function BookingSummary({ serviceId, barber, date, time }: BookingSummaryProps) {
  const service = serviceId ? getService(serviceId) : null;
  const items: string[] = [];
  if (service) items.push(service.name);
  if (barber) items.push(barber === 'any' ? 'Sem preferência' : getBarber(barber).name);
  if (date) items.push(time ? `${dayLabel(date)}, ${time}` : dayLabel(date));

  return (
    <p className="bk-summary" aria-live="polite">
      <span>{items.join(' · ')}</span>
      {service && <b>{brl(service.price)}</b>}
    </p>
  );
}
