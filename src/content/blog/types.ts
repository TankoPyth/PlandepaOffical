/**
 * Blog posts that live in the codebase (not Supabase), so they're prerendered
 * in full for search engines and LLM crawlers. Supabase posts still work —
 * BlogPage merges both, and a local post wins if a slug exists in both.
 */
export interface LocalAuthor {
  name: string;
  role: string;
  image: string;
  linkedin: string;
}

export interface LocalPost {
  slug: string;
  title: string;
  /** <title> / meta description; keep under ~155 chars */
  metaDescription: string;
  excerpt: string;
  category: { name: string; slug: string };
  tags: string[];
  author: LocalAuthor;
  published_at: string;
  updated_at?: string;
  /** Article body as HTML (styled by .pd-prose). No <h1> — the page renders the title. */
  content: string;
  /** Rendered as an FAQ block under the article and emitted as FAQPage schema */
  faqs: { q: string; a: string }[];
}

export const JARROD: LocalAuthor = {
  name: 'Jarrod Tanko',
  role: 'Co-Founder, PlanDepa',
  image: '/linkedin_profile_picture_(1).png',
  linkedin: 'https://www.linkedin.com/in/jarrod-tanko-104943267/',
};

export const MITCH: LocalAuthor = {
  name: 'Mitch Humphries',
  role: 'Co-Founder, PlanDepa',
  image: '/mitch_profile_picture.png',
  linkedin: 'https://www.linkedin.com/in/mitchell-humphries-8436ab37b/',
};
