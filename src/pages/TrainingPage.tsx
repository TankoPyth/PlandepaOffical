import { useState } from 'react';
import { ArrowLeft, Check, Lightbulb, Users, Video, Calendar, DollarSign, Clock, Target, Brain, Zap, TrendingUp, Award, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SimpleFAQ } from '../components/SimpleFAQ';
import { AngleDivider } from '../components/ui/AngleDivider';
import { SEO } from '../components/SEO';
import { StructuredData, breadcrumbSchema } from '../components/StructuredData';
import { Modal } from '../components/ui/Modal';
import { ContactForm } from '../components/ContactForm';
import { ThankYouModal } from '../components/ThankYouModal';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';

export function TrainingPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const educationOffers = [
    {
      icon: Video,
      badge: 'FREE',
      title: 'Automation Possibilities Webinar',
      subtitle: 'What is Possible With Automation in a Construction Business',
      duration: '90 minutes',
      whoFor: 'Owners, directors, and admin or ops leads who keep hearing about AI but do not know what is real, what is safe, or what applies to their business.',
      whatYouGet: [
        'The 5 most common admin and management bottlenecks in construction, and why they keep repeating',
        'Real examples of workflows that can be automated without replacing your software',
        'A simple way to spot your top 1-3 highest ROI automation opportunities',
        'What a "pilot" looks like in practice, what gets built, how success is measured',
        'Live Q&A session',
      ],
      whatItIsNot: [
        'Not technical training',
        'Not a software demo',
        'Not hype or theory',
      ],
      cta: 'Register for Next Webinar',
    },
    {
      icon: Target,
      badge: 'PAID ENTRY',
      title: 'Automation Clarity Session',
      subtitle: 'Turn AI confusion into a clear, practical first-step plan',
      duration: '90 minutes remote',
      whoFor: 'Construction businesses that want clarity on what to automate first, without committing to a major project.',
      whatYouGet: [
        'Identify where work is getting stuck, duplicated, or lost',
        'Map one workflow end-to-end: capture, assign, SLA, escalation, reporting',
        'Select the first automation to fix based on impact and ease',
        'Define success metrics so outcomes are measurable',
      ],
      outputs: [
        'A "first automation" recommendation and why it wins',
        'A simple workflow map for that process',
        'Draft success metrics for a pilot',
        'Recommended next step: either 28-day pilot or OSR',
      ],
      whatItIsNot: [
        'Not generic AI training',
        'Not a full Operational Systems Review',
        'Not implementation work',
      ],
      cta: 'Book Clarity Session',
    },
    {
      icon: Users,
      badge: 'TEAM SESSION',
      title: 'Half-Day Team Clarity Workshop',
      subtitle: 'Align your team so changes actually stick',
      duration: 'Half-day (remote or on-site)',
      whoFor: 'Teams who need alignment across admin, ops, and leadership so changes actually stick.',
      whatYouGet: [
        'What changes first',
        'Who owns what',
        'What success looks like',
        'What gets automated next',
      ],
      outputs: [
        'Prioritized list of automation opportunities (top 5)',
        'One workflow fully mapped and approved by the team',
        'Pilot plan with metrics and responsibilities',
      ],
      whatItIsNot: [
        'Not a generic team-building exercise',
        'Not a software selection workshop',
        'Not implementation work',
      ],
      cta: 'Request Team Session',
    },
  ];

  const faqItems = [
    {
      question: 'How is this different from generic AI training?',
      answer: 'We focus exclusively on construction business workflows. Every example, every automation, every ROI calculation is specific to builders, renovators, and trade contractors. No generic ChatGPT tutorials or theory.',
    },
    {
      question: 'Do I need to be technical to understand this?',
      answer: 'Not at all. These sessions are designed for business owners and operations leaders, not IT people. We explain everything in plain English with real construction examples.',
    },
    {
      question: 'What if I am not ready to implement anything yet?',
      answer: 'That is fine. The free webinar is perfect for learning what is possible. The paid sessions are for when you want specific guidance on your business, even if you are not ready to pull the trigger yet.',
    },
    {
      question: 'Can I bring my whole team to the webinar?',
      answer: 'Absolutely. The more people who understand what is possible, the easier implementation becomes later. Register once and share the link with your team.',
    },
    {
      question: 'What happens after the Clarity Session?',
      answer: 'You get a clear recommendation: either proceed with a 28-day pilot, book a full Operational Systems Review, or implement specific changes yourself. No pressure, no lock-in.',
    },
    {
      question: 'Why should I pay for a Clarity Session when the webinar is free?',
      answer: 'The webinar shows what is possible across construction businesses generally. The Clarity Session analyzes your specific workflows, your bottlenecks, your team, and gives you a custom roadmap.',
    },
    {
      question: 'How is the Team Workshop different from the Clarity Session?',
      answer: 'The Clarity Session is focused on the business owner or decision-maker. The Team Workshop brings everyone together - admin, ops, leadership - to get alignment so implementation actually works.',
    },
  ];

  const learningPath = [
    {
      step: '1',
      title: 'Start with the Free Webinar',
      description: 'Understand what is possible with AI automation in construction businesses.',
      icon: Video,
    },
    {
      step: '2',
      title: 'Book a Clarity Session',
      description: 'Get specific recommendations for your business and workflows.',
      icon: Target,
    },
    {
      step: '3',
      title: 'Run a Team Workshop',
      description: 'Align your team and create a concrete implementation plan.',
      icon: Users,
    },
    {
      step: '4',
      title: 'Start a 28-Day Pilot',
      description: 'Prove value with one workflow before scaling across your business.',
      icon: Zap,
    },
  ];

  const trainingBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://plandepa.com/' },
    { name: 'AI Automation Education', url: 'https://plandepa.com/training' },
  ]);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Automation Education for Construction',
    provider: {
      '@type': 'Organization',
      name: 'Plandepa',
    },
    areaServed: ['Brisbane', 'Sydney', 'Newcastle', 'Australia'],
    description: 'AI and automation education programs for construction businesses. Free webinars, clarity sessions, and team workshops to understand and implement automation in construction operations.',
  };

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

  return (
    <>
      <SEO
        title="AI Automation Education for Construction Brisbane | Training & Workshops"
        description="Learn what is possible with AI automation in construction. Free webinars, clarity sessions, and team workshops. From concept to implementation for Brisbane, Sydney & Newcastle builders."
        keywords="AI training construction, automation education Brisbane, construction AI workshop, business automation training, construction technology education Sydney"
      />
      <StructuredData data={[trainingBreadcrumb, serviceSchema, faqSchema]} />

      <section className="bg-brand-off-white py-12 md:py-16 px-6" style={{ position: 'relative', zIndex: 1 }}>
        <div className="max-w-7xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-brand-gray hover:text-brand-black transition-colors duration-300 mb-6 md:mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center mb-12 md:mb-16"
          >
            <motion.div variants={staggerItem} className="inline-flex items-center gap-2 bg-brand-red/10 text-brand-red px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Brain className="w-4 h-4" />
              AI Automation Education
            </motion.div>

            <motion.h1 variants={staggerItem} className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-black mb-6">
              From Learning to Doing
            </motion.h1>
            <motion.p variants={staggerItem} className="text-xl md:text-2xl text-brand-gray max-w-3xl mx-auto mb-8">
              From concept to clarity. Understand what AI can actually do for your construction business.
            </motion.p>

            <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="bg-brand-cta-orange text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Register for Free Webinar
              </button>
              <a
                href="#offerings"
                className="bg-white text-brand-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-light-gray transition-all duration-300 shadow-md border-2 border-brand-black"
              >
                See All Options
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <AngleDivider direction="down-left" fromColor="#F5F5F5" toColor="#FFFFFF" height={60} />

      <motion.section
        className="bg-white py-16 md:py-24 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={staggerItem} className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black mb-4">
              Why This Education Matters
            </h2>
            <p className="text-lg md:text-xl text-brand-gray max-w-2xl mx-auto">
              You keep hearing about AI, but you do not know what is real, what is safe, or what actually applies to construction.
            </p>
          </motion.div>

          <motion.div variants={staggerItem} className="grid md:grid-cols-3 gap-8">
            <div className="bg-brand-light-gray p-8 rounded-xl">
              <Lightbulb className="w-12 h-12 text-brand-red mb-4" />
              <h3 className="text-xl font-bold text-brand-black mb-3">Clarity Over Hype</h3>
              <p className="text-brand-gray">
                No ChatGPT tutorials or generic AI theory. Only real construction workflows and practical automation examples.
              </p>
            </div>
            <div className="bg-brand-light-gray p-8 rounded-xl">
              <Target className="w-12 h-12 text-brand-red mb-4" />
              <h3 className="text-xl font-bold text-brand-black mb-3">Construction-Specific</h3>
              <p className="text-brand-gray">
                Every example is from builders, renovators, and trade contractors. Real bottlenecks, real solutions.
              </p>
            </div>
            <div className="bg-brand-light-gray p-8 rounded-xl">
              <TrendingUp className="w-12 h-12 text-brand-red mb-4" />
              <h3 className="text-xl font-bold text-brand-black mb-3">From Concept to Action</h3>
              <p className="text-brand-gray">
                Learn what is possible, identify your opportunities, then get a clear path to implementation.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <AngleDivider direction="up-right" fromColor="#FFFFFF" toColor="#F5F5F5" height={60} />

      <motion.section
        id="offerings"
        className="bg-brand-light-gray py-16 md:py-24 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={staggerItem} className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black mb-4">
              Education Options
            </h2>
            <p className="text-lg md:text-xl text-brand-gray max-w-2xl mx-auto">
              Start with the free webinar, then go deeper based on your needs.
            </p>
          </motion.div>

          <motion.div variants={staggerItem} className="space-y-8">
            {educationOffers.map((offer, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-red/10 text-brand-red rounded-xl">
                          <offer.icon className="w-7 h-7" />
                        </div>
                        <div className="inline-flex items-center gap-2 bg-brand-red text-white px-3 py-1 rounded-full text-xs font-bold">
                          {offer.badge}
                        </div>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-brand-black mb-2">{offer.title}</h3>
                      <p className="text-lg text-brand-gray mb-4">{offer.subtitle}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 text-brand-gray">
                          <Clock className="w-4 h-4 text-brand-red" />
                          {offer.duration}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsContactModalOpen(true)}
                      className="bg-brand-cta-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 shadow-lg whitespace-nowrap"
                    >
                      {offer.cta}
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-brand-black mb-3">Who it is for:</h4>
                      <p className="text-brand-gray mb-6">{offer.whoFor}</p>

                      <h4 className="font-bold text-brand-black mb-3">What you get:</h4>
                      <ul className="space-y-2">
                        {offer.whatYouGet.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                            <span className="text-brand-gray text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      {offer.outputs && (
                        <>
                          <h4 className="font-bold text-brand-black mb-3">Tangible outputs:</h4>
                          <ul className="space-y-2 mb-6">
                            {offer.outputs.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                                <span className="text-brand-gray text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}

                      <h4 className="font-bold text-brand-black mb-3">What this is NOT:</h4>
                      <ul className="space-y-2">
                        {offer.whatItIsNot.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-brand-gray text-sm">• {item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <AngleDivider direction="down-left" fromColor="#F5F5F5" toColor="#FFFFFF" height={60} />

      <motion.section
        className="bg-white py-16 md:py-24 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={staggerItem} className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black mb-4">
              The Learning Path
            </h2>
            <p className="text-lg md:text-xl text-brand-gray max-w-2xl mx-auto">
              From concept to implementation in four clear steps.
            </p>
          </motion.div>

          <motion.div variants={staggerItem} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningPath.map((item, index) => (
              <div key={index} className="bg-brand-light-gray p-6 rounded-xl relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-brand-red text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {item.step}
                </div>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-lg mb-4 mt-2">
                  <item.icon className="w-6 h-6 text-brand-red" />
                </div>
                <h3 className="text-xl font-bold text-brand-black mb-3">{item.title}</h3>
                <p className="text-brand-gray">{item.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <AngleDivider direction="up-right" fromColor="#FFFFFF" toColor="#F5F5F5" height={60} />

      <motion.section
        className="bg-brand-light-gray py-16 md:py-24 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={staggerItem} className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-black mb-6">
                Real Experience, Not Theory
              </h2>
              <p className="text-lg text-brand-gray mb-6">
                Our team has spent the last year immersing ourselves in everything AI - what issues can actually be solved and where real value can be provided to construction companies.
              </p>
              <p className="text-lg text-brand-gray mb-8">
                This is not just showing you a new product or software. This is walkthroughs of real capabilities with real construction examples.
              </p>
              <ul className="space-y-4">
                {[
                  'Construction-specific automation examples',
                  'Real ROI calculations from actual projects',
                  'Practical implementation roadmaps',
                  'No vendor lock-in or software sales pitch',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-brand-red flex-shrink-0 mt-1" />
                    <span className="text-lg text-brand-gray">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <Award className="w-16 h-16 text-brand-red mb-6" />
              <h3 className="text-2xl font-bold text-brand-black mb-4">From Unsure to Clear</h3>
              <p className="text-brand-gray mb-6">
                You understand that not implementing AI now means you will be left behind. But you are unsure about what is actually possible and where to start.
              </p>
              <p className="text-brand-gray">
                These education programs give you the clarity and confidence to move forward with automation in your construction business.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <AngleDivider direction="down-left" fromColor="#F5F5F5" toColor="#FFFFFF" height={60} />

      <motion.section
        className="bg-white py-16 md:py-24 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div variants={staggerItem} className="bg-brand-cta-orange text-white p-8 md:p-12 rounded-2xl text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Understand What is Possible?
            </h3>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Start with the free webinar to see real automation examples from construction businesses.
            </p>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="bg-white text-brand-red px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-light-gray transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Register for Next Webinar
            </button>
          </motion.div>
        </div>
      </motion.section>

      <AngleDivider direction="up-right" fromColor="#FFFFFF" toColor="#F5F5F5" height={60} />

      <motion.section
        className="bg-brand-light-gray py-16 md:py-24 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div variants={staggerItem} className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg md:text-xl text-brand-gray">
              Common questions about our AI automation education programs.
            </p>
          </motion.div>
          <motion.div variants={staggerItem}>
            <SimpleFAQ items={faqItems} />
          </motion.div>
        </div>
      </motion.section>

      <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} title="Register for Education">
        <ContactForm
          onSuccess={() => {
            setIsContactModalOpen(false);
            setShowThankYou(true);
          }}
        />
      </Modal>

      <ThankYouModal isOpen={showThankYou} onClose={() => setShowThankYou(false)} />
    </>
  );
}
