import { Link } from 'react-router-dom';

// Crawlable internal links — the main nav has none, so this is how search
// engines and LLM crawlers discover the rest of the site.
const FOOTER_GROUPS = [
  {
    heading: 'Services',
    links: [
      { label: 'The Clarity Blueprint', to: '/clarity-blueprint' },
      { label: 'Enquiry Automation', to: '/enquiry-automation' },
      { label: 'Pilot Program', to: '/pilot-program' },
      { label: 'Buildxact Implementation', to: '/buildxact' },
      { label: 'Training', to: '/training' },
      { label: 'Ongoing Support', to: '/ongoing-support' },
    ],
  },
  {
    heading: 'Locations',
    links: [
      { label: 'AI for Construction — Brisbane', to: '/construction-ai-brisbane' },
      { label: 'AI for Construction — Newcastle', to: '/construction-ai-newcastle' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Admin Cost Calculator', to: '/roi-calculator' },
      { label: 'Case Studies', to: '/case-studies' },
      { label: 'Blog', to: '/blog' },
      { label: 'Contact', to: '/contact' },
    ],
  },
];

const footerLink: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontWeight: 300,
  fontSize: '13px',
  color: 'var(--ink-2)',
  textDecoration: 'none',
  lineHeight: 2,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: '1px solid var(--rule)',
        background: 'var(--bg)',
        padding: 'var(--sp-8) var(--gutter) var(--sp-6)',
      }}
    >
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>

        {/* Row 1 — logo + links */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '32px',
            marginBottom: 'var(--sp-6)',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: '14px',
                letterSpacing: '0.06em',
                color: 'var(--ink)',
                marginBottom: '8px',
              }}
            >
              PlanDepa
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
                fontSize: '13px',
                color: 'var(--ink-3)',
                lineHeight: 1.55,
              }}
            >
              AI implementation and operational systems<br />
              for construction companies in Brisbane,<br />
              Newcastle and across Australia.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
            {FOOTER_GROUPS.map((group) => (
              <div key={group.heading}>
                <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '11px', letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: '8px' }}>
                  {group.heading}
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {group.links.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to} style={footerLink}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <nav
            style={{
              display: 'flex',
              gap: '32px',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            {[
              { label: 'Privacy', href: '#' },
              { label: 'LinkedIn', href: 'https://linkedin.com/company/plandepa' },
              { label: 'hello@plandepa.com.au', href: 'mailto:hello@plandepa.com.au' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 300,
                  fontSize: '12px',
                  color: 'var(--ink-2)',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-2)')}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Row 2 — legal */}
        <div
          style={{
            borderTop: '1px solid var(--rule)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: '12px',
              color: 'var(--ink-3)',
            }}
          >
            © {year} PlanDepa Pty Ltd · ABN XX XXX XXX XXX
          </span>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: '12px',
              color: 'var(--ink-3)',
            }}
          >
            Built with intention.
          </span>
        </div>

      </div>
    </footer>
  );
}
