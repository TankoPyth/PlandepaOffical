import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-brand-red origin-left z-50"
      style={{ scaleX }}
    />
  );
}

interface VerticalScrollIndicatorProps {
  className?: string;
}

export function VerticalScrollIndicator({ className = '' }: VerticalScrollIndicatorProps) {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className={`fixed right-8 top-1/4 bottom-1/4 w-[2px] bg-gray-200 hidden lg:block ${className}`}>
      <motion.div
        className="w-full bg-brand-red origin-top"
        style={{ scaleY }}
      />
    </div>
  );
}
