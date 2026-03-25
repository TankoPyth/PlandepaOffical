import { useState, FormEvent } from 'react';
import { ArrowLeft, ArrowRight, Calculator, Clock, DollarSign, TrendingUp, RotateCcw, Check, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AngleDivider } from '../components/ui/AngleDivider';
import { appleEasing } from '../utils/animations';
import { SocialShare } from '../components/ui/SocialShare';
import { trackROICalculatorComplete } from '../utils/analytics';
import { CalendlyPopup } from '../components/ui/CalendlyPopup';
import { SEO } from '../components/SEO';
import { StructuredData, breadcrumbSchema } from '../components/StructuredData';

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL || '';

const hoursMap: Record<string, number> = {
  '5_10': 8,
  '11_20': 15,
  '21_40': 30,
  '40_plus': 45,
};

const rateMap: Record<string, number> = {
  '40_60': 50,
  '60_80': 70,
  '80_100': 90,
  '100_plus': 110,
};

const businessTypeLabels: Record<string, string> = {
  residential_builder: 'Residential Builder',
  commercial_builder: 'Commercial Builder',
  trades_subcontractor: 'Trades / Subcontractor',
  civil_infrastructure: 'Civil / Infrastructure',
};

const projectsLabels: Record<string, string> = {
  '1_10': '1 - 10 projects',
  '11_30': '11 - 30 projects',
  '31_60': '31 - 60 projects',
  '61_plus': '61+ projects',
};

const hoursLabels: Record<string, string> = {
  '5_10': '5 - 10 hours',
  '11_20': '11 - 20 hours',
  '21_40': '21 - 40 hours',
  '40_plus': '40+ hours',
};

const rateLabels: Record<string, string> = {
  '40_60': '$40 - $60',
  '60_80': '$60 - $80',
  '80_100': '$80 - $100',
  '100_plus': '$100+',
};

interface FormData {
  first_name: string;
  email: string;
  company_name: string;
  business_type: string;
  projects_per_year: string;
  weekly_hours: string;
  hourly_rate: string;
}

interface CalculationResults {
  annualHoursSaved: number;
  annualSavings: number;
  netBenefit: number;
  roiPercent: number;
  paybackMonths: number;
}

const TIME_SAVING_FACTOR = 0.6;
const AUTOMATION_COST_ANNUAL = 12000;

function calculateROI(formData: FormData): CalculationResults {
  const weeklyHoursNum = hoursMap[formData.weekly_hours] || 0;
  const hourlyRateNum = rateMap[formData.hourly_rate] || 0;

  const annualHours = weeklyHoursNum * 52;
  const annualHoursSaved = Math.round(annualHours * TIME_SAVING_FACTOR);
  const annualSavings = Math.round(annualHoursSaved * hourlyRateNum);
  const netBenefit = Math.round(annualSavings - AUTOMATION_COST_ANNUAL);
  const monthlySavings = annualSavings / 12;
  const paybackMonths = Math.round((AUTOMATION_COST_ANNUAL / monthlySavings) * 10) / 10;
  const roiPercent = Math.round((netBenefit / AUTOMATION_COST_ANNUAL) * 100);

  return {
    annualHoursSaved,
    annualSavings,
    netBenefit,
    roiPercent,
    paybackMonths,
  };
}

async function sendToWebhook(formData: FormData, results: CalculationResults) {
  if (!WEBHOOK_URL) return;

  const weeklyHoursNum = hoursMap[formData.weekly_hours] || 0;
  const hourlyRateNum = rateMap[formData.hourly_rate] || 0;
  const annualHours = weeklyHoursNum * 52;

  const payload = {
    first_name: formData.first_name,
    email: formData.email,
    company_name: formData.company_name,
    business_type: formData.business_type,
    projects_per_year: formData.projects_per_year,
    weekly_hours_raw: formData.weekly_hours,
    hourly_rate_raw: formData.hourly_rate,
    weekly_hours_num: weeklyHoursNum,
    hourly_rate_num: hourlyRateNum,
    annual_hours: annualHours,
    annual_hours_saved: results.annualHoursSaved,
    annual_savings: results.annualSavings,
    automation_cost_annual: AUTOMATION_COST_ANNUAL,
    net_benefit: results.netBenefit,
    roi_percent: results.roiPercent,
    payback_months: results.paybackMonths,
    submitted_at: new Date().toISOString(),
  };

  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error('Webhook error:', error);
  }
}

