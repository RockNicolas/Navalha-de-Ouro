import { useRef, type KeyboardEvent } from 'react';
import { useApp } from '../../context/AppContext';
import type { BarberId, MgmtTab } from '../../types';
import { Icon, type IconName } from '../ui/Icon';
import { AgendaPanel } from './AgendaPanel';
import { BarberDashboard } from './BarberDashboard';
import { TeamPanel } from './TeamPanel';
import { ClientsPanel } from './ClientsPanel';
import { CommissionsPanel } from './CommissionsPanel';
import { FinancePanel } from './FinancePanel';
import { RemindersPanel } from './RemindersPanel';
import './management.css';

const ALL_TABS: { id: MgmtTab; label: string; mine: string; icon: IconName }[] = [
  { id: 'desempenho', label: 'Meu mês', mine: 'Meu mês', icon: 'star' },
  { id: 'agenda', label: 'Agenda', mine: 'Minha agenda', icon: 'calendar' },
  { id: 'equipe', label: 'Equipe', mine: 'Equipe', icon: 'scissors' },
  { id: 'clientes', label: 'Clientes', mine: 'Clientes', icon: 'users' },
  { id: 'financeiro', label: 'Financeiro', mine: 'Financeiro', icon: 'chart' },
  { id: 'comissoes', label: 'Comissões', mine: 'Minhas comissões', icon: 'card' },
  { id: 'lembretes', label: 'Lembretes', mine: 'Lembretes', icon: 'bell' },
];

interface ManagementAppProps {
  /** Abas liberadas para o perfil logado (padrão: todas). */
  tabs?: MgmtTab[];
  /** Quando é um barbeiro, mostra só os dados dele. */
  barberId?: BarberId;
}

/** Sistema de gestão com abas (padrão WAI-ARIA de tabs). */
export function ManagementApp({ tabs, barberId }: ManagementAppProps) {
  const { mgmtTab, setMgmtTab } = useApp();
  const tabRefs = useRef<Partial<Record<MgmtTab, HTMLButtonElement | null>>>({});

  const visible = ALL_TABS.filter((t) => !tabs || tabs.includes(t.id));
  const active = visible.some((t) => t.id === mgmtTab) ? mgmtTab : visible[0].id;

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const idx = visible.findIndex((t) => t.id === active);
    let next = idx;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (idx + 1) % visible.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (idx - 1 + visible.length) % visible.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = visible.length - 1;
    else return;
    e.preventDefault();
    const id = visible[next].id;
    setMgmtTab(id);
    tabRefs.current[id]?.focus();
  }

  return (
    <div className="app-main">
      <div className="tabs" role="tablist" aria-label="Módulos do sistema" onKeyDown={onKeyDown}>
        {visible.map((t) => (
          <button
            key={t.id}
            ref={(el) => {
              tabRefs.current[t.id] = el;
            }}
            role="tab"
            type="button"
            id={`tab-${t.id}`}
            aria-controls={`panel-${t.id}`}
            aria-selected={active === t.id}
            tabIndex={active === t.id ? 0 : -1}
            onClick={() => setMgmtTab(t.id)}
          >
            <Icon name={t.icon} />
            {barberId ? t.mine : t.label}
          </button>
        ))}
      </div>
      <div className="panels">
        {visible.map((t) => (
          <div
            key={t.id}
            className="panel"
            role="tabpanel"
            id={`panel-${t.id}`}
            aria-labelledby={`tab-${t.id}`}
            tabIndex={0}
            hidden={active !== t.id}
          >
            {t.id === 'desempenho' && barberId && (
              <BarberDashboard barberId={barberId} active={active === 'desempenho'} />
            )}
            {t.id === 'agenda' && <AgendaPanel barberId={barberId} />}
            {t.id === 'equipe' && <TeamPanel active={active === 'equipe'} />}
            {t.id === 'clientes' && <ClientsPanel />}
            {t.id === 'financeiro' && <FinancePanel active={active === 'financeiro'} />}
            {t.id === 'comissoes' && <CommissionsPanel barberId={barberId} />}
            {t.id === 'lembretes' && <RemindersPanel />}
          </div>
        ))}
      </div>
    </div>
  );
}
