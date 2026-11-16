import { WHATSAPP_NUMBER, WHATSAPP_PLACEHOLDER } from '../config';

/** Link wa.me com mensagem pronta. Sem número configurado, abre sem destinatário. */
export function waUrl(text: string): string {
  const base = WHATSAPP_NUMBER === WHATSAPP_PLACEHOLDER ? 'https://wa.me/' : `https://wa.me/${WHATSAPP_NUMBER}`;
  return `${base}?text=${encodeURIComponent(text)}`;
}

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function scrollToId(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
}
