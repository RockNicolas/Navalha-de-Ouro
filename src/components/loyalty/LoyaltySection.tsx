import { Reveal } from '../ui/Reveal';
import { SectionHead } from '../ui/SectionHead';
import { LoyaltyCard } from './LoyaltyCard';
import { Plans } from './Plans';
import './loyalty.css';

export function LoyaltySection() {
  return (
    <section className="section section-alt" id="fidelidade" aria-labelledby="fidelidade-title">
      <div className="container">
        <SectionHead
          id="fidelidade-title"
          number="05"
          eyebrow="Assinatura e fidelidade"
          title={
            <>
              Cliente que assina <span className="gold">volta todo mês</span>
            </>
          }
          lead="Clube de assinatura mensal com cobrança recorrente e cartão fidelidade digital, sem papelzinho pra perder."
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
