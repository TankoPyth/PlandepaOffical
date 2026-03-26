import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Tag, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { ScrollProgress } from '../components/ui/ScrollProgress';
import { SocialProofBar } from '../components/ui/SocialProofBar';
import { TableOfContents } from '../components/ui/TableOfContents';

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

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
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
                  src="/linkedin_profile_picture_(1).png"
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

            <div className="mb-8 pb-8 border-b border-gray-200">
              <SocialProofBar />
            </div>

          {post.featured_image && (
            <div className="relative h-96 rounded-xl overflow-hidden mb-8">
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
                className="text-brand-gray leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            )}
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
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <div className="relative h-48 bg-brand-light-gray">
                  {relatedPost.featured_image ? (
                    <img
                      src={relatedPost.featured_image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-light-gray to-gray-200">
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