import { useMemo } from 'react';
import { DOW_SHORT, MONTHS, fromIso, toIso } from '../../../lib/dates';
import { isClosed, slotsFor } from '../../../lib/slots';
import type { BarberChoice, Booking } from '../../../types';

interface TimeStepProps {
  days: Date[];
  barber: BarberChoice;
  bookings: Booking[];
  date: string | null;
  time: string | null;
  onDate: (iso: string) => void;
  onTime: (time: string) => void;
}

export function TimeStep({ days, barber, bookings, date, time, onDate, onTime }: TimeStepProps) {
  const dayInfo = useMemo(
    () =>
      days.map((d) => {
        const closed = isClosed(d);
        const free = closed ? 0 : slotsFor(d, barber, bookings).filter((s) => s.available).length;
        return { d, iso: toIso(d), closed, free };
      }),
    [days, barber, bookings],
  );

  const slots = useMemo(() => (date ? slotsFor(fromIso(date), barber, bookings) : []), [date, barber, bookings]);
  const freeCount = slots.filter((s) => s.available).length;

  return (
    <div className="time-step">
      <div className="dates" role="group" aria-label="Escolha o dia">
        {dayInfo.map(({ d, iso, closed, free }, i) => {
          const disabled = closed || free === 0;
          const top = i === 0 ? 'hoje' : i === 1 ? 'amanhã' : DOW_SHORT[d.getDay()];
          return (
            <button
              key={iso}
              type="button"
              className="date"
              aria-pressed={date === iso}
              disabled={disabled}
              onClick={() => onDate(iso)}
              aria-label={`${top}, ${d.getDate()} de ${MONTHS[d.getMonth()]}${closed ? ', fechado' : free === 0 ? ', lotado' : ''}`}
            >
              <span className="date-dow">{top}</span>
              <span className="date-day">{d.getDate()}</span>
              <span className="date-mon">{closed ? 'fechado' : free === 0 ? 'lotado' : MONTHS[d.getMonth()]}</span>
            </button>
          );
        })}
      </div>

      {date ? (
        <>
          <p className="slots-info">
            {freeCount > 0 ? `${freeCount} horários livres` : 'Nenhum horário livre neste dia'}
            <span className="slots-legend">
              <i className="lg-free" /> livre <i className="lg-taken" /> ocupado
            </span>
          </p>
          <div className="slots" role="group" aria-label="Escolha o horário">
            {slots.map((s) => (
              <button
                key={s.time}
                type="button"
                className="slot"
                aria-pressed={time === s.time}
                disabled={!s.available}
                onClick={() => onTime(s.time)}
              >
                {s.time}
                {!s.available && <span className="sr-only">{s.past ? ' (já passou)' : ' (ocupado)'}</span>}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p className="muted">Sem horários livres nos próximos dias para essa escolha. Tente “Sem preferência”.</p>
      )}
    </div>
  );
}
