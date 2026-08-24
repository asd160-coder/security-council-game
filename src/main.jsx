import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppShell from './app/AppShell.jsx';

/* Narrow font entrypoints, not the package roots.

   Importing '@fontsource-variable/source-serif-4' pulls in every subset and
   axis the package ships — dozens of stylesheets Vite then has to process on
   every cold transform. These are the exact faces this interface uses: the
   weight axis for both variable families, italic for the body serif only
   (the display face is never set in italic), and two static weights of the
   mono. */
import '@fontsource-variable/libre-franklin/wght.css';
import '@fontsource-variable/source-serif-4/wght.css';
import '@fontsource-variable/source-serif-4/wght-italic.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-500.css';

import './styles/reset.css';
import './styles/tokens.css';
import './styles/globals.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppShell />
  </StrictMode>,
);
