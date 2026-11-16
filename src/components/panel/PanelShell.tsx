import { SHOP } from '../../config';
import type { Session } from '../../lib/session';
import type { MgmtTab } from '../../types';
import { ManagementApp } from '../management/ManagementApp';
import { Avatar } from '../ui/Avatar';
import { Icon } from '../ui/Icon';

const TABS_BY_ROLE: Record<Session['role'], MgmtTab[]> = {
  dono: ['agenda', 'clientes', 'financeiro', 'comissoes', 'lembretes'],
  barbeiro: ['agenda', 'comissoes'],
};

interface PanelShellProps {
  session: Session;
  onLogout: () => void;
}

export function PanelShell({ session, onLogout }: PanelShellProps) {
  return (
    <div className="team-shell">
      <header className="team-bar">
        <div className="team-id">
          <span className="team-lock" aria-hidden="true">
            <Icon name="lock" />
          </span>
          <div>
            <h1 id="team-title">Painel · {SHOP.name}</h1>
            <small>Área da equipe · dados de exemplo</small>
          </div>
        </div>
        <div className="team-user">
          <Avatar name={session.name} hue={session.role === 'dono' ? 280 : 38} size="sm" />
          <span>
            {session.name}
            <small>{session.role}</small>
          </span>
        </div>
        <a className="btn btn-ghost btn-sm team-site" href={import.meta.env.BASE_URL} target="_blank" rel="noopener">
          <Icon name="globe" /> <span>Ver site</span>
        </a>
        <button type="button" className="btn btn-ghost btn-sm team-close" onClick={onLogout}>
          <Icon name="x" /> <span>Sair</span>
        </button>
      </header>
      <main className="team-body">
        <div className="app">
          <ManagementApp tabs={TABS_BY_ROLE[session.role]} barberId={session.barberId} />
        </div>
      </main>
    </div>
  );
}
