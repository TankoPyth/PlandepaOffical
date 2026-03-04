import { useState } from 'react';
import { ArrowLeft, Check, GraduationCap, Users, Video, FileText, Zap, Award, BookOpen, Target, Laptop, ClipboardCheck, TrendingUp, Calendar } from 'lucide-react';
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

  const trainingTracks = [
    {
      icon: Laptop,
      title: 'Buildxact Mastery',
      description: 'Complete estimating and project management training for Buildxact users.',
      duration: '2-3 days',
      topics: ['Estimating setup', 'Cost libraries', 'Scheduling', 'Variations', 'Reporting'],
    },
    {
      icon: Target,
      title: 'ClickUp for Construction',
      description: 'Project management and team coordination customized for construction workflows.',
      duration: '1-2 days',
      topics: ['Project setup', 'Task automation', 'Team collaboration', 'Client portals', 'Reporting'],
    },
    {
      icon: BookOpen,
      title: 'Process & Systems',
      description: 'Business process optimization and workflow design for construction companies.',
      duration: '2-4 days',
      topics: ['Process mapping', 'Bottleneck identification', 'Automation opportunities', 'Change management'],
    },
    {
      icon: ClipboardCheck,
      title: 'Estimating Excellence',
      description: 'Advanced estimating techniques, cost control, and margin protection.',
      duration: '1-2 days',
      topics: ['Accurate takeoffs', 'Cost databases', 'Margin analysis', 'Competitive bidding', 'Risk assessment'],
    },
    {
      icon: Users,
      title: 'Team Onboarding',
      description: 'Get your whole team up to speed on new systems and processes quickly.',
      duration: 'Flexible',
      topics: ['System basics', 'Daily workflows', 'Best practices', 'Troubleshooting', 'Ongoing support'],
    },
    {
      icon: Zap,
      title: 'Custom Training',
      description: 'Bespoke training programs designed for your specific tools and workflows.',
      duration: 'Custom',
      topics: ['Your tools', 'Your processes', 'Your team', 'Your pace'],
    },
  ];

  const deliveryMethods = [
    {
      icon: Users,
      title: 'On-Site Training',
      description: 'We come to your office or site for hands-on, personalized training with your team.',
      benefits: ['Face-to-face interaction', 'Use your actual data', 'Immediate questions answered', 'Team building'],
    },
    {
      icon: Video,
      title: 'Remote Sessions',
      description: 'Live online training sessions via Zoom or Teams, perfect for distributed teams.',
      benefits: ['Lower cost', 'Flexible scheduling', 'Record sessions', 'Multi-location teams'],
    },
    {
      icon: BookOpen,
      title: 'Self-Paced Learning',
      description: 'Access our library of video tutorials, guides, and exercises at your own pace.',
      benefits: ['Learn anytime', 'Rewatch as needed', 'Lower investment', 'Lifetime access'],
    },
  ];

  const faqItems = [
    {
      question: 'How do you customize training for our business?',
      answer: 'We start with a discovery session to understand your current setup, pain points, and goals. Then we build training around your actual workflows and data, not generic examples.',
    },
    {
      question: 'What if our team has mixed skill levels?',
      answer: 'We can split into beginner and advanced sessions, or run foundation training for everyone then targeted deep-dives. We adapt to your team\'s needs.',
    },
    {
      question: 'Do you provide training materials?',
      answer: 'Yes. You get step-by-step guides, video recordings, quick reference sheets, and access to our resource library. Everything your team needs to stay confident.',
    },
    {
      question: 'Can we do training in stages?',
      answer: 'Absolutely. Many clients start with core functionality, then do advanced training later. We can space it out to avoid overwhelming your team.',
    },
    {
      question: 'What ongoing support do you provide after training?',
      answer: 'We offer 30-day email support included with all training. After that, you can purchase ongoing support packages or book ad-hoc sessions as needed.',
    },
    {
      question: 'Do you offer certification?',
      answer: 'For our core training programs (Buildxact, Process & Systems), participants receive a certificate of completion. Great for professional development records.',
    },
  ];

  const trainingBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://plandepa.com/' },
    { name: 'Training & Education', url: 'https://plandepa.com/training' },
  ]);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Construction Business Training & Education',
    provider: {
      '@type': 'Organization',
      name: 'Plandepa',
    },
    areaServed: ['Brisbane', 'Sydney', 'Newcastle', 'Australia'],
    description: 'Professional training for construction software and business processes. Buildxact training, ClickUp for construction, estimating excellence, and custom team training programs.',
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
        title="Construction Training & Education Brisbane | Buildxact, ClickUp, Process Training"
        description="Professional construction business training in Brisbane, Sydney & Newcastle. Buildxact mastery, ClickUp for construction, estimating excellence, and custom team training programs."
        keywords="Buildxact training Brisbane, construction software training, ClickUp training construction, estimating training, construction business training Sydney, team training Brisbane"
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
              <GraduationCap className="w-4 h-4" />
              Professional Training Programs
            </motion.div>

            <motion.h1 variants={staggerItem} className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-black mb-6">
              Training & Education
            </motion.h1>
            <motion.p variants={staggerItem} className="text-xl md:text-2xl text-brand-gray max-w-3xl mx-auto mb-8">
              Get your team confident and competent with the software and systems that run your business.
            </motion.p>

            <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="bg-brand-red text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-red/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Discuss Training Needs
              </button>
              <a
                href="#training-tracks"
                className="bg-white text-brand-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-light-gray transition-all duration-300 shadow-md border-2 border-brand-black"
              >
                See Training Options
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
              Why Proper Training Matters
            </h2>
            <p className="text-lg md:text-xl text-brand-gray max-w-2xl mx-auto">
              Software is useless if your team doesn't know how to use it properly.
            </p>
          </motion.div>

          <motion.div variants={staggerItem} className="grid md:grid-cols-3 gap-8">
            <div className="bg-brand-light-gray p-8 rounded-xl">
              <Award className="w-12 h-12 text-brand-red mb-4" />
              <h3 className="text-xl font-bold text-brand-black mb-3">Stop Wasting Money</h3>
              <p className="text-brand-gray">
                You paid for software licenses. Make sure your team actually knows how to use them effectively.
              </p>
            </div>
            <div className="bg-brand-light-gray p-8 rounded-xl">
              <TrendingUp className="w-12 h-12 text-brand-red mb-4" />
              <h3 className="text-xl font-bold text-brand-black mb-3">Increase Adoption</h3>
              <p className="text-brand-gray">
                Confident teams use new systems properly. Confused teams go back to spreadsheets and email.
              </p>
            </div>
            <div className="bg-brand-light-gray p-8 rounded-xl">
              <Zap className="w-12 h-12 text-brand-red mb-4" />
              <h3 className="text-xl font-bold text-brand-black mb-3">Faster Results</h3>
              <p className="text-brand-gray">
                Proper training means your team hits the ground running instead of fumbling for months.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <AngleDivider direction="up-right" fromColor="#FFFFFF" toColor="#F5F5F5" height={60} />

      <motion.section
        id="training-tracks"
        className="bg-brand-light-gray py-16 md:py-24 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={staggerItem} className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black mb-4">
              Training Programs
            </h2>
            <p className="text-lg md:text-xl text-brand-gray max-w-2xl mx-auto">
              Choose from our proven training tracks or create a custom program.
            </p>
          </motion.div>

          <motion.div variants={staggerItem} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingTracks.map((track, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-red/10 text-brand-red rounded-lg mb-4">
                  <track.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-brand-black mb-2">{track.title}</h3>
                <p className="text-brand-gray mb-4">{track.description}</p>
                <div className="flex items-center gap-2 text-sm text-brand-red font-semibold mb-4">
                  <Calendar className="w-4 h-4" />
                  {track.duration}
                </div>
                <div className="border-t border-brand-light-gray pt-4">
                  <div className="text-sm font-semibold text-brand-black mb-2">Topics Covered:</div>
                  <ul className="space-y-1">
                    {track.topics.map((topic, idx) => (
                      <li key={idx} className="text-sm text-brand-gray flex items-start gap-2">
                        <Check className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                        {topic}
                      </li>
                    ))}
                  </ul>
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
              How We Deliver Training
            </h2>
            <p className="text-lg md:text-xl text-brand-gray max-w-2xl mx-auto">
              Choose the delivery method that works best for your team.
            </p>
          </motion.div>

          <motion.div variants={staggerItem} className="grid md:grid-cols-3 gap-8">
            {deliveryMethods.map((method, index) => (
              <div key={index} className="bg-brand-light-gray p-8 rounded-xl">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-red text-white rounded-full mb-6">
                  <method.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-brand-black mb-3">{method.title}</h3>
                <p className="text-brand-gray mb-6">{method.description}</p>
                <div className="space-y-2">
                  {method.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                      <span className="text-brand-gray">{benefit}</span>
                    </div>
                  ))}
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
        <div className="max-w-4xl mx-auto">
          <motion.div variants={staggerItem} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black mb-4">
              What's Included
            </h2>
          </motion.div>

          <motion.div variants={staggerItem} className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Pre-training needs assessment',
                'Customized training materials',
                'Hands-on practical exercises',
                'Video recordings of sessions',
                'Step-by-step documentation',
                'Quick reference guides',
                'Certificate of completion',
                '30-day post-training email support',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-brand-red flex-shrink-0 mt-1" />
                  <span className="text-lg text-brand-gray">{item}</span>
                </div>
              ))}
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
              Ready to Upskill Your Team?
            </h3>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Let's discuss your training needs and build a program that works for your team.
            </p>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="bg-white text-brand-red px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-light-gray transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Book a Training Consultation
            </button>
          </motion.div>
        </div>
      </motion.section>

      <AngleDivider direction="up-right" fromColor="#FFFFFF" toColor="#F5F5F5" height={60} />

      <SimpleFAQ items={faqItems} />

      <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} title="Discuss Training Needs">
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
