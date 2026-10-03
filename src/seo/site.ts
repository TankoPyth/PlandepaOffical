/**
 * Single source of truth for per-route SEO metadata and structured data.
 * Used by the <SEO /> component at runtime AND by scripts/prerender.mjs at
 * build time, so crawlers and LLMs get the same title/description/schema
 * that users see.
 */

import { OFFER_FAQS, OFFER_NAME, OFFER_PATH, OFFER_SUMMARY, TIERS } from './offer';
import { LOCAL_POSTS, type LocalPost } from '../content/blog';

export const SITE_URL = 'https://plandepa.com';
export const SITE_NAME = 'PlanDepa';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/plandepa_logo_slim.png`;

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
  priority?: number;
  changefreq?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  lastmod?: string;
  ogType?: 'website' | 'article';
  schema?: object[];
}

const ORG_ID = `${SITE_URL}/#organization`;

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  name: SITE_NAME,
  url: SITE_URL,
  logo: DEFAULT_OG_IMAGE,
  image: DEFAULT_OG_IMAGE,
  description:
    'PlanDepa is an AI implementation and operational systems consultancy for construction companies in Brisbane, Newcastle and across Australia. We design, build and support CRM, quoting, handover, reporting and admin automation systems for builders and trades.',
  slogan: 'AI implementation for construction companies',
  telephone: '+61-447-733-216',
  email: 'admin@plandepa.com',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Brisbane',
    addressRegion: 'QLD',
    addressCountry: 'AU',
  },
  areaServed: [
    { '@type': 'City', name: 'Brisbane', containedInPlace: { '@type': 'State', name: 'Queensland' } },
    { '@type': 'City', name: 'Gold Coast' },
    { '@type': 'City', name: 'Sunshine Coast' },
    { '@type': 'City', name: 'Newcastle', containedInPlace: { '@type': 'State', name: 'New South Wales' } },
    { '@type': 'AdministrativeArea', name: 'Hunter Region' },
    { '@type': 'City', name: 'Lake Macquarie' },
    { '@type': 'City', name: 'Maitland' },
    { '@type': 'Country', name: 'Australia' },
  ],
  knowsAbout: [
    'AI implementation for construction companies',
    'Construction business automation',
    'Construction CRM setup',
    'Construction quoting and estimating workflows',
    'Buildxact implementation',
    'Construction operations systems',
    'Standard operating procedures for builders',
    'Construction reporting dashboards',
  ],
  founder: [
    {
      '@type': 'Person',
      name: 'Jarrod Tanko',
      jobTitle: 'Co-Founder',
      description: 'Construction company founder and site manager with experience from startup operations to Tier 1 mining projects.',
      sameAs: 'https://www.linkedin.com/in/jarrod-tanko-104943267/',
    },
    {
      '@type': 'Person',
      name: 'Mitch Humphries',
      jobTitle: 'Co-Founder',
      description: 'Former carpenter and State Manager in building and restoration with expertise in construction systems and scaling operations.',
      sameAs: 'https://www.linkedin.com/in/mitchell-humphries-8436ab37b/',
    },
  ],
  sameAs: [
    'https://www.linkedin.com/company/107528755/',
    'https://www.facebook.com/profile.php?id=61581827105862',
    'https://www.instagram.com/plandepa/',
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'en-AU',
  publisher: { '@id': ORG_ID },
};

const breadcrumb = (name: string, path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name, item: `${SITE_URL}${path}` },
  ],
});

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
});

const serviceSchema = (name: string, path: string, description: string, areaServed: string[] = ['Brisbane', 'Newcastle', 'Australia']) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  serviceType: name,
  url: `${SITE_URL}${path}`,
  description,
  provider: { '@id': ORG_ID },
  areaServed: areaServed.map((n) => ({ '@type': n === 'Australia' ? 'Country' : 'City', name: n })),
  audience: { '@type': 'BusinessAudience', audienceType: 'Construction companies, builders and trade contractors' },
});

/* ---------- Offer (The Clarity Blueprint) ---------- */

const offerSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: OFFER_NAME,
  serviceType: 'Construction business diagnostic',
  url: `${SITE_URL}${OFFER_PATH}`,
  description: OFFER_SUMMARY,
  provider: { '@id': ORG_ID },
  areaServed: [
    { '@type': 'City', name: 'Brisbane' },
    { '@type': 'City', name: 'Newcastle' },
    { '@type': 'Country', name: 'Australia' },
  ],
  audience: { '@type': 'BusinessAudience', audienceType: 'Construction business owners with 10-50 staff' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: `${OFFER_NAME} options`,
    itemListElement: TIERS.map((t) => ({
      '@type': 'Offer',
      name: t.name,
      description: `${t.format}. Includes: ${t.includes.join('; ')}.`,
      price: String(t.price),
      priceCurrency: 'AUD',
      priceSpecification: { '@type': 'PriceSpecification', price: String(t.price), priceCurrency: 'AUD', valueAddedTaxIncluded: false },
      url: `${SITE_URL}${OFFER_PATH}#options`,
    })),
  },
};

export const HOME_FAQS = [
  {
    q: 'Where do we start?',
    a: 'With the Clarity Blueprint: a paid diagnostic that shows exactly where your business is leaking time, margin, missed work and owner capacity, and names the first workflow to fix. Clarity Sprint $990, Clarity Day $1,990 or Clarity Intensive $4,990 (all ex. GST). If we implement the agreed first workflow within 30 days of the readout, the full fee is credited.',
  },
  {
    q: 'Who do you work with?',
    a: "Construction businesses with 10-50 staff, running four or more tools that don't talk to each other, where the owner is still the bottleneck. We're based in Brisbane and work in person across Brisbane and Newcastle, and Australia-wide with the Clarity Intensive.",
  },
  {
    q: 'What tools do you build in?',
    a: "Whatever fits your business: Notion, Monday, Airtable, HubSpot, Buildxact, or tools you already use. We're tool-agnostic. We recommend what's right for your size and team, not what's convenient for us.",
  },
  {
    q: 'How long does it take to see results?',
    a: "Most clients have a working CRM and first SOPs within four weeks of starting implementation. The full system typically takes 8-12 weeks to build well. We won't rush it.",
  },
  {
    q: 'Do we need someone technical to maintain this?',
    a: 'No. We build for the office manager who has never used a CRM. And we stay on to handle anything complex.',
  },
  {
    q: 'Do you work outside construction?',
    a: "No. Construction is all we do, and that's intentional. Our frameworks, networks, and thinking are built entirely around the industry. If that's not your world, we'll say so upfront.",
  },
];

export const ENQUIRY_FAQS = [
  {
    q: 'Will AI be talking to my clients?',
    a: 'Only as much as you want. Typically AI drafts the first response in your voice and handles routine follow-ups, while anything that needs judgement comes to you or your team. You decide what goes out automatically.',
  },
  {
    q: 'Which enquiry sources can you connect?',
    a: 'Website forms, email, phone and missed-call capture, Facebook and Instagram, and lead platforms such as hipages. Anything that sends a notification can usually be routed into one pipeline.',
  },
  {
    q: 'Do we need a new CRM?',
    a: "Not necessarily. We're tool-agnostic and build on what fits your business, often the tools you already pay for, and connect it to Buildxact or your estimating software.",
  },
  {
    q: 'How long does it take?',
    a: 'An enquiry capture and follow-up system is usually live within four weeks, including testing and training your team.',
  },
  {
    q: 'Do you guarantee a number of leads?',
    a: "No. We don't sell leads or promise lead volumes. We make sure the enquiries you already get are answered, qualified and followed up, so fewer good jobs slip through.",
  },
];

/* ---------- Location landing page content (shared with LocationPage.tsx) ---------- */

export interface LocationContent {
  slug: string;
  city: string;
  region: string;
  state: string;
  nearby: string[];
  intro: string;
  context: string;
  faqs: { q: string; a: string }[];
}

