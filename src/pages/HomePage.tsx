import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalendlyPopup } from '../components/ui/CalendlyPopup';
import { HOME_FAQS } from '../seo/site';
import { OFFER_PATH, RISK_REVERSAL, TIERS, formatPrice } from '../seo/offer';

// ─── Data ──────────────────────────────────────────────────────────────────────
const PAINS = [
  "Every quote, decision and problem still routes through you.",
  "Four tools, and none of them agree on what's happening.",
  "No-one knows the job status until someone calls.",
  "You can't leave for a week without it slipping.",
];

const MODULES = [
  { id: 'SYS.01', name: 'Pipeline & CRM',         desc: 'Your sales process from first call to signed contract. No lead lost in email, no follow-up missed.' },
  { id: 'SYS.02', name: 'Quoting Infrastructure', desc: 'Templated, fast, consistent. Quotes that go out the same day and follow up themselves.' },
  { id: 'SYS.03', name: 'Project Handover',       desc: 'The moment sales hands to delivery. Documented, signed off, and nothing falling through the gap.' },
  { id: 'SYS.04', name: 'SOPs & Playbooks',       desc: 'How your business actually runs — written down, in one place, kept current.' },
  { id: 'SYS.05', name: 'Reporting & Dashboards', desc: 'Revenue, pipeline, project progress, costs. One view. Updated automatically.' },
  { id: 'SYS.06', name: 'AI & Automation Layer',  desc: 'Admin that runs itself. AI-drafted replies, follow-ups, reminders, document generation, status updates.' },
];

const STEPS = [
  { num: '①', title: 'Blueprint', body: 'We map where the business is leaking and name the first workflow to fix. Sprint, Day or Intensive.' },
  { num: '②', title: 'Build',     body: 'We implement that workflow, then the rest of your stack, in 30–60 days. Your team trained to use it.' },
  { num: '③', title: 'Run',       body: 'We stay on as your operational partner. Monthly reviews, continuous builds, nothing decaying.' },
];

const PLANS = [
  {
    name: 'Foundations',
    price: '$2,800',
    unit: '/mo',
    commitment: '3-month minimum',
    tagline: 'The start line.',
    desc: 'Core systems built and your team using them.',
    features: ['CRM & pipeline', '3 core SOPs', '2 automation workflows', 'Monthly strategy call', 'Async Slack support'],
    featured: false,
  },
  {
    name: 'Growth',
    price: '$4,800',
    unit: '/mo',
    commitment: 'Month-to-month',
    tagline: 'Your whole business, built and running.',
    desc: '',
    features: ['Everything in Foundations', 'Full reporting suite', 'Unlimited SOPs', 'Up to 8 workflows', 'Handover system', 'Fortnightly calls', 'Priority support'],
    featured: true,
  },
  {
    name: 'Custom',
    price: 'Custom',
    unit: '',
    commitment: 'Scoped per engagement',
    tagline: 'For complex businesses with non-standard needs.',
    desc: '',
    features: ['Multi-entity support', 'Custom integrations', 'Dedicated PM', 'Weekly exec reporting', 'Custom architecture'],
    featured: false,
  },
];

const TESTIMONIALS = [
  {
    quote: '"We went from chasing quotes in spreadsheets to a live pipeline within five weeks. The team actually uses it."',
    attr: 'JAMES K. · DIRECTOR · MID-TIER BUILDER · SYDNEY',
  },
  {
    quote: '"The handover system alone saved us two hours per job. Multiply that across twenty projects and it\'s a different business."',
    attr: 'RACHEL T. · OPERATIONS MANAGER · RESIDENTIAL BUILDER · BRISBANE',
  },
];

const STATS = [
  { num: '10–50', label: 'Staff' },
  { num: '30 days', label: 'First workflow live' },
  { num: '2', label: 'Founders, not a firm' },
];

