/**
 * Navigation.tsx
 *
 * Premium dual-layer glassmorphic navigation with Australian contact info
 *
 * What's included:
 * - Top utility bar with Australian contact info and Regional Access badge
 * - Main glassmorphic navigation with mega menus
 * - Education mega menu with persona-based columns
 * - The Pilot Lab mega menu
 * - OSR Roadmap mega menu with 4-phase layout
 * - Mobile responsive hamburger menu
 */

import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Phone, MapPin, Flag, GraduationCap, Rocket, Map, Users, TrendingUp, Lightbulb, Target, CheckCircle2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Modal } from './ui/Modal';
import { ContactForm } from './ContactForm';

const educationMenu = {
  newToAutomation: {
    title: 'New to Automation',
    icon: Lightbulb,
    description: 'Just starting your journey',
    items: [
      { name: 'What is AI Automation?', href: '/blog', description: 'Understanding the basics' },
      { name: 'ROI Calculator', href: '/roi-calculator', description: 'See potential savings' },
      { name: 'Free Business Audit', href: '/business-audit', description: 'Get expert assessment' },
      { name: 'Success Stories', href: '/case-studies', description: 'Real construction results' }
    ]
  },
  growingYourFirm: {
    title: 'Growing Your Firm',
    icon: TrendingUp,
    description: 'Ready to scale operations',
    items: [
      { name: 'Lead Generation Systems', href: '/lead-generation', description: 'Attract quality leads' },
      { name: 'Process Automation Guide', href: '/blog', description: 'Streamline workflows' },
      { name: 'Team Training Resources', href: '/blog', description: 'Upskill your crew' },
      { name: 'Integration Strategies', href: '/blog', description: 'Connect your tools' }
    ]
  },
  scalingOperations: {
    title: 'Scaling Operations',
    icon: Target,
    description: 'Enterprise-level optimization',
    items: [
      { name: 'Advanced Automation', href: '/blog', description: 'Complex workflows' },
      { name: 'Multi-Project Management', href: '/blog', description: 'Handle more jobs' },
      { name: 'Custom Solutions', href: '/services', description: 'Tailored systems' },
      { name: 'Performance Analytics', href: '/blog', description: 'Data-driven decisions' }
    ]
  }
};

const pilotLabMenu = {
  title: 'Join The Pilot Lab',
  description: 'Be first to test cutting-edge construction automation',
  programs: [
    {
      name: 'Voice Agent Beta',
      status: 'Active',
      description: 'AI phone assistants for lead qualification and appointment booking',
      badge: 'Limited Spots',
      badgeColor: 'red'
    },
    {
      name: 'Smart Document Processing',
      status: 'Active',
      description: 'Automated contract review and data extraction from plans',
      badge: '3 Spots Left',
      badgeColor: 'orange'
    },
    {
      name: 'Predictive Quoting',
      status: 'Coming Soon',
      description: 'AI-powered estimation based on historical project data',
      badge: 'Q2 2025',
      badgeColor: 'blue'
    }
  ],
  benefits: [
    'Early access to new features',
    'Discounted implementation rates',
    'Direct feedback to development team',
    'Priority support access'
  ]
};

