export const brl = (n: number): string =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export const pad = (n: number): string => String(n).padStart(2, '0');

export const onlyDigits = (v: string): string => v.replace(/\D/g, '');

/** Máscara de telefone brasileiro: (11) 99999-9999 ou (11) 9999-9999. */
export function maskPhone(value: string): string {
  const d = onlyDigits(value).slice(0, 11);
  if (d.length === 0) return '';
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export const isValidPhone = (v: string): boolean => {
  const len = onlyDigits(v).length;
  return len === 10 || len === 11;
};

export const firstName = (s: string): string => s.trim().split(/\s+/)[0] ?? '';

export function initials(s: string): string {
  const parts = s.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

/** Remove acentos e deixa minúsculo, para buscas. */
export const normalize = (s: string): string =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/** Gera um "domínio" a partir do nome da barbearia. */
export function slugify(s: string): string {
  return normalize(s).replace(/[^a-z0-9]+/g, '') || 'suabarbearia';
}
