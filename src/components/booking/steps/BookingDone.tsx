import { getBarber, getService } from '../../../data/catalog';
import { whenLabel } from '../../../lib/dates';
import { brl, firstName } from '../../../lib/format';
import type { Booking } from '../../../types';
import { Avatar } from '../../ui/Avatar';
import { Icon } from '../../ui/Icon';

interface BookingDoneProps {
  booking: Booking;
  onIcs: () => void;
  onNew: () => void;
}

export function BookingDone({ booking, onIcs, onNew }: BookingDoneProps) {
  const service = getService(booking.serviceId);
  const barber = getBarber(booking.barberId);

  return (
    <div className="bk-done">
      <p className="bk-done-lead">
        Tudo certo, {firstName(booking.name)}! Você vai receber um lembrete no WhatsApp antes do horário.
      </p>
      <dl className="ticket">
        <div>
          <dt>Serviço</dt>
          <dd>
            {service.name} · {service.minutes} min
          </dd>
        </div>
        <div>
          <dt>Barbeiro</dt>
          <dd className="ticket-barber">
            <Avatar name={barber.name} hue={barber.hue} size="sm" /> {barber.name}
          </dd>
        </div>
        <div>
          <dt>Quando</dt>
          <dd>{whenLabel(booking.date, booking.time)}</dd>
        </div>
        <div>
          <dt>Valor</dt>
          <dd className="gold">{brl(service.price)}</dd>
        </div>
      </dl>
      <div className="bk-done-actions">
        <button type="button" className="btn btn-gold btn-sm" onClick={onIcs}>
          <Icon name="download" /> Salvar na agenda do celular
        </button>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onNew}>
          Fazer outro agendamento
        </button>
      </div>
    </div>
  );
}