const sectionPad = (size: string): React.CSSProperties => ({ paddingTop: size, paddingBottom: size });
const monoLabel: React.CSSProperties = { fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.1em', color: 'var(--ink-3)', textTransform: 'uppercase', marginBottom: '12px' };
const smallCaps: React.CSSProperties = { fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)' };

// ─── Component ────────────────────────────────────────────────────────────────
export function HomePage() {
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const open = () => setCalendlyOpen(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal, .reveal-group').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div style={{ background: 'var(--bg)', color: 'var(--ink)' }}>

        {/* ── HERO ─────────────────────────────────────────── */}
        <section style={{ minHeight: '100svh', display: 'flex', alignItems: 'center', padding: '0 var(--gutter)', position: 'relative', overflow: 'hidden' }}>
          <div aria-hidden="true" className="hidden md:block" style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%', pointerEvents: 'none', overflow: 'hidden' }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} style={{ position: 'absolute', left: '-100vw', right: 0, top: `calc(22% + ${i * 56}px)`, borderTop: '1px solid var(--rule)', opacity: 0.6 }} />
            ))}
          </div>

          <div className="pd-container" style={{ padding: 0, paddingTop: 'var(--sp-20)', paddingBottom: 'var(--sp-20)', position: 'relative', zIndex: 1, width: '100%' }}>
            <span className="pd-eyebrow hero-animate hero-animate-1">AI Implementation for Construction · Brisbane &amp; Newcastle</span>

            <h1 className="pd-h1 hero-animate hero-animate-2" style={{ marginBottom: 'var(--sp-4)', marginTop: '4px' }}>
              Get your
              <br />
              business <em>back.</em>
            </h1>

            <p className="pd-lead hero-animate hero-animate-3" style={{ maxWidth: '54ch', marginBottom: 'var(--sp-6)' }}>
              PlanDepa implements AI and operational systems for construction companies with 10–50 staff — so the business stops
              running through you. It starts with the Clarity Blueprint: a paid diagnostic that shows exactly where it's breaking.
            </p>

            <div className="hero-animate hero-animate-4" style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)', flexWrap: 'wrap', marginBottom: '12px' }}>
              <Link to={OFFER_PATH} className="pd-btn pd-btn-primary" style={{ padding: '14px 36px' }}>See the Clarity Blueprint</Link>
              <button onClick={open} className="pd-body" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--ink)' }}>
                Book a fit call →
              </button>
            </div>

            <p className="pd-caption hero-animate hero-animate-5" style={{ marginBottom: 'var(--sp-8)' }}>
              From $990 + GST. Fee credited if we implement the fix.
            </p>

            <p className="pd-eyebrow hero-animate hero-animate-6">Working with construction businesses across Australia</p>
          </div>
        </section>

        {/* ── PROBLEM ──────────────────────────────────────── */}
        <section className="pd-section" style={sectionPad('var(--sp-20)')}>
          <div className="pd-container" style={{ padding: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--sp-8)' }}>
              <div className="reveal">
                <h2 className="pd-h3" style={{ marginBottom: 'var(--sp-4)' }}>
                  "You're running a 30-person business on WhatsApp threads, spreadsheets and your own memory."
                </h2>
                <p className="pd-body" style={{ maxWidth: '42ch', marginBottom: '20px' }}>
                  Most construction businesses with 10–50 staff have outgrown their systems without realising it. The work gets done,
                  the money is decent — but it all runs on individual memory, group chats, and manual follow-ups.
                </p>
                <p className="pd-body" style={{ maxWidth: '42ch' }}>
                  The owner ends up as the operating system — which means the business can't grow. It can only stretch.
                </p>
              </div>
              <div className="reveal-group">
                {PAINS.map((pain) => (
                  <div key={pain} style={{ borderBottom: '1px solid var(--rule)', padding: '20px 0' }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontStyle: 'italic', lineHeight: 1.45, color: 'var(--ink)', margin: 0 }}>
                      "{pain}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── THE CLARITY BLUEPRINT ────────────────────────── */}
        <section id="clarity-blueprint" className="pd-section" style={{ ...sectionPad('var(--sp-20)'), background: 'var(--bg-alt)' }}>
          <div className="pd-container" style={{ padding: 0 }}>
            <div className="reveal" style={{ marginBottom: 'var(--sp-8)', maxWidth: '640px' }}>
              <span className="pd-eyebrow" style={{ color: 'var(--accent)' }}>Where It Starts</span>
              <h2 className="pd-h2" style={{ marginBottom: 'var(--sp-3)' }}>
                The Clarity <em>Blueprint.</em>
              </h2>
              <p className="pd-lead" style={{ maxWidth: '56ch' }}>
                Pay for the truth. A paid diagnostic that exposes exactly where your business is breaking — where time, margin, missed
                work and your own hours are leaking — and names the first workflow to fix. Three sizes.
              </p>
            </div>

            <div className="pd-pricing-grid reveal-group">
              {TIERS.map((tier) => (
                <div key={tier.id} className={`pd-plan${tier.recommended ? ' pd-plan-featured' : ''}`}>
                  <div className="pd-eyebrow" style={{ color: tier.recommended ? 'var(--accent)' : undefined }}>
                    {tier.recommended ? 'Recommended' : ' '}
                  </div>
                  <h3 className="pd-h4" style={{ marginBottom: '8px' }}>{tier.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', marginBottom: '8px' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '48px', lineHeight: 1, color: 'var(--ink)' }}>{formatPrice(tier.price)}</span>
                    <span className="pd-caption" style={{ paddingBottom: '6px' }}>+ GST</span>
                  </div>
                  <p className="pd-caption" style={{ margin: 0, minHeight: '40px' }}>{tier.format}</p>
                </div>
              ))}
            </div>

            <div className="reveal" style={{ display: 'flex', gap: 'var(--sp-6)', flexWrap: 'wrap', alignItems: 'flex-start', marginTop: 'var(--sp-8)', borderTop: '1px solid var(--rule)', paddingTop: 'var(--sp-4)' }}>
              <p className="pd-body" style={{ flex: '1 1 320px', margin: 0 }}>
                <strong style={{ fontWeight: 500, color: 'var(--ink)' }}>The fee comes off the invoice.</strong> {RISK_REVERSAL}
              </p>
              <Link to={OFFER_PATH} className="pd-btn pd-btn-primary" style={{ padding: '14px 36px' }}>See what's included</Link>
            </div>
          </div>
        </section>

        {/* ── WHAT WE BUILD ────────────────────────────────── */}
        <section id="what-we-build" className="pd-section">
          <div className="pd-container" style={{ padding: 0 }}>
            <div className="reveal" style={{ marginBottom: 'var(--sp-8)' }}>
              <span className="pd-eyebrow">Then We Build It</span>
              <h2 className="pd-h2">
                One operating system
                <br />
                for your entire <em>business.</em>
              </h2>
            </div>
            <div className="pd-module-grid reveal-group">
              {MODULES.map((mod) => (
                <div key={mod.id} className="pd-module-cell">
                  <div style={monoLabel}>{mod.id}</div>
                  <h3 className="pd-h4" style={{ marginBottom: '12px' }}>{mod.name}</h3>
                  <p className="pd-body" style={{ fontSize: '14px', maxWidth: '36ch', margin: 0 }}>{mod.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────── */}
        <section id="how-it-works" className="pd-section">
          <div className="pd-container" style={{ padding: 0 }}>
            <div className="reveal" style={{ marginBottom: 'var(--sp-8)' }}>
              <span className="pd-eyebrow">The Process</span>
              <h2 className="pd-h2">
                Three stages.
                <br />
                No 12-month <em>projects.</em>
              </h2>
            </div>
            <div className="pd-stepper reveal-group">
              {STEPS.map((step) => (
                <div key={step.title} style={{ paddingTop: 'var(--sp-3)' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', color: 'var(--ink-3)', lineHeight: 1, marginBottom: '20px' }}>{step.num}</div>
                  <div style={{ ...smallCaps, fontSize: '14px', color: 'var(--ink)', marginBottom: '12px' }}>{step.title}</div>
                  <p className="pd-body" style={{ fontSize: '14px', maxWidth: '28ch', margin: 0 }}>{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── IMPLEMENTATION PRICING ───────────────────────── */}
        <section className="pd-section" style={sectionPad('var(--sp-20)')}>
          <div className="pd-container" style={{ padding: 0 }}>
            <div className="reveal" style={{ marginBottom: 'var(--sp-8)' }}>
              <span className="pd-eyebrow">After the Blueprint</span>
              <h2 className="pd-h2" style={{ marginBottom: '16px' }}>
                Implementation.
                <br />
                No <em>surprises.</em>
              </h2>
              <p className="pd-body" style={{ maxWidth: '50ch' }}>
                Once the Blueprint has named what to fix, we build and run it on a flat monthly fee. Everything included. Pause or cancel
                anytime after your minimum.
              </p>
            </div>

            <div className="pd-pricing-grid reveal-group">
              {PLANS.map((plan) => (
                <div key={plan.name} className={`pd-plan${plan.featured ? ' pd-plan-featured' : ''}`}>
                  <div style={{ ...smallCaps, marginBottom: '12px' }}>{plan.name}</div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '4px' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '56px', lineHeight: 1, color: 'var(--ink)' }}>{plan.price}</span>
                    {plan.unit && <span className="pd-body" style={{ paddingBottom: '8px' }}>{plan.unit}</span>}
                  </div>
                  <div className="pd-caption" style={{ fontSize: '12px', marginBottom: 'var(--sp-3)' }}>{plan.commitment}</div>

                  <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 'var(--sp-3)', marginBottom: 'var(--sp-3)' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontStyle: 'italic', color: 'var(--ink)', marginBottom: '8px' }}>{plan.tagline}</div>
                    {plan.desc && <p className="pd-body" style={{ fontSize: '14px', maxWidth: '36ch', margin: 0 }}>{plan.desc}</p>}
                  </div>

                  <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 'var(--sp-2)', marginBottom: 'var(--sp-3)' }}>
                    {plan.features.map((feat) => (
                      <div key={feat} className="pd-feature-item"><span className="pd-feature-dash">—</span>{feat}</div>
                    ))}
                  </div>

                  <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 'var(--sp-3)' }}>
                    <Link to={OFFER_PATH} className={`pd-btn pd-btn-full ${plan.featured ? 'pd-btn-primary' : 'pd-btn-outline'}`}>
                      Start with a Blueprint
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <p className="pd-caption" style={{ textAlign: 'center', marginTop: 'var(--sp-6)' }}>
              All prices exclude GST. Minimum period then month-to-month. Cancel with 30 days notice.
            </p>
          </div>
        </section>

        {/* ── SOCIAL PROOF ─────────────────────────────────── */}
        <section className="pd-section">
          <div className="pd-container" style={{ padding: 0 }}>
            <div className="reveal" style={{ marginBottom: 'var(--sp-8)' }}>
              <span className="pd-eyebrow">From the Field</span>
              <h2 className="pd-h2">
                Directors who've
                <br />
                stopped <em>guessing.</em>
              </h2>
            </div>
            <div className="pd-testimonial-grid reveal-group">
              {TESTIMONIALS.map((t) => (
                <div key={t.attr} style={{ borderTop: '1px solid var(--rule)', paddingTop: 'var(--sp-6)' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontStyle: 'italic', lineHeight: 1.45, color: 'var(--ink)', maxWidth: '42ch', marginBottom: 'var(--sp-3)' }}>
                    {t.quote}
                  </p>
                  <p style={{ ...smallCaps, fontSize: 'var(--text-xs)', margin: 0 }}>{t.attr}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT ────────────────────────────────────────── */}
        <section className="pd-section">
          <div className="pd-container" style={{ padding: 0 }}>
            <div className="reveal">
              <span className="pd-eyebrow">Who We Are</span>
              <h2 className="pd-h2" style={{ marginBottom: 'var(--sp-4)' }}>
                Two people.
                <br />
                One <em>focus.</em>
              </h2>
            </div>
            <div style={{ maxWidth: '600px' }}>
              <div className="reveal" style={{ marginBottom: 'var(--sp-6)' }}>
                {[
                  "PlanDepa is Jarrod and Mitch. We don't have a team of consultants billing hours. We have two people who've spent years inside construction businesses learning what actually breaks, and building systems that fix it.",
                  'Jarrod owns the front — finding the right clients and understanding what they need. Mitch owns the back — designing the systems and making sure they hold.',
                  "We're based in Brisbane, work in person across Brisbane and Newcastle, and take on a limited number of clients so we can actually do the work properly.",
                ].map((para) => (
                  <p key={para} className="pd-lead" style={{ marginBottom: 'var(--sp-3)' }}>{para}</p>
                ))}
              </div>
              <div className="reveal-group" style={{ display: 'flex', gap: 'var(--sp-6)', flexWrap: 'wrap' }}>
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '48px', lineHeight: 1, color: 'var(--ink)', marginBottom: '8px' }}>{stat.num}</div>
                    <div style={smallCaps}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <section className="pd-section" style={sectionPad('var(--sp-12)')}>
          <div className="pd-container" style={{ padding: 0 }}>
            <div className="reveal" style={{ marginBottom: 'var(--sp-8)' }}>
              <span className="pd-eyebrow">Common Questions</span>
              <h2 className="pd-h2">
                Everything you'd
                <br />
                want to <em>ask.</em>
              </h2>
            </div>
            <div style={{ maxWidth: 'var(--max-w-tight)' }}>
              {HOME_FAQS.map((faq) => (
                <div key={faq.q} className="reveal">
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '22px', color: 'var(--ink)', borderTop: '1px solid var(--rule)', paddingTop: 'var(--sp-4)', marginBottom: 'var(--sp-2)', letterSpacing: '-0.01em' }}>
                    {faq.q}
                  </h3>
                  <p className="pd-body" style={{ marginBottom: 'var(--sp-4)', maxWidth: 'none' }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ────────────────────────────────────── */}
        <section className="pd-section" style={{ ...sectionPad('var(--sp-20)'), background: 'var(--bg-alt)', textAlign: 'center' }}>
          <div className="reveal" style={{ maxWidth: '560px', margin: '0 auto' }}>
            <span className="pd-eyebrow">Get Started</span>
            <h2 className="pd-h2" style={{ marginBottom: 'var(--sp-4)' }}>
              Find out what's
              <br />
              actually <em>breaking.</em>
            </h2>
            <p className="pd-lead" style={{ margin: '0 auto var(--sp-6)', maxWidth: '48ch' }}>
              Start with the Clarity Blueprint, or book a 30-minute fit call first. If we're not the right fit, we'll say so.
            </p>
            <div style={{ display: 'flex', gap: 'var(--sp-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to={OFFER_PATH} className="pd-btn pd-btn-primary" style={{ padding: '14px 36px' }}>See the Clarity Blueprint</Link>
              <button onClick={open} className="pd-btn pd-btn-outline" style={{ padding: '13px 32px' }}>Book a Fit Call</button>
            </div>
            <p className="pd-caption" style={{ marginTop: '12px' }}>No obligation. No pitch deck. A real conversation.</p>
          </div>
        </section>

      </div>

      <CalendlyPopup isOpen={calendlyOpen} onClose={() => setCalendlyOpen(false)} />
    </>
  );
}
