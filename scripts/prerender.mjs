/**
 * Post-build prerender.
 *
 * 1. Renders every route in src/seo/site.ts to static HTML (dist/<route>.html)
 *    with route-specific <title>, description, canonical, OG tags and JSON-LD.
 * 2. Writes dist/app.html: the empty SPA shell used as the Netlify fallback.
 * 3. Generates dist/sitemap.xml from the same route list (+ published blog posts
 *    if Supabase env vars are available at build time).
 *
 * Run after `vite build` and `vite build --ssr src/entry-server.tsx`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const serverEntry = path.join(root, 'dist-server', 'entry-server.js');

const { render, ROUTES, SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } = await import(pathToFileURL(serverEntry).href);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const SEO_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;
if (!SEO_BLOCK.test(template)) throw new Error('index.html is missing <!--seo:start--> / <!--seo:end--> markers');

const esc = (v) => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const urlFor = (p) => `${SITE_URL}${p === '/' ? '/' : p}`;

function headFor({ path: p, title, description, noindex, schema, ogType = 'website', image = DEFAULT_OG_IMAGE }) {
  const url = urlFor(p);
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<meta name="robots" content="${noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large'}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    `<link rel="alternate" hreflang="en-AU" href="${esc(url)}" />`,
    `<meta property="og:type" content="${ogType}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta property="og:locale" content="en_AU" />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
  ];
  if (schema?.length) {
    const json = JSON.stringify(schema).replace(/</g, '\\u003c');
    tags.push(`<script type="application/ld+json" id="route-jsonld">${json}</script>`);
  }
  return tags.join('\n    ');
}

function outFile(p) {
  if (p === '/') return path.join(dist, 'index.html');
  return path.join(dist, `${p.replace(/^\//, '')}.html`);
}

async function writePage(meta) {
  const body = await render(meta.path);
  const html = template
    .replace(SEO_BLOCK, headFor(meta))
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  const file = outFile(meta.path);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  return file;
}

async function fetchBlogPosts() {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.warn('[prerender] Supabase env not set: blog posts skipped in sitemap/prerender');
    return [];
  }
  try {
    const res = await fetch(
      `${url}/rest/v1/blog_posts?select=slug,title,excerpt,published_at,updated_at,featured_image&published=eq.true&order=published_at.desc`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } }
    );
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return (await res.json()).filter((p) => p.slug);
  } catch (err) {
    console.warn(`[prerender] Could not fetch blog posts: ${err.message}`);
    return [];
  }
}

// 1. SPA fallback shell (unchanged template, empty #root)
fs.writeFileSync(path.join(dist, 'app.html'), template);

// 2. Static routes
const pages = [];
for (const meta of ROUTES) {
  const file = await writePage(meta);
  pages.push({ loc: urlFor(meta.path), priority: meta.priority, changefreq: meta.changefreq, noindex: meta.noindex, lastmod: meta.lastmod });
  console.log(`[prerender] ${meta.path} -> ${path.relative(root, file)}`);
}

// 3. Blog posts (meta + Article schema; body hydrates client-side from Supabase)
const knownPaths = new Set(ROUTES.map((r) => r.path));
const posts = (await fetchBlogPosts()).filter((p) => !knownPaths.has(`/blog/${p.slug}`));
for (const post of posts) {
  const p = `/blog/${post.slug}`;
  const description = (post.excerpt || '').slice(0, 300);
  await writePage({
    path: p,
    title: `${post.title} | ${SITE_NAME}`,
    description,
    ogType: 'article',
    image: post.featured_image || DEFAULT_OG_IMAGE,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description,
        datePublished: post.published_at,
        dateModified: post.updated_at || post.published_at,
        image: post.featured_image || DEFAULT_OG_IMAGE,
        url: urlFor(p),
        mainEntityOfPage: urlFor(p),
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en-AU',
      },
    ],
  });
  pages.push({ loc: urlFor(p), priority: 0.6, changefreq: 'monthly', lastmod: (post.updated_at || post.published_at || '').slice(0, 10) });
}
if (posts.length) console.log(`[prerender] ${posts.length} blog posts`);

// 4. Sitemap
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .filter((p) => !p.noindex)
  .map(
    (p) => `  <url>
    <loc>${esc(p.loc)}</loc>
    <lastmod>${p.lastmod || today}</lastmod>${p.changefreq ? `\n    <changefreq>${p.changefreq}</changefreq>` : ''}${p.priority != null ? `\n    <priority>${p.priority.toFixed(1)}</priority>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
console.log(`[prerender] sitemap.xml with ${pages.filter((p) => !p.noindex).length} URLs`);

fs.rmSync(path.join(root, 'dist-server'), { recursive: true, force: true });
