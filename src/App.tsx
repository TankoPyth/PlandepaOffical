import { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight, Mail, Calendar, Sparkles, Target, Users, Zap, Brain, LineChart, Shield, Workflow, Bot, Database, Send, ExternalLink, TrendingUp, Award, Star, Menu, X, Search, Lightbulb, Settings, GraduationCap, DollarSign, Network, RefreshCw, CheckCircle2, Clock, FileText, Wrench } from 'lucide-react';
import { supabase } from './lib/supabase';
import { InfiniteSlider } from './components/InfiniteSlider';
import { motion, useScroll } from 'framer-motion';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  image_url: string;
  published_at: string;
}

interface Testimonial {
  id: string;
  client_name: string;
  company: string;
  content: string;
  rating: number;
}

interface Service {
  id: string;
  title: string;
  pain_point: string;
  solution: string;
  cta_text: string;
  icon_name: string;
  display_order: number;
  is_active: boolean;
}

interface CaseStudy {
  id: string;
  company_type: string;
  location: string;
  problem: string;
  solution: string;
  results: string;
  testimonial: string;
  client_name: string;
  client_role: string;
  display_order: number;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  display_order: number;
}

function App() {
  const [email, setEmail] = useState('');
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    company_name: '',
    trade_specialty: '',
    phone: '',
    interest_type: 'Free Audit',
    message: '',
    prefers_call_booking: false
  });
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrolled(latest > 0.05);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  useEffect(() => {
    fetchBlogPosts();
    fetchTestimonials();
    fetchServices();
    fetchCaseStudies();
    fetchFAQs();
  }, []);

  const fetchBlogPosts = async () => {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(3);
    if (data) setBlogPosts(data);
  };

  const fetchTestimonials = async () => {
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setTestimonials(data);
  };

  const fetchServices = async () => {
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });
    if (data) setServices(data);
  };

  const fetchCaseStudies = async () => {
    const { data } = await supabase
      .from('case_studies')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true });
    if (data) setCaseStudies(data);
  };

  const fetchFAQs = async () => {
    const { data } = await supabase
      .from('faqs')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true });
    if (data) setFaqs(data);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email }]);

    if (!error) {
      alert('Successfully subscribed to our newsletter!');
      setEmail('');
    } else {
      alert('This email is already subscribed or an error occurred.');
    }
    setLoading(false);
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase
      .from('enquiries')
      .insert([enquiryForm]);

    if (!error) {
      alert('Enquiry received! We\'ll be in touch within 24 hours.');
      setEnquiryForm({
        name: '',
        email: '',
        company_name: '',
        trade_specialty: '',
        phone: '',
        interest_type: 'Free Audit',
        message: '',
        prefers_call_booking: false
      });
    } else {
      alert('Error submitting enquiry. Please try again.');
    }
    setLoading(false);
  };

  const getIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      Settings,
      GraduationCap,
      DollarSign,
      Users,
      Network,
      RefreshCw,
      Wrench,
      Target,
      Bot,
      LineChart,
      Shield,
      Workflow,
      Database,
      Brain,
    };
    return icons[iconName] || Wrench;
  };

  const founders = [
    {
      name: 'Founder Name 1',
      role: 'Co-Founder & CEO',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Leading AI innovation with 10+ years of experience',
    },
    {
      name: 'Founder Name 2',
      role: 'Co-Founder & CTO',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Technical visionary driving cutting-edge solutions',
    },
  ];

  const stats = [
    { number: '500+', label: 'Projects Delivered', icon: TrendingUp },
    { number: '98%', label: 'Client Satisfaction', icon: Award },
    { number: '50+', label: 'AI Experts', icon: Users },
    { number: '10M+', label: 'Hours Saved', icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-brand-offwhite">
      <nav className="fixed top-0 w-full z-50 pt-2">
        <div className={`max-w-7xl mx-auto rounded-3xl px-6 lg:px-12 transition-all duration-300 ${scrolled ? 'bg-brand-offwhite/50 backdrop-blur-2xl' : ''}`}>
          <motion.div className={`relative flex flex-wrap items-center justify-between gap-6 py-3 duration-200 lg:gap-0 ${scrolled ? 'lg:py-4' : 'lg:py-6'}`}>
            <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
              <a href="/" className="flex items-center space-x-3 group cursor-pointer">
                <Sparkles className="w-8 h-8 text-brand-darkred transition-transform group-hover:rotate-12" />
                <span className="text-2xl font-bold text-brand-black italic">Plandepa</span>
              </a>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                <Menu className={`m-auto w-6 h-6 transition-all duration-200 ${menuOpen ? 'rotate-180 scale-0 opacity-0' : ''}`} />
                <X className={`absolute inset-0 m-auto w-6 h-6 transition-all duration-200 ${menuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-180 scale-0 opacity-0'}`} />
              </button>

              <div className="hidden lg:block">
                <ul className="flex gap-8 text-sm">
                  <li><a href="#services" className="text-brand-black/70 hover:text-brand-darkred transition-colors">Services</a></li>
                  <li><a href="#how-it-works" className="text-brand-black/70 hover:text-brand-darkred transition-colors">How It Works</a></li>
                  <li><a href="#lead-generation" className="text-brand-black/70 hover:text-brand-darkred transition-colors">Lead Generation</a></li>
                  <li><a href="#case-studies" className="text-brand-black/70 hover:text-brand-darkred transition-colors">Case Studies</a></li>
                  <li><a href="#faq" className="text-brand-black/70 hover:text-brand-darkred transition-colors">FAQ</a></li>
                </ul>
              </div>
            </div>

            <div className={`bg-brand-offwhite mb-6 w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none ${menuOpen ? 'flex' : 'hidden'}`}>
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  <li><a href="#services" className="text-brand-black/70 hover:text-brand-darkred transition-colors block">Services</a></li>
                  <li><a href="#how-it-works" className="text-brand-black/70 hover:text-brand-darkred transition-colors block">How It Works</a></li>
                  <li><a href="#lead-generation" className="text-brand-black/70 hover:text-brand-darkred transition-colors block">Lead Generation</a></li>
                  <li><a href="#case-studies" className="text-brand-black/70 hover:text-brand-darkred transition-colors block">Case Studies</a></li>
                  <li><a href="#faq" className="text-brand-black/70 hover:text-brand-darkred transition-colors block">FAQ</a></li>
                </ul>
              </div>
              <a
                href="#contact"
                className="bg-brand-darkred hover:bg-brand-black text-white px-6 py-3 rounded-full font-bold transition-all duration-300 shadow-premium hover:shadow-premium-lg hover:scale-105 inline-block text-center"
              >
                Free Audit
              </a>
            </div>
          </motion.div>
        </div>
      </nav>

      <section>
        <div className="py-24 md:pb-32 lg:pb-36 lg:pt-72">
          <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 lg:block lg:px-12">
            <div className="mx-auto max-w-lg text-center lg:ml-0 lg:max-w-full lg:text-left">
              <h1 className="mt-8 max-w-2xl text-balance text-5xl md:text-6xl lg:mt-16 xl:text-7xl font-black text-brand-black leading-tight">
                Less Paperwork. Better Systems. More Quality Leads.
              </h1>
              <p className="mt-8 max-w-2xl text-balance text-lg text-brand-black/70">
                We help construction companies automate the admin, close more deals, and scale faster with AI-powered systems. Stop chasing quotes. Start building your dream business.
              </p>

              <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                <a
                  href="#contact"
                  className="h-12 rounded-full bg-brand-darkred hover:bg-brand-black text-white pl-5 pr-3 text-base font-bold inline-flex items-center justify-center transition-all duration-300 shadow-premium hover:shadow-premium-lg hover:scale-105"
                >
                  <span className="text-nowrap">Get Your Free AI Strategy Audit</span>
                  <ChevronRight className="ml-1 w-5 h-5" />
                </a>
                <a
                  href="#lead-generation"
                  className="h-12 rounded-full px-5 text-base font-bold inline-flex items-center justify-center hover:bg-brand-black/5 transition-colors text-brand-black"
                >
                  <span className="text-nowrap">See Lead Generation System</span>
                </a>
              </div>
            </div>
          </div>
          <div className="aspect-[2/3] absolute inset-1 overflow-hidden rounded-3xl border border-brand-black/10 sm:aspect-video lg:rounded-[3rem]">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-50"
              src="https://cdn.pixabay.com/video/2022/06/06/119783-720050834_large.mp4"
            ></video>
          </div>
        </div>
      </section>

      <section className="bg-brand-offwhite pb-2">
        <div className="group relative m-auto max-w-7xl px-6">
          <div className="flex flex-col items-center md:flex-row">
            <div className="md:max-w-44 md:border-r md:pr-6 border-brand-black/20">
              <p className="text-end text-sm text-brand-black/70">Trusted by construction companies</p>
            </div>
            <div className="relative py-6 md:w-[calc(100%-11rem)]">
              <InfiniteSlider
                speedOnHover={20}
                speed={40}
                gap={112}
              >
                <div className="flex items-center justify-center">
                  <span className="text-brand-black font-bold text-xl">Procore</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-brand-black font-bold text-xl">Buildertrend</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-brand-black font-bold text-xl">CoConstruct</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-brand-black font-bold text-xl">Jobber</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-brand-black font-bold text-xl">ServiceTitan</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-brand-black font-bold text-xl">BuilderTREND</span>
                </div>
              </InfiniteSlider>

              <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-brand-offwhite to-transparent"></div>
              <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-brand-offwhite to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-gradient-to-r from-brand-darkred to-[#c41e3a] border-y-4 border-brand-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-white italic mb-2">
              Our Guarantee: 10x Your Investment in 90 Days
            </h2>
            <p className="text-white/90 text-lg font-medium">Or We Work For Free Until You Do</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
                <TrendingUp className="w-8 h-8 text-brand-darkred" />
              </div>
              <div className="text-4xl font-black text-white mb-2">500+</div>
              <div className="text-white/90 font-medium">Hours Saved Per Client</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
                <Award className="w-8 h-8 text-brand-darkred" />
              </div>
              <div className="text-4xl font-black text-white mb-2">85%</div>
              <div className="text-white/90 font-medium">Quote-to-Close Rate Increase</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
                <Shield className="w-8 h-8 text-brand-darkred" />
              </div>
              <div className="text-4xl font-black text-white mb-2">Zero Risk</div>
              <div className="text-white/90 font-medium">100% Satisfaction Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-0">
            <div className="bg-white p-10 border-r border-b md:border-b-0 border-brand-black/20 group hover:bg-brand-offwhite transition-colors">
              <div className="w-16 h-16 mb-6">
                <Brain className="w-full h-full text-brand-black" />
              </div>
              <h3 className="text-2xl font-black text-brand-black mb-4 uppercase leading-tight">AI STRATEGY & CONSULTING</h3>
              <p className="text-brand-black/70 mb-6 leading-relaxed">Expert guidance, support, and training to streamline your AI strategy, implementation, and team enablement.</p>
              <a href="#services" className="inline-flex items-center space-x-2 text-brand-black font-bold group-hover:text-brand-darkred transition-colors">
                <span>See how we work</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="bg-white p-10 border-r border-b md:border-b-0 border-brand-black/20 group hover:bg-brand-offwhite transition-colors">
              <div className="w-16 h-16 mb-6">
                <Bot className="w-full h-full text-brand-black" />
              </div>
              <h3 className="text-2xl font-black text-brand-black mb-4 uppercase leading-tight">AUTOMATION & INTEGRATION</h3>
              <p className="text-brand-black/70 mb-6 leading-relaxed">With expert support that keeps your business operations optimized and automated efficiently.</p>
              <a href="#services" className="inline-flex items-center space-x-2 text-brand-black font-bold group-hover:text-brand-darkred transition-colors">
                <span>Find out more</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="bg-white p-10 border-b md:border-b-0 border-brand-black/20 group hover:bg-brand-offwhite transition-colors">
              <div className="w-16 h-16 mb-6">
                <LineChart className="w-full h-full text-brand-black" />
              </div>
              <h3 className="text-2xl font-black text-brand-black mb-4 uppercase leading-tight">DATA ANALYTICS & INSIGHTS</h3>
              <p className="text-brand-black/70 mb-6 leading-relaxed">With expert analytics, reporting, insights, and predictive modeling tailored for your business.</p>
              <a href="#services" className="inline-flex items-center space-x-2 text-brand-black font-bold group-hover:text-brand-darkred transition-colors">
                <span>Explore analytics services</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-br from-[#F5A623] to-[#E89B1C] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-brand-black font-bold uppercase tracking-wide">We've Got The Tools To Level Up Your Business</p>
              <h2 className="text-4xl lg:text-6xl font-black text-brand-black leading-tight uppercase">
                COMPLETE TOOLBOX FOR YOUR AI TRANSFORMATION
              </h2>
              <p className="text-lg text-brand-black/90 leading-relaxed font-medium">
                You want a business that runs smoothly, supports your lifestyle, and gives you time back. Not one that drains your energy with constant challenges, clunky systems, or missed opportunities.
              </p>
              <p className="text-lg text-brand-black leading-relaxed font-bold">
                We understand the pressure you're under because we've lived it. Our services are built specifically for modern businesses to simplify the complex stuff, free up your time, and help your business grow without the overwhelm.
              </p>
              <a
                href="#contact"
                className="inline-block bg-white hover:bg-brand-black hover:text-white text-brand-black px-8 py-4 font-bold uppercase transition-all duration-300 shadow-premium hover:shadow-premium-lg hover:scale-105 border-2 border-brand-black"
              >
                NEED A HAND?
              </a>
            </div>
            <div className="relative">
              <div className="absolute top-8 right-8 bg-white p-4 shadow-premium-lg border-2 border-brand-black">
                <div className="flex items-center space-x-3">
                  <div className="text-[#4285F4] text-4xl font-bold">G</div>
                  <div>
                    <div className="flex space-x-1 mb-1">
                      <Star className="w-5 h-5 fill-[#FBBC04] text-[#FBBC04]" />
                      <Star className="w-5 h-5 fill-[#FBBC04] text-[#FBBC04]" />
                      <Star className="w-5 h-5 fill-[#FBBC04] text-[#FBBC04]" />
                      <Star className="w-5 h-5 fill-[#FBBC04] text-[#FBBC04]" />
                      <Star className="w-5 h-5 fill-[#FBBC04] text-[#FBBC04]" />
                    </div>
                    <p className="text-xs font-bold text-brand-black">5.0 Top Rated Service</p>
                    <p className="text-xs text-brand-black/60">verified by TrustIndex</p>
                  </div>
                </div>
              </div>
              <img
                src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="AI Tools"
                className="w-full h-auto shadow-premium-lg border-4 border-brand-black"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="offers" className="py-24 px-4 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl lg:text-6xl font-black text-brand-black mb-4 italic">Our Core <span className="text-brand-darkred">Offers</span></h2>
            <p className="text-xl text-brand-black/70 max-w-2xl mx-auto font-medium">Start for free. Scale with guaranteed results.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-10 shadow-premium-lg card-premium group relative overflow-hidden border-2 border-brand-darkred">
              <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-full font-bold text-sm uppercase shadow-lg">
                100% FREE
              </div>
              <div className="relative z-10">
                <div className="bg-brand-darkred w-16 h-16 flex items-center justify-center shadow-premium mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-black text-brand-black mb-4 italic">Free AI Strategy Audit</h3>
                <p className="text-brand-black/70 mb-6 leading-relaxed font-medium">
                  Get a comprehensive 90-minute deep dive into your construction business. No obligation. No credit card. Just valuable insights you can implement immediately.
                </p>
                <div className="mb-6 p-4 bg-brand-offwhite rounded-lg border-l-4 border-brand-darkred">
                  <p className="font-bold text-brand-black mb-2 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-brand-darkred" />
                    90-Minute Deep Dive Session
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-brand-black font-semibold">Complete analysis of your current systems and workflows</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-brand-black font-semibold">Custom AI roadmap tailored to your trade</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-brand-black font-semibold">Identify 10+ hours per week you can automate</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-brand-black font-semibold">Unbiased software recommendations</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-brand-black font-semibold">Implementation timeline & ROI projections</span>
                  </li>
                </ul>
                <a href="#contact" className="inline-flex items-center space-x-2 bg-brand-darkred text-white px-8 py-4 rounded-full font-bold group-hover:bg-brand-black transition-all shadow-premium hover:shadow-premium-lg hover:scale-105">
                  <span>Book Your Free Audit</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="bg-white p-10 shadow-premium-lg card-premium group relative overflow-hidden border-2 border-brand-darkred">
              <div className="absolute top-4 right-4 bg-brand-darkred text-white px-4 py-2 rounded-full font-bold text-sm uppercase shadow-lg">
                Results Guaranteed
              </div>
              <div className="relative z-10">
                <div className="bg-brand-darkred w-16 h-16 flex items-center justify-center shadow-premium mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-black text-brand-black mb-4 italic">Lead Generation System</h3>
                <p className="text-brand-black/70 mb-6 leading-relaxed font-medium">
                  Stop waiting for the phone to ring. Get a steady flow of qualified, ready-to-build prospects delivered straight to your inbox with AI-powered qualification.
                </p>
                <div className="mb-6 p-4 bg-brand-offwhite rounded-lg border-l-4 border-brand-darkred">
                  <p className="font-bold text-brand-black mb-2">Pay for Results, Not Clicks</p>
                  <p className="text-sm text-brand-black/70">Only high-intent prospects ready to say yes</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-brand-black font-semibold">AI-powered lead qualification and scoring</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-brand-black font-semibold">Only high-intent, ready-to-build prospects</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-brand-black font-semibold">Automated follow-up sequences</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-brand-black font-semibold">CRM integration and lead tracking</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-brand-black font-semibold">Weekly performance reports</span>
                  </li>
                </ul>
                <a href="#lead-generation" className="inline-flex items-center space-x-2 bg-brand-darkred text-white px-8 py-4 rounded-full font-bold group-hover:bg-brand-black transition-all shadow-premium hover:shadow-premium-lg hover:scale-105">
                  <span>Learn How It Works</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-24 px-4 bg-white border-y border-brand-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brand-darkred text-lg font-bold mb-4 uppercase tracking-wide">Comprehensive Construction Business Solutions</p>
            <h2 className="text-4xl lg:text-6xl font-black text-brand-black mb-4 uppercase leading-tight">
              HOW WE HELP CONSTRUCTION<br />COMPANIES SCALE
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
            {services.map((service) => {
              const IconComponent = getIcon(service.icon_name);
              return (
                <div
                  key={service.id}
                  className="bg-white p-8 card-premium group cursor-pointer border-2 border-brand-black/10 rounded-2xl hover:border-brand-darkred transition-all duration-300 flex flex-col"
                >
                  <div className="w-14 h-14 bg-brand-darkred flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-brand-black mb-3 uppercase leading-tight">{service.title}</h3>
                  <p className="text-brand-darkred font-bold mb-3 text-lg italic">{service.pain_point}</p>
                  <p className="text-brand-black/70 leading-relaxed font-medium mb-6 flex-grow">{service.solution}</p>
                  <a href="#contact" className="inline-flex items-center space-x-2 text-brand-black font-bold group-hover:text-brand-darkred transition-colors mt-auto">
                    <span>{service.cta_text}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 px-4 bg-gradient-to-br from-brand-offwhite to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brand-darkred text-lg font-bold mb-4 uppercase tracking-wide">Your Journey With Us</p>
            <h2 className="text-4xl lg:text-6xl font-black text-brand-black mb-4 uppercase leading-tight">
              HOW IT WORKS
            </h2>
            <p className="text-xl text-brand-black/70 max-w-2xl mx-auto font-medium">You focus on building. We handle the systems.</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="space-y-8">
              <div className="flex gap-6 items-start group">
                <div className="flex-shrink-0 w-20 h-20 bg-brand-darkred flex items-center justify-center text-white font-black text-3xl group-hover:scale-110 transition-transform duration-300 shadow-premium">
                  1
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-3xl font-black text-brand-black mb-3 italic">Free Audit</h3>
                  <p className="text-brand-black/80 text-lg leading-relaxed">
                    We analyze your business, identify opportunities, and create your custom roadmap. No obligation, no sales pitch - just valuable insights.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="flex-shrink-0 w-20 h-20 bg-brand-darkred flex items-center justify-center text-white font-black text-3xl group-hover:scale-110 transition-transform duration-300 shadow-premium">
                  2
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-3xl font-black text-brand-black mb-3 italic">Strategy Session</h3>
                  <p className="text-brand-black/80 text-lg leading-relaxed">
                    Review findings together, prioritize quick wins, and plan implementation timeline with clear ROI projections.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="flex-shrink-0 w-20 h-20 bg-brand-darkred flex items-center justify-center text-white font-black text-3xl group-hover:scale-110 transition-transform duration-300 shadow-premium">
                  3
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-3xl font-black text-brand-black mb-3 italic">Implementation</h3>
                  <p className="text-brand-black/80 text-lg leading-relaxed">
                    We set up systems, train your team, and integrate your tools. You're involved in key decisions, we handle the technical heavy lifting.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="flex-shrink-0 w-20 h-20 bg-brand-darkred flex items-center justify-center text-white font-black text-3xl group-hover:scale-110 transition-transform duration-300 shadow-premium">
                  4
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-3xl font-black text-brand-black mb-3 italic">Lead Generation Launch</h3>
                  <p className="text-brand-black/80 text-lg leading-relaxed">
                    Activate your lead pipeline and start receiving qualified prospects. Watch your inbox fill with opportunities while we handle the vetting.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="flex-shrink-0 w-20 h-20 bg-brand-darkred flex items-center justify-center text-white font-black text-3xl group-hover:scale-110 transition-transform duration-300 shadow-premium">
                  5
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-3xl font-black text-brand-black mb-3 italic">Ongoing Partnership</h3>
                  <p className="text-brand-black/80 text-lg leading-relaxed">
                    Regular check-ins, optimization, and scaling support. We grow with you as your business expands.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center p-8 bg-white rounded-2xl shadow-premium-lg border-2 border-brand-darkred">
              <p className="text-2xl font-black text-brand-black mb-4 italic">Ready to Get Started?</p>
              <p className="text-brand-black/70 mb-6 text-lg">Book your free 90-minute audit today - no credit card, no obligation.</p>
              <a href="#contact" className="inline-flex items-center space-x-2 bg-brand-darkred text-white px-8 py-4 rounded-full font-bold hover:bg-brand-black transition-all shadow-premium hover:shadow-premium-lg hover:scale-105">
                <span>Book Your Free Audit</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-black text-brand-black mb-4 italic">See Us In <span className="text-brand-darkred">Action</span></h2>
            <p className="text-xl text-brand-black/70 max-w-2xl mx-auto font-medium">Watch how we transform businesses with AI</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4 card-premium">
              <div className="aspect-video bg-white shadow-premium-lg overflow-hidden relative group border border-brand-black/5">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Plandepa Video 1"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <h3 className="text-2xl font-black text-brand-black">Client Success Story</h3>
              <p className="text-brand-black/70 font-medium">How we helped XYZ Corp increase efficiency by 300%</p>
            </div>

            <div className="space-y-4 card-premium">
              <div className="aspect-video bg-white shadow-premium-lg overflow-hidden relative group border border-brand-black/5">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Plandepa Video 2"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <h3 className="text-2xl font-black text-brand-black">Our AI Approach</h3>
              <p className="text-brand-black/70 font-medium">Learn about our proven methodology and process</p>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="py-24 px-4 bg-white border-y border-brand-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-black text-brand-black mb-4 italic">Meet The <span className="text-brand-darkred">Founders</span></h2>
            <p className="text-xl text-brand-black/70 max-w-2xl mx-auto font-medium">The visionaries behind Plandepa</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {founders.map((founder, index) => (
              <div key={index} className="text-center group card-premium">
                <div className="mb-6 relative inline-block">
                  <div className="w-72 h-72 overflow-hidden shadow-premium-lg relative border border-brand-black/5">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-brand-darkred shadow-premium w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-brand-black mb-2 italic">{founder.name}</h3>
                <p className="text-brand-darkred font-bold mb-4">{founder.role}</p>
                <p className="text-brand-black/70 leading-relaxed font-medium">{founder.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="guarantee" className="py-24 px-4 bg-gradient-to-br from-brand-black to-[#1a1a1a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-brand-darkred rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-brand-darkred rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-2 bg-brand-darkred text-white font-bold rounded-full mb-6 uppercase text-sm tracking-wide">
              Our Promise To You
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 italic">
              The 10x ROI Guarantee
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto font-medium">
              We're so confident in our systems that we put our money where our mouth is
            </p>
          </div>

          <div className="bg-white rounded-3xl p-10 lg:p-16 shadow-premium-lg mb-12">
            <div className="text-center mb-12">
              <div className="text-6xl lg:text-8xl font-black text-brand-darkred mb-4 italic">10x</div>
              <p className="text-2xl lg:text-3xl font-black text-brand-black mb-4">Return on Investment in 90 Days</p>
              <p className="text-xl text-brand-black/70 font-medium">Or We Work For Free Until You Do</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-black text-brand-black mb-2">No Long-Term Contracts</h3>
                <p className="text-brand-black/70">Cancel anytime. No questions asked.</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-black text-brand-black mb-2">You Own Everything</h3>
                <p className="text-brand-black/70">All systems, data, and IP are 100% yours.</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-black text-brand-black mb-2">Guaranteed Results</h3>
                <p className="text-brand-black/70">If you don't hit 10x ROI, we keep working for free.</p>
              </div>
            </div>

            <div className="bg-brand-offwhite p-8 rounded-2xl border-l-4 border-brand-darkred">
              <h3 className="text-2xl font-black text-brand-black mb-4">Why We Can Make This Promise</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-darkred rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-brand-black/80"><strong>Proven Systems:</strong> We've helped 200+ construction companies achieve these results</p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-darkred rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-brand-black/80"><strong>Construction-Specific Expertise:</strong> Our templates and workflows are built specifically for trades</p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-darkred rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-brand-black/80"><strong>Data-Driven Approach:</strong> We track every metric and optimize continuously</p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-darkred rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-brand-black/80"><strong>We're Invested in Your Success:</strong> Your wins are our wins - simple as that</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <a href="#contact" className="inline-flex items-center space-x-2 bg-brand-darkred text-white px-10 py-5 rounded-full font-black text-lg hover:bg-white hover:text-brand-darkred transition-all shadow-premium-lg hover:scale-105">
              <span>Claim Your Free Audit Now</span>
              <ArrowRight className="w-6 h-6" />
            </a>
            <p className="text-white/80 mt-4 text-sm">No credit card required • 100% risk-free</p>
          </div>
        </div>
      </section>

      <section id="case-studies" className="py-24 px-4 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brand-darkred text-lg font-bold mb-4 uppercase tracking-wide">Real Results. Real Construction Companies.</p>
            <h2 className="text-4xl lg:text-6xl font-black text-brand-black mb-4 uppercase leading-tight">SUCCESS STORIES</h2>
            <p className="text-xl text-brand-black/70 max-w-2xl mx-auto font-medium">See how we've helped construction companies like yours scale</p>
          </div>

          {caseStudies.length > 0 ? (
            <div className="space-y-8">
              {caseStudies.map((caseStudy) => (
                <div key={caseStudy.id} className="bg-white p-10 lg:p-12 shadow-premium-lg card-premium border-2 border-brand-black/10 hover:border-brand-darkred transition-all duration-300">
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div>
                      <div className="inline-block px-4 py-2 bg-brand-darkred text-white font-bold rounded-full text-sm mb-4 uppercase">
                        {caseStudy.company_type}
                      </div>
                      {caseStudy.location && (
                        <p className="text-brand-black/60 text-sm font-medium mb-6">{caseStudy.location}</p>
                      )}
                      <div className="mb-6">
                        <h4 className="text-lg font-black text-brand-darkred mb-2 uppercase">The Problem</h4>
                        <p className="text-brand-black/80 leading-relaxed">{caseStudy.problem}</p>
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-brand-darkred mb-2 uppercase">The Solution</h4>
                        <p className="text-brand-black/80 leading-relaxed">{caseStudy.solution}</p>
                      </div>
                    </div>
                    <div className="lg:col-span-2">
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border-2 border-green-600 mb-6">
                        <h4 className="text-2xl font-black text-brand-black mb-4 uppercase flex items-center">
                          <TrendingUp className="w-8 h-8 mr-3 text-green-600" />
                          The Results
                        </h4>
                        <p className="text-brand-black/90 text-lg leading-relaxed font-medium">{caseStudy.results}</p>
                      </div>
                      {caseStudy.testimonial && (
                        <div className="bg-brand-offwhite p-6 rounded-xl border-l-4 border-brand-darkred">
                          <p className="text-brand-black/80 italic leading-relaxed mb-4">"{caseStudy.testimonial}"</p>
                          <div className="flex items-center">
                            <div>
                              <p className="font-bold text-brand-black">{caseStudy.client_name}</p>
                              <p className="text-brand-black/60 text-sm font-medium">{caseStudy.client_role}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 shadow-premium-lg card-premium border border-brand-black/5">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-brand-darkred text-2xl">★</span>
                  ))}
                </div>
                <p className="text-brand-black/80 mb-6 italic leading-relaxed font-medium">"Plandepa transformed our operations completely. The AI solutions they implemented saved us thousands of hours annually."</p>
                <div>
                  <p className="font-bold text-brand-black">John Smith</p>
                  <p className="text-brand-black/60 text-sm font-medium">CEO, Tech Corp</p>
                </div>
              </div>

              <div className="bg-white p-8 shadow-premium-lg card-premium border border-brand-black/5">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-brand-darkred text-2xl">★</span>
                  ))}
                </div>
                <p className="text-brand-black/80 mb-6 italic leading-relaxed font-medium">"Working with Plandepa was seamless. Their expertise in AI is unmatched and the results speak for themselves."</p>
                <div>
                  <p className="font-bold text-brand-black">Sarah Johnson</p>
                  <p className="text-brand-black/60 text-sm font-medium">Director, Innovation Labs</p>
                </div>
              </div>

              <div className="bg-white p-8 shadow-premium-lg card-premium border border-brand-black/5">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-brand-darkred text-2xl">★</span>
                  ))}
                </div>
                <p className="text-brand-black/80 mb-6 italic leading-relaxed font-medium">"The ROI we've seen from their AI solutions exceeded our expectations. Truly a game-changer for our business."</p>
                <div>
                  <p className="font-bold text-brand-black">Michael Chen</p>
                  <p className="text-brand-black/60 text-sm font-medium">CFO, Global Industries</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="lead-generation" className="py-24 px-4 bg-white border-y border-brand-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brand-darkred text-lg font-bold mb-4 uppercase tracking-wide">Quality Over Quantity</p>
            <h2 className="text-4xl lg:text-6xl font-black text-brand-black mb-4 uppercase leading-tight">
              NOT ALL LEADS ARE<br />CREATED EQUAL
            </h2>
            <p className="text-xl text-brand-black/70 max-w-3xl mx-auto font-medium">We only send you qualified, ready-to-build prospects. No tire-kickers, no time-wasters.</p>
          </div>

          <div className="max-w-5xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-brand-offwhite to-white p-10 rounded-3xl border-2 border-brand-darkred shadow-premium-lg">
              <h3 className="text-3xl font-black text-brand-black mb-12 text-center italic">How Our Lead System Works</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-brand-darkred rounded-full flex items-center justify-center text-white font-black text-xl shadow-premium">
                      1
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Search className="w-6 h-6 text-brand-darkred mr-3" />
                      <h4 className="text-2xl font-black text-brand-black">Multi-Channel Lead Capture</h4>
                    </div>
                    <p className="text-brand-black/80 text-lg leading-relaxed">
                      Leads come in from targeted campaigns across Google, Facebook, industry sites, and referral networks.
                    </p>
                  </div>
                </div>

                <div className="ml-8 border-l-4 border-brand-darkred/30 pl-4 py-2">
                  <div className="flex items-center text-brand-black/60 font-bold">
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Raw leads enter the system
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-brand-darkred rounded-full flex items-center justify-center text-white font-black text-xl shadow-premium">
                      2
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Brain className="w-6 h-6 text-brand-darkred mr-3" />
                      <h4 className="text-2xl font-black text-brand-black">AI-Powered Scoring</h4>
                    </div>
                    <p className="text-brand-black/80 text-lg leading-relaxed">
                      Our AI analyzes project size, budget indicators, timeline, location, and intent signals to score each lead.
                    </p>
                  </div>
                </div>

                <div className="ml-8 border-l-4 border-brand-darkred/30 pl-4 py-2">
                  <div className="flex items-center text-brand-black/60 font-bold">
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Low-quality leads filtered out
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-brand-darkred rounded-full flex items-center justify-center text-white font-black text-xl shadow-premium">
                      3
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <CheckCircle2 className="w-6 h-6 text-brand-darkred mr-3" />
                      <h4 className="text-2xl font-black text-brand-black">Automated Qualification</h4>
                    </div>
                    <p className="text-brand-black/80 text-lg leading-relaxed">
                      High-scoring leads receive automated qualification questions to confirm budget, timeline, and decision-making authority.
                    </p>
                  </div>
                </div>

                <div className="ml-8 border-l-4 border-brand-darkred/30 pl-4 py-2">
                  <div className="flex items-center text-brand-black/60 font-bold">
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Only qualified leads move forward
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white shadow-premium">
                      <Mail className="w-8 h-8" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Send className="w-6 h-6 text-green-600 mr-3" />
                      <h4 className="text-2xl font-black text-brand-black">Delivered to Your Inbox</h4>
                    </div>
                    <p className="text-brand-black/80 text-lg leading-relaxed">
                      Qualified leads land in your inbox with full details, scoring breakdown, and next steps. You step in when they're ready to talk numbers.
                    </p>
                  </div>
                </div>

                <div className="ml-8 border-l-4 border-green-600/30 pl-4 py-2">
                  <div className="flex items-center text-green-600 font-bold">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Automated follow-up keeps them warm until you connect
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-brand-offwhite p-8 rounded-2xl border-l-4 border-brand-darkred">
              <h3 className="text-2xl font-black text-brand-black mb-4 flex items-center">
                <Target className="w-7 h-7 mr-3 text-brand-darkred" />
                What Makes a Quality Lead?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-brand-black/80"><strong>Budget Confirmed:</strong> They have funding ready or approved</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-brand-black/80"><strong>Timeline Defined:</strong> They want to start within 90 days</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-brand-black/80"><strong>Decision Authority:</strong> They can say yes without jumping through hoops</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-brand-black/80"><strong>Good Fit:</strong> Project matches your expertise and capacity</span>
                </li>
              </ul>
            </div>

            <div className="bg-brand-offwhite p-8 rounded-2xl border-l-4 border-brand-darkred">
              <h3 className="text-2xl font-black text-brand-black mb-4 flex items-center">
                <TrendingUp className="w-7 h-7 mr-3 text-brand-darkred" />
                Average Performance
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-brand-black">Lead Quality Score</span>
                    <span className="text-brand-darkred font-black text-xl">8.5/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-green-600 h-3 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-brand-black">Conversion Rate</span>
                    <span className="text-brand-darkred font-black text-xl">38%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-green-600 h-3 rounded-full" style={{ width: '38%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-brand-black">Time Saved Per Lead</span>
                    <span className="text-brand-darkred font-black text-xl">3.5 hrs</span>
                  </div>
                  <p className="text-sm text-brand-black/70">vs. traditional cold outreach</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center bg-gradient-to-br from-brand-darkred to-[#c41e3a] p-12 rounded-3xl shadow-premium-lg">
            <h3 className="text-3xl font-black text-white mb-4 italic">Ready to Fill Your Pipeline?</h3>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">Stop relying on word-of-mouth. Get predictable, qualified lead flow starting this month.</p>
            <a href="#contact" className="inline-flex items-center space-x-2 bg-white text-brand-darkred px-8 py-4 rounded-full font-bold hover:bg-brand-black hover:text-white transition-all shadow-premium hover:shadow-premium-lg hover:scale-105">
              <span>Get Started with Lead Generation</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      <section id="blog" className="py-24 px-4 bg-white border-y border-brand-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl lg:text-6xl font-black text-brand-black mb-4 italic">Latest <span className="text-brand-darkred">Insights</span></h2>
              <p className="text-xl text-brand-black/70 font-medium">Stay updated with AI trends and insights</p>
            </div>
            <a href="#blog" className="hidden md:inline-flex items-center space-x-2 text-brand-darkred font-bold hover:translate-x-2 transition-transform group">
              <span>View All Articles</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {blogPosts.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <div key={post.id} className="bg-brand-offwhite shadow-premium-lg card-premium group overflow-hidden border border-brand-black/5">
                  <div className="aspect-video bg-white overflow-hidden">
                    <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <p className="text-brand-darkred text-sm font-bold mb-2">{new Date(post.published_at).toLocaleDateString()}</p>
                    <h3 className="text-xl font-black text-brand-black mb-3 group-hover:text-brand-darkred transition-colors">{post.title}</h3>
                    <p className="text-brand-black/70 mb-4 leading-relaxed font-medium">{post.excerpt}</p>
                    <a href="#" className="inline-flex items-center space-x-2 text-brand-black font-bold group-hover:text-brand-darkred transition-colors">
                      <span>Read More</span>
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-brand-offwhite shadow-premium-lg card-premium group overflow-hidden border border-brand-black/5">
                  <div className="aspect-video bg-gradient-to-br from-brand-darkred/5 to-brand-darkred/10 flex items-center justify-center">
                    <Brain className="w-16 h-16 text-brand-darkred" />
                  </div>
                  <div className="p-6">
                    <p className="text-brand-darkred text-sm font-bold mb-2">Coming Soon</p>
                    <h3 className="text-xl font-black text-brand-black mb-3 group-hover:text-brand-darkred transition-colors">Latest AI Trends {i}</h3>
                    <p className="text-brand-black/70 mb-4 leading-relaxed font-medium">Stay tuned for our latest insights on AI innovation and business transformation.</p>
                    <a href="#" className="inline-flex items-center space-x-2 text-brand-black font-bold group-hover:text-brand-darkred transition-colors">
                      <span>Read More</span>
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 px-4 bg-brand-darkred relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-black/10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Mail className="w-16 h-16 text-white mx-auto mb-6 animate-float" />
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-4 italic">Stay In The Loop</h2>
          <p className="text-xl text-white/95 mb-8 font-medium">Get exclusive AI insights and updates delivered to your inbox</p>

          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-4 bg-white text-brand-black font-semibold shadow-premium"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-brand-black hover:bg-white hover:text-brand-black text-white px-8 py-4 font-bold transition-all duration-300 shadow-premium hover:shadow-premium-lg hover:scale-105 disabled:opacity-50 whitespace-nowrap btn-premium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <section id="faq" className="py-24 px-4 bg-gradient-to-br from-white to-brand-offwhite">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brand-darkred text-lg font-bold mb-4 uppercase tracking-wide">Got Questions?</p>
            <h2 className="text-4xl lg:text-6xl font-black text-brand-black mb-4 uppercase leading-tight">
              FREQUENTLY ASKED<br />QUESTIONS
            </h2>
            <p className="text-xl text-brand-black/70 font-medium">Everything you need to know about partnering with us</p>
          </div>

          {faqs.length > 0 ? (
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.id} className="bg-white p-6 rounded-2xl shadow-premium border-2 border-brand-black/10 hover:border-brand-darkred transition-all duration-300 group">
                  <summary className="cursor-pointer list-none flex justify-between items-center">
                    <h3 className="text-xl font-black text-brand-black pr-4 group-hover:text-brand-darkred transition-colors">
                      {faq.question}
                    </h3>
                    <ChevronRight className="w-6 h-6 text-brand-darkred flex-shrink-0 transform group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="mt-4 pt-4 border-t border-brand-black/10">
                    <p className="text-brand-black/80 leading-relaxed text-lg">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <details className="bg-white p-6 rounded-2xl shadow-premium border-2 border-brand-black/10 hover:border-brand-darkred transition-all duration-300 group">
                <summary className="cursor-pointer list-none flex justify-between items-center">
                  <h3 className="text-xl font-black text-brand-black pr-4 group-hover:text-brand-darkred transition-colors">
                    How quickly can we get started?
                  </h3>
                  <ChevronRight className="w-6 h-6 text-brand-darkred flex-shrink-0 transform group-open:rotate-90 transition-transform" />
                </summary>
                <div className="mt-4 pt-4 border-t border-brand-black/10">
                  <p className="text-brand-black/80 leading-relaxed text-lg">We can typically schedule your free audit within 48 hours and begin implementation within a week of approval. Quick wins can be achieved in the first 30 days.</p>
                </div>
              </details>
            </div>
          )}

          <div className="mt-12 text-center bg-white p-8 rounded-2xl shadow-premium-lg border-2 border-brand-darkred">
            <h3 className="text-2xl font-black text-brand-black mb-2 italic">Still Have Questions?</h3>
            <p className="text-brand-black/70 mb-6">We're here to help. Book your free audit and we'll answer everything.</p>
            <a href="#contact" className="inline-flex items-center space-x-2 bg-brand-darkred text-white px-8 py-4 rounded-full font-bold hover:bg-brand-black transition-all shadow-premium hover:shadow-premium-lg hover:scale-105">
              <span>Talk To Us</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 px-4 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl lg:text-6xl font-black text-brand-black mb-6 italic">Ready to <span className="text-brand-darkred">Get Started?</span></h2>
              <p className="text-xl text-brand-black/70 mb-8 leading-relaxed font-medium">
                Book your free 90-minute AI strategy audit or enquire about our lead generation system. No credit card required. No obligation.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4 p-6 bg-white shadow-premium card-premium border-2 border-green-600">
                  <div className="bg-green-600 w-12 h-12 flex items-center justify-center shadow-premium flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-brand-black mb-1">100% Free Consultation</h3>
                    <p className="text-brand-black/70 font-medium">No sales pitch. Just valuable insights.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-white shadow-premium card-premium border-2 border-green-600">
                  <div className="bg-green-600 w-12 h-12 flex items-center justify-center shadow-premium flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-brand-black mb-1">Quick Response</h3>
                    <p className="text-brand-black/70 font-medium">We respond within 24 hours, typically sooner</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-white shadow-premium card-premium border-2 border-green-600">
                  <div className="bg-green-600 w-12 h-12 flex items-center justify-center shadow-premium flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-brand-black mb-1">Zero Risk</h3>
                    <p className="text-brand-black/70 font-medium">10x ROI guarantee on all implementations</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 shadow-premium-lg border-2 border-brand-darkred">
              <h3 className="text-2xl font-black text-brand-black mb-6 italic">Get In Touch</h3>
              <form onSubmit={handleEnquirySubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-brand-black font-bold mb-2">Name *</label>
                    <input
                      type="text"
                      value={enquiryForm.name}
                      onChange={(e) => setEnquiryForm({...enquiryForm, name: e.target.value})}
                      required
                      className="w-full px-4 py-3 bg-brand-offwhite border border-brand-black/20 transition-all duration-300 font-medium rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-brand-black font-bold mb-2">Email *</label>
                    <input
                      type="email"
                      value={enquiryForm.email}
                      onChange={(e) => setEnquiryForm({...enquiryForm, email: e.target.value})}
                      required
                      className="w-full px-4 py-3 bg-brand-offwhite border border-brand-black/20 transition-all duration-300 font-medium rounded"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-brand-black font-bold mb-2">Company Name</label>
                    <input
                      type="text"
                      value={enquiryForm.company_name}
                      onChange={(e) => setEnquiryForm({...enquiryForm, company_name: e.target.value})}
                      className="w-full px-4 py-3 bg-brand-offwhite border border-brand-black/20 transition-all duration-300 font-medium rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-brand-black font-bold mb-2">Trade/Specialty</label>
                    <input
                      type="text"
                      value={enquiryForm.trade_specialty}
                      onChange={(e) => setEnquiryForm({...enquiryForm, trade_specialty: e.target.value})}
                      placeholder="e.g., Custom Homes, Electrical, Plumbing"
                      className="w-full px-4 py-3 bg-brand-offwhite border border-brand-black/20 transition-all duration-300 font-medium rounded"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-brand-black font-bold mb-2">Phone</label>
                    <input
                      type="tel"
                      value={enquiryForm.phone}
                      onChange={(e) => setEnquiryForm({...enquiryForm, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-brand-offwhite border border-brand-black/20 transition-all duration-300 font-medium rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-brand-black font-bold mb-2">I'm interested in *</label>
                    <select
                      value={enquiryForm.interest_type}
                      onChange={(e) => setEnquiryForm({...enquiryForm, interest_type: e.target.value})}
                      required
                      className="w-full px-4 py-3 bg-brand-offwhite border border-brand-black/20 transition-all duration-300 font-medium rounded"
                    >
                      <option value="Free Audit">Free AI Strategy Audit</option>
                      <option value="Lead Generation">Lead Generation System</option>
                      <option value="Both">Both Services</option>
                      <option value="Other">Other Services</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-brand-black font-bold mb-2">Message</label>
                  <textarea
                    value={enquiryForm.message}
                    onChange={(e) => setEnquiryForm({...enquiryForm, message: e.target.value})}
                    rows={4}
                    placeholder="Tell us about your business and what you're looking to achieve..."
                    className="w-full px-4 py-3 bg-brand-offwhite border border-brand-black/20 transition-all duration-300 resize-none font-medium rounded"
                  />
                </div>

                <div className="flex items-start space-x-3 p-4 bg-brand-offwhite rounded-lg border-2 border-brand-darkred/20">
                  <input
                    type="checkbox"
                    id="prefer-call"
                    checked={enquiryForm.prefers_call_booking}
                    onChange={(e) => setEnquiryForm({...enquiryForm, prefers_call_booking: e.target.checked})}
                    className="mt-1 w-5 h-5 text-brand-darkred border-brand-black/30 rounded"
                  />
                  <label htmlFor="prefer-call" className="text-brand-black font-medium cursor-pointer flex-1">
                    I'd prefer to book a call directly
                  </label>
                </div>

                {enquiryForm.prefers_call_booking && (
                  <div className="p-6 bg-gradient-to-br from-brand-darkred to-[#c41e3a] rounded-lg">
                    <p className="text-white font-bold mb-3">Book your free 90-minute audit call:</p>
                    <a
                      href="https://calendly.com/your-calendly-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-white text-brand-darkred px-6 py-3 rounded-full font-bold hover:bg-brand-black hover:text-white transition-all shadow-premium"
                    >
                      <Calendar className="w-5 h-5" />
                      <span>Open Calendar</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <p className="text-white/80 text-sm mt-3">Or submit the form and we'll send you the link</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-darkred hover:bg-brand-black text-white px-8 py-4 font-bold transition-all duration-300 shadow-premium hover:shadow-premium-lg hover:scale-105 disabled:opacity-50 flex items-center justify-center space-x-2 btn-premium"
                >
                  <span>Send Message</span>
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-br from-brand-darkred via-[#c41e3a] to-brand-darkred relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'url(https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=1920)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 italic">
            Ready to Build a Better Business?
          </h2>
          <p className="text-xl lg:text-2xl text-white/95 mb-4 font-medium">
            Join 200+ construction companies running smoother, growing faster, and winning more work
          </p>
          <p className="text-lg text-white/90 mb-12 max-w-3xl mx-auto">
            Stop drowning in paperwork. Start focusing on what you do best - building exceptional projects.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <a href="#contact" className="inline-flex items-center space-x-2 bg-white text-brand-darkred px-10 py-5 rounded-full font-black text-lg hover:bg-brand-black hover:text-white transition-all shadow-premium-lg hover:scale-105">
              <span>Book Free Audit</span>
              <ArrowRight className="w-6 h-6" />
            </a>
            <a href="#lead-generation" className="inline-flex items-center space-x-2 bg-transparent border-2 border-white text-white px-10 py-5 rounded-full font-black text-lg hover:bg-white hover:text-brand-darkred transition-all shadow-premium-lg hover:scale-105">
              <span>Explore Lead Generation</span>
              <ArrowRight className="w-6 h-6" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
              <p className="text-white/90 text-sm font-bold mb-2">No credit card required</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
              <p className="text-white/90 text-sm font-bold mb-2">100% Free consultation</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
              <p className="text-white/90 text-sm font-bold mb-2">10x ROI guarantee</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-brand-black text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-6 h-6 text-brand-darkred" />
                <span className="text-xl font-bold italic">Plandepa</span>
              </div>
              <p className="text-white/70 leading-relaxed font-medium">Your Business AI Partner</p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-3 text-white/70">
                <li><a href="#offers" className="hover:text-brand-darkred transition-colors hover:translate-x-1 inline-block font-medium">Offers</a></li>
                <li><a href="#services" className="hover:text-brand-darkred transition-colors hover:translate-x-1 inline-block font-medium">Services</a></li>
                <li><a href="#team" className="hover:text-brand-darkred transition-colors hover:translate-x-1 inline-block font-medium">Team</a></li>
                <li><a href="#blog" className="hover:text-brand-darkred transition-colors hover:translate-x-1 inline-block font-medium">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Services</h4>
              <ul className="space-y-3 text-white/70">
                <li><a href="#services" className="hover:text-brand-darkred transition-colors hover:translate-x-1 inline-block font-medium">AI Strategy</a></li>
                <li><a href="#services" className="hover:text-brand-darkred transition-colors hover:translate-x-1 inline-block font-medium">Automation</a></li>
                <li><a href="#services" className="hover:text-brand-darkred transition-colors hover:translate-x-1 inline-block font-medium">Analytics</a></li>
                <li><a href="#services" className="hover:text-brand-darkred transition-colors hover:translate-x-1 inline-block font-medium">Custom Solutions</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Connect</h4>
              <ul className="space-y-3 text-white/70">
                <li><a href="#contact" className="hover:text-brand-darkred transition-colors hover:translate-x-1 inline-block font-medium">Contact Us</a></li>
                <li><a href="#" className="hover:text-brand-darkred transition-colors hover:translate-x-1 inline-block font-medium">LinkedIn</a></li>
                <li><a href="#" className="hover:text-brand-darkred transition-colors hover:translate-x-1 inline-block font-medium">Twitter</a></li>
                <li><a href="https://plandepa.com" className="hover:text-brand-darkred transition-colors hover:translate-x-1 inline-block font-medium">Plandepa.com</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-white/60">
            <p className="font-medium">&copy; 2024 Plandepa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;