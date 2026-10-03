import { useState, useEffect } from 'react';
import { CalendlyPopup } from '../components/ui/CalendlyPopup';
import { DELIVERY_GUARANTEE, FIT, GST_NOTE, OFFER_FAQS, OFFER_PROMISE, RISK_REVERSAL, TIERS, formatPrice } from '../seo/offer';

const STEPS = [
  { n: '01', name: 'Fit call', desc: 'A 30-minute call. We check the Blueprint is right for your business and agree which size fits.' },
  { n: '02', name: 'The Blueprint', desc: 'We map how the business actually runs — people, workflows, tools and information flow — and find where it leaks.' },
  { n: '03', name: 'Readout & decision', desc: 'You get the named outputs and a clear first workflow to fix. Implement it with us, or take it and run.' },
];

export function ClarityBlueprintPage() {
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
      {/* HERO */}
      <section className="pd-page-hero">
        <div className="pd-container" style={{ padding: 0 }}>
          <span className="pd-eyebrow">The Clarity Blueprint</span>
          <h1 className="pd-h1" style={{ fontSize: 'clamp(40px, 6vw, 72px)', marginBottom: 'var(--sp-4)' }}>
            Pay for the truth.
            <br />
            Then <em>fix it.</em>
          </h1>
          <p className="pd-lead" style={{ maxWidth: '56ch', marginBottom: 'var(--sp-6)' }}>
            A paid diagnostic that exposes exactly where your construction business is breaking — where time, margin, missed work and
            your own hours are leaking — and what to fix first. Three sizes. It turns straight into implementation.
          </p>
          <div style={{ display: 'flex', gap: 'var(--sp-4)', flexWrap: 'wrap', alignItems: 'center' }}>
            <button onClick={open} className="pd-btn pd-btn-primary" style={{ padding: '14px 36px' }}>Book a Fit Call</button>
            <a href="#options" className="pd-body" style={{ color: 'var(--ink)', textDecoration: 'none' }}>See the three options →</a>
          </div>
          <p className="pd-caption" style={{ marginTop: '12px' }}>From $990 + GST. Fee credited if you implement with us.</p>
        </div>
      </section>

      {/* PROMISE */}
      <section className="pd-section">
        <div className="pd-container reveal" style={{ padding: 0 }}>
          <p className="pd-h3" style={{ maxWidth: '26ch', margin: 0 }}>
            <em>“</em>{OFFER_PROMISE}<em>”</em>
          </p>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="pd-section">
        <div className="pd-container" style={{ padding: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--sp-8)' }}>
            <div className="reveal">
              <span className="pd-eyebrow">Built for you if</span>
              <h2 className="pd-h3" style={{ marginBottom: 'var(--sp-4)' }}>You're still the bottleneck.</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {FIT.yes.map((item) => (
                  <li key={item} className="pd-feature-item" style={{ fontSize: 'var(--text-base)' }}>
                    <span className="pd-feature-dash" style={{ color: 'var(--accent)' }}>—</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal">
              <span className="pd-eyebrow">Not the right fit</span>
              <h2 className="pd-h3" style={{ marginBottom: 'var(--sp-4)' }}>We'll say so upfront.</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {FIT.no.map((item) => (
                  <li key={item} className="pd-feature-item" style={{ fontSize: 'var(--text-base)' }}>
                    <span className="pd-feature-dash">—</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TIERS */}
      <section id="options" className="pd-section">
        <div className="pd-container" style={{ padding: 0 }}>
          <div className="reveal" style={{ marginBottom: 'var(--sp-8)' }}>
            <span className="pd-eyebrow">Three Sizes</span>
            <h2 className="pd-h2">Choose the depth <em>you need.</em></h2>
          </div>
          <div className="pd-pricing-grid reveal-group">
            {TIERS.map((tier) => (
              <div key={tier.id} className={`pd-plan${tier.recommended ? ' pd-plan-featured' : ''}`}>
                <div className="pd-eyebrow" style={{ color: tier.recommended ? 'var(--accent)' : undefined, minHeight: '14px' }}>
                  {tier.recommended ? 'Recommended' : ' '}
                </div>
                <h3 className="pd-h4" style={{ marginBottom: '8px' }}>{tier.name}</h3>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '48px', lineHeight: 1, color: 'var(--ink)' }}>{formatPrice(tier.price)}</span>
                  <span className="pd-caption" style={{ paddingBottom: '6px' }}>+ GST</span>
                </div>
                <p className="pd-caption" style={{ marginBottom: 'var(--sp-3)', minHeight: '40px' }}>{tier.format}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 var(--sp-4)' }}>
                  {tier.includes.map((inc) => (
                    <li key={inc} className="pd-feature-item"><span className="pd-feature-dash">—</span>{inc}</li>
                  ))}
                </ul>
                <button onClick={open} className={`pd-btn pd-btn-full ${tier.recommended ? 'pd-btn-primary' : 'pd-btn-outline'}`}>
                  Book {tier.name}
                </button>
              </div>
            ))}
          </div>
          <p className="pd-caption" style={{ marginTop: 'var(--sp-6)' }}>{GST_NOTE}</p>
        </div>
      </section>

      {/* RISK REVERSAL */}
      <section className="pd-section" style={{ background: 'var(--bg-alt)' }}>
        <div className="pd-container" style={{ padding: 0 }}>
          <div className="reveal" style={{ marginBottom: 'var(--sp-6)' }}>
            <span className="pd-eyebrow">The Risk Is Ours</span>
            <h2 className="pd-h2">Two commitments, <em>in writing.</em></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--sp-8)' }} className="reveal-group">
            <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 'var(--sp-3)' }}>
              <h3 className="pd-h4" style={{ marginBottom: '12px' }}>The fee comes off the invoice</h3>
              <p className="pd-body" style={{ margin: 0 }}>{RISK_REVERSAL}</p>
            </div>
            <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 'var(--sp-3)' }}>
              <h3 className="pd-h4" style={{ marginBottom: '12px' }}>We deliver, or we keep going</h3>
              <p className="pd-body" style={{ margin: 0 }}>{DELIVERY_GUARANTEE}</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="pd-section">
        <div className="pd-container" style={{ padding: 0 }}>
          <div className="reveal" style={{ marginBottom: 'var(--sp-8)' }}>
            <span className="pd-eyebrow">How It Works</span>
            <h2 className="pd-h2">Three steps to <em>clarity.</em></h2>
          </div>
          <div className="pd-stepper reveal-group">
            {STEPS.map((s) => (
              <div key={s.n} style={{ borderTop: '1px solid var(--rule)', paddingTop: 'var(--sp-3)' }}>
                <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.1em', color: 'var(--ink-3)', marginBottom: '12px' }}>{s.n}</div>
                <h3 className="pd-h4" style={{ marginBottom: '12px' }}>{s.name}</h3>
                <p className="pd-body" style={{ fontSize: '14px', margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pd-section">
        <div className="pd-container" style={{ padding: 0 }}>
          <div className="reveal" style={{ marginBottom: 'var(--sp-6)' }}>
            <span className="pd-eyebrow">Questions</span>
            <h2 className="pd-h3">Clarity Blueprint — FAQ</h2>
          </div>
          <div style={{ maxWidth: '720px' }}>
            {OFFER_FAQS.map((f) => (
              <div key={f.q} style={{ borderBottom: '1px solid var(--rule)', padding: '24px 0' }}>
                <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 'var(--text-md)', color: 'var(--ink)', margin: '0 0 8px' }}>{f.q}</h3>
                <p className="pd-body" style={{ margin: 0, maxWidth: 'none' }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pd-section">
        <div className="pd-container" style={{ padding: 0 }}>
          <div className="reveal" style={{ maxWidth: '560px' }}>
            <h2 className="pd-h3" style={{ marginBottom: 'var(--sp-3)' }}>Find out what's actually breaking.</h2>
            <p className="pd-body" style={{ marginBottom: 'var(--sp-4)' }}>
              A 30-minute fit call with Jarrod or Mitch. If the Blueprint isn't right for you, we'll tell you.
            </p>
            <button onClick={open} className="pd-btn pd-btn-primary" style={{ padding: '14px 36px' }}>Book a Fit Call</button>
          </div>
        </div>
      </section>

      <CalendlyPopup isOpen={calendlyOpen} onClose={() => setCalendlyOpen(false)} />
    </>
  );
}
