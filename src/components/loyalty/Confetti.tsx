import { useMemo, type CSSProperties } from 'react';

const COLORS = ['#c9a24b', '#e2c274', '#f3ece0', '#b3342d', '#27466f'];

/** Explosão de confete em CSS puro; remonta a cada nova "key". */
export function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        x: (Math.random() - 0.5) * 340,
        y: -(Math.random() * 220 + 60),
        r: Math.random() * 720 - 360,
        d: Math.random() * 0.25,
        c: COLORS[i % COLORS.length],
      })),
    [],
  );

  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p, i) => (
        <i
          key={i}
          style={
            {
              '--x': `${p.x}px`,
              '--y': `${p.y}px`,
              '--r': `${p.r}deg`,
              animationDelay: `${p.d}s`,
              background: p.c,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
