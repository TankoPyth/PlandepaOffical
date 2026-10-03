import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendlyPopup } from '../components/ui/CalendlyPopup';

export function ThankYouPage() {
  const [calendlyOpen, setCalendlyOpen] = useState(false);

  const body: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontWeight: 300,
    fontSize: 'var(--text-base)',
    lineHeight: 1.72,
    color: 'var(--ink-2)',
  };

  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--sp-16) var(--gutter)', background: 'var(--bg)' }}>
      <div style={{ textAlign: 'center', maxWidth: '520px' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '52px', color: 'var(--ink-3)', marginBottom: 'var(--sp-3)' }}>
          ✓
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--text-2xl)', lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: 'var(--sp-3)' }}>
          Message received.
        </h1>
        <p style={{ ...body, maxWidth: '42ch', margin: '0 auto var(--sp-6)' }}>
          We'll get back to you within one business day. If you'd rather not wait, book a call directly.
        </p>

        <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 'var(--sp-6)', marginBottom: 'var(--sp-6)' }}>
          <p style={{ ...body, fontSize: '13px', color: 'var(--ink-3)', marginBottom: '16px' }}>
            Skip the wait — book a 30-minute call now.
          </p>
          <button
            onClick={() => setCalendlyOpen(true)}
            style={{ padding: '14px 36px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px', letterSpacing: '0.03em', cursor: 'pointer', display: 'block', margin: '0 auto 12px' }}
          >
            Book a Call
          </button>
          <p style={{ ...body, fontSize: '13px', color: 'var(--ink-3)' }}>No obligation. No pitch deck.</p>
        </div>

        <Link
          to="/"
          style={{ ...body, fontSize: '13px', color: 'var(--ink-3)', textDecoration: 'none' }}
        >
          ← Return to website
        </Link>
      </div>

      <CalendlyPopup isOpen={calendlyOpen} onClose={() => setCalendlyOpen(false)} />
    </div>
  );
}
