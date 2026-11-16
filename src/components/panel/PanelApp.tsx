import { useState } from 'react';
import { clearSession, readSession, saveSession, type Session } from '../../lib/session';
import { PanelLogin } from './PanelLogin';
import { PanelShell } from './PanelShell';
import './panel.css';

/** Página do painel: sem sessão mostra o login; com sessão, o sistema. */
export function PanelApp() {
  const [session, setSession] = useState<Session | null>(readSession);

  if (!session) {
    return (
      <PanelLogin
        onLogin={(s) => {
          saveSession(s);
          setSession(s);
        }}
      />
    );
  }

  return (
    <PanelShell
      session={session}
      onLogout={() => {
        clearSession();
        setSession(null);
      }}
    />
  );
}
