import { useRef, type KeyboardEvent } from 'react';
import { useApp } from '../../context/AppContext';
import type { MgmtTab } from '../../types';
import { Icon, type IconName } from '../ui/Icon';
import { AgendaPanel } from './AgendaPanel';
import { ClientsPanel } from './ClientsPanel';
import { CommissionsPanel } from './CommissionsPanel';
import { FinancePanel } from './FinancePanel';
import { RemindersPanel } from './RemindersPanel';
import './management.css';

const TABS: { id: MgmtTab; label: string; icon: IconName }[] = [
  { id: 'agenda', label: 'Agenda', icon: 'calendar' },
  { id: 'clientes', label: 'Clientes', icon: 'users' },
  { id: 'financeiro', label: 'Financeiro', icon: 'chart' },
  { id: 'comissoes', label: 'Comissões', icon: 'scissors' },
  { id: 'lembretes', label: 'Lembretes', icon: 'bell' },
];

/** Sistema de gestão com abas (padrão WAI-ARIA de tabs). */
export function ManagementApp() {
  const { mgmtTab, setMgmtTab } = useApp();
  const tabRefs = useRef<Partial<Record<MgmtTab, HTMLButtonElement | null>>>({});

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const idx = TABS.findIndex((t) => t.id === mgmtTab);
    let next = idx;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (idx + 1) % TABS.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (idx - 1 + TABS.length) % TABS.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = TABS.length - 1;
    else return;
    e.preventDefault();
    const id = TABS[next].id;
    setMgmtTab(id);
    tabRefs.current[id]?.focus();
  }

  return (
    <div className="app-main">
      <div className="tabs" role="tablist" aria-label="Módulos do sistema" onKeyDown={onKeyDown}>
        {TABS.map((t) => (
          <button
            key={t.id}
            ref={(el) => {
              tabRefs.current[t.id] = el;
            }}
            role="tab"
            type="button"
            id={`tab-${t.id}`}
            aria-controls={`panel-${t.id}`}
            aria-selected={mgmtTab === t.id}
            tabIndex={mgmtTab === t.id ? 0 : -1}
            onClick={() => setMgmtTab(t.id)}
          >
            <Icon name={t.icon} />
            {t.label}
          </button>
        ))}
      </div>
      <div className="panels">
        {TABS.map((t) => (
          <div
            key={t.id}
            className="panel"
            role="tabpanel"
            id={`panel-${t.id}`}
            aria-labelledby={`tab-${t.id}`}
            tabIndex={0}
            hidden={mgmtTab !== t.id}
          >
            {t.id === 'agenda' && <AgendaPanel />}
            {t.id === 'clientes' && <ClientsPanel />}
            {t.id === 'financeiro' && <FinancePanel active={mgmtTab === 'financeiro'} />}
            {t.id === 'comissoes' && <CommissionsPanel />}
            {t.id === 'lembretes' && <RemindersPanel />}
          </div>
        ))}
      </div>
    </div>
  );
}
