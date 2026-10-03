import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { AppRouter } from './AppRouter.tsx';
import './index.css';

import { ErrorBoundary } from './ErrorBoundary';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  </StrictMode>
);

// Prerendered pages (scripts/prerender.mjs) ship with HTML inside #root — hydrate it.
// The SPA fallback shell (app.html) has an empty #root — render from scratch.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
