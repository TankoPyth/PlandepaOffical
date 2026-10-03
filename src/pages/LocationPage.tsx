import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalendlyPopup } from '../components/ui/CalendlyPopup';
import { LOCATIONS } from '../seo/site';
import { OFFER_PATH } from '../seo/offer';

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
  section: {
    borderTop: '1px solid var(--rule)',
    paddingTop: 'var(--sp-16)',
    paddingBottom: 'var(--sp-16)',
    paddingLeft: 'var(--gutter)',
    paddingRight: 'var(--gutter)',
  } as React.CSSProperties,
  button: {
    padding: '14px 36px',
    background: 'var(--accent)',
    color: '#fff',
    border: 'none',
    borderRadius: 'var(--radius)',
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
    fontSize: '13px',
    letterSpacing: '0.03em',
    cursor: 'pointer',
  } as React.CSSProperties,
};

const USE_CASES = [
  { id: '01', name: 'Enquiry capture & follow-up', desc: 'Every enquiry from web, phone, email and social lands in one pipeline, gets assigned, and is followed up automatically. No lead goes cold.' },
  { id: '02', name: 'Quoting & estimating', desc: 'Templated quotes that go out the same day, with automatic follow-ups. Works alongside Buildxact or your existing estimating tool.' },
  { id: '03', name: 'Variations & approvals', desc: 'Variations captured on site, priced, sent for sign-off and escalated if they stall — before the work starts, not after.' },
  { id: '04', name: 'Job handover', desc: 'A structured handover from sales to delivery with required fields and owners, so nothing is lost between the contract and the first site day.' },
  { id: '05', name: 'Site capture & admin', desc: 'Photos, notes and site diaries captured once, tagged to the right job, and routed to the right person. AI drafts the paperwork.' },
  { id: '06', name: 'Reporting', desc: 'Revenue, pipeline, job progress and costs in one live view — not a Monday morning phone call.' },
];

const STEPS = [
  { label: 'Blueprint', desc: 'The Clarity Blueprint maps where time, margin and owner capacity are leaking, and names the first workflow to fix.' },
  { label: 'Build', desc: 'We design and implement your systems and automations in 30–60 days, using tools that fit your size.' },
  { label: 'Support', desc: 'We train your team and stay on as your operational partner so the systems keep working.' },
];