function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`h-2 rounded-full transition-all duration-300 ${
            i < currentStep
              ? 'w-8 bg-brand-black'
              : i === currentStep
              ? 'w-8 bg-brand-red'
              : 'w-2 bg-gray-300'
          }`}
        />
      ))}
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Record<string, string>;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-semibold text-brand-black">
        {label} {required && <span className="text-brand-red">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-brand-black focus:border-brand-black focus:outline-none transition-colors duration-200 appearance-none cursor-pointer"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 12px center',
          backgroundSize: '20px',
        }}
      >
        <option value="">Select an option</option>
        {Object.entries(options).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

function InputField({
  label,
  name,
  type,
  value,
  onChange,
  required = false,
  placeholder = '',
}: {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-semibold text-brand-black">
        {label} {required && <span className="text-brand-red">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-brand-black placeholder-gray-400 focus:border-brand-black focus:outline-none transition-colors duration-200"
      />
    </div>
  );
}

function ResultCard({
  icon: Icon,
  label,
  value,
  highlight = false,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: appleEasing }}
      className={`p-4 rounded-xl ${highlight ? 'bg-brand-black text-white' : 'bg-gray-50 border border-gray-200'}`}
    >
      <div className={`w-10 h-10 rounded-full ${highlight ? 'bg-white/20' : 'bg-white'} flex items-center justify-center mb-3`}>
        <Icon className={`w-5 h-5 ${highlight ? 'text-white' : 'text-brand-black'}`} />
      </div>
      <p className={`text-xs ${highlight ? 'text-white/70' : 'text-brand-gray'} mb-1`}>{label}</p>
      <p className={`text-xl md:text-2xl font-bold ${highlight ? 'text-white' : 'text-brand-black'}`}>{value}</p>
    </motion.div>
  );
}

