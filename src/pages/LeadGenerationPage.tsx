import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { SimpleFAQ } from '../components/SimpleFAQ';
import { StatCard } from '../components/StatCard';
import { AngleDivider } from '../components/ui/AngleDivider';
import { fadeInUp, staggerContainer, staggerItem, appleEasing } from '../utils/animations';
import { SEO } from '../components/SEO';
import { StructuredData, breadcrumbSchema } from '../components/StructuredData';
import { Modal } from '../components/ui/Modal';
import { ContactForm } from '../components/ContactForm';
import { ThankYouModal } from '../components/ThankYouModal';

export function LeadGenerationPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const faqItems = [
    {
      question: 'How much does it cost?',
      answer: 'Depends on your situation - where you are, what trade you\'re in, and what size jobs you want. Have a chat with us and we\'ll put together a package that makes sense for you.',
    },
    {
      question: 'How many leads will I get?',
      answer: 'Usually somewhere between 15-40 good leads every month. Depends on your area, trade, and what you want to spend. We\'re more about quality than quantity.',
    },
    {
      question: 'What if the leads are duds?',
      answer: 'If you don\'t make back 10 times what you spent within 3 months, we keep working for free until you do. Simple as that.',
    },
    {
      question: 'Do I need to change everything I\'m doing now?',
      answer: 'Nah. We can usually work with what you\'ve got. If you need better stuff, we\'ll help you upgrade. But we\'ll work with your current setup.',
    },
    {
      question: 'How long till I see something happening?',
      answer: 'Most people get their first good leads within 2-3 weeks. Takes about 2-3 months to really dial it in and get it humming properly.',
    },
  ];

  const leadGenBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://plandepa.com/' },
    { name: 'Lead Generation', url: 'https://plandepa.com/lead-generation' },
  ]);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Construction Lead Generation',
    provider: {
      '@type': 'Organization',
      name: 'Plandepa',
    },
    areaServed: ['Brisbane', 'Sydney', 'Newcastle', 'Australia'],
    description: 'Guaranteed lead generation system for construction companies in Brisbane, Sydney, and across Australia. Get 15-40 quality leads per month or we work for free until you achieve 10X ROI.',
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
        title="Construction Lead Generation Brisbane Sydney | Guaranteed Results"
        description="Guaranteed construction lead generation for Brisbane, Sydney & Newcastle builders. Get 15-40 quality leads/month. 10X ROI guarantee or we work free. Buildxact partner."
        keywords="construction lead generation Brisbane, construction leads Sydney, builder lead generation Australia, construction marketing Brisbane, qualified construction leads, contractor lead generation Sydney, home builder leads Newcastle"
      />
      <StructuredData data={[leadGenBreadcrumb, serviceSchema, faqSchema]} />
      <section className="bg-brand-off-white py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm md:text-base text-brand-gray hover:text-brand-black mb-8 md:mb-12 group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </a>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-black mb-4 md:mb-6">
            Get More Quality Leads
          </h1>
          <p className="text-base md:text-lg text-brand-gray max-w-3xl mb-8 md:mb-12 leading-relaxed">
            Stop waiting for the phone to ring. We bring serious buyers straight to you - people who are actually ready to build, not just kicking tyres.
          </p>
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="inline-flex items-center gap-2 md:gap-3 px-8 py-3.5 md:px-10 md:py-4 bg-brand-black text-white font-semibold text-sm md:text-base rounded-lg hover:bg-gray-800 transition-all duration-300 apple-ease shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
          >
            Request consultation
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 apple-ease" />
          </button>
        </div>
      </section>

      <AngleDivider direction="down-right" fromColor="#FAFAFA" toColor="#FFFFFF" height={100} />

      <section className="bg-white py-12 md:py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-display-sm font-bold text-brand-black mb-12">
            Why the old ways don't work anymore
          </h2>

          <div className="space-y-6 bg-red-50 border-l-4 border-brand-red p-8 rounded-r-xl">
            <div className="flex items-start gap-4">
              <X className="w-6 h-6 text-brand-red flex-shrink-0 mt-1" />
              <p className="text-body-lg text-brand-gray">
                You pay for Google ads but get time-wasters who aren't serious
              </p>
            </div>
            <div className="flex items-start gap-4">
              <X className="w-6 h-6 text-brand-red flex-shrink-0 mt-1" />
              <p className="text-body-lg text-brand-gray">
                People asking for quotes with no intention of building
              </p>
            </div>
            <div className="flex items-start gap-4">
              <X className="w-6 h-6 text-brand-red flex-shrink-0 mt-1" />
              <p className="text-body-lg text-brand-gray">
                Some months you're flat out, others you're scrambling
              </p>
            </div>
            <div className="flex items-start gap-4">
              <X className="w-6 h-6 text-brand-red flex-shrink-0 mt-1" />
              <p className="text-body-lg text-brand-gray">
                You've got no idea what work is coming next month
              </p>
            </div>
            <div className="flex items-start gap-4">
              <X className="w-6 h-6 text-brand-red flex-shrink-0 mt-1" />
              <p className="text-body-lg text-brand-gray">
                You're spending heaps on marketing with bugger all to show for it
              </p>
            </div>
          </div>
        </div>
      </section>

      <AngleDivider direction="up-right" fromColor="#FFFFFF" toColor="#F5F5F5" height={100} />

      <section className="bg-brand-light-gray py-12 md:py-16 px-6" >
        <div className="max-w-5xl mx-auto">
          <div className="space-y-20">
            <div>
              <h2 className="text-heading-lg font-bold text-brand-black mb-2 border-b-4 border-brand-black inline-block pb-2">
                Challenge
              </h2>
              <p className="mt-8 text-body-lg text-brand-gray leading-relaxed">
                You're banking on word-of-mouth and crossing your fingers the phone rings. You never know what's coming in. You waste hours on people who go quiet or just want the cheapest price, no matter what.
              </p>
            </div>

            <div>
              <h2 className="text-heading-lg font-bold text-brand-black mb-2 border-b-4 border-brand-black inline-block pb-2">
                Solution
              </h2>
              <p className="mt-8 text-body-lg text-brand-gray mb-6 leading-relaxed">
                We set up a system that finds potential customers from different places, works out who's serious and who's not, asks them the right questions automatically, and only sends you the ones who are actually ready to start building.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-body-lg text-brand-gray leading-relaxed">
                  <span className="text-brand-black text-2xl">•</span>
                  <span>
                    We find leads from Google, Facebook, trade websites, and referrals
                  </span>
                </li>
                <li className="flex items-start gap-3 text-body-lg text-brand-gray leading-relaxed">
                  <span className="text-brand-black text-2xl">•</span>
                  <span>
                    We work out if they have the money, when they want to start, and if they can actually say yes
                  </span>
                </li>
                <li className="flex items-start gap-3 text-body-lg text-brand-gray leading-relaxed">
                  <span className="text-brand-black text-2xl">•</span>
                  <span>They answer important questions before we send them to you</span>
                </li>
                <li className="flex items-start gap-3 text-body-lg text-brand-gray leading-relaxed">
                  <span className="text-brand-black text-2xl">•</span>
                  <span>Everything gets tracked and organized automatically</span>
                </li>
                <li className="flex items-start gap-3 text-body-lg text-brand-gray leading-relaxed">
                  <span className="text-brand-black text-2xl">•</span>
                  <span>We keep in touch with people who aren't ready yet until they are</span>
                </li>
                <li className="flex items-start gap-3 text-body-lg text-brand-gray leading-relaxed">
                  <span className="text-brand-black text-2xl">•</span>
                  <span>We send you weekly updates and keep making it better</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-heading-lg font-bold text-brand-black mb-2 border-b-4 border-brand-black inline-block pb-2">
                Impact
              </h2>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-3 text-body-lg text-brand-gray leading-relaxed">
                  <span className="text-brand-black text-2xl">•</span>
                  <span>Most clients close 4 out of 10 leads (way better than the usual 1-2 out of 10)</span>
                </li>
                <li className="flex items-start gap-3 text-body-lg text-brand-gray leading-relaxed">
                  <span className="text-brand-black text-2xl">•</span>
                  <span>Usually 156 solid leads over 6 months</span>
                </li>
                <li className="flex items-start gap-3 text-body-lg text-brand-gray leading-relaxed">
                  <span className="text-brand-black text-2xl">•</span>
                  <span>Saves about 3.5 hours per lead compared to cold calling</span>
                </li>
                <li className="flex items-start gap-3 text-body-lg text-brand-gray leading-relaxed">
                  <span className="text-brand-black text-2xl">•</span>
                  <span>You can actually plan ahead because you know what's coming</span>
                </li>
                <li className="flex items-start gap-3 text-body-lg text-brand-gray leading-relaxed">
                  <span className="text-brand-black text-2xl">•</span>
                  <span>For every dollar you spend, you get ten back within 3 months (guaranteed)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <AngleDivider direction="down-right" fromColor="#F5F5F5" toColor="#FFFFFF" height={100} />

      <section className="bg-white py-12 md:py-16 px-6" >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-display-sm font-bold text-brand-black mb-16 text-center">
            Here's how it actually works
          </h2>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-black text-white flex items-center justify-center text-heading-md font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-heading-sm font-bold text-brand-black mb-3">
                Capture
              </h3>
              <p className="text-body-md text-brand-gray">
                We find your perfect customers from different places
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-black text-white flex items-center justify-center text-heading-md font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-heading-sm font-bold text-brand-black mb-3">
                Work Out Who's Serious
              </h3>
              <p className="text-body-md text-brand-gray">
                Check if they have money, a timeline, and are ready to go
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-black text-white flex items-center justify-center text-heading-md font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-heading-sm font-bold text-brand-black mb-3">
                Qualify
              </h3>
              <p className="text-body-md text-brand-gray">
                Filter out the time-wasters automatically
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-black text-white flex items-center justify-center text-heading-md font-bold mx-auto mb-6">
                4
              </div>
              <h3 className="text-heading-sm font-bold text-brand-black mb-3">
                Deliver
              </h3>
              <p className="text-body-md text-brand-gray">
                Only serious buyers land in your inbox
              </p>
            </div>
          </div>
        </div>
      </section>

      <AngleDivider direction="up-right" fromColor="#FFFFFF" toColor="#F5F5F5" height={80} />

      <section className="bg-brand-light-gray py-12 md:py-16 px-6" >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-display-sm font-bold text-brand-black mb-12 text-center">
            Average performance across our clients
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <StatCard value="8.5/10" label="Lead Quality Score" />
            <StatCard value="38%" label="Conversion Rate" />
            <StatCard value="3.5 hrs" label="Time Saved Per Lead" />
          </div>
        </div>
      </section>

      <AngleDivider direction="down-right" fromColor="#F5F5F5" toColor="#FFFFFF" height={100} />

      <section className="bg-white py-12 md:py-16 px-6" >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-display-sm font-bold text-brand-black mb-12">
            What makes someone worth your time
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-heading-sm font-bold text-brand-black mb-6">
                We look for:
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-accent-green flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-body-lg text-brand-gray">
                    They have the money (meets your minimum job size)
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-accent-green flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-body-lg text-brand-gray">
                    They want to start in the next 3 months
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-accent-green flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-body-lg text-brand-gray">
                    They can actually say yes and sign the contract
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-accent-green flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-body-lg text-brand-gray">
                    The work matches what you're good at
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-accent-green flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-body-lg text-brand-gray">
                    They're in your area
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-heading-sm font-bold text-brand-black mb-6">
                We filter out:
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <X className="w-8 h-8 text-brand-red flex-shrink-0 mt-1" />
                  <p className="text-body-lg text-brand-gray">
                    People just hunting for the cheapest price
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <X className="w-8 h-8 text-brand-red flex-shrink-0 mt-1" />
                  <p className="text-body-lg text-brand-gray">
                    People who are "just looking" with no real plans
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <X className="w-8 h-8 text-brand-red flex-shrink-0 mt-1" />
                  <p className="text-body-lg text-brand-gray">
                    Jobs that are too small or too big for you
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <X className="w-8 h-8 text-brand-red flex-shrink-0 mt-1" />
                  <p className="text-body-lg text-brand-gray">
                    People too far away
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <X className="w-8 h-8 text-brand-red flex-shrink-0 mt-1" />
                  <p className="text-body-lg text-brand-gray">
                    DIYers wanting free tips
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AngleDivider direction="up-right" fromColor="#FFFFFF" toColor="#F5F5F5" height={100} />

      <section className="bg-brand-light-gray py-12 md:py-16 px-6" >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-display-sm font-bold text-brand-black mb-12 text-center">
            Our guarantee
          </h2>
          <div className="bg-white rounded-2xl p-12 shadow-xl text-center max-w-3xl mx-auto">
            <p className="text-body-xl text-brand-gray mb-8 leading-relaxed">
              We only win when you win. If you don't make back 10 times what you spent within 3 months, we keep working for free until you do.
            </p>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="inline-flex items-center gap-3 px-12 py-5 bg-brand-black text-white font-semibold text-body-lg rounded-full hover:bg-gray-800 transition-all duration-300 apple-ease shadow-xl hover:scale-105 active:scale-95"
            >
              Request consultation to discuss pricing
              <ArrowRight className="w-6 h-6 transition-transform duration-300 apple-ease" />
            </button>
            <p className="text-body-md text-brand-gray mt-8">
              Every business is different. We'll work out a plan that fits your area, what you do, and the size of jobs you want.
            </p>
          </div>
        </div>
      </section>

      <AngleDivider direction="down-right" fromColor="#F5F5F5" toColor="#FFFFFF" height={100} />

      <section className="bg-white py-12 md:py-16 px-6" >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-display-sm font-bold text-brand-black mb-16">
            Common questions about lead generation
          </h2>
          <SimpleFAQ items={faqItems} />
        </div>
      </section>

      <AngleDivider direction="up-right" fromColor="#FFFFFF" toColor="#FAFAFA" height={100} />

      <section id="contact" className="bg-brand-off-white py-12 md:py-16 px-6" >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-display-md font-bold text-brand-black mb-8">
            Ready to fill your pipeline?
          </h2>
          <p className="text-body-xl text-brand-gray mb-12 max-w-2xl mx-auto">
            Let's have a chat about your business and work out a plan that fits.
          </p>
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="inline-flex items-center gap-3 px-12 py-5 bg-brand-black text-white font-semibold text-body-lg rounded-full hover:bg-gray-800 transition-all duration-300 apple-ease shadow-xl mb-8 hover:scale-105 active:scale-95"
          >
            Request consultation
            <ArrowRight className="w-6 h-6 transition-transform duration-300 apple-ease" />
          </button>
          <p className="text-body-md text-brand-gray">
            Or call:{' '}
            <a href="tel:+1234567890" className="text-brand-black hover:text-brand-red font-semibold transition-colors duration-300 apple-ease">
              +61 447 733 216 or +61 411 521 102
            </a>
          </p>
        </div>
      </section>

      <Modal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="Request Consultation"
      >
        <ContactForm
          source="lead_generation"
          onSuccess={() => {
            setTimeout(() => {
              setIsContactModalOpen(false);
              setShowThankYou(true);
            }, 1000);
          }}
        />
      </Modal>

      <ThankYouModal
        isOpen={showThankYou}
        onClose={() => setShowThankYou(false)}
      />
    </>
  );
}
