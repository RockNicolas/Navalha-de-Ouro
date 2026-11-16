import { Reveal } from '../ui/Reveal';
import { SectionHead } from '../ui/SectionHead';
import { LoyaltyCard } from './LoyaltyCard';
import { Plans } from './Plans';
import './loyalty.css';

export function LoyaltySection() {
  return (
    <section className="section section-alt" id="clube" aria-labelledby="clube-title">
      <div className="container">
        <SectionHead
          id="clube-title"
          eyebrow="Clube Navalha"
          title={
            <>
              Cabelo na régua <span className="gold">o mês inteiro</span>
            </>
          }
          lead="Assine o Clube, pague uma vez por mês e venha quando quiser. Ainda não é assinante? Cada visita vale um selo no cartão fidelidade."
        />
        <div className="loyal-grid">
          <Reveal>
            <Plans />
          </Reveal>
          <Reveal delay={120}>
            <LoyaltyCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
