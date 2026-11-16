import { useEffect, useRef } from 'react';
import { SHOP } from '../../config';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../ui/Avatar';
import { Icon } from '../ui/Icon';
import { ManagementApp } from './ManagementApp';
import './management.css';

const HASH = '#painel';

/**
 * Área da equipe: o painel de gestão da barbearia em tela cheia.
 * Abre pelo link "Área da equipe" ou direto pela URL com #painel.
 */
export function TeamArea() {
  const { teamOpen, setTeamOpen } = useApp();
  const dialogRef = useRef<HTMLDialogElement>(null);

  /* Sincroniza com o endereço: /#painel abre o painel (útil para apresentar). */
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === HASH) setTeamOpen(true);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, [setTeamOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (teamOpen) {
      if (!dialog.open) dialog.showModal();
      document.body.classList.add('panel-open');
    } else {
      if (dialog.open) dialog.close();
      document.body.classList.remove('panel-open');
      if (window.location.hash === HASH) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }
  }, [teamOpen]);

  return (
    <dialog ref={dialogRef} className="team-dialog" aria-labelledby="team-title" onClose={() => setTeamOpen(false)}>
      {teamOpen && (
        <div className="team-shell">
          <header className="team-bar">
            <div className="team-id">
              <span className="team-lock" aria-hidden="true">
                <Icon name="lock" />
              </span>
              <div>
                <h2 id="team-title">Painel · {SHOP.name}</h2>
                <small>Área da equipe · demonstração com dados de exemplo</small>
              </div>
            </div>
            <div className="team-user">
              <Avatar name={SHOP.owner} hue={280} size="sm" />
              <span>
                {SHOP.owner}
                <small>dono</small>
              </span>
            </div>
            <button type="button" className="btn btn-ghost btn-sm team-close" onClick={() => setTeamOpen(false)}>
              <Icon name="x" /> <span>Voltar ao site</span>
            </button>
          </header>
          <div className="team-body">
            <div className="app">
              <ManagementApp />
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
