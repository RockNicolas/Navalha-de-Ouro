import { useApp } from '../../context/AppContext';
import { BARBERS } from '../../data/catalog';
import { Avatar } from '../ui/Avatar';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import { SectionHead } from '../ui/SectionHead';
import './sections.css';

export function Team() {
  const { requestBooking } = useApp();

  return (
    <section className="section section-alt" id="equipe" aria-labelledby="equipe-title">
      <div className="container">
        <SectionHead
          id="equipe-title"
          eyebrow="Nossa equipe"
          title="Quem cuida do seu visual"
          lead="Cada barbeiro tem a sua especialidade. Escolha o seu preferido ou deixe a gente indicar quem está livre."
        />
        <div className="team">
          {BARBERS.map((b, i) => (
            <Reveal as="article" className="barber" key={b.id} delay={i * 90}>
              <div className="barber-top">
                <Avatar name={b.name} hue={b.hue} size="xl" />
                <span className="barber-rating">
                  <span aria-hidden="true">★</span> {b.rating.toLocaleString('pt-BR', { minimumFractionDigits: 1 })}
                </span>
              </div>
              <h3>{b.name}</h3>
              <p className="barber-spec">
                {b.specialty} · {b.years} anos de casa
              </p>
              <p className="muted">{b.bio}</p>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => requestBooking({ barberId: b.id })}>
                <Icon name="calendar" /> Agendar com {b.name}
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
