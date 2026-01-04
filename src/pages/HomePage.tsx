/**
 * HomePage.tsx
 *
 * This is the MAIN LANDING PAGE (home page) of the website.
 *
 * PAGE SECTIONS (in order):
 * 1. Hero Section - Main headline, description, and CTA buttons
 * 2. Stats Section - Company statistics (clients served, projects completed, etc.)
 * 3. Services Section - Main services offered
 * 4. How It Works - Step-by-step process
 * 5. Founder Section - About Jarrod (with his photo)
 * 6. Case Studies - Customer success stories
 * 7. FAQ Section - Frequently asked questions
 * 8. CTA Section - Final call-to-action
 *
 * To modify:
 * - Hero text: Line ~51 and ~59
 * - FAQ questions: faqItems array below (line ~30)
 * - Stats: Search for "StatCard" component usage
 * - Services: Search for "MinimalServiceCard" component usage
 */

import { useState } from 'react';
import { Settings, Brain, DollarSign, Network, RefreshCw, Wrench, ArrowRight, Calculator, Facebook, Instagram, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SectionNumber } from '../components/SectionNumber';
import { PathCard } from '../components/PathCard';
import { MinimalServiceCard } from '../components/MinimalServiceCard';
import { CaseStudyPreview } from '../components/CaseStudyPreview';
import { SimpleFAQ } from '../components/SimpleFAQ';
import { StatCard } from '../components/StatCard';
import { SubtleWaveBackground } from '../components/ui/SubtleWaveBackground';
import { AngleDivider } from '../components/ui/AngleDivider';
import { Modal } from '../components/ui/Modal';
import { ContactForm } from '../components/ContactForm';
import { ThankYouModal } from '../components/ThankYouModal';
import { fadeInUp, staggerContainer, staggerItem, appleEasing } from '../utils/animations';
import { SEO } from '../components/SEO';
import { StructuredData, organizationSchema, localBusinessBrisbane, localBusinessSydney, websiteSchema, serviceSchemas, breadcrumbSchema } from '../components/StructuredData';

