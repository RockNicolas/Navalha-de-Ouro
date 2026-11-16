import { MONTH } from '../../data/demo';
import { totalAppointments, totalSales, weekRevenue } from '../../data/stats';
import { brl } from '../../lib/format';
import { WeekChart } from './WeekChart';

export function FinancePanel({ active }: { active: boolean }) {
  const revenue = totalSales();
  const appointments = totalAppointments();

  const kpis = [
    { label: 'Faturamento do mês', value: brl(revenue).replace(',00', ''), sub: 'em serviços' },
    { label: 'Atendimentos', value: String(appointments), sub: 'no mês' },
    { label: 'Ticket médio', value: brl(revenue / appointments), sub: 'por atendimento' },
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
      <WeekChart data={weekRevenue()} active={active} title="Faturamento da barbearia nesta semana" />
    </>
  );
}
