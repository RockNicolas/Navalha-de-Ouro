import { useApp } from '../../context/AppContext';
import { Icon, type IconName } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import { SectionHead } from '../ui/SectionHead';
import './sections.css';

const SOLUTIONS: { icon: IconName; title: string; text: string; href: string; cta: string }[] = [
  {
    icon: 'globe',
    title: 'Site profissional',
    text: 'Com fotos, serviços, preços, localização e avaliações, pra quem pesquisar no Google encontrar vocês.',
    href: '#site',
    cta: 'Ver na prática',
  },
  {
    icon: 'calendar',
    title: 'Agendamento online',
    text: 'O cliente escolhe o serviço, o profissional e o horário sozinho, sem precisar chamar no WhatsApp.',
    href: '#agendar',
    cta: 'Testar agora',
  },
  {
    icon: 'bell',
    title: 'Lembretes automáticos',
    text: 'Aviso por WhatsApp antes do horário, pra reduzir as faltas.',
    href: '#lembretes',
    cta: 'Ver na prática',
  },
  {
    icon: 'chart',
    title: 'Sistema de gestão',
    text: 'Agenda, cadastro de clientes com histórico, controle financeiro e comissão por profissional, tudo num lugar só.',
    href: '#gestao',
    cta: 'Abrir o painel',
  },
  {
    icon: 'card',
    title: 'Assinatura e fidelidade',
    text: 'Clube de assinatura mensal e cartão fidelidade digital pra fazer o cliente voltar.',
    href: '#fidelidade',
    cta: 'Ver na prática',
  },
];

export function Solutions() {
  const { shop } = useApp();

  return (
    <section className="section" id="solucoes" aria-labelledby="solucoes-title">
      <div className="container">
        <SectionHead
          id="solucoes-title"
          eyebrow="O que a gente faz"
          title={
            <>
              O que a Rock pode fazer pela <span className="gold">{shop}</span>
            </>
          }
          lead="Cinco soluções que se encaixam. Dá pra começar só pelo site e ir adicionando o resto depois."
        />
        <div className="solutions">
          {SOLUTIONS.map((s, i) => (
            <Reveal as="article" className="sol" key={s.title} delay={i * 70}>
              <span className="sol-ico">
                <Icon name={s.icon} />
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <a href={s.href} className="sol-link">
                {s.cta} <Icon name="arrow" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
