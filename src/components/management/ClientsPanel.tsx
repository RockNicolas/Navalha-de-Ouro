import { useMemo, useState } from 'react';
import { CLIENTS } from '../../data/demo';
import { brl, normalize } from '../../lib/format';
import { Avatar } from '../ui/Avatar';
import { Icon } from '../ui/Icon';

const TAG_CLASS = { Clube: 'tag-gold', Fidelidade: 'tag-blue', Novo: 'tag-green' } as const;

export function ClientsPanel() {
  const [query, setQuery] = useState('');

  const list = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return CLIENTS;
    return CLIENTS.filter((c) => normalize(c.name).includes(q) || c.phone.includes(q));
  }, [query]);

  return (
    <>
      <div className="panel-head">
        <h3>Clientes</h3>
        <label className="search">
          <Icon name="search" />
          <span className="sr-only">Buscar cliente</span>
          <input type="search" placeholder="Buscar por nome ou telefone" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
      </div>

      <div className="clients">
        {list.length === 0 && <p className="muted">Nenhum cliente encontrado para “{query}”.</p>}
        {list.map((c, i) => (
          <details key={c.name} className="client" open={i === 0 && !query}>
            <summary>
              <Avatar name={c.name} hue={(i * 57 + 20) % 360} size="sm" />
              <span className="cl-name">
                <b>{c.name}</b>
                <small>{c.phone}</small>
              </span>
              <span className="cl-stat">
                <b>{c.visits}</b>
                <small>visitas</small>
              </span>
              <span className="cl-stat hide-sm">
                <b>{c.lastVisit}</b>
                <small>última</small>
              </span>
              <span className="cl-stat">
                <b>{brl(c.spent)}</b>
                <small>total</small>
              </span>
              {c.tag ? <span className={`tag ${TAG_CLASS[c.tag]}`}>{c.tag}</span> : <span className="tag tag-empty" />}
            </summary>
            <div className="cl-body">
              {c.note && (
                <p className="cl-note">
                  <Icon name="scissors" /> {c.note}
                </p>
              )}
              <ul className="cl-history">
                {c.history.map((h, j) => (
                  <li key={j}>
                    <span>{h.when}</span>
                    <span>{h.service}</span>
                    <span>{h.barber}</span>
                    <b>{brl(h.price)}</b>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
