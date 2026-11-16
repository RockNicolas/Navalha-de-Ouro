import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProvider } from './context/AppContext';
import { Toast } from './components/layout/Toast';
import { PanelApp } from './components/panel/PanelApp';
import { IconSprite } from './components/ui/Icon';
import './styles/global.css';

/** Entrada da página /painel: separada do site público. */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <IconSprite />
      <PanelApp />
      <Toast />
    </AppProvider>
  </StrictMode>,
);
