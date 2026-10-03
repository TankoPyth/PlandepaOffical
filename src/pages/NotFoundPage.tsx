import { Link } from 'react-router-dom';

const body: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontWeight: 300,
  fontSize: 'var(--text-base)',
  lineHeight: 1.72,
  color: 'var(--ink-2)',
};

export function NotFoundPage() {
  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--sp-16) var(--gutter)', background: 'var(--bg)' }}>
      <div style={{ textAlign: 'center', maxWidth: '480px' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(80px, 15vw, 140px)', lineHeight: 1, color: 'var(--ink-3)', marginBottom: 'var(--sp-3)' }}>
          404
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--text-2xl)', lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: 'var(--sp-3)' }}>
          Page not found.
        </h1>
        <p style={{ ...body, maxWidth: '38ch', margin: '0 auto var(--sp-6)' }}>
          This page doesn't exist or has moved. Head back to the home page or get in touch.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={{ padding: '11px 24px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px', letterSpacing: '0.03em', textDecoration: 'none', cursor: 'pointer' }}>
            Go home
          </Link>
          <a href="mailto:hello@plandepa.com.au" style={{ padding: '11px 24px', background: 'transparent', color: 'var(--ink)', border: '1px solid var(--ink)', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px', letterSpacing: '0.03em', textDecoration: 'none', cursor: 'pointer' }}>
            Contact us
          </a>
        </div>
      </div>
    </div>
  );
}
