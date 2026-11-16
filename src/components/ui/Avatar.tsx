import type { CSSProperties } from 'react';
import { initials } from '../../lib/format';

interface AvatarProps {
  name: string;
  hue?: number;
  size?: 'sm' | 'md' | 'lg';
}

/** Avatar com iniciais sobre gradiente (sem fotos externas). */
export function Avatar({ name, hue = 38, size = 'md' }: AvatarProps) {
  return (
    <span className={`avatar avatar-${size}`} style={{ '--hue': hue } as CSSProperties} aria-hidden="true">
      {initials(name)}
    </span>
  );
}
