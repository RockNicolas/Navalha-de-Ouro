import type { CSSProperties } from 'react';
import { GALLERY } from '../../data/shop';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import { SectionHead } from '../ui/SectionHead';
import './sections.css';

export function Gallery() {
  return (
    <section className="section" id="estilos" aria-labelledby="estilos-title">
      <div className="container">
        <SectionHead
          id="estilos-title"
          eyebrow="Estilos da casa"
          title="Do clássico ao degradê navalhado"
          lead="Uma amostra do que sai da nossa cadeira toda semana."
        />
        <ul className="gallery">
          {GALLERY.map((g, i) => (
            <Reveal as="li" key={g.title} className="g-item" delay={(i % 3) * 80}>
              <figure style={{ '--hue': g.hue } as CSSProperties}>
                {g.image ? (
                  <img src={g.image} alt={g.title} loading="lazy" />
                ) : (
                  <span className="g-art" aria-hidden="true">
                    <Icon name={g.icon} />
                  </span>
                )}
                <figcaption>
                  <b>{g.title}</b>
                  <small>{g.caption}</small>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
