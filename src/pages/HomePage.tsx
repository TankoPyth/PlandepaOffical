import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SimpleFAQ } from '../components/SimpleFAQ';
import { Modal } from '../components/ui/Modal';
import { ContactForm } from '../components/ContactForm';
import { ThankYouModal } from '../components/ThankYouModal';
import { StickyWorkflowBar } from '../components/StickyWorkflowBar';
import { HOME_FAQS } from '../seo/site';
import { OFFER_PATH, RISK_REVERSAL, TIERS, formatPrice } from '../seo/offer';

const SYMPTOMS = [
  'Every quote, decision and problem still routes through you.',
  'Four tools, and none of them agree on what is happening.',
  'Nobody knows the job status until someone rings.',
  'You cannot leave for a week without something slipping.',
];

const TIER_BLURB: Record<string, string> = {
  sprint: 'Three hours, virtual. Confirms where the problem is and what to fix first.',
  day: 'One day in person with you and your team. The full map of how the business runs.',
  intensive: 'Up to two days, Australia-wide. For multiple departments or sites.',
};

const WORK = [
  { n: '01', name: 'Enquiry capture and follow-up', desc: 'Every enquiry in one place, answered fast, chased automatically.' },
  { n: '02', name: 'Quotes that go out the same day', desc: 'Templated, consistent, and followed up without anyone remembering to.' },
  { n: '03', name: 'Variations signed off first', desc: 'Captured on site, priced, approved before the work starts.' },
  { n: '04', name: 'Clean handover to site', desc: 'What was sold is what the supervisor starts with. Nothing lost in between.' },
  { n: '05', name: 'Reporting you do not have to ask for', desc: 'Pipeline, job progress and costs in one view that updates itself.' },
  { n: '06', name: 'Procedures written down', desc: 'How the business actually runs, in one place, kept current.' },
];

const FOUNDERS = [
  {
    name: 'Jarrod Tanko',
    role: 'Co-founder',
    photo: '/linkedin_profile_picture_(1).png',
    bio: 'Ran his own construction company at 21, then moved into site management for Tier 1 mining companies. Has seen the business from startup chaos to enterprise scale.',
    link: 'https://www.linkedin.com/in/jarrod-tanko-104943267/',
  },
  {
    name: 'Mitch Humphries',
    role: 'Co-founder',
    photo: '/mitch_profile_picture.png',
    bio: 'Carpenter to State Manager in building and restoration. Ran multiple crews and learned that systems make or break scaling.',
    link: 'https://www.linkedin.com/in/mitchell-humphries-8436ab37b/',
  },
];

const btnRed = 'inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-red text-white font-semibold rounded-lg hover:bg-red-700 transition-colors';
const btnLine = 'inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-brand-black text-brand-black font-semibold rounded-lg hover:bg-brand-black hover:text-white transition-colors';
const eyebrow = 'text-sm font-semibold text-brand-red uppercase tracking-wider mb-4';

