import { useState, type FormEvent } from 'react';
import { useApp } from '../../context/AppContext';
import { isValidPhone, maskPhone } from '../../lib/format';
import { waUrl } from '../../lib/whatsapp';
import { Icon, type IconName } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import './sections.css';

const INTERESTS: { icon: IconName; label: string }[] = [
  { icon: 'globe', label: 'Site profissional' },
  { icon: 'calendar', label: 'Agendamento online' },
  { icon: 'bell', label: 'Lembretes automáticos' },
  { icon: 'chart', label: 'Sistema de gestão' },
  { icon: 'card', label: 'Assinatura e fidelidade' },
];

type Field = 'shop' | 'name' | 'phone';
type Errors = Partial<Record<Field, string>>;

export function Contact() {
  const { shop, shopInput, notify } = useApp();
  /** null = ainda não editado: acompanha o campo "Apresentando para". */
  const [shopField, setShopField] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});

  const shopValue = shopField ?? shopInput;

  const toggle = (label: string) =>
    setInterests((prev) => (prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]));

  function validate(): Errors {
    const e: Errors = {};
    if (shopValue.trim().length < 2) e.shop = 'Informe o nome da barbearia.';
    if (name.trim().length < 2) e.name = 'Informe seu nome.';
    if (!isValidPhone(phone)) e.phone = 'Informe um WhatsApp com DDD.';
    return e;
  }

  function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    const first = (Object.keys(e) as Field[])[0];
    if (first) {
      document.getElementById(`c-${first}`)?.focus();
      return;
    }
    const lines = [
      'Olá, Rock Software Solutions! 👋',
      `Sou ${name.trim()}, da ${shopValue.trim()}.`,
      interests.length
        ? `Tenho interesse em: ${INTERESTS.filter((i) => interests.includes(i.label)).map((i) => i.label).join(', ')}.`
        : 'Quero entender qual solução faz mais sentido pra gente.',
      `Meu WhatsApp: ${phone}`,
    ];
    if (msg.trim()) lines.push('', msg.trim());
    window.open(waUrl(lines.join('\n')), '_blank', 'noopener,noreferrer');
    notify('Abrindo o WhatsApp com a mensagem pronta…');
  }

  const fieldProps = (f: Field) => ({
    id: `c-${f}`,
    'aria-invalid': errors[f] ? true : undefined,
    'aria-describedby': errors[f] ? `c-${f}-err` : undefined,
  });

  const errorFor = (f: Field) =>
    errors[f] ? (
      <span className="field-error" id={`c-${f}-err`}>
        {errors[f]}
      </span>
    ) : null;

  return (
    <section className="section section-alt" id="contato" aria-labelledby="contato-title">
      <div className="container contact-grid">
        <Reveal className="contact-copy">
          <p className="eyebrow">Vamos conversar</p>
          <h2 id="contato-title">
            Qual dessas faz mais sentido pra <span className="gold">{shop}</span> hoje?
          </h2>
          <p className="lead">
            Marque o que interessa e mande pra gente no WhatsApp. A gente responde rapidinho, sem compromisso.
          </p>
          <ul className="checks">
            <li>
              <Icon name="zap" />
              Vocês começam só com o que precisam agora
            </li>
            <li>
              <Icon name="phone" />
              Tudo funciona no celular, pra equipe e pros clientes
            </li>
            <li>
              <Icon name="users" />A gente configura e treina a equipe com vocês
            </li>
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <form className="card contact-form" onSubmit={onSubmit} noValidate>
            <div className="field">
              <label htmlFor="c-shop">Nome da barbearia</label>
              <input
                {...fieldProps('shop')}
                type="text"
                autoComplete="organization"
                maxLength={60}
                value={shopValue}
                onChange={(e) => setShopField(e.target.value)}
              />
              {errorFor('shop')}
            </div>
            <div className="field-row">
              <div className="field">
                <label htmlFor="c-name">Seu nome</label>
                <input
                  {...fieldProps('name')}
                  type="text"
                  autoComplete="name"
                  maxLength={60}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errorFor('name')}
              </div>
              <div className="field">
                <label htmlFor="c-phone">WhatsApp</label>
                <input
                  {...fieldProps('phone')}
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="(11) 99999-9999"
                  value={phone}
                  onChange={(e) => setPhone(maskPhone(e.target.value))}
                />
                {errorFor('phone')}
              </div>
            </div>
            <fieldset className="interests">
              <legend>O que interessa?</legend>
              {INTERESTS.map((i) => (
                <label key={i.label}>
                  <input type="checkbox" checked={interests.includes(i.label)} onChange={() => toggle(i.label)} />
                  <span>
                    <Icon name={i.icon} />
                    {i.label}
                  </span>
                </label>
              ))}
            </fieldset>
            <div className="field">
              <label htmlFor="c-msg">
                Mensagem <small>(opcional)</small>
              </label>
              <textarea
                id="c-msg"
                rows={3}
                maxLength={500}
                placeholder="Conte um pouco sobre a barbearia"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
              />
            </div>
            <button className="btn btn-gold btn-block" type="submit">
              <Icon name="wa" />
              Enviar pelo WhatsApp
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
