export type ServiceId = 'corte' | 'barba' | 'combo' | 'infantil' | 'sobrancelha' | 'pigmentacao';
export type ServiceCategory = 'cabelo' | 'barba' | 'combo';
export type BarberId = 'rafael' | 'diego' | 'thiago';
export type BarberChoice = BarberId | 'any';
export type MgmtTab = 'desempenho' | 'agenda' | 'equipe' | 'clientes' | 'financeiro' | 'comissoes' | 'lembretes';

export interface Service {
  id: ServiceId;
  name: string;
  minutes: number;
  price: number;
  desc: string;
  category: ServiceCategory;
  tag?: string;
}

export interface Barber {
  id: BarberId;
  name: string;
  specialty: string;
  bio: string;
  years: number;
  rating: number;
  /** Matiz (0–360) usado no avatar em gradiente. */
  hue: number;
}

export interface Booking {
  id: string;
  serviceId: ServiceId;
  barberId: BarberId;
  /** Data local no formato AAAA-MM-DD. */
  date: string;
  /** Horário HH:MM. */
  time: string;
  name: string;
  phone: string;
  createdAt: number;
}

export type NewBooking = Omit<Booking, 'id' | 'createdAt'>;

/** Pedido para abrir o agendamento já com algo escolhido (vindo de Serviços ou Equipe). */
export interface BookingIntent {
  serviceId?: ServiceId;
  barberId?: BarberChoice;
  nonce: number;
}
