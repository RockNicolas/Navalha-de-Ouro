import { useMemo, type CSSProperties } from 'react';
import { useApp } from '../../context/AppContext';
import { getBarber, getService } from '../../data/catalog';
import { BARBER_MONTH, DEFAULT_COMMISSION, SAMPLE_AGENDA } from '../../data/demo';
import { barberAppointments, barberCuts, barberSales, barberServices, weekRevenue } from '../../data/stats';
import { useNow } from '../../hooks/useNow';
import { MONTHS_LONG, dayDiff, toMinutes } from '../../lib/dates';
import { brl } from '../../lib/format';
import type { BarberId } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Icon } from '../ui/Icon';
import { WeekChart } from './WeekChart';

interface BarberDashboardProps {
  barberId: BarberId;
  /** Para animar o gráfico quando a aba fica visível. */
  active: boolean;
  /** true quando quem está vendo é o dono (muda os textos). */
  ownerView?: boolean;
}

/** Painel individual: o mês de um barbeiro (atendimentos, faturamento, comissão, agenda de hoje). */
export function BarberDashboard({ barberId, active, ownerView = false }: BarberDashboardProps) {
  const { bookings } = useApp();
  const now = useNow();
  const barber = getBarber(barberId);
  const month = BARBER_MONTH[barberId];

  const lines = barberServices(barberId);
  const appointments = barberAppointments(barberId);
  const cuts = barberCuts(barberId);
  const sales = barberSales(barberId);
  const pct = DEFAULT_COMMISSION[barberId];
  const commission = (sales * pct) / 100;
  const maxCount = Math.max(...lines.map((l) => l.count), 1);

  /* Agenda de hoje: exemplos fixos + o que chegou pelo site para hoje. */
  const today = useMemo(() => {
    const sample = SAMPLE_AGENDA.filter((a) => a.barberId === barberId).map((a) => ({
      time: a.time,
      client: a.client,
      service: getService(a.serviceId).name,
      online: false,
    }));
    const online = bookings
      .filter((b) => b.barberId === barberId && dayDiff(b.date) === 0)
      .map((b) => ({ time: b.time, client: b.name, service: getService(b.serviceId).name, online: true }));
    return [...sample, ...online].sort((a, b) => a.time.localeCompare(b.time));
  }, [bookings, barberId]);

  const nowMin = now.getHours() * 60 + now.getMinutes();
  const next = today.find((t) => toMinutes(t.time) >= nowMin);
  const onlineAll = bookings.filter((b) => b.barberId === barberId).length;

  const kpis = [
    { label: 'Atendimentos no mês', value: String(appointments), sub: `${cuts} cortes de cabelo` },
    { label: 'Faturado no mês', value: brl(sales).replace(',00', ''), sub: `ticket médio ${brl(sales / appointments)}` },
    {
      label: ownerView ? 'Comissão a pagar' : 'Minha comissão',
      value: brl(commission),
      sub: `${pct}% do faturado`,
      highlight: true,
    },
    {
      label: 'Avaliação',
      value: `★ ${barber.rating.toLocaleString('pt-BR', { minimumFractionDigits: 1 })}`,
      sub: `${month.clients} clientes · ${month.returning}% voltaram`,
    },
  ];

  return (
    <div className="bd">
      <div className="panel-head">
        <h3 className="bd-title">
          <Avatar name={barber.name} hue={barber.hue} size="md" />
          <span>
            {ownerView ? `Painel do ${barber.name}` : `Olá, ${barber.name}!`}
            <small>
              {ownerView ? barber.specialty : 'Seu mês até agora'} · {MONTHS_LONG[now.getMonth()]}
            </small>
          </span>
        </h3>
      </div>

      <div className="kpis">
        {kpis.map((k) => (
          <div className={`kpi${k.highlight ? ' kpi-gold' : ''}`} key={k.label}>
            <small>{k.label}</small>
            <b>{k.value}</b>
            <span>{k.sub}</span>
          </div>
        ))}
      </div>

      <div className="bd-grid">
        <section className="bd-card" aria-labelledby={`bd-svc-${barberId}`}>
          <h4 id={`bd-svc-${barberId}`}>Serviços no mês</h4>
          <ul className="svc-bars">
            {lines.map((l) => (
              <li key={l.serviceId} style={{ '--w': `${(l.count / maxCount) * 100}%` } as CSSProperties}>
                <span className="sb-name">{l.name}</span>
                <span className="sb-bar" aria-hidden="true">
                  <i />
                </span>
                <b className="sb-count">{l.count}</b>
                <span className="sb-value">{brl(l.value).replace(',00', '')}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="bd-side">
          <section className="bd-card bd-today" aria-labelledby={`bd-today-${barberId}`}>
            <h4 id={`bd-today-${barberId}`}>
              <Icon name="calendar" /> Hoje: {today.length} {today.length === 1 ? 'atendimento' : 'atendimentos'}
            </h4>
            {next ? (
              <p className="bd-next">
                <span className="bd-next-time">{next.time}</span>
                <span>
                  <b>Próximo: {next.client}</b>
                  <small>
                    {next.service}
                    {next.online && ' · agendado pelo site'}
                  </small>
                </span>
              </p>
            ) : (
              <p className="muted small">Sem mais atendimentos hoje.</p>
            )}
            {onlineAll > 0 && (
              <p className="bd-online">
                <span className="pulse" aria-hidden="true" /> {onlineAll}{' '}
                {onlineAll === 1 ? 'agendamento novo' : 'agendamentos novos'} pelo site
              </p>
            )}
          </section>
          <WeekChart data={weekRevenue(barberId)} active={active} title="Faturado nesta semana" />
        </div>
      </div>
    </div>
  );
}
