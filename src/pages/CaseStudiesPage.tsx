import { useState, useEffect } from 'react';
import { CalendlyPopup } from '../components/ui/CalendlyPopup';

interface CaseStudy {
  id: string;
  companyType: string;
  location: string;
  problem: string;
  solution: string;
  results: string[];
  testimonial: string;
  clientName: string;
  clientRole: string;
}

const caseStudiesData: CaseStudy[] = [
  {
    id: '1',
    companyType: 'Custom Home Builder',
    location: 'Brisbane, QLD',
    problem: 'Doing more than 15 hours of paperwork every week, losing quotes in emails, couldn\'t keep track of job timelines, and always playing phone tag with subbies.',
    solution: 'Set up a system that creates quotes automatically, put everything in one place so they could see all their jobs at once, and made client updates happen on their own.',
    results: [
      'Paperwork dropped from 15 hours to 4.5 hours a week',
      'Quote win rate improved from 2 in 10 to 4 in 10',
      '28 solid leads in the first month after launch',
      'Client satisfaction up 35%',
    ],
    testimonial: 'Best money we\'ve ever spent. Less time doing paperwork, more time actually building.',
    clientName: 'Mark Thompson',
    clientRole: 'Owner',
  },
  {
    id: '2',
    companyType: 'Commercial Electrical',
    location: 'Sydney, NSW',
    problem: 'Leads all over the place — feast or famine. Spending thousands on ads with nothing to show. Sales team drowning in time-wasters.',
    solution: 'Built a system that qualifies leads automatically, tracks everything properly, and moved their ad spend to what was actually working.',
    results: [
      '156 qualified leads over 6 months',
      'Close rate improved from 1–2 in 10 to 4 in 10',
      '62% reduction in cost per lead',
      '$2.4M worth of work in the pipeline',
    ],
    testimonial: 'We finally know what\'s working. The team isn\'t wasting time on tyre-kickers anymore.',
    clientName: 'Sarah Chen',
    clientRole: 'Director',
  },
  {
    id: '3',
    companyType: 'Mid-Tier Builder',
    location: 'Melbourne, VIC',
    problem: 'Project handovers were chaotic. Site teams starting jobs without full information. Rework was constant.',
    solution: 'Designed and built a structured handover process with required sign-offs at every stage. Nothing moves until the previous step is complete.',
    results: [
      'Rework incidents down 60%',
      'Average project start time reduced by 3 days',
      'Site team satisfaction significantly improved',
      'Client dispute rate dropped to near zero',
    ],
    testimonial: 'The handover system paid for itself on the first project. We haven\'t had a "we weren\'t briefed" problem since.',
    clientName: 'James K.',
    clientRole: 'Director',
  },
];

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

export function CaseStudiesPage() {
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
      {/* PAGE HERO */}
      <section style={{ paddingTop: 'var(--sp-16)', paddingBottom: 'var(--sp-12)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <span style={s.eyebrow}>Case Studies</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.05, letterSpacing: '-0.025em', color: 'var(--ink)', fontFeatureSettings: '"liga" 1, "kern" 1', marginBottom: 'var(--sp-4)' }}>
            What it looks like
            <br />
            in <em>practice.</em>
          </h1>
          <p style={{ ...s.body, fontSize: '17px', maxWidth: '52ch' }}>
            Real construction businesses. Real problems. Real systems. Here's what happened.
          </p>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section style={{ borderTop: '1px solid var(--rule)', paddingTop: 'var(--sp-16)', paddingBottom: 'var(--sp-16)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          {caseStudiesData.map((cs, i) => (
            <div
              key={cs.id}
              className="reveal"
              style={{
                borderTop: i === 0 ? 'none' : '1px solid var(--rule)',
                paddingTop: i === 0 ? 0 : 'var(--sp-12)',
                paddingBottom: 'var(--sp-12)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 'var(--sp-8)',
              }}
            >
              {/* Left: Context */}
              <div>
                <div style={{ marginBottom: 'var(--sp-4)' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: '4px' }}>{cs.location}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--text-xl)', color: 'var(--ink)', lineHeight: 1.2 }}>{cs.companyType}</div>
                </div>

                <div style={{ marginBottom: 'var(--sp-3)' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: '8px' }}>The Problem</div>
                  <p style={{ ...s.body, maxWidth: '42ch', margin: 0 }}>{cs.problem}</p>
                </div>

                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: '8px' }}>What We Built</div>
                  <p style={{ ...s.body, maxWidth: '42ch', margin: 0 }}>{cs.solution}</p>
                </div>
              </div>

              {/* Right: Results + Quote */}
              <div>
                <div style={{ marginBottom: 'var(--sp-4)' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: '12px' }}>Results</div>
                  {cs.results.map((r) => (
                    <div key={r} style={{ ...s.body, fontSize: '14px', padding: '9px 0', borderBottom: '1px solid var(--rule)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--accent)', flexShrink: 0 }}>—</span>
                      {r}
                    </div>
                  ))}
                </div>

                <div style={{ paddingTop: 'var(--sp-4)', borderTop: '1px solid var(--rule)' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '20px', fontStyle: 'italic', color: 'var(--ink)', lineHeight: 1.45, maxWidth: '38ch', marginBottom: '16px' }}>
                    "{cs.testimonial}"
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', margin: 0 }}>
                    {cs.clientName} · {cs.clientRole}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ borderTop: '1px solid var(--rule)', background: 'var(--bg-alt)', paddingTop: 'var(--sp-20)', paddingBottom: 'var(--sp-20)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)', textAlign: 'center' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <div className="reveal">
            <span style={s.eyebrow}>Your Turn</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--text-3xl)', lineHeight: 1.15, letterSpacing: '-0.025em', color: 'var(--ink)', fontFeatureSettings: '"liga" 1, "kern" 1', marginBottom: 'var(--sp-4)' }}>
              What would your
              <br />
              result <em>be?</em>
            </h2>
            <p style={{ ...s.body, fontSize: '17px', maxWidth: '46ch', margin: '0 auto var(--sp-6)' }}>
              Book a 30-minute call. We'll map where you are and what's most worth building first.
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
