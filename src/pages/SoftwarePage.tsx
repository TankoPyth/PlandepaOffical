import { useState } from 'react';
import { ArrowLeft, Settings, Zap, Network, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { AngleDivider } from '../components/ui/AngleDivider';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { StructuredData, breadcrumbSchema } from '../components/StructuredData';
import { Modal } from '../components/ui/Modal';
import { ContactForm } from '../components/ContactForm';
import { ThankYouModal } from '../components/ThankYouModal';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';

const serviceCategories = [
  {
    title: 'Software & Tools',
    icon: Settings,
    description: 'Expert implementation and optimization of construction-specific software platforms',
    services: [
      {
        name: 'Buildxact',
        description: 'Complete construction management and estimating software. Get jobs costed faster and track everything in one place.',
        benefits: ['Faster quoting', 'Job tracking', 'Material ordering']
      },
      {
        name: 'ClickUp',
        description: 'All-in-one productivity and project management. Keep your team on track with tasks, timelines, and communication.',
        benefits: ['Task management', 'Team collaboration', 'Progress tracking']
      },
      {
        name: 'Notion',
        description: 'Connected workspace for documentation and collaboration. Build your knowledge base and SOPs.',
        benefits: ['Documentation', 'Templates', 'Team wikis']
      },
      {
        name: 'Xero',
        description: 'Cloud accounting made simple. Track expenses, send invoices, and stay on top of your cash flow.',
        benefits: ['Online invoicing', 'Bank feeds', 'Financial reports']
      },
      {
        name: 'Deputy',
        description: 'Staff scheduling and time tracking that actually works. Manage your crew without the headaches.',
        benefits: ['Staff rostering', 'Timesheets', 'Leave management']
      }
    ]
  },
  {
    title: 'AI & Automation',
    icon: Zap,
    description: 'Intelligent automation to eliminate repetitive tasks and save hours every week',
    services: [
      {
        name: 'N8N Workflows',
        description: 'Custom automation workflows tailored to your business. Connect your tools and let them work together automatically.',
        benefits: ['Custom workflows', 'Data sync', 'Automated tasks']
      },
      {
        name: 'Zapier Integration',
        description: 'Connect all your apps without code. When something happens in one app, trigger actions in another.',
        benefits: ['App connections', 'No coding needed', '5000+ integrations']
      },
      {
        name: 'Voice Agents',
        description: 'AI-powered phone assistants that handle calls, book jobs, and answer questions 24/7.',
        benefits: ['24/7 availability', 'Call handling', 'Lead capture']
      },
      {
        name: 'Smart Document Processing',
        description: 'Automatically process quotes, invoices, and contracts. Extract data and file everything correctly.',
        benefits: ['Auto data extraction', 'Smart filing', 'Reduce errors']
      },
      {
        name: 'AI Strategy Consulting',
        description: 'Not sure where to start? We help you identify the best opportunities for AI in your business.',
        benefits: ['Strategy planning', 'ROI analysis', 'Implementation roadmap']
      }
    ]
  },
  {
    title: 'Business Systems',
    icon: Network,
    description: 'Complete systems to streamline operations from quote to payment',
    services: [
      {
        name: 'Quoting & Estimating',
        description: 'Fast, accurate quotes that win more jobs. Templates, pricing databases, and automated follow-ups.',
        benefits: ['Quick quotes', 'Accurate pricing', 'Professional proposals']
      },
      {
        name: 'Invoice Management',
        description: 'Send invoices faster, track payments better, and get paid sooner. Automated reminders included.',
        benefits: ['Auto invoicing', 'Payment tracking', 'Reminder emails']
      },
      {
        name: 'Project Tracking',
        description: 'Know exactly where every job stands. Track progress, costs, and timelines in real-time.',
        benefits: ['Live updates', 'Budget tracking', 'Timeline visibility']
      },
      {
        name: 'Team Communication',
        description: 'Keep everyone on the same page. Site updates, photo sharing, and instant messaging.',
        benefits: ['Team chat', 'Photo sharing', 'Job updates']
      },
      {
        name: 'Document Management',
        description: 'All your plans, contracts, and documents organized and accessible anywhere, anytime.',
        benefits: ['Cloud storage', 'Easy search', 'Version control']
      }
    ]
  },
  {
    title: 'Growth & Support',
    icon: TrendingUp,
    description: 'Generate more leads, build your online presence, and get ongoing support',
    services: [
      {
        name: 'Lead Generation',
        description: 'Attract quality leads with targeted campaigns. We help you find homeowners ready to build or renovate.',
        benefits: ['Targeted ads', 'Landing pages', 'Lead nurturing']
      },
      {
        name: 'Website Development',
        description: 'Professional websites that showcase your work and convert visitors into leads.',
        benefits: ['Modern design', 'Mobile friendly', 'Lead forms']
      },
      {
        name: 'Free AI Audit',
        description: 'Get a detailed report on where AI and automation can save you time and money. No strings attached.',
        benefits: ['Free assessment', 'Honest advice', 'Custom recommendations']
      },
      {
        name: 'ROI Calculator',
        description: 'See exactly how much time and money you could save by automating your business.',
        benefits: ['Calculate savings', 'Time analysis', 'Cost breakdown']
      },
      {
        name: 'Training & Support',
        description: 'We train your team properly and stick around to help. As you grow, we grow with you.',
        benefits: ['Team training', 'Ongoing support', 'System updates']
      }
    ]
  }
];

export function SoftwarePage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const softwareBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://plandepa.com/' },
    { name: 'Services', url: 'https://plandepa.com/software' },
  ]);

  return (
    <>
      <SEO
        title="Construction Software Services Brisbane Sydney | Buildxact Partner"
        description="Expert construction software implementation in Brisbane & Sydney. Official Buildxact partner. Setup, training & optimization for ClickUp, Notion, Xero, Deputy. AI automation for Australian builders."
        keywords="Buildxact partner Brisbane, construction software implementation Sydney, Buildxact setup Brisbane, construction AI automation Australia, ClickUp construction setup, construction software consultant Brisbane, builder software integration Sydney"
      />
      <StructuredData data={[softwareBreadcrumb]} />

      <motion.section
        className="bg-brand-off-white py-12 md:py-16 px-6"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={staggerItem}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm md:text-base text-brand-gray hover:text-brand-black mb-8 md:mb-12 group transition-colors"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
              Back to home
            </Link>
          </motion.div>

          <motion.h1 variants={staggerItem} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-black mb-4 md:mb-6">
            Everything We Do For Construction Companies
          </motion.h1>
          <motion.p variants={staggerItem} className="text-base md:text-lg text-brand-gray max-w-3xl mb-8 md:mb-12 leading-relaxed">
            From software setup to AI automation, lead generation to ongoing support - we handle all the tech stuff so you can focus on building. Here's the complete picture of what we can help you with.
          </motion.p>
        </div>
      </motion.section>

      <AngleDivider direction="down-right" fromColor="#FAFAFA" toColor="#FFFFFF" height={80} />

      <motion.section
        className="bg-white py-16 md:py-24 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto space-y-24">
          {serviceCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <motion.div key={category.title} className="space-y-8" variants={staggerItem}>
                <div className="flex items-start gap-4">
                  <motion.div
                    className="flex-shrink-0 w-16 h-16 bg-brand-red/10 rounded-2xl flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <IconComponent className="w-8 h-8 text-brand-red" />
                  </motion.div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-3">
                      {category.title}
                    </h2>
                    <p className="text-lg text-brand-gray max-w-3xl">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {category.services.map((service) => (
                    <motion.div
                      key={service.name}
                      className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-brand-red transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
                      whileHover={{ y: -5 }}
                      variants={fadeInUp}
                    >
                      <h3 className="text-xl font-bold text-brand-black mb-3 group-hover:text-brand-red transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-sm text-brand-gray leading-relaxed mb-4">
                        {service.description}
                      </p>
                      <div className="space-y-2">
                        {service.benefits.map((benefit) => (
                          <div key={benefit} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-brand-red flex-shrink-0" />
                            <span className="text-sm text-brand-black">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {categoryIndex < serviceCategories.length - 1 && (
                  <AngleDivider direction="up-left" fromColor="#FFFFFF" toColor="#F5F5F5" height={60} />
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      <AngleDivider direction="down-right" fromColor="#FFFFFF" toColor="#F5F5F5" height={80} />

      <motion.section
        className="bg-brand-light-gray py-16 md:py-24 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center bg-white rounded-2xl p-12 shadow-lg" variants={fadeInUp}>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-4">
              Not Sure Where To Start?
            </h2>
            <p className="text-base md:text-lg text-brand-gray mb-8 max-w-2xl mx-auto">
              Book a free audit and we'll walk you through exactly what would help your business most. No pressure, no sales pitch - just honest advice from tradies who get it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => setIsContactModalOpen(true)}
                className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-brand-cta-orange text-white font-bold text-base rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Free Audit
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <Link
                to="/roi-calculator"
                className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-brand-black text-white font-bold text-base rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
              >
                Calculate Your ROI
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} title="Book Free Audit">
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
