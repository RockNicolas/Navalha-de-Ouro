import type { BarberId, ServiceId } from '../types';

/* Todos os dados abaixo são de exemplo, só para as demonstrações. */

export interface AgendaItem {
  time: string;
  client: string;
  serviceId: ServiceId;
  barberId: BarberId;
}

export const SAMPLE_AGENDA: AgendaItem[] = [
  { time: '09:00', client: 'Marcos Lima', serviceId: 'corte', barberId: 'rafael' },
  { time: '09:30', client: 'João Pedro', serviceId: 'barba', barberId: 'diego' },
  { time: '10:00', client: 'Felipe Souza', serviceId: 'combo', barberId: 'rafael' },
  { time: '10:30', client: 'André Costa', serviceId: 'pigmentacao', barberId: 'thiago' },
  { time: '11:30', client: 'Lucas Prado', serviceId: 'corte', barberId: 'diego' },
  { time: '13:30', client: 'Bruno Alves', serviceId: 'combo', barberId: 'rafael' },
  { time: '14:30', client: 'Rodrigo Melo', serviceId: 'sobrancelha', barberId: 'thiago' },
  { time: '15:30', client: 'Carlos Mendes', serviceId: 'combo', barberId: 'rafael' },
  { time: '16:30', client: 'Gustavo Reis', serviceId: 'barba', barberId: 'diego' },
  { time: '17:30', client: 'Pedro Nunes', serviceId: 'corte', barberId: 'thiago' },
];

export type ClientTag = 'Clube' | 'Fidelidade' | 'Novo';

export interface Client {
  name: string;
  phone: string;
  visits: number;
  lastVisit: string;
  spent: number;
  tag?: ClientTag;
  note?: string;
  history: { when: string; service: string; barber: string; price: number }[];
}

export const CLIENTS: Client[] = [
  {
    name: 'Carlos Mendes', phone: '(11) 98765-4321', visits: 18, lastVisit: 'há 12 dias', spent: 1260, tag: 'Clube',
    note: 'Prefere degradê baixo, máquina 1 na lateral.',
    history: [
      { when: 'há 12 dias', service: 'Corte + Barba', barber: 'Rafael', price: 70 },
      { when: 'há 26 dias', service: 'Corte + Barba', barber: 'Rafael', price: 70 },
      { when: 'há 40 dias', service: 'Barba', barber: 'Diego', price: 35 },
    ],
  },
  {
    name: 'Lucas Prado', phone: '(11) 99812-3344', visits: 9, lastVisit: 'há 5 dias', spent: 405, tag: 'Fidelidade',
    history: [
      { when: 'há 5 dias', service: 'Corte', barber: 'Diego', price: 45 },
      { when: 'há 21 dias', service: 'Corte', barber: 'Diego', price: 45 },
      { when: 'há 37 dias', service: 'Corte', barber: 'Rafael', price: 45 },
    ],
  },
  {
    name: 'André Costa', phone: '(11) 97654-1122', visits: 14, lastVisit: 'há 20 dias', spent: 980, tag: 'Clube',
    note: 'Pigmentação a cada 2 meses.',
    history: [
      { when: 'há 20 dias', service: 'Pigmentação', barber: 'Thiago', price: 60 },
      { when: 'há 34 dias', service: 'Corte + Barba', barber: 'Thiago', price: 70 },
      { when: 'há 49 dias', service: 'Corte', barber: 'Thiago', price: 45 },
    ],
  },
  {
    name: 'Bruno Alves', phone: '(11) 91234-5678', visits: 6, lastVisit: 'há 1 mês', spent: 330,
    note: 'Sumido há 1 mês: bom momento para mandar uma oferta.',
    history: [
      { when: 'há 1 mês', service: 'Corte + Barba', barber: 'Rafael', price: 70 },
      { when: 'há 2 meses', service: 'Corte', barber: 'Rafael', price: 45 },
    ],
  },
  {
    name: 'Gustavo Reis', phone: '(11) 93456-7890', visits: 2, lastVisit: 'há 3 dias', spent: 105, tag: 'Novo',
    history: [
      { when: 'há 3 dias', service: 'Corte + Barba', barber: 'Diego', price: 70 },
      { when: 'há 17 dias', service: 'Barba', barber: 'Diego', price: 35 },
    ],
  },
  {
    name: 'Pedro Nunes', phone: '(11) 95555-1212', visits: 11, lastVisit: 'há 9 dias', spent: 615, tag: 'Fidelidade',
    history: [
      { when: 'há 9 dias', service: 'Corte', barber: 'Thiago', price: 45 },
      { when: 'há 24 dias', service: 'Sobrancelha', barber: 'Thiago', price: 15 },
      { when: 'há 25 dias', service: 'Corte', barber: 'Thiago', price: 45 },
    ],
  },
];

/*
 * Desempenho do mês por barbeiro. É a ÚNICA fonte dos números do painel:
 * faturamento, atendimentos, comissões e o financeiro do dono são calculados
 * a partir daqui (ver data/stats.ts), então tudo fecha entre si.
 */
export interface BarberMonth {
  /** Quantidade de cada serviço feito no mês. */
  services: Partial<Record<ServiceId, number>>;
  /** Clientes diferentes atendidos no mês. */
  clients: number;
  /** % desses clientes que já tinham vindo antes. */
  returning: number;
  /** Faturamento de segunda a sábado desta semana. */
  week: number[];
}

export const BARBER_MONTH: Record<BarberId, BarberMonth> = {
  rafael: {
    services: { corte: 48, combo: 40, pigmentacao: 14, sobrancelha: 10, barba: 6 },
    clients: 84,
    returning: 78,
    week: [420, 490, 560, 700, 1050, 1330],
  },
  diego: {
    services: { combo: 36, barba: 34, corte: 22, sobrancelha: 6, pigmentacao: 2, infantil: 2 },
    clients: 71,
    returning: 81,
    week: [350, 385, 455, 560, 840, 1050],
  },
  thiago: {
    services: { corte: 38, infantil: 30, combo: 14, barba: 6, sobrancelha: 4 },
    clients: 66,
    returning: 74,
    week: [280, 315, 385, 455, 700, 875],
  },
};

export const WEEK_DAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export const MONTH = {
  subscribers: 38,
  subscriptionAverage: 129,
};

export const DEFAULT_COMMISSION: Record<BarberId, number> = { rafael: 40, diego: 40, thiago: 35 };

export interface Plan {
  id: string;
  name: string;
  price: number;
  perks: string[];
  flag?: string;
}

export const PLANS: Plan[] = [
  { id: 'essencial', name: 'Essencial', price: 79, perks: ['2 cortes por mês', '10% em produtos'] },
  {
    id: 'corte-barba', name: 'Corte & Barba', price: 129, flag: 'Recomendado',
    perks: ['2 cortes + 2 barbas por mês', 'Horário preferencial', '15% em produtos'],
  },
  { id: 'black', name: 'Black', price: 199, perks: ['Cortes e barbas ilimitados', 'Sobrancelha inclusa', 'Bebida da casa'] },
];
