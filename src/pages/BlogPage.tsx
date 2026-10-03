import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { LOCAL_POSTS } from '../content/blog';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string | null;
  author_name: string;
  published_at: string;
  category_id: string | null;
  category?: { name: string; slug: string };
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const s = {
  eyebrow: {
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
    fontSize: 'var(--text-xs)',
    letterSpacing: '0.13em',
    textTransform: 'uppercase' as const,
    color: 'var(--ink-3)',
    display: 'block',
    marginBottom: '16px',
  } as React.CSSProperties,
  body: {
    fontFamily: 'var(--font-body)',
    fontWeight: 300,
    fontSize: 'var(--text-base)',
    lineHeight: 1.72,
    color: 'var(--ink-2)',
  } as React.CSSProperties,
};

const LOCAL_LIST: BlogPost[] = LOCAL_POSTS.map((p) => ({
  id: `local-${p.slug}`,
  title: p.title,
  slug: p.slug,
  excerpt: p.excerpt,
  featured_image: null,
  author_name: p.author.name,
  published_at: p.published_at,
  category_id: null,
  category: p.category,
}));

const LOCAL_CATEGORIES: Category[] = Array.from(new Map(LOCAL_POSTS.map((p) => [p.category.slug, p.category])).values())
  .map((c) => ({ id: `local-${c.slug}`, ...c }));

const byDateDesc = (a: BlogPost, b: BlogPost) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime();

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogPage() {
  // Local posts render immediately (and in the prerendered HTML); Supabase posts merge in after load
  const [posts, setPosts] = useState<BlogPost[]>(LOCAL_LIST);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(LOCAL_LIST);
  const [categories, setCategories] = useState<Category[]>(LOCAL_CATEGORIES);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(LOCAL_LIST.length === 0);

  useEffect(() => {
    (async () => {
      try {
        const [pr, cr] = await Promise.all([
          supabase.from('blog_posts').select('*, category:blog_categories(name, slug)').eq('published', true).order('published_at', { ascending: false }),
          supabase.from('blog_categories').select('*').order('name'),
        ]);
        const localSlugs = new Set(LOCAL_LIST.map((p) => p.slug));
        const remote: BlogPost[] = (pr.data || []).filter((p: BlogPost) => !localSlugs.has(p.slug));
        setPosts([...LOCAL_LIST, ...remote].sort(byDateDesc));
        const catSlugs = new Set(LOCAL_CATEGORIES.map((c) => c.slug));
        setCategories([...LOCAL_CATEGORIES, ...(cr.data || []).filter((c: Category) => !catSlugs.has(c.slug))]);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  useEffect(() => {
    let filtered = [...posts];
    if (activeCategory) filtered = filtered.filter(p => p.category?.slug === activeCategory);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
    }
    setFilteredPosts(filtered);
  }, [posts, activeCategory, searchQuery]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [filteredPosts]);

  return (
    <>
      {/* PAGE HERO */}
      <section style={{ paddingTop: 'var(--sp-16)', paddingBottom: 'var(--sp-12)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <span style={s.eyebrow}>Writing</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.05, letterSpacing: '-0.025em', color: 'var(--ink)', fontFeatureSettings: '"liga" 1, "kern" 1', marginBottom: 'var(--sp-4)' }}>
            AI and systems for
            <br />
            construction <em>businesses.</em>
          </h1>
          <p style={{ ...s.body, fontSize: '17px', maxWidth: '52ch', marginBottom: 'var(--sp-6)' }}>
            Practical, honest guides for construction business owners — on AI, operational systems, and getting your business to run without you.
          </p>

          {/* Search */}
          <div style={{ position: 'relative', maxWidth: '400px' }}>
            <input
              type="text"
              placeholder="Search articles…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 0',
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
                fontSize: 'var(--text-base)',
                color: 'var(--ink)',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid var(--rule)',
                outline: 'none',
              }}
            />
          </div>
        </div>
      </section>

      {/* FILTERS + POSTS */}
      <section style={{ borderTop: '1px solid var(--rule)', paddingTop: 'var(--sp-8)', paddingBottom: 'var(--sp-16)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>

          {/* Category pills */}
          {categories.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: 'var(--sp-8)' }}>
              <button
                onClick={() => setActiveCategory(null)}
                style={{
                  padding: '6px 16px',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  border: '1px solid var(--rule)',
                  borderRadius: 'var(--radius)',
                  background: activeCategory === null ? 'var(--ink)' : 'transparent',
                  color: activeCategory === null ? '#fff' : 'var(--ink-2)',
                  cursor: 'pointer',
                }}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.slug)}
                  style={{
                    padding: '6px 16px',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 500,
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    border: '1px solid var(--rule)',
                    borderRadius: 'var(--radius)',
                    background: activeCategory === cat.slug ? 'var(--ink)' : 'transparent',
                    color: activeCategory === cat.slug ? '#fff' : 'var(--ink-2)',
                    cursor: 'pointer',
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}

          {/* Posts */}
          {loading ? (
            <div style={{ ...s.body, textAlign: 'center', padding: 'var(--sp-12) 0' }}>Loading…</div>
          ) : filteredPosts.length === 0 ? (
            <div style={{ ...s.body, textAlign: 'center', padding: 'var(--sp-12) 0' }}>
              {searchQuery || activeCategory ? 'No articles found.' : 'No articles published yet.'}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0' }}>
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="reveal"
                  style={{
                    textDecoration: 'none',
                    borderTop: '1px solid var(--rule)',
                    padding: 'var(--sp-6) var(--sp-4) var(--sp-6) 0',
                    display: 'block',
                  }}
                >
                  {post.category && (
                    <span style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', display: 'block', marginBottom: '12px' }}>
                      {post.category.name}
                    </span>
                  )}
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--text-xl)', color: 'var(--ink)', lineHeight: 1.2, marginBottom: '12px' }}>
                    {post.title}
                  </div>
                  <p style={{ ...s.body, fontSize: '14px', maxWidth: '42ch', marginBottom: '20px' }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ ...s.body, fontSize: '13px', color: 'var(--ink-3)' }}>{post.author_name}</span>
                    <span style={{ ...s.body, fontSize: '13px', color: 'var(--ink-3)' }}>{formatDate(post.published_at)}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
