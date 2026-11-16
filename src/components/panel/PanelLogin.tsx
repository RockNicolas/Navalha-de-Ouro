import { useState, type FormEvent } from 'react';
import { SHOP } from '../../config';
import { getBarber } from '../../data/catalog';
import { DEMO_USERS, demoSession, login, type Session } from '../../lib/session';
import { Avatar } from '../ui/Avatar';
import { Icon } from '../ui/Icon';

const BARBER_USERS = DEMO_USERS.filter((u) => u.role === 'barbeiro');

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
          <button
            type="button"
            className="btn btn-ghost btn-sm btn-block"
            onClick={() => onLogin(demoSession('dono@navalhadeouro.com.br'))}
          >
            <Icon name="chart" /> Entrar como dono ({SHOP.owner})
          </button>
          <p className="login-sub">Ou entre como um dos barbeiros:</p>
          <div className="login-barbers">
            {BARBER_USERS.map((u) => (
              <button key={u.email} type="button" className="login-barber" onClick={() => onLogin(demoSession(u.email))}>
                <Avatar name={u.name} hue={u.barberId ? getBarber(u.barberId).hue : 38} size="md" />
                <span>{u.name}</span>
              </button>
            ))}
          </div>
          <p className="small muted login-note">
            O dono vê a barbearia inteira. Cada barbeiro vê só os próprios atendimentos, faturamento e comissão.
          </p>
        </div>
      </div>
      <a className="login-back" href={import.meta.env.BASE_URL}>
        <Icon name="arrow-left" /> Voltar ao site
      </a>
    </main>
  );
}
