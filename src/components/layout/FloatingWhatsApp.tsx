import { SHOP, SHOP_MESSAGE } from '../../config';
import { waUrl } from '../../lib/whatsapp';
import { Icon } from '../ui/Icon';
import './layout.css';

export function FloatingWhatsApp() {
  return (
    <a
      className="fab"
      href={waUrl(SHOP.whatsapp, SHOP_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Falar com a ${SHOP.name} no WhatsApp`}
    >
      <Icon name="wa" />
    </a>
  );
}
