import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Target, Clock, TrendingUp, FileText, Users, ArrowRight, AlertCircle, Shield } from 'lucide-react';
import { SEO } from '../components/SEO';
import { StickyContactButton } from '../components/ui/StickyContactButton';
import { AngleDivider } from '../components/ui/AngleDivider';
import { Modal } from '../components/ui/Modal';
import { ContactForm } from '../components/ContactForm';
import { ThankYouModal } from '../components/ThankYouModal';
import { SimpleFAQ } from '../components/SimpleFAQ';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export function OSRPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  return (
    <>
      <SEO
        title="Operations Review (OSR) - Plandepa"
        description="A 10-day diagnostic that shows you exactly where your construction business is losing control, and the specific sequence of changes that will restore it."
        keywords="construction operations review, business process improvement, operational efficiency, construction automation"
        canonical="https://plandepa.com/operations-review"
      />

      <motion.section
        className="relative bg-gradient-to-br from-brand-black via-gray-900 to-brand-black text-white pt-32 md:pt-40 pb-20 md:pb-32 px-6 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div variants={staggerItem} className="inline-block mb-6">
            <span className="bg-brand-red/20 text-brand-red px-4 py-2 rounded-full text-sm font-semibold border border-brand-red/30">
              Delivered in 10 Business Days
            </span>
          </motion.div>

          <motion.h1 variants={staggerItem} className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Plandepa Operations Review
          </motion.h1>

          <motion.p variants={staggerItem} className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed max-w-3xl">
            Most construction businesses don't have a software problem. They have a control problem.
          </motion.p>

          <motion.div variants={staggerItem} className="space-y-4 mb-12 text-lg text-gray-300 max-w-3xl">
            <p>
              Work is moving, people are working hard, but the business is paying a hidden tax every day through:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-3">
                <span className="text-brand-red mt-1">•</span>
                <span>Chasing updates</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-red mt-1">•</span>
                <span>Rework and miscommunication</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-red mt-1">•</span>
                <span>Slow approvals</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-red mt-1">•</span>
                <span>Unclear ownership</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-red mt-1">•</span>
                <span>Delayed visibility until the end of the job</span>
              </li>
            </ul>
            <p className="font-semibold text-white pt-4">
              The OSR is how you remove the guesswork and stop spending effort where it doesn't return.
            </p>
          </motion.div>

          <motion.button
            variants={staggerItem}
            onClick={() => setIsContactModalOpen(true)}
            className="bg-brand-red hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center gap-2 group"
          >
            Request Operations Review
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </motion.section>

      <AngleDivider direction="down-right" fromColor="#000000" toColor="#FFFFFF" height={60} />

      <motion.section
        className="bg-white py-16 md:py-24 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={staggerItem} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black mb-4">
              Who It's For
            </h2>
          </motion.div>

          <motion.div variants={staggerItem} className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-brand-gray mb-8">
              Construction businesses where leadership is feeling one or more of these:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                '"We\'re busy, but it feels harder than it should."',
                '"Admin keeps growing, but nothing gets cleaner."',
                '"We only discover margin issues after the damage is done."',
                '"Everything relies on the same few people to keep jobs moving."',
                '"We have tools, but the business still runs on chasing."'
              ].map((quote, index) => (
                <div key={index} className="bg-brand-light-gray p-6 rounded-lg border-l-4 border-brand-red">
                  <p className="text-brand-gray italic">{quote}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gray-50 p-8 rounded-lg border border-gray-200">
              <div className="flex items-start gap-3 mb-4">
                <Users className="w-6 h-6 text-brand-red flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-brand-black text-lg mb-2">Required Attendees</h3>
                  <p className="text-brand-gray">
                    Owner or Director, Ops or Admin Manager, Estimator or PM lead
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <AngleDivider direction="up-left" fromColor="#FFFFFF" toColor="#F5F5F5" height={60} />

      <motion.section
        className="bg-brand-light-gray py-16 md:py-24 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={staggerItem} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black mb-4">
              The Promise
            </h2>
            <p className="text-lg md:text-xl text-brand-gray max-w-3xl mx-auto">
              Within 10 business days you receive a decision document that lets leadership confidently say:
            </p>
          </motion.div>

          <motion.div variants={staggerItem} className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Target,
                title: 'Automate this first',
                description: 'Because it removes the biggest daily drag'
              },
              {
                icon: AlertCircle,
                title: 'Stop doing this',
                description: 'Because it\'s wasted motion'
              },
              {
                icon: Shield,
                title: 'Keep or replace systems',
                description: 'The real issue is the workflow between them'
              },
              {
                icon: TrendingUp,
                title: 'Sequence changes properly',
                description: 'So you don\'t disrupt delivery'
              },
              {
                icon: Users,
                title: 'Reduce admin load',
                description: 'Reduce rework and increase labour leverage without adding headcount'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <item.icon className="w-10 h-10 text-brand-red mb-4" />
                <h3 className="font-bold text-xl text-brand-black mb-2">{item.title}</h3>
                <p className="text-brand-gray">{item.description}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={staggerItem} className="mt-12 text-center">
            <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-brand-red max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl font-bold text-brand-black">
                This is not an AI report.
              </p>
              <p className="text-xl md:text-2xl font-bold text-brand-red mt-2">
                It's the operating plan for how your business regains control.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <AngleDivider direction="down-right" fromColor="#F5F5F5" toColor="#FFFFFF" height={60} />

      <motion.section
        className="bg-white py-16 md:py-24 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={staggerItem} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black mb-4">
              The 7 Workflows We Map End-to-End
            </h2>
            <p className="text-lg md:text-xl text-brand-gray max-w-3xl mx-auto">
              We review the full operational chain looking for where work stalls, where ownership breaks, where handoffs degrade, and where visibility becomes unreliable.
            </p>
          </motion.div>

          <motion.div variants={staggerItem} className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {[
              'Enquiry intake to booked consult',
              'Quote process to sent quote',
              'Variations and approvals',
              'Supplier orders and coordination',
              'Site updates and documentation flow',
              'Client updates and progress communications',
              'Finance visibility and job profitability tracking'
            ].map((workflow, index) => (
              <div key={index} className="bg-brand-light-gray p-6 rounded-lg border-l-4 border-brand-red flex items-start gap-4">
                <div className="bg-brand-cta-orange text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-brand-black font-semibold">{workflow}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <AngleDivider direction="up-left" fromColor="#FFFFFF" toColor="#F5F5F5" height={60} />

      <motion.section
        className="bg-brand-light-gray py-16 md:py-24 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={staggerItem} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black mb-4">
              What You Get
            </h2>
            <p className="text-lg md:text-xl text-brand-gray max-w-3xl mx-auto">
              Executive, tangible, hard to ignore deliverables
            </p>
          </motion.div>

          <div className="space-y-8 max-w-5xl mx-auto">
            <motion.div variants={staggerItem} className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-brand-cta-orange text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-brand-black mb-2">
                    Operational Control Roadmap
                  </h3>
                  <p className="text-lg font-semibold text-brand-red mb-4">Top 10 Priority Stack</p>
                </div>
              </div>
              <p className="text-brand-gray mb-4">
                A ranked stack of the 10 highest leverage changes across the 7 workflows, sequenced in the exact order they should be executed.
              </p>
              <p className="text-brand-gray font-semibold mb-3">Each initiative includes:</p>
              <ul className="space-y-2 text-brand-gray">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                  <span>The bottleneck it fixes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                  <span>What changes operationally</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                  <span>Dependencies and sequencing constraints</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                  <span>Internal owner recommendation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                  <span>Expected impact: time saved, rework reduced, visibility gained</span>
                </li>
              </ul>
              <p className="text-brand-black font-semibold mt-4">
                This becomes your execution plan, not a suggestion list.
              </p>
            </motion.div>

            <motion.div variants={staggerItem} className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-brand-cta-orange text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-brand-black mb-2">
                    "Do This, Not That" Decision Sheet
                  </h3>
                </div>
              </div>
              <p className="text-brand-gray mb-4">
                A one-page leadership reference designed to end debate.
              </p>
              <p className="text-brand-gray font-semibold mb-3">It includes:</p>
              <ul className="space-y-2 text-brand-gray">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                  <span>What to implement first</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                  <span>What to stop doing immediately</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                  <span>What to avoid investing in right now</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                  <span>The common traps that waste money and create regression</span>
                </li>
              </ul>
              <p className="text-brand-black font-semibold mt-4">
                This prevents random acts of software and distraction projects.
              </p>
            </motion.div>

            <motion.div variants={staggerItem} className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-brand-cta-orange text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-brand-black mb-2">
                    Process Kill List
                  </h3>
                  <p className="text-lg font-semibold text-brand-red mb-4">Time Leak Elimination</p>
                </div>
              </div>
              <p className="text-brand-gray mb-4">
                A direct list of the highest-cost loops consuming admin time and creating rework.
              </p>
              <p className="text-brand-gray font-semibold mb-3">Includes:</p>
              <ul className="space-y-2 text-brand-gray">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                  <span>The exact step causing the leak</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                  <span>Why it keeps happening</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                  <span>The clean replacement approach</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                  <span>The control mechanism required: capture, ownership, SLA, escalation, visibility</span>
                </li>
              </ul>
              <p className="text-brand-black font-semibold mt-4">
                This is where the real savings are usually hiding.
              </p>
            </motion.div>

            <motion.div variants={staggerItem} className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-brand-cta-orange text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-brand-black mb-2">
                    ROI Estimate Pack
                  </h3>
                  <p className="text-lg font-semibold text-brand-red mb-4">Grounded and measurable</p>
                </div>
              </div>
              <p className="text-brand-gray mb-4">
                For each of the top 10 initiatives we provide a practical ROI estimate based on:
              </p>
              <ul className="space-y-2 text-brand-gray">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                  <span>Hours saved per week across admin, ops, leadership</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                  <span>Reduction in chasing and follow-up touches</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                  <span>Reduction in rework and avoidable delays</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                  <span>Improved visibility that prevents late surprises</span>
                </li>
              </ul>
              <p className="text-brand-black font-semibold mt-4">
                This is a decision tool, not a CFO financial model.
              </p>
            </motion.div>

            <motion.div variants={staggerItem} className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-brand-cta-orange text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl flex-shrink-0">
                  5
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-brand-black mb-2">
                    Pilot and Execution Plan
                  </h3>
                  <p className="text-lg font-semibold text-brand-red mb-4">The next move</p>
                </div>
              </div>
              <p className="text-brand-gray mb-4">
                We nominate the first One Workflow Pilot to run so you can prove value quickly, including:
              </p>
              <ul className="space-y-2 text-brand-gray">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                  <span>The chosen workflow</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                  <span>Scope boundaries</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                  <span>Success metrics</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                  <span>Proof artefacts produced in 28 days</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                  <span>What implementation phase follows once proven</span>
                </li>
              </ul>
              <p className="text-brand-black font-semibold mt-4">
                This prevents the OSR becoming shelfware.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <AngleDivider direction="down-right" fromColor="#F5F5F5" toColor="#FFFFFF" height={60} />

      <motion.section
        className="bg-white py-16 md:py-24 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={staggerItem} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black mb-4">
              How It Runs, Without Disruption
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div variants={staggerItem} className="text-center">
              <div className="bg-brand-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-brand-red" />
              </div>
              <h3 className="font-bold text-xl text-brand-black mb-2">Delivery Window</h3>
              <p className="text-brand-gray">10 business days</p>
            </motion.div>

            <motion.div variants={staggerItem} className="text-center">
              <div className="bg-brand-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-brand-red" />
              </div>
              <h3 className="font-bold text-xl text-brand-black mb-2">Sessions Included</h3>
              <ul className="text-brand-gray space-y-1">
                <li>Kickoff: 45-60 mins</li>
                <li>Working: 3 sessions</li>
                <li>Delivery: 60 mins</li>
              </ul>
            </motion.div>

            <motion.div variants={staggerItem} className="text-center">
              <div className="bg-brand-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-brand-red" />
              </div>
              <h3 className="font-bold text-xl text-brand-black mb-2">Interview Cap</h3>
              <p className="text-brand-gray">Up to 9 short interviews scheduled around availability</p>
            </motion.div>
          </div>

          <motion.div variants={staggerItem} className="mt-12 bg-brand-light-gray p-8 rounded-lg max-w-4xl mx-auto">
            <h3 className="font-bold text-xl text-brand-black mb-4">We rely on async capture where possible:</h3>
            <ul className="space-y-3 text-brand-gray">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                <span>Exports, screenshots, sample threads, job artefacts</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                <span>Short walkthroughs, not long meetings</span>
              </li>
            </ul>
            <p className="text-brand-black font-semibold mt-6">
              You should feel like you have a systems partner inside the business, not an external consultant generating meetings.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <AngleDivider direction="up-left" fromColor="#FFFFFF" toColor="#F5F5F5" height={60} />

      <motion.section
        className="bg-white py-16 md:py-24 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={staggerItem} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black mb-4">
              What Happens After the OSR
            </h2>
            <p className="text-lg md:text-xl text-brand-gray max-w-3xl mx-auto">
              You choose the path based on confidence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div variants={staggerItem} className="bg-brand-light-gray p-8 rounded-lg">
              <div className="bg-brand-cta-orange text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-2xl font-bold text-brand-black mb-4">
                Move into phased implementation plus governance retainer
              </h3>
              <p className="text-brand-gray">
                We execute the roadmap in phases and protect against regression. This ensures your business systems remain optimized and continue to evolve with your needs.
              </p>
            </motion.div>

            <motion.div variants={staggerItem} className="bg-brand-light-gray p-8 rounded-lg">
              <div className="bg-brand-cta-orange text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-2xl font-bold text-brand-black mb-4">
                Run the One Workflow Pilot first
              </h3>
              <p className="text-brand-gray">
                We prove value on one workflow, then scale. This lower-risk approach lets you see results before committing to larger changes.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <AngleDivider direction="up-left" fromColor="#FFFFFF" toColor="#F5F5F5" height={60} />

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
          </motion.div>
          <motion.div variants={staggerItem}>
            <SimpleFAQ items={[
              {
                question: 'How is this different from a regular business audit?',
                answer: 'Most audits identify problems. The OSR identifies problems AND provides the exact sequence of fixes, with dependencies mapped, ROI estimated, and an execution plan ready to implement. You walk away with a roadmap, not just a report.'
              },
              {
                question: 'Do you need access to our systems?',
                answer: 'Yes, we need view access to your core operational systems and sample data. We rely on exports, screenshots, and short walkthroughs rather than long meetings to minimize disruption.'
              },
              {
                question: 'What if we\'re not ready to implement immediately?',
                answer: 'The OSR stands alone as a strategic document. You can implement it yourself, use it to evaluate other vendors, or come back to us when timing is right. If you proceed within an agreed timeframe, the OSR fee can be credited toward implementation.'
              },
              {
                question: 'How much of our team\'s time does this require?',
                answer: 'Minimal. We cap interviews at 9 short sessions scheduled around your availability, plus 3 working sessions with key decision makers. Most information gathering happens async through exports and documentation review.'
              },
              {
                question: 'What size business is this suitable for?',
                answer: 'Construction businesses with 2-25 staff where operations feel harder than they should, admin is growing, or visibility into job profitability comes too late. If you\'re still chasing updates and your tools aren\'t reducing the load, this is for you.'
              }
            ]} />
          </motion.div>
        </div>
      </motion.section>

      <AngleDivider direction="down-right" fromColor="#F5F5F5" toColor="#000000" height={60} />

      <motion.section
        className="bg-gradient-to-br from-brand-black via-gray-900 to-brand-black text-white py-20 md:py-32 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 variants={staggerItem} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Ready to Regain Control?
          </motion.h2>
          <motion.p variants={staggerItem} className="text-xl text-gray-300 mb-8">
            Stop guessing. Get the operating plan your business needs.
          </motion.p>
          <motion.button
            variants={staggerItem}
            onClick={() => setIsContactModalOpen(true)}
            className="bg-brand-red hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all inline-flex items-center gap-2 group"
          >
            Request Operations Review
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </motion.section>

      <StickyContactButton onClick={() => setIsContactModalOpen(true)} />

      <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} title="Request Operations Review">
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
