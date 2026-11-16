import { Brand } from './Brand';
import './layout.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="pole-divider" aria-hidden="true" />
      <div className="container footer-inner">
        <Brand />
        <p className="muted small">
          As demonstrações desta página usam dados de exemplo. © {new Date().getFullYear()} Rock Software Solutions.
        </p>
      </div>
    </footer>
  );
}
