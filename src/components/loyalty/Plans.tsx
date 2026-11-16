import { SHOP, STORAGE_KEYS } from '../../config';
import { PLANS } from '../../data/demo';
import { usePersistentState } from '../../hooks/usePersistentState';
import { brl } from '../../lib/format';
import { waUrl } from '../../lib/whatsapp';
import { Icon } from '../ui/Icon';

const isPlanId = (v: unknown): v is string => typeof v === 'string' && PLANS.some((p) => p.id === v);

/** Planos como radios nativos: teclado e leitor de tela funcionam sem esforço. */
export function Plans() {
  const [planId, setPlanId] = usePersistentState<string>(STORAGE_KEYS.plan, 'corte-barba', isPlanId);
  const plan = PLANS.find((p) => p.id === planId) ?? PLANS[1];
  const message = `Olá, ${SHOP.name}! Quero assinar o Clube ${plan.name} (${brl(plan.price)}/mês).`;

  return (
    <>
      <h3 className="sub-h">Planos do Clube</h3>
      <fieldset className="plans">
        <legend className="sr-only">Escolha um plano</legend>
        {PLANS.map((p) => (
          <label key={p.id} className={`plan${p.id === planId ? ' selected' : ''}`}>
            <input
              type="radio"
              name="plan"
              className="sr-only"
              value={p.id}
              checked={p.id === planId}
              onChange={() => setPlanId(p.id)}
            />
            {p.flag && <span className="plan-flag">{p.flag}</span>}
            <span className="plan-name">{p.name}</span>
            <span className="plan-price">
              <b>{brl(p.price).replace(',00', '')}</b>/mês
            </span>
            <span className="plan-list">
              {p.perks.map((perk) => (
                <span key={perk}>
                  <Icon name="check" />
                  {perk}
                </span>
              ))}
            </span>
          </label>
        ))}
      </fieldset>
      <div className="plan-summary" aria-live="polite">
        <Icon name="card" />
        <span>
          <b>Clube {plan.name}</b>: {brl(plan.price)} por mês no cartão. Renova sozinho todo mês e você cancela quando
          quiser, sem multa.
        </span>
      </div>
      <a className="btn btn-gold plan-cta" href={waUrl(SHOP.whatsapp, message)} target="_blank" rel="noopener noreferrer">
        <Icon name="card" /> Quero assinar o {plan.name}
      </a>
    </>
  );
}
