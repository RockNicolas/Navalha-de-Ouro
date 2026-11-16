/**
 * Configurações da página.
 *
 * A Navalha de Ouro é uma barbearia fictícia, criada para mostrar aos clientes
 * da Rock Software Solutions como fica o site com todas as soluções ativas.
 *
 * Números de WhatsApp: só dígitos, com DDI e DDD (ex.: '5511999998888').
 * Enquanto estiverem com o valor de exemplo, os botões abrem o WhatsApp
 * sem destinatário (a pessoa escolhe o contato).
 */
export const WHATSAPP_PLACEHOLDER: string = '5500000000000';

export const SHOP = {
  name: 'Navalha de Ouro',
  fullName: 'Barbearia Navalha de Ouro',
  since: 2015,
  address: 'Rua Dom Pedro II, 450',
  district: 'Centro',
  owner: 'Marcelo',
  instagram: '@navalhadeouro',
  rating: 4.9,
  reviewCount: 327,
  /** WhatsApp da barbearia (fictícia). */
  whatsapp: WHATSAPP_PLACEHOLDER as string,
} as const;

/** WhatsApp da Rock Software Solutions, usado no crédito do rodapé. */
export const ROCK_WHATSAPP: string = WHATSAPP_PLACEHOLDER;

export const ROCK_MESSAGE =
  'Olá! Vi o site da Navalha de Ouro feito pela Rock Software Solutions e quero um igual para a minha barbearia.';

export const SHOP_MESSAGE = 'Olá, Navalha de Ouro! Quero tirar uma dúvida.';

/** Chaves do localStorage. */
export const STORAGE_KEYS = {
  bookings: 'ndo-bookings',
  stamps: 'ndo-stamps',
  plan: 'ndo-plan',
} as const;
