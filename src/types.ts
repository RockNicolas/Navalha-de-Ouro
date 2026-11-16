export type ServiceId = 'corte' | 'barba' | 'combo' | 'sobrancelha' | 'pigmentacao';
export type BarberId = 'rafael' | 'diego' | 'thiago';
export type BarberChoice = BarberId | 'any';
export type MgmtTab = 'agenda' | 'clientes' | 'financeiro' | 'comissoes';

export interface Service {
  id: ServiceId;
  name: string;
  minutes: number;
  price: number;
  desc: string;
  tag?: string;
}

export interface Barber {
  id: BarberId;
  name: string;
  specialty: string;
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
