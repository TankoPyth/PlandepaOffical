import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { trackROICalculatorComplete } from '../utils/analytics';
import { CalendlyPopup } from '../components/ui/CalendlyPopup';
import { OFFER_PATH, TIERS, formatPriceGst } from '../seo/offer';

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL || '';

const hoursMap: Record<string, number> = { '5_10': 8, '11_20': 15, '21_40': 30, '40_plus': 45 };
const rateMap: Record<string, number> = { '40_60': 50, '60_80': 70, '80_100': 90, '100_plus': 110 };

const businessTypeLabels: Record<string, string> = {
  residential_builder: 'Residential builder',
  commercial_builder: 'Commercial builder',
  trades_subcontractor: 'Trades / subcontractor',
  civil_infrastructure: 'Civil / infrastructure',
};
const projectsLabels: Record<string, string> = { '1_10': '1–10 projects', '11_30': '11–30 projects', '31_60': '31–60 projects', '61_plus': '61+ projects' };
const hoursLabels: Record<string, string> = { '5_10': '5–10 hours', '11_20': '11–20 hours', '21_40': '21–40 hours', '40_plus': '40+ hours' };
const rateLabels: Record<string, string> = { '40_60': '$40–$60', '60_80': '$60–$80', '80_100': '$80–$100', '100_plus': '$100+' };

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

const EMPTY_FORM: FormData = { first_name: '', email: '', company_name: '', business_type: '', projects_per_year: '', weekly_hours: '', hourly_rate: '' };
const TIME_SAVING_FACTOR = 0.6;
const AUTOMATION_COST_ANNUAL = 12000;
const CLARITY_DAY = TIERS.find((t) => t.id === 'day')!;

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
  return { annualHoursSaved, annualSavings, netBenefit, roiPercent, paybackMonths };
}

async function sendToWebhook(formData: FormData, results: CalculationResults) {
  if (!WEBHOOK_URL) return;
  const weeklyHoursNum = hoursMap[formData.weekly_hours] || 0;
  const hourlyRateNum = rateMap[formData.hourly_rate] || 0;
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
    annual_hours: weeklyHoursNum * 52,
    annual_hours_saved: results.annualHoursSaved,
    annual_savings: results.annualSavings,
    automation_cost_annual: AUTOMATION_COST_ANNUAL,
    net_benefit: results.netBenefit,
    roi_percent: results.roiPercent,
    payback_months: results.paybackMonths,
    submitted_at: new Date().toISOString(),
  };
  try {
    await fetch(WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  } catch (error) {
    console.error('Webhook error:', error);
  }
}

const money = (n: number) => `$${Math.round(n).toLocaleString('en-AU')}`;

const labelStyle: React.CSSProperties = { fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 'var(--text-xs)', letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--ink-2)', display: 'block', marginBottom: '4px' };

function Field({ label, name, required, children }: { label: string; name: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 'var(--sp-4)' }}>
      <label htmlFor={name} style={labelStyle}>
        {label} {required && <span style={{ color: 'var(--accent)' }}>*</span>}
      </label>
      {children}
    </div>
  );
}

function SelectField({ label, name, value, onChange, options }: { label: string; name: keyof FormData; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: Record<string, string> }) {
  return (
    <Field label={label} name={name} required>
      <select id={name} name={name} value={value} onChange={onChange} required className="pd-input" style={{ cursor: 'pointer', appearance: 'auto' }}>
        <option value="">Select an option</option>
        {Object.entries(options).map(([key, l]) => <option key={key} value={key}>{l}</option>)}
      </select>
    </Field>
  );
}

const STEP_TITLES = ['Your business', 'Your admin load', 'Where to send your results'];

