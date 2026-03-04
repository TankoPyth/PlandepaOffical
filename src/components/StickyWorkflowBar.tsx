import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Target, X } from 'lucide-react';

export function StickyWorkflowBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8;
      const shouldShow = window.scrollY > heroHeight;
      setIsVisible(shouldShow && !isDismissed);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-md px-4"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <motion.div
            className="bg-brand-black text-white rounded-2xl shadow-2xl p-4 flex items-center justify-between gap-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Find Your Bottleneck</p>
                <p className="text-xs text-gray-300">28 days to results</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="#workflows"
                className="px-4 py-2 bg-brand-red text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 whitespace-nowrap"
              >
                View Options
              </a>
              <button
                onClick={handleDismiss}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-200"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
