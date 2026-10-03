import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { SEO } from '../components/SEO';
import AustralianAIPolicyPost from '../components/blog/AustralianAIPolicyPost';
import ConstructionAIBusinessCasePost from '../components/blog/ConstructionAIBusinessCasePost';
import { ScrollProgress } from '../components/ui/ScrollProgress';
import { TableOfContents } from '../components/ui/TableOfContents';
import { OFFER_PATH } from '../seo/offer';
import { LOCAL_POSTS, getLocalPost, type LocalPost } from '../content/blog';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  author_name: string;
  author_image?: string;
  meta_description?: string;
  published_at: string;
  updated_at?: string;
  faqs?: { q: string; a: string }[];
  category?: {
    name: string;
    slug: string;
  };
  tags?: Array<{
    name: string;
    slug: string;
  }>;
}

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string | null;
  published_at: string;
}

const POLICY_SLUGS = ['australian-ai-policy-2025', 'australian-ai-policy-update'];
const BUSINESS_CASE_SLUG = 'ai-business-case-construction';

const BUSINESS_CASE_SECTIONS = [
  { id: 'section-1', title: '1. Executive Summary' },
  { id: 'section-2', title: '2. Financial Analysis' },
  { id: 'section-3', title: '3. Solution Overview' },
  { id: 'section-4', title: '4. Implementation Strategy' },
  { id: 'section-5', title: '5. Market Context' },
  { id: 'section-6', title: '6. Recommendation' },
  { id: 'section-6-5', title: '6.5 Common Concerns' },
];

const POLICY_SECTIONS = [
  { id: 'section-timeline', title: 'How It Happened' },
  { id: 'section-aisi', title: 'Meet the New Sheriff' },
  { id: 'section-ai6', title: 'The AI6 Survival Guide' },
  { id: 'section-winners', title: 'Who Won the Pivot?' },
  { id: 'section-future', title: 'The Crystal Ball: 2026+' },
  { id: 'section-faq', title: 'Common Policy Questions' },
];

const fromLocal = (p: LocalPost): BlogPost => ({
  id: `local-${p.slug}`,
  title: p.title,
  slug: p.slug,
  excerpt: p.excerpt,
  content: p.content,
  featured_image: null,
  author_name: p.author.name,
  author_image: p.author.image,
  meta_description: p.metaDescription,
  published_at: p.published_at,
  updated_at: p.updated_at,
  faqs: p.faqs,
  category: p.category,
  tags: p.tags.map((t) => ({ name: t, slug: t.toLowerCase().replace(/[^a-z0-9]+/g, '-') })),
});

const localRelated = (slug: string): RelatedPost[] =>
  LOCAL_POSTS.filter((p) => p.slug !== slug)
    .slice(0, 3)
    .map((p) => ({ id: `local-${p.slug}`, title: p.title, slug: p.slug, excerpt: p.excerpt, featured_image: null, published_at: p.published_at }));

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });

