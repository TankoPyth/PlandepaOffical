import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Inbox, FileText, Wrench, ClipboardList, Camera, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { SimpleFAQ } from '../components/SimpleFAQ';
import { AngleDivider } from '../components/ui/AngleDivider';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';
import { Modal } from '../components/ui/Modal';
import { ContactForm } from '../components/ContactForm';
import { ThankYouModal } from '../components/ThankYouModal';
import { LOCATIONS } from '../seo/site';
import { OFFER_PATH } from '../seo/offer';

const USE_CASES = [
  { icon: Inbox, name: 'Enquiry capture & follow-up', desc: 'Every enquiry from web, phone, email and social lands in one pipeline, gets assigned, and is followed up automatically. No lead goes cold.' },
  { icon: FileText, name: 'Quoting & estimating', desc: 'Templated quotes that go out the same day, with automatic follow-ups. Works alongside Buildxact or your existing estimating tool.' },
  { icon: Wrench, name: 'Variations & approvals', desc: 'Variations captured on site, priced, sent for sign-off and escalated if they stall — before the work starts, not after.' },
  { icon: ClipboardList, name: 'Job handover', desc: 'A structured handover from sales to delivery with required fields and owners, so nothing is lost between the contract and day one on site.' },
  { icon: Camera, name: 'Site capture & admin', desc: 'Photos, notes and site diaries captured once, tagged to the right job, and routed to the right person. AI drafts the paperwork.' },
  { icon: BarChart3, name: 'Reporting', desc: 'Revenue, pipeline, job progress and costs in one live view — not a Monday morning phone call.' },
];

export function LocationPage({ location }: { location: keyof typeof LOCATIONS }) {
  const loc = LOCATIONS[location];
  const other = LOCATIONS[location === 'brisbane' ? 'newcastle' : 'brisbane'];
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const open = () => setIsContactModalOpen(true);

  return (
    <>
      <section className="bg-brand-off-white py-12 md:py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand-red uppercase tracking-wider mb-4">
            <MapPin className="w-4 h-4" /> {loc.city} · {loc.state}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-black mb-4 md:mb-6">
            AI implementation for {loc.city} construction companies
          </h1>
          <p className="text-base md:text-lg text-brand-gray max-w-3xl mb-8 leading-relaxed">{loc.intro}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={open}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 md:px-10 md:py-4 bg-brand-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
            >
              Book a fit call <ArrowRight className="w-5 h-5" />
            </button>
            <Link
              to={OFFER_PATH}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 md:px-10 md:py-4 border-2 border-brand-black text-brand-black font-semibold rounded-lg hover:bg-brand-black hover:text-white transition-all duration-300"
            >
              See the Clarity Blueprint
            </Link>
          </div>
          <p className="text-sm text-brand-gray mt-4">No pitch. No obligation. 30 minutes.</p>
        </div>
      </section>

      <AngleDivider direction="down-right" fromColor="#FAFAFA" toColor="#FFFFFF" height={100} />

      <section className="bg-white py-12 md:py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">More work. Same office team.</h2>
            <p className="text-brand-gray leading-relaxed">{loc.context}</p>
          </div>
          <div className="bg-brand-light-gray rounded-2xl p-8">
            <h3 className="text-xl font-bold text-brand-black mb-4">Areas we work with</h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-brand-gray">
              {[loc.city, ...loc.nearby].map((place) => (
                <li key={place} className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-red flex-shrink-0" /> {place}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="what-we-automate" className="bg-brand-light-gray py-12 md:py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black text-center mb-12">Where AI actually helps a builder</h2>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
          >
            {USE_CASES.map((u) => (
              <motion.div key={u.name} variants={staggerItem} className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-brand-black rounded-xl flex items-center justify-center mb-4">
                  <u.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-brand-black mb-2">{u.name}</h3>
                <p className="text-sm text-brand-gray leading-relaxed">{u.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">Construction only. Tool-agnostic.</h2>
            <p className="text-brand-gray leading-relaxed mb-6">
              Start with the <Link to={OFFER_PATH} className="text-brand-red font-semibold hover:underline">Clarity Blueprint</Link> — from $990 + GST, with the
              fee credited if we implement — or go straight to{' '}
              <Link to="/enquiry-automation" className="text-brand-red font-semibold hover:underline">enquiry automation</Link> or{' '}
              <Link to="/buildxact" className="text-brand-red font-semibold hover:underline">Buildxact set up properly</Link>.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-brand-light-gray py-12 md:py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-8">AI for {loc.city} builders — FAQ</h2>
          <SimpleFAQ items={loc.faqs.map((f) => ({ question: f.q, answer: f.a }))} />
        </div>
      </section>

      <section className="bg-white py-12 md:py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">Talk to us about your business</h2>
          <p className="text-base md:text-lg text-brand-gray mb-8">
            A 30-minute call with Jarrod or Mitch. We'll tell you honestly where AI and better systems would make a difference — and where they won't.
          </p>
          <button
            onClick={open}
            className="inline-flex items-center gap-3 px-10 py-4 bg-brand-black text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 shadow-xl hover:scale-105 active:scale-95"
          >
            Book a fit call <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-sm text-brand-gray mt-6">
            Also working with builders in <Link to={other.slug} className="text-brand-red font-semibold hover:underline">{other.city}</Link>.
          </p>
        </div>
      </section>

      <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} title="Book a fit call">
        <ContactForm
          source="business_audit"
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
