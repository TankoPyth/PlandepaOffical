import { Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Modal } from './ui/Modal';
import { CalendlyPopup } from './ui/CalendlyPopup';
import { useState } from 'react';

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ThankYouModal({ isOpen, onClose }: ThankYouModalProps) {
  const [showCalendly, setShowCalendly] = useState(false);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="large">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center"
        >
          {/* Plandepa Logo */}
          <div className="mb-6 flex justify-center">
            <img
              src="/plandepa_nobg.png"
              alt="Plandepa Logo"
              className="w-32 h-32 object-contain"
              loading="lazy"
            />
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
            Thank You for Reaching Out
          </h2>

          {/* Personal Message */}
          <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
            Our founders will personally be in touch soon to make sure we can align and help you in your business ventures.
          </p>

          {/* What Happens Next */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
            <h3 className="text-lg font-semibold text-brand-black mb-4">What happens next:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-red flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <p className="text-gray-700">
                  We'll personally review your message and business needs
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-red flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <p className="text-gray-700">
                  Expect a response within 24 hours from our founding team
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-red flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <p className="text-gray-700">
                  We'll discuss a custom solution tailored to your specific goals
                </p>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-4 border-2 border-gray-300 text-brand-black font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
            >
              Continue Browsing
            </button>
            <button
              onClick={() => setShowCalendly(true)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-brand-red text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Calendar className="w-5 h-5" />
              Book a Call to Lock in a Time
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Reassurance */}
          <p className="text-sm text-gray-500 mt-6">
            Looking forward to helping you achieve your business goals
          </p>
        </motion.div>
      </Modal>

      {/* Calendly Popup */}
      <CalendlyPopup
        isOpen={showCalendly}
        onClose={() => setShowCalendly(false)}
      />
    </>
  );
}
