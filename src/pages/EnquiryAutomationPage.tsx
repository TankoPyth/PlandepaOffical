import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalendlyPopup } from '../components/ui/CalendlyPopup';
import { ENQUIRY_FAQS } from '../seo/site';
import { OFFER_PATH } from '../seo/offer';

const LEAKS = [
  'Enquiries land in five places — the website, email, phone, Facebook, hipages — and nobody owns them.',
  'The builder who replies first usually gets the site visit. You reply when you get off the tools.',
  'Quotes go out and are never chased. Good jobs go to whoever followed up.',
  "You can't say which enquiries turn into work, or what your marketing actually returns.",
];

const MODULES = [
  { id: '01', name: 'One enquiry inbox', desc: 'Every channel feeds a single pipeline. Each enquiry is logged, tagged by job type and location, and assigned to an owner.' },
  { id: '02', name: 'Instant first response', desc: 'AI drafts a reply in your voice within minutes — acknowledging the job, asking the right qualifying questions, offering a call time.' },
  { id: '03', name: 'Qualification', desc: 'Budget, location, timing and job type captured up front, so your time goes to the jobs you actually want.' },
  { id: '04', name: 'Site visit booking', desc: 'Qualified enquiries book straight into your calendar with reminders — no phone tag.' },
  { id: '05', name: 'Quote follow-up', desc: 'Every quote gets a follow-up sequence that stops the moment the client replies. Nothing sits unanswered.' },
  { id: '06', name: 'Pipeline & source reporting', desc: 'See enquiries, quotes, win rate and where the work came from — in one view, updated automatically.' },
];

export function EnquiryAutomationPage() {
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
          <span className="pd-eyebrow">AI Enquiry Capture &amp; Follow-up</span>
          <h1 className="pd-h1" style={{ fontSize: 'clamp(40px, 6vw, 72px)', marginBottom: 'var(--sp-4)' }}>
            Every enquiry answered.
            <br />
            Every quote <em>followed up.</em>
          </h1>
          <p className="pd-lead" style={{ maxWidth: '56ch', marginBottom: 'var(--sp-6)' }}>
            We build AI-assisted enquiry systems for construction companies in Brisbane, Newcastle and across Australia. Every lead is
            captured, answered, qualified and followed up — without you chasing it from the ute.
          </p>
          <div style={{ display: 'flex', gap: 'var(--sp-4)', flexWrap: 'wrap', alignItems: 'center' }}>
            <button onClick={open} className="pd-btn pd-btn-primary" style={{ padding: '14px 36px' }}>Book a Call</button>
            <a href="#what-we-build" className="pd-body" style={{ color: 'var(--ink)', textDecoration: 'none' }}>See what we build →</a>
          </div>
          <p className="pd-caption" style={{ marginTop: '12px' }}>No pitch. No obligation. 30 minutes.</p>
        </div>
      </section>

      {/* THE LEAK */}
      <section className="pd-section">
        <div className="pd-container" style={{ padding: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--sp-8)' }}>
            <div className="reveal">
              <span className="pd-eyebrow">The Leak</span>
              <h2 className="pd-h3" style={{ marginBottom: 'var(--sp-4)' }}>You don't have a lead problem. You have a follow-up problem.</h2>
              <p className="pd-body">
                Most builders we talk to already get enough enquiries. The work is lost between the first message and the signed contract —
                slow replies, no qualification, and quotes nobody chases.
              </p>
            </div>
            <ul className="reveal-group" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {LEAKS.map((l) => (
                <li key={l} className="pd-feature-item" style={{ fontSize: 'var(--text-base)', padding: '16px 0' }}>
                  <span className="pd-feature-dash" style={{ color: 'var(--accent)' }}>—</span>{l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section id="what-we-build" className="pd-section">
        <div className="pd-container" style={{ padding: 0 }}>
          <div className="reveal" style={{ marginBottom: 'var(--sp-8)' }}>
            <span className="pd-eyebrow">What We Build</span>
            <h2 className="pd-h2">From first message <br />to signed <em>contract.</em></h2>
          </div>
          <div className="pd-module-grid reveal-group">
            {MODULES.map((m) => (
              <div key={m.id} className="pd-module-cell">
                <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.1em', color: 'var(--ink-3)', marginBottom: '12px' }}>{m.id}</div>
                <h3 className="pd-h4" style={{ marginBottom: '12px' }}>{m.name}</h3>
                <p className="pd-body" style={{ fontSize: '14px', maxWidth: '36ch', margin: 0 }}>{m.desc}</p>
              </div>
            ))}
          </div>
          <p className="pd-body" style={{ marginTop: 'var(--sp-6)', maxWidth: '64ch' }}>
            Tool-agnostic: we build on what fits — HubSpot, Monday, Airtable, or the CRM you already have — and connect it to Buildxact or
            your estimating tool so won jobs hand over cleanly to delivery.
          </p>
        </div>
      </section>

      {/* WHERE IT STARTS */}
      <section className="pd-section" style={{ background: 'var(--bg-alt)' }}>
        <div className="pd-container" style={{ padding: 0 }}>
          <div className="reveal" style={{ maxWidth: '620px' }}>
            <span className="pd-eyebrow">Where It Starts</span>
            <h2 className="pd-h3" style={{ marginBottom: 'var(--sp-3)' }}>Not sure enquiries are the real leak?</h2>
            <p className="pd-body" style={{ marginBottom: 'var(--sp-4)' }}>
              The <Link to={OFFER_PATH} style={{ color: 'var(--ink)' }}>Clarity Blueprint</Link> maps where your business is actually losing
              time, margin and work, and names the first workflow to fix. For a lot of builders it's this one — but we'll tell you if it isn't.
            </p>
            <Link to={OFFER_PATH} className="pd-btn pd-btn-outline">See the Clarity Blueprint</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pd-section">
        <div className="pd-container" style={{ padding: 0 }}>
          <div className="reveal" style={{ marginBottom: 'var(--sp-6)' }}>
            <span className="pd-eyebrow">Questions</span>
            <h2 className="pd-h3">Enquiry automation — FAQ</h2>
          </div>
          <div style={{ maxWidth: '720px' }}>
            {ENQUIRY_FAQS.map((f) => (
              <div key={f.q} style={{ borderBottom: '1px solid var(--rule)', padding: '24px 0' }}>
                <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 'var(--text-md)', color: 'var(--ink)', margin: '0 0 8px' }}>{f.q}</h3>
                <p className="pd-body" style={{ margin: 0, maxWidth: 'none' }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CalendlyPopup isOpen={calendlyOpen} onClose={() => setCalendlyOpen(false)} />
    </>
  );
}
