import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Home, Calendar } from 'lucide-react';
import { CalendlyPopup } from '../components/ui/CalendlyPopup';
import { appleEasing } from '../utils/animations';

export function ThankYouPage() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-off-white to-white flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: appleEasing }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: appleEasing }}
              className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-emerald-100 rounded-full"
            >
              <CheckCircle2 className="w-12 h-12 text-emerald-600" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: appleEasing }}
              className="text-3xl md:text-4xl font-bold text-brand-black mb-4"
            >
              Thank You!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: appleEasing }}
              className="text-lg text-brand-gray mb-8 max-w-lg mx-auto"
            >
              We've received your message and will get back to you within 24 hours.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: appleEasing }}
              className="bg-brand-light-gray rounded-xl p-6 mb-8"
            >
              <p className="text-sm text-brand-gray mb-4">
                Want to skip the wait? Book a call with us right now.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setIsCalendlyOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-red text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 apple-ease shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                >
                  <Calendar className="w-5 h-5" />
                  Book a Call Now
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5, ease: appleEasing }}
              className="pt-6 border-t border-gray-200"
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-brand-gray hover:text-brand-black transition-colors group"
              >
                <Home className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Return to Website
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5, ease: appleEasing }}
          className="text-center mt-8"
        >
          <p className="text-sm text-brand-gray">
            Need immediate assistance?{' '}
            <a
              href="mailto:admin@plandepa.com"
              className="text-brand-red hover:text-red-700 font-semibold transition-colors"
            >
              Email us directly
            </a>
          </p>
        </motion.div>
      </motion.div>

      <CalendlyPopup
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
      />
    </div>
  );
}
