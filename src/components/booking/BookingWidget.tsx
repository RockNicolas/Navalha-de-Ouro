import { useEffect, useMemo, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getBarber, getService } from '../../data/catalog';
import { toIso, upcomingDays } from '../../lib/dates';
import { downloadIcs } from '../../lib/ics';
import { resolveBarber, slotsFor } from '../../lib/slots';
import { prefersReducedMotion } from '../../lib/whatsapp';
import type { BarberChoice, Booking, ServiceId } from '../../types';
import { Icon } from '../ui/Icon';
import { BookingSummary } from './BookingSummary';
import { StepIndicator } from './StepIndicator';
import { BarberStep } from './steps/BarberStep';
import { BookingDone } from './steps/BookingDone';
import { DetailsStep } from './steps/DetailsStep';
import { ServiceStep } from './steps/ServiceStep';
import { TimeStep } from './steps/TimeStep';

const TITLES = ['Qual serviço?', 'Com quem?', 'Que dia e horário?', 'Pra quem é o horário?', 'Horário confirmado!'];
const DONE_STEP = 4;

export function BookingWidget() {
  const { bookings, addBooking, notify, shop, bookingIntent } = useApp();
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState<ServiceId | null>(null);
  const [barber, setBarber] = useState<BarberChoice | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [done, setDone] = useState<Booking | null>(null);

  const days = useMemo(() => upcomingDays(14), []);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const prevStep = useRef(step);

  /* Ao trocar de etapa, leva o foco (e a tela, se preciso) para o título. */
  useEffect(() => {
    if (prevStep.current === step) return;
    prevStep.current = step;
    const el = titleRef.current;
    if (!el) return;
    el.focus({ preventScroll: true });
    if (el.getBoundingClientRect().top < 72) {
      el.scrollIntoView({ block: 'start', behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    }
  }, [step]);

  /** Vai para a escolha de horário, já com um dia que tenha vaga. */
  function goToTime(choice: BarberChoice) {
    setTime(null);
    const current = date ? days.find((d) => toIso(d) === date) : undefined;
    const stillOk = current && slotsFor(current, choice, bookings).some((s) => s.available);
    if (!stillOk) {
      const first = days.find((d) => slotsFor(d, choice, bookings).some((s) => s.available));
      setDate(first ? toIso(first) : null);
    }
    setStep(2);
  }

  /* Pedido vindo de "Serviços" ou "Equipe": já entra com a escolha feita. */
  useEffect(() => {
    if (!bookingIntent) return;
    const { serviceId: s, barberId: b } = bookingIntent;
    setDone(null);
    setServiceId(s ?? null);
    setBarber(b ?? null);
    if (s && b) goToTime(b);
    else if (s) setStep(1);
    else setStep(0);
    // goToTime lê o estado atual; só reagimos a um novo pedido.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingIntent]);

  function pickService(id: ServiceId) {
    setServiceId(id);
    if (barber) goToTime(barber);
    else setStep(1);
  }

  function pickBarber(choice: BarberChoice) {
    setBarber(choice);
    goToTime(choice);
  }

  function pickDate(iso: string) {
    setDate(iso);
    setTime(null);
  }

  function confirm() {
    if (!serviceId || !barber || !date || !time) return;
    const barberId = barber === 'any' ? resolveBarber(date, time, bookings) : barber;
    if (!barberId) {
      notify('Esse horário acabou de ser ocupado. Escolha outro.');
      setTime(null);
      setStep(2);
      return;
    }
    const booking = addBooking({ serviceId, barberId, date, time, name: name.trim(), phone });
    setDone(booking);
    setStep(DONE_STEP);
    notify('Horário confirmado! O lembrete vai pro seu WhatsApp.');
  }

  function restart() {
    setServiceId(null);
    setBarber(null);
    setDate(null);
    setTime(null);
    setDone(null);
    setStep(0);
  }

  return (
    <div className="bk">
      <StepIndicator step={step} done={step === DONE_STEP} onGoTo={setStep} />

      <div className="bk-body">
        <h3 className="bk-title" ref={titleRef} tabIndex={-1}>
          {step === DONE_STEP && <Icon name="check" className="bk-title-ok" />}
          {TITLES[step]}
        </h3>

        {step === 0 && <ServiceStep selected={serviceId} onSelect={pickService} />}
        {step === 1 && <BarberStep selected={barber} onSelect={pickBarber} />}
        {step === 2 && barber && (
          <TimeStep
            days={days}
            barber={barber}
            bookings={bookings}
            date={date}
            time={time}
            onDate={pickDate}
            onTime={setTime}
          />
        )}
        {step === 3 && (
          <DetailsStep name={name} phone={phone} onName={setName} onPhone={setPhone} onSubmit={confirm} />
        )}
        {step === DONE_STEP && done && (
          <BookingDone
            booking={done}
            onIcs={() => downloadIcs(done, getService(done.serviceId), getBarber(done.barberId), shop)}
            onNew={restart}
          />
        )}
      </div>

      {step < DONE_STEP && (step > 0 || barber) && (
        <div className="bk-foot">
          <BookingSummary serviceId={serviceId} barber={barber} date={step >= 2 ? date : null} time={time} />
          <div className="bk-actions">
            {step > 0 && (
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setStep((s) => s - 1)}>
                <Icon name="arrow-left" /> Voltar
              </button>
            )}
            {step === 2 && (
              <button type="button" className="btn btn-gold btn-sm" disabled={!time} onClick={() => setStep(3)}>
                Continuar <Icon name="arrow" />
              </button>
            )}
            {step === 3 && (
              <button type="submit" form="bk-details" className="btn btn-gold btn-sm">
                Confirmar agendamento
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
