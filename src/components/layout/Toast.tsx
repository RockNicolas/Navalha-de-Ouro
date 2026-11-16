import { useApp } from '../../context/AppContext';
import { Icon } from '../ui/Icon';
import './layout.css';

/** Aviso curto no rodapé da tela; a região aria-live fica sempre montada. */
export function Toast() {
  const { toast } = useApp();
  return (
    <div className={`toast${toast ? ' show' : ''}`} role="status" aria-live="polite">
      {toast && (
        <span key={toast.id}>
          <Icon name="check" />
          {toast.message}
        </span>
      )}
    </div>
  );
}
