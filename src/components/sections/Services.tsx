import { useApp } from '../../context/AppContext';
import { SERVICES } from '../../data/catalog';
import { brl } from '../../lib/format';
import type { ServiceCategory } from '../../types';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import { SectionHead } from '../ui/SectionHead';
import './sections.css';

const GROUPS: { id: ServiceCategory; title: string }[] = [
  { id: 'cabelo', title: 'Cabelo' },
  { id: 'barba', title: 'Barba e acabamento' },
];

export function Services() {
  const { requestBooking } = useApp();
  const combo = SERVICES.find((s) => s.category === 'combo');

  return (
    <section className="section" id="servicos" aria-labelledby="servicos-title">
      <div className="container">
        <SectionHead
          id="servicos-title"
          eyebrow="Serviços e preços"
          title={
            <>
              Tudo que você precisa, <span className="gold">sem surpresa no preço</span>
            </>
          }
          lead="Preço fechado, tempo certo e agendamento em um toque. Escolha o serviço e a gente guarda a cadeira pra você."
        />

        <div className="services">
          {GROUPS.map((g, gi) => (
            <Reveal className="svc-group" key={g.id} delay={gi * 100}>
              <h3 className="svc-group-title">{g.title}</h3>
              <ul className="svc-list">
                {SERVICES.filter((s) => s.category === g.id).map((s) => (
                  <li key={s.id} className="svc">
                    <div className="svc-line">
                      <span className="svc-name">{s.name}</span>
                      <i aria-hidden="true" />
                      <span className="svc-price">{brl(s.price)}</span>
                    </div>
                    <div className="svc-sub">
                      <span>
                        <Icon name="clock" /> {s.minutes} min · {s.desc}
                      </span>
                      <button type="button" className="svc-book" onClick={() => requestBooking({ serviceId: s.id })}>
                        Agendar <span className="sr-only">{s.name}</span>
                        <Icon name="arrow" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          {combo && (
            <Reveal className="svc-combo" delay={200}>
              <span className="svc-combo-tag">{combo.tag}</span>
              <h3>{combo.name}</h3>
              <p>{combo.desc}. Sai mais em conta do que os dois separados.</p>
              <div className="svc-combo-price">
                <s>{brl(45 + 35)}</s>
                <b>{brl(combo.price)}</b>
                <small>{combo.minutes} min</small>
              </div>
              <button type="button" className="btn btn-gold" onClick={() => requestBooking({ serviceId: combo.id })}>
                <Icon name="calendar" /> Agendar o combo
              </button>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
