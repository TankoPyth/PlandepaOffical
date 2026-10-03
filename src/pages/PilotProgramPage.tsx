import { useState, useEffect } from 'react';
import { CalendlyPopup } from '../components/ui/CalendlyPopup';

const WORKFLOWS = [
  {
    id: 'SYS.01',
    title: 'Inbound Black Hole',
    pain: 'Enquiries disappear into email chaos. Nothing gets tracked. Hot leads go cold.',
    fix: 'A single capture system across every channel. Auto-assigned, auto-followed-up. Nothing falls through.',
  },
  {
    id: 'SYS.02',
    title: 'The Chasing Drain',
    pain: 'Hours lost every week chasing clients, suppliers, and staff for simple updates.',
    fix: 'Automated follow-up schedules tied to request types. Reminders fire themselves.',
  },
  {
    id: 'SYS.03',
    title: 'Variation Approvals',
    pain: 'Variations sit too long. Work starts before sign-off. Margin erodes in the gap.',
    fix: 'Structured variation capture with defined approval windows and automatic escalation.',
  },
  {
    id: 'SYS.04',
    title: 'Photo & Comms Sync',
    pain: 'Photos and notes live in pockets and group chats. Office spends hours reconstructing context.',
    fix: 'Simple capture path from site, auto-tagged by job and routed to the right person.',
  },
  {
    id: 'SYS.05',
    title: 'Supplier Chasing',
    pain: 'Materials arrive late or wrong. Nobody can see what is outstanding until it\'s urgent.',
    fix: 'Centralised purchase tracking with status visible to all relevant parties.',
  },
  {
    id: 'SYS.06',
    title: 'Quote-to-Delivery',
    pain: 'Jobs are won, then the handover is messy. Delivery starts without full clarity.',
    fix: 'Structured handover with required fields, owner assignments, and due dates at every stage.',
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

export function PilotProgramPage() {
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
          <span style={s.eyebrow}>28-Day Pilot Program</span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(40px, 6vw, 72px)',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: 'var(--ink)',
              fontFeatureSettings: '"liga" 1, "kern" 1',
              marginBottom: 'var(--sp-4)',
            }}
          >
            Prove it works
            <br />
            before you <em>commit.</em>
          </h1>
          <p style={{ ...s.body, fontSize: '17px', maxWidth: '52ch', marginBottom: 'var(--sp-6)' }}>
            Pick one bottleneck. We design and deploy the system in 28 days.
            You see real results before we discuss anything further.
          </p>
          <div style={{ display: 'flex', gap: 'var(--sp-4)', flexWrap: 'wrap', alignItems: 'center' }}>
            <button onClick={open} style={{ padding: '14px 36px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius)', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px', letterSpacing: '0.03em', cursor: 'pointer' }}>
              Book a Call
            </button>
            <a href="#workflows" style={{ ...s.body, fontSize: '15px', color: 'var(--ink)', textDecoration: 'none' }}>
              See the workflows →
            </a>
          </div>
          <p style={{ ...s.body, fontSize: '13px', color: 'var(--ink-3)', marginTop: '12px' }}>
            No pitch. No obligation. 30 minutes.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ borderTop: '1px solid var(--rule)', paddingTop: 'var(--sp-16)', paddingBottom: 'var(--sp-16)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 'var(--sp-8)' }}>
            <span style={s.eyebrow}>The Process</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--text-3xl)', lineHeight: 1.15, letterSpacing: '-0.025em', color: 'var(--ink)', fontFeatureSettings: '"liga" 1, "kern" 1' }}>
              28 days.
              <br />
              One <em>bottleneck.</em>
            </h2>
          </div>
          <div className="pd-stepper reveal-group">
            {[
              { num: '①', title: 'Scoping call',   body: 'We identify the single highest-impact bottleneck in your business. You get a clear scope document within 48 hours.' },
              { num: '②', title: 'Build sprint',   body: 'We design, build, and test the system. You\'re involved at key checkpoints. Nothing lands without your sign-off.' },
              { num: '③', title: 'Live & trained', body: 'Your team is trained on the new system. We stay on for two weeks to make sure it holds in the real world.' },
            ].map((step) => (
              <div key={step.title} style={{ paddingTop: 'var(--sp-3)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--text-3xl)', color: 'var(--ink-3)', lineHeight: 1, marginBottom: '20px' }}>{step.num}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '12px' }}>{step.title}</div>
                <p style={{ ...s.body, fontSize: '14px', maxWidth: '28ch', margin: 0 }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOWS */}
      <section id="workflows" style={{ borderTop: '1px solid var(--rule)', paddingTop: 'var(--sp-16)', paddingBottom: 'var(--sp-16)', paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 'var(--sp-8)' }}>
            <span style={s.eyebrow}>Available Workflows</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--text-3xl)', lineHeight: 1.15, letterSpacing: '-0.025em', color: 'var(--ink)', fontFeatureSettings: '"liga" 1, "kern" 1' }}>
              Choose your
              <br />
              first <em>fix.</em>
            </h2>
          </div>
          <div className="pd-module-grid reveal-group">
            {WORKFLOWS.map((wf) => (
              <div key={wf.id} className="pd-module-cell">
                <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.1em', color: 'var(--ink-3)', textTransform: 'uppercase', marginBottom: '12px' }}>{wf.id}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--text-xl)', color: 'var(--ink)', marginBottom: '12px', lineHeight: 1.2 }}>{wf.title}</div>
                <p style={{ ...s.body, fontSize: '13px', color: 'var(--ink-3)', maxWidth: '34ch', marginBottom: '12px' }}><em>The problem:</em> {wf.pain}</p>
                <p style={{ ...s.body, fontSize: '13px', maxWidth: '34ch', margin: 0 }}><em>What we build:</em> {wf.fix}</p>
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
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--text-3xl)', lineHeight: 1.15, letterSpacing: '-0.025em', color: 'var(--ink)', fontFeatureSettings: '"liga" 1, "kern" 1', marginBottom: 'var(--sp-4)' }}>
              Pick a workflow.
              <br />
              Start <em>this month.</em>
            </h2>
            <p style={{ ...s.body, fontSize: '17px', maxWidth: '46ch', margin: '0 auto var(--sp-6)' }}>
              Book a 30-minute call. We'll identify the right workflow for your business and scope the build.
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
