import { SERVICES } from '../../../data/catalog';
import { brl } from '../../../lib/format';
import type { ServiceId } from '../../../types';
import { Icon } from '../../ui/Icon';

interface ServiceStepProps {
  selected: ServiceId | null;
  onSelect: (id: ServiceId) => void;
}

export function ServiceStep({ selected, onSelect }: ServiceStepProps) {
  return (
    <div className="opt-list">
      {SERVICES.map((s) => (
        <button
          key={s.id}
          type="button"
          className="opt"
          aria-pressed={selected === s.id}
          onClick={() => onSelect(s.id)}
        >
          <span className="opt-main">
            <span className="opt-name">
              {s.name}
              {s.tag && <span className="opt-tag">{s.tag}</span>}
            </span>
            <span className="opt-meta">
              <Icon name="clock" /> {s.minutes} min · {s.desc}
            </span>
          </span>
          <span className="opt-price">{brl(s.price)}</span>
        </button>
      ))}
    </div>
  );
}