export function HomePage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  /**
   * FAQ ITEMS
   * These questions and answers appear in the FAQ section
   * To add a new FAQ: Add a new object with question and answer
   */
  const faqItems = [
    {
      question: 'Is the discovery call really no-obligation?',
      answer: 'Yeah, 100% no-obligation. No catch, no credit card, nothing. We give you real advice whether you hire us or not. We just want to help construction companies succeed.',
    },
    {
      question: 'How quickly can we start?',
      answer: 'For the discovery call, we can usually get you in this week. If you want us to build something for you, most clients see things improving within 2-4 weeks.',
    },
    {
      question: 'What if my team won\'t use it?',
      answer: 'We train everyone properly and make it dead simple to use. When it saves them time, they actually want to use it. Plus we stick around to help if anyone gets stuck.',
    },
    {
      question: 'Do you work with all types of construction?',
      answer: 'Yep. Home builders, commercial contractors, sparkies, plumbers, HVAC, reno specialists - we\'ve worked with all sorts. We build what fits your specific trade.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const homeBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://plandepa.com/' },
  ]);

  return (
    <>
      <SEO
        title="Plandepa - Construction AI Automation Brisbane, Sydney | ISO Certified Business Consultants"
        description="Brisbane & Sydney ISO certified construction business consultants. Diplomas in project management, building & construction. Cut paperwork 60%, increase leads 85%. Buildxact partner serving Australia."
        keywords="construction automation Brisbane, construction business consultant Sydney, AI automation construction Australia, construction consultant Newcastle, Buildxact partner Brisbane, ISO certified construction consultant, construction lead generation Australia, project management construction Queensland, construction automation NSW"
      />
      <StructuredData data={[
        organizationSchema,
        localBusinessBrisbane,
        localBusinessSydney,
        websiteSchema,
        ...serviceSchemas,
        faqSchema,
        homeBreadcrumb,
      ]} />
      {/* ============================================
          SECTION 1: HERO SECTION
          Main headline, description, and CTA buttons
          ============================================ */}
      <section className="relative bg-brand-off-white py-12 md:py-20 px-6 overflow-hidden min-h-[calc(100vh-80px)] flex flex-col">
        <SubtleWaveBackground />
        <div className="relative z-10 max-w-4xl mx-auto w-full flex-1 flex flex-col justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: appleEasing }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-brand-black mb-5 md:mb-6 leading-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: appleEasing, delay: 0.1 }}
            >
              Less Paperwork. More Jobs. Better Profit.
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-brand-gray mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: appleEasing, delay: 0.2 }}
            >
              We help construction companies in Brisbane, Sydney, Newcastle and across Australia cut down on the busy work, get more quality leads coming through the door, and grow without the chaos.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: appleEasing, delay: 0.3 }}
            >
              <Link
                to="/roi-calculator"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-black text-white font-semibold text-base rounded-lg hover:bg-gray-800 transition-all duration-300 apple-ease shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                <Calculator className="w-5 h-5" />
                Calculate Your ROI
              </Link>
              <Link
                to="/business-audit"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-brand-black font-semibold text-base rounded-lg border-2 border-brand-black hover:bg-brand-black hover:text-white transition-all duration-300 apple-ease"
              >
                Book Discovery Call
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-red text-white font-semibold text-base rounded-lg hover:bg-red-700 transition-all duration-300 apple-ease shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                <Mail className="w-5 h-5" />
                Get in Touch
              </button>
            </motion.div>
            <motion.div
              className="flex flex-wrap items-center justify-center gap-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: appleEasing, delay: 0.4 }}
            >
              <a
                href="https://www.facebook.com/profile.php?id=61581827105862"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-brand-gray hover:text-[#1877F2] transition-all duration-300 hover:scale-110 group"
              >
                <Facebook className="w-5 h-5 group-hover:fill-[#1877F2]" />
                <span className="text-sm font-medium">Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/plandepa/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-brand-gray hover:text-[#E4405F] transition-all duration-300 hover:scale-110 group"
              >
                <Instagram className="w-5 h-5" />
                <span className="text-sm font-medium">Instagram</span>
              </a>
              <a
                href="https://www.linkedin.com/company/107528755/admin/dashboard/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-brand-gray hover:text-[#0077B5] transition-all duration-300 hover:scale-110 group"
              >
                <Linkedin className="w-5 h-5 group-hover:fill-[#0077B5]" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          className="relative z-10 text-center pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: appleEasing, delay: 0.5 }}
        >
          <p className="text-sm md:text-base text-brand-gray">
            Trusted by 30+ construction companies
          </p>
        </motion.div>
      </section>

      <AngleDivider direction="down-right" fromColor="#FAFAFA" toColor="#FFFFFF" height={100} />

      <motion.section
        className="bg-white py-12 md:py-16 px-6"
        style={{ position: 'relative', zIndex: 10 }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="mb-8 md:mb-16" variants={staggerItem}>
            <SectionNumber number="00" label="About" className="mb-6 md:mb-8" />
            <h2 className="text-3xl sm:text-4xl md:text-display-md font-bold text-brand-black">
              Two Tradies Who Know Your Struggle
            </h2>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-8 md:mb-12" variants={staggerItem}>
            <motion.div className="flex gap-4 md:gap-6" variants={fadeInUp}>
              <div className="flex-shrink-0">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-brand-light-gray border-4 border-brand-red shadow-lg">
                  <img
                    src="/mitch_profile_picture.png"
                    alt="Mitch"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-brand-black mb-2">Mitch</h3>
                <p className="text-sm md:text-base text-brand-gray leading-relaxed mb-3">
                  Carpenter to State Manager in building and restoration. Ran multiple crews and learned that systems make or break scaling.
                </p>
                <a
                  href="https://www.linkedin.com/in/mitchell-humphries-8436ab37b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-brand-gray hover:text-[#0077B5] transition-all duration-300 hover:scale-105 group"
                >
                  <Linkedin className="w-4 h-4 group-hover:fill-[#0077B5]" />
                  <span className="font-medium">Let's connect</span>
                </a>
              </div>
            </motion.div>

            <motion.div className="flex gap-4 md:gap-6" variants={fadeInUp}>
              <div className="flex-shrink-0">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-brand-light-gray border-4 border-brand-red shadow-lg">
                  <img
                    src="/linkedin_profile_picture_(1).png"
                    alt="Jarrod"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-brand-black mb-2">Jarrod</h3>
                <p className="text-sm md:text-base text-brand-gray leading-relaxed mb-3">
                  Ran his own construction company at 21, then site management for Tier 1 mining companies. Seen it all from startup chaos to enterprise scale.
                </p>
                <a
                  href="https://www.linkedin.com/in/jarrod-tanko-104943267/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-brand-gray hover:text-[#0077B5] transition-all duration-300 hover:scale-105 group"
                >
                  <Linkedin className="w-4 h-4 group-hover:fill-[#0077B5]" />
                  <span className="font-medium">Let's connect</span>
                </a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div className="bg-brand-light-gray p-6 md:p-8 rounded-2xl text-center max-w-3xl mx-auto" variants={fadeInUp}>
            <h3 className="text-xl md:text-2xl font-bold text-brand-black mb-4">Why We Started Plandepa</h3>
            <p className="text-base md:text-lg text-brand-gray leading-relaxed mb-4">
              We've been there: trying to grow your construction business but drowning in paperwork, missing leads, and spending more time in the office than on site. Every software company promises the world, but nobody speaks your language.
            </p>
            <p className="text-base md:text-lg text-brand-black font-semibold leading-relaxed mb-4">
              We bring real construction know-how plus the tech smarts to fix your systems. Our promise: what we build saves you more money than it costs within 6 months.
            </p>
            <div className="pt-4 border-t border-brand-gray/20">
              <p className="text-sm md:text-base text-brand-gray mb-2 font-semibold">ISO Certified & Qualified Team</p>
              <p className="text-xs md:text-sm text-brand-gray">
                Our team holds Diplomas in Project Management, Health & Safety, Building & Construction, plus ISO Auditing Accreditation
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <AngleDivider direction="up-right" fromColor="#FFFFFF" toColor="#F5F5F5" height={100} />

      <motion.section
        id="choose-path"
        className="bg-brand-light-gray py-10 md:py-16 px-6"
        style={{ position: 'relative', zIndex: 10 }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="mb-8 md:mb-16" variants={staggerItem}>
            <SectionNumber number="01" label="Offers" className="mb-6 md:mb-8" />
            <h2 className="text-3xl sm:text-4xl md:text-display-md font-bold text-brand-black">
              Which path is right for you?
            </h2>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 gap-6 md:gap-10 mb-8 md:mb-12" variants={staggerItem}>
            <PathCard
              label="START HERE"
              title="Business Strategy Audit"
              benefits={[
                'New to AI automation',
                'Curious about possibilities',
                'Want unbiased advice',
                'Not ready to commit yet',
              ]}
              badge="No-Obligation"
              badgeColor="green"
              href="/business-audit"
            />
            <PathCard
              label="SCALE NOW"
              title="Lead Generation System"
              benefits={[
                'Want more qualified leads',
                'Need predictable pipeline',
                'Ready to scale up',
                'Tired of cold calling',
              ]}
              badge="Results Guaranteed"
              badgeColor="green"
              href="/lead-generation"
            />
          </motion.div>

          <motion.p className="text-center text-base md:text-body-lg text-brand-gray" variants={fadeInUp}>
            Not sure?{' '}
            <a href="#contact" className="text-brand-red hover:underline font-semibold transition-colors duration-300 apple-ease">
              Book a quick call →
            </a>
          </motion.p>
        </div>
      </motion.section>

      <AngleDivider direction="down-right" fromColor="#F5F5F5" toColor="#FFFFFF" height={100} />

      <motion.section
        id="services"
        className="bg-white py-12 md:py-16 px-6"
        style={{ position: 'relative', zIndex: 10 }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="mb-8 md:mb-10" variants={staggerItem}>
            <SectionNumber number="02" label="Services" className="mb-6 md:mb-8" />
            <h2 className="text-3xl sm:text-4xl md:text-display-sm font-bold text-brand-black mb-4 md:mb-6">
              What we actually do for you
            </h2>
            <p className="text-base sm:text-lg md:text-body-xl text-brand-gray max-w-3xl">
              Straightforward solutions that we've tested and proven with real construction companies. We help you grow without losing your mind, using systems that actually make sense for how you work.
            </p>
          </motion.div>

          <motion.div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8" variants={staggerItem}>
            <MinimalServiceCard
              icon={Settings}
              title="Pick The Right Tools"
              description="We help you choose software that actually fits your business. No sales pitch, just honest advice on what will make your life easier and save you money."
            />
            <MinimalServiceCard
              icon={Brain}
              title="Set Up Smart Systems"
              description="We build systems that handle the repetitive stuff for you. Things like following up with leads, sending quotes, and keeping everyone in the loop happen automatically."
            />
            <MinimalServiceCard
              icon={DollarSign}
              title="Get Paid Faster"
              description="We connect everything from your first quote all the way to getting paid. Less chasing invoices, less data entry, more money in the bank sooner."
            />
            <MinimalServiceCard
              icon={Network}
              title="Connect Everything"
              description="Make all your tools talk to each other so you're not typing the same info twice. Everything updates everywhere automatically."
            />
            <MinimalServiceCard
              icon={RefreshCw}
              title="Stick With You"
              description="We train your team and keep things running smooth. As you grow and things change, we make sure your systems keep working for you."
            />
            <MinimalServiceCard
              icon={Wrench}
              title="Find Better Leads"
              description="We help you attract the right kind of customers and keep in touch with them until they're ready to start their project with you."
            />
          </motion.div>
        </div>
      </motion.section>

      <AngleDivider direction="up-right" fromColor="#FFFFFF" toColor="#F5F5F5" height={80} />

      <motion.section
        className="bg-brand-light-gray py-12 md:py-16 px-6"
        style={{ position: 'relative', zIndex: 10 }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12" variants={staggerItem}>
            <StatCard value="500+" label="Hours saved annually" />
            <StatCard value="85%" label="Increase in close rate" />
            <StatCard value="200+" label="Happy clients" />
          </motion.div>
        </div>
      </motion.section>

      <AngleDivider direction="down-right" fromColor="#F5F5F5" toColor="#FFFFFF" height={100} />

      <motion.section
        className="bg-white py-12 md:py-16 px-6"
        style={{ position: 'relative', zIndex: 10 }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="mb-8 md:mb-16" variants={staggerItem}>
            <SectionNumber number="03" label="Case Studies" className="mb-6 md:mb-8" />
            <h2 className="text-3xl sm:text-4xl md:text-display-sm font-bold text-brand-black mb-4 md:mb-6">
              See what we've built
            </h2>
          </motion.div>

          <motion.div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12" variants={staggerItem}>
            <CaseStudyPreview
              companyType="Custom Home Builder"
              href="/case-studies"
            />
            <CaseStudyPreview
              companyType="Commercial Electrical"
              href="/case-studies"
            />
            <CaseStudyPreview
              companyType="Renovation Specialist"
              href="/case-studies"
            />
          </motion.div>

          <motion.p className="text-center" variants={fadeInUp}>
            <a
              href="/case-studies"
              className="inline-flex items-center gap-2 text-base md:text-body-lg text-brand-red font-semibold hover:gap-3 transition-all duration-300 apple-ease"
            >
              View all case studies
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </a>
          </motion.p>
        </div>
      </motion.section>

      <AngleDivider direction="up-right" fromColor="#FFFFFF" toColor="#F5F5F5" height={100} />

      <motion.section
        className="bg-brand-light-gray py-12 md:py-16 px-6"
        style={{ position: 'relative', zIndex: 10 }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="mb-8 md:mb-16" variants={staggerItem}>
            <SectionNumber number="04" label="FAQ" className="mb-6 md:mb-8" />
            <h2 className="text-3xl sm:text-4xl md:text-display-sm font-bold text-brand-black mb-4 md:mb-6">
              Common questions
            </h2>
          </motion.div>

          <motion.div variants={staggerItem}>
            <SimpleFAQ items={faqItems} />
          </motion.div>

          <motion.p className="text-center text-base md:text-body-lg text-brand-gray mt-8 md:mt-12" variants={fadeInUp}>
            Still have questions?{' '}
            <a href="#contact" className="text-brand-red hover:underline font-semibold transition-colors duration-300 apple-ease">
              Let's talk →
            </a>
          </motion.p>
        </div>
      </motion.section>

      <AngleDivider direction="down-right" fromColor="#F5F5F5" toColor="#FFFFFF" height={100} />

      <motion.section
        id="contact"
        className="bg-white py-12 md:py-16 px-6"
        style={{ position: 'relative', zIndex: 10 }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 className="text-3xl sm:text-4xl md:text-display-md font-bold text-brand-black mb-6 md:mb-8" variants={fadeInUp}>
            Ready to build a better business?
          </motion.h2>
          <motion.p className="text-base sm:text-lg md:text-body-xl text-brand-gray mb-8 md:mb-12 max-w-2xl mx-auto" variants={fadeInUp}>
            Book your discovery call or have a chat about growing your business.
          </motion.p>
          <motion.button
            onClick={() => setIsContactModalOpen(true)}
            className="inline-flex items-center gap-2 md:gap-3 px-8 py-4 md:px-12 md:py-5 bg-brand-black text-white font-semibold text-base md:text-body-lg rounded-full hover:bg-gray-800 transition-all duration-300 apple-ease shadow-xl mb-6 md:mb-8 hover:scale-105 active:scale-95"
            variants={fadeInUp}
          >
            Book discovery call
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
          <motion.p className="text-sm md:text-body-md text-brand-gray" variants={fadeInUp}>
            Or email us:{' '}
            <a href="mailto:admin@plandepa.com" className="text-brand-black hover:text-brand-red font-semibold transition-colors duration-300 apple-ease">
              admin@plandepa.com
            </a>
          </motion.p>
        </div>
      </motion.section>

      <Modal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="Get in Touch"
      >
        <ContactForm
          source="homepage"
          onSuccess={() => {
            setTimeout(() => {
              setIsContactModalOpen(false);
              setShowThankYou(true);
            }, 1500);
          }}
        />
      </Modal>

      <ThankYouModal isOpen={showThankYou} onClose={() => setShowThankYou(false)} />
    </>
  );
}