export const LOCATIONS: Record<'brisbane' | 'newcastle', LocationContent> = {
  brisbane: {
    slug: '/construction-ai-brisbane',
    city: 'Brisbane',
    region: 'South East Queensland',
    state: 'QLD',
    nearby: ['Gold Coast', 'Sunshine Coast', 'Ipswich', 'Logan', 'Moreton Bay', 'Toowoomba'],
    intro:
      'PlanDepa implements AI and operational systems for construction companies in Brisbane and South East Queensland. We map how your business runs, then build the CRM, quoting, handover, reporting and admin automation that lets you take on more work without adding office headcount.',
    context:
      "South East Queensland has one of the busiest construction pipelines in the country: sustained housing demand, major infrastructure, and the run-up to the Brisbane 2032 Olympic and Paralympic Games. For builders that means more enquiries, more subcontractors to coordinate, and more QBCC-related paperwork, all handled by the same small office team. That's where practical AI earns its keep: capturing every enquiry, getting quotes out the same day, and keeping job status visible without a phone call.",
    faqs: [
      {
        q: 'Do you work with construction companies in Brisbane?',
        a: 'Yes. PlanDepa is based in Brisbane and works with builders, trade contractors and construction businesses across Brisbane, the Gold Coast, the Sunshine Coast and greater South East Queensland.',
      },
      {
        q: 'What does AI implementation look like for a Brisbane builder?',
        a: 'It usually starts with the admin that eats your week: enquiry capture and follow-up, quoting templates, variation approvals, job handovers, site photo and note capture, and reporting. We connect those into one system and automate the repetitive steps, using tools you may already have.',
      },
      {
        q: 'How long does it take?',
        a: 'Most clients have a working CRM and their first documented processes within four weeks. A full operational system typically takes 8-12 weeks to build properly.',
      },
      {
        q: 'Do we need technical staff to run it?',
        a: 'No. We build for the office manager who has never used a CRM, train your team, and stay on for ongoing support.',
      },
      {
        q: 'Where do we start?',
        a: 'With the Clarity Blueprint: a paid diagnostic that shows exactly where your business is leaking time, margin and owner capacity, and names the first workflow to fix. It comes in three sizes: Clarity Sprint ($990, virtual), Clarity Day ($1,990, in person) and Clarity Intensive ($4,990), all ex. GST, and the fee is credited if we implement the first workflow.',
      },
    ],
  },
  newcastle: {
    slug: '/construction-ai-newcastle',
    city: 'Newcastle',
    region: 'the Hunter',
    state: 'NSW',
    nearby: ['Lake Macquarie', 'Maitland', 'Cessnock', 'Port Stephens', 'Central Coast', 'Upper Hunter'],
    intro:
      'PlanDepa implements AI and operational systems for construction companies in Newcastle and the Hunter. We map how your business runs, then build the CRM, quoting, handover, reporting and admin automation that lets you take on more work without adding office headcount.',
    context:
      "Newcastle and the Hunter are growing fast: new housing across Lake Macquarie, Maitland and Port Stephens, plus infrastructure and energy-transition projects across the region. Builders here are winning more work while dealing with NSW compliance requirements and tight trade availability, usually with a lean office team. Practical AI helps by making sure no enquiry is lost, quotes and variations move quickly, and every job has a clear handover and a live status.",
    faqs: [
      {
        q: 'Do you work with construction companies in Newcastle and the Hunter?',
        a: 'Yes. PlanDepa works with builders, trade contractors and construction businesses across Newcastle, Lake Macquarie, Maitland, Port Stephens and the wider Hunter region.',
      },
      {
        q: 'What does AI implementation look like for a Newcastle builder?',
        a: 'It usually starts with the admin that eats your week: enquiry capture and follow-up, quoting templates, variation approvals, job handovers, site photo and note capture, and reporting. We connect those into one system and automate the repetitive steps, using tools you may already have.',
      },
      {
        q: 'How long does it take?',
        a: 'Most clients have a working CRM and their first documented processes within four weeks. A full operational system typically takes 8-12 weeks to build properly.',
      },
      {
        q: 'Do we need technical staff to run it?',
        a: 'No. We build for the office manager who has never used a CRM, train your team, and stay on for ongoing support.',
      },
      {
        q: 'Where do we start?',
        a: 'With the Clarity Blueprint: a paid diagnostic that shows exactly where your business is leaking time, margin and owner capacity, and names the first workflow to fix. It comes in three sizes: Clarity Sprint ($990, virtual), Clarity Day ($1,990, in person) and Clarity Intensive ($4,990), all ex. GST, and the fee is credited if we implement the first workflow.',
      },
    ],
  },
};

const locationSchemas = (loc: LocationContent) => [
  serviceSchema(
    `AI implementation for construction companies in ${loc.city}`,
    loc.slug,
    loc.intro,
    [loc.city, ...loc.nearby]
  ),
  faqSchema(loc.faqs),
  breadcrumb(`AI for construction: ${loc.city}`, loc.slug),
];

/* ---------- Blog posts in the codebase ---------- */

