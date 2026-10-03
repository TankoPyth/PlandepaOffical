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
