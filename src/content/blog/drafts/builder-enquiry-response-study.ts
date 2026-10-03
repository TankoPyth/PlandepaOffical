/**
 * DRAFT — NOT PUBLISHED. Not imported by src/content/blog/index.ts.
 *
 * Original research post: needs real data before it can go live. Do not fill
 * the [PLACEHOLDER]s with estimates — the value of this post (for Google, local
 * media and AI answer engines) is that the numbers are first-hand and true.
 *
 * HOW TO RUN THE STUDY (≈1 week)
 * 1. Sample: 25 builders in Greater Brisbane + 25 in Newcastle/Hunter, picked from
 *    Google Maps results for "builder <suburb>" across a spread of suburbs. Mix of
 *    residential builders and renovators. Record name, suburb, Google rating count.
 * 2. Send one realistic enquiry to each via their website form (or email if no
 *    form): a mid-size renovation, same wording for all, real contact details,
 *    sent Tue-Thu between 9-11am. Note exact send time.
 * 3. Record: time to first reply (any human or automated response), whether the
 *    first reply was automated, whether it asked a qualifying question, whether
 *    they offered a call/site visit time, and whether there was any follow-up if
 *    we didn't respond. Stop counting at 7 days = "no reply".
 * 4. Politely decline every builder that replies, within 24 hours of their reply.
 *    Never name or shame individual businesses in the post — report aggregates.
 * 5. Fill the placeholders, update published_at, then import this file in
 *    src/content/blog/index.ts to publish.
 */
import { JARROD, type LocalPost } from '../types';

export const builderEnquiryResponseStudy: LocalPost = {
  slug: 'builder-enquiry-response-times-brisbane-newcastle',
  title: 'We Enquired With 50 Builders in Brisbane and Newcastle. Here’s How Fast They Replied.',
  metaDescription:
    'Original research: how quickly Brisbane and Newcastle builders respond to new enquiries, how many follow up, and what it means for winning work.',
  excerpt:
    'We sent the same renovation enquiry to 50 builders across Brisbane and Newcastle and timed every reply. [PLACEHOLDER: one-line headline finding].',
  category: { name: 'Research', slug: 'research' },
  tags: ['builder enquiries', 'construction lead follow-up', 'Brisbane builders', 'Newcastle builders', 'research'],
  author: JARROD,
  published_at: '[PLACEHOLDER: publish date ISO]',
  content: `
<p>Most builders we talk to say the same thing: <em>"We don't need more leads."</em> They're often right. The question is what happens to the leads they already get.</p>

<p>So we tested it. In [PLACEHOLDER: month year], we sent the same realistic renovation enquiry to 50 builders — 25 across Greater Brisbane and 25 across Newcastle and the Hunter — and timed every response.</p>

<h2>The headline numbers</h2>
<ul>
  <li><strong>[PLACEHOLDER]%</strong> replied within one hour.</li>
  <li><strong>[PLACEHOLDER]%</strong> replied within one business day.</li>
  <li><strong>[PLACEHOLDER]%</strong> never replied at all within seven days.</li>
  <li>The median time to first reply was <strong>[PLACEHOLDER]</strong>.</li>
  <li>Only <strong>[PLACEHOLDER]</strong> builders followed up when we didn't respond to their first reply.</li>
</ul>

<h2>Brisbane vs Newcastle</h2>
<table>
  <thead><tr><th></th><th>Brisbane</th><th>Newcastle / Hunter</th></tr></thead>
  <tbody>
    <tr><td>Replied within 1 hour</td><td>[PLACEHOLDER]</td><td>[PLACEHOLDER]</td></tr>
    <tr><td>Replied within 1 business day</td><td>[PLACEHOLDER]</td><td>[PLACEHOLDER]</td></tr>
    <tr><td>No reply in 7 days</td><td>[PLACEHOLDER]</td><td>[PLACEHOLDER]</td></tr>
    <tr><td>Asked a qualifying question</td><td>[PLACEHOLDER]</td><td>[PLACEHOLDER]</td></tr>
    <tr><td>Offered a call or site visit time</td><td>[PLACEHOLDER]</td><td>[PLACEHOLDER]</td></tr>
  </tbody>
</table>

<h2>What the fastest builders did differently</h2>
<p>[PLACEHOLDER: 2-3 short paragraphs on patterns you actually observed — e.g. automated acknowledgement + a human reply, asking budget/timing up front, offering specific call times. Only describe what you saw.]</p>

<h2>How we ran the study</h2>
<p>We selected 50 builders from Google Maps results across a spread of suburbs in each region. Each received the same enquiry for a mid-size renovation via their website form or listed email, sent on a weekday morning between [PLACEHOLDER: dates]. We recorded time to first response, whether it was automated, whether it asked qualifying questions, and whether there was any follow-up. We politely declined every builder who replied. We have not named any business.</p>

<h2>What this means for your business</h2>
<p>If you're getting enquiries but not winning enough of the work, the leak is probably between the first message and the site visit — not in your marketing. That's fixable: one pipeline for every enquiry source, an immediate first response, qualification up front and an automatic follow-up sequence. We cover how that works on our <a href="/enquiry-automation">enquiry capture and follow-up</a> page.</p>
<p>Not sure enquiries are your biggest leak? The <a href="/clarity-blueprint">Clarity Blueprint</a> finds out — from $990 + GST, with the fee credited if we implement the fix.</p>
`,
  faqs: [
    {
      q: 'How quickly do builders in Brisbane and Newcastle reply to enquiries?',
      a: '[PLACEHOLDER: one-sentence answer using the study numbers.]',
    },
    {
      q: 'How fast should a builder respond to a new enquiry?',
      a: 'As fast as practical — ideally the same business day, with an immediate acknowledgement. [PLACEHOLDER: tie to what the study found about the fastest responders.]',
    },
  ],
};