function blogRoute(post: LocalPost): RouteMeta {
  const path = `/blog/${post.slug}`;
  return {
    path,
    title: `${post.title} | PlanDepa`,
    description: post.metaDescription,
    priority: 0.7,
    changefreq: 'monthly',
    lastmod: (post.updated_at || post.published_at).slice(0, 10),
    ogType: 'article',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.metaDescription,
        datePublished: post.published_at,
        dateModified: post.updated_at || post.published_at,
        url: `${SITE_URL}${path}`,
        mainEntityOfPage: `${SITE_URL}${path}`,
        image: DEFAULT_OG_IMAGE,
        inLanguage: 'en-AU',
        articleSection: post.category.name,
        keywords: post.tags.join(', '),
        author: { '@type': 'Person', name: post.author.name, jobTitle: post.author.role, sameAs: post.author.linkedin },
        publisher: { '@id': ORG_ID },
      },
      faqSchema(post.faqs),
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}${path}` },
        ],
      },
    ],
  };
}

/* ---------- Route registry ---------- */

export const ROUTES: RouteMeta[] = [
  {
    path: '/',
    title: 'AI Implementation for Construction Companies | PlanDepa',
    description:
      'AI and operational systems for construction companies in Brisbane, Newcastle and Australia-wide. Start with the Clarity Blueprint, from $990 + GST.',
    priority: 1.0,
    changefreq: 'weekly',
    schema: [organizationSchema, websiteSchema, faqSchema(HOME_FAQS)],
  },
  {
    path: LOCATIONS.brisbane.slug,
    title: 'AI for Construction Companies in Brisbane | PlanDepa',
    description:
      'AI implementation and automation for Brisbane and South East Queensland builders. CRM, quoting, handovers and reporting built around how your construction business runs.',
    priority: 0.9,
    changefreq: 'monthly',
    schema: locationSchemas(LOCATIONS.brisbane),
  },
  {
    path: LOCATIONS.newcastle.slug,
    title: 'AI for Construction Companies in Newcastle | PlanDepa',
    description:
      'AI implementation and automation for Newcastle and Hunter builders. CRM, quoting, handovers and reporting built around how your construction business runs.',
    priority: 0.9,
    changefreq: 'monthly',
    schema: locationSchemas(LOCATIONS.newcastle),
  },
  {
    path: OFFER_PATH,
    title: 'The Clarity Blueprint: Construction Business Diagnostic | PlanDepa',
    description:
      'A paid diagnostic that shows exactly where your construction business is breaking. Clarity Sprint $990, Clarity Day $1,990, Clarity Intensive $4,990 (ex. GST). Fee credited on implementation.',
    priority: 1.0,
    changefreq: 'monthly',
    schema: [offerSchema, faqSchema(OFFER_FAQS), breadcrumb(OFFER_NAME, OFFER_PATH)],
  },
  {
    path: '/pilot-program',
    title: 'AI Automation Pilot for Construction Businesses | PlanDepa',
    description:
      'Fix your single biggest operational bottleneck first. We scope, build and test one system: enquiries, follow-ups, variations or handovers, and train your team on it.',
    priority: 0.8,
    changefreq: 'monthly',
    schema: [breadcrumb('Pilot Program', '/pilot-program')],
  },
  {
    path: '/training',
    title: 'AI & Systems Training for Construction Teams | PlanDepa',
    description:
      'Education for construction businesses that want to understand what AI, automation and operational systems look like in practice, before making any commitments.',
    priority: 0.7,
    changefreq: 'monthly',
    schema: [breadcrumb('Training', '/training')],
  },
  {
    path: '/ongoing-support',
    title: 'Ongoing Systems & AI Support for Builders | PlanDepa',
    description:
      'We stay on as your operational partner after the build: monthly reviews, continuous improvement and support as your construction business changes.',
    priority: 0.7,
    changefreq: 'monthly',
    schema: [breadcrumb('Ongoing Support', '/ongoing-support')],
  },
  {
    path: '/buildxact',
    title: 'Buildxact Implementation Partner | PlanDepa',
    description:
      'Official Buildxact implementation partner. We configure Buildxact for your construction business, train your team, and stay on to make sure it holds.',
    priority: 0.8,
    changefreq: 'monthly',
    schema: [
      serviceSchema('Buildxact implementation and training', '/buildxact', 'Buildxact setup, configuration, training and ongoing optimisation for Australian builders.'),
      breadcrumb('Buildxact Partner', '/buildxact'),
    ],
  },
  {
    path: '/business-audit',
    title: 'Construction Business Audit | PlanDepa',
    description:
      "A structured audit of how your construction business runs today, where it's losing control, and what to fix or automate first. Honest assessment, no upsell.",
    priority: 0.7,
    changefreq: 'monthly',
    schema: [breadcrumb('Business Audit', '/business-audit')],
  },
  {
    path: '/enquiry-automation',
    title: 'AI Enquiry Capture & Follow-up for Builders | PlanDepa',
    description:
      'AI-assisted enquiry capture, qualification and quote follow-up for construction companies in Brisbane, Newcastle and across Australia. Every enquiry answered, every quote chased.',
    priority: 0.8,
    changefreq: 'monthly',
    schema: [
      serviceSchema('AI enquiry capture and follow-up for construction companies', '/enquiry-automation', 'A single enquiry pipeline across web, email, phone and social, with AI-drafted first responses, qualification, site-visit booking, automated quote follow-up and source reporting.'),
      faqSchema(ENQUIRY_FAQS),
      breadcrumb('Enquiry Automation', '/enquiry-automation'),
    ],
  },
  {
    path: '/roi-calculator',
    title: 'Construction Admin Cost Calculator | PlanDepa',
    description:
      'Estimate what manual quoting and admin costs your construction business each year, and how much better systems and AI could win back.',
    priority: 0.6,
    changefreq: 'monthly',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Construction Admin Cost Calculator',
        url: `${SITE_URL}/roi-calculator`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web browser',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'AUD' },
        publisher: { '@id': ORG_ID },
      },
      breadcrumb('Admin Cost Calculator', '/roi-calculator'),
    ],
  },
  {
    path: '/case-studies',
    title: 'Construction AI & Systems Case Studies | PlanDepa',
    description:
      'Real construction businesses, real problems, real systems. See how builders used AI and operational systems to win back time and control.',
    priority: 0.7,
    changefreq: 'monthly',
    schema: [breadcrumb('Case Studies', '/case-studies')],
  },
  {
    path: '/blog',
    title: 'Construction AI & Operations Insights | PlanDepa',
    description:
      'Practical guides on AI, automation and operational systems for construction businesses navigating growth.',
    priority: 0.7,
    changefreq: 'weekly',
    schema: [breadcrumb('Blog', '/blog')],
  },
  {
    path: '/contact',
    title: 'Contact PlanDepa | Brisbane & Newcastle',
    description:
      'Talk to PlanDepa about AI implementation and operational systems for your construction business. We reply within one business day.',
    priority: 0.6,
    changefreq: 'yearly',
    schema: [breadcrumb('Contact', '/contact')],
  },
  {
    path: '/pipeline-recovery-review',
    title: 'Pipeline Recovery Review | Construction Lead Follow-Up Scorecard',
    description:
      'Check where your construction revenue pipeline is leaking, then book a practical Pipeline Recovery Review with PlanDepa.',
    priority: 0.6,
    changefreq: 'monthly',
  },
  // Ad landing pages (rendered outside Layout; they set the same title/description themselves)
  {
    path: '/lp/ad-campaign',
    title: 'Transform Your Construction Business with AI | Plandepa',
    description:
      'Stop wasting time on paperwork. Get more quotes out, win more work, and scale your construction business with AI automation.',
    priority: 0.3,
    changefreq: 'monthly',
  },
  {
    path: '/lp/buildxact-ad',
    title: 'Cut Your Buildxact Quoting Time in Half | Custom Templates by Real Builders',
    description:
      "Stop wasting 8 hours on every quote. Get a custom Buildxact template built by actual builders that cuts your time to 2 hours. 50% faster or it's free.",
    priority: 0.3,
    changefreq: 'monthly',
  },
  ...LOCAL_POSTS.map(blogRoute),
  {
    path: '/contact/thank-you',
    title: 'Thank You | PlanDepa',
    description: 'Thanks for getting in touch with PlanDepa.',
    noindex: true,
  },
];

// Unknown paths render the 404 page: keep them out of the index
const FALLBACK: RouteMeta = {
  path: '',
  title: 'Page Not Found | PlanDepa',
  description: ROUTES[0].description,
  noindex: true,
};

/** Blog posts set their own meta from post data (BlogPostPage), so the route registry leaves them alone. */
export const isPageManagedRoute = (pathname: string) => /^\/blog\/[^/]+/.test(pathname);

export function getRouteMeta(pathname: string): RouteMeta {
  const clean = pathname !== '/' ? pathname.replace(/\/+$/, '') : pathname;
  return ROUTES.find((r) => r.path === clean) ?? { ...FALLBACK, path: clean };
}
