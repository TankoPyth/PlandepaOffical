import { useState, useEffect } from 'react';
import { CalendlyPopup } from '../components/ui/CalendlyPopup';

const s = {
  eyebrow: {
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
    fontSize: 'var(--text-xs)',
    letterSpacing: '0.13em',
    textTransform: 'uppercase' as const,
    color: 'var(--ink-3)',
    display: 'block',
    marginBottom: '16px',
  } as React.CSSProperties,
  body: {
    fontFamily: 'var(--font-body)',
    fontWeight: 300,
    fontSize: 'var(--text-base)',
    lineHeight: 1.72,
    color: 'var(--ink-2)',
  } as React.CSSProperties,
  h2: {
    fontFamily: 'var(--font-display)',
    fontWeight: 400,
    fontSize: 'var(--text-3xl)',
    lineHeight: 1.15,
    letterSpacing: '-0.025em',
    color: 'var(--ink)',
    fontFeatureSettings: '"liga" 1, "kern" 1',
  } as React.CSSProperties,
};

const STEPS = [
  { id: 'Week 1', title: 'Discovery & Setup',     desc: 'We understand your business, configure Buildxact for your specific construction type, and import your cost data.' },
  { id: 'Week 2', title: 'Customisation',          desc: 'Custom templates, workflows, integrations with your accounting and other tools.' },
  { id: 'Week 3', title: 'Training',               desc: 'Your team trained on estimating, scheduling, variations, and client communication — in Buildxact.' },
  { id: 'Week 4', title: 'Go-Live Support',        desc: 'Hands-on support as you start using Buildxact on real projects. We\'re there until you\'re confident.' },
];

const REFERRAL_URL = 'https://app.buildxact.com/au/signup.html?resellercode=11538';

const PACKAGES = [
  {
    name: 'Template Library Access',
    price: '$150',
    unit: '/month',
    desc: 'Pre-built templates for existing Buildxact subscribers.',
    features: [
      'Library of pre-built estimating templates',
      'Trade templates: carpentry, plumbing, renovations',
      'Specialised templates: bathrooms, kitchens, extensions',
      'Maintained and updated by the PlanDepa team',
      'New templates added monthly',
      'Refined from real construction projects',
      'Download and customise for your business',
    ],
    note: 'Requires an active Buildxact subscription.',
    featured: false,
  },
  {
    name: 'Complete Implementation',
    price: 'From $3,500',
    unit: '',
    desc: 'Full setup and training to get you running confidently.',
    features: [
      'Complete Buildxact setup and configuration',
      'Business process assessment',
      'Implementation tailored to your trade',
      'Team training program',
      'Access to our support video library',
      'Direct line to the PlanDepa implementation team',
      '30-day post-launch support',
    ],
    note: 'One-time implementation fee.',
    featured: true,
  },
  {
    name: 'Premium Custom Package',
    price: '$5,000–$25,000',
    unit: '',
    desc: 'Custom templates, workflows and ongoing support built around your business.',
    features: [
      'Everything in Complete Implementation',
      'Fully custom templates for your workflows',
      'Custom job scheduling and project setup',
      'One-on-one training for key team members',
      'Ongoing monthly support retainer included',
      'Quarterly strategy and optimisation reviews',
      'Advanced automation and integration setup',
    ],
    note: 'Price depends on business size, complexity and customisation.',
    featured: false,
  },
];

const FAQS = [
  {
    q: "Do I need a Buildxact subscription to use PlanDepa's services?",
    a: 'Yes. Template Library Access requires an active Buildxact subscription. For Complete Implementation and the Premium Custom Package, we can set you up with a new subscription — with 5% off through our partner link — or work with your existing account.',
  },
  {
    q: "What's the difference between Buildxact and PlanDepa's templates?",
    a: 'Buildxact is the estimating and project management software. Our templates are pre-built estimating templates, workflows and configurations that save a lot of setup time. Buildxact is the platform; our templates and implementation make it fit your business.',
  },
  {
    q: 'How do I get the 5% Buildxact discount?',
    a: 'Sign up through our partner link on this page. The 5% discount is applied automatically through our reseller code. It comes directly from Buildxact and is separate from our service packages.',
  },
  {
    q: 'How long does implementation take?',
    a: 'Typically 4–6 weeks from kickoff to confident daily use: setup in week one, customisation and training in weeks two and three, then go-live support.',
  },
  {
    q: 'Can you migrate data from our current estimating system?',
    a: 'Usually, yes. We can import cost libraries, client data and historical projects from Excel and most other estimating systems, and we will advise what is worth migrating versus starting fresh.',
  },
  {
    q: 'Can Buildxact integrate with our accounting software?',
    a: 'Yes. Buildxact integrates with Xero, MYOB and QuickBooks. We set up the integration so financials flow between systems.',
  },
];

