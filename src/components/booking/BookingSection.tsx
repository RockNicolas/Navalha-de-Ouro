import { Reveal } from '../ui/Reveal';
import { SectionHead } from '../ui/SectionHead';
import { BookingWidget } from './BookingWidget';
import { ReminderChat } from './ReminderChat';
import './booking.css';

export function BookingSection() {
  return (
    <section className="section" id="agendar" aria-labelledby="agendar-title">
      <div className="container">
        <SectionHead
          id="agendar-title"
          eyebrow="Agendamento online"
          title={
            <>
              Agende em <span className="gold">menos de 1 minuto</span>
            </>
          }
          lead="Escolha o serviço, o barbeiro e o horário. Sem ligação e sem esperar resposta no WhatsApp: o horário fica garantido na hora."
        />
        <div className="booking-grid">
          <Reveal className="card booking">
            <BookingWidget />
          </Reveal>
          <Reveal as="aside" className="reminder" id="lembretes" aria-labelledby="lembretes-title" delay={120}>
            <ReminderChat />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