const osrRoadmapMenu = {
  title: 'Our 4-Phase OSR Partnership Model',
  description: 'Operational Systems Review - Your roadmap to automation excellence',
  phases: [
    {
      number: '01',
      title: 'Focused Sprint',
      duration: '14-21 Days',
      description: 'Deep dive into your operations to identify quick wins and automation opportunities',
      deliverables: ['Current state assessment', 'Pain point analysis', 'Quick win opportunities', 'Tech stack review']
    },
    {
      number: '02',
      title: 'OSR Review',
      duration: '3-5 Days',
      description: 'Comprehensive audit with detailed blueprint for transformation',
      deliverables: ['Full operational audit', 'Custom automation blueprint', 'ROI projections', 'Implementation timeline']
    },
    {
      number: '03',
      title: 'Implementation',
      duration: '4-12 Weeks',
      description: 'Build and deploy your custom systems with full team training',
      deliverables: ['System configuration', 'Process automation', 'Team training', 'Integration setup']
    },
    {
      number: '04',
      title: 'Continuous Improvement',
      duration: 'Ongoing',
      description: 'Regular optimization, support, and scaling as your business grows',
      deliverables: ['Monthly reviews', 'Performance optimization', 'New feature rollouts', 'Priority support']
    }
  ]
};

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [educationOpen, setEducationOpen] = useState(false);
  const [pilotLabOpen, setPilotLabOpen] = useState(false);
  const [osrRoadmapOpen, setOsrRoadmapOpen] = useState(false);
  const [mobileEducationOpen, setMobileEducationOpen] = useState(false);
  const [mobilePilotLabOpen, setMobilePilotLabOpen] = useState(false);
  const [mobileOsrRoadmapOpen, setMobileOsrRoadmapOpen] = useState(false);
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
    setMobileEducationOpen(false);
    setMobilePilotLabOpen(false);
    setMobileOsrRoadmapOpen(false);
  }, [location]);

  return (
    <>
      {/* Top Utility Bar - Australian Contact Info */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-[#1a1a2e] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center gap-6">
              <a
                href="tel:+61733606060"
                className="flex items-center gap-2 hover:text-brand-red transition-colors duration-300"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">+61 7 3360 6060</span>
              </a>
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Brisbane & Sydney</span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full">
              <Flag className="w-3.5 h-3.5 text-brand-red" />
              <span className="text-xs font-semibold">Australian-Based</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navigation */}
      <nav
        className={`fixed top-10 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50'
            : 'bg-white/70 backdrop-blur-md'
        }`}
        style={{ backdropFilter: scrolled ? 'blur(20px)' : 'blur(12px)' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center group">
              <img
                src="/plandepa_logo_slim.png"
                alt="Plandepa - Build Smart, Grow Simple"
                className="h-12 w-auto transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {/* Education Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => setEducationOpen(true)}
                onMouseLeave={() => setEducationOpen(false)}
              >
                <button
                  className="flex items-center gap-1 text-base text-[#1a1a2e] hover:text-brand-red transition-colors duration-300 font-semibold"
                >
                  <GraduationCap className="w-4 h-4" />
                  Education
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${educationOpen ? 'rotate-180' : ''}`} />
                </button>

                {educationOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[900px] bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl p-8 animate-scale-in">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-[#1a1a2e] mb-2">Choose Your Learning Path</h3>
                      <p className="text-sm text-gray-600">Resources tailored to your automation journey</p>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      {Object.values(educationMenu).map((persona) => {
                        const IconComponent = persona.icon;
                        return (
                          <div key={persona.title} className="space-y-3">
                            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-200">
                              <div className="p-2 bg-brand-red/10 rounded-lg">
                                <IconComponent className="w-5 h-5 text-brand-red" />
                              </div>
                              <div>
                                <h4 className="font-bold text-sm text-[#1a1a2e]">{persona.title}</h4>
                                <p className="text-xs text-gray-500">{persona.description}</p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              {persona.items.map((item) => (
                                <Link
                                  key={item.name}
                                  to={item.href}
                                  className="block px-3 py-2 hover:bg-gray-50 rounded-lg transition-all duration-200 group/item"
                                >
                                  <div className="text-sm font-semibold text-[#1a1a2e] group-hover/item:text-brand-red transition-colors">
                                    {item.name}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-0.5">
                                    {item.description}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                      <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-red hover:gap-3 transition-all duration-300"
                      >
                        View All Resources →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* The Pilot Lab Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => setPilotLabOpen(true)}
                onMouseLeave={() => setPilotLabOpen(false)}
              >
                <button
                  className="flex items-center gap-1 text-base text-[#1a1a2e] hover:text-brand-red transition-colors duration-300 font-semibold"
                >
                  <Rocket className="w-4 h-4" />
                  The Pilot Lab
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${pilotLabOpen ? 'rotate-180' : ''}`} />
                </button>

                {pilotLabOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[700px] bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl p-8 animate-scale-in">
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-brand-red/10 rounded-lg">
                          <Rocket className="w-6 h-6 text-brand-red" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-[#1a1a2e]">{pilotLabMenu.title}</h3>
                          <p className="text-sm text-gray-600">{pilotLabMenu.description}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 mb-6">
                      {pilotLabMenu.programs.map((program) => (
                        <div
                          key={program.name}
                          className="p-4 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-bold text-[#1a1a2e]">{program.name}</h4>
                            <span
                              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                program.badgeColor === 'red'
                                  ? 'bg-red-100 text-red-700'
                                  : program.badgeColor === 'orange'
                                  ? 'bg-orange-100 text-orange-700'
                                  : 'bg-blue-100 text-blue-700'
                              }`}
                            >
                              {program.badge}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{program.description}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gradient-to-r from-[#1a1a2e] to-gray-800 rounded-xl p-6 text-white">
                      <h4 className="font-bold mb-3 flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Pilot Program Benefits
                      </h4>
                      <ul className="space-y-2">
                        {pilotLabMenu.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-brand-red flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => setIsContactModalOpen(true)}
                        className="mt-4 w-full px-4 py-2 bg-brand-red text-white font-semibold text-sm rounded-lg hover:bg-red-700 transition-colors duration-300"
                      >
                        Apply for Pilot Program
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* OSR Roadmap Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => setOsrRoadmapOpen(true)}
                onMouseLeave={() => setOsrRoadmapOpen(false)}
              >
                <button
                  className="flex items-center gap-1 text-base text-[#1a1a2e] hover:text-brand-red transition-colors duration-300 font-semibold"
                >
                  <Map className="w-4 h-4" />
                  OSR Roadmap
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${osrRoadmapOpen ? 'rotate-180' : ''}`} />
                </button>

                {osrRoadmapOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[950px] bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl p-8 animate-scale-in">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-[#1a1a2e] mb-2">{osrRoadmapMenu.title}</h3>
                      <p className="text-sm text-gray-600">{osrRoadmapMenu.description}</p>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      {osrRoadmapMenu.phases.map((phase, index) => (
                        <div
                          key={phase.number}
                          className="relative p-5 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 group"
                        >
                          <div className="absolute -top-3 -left-3 w-10 h-10 bg-brand-red text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                            {phase.number}
                          </div>
                          <div className="mt-2">
                            <h4 className="font-bold text-[#1a1a2e] mb-1 group-hover:text-brand-red transition-colors">
                              {phase.title}
                            </h4>
                            <p className="text-xs text-brand-red font-semibold mb-2">{phase.duration}</p>
                            <p className="text-xs text-gray-600 mb-3">{phase.description}</p>
                            <div className="space-y-1">
                              {phase.deliverables.slice(0, 2).map((deliverable, idx) => (
                                <div key={idx} className="flex items-start gap-1.5 text-xs text-gray-500">
                                  <CheckCircle2 className="w-3 h-3 text-brand-red flex-shrink-0 mt-0.5" />
                                  {deliverable}
                                </div>
                              ))}
                              <div className="text-xs text-gray-400 italic">+{phase.deliverables.length - 2} more</div>
                            </div>
                          </div>
                          {index < osrRoadmapMenu.phases.length - 1 && (
                            <div className="absolute top-1/2 -right-2 w-4 h-0.5 bg-brand-red hidden xl:block" />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200 flex gap-4">
                      <button
                        onClick={() => setIsContactModalOpen(true)}
                        className="flex-1 px-4 py-3 bg-brand-red text-white font-semibold text-sm rounded-lg hover:bg-red-700 transition-colors duration-300"
                      >
                        Start Your OSR Journey
                      </button>
                      <Link
                        to="/roi-calculator"
                        className="flex-1 text-center px-4 py-3 bg-[#1a1a2e] text-white font-semibold text-sm rounded-lg hover:bg-gray-800 transition-colors duration-300"
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
              className="lg:hidden p-2 text-[#1a1a2e] hover:text-brand-red transition-colors"
            >
              {menuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div className="absolute top-30 right-0 w-full max-w-md h-[calc(100vh-120px)] bg-white/95 backdrop-blur-xl shadow-2xl overflow-y-auto animate-slide-in-right">
            <div className="px-6 py-6 space-y-4">
              {/* Australian Contact Info in Mobile */}
              <div className="pb-4 border-b border-gray-200 space-y-2">
                <a
                  href="tel:+61733606060"
                  className="flex items-center gap-2 text-sm text-[#1a1a2e] hover:text-brand-red transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +61 7 3360 6060
                </a>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  Brisbane & Sydney
                </div>
              </div>

              {/* Education Mobile */}
              <div>
                <button
                  onClick={() => setMobileEducationOpen(!mobileEducationOpen)}
                  className="flex items-center justify-between w-full text-lg text-[#1a1a2e] hover:text-brand-red transition-colors font-semibold py-2"
                >
                  <span className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    Education
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      mobileEducationOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {mobileEducationOpen && (
                  <div className="mt-2 pl-4 space-y-4 animate-in">
                    {Object.values(educationMenu).map((persona) => (
                      <div key={persona.title} className="space-y-2">
                        <h4 className="text-sm font-bold text-[#1a1a2e]">{persona.title}</h4>
                        {persona.items.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="block text-sm text-gray-600 hover:text-brand-red transition-colors py-1 pl-3"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Pilot Lab Mobile */}
              <div>
                <button
                  onClick={() => setMobilePilotLabOpen(!mobilePilotLabOpen)}
                  className="flex items-center justify-between w-full text-lg text-[#1a1a2e] hover:text-brand-red transition-colors font-semibold py-2"
                >
                  <span className="flex items-center gap-2">
                    <Rocket className="w-5 h-5" />
                    The Pilot Lab
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      mobilePilotLabOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {mobilePilotLabOpen && (
                  <div className="mt-2 pl-4 space-y-3 animate-in">
                    {pilotLabMenu.programs.map((program) => (
                      <div key={program.name} className="text-sm">
                        <div className="font-semibold text-[#1a1a2e]">{program.name}</div>
                        <div className="text-xs text-gray-600">{program.description}</div>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        setIsContactModalOpen(true);
                      }}
                      className="w-full mt-3 px-4 py-2 bg-brand-red text-white font-semibold text-sm rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Apply for Pilot Program
                    </button>
                  </div>
                )}
              </div>

              {/* OSR Roadmap Mobile */}
              <div>
                <button
                  onClick={() => setMobileOsrRoadmapOpen(!mobileOsrRoadmapOpen)}
                  className="flex items-center justify-between w-full text-lg text-[#1a1a2e] hover:text-brand-red transition-colors font-semibold py-2"
                >
                  <span className="flex items-center gap-2">
                    <Map className="w-5 h-5" />
                    OSR Roadmap
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      mobileOsrRoadmapOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {mobileOsrRoadmapOpen && (
                  <div className="mt-2 pl-4 space-y-3 animate-in">
                    {osrRoadmapMenu.phases.map((phase) => (
                      <div key={phase.number} className="text-sm">
                        <div className="font-semibold text-[#1a1a2e]">
                          Phase {phase.number}: {phase.title}
                        </div>
                        <div className="text-xs text-gray-600">{phase.description}</div>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        setIsContactModalOpen(true);
                      }}
                      className="w-full mt-3 px-4 py-2 bg-brand-red text-white font-semibold text-sm rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Start Your OSR Journey
                    </button>
                  </div>
                )}
              </div>
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
    </>
  );
}
