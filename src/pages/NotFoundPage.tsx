import { Link } from 'react-router-dom';
import { Home, Search, FileQuestion, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { AngleDivider } from '../components/ui/AngleDivider';
import { SubtleWaveBackground } from '../components/ui/SubtleWaveBackground';
import { appleEasing } from '../utils/animations';

export function NotFoundPage() {
  return (
    <>
      <section className="relative bg-brand-off-white py-20 px-6 overflow-hidden min-h-[calc(100vh-80px)] flex flex-col">
        <SubtleWaveBackground />
        <div className="relative z-10 max-w-4xl mx-auto w-full flex-1 flex flex-col justify-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: appleEasing }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-brand-red/10 mb-6">
              <FileQuestion className="w-16 h-16 text-brand-red" />
            </div>
          </motion.div>

          <motion.h1
            className="text-7xl md:text-9xl font-extrabold text-brand-black mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: appleEasing, delay: 0.1 }}
          >
            404
          </motion.h1>

          <motion.h2
            className="text-3xl md:text-5xl font-bold text-brand-black mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: appleEasing, delay: 0.2 }}
          >
            Page Not Found
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-brand-gray mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: appleEasing, delay: 0.3 }}
          >
            Looks like this page took a sickie. Let's get you back on track.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: appleEasing, delay: 0.4 }}
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-black text-white font-semibold text-base rounded-lg hover:bg-gray-800 transition-all duration-300 apple-ease shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: appleEasing, delay: 0.5 }}
          >
            <Link
              to="/blog"
              className="p-4 bg-white rounded-lg hover:shadow-md transition-all duration-300 text-center group"
            >
              <h3 className="font-semibold text-brand-black mb-1 group-hover:text-brand-red transition-colors">
                Blog
              </h3>
              <p className="text-sm text-brand-gray">Read articles</p>
            </Link>

            <Link
              to="/case-studies"
              className="p-4 bg-white rounded-lg hover:shadow-md transition-all duration-300 text-center group"
            >
              <h3 className="font-semibold text-brand-black mb-1 group-hover:text-brand-red transition-colors">
                Case Studies
              </h3>
              <p className="text-sm text-brand-gray">See our work</p>
            </Link>

            <Link
              to="/free-audit"
              className="p-4 bg-white rounded-lg hover:shadow-md transition-all duration-300 text-center group"
            >
              <h3 className="font-semibold text-brand-black mb-1 group-hover:text-brand-red transition-colors">
                Free Audit
              </h3>
              <p className="text-sm text-brand-gray">Get started</p>
            </Link>

            <Link
              to="/roi-calculator"
              className="p-4 bg-white rounded-lg hover:shadow-md transition-all duration-300 text-center group"
            >
              <h3 className="font-semibold text-brand-black mb-1 group-hover:text-brand-red transition-colors">
                ROI Calculator
              </h3>
              <p className="text-sm text-brand-gray">See savings</p>
            </Link>
          </motion.div>
        </div>
      </section>

      <AngleDivider direction="down-right" fromColor="#FAFAFA" toColor="#FFFFFF" height={100} />

      <section className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-4">
            Need Help?
          </h2>
          <p className="text-lg text-brand-gray mb-8">
            If you're looking for something specific, get in touch and we'll point you in the right direction.
          </p>
          <a
            href="mailto:admin@plandepa.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-brand-black font-semibold text-base rounded-lg border-2 border-brand-black hover:bg-brand-black hover:text-white transition-all duration-300 apple-ease"
          >
            Contact Us
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </>
  );
}
