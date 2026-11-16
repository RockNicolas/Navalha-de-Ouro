import type { Barber, BarberId, Service, ServiceId } from '../types';

/** Serviços e preços de exemplo usados nas demonstrações. */
export const SERVICES: Service[] = [
  { id: 'corte', name: 'Corte', minutes: 40, price: 45, desc: 'Tesoura ou máquina, com lavagem' },
  { id: 'barba', name: 'Barba', minutes: 30, price: 35, desc: 'Toalha quente e navalha' },
  { id: 'combo', name: 'Corte + Barba', minutes: 70, price: 70, desc: 'O pacote completo', tag: 'Mais pedido' },
  { id: 'sobrancelha', name: 'Sobrancelha', minutes: 15, price: 15, desc: 'Acabamento na navalha' },
  { id: 'pigmentacao', name: 'Pigmentação', minutes: 40, price: 60, desc: 'Disfarça falhas e realça o corte' },
];

/** Profissionais fictícios. */
export const BARBERS: Barber[] = [
  { id: 'rafael', name: 'Rafael', specialty: 'Degradê e navalhado', hue: 38 },
  { id: 'diego', name: 'Diego', specialty: 'Barba e corte clássico', hue: 4 },
  { id: 'thiago', name: 'Thiago', specialty: 'Social e infantil', hue: 212 },
];

export function getService(id: ServiceId): Service {
  return SERVICES.find((s) => s.id === id) ?? SERVICES[0];
}

export function getBarber(id: BarberId): Barber {
  return BARBERS.find((b) => b.id === id) ?? BARBERS[0];
}
