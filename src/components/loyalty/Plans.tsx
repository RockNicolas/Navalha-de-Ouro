import { STORAGE_KEYS } from '../../config';
import { PLANS } from '../../data/demo';
import { usePersistentState } from '../../hooks/usePersistentState';
import { brl } from '../../lib/format';
import { Icon } from '../ui/Icon';

const isPlanId = (v: unknown): v is string => typeof v === 'string' && PLANS.some((p) => p.id === v);

/** Planos como radios nativos: teclado e leitor de tela funcionam sem esforço. */
export function Plans() {
  const [planId, setPlanId] = usePersistentState<string>(STORAGE_KEYS.plan, 'corte-barba', isPlanId);
  const plan = PLANS.find((p) => p.id === planId) ?? PLANS[1];

  return (
    <>
      <h3 className="sub-h">
        Clube de assinatura <small>(valores de exemplo)</small>
      </h3>
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
      <p className="plan-summary" aria-live="polite">
        <Icon name="card" />
        <span>
          <b>{plan.name}</b> selecionado: {brl(plan.price)} por mês no cartão, com renovação automática. O cliente
          cancela quando quiser, e a barbearia recebe todo mês sem cobrar ninguém.
        </span>
      </p>
    </>
  );
}
