import type { Barber, BarberId, Service, ServiceId } from '../types';

export const SERVICES: Service[] = [
  { id: 'corte', name: 'Corte', minutes: 40, price: 45, category: 'cabelo', desc: 'Tesoura ou máquina, com lavagem e finalização' },
  { id: 'barba', name: 'Barba', minutes: 30, price: 35, category: 'barba', desc: 'Toalha quente, navalha e hidratação' },
  { id: 'combo', name: 'Corte + Barba', minutes: 70, price: 70, category: 'combo', desc: 'O pacote completo, com toalha quente', tag: 'Mais pedido' },
  { id: 'infantil', name: 'Corte infantil', minutes: 30, price: 40, category: 'cabelo', desc: 'Até 12 anos, com toda a paciência' },
  { id: 'sobrancelha', name: 'Sobrancelha', minutes: 15, price: 15, category: 'barba', desc: 'Acabamento na navalha' },
  { id: 'pigmentacao', name: 'Pigmentação', minutes: 40, price: 60, category: 'cabelo', desc: 'Disfarça falhas e realça o desenho do corte' },
];

export const BARBERS: Barber[] = [
  {
    id: 'rafael', name: 'Rafael', specialty: 'Degradê e navalhado', years: 9, rating: 4.9, hue: 38,
    bio: 'Fera do degradê. Detalhista, não deixa você sair com o pezinho torto.',
  },
  {
    id: 'diego', name: 'Diego', specialty: 'Barba e corte clássico', years: 7, rating: 5.0, hue: 4,
    bio: 'Barba com toalha quente e acabamento na navalha. Clássico de verdade.',
  },
  {
    id: 'thiago', name: 'Thiago', specialty: 'Social e infantil', years: 5, rating: 4.8, hue: 212,
    bio: 'Paciência de sobra com a criançada e corte social impecável.',
  },
];

export function getService(id: ServiceId): Service {
  return SERVICES.find((s) => s.id === id) ?? SERVICES[0];
}

export function getBarber(id: BarberId): Barber {
  return BARBERS.find((b) => b.id === id) ?? BARBERS[0];
}
