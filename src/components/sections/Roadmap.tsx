import { Reveal } from '../ui/Reveal';
import { SectionHead } from '../ui/SectionHead';
import './sections.css';

const STEPS = [
  { title: 'Site profissional', text: 'Vocês aparecem no Google e passam confiança.' },
  { title: 'Agendamento online', text: 'A agenda enche sozinha, até de madrugada.' },
  { title: 'Lembretes automáticos', text: 'Menos faltas, sem ninguém precisar mandar mensagem.' },
  { title: 'Sistema de gestão', text: 'Caixa, clientes e comissões sob controle.' },
  { title: 'Assinatura e fidelidade', text: 'Receita todo mês e cliente que sempre volta.' },
];

export function Roadmap() {
  return (
    <section className="section" id="roteiro" aria-labelledby="roteiro-title">
      <div className="container">
        <SectionHead
          id="roteiro-title"
          eyebrow="Sem complicação"
          title="Comece pelo site, cresça no seu ritmo"
          lead="Não precisa contratar tudo de uma vez. Cada etapa se encaixa na anterior."
        />
        <ol className="road">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 90}>
              <span className="road-n">{i + 1}</span>
              <b>{s.title}</b>
              <small>{s.text}</small>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
