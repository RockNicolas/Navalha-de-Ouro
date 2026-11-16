import { useState } from 'react';
import { BARBERS } from '../../data/catalog';
import { DEFAULT_COMMISSION } from '../../data/demo';
import { barberAppointments, barberCuts, barberSales, totalSales } from '../../data/stats';
import { brl } from '../../lib/format';
import type { BarberId } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Icon } from '../ui/Icon';
import { BarberDashboard } from './BarberDashboard';

/** Aba do dono: resumo de cada barbeiro e acesso ao painel individual de cada um. */
export function TeamPanel({ active }: { active: boolean }) {
  const [selected, setSelected] = useState<BarberId | null>(null);

  if (selected) {
    return (
      <>
        <button type="button" className="btn btn-link btn-sm team-back" onClick={() => setSelected(null)}>
          <Icon name="arrow-left" /> Toda a equipe
        </button>
        <BarberDashboard barberId={selected} active={active} ownerView />
      </>
    );
  }

  const total = totalSales();

  return (
    <>
      <div className="panel-head">
        <h3>Equipe · desempenho do mês</h3>
        <span className="muted small">Clique num barbeiro para ver o painel dele</span>
      </div>
      <ul className="team-cards">
        {BARBERS.map((b) => {
          const sales = barberSales(b.id);
          const share = Math.round((sales / total) * 100);
          return (
            <li key={b.id}>
              <button type="button" className="team-card" onClick={() => setSelected(b.id)}>
                <span className="tc-head">
                  <Avatar name={b.name} hue={b.hue} size="lg" />
                  <span>
                    <b>{b.name}</b>
                    <small>{b.specialty}</small>
                  </span>
                  <span className="tc-rating">★ {b.rating.toLocaleString('pt-BR', { minimumFractionDigits: 1 })}</span>
                </span>
                <dl className="tc-stats">
                  <div>
                    <dt>Atendimentos</dt>
                    <dd>{barberAppointments(b.id)}</dd>
                  </div>
                  <div>
                    <dt>Cortes</dt>
                    <dd>{barberCuts(b.id)}</dd>
                  </div>
                  <div>
                    <dt>Faturado</dt>
                    <dd>{brl(sales).replace(',00', '')}</dd>
                  </div>
                  <div>
                    <dt>Comissão</dt>
                    <dd className="gold">{brl((sales * DEFAULT_COMMISSION[b.id]) / 100).replace(',00', '')}</dd>
                  </div>
                </dl>
                <span className="tc-share">
                  <span className="tc-share-bar" aria-hidden="true">
                    <i style={{ width: `${share}%` }} />
                  </span>
                  <small>{share}% do faturamento da barbearia</small>
                </span>
                <span className="tc-cta">
                  Ver painel do {b.name} <Icon name="arrow" />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
