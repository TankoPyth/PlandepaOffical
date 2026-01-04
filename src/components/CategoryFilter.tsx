import { motion } from 'framer-motion';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string | null;
  onCategoryChange: (slug: string | null) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onCategoryChange(null)}
        className={`px-5 py-2 rounded-full font-semibold transition-all ${
          activeCategory === null
            ? 'bg-red-600 text-white shadow-lg'
            : 'bg-white text-slate-700 hover:bg-slate-100 shadow'
        }`}
      >
        All Posts
      </motion.button>

      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category.slug)}
          className={`px-5 py-2 rounded-full font-semibold transition-all ${
            activeCategory === category.slug
              ? 'bg-red-600 text-white shadow-lg'
              : 'bg-white text-slate-700 hover:bg-slate-100 shadow'
          }`}
        >
          {category.name}
        </motion.button>
      ))}
    </div>
  );
}