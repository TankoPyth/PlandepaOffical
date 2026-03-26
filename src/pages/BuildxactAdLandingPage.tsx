import { motion } from 'framer-motion';
import { Shield, Clock, Hammer, BookOpen, Zap, CheckCircle2, ArrowRight, Linkedin, Calendar } from 'lucide-react';
import { SEO } from '../components/SEO';
import { fadeInUp, staggerContainer } from '../utils/animations';

export default function BuildxactAdLandingPage() {
  const handleBookCall = () => {
    window.scrollTo({ top: document.getElementById('calendly-section')?.offsetTop || 0, behavior: 'smooth' });
  };

  return (
    <>
      <SEO
        title="Cut Your Buildxact Quoting Time in Half | Custom Templates by Real Builders"
        description="Stop wasting 8 hours on every quote. Get a custom Buildxact template built by actual builders that cuts your time to 2 hours. 50% faster or it's free."
        canonical="/lp/buildxact-ad"
      />

      <div className="min-h-screen bg-white">
        {/* Simplified Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-brand-black/10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center">
              <img
                src="/plandepa_logo_slim.png"
                alt="Plandepa"
                className="h-8 md:h-10"
              />
            </a>
            <button
              onClick={handleBookCall}
              className="bg-brand-red hover:bg-brand-darkred text-white font-bold px-6 md:px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Book a Call
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-white to-brand-light-gray/30">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="space-y-6 md:space-y-8"
              >
                <motion.div
                  variants={fadeInUp}
                  className="inline-flex items-center gap-2 bg-brand-red/10 text-brand-red font-bold px-4 py-2 rounded-full text-sm"
                >
                  <Zap className="w-4 h-4" />
                  Buildxact Template Service
                </motion.div>

                <motion.h1
                  variants={fadeInUp}
                  className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-black leading-tight"
                >
                  Turn <span className="text-brand-red">8 Hours</span> Into <span className="text-brand-red">2 Hours</span> Per Quote
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="text-xl md:text-2xl text-brand-gray leading-relaxed max-w-3xl mx-auto"
                >
                  Custom Buildxact templates built by actual builders who know what goes into a profitable residential quote. No more guesswork, no more late nights.
                </motion.p>

                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <button
                    onClick={handleBookCall}
                    className="bg-brand-red hover:bg-brand-darkred text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-xl text-lg inline-flex items-center justify-center gap-2 group"
                  >
                    Get Your Custom Template
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-brand-gray pt-4"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0" />
                    <span>50% faster or it's free</span>
                  </div>
                  <div className="hidden sm:block text-brand-black/20">•</div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0" />
                    <span>Built by real builders</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 4 Value Cards Section */}
        <section className="py-16 md:py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-black mb-4"
              >
                Why Builders Choose Us
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-8"
            >
              {/* Card 1: 8 Hours Down to 2 Hours */}
              <motion.div
                variants={fadeInUp}
                className="bg-gradient-to-br from-white to-brand-light-gray/30 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-brand-black/5"
              >
                <div className="w-16 h-16 bg-brand-red/10 rounded-xl flex items-center justify-center mb-6">
                  <Clock className="w-8 h-8 text-brand-red" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-brand-black mb-4">
                  8 Hours Down to 2 Hours
                </h3>
                <p className="text-lg text-brand-gray leading-relaxed">
                  Stop losing your nights and weekends to paperwork. We drastically reduce your takeoff and quoting time so you can get accurate quotes out faster, win more jobs, and actually see your family.
                </p>
              </motion.div>

              {/* Card 2: Built For Your Exact Workflow */}
              <motion.div
                variants={fadeInUp}
                className="bg-gradient-to-br from-white to-brand-light-gray/30 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-brand-black/5"
              >
                <div className="w-16 h-16 bg-brand-red/10 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-brand-red" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-brand-black mb-4">
                  Built For Your Exact Workflow
                </h3>
                <p className="text-lg text-brand-gray leading-relaxed">
                  We don't force you to learn a complicated new system. Send us your last 12 estimates, and we'll strip them down to build a custom template that matches exactly how you already build and price.
                </p>
              </motion.div>

              {/* Card 3: Built By Builders, Not Software Reps */}
              <motion.div
                variants={fadeInUp}
                className="bg-gradient-to-br from-white to-brand-light-gray/30 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-brand-black/5"
              >
                <div className="w-16 h-16 bg-brand-red/10 rounded-xl flex items-center justify-center mb-6">
                  <Hammer className="w-8 h-8 text-brand-red" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-brand-black mb-4">
                  Built By Builders, Not Software Reps
                </h3>
                <p className="text-lg text-brand-gray leading-relaxed">
                  We aren't corporate guys guessing at your margins. With over 10 years of real-world building experience, we know exactly what actually needs to go into a profitable, realistic residential quote.
                </p>
              </motion.div>

              {/* Card 4: Unlock Buildxact's Full Potential */}
              <motion.div
                variants={fadeInUp}
                className="bg-gradient-to-br from-white to-brand-light-gray/30 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-brand-black/5"
              >
                <div className="w-16 h-16 bg-brand-red/10 rounded-xl flex items-center justify-center mb-6">
                  <BookOpen className="w-8 h-8 text-brand-red" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-brand-black mb-4">
                  Unlock Buildxact's Full Potential
                </h3>
                <p className="text-lg text-brand-gray leading-relaxed">
                  Stop paying for software you aren't fully using. Every custom template comes with punchy, personalized training to dial in your scheduling and get your Xero integration running flawlessly.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 50% Guarantee Section */}
        <section className="py-16 md:py-24 px-4 bg-brand-light-gray">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="relative bg-gradient-to-br from-white via-white to-brand-red/5 border-4 border-brand-red rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-red/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

              <div className="relative z-10 text-center">
                <motion.div
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                  className="inline-flex items-center justify-center w-24 h-24 bg-brand-red rounded-full mb-6 shadow-lg"
                >
                  <Shield className="w-12 h-12 text-white" />
                </motion.div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-black mb-6">
                  Our <span className="text-brand-red">50% Guarantee</span>
                </h2>

                <p className="text-2xl md:text-3xl text-brand-black font-bold leading-relaxed mb-6">
                  If we don't cut your quoting time by at least 50%, we'll give you the template for free.
                </p>

                <p className="text-lg text-brand-gray leading-relaxed max-w-2xl mx-auto mb-8">
                  We're so confident in what we've built that we're willing to put our money where our mouth is. No fine print, no tricks. Just real results or you don't pay.
                </p>

                <div className="flex flex-wrap justify-center gap-6 text-sm text-brand-gray pt-4 border-t border-brand-black/10">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0" />
                    <span className="font-medium">Track your actual time saved</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0" />
                    <span className="font-medium">No long-term commitment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0" />
                    <span className="font-medium">Risk-free investment</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Meet the Founders Section */}
        <section className="py-16 md:py-24 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-black mb-4"
              >
                Built By Real Builders
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-brand-gray"
              >
                Over 10 years of construction experience behind every template
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-8 md:gap-12"
            >
              <motion.div variants={fadeInUp} className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-white border-4 border-brand-red shadow-xl mb-6">
                  <img
                    src="/mitch_profile_picture.png"
                    alt="Mitch Humphries"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-2xl font-bold text-brand-black mb-2">Mitch Humphries</h3>
                <p className="text-brand-red font-semibold mb-4">Co-Founder</p>
                <p className="text-brand-gray leading-relaxed mb-4 max-w-md">
                  Carpenter to State Manager in building and restoration. Scaled multiple crews and learned that efficient systems are the difference between chaos and growth.
                </p>
                <a
                  href="https://www.linkedin.com/in/mitchell-humphries-8436ab37b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-gray hover:text-[#0077B5] transition-all duration-300 hover:scale-105 group"
                >
                  <Linkedin className="w-5 h-5 group-hover:fill-[#0077B5]" />
                  <span className="font-medium">Connect on LinkedIn</span>
                </a>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-white border-4 border-brand-red shadow-xl mb-6">
                  <img
                    src="/linkedin_profile_picture_(1).png"
                    alt="Jarrod Tanko"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-2xl font-bold text-brand-black mb-2">Jarrod Tanko</h3>
                <p className="text-brand-red font-semibold mb-4">Co-Founder</p>
                <p className="text-brand-gray leading-relaxed mb-4 max-w-md">
                  Ran his own construction company at 21, then site management for Tier 1 mining companies. Knows exactly what it takes to price jobs profitably from startup to enterprise.
                </p>
                <a
                  href="https://www.linkedin.com/in/jarrod-tanko-104943267/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-gray hover:text-[#0077B5] transition-all duration-300 hover:scale-105 group"
                >
                  <Linkedin className="w-5 h-5 group-hover:fill-[#0077B5]" />
                  <span className="font-medium">Connect on LinkedIn</span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA and Calendly Placeholder */}
        <section id="calendly-section" className="py-16 md:py-24 px-4 bg-gradient-to-b from-brand-light-gray to-white">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="text-center"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-black mb-6"
              >
                Ready to Get <span className="text-brand-red">Your Time Back?</span>
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-brand-gray mb-12 max-w-3xl mx-auto"
              >
                Book a free call. We'll review your current quoting process and show you exactly how much time you can save with a custom Buildxact template.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="bg-white border-2 border-dashed border-brand-black/20 rounded-xl p-12 mb-8 min-h-[500px] flex flex-col items-center justify-center"
              >
                <Calendar className="w-16 h-16 text-brand-black/30 mb-4" />
                <p className="text-brand-black/60 font-medium mb-2">Calendly Embed Placeholder</p>
                <p className="text-sm text-brand-black/40 max-w-md">Replace this div with your Calendly inline embed code</p>
                <p className="text-xs text-brand-black/30 mt-2">Recommended height: 500-700px</p>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <button
                  onClick={handleBookCall}
                  className="bg-brand-red hover:bg-brand-darkred text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-xl text-lg inline-flex items-center gap-2 group"
                >
                  Get Your Custom Template
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-sm text-brand-gray mt-6"
              >
                50% faster or it's free • No credit card required
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Simplified Footer */}
        <footer className="py-8 px-4 bg-brand-black border-t border-brand-black/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center gap-4">
              <img
                src="/plandepa_logo_slim.png"
                alt="Plandepa"
                className="h-8 opacity-70"
              />
              <p className="text-brand-gray text-sm text-center">
                © {new Date().getFullYear()} Plandepa. All rights reserved.
              </p>
            </div>
            <div className="mt-6 text-center">
              <a
                href="/"
                className="text-xs text-brand-gray/40 hover:text-brand-gray/60 transition-colors"
              >
                Internal
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