export function LocationPage({ location }: { location: keyof typeof LOCATIONS }) {
  const loc = LOCATIONS[location];
  const other = LOCATIONS[location === 'brisbane' ? 'newcastle' : 'brisbane'];
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const open = () => setCalendlyOpen(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal, .reveal-group').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location]);

  return (
    <>
      {/* HERO */}
      <section style={{ paddingTop: 'var(--sp-16)', paddingBottom: 'var(--sp-12)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <span style={s.eyebrow}>{loc.city} · {loc.state}</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.05, letterSpacing: '-0.025em', color: 'var(--ink)', fontFeatureSettings: '"liga" 1, "kern" 1', marginBottom: 'var(--sp-4)' }}>
            AI implementation for
            <br />
            {loc.city} <em>construction companies.</em>
          </h1>
          <p style={{ ...s.body, fontSize: '17px', maxWidth: '58ch', marginBottom: 'var(--sp-6)' }}>{loc.intro}</p>
          <div style={{ display: 'flex', gap: 'var(--sp-4)', flexWrap: 'wrap', alignItems: 'center' }}>
            <button onClick={open} style={s.button}>Book a Call</button>
            <a href="#what-we-automate" style={{ ...s.body, fontSize: '15px', color: 'var(--ink)', textDecoration: 'none' }}>
              See what we automate →
            </a>
          </div>
          <p style={{ ...s.body, fontSize: '13px', color: 'var(--ink-3)', marginTop: '12px' }}>No pitch. No obligation. 30 minutes.</p>
        </div>
      </section>

      {/* LOCAL CONTEXT */}
      <section style={s.section}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--sp-8)' }}>
            <div className="reveal">
              <span style={s.eyebrow}>Building in {loc.region}</span>
              <h2 style={{ ...s.h2, fontSize: 'var(--text-2xl)', marginBottom: 'var(--sp-4)' }}>
                More work. Same office team.
              </h2>
              <p style={{ ...s.body, maxWidth: '46ch' }}>{loc.context}</p>
            </div>
            <div className="reveal">
              <span style={s.eyebrow}>Areas we work with</span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[loc.city, ...loc.nearby].map((place) => (
                  <li key={place} style={{ ...s.body, borderBottom: '1px solid var(--rule)', padding: '12px 0', color: 'var(--ink)' }}>
                    {place}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section id="what-we-automate" style={s.section}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 'var(--sp-8)' }}>
            <span style={s.eyebrow}>What We Automate</span>
            <h2 style={s.h2}>
              Where AI actually helps
              <br />
              a <em>builder.</em>
            </h2>
          </div>
          <div className="pd-module-grid reveal-group">
            {USE_CASES.map((u) => (
              <div key={u.id} className="pd-module-cell">
                <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.1em', color: 'var(--ink-3)', textTransform: 'uppercase', marginBottom: '12px' }}>{u.id}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--text-xl)', color: 'var(--ink)', marginBottom: '12px', lineHeight: 1.2 }}>{u.name}</h3>
                <p style={{ ...s.body, fontSize: '14px', maxWidth: '36ch', margin: 0 }}>{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section style={s.section}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 'var(--sp-6)' }}>
            <span style={s.eyebrow}>How We Work</span>
            <h2 style={{ ...s.h2, fontSize: 'var(--text-2xl)' }}>Construction only. Tool-agnostic.</h2>
          </div>
          <div className="reveal-group">
            {STEPS.map((step) => (
              <div key={step.label} style={{ borderBottom: '1px solid var(--rule)', padding: '20px 0', display: 'flex', gap: 'var(--sp-3)', alignItems: 'flex-start' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '22px', color: 'var(--accent)', flexShrink: 0, minWidth: '100px' }}>{step.label}</div>
                <p style={{ ...s.body, fontSize: '14px', margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ ...s.body, marginTop: 'var(--sp-4)' }}>
            Start with the <Link to={OFFER_PATH} style={{ color: 'var(--ink)' }}>Clarity Blueprint</Link> — from $990 + GST, with the fee credited if we
            implement — or go straight to <Link to="/enquiry-automation" style={{ color: 'var(--ink)' }}>enquiry automation</Link> or{' '}
            <Link to="/buildxact" style={{ color: 'var(--ink)' }}>Buildxact set up properly</Link>.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section style={s.section}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 'var(--sp-6)' }}>
            <span style={s.eyebrow}>Questions</span>
            <h2 style={{ ...s.h2, fontSize: 'var(--text-2xl)' }}>AI for {loc.city} builders — FAQ</h2>
          </div>
          <div style={{ maxWidth: '720px' }}>
            {loc.faqs.map((f) => (
              <div key={f.q} style={{ borderBottom: '1px solid var(--rule)', padding: '24px 0' }}>
                <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 'var(--text-md)', color: 'var(--ink)', margin: '0 0 8px' }}>{f.q}</h3>
                <p style={{ ...s.body, margin: 0 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={s.section}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div className="reveal" style={{ maxWidth: '560px' }}>
            <h2 style={{ ...s.h2, fontSize: 'var(--text-2xl)', marginBottom: 'var(--sp-3)' }}>Talk to us about your business.</h2>
            <p style={{ ...s.body, marginBottom: 'var(--sp-4)' }}>
              A 30-minute call with Jarrod or Mitch. We'll tell you honestly where AI and better systems would make a difference — and where they won't.
            </p>
            <button onClick={open} style={s.button}>Book a Call</button>
            <p style={{ ...s.body, fontSize: '13px', color: 'var(--ink-3)', marginTop: 'var(--sp-4)' }}>
              Also working with builders in <Link to={other.slug} style={{ color: 'var(--ink-2)' }}>{other.city}</Link>.
            </p>
          </div>
        </div>
      </section>

      <CalendlyPopup isOpen={calendlyOpen} onClose={() => setCalendlyOpen(false)} />
    </>
  );
}
