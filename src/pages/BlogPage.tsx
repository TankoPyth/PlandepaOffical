import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import BlogCard from '../components/BlogCard';
import CategoryFilter from '../components/CategoryFilter';
import { supabase } from '../lib/supabase';
import { AngleDivider } from '../components/ui/AngleDivider';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';
import { SEO } from '../components/SEO';
import { StructuredData, breadcrumbSchema } from '../components/StructuredData';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string | null;
  author_name: string;
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

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

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

      setPosts(postsResponse.data || []);
      setCategories(categoriesResponse.data || []);
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

  const blogBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://plandepa.com/' },
    { name: 'Blog', url: 'https://plandepa.com/blog' },
  ]);

  return (
    <>
      <SEO
        title="Construction Industry Blog - AI Automation & Business Tips | Brisbane Sydney"
        description="Expert construction business advice, AI automation tips, and industry insights for Australian builders. Learn how to improve efficiency and grow your construction company."
        keywords="construction blog Australia, construction AI blog, construction business tips, builder automation advice, construction industry insights Brisbane Sydney"
      />
      <StructuredData data={[blogBreadcrumb]} />

      <motion.section
        className="bg-brand-off-white py-16 px-6"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={staggerItem} className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-brand-black mb-6">
              Construction Industry{' '}
              <span className="text-brand-red">Insights</span>
            </h1>
            <p className="text-xl text-brand-gray max-w-3xl mx-auto mb-8">
              Expert advice, industry trends, and practical tips to help your construction business thrive
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

      <AngleDivider direction="down-right" fromColor="#FAFAFA" toColor="#FFFFFF" height={80} />

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
