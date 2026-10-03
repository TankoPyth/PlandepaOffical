import { useEffect, useRef, useState, memo } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { motion } from 'framer-motion';

interface StatCardProps {
  value: string;
  label: string;
}

export const StatCard = memo(function StatCard({ value, label }: StatCardProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.5 });
  const [displayValue, setDisplayValue] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;

      const numericMatch = value.match(/[\d.]+/);
      if (numericMatch) {
        const targetNumber = parseFloat(numericMatch[0]);
        const suffix = value.replace(numericMatch[0], '');
        const duration = 1500;
        const steps = 60;
        const increment = targetNumber / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
          step++;
          current += increment;

          if (step >= steps) {
            setDisplayValue(value);
            clearInterval(timer);
          } else {
            const displayNum = current.toFixed(value.includes('.') ? 1 : 0);
            setDisplayValue(displayNum + suffix);
          }
        }, duration / steps);

        return () => clearInterval(timer);
      }
    }
  }, [isVisible, value]);

  return (
    <div ref={ref} className="text-center relative">
      <motion.div
        className="absolute inset-0 rounded-lg"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: [0, 0.15, 0] } : {}}
        transition={{
          duration: 2,
          ease: "easeInOut"
        }}
        style={{
          boxShadow: '0 0 40px rgba(220, 38, 38, 0.3)',
        }}
      />
      <div className={`relative text-3xl md:text-heading-xl font-bold text-brand-black mb-1 md:mb-2 transition-all duration-700 apple-ease ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {displayValue}
        <motion.span
          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-[2px] bg-brand-red"
          initial={{ width: 0, opacity: 0 }}
          animate={isVisible ? { width: '60%', opacity: 0.4 } : {}}
          transition={{
            duration: 0.8,
            delay: 1.5,
            ease: [0.33, 1, 0.68, 1]
          }}
        />
      </div>
      <div className={`text-sm md:text-body-lg text-brand-gray transition-all duration-700 apple-ease delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {label}
      </div>
    </div>
  );
});