export function ROICalculatorPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [showCalendly, setShowCalendly] = useState(false);
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep = (step: number): boolean => {
    if (step === 0) return formData.business_type !== '' && formData.projects_per_year !== '';
    if (step === 1) return formData.weekly_hours !== '' && formData.hourly_rate !== '';
    const nameParts = formData.first_name.trim().split(/\s+/);
    return nameParts.length >= 2 && nameParts.every((p) => p.length > 0) && formData.email.trim() !== '';
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (currentStep < 2) {
      if (validateStep(currentStep)) setCurrentStep((s) => s + 1);
      return;
    }
    if (!validateStep(2)) return;
    const calculated = calculateROI(formData);
    setResults(calculated);
    trackROICalculatorComplete({
      annual_savings: calculated.annualSavings,
      net_benefit: calculated.netBenefit,
      roi_percent: calculated.roiPercent,
      payback_months: calculated.paybackMonths,
    });
    sendToWebhook(formData, calculated);
  };

  const handleStartOver = () => {
    setResults(null);
    setCurrentStep(0);
    setFormData(EMPTY_FORM);
  };

  const annualHours = (hoursMap[formData.weekly_hours] || 0) * 52;
  const annualCost = annualHours * (rateMap[formData.hourly_rate] || 0);

  return (
    <>
      {/* HERO */}
      <section className="pd-page-hero">
        <div className="pd-container" style={{ padding: 0 }}>
          <span className="pd-eyebrow">Admin Cost Calculator</span>
          <h1 className="pd-h1" style={{ fontSize: 'clamp(40px, 6vw, 72px)', marginBottom: 'var(--sp-4)' }}>
            What is the admin
            <br />
            <em>really costing you?</em>
          </h1>
          <p className="pd-lead" style={{ maxWidth: '56ch' }}>
            Quoting, chasing, re-keying, reporting. Three quick questions and we'll estimate what manual admin costs your construction
            business each year — and how much of it better systems and AI could win back.
          </p>
        </div>
      </section>

      <section className="pd-section">
        <div className="pd-container" style={{ padding: 0 }}>
          {!results ? (
            <div style={{ maxWidth: '560px' }}>
              {/* Stepper */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: 'var(--sp-6)' }} aria-hidden="true">
                {STEP_TITLES.map((_, i) => (
                  <div key={i} style={{ flex: 1, height: '2px', background: i <= currentStep ? 'var(--accent)' : 'var(--rule)', transition: 'background 0.3s ease' }} />
                ))}
              </div>
              <span className="pd-eyebrow">Step {currentStep + 1} of 3</span>
              <h2 className="pd-h3" style={{ marginBottom: 'var(--sp-6)' }}>{STEP_TITLES[currentStep]}</h2>

              <form onSubmit={handleSubmit}>
                {currentStep === 0 && (
                  <>
                    <SelectField label="Business type" name="business_type" value={formData.business_type} onChange={handleInputChange} options={businessTypeLabels} />
                    <SelectField label="Projects per year" name="projects_per_year" value={formData.projects_per_year} onChange={handleInputChange} options={projectsLabels} />
                  </>
                )}
                {currentStep === 1 && (
                  <>
                    <SelectField label="Hours per week on quoting & admin" name="weekly_hours" value={formData.weekly_hours} onChange={handleInputChange} options={hoursLabels} />
                    <SelectField label="Hourly cost of whoever does it" name="hourly_rate" value={formData.hourly_rate} onChange={handleInputChange} options={rateLabels} />
                  </>
                )}
                {currentStep === 2 && (
                  <>
                    <Field label="Full name" name="first_name" required>
                      <input id="first_name" name="first_name" type="text" value={formData.first_name} onChange={handleInputChange} required placeholder="Pete Smith" className="pd-input" />
                    </Field>
                    <Field label="Email" name="email" required>
                      <input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required placeholder="pete@company.com.au" className="pd-input" />
                    </Field>
                    <Field label="Company" name="company_name">
                      <input id="company_name" name="company_name" type="text" value={formData.company_name} onChange={handleInputChange} placeholder="Optional" className="pd-input" />
                    </Field>
                  </>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--sp-6)' }}>
                  {currentStep > 0 ? (
                    <button type="button" onClick={() => setCurrentStep((s) => s - 1)} className="pd-body" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--ink)' }}>
                      ← Back
                    </button>
                  ) : <span />}
                  <button type="submit" disabled={!validateStep(currentStep)} className="pd-btn pd-btn-primary" style={{ padding: '14px 36px', opacity: validateStep(currentStep) ? 1 : 0.4, cursor: validateStep(currentStep) ? 'pointer' : 'not-allowed' }}>
                    {currentStep < 2 ? 'Next' : 'Show my results'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <span className="pd-eyebrow">Your Estimate</span>
              <h2 className="pd-h2" style={{ marginBottom: 'var(--sp-6)' }}>
                Admin is costing you about <em>{money(annualCost)}</em> a year.
              </h2>

              <div className="pd-module-grid" style={{ marginBottom: 'var(--sp-6)' }}>
                {[
                  { label: 'Hours on admin per year', value: `${annualHours.toLocaleString('en-AU')} hrs` },
                  { label: 'Hours better systems could win back', value: `${results.annualHoursSaved.toLocaleString('en-AU')} hrs` },
                  { label: 'Recoverable labour cost', value: money(results.annualSavings) },
                ].map((r) => (
                  <div key={r.label} className="pd-module-cell">
                    <div className="pd-eyebrow">{r.label}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '44px', lineHeight: 1.1, color: 'var(--ink)' }}>{r.value}</div>
                  </div>
                ))}
              </div>

              <p className="pd-caption" style={{ maxWidth: '64ch', marginBottom: 'var(--sp-8)' }}>
                Estimate only. Assumes around {Math.round(TIME_SAVING_FACTOR * 100)}% of manual quoting and admin time can be removed with
                better systems and automation. It doesn't count the jobs lost to slow follow-up, margin lost on unapproved variations, or
                the value of your own time — which is usually the bigger number.
              </p>

              <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: 'var(--sp-4)', maxWidth: '620px' }}>
                <h3 className="pd-h3" style={{ marginBottom: 'var(--sp-3)' }}>Find out exactly where it's going.</h3>
                <p className="pd-body" style={{ marginBottom: 'var(--sp-4)' }}>
                  A {CLARITY_DAY.name} is {formatPriceGst(CLARITY_DAY.price)}
                  {annualCost > 0 && <> — about {Math.max(1, Math.round((CLARITY_DAY.price / annualCost) * 100))}% of one year's admin cost</>}.
                  We map where time, margin and work are leaking, and name the first workflow to fix. If we implement it, the fee comes off the invoice.
                </p>
                <div style={{ display: 'flex', gap: 'var(--sp-4)', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Link to={OFFER_PATH} className="pd-btn pd-btn-primary" style={{ padding: '14px 36px' }}>See the Clarity Blueprint</Link>
                  <button onClick={() => setShowCalendly(true)} className="pd-btn pd-btn-outline" style={{ padding: '13px 28px' }}>Book a Call</button>
                  <button onClick={handleStartOver} className="pd-body" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--ink-2)' }}>
                    Recalculate
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <CalendlyPopup isOpen={showCalendly} onClose={() => setShowCalendly(false)} />
    </>
  );
}
