import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalendlyPopup } from './ui/CalendlyPopup';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [calendlyOpen, setCalendlyOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'rgba(248, 246, 242, 0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: scrolled ? '1px solid var(--rule)' : '1px solid transparent',
          transition: 'border-color 0.3s ease',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--max-w)',
            margin: '0 auto',
            padding: '0 var(--gutter)',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link
            to="/"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              fontSize: '14px',
              letterSpacing: '0.06em',
              color: 'var(--ink)',
              textDecoration: 'none',
            }}
          >
            PlanDepa
          </Link>

          <button
            onClick={() => setCalendlyOpen(true)}
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: '13px',
              color: 'var(--ink)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              letterSpacing: '0.01em',
            }}
          >
            Book a Call →
          </button>
        </div>
      </nav>

      <CalendlyPopup
        isOpen={calendlyOpen}
        onClose={() => setCalendlyOpen(false)}
      />
    </>
  );
}
