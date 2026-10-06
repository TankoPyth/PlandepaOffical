import { useState } from 'react';
import { ArrowLeft, Check, Users, Video, Clock, Target, Brain, Zap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SimpleFAQ } from '../components/SimpleFAQ';
import { Modal } from '../components/ui/Modal';
import { ContactForm } from '../components/ContactForm';
import { ThankYouModal } from '../components/ThankYouModal';
import { staggerContainer, staggerItem } from '../utils/animations';
import { TRAINING_FAQS } from '../content/faqs';

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
      badge: 'CLARITY BLUEPRINT',
      title: 'Clarity Sprint',
      subtitle: 'The smallest Clarity Blueprint: find what is breaking and what to fix first',
      duration: '3 hours, virtual',
      whoFor: 'Construction businesses with 10 to 50 staff that want clarity on what to fix and automate first, without committing to a major project.',
      whatYouGet: [
        'A high-level Business Clarity Map of how the business runs',
        'Your Top Three Leak Register: where time and margin escape',
        'A First Workflow Decision: the one thing to fix first',
        'A 30-day priority plan and a readout call',
      ],
      outputs: [
        'A named first workflow and why it wins',
        'A simple map of that process',
        'A 30-day plan you can run yourself or with us',
        'If we implement the first workflow within 30 days, the fee is credited',
      ],
      whatItIsNot: [
        'Not generic AI training',
        'Not the full in-person Clarity Day',
        'Not implementation work',
      ],
      cta: 'Book a Clarity Sprint',
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

  const faqItems = TRAINING_FAQS;

  const learningPath = [
    {
      step: '1',
      title: 'Start with the Free Webinar',
      description: 'Understand what is possible with AI automation in construction businesses.',
      icon: Video,
    },
    {
      step: '2',
      title: 'Book a Clarity Sprint',
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

  return (
    <>

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
            className="mb-12 md:mb-16"
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

            <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="bg-brand-red text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-all duration-300 shadow-lg"
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


      <motion.section
        className="bg-white py-16 md:py-24 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={staggerItem} className="mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black mb-4">
              Why learn before you build
            </h2>
            <p className="text-lg md:text-xl text-brand-gray max-w-2xl">
              You keep hearing about AI, but you do not know what is real, what is safe, or what actually applies to construction.
            </p>
          </motion.div>

          <motion.div variants={staggerItem} className="grid md:grid-cols-3 gap-8">
            <div className="bg-brand-light-gray p-8 rounded-lg">
              <h3 className="text-xl font-bold text-brand-black mb-3">Clarity Over Hype</h3>
              <p className="text-brand-gray">
                No ChatGPT tutorials or generic AI theory. Only real construction workflows and practical automation examples.
              </p>
            </div>
            <div className="bg-brand-light-gray p-8 rounded-lg">
              <h3 className="text-xl font-bold text-brand-black mb-3">Construction-Specific</h3>
              <p className="text-brand-gray">
                Every example is from builders, renovators, and trade contractors. Real bottlenecks, real solutions.
              </p>
            </div>
            <div className="bg-brand-light-gray p-8 rounded-lg">
              <h3 className="text-xl font-bold text-brand-black mb-3">From Concept to Action</h3>
              <p className="text-brand-gray">
                Learn what is possible, identify your opportunities, then get a clear path to implementation.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>


      <motion.section
        id="offerings"
        className="bg-brand-light-gray py-16 md:py-24 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={staggerItem} className="mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black mb-4">
              Three ways to start
            </h2>
            <p className="text-lg md:text-xl text-brand-gray max-w-2xl">
              Start with the free webinar, then go deeper based on your needs.
            </p>
          </motion.div>

          <motion.div variants={staggerItem} className="space-y-8">
            {educationOffers.map((offer, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
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
                      className="bg-brand-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 shadow-lg whitespace-nowrap"
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


      <motion.section
        className="bg-white py-16 md:py-24 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={staggerItem} className="mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black mb-4">
              A sensible order
            </h2>
            <p className="text-lg md:text-xl text-brand-gray max-w-2xl">
              From concept to implementation in four clear steps.
            </p>
          </motion.div>

          <motion.div variants={staggerItem} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningPath.map((item, index) => (
              <div key={index} className="bg-brand-light-gray p-6 rounded-lg relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-brand-red text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-brand-black mb-3">{item.title}</h3>
                <p className="text-brand-gray">{item.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>


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
                Our team has spent the last year immersing ourselves in everything AI: what issues can actually be solved and where real value can be provided to construction companies.
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
            <div className="bg-white p-8 rounded-lg shadow-lg">
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


      <motion.section
        className="bg-white py-16 md:py-24 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div variants={staggerItem} className="bg-brand-red text-white p-8 md:p-12 rounded-lg text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to see what is possible?
            </h3>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Start with the free webinar to see real automation examples from construction businesses.
            </p>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="bg-white text-brand-red px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-light-gray transition-all duration-300 shadow-lg"
            >
              Register for Next Webinar
            </button>
          </motion.div>
        </div>
      </motion.section>


      <motion.section
        className="bg-brand-light-gray py-16 md:py-24 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div variants={staggerItem} className="mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black mb-4">
              Questions people ask
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
