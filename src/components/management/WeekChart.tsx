import { useEffect, useState, type CSSProperties } from 'react';
import { brl } from '../../lib/format';

interface WeekChartProps {
  data: { day: string; value: number }[];
  /** Anima as barras quando o gráfico fica visível. */
  active: boolean;
  title?: string;
}

export function WeekChart({ data, active, title = 'Faturamento desta semana' }: WeekChartProps) {
  const [grown, setGrown] = useState(false);

  useEffect(() => {
    if (!active) {
      setGrown(false);
      return;
    }
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setGrown(true)));
    return () => cancelAnimationFrame(id);
  }, [active]);

  const max = Math.max(...data.map((d) => d.value), 1);
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="chart-wrap">
      <p className="chart-title">
        {title} <b>{brl(total)}</b>
      </p>
      <ul className={`chart${grown ? ' grown' : ''}`} aria-label={`${title}, por dia`}>
        {data.map((d) => (
          <li key={d.day} style={{ '--h': `${(d.value / max) * 100}%` } as CSSProperties}>
            <span className="bar-val">{brl(d.value).replace(',00', '')}</span>
            <span className="bar" aria-hidden="true" />
            <span className="bar-day">{d.day}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
