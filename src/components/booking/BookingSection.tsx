import { Reveal } from '../ui/Reveal';
import { SectionHead } from '../ui/SectionHead';
import { BookingWidget } from './BookingWidget';
import { ReminderChat } from './ReminderChat';
import './booking.css';

export function BookingSection() {
  return (
    <section className="section section-alt" id="agendar" aria-labelledby="agendar-title">
      <div className="container">
        <SectionHead
          id="agendar-title"
          number="02"
          eyebrow="Agendamento online"
          title="Teste agora: marque um horário de verdade"
          lead="O cliente escolhe o serviço, o profissional e o horário sozinho, sem precisar chamar no WhatsApp. Faça um agendamento e veja ele aparecer no lembrete e no painel de gestão logo abaixo."
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
