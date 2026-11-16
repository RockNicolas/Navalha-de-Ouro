import { SHOP, SHOP_MESSAGE } from '../../config';
import { waUrl } from '../../lib/whatsapp';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import './sections.css';

export function CtaBand() {
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <Reveal className="container cta-inner">
        <div>
          <h2 id="cta-title">
            Bora dar um <span className="gold">tapa no visual</span>?
          </h2>
          <p className="muted">Escolha o horário agora. Leva menos de 1 minuto.</p>
        </div>
        <div className="cta-actions">
          <a className="btn btn-gold" href="#agendar">
            <Icon name="calendar" /> Agendar horário
          </a>
          <a className="btn btn-ghost" href={waUrl(SHOP.whatsapp, SHOP_MESSAGE)} target="_blank" rel="noopener noreferrer">
            <Icon name="wa" /> Chamar no WhatsApp
          </a>
        </div>
      </Reveal>
    </section>
  );
}
