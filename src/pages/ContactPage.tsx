import { ArrowLeft, Mail, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ContactForm } from '../components/ContactForm';
import { SimpleFAQ } from '../components/SimpleFAQ';
import { SectionNumber } from '../components/SectionNumber';
import { ThankYouModal } from '../components/ThankYouModal';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';
import { CONTACT_FAQS } from '../content/faqs';

export function ContactPage() {
  const [showThankYou, setShowThankYou] = useState(false);
  const contactFaqs = CONTACT_FAQS;

  return (
    <>
      <section className="bg-brand-off-white py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm md:text-base text-brand-gray hover:text-brand-black mb-8 md:mb-12 group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-black mb-4 md:mb-6"
              variants={fadeInUp}
            >
              Get in Touch
            </motion.h1>
            <motion.p
              className="text-base md:text-lg text-brand-gray max-w-3xl mb-12"
              variants={fadeInUp}
            >
              Ready to make your construction business run smoother? Fill out the form below and we'll get back to you within 24 hours.
            </motion.p>
          </motion.div>
        </div>
      </section>


      <section className="bg-white py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={staggerItem}>
                <SectionNumber number="01" label="Contact Form" className="mb-6 md:mb-8" />
                <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-6">
                  Send us a message
                </h2>
                <ContactForm source="contact" onSuccess={() => setShowThankYou(true)} />
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={staggerItem}>
                <SectionNumber number="02" label="Contact Info" className="mb-6 md:mb-8" />
                <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-8">
                  Other ways to reach us
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-light-gray flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-brand-black" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-black mb-1">Email</h3>
                      <a
                        href="mailto:admin@plandepa.com"
                        className="text-brand-gray hover:text-brand-red transition-colors"
                      >
                        admin@plandepa.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-light-gray flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-brand-black" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-black mb-1">Service Area</h3>
                      <p className="text-brand-gray">
                        Australia-wide
                        <br />
                        Remote consultations available
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-light-gray flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-brand-black" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-black mb-1">Response Time</h3>
                      <p className="text-brand-gray">
                        Within 24 hours
                        <br />
                        Monday to Friday
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-6 bg-brand-light-gray rounded-lg">
                  <h3 className="font-bold text-brand-black mb-3">Prefer to book a call?</h3>
                  <p className="text-sm text-brand-gray mb-4">
                    See the Clarity Blueprint, or send us a message above and we'll set up a time to talk.
                  </p>
                  <Link
                    to="/clarity-blueprint"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-black text-white font-semibold text-sm rounded-lg hover:bg-gray-800 transition-all duration-300 apple-ease"
                  >
                    See the Clarity Blueprint
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>


      <section className="bg-brand-light-gray py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={staggerItem}>
              <SectionNumber number="03" label="FAQ" className="mb-6 md:mb-8" />
              <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-8 md:mb-12">
                Common questions about contacting us
              </h2>
              <SimpleFAQ items={contactFaqs} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <ThankYouModal isOpen={showThankYou} onClose={() => setShowThankYou(false)} />
    </>
  );
}
