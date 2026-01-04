import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
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

export function SEO({
  title = 'Plandepa - Build Smart, Grow Simple | Construction AI Automation Australia',
  description = 'Brisbane & Sydney construction AI automation experts. ISO certified consultants with diplomas in project management, building & construction. Cut paperwork by 60%, get more quality leads. Buildxact partner.',
  keywords = 'construction automation Australia, construction business consultant Brisbane, construction consultant Sydney, AI automation construction, Buildxact partner, construction lead generation, ISO certified construction consultant, project management construction',
  ogImage = 'https://plandepa.com/plandepa_logo_slim.png',
  ogType = 'website',
  article,
  noindex = false,
  canonical,
}: SEOProps) {
  const location = useLocation();
  const currentUrl = `https://plandepa.com${location.pathname}`;
  const canonicalUrl = canonical || currentUrl;

  useEffect(() => {
    document.title = title;

    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'robots', content: noindex ? 'noindex,nofollow' : 'index,follow' },
      { name: 'geo.region', content: 'AU-QLD' },
      { name: 'geo.placename', content: 'Brisbane' },
      { name: 'geo.position', content: '-27.4698;153.0251' },
      { name: 'ICBM', content: '-27.4698, 153.0251' },

      { property: 'og:type', content: ogType },
      { property: 'og:url', content: currentUrl },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: ogImage },
      { property: 'og:site_name', content: 'Plandepa' },
      { property: 'og:locale', content: 'en_AU' },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:url', content: currentUrl },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
    ];

    if (article) {
      if (article.publishedTime) {
        metaTags.push({ property: 'article:published_time', content: article.publishedTime });
      }
      if (article.modifiedTime) {
        metaTags.push({ property: 'article:modified_time', content: article.modifiedTime });
      }
      if (article.author) {
        metaTags.push({ property: 'article:author', content: article.author });
      }
      if (article.section) {
        metaTags.push({ property: 'article:section', content: article.section });
      }
      if (article.tags) {
        article.tags.forEach(tag => {
          metaTags.push({ property: 'article:tag', content: tag });
        });
      }
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

    let linkAlternate = document.querySelector('link[rel="alternate"][hreflang="en-AU"]');
    if (!linkAlternate) {
      linkAlternate = document.createElement('link');
      linkAlternate.setAttribute('rel', 'alternate');
      linkAlternate.setAttribute('hreflang', 'en-AU');
      document.head.appendChild(linkAlternate);
    }
    linkAlternate.setAttribute('href', currentUrl);

  }, [title, description, keywords, ogImage, ogType, currentUrl, canonicalUrl, article, noindex]);

  return null;
}
