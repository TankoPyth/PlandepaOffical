import { useState, useEffect } from 'react';
import { ContactForm } from '../components/ContactForm';
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
};

export function ContactPage() {
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const open = () => setCalendlyOpen(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* PAGE HERO */}
      <section style={{ paddingTop: 'var(--sp-16)', paddingBottom: 'var(--sp-12)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <span style={s.eyebrow}>Contact</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.05, letterSpacing: '-0.025em', color: 'var(--ink)', fontFeatureSettings: '"liga" 1, "kern" 1', marginBottom: 'var(--sp-4)' }}>
            Let's have a
            <br />
            real <em>conversation.</em>
          </h1>
          <p style={{ ...s.body, fontSize: '17px', maxWidth: '52ch' }}>
            Tell us about your business. We'll get back to you within one business day and set up a time to talk.
          </p>
        </div>
      </section>

      {/* FORM + INFO */}
      <section style={{ borderTop: '1px solid var(--rule)', paddingTop: 'var(--sp-16)', paddingBottom: 'var(--sp-16)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--sp-16)' }}>

            {/* Form */}
            <div className="reveal">
              <span style={s.eyebrow}>Send a message</span>
              <ContactForm source="contact" />
            </div>

            {/* Info */}
            <div className="reveal">
              <span style={s.eyebrow}>Other ways to reach us</span>

              <div style={{ marginBottom: 'var(--sp-6)' }}>
                {[
                  { label: 'Email',         value: 'hello@plandepa.com.au', href: 'mailto:hello@plandepa.com.au' },
                  { label: 'Service area',  value: 'Australia-wide · Remote consultations available', href: null },
                  { label: 'Response time', value: 'Within one business day, Monday – Friday', href: null },
                ].map((item) => (
                  <div key={item.label} style={{ borderBottom: '1px solid var(--rule)', padding: '20px 0' }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: '6px' }}>{item.label}</div>
                    {item.href
                      ? <a href={item.href} style={{ ...s.body, color: 'var(--ink)', textDecoration: 'none' }}>{item.value}</a>
                      : <p style={{ ...s.body, margin: 0 }}>{item.value}</p>
                    }
                  </div>
                ))}
              </div>

              <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: 'var(--sp-4)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--text-lg)', fontStyle: 'italic', color: 'var(--ink)', marginBottom: '12px' }}>
                  Prefer to book a time directly?
                </div>
                <p style={{ ...s.body, fontSize: '14px', maxWidth: '36ch', marginBottom: 'var(--sp-3)' }}>
                  Skip the form. Book a 30-minute call and we'll have a real conversation about what you're working with.
                </p>
                <button onClick={open} style={{ padding: '11px 24px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px', letterSpacing: '0.03em', cursor: 'pointer' }}>
                  Book a Call
                </button>
                <p style={{ ...s.body, fontSize: '13px', color: 'var(--ink-3)', marginTop: '8px' }}>No obligation. 30 minutes.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <CalendlyPopup isOpen={calendlyOpen} onClose={() => setCalendlyOpen(false)} />
    </>
  );
}
