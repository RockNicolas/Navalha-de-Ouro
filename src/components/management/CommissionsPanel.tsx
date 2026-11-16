import { useState } from 'react';
import { BARBERS } from '../../data/catalog';
import { BARBER_SALES, DEFAULT_COMMISSION } from '../../data/demo';
import { brl } from '../../lib/format';
import type { BarberId } from '../../types';
import { Avatar } from '../ui/Avatar';

export function CommissionsPanel() {
  const [pct, setPct] = useState<Record<BarberId, number>>(DEFAULT_COMMISSION);

  const totalSales = BARBERS.reduce((s, b) => s + BARBER_SALES[b.id], 0);
  const totalComm = BARBERS.reduce((s, b) => s + (BARBER_SALES[b.id] * pct[b.id]) / 100, 0);

  const update = (id: BarberId, value: number) =>
    setPct((p) => ({ ...p, [id]: Math.min(100, Math.max(0, Number.isFinite(value) ? value : 0)) }));

  return (
    <>
      <div className="panel-head">
        <h3>Comissões do mês</h3>
        <span className="muted small">Arraste a % e veja o cálculo na hora</span>
      </div>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Profissional</th>
              <th scope="col">Faturado</th>
              <th scope="col">Comissão</th>
              <th scope="col">A pagar</th>
            </tr>
          </thead>
          <tbody>
            {BARBERS.map((b) => (
              <tr key={b.id}>
                <th scope="row">
                  <span className="cm-name">
                    <Avatar name={b.name} hue={b.hue} size="sm" />
                    {b.name}
                  </span>
                </th>
                <td>{brl(BARBER_SALES[b.id])}</td>
                <td>
                  <span className="cm-pct">
                    <input
                      type="range"
                      min={0}
                      max={60}
                      step={1}
                      value={pct[b.id]}
                      onChange={(e) => update(b.id, Number(e.target.value))}
                      aria-label={`Comissão de ${b.name} em porcentagem`}
                    />
                    <output>{pct[b.id]}%</output>
                  </span>
                </td>
                <td className="gold strong">{brl((BARBER_SALES[b.id] * pct[b.id]) / 100)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">Total</th>
              <td>{brl(totalSales)}</td>
              <td />
              <td className="gold strong">{brl(totalComm)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <p className="muted small cm-foot">
        Fica na barbearia: <b className="cream">{brl(totalSales - totalComm)}</b>
      </p>
    </>
  );
}
