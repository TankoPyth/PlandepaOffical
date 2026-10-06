import { JARROD, type LocalPost } from './types';

export const aiBusinessCaseConstruction: LocalPost = {
  slug: 'ai-business-case-construction',
  title: 'The Business Case for AI in a Construction Business: A Worked Example',
  metaDescription:
    'A plain-numbers business case for AI in a 10 to 50 person construction company: where the money leaks, a worked example you can rerun with your own figures, and how to test it safely.',
  excerpt:
    'Skip the hype. Here is a simple, honest way to work out whether AI is worth it in your construction business: where the money actually leaks, a worked example with the arithmetic shown, and how to prove it before you commit.',
  category: { name: 'AI in Construction', slug: 'ai-in-construction' },
  tags: ['AI business case', 'construction ROI', 'construction automation', 'admin costs'],
  author: JARROD,
  published_at: '2026-10-06T09:05:00+10:00',
  content: `
<p>Construction margins are often thin, commonly a few percent net after everything is paid. That is why a few hours of wasted admin a week, or a handful of quotes that never get chased, matter more than they look. Before you spend money on AI, you should be able to say what it needs to save for it to be worth it.</p>

<p>This is a method you can rerun with your own numbers. The figures below are illustrative arithmetic, not guarantees, and we show every assumption so you can change it.</p>

<h2>Where the money actually leaks</h2>
<p>When we map a construction business, the leaks are rarely exotic. They are almost always the same few places:</p>
<ul>
  <li><strong>Admin time:</strong> hours a week spent quoting, re-keying information between tools, chasing updates and building reports.</li>
  <li><strong>Quotes that are never chased:</strong> work lost because nobody followed up.</li>
  <li><strong>Variations that are not approved first:</strong> extra work done and then absorbed.</li>
  <li><strong>Messy handovers:</strong> a job starts without everything that was promised, and rework follows.</li>
  <li><strong>Owner time:</strong> decisions that only the owner can make, which caps how much work the business can take on.</li>
</ul>

<h2>Worked example 1: admin time</h2>
<p>The formula is simple: <strong>weekly hours on quoting and admin × 52 × hourly cost = what the time costs you each year.</strong></p>
<table>
  <thead><tr><th>Input</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td>Hours a week on quoting and admin, across the team</td><td>30</td></tr>
    <tr><td>Average hourly cost of the people doing it</td><td>$70</td></tr>
    <tr><td>Yearly cost of that time (30 × 52 × $70)</td><td>$109,200</td></tr>
    <tr><td>Share you might realistically remove with better systems and automation (a planning assumption)</td><td>60%</td></tr>
    <tr><td>Time cost recovered per year</td><td>about $65,500</td></tr>
  </tbody>
</table>
<p>The 60% is an assumption we use for planning, not a promise. It will be lower in some businesses and higher in others, which is why you test it. You can run your own version in two minutes with the <a href="/roi-calculator">admin cost calculator</a>.</p>
<p>Note that this is recovered time, not necessarily cash. It becomes money when that time goes into winning more work, taking on more jobs, or not hiring the next office person.</p>

<h2>Worked example 2: quotes that are not chased</h2>
<p>This one often matters more than admin time, because it is about revenue.</p>
<table>
  <thead><tr><th>Input</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td>Quotes sent per month</td><td>20</td></tr>
    <tr><td>Current win rate</td><td>25%</td></tr>
    <tr><td>Average margin per job won</td><td>$15,000</td></tr>
    <tr><td>Win rate if every quote is followed up properly (a 2 point improvement)</td><td>27%</td></tr>
    <tr><td>Extra jobs per month (20 × 2%)</td><td>0.4</td></tr>
    <tr><td>Extra margin per year (0.4 × 12 × $15,000)</td><td>$72,000</td></tr>
  </tbody>
</table>
<p>A two point improvement is a modest assumption, and many businesses we speak to do not follow up on every quote at all. Replace the numbers with your own: quotes per month, win rate and margin per job.</p>

<h2>What it costs</h2>
<p>Costs vary with what you build, so we will not quote a single number here. The useful step is to find out before you commit. A <a href="/clarity-blueprint">Clarity Blueprint</a> starts at $990 + GST and identifies the first workflow worth fixing. If you then choose us to implement it within 30 days, the Blueprint fee is credited. You can also test a single workflow with a <a href="/pilot-program">28-day pilot</a> before expanding.</p>
<p>A simple payback test: <strong>cost of the project ÷ monthly benefit = months to pay back.</strong> If the benefit is uncertain, use the cautious end of your range.</p>

<h2>How to test it before you commit</h2>
<ol>
  <li><strong>Measure the baseline.</strong> For a month, record the numbers you want to move: hours on admin, quotes sent, quotes followed up, win rate.</li>
  <li><strong>Pick one workflow.</strong> Not five. The one with the clearest leak, usually enquiry follow-up, quote follow-up or variations.</li>
  <li><strong>Agree what success looks like</strong> in numbers, before you start.</li>
  <li><strong>Run it for a short, fixed period</strong> and compare to the baseline.</li>
  <li><strong>Decide with evidence:</strong> expand, adjust or stop.</li>
</ol>

<h2>What can go wrong, and how to manage it</h2>
<ul>
  <li><strong>Errors:</strong> AI makes mistakes. The answer is design, not hope: AI drafts and flags, and a person approves anything that affects price, scope, safety or people.</li>
  <li><strong>Data privacy:</strong> check where a tool stores information, whether it is used to train the vendor's models, and keep client personal details out of free public tools. See <a href="/blog/australian-ai-policy-2025">Australia's AI rules for construction businesses</a>.</li>
  <li><strong>Bad foundations:</strong> AI is only as good as the information it can see. If jobs live across spreadsheets, group chats and memory, fix the source of truth first. We cover this in <a href="/blog/construction-software-source-of-truth">Four tools, zero answers</a>.</li>
  <li><strong>Nobody uses it:</strong> the best system fails if the team will not touch it. Build for the least technical person in the office and train them.</li>
</ul>

<h2>Is this only for big companies?</h2>
<p>No. The businesses that feel this most are often in the 10 to 50 person range, because they have the same administrative load as a larger firm without a dedicated back office. If you are the person every decision routes through, the case is stronger, not weaker.</p>

<h2>The short version</h2>
<p>Work out what your admin time costs, what your unchased quotes cost, and what your own time is worth. If the combined number is bigger than the cost of fixing the first workflow, the business case exists. If it is not, you have saved yourself an expensive mistake. Either way, the first step is the same: find out exactly where your business is leaking. That is what the <a href="/clarity-blueprint">Clarity Blueprint</a> is for.</p>
`,
  faqs: [
    {
      q: 'How do I calculate the ROI of AI in a construction business?',
      a: 'Add up the yearly cost of the time your team spends on quoting and admin (weekly hours × 52 × hourly cost), estimate the share you could realistically remove, then add the margin from quotes you would win with proper follow-up. Compare the total to the cost of implementing the first workflow. Run the numbers on the low end of your estimates.',
    },
    {
      q: 'Is AI worth it for a small or mid-sized builder?',
      a: 'Often most of all. Businesses with 10 to 50 staff carry the same admin load as larger firms without a dedicated back office, so recovered time and better quote follow-up can matter a lot. The way to find out is to measure a baseline and test one workflow before committing.',
    },
    {
      q: 'How accurate is AI, and what about mistakes?',
      a: 'AI makes mistakes, so the safe design is that AI drafts and flags while a person approves anything affecting price, scope, safety or people. Test any tool on real examples first and spot-check it regularly.',
    },
    {
      q: 'How long does it take to see a return?',
      a: 'It depends on the workflow and your starting point. A single enquiry or quote follow-up workflow can be live within weeks, and a 28-day pilot is designed to give you measured results against an agreed baseline before you decide whether to expand.',
    },
  ],
};
