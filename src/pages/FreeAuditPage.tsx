import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { SimpleFAQ } from '../components/SimpleFAQ';
import { AngleDivider } from '../components/ui/AngleDivider';
import { SectionNumber } from '../components/SectionNumber';
import { CurvedArrow } from '../components/ui/CurvedArrow';

export function FreeAuditPage() {
  const faqItems = [
    {
      question: 'Is it really 100% free?',
      answer: 'Yeah, totally free. No credit card, no catch, nothing. We give you real insights whether you hire us or not. We just want to help construction businesses do better.',
    },
    {
      question: 'Do I need to prepare anything?',
      answer: 'Nah, not really. If you want, jot down what\'s frustrating you right now and what you\'re trying to achieve. But we\'ll walk you through everything anyway.',
    },
    {
      question: 'What if I\'m not ready to do anything yet?',
      answer: 'No worries. You still get the full plan and can do it yourself, use your own people, or come back to us later. It\'s yours to keep.',
    },
    {
      question: 'Can I bring my team?',
      answer: 'Definitely. Actually it\'s better if you bring the people who deal with the day-to-day stuff - your operations manager, admin person, whoever.',
    },
  ];

  return (
    <>
      <section className="bg-brand-off-white py-12 md:py-16 px-6" style={{ position: 'relative', zIndex: 1 }}>
        <div className="max-w-7xl mx-auto">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm md:text-base text-brand-gray hover:text-brand-black mb-8 md:mb-12 group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </a>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-black mb-4 md:mb-6">
            Free Business Check-Up
          </h1>
          <p className="text-base md:text-lg text-brand-gray max-w-3xl mb-8 md:mb-12 leading-relaxed">
            We'll look at how your business runs, find where you're wasting time, and show you exactly how to fix it. No obligation, no credit card, no BS. Just real advice you can use right away.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 md:gap-3 px-8 py-3.5 md:px-10 md:py-4 bg-brand-black text-white font-semibold text-sm md:text-base rounded-lg hover:bg-gray-800 transition-all duration-300 apple-ease shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
          >
            Book your free audit
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 apple-ease" />
          </a>
        </div>
      </section>

      <AngleDivider direction="down-right" fromColor="#FAFAFA" toColor="#FFFFFF" height={100} />

      <section className="bg-white py-12 md:py-16 px-6" style={{ position: 'relative', zIndex: 2 }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <div className="mb-6 md:mb-8">
                <SectionNumber number="00" label="Challenge" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-6 md:mb-8">
                The Problem
              </h2>
              <ul className="space-y-3 md:space-y-4">
                <li className="flex items-start gap-3 text-sm md:text-base text-brand-gray leading-relaxed">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-black flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <span>You're buried in paperwork instead of being on the tools</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-brand-gray leading-relaxed">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-black flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <span>You keep hearing about tech that could help but don't know where to start</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-brand-gray leading-relaxed">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-black flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <span>Sick of salespeople trying to sell you stuff you don't need</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-brand-gray leading-relaxed">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-black flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <span>You want to see the dollars and cents before spending anything</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-brand-gray leading-relaxed">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-black flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <span>Your crew hates learning new systems</span>
                </li>
              </ul>
            </div>

            <div>
              <div className="mb-6 md:mb-8">
                <SectionNumber number="01" label="Solution" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-4 md:mb-6">
                What We Do
              </h2>
              <p className="text-sm md:text-base text-brand-gray mb-6 leading-relaxed">
                Here's what we do:
              </p>
              <ul className="space-y-3 md:space-y-4">
                <li className="flex items-start gap-3 text-sm md:text-base text-brand-gray leading-relaxed">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-black flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <span>Look at how you're doing things now and spot the time-wasters</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-brand-gray leading-relaxed">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-black flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <span>Find at least 10 hours a week you can get back straight away</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-brand-gray leading-relaxed">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-black flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <span>Make a simple plan that fits exactly what you do</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-brand-gray leading-relaxed">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-black flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <span>Tell you honestly what tools are worth it (and which aren't)</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-brand-gray leading-relaxed">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-black flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <span>Show you exactly what to do next and how long it'll take</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-brand-gray leading-relaxed">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-black flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <span>Work out how much money this will save you based on your real costs</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 lg:mt-20 flex justify-center">
            <div className="max-w-2xl w-full">
              <div className="mb-6 md:mb-8 flex justify-center">
                <SectionNumber number="02" label="Impact" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-6 md:mb-8 text-center">
                The Results
              </h2>
              <ul className="space-y-3 md:space-y-4">
                <li className="flex items-start gap-3 text-sm md:text-base text-brand-gray leading-relaxed">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-black flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <span>Over 200 construction companies have done this with us</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-brand-gray leading-relaxed">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-black flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <span>Most clients save about 500 hours every year</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-brand-gray leading-relaxed">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-black flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <span>Most go from losing 8 out of 10 quotes to winning 4 out of 10</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-brand-gray leading-relaxed">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-black flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <span>Completely free, no strings attached</span>
                </li>
                <li className="flex items-start gap-3 text-sm md:text-base text-brand-gray leading-relaxed">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-black flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <span>You get a proper plan whether you hire us or not</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <AngleDivider direction="up-right" fromColor="#FFFFFF" toColor="#F5F5F5" height={100} />

      <section className="bg-brand-light-gray py-12 md:py-16 px-6" style={{ position: 'relative', zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 md:mb-8">
            <SectionNumber number="03" label="For You" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-8 md:mb-12">
            This audit is perfect if you:
          </h2>
          <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 md:w-4 md:h-4 text-white" strokeWidth={3} />
              </div>
              <p className="text-sm md:text-base text-brand-gray leading-relaxed">
                You've got between 5 and 50 people working for you
              </p>
            </div>
            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 md:w-4 md:h-4 text-white" strokeWidth={3} />
              </div>
              <p className="text-sm md:text-base text-brand-gray leading-relaxed">
                You're doing more than 10 hours of paperwork every week
              </p>
            </div>
            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 md:w-4 md:h-4 text-white" strokeWidth={3} />
              </div>
              <p className="text-sm md:text-base text-brand-gray leading-relaxed">
                You've heard about new tech but have no idea where to begin
              </p>
            </div>
            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 md:w-4 md:h-4 text-white" strokeWidth={3} />
              </div>
              <p className="text-sm md:text-base text-brand-gray leading-relaxed">
                You want straight talk, not some salesman's pitch
              </p>
            </div>
            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 md:w-4 md:h-4 text-white" strokeWidth={3} />
              </div>
              <p className="text-sm md:text-base text-brand-gray leading-relaxed">
                You'll act on it if the numbers make sense
              </p>
            </div>
          </div>

          <p className="text-sm md:text-base text-brand-gray text-center">
            Not sure if this is for you?{' '}
            <a href="#contact" className="text-brand-red hover:underline font-semibold transition-colors">
              Book a quick 15-minute call →
            </a>
          </p>
        </div>
      </section>

      <AngleDivider direction="down-right" fromColor="#F5F5F5" toColor="#FFFFFF" height={100} />

      <section className="bg-white py-12 md:py-16 px-6" style={{ position: 'relative', zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 md:mb-8">
            <SectionNumber number="04" label="Process" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-10 md:mb-16">
            How the audit works
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-brand-black text-white flex items-center justify-center text-xl md:text-2xl font-bold mx-auto mb-4 md:mb-6">
                1
              </div>
              <h3 className="text-lg md:text-xl font-bold text-brand-black mb-2 md:mb-3">
                Book & Fill Form
              </h3>
              <p className="text-xs md:text-sm text-brand-gray font-semibold">
                15 seconds
              </p>
              <p className="text-xs md:text-sm text-brand-gray mt-2">
                Book a time and fill out a quick form
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-brand-black text-white flex items-center justify-center text-xl md:text-2xl font-bold mx-auto mb-4 md:mb-6">
                2
              </div>
              <h3 className="text-lg md:text-xl font-bold text-brand-black mb-2 md:mb-3">
                Discovery Call
              </h3>
              <p className="text-xs md:text-sm text-brand-gray font-semibold">
                Initial meeting
              </p>
              <p className="text-xs md:text-sm text-brand-gray mt-2">
                Tell us what's actually slowing you down
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-brand-black text-white flex items-center justify-center text-xl md:text-2xl font-bold mx-auto mb-4 md:mb-6">
                3
              </div>
              <h3 className="text-lg md:text-xl font-bold text-brand-black mb-2 md:mb-3">
                Right Fit Check
              </h3>
              <p className="text-xs md:text-sm text-brand-gray font-semibold">
                Qualification
              </p>
              <p className="text-xs md:text-sm text-brand-gray mt-2">
                We have a chat to make sure we're a good match
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-brand-black text-white flex items-center justify-center text-xl md:text-2xl font-bold mx-auto mb-4 md:mb-6">
                4
              </div>
              <h3 className="text-lg md:text-xl font-bold text-brand-black mb-2 md:mb-3">
                Free Audit & Roadmap
              </h3>
              <p className="text-xs md:text-sm text-brand-gray font-semibold">
                Complete process
              </p>
              <p className="text-xs md:text-sm text-brand-gray mt-2">
                We do the full check-up and give you a clear plan
              </p>
            </div>
          </div>
        </div>
      </section>

      <AngleDivider direction="up-right" fromColor="#FFFFFF" toColor="#F5F5F5" height={100} />

      <section className="bg-brand-light-gray py-12 md:py-16 px-6" style={{ position: 'relative', zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 md:mb-8">
            <SectionNumber number="05" label="FAQ" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-8 md:mb-12">
            Common questions about the audit
          </h2>
          <SimpleFAQ items={faqItems} />
        </div>
      </section>

      <AngleDivider direction="down-right" fromColor="#F5F5F5" toColor="#FFFFFF" height={100} />

      <section id="contact" className="bg-white py-12 md:py-16 px-6" style={{ position: 'relative', zIndex: 10 }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-black mb-4 md:mb-6">
            Ready to see what's possible?
          </h2>
          <p className="text-base md:text-lg text-brand-gray mb-8 md:mb-12 max-w-2xl mx-auto">
            Let's have a look at your business
          </p>
          <a
            href="mailto:admin@plandepa.com?subject=Free AI Strategy Audit"
            className="inline-flex items-center gap-2 md:gap-3 px-8 py-3.5 md:px-10 md:py-4 bg-brand-black text-white font-semibold text-sm md:text-base rounded-lg hover:bg-gray-800 transition-all duration-300 apple-ease shadow-md hover:shadow-lg mb-6 md:mb-8 hover:scale-105 active:scale-95"
          >
            Book your free audit
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 apple-ease" />
          </a>
          <p className="text-xs md:text-sm text-brand-gray">
            No credit card. No obligation.
          </p>
        </div>
      </section>
    </>
  );
}
