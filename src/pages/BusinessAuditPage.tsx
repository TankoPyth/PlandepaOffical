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

const FAQS = [
  { q: 'What happens in the discovery call?', a: 'We have a 30-minute conversation to understand your business, what\'s frustrating you, and what you\'re trying to achieve. No sales pitch — just a genuine conversation to see if we can help.' },
  { q: 'Is there any obligation after the call?', a: 'None at all. After the call we\'ll let you know if we think we can add value. If it\'s not a good fit, we\'ll tell you honestly.' },
  { q: 'Do I need to prepare anything?', a: 'Not really. If you want, jot down what\'s frustrating you right now and what you\'re trying to achieve. But we\'ll walk you through everything.' },
  { q: 'Can I bring my team?', a: 'Yes. It\'s actually better if you bring the people who deal with the day-to-day — your ops manager, admin person, whoever. The more context, the better.' },
];

export function BusinessAuditPage() {
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const open = () => setCalendlyOpen(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* HERO */}
      <section style={{ paddingTop: 'var(--sp-16)', paddingBottom: 'var(--sp-12)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <span style={s.eyebrow}>Business Audit</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.05, letterSpacing: '-0.025em', color: 'var(--ink)', fontFeatureSettings: '"liga" 1, "kern" 1', marginBottom: 'var(--sp-4)' }}>
            Find out what's
            <br />
            actually <em>breaking.</em>
          </h1>
          <p style={{ ...s.body, fontSize: '17px', maxWidth: '52ch', marginBottom: 'var(--sp-6)' }}>
            A structured audit of your construction business — how it runs today, where it's losing control, and what to fix first. Honest assessment. No upsell.
          </p>
          <button onClick={open} style={{ padding: '14px 36px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px', letterSpacing: '0.03em', cursor: 'pointer' }}>
            Book a Call
          </button>
          <p style={{ ...s.body, fontSize: '13px', color: 'var(--ink-3)', marginTop: '12px' }}>No pitch. No obligation. 30 minutes.</p>
        </div>
      </section>

      {/* WHAT IT IS */}
      <section style={{ borderTop: '1px solid var(--rule)', paddingTop: 'var(--sp-16)', paddingBottom: 'var(--sp-16)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--sp-8)' }}>
            <div className="reveal">
              <span style={s.eyebrow}>What We Look At</span>
              <h2 style={{ ...s.h2, fontSize: 'var(--text-2xl)', marginBottom: 'var(--sp-4)' }}>
                Every system that runs your business.
              </h2>
              <p style={{ ...s.body, maxWidth: '42ch', marginBottom: '20px' }}>
                Most construction businesses have never had someone look at how the whole thing fits together. Sales to delivery. Office to site. Tools to people.
              </p>
              <p style={{ ...s.body, maxWidth: '42ch' }}>
                We map it, assess it, and tell you what's costing you most — time, margin, or both.
              </p>
            </div>
            <div className="reveal">
              {[
                { area: 'Sales & Pipeline',     desc: 'How leads enter, how they\'re followed up, how quotes are managed, and where you\'re losing jobs you should win.' },
                { area: 'Project Operations',   desc: 'How jobs are handed over, managed, and closed. Where delays happen and why.' },
                { area: 'Admin & Reporting',    desc: 'The weekly work that happens in the background. What\'s manual, what\'s duplicated, what\'s missing.' },
                { area: 'Team & Communication', desc: 'How information moves between people. Where it gets lost or distorted.' },
              ].map((item) => (
                <div key={item.area} style={{ borderBottom: '1px solid var(--rule)', padding: '20px 0' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '20px', color: 'var(--ink)', marginBottom: '6px' }}>{item.area}</div>
                  <p style={{ ...s.body, fontSize: '14px', margin: 0, maxWidth: '38ch' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ borderTop: '1px solid var(--rule)', paddingTop: 'var(--sp-16)', paddingBottom: 'var(--sp-16)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 'var(--sp-8)' }}>
            <span style={s.eyebrow}>The Process</span>
            <h2 style={s.h2}>
              Simple.
              <br />
              No <em>overhead.</em>
            </h2>
          </div>
          <div className="pd-stepper">
            {[
              { num: '①', title: 'Discovery call', body: 'A 30-minute call to understand your business, your pain points, and whether an audit is the right next step.' },
              { num: '②', title: 'Audit sessions', body: 'We work through your business systematically — typically two or three sessions across two weeks.' },
              { num: '③', title: 'Findings report', body: 'A clear document: what\'s working, what\'s breaking, and a prioritised list of what to fix first.' },
            ].map((step) => (
              <div key={step.title} className="reveal" style={{ paddingTop: 'var(--sp-3)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--text-3xl)', color: 'var(--ink-3)', lineHeight: 1, marginBottom: '20px' }}>{step.num}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '12px' }}>{step.title}</div>
                <p style={{ ...s.body, fontSize: '14px', maxWidth: '28ch', margin: 0 }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ borderTop: '1px solid var(--rule)', paddingTop: 'var(--sp-12)', paddingBottom: 'var(--sp-12)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 'var(--sp-6)' }}>
            <span style={s.eyebrow}>Questions</span>
            <h2 style={{ ...s.h2, fontSize: 'var(--text-2xl)' }}>
              Before you book.
            </h2>
          </div>
          <div style={{ maxWidth: 'var(--max-w-tight)' }}>
            {FAQS.map((faq) => (
              <div key={faq.q} className="reveal">
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '22px', color: 'var(--ink)', borderTop: '1px solid var(--rule)', paddingTop: 'var(--sp-4)', marginBottom: 'var(--sp-2)', letterSpacing: '-0.01em' }}>
                  {faq.q}
                </h3>
                <p style={{ ...s.body, marginBottom: 'var(--sp-4)' }}>{faq.a}</p>
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
              Book a call.
              <br />
              Find out what's <em>costing you.</em>
            </h2>
            <p style={{ ...s.body, fontSize: '17px', maxWidth: '46ch', margin: '0 auto var(--sp-6)' }}>
              30 minutes. We'll tell you honestly whether we think we can help.
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
