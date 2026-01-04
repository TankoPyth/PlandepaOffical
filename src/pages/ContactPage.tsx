import { ArrowLeft, Mail, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ContactForm } from '../components/ContactForm';
import { SimpleFAQ } from '../components/SimpleFAQ';
import { AngleDivider } from '../components/ui/AngleDivider';
import { SectionNumber } from '../components/SectionNumber';
import { ThankYouModal } from '../components/ThankYouModal';
import { fadeInUp, staggerContainer, staggerItem, appleEasing } from '../utils/animations';
import { SEO } from '../components/SEO';
import { StructuredData, breadcrumbSchema } from '../components/StructuredData';

export function ContactPage() {
  const [showThankYou, setShowThankYou] = useState(false);
  const contactFaqs = [
    {
      question: 'How quickly will you respond?',
      answer: 'We aim to respond to all enquiries within 24 hours during business days. Urgent matters? Give us a call.',
    },
    {
      question: 'What information should I include in my message?',
      answer: 'Tell us about your business, what you\'re struggling with, and what you want to achieve. The more detail, the better we can help.',
    },
    {
      question: 'Do you offer phone consultations?',
      answer: 'Absolutely. After you reach out, we\'ll schedule a call that works for you. Most initial calls take 15-30 minutes.',
    },
    {
      question: 'What if I\'m not sure what I need?',
      answer: 'No worries. That\'s what the discovery call is for. We\'ll work out together what makes sense for your business.',
    },
  ];

  const contactBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://plandepa.com/' },
    { name: 'Contact', url: 'https://plandepa.com/contact' },
  ]);

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Plandepa',
    description: 'Get in touch with Plandepa construction business consultants in Brisbane and Sydney. ISO certified consultants ready to help your construction business.',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: contactFaqs.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <SEO
        title="Contact Plandepa | Brisbane & Sydney Construction Consultants"
        description="Contact Plandepa construction business consultants in Brisbane, Sydney & Newcastle. ISO certified team with construction industry expertise. Email: admin@plandepa.com | Phone: 0447 733 216"
        keywords="contact construction consultant Brisbane, construction consultant Sydney, Plandepa contact, construction business consulting Australia, ISO certified construction consultant contact"
      />
      <StructuredData data={[contactBreadcrumb, contactSchema, faqSchema]} />
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

      <AngleDivider direction="down-right" fromColor="#FAFAFA" toColor="#FFFFFF" height={100} />

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
                        Monday - Friday
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-6 bg-brand-light-gray rounded-xl">
                  <h3 className="font-bold text-brand-black mb-3">Prefer to book a call?</h3>
                  <p className="text-sm text-brand-gray mb-4">
                    Jump straight to our discovery call booking and we'll set up a time to chat.
                  </p>
                  <Link
                    to="/business-audit"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-black text-white font-semibold text-sm rounded-lg hover:bg-gray-800 transition-all duration-300 apple-ease"
                  >
                    Book Discovery Call
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <AngleDivider direction="up-right" fromColor="#FFFFFF" toColor="#F5F5F5" height={100} />

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
