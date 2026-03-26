import { Video as LucideIcon } from 'lucide-react';
import { useState, memo, useCallback } from 'react';
import { motion } from 'framer-motion';

interface MinimalServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const MinimalServiceCard = memo(function MinimalServiceCard({
  icon: Icon,
  title,
  description,
}: MinimalServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div
      className="relative bg-brand-light-gray rounded-lg md:rounded-xl p-5 md:p-6 hover:bg-white hover:shadow-lg transition-all duration-500 apple-ease h-full flex flex-col hover:-translate-y-1 will-animate border border-transparent hover:border-gray-200 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="absolute top-0 left-0 w-full h-[2px] bg-brand-red origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-full h-[2px] bg-brand-red origin-right"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
      />
      <Icon className="w-6 h-6 md:w-8 md:h-8 text-brand-black mb-3 md:mb-4 transition-transform duration-300 apple-ease group-hover:scale-110" />
      <h3 className="text-lg md:text-xl font-bold text-brand-black mb-2 md:mb-3 transition-colors duration-300 apple-ease">
        {title}
      </h3>
      <p className="text-sm md:text-base text-brand-gray leading-relaxed transition-colors duration-300 apple-ease">
        {description}
      </p>
    </div>
  );
});
