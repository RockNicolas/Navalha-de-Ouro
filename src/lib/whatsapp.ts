import { WHATSAPP_PLACEHOLDER } from '../config';

/** Link wa.me com mensagem pronta. Sem número configurado, abre sem destinatário. */
export function waUrl(number: string, text: string): string {
  const base = number === WHATSAPP_PLACEHOLDER ? 'https://wa.me/' : `https://wa.me/${number}`;
  return `${base}?text=${encodeURIComponent(text)}`;
}

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function scrollToId(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
}
