// Netlify function at /.netlify/functions/lead.
// Saves a website enquiry to the PlanDepa Notion CRM (Client Relation Manager)
// and emails NOTIFY_TO (default mitch@plandepa.com).
//
// Set these in Netlify > Site configuration > Environment variables (secrets, never in git):
//   NOTION_TOKEN
//   NOTION_LEADS_DATABASE_ID  (optional; defaults to the Client Relation Manager)
//   RESEND_API_KEY
//   REPORT_FROM
//   NOTIFY_TO
//
// Returns 200 only if Notion or email succeeded. Otherwise 502, so the form can show a fallback.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BODY = 20_000;
/** Client Relation Manager in the PlanDepa Notion workspace. An ID, not a secret. */
export const DEFAULT_LEADS_DATABASE_ID = '249a7565993d80159485d17417432682';
export const DEFAULT_NOTIFY_TO = 'mitch@plandepa.com';

export interface LeadEnv {
  NOTION_TOKEN?: string;
  NOTION_LEADS_DATABASE_ID?: string;
  RESEND_API_KEY?: string;
  REPORT_FROM?: string;
  NOTIFY_TO?: string;
}

export interface CleanLead {
  full_name: string;
  email: string;
  company_name: string;
  phone_number: string;
  message: string;
  source_page: string;
  submitted_at: string;
}

export type SavedVia = 'notion' | 'email' | 'both';
type Result = { status: number; body: { ok: boolean; saved?: SavedVia; error?: string } };

export type NotionCreate = (databaseId: string, properties: Record<string, unknown>) => Promise<void>;
export type EmailSend = (msg: { from: string; to: string[]; reply_to?: string; subject: string; text: string }) => Promise<void>;

const str = (x: unknown, max: number) => (typeof x === 'string' ? x.trim().slice(0, max) : '');

/** Australian numbers become +61. Other values are left as a cleaned string, or empty. */
export function tidyPhone(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return '';
  const hasPlus = trimmed.startsWith('+');
  const digits = trimmed.replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('61') && digits.length >= 10 && digits.length <= 12) return `+${digits}`;
  if (digits.startsWith('0') && digits.length >= 9 && digits.length <= 11) return `+61${digits.slice(1)}`;
  if (digits.length === 9 && digits.startsWith('4')) return `+61${digits}`;
  if (hasPlus) return `+${digits}`;
  return digits;
}

/** Source options that already exist on the live CRM. Unknown pages count as Contact Us. */
export function sourceFor(page: string): string {
  if (page === 'clarity_check') return 'Clarity Check';
  return 'Contact Us';
}

const channelFor = (page: string) =>
  page === 'buildxact_ad' || page.startsWith('lp_') ? 'Inbound Ads' : 'Inbound Web';

/** Notion text fields take at most 2000 characters per piece. */
const text = (s: string) => ({
  rich_text: (s.match(/[\s\S]{1,2000}/g) ?? []).slice(0, 10).map((content) => ({ type: 'text', text: { content } })),
});

/** The CRM's own column names (note "Phone Number " has a trailing space in Notion). */
export function toNotionProperties(l: CleanLead): Record<string, unknown> {
  const note = [
    l.message,
    '',
    `From the website (${l.source_page}), ${new Date(l.submitted_at).toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}`,
  ].join('\n');
  return {
    'Company Name': { title: [{ type: 'text', text: { content: (l.company_name || l.full_name).slice(0, 2000) } }] },
    Contact: text(l.full_name),
    'Contact Email': { email: l.email },
    'Phone Number ': text(l.phone_number),
    'Conversation Note': text(note),
    Source: { select: { name: sourceFor(l.source_page) } },
    Channel: { select: { name: channelFor(l.source_page) } },
    'Event / Campaign': text(l.source_page),
    Status: { status: { name: 'New Lead' } },
  };
}

/** Check and tidy what the browser sent. Returns an error message, the clean lead, or 'bot'. */
export function cleanLead(raw: unknown, now = new Date()): CleanLead | string | 'bot' {
  const b = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  if (str(b.website, 200)) return 'bot';
  const lead: CleanLead = {
    full_name: str(b.full_name, 80),
    email: str(b.email, 120).toLowerCase(),
    company_name: str(b.company_name, 120),
    phone_number: tidyPhone(str(b.phone_number, 40)),
    message: str(b.message, 5000),
    source_page: str(b.source_page, 40).replace(/[^a-z0-9_]/gi, '') || 'contact',
    submitted_at: now.toISOString(),
  };
  if (!lead.full_name) return 'Please add your name.';
  if (!EMAIL.test(lead.email)) return 'Please add a valid email.';
  if (!lead.message) return 'Please add a message.';
  return lead;
}

