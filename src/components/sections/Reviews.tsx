import { SHOP } from '../../config';
import { RATING_BARS, REVIEWS } from '../../data/shop';
import { Avatar } from '../ui/Avatar';
import { Reveal } from '../ui/Reveal';
import { SectionHead } from '../ui/SectionHead';
import './sections.css';

export function Reviews() {
  return (
    <section className="section section-alt" id="avaliacoes" aria-labelledby="avaliacoes-title">
      <div className="container">
        <SectionHead
          id="avaliacoes-title"
          eyebrow="Avaliações"
          title={
            <>
              Quem senta na cadeira, <span className="gold">volta</span>
            </>
          }
        />
        <div className="reviews">
          <Reveal className="rating-card">
            <b className="rating-num">{SHOP.rating.toLocaleString('pt-BR')}</b>
            <span className="stars big" aria-hidden="true">★★★★★</span>
            <p className="muted small">{SHOP.reviewCount} avaliações no Google</p>
            <ul className="rating-bars" aria-label="Distribuição das notas">
              {RATING_BARS.map((r) => (
                <li key={r.stars}>
                  <span>{r.stars}★</span>
                  <i>
                    <i style={{ width: `${r.pct}%` }} />
                  </i>
                  <span className="sr-only">{r.pct}%</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <ul className="review-list">
            {REVIEWS.map((r, i) => (
              <Reveal as="li" className="review" key={r.name} delay={(i % 2) * 80}>
                <div className="review-head">
                  <Avatar name={r.name} hue={(i * 61 + 25) % 360} size="sm" />
                  <span>
                    <b>{r.name}</b>
                    <small>{r.when}</small>
                  </span>
                  <span className="stars" aria-label={`${r.stars} de 5 estrelas`}>
                    {'★'.repeat(r.stars)}
                    <span className="stars-off">{'★'.repeat(5 - r.stars)}</span>
                  </span>
                </div>
                <p>{r.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
