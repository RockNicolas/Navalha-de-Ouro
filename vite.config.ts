import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * No GitHub Pages o site fica em https://rocknicolas.github.io/Navalha-de-Ouro/,
 * então o build usa esse caminho como base. Em desenvolvimento continua em "/".
 */
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Navalha-de-Ouro/' : '/',
  plugins: [react()],
  server: { port: 5173, open: false },
}));