function enquiryEmail(lead: CleanLead, notionOk: boolean, from: string, to: string) {
  const source = sourceFor(lead.source_page);
  const heading = notionOk
    ? 'This enquiry was also saved in the Notion CRM (Client Relation Manager).'
    : 'This enquiry could not be saved in Notion, so it has been emailed instead. Please add it to the CRM by hand.';
  return {
    from,
    to: [to],
    reply_to: lead.email,
    subject: `Website enquiry (${source}): ${lead.full_name}${lead.company_name ? `, ${lead.company_name}` : ''}`,
    text: [
      heading,
      '',
      `Name: ${lead.full_name}`,
      `Email: ${lead.email}`,
      `Company: ${lead.company_name || '(not given)'}`,
      `Phone: ${lead.phone_number || '(not given)'}`,
      `Form: ${lead.source_page}`,
      `Sent: ${lead.submitted_at}`,
      '',
      lead.message,
    ].join('\n'),
  };
}

export async function handleLead(
  body: unknown,
  env: LeadEnv,
  notion: NotionCreate | null,
  email: EmailSend | null,
): Promise<Result> {
  const lead = cleanLead(body);
  // Bots fill the hidden field: tell them it worked, save nothing
  if (lead === 'bot') return { status: 200, body: { ok: true } };
  if (typeof lead === 'string') return { status: 400, body: { ok: false, error: lead } };

  let notionOk = false;
  if (notion) {
    try {
      await notion(env.NOTION_LEADS_DATABASE_ID || DEFAULT_LEADS_DATABASE_ID, toNotionProperties(lead));
      notionOk = true;
    } catch (e) {
      console.error('Lead not saved to Notion', e);
    }
  }

  let emailOk = false;
  if (email) {
    const from = (env.REPORT_FROM || '').trim();
    const to = (env.NOTIFY_TO || '').trim() || DEFAULT_NOTIFY_TO;
    if (from) {
      try {
        await email(enquiryEmail(lead, notionOk, from, to));
        emailOk = true;
      } catch (e) {
        console.error('Lead notify email failed', e);
      }
    } else {
      console.error('Lead email skipped: REPORT_FROM is not set');
    }
  }

  if (notionOk && emailOk) return { status: 200, body: { ok: true, saved: 'both' } };
  if (notionOk) return { status: 200, body: { ok: true, saved: 'notion' } };
  if (emailOk) return { status: 200, body: { ok: true, saved: 'email' } };
  return { status: 502, body: { ok: false, error: 'not_saved' } };
}

export function notionCreator(token: string, fetchImpl: typeof fetch = fetch): NotionCreate {
  return async (databaseId, properties) => {
    const res = await fetchImpl('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Notion-Version': '2022-06-28', 'Content-Type': 'application/json' },
      body: JSON.stringify({ parent: { database_id: databaseId }, properties }),
    });
    if (!res.ok) throw new Error(`Notion ${res.status}: ${(await res.text()).slice(0, 300)}`);
  };
}

export function resendEmail(apiKey: string, fetchImpl: typeof fetch = fetch): EmailSend {
  return async (msg) => {
    const res = await fetchImpl('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(msg),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}`);
  };
}

function jsonResult(r: Result) {
  return {
    statusCode: r.status,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(r.body),
  };
}

/** Shared by the classic Netlify handler and tests. */
export async function handleHttp(
  method: string,
  raw: string,
  env: LeadEnv,
  fetchImpl: typeof fetch = fetch,
): Promise<{ statusCode: number; headers: Record<string, string>; body: string }> {
  if (method !== 'POST') return jsonResult({ status: 405, body: { ok: false, error: 'POST only' } });
  if (raw.length > MAX_BODY) return jsonResult({ status: 413, body: { ok: false, error: 'Too long.' } });
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return jsonResult({ status: 400, body: { ok: false, error: 'Bad request.' } });
  }
  const notion = env.NOTION_TOKEN ? notionCreator(env.NOTION_TOKEN, fetchImpl) : null;
  const email = env.RESEND_API_KEY ? resendEmail(env.RESEND_API_KEY, fetchImpl) : null;
  return jsonResult(await handleLead(body, env, notion, email));
}

/** Classic Netlify Functions handler (compatible with the existing site). */
export async function handler(event: {
  httpMethod?: string;
  body?: string | null;
  isBase64Encoded?: boolean;
}) {
  const method = event.httpMethod || 'GET';
  const raw = event.isBase64Encoded && event.body
    ? Buffer.from(event.body, 'base64').toString('utf8')
    : event.body || '';
  return handleHttp(method, raw, process.env as LeadEnv);
}
