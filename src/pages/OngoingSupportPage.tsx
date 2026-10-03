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

// This page maps to the "Run" phase of the PlanDepa engagement model
const WHAT_WE_DO = [
  { id: '01', title: 'Monthly reviews',        desc: 'A structured session each month to assess what\'s working, what\'s breaking, and what to build next.' },
  { id: '02', title: 'Continuous builds',      desc: 'Systems evolve as your business does. We keep building as you grow, not just when you ask.' },
  { id: '03', title: 'Priority support',       desc: 'Direct access to us when something breaks or needs adjusting. Not a ticket system.' },
  { id: '04', title: 'SOP maintenance',        desc: 'Your playbooks stay current. We update them as your processes change so they don\'t decay.' },
  { id: '05', title: 'Reporting updates',      desc: 'Dashboards and reports kept accurate and relevant as your data and needs shift.' },
  { id: '06', title: 'Team onboarding',        desc: 'New hires trained on your systems from day one. No institutional knowledge lost.' },
];

export function OngoingSupportPage() {
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
          <span style={s.eyebrow}>Ongoing Support</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.05, letterSpacing: '-0.025em', color: 'var(--ink)', fontFeatureSettings: '"liga" 1, "kern" 1', marginBottom: 'var(--sp-4)' }}>
            Systems that don't
            <br />
            <em>decay.</em>
          </h1>
          <p style={{ ...s.body, fontSize: '17px', maxWidth: '52ch', marginBottom: 'var(--sp-6)' }}>
            We stay on as your operational partner after the build. Monthly reviews, continuous improvement, and support when things shift — which they always do.
          </p>
          <div style={{ display: 'flex', gap: 'var(--sp-4)', flexWrap: 'wrap', alignItems: 'center' }}>
            <button onClick={open} style={{ padding: '14px 36px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px', letterSpacing: '0.03em', cursor: 'pointer' }}>
              Book a Call
            </button>
            <a href="#what-we-do" style={{ ...s.body, fontSize: '15px', color: 'var(--ink)', textDecoration: 'none' }}>
              See what's included →
            </a>
          </div>
          <p style={{ ...s.body, fontSize: '13px', color: 'var(--ink-3)', marginTop: '12px' }}>No pitch. No obligation. 30 minutes.</p>
        </div>
      </section>

      {/* WHY ONGOING */}
      <section style={{ borderTop: '1px solid var(--rule)', paddingTop: 'var(--sp-16)', paddingBottom: 'var(--sp-16)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--sp-8)' }}>
            <div className="reveal">
              <span style={s.eyebrow}>The Reality</span>
              <h2 style={{ ...s.h2, fontSize: 'var(--text-2xl)', marginBottom: 'var(--sp-4)' }}>
                Systems built once don't last.
              </h2>
              <p style={{ ...s.body, maxWidth: '42ch', marginBottom: '20px' }}>
                Your business changes. People leave. New tools emerge. Processes shift. A system built for your business six months ago is already starting to drift.
              </p>
              <p style={{ ...s.body, maxWidth: '42ch' }}>
                Most consultancies build and leave. We stay on because we know that's when the real work starts.
              </p>
            </div>
            <div className="reveal-group">
              {[
                '"The system was great when it launched. Six months later it was already out of date."',
                '"We lost the process knowledge when our ops manager left. Had to start over."',
                '"Nobody maintains the SOPs. They\'re accurate for the business we were, not the business we are."',
              ].map((pain, i) => (
                <div key={i} style={{ borderBottom: '1px solid var(--rule)', padding: '20px 0' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--text-lg)', fontStyle: 'italic', lineHeight: 1.45, color: 'var(--ink)', margin: 0 }}>{pain}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section id="what-we-do" style={{ borderTop: '1px solid var(--rule)', paddingTop: 'var(--sp-16)', paddingBottom: 'var(--sp-16)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 'var(--sp-8)' }}>
            <span style={s.eyebrow}>What's Included</span>
            <h2 style={s.h2}>
              Everything needed
              <br />
              to stay <em>current.</em>
            </h2>
          </div>
          <div className="pd-module-grid reveal-group">
            {WHAT_WE_DO.map((item) => (
              <div key={item.id} className="pd-module-cell">
                <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.1em', color: 'var(--ink-3)', textTransform: 'uppercase', marginBottom: '12px' }}>{item.id}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--text-xl)', color: 'var(--ink)', marginBottom: '12px', lineHeight: 1.2 }}>{item.title}</div>
                <p style={{ ...s.body, fontSize: '14px', maxWidth: '36ch', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING NOTE */}
      <section style={{ borderTop: '1px solid var(--rule)', paddingTop: 'var(--sp-16)', paddingBottom: 'var(--sp-16)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div className="reveal" style={{ maxWidth: '560px' }}>
            <span style={s.eyebrow}>Included In</span>
            <h2 style={{ ...s.h2, fontSize: 'var(--text-2xl)', marginBottom: 'var(--sp-4)' }}>
              Ongoing support is part of every Growth and Custom plan.
            </h2>
            <p style={{ ...s.body, maxWidth: '46ch', marginBottom: 'var(--sp-4)' }}>
              It's not an add-on or an upsell. If you're on the Growth or Custom plan, this is what we do every month. It's built into the engagement model because we know the build phase is only the beginning.
            </p>
            <button onClick={open} style={{ padding: '14px 36px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px', letterSpacing: '0.03em', cursor: 'pointer' }}>
              Book a Call
            </button>
            <p style={{ ...s.body, fontSize: '13px', color: 'var(--ink-3)', marginTop: '12px' }}>No obligation. No pitch deck. A real conversation.</p>
          </div>
        </div>
      </section>

      <CalendlyPopup isOpen={calendlyOpen} onClose={() => setCalendlyOpen(false)} />
    </>
  );
}
