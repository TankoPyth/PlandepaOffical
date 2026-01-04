import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface SectionNumberProps {
  number: string;
  label?: string;
  className?: string;
}

export function SectionNumber({ number, label, className = '' }: SectionNumberProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });

  return (
    <div ref={ref} className={`flex items-center gap-4 ${className}`}>
      <div className="relative flex-shrink-0 w-12 h-12">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-brand-red"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1.2, opacity: 0 } : {}}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-brand-red"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1.2, opacity: 0 } : {}}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.5
          }}
        />
        <motion.div
          className="relative w-12 h-12 rounded-full border-[3px] border-brand-black bg-white flex items-center justify-center text-xl font-bold text-brand-black shadow-sm z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{
            duration: 0.5,
            ease: [0.33, 1, 0.68, 1]
          }}
        >
          {number}
        </motion.div>
      </div>
      {label && (
        <motion.span
          className="text-sm font-semibold uppercase tracking-wider text-brand-gray"
          initial={{ x: -10, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: [0.33, 1, 0.68, 1]
          }}
        >
          {label}
        </motion.span>
      )}
    </div>
  );
}