export function BuildxactPartnerPage() {
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const open = () => setCalendlyOpen(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal, .reveal-group').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* HERO */}
      <section style={{ paddingTop: 'var(--sp-16)', paddingBottom: 'var(--sp-12)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <span style={{ ...s.eyebrow, color: 'var(--accent)' }}>Official Partner</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.05, letterSpacing: '-0.025em', color: 'var(--ink)', fontFeatureSettings: '"liga" 1, "kern" 1', marginBottom: 'var(--sp-4)' }}>
            Buildxact, done
            <br />
            <em>properly.</em>
          </h1>
          <p style={{ ...s.body, fontSize: '17px', maxWidth: '52ch', marginBottom: 'var(--sp-6)' }}>
            PlanDepa is an official Buildxact implementation partner. We configure and train your team on the platform — then stay on to make sure it holds.
          </p>
          <div style={{ display: 'flex', gap: 'var(--sp-4)', flexWrap: 'wrap', alignItems: 'center' }}>
            <button onClick={open} style={{ padding: '14px 36px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px', letterSpacing: '0.03em', cursor: 'pointer' }}>
              Book a Call
            </button>
            <a href="#implementation" style={{ ...s.body, fontSize: '15px', color: 'var(--ink)', textDecoration: 'none' }}>
              See how it works →
            </a>
          </div>
          <p style={{ ...s.body, fontSize: '13px', color: 'var(--ink-3)', marginTop: '12px' }}>No pitch. No obligation. 30 minutes.</p>
        </div>
      </section>

      {/* WHY BUILDXACT */}
      <section style={{ borderTop: '1px solid var(--rule)', paddingTop: 'var(--sp-16)', paddingBottom: 'var(--sp-16)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--sp-8)' }}>
            <div className="reveal">
              <span style={s.eyebrow}>The Platform</span>
              <h2 style={{ ...s.h2, fontSize: 'var(--text-2xl)', marginBottom: 'var(--sp-4)' }}>
                Built for construction estimating and project management.
              </h2>
              <p style={{ ...s.body, maxWidth: '42ch', marginBottom: '20px' }}>
                Buildxact is purpose-built for builders. It handles estimating, scheduling, purchase orders, and client communication in one place — not a generic CRM adapted for construction.
              </p>
              <p style={{ ...s.body, maxWidth: '42ch' }}>
                The platform is strong. Implementation is where most businesses fail. That's what we fix.
              </p>
            </div>
            <div className="reveal-group">
              {[
                { label: 'Estimating',       desc: 'Fast, accurate quotes with your actual cost data and supplier pricing.' },
                { label: 'Scheduling',       desc: 'Project timelines that your site team can actually follow.' },
                { label: 'Purchase orders',  desc: 'Supplier POs generated from your estimate. No re-entry.' },
                { label: 'Client portal',    desc: 'Clients see progress, approve variations, and make selections — without calling you.' },
              ].map((item) => (
                <div key={item.label} style={{ borderBottom: '1px solid var(--rule)', padding: '20px 0' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '20px', color: 'var(--ink)', marginBottom: '6px' }}>{item.label}</div>
                  <p style={{ ...s.body, fontSize: '14px', margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* IMPLEMENTATION */}
      <section id="implementation" style={{ borderTop: '1px solid var(--rule)', paddingTop: 'var(--sp-16)', paddingBottom: 'var(--sp-16)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 'var(--sp-8)' }}>
            <span style={s.eyebrow}>Implementation</span>
            <h2 style={s.h2}>
              Four weeks.
              <br />
              Live and <em>trained.</em>
            </h2>
          </div>
          <div className="pd-stepper reveal-group">
            {STEPS.map((step) => (
              <div key={step.id} style={{ paddingTop: 'var(--sp-3)' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: '8px' }}>{step.id}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--text-lg)', color: 'var(--ink)', marginBottom: '12px', lineHeight: 1.2 }}>{step.title}</div>
                <p style={{ ...s.body, fontSize: '14px', maxWidth: '28ch', margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5% DISCOUNT */}
      <section className="pd-section" style={{ background: 'var(--bg-alt)' }}>
        <div className="pd-container" style={{ padding: 0 }}>
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--sp-8)', alignItems: 'center' }}>
            <div>
              <span style={{ ...s.eyebrow, color: 'var(--accent)' }}>Partner Discount</span>
              <h2 style={{ ...s.h2, fontSize: 'var(--text-2xl)', marginBottom: 'var(--sp-3)' }}>
                Get 5% off your <em>Buildxact subscription.</em>
              </h2>
              <p style={{ ...s.body, maxWidth: '46ch', margin: 0 }}>
                Sign up for Buildxact through our partner link and the 5% discount is applied automatically. It's separate from our service
                packages below — get the software first, then choose how we help you get the most out of it.
              </p>
            </div>
            <div>
              <a href={REFERRAL_URL} target="_blank" rel="noopener noreferrer" className="pd-btn pd-btn-primary" style={{ padding: '14px 36px' }}>
                Sign up to Buildxact with 5% off
              </a>
              <p className="pd-caption" style={{ marginTop: '12px' }}>Secure signup through the official Buildxact partner portal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="pd-section">
        <div className="pd-container" style={{ padding: 0 }}>
          <div className="reveal" style={{ marginBottom: 'var(--sp-8)' }}>
            <span style={s.eyebrow}>How We Help</span>
            <h2 style={s.h2}>
              Templates, setup,
              <br />
              or the <em>full build.</em>
            </h2>
          </div>
          <div className="pd-pricing-grid reveal-group">
            {PACKAGES.map((pkg) => (
              <div key={pkg.name} className={`pd-plan${pkg.featured ? ' pd-plan-featured' : ''}`}>
                <div className="pd-eyebrow" style={{ color: pkg.featured ? 'var(--accent)' : undefined }}>{pkg.featured ? 'Most popular' : '\u00A0'}</div>
                <h3 className="pd-h4" style={{ marginBottom: '8px' }}>{pkg.name}</h3>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '40px', lineHeight: 1, color: 'var(--ink)' }}>{pkg.price}</span>
                  {pkg.unit && <span className="pd-caption" style={{ paddingBottom: '4px' }}>{pkg.unit}</span>}
                </div>
                <p className="pd-caption" style={{ minHeight: '40px', marginBottom: 'var(--sp-3)' }}>{pkg.desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 var(--sp-3)' }}>
                  {pkg.features.map((f) => (
                    <li key={f} className="pd-feature-item"><span className="pd-feature-dash">—</span>{f}</li>
                  ))}
                </ul>
                <p className="pd-caption" style={{ marginBottom: 'var(--sp-3)' }}>{pkg.note}</p>
                <button onClick={open} className={`pd-btn pd-btn-full ${pkg.featured ? 'pd-btn-primary' : 'pd-btn-outline'}`}>Book a Call</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pd-section">
        <div className="pd-container" style={{ padding: 0 }}>
          <div className="reveal" style={{ marginBottom: 'var(--sp-6)' }}>
            <span style={s.eyebrow}>Questions</span>
            <h2 style={{ ...s.h2, fontSize: 'var(--text-2xl)' }}>Buildxact — FAQ</h2>
          </div>
          <div style={{ maxWidth: '720px' }}>
            {FAQS.map((f) => (
              <div key={f.q} style={{ borderBottom: '1px solid var(--rule)', padding: '24px 0' }}>
                <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 'var(--text-md)', color: 'var(--ink)', margin: '0 0 8px' }}>{f.q}</h3>
                <p style={{ ...s.body, margin: 0 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ borderTop: '1px solid var(--rule)', background: 'var(--bg-alt)', paddingTop: 'var(--sp-20)', paddingBottom: 'var(--sp-20)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)', textAlign: 'center' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <div className="reveal">
            <span style={s.eyebrow}>Get Started</span>
            <h2 style={{ ...s.h2, marginBottom: 'var(--sp-4)' }}>
              Ready to implement
              <br />
              Buildxact <em>properly?</em>
            </h2>
            <p style={{ ...s.body, fontSize: '17px', maxWidth: '46ch', margin: '0 auto var(--sp-6)' }}>
              Book a 30-minute call. We'll assess your business and scope the right implementation for your team.
            </p>
            <button onClick={open} style={{ padding: '14px 40px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px', letterSpacing: '0.03em', cursor: 'pointer', display: 'block', margin: '0 auto' }}>
              Book a Free Call
            </button>
            <p style={{ ...s.body, fontSize: '13px', color: 'var(--ink-3)', marginTop: '12px' }}>No obligation. No pitch deck. A real conversation.</p>
          </div>
        </div>
      </section>

      <CalendlyPopup isOpen={calendlyOpen} onClose={() => setCalendlyOpen(false)} />
    </>
  );
}