export function HomePage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const open = () => setIsContactModalOpen(true);

  return (
    <>
      {/* HERO */}
      <section className="bg-brand-off-white px-6 py-14 md:py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3">
            <p className={eyebrow}>AI and systems for construction companies</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-black leading-[1.05] mb-6">
              Your construction business should run without you.
            </h1>
            <p className="text-lg md:text-xl text-brand-gray max-w-2xl mb-8 leading-relaxed">
              PlanDepa implements AI and operational systems for builders and trades with 10 to 50 staff. We find what is breaking, fix the
              first workflow, and stay on to make it stick.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-5">
              <Link to={OFFER_PATH} className={btnRed}>
                See the Clarity Blueprint <ArrowRight className="w-5 h-5" />
              </Link>
              <button onClick={open} className={btnLine}>Book a fit call</button>
            </div>
            <p className="text-sm text-brand-gray">Based in Brisbane. In person across Brisbane and Newcastle. Australia-wide with the Clarity Intensive.</p>
          </div>

          <div className="lg:col-span-2 bg-brand-black text-white rounded-lg p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-1">Start here</p>
            <h2 className="text-2xl font-bold mb-6">The Clarity Blueprint</h2>
            <ul className="divide-y divide-white/15">
              {TIERS.map((t) => (
                <li key={t.id} className="py-4 flex items-baseline justify-between gap-4">
                  <span className="font-semibold">
                    {t.name}
                    {t.recommended && <span className="ml-2 text-xs font-semibold text-red-400 uppercase tracking-wider">Recommended</span>}
                  </span>
                  <span className="text-lg font-bold whitespace-nowrap">
                    {formatPrice(t.price)} <span className="text-xs font-medium text-gray-400">+ GST</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-300 mt-5 leading-relaxed">The fee is credited if you choose us to implement the first workflow.</p>
          </div>
        </div>
      </section>

      {/* PROOF STRIP */}
      <section className="bg-white border-y border-gray-200 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          <p className="py-6 md:pr-8 text-brand-gray"><span className="block text-2xl font-bold text-brand-black">1,000+ hours</span>saved every month across client businesses</p>
          <p className="py-6 md:px-8 text-brand-gray"><span className="block text-2xl font-bold text-brand-black">Buildxact partner</span>Official implementation and training</p>
          <p className="py-6 md:pl-8 text-brand-gray"><span className="block text-2xl font-bold text-brand-black">Founders on every job</span>Jarrod and Mitch, not a junior team</p>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <p className={eyebrow}>The problem</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-brand-black leading-tight mb-6">Your quotes go out late and nobody chases them.</h2>
            <p className="text-brand-gray text-lg leading-relaxed mb-4">
              Most construction businesses with 10 to 50 staff outgrew their systems a while ago. The work gets done and the money is decent,
              but it all runs on memory, group chats and the owner.
            </p>
            <p className="text-brand-gray text-lg leading-relaxed">That is why the business can only stretch. It cannot grow.</p>
          </div>
          <ul className="self-center">
            {SYMPTOMS.map((s) => (
              <li key={s} className="border-t border-gray-200 last:border-b py-5 text-xl font-semibold text-brand-black leading-snug">{s}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* BLUEPRINT */}
      <section id="clarity-blueprint" className="bg-brand-off-white px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <p className={eyebrow}>Where it starts</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-brand-black leading-tight mb-4 max-w-3xl">Pay for the truth about your business.</h2>
          <p className="text-lg text-brand-gray max-w-3xl mb-12 leading-relaxed">
            The Clarity Blueprint is a paid diagnostic that shows exactly where time, margin, missed work and your own hours are leaking, and
            names the first workflow to fix. It turns straight into implementation.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {TIERS.map((t) => (
              <div key={t.id} className={`bg-white rounded-lg p-8 border border-gray-200 border-t-4 ${t.recommended ? 'border-t-brand-red' : 'border-t-brand-black'}`}>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-red h-4 mb-2">{t.recommended ? 'Recommended' : ''}</p>
                <h3 className="text-2xl font-bold text-brand-black mb-2">{t.name}</h3>
                <p className="text-4xl font-extrabold text-brand-black mb-1">
                  {formatPrice(t.price)} <span className="text-sm font-medium text-brand-gray">+ GST</span>
                </p>
                <p className="text-sm text-brand-gray mb-5">{t.format}</p>
                <p className="text-brand-gray leading-relaxed">{TIER_BLURB[t.id]}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between border-t border-gray-300 pt-8">
            <p className="text-brand-gray max-w-3xl leading-relaxed">
              <strong className="text-brand-black">The fee comes off the invoice.</strong> {RISK_REVERSAL}
            </p>
            <Link to={OFFER_PATH} className={`${btnRed} whitespace-nowrap`}>See everything included</Link>
          </div>
        </div>
      </section>

      {/* WHAT WE IMPLEMENT */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <p className={eyebrow}>Then we build it</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-brand-black leading-tight mb-12 max-w-3xl">We fix the first workflow properly, then the next.</h2>
          <div className="grid md:grid-cols-2 gap-x-16">
            {WORK.map((w) => (
              <div key={w.n} className="border-t border-gray-200 py-6 flex gap-6">
                <span className="text-sm font-bold text-brand-red pt-1">{w.n}</span>
                <div>
                  <h3 className="text-xl font-bold text-brand-black mb-1">{w.name}</h3>
                  <p className="text-brand-gray leading-relaxed">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-brand-gray">
            See how this works for <Link to="/enquiry-automation" className="text-brand-red font-semibold hover:underline">enquiry automation</Link>, or
            read <Link to="/blog/ai-for-construction-companies" className="text-brand-red font-semibold hover:underline">what AI can actually do for a builder</Link>.
          </p>
        </div>
      </section>

      {/* FOUNDERS */}
      <section className="bg-brand-off-white px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <p className={eyebrow}>Who you work with</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-brand-black leading-tight mb-12 max-w-3xl">Two people. Both on your job.</h2>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            {FOUNDERS.map((f) => (
              <div key={f.name} className="grid sm:grid-cols-5 gap-6 items-start">
                <img src={f.photo} alt={f.name} width={280} height={280} className="sm:col-span-2 w-full aspect-square object-cover rounded-lg" loading="lazy" />
                <div className="sm:col-span-3">
                  <h3 className="text-2xl font-bold text-brand-black">{f.name}</h3>
                  <p className="text-sm font-semibold text-brand-red uppercase tracking-wider mb-3">{f.role}</p>
                  <p className="text-brand-gray leading-relaxed mb-4">{f.bio}</p>
                  <a href={f.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-brand-black hover:text-brand-red underline underline-offset-4">
                    LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-10 text-brand-gray max-w-3xl leading-relaxed">
            Between us we hold Diplomas in Project Management, Health and Safety, and Building and Construction. We have worked inside the
            businesses we now fix, so we know what actually breaks. <Link to="/about" className="text-brand-red font-semibold hover:underline">More about us</Link>.
          </p>
        </div>
      </section>

      {/* OTHER WAYS IN */}
      <section className="bg-white px-6 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-8">Not ready for a Blueprint?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/pilot-program" className="border border-gray-200 rounded-lg p-8 hover:border-brand-black transition-colors">
              <h3 className="text-xl font-bold text-brand-black mb-2">Try a 28-day pilot</h3>
              <p className="text-brand-gray mb-4 leading-relaxed">Pick one bottleneck and we build control around it in four weeks. Prove the value before you commit to more.</p>
              <span className="text-brand-red font-semibold inline-flex items-center gap-2">See the pilots <ArrowRight className="w-4 h-4" /></span>
            </Link>
            <Link to="/roi-calculator" className="border border-gray-200 rounded-lg p-8 hover:border-brand-black transition-colors">
              <h3 className="text-xl font-bold text-brand-black mb-2">Work out what admin costs you</h3>
              <p className="text-brand-gray mb-4 leading-relaxed">Three questions and two minutes. A rough yearly number for the time your team spends on quoting and admin.</p>
              <span className="text-brand-red font-semibold inline-flex items-center gap-2">Use the calculator <ArrowRight className="w-4 h-4" /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-brand-off-white px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className={eyebrow}>Questions</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-brand-black leading-tight mb-10">What owners ask before they book.</h2>
          <SimpleFAQ items={HOME_FAQS.map((f) => ({ question: f.q, answer: f.a }))} />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-brand-black text-white px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 max-w-2xl">Find out what is actually breaking.</h2>
            <p className="text-lg text-gray-300 max-w-xl leading-relaxed">A 30 minute call with Jarrod or Mitch. If the Blueprint is not right for you, we will say so.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to={OFFER_PATH} className={btnRed}>See the Clarity Blueprint</Link>
            <button onClick={open} className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-brand-black transition-colors">
              Book a fit call
            </button>
          </div>
        </div>
      </section>

      <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} title="Book a fit call">
        <ContactForm
          source="homepage"
          onSuccess={() => {
            setTimeout(() => {
              setIsContactModalOpen(false);
              setShowThankYou(true);
            }, 1500);
          }}
        />
      </Modal>
      <ThankYouModal isOpen={showThankYou} onClose={() => setShowThankYou(false)} />
      <StickyWorkflowBar />
    </>
  );
}
