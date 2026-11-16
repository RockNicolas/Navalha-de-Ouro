import { useEffect, useState } from 'react';
import { DEFAULT_WA_MESSAGE } from '../../config';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { waUrl } from '../../lib/whatsapp';
import { Icon } from '../ui/Icon';
import { Brand } from './Brand';
import './layout.css';

const LINKS = [
  { id: 'solucoes', label: 'Soluções' },
  { id: 'agendar', label: 'Agendamento' },
  { id: 'gestao', label: 'Gestão' },
  { id: 'fidelidade', label: 'Fidelidade' },
  { id: 'contato', label: 'Contato' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useScrollSpy(LINKS.map((l) => l.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth > 900 && setOpen(false);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    document.body.classList.add('menu-open');
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      document.body.classList.remove('menu-open');
    };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}${open ? ' open' : ''}`} id="topo">
      <div className="container header-inner">
        <Brand />
        <nav className="nav" id="menu" aria-label="Principal">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              aria-current={active === l.id ? 'true' : undefined}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            className="btn btn-gold btn-sm nav-cta"
            href={waUrl(DEFAULT_WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            <Icon name="wa" />
            Falar no WhatsApp
          </a>
        </nav>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'x' : 'menu'} />
        </button>
      </div>
    </header>
  );
}
