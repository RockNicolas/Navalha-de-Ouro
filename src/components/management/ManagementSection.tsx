import { useRef, type KeyboardEvent } from 'react';
import { useApp } from '../../context/AppContext';
import type { MgmtTab } from '../../types';
import { Icon, type IconName } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import { SectionHead } from '../ui/SectionHead';
import { AgendaPanel } from './AgendaPanel';
import { ClientsPanel } from './ClientsPanel';
import { CommissionsPanel } from './CommissionsPanel';
import { FinancePanel } from './FinancePanel';
import './management.css';

const TABS: { id: MgmtTab; label: string; icon: IconName }[] = [
  { id: 'agenda', label: 'Agenda', icon: 'calendar' },
  { id: 'clientes', label: 'Clientes', icon: 'users' },
  { id: 'financeiro', label: 'Financeiro', icon: 'chart' },
  { id: 'comissoes', label: 'Comissões', icon: 'scissors' },
];

export function ManagementSection() {
  const { shop, mgmtTab, setMgmtTab } = useApp();
  const tabRefs = useRef<Record<MgmtTab, HTMLButtonElement | null>>({
    agenda: null,
    clientes: null,
    financeiro: null,
    comissoes: null,
  });

  /* Navegação por teclado no padrão WAI-ARIA de abas. */
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
    <section className="section" id="gestao" aria-labelledby="gestao-title">
      <div className="container">
        <SectionHead
          id="gestao-title"
          number="04"
          eyebrow="Sistema de gestão"
          title="A barbearia inteira na palma da mão"
          lead="Agenda, cadastro de clientes com histórico, controle financeiro e comissão por profissional, tudo num lugar só. Clique nas abas."
        />

        <Reveal className="app">
          <div className="app-bar">
            <span className="dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <b>Painel · {shop}</b>
            <span className="tag">dados de exemplo</span>
          </div>
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
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
