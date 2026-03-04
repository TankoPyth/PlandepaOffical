import { ArrowRight, Check, LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface PathCardProps {
  label: string;
  title: string;
  benefits: string[];
  badge: string;
  badgeColor?: 'green' | 'red' | 'blue';
  href: string;
  onClick?: () => void;
  icon?: LucideIcon;
}

export function PathCard({
  label,
  title,
  benefits,
  badge,
  badgeColor = 'green',
  href,
  onClick,
  icon: Icon,
}: PathCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const iconColorMap = {
    green: 'from-emerald-500 to-green-600',
    red: 'from-brand-red to-red-700',
    blue: 'from-blue-500 to-blue-700',
  };

  const iconShadowMap = {
    green: 'shadow-emerald-500/30',
    red: 'shadow-red-500/30',
    blue: 'shadow-blue-500/30',
  };

  return (
    <motion.div
      className="relative bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 rounded-2xl shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-500 apple-ease flex flex-col overflow-hidden border border-gray-300 hover:border-brand-red/60 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-brand-red/5 via-transparent to-brand-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-red to-transparent" />

      <motion.div
        className="absolute top-0 right-0 w-32 h-32 bg-brand-red/10 rounded-full blur-3xl"
        animate={{
          scale: isHovered ? 1.5 : 1,
          opacity: isHovered ? 0.3 : 0.1,
        }}
        transition={{ duration: 0.5 }}
      />

      <div className="relative px-6 py-5 border-b border-gray-300/70">
        {Icon && (
          <motion.div
            className={`w-16 h-16 bg-gradient-to-br ${iconColorMap[badgeColor]} rounded-2xl flex items-center justify-center mb-4 shadow-lg ${iconShadowMap[badgeColor]}`}
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
          >
            <Icon className="w-8 h-8 text-white" strokeWidth={2} />
          </motion.div>
        )}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-red flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse" />
            {label}
          </span>
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm ${
              badgeColor === 'green'
                ? 'bg-emerald-500/20 text-emerald-800 border border-emerald-500/40'
                : badgeColor === 'blue'
                ? 'bg-blue-500/20 text-blue-800 border border-blue-500/40'
                : 'bg-red-500/20 text-red-800 border border-red-500/40'
            }`}
          >
            {badge}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 leading-tight">
          {title}
        </h3>
      </div>

      <div className="relative flex-1 px-6 py-6 bg-gradient-to-b from-transparent to-gray-300/20">
        <p className="text-xs font-bold text-gray-600 mb-4 uppercase tracking-widest">PERFECT IF YOU:</p>

        <ul className="space-y-3.5">
          {benefits.map((benefit, index) => (
            <motion.li
              key={index}
              className="flex items-start gap-3 text-sm text-gray-800"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-brand-red to-red-700 flex items-center justify-center mt-0.5 shadow-lg shadow-brand-red/20">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
              <span className="leading-relaxed font-medium">{benefit}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="relative px-6 pb-6">
        <a
          href={href}
          onClick={onClick}
          className="group/btn w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-brand-red to-red-700 text-white font-bold text-sm rounded-xl hover:from-red-700 hover:to-brand-red transition-all duration-300 apple-ease shadow-lg shadow-brand-red/30 hover:shadow-xl hover:shadow-brand-red/50 active:scale-95 relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />
          <span className="relative">Learn more</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300 apple-ease relative" />
        </a>
      </div>
    </motion.div>
  );
}
