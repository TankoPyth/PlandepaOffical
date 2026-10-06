/**
 * Footer.tsx
 *
 * This is the FOOTER that appears at the bottom of every page.
 *
 * What's included:
 * - PlanDepa logo
 * - Navigation links
 * - Contact email link
 * - Copyright notice
 *
 * To modify:
 * - Change logo: Edit line 25-29 (src="/plandepa_logo_clean.png")
 * - Add/remove links: Edit the <nav> section below (starting line 32)
 * - Change email: Edit line 48 (href="mailto:...")
 */

import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-light-gray py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Footer Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src="/plandepa_logo_clean.png"
              alt="PlanDepa, AI & systems for construction companies"
              className="h-10 w-auto"
              loading="lazy"
            />
          </Link>

          {/* Footer Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <Link
              to="/clarity-blueprint"
              className="text-body-md text-brand-gray hover:text-brand-black transition-colors"
            >
              Clarity Blueprint
            </Link>
            <Link
              to="/enquiry-automation"
              className="text-body-md text-brand-gray hover:text-brand-black transition-colors"
            >
              Enquiry Automation
            </Link>
            <Link
              to="/pilot-program"
              className="text-body-md text-brand-gray hover:text-brand-black transition-colors"
            >
              28-Day Pilots
            </Link>
            <Link
              to="/buildxact"
              className="text-body-md text-brand-gray hover:text-brand-black transition-colors"
            >
              Buildxact
            </Link>
            <Link
              to="/construction-ai-brisbane"
              className="text-body-md text-brand-gray hover:text-brand-black transition-colors"
            >
              Brisbane
            </Link>
            <Link
              to="/construction-ai-newcastle"
              className="text-body-md text-brand-gray hover:text-brand-black transition-colors"
            >
              Newcastle
            </Link>
            <Link
              to="/case-studies"
              className="text-body-md text-brand-gray hover:text-brand-black transition-colors"
            >
              Case Studies
            </Link>
            <Link
              to="/about"
              className="text-body-md text-brand-gray hover:text-brand-black transition-colors"
            >
              About
            </Link>
            <Link
              to="/blog"
              className="text-body-md text-brand-gray hover:text-brand-black transition-colors"
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="text-body-md text-brand-gray hover:text-brand-black transition-colors"
            >
              Contact
            </Link>
          </nav>

          <p className="text-body-md text-brand-gray">
            © {currentYear} PlanDepa. Built for construction companies.
          </p>
        </div>
      </div>
    </footer>
  );
}
