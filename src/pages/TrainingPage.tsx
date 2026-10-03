import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalendlyPopup } from '../components/ui/CalendlyPopup';
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
};

const OFFERS = [
  {
    id: 'EDU.01',
    badge: 'Free',
    title: 'Automation Possibilities Webinar',
    duration: '90 minutes · Online',
    desc: 'What is actually possible with automation in a construction business. No hype, no theory. Real workflows, real examples, real questions answered live.',
    forWho: 'Owners and directors who keep hearing about AI but don\'t know what\'s real, what\'s safe, or what applies to their business.',
    includes: [
      'The 5 most common admin bottlenecks in construction, and why they keep repeating',
      'Real workflow examples — no software demos',
      'How to spot your top 1–3 highest-ROI opportunities',
      'Live Q&A session',
    ],
  },
  {
    id: 'EDU.02',
    badge: 'Clarity Blueprint',
    title: 'Clarity Sprint',
    duration: '3 hours · Virtual',
    desc: 'The first size of the Clarity Blueprint: a working session that maps where your business is leaking and names the first workflow to fix.',
    forWho: 'Construction businesses with 10–50 staff that want clarity on what to fix and automate first, without committing to a major project.',
    includes: [
      'High-level Business Clarity Map',
      'Top Three Leak Register',
      'First Workflow Decision',
      '30-day priority plan and readout call',
    ],
    href: OFFER_PATH,
  },
  {
    id: 'EDU.03',
    badge: 'For teams',
    title: 'Team Workshop',
    duration: 'Half or full day · On-site or remote',
    desc: 'Hands-on training for your team on the operational systems that run your business. Built around your actual tools and workflows.',
    forWho: 'Teams that have implemented new systems and need everyone operating at the same standard.',
    includes: [
      'Custom curriculum built around your stack',
      'Hands-on exercises with real business scenarios',
      'Reference materials and SOPs provided',
      'Follow-up Q&A session (2 weeks post-workshop)',
    ],
  },
];

export function TrainingPage() {
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
      {/* PAGE HERO */}
      <section style={{ paddingTop: 'var(--sp-16)', paddingBottom: 'var(--sp-12)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <span style={s.eyebrow}>Training & Education</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.05, letterSpacing: '-0.025em', color: 'var(--ink)', fontFeatureSettings: '"liga" 1, "kern" 1', marginBottom: 'var(--sp-4)' }}>
            Understand it
            <br />
            before you <em>build it.</em>
          </h1>
          <p style={{ ...s.body, fontSize: '17px', maxWidth: '52ch', marginBottom: 'var(--sp-6)' }}>
            Education for construction businesses that want to understand what automation and operational systems actually look like in practice — before making any commitments.
          </p>
          <button onClick={open} style={{ padding: '14px 36px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px', letterSpacing: '0.03em', cursor: 'pointer' }}>
            Book a Call
          </button>
          <p style={{ ...s.body, fontSize: '13px', color: 'var(--ink-3)', marginTop: '12px' }}>No pitch. No obligation. 30 minutes.</p>
        </div>
      </section>

      {/* OFFERS */}
      <section style={{ borderTop: '1px solid var(--rule)', paddingTop: 'var(--sp-16)', paddingBottom: 'var(--sp-16)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 'var(--sp-8)' }}>
            <span style={s.eyebrow}>Education Options</span>
            <h2 style={s.h2}>
              Three ways to
              <br />
              get <em>clarity.</em>
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {OFFERS.map((offer, i) => (
              <div key={offer.id} className="reveal" style={{ borderTop: '1px solid var(--rule)', paddingTop: 'var(--sp-6)', paddingBottom: 'var(--sp-6)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--sp-6)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.1em', color: 'var(--ink-3)', textTransform: 'uppercase', paddingTop: '3px' }}>{offer.id}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '11px', letterSpacing: '0.05em', color: offer.badge === 'Free' ? 'var(--accent)' : 'var(--ink)', border: `1px solid ${offer.badge === 'Free' ? 'var(--accent)' : 'var(--ink-3)'}`, padding: '2px 8px', borderRadius: 'var(--radius)' }}>{offer.badge}</div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--text-xl)', color: 'var(--ink)', marginBottom: '8px', lineHeight: 1.2 }}>{offer.title}</div>
                  <div style={{ ...s.body, fontSize: '13px', color: 'var(--ink-3)', marginBottom: '16px' }}>{offer.duration}</div>
                  <p style={{ ...s.body, maxWidth: '40ch' }}>{offer.desc}</p>
                </div>
                <div>
                  <p style={{ ...s.body, fontSize: '13px', color: 'var(--ink-3)', marginBottom: '16px' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontWeight: 500, color: 'var(--ink-2)', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '11px' }}>For:</span>{' '}
                    {offer.forWho}
                  </p>
                  <div>
                    {offer.includes.map((item) => (
                      <div key={item} style={{ ...s.body, fontSize: '13px', padding: '8px 0', borderBottom: '1px solid var(--rule)', display: 'flex', gap: '8px' }}>
                        <span style={{ color: 'var(--ink-3)', flexShrink: 0 }}>—</span>
                        {item}
                      </div>
                    ))}
                  </div>
                  {'href' in offer && offer.href ? (
                    <Link to={offer.href} className="pd-btn pd-btn-outline" style={{ marginTop: 'var(--sp-3)', padding: '10px 24px' }}>
                      See the Clarity Blueprint
                    </Link>
                  ) : (
                    <button onClick={open} style={{ marginTop: 'var(--sp-3)', padding: '10px 24px', background: i === 0 ? 'var(--accent)' : 'transparent', color: i === 0 ? '#fff' : 'var(--ink)', border: `1px solid ${i === 0 ? 'var(--accent)' : 'var(--ink)'}`, borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px', letterSpacing: '0.03em', cursor: 'pointer' }}>
                      {offer.badge === 'Free' ? 'Register Free' : 'Book a Call'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ borderTop: '1px solid var(--rule)', background: 'var(--bg-alt)', paddingTop: 'var(--sp-20)', paddingBottom: 'var(--sp-20)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)', textAlign: 'center' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <div className="reveal">
            <span style={s.eyebrow}>Not Sure Where to Start?</span>
            <h2 style={{ ...s.h2, marginBottom: 'var(--sp-4)' }}>
              Start with a
              <br />
              30-minute <em>call.</em>
            </h2>
            <p style={{ ...s.body, fontSize: '17px', maxWidth: '46ch', margin: '0 auto var(--sp-6)' }}>
              Tell us about your business. We'll point you to the right starting point — whether that's a free webinar, the Clarity Blueprint, or jumping straight into a pilot.
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
