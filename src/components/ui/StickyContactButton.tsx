import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal } from './Modal';
import { ContactForm } from '../ContactForm';
import { ThankYouModal } from '../ThankYouModal';
import { appleEasing } from '../../utils/animations';

export function StickyContactButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    let timeoutId: number;

    const handleScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = window.setTimeout(() => {
        const scrollY = window.scrollY;
        setIsVisible(scrollY > 200);
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            transition={{ duration: 0.3, ease: appleEasing }}
            onClick={handleOpenModal}
            className="hidden sm:flex fixed bottom-28 right-8 z-40 items-center gap-3 px-6 py-4 bg-brand-red text-white font-semibold rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 active:scale-95 transition-all duration-300 apple-ease group"
            aria-label="Contact us"
          >
            <MessageCircle className="w-5 h-5 group-hover:animate-pulse" />
            <span className="text-sm">Get in Touch</span>
          </motion.button>
        )}
      </AnimatePresence>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Get in Touch">
        <ContactForm
          source="sticky_button"
          onSuccess={() => {
            setTimeout(() => {
              handleCloseModal();
              setShowThankYou(true);
            }, 1500);
          }}
        />
      </Modal>

      <ThankYouModal isOpen={showThankYou} onClose={() => setShowThankYou(false)} />
    </>
  );
}
