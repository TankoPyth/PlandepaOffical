import { useState } from 'react';
import { ArrowLeft, Check, Shield, Clock, Zap, Headphones as HeadphonesIcon, TrendingUp, Wrench, Bell, Lock, RefreshCw, Users, Target, Award } from 'lucide-react';
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

export function OngoingSupportPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const supportTiers = [
    {
      name: 'Essential',
      price: 'From $500/month',
      description: 'Perfect for businesses that need occasional help and maintenance.',
      features: [
        'Email support (2 business day response)',
        'Monthly system health check',
        'Software updates and maintenance',
        'Up to 3 hours of support per month',
        'Access to knowledge base',
        'Quarterly strategy call',
      ],
      ideal: 'Small teams with stable systems',
    },
    {
      name: 'Professional',
      price: 'From $1,200/month',
      description: 'For growing businesses that need regular optimization and support.',
      features: [
        'Priority email support (4 hour response)',
        'Phone support during business hours',
        'Bi-weekly system optimization',
        'Up to 8 hours of support per month',
        'Proactive monitoring and alerts',
        'Monthly strategy call',
        'Training session credits',
        'New feature implementation',
      ],
      ideal: 'Medium teams actively improving systems',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom pricing',
      description: 'Comprehensive support for businesses with complex needs.',
      features: [
        'Dedicated account manager',
        'Priority phone support (1 hour response)',
        'After-hours emergency support',
        'Weekly optimization and planning',
        'Unlimited support hours',
        'Continuous system monitoring',
        'Monthly on-site visits (Brisbane/Sydney)',
        'Strategic planning sessions',
        'Custom automation development',
        'Team training programs',
      ],
      ideal: 'Large teams or multi-site operations',
    },
  ];

  const supportServices = [
    {
      icon: Wrench,
      title: 'System Maintenance',
      description: 'Regular updates, optimization, and preventive maintenance to keep everything running smoothly.',
    },
    {
      icon: Bell,
      title: 'Proactive Monitoring',
      description: 'We watch your systems and catch issues before they become problems.',
    },
    {
      icon: Zap,
      title: 'Workflow Optimization',
      description: 'Continuous improvements to make your processes faster and more efficient.',
    },
    {
      icon: HeadphonesIcon,
      title: 'Technical Support',
      description: 'Fast, knowledgeable help when you or your team hit a roadblock.',
    },
    {
      icon: TrendingUp,
      title: 'Performance Reporting',
      description: 'Monthly reports showing what\'s working, what\'s not, and where we can improve.',
    },
    {
      icon: Target,
      title: 'Strategic Planning',
      description: 'Regular sessions to align your technology with your business goals.',
    },
  ];

  const faqItems = [
    {
      question: 'Can we change support tiers as our needs change?',
      answer: 'Yes. You can upgrade or downgrade at any time. We just need 30 days notice for downgrades. Most clients start with Essential and move up as they see the value.',
    },
    {
      question: 'What happens if we exceed our monthly hours?',
      answer: 'We\'ll let you know if you\'re approaching your limit. You can either purchase additional hours at your tier rate, or we can suggest upgrading to the next tier if it makes financial sense.',
    },
    {
      question: 'Is there a minimum commitment?',
      answer: 'Month-to-month for Essential and Professional tiers. We recommend at least 3 months to see real value, but you\'re not locked in. Enterprise tier is typically 12-month agreements.',
    },
    {
      question: 'What counts as "support hours"?',
      answer: 'Troubleshooting, system changes, training, new feature setup, optimization work. Monthly health checks and proactive monitoring don\'t count against your hours.',
    },
    {
      question: 'Do you support software you didn\'t originally set up?',
      answer: 'Absolutely. We\'ll do a discovery session to understand your current setup, then we can support and improve it. Many clients come to us with existing systems that need expert help.',
    },
    {
      question: 'What\'s your response time for urgent issues?',
      answer: 'Professional tier gets 4-hour response for urgent issues during business hours. Enterprise tier gets 1-hour response plus after-hours emergency support. Essential tier is 2 business days.',
    },
    {
      question: 'Can we pause support if we don\'t need it for a while?',
      answer: 'Not for ongoing retainers - you\'re paying for availability and proactive monitoring, not just reactive support. But you can cancel with 30 days notice and re-engage when needed.',
    },
  ];

  const supportBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://plandepa.com/' },
    { name: 'Ongoing Support', url: 'https://plandepa.com/ongoing-support' },
  ]);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Ongoing Construction Business Systems Support',
    provider: {
      '@type': 'Organization',
      name: 'Plandepa',
    },
    areaServed: ['Brisbane', 'Sydney', 'Newcastle', 'Australia'],
    description: 'Monthly retainer support for construction business systems. Proactive monitoring, maintenance, optimization, and technical support for Buildxact, ClickUp, and custom automation systems.',
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
        title="Ongoing Support & Retainer - Construction Systems Maintenance | Plandepa"
        description="Monthly retainer support for construction business systems in Brisbane, Sydney & Newcastle. Proactive monitoring, maintenance, optimization, and priority technical support."
        keywords="construction systems support, Buildxact support Brisbane, ongoing IT support construction, systems maintenance retainer, construction technology support Sydney"
      />
      <StructuredData data={[supportBreadcrumb, serviceSchema, faqSchema]} />

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
              <Shield className="w-4 h-4" />
              Ongoing Support & Retainer
            </motion.div>

            <motion.h1 variants={staggerItem} className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-black mb-6">
              Ongoing Support & Maintenance
            </motion.h1>
            <motion.p variants={staggerItem} className="text-xl md:text-2xl text-brand-gray max-w-3xl mx-auto mb-8">
              Keep your systems running smoothly with proactive monitoring, regular optimization, and priority support.
            </motion.p>

            <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="bg-brand-red text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-red/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Discuss Support Needs
              </button>
              <a
                href="#tiers"
                className="bg-white text-brand-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-light-gray transition-all duration-300 shadow-md border-2 border-brand-black"
              >
                See Support Tiers
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
              Why Ongoing Support Matters
            </h2>
            <p className="text-lg md:text-xl text-brand-gray max-w-2xl mx-auto">
              Systems don't maintain themselves. Without proper care, they degrade over time.
            </p>
          </motion.div>

          <motion.div variants={staggerItem} className="grid md:grid-cols-3 gap-8">
            <div className="bg-brand-light-gray p-8 rounded-xl">
              <Shield className="w-12 h-12 text-brand-red mb-4" />
              <h3 className="text-xl font-bold text-brand-black mb-3">Prevent Problems</h3>
              <p className="text-brand-gray">
                Catch issues before they disrupt your business. Proactive monitoring means fewer emergencies.
              </p>
            </div>
            <div className="bg-brand-light-gray p-8 rounded-xl">
              <TrendingUp className="w-12 h-12 text-brand-red mb-4" />
              <h3 className="text-xl font-bold text-brand-black mb-3">Continuous Improvement</h3>
              <p className="text-brand-gray">
                Regular optimization means your systems get better over time instead of slowly degrading.
              </p>
            </div>
            <div className="bg-brand-light-gray p-8 rounded-xl">
              <Clock className="w-12 h-12 text-brand-red mb-4" />
              <h3 className="text-xl font-bold text-brand-black mb-3">Save Time</h3>
              <p className="text-brand-gray">
                Fast expert help when you need it. No waiting days for support or figuring things out yourself.
              </p>
            </div>
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
          <motion.div variants={staggerItem} className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black mb-4">
              What We Support
            </h2>
          </motion.div>

          <motion.div variants={staggerItem} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportServices.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-red/10 text-brand-red rounded-lg mb-4">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-brand-black mb-3">{service.title}</h3>
                <p className="text-brand-gray">{service.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <AngleDivider direction="down-left" fromColor="#F5F5F5" toColor="#FFFFFF" height={60} />

      <motion.section
        id="tiers"
        className="bg-white py-16 md:py-24 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={staggerItem} className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black mb-4">
              Support Tiers
            </h2>
            <p className="text-lg md:text-xl text-brand-gray max-w-2xl mx-auto">
              Choose the level of support that matches your business needs.
            </p>
          </motion.div>

          <motion.div variants={staggerItem} className="grid lg:grid-cols-3 gap-8">
            {supportTiers.map((tier, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
                  tier.popular ? 'ring-2 ring-brand-red' : ''
                }`}
              >
                {tier.popular && (
                  <div className="bg-brand-red text-white text-center py-2 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-brand-black mb-2">{tier.name}</h3>
                  <div className="text-3xl font-bold text-brand-red mb-3">{tier.price}</div>
                  <p className="text-brand-gray mb-6">{tier.description}</p>

                  <div className="mb-6">
                    <div className="text-sm font-semibold text-brand-black mb-3">Includes:</div>
                    <ul className="space-y-3">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                          <span className="text-brand-gray text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-brand-light-gray p-4 rounded-lg mb-6">
                    <div className="text-xs font-semibold text-brand-black mb-1">Ideal For:</div>
                    <div className="text-sm text-brand-gray">{tier.ideal}</div>
                  </div>

                  <button
                    onClick={() => setIsContactModalOpen(true)}
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                      tier.popular
                        ? 'bg-brand-red text-white hover:bg-brand-red/90'
                        : 'bg-brand-light-gray text-brand-black hover:bg-brand-gray/20'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
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
                Month-to-Month Flexibility
              </h2>
              <p className="text-lg text-brand-gray mb-6">
                We don't believe in locking clients into long contracts. If we're not providing value, you can leave. Simple as that.
              </p>
              <ul className="space-y-4">
                {[
                  'No setup fees or onboarding costs',
                  'Cancel with 30 days notice',
                  'Upgrade or downgrade anytime',
                  'No penalties for changes',
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
              <h3 className="text-2xl font-bold text-brand-black mb-4">Our Guarantee</h3>
              <p className="text-brand-gray mb-6">
                If we're not making your life easier and your business more efficient, we're not doing our job.
              </p>
              <p className="text-brand-gray">
                Our retention rate speaks for itself: 95% of clients stay with us year over year because we actually deliver value.
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
          <motion.div variants={staggerItem} className="bg-brand-red text-white p-8 md:p-12 rounded-2xl text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready for Reliable Support?
            </h3>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Let's discuss your needs and find the right support tier for your business.
            </p>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="bg-white text-brand-red px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-light-gray transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Book a Support Consultation
            </button>
          </motion.div>
        </div>
      </motion.section>

      <AngleDivider direction="up-right" fromColor="#FFFFFF" toColor="#F5F5F5" height={60} />

      <SimpleFAQ items={faqItems} />

      <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} title="Discuss Support Needs">
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
