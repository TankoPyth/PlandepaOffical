import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, getRouteMeta, isPageManagedRoute } from '../seo/site';

interface SEOProps {
  title?: string;
  description?: string;
  ogImage?: string;
  ogType?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  noindex?: boolean;
  canonical?: string;
}

/**
 * Keeps <head> in sync on client-side navigation. Defaults come from the
 * route registry in src/seo/site.ts (the same data scripts/prerender.mjs
 * bakes into the static HTML), so rendered once in Layout it covers every page.
 * Pass props only to override per page (e.g. blog posts).
 */
export function SEO({ title, description, ogImage = DEFAULT_OG_IMAGE, ogType = 'website', article, noindex, canonical }: SEOProps) {
  const location = useLocation();
  const meta = getRouteMeta(location.pathname);
  const pageTitle = title ?? meta.title;
  const pageDescription = description ?? meta.description;
  const robots = (noindex ?? meta.noindex) ? 'noindex,nofollow' : 'index,follow';
  const currentUrl = `${SITE_URL}${meta.path === '/' ? '/' : meta.path}`;
  const canonicalUrl = canonical || currentUrl;
  const schemaJson = meta.schema?.length ? JSON.stringify(meta.schema) : '';
  // The site-wide <SEO /> in Layout (no props) steps aside on routes whose page sets its own meta
  const skip = !title && isPageManagedRoute(location.pathname);

  useEffect(() => {
    if (skip) return;
    document.title = pageTitle;

    const metaTags = [
      { name: 'description', content: pageDescription },
      { name: 'robots', content: robots },
      { property: 'og:type', content: ogType },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: pageDescription },
      { property: 'og:image', content: ogImage },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:locale', content: 'en_AU' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: pageTitle },
      { name: 'twitter:description', content: pageDescription },
      { name: 'twitter:image', content: ogImage },
    ];

    if (article) {
      if (article.publishedTime) metaTags.push({ property: 'article:published_time', content: article.publishedTime });
      if (article.modifiedTime) metaTags.push({ property: 'article:modified_time', content: article.modifiedTime });
      if (article.author) metaTags.push({ property: 'article:author', content: article.author });
      if (article.section) metaTags.push({ property: 'article:section', content: article.section });
      article.tags?.forEach((tag) => metaTags.push({ property: 'article:tag', content: tag }));
    }

    metaTags.forEach(({ name, property, content }) => {
      const attr = property ? 'property' : 'name';
      const value = property || name;
      let element = document.querySelector(`meta[${attr}="${value}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, value!);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    });

    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // Route-level JSON-LD (same id the prerenderer writes, so no duplicates)
    let ld = document.getElementById('route-jsonld');
    if (schemaJson) {
      if (!ld) {
        ld = document.createElement('script');
        ld.id = 'route-jsonld';
        ld.setAttribute('type', 'application/ld+json');
        document.head.appendChild(ld);
      }
      ld.textContent = schemaJson;
    } else if (ld && !title) {
      // Page-level overrides (blog posts) keep the prerendered BlogPosting schema
      ld.remove();
    }
  }, [skip, title, pageTitle, pageDescription, robots, ogImage, ogType, canonicalUrl, article, schemaJson]);

  return null;
}
