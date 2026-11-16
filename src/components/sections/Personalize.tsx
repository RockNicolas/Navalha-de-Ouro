import { useApp } from '../../context/AppContext';
import { Icon } from '../ui/Icon';
import './sections.css';

/** Campo "Apresentando para": troca o nome da barbearia em toda a página. */
export function Personalize() {
  const { shopInput, setShopInput } = useApp();

  return (
    <div className="personalize">
      <div className="container personalize-inner">
        <label htmlFor="shopName">
          <Icon name="scissors" /> Apresentando para:
        </label>
        <input
          id="shopName"
          type="text"
          value={shopInput}
          onChange={(e) => setShopInput(e.target.value)}
          placeholder="Nome da barbearia"
          autoComplete="organization"
          maxLength={40}
          aria-describedby="shopHint"
        />
        <span className="hint" id="shopHint">
          Digite o nome e a página inteira se adapta.
        </span>
      </div>
    </div>
  );
}
