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
import { Settings, Brain, DollarSign, Network, RefreshCw, Wrench, ArrowRight, Calculator, Facebook, Instagram, Linkedin, Mail, Inbox, RotateCcw, FileText, Camera, Truck, ArrowLeftRight, Target, Zap, Shield, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';
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
import { WorkflowCard } from '../components/WorkflowCard';
import { WorkflowModal } from '../components/WorkflowModal';
import { StickyWorkflowBar } from '../components/StickyWorkflowBar';
import { fadeInUp, staggerContainer, staggerItem, appleEasing } from '../utils/animations';
import { SEO } from '../components/SEO';
import { StructuredData, organizationSchema, localBusinessBrisbane, localBusinessSydney, websiteSchema, serviceSchemas, breadcrumbSchema } from '../components/StructuredData';

export function HomePage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<number | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const workflows = [
    {
      icon: Inbox,
      title: 'Inbound Black Hole',
      painPoint: 'Enquiries disappear into email chaos, nothing gets tracked properly',
      hoursSaved: 8,
      isPopular: true,
      fullDescription: 'You get enquiries from multiple channels - email, phone, Facebook, walk-ins. Some get answered fast, others sit for days. Nobody knows who\'s following up what, and hot leads go cold because they fell through the cracks.',
      whatWeInstall: [
        'Single inbox that captures every enquiry from every channel',
        'Automatic assignment to the right person',
        'Follow-up reminders that actually work',
        'Response time tracking',
        'Lead scoring to prioritize hot prospects',
      ],
      whatImproves: [
        { metric: 'Response Time', improvement: '< 1 hour' },
        { metric: 'Lost Leads', improvement: '-95%' },
        { metric: 'Admin Time', improvement: '-8 hrs/week' },
      ],
      beforeAfter: {
        before: 'Enquiries scattered across email, phone logs, Facebook. Some answered in minutes, others never seen. No idea who\'s doing what.',
        after: 'Every enquiry lands in one system, gets assigned instantly, follow-ups automated. Nothing slips through.',
      },
    },
    {
      icon: RotateCcw,
      title: 'Follow-Up Nightmare',
      painPoint: 'Hours wasted chasing the same updates from site, clients, suppliers',
      hoursSaved: 12,
      isPopular: true,
      fullDescription: 'You spend hours every day asking for updates. "Where are we at with that variation?" "Did the client approve?" "When are materials arriving?" Same questions to the same people, every single day.',
      whatWeInstall: [
        'Automated status update requests',
        'Smart reminders that escalate if ignored',
        'Pre-filled update forms for fast responses',
        'Dashboard showing everything overdue',
        'Client portal for self-service updates',
      ],
      whatImproves: [
        { metric: 'Follow-up Time', improvement: '-70%' },
        { metric: 'Response Rate', improvement: '+85%' },
        { metric: 'Admin Hours', improvement: '-12/week' },
      ],
      beforeAfter: {
        before: 'Constant calls and texts asking for updates. Chasing the same people daily. Updates arrive late or incomplete.',
        after: 'Updates come to you automatically. System handles reminders and escalations. Dashboard shows everything at a glance.',
      },
    },
    {
      icon: FileText,
      title: 'Variation Delays',
      painPoint: 'Approvals stuck, margin getting chewed while you wait',
      hoursSaved: 10,
      fullDescription: 'Variations sit waiting for approval for days or weeks. You\'re doing the work anyway, hoping it gets approved later. By the time it\'s official, you\'ve lost track of actual costs and your margin is toast.',
      whatWeInstall: [
        'Quick variation creation from mobile or desktop',
        'Automatic client notification with approval link',
        'Reminder sequences for unapproved variations',
        'Cost tracking that links to actual invoices',
        'Approval history and audit trail',
      ],
      whatImproves: [
        { metric: 'Approval Time', improvement: '-60%' },
        { metric: 'Margin Recovery', improvement: '+15%' },
        { metric: 'Admin Time', improvement: '-10 hrs/week' },
      ],
      beforeAfter: {
        before: 'Variations written on paper, sent via email, approval takes weeks. No tracking of costs. Margin disappears.',
        after: 'Variations created and sent in 2 minutes. Client approves via link. Costs tracked automatically against approval.',
      },
    },
    {
      icon: Camera,
      title: 'Site-to-Office Gap',
      painPoint: 'Photos everywhere, office reconstructing what happened on site',
      hoursSaved: 15,
      fullDescription: 'Your team takes hundreds of photos but they live in personal phones or random WhatsApp threads. Office staff spend hours asking "which job was that?", "when was this taken?", "what am I looking at?"',
      whatWeInstall: [
        'Site diary app that links photos to jobs automatically',
        'Voice-to-text notes while on site',
        'Automatic GPS and timestamp on every photo',
        'Instant sync to office dashboard',
        'Organized photo library by job and date',
      ],
      whatImproves: [
        { metric: 'Photo Sorting Time', improvement: '-90%' },
        { metric: 'Site Communication', improvement: '+80%' },
        { metric: 'Admin Hours', improvement: '-15/week' },
      ],
      beforeAfter: {
        before: 'Photos scattered across phones. Office calls site asking for context. Hours wasted sorting and organizing.',
        after: 'Photos captured on site, automatically tagged and organized. Office sees everything in real-time with context.',
      },
    },
    {
      icon: Truck,
      title: 'Supplier Chaos',
      painPoint: 'Materials late or wrong, nobody knows what\'s outstanding',
      hoursSaved: 8,
      fullDescription: 'You order materials via email and phone calls. Half the time you\'re not sure if it was ordered, when it\'s arriving, or if it\'s the right spec. Jobs get delayed because materials don\'t show up.',
      whatWeInstall: [
        'Centralized ordering system with supplier integration',
        'Automatic delivery tracking and notifications',
        'Outstanding order dashboard',
        'Spec matching to prevent wrong orders',
        'Delivery confirmation workflow',
      ],
      whatImproves: [
        { metric: 'Delayed Deliveries', improvement: '-75%' },
        { metric: 'Wrong Orders', improvement: '-85%' },
        { metric: 'Ordering Time', improvement: '-8 hrs/week' },
      ],
      beforeAfter: {
        before: 'Orders scattered across email and phone. No visibility on what\'s outstanding. Delays and wrong materials common.',
        after: 'All orders in one system. Real-time tracking. Alerts when deliveries are late. Wrong orders caught before they ship.',
      },
    },
    {
      icon: ArrowLeftRight,
      title: 'Messy Handovers',
      painPoint: 'Job details lost between quote and delivery',
      hoursSaved: 6,
      fullDescription: 'Sales wins the job, but half the details never make it to the site team. Scope creep starts on day one because nobody really knows what was promised. Clients get frustrated and your team is flying blind.',
      whatWeInstall: [
        'Structured handover checklist',
        'Automatic transfer of quote details to job system',
        'Client expectation documentation',
        'Site access to full job history',
        'Change tracking from day one',
      ],
      whatImproves: [
        { metric: 'Handover Errors', improvement: '-80%' },
        { metric: 'Scope Clarity', improvement: '+90%' },
        { metric: 'Admin Time', improvement: '-6 hrs/week' },
      ],
      beforeAfter: {
        before: 'Sales hands over a quote and a prayer. Site team guesses at scope. Client expectations don\'t match reality.',
        after: 'Complete job details flow from quote to site automatically. Everyone works from the same playbook.',
      },
    },
  ];

  /**
   * FAQ ITEMS
   * These questions and answers appear in the FAQ section
   * To add a new FAQ: Add a new object with question and answer
   */
  const faqItems = [
    {
      question: 'What if the pilot doesn\'t hit the metrics?',
      answer: 'Simple: you don\'t pay. We only get paid when we deliver measurable results. If we don\'t hit the agreed numbers in 28 days, we eat the cost. That\'s our risk, not yours.',
    },
    {
      question: 'How much team time does a pilot need?',
      answer: 'Minimal. About 2-3 hours total across the whole month. We do the heavy lifting. Your team just needs to give us 30 minutes at the start to understand the workflow, then quick check-ins as we build.',
    },
    {
      question: 'Can we pilot multiple workflows at once?',
      answer: 'We don\'t recommend it. Better to prove value on one bottleneck first, then expand. Trying to fix everything at once usually means nothing gets done properly.',
    },
    {
      question: 'What happens after the pilot?',
      answer: 'You\'ll have clear data on what improved. Then you decide: stop here, extend to more workflows, or scale across your whole operation. No lock-in, no surprises. We only continue if you want us to.',
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
              Stop The Chaos. Control One Workflow in 28 Days.
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-brand-gray mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: appleEasing, delay: 0.2 }}
            >
              We prove value fast - one bottleneck, one month, measurable results. Pay only on success.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: appleEasing, delay: 0.3 }}
            >
              <a
                href="#workflows"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-black text-white font-semibold text-base rounded-lg hover:bg-gray-800 transition-all duration-300 apple-ease shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                <Target className="w-5 h-5" />
                See Workflow Options
              </a>
              <Link
                to="/business-audit"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-brand-black font-semibold text-base rounded-lg border-2 border-brand-black hover:bg-brand-black hover:text-white transition-all duration-300 apple-ease"
              >
                Book Free Discovery
                <ArrowRight className="w-5 h-5" />
              </Link>
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
          <motion.div className="mb-8 md:mb-16 text-center" variants={staggerItem}>
            <SectionNumber number="01" label="Next Step" className="mb-6 md:mb-8 justify-center" />
            <h2 className="text-3xl sm:text-4xl md:text-display-md font-bold text-brand-black">
              Ready To Start?
            </h2>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 gap-6 md:gap-10 mb-8 md:mb-12" variants={staggerItem}>
            <PathCard
              label="NOT SURE WHICH WORKFLOW?"
              title="Book Free Discovery Call"
              benefits={[
                'No obligation, no cost',
                'Identify your biggest bottleneck',
                'Get honest advice',
                'Understand if a pilot makes sense',
              ]}
              badge="Lowest Barrier"
              badgeColor="green"
              href="/business-audit"
            />
            <PathCard
              label="KNOW YOUR BOTTLENECK?"
              title="Apply for Pilot Slot"
              benefits={[
                '28-day proof of concept',
                'One workflow, measurable results',
                'Pay only on success',
                'Limited to 3 per month',
              ]}
              badge="Fast Track"
              badgeColor="red"
              href="/business-audit"
            />
          </motion.div>

          <motion.p className="text-center text-base md:text-body-lg text-brand-gray" variants={fadeInUp}>
            Questions?{' '}
            <a href="#faq" className="text-brand-red hover:underline font-semibold transition-colors duration-300 apple-ease">
              Check our FAQ →
            </a>
          </motion.p>
        </div>
      </motion.section>

      <AngleDivider direction="down-right" fromColor="#F5F5F5" toColor="#FFFFFF" height={100} />

      <motion.section
        id="workflows"
        className="bg-white py-12 md:py-20 px-6"
        style={{ position: 'relative', zIndex: 10 }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="mb-12 md:mb-16 text-center" variants={staggerItem}>
            <SectionNumber number="02" label="Workflows" className="mb-6 md:mb-8 justify-center" />
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-brand-black mb-4 md:mb-6">
              Which Workflow Is Killing Your Productivity?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-brand-gray max-w-3xl mx-auto">
              Pick one bottleneck. We'll build control around it in 28 days. Prove value before scaling.
            </p>
          </motion.div>

          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" variants={staggerItem}>
            {workflows.map((workflow, index) => (
              <WorkflowCard
                key={index}
                icon={workflow.icon}
                title={workflow.title}
                painPoint={workflow.painPoint}
                hoursSaved={workflow.hoursSaved}
                isPopular={workflow.isPopular}
                onClick={() => setSelectedWorkflow(index)}
              />
            ))}
          </motion.div>
        </div>
      </motion.section>

      {selectedWorkflow !== null && (
        <WorkflowModal
          isOpen={selectedWorkflow !== null}
          onClose={() => setSelectedWorkflow(null)}
          {...workflows[selectedWorkflow]}
        />
      )}

      <AngleDivider direction="up-right" fromColor="#FFFFFF" toColor="#F5F5F5" height={80} />

      <motion.section
        className="bg-brand-light-gray py-12 md:py-20 px-6"
        style={{ position: 'relative', zIndex: 10 }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="mb-12 md:mb-16 text-center" variants={staggerItem}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black mb-4 md:mb-6">
              Why Companies Choose The Pilot First
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-brand-gray max-w-2xl mx-auto">
              Prove value before scaling. Fast results, zero risk, minimal disruption.
            </p>
          </motion.div>

          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" variants={staggerItem}>
            <motion.div
              className="bg-white rounded-2xl p-8 text-center"
              variants={fadeInUp}
              whileHover={{ y: -5, boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)' }}
              transition={{ duration: 0.3, ease: appleEasing }}
            >
              <motion.div
                className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6"
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Shield className="w-8 h-8 text-green-600" />
              </motion.div>
              <h3 className="text-xl font-bold text-brand-black mb-3">Zero Risk</h3>
              <p className="text-brand-gray">
                Pay only if we hit agreed metrics in 28 days. We eat the risk, you get the results.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl p-8 text-center"
              variants={fadeInUp}
              whileHover={{ y: -5, boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)' }}
              transition={{ duration: 0.3, ease: appleEasing }}
            >
              <motion.div
                className="w-16 h-16 bg-brand-red/10 rounded-2xl flex items-center justify-center mx-auto mb-6"
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Zap className="w-8 h-8 text-brand-red" />
              </motion.div>
              <h3 className="text-xl font-bold text-brand-black mb-3">Fast Proof</h3>
              <p className="text-brand-gray">
                See measurable improvement in one workflow within a month. No long commitments.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl p-8 text-center"
              variants={fadeInUp}
              whileHover={{ y: -5, boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)' }}
              transition={{ duration: 0.3, ease: appleEasing }}
            >
              <motion.div
                className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6"
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Clock className="w-8 h-8 text-blue-600" />
              </motion.div>
              <h3 className="text-xl font-bold text-brand-black mb-3">No Disruption</h3>
              <p className="text-brand-gray">
                We work around your schedule, minimal team involvement. Just 2-3 hours total.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl p-8 text-center"
              variants={fadeInUp}
              whileHover={{ y: -5, boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)' }}
              transition={{ duration: 0.3, ease: appleEasing }}
            >
              <motion.div
                className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6"
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </motion.div>
              <h3 className="text-xl font-bold text-brand-black mb-3">Clear Next Step</h3>
              <p className="text-brand-gray">
                After proof, you decide to scale or stop. No pressure, no lock-in.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <AngleDivider direction="down-right" fromColor="#F5F5F5" toColor="#FFFFFF" height={80} />

      <motion.section
        className="bg-white py-12 md:py-20 px-6"
        style={{ position: 'relative', zIndex: 10 }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div className="mb-12 md:mb-16 text-center" variants={staggerItem}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black mb-4 md:mb-6">
              How The Pilot Works
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-brand-gray max-w-2xl mx-auto">
              Four weeks from bottleneck to breakthrough
            </p>
          </motion.div>

          <motion.div className="relative" variants={staggerItem}>
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-brand-red/20 transform md:-translate-x-1/2" />

            <div className="space-y-12">
              <motion.div
                className="relative flex flex-col md:flex-row items-start md:items-center gap-6"
                variants={fadeInUp}
              >
                <div className="flex items-center gap-6 w-full md:w-1/2 md:justify-end md:pr-12">
                  <div className="flex-shrink-0 w-16 h-16 bg-brand-red rounded-full flex items-center justify-center text-white font-bold text-2xl z-10 shadow-lg">
                    1
                  </div>
                  <div className="flex-1 md:text-right">
                    <h3 className="text-2xl font-bold text-brand-black mb-2">Map & Measure</h3>
                    <p className="text-brand-gray">
                      Week 1: Identify bottleneck, set baseline metrics, define success
                    </p>
                  </div>
                </div>
                <div className="hidden md:block w-1/2" />
              </motion.div>

              <motion.div
                className="relative flex flex-col md:flex-row-reverse items-start md:items-center gap-6"
                variants={fadeInUp}
              >
                <div className="flex items-center gap-6 w-full md:w-1/2 md:pl-12">
                  <div className="flex-shrink-0 w-16 h-16 bg-brand-red rounded-full flex items-center justify-center text-white font-bold text-2xl z-10 shadow-lg">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-brand-black mb-2">Build & Install</h3>
                    <p className="text-brand-gray">
                      Week 2-3: Create control layer, test with team, refine based on feedback
                    </p>
                  </div>
                </div>
                <div className="hidden md:block w-1/2" />
              </motion.div>

              <motion.div
                className="relative flex flex-col md:flex-row items-start md:items-center gap-6"
                variants={fadeInUp}
              >
                <div className="flex items-center gap-6 w-full md:w-1/2 md:justify-end md:pr-12">
                  <div className="flex-shrink-0 w-16 h-16 bg-brand-red rounded-full flex items-center justify-center text-white font-bold text-2xl z-10 shadow-lg">
                    3
                  </div>
                  <div className="flex-1 md:text-right">
                    <h3 className="text-2xl font-bold text-brand-black mb-2">Prove & Deliver</h3>
                    <p className="text-brand-gray">
                      Week 4: Measure results against baseline, deliver proof artifacts, you decide next step
                    </p>
                  </div>
                </div>
                <div className="hidden md:block w-1/2" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div className="mt-12 text-center" variants={fadeInUp}>
            <a
              href="/business-audit"
              className="inline-flex items-center gap-2 px-10 py-4 bg-brand-black text-white font-semibold text-lg rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              Apply for Pilot Slot
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="mt-4 text-sm text-brand-gray">
              Limited to 3 pilots per month
            </p>
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
            <motion.div
              className="text-center"
              variants={fadeInUp}
            >
              <motion.div
                className="text-5xl md:text-6xl font-bold text-brand-red mb-3"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  100%
                </motion.span>
              </motion.div>
              <p className="text-base md:text-lg text-brand-gray font-medium">
                Capture Within 1 Hour
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              variants={fadeInUp}
            >
              <motion.div
                className="text-5xl md:text-6xl font-bold text-brand-red mb-3"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  40-70%
                </motion.span>
              </motion.div>
              <p className="text-base md:text-lg text-brand-gray font-medium">
                Follow-ups Reduced
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              variants={fadeInUp}
            >
              <motion.div
                className="text-5xl md:text-6xl font-bold text-brand-red mb-3"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  28 Days
                </motion.span>
              </motion.div>
              <p className="text-base md:text-lg text-brand-gray font-medium">
                To Measurable Results
              </p>
            </motion.div>
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
        id="faq"
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
              Pilot Program Questions
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

      <StickyWorkflowBar />
    </>
  );
}
