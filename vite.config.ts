import { defineConfig, type Connect, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Duas páginas separadas:
 *   /         → site público da barbearia (index.html)
 *   /painel/  → painel da equipe, com login (painel/index.html)
 *
 * Base do endereço:
 *   - Vercel e desenvolvimento: "/" (padrão)
 *   - GitHub Pages: "/Navalha-de-Ouro/" (build com --mode gh-pages, usado no npm run deploy)
 */

/** Em dev/preview, "/painel" (sem barra) vai para "/painel/" em vez de cair no site. */
const painelSlash: Connect.NextHandleFunction = (req, res, next) => {
  const url = (req as { url?: string }).url ?? '';
  if (url === '/painel' || url.startsWith('/painel?')) {
    res.statusCode = 302;
    res.setHeader('Location', url.replace('/painel', '/painel/'));
    res.end();
    return;
  }
  next();
};

const painelRoute: Plugin = {
  name: 'painel-route',
  configureServer: (server) => void server.middlewares.use(painelSlash),
  configurePreviewServer: (server) => void server.middlewares.use(painelSlash),
};

export default defineConfig(({ mode }) => ({
  base: mode === 'gh-pages' ? '/Navalha-de-Ouro/' : '/',
  plugins: [react(), painelRoute],
  build: {
    rollupOptions: {
      input: {
        site: 'index.html',
        painel: 'painel/index.html',
      },
    },
  },
  server: { port: 5173, open: false },
}));
