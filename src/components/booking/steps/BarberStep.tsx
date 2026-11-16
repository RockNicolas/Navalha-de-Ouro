import { BARBERS } from '../../../data/catalog';
import type { BarberChoice } from '../../../types';
import { Avatar } from '../../ui/Avatar';
import { Icon } from '../../ui/Icon';

interface BarberStepProps {
  selected: BarberChoice | null;
  onSelect: (choice: BarberChoice) => void;
}

export function BarberStep({ selected, onSelect }: BarberStepProps) {
  return (
    <div className="opt-grid">
      {BARBERS.map((b) => (
        <button key={b.id} type="button" className="opt opt-barber" aria-pressed={selected === b.id} onClick={() => onSelect(b.id)}>
          <Avatar name={b.name} hue={b.hue} size="lg" />
          <span className="opt-name">{b.name}</span>
          <span className="opt-meta">{b.specialty}</span>
        </button>
      ))}
      <button type="button" className="opt opt-barber" aria-pressed={selected === 'any'} onClick={() => onSelect('any')}>
        <span className="avatar avatar-lg avatar-any" aria-hidden="true">
          <Icon name="users" />
        </span>
        <span className="opt-name">Sem preferência</span>
        <span className="opt-meta">Mais horários livres</span>
      </button>
    </div>
  );
}
