import { useState } from 'react';
import { STORAGE_KEYS } from '../../config';
import { useApp } from '../../context/AppContext';
import { usePersistentState } from '../../hooks/usePersistentState';
import { prefersReducedMotion } from '../../lib/whatsapp';
import { Icon } from '../ui/Icon';
import { Confetti } from './Confetti';

const GOAL = 10;
const isStampCount = (v: unknown): v is number => typeof v === 'number' && v >= 0 && v <= GOAL;

export function LoyaltyCard() {
  const { shop, notify } = useApp();
  const [stamps, setStamps] = usePersistentState<number>(STORAGE_KEYS.stamps, 7, isStampCount);
  const [burst, setBurst] = useState(0);
  const [justAdded, setJustAdded] = useState<number | null>(null);
  const complete = stamps >= GOAL;

  function handleClick() {
    if (complete) {
      setStamps(0);
      setJustAdded(null);
      notify('Corte grátis resgatado! O cartão recomeça do zero.');
      return;
    }
    const next = stamps + 1;
    setStamps(next);
    setJustAdded(next);
    if (next === GOAL) {
      if (!prefersReducedMotion()) setBurst((b) => b + 1);
      notify('Cartão completo: corte grátis liberado! 🎉');
    }
  }

  const left = GOAL - stamps;
  const message = complete
    ? 'Parabéns! O próximo corte é por conta da casa. 🎉'
    : left === 1
      ? 'Falta só 1 visita pro corte grátis!'
      : `Faltam ${left} visitas pro corte grátis.`;

  return (
    <>
      <h3 className="sub-h">Cartão fidelidade digital</h3>
      <div className={`loyalty-card${complete ? ' complete' : ''}`}>
        {burst > 0 && <Confetti key={burst} />}
        <div className="lc-top">
          <div>
            <small>Cartão fidelidade</small>
            <b>{shop}</b>
          </div>
          <span className="lc-count">
            {stamps}/{GOAL}
          </span>
        </div>
        <ol className="stamps" aria-label={`${stamps} de ${GOAL} selos`}>
          {Array.from({ length: GOAL }, (_, i) => {
            const n = i + 1;
            const filled = n <= stamps;
            return (
              <li key={n} className={`stamp${filled ? ' filled' : ''}${n === justAdded ? ' pop' : ''}${n === GOAL ? ' last' : ''}`}>
                {filled ? <Icon name="scissors" /> : n === GOAL ? <Icon name="gift" /> : <span>{n}</span>}
              </li>
            );
          })}
        </ol>
        <p className="lc-msg" aria-live="polite">
          {message}
        </p>
        <button type="button" className="btn btn-gold" onClick={handleClick}>
          <Icon name={complete ? 'gift' : 'scissors'} />
          {complete ? 'Resgatar corte grátis' : 'Registrar visita'}
        </button>
        <p className="lc-foot muted small">Sem cartão de papel: fica salvo no celular do cliente e no sistema.</p>
      </div>
    </>
  );
}
