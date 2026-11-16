import { useEffect, useState, type CSSProperties } from 'react';
import { MONTH, WEEK_REVENUE } from '../../data/demo';
import { brl } from '../../lib/format';

export function FinancePanel({ active }: { active: boolean }) {
  const [grown, setGrown] = useState(false);

  /* Anima as barras toda vez que a aba é aberta. */
  useEffect(() => {
    if (!active) {
      setGrown(false);
      return;
    }
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setGrown(true)));
    return () => cancelAnimationFrame(id);
  }, [active]);

  const max = Math.max(...WEEK_REVENUE.map((d) => d.value));
  const weekTotal = WEEK_REVENUE.reduce((s, d) => s + d.value, 0);
  const kpis = [
    { label: 'Faturamento do mês', value: brl(MONTH.revenue).replace(',00', ''), sub: 'serviços + produtos' },
    { label: 'Atendimentos', value: String(MONTH.appointments), sub: 'no mês' },
    { label: 'Ticket médio', value: brl(MONTH.revenue / MONTH.appointments), sub: 'por atendimento' },
    {
      label: 'Assinantes do clube',
      value: String(MONTH.subscribers),
      sub: `${brl(MONTH.subscribers * MONTH.subscriptionAverage)} recorrentes/mês`,
    },
  ];

  return (
    <>
      <div className="panel-head">
        <h3>Financeiro · este mês</h3>
      </div>
      <div className="kpis">
        {kpis.map((k) => (
          <div className="kpi" key={k.label}>
            <small>{k.label}</small>
            <b>{k.value}</b>
            <span>{k.sub}</span>
          </div>
        ))}
      </div>
      <div className="chart-wrap">
        <p className="chart-title">
          Faturamento desta semana <b>{brl(weekTotal)}</b>
        </p>
        <ul className={`chart${grown ? ' grown' : ''}`} aria-label="Faturamento por dia da semana">
          {WEEK_REVENUE.map((d) => (
            <li key={d.day} style={{ '--h': `${(d.value / max) * 100}%` } as CSSProperties}>
              <span className="bar-val">{brl(d.value).replace(',00', '')}</span>
              <span className="bar" aria-hidden="true" />
              <span className="bar-day">{d.day}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
