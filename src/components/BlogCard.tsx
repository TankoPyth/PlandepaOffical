import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface BlogCardProps {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  authorName: string;
  publishedAt: string;
  categoryName?: string;
  readTime?: number;
}

export default function BlogCard({
  title,
  slug,
  excerpt,
  featuredImage,
  authorName,
  publishedAt,
  categoryName,
  readTime = 5
}: BlogCardProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      <Link to={`/blog/${slug}`} className="block">
        <div className="relative h-64 overflow-hidden bg-slate-100">
          {featuredImage ? (
            <img
              src={featuredImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
              <span className="text-slate-400 text-4xl font-bold">
                {title.charAt(0)}
              </span>
            </div>
          )}
          {categoryName && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full">
                {categoryName}
              </span>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{readTime} min read</span>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors">
            {title}
          </h3>

          <p className="text-slate-600 mb-4 line-clamp-3">
            {excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src="/linkedin_profile_picture_(1).png"
                alt={authorName}
                className="w-6 h-6 rounded-full object-cover border border-slate-200"
                loading="lazy"
              />
              <span className="text-sm text-slate-500">By {authorName}</span>
            </div>
            <div className="flex items-center gap-2 text-red-600 font-semibold group-hover:gap-3 transition-all">
              Read More
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}