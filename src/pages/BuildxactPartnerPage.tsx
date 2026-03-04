import { useState } from 'react';
import { ArrowLeft, Check, Award, Zap, Users, Target, TrendingUp, FileText, DollarSign, Clock, Shield, Rocket, Settings, BarChart } from 'lucide-react';
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

export function BuildxactPartnerPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const implementationSteps = [
    {
      icon: Target,
      title: 'Discovery & Setup',
      description: 'We understand your business, configure Buildxact for your specific construction type, and import your cost data.',
      duration: 'Week 1',
    },
    {
      icon: Settings,
      title: 'Customization',
      description: 'Build custom templates, set up workflows, configure integrations with your accounting and other tools.',
      duration: 'Week 2',
    },
    {
      icon: Users,
      title: 'Training',
      description: 'Comprehensive training for your team on estimating, scheduling, variations, and client communication.',
      duration: 'Week 3',
    },
    {
      icon: Rocket,
      title: 'Go-Live Support',
      description: 'Hands-on support as you start using Buildxact on real projects. We are there to help until you are confident.',
      duration: 'Week 4+',
    },
  ];

  const buildxactBenefits = [
    {
      icon: FileText,
      title: 'Professional Estimates',
      description: 'Create detailed, accurate estimates in minutes instead of days. Impress clients with professional proposals.',
    },
    {
      icon: DollarSign,
      title: 'Protect Your Margin',
      description: 'Track costs in real-time, manage variations properly, and see exactly where you are making or losing money.',
    },
    {
      icon: Clock,
      title: 'Save Time',
      description: 'Automate quoting, scheduling, and client communication. Spend less time on paperwork, more on building.',
    },
    {
      icon: BarChart,
      title: 'Better Decisions',
      description: 'Real-time dashboards show job profitability, cashflow, and pipeline. Make informed business decisions.',
    },
    {
      icon: Users,
      title: 'Client Portal',
      description: 'Clients can view progress, approve variations, and track schedules. Reduces constant status update requests.',
    },
    {
      icon: Shield,
      title: 'Compliance Ready',
      description: 'Built-in compliance tools for Australian construction including contract templates and statutory requirements.',
    },
  ];

  const packages = [
    {
      name: 'Buildxact Subscription',
      description: 'Pure software subscription through our partnership',
      price: 'From $149/month',
      features: [
        'Buildxact software license',
        'All core features included',
        'Regular software updates',
        'Buildxact support team access',
        'Australian compliance tools',
      ],
      note: 'Software only - no implementation or training',
    },
    {
      name: 'Complete Implementation',
      description: 'Software + full setup and training',
      price: 'From $3,500 + subscription',
      features: [
        'Everything in Buildxact Subscription',
        'Complete system configuration',
        'Custom templates and workflows',
        'Cost database setup',
        'Comprehensive team training',
        '4-week hands-on implementation',
        '30-day post-launch support',
      ],
      note: 'One-time implementation fee + monthly subscription',
      popular: true,
    },
    {
      name: 'Implementation + Support',
      description: 'Complete package with ongoing optimization',
      price: 'Custom pricing',
      features: [
        'Everything in Complete Implementation',
        'Ongoing monthly support retainer',
        'Continuous optimization',
        'Priority support access',
        'Regular training refreshers',
        'Advanced workflow automation',
        'Integration with other tools',
      ],
      note: 'One-time implementation + monthly subscription + support retainer',
    },
  ];

  const faqItems = [
    {
      question: 'Why buy through Plandepa instead of directly from Buildxact?',
      answer: 'You get the same pricing but with the advantage of local Brisbane/Sydney expertise. We know construction, we know Buildxact inside-out, and we can customize it specifically for your business type. Buildxact provides the software, we make sure you actually use it properly.',
    },
    {
      question: 'How long does implementation take?',
      answer: 'Typically 4-6 weeks from kickoff to confident daily use. Week 1 is setup, weeks 2-3 are customization and training, week 4+ is go-live support. We can accelerate if you need faster deployment.',
    },
    {
      question: 'Can you migrate data from our current estimating system?',
      answer: 'Usually yes. We can import cost libraries, client data, and historical projects from Excel, Cubit, EstimateOne, and most other systems. We assess what makes sense to migrate versus starting fresh.',
    },
    {
      question: 'Do we need to be tech-savvy to use Buildxact?',
      answer: 'Not at all. Buildxact is designed for tradies and builders, not IT experts. Our training focuses on practical, day-to-day use. If you can use email and a smartphone, you can use Buildxact.',
    },
    {
      question: 'What construction types does Buildxact work for?',
      answer: 'Residential building, renovations, commercial fit-outs, civil works, landscaping, trade contractors. We customize the setup for your specific type. It\'s particularly strong for residential builders and reno companies.',
    },
    {
      question: 'Can Buildxact integrate with our accounting software?',
      answer: 'Yes. Native integrations with Xero, MYOB, and QuickBooks. We set up the integration so your financials flow automatically between systems.',
    },
    {
      question: 'What if we try Buildxact and it doesn\'t work for us?',
      answer: 'Buildxact offers a trial period. We\'ll help you properly test it with real projects before you commit. In 10 years, we\'ve only had 2 clients where Buildxact wasn\'t a good fit - and we identified that during the trial.',
    },
    {
      question: 'Is training included in the implementation package?',
      answer: 'Yes. Complete Implementation includes comprehensive training for your whole team. We cover estimating, scheduling, variations, client portal, reporting - everything you need for daily use.',
    },
  ];

  const buildxactBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://plandepa.com/' },
    { name: 'Buildxact Partnership', url: 'https://plandepa.com/buildxact' },
  ]);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Buildxact Implementation and Support',
    provider: {
      '@type': 'Organization',
      name: 'Plandepa',
    },
    areaServed: ['Brisbane', 'Sydney', 'Newcastle', 'Australia'],
    description: 'Official Buildxact partner providing complete implementation, customization, training, and ongoing support for construction estimating and project management software.',
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
        title="Buildxact Partner Brisbane & Sydney - Implementation & Training | Plandepa"
        description="Official Buildxact partner in Brisbane & Sydney. Complete implementation, custom setup, team training, and ongoing support for construction estimating and project management."
        keywords="Buildxact partner Brisbane, Buildxact implementation Sydney, Buildxact training, construction estimating software, Buildxact consultant Australia, Buildxact setup Brisbane"
      />
      <StructuredData data={[buildxactBreadcrumb, serviceSchema, faqSchema]} />

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
              <Award className="w-4 h-4" />
              Official Buildxact Partner
            </motion.div>

            <motion.h1 variants={staggerItem} className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-black mb-6">
              Buildxact Implementation & Support
            </motion.h1>
            <motion.p variants={staggerItem} className="text-xl md:text-2xl text-brand-gray max-w-3xl mx-auto mb-8">
              Get the leading Australian estimating and project management software, properly set up for your business.
            </motion.p>

            <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="bg-brand-red text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-red/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Get Started with Buildxact
              </button>
              <a
                href="#packages"
                className="bg-white text-brand-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-light-gray transition-all duration-300 shadow-md border-2 border-brand-black"
              >
                See Packages & Pricing
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
              Why Buildxact?
            </h2>
            <p className="text-lg md:text-xl text-brand-gray max-w-2xl mx-auto">
              Purpose-built for Australian builders and renovators. More than just estimating software.
            </p>
          </motion.div>

          <motion.div variants={staggerItem} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buildxactBenefits.map((benefit, index) => (
              <div key={index} className="bg-brand-light-gray p-6 rounded-xl">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-red/10 text-brand-red rounded-lg mb-4">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-brand-black mb-3">{benefit.title}</h3>
                <p className="text-brand-gray">{benefit.description}</p>
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
          <motion.div variants={staggerItem} className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black mb-4">
              Our Implementation Process
            </h2>
            <p className="text-lg md:text-xl text-brand-gray max-w-2xl mx-auto">
              We do not just sell you software and walk away. We make sure you are set up for success.
            </p>
          </motion.div>

          <motion.div variants={staggerItem} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {implementationSteps.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-red text-white rounded-lg mb-4">
                  <step.icon className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold text-brand-red mb-2">{step.duration}</div>
                <h3 className="text-xl font-bold text-brand-black mb-3">{step.title}</h3>
                <p className="text-brand-gray">{step.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <AngleDivider direction="down-left" fromColor="#F5F5F5" toColor="#FFFFFF" height={60} />

      <motion.section
        id="packages"
        className="bg-white py-16 md:py-24 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={staggerItem} className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black mb-4">
              Packages & Pricing
            </h2>
            <p className="text-lg md:text-xl text-brand-gray max-w-2xl mx-auto">
              Choose the package that matches your needs and budget.
            </p>
          </motion.div>

          <motion.div variants={staggerItem} className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
                  pkg.popular ? 'ring-2 ring-brand-red' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="bg-brand-red text-white text-center py-2 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-brand-black mb-2">{pkg.name}</h3>
                  <p className="text-brand-gray mb-4">{pkg.description}</p>
                  <div className="text-3xl font-bold text-brand-red mb-6">{pkg.price}</div>

                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                        <span className="text-brand-gray">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="bg-brand-light-gray p-4 rounded-lg mb-6">
                    <p className="text-xs text-brand-gray">{pkg.note}</p>
                  </div>

                  <button
                    onClick={() => setIsContactModalOpen(true)}
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                      pkg.popular
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
                What Makes Us Different
              </h2>
              <p className="text-lg text-brand-gray mb-8">
                We're not just software resellers. We're construction process experts who happen to be Buildxact specialists.
              </p>
              <ul className="space-y-4">
                {[
                  'Construction industry background - we understand your business',
                  'Local Brisbane & Sydney presence for on-site support',
                  'Custom configuration for your specific trade or building type',
                  'Integration with your existing tools and processes',
                  'Ongoing support after implementation',
                  'Real-world practical training, not generic software tutorials',
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
              <h3 className="text-2xl font-bold text-brand-black mb-4">Official Partner Status</h3>
              <p className="text-brand-gray mb-6">
                We're an accredited Buildxact partner with advanced training and certification. We work directly with Buildxact to ensure our clients get the best possible experience.
              </p>
              <p className="text-brand-gray">
                You get the same software pricing as going direct, but with expert local implementation and support included.
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
              Ready to Transform Your Estimating?
            </h3>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Book a demo to see Buildxact in action and discuss how we can customize it for your business.
            </p>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="bg-white text-brand-red px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-light-gray transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Book Your Buildxact Demo
            </button>
          </motion.div>
        </div>
      </motion.section>

      <AngleDivider direction="up-right" fromColor="#FFFFFF" toColor="#F5F5F5" height={60} />

      <SimpleFAQ items={faqItems} />

      <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} title="Get Started with Buildxact">
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
