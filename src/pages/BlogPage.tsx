import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import BlogCard from '../components/BlogCard';
import CategoryFilter from '../components/CategoryFilter';
import { supabase } from '../lib/supabase';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';
import { LOCAL_POSTS } from '../content/blog';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string | null;
  author_name: string;
  author_image?: string;
  published_at: string;
  category_id: string | null;
  category?: {
    name: string;
    slug: string;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

// Posts stored in the codebase render immediately (and in the prerendered HTML); Supabase posts merge in after load
const LOCAL_LIST: BlogPost[] = LOCAL_POSTS.map((p) => ({
  id: `local-${p.slug}`,
  title: p.title,
  slug: p.slug,
  excerpt: p.excerpt,
  featured_image: null,
  author_name: p.author.name,
  author_image: p.author.image,
  published_at: p.published_at,
  category_id: null,
  category: p.category,
}));

const LOCAL_CATEGORIES: Category[] = Array.from(new Map(LOCAL_POSTS.map((p) => [p.category.slug, p.category])).values())
  .map((c) => ({ id: `local-${c.slug}`, ...c }));

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(LOCAL_LIST);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(LOCAL_LIST);
  const [categories, setCategories] = useState<Category[]>(LOCAL_CATEGORIES);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(LOCAL_LIST.length === 0);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, activeCategory, searchQuery]);

  const fetchData = async () => {
    try {
      const [postsResponse, categoriesResponse] = await Promise.all([
        supabase
          .from('blog_posts')
          .select(`
            *,
            category:blog_categories(name, slug)
          `)
          .eq('published', true)
          .order('published_at', { ascending: false }),
        supabase
          .from('blog_categories')
          .select('*')
          .order('name')
      ]);

      if (postsResponse.error) throw postsResponse.error;
      if (categoriesResponse.error) throw categoriesResponse.error;

      const localSlugs = new Set(LOCAL_LIST.map((p) => p.slug));
      const remote: BlogPost[] = (postsResponse.data || []).filter((p: BlogPost) => !localSlugs.has(p.slug));
      setPosts([...LOCAL_LIST, ...remote].sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()));
      const catSlugs = new Set(LOCAL_CATEGORIES.map((c) => c.slug));
      setCategories([...LOCAL_CATEGORIES, ...(categoriesResponse.data || []).filter((c: Category) => !catSlugs.has(c.slug))]);
    } catch (error) {
      console.error('Error fetching blog data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = () => {
    let filtered = [...posts];

    if (activeCategory) {
      filtered = filtered.filter(
        post => post.category?.slug === activeCategory
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        post =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query)
      );
    }

    setFilteredPosts(filtered);
  };

  return (
    <>
      <motion.section
        className="bg-brand-off-white py-16 px-6"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={staggerItem} className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-brand-black mb-6">
              AI &amp; Systems For{' '}
              <span className="text-brand-red">Construction Businesses</span>
            </h1>
            <p className="text-xl text-brand-gray max-w-3xl mx-auto mb-8">
              Practical, honest guides for construction business owners on AI, operational systems, and getting your business to run without you
            </p>

            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray" />
              <motion.input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all"
                variants={fadeInUp}
              />
            </div>
          </motion.div>

          <motion.div variants={staggerItem}>
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </motion.div>
        </div>
      </motion.section>


      <motion.section
        className="bg-white py-16 px-6 min-h-screen"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block w-12 h-12 border-4 border-brand-red border-t-transparent rounded-full animate-spin"></div>
              <p className="text-brand-gray mt-4">Loading articles...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-xl text-brand-gray">
                {searchQuery || activeCategory
                  ? 'No articles found matching your criteria'
                  : 'No articles available yet'}
              </p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  variants={fadeInUp}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <BlogCard
                    id={post.id}
                    title={post.title}
                    slug={post.slug}
                    excerpt={post.excerpt}
                    featuredImage={post.featured_image || undefined}
                    authorName={post.author_name}
                    authorImage={post.author_image}
                    publishedAt={post.published_at}
                    categoryName={post.category?.name}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.section>
    </>
  );
}
