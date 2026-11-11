import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  DEFAULT_LEADS_DATABASE_ID,
  DEFAULT_NOTIFY_TO,
  cleanLead,
  handleHttp,
  handleLead,
  sourceFor,
  tidyPhone,
  toNotionProperties,
} from '../netlify/functions/lead';
import { sendWebsiteLead } from '../src/lib/leads';

const good = {
  full_name: 'Sam Carter',
  email: 'Sam@Carter-Renovations.example',
  company_name: 'Carter Renovations',
  phone_number: '0411 111 111',
  message: 'Keen to chat about getting our estimating sorted.',
  source_page: 'contact',
};

const envWithFrom = { REPORT_FROM: 'PlanDepa <reports@example.com>' };

function jsonResponse(status: number, body: unknown = { ok: true }) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('tidyPhone', () => {
  it('normalises Australian numbers to +61', () => {
    expect(tidyPhone('0411 111 111')).toBe('+61411111111');
    expect(tidyPhone('+61 411 111 111')).toBe('+61411111111');
    expect(tidyPhone('411111111')).toBe('+61411111111');
    expect(tidyPhone('61411111111')).toBe('+61411111111');
    expect(tidyPhone('')).toBe('');
  });
});

describe('lead function', () => {
  it('saves a good enquiry to the CRM with the right columns and tidied phone', async () => {
    const notion = vi.fn().mockResolvedValue(undefined);
    const email = vi.fn().mockResolvedValue(undefined);
    const r = await handleLead(good, envWithFrom, notion, email);
    expect(r).toEqual({ status: 200, body: { ok: true, saved: 'both' } });
    const [db, props] = notion.mock.calls[0];
    expect(db).toBe(DEFAULT_LEADS_DATABASE_ID);
    expect(props['Company Name'].title[0].text.content).toBe('Carter Renovations');
    expect(props.Contact.rich_text[0].text.content).toBe('Sam Carter');
    expect(props['Contact Email'].email).toBe('sam@carter-renovations.example');
    expect(props['Phone Number '].rich_text[0].text.content).toBe('+61411111111');
    expect(props['Conversation Note'].rich_text[0].text.content).toContain('Keen to chat');
    expect(props.Source.select.name).toBe('Contact Us');
    expect(props.Channel.select.name).toBe('Inbound Web');
    expect(props['Event / Campaign'].rich_text[0].text.content).toBe('contact');
    expect(props.Status.status.name).toBe('New Lead');
  });

  it('emails NOTIFY_TO on every enquiry, including when Notion succeeds', async () => {
    const notion = vi.fn().mockResolvedValue(undefined);
    const email = vi.fn().mockResolvedValue(undefined);
    await handleLead(good, { ...envWithFrom, NOTIFY_TO: 'mitch@plandepa.com' }, notion, email);
    const msg = email.mock.calls[0][0];
    expect(msg.to).toEqual(['mitch@plandepa.com']);
    expect(msg.from).toBe(envWithFrom.REPORT_FROM);
    expect(msg.reply_to).toBe('sam@carter-renovations.example');
    expect(msg.text).toContain('Keen to chat');
    expect(msg.text).toContain('also saved in the Notion CRM');
  });

  it('defaults the notify address to mitch@plandepa.com', async () => {
    const email = vi.fn().mockResolvedValue(undefined);
    await handleLead(good, envWithFrom, null, email);
    expect(email.mock.calls[0][0].to).toEqual([DEFAULT_NOTIFY_TO]);
  });

  it('uses the database from settings when given', async () => {
    const notion = vi.fn().mockResolvedValue(undefined);
    await handleLead(good, { ...envWithFrom, NOTION_LEADS_DATABASE_ID: 'abc' }, notion, null);
    expect(notion.mock.calls[0][0]).toBe('abc');
  });

  it('still emails the full details when Notion fails', async () => {
    const notion = vi.fn().mockRejectedValue(new Error('Notion down'));
    const email = vi.fn().mockResolvedValue(undefined);
    const r = await handleLead(good, envWithFrom, notion, email);
    expect(r.body).toEqual({ ok: true, saved: 'email' });
    const msg = email.mock.calls[0][0];
    expect(msg.text).toContain('could not be saved in Notion');
    expect(msg.text).toContain('Keen to chat');
    expect(msg.text).toContain('+61411111111');
  });

  it('returns 200 if Notion saved and email failed', async () => {
    const r = await handleLead(
      good,
      envWithFrom,
      vi.fn().mockResolvedValue(undefined),
      vi.fn().mockRejectedValue(new Error('Resend down')),
    );
    expect(r).toEqual({ status: 200, body: { ok: true, saved: 'notion' } });
  });

  it('never says ok when it could not save anywhere', async () => {
    const r = await handleLead(good, envWithFrom, vi.fn().mockRejectedValue(new Error('x')), vi.fn().mockRejectedValue(new Error('y')));
    expect(r).toEqual({ status: 502, body: { ok: false, error: 'not_saved' } });
    expect((await handleLead(good, {}, null, null)).status).toBe(502);
  });

  it('quietly drops bots that fill the hidden field', async () => {
    const notion = vi.fn();
    const email = vi.fn();
    const r = await handleLead({ ...good, website: 'spam.example' }, envWithFrom, notion, email);
    expect(r.body.ok).toBe(true);
    expect(notion).not.toHaveBeenCalled();
    expect(email).not.toHaveBeenCalled();
  });

  it('turns away bad input with a message for the person', async () => {
    expect((await handleLead({ ...good, email: 'nope' }, {}, vi.fn(), null)).status).toBe(400);
    expect((await handleLead({ ...good, full_name: ' ' }, {}, vi.fn(), null)).body.error).toBe('Please add your name.');
    expect((await handleLead({ ...good, message: ' ' }, {}, vi.fn(), null)).body.error).toBe('Please add a message.');
    expect((await handleLead(null, {}, vi.fn(), null)).status).toBe(400);
  });

  it('allows company and phone to be omitted', async () => {
    const notion = vi.fn().mockResolvedValue(undefined);
    const l = { ...good, company_name: '', phone_number: '' };
    const r = await handleLead(l, {}, notion, null);
    expect(r.status).toBe(200);
    const props = notion.mock.calls[0][1];
    expect(props['Company Name'].title[0].text.content).toBe('Sam Carter');
    expect(props['Phone Number '].rich_text).toEqual([]);
  });

  it('labels contact and ad forms with options that already exist in the CRM', () => {
    expect(sourceFor('clarity_check')).toBe('Clarity Check');
    expect(sourceFor('sticky_button')).toBe('Contact Us');
    const ad = cleanLead({ ...good, source_page: 'buildxact_ad' });
    expect(typeof ad === 'object' && toNotionProperties(ad).Channel).toEqual({ select: { name: 'Inbound Ads' } });
  });

  it('splits long messages into pieces Notion accepts and strips odd characters from the form name', () => {
    const l = cleanLead({ ...good, message: 'x'.repeat(4500), source_page: 'contact<script>' });
    if (typeof l !== 'object') throw new Error('expected a lead');
    expect(l.source_page).toBe('contactscript');
    const note = (toNotionProperties(l)['Conversation Note'] as { rich_text: { text: { content: string } }[] }).rich_text;
    expect(note.length).toBeGreaterThan(2);
    expect(note.every((p) => p.text.content.length <= 2000)).toBe(true);
  });
});

