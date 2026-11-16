import { SHOP } from '../../config';

/** Logo da Navalha de Ouro (monograma + nome). */
export function Brand() {
  return (
    <a className="brand" href="#topo" aria-label={`${SHOP.fullName}, voltar ao topo`}>
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="18.5" />
          <path d="M11 27 L28.5 12.5 C30 11.3 31.6 13 30.4 14.5 L21 25.5 C20.4 26.2 19.6 26.5 18.8 26.5 L14.5 26.5 Z" className="bm-blade" />
          <path d="M11 27 L7.5 31" className="bm-handle" />
        </svg>
      </span>
      <span className="brand-text">
        {SHOP.name}
        <small>Barbearia · desde {SHOP.since}</small>
      </span>
    </a>
  );
}
