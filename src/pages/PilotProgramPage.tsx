import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Inbox, RotateCcw, FileText, Camera, Truck, ArrowLeftRight, Target, Zap, Shield, TrendingUp, Clock, CheckCircle2, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SimpleFAQ } from '../components/SimpleFAQ';
import { AngleDivider } from '../components/ui/AngleDivider';
import { SectionNumber } from '../components/SectionNumber';
import { SEO } from '../components/SEO';
import { StructuredData, breadcrumbSchema } from '../components/StructuredData';
import { Modal } from '../components/ui/Modal';
import { ContactForm } from '../components/ContactForm';
import { ThankYouModal } from '../components/ThankYouModal';
import { WorkflowCard } from '../components/WorkflowCard';
import { WorkflowModal } from '../components/WorkflowModal';
import { StickyWorkflowBar } from '../components/StickyWorkflowBar';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';

export function PilotProgramPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<number | null>(null);

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
        'Real-time margin visibility',
      ],
      whatImproves: [
        { metric: 'Approval Time', improvement: '-60%' },
        { metric: 'Margin Leakage', improvement: '-$15k/yr' },
        { metric: 'Admin Time', improvement: '-10 hrs/week' },
      ],
      beforeAfter: {
        before: 'Variations created in Word, emailed, approval status unknown. Work done before approval, costs tracked in spreadsheets.',
        after: 'Create variation in 2 minutes, client approves digitally, costs auto-tracked, margin calculated in real-time.',
      },
    },
    {
      icon: Camera,
      title: 'Site Photo Mess',
      painPoint: 'Photos stuck on phones, impossible to find when you need them',
      hoursSaved: 6,
      fullDescription: 'Photos on three different phones. WhatsApp groups you can\'t search. That critical pre-pour photo? Good luck finding it when the client says it wasn\'t done right.',
      whatWeInstall: [
        'Photo capture app that organizes by job and stage',
        'Automatic cloud backup from any phone',
        'Smart tagging and searchability',
        'Client access to progress photos',
        'Defect tracking with photo evidence',
      ],
      whatImproves: [
        { metric: 'Photo Find Time', improvement: '< 30 seconds' },
        { metric: 'Lost Photos', improvement: '-100%' },
        { metric: 'Client Updates', improvement: 'Automated' },
      ],
      beforeAfter: {
        before: 'Photos scattered across phones and WhatsApp. Finding specific photos takes forever. Clients constantly asking for updates.',
        after: 'Every photo automatically organized by job and date. Search finds anything in seconds. Clients see progress live.',
      },
    },
    {
      icon: Truck,
      title: 'Material Coordination Chaos',
      painPoint: 'Wrong materials, wrong time, jobs held up waiting',
      hoursSaved: 15,
      fullDescription: 'Materials ordered too early (storage fees), too late (jobs delayed), or wrong specs (re-orders). Supervisors chasing suppliers, suppliers calling asking for details you already gave them.',
      whatWeInstall: [
        'Automated material schedules linked to project timeline',
        'Supplier portal for confirmed delivery windows',
        'Real-time delivery tracking and notifications',
        'Automatic reorder for commonly used items',
        'Delivery photo verification',
      ],
      whatImproves: [
        { metric: 'Delivery Issues', improvement: '-80%' },
        { metric: 'Coordination Time', improvement: '-15 hrs/week' },
        { metric: 'Storage Costs', improvement: '-$8k/yr' },
      ],
      beforeAfter: {
        before: 'Spreadsheets for material orders, constant phone calls to suppliers, surprise delivery problems, materials sitting around.',
        after: 'System sends orders at right time, suppliers confirm digitally, everyone sees delivery status, materials arrive just-in-time.',
      },
    },
    {
      icon: ArrowLeftRight,
      title: 'Subcontractor Wrangling',
      painPoint: 'Endless back-and-forth coordinating subbies, double bookings, no-shows',
      hoursSaved: 10,
      fullDescription: 'You book subbies, they forget. They show up when materials aren\'t ready. You need them urgently, they\'re booked out. Half your day is just trying to coordinate who\'s where when.',
      whatWeInstall: [
        'Subcontractor portal with confirmed availability',
        'Automatic schedule sync and reminders',
        'Pre-work checklists to prevent wasted trips',
        'Real-time job readiness status',
        'Performance tracking and preferred contractor lists',
      ],
      whatImproves: [
        { metric: 'No-shows', improvement: '-90%' },
        { metric: 'Coordination Time', improvement: '-10 hrs/week' },
        { metric: 'Job Delays', improvement: '-40%' },
      ],
      beforeAfter: {
        before: 'Phone calls to book subbies, text reminders, subbies show up to unready sites, double bookings, constant rescheduling.',
        after: 'Subbies see schedule online, confirm digitally, get auto-reminders, only come when site is ready, everyone in sync.',
      },
    },
  ];

  const faqItems = [
    {
      question: 'How does the "pay on results" model actually work?',
      answer: 'Simple. We scope the pilot (usually 1-2 workflows), agree on measurable outcomes, and do the work. After 28 days, we measure the results together. If you got the value we promised, you pay. If not, you don\'t. No deposit, no retainer, no BS.',
    },
    {
      question: 'What happens in the 28 days?',
      answer: 'Week 1: We map your current process and design the solution. Week 2: We build and configure everything. Week 3: We train your team and go live. Week 4: We monitor, adjust, and measure results. You\'re involved throughout but we do the heavy lifting.',
    },
    {
      question: 'Do we need to buy new software?',
      answer: 'Usually no. We work with what you have - your existing estimating software, email, spreadsheets. If we need to add something, we discuss it first and factor it into the ROI calculation.',
    },
    {
      question: 'How much of our time does this take?',
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
    {
      question: 'Why only 3 pilots per month?',
      answer: 'Quality over quantity. Each pilot gets hands-on attention from senior consultants. We\'d rather do 3 properly than 10 half-arsed. Plus we need time to properly measure results and ensure success.',
    },
    {
      question: 'What if we need changes during the pilot?',
      answer: 'Expected and included. We iterate based on feedback. The 28 days includes refinement time. The goal is a solution that actually works for you, not just ticking boxes.',
    },
  ];

  const pilotBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://plandepa.com/' },
    { name: '28-Day Pilot Program', url: 'https://plandepa.com/pilot-program' },
  ]);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: '28-Day Business Process Automation Pilot',
    provider: {
      '@type': 'Organization',
      name: 'Plandepa',
    },
    areaServed: ['Brisbane', 'Sydney', 'Newcastle', 'Australia'],
    description: 'Risk-free 28-day pilot program to automate construction business workflows. Pay only on proven results. ISO certified consultants with construction industry expertise.',
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
        title="28-Day Pilot Program - Risk-Free Workflow Automation | Plandepa"
        description="Transform your construction business workflows in 28 days. Pay only on proven results. Choose from 6 proven workflow solutions. Limited to 3 pilots per month. Brisbane, Sydney, Newcastle."
        keywords="construction automation pilot, workflow automation trial, construction process improvement, risk-free business automation, construction technology pilot, Brisbane construction automation"
      />
      <StructuredData data={[pilotBreadcrumb, serviceSchema, faqSchema]} />

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
              <Target className="w-4 h-4" />
              Limited to 3 Pilots Per Month
            </motion.div>

            <motion.h1 variants={staggerItem} className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-black mb-6">
              28-Day Pilot Program
            </motion.h1>
            <motion.p variants={staggerItem} className="text-xl md:text-2xl text-brand-gray max-w-3xl mx-auto mb-8">
              Pick one broken workflow. We fix it in 28 days. You only pay if it delivers the results we promise.
            </motion.p>

            <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="bg-brand-red text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-red/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Book Discovery Call
              </button>
              <a
                href="#workflows"
                className="bg-white text-brand-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-light-gray transition-all duration-300 shadow-md border-2 border-brand-black"
              >
                See Workflow Options
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <motion.div variants={staggerItem} className="bg-white p-6 rounded-xl shadow-md">
              <Shield className="w-12 h-12 text-brand-red mb-4" />
              <h3 className="text-xl font-bold text-brand-black mb-2">Zero Risk</h3>
              <p className="text-brand-gray">Pay only after we prove results. No deposit, no retainer required.</p>
            </motion.div>
            <motion.div variants={staggerItem} className="bg-white p-6 rounded-xl shadow-md">
              <Clock className="w-12 h-12 text-brand-red mb-4" />
              <h3 className="text-xl font-bold text-brand-black mb-2">28 Days</h3>
              <p className="text-brand-gray">From kickoff to measurable results in under a month.</p>
            </motion.div>
            <motion.div variants={staggerItem} className="bg-white p-6 rounded-xl shadow-md">
              <TrendingUp className="w-12 h-12 text-brand-red mb-4" />
              <h3 className="text-xl font-bold text-brand-black mb-2">Real Results</h3>
              <p className="text-brand-gray">Measurable time savings and efficiency gains, not vague improvements.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <AngleDivider direction="down-left" fromColor="#F5F5F5" toColor="#FFFFFF" height={60} />

      <motion.section
        id="how-it-works"
        className="bg-white py-16 md:py-24 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={staggerItem} className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black mb-4">
              How The 28-Day Pilot Works
            </h2>
            <p className="text-lg md:text-xl text-brand-gray max-w-2xl mx-auto">
              Four weeks. One workflow. Measurable results.
            </p>
          </motion.div>

          <motion.div variants={staggerItem} className="grid md:grid-cols-4 gap-8">
            {[
              {
                week: 'Week 1',
                title: 'Discovery & Design',
                description: 'We map your current workflow, identify bottlenecks, and design the automated solution.',
                icon: Target,
              },
              {
                week: 'Week 2',
                title: 'Build & Configure',
                description: 'We build the system, configure automations, and set up integrations with your existing tools.',
                icon: Zap,
              },
              {
                week: 'Week 3',
                title: 'Training & Go-Live',
                description: 'We train your team, transition to the new workflow, and provide hands-on support.',
                icon: Rocket,
              },
              {
                week: 'Week 4',
                title: 'Monitor & Measure',
                description: 'We track results, make adjustments, and measure against agreed outcomes.',
                icon: CheckCircle2,
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-brand-light-gray p-6 rounded-xl h-full">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-red text-white rounded-lg mb-4">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-bold text-brand-red mb-2">{step.week}</div>
                  <h3 className="text-xl font-bold text-brand-black mb-3">{step.title}</h3>
                  <p className="text-brand-gray">{step.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <AngleDivider direction="up-right" fromColor="#FFFFFF" toColor="#F5F5F5" height={60} />

      <motion.section
        id="workflows"
        className="bg-brand-light-gray py-16 md:py-24 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={staggerItem} className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black mb-4">
              Choose Your Pilot Workflow
            </h2>
            <p className="text-lg md:text-xl text-brand-gray max-w-3xl mx-auto">
              Pick the biggest pain point in your business. We'll prove we can fix it in 28 days.
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

          <motion.div variants={staggerItem} className="mt-12 text-center">
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="bg-brand-red text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-red/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Discuss Your Workflow Challenge
            </button>
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

      <AngleDivider direction="down-left" fromColor="#F5F5F5" toColor="#FFFFFF" height={60} />

      <motion.section
        className="bg-white py-16 md:py-24 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div variants={staggerItem} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black mb-4">
              What You Get
            </h2>
          </motion.div>

          <motion.div variants={staggerItem} className="grid md:grid-cols-2 gap-6">
            {[
              'Complete workflow automation setup',
              'Integration with your existing tools',
              'Team training and documentation',
              'Hands-on support during transition',
              'Performance monitoring dashboard',
              'Results measurement and reporting',
              '30-day post-pilot support',
              'Scale-up roadmap (if you continue)',
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="w-6 h-6 text-brand-red flex-shrink-0 mt-1" />
                <span className="text-lg text-brand-gray">{item}</span>
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
              Why Companies Choose The Pilot First
            </h2>
          </motion.div>

          <motion.div variants={staggerItem} className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="text-4xl font-bold text-brand-red mb-2">$0</div>
              <div className="text-xl font-bold text-brand-black mb-3">Upfront Cost</div>
              <p className="text-brand-gray">No deposit or retainer. We prove value before you pay anything.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="text-4xl font-bold text-brand-red mb-2">28</div>
              <div className="text-xl font-bold text-brand-black mb-3">Days to Results</div>
              <p className="text-brand-gray">Fast enough to prove value, long enough to do it properly.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="text-4xl font-bold text-brand-red mb-2">100%</div>
              <div className="text-xl font-bold text-brand-black mb-3">Risk-Free</div>
              <p className="text-brand-gray">If we don't deliver the agreed results, you don't pay.</p>
            </div>
          </motion.div>

          <motion.div variants={staggerItem} className="bg-brand-red text-white p-8 md:p-12 rounded-2xl text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Fix Your Biggest Bottleneck?
            </h3>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Limited to 3 pilots per month. Book a discovery call to see if we're a good fit.
            </p>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="bg-white text-brand-red px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-light-gray transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Book Your Discovery Call
            </button>
          </motion.div>
        </div>
      </motion.section>

      <AngleDivider direction="down-left" fromColor="#F5F5F5" toColor="#FFFFFF" height={60} />

      <SimpleFAQ items={faqItems} />

      <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} title="Book Your Discovery Call">
        <ContactForm
          onSuccess={() => {
            setIsContactModalOpen(false);
            setShowThankYou(true);
          }}
        />
      </Modal>

      <ThankYouModal isOpen={showThankYou} onClose={() => setShowThankYou(false)} />

      <StickyWorkflowBar
        onBookCall={() => setIsContactModalOpen(true)}
        show={true}
      />
    </>
  );
}
