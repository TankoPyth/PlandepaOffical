import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface CaseStudyPreviewProps {
  companyType: string;
  imageUrl?: string;
  href: string;
}

export function CaseStudyPreview({
  companyType,
  imageUrl,
  href,
}: CaseStudyPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      className="group block relative bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 apple-ease hover:-translate-y-2 will-animate"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute top-0 right-0 w-20 h-[2px] bg-brand-red origin-right z-10"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-20 h-[2px] bg-brand-red origin-left z-10"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
      />
      <div className="aspect-video bg-brand-light-gray overflow-hidden relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={companyType}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 apple-ease"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-brand-gray text-lg md:text-heading-md transition-colors duration-300 group-hover:text-brand-black">
              {companyType}
            </span>
          </div>
        )}
      </div>
      <div className="p-5 md:p-8">
        <h3 className="text-lg md:text-heading-sm font-bold text-brand-black mb-2 md:mb-3 transition-colors duration-300">
          {companyType}
        </h3>
        <span className="inline-flex items-center gap-2 text-sm md:text-body-md text-brand-red font-semibold group-hover:gap-3 transition-all duration-300 apple-ease">
          Read more
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 apple-ease" />
        </span>
      </div>
    </a>
  );
}
