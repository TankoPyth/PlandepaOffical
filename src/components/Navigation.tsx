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
import { Menu, X, ChevronDown, Settings, Zap, Network, TrendingUp, BookOpen, FileText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Modal } from './ui/Modal';
import { ContactForm } from './ContactForm';

/**
 * MEGA MENU SERVICES STRUCTURE
 * Organized by category to showcase all capabilities
 */
const servicesMenu = {
  softwareTools: {
    title: 'Software & Tools',
    icon: Settings,
    items: [
      { name: 'Buildxact', description: 'Estimating & project management' },
      { name: 'ClickUp', description: 'Task & workflow management' },
      { name: 'Notion', description: 'Documentation & collaboration' },
      { name: 'Xero', description: 'Cloud accounting' },
      { name: 'Deputy', description: 'Staff scheduling & timesheets' }
    ]
  },
  aiAutomation: {
    title: 'AI & Automation',
    icon: Zap,
    items: [
      { name: 'N8N Workflows', description: 'Custom automation workflows' },
      { name: 'Zapier Integration', description: 'Connect your apps' },
      { name: 'Voice Agents', description: 'AI phone assistants' },
      { name: 'Smart Documents', description: 'Automated document processing' },
      { name: 'AI Strategy', description: 'Consulting & planning' }
    ]
  },
  businessSystems: {
    title: 'Business Systems',
    icon: Network,
    items: [
      { name: 'Quoting & Estimating', description: 'Fast, accurate quotes' },
      { name: 'Invoice Management', description: 'Track payments easily' },
      { name: 'Project Tracking', description: 'Monitor job progress' },
      { name: 'Team Communication', description: 'Keep everyone aligned' },
      { name: 'Document Management', description: 'Organize all files' }
    ]
  },
  growthSupport: {
    title: 'Growth & Support',
    icon: TrendingUp,
    items: [
      { name: 'Lead Generation', description: 'Attract quality leads' },
      { name: 'Website Development', description: 'Professional online presence' },
      { name: 'Business Strategy Audit', description: 'Identify opportunities' },
      { name: 'ROI Calculator', description: 'See potential savings' },
      { name: 'Training & Support', description: 'Ongoing assistance' }
    ]
  }
};

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

            <div
              className="relative"
              onMouseEnter={() => setSoftwareOpen(true)}
              onMouseLeave={() => setSoftwareOpen(false)}
            >
              <Link
                to="/services"
                className="flex items-center gap-1 text-body-md text-brand-black hover:text-brand-red transition-colors duration-300 apple-ease font-medium group/software"
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 apple-ease ${softwareOpen ? 'rotate-180' : ''}`} />
              </Link>

              {softwareOpen && (
                <div className="absolute top-full right-0 mt-1 w-[900px] bg-white/95 backdrop-blur-subtle border border-gray-200 rounded-2xl shadow-2xl p-8 animate-scale-in">
                  <div className="mb-6">
                    <Link
                      to="/services"
                      className="text-sm font-bold text-brand-black hover:text-brand-red transition-colors duration-300 apple-ease inline-flex items-center gap-2"
                    >
                      View All Services & Capabilities →
                    </Link>
                  </div>
                  <div className="grid grid-cols-4 gap-6">
                    {Object.values(servicesMenu).map((category) => {
                      const IconComponent = category.icon;
                      return (
                        <div key={category.title} className="space-y-3">
                          <div className="flex items-center gap-2 mb-3">
                            <IconComponent className="w-5 h-5 text-brand-red" />
                            <h3 className="font-bold text-sm text-brand-black uppercase tracking-wide">
                              {category.title}
                            </h3>
                          </div>
                          <div className="space-y-2">
                            {category.items.map((item) => (
                              <div
                                key={item.name}
                                className="group/item px-3 py-2 hover:bg-gray-50 rounded-lg transition-all duration-200 apple-ease cursor-pointer"
                              >
                                <div className="text-sm font-semibold text-brand-black group-hover/item:text-brand-red transition-colors">
                                  {item.name}
                                </div>
                                <div className="text-xs text-brand-gray mt-0.5">
                                  {item.description}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200 flex gap-4">
                    <button
                      onClick={() => setIsContactModalOpen(true)}
                      className="flex-1 text-center px-4 py-2 bg-brand-red text-white font-semibold text-sm rounded-lg hover:bg-red-700 transition-colors duration-300"
                    >
                      Get in Touch
                    </button>
                    <Link
                      to="/roi-calculator"
                      className="flex-1 text-center px-4 py-2 bg-brand-black text-white font-semibold text-sm rounded-lg hover:bg-gray-800 transition-colors duration-300"
                    >
                      Calculate ROI
                    </Link>
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
                <div className="mt-2 pl-4 space-y-4 animate-in max-h-[60vh] overflow-y-auto">
                  <Link
                    to="/services"
                    className="block text-sm font-bold text-brand-black hover:text-brand-red transition-colors duration-300 apple-ease py-2"
                  >
                    View All Services →
                  </Link>
                  {Object.values(servicesMenu).map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <div key={category.title} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <IconComponent className="w-4 h-4 text-brand-red" />
                          <span className="text-xs font-bold text-brand-black uppercase tracking-wide">
                            {category.title}
                          </span>
                        </div>
                        {category.items.map((item) => (
                          <div key={item.name} className="pl-6 text-sm text-brand-gray py-1">
                            {item.name}
                          </div>
                        ))}
                      </div>
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
          source="navigation_dropdown"
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
