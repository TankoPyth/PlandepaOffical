import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X, Inbox, Sparkles, Filter, CalendarCheck, Send, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { SimpleFAQ } from '../components/SimpleFAQ';
import { AngleDivider } from '../components/ui/AngleDivider';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';
import { Modal } from '../components/ui/Modal';
import { ContactForm } from '../components/ContactForm';
import { ThankYouModal } from '../components/ThankYouModal';
import { ENQUIRY_FAQS } from '../seo/site';
import { OFFER_PATH } from '../seo/offer';

const LEAKS = [
  'Enquiries land in five places: the website, email, phone, Facebook, hipages. Nobody owns them.',
  'The builder who replies first usually gets the site visit. You reply when you get off the tools.',
  'Quotes go out and are never chased. Good jobs go to whoever followed up.',
  "You can't say which enquiries turn into work, or what your marketing actually returns.",
];

const MODULES = [
  { icon: Inbox, name: 'One enquiry inbox', desc: 'Every channel feeds a single pipeline. Each enquiry is logged, tagged by job type and location, and assigned to an owner.' },
  { icon: Sparkles, name: 'Instant first response', desc: 'AI drafts a reply in your voice within minutes: acknowledging the job, asking the right qualifying questions, offering a call time.' },
  { icon: Filter, name: 'Qualification', desc: 'Budget, location, timing and job type captured up front, so your time goes to the jobs you actually want.' },
  { icon: CalendarCheck, name: 'Site visit booking', desc: 'Qualified enquiries book straight into your calendar with reminders, no phone tag.' },
  { icon: Send, name: 'Quote follow-up', desc: 'Every quote gets a follow-up sequence that stops the moment the client replies. Nothing sits unanswered.' },
  { icon: BarChart3, name: 'Pipeline & source reporting', desc: 'See enquiries, quotes, win rate and where the work came from, in one view, updated automatically.' },
];

export function LeadGenerationPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const open = () => setIsContactModalOpen(true);

  return (
    <>
      <section className="bg-brand-off-white py-12 md:py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-semibold text-brand-red uppercase tracking-wider mb-4">AI Enquiry Capture &amp; Follow-up</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-black mb-4 md:mb-6">
            Every enquiry answered. Every quote followed up.
          </h1>
          <p className="text-base md:text-lg text-brand-gray max-w-3xl mb-8 leading-relaxed">
            We build AI-assisted enquiry systems for construction companies in Brisbane, Newcastle and across Australia. Every lead is captured,
            answered, qualified and followed up, without you chasing it from the ute.
          </p>
          <button
            onClick={open}
            className="inline-flex items-center gap-2 md:gap-3 px-8 py-3.5 md:px-10 md:py-4 bg-brand-black text-white font-semibold text-sm md:text-base rounded-lg hover:bg-gray-800 transition-all duration-300 apple-ease shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
          >
            Book a call
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <p className="text-sm text-brand-gray mt-4">No pitch. No obligation. 30 minutes.</p>
        </div>
      </section>

      <AngleDivider direction="down-right" fromColor="#FAFAFA" toColor="#FFFFFF" height={100} />

      <section className="bg-white py-12 md:py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-display-sm font-bold text-brand-black mb-4">You don't have a lead problem. You have a follow-up problem.</h2>
          <p className="text-brand-gray mb-10 max-w-3xl leading-relaxed">
            Most builders we talk to already get enough enquiries. The work is lost between the first message and the signed contract: slow replies,
            no qualification, and quotes nobody chases.
          </p>
          <div className="space-y-6 bg-red-50 border-l-4 border-brand-red p-8 rounded-r-xl">
            {LEAKS.map((l) => (
              <div key={l} className="flex items-start gap-4">
                <X className="w-6 h-6 text-brand-red flex-shrink-0 mt-1" />
                <p className="text-body-lg text-brand-gray">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AngleDivider direction="up-right" fromColor="#FFFFFF" toColor="#F5F5F5" height={100} />

      <section id="what-we-build" className="bg-brand-light-gray py-12 md:py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black text-center mb-12">From first message to signed contract</h2>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
          >
            {MODULES.map((m) => (
              <motion.div key={m.name} variants={staggerItem} className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-brand-black rounded-xl flex items-center justify-center mb-4">
                  <m.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-brand-black mb-2">{m.name}</h3>
                <p className="text-sm text-brand-gray leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.p className="text-center text-brand-gray max-w-3xl mx-auto mt-10 leading-relaxed" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            Tool-agnostic: we build on what fits (HubSpot, Monday, Airtable, or the CRM you already have) and connect it to Buildxact or your
            estimating tool so won jobs hand over cleanly to delivery.
          </motion.p>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">Not sure enquiries are the real leak?</h2>
          <p className="text-brand-gray mb-8 leading-relaxed">
            The Clarity Blueprint maps where your business is actually losing time, margin and work, and names the first workflow to fix. For a lot
            of builders it's this one, but we'll tell you if it isn't.
          </p>
          <Link
            to={OFFER_PATH}
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-brand-black text-brand-black font-semibold rounded-lg hover:bg-brand-black hover:text-white transition-all duration-300"
          >
            See the Clarity Blueprint <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <section className="bg-brand-light-gray py-12 md:py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-8">Enquiry automation: FAQ</h2>
          <SimpleFAQ items={ENQUIRY_FAQS.map((f) => ({ question: f.q, answer: f.a }))} />
        </div>
      </section>

      <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} title="Book a call">
        <ContactForm
          source="lead_generation"
          onSuccess={() => {
            setTimeout(() => {
              setIsContactModalOpen(false);
              setShowThankYou(true);
            }, 1500);
          }}
        />
      </Modal>
      <ThankYouModal isOpen={showThankYou} onClose={() => setShowThankYou(false)} />
    </>
  );
}
