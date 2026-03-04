import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Video as LucideIcon } from 'lucide-react';
import { useEffect } from 'react';

interface WorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  icon: LucideIcon;
  title: string;
  painPoint: string;
  fullDescription: string;
  whatWeInstall: string[];
  whatImproves: { metric: string; improvement: string }[];
  beforeAfter: { before: string; after: string };
}

export function WorkflowModal({
  isOpen,
  onClose,
  icon: Icon,
  title,
  painPoint,
  fullDescription,
  whatWeInstall,
  whatImproves,
  beforeAfter,
}: WorkflowModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="sticky top-0 bg-white border-b border-brand-light-gray px-8 py-6 flex items-center justify-between z-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-brand-red/10 rounded-2xl flex items-center justify-center">
                    <Icon className="w-7 h-7 text-brand-red" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-brand-black">{title}</h2>
                    <p className="text-sm text-brand-gray">{painPoint}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-brand-light-gray transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-brand-gray" />
                </button>
              </div>

              <div className="px-8 py-8 space-y-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-xl font-bold text-brand-black mb-4">The Problem</h3>
                  <p className="text-brand-gray leading-relaxed text-lg">{fullDescription}</p>
                </motion.div>

                <motion.div
                  className="grid md:grid-cols-2 gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="bg-red-50 rounded-2xl p-6">
                    <h4 className="text-lg font-bold text-brand-black mb-3">Before</h4>
                    <p className="text-brand-gray">{beforeAfter.before}</p>
                  </div>
                  <div className="bg-green-50 rounded-2xl p-6">
                    <h4 className="text-lg font-bold text-brand-black mb-3">After</h4>
                    <p className="text-brand-gray">{beforeAfter.after}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-brand-black mb-4">What We Install</h3>
                  <div className="space-y-3">
                    {whatWeInstall.map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                      >
                        <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-brand-gray flex-1">{item}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="text-xl font-bold text-brand-black mb-4">What Improves</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {whatImproves.map((item, index) => (
                      <motion.div
                        key={index}
                        className="bg-brand-light-gray rounded-xl p-5"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.05 }}
                      >
                        <div className="text-3xl font-bold text-brand-red mb-2">{item.improvement}</div>
                        <div className="text-sm text-brand-gray">{item.metric}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <a
                    href="/business-audit"
                    className="flex-1 bg-brand-black text-white text-center px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                  >
                    Apply for This Pilot
                  </a>
                  <a
                    href="/business-audit"
                    className="flex-1 bg-white text-brand-black text-center px-8 py-4 rounded-xl font-semibold border-2 border-brand-black hover:bg-brand-black hover:text-white transition-all duration-300"
                  >
                    Book Discovery Call
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
