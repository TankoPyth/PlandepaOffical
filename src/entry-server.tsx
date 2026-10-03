/**
 * Build-time render entry used by scripts/prerender.mjs.
 * Produces real HTML for each route so search engines and LLM crawlers
 * (which mostly don't run JavaScript) can read the site.
 */
import { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Writable } from 'node:stream';
import { AppRoutes } from './AppRouter';
import { ErrorBoundary } from './ErrorBoundary';

export { ROUTES, SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from './seo/site';

export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let html = '';
    const sink = new Writable({
      write(chunk, _enc, cb) {
        html += chunk.toString();
        cb();
      },
    });
    sink.on('finish', () => resolve(html));

    const { pipe } = renderToPipeableStream(
      <StrictMode>
        <ErrorBoundary>
          <StaticRouter location={url}>
            <AppRoutes />
          </StaticRouter>
        </ErrorBoundary>
      </StrictMode>,
      {
        // Wait for lazy route chunks so the full page (not the Suspense fallback) is emitted
        onAllReady: () => pipe(sink),
        onShellError: reject,
        onError: (err) => reject(err),
      }
    );
  });
}
