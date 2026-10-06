import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Modal } from '../components/ui/Modal';
import { ContactForm } from '../components/ContactForm';
import { ThankYouModal } from '../components/ThankYouModal';
import { OFFER_PATH } from '../seo/offer';

const FOUNDERS = [
  {
    id: 'jarrod-tanko',
    name: 'Jarrod Tanko',
    role: 'Co-founder',
    photo: '/linkedin_profile_picture_(1).png',
    bio: [
      'Jarrod ran his own construction company at 21, then moved into site management for Tier 1 mining companies. He has seen the business from startup chaos to enterprise scale, and knows what it costs when quotes, decisions and information all route through one person.',
      'At PlanDepa he owns the front of the business: finding the right clients, understanding how their business really runs, and scoping what to fix first.',
    ],
    link: 'https://www.linkedin.com/in/jarrod-tanko-104943267/',
    writes: [
      { title: 'What AI can actually do for a 20-person builder', to: '/blog/ai-for-construction-companies' },
      { title: "The Can't-Leave-For-A-Week Test", to: '/blog/cant-leave-for-a-week-test' },
    ],
  },
  {
    id: 'mitch-humphries',
    name: 'Mitch Humphries',
    role: 'Co-founder',
    photo: '/mitch_profile_picture.png',
    bio: [
      'Mitch started as a carpenter and became State Manager in building and restoration. He ran multiple crews and learned first-hand that systems make or break a business that is trying to scale.',
      'At PlanDepa he owns the back of the business: designing the systems, building them, and making sure they hold once the team is using them.',
    ],
    link: 'https://www.linkedin.com/in/mitchell-humphries-8436ab37b/',
    writes: [
      { title: 'Four tools, zero answers: building a source of truth', to: '/blog/construction-software-source-of-truth' },
      { title: "Pete's Tuesday: one day inside a Clarity Day", to: '/blog/clarity-day-walkthrough' },
    ],
  },
];

const PRINCIPLES = [
  { name: 'Construction only', desc: 'We work with builders and trades with 10 to 50 staff. Our frameworks, examples and advice are all built around how construction businesses actually run.' },
  { name: 'Tool agnostic', desc: 'We recommend what fits your size and team, often the tools you already pay for, and we are an official Buildxact implementation partner when Buildxact is the right answer.' },
  { name: 'Honest about fit', desc: 'If we are not the right people for your business, or the problem is not one that AI or better systems will fix, we say so before you spend anything.' },
];

export function AboutPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const open = () => setIsContactModalOpen(true);

  return (
    <>
      <section className="bg-brand-off-white px-6 py-14 md:py-24">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-semibold text-brand-red uppercase tracking-wider mb-4">About PlanDepa</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-black leading-[1.05] mb-6">
            Two founders who have worked inside the businesses we fix.
          </h1>
          <p className="text-lg md:text-xl text-brand-gray max-w-3xl leading-relaxed">
            PlanDepa implements AI and operational systems for construction companies with 10 to 50 staff. We are based in Brisbane, work in
            person across Brisbane and Newcastle, and work Australia-wide through the Clarity Intensive.
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto space-y-16">
          {FOUNDERS.map((f) => (
            <article key={f.id} id={f.id} className="grid md:grid-cols-5 gap-8 md:gap-12 scroll-mt-28">
              <img src={f.photo} alt={`${f.name}, ${f.role} of PlanDepa`} width={320} height={320} className="md:col-span-2 w-full aspect-square object-cover rounded-lg" loading="lazy" />
              <div className="md:col-span-3">
                <h2 className="text-3xl md:text-4xl font-extrabold text-brand-black">{f.name}</h2>
                <p className="text-sm font-semibold text-brand-red uppercase tracking-wider mt-1 mb-5">{f.role}, PlanDepa</p>
                {f.bio.map((para) => (
                  <p key={para} className="text-brand-gray text-lg leading-relaxed mb-4">{para}</p>
                ))}
                <p className="text-sm font-semibold text-brand-black mt-6 mb-2">Writes about</p>
                <ul className="mb-5">
                  {f.writes.map((w) => (
                    <li key={w.to} className="border-t border-gray-200 py-2">
                      <Link to={w.to} className="text-brand-red font-semibold hover:underline">{w.title}</Link>
                    </li>
                  ))}
                </ul>
                <a href={f.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-brand-black hover:text-brand-red underline underline-offset-4">
                  {f.name} on LinkedIn
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-brand-off-white px-6 py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-black mb-4">Qualifications</h2>
          <p className="text-brand-gray text-lg leading-relaxed max-w-3xl mb-10">
            Between us we hold Diplomas in Project Management, Health and Safety, and Building and Construction. PlanDepa is an official
            Buildxact implementation partner.
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-black mb-8">How we work</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {PRINCIPLES.map((p) => (
              <div key={p.name} className="bg-white border border-gray-200 border-t-4 border-t-brand-black rounded-lg p-6">
                <h3 className="text-xl font-bold text-brand-black mb-2">{p.name}</h3>
                <p className="text-brand-gray leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:py-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-extrabold text-brand-black mb-4">Contact</h2>
            <dl className="space-y-3 text-brand-gray text-lg">
              <div><dt className="text-sm font-semibold text-brand-black">Based in</dt><dd>Brisbane, Queensland</dd></div>
              <div><dt className="text-sm font-semibold text-brand-black">Works in person</dt><dd>Brisbane, South East Queensland, Newcastle and the Hunter</dd></div>
              <div><dt className="text-sm font-semibold text-brand-black">Email</dt><dd><a href="mailto:admin@plandepa.com" className="text-brand-red font-semibold hover:underline">admin@plandepa.com</a></dd></div>
              <div><dt className="text-sm font-semibold text-brand-black">Phone</dt><dd><a href="tel:+61447733216" className="text-brand-red font-semibold hover:underline">+61 447 733 216</a></dd></div>
            </dl>
          </div>
          <div className="bg-brand-black text-white rounded-lg p-8 self-start">
            <h2 className="text-2xl font-extrabold mb-3">Find out what is actually breaking.</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">Start with the Clarity Blueprint, or book a 30 minute fit call first.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to={OFFER_PATH} className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-red text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">
                See the Clarity Blueprint <ArrowRight className="w-4 h-4" />
              </Link>
              <button onClick={open} className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-brand-black transition-colors">
                Book a fit call
              </button>
            </div>
          </div>
        </div>
      </section>

      <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} title="Book a fit call">
        <ContactForm
          source="contact"
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
