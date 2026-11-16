import { DEFAULT_WA_MESSAGE } from '../../config';
import { waUrl } from '../../lib/whatsapp';
import { Icon } from '../ui/Icon';
import './layout.css';

export function FloatingWhatsApp() {
  return (
    <a
      className="fab"
      href={waUrl(DEFAULT_WA_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Rock no WhatsApp"
    >
      <Icon name="wa" />
    </a>
  );
}