describe('HTTP handler with mocked fetch', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('POSTs to Notion and Resend and returns 200 when both succeed', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(jsonResponse(200));
    const r = await handleHttp('POST', JSON.stringify(good), {
      NOTION_TOKEN: 'notion-token',
      RESEND_API_KEY: 'resend-key',
      REPORT_FROM: 'PlanDepa <reports@example.com>',
    }, fetchImpl as unknown as typeof fetch);
    expect(r.statusCode).toBe(200);
    expect(JSON.parse(r.body)).toEqual({ ok: true, saved: 'both' });
    const urls = fetchImpl.mock.calls.map((c: unknown[]) => c[0]);
    expect(urls).toContain('https://api.notion.com/v1/pages');
    expect(urls).toContain('https://api.resend.com/emails');
    const notionBody = JSON.parse(fetchImpl.mock.calls[0][1].body);
    expect(notionBody.parent.database_id).toBe(DEFAULT_LEADS_DATABASE_ID);
    expect(notionBody.properties['Phone Number '].rich_text[0].text.content).toBe('+61411111111');
  });

  it('rejects non-POST methods without calling Notion or Resend', async () => {
    const fetchImpl = vi.fn();
    const r = await handleHttp('GET', '', { NOTION_TOKEN: 'x' }, fetchImpl as unknown as typeof fetch);
    expect(r.statusCode).toBe(405);
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('returns 502 when both Notion and Resend fail', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(jsonResponse(500, { error: 'nope' }));
    const r = await handleHttp('POST', JSON.stringify(good), {
      NOTION_TOKEN: 'notion-token',
      RESEND_API_KEY: 'resend-key',
      REPORT_FROM: 'PlanDepa <reports@example.com>',
    }, fetchImpl as unknown as typeof fetch);
    expect(r.statusCode).toBe(502);
    expect(JSON.parse(r.body)).toEqual({ ok: false, error: 'not_saved' });
  });
});

describe('form helper', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const fetchReturning = (status: number, body: unknown) =>
    vi.fn().mockResolvedValue({ ok: status < 300, status, json: () => Promise.resolve(body) });

  it('is ok only when the function says it saved', async () => {
    vi.stubGlobal('fetch', fetchReturning(200, { ok: true, saved: 'both' }));
    expect(await sendWebsiteLead(good)).toEqual({ ok: true });
  });

  it('reports not saved on a server error or no connection, so the form shows the fallback', async () => {
    vi.stubGlobal('fetch', fetchReturning(502, { ok: false, error: 'not_saved' }));
    expect(await sendWebsiteLead(good)).toEqual({ ok: false, error: 'not_saved' });
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('offline')));
    expect(await sendWebsiteLead(good)).toEqual({ ok: false, error: 'not_saved' });
    vi.stubGlobal('fetch', fetchReturning(404, 'not json'));
    expect(await sendWebsiteLead(good)).toEqual({ ok: false, error: 'not_saved' });
  });

  it('does not surface raw server messages to the form', async () => {
    vi.stubGlobal('fetch', fetchReturning(400, { ok: false, error: 'Please add a valid email.' }));
    expect(await sendWebsiteLead(good)).toEqual({ ok: false, error: 'not_saved' });
  });
});