function CenteredMessage({ children }: { children: React.ReactNode }) {
  return (
    <section className="pd-page-hero" style={{ minHeight: '60vh' }}>
      <div className="pd-container" style={{ padding: 0 }}>{children}</div>
    </section>
  );
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  // Local (codebase) posts render synchronously so they're fully prerendered; others load from Supabase
  const initialLocal = getLocalPost(slug);
  const [post, setPost] = useState<BlogPost | null>(initialLocal ? fromLocal(initialLocal) : null);
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>(initialLocal ? localRelated(initialLocal.slug) : []);
  const [loading, setLoading] = useState(!initialLocal);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const local = getLocalPost(slug);
    if (local) {
      setPost(fromLocal(local));
      setRelatedPosts(localRelated(local.slug));
      setLoading(false);
      setNotFound(false);
      return;
    }
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          category:blog_categories(name, slug),
          blog_post_tags(
            tag:blog_tags(name, slug)
          )
        `)
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        setNotFound(true);
        return;
      }

      const tags = data.blog_post_tags?.map((pt: { tag: { name: string; slug: string } }) => pt.tag) || [];
      setPost({ ...data, tags });

      if (data.category_id) {
        fetchRelatedPosts(data.category_id, data.id);
      }
    } catch (error) {
      console.error('Error fetching blog post:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedPosts = async (categoryId: string, currentPostId: string) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, featured_image, published_at')
        .eq('category_id', categoryId)
        .eq('published', true)
        .neq('id', currentPostId)
        .order('published_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setRelatedPosts(data || []);
    } catch (error) {
      console.error('Error fetching related posts:', error);
    }
  };

  if (loading) {
    return (
      <CenteredMessage>
        <p className="pd-caption">Loading article…</p>
      </CenteredMessage>
    );
  }

  if (notFound || !post) {
    return (
      <CenteredMessage>
        <span className="pd-eyebrow">Blog</span>
        <h1 className="pd-h2" style={{ marginBottom: 'var(--sp-3)' }}>Article not found.</h1>
        <p className="pd-body" style={{ marginBottom: 'var(--sp-4)' }}>The article you're looking for doesn't exist or has been removed.</p>
        <Link to="/blog" className="pd-btn pd-btn-outline">Back to the blog</Link>
      </CenteredMessage>
    );
  }

  const readTime = Math.max(1, Math.ceil(post.content.split(' ').length / 200));
  const isPolicy = POLICY_SLUGS.includes(post.slug);
  const isBusinessCase = post.slug === BUSINESS_CASE_SLUG;
  const sections = isBusinessCase ? BUSINESS_CASE_SECTIONS : isPolicy ? POLICY_SECTIONS : [];

  return (
    <article>
      <SEO
        title={`${post.title} | PlanDepa`}
        description={post.meta_description || post.excerpt}
        ogType="article"
        ogImage={post.featured_image || undefined}
        article={{ publishedTime: post.published_at, author: post.author_name, section: post.category?.name, tags: post.tags?.map((t) => t.name) }}
      />
      <ScrollProgress />

      {/* HEADER */}
      <header className="pd-page-hero" style={{ paddingBottom: 'var(--sp-8)' }}>
        <div className="pd-container" style={{ padding: 0 }}>
          <Link to="/blog" className="pd-caption" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: 'var(--sp-6)' }}>
            ← All articles
          </Link>
          {post.category && <span className="pd-eyebrow" style={{ color: 'var(--accent)' }}>{post.category.name}</span>}
          <h1 className="pd-h1" style={{ fontSize: 'clamp(36px, 5vw, 60px)', maxWidth: '22ch', marginBottom: 'var(--sp-4)' }}>{post.title}</h1>
          <p className="pd-lead" style={{ maxWidth: '60ch', marginBottom: 'var(--sp-4)' }}>{post.excerpt}</p>
          <div className="pd-caption" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <img src={post.author_image || '/linkedin_profile_picture_(1).png'} alt="" width={28} height={28} style={{ borderRadius: '50%', objectFit: 'cover' }} loading="lazy" />
            <span style={{ color: 'var(--ink-2)' }}>{post.author_name}</span>
            <span>·</span>
            <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
            {post.updated_at && post.updated_at !== post.published_at && (
              <>
                <span>·</span>
                <span>Updated <time dateTime={post.updated_at}>{formatDate(post.updated_at)}</time></span>
              </>
            )}
            <span>·</span>
            <span>{readTime} min read</span>
          </div>
        </div>
      </header>

      {post.featured_image && (
        <div className="pd-container" style={{ marginBottom: 'var(--sp-8)' }}>
          <img src={post.featured_image} alt={post.title} style={{ width: '100%', maxHeight: '480px', objectFit: 'cover', borderRadius: 'var(--radius)' }} />
        </div>
      )}

      {/* BODY */}
      <div className="pd-container" style={{ display: 'flex', gap: 'var(--sp-8)', alignItems: 'flex-start', paddingBottom: 'var(--sp-12)' }}>
        {sections.length > 0 && (
          <aside className="hidden lg:block" style={{ width: '220px', flexShrink: 0, position: 'sticky', top: '100px' }}>
            <TableOfContents sections={sections} />
          </aside>
        )}
        <div style={{ minWidth: 0, flex: 1, maxWidth: sections.length ? '720px' : '680px' }}>
          {isPolicy ? (
            <div className="pd-article-legacy"><AustralianAIPolicyPost /></div>
          ) : isBusinessCase ? (
            <div className="pd-article-legacy"><ConstructionAIBusinessCasePost /></div>
          ) : (
            <div className="pd-prose" dangerouslySetInnerHTML={{ __html: post.content }} />
          )}

          {post.faqs && post.faqs.length > 0 && (
            <section style={{ marginTop: 'var(--sp-8)' }}>
              <h2 className="pd-h3" style={{ marginBottom: 'var(--sp-3)' }}>Frequently asked questions</h2>
              {post.faqs.map((f) => (
                <div key={f.q} style={{ borderTop: '1px solid var(--rule)', padding: '20px 0' }}>
                  <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 'var(--text-md)', color: 'var(--ink)', margin: '0 0 8px' }}>{f.q}</h3>
                  <p className="pd-body" style={{ margin: 0, maxWidth: 'none' }}>{f.a}</p>
                </div>
              ))}
            </section>
          )}

          {post.tags && post.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', borderTop: '1px solid var(--rule)', paddingTop: 'var(--sp-3)', marginTop: 'var(--sp-6)' }}>
              {post.tags.map((tag) => (
                <span key={tag.slug} className="pd-caption" style={{ border: '1px solid var(--rule)', padding: '4px 10px', borderRadius: 'var(--radius)' }}>
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <section className="pd-section" style={{ background: 'var(--bg-alt)' }}>
        <div className="pd-container" style={{ padding: 0 }}>
          <div style={{ maxWidth: '620px' }}>
            <span className="pd-eyebrow">The Clarity Blueprint</span>
            <h2 className="pd-h3" style={{ marginBottom: 'var(--sp-3)' }}>Know exactly where your business is breaking.</h2>
            <p className="pd-body" style={{ marginBottom: 'var(--sp-4)' }}>
              A paid diagnostic for construction businesses with 10–50 staff. From $990 + GST, and the fee comes off the invoice if we implement the fix.
            </p>
            <Link to={OFFER_PATH} className="pd-btn pd-btn-primary" style={{ padding: '14px 36px' }}>See the Clarity Blueprint</Link>
          </div>
        </div>
      </section>

      {/* RELATED */}
      {relatedPosts.length > 0 && (
        <section className="pd-section">
          <div className="pd-container" style={{ padding: 0 }}>
            <span className="pd-eyebrow">Keep Reading</span>
            <div className="pd-module-grid" style={{ marginTop: 'var(--sp-4)' }}>
              {relatedPosts.map((rp) => (
                <Link key={rp.id} to={`/blog/${rp.slug}`} className="pd-module-cell" style={{ textDecoration: 'none' }}>
                  <div className="pd-caption" style={{ marginBottom: '8px' }}>{formatDate(rp.published_at)}</div>
                  <h3 className="pd-h4" style={{ marginBottom: '8px' }}>{rp.title}</h3>
                  <p className="pd-body" style={{ fontSize: '14px', margin: 0 }}>{rp.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
