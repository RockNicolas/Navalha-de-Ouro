import type { BarberId } from '../types';

/*
 * Login de DEMONSTRAÇÃO, feito só no navegador.
 * Serve para mostrar a separação entre site e painel; não é segurança de verdade.
 * Num cliente real, o login fica num servidor (ex.: Supabase) e cada pessoa tem a sua senha.
 */

export type Role = 'dono' | 'barbeiro';

export interface Session {
  name: string;
  email: string;
  role: Role;
  /** Para barbeiros: de quem é a agenda e a comissão. */
  barberId?: BarberId;
}

interface DemoUser extends Session {
  password: string;
}

export const DEMO_USERS: DemoUser[] = [
  { name: 'Marcelo', email: 'dono@navalhadeouro.com.br', password: 'demo123', role: 'dono' },
  { name: 'Rafael', email: 'rafael@navalhadeouro.com.br', password: 'demo123', role: 'barbeiro', barberId: 'rafael' },
  { name: 'Diego', email: 'diego@navalhadeouro.com.br', password: 'demo123', role: 'barbeiro', barberId: 'diego' },
  { name: 'Thiago', email: 'thiago@navalhadeouro.com.br', password: 'demo123', role: 'barbeiro', barberId: 'thiago' },
];

const KEY = 'ndo-session';

const toSession = ({ name, email, role, barberId }: DemoUser): Session => ({ name, email, role, barberId });

export function login(email: string, password: string): Session | null {
  const user = DEMO_USERS.find((u) => u.email === email.trim().toLowerCase() && u.password === password);
  return user ? toSession(user) : null;
}

/** Entra direto com um usuário de demonstração (botões da tela de login). */
export const demoSession = (email: string): Session =>
  toSession(DEMO_USERS.find((u) => u.email === email) ?? DEMO_USERS[0]);

export function readSession(): Session | null {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as Session;
    return s && (s.role === 'dono' || s.role === 'barbeiro') ? s : null;
  } catch {
    return null;
  }
}

export function saveSession(s: Session): void {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* sem armazenamento: o login vale só até recarregar a página */
  }
}

export function clearSession(): void {
  try {
    window.sessionStorage.removeItem(KEY);
  } catch {
    /* nada a fazer */
  }
}
