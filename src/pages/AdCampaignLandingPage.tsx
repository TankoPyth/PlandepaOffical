import { motion } from 'framer-motion';
import { Shield, Clock, TrendingUp, FileText, CheckCircle2, ArrowRight, Linkedin, Calendar } from 'lucide-react';
import { SEO } from '../components/SEO';
import { fadeInUp, staggerContainer } from '../utils/animations';

export default function AdCampaignLandingPage() {
  const handleBookCall = () => {
    window.scrollTo({ top: document.getElementById('calendly-section')?.offsetTop || 0, behavior: 'smooth' });
  };

  return (
    <>
      <SEO
        title="Transform Your Construction Business with AI | Plandepa"
        description="Stop wasting time on paperwork. Get more quotes out, win more work, and scale your construction business with AI automation."
        canonical="/lp/ad-campaign"
      />

      <div className="min-h-screen bg-white">
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

        <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-white to-brand-light-gray/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="space-y-6 md:space-y-8"
              >
                <motion.h1
                  variants={fadeInUp}
                  className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-black leading-tight"
                >
                  Stop Losing Work to <span className="text-brand-red">Slow Quotes</span>
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="text-xl md:text-2xl text-brand-gray leading-relaxed"
                >
                  Get quotes out 5x faster, win more projects, and scale your construction business with AI automation that works while you sleep.
                </motion.p>

                <motion.div variants={fadeInUp}>
                  <button
                    onClick={handleBookCall}
                    className="bg-brand-red hover:bg-brand-darkred text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-xl text-lg inline-flex items-center gap-2 group"
                  >
                    See How It Works
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="flex items-center gap-4 text-sm text-brand-gray pt-4"
                >
                  <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0" />
                  <span>No credit card required • 28-day money-back guarantee</span>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-brand-light-gray border-2 border-dashed border-brand-black/20 rounded-xl p-8 md:p-12 aspect-video flex flex-col items-center justify-center text-center">
                  <FileText className="w-16 h-16 text-brand-black/30 mb-4" />
                  <p className="text-brand-black/60 font-medium mb-2">Dashboard Graphic Placeholder</p>
                  <p className="text-sm text-brand-black/40">Replace with product screenshot or demo video</p>
                  <p className="text-xs text-brand-black/30 mt-2">Recommended: 16:9 aspect ratio</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-4 bg-brand-light-gray">
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
                You're Leaving Money on the Table
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-brand-gray max-w-3xl mx-auto"
              >
                Every day without automation costs you opportunities
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                {
                  icon: Clock,
                  title: "Wasted Time",
                  description: "Hours spent on repetitive paperwork instead of building relationships and closing deals"
                },
                {
                  icon: FileText,
                  title: "Complex Paperwork",
                  description: "Drowning in RFIs, variations, and quote requests that slow your response time"
                },
                {
                  icon: TrendingUp,
                  title: "Lost Opportunities",
                  description: "Missing out on projects because competitors submit quotes faster"
                },
                {
                  icon: Shield,
                  title: "No Visibility",
                  description: "Can't track what's working or where money is slipping through the cracks"
                }
              ].map((pain, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-brand-black/5"
                >
                  <div className="w-14 h-14 bg-brand-red/10 rounded-lg flex items-center justify-center mb-4">
                    <pain.icon className="w-7 h-7 text-brand-red" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-black mb-2">{pain.title}</h3>
                  <p className="text-brand-gray leading-relaxed">{pain.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-black mb-4"
              >
                How It Works
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-brand-gray"
              >
                Three simple steps to transform your business
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="space-y-8 md:space-y-12"
            >
              {[
                {
                  number: "01",
                  title: "Book Your Free Strategy Call",
                  description: "We'll analyze your current workflow and identify where AI can save you the most time and money"
                },
                {
                  number: "02",
                  title: "Custom Implementation",
                  description: "Our team builds and configures AI automation tailored specifically to your business processes"
                },
                {
                  number: "03",
                  title: "Watch Your Business Scale",
                  description: "Start generating quotes 5x faster, winning more work, and reclaiming hours every week"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex flex-col md:flex-row gap-6 items-start md:items-center"
                >
                  <div className="flex-shrink-0 w-20 h-20 bg-brand-red rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-3xl font-black text-white">{step.number}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-brand-black mb-2">{step.title}</h3>
                    <p className="text-lg text-brand-gray leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-4 bg-brand-light-gray/50">
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
                Who You'll Work With
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-brand-gray"
              >
                Construction veterans who've been in your shoes
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
                  Carpenter to State Manager in building and restoration. Scaled multiple crews and learned that systems make or break growth.
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
                  Ran his own construction company at 21, then site management for Tier 1 mining companies. Startup chaos to enterprise scale.
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

        <section className="py-16 md:py-24 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="relative bg-gradient-to-br from-white to-brand-light-gray border-4 border-brand-red rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

              <div className="relative z-10 text-center">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-brand-red rounded-full mb-6 shadow-lg"
                >
                  <Shield className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="text-3xl md:text-4xl font-black text-brand-black mb-4">
                  28-Day Money-Back Guarantee
                </h2>

                <p className="text-xl text-brand-gray leading-relaxed mb-6 max-w-2xl mx-auto">
                  We're so confident you'll see results that if you don't save time and win more work within 28 days, we'll refund every penny. No questions asked.
                </p>

                <div className="flex flex-wrap justify-center gap-4 text-sm text-brand-gray">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0" />
                    <span>No long-term contracts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0" />
                    <span>Cancel anytime</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0" />
                    <span>Full refund if not satisfied</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

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
                Ready to <span className="text-brand-red">10x Your Output?</span>
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-brand-gray mb-12 max-w-3xl mx-auto"
              >
                Book a free 30-minute strategy call. We'll show you exactly how AI can transform your business.
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
                  Book Your Free Call Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-sm text-brand-gray mt-6"
              >
                No credit card required • Spots are limited
              </motion.p>
            </motion.div>
          </div>
        </section>

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
