import { useState } from 'react';
import { ArrowRight, Check, X, Shield, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { SimpleFAQ } from '../components/SimpleFAQ';
import { AngleDivider } from '../components/ui/AngleDivider';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';
import { Modal } from '../components/ui/Modal';
import { ContactForm } from '../components/ContactForm';
import { ThankYouModal } from '../components/ThankYouModal';
import { DELIVERY_GUARANTEE, FIT, GST_NOTE, OFFER_FAQS, OFFER_PROMISE, RISK_REVERSAL, TIERS, formatPrice } from '../seo/offer';

const STEPS = [
  { n: '1', name: 'Fit call', desc: 'A 30-minute call. We check the Blueprint is right for your business and agree which size fits.' },
  { n: '2', name: 'The Blueprint', desc: 'We map how the business actually runs — people, workflows, tools and information flow — and find where it leaks.' },
  { n: '3', name: 'Readout & decision', desc: 'You get the named outputs and a clear first workflow to fix. Implement it with us, or take it and run.' },
];

export function ClarityBlueprintPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const open = () => setIsContactModalOpen(true);

  return (
    <>
      <section className="bg-brand-off-white py-12 md:py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-semibold text-brand-red uppercase tracking-wider mb-4">The Clarity Blueprint</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-black mb-4 md:mb-6">
            Pay for the truth. Then fix it.
          </h1>
          <p className="text-base md:text-lg text-brand-gray max-w-3xl mb-8 leading-relaxed">
            A paid diagnostic that exposes exactly where your construction business is breaking — where time, margin, missed work and your own
            hours are leaking — and what to fix first. Three sizes. It turns straight into implementation.
          </p>
          <button
            onClick={open}
            className="inline-flex items-center gap-2 md:gap-3 px-8 py-3.5 md:px-10 md:py-4 bg-brand-black text-white font-semibold text-sm md:text-base rounded-lg hover:bg-gray-800 transition-all duration-300 apple-ease shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
          >
            Book a fit call
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <p className="text-sm text-brand-gray mt-4">From $990 + GST. Fee credited if you implement with us.</p>
        </div>
      </section>

      <AngleDivider direction="down-right" fromColor="#FAFAFA" toColor="#FFFFFF" height={100} />

      <section className="bg-white py-12 md:py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-semibold text-brand-black leading-snug">“{OFFER_PROMISE}”</p>
        </div>
      </section>

      <section className="bg-brand-light-gray py-12 md:py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-brand-black mb-4">Built for you if…</h2>
            <ul className="space-y-3">
              {FIT.yes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-brand-gray">
                  <Check className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-brand-black mb-4">Not the right fit…</h2>
            <ul className="space-y-3">
              {FIT.no.map((item) => (
                <li key={item} className="flex items-start gap-3 text-brand-gray">
                  <X className="w-5 h-5 text-brand-gray flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-brand-gray mt-6">We'll say so upfront on the fit call.</p>
          </div>
        </div>
      </section>

      <section id="options" className="bg-white py-12 md:py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black mb-4">Choose the depth you need</h2>
            <p className="text-base md:text-lg text-brand-gray">{GST_NOTE}</p>
          </div>
          <motion.div
            className="grid md:grid-cols-3 gap-6 md:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
          >
            {TIERS.map((tier) => (
              <motion.div
                key={tier.id}
                variants={staggerItem}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  tier.recommended ? 'bg-brand-black text-white shadow-2xl md:scale-105' : 'bg-brand-light-gray text-brand-black'
                }`}
              >
                {tier.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full">
                    RECOMMENDED
                  </span>
                )}
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                <p className="text-4xl font-extrabold mb-1">
                  {formatPrice(tier.price)} <span className={`text-sm font-medium ${tier.recommended ? 'text-white/70' : 'text-brand-gray'}`}>+ GST</span>
                </p>
                <p className={`text-sm mb-6 ${tier.recommended ? 'text-white/80' : 'text-brand-gray'}`}>{tier.format}</p>
                <ul className="space-y-2 mb-8 flex-1">
                  {tier.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tier.recommended ? 'text-white' : 'text-brand-red'}`} />
                      <span className={tier.recommended ? 'text-white/90' : 'text-brand-gray'}>{inc}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={open}
                  className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    tier.recommended ? 'bg-brand-red text-white hover:bg-red-700' : 'bg-brand-black text-white hover:bg-gray-800'
                  }`}
                >
                  Book {tier.name}
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <AngleDivider direction="down-right" fromColor="#FFFFFF" toColor="#F5F5F5" height={100} />

      <section className="bg-brand-light-gray py-12 md:py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-8 h-8 text-brand-red" />
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black">The risk is ours</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-bold text-brand-black mb-3">The fee comes off the invoice</h3>
              <p className="text-brand-gray leading-relaxed">{RISK_REVERSAL}</p>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-bold text-brand-black mb-3">We deliver, or we keep going</h3>
              <p className="text-brand-gray leading-relaxed">{DELIVERY_GUARANTEE}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-10 text-center">How it works</h2>
          <motion.div className="grid md:grid-cols-3 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {STEPS.map((s) => (
              <motion.div key={s.n} variants={fadeInUp} className="text-center">
                <div className="w-14 h-14 bg-brand-red text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">{s.n}</div>
                <h3 className="text-xl font-bold text-brand-black mb-2">{s.name}</h3>
                <p className="text-brand-gray text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-brand-light-gray py-12 md:py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-8">Clarity Blueprint — FAQ</h2>
          <SimpleFAQ items={OFFER_FAQS.map((f) => ({ question: f.q, answer: f.a }))} />
        </div>
      </section>

      <section className="bg-white py-12 md:py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">Find out what's actually breaking.</h2>
          <p className="text-base md:text-lg text-brand-gray mb-8">A 30-minute fit call with Jarrod or Mitch. If the Blueprint isn't right for you, we'll tell you.</p>
          <button
            onClick={open}
            className="inline-flex items-center gap-3 px-10 py-4 bg-brand-black text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 shadow-xl hover:scale-105 active:scale-95"
          >
            Book a fit call
            <ArrowRight className="w-5 h-5" />
          </button>
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
