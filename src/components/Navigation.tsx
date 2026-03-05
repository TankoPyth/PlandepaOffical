/**
 * Navigation.tsx
 *
 * This is the HEADER/TOP MENU that appears on every page.
 *
 * What's included:
 * - Plandepa logo (links to home page)
 * - Resources dropdown (Blog, Case Studies)
 * - Services dropdown (with all service categories)
 * - Mobile hamburger menu
 *
 * To modify:
 * - Change logo: Edit the img src in the logo Link
 * - Add resource: Edit resourcesMenu array
 * - Add service: Edit servicesMenu object
 */

import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, FileText, BookOpen, Settings, Zap, ClipboardCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Modal } from './ui/Modal';
import { ContactForm } from './ContactForm';

/**
 * SERVICES DROPDOWN - SIMPLIFIED SERVICE MENU
 * Main service offerings with partnered solutions
 */
const servicesMenu = [
  {
    name: 'Training & Education',
    description: 'Upskill your team on systems & processes',
    icon: BookOpen,
    href: '/training'
  },
  {
    name: '28-Day Pilot Program',
    description: 'Prove value fast with one workflow',
    icon: Zap,
    badge: 'Risk-Free',
    href: '/pilot-program'
  },
  {
    name: 'Plandepa Systems Review',
    description: 'Diagnose control issues & get execution plan',
    icon: ClipboardCheck,
    badge: '10 Days',
    href: '/operations-review'
  }
];

const partneredServices = [
  {
    name: 'Buildxact',
    description: 'Official partner - Expert implementation',
    icon: Settings,
    badge: 'Partner',
    href: '/buildxact'
  }
];

const resourcesMenu = [
  {
    name: 'Blog',
    description: 'Insights, tips, and industry news',
    icon: BookOpen,
    href: '/blog'
  },
  {
    name: 'Case Studies',
    description: 'Real results from real businesses',
    icon: FileText,
    href: '/case-studies'
  }
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [softwareOpen, setSoftwareOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileSoftwareOpen, setMobileSoftwareOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setMobileSoftwareOpen(false);
    setMobileResourcesOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 apple-ease ${
        scrolled
          ? 'bg-white/95 backdrop-blur-subtle shadow-md'
          : 'bg-white'
      }`}
      style={{ backdropFilter: scrolled ? 'blur(10px)' : 'none' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center group">
            <img
              src="/plandepa_logo_slim.png"
              alt="Plandepa - Build Smart, Grow Simple"
              className="h-12 w-auto transition-transform duration-300 apple-ease group-hover:scale-105"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <div
              className="relative"
              onMouseEnter={() => setSoftwareOpen(true)}
              onMouseLeave={() => setSoftwareOpen(false)}
            >
              <button
                className="flex items-center gap-1 text-body-md text-brand-black hover:text-brand-red transition-colors duration-300 apple-ease font-medium group/software"
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 apple-ease ${softwareOpen ? 'rotate-180' : ''}`} />
              </button>

              {softwareOpen && (
                <div className="absolute top-full right-0 mt-1 w-[380px] bg-white/95 backdrop-blur-subtle border border-gray-200 rounded-2xl shadow-2xl p-6 animate-scale-in">
                  <div className="space-y-2">
                    {servicesMenu.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-all duration-200 apple-ease group/item"
                        >
                          <IconComponent className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <div className="text-sm font-semibold text-brand-black group-hover/item:text-brand-red transition-colors">
                                {item.name}
                              </div>
                              {item.badge && (
                                <span className="text-xs font-semibold text-brand-red bg-red-50 px-2 py-0.5 rounded-full">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-brand-gray mt-0.5">
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="mb-3">
                      <p className="text-xs font-bold text-brand-gray uppercase tracking-wider px-4">
                        Partnered With
                      </p>
                    </div>
                    <div className="space-y-2">
                      {partneredServices.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-all duration-200 apple-ease group/item"
                          >
                            <IconComponent className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <div className="text-sm font-semibold text-brand-black group-hover/item:text-brand-red transition-colors">
                                  {item.name}
                                </div>
                                {item.badge && (
                                  <span className="text-xs font-semibold text-brand-red bg-red-50 px-2 py-0.5 rounded-full">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-brand-gray mt-0.5">
                                {item.description}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <button
                className="flex items-center gap-1 text-body-md text-brand-black hover:text-brand-red transition-colors duration-300 apple-ease font-medium group/resources"
              >
                Resources
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 apple-ease ${resourcesOpen ? 'rotate-180' : ''}`} />
              </button>

              {resourcesOpen && (
                <div className="absolute top-full right-0 mt-1 w-[320px] bg-white/95 backdrop-blur-subtle border border-gray-200 rounded-2xl shadow-2xl p-6 animate-scale-in">
                  <div className="space-y-2">
                    {resourcesMenu.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-all duration-200 apple-ease group/item"
                        >
                          <IconComponent className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="text-sm font-semibold text-brand-black group-hover/item:text-brand-red transition-colors">
                              {item.name}
                            </div>
                            <div className="text-xs text-brand-gray mt-0.5">
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-brand-black hover:text-brand-red transition-colors"
          >
            {menuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-subtle border-t border-gray-200 shadow-lg animate-in">
          <div className="px-6 py-6 space-y-4">
            <div>
              <button
                onClick={() => setMobileSoftwareOpen(!mobileSoftwareOpen)}
                className="flex items-center justify-between w-full text-body-lg text-brand-black hover:text-brand-red transition-colors duration-300 apple-ease font-medium py-2"
              >
                Services
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 apple-ease ${
                    mobileSoftwareOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {mobileSoftwareOpen && (
                <div className="mt-2 pl-4 space-y-2 animate-in">
                  {servicesMenu.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="flex items-start gap-3 py-2"
                      >
                        <IconComponent className="w-4 h-4 text-brand-red mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-brand-black">{item.name}</span>
                            {item.badge && (
                              <span className="text-xs font-semibold text-brand-red bg-red-50 px-2 py-0.5 rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-brand-gray mt-0.5">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    );
                  })}

                  <div className="pt-4 mt-4 border-t border-gray-200">
                    <p className="text-xs font-bold text-brand-gray uppercase tracking-wider mb-2">
                      Partnered With
                    </p>
                    {partneredServices.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="flex items-start gap-3 py-2"
                        >
                          <IconComponent className="w-4 h-4 text-brand-red mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-brand-black">{item.name}</span>
                              {item.badge && (
                                <span className="text-xs font-semibold text-brand-red bg-red-50 px-2 py-0.5 rounded-full">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-brand-gray mt-0.5">
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                className="flex items-center justify-between w-full text-body-lg text-brand-black hover:text-brand-red transition-colors duration-300 apple-ease font-medium py-2"
              >
                Resources
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 apple-ease ${
                    mobileResourcesOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {mobileResourcesOpen && (
                <div className="mt-2 pl-4 space-y-2 animate-in">
                  {resourcesMenu.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="flex items-center gap-3 py-2 text-sm text-brand-gray hover:text-brand-black transition-colors"
                      >
                        <IconComponent className="w-4 h-4 text-brand-red" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Modal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="Get in Touch"
      >
        <ContactForm
          source="contact"
          onSuccess={() => {
            setTimeout(() => {
              setIsContactModalOpen(false);
            }, 2000);
          }}
        />
      </Modal>
    </nav>
  );
}
