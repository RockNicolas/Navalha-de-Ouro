import { useState, type FormEvent } from 'react';
import { SHOP } from '../../config';
import { demoSession, login, type Session } from '../../lib/session';
import { Icon } from '../ui/Icon';

interface PanelLoginProps {
  onLogin: (session: Session) => void;
}

export function PanelLogin({ onLogin }: PanelLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const session = login(email, password);
    if (!session) {
      setError('E-mail ou senha incorretos.');
      return;
    }
    onLogin(session);
  }

  return (
    <main className="login-page">
      <div className="login-glow" aria-hidden="true" />
      <div className="login-card">
        <span className="login-mark" aria-hidden="true">
          <Icon name="lock" />
        </span>
        <h1>Painel da equipe</h1>
        <p className="muted">Acesso restrito à equipe da {SHOP.fullName}.</p>

        <form onSubmit={submit} noValidate>
          <div className="field">
            <label htmlFor="login-email">E-mail</label>
            <input
              id="login-email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? 'login-error' : undefined}
            />
          </div>
          <div className="field">
            <label htmlFor="login-password">Senha</label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? 'login-error' : undefined}
            />
          </div>
          {error && (
            <p className="field-error login-error" id="login-error" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="btn btn-gold btn-block">
            Entrar
          </button>
        </form>

        <div className="login-demo">
          <p className="login-divider">
            <span>Acesso de demonstração</span>
          </p>
          <div className="login-demo-actions">
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => onLogin(demoSession('dono'))}>
              <Icon name="chart" /> Entrar como dono
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => onLogin(demoSession('barbeiro'))}>
              <Icon name="scissors" /> Entrar como barbeiro
            </button>
          </div>
          <p className="small muted login-note">
            O dono vê tudo. O barbeiro vê só a própria agenda e as próprias comissões.
          </p>
        </div>
      </div>
      <a className="login-back" href={import.meta.env.BASE_URL}>
        <Icon name="arrow-left" /> Voltar ao site
      </a>
    </main>
  );
}
