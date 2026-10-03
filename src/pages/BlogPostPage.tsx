import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Tag, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { ScrollProgress } from '../components/ui/ScrollProgress';
import { TableOfContents } from '../components/ui/TableOfContents';
import { SEO } from '../components/SEO';
import { OFFER_PATH } from '../seo/offer';
import { LOCAL_POSTS, getLocalPost, type LocalPost } from '../content/blog';

const AustralianAIPolicyPost = lazy(() => import('../components/blog/AustralianAIPolicyPost'));
const ConstructionAIBusinessCasePost = lazy(() => import('../components/blog/ConstructionAIBusinessCasePost'));

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
  faqs?: { q: string; a: string }[];
  published_at: string;
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
  faqs: p.faqs,
  published_at: p.published_at,
  category: p.category,
  tags: p.tags.map((t) => ({ name: t, slug: t.toLowerCase().replace(/[^a-z0-9]+/g, '-') })),
});

const localRelated = (slug: string): RelatedPost[] =>
  LOCAL_POSTS.filter((p) => p.slug !== slug)
    .slice(0, 3)
    .map((p) => ({ id: `local-${p.slug}`, title: p.title, slug: p.slug, excerpt: p.excerpt, featured_image: null, published_at: p.published_at }));

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  // Posts stored in the codebase render synchronously so they're fully prerendered; others load from Supabase
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

      const tags = data.blog_post_tags?.map((pt: any) => pt.tag) || [];
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
      <div className="min-h-screen bg-brand-off-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-brand-red border-t-transparent rounded-full animate-spin"></div>
          <p className="text-brand-gray mt-4">Loading article...</p>
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-brand-off-white flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-4xl font-bold text-brand-black mb-4">Article Not Found</h1>
          <p className="text-brand-gray mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(post.published_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const readTime = Math.ceil(post.content.split(' ').length / 200);

  const businessCaseSections = [
    { id: 'section-1', title: '1. Executive Summary' },
    { id: 'section-2', title: '2. Financial Analysis' },
    { id: 'section-3', title: '3. Solution Overview' },
    { id: 'section-4', title: '4. Implementation Strategy' },
    { id: 'section-5', title: '5. Market Context' },
    { id: 'section-6', title: '6. Recommendation' },
    { id: 'section-6-5', title: '6.5 Common Concerns' },
  ];

  const policySections = [
    { id: 'section-timeline', title: 'How It Happened' },
    { id: 'section-aisi', title: 'Meet the New Sheriff' },
    { id: 'section-ai6', title: 'The AI6 Survival Guide' },
    { id: 'section-winners', title: 'Who Won the Pivot?' },
    { id: 'section-future', title: 'The Crystal Ball: 2026+' },
    { id: 'section-faq', title: 'Common Policy Questions' },
  ];

  const showTableOfContents =
    post.slug === 'ai-business-case-construction' ||
    post.slug === 'australian-ai-policy-update';

  const sections =
    post.slug === 'ai-business-case-construction'
      ? businessCaseSections
      : post.slug === 'australian-ai-policy-update'
      ? policySections
      : [];

  const scrollToInteractive = () => {
    const targetId = post.slug === 'ai-business-case-construction' ? 'section-2' : 'section-ai6';
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const quickActionLabel = post.slug === 'ai-business-case-construction'
    ? 'Jump to ROI Calculator'
    : 'Jump to AI6 Checklist';

  return (
    <article className="min-h-screen bg-brand-off-white py-16">
      <SEO
        title={`${post.title} | PlanDepa`}
        description={post.meta_description || post.excerpt}
        ogType="article"
        ogImage={post.featured_image || undefined}
        article={{ publishedTime: post.published_at, author: post.author_name, section: post.category?.name, tags: post.tags?.map((t) => t.name) }}
      />
      <ScrollProgress />

      <div className={`mx-auto px-6 ${showTableOfContents ? 'max-w-7xl' : 'max-w-4xl'}`}>
        {showTableOfContents && (
          <div className="hidden lg:block fixed left-8 top-32 w-64">
            <TableOfContents sections={sections} />
          </div>
        )}

        <div className={`${showTableOfContents ? 'lg:ml-72 max-w-4xl' : ''}`}>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-brand-gray hover:text-brand-red transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {post.category && (
              <span className="inline-block px-4 py-1 bg-brand-red text-white text-sm font-semibold rounded-full mb-4">
                {post.category.name}
              </span>
            )}

            <h1 className="text-4xl md:text-5xl font-bold text-brand-black mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-brand-gray mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{readTime} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src={post.author_image || '/linkedin_profile_picture_(1).png'}
                  alt={post.author_name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                  loading="lazy"
                />
                <span>By {post.author_name}</span>
              </div>
            </div>

            {showTableOfContents && (
              <button
                onClick={scrollToInteractive}
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-cta-orange text-white rounded-lg hover:bg-orange-600 transition-colors mb-6 font-medium"
              >
                <Calculator className="w-4 h-4" />
                {quickActionLabel}
              </button>
            )}


          {post.featured_image && (
            <div className="relative h-96 rounded-lg overflow-hidden mb-8">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-xl text-brand-gray leading-relaxed mb-8">
              {post.excerpt}
            </p>

            {post.slug === 'australian-ai-policy-2025' ? (
              <Suspense fallback={<div className="text-center py-8 text-brand-gray">Loading...</div>}>
                <AustralianAIPolicyPost />
              </Suspense>
            ) : post.slug === 'ai-business-case-construction' ? (
              <Suspense fallback={<div className="text-center py-8 text-brand-gray">Loading...</div>}>
                <ConstructionAIBusinessCasePost />
              </Suspense>
            ) : (
              <div
                className="blog-prose text-brand-gray leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            )}
          </div>

          {post.faqs && post.faqs.length > 0 && (
            <section className="mt-12 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-4">Frequently asked questions</h2>
              {post.faqs.map((f) => (
                <div key={f.q} className="border-t border-gray-200 py-5">
                  <h3 className="font-semibold text-brand-black mb-2">{f.q}</h3>
                  <p className="text-brand-gray leading-relaxed">{f.a}</p>
                </div>
              ))}
            </section>
          )}

          <div className="bg-brand-black text-white rounded-lg p-8 my-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Know exactly where your business is breaking.</h2>
            <p className="text-white/80 mb-6">A paid diagnostic for construction businesses with 10-50 staff. From $990 + GST, and the fee comes off the invoice if we implement the fix.</p>
            <Link to={OFFER_PATH} className="inline-block bg-brand-red text-white font-semibold px-8 py-3 rounded-lg hover:bg-red-700 transition-colors">
              See the Clarity Blueprint
            </Link>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 pt-8 border-t border-gray-200">
              <Tag className="w-5 h-5 text-brand-gray" />
              {post.tags.map((tag) => (
                <span
                  key={tag.slug}
                  className="px-3 py-1 bg-brand-light-gray text-brand-black text-sm rounded-full"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </motion.div>
        </div>
      </div>

      {relatedPosts.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 mt-16">
          <h2 className="text-3xl font-bold text-brand-black mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                to={`/blog/${relatedPost.slug}`}
                className="group bg-white rounded-lg overflow-hidden shadow-md transition-all"
              >
                <div className="relative h-48 bg-brand-light-gray">
                  {relatedPost.featured_image ? (
                    <img
                      src={relatedPost.featured_image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-brand-light-gray">
                      <span className="text-brand-gray text-2xl font-bold">
                        {relatedPost.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-brand-black mb-2 group-hover:text-brand-red transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-brand-gray line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}