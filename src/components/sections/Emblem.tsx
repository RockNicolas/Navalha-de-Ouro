import { SHOP } from '../../config';

/** Selo da barbearia em SVG: anel de texto girando e navalha no centro. */
export function Emblem() {
  const ringText = `BARBEARIA • ${SHOP.name.toUpperCase()} • DESDE ${SHOP.since} • `;

  return (
    <div className="emblem" role="img" aria-label={`Selo da ${SHOP.fullName}`}>
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <linearGradient id="emb-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f2d896" />
            <stop offset="0.5" stopColor="#c9a24b" />
            <stop offset="1" stopColor="#8a6a26" />
          </linearGradient>
          <radialGradient id="emb-bg" cx="0.5" cy="0.4" r="0.6">
            <stop offset="0" stopColor="#2a241a" />
            <stop offset="1" stopColor="#100e0b" />
          </radialGradient>
          <path id="emb-ring" d="M100,100 m-79,0 a79,79 0 1,1 158,0 a79,79 0 1,1 -158,0" />
        </defs>

        <circle cx="100" cy="100" r="97" fill="url(#emb-bg)" stroke="url(#emb-gold)" strokeWidth="1.6" />
        <circle cx="100" cy="100" r="90" fill="none" stroke="url(#emb-gold)" strokeWidth="0.5" opacity="0.6" />
        <circle cx="100" cy="100" r="66" fill="none" stroke="url(#emb-gold)" strokeWidth="1" opacity="0.7" />

        <g className="emblem-ring">
          <text fontSize="10.5" fontWeight="600" letterSpacing="2.4" fill="url(#emb-gold)" fontFamily="Inter, sans-serif">
            <textPath href="#emb-ring" textLength="492" lengthAdjust="spacing">
              {ringText}
            </textPath>
          </text>
        </g>

        {/* Navalha */}
        <g className="emblem-razor">
          <g transform="translate(8 -16)">
            <path d="M66 117 L134 84 C143 80 150 88 145 96 L138 108 C136 111 132 113 128 113 Z" fill="url(#emb-gold)" />
            <path d="M72 114 L128 110" stroke="#fff6dc" strokeWidth="1" opacity="0.55" />
            <path d="M66 117 L48 137 C45 141 49 145 53 142 L74 120 Z" fill="#241e15" stroke="url(#emb-gold)" strokeWidth="1.4" />
            <circle cx="69" cy="118" r="3.6" fill="#0e0d0b" stroke="url(#emb-gold)" strokeWidth="1.4" />
          </g>
        </g>

        <text x="100" y="66" textAnchor="middle" fontSize="9" letterSpacing="3" fill="#c9a24b" fontFamily="Inter, sans-serif">
          ★ ★ ★
        </text>
        <text
          x="100"
          y="152"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill="#f3ece0"
          fontFamily="'Playfair Display', Georgia, serif"
        >
          Navalha de Ouro
        </text>
      </svg>
    </div>
  );
}
