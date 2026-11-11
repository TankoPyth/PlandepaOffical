// Sends a website enquiry to /.netlify/functions/lead, which saves it in the Notion CRM.
// Returns ok only when the enquiry was really saved, so the form can show a fallback.

export const LEAD_ENDPOINT = '/.netlify/functions/lead';

export interface WebsiteLead {
  full_name: string;
  email: string;
  company_name: string;
  phone_number: string;
  message: string;
  /** Which form it came from, kept on the CRM record (for example contact, sticky_button). */
  source_page: string;
  /** Hidden field. People leave it empty; bots fill it in. */
  website?: string;
}

export type LeadResult = { ok: true } | { ok: false; error: string };

export async function sendWebsiteLead(lead: WebsiteLead, endpoint = LEAD_ENDPOINT): Promise<LeadResult> {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    });
    const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    if (res.ok && body.ok) return { ok: true };
    return { ok: false, error: 'not_saved' };
  } catch {
    return { ok: false, error: 'not_saved' };
  }
}