export function ROICalculatorPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [showCalendly, setShowCalendly] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    first_name: '',
    email: '',
    company_name: '',
    business_type: '',
    projects_per_year: '',
    weekly_hours: '',
    hourly_rate: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0:
        return formData.business_type !== '' && formData.projects_per_year !== '';
      case 1:
        return formData.weekly_hours !== '' && formData.hourly_rate !== '';
      case 2:
        const nameParts = formData.first_name.trim().split(/\s+/);
        const hasFullName = nameParts.length >= 2 && nameParts.every(part => part.length > 0);
        return hasFullName && formData.email.trim() !== '';
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < 2) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep(2)) return;

    const calculatedResults = calculateROI(formData);
    setResults(calculatedResults);
    setShowResults(true);

    trackROICalculatorComplete({
      annual_savings: calculatedResults.annualSavings,
      net_benefit: calculatedResults.netBenefit,
      roi_percent: calculatedResults.roiPercent,
      payback_months: calculatedResults.paybackMonths,
    });

    sendToWebhook(formData, calculatedResults);
  };

  const handleStartOver = () => {
    setShowResults(false);
    setResults(null);
    setCurrentStep(0);
    setFormData({
      first_name: '',
      email: '',
      company_name: '',
      business_type: '',
      projects_per_year: '',
      weekly_hours: '',
      hourly_rate: '',
    });
  };

  const stepVariants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const calculatorBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://plandepa.com/' },
    { name: 'ROI Calculator', url: 'https://plandepa.com/roi-calculator' },
  ]);

  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Construction ROI Calculator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'AUD',
    },
    description: 'Free ROI calculator for Australian construction companies to estimate potential savings from AI automation and workflow optimization. Calculate time savings, cost reductions, and payback period.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '30',
    },
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate Construction Automation ROI',
    description: 'Step-by-step guide to calculating return on investment for construction automation and AI systems.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Enter Business Information',
        text: 'Select your business type (residential builder, commercial builder, trades/subcontractor, or civil/infrastructure) and number of projects per year.',
      },
      {
        '@type': 'HowToStep',
        name: 'Input Time and Cost Data',
        text: 'Enter weekly hours spent on quoting and admin work, plus your hourly labour cost rate.',
      },
      {
        '@type': 'HowToStep',
        name: 'Provide Contact Details',
        text: 'Enter your name, email, and optional company name to receive your personalized ROI results.',
      },
      {
        '@type': 'HowToStep',
        name: 'View ROI Results',
        text: 'See your potential annual savings, hours saved, net benefit after automation costs, and payback period.',
      },
    ],
    totalTime: 'PT3M',
  };

  return (
    <>
      <SEO
        title="ROI Calculator - Construction Automation Savings | Plandepa Brisbane Sydney"
        description="Free ROI calculator for Australian construction companies. Calculate potential savings from AI automation. See hours saved, cost reductions & payback period. Brisbane, Sydney, Newcastle."
        keywords="construction ROI calculator Australia, construction automation ROI, AI automation calculator construction, construction business savings calculator, Buildxact ROI calculator, construction efficiency calculator Brisbane"
      />
      <StructuredData data={[calculatorBreadcrumb, softwareApplicationSchema, howToSchema]} />
      <section className="bg-brand-off-white py-12 md:py-16 px-6" style={{ position: 'relative', zIndex: 1 }}>
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm md:text-base text-brand-gray hover:text-brand-black mb-8 md:mb-12 group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>

          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red/10 rounded-full mb-6">
              <Calculator className="w-4 h-4 text-brand-red" />
              <span className="text-sm font-semibold text-brand-red">ROI Calculator</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-black mb-4">
              See How Much You Could Save
            </h1>
            <p className="text-base md:text-lg text-brand-gray max-w-xl mx-auto">
              Answer a few questions about your business and we'll calculate your potential savings with automation.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: appleEasing }}
                className="bg-white rounded-2xl shadow-xl p-6 md:p-10"
              >
                <StepIndicator currentStep={currentStep} totalSteps={3} />

                <form onSubmit={handleSubmit}>
                  <AnimatePresence mode="wait">
                    {currentStep === 0 && (
                      <motion.div
                        key="step-0"
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="text-center mb-6">
                          <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-2">
                            About Your Business
                          </h2>
                          <p className="text-sm text-brand-gray">
                            Help us understand your operation
                          </p>
                        </div>

                        <SelectField
                          label="Business Type"
                          name="business_type"
                          value={formData.business_type}
                          onChange={handleInputChange}
                          options={businessTypeLabels}
                          required
                        />

                        <SelectField
                          label="Projects Per Year"
                          name="projects_per_year"
                          value={formData.projects_per_year}
                          onChange={handleInputChange}
                          options={projectsLabels}
                          required
                        />
                      </motion.div>
                    )}

                    {currentStep === 1 && (
                      <motion.div
                        key="step-1"
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="text-center mb-6">
                          <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-2">
                            Time & Costs
                          </h2>
                          <p className="text-sm text-brand-gray">
                            We'll use this to calculate your potential savings
                          </p>
                        </div>

                        <SelectField
                          label="Weekly Hours on Quoting & Admin"
                          name="weekly_hours"
                          value={formData.weekly_hours}
                          onChange={handleInputChange}
                          options={hoursLabels}
                          required
                        />

                        <SelectField
                          label="Hourly Cost (Labour Rate)"
                          name="hourly_rate"
                          value={formData.hourly_rate}
                          onChange={handleInputChange}
                          options={rateLabels}
                          required
                        />
                      </motion.div>
                    )}

                    {currentStep === 2 && (
                      <motion.div
                        key="step-2"
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="text-center mb-6">
                          <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-2">
                            Your Contact Details
                          </h2>
                          <p className="text-sm text-brand-gray">
                            Get your personalized ROI results
                          </p>
                        </div>

                        <InputField
                          label="Full Name"
                          name="first_name"
                          type="text"
                          value={formData.first_name}
                          onChange={handleInputChange}
                          required
                          placeholder="John Smith"
                        />

                        <InputField
                          label="Email Address"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="john@company.com"
                        />

                        <InputField
                          label="Company Name"
                          name="company_name"
                          type="text"
                          value={formData.company_name}
                          onChange={handleInputChange}
                          placeholder="ABC Construction (optional)"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                    {currentStep > 0 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="inline-flex items-center gap-2 px-6 py-3 text-brand-gray hover:text-brand-black font-semibold transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </button>
                    ) : (
                      <div />
                    )}

                    {currentStep < 2 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={!validateStep(currentStep)}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-brand-black text-white font-semibold rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        Next
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={!validateStep(currentStep)}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-brand-cta-orange text-white font-semibold rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        Calculate ROI
                        <Calculator className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: appleEasing }}
              >
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                  <div className="text-center mb-6">
                    <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Check className="w-7 h-7 text-emerald-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-2">
                      Your Potential Savings
                    </h2>
                    <p className="text-sm text-brand-gray">
                      Here's what automation could do for your business
                    </p>
                  </div>

                  {results && (
                    <>
                      <div className="grid sm:grid-cols-2 gap-3 md:gap-4 mb-6">
                        <ResultCard
                          icon={Clock}
                          label="Hours Saved Per Year"
                          value={`${results.annualHoursSaved.toLocaleString()} hrs`}
                        />
                        <ResultCard
                          icon={DollarSign}
                          label="Annual Labour Savings"
                          value={`$${results.annualSavings.toLocaleString()}`}
                        />
                        <ResultCard
                          icon={TrendingUp}
                          label="Net Benefit After Costs"
                          value={`$${results.netBenefit.toLocaleString()}`}
                          highlight
                        />
                        <ResultCard
                          icon={Calculator}
                          label="Payback Period"
                          value={`${results.paybackMonths} months`}
                          highlight
                        />
                      </div>

                      <div className="bg-gradient-to-r from-brand-red to-red-600 rounded-xl p-6 text-center text-white mb-6">
                        <p className="text-sm opacity-90 mb-1">Total ROI</p>
                        <p className="text-4xl md:text-5xl font-bold">{results.roiPercent}%</p>
                      </div>

                      <div className="border-t border-gray-100 pt-6">
                        <h3 className="text-xl font-bold text-brand-black mb-3 text-center">
                          Ready to Unlock These Savings?
                        </h3>
                        <p className="text-sm text-brand-gray mb-5 text-center max-w-lg mx-auto">
                          Book a free consultation call and we'll show you exactly how to achieve these results in your business.
                        </p>
                        <div className="flex flex-col gap-3">
                          <button
                            onClick={() => setShowCalendly(true)}
                            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-brand-cta-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                          >
                            <Calendar className="w-5 h-5" />
                            Book a Call Now
                            <ArrowRight className="w-5 h-5" />
                          </button>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={handleStartOver}
                              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-brand-gray hover:text-brand-black font-semibold transition-colors"
                            >
                              <RotateCcw className="w-4 h-4" />
                              Recalculate
                            </button>
                            <div className="flex-1">
                              <SocialShare
                                title={`I could save $${results.netBenefit.toLocaleString()} annually with construction AI automation!`}
                                url={`${window.location.origin}/roi-calculator`}
                                description={`Check out my ROI results: ${results.annualHoursSaved.toLocaleString()} hours saved, ${results.roiPercent}% ROI. Calculate yours at PlanDePA!`}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <CalendlyPopup
        isOpen={showCalendly}
        onClose={() => setShowCalendly(false)}
      />
    </>
  );
}
