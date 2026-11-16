/**
 * Configurações da página.
 *
 * WHATSAPP_NUMBER: número da Rock Software Solutions que recebe os contatos.
 * Use só dígitos, com DDI e DDD. Exemplo: '5511999998888'.
 * Enquanto estiver com o valor de exemplo, os botões abrem o WhatsApp
 * sem destinatário (a pessoa escolhe o contato).
 */
export const WHATSAPP_NUMBER: string = '5500000000000';

export const WHATSAPP_PLACEHOLDER: string = '5500000000000';

/** Nome usado quando o campo "Apresentando para" está vazio. */
export const DEFAULT_SHOP = 'Sua Barbearia';

export const DEFAULT_WA_MESSAGE =
  'Olá! Vi a apresentação da Rock Software Solutions e quero saber mais sobre as soluções para barbearia.';

/** Chaves do localStorage. */
export const STORAGE_KEYS = {
  shop: 'rss-shop',
  bookings: 'rss-bookings',
  stamps: 'rss-stamps',
  plan: 'rss-plan',
} as const;
