import { useState } from 'react';
import { ArrowLeft, Check, Award, Users, Target, FileText, DollarSign, Clock, Shield, Rocket, Settings, BarChart, ExternalLink, Library, Wrench, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SimpleFAQ } from '../components/SimpleFAQ';
import { Modal } from '../components/ui/Modal';
import { ContactForm } from '../components/ContactForm';
import { ThankYouModal } from '../components/ThankYouModal';
import { staggerContainer, staggerItem } from '../utils/animations';
import { BUILDXACT_FAQS } from '../content/faqs';

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
      name: 'Template Library Access',
      description: 'Pre-built templates for existing Buildxact subscribers',
      price: '$150/month',
      icon: Library,
      features: [
        'Access to comprehensive library of pre-built templates',
        'Industry-specific templates: carpentry, plumbing, renovations',
        'Specialized templates: bathrooms, kitchens, extensions',
        'Regularly updated and maintained by PlanDepa team',
        'New templates added monthly based on industry trends',
        'Templates refined from real-world construction projects',
        'Download and customize for your specific needs',
      ],
      note: 'Requires active Buildxact subscription (sign up above for 5% discount)',
    },
    {
      name: 'Complete Implementation',
      description: 'Full setup and training to get you running confidently',
      price: 'From $3,500',
      icon: Wrench,
      features: [
        'Complete Buildxact system setup and configuration',
        'Initial business process assessment and optimization',
        'Software implementation tailored to your trade',
        'Comprehensive team training program',
        'Access to exclusive support video library',
        'Direct support line to PlanDepa implementation team',
        'Ensure system is properly running and optimized',
        '30-day post-launch support included',
      ],
      note: 'One-time implementation fee',
      popular: true,
    },
    {
      name: 'Premium Custom Package',
      description: 'Complete business transformation with custom templates and ongoing support',
      price: '$5,000 to $25,000',
      icon: Sparkles,
      features: [
        'Everything included in Complete Implementation',
        'Fully custom templates built for your business workflows',
        'Custom job scheduling and project management setup',
        'One-on-one personalized training sessions for key team members',
        'Ongoing monthly support retainer included in package',
        'Regular business process optimization walkthroughs',
        'Streamline entire business operations using Buildxact',
        'Priority direct access to senior PlanDepa consultants',
        'Quarterly strategy and optimization reviews',
        'Advanced automation and integration setup',
      ],
      note: 'Total package price varies based on business size, complexity, and customization requirements',
    },
  ];

  const faqItems = BUILDXACT_FAQS;

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
              <Award className="w-4 h-4" />
              Official Buildxact Partner
            </motion.div>

            <motion.h1 variants={staggerItem} className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-black mb-6">
              Buildxact Implementation & Support
            </motion.h1>
            <motion.p variants={staggerItem} className="text-xl md:text-2xl text-brand-gray max-w-3xl mx-auto mb-8">
              Get the leading Australian estimating and project management software, properly set up for your business.
            </motion.p>

            <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="bg-brand-red text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-red/90 transition-all duration-300 shadow-lg"
              >
                Get Started with Buildxact
              </button>
              <a
                href="#referral"
                className="bg-white text-brand-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-light-gray transition-all duration-300 shadow-md border-2 border-brand-black"
              >
                See Packages & Pricing
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
              Why Buildxact?
            </h2>
            <p className="text-lg md:text-xl text-brand-gray max-w-2xl">
              Purpose-built for Australian builders and renovators. More than just estimating software.
            </p>
          </motion.div>

          <motion.div variants={staggerItem} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buildxactBenefits.map((benefit, index) => (
              <div key={index} className="bg-brand-light-gray p-6 rounded-lg">
                <h3 className="text-xl font-bold text-brand-black mb-3">{benefit.title}</h3>
                <p className="text-brand-gray">{benefit.description}</p>
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
          <motion.div variants={staggerItem} className="mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black mb-4">
              How implementation works
            </h2>
            <p className="text-lg md:text-xl text-brand-gray max-w-2xl">
              We do not just sell you software and walk away. We make sure you are set up for success.
            </p>
          </motion.div>

          <motion.div variants={staggerItem} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {implementationSteps.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-sm font-bold text-brand-red mb-2">{step.duration}</div>
                <h3 className="text-xl font-bold text-brand-black mb-3">{step.title}</h3>
                <p className="text-brand-gray">{step.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>


      <motion.section
        id="referral"
        className="bg-white py-16 md:py-24 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={staggerItem}
            className="bg-brand-red text-white p-8 md:p-12 rounded-lg relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Award className="w-4 h-4" />
                Exclusive Partner Discount
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Get 5% Off Your Buildxact Subscription
              </h2>

              <p className="text-lg md:text-xl text-white/90 mb-6 max-w-3xl">
                Sign up for Buildxact through our partnership link and receive an automatic 5% discount on your subscription. This is for signing up to the Buildxact software directly.
              </p>

              <p className="text-base text-white/80 mb-8">
                This discount is separate from PlanDepa's service packages below. First, get your Buildxact subscription with 5% off, then choose how we can help you get the most out of it.
              </p>

              <a
                href="https://app.buildxact.com/au/signup.html?resellercode=11538"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-brand-red px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-light-gray transition-all duration-300 shadow-lg"
              >
                Sign Up to Buildxact with 5% Discount
                <ExternalLink className="w-5 h-5" />
              </a>

              <p className="text-sm text-white/70 mt-6 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Secure signup through official Buildxact partner portal
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>


      <motion.section
        id="packages"
        className="bg-brand-light-gray py-16 md:py-24 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={staggerItem} className="mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black mb-4">
              How we help
            </h2>
            <p className="text-lg md:text-xl text-brand-gray max-w-2xl">
              Professional implementation and support services to maximize your Buildxact investment.
            </p>
          </motion.div>

          <motion.div variants={staggerItem} className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-lg overflow-hidden ${
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
                        <span className="text-brand-gray text-sm">{feature}</span>
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


      <motion.section
        className="bg-white py-16 md:py-24 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={staggerItem} className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-black mb-6">
                Why use a partner
              </h2>
              <p className="text-lg text-brand-gray mb-8">
                We're not just software resellers. We're construction process experts specializing in custom templates and business streamlining.
              </p>
              <ul className="space-y-4">
                {[
                  'Construction industry background: we understand your business',
                  'Local Brisbane & Newcastle presence for on-site support',
                  'Custom templates built for your specific trade or building type',
                  'Business process streamlining and workflow optimization',
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
            <div className="bg-brand-light-gray p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-brand-black mb-4">Official Partner Status</h3>
              <p className="text-brand-gray mb-6">
                We're an accredited Buildxact partner with advanced training and certification. We work directly with Buildxact to ensure our clients get the best possible experience.
              </p>
              <p className="text-brand-gray">
                Sign up through our referral link for 5% off, then let us help you maximize your investment with expert implementation and custom templates.
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
              Ready to get Buildxact working properly?
            </h3>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Book a demo to see Buildxact in action and discuss how we can customize it for your business.
            </p>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="bg-white text-brand-red px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-light-gray transition-all duration-300 shadow-lg"
            >
              Book Your Buildxact Demo
            </button>
          </motion.div>
        </div>
      </motion.section>


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
