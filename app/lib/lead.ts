/**
 * Lead delivery, shared by /api/lead and /api/scope.
 *
 * Every lead is logged before any delivery attempt, so a delivery outage can
 * never lose one. Delivery failure is reported to the caller rather than
 * swallowed — an earlier version of this flow told users "we'll be in touch"
 * while sending nothing anywhere.
 *
 * Required environment variables:
 *   RESEND_API_KEY   API key from resend.com
 *   LEAD_TO_EMAIL    inbox that receives requests
 *   LEAD_FROM_EMAIL  verified sender on your domain, e.g. scope@sketchngo.ch
 */

export interface Lead {
  name: string;
  email: string;
  company?: string;
  notes?: string;
  /** Freeform label → value lines appended to the email body. */
  details?: Record<string, string>;
}

export type DeliveryResult =
  | { ok: true }
  | { ok: false; reason: 'unconfigured' | 'failed' };

export function formatLead(lead: Lead, extra?: string) {
  const lines = [
    `Name:     ${lead.name}`,
    `Email:    ${lead.email}`,
    `Company:  ${lead.company || '—'}`,
    ...Object.entries(lead.details ?? {}).map(([k, v]) => `${k}: ${v}`),
    '',
    lead.notes || '(no notes)',
  ];
  if (extra) lines.push('', '— — —', '', extra);
  return lines.join('\n');
}

export async function deliverLead(
  lead: Lead,
  { subject, extra }: { subject: string; extra?: string },
): Promise<DeliveryResult> {
  const body = formatLead(lead, extra);

  // Logged before delivery is attempted — never lose the lead.
  console.info(`[lead] ${subject}\n${body}`);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error(
      '[lead] delivery not configured — set RESEND_API_KEY, LEAD_TO_EMAIL and LEAD_FROM_EMAIL. Lead is in the log above only.',
    );
    return { ok: false, reason: 'unconfigured' };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: lead.email,
        subject,
        text: body,
      }),
    });
    if (!response.ok) {
      throw new Error(`Resend responded ${response.status}: ${await response.text()}`);
    }
  } catch (err) {
    console.error('[lead] delivery failed:', err);
    return { ok: false, reason: 'failed' };
  }

  return { ok: true };
}

/** Shared validation for both intake routes. */
export function validateLead(payload: Record<string, unknown>) {
  const name = String(payload.name ?? '').trim();
  const email = String(payload.email ?? '').trim();

  if (!name || !email) return { error: 'Name and email are required.' as const };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return { error: 'That email address looks invalid.' as const };
  }

  return {
    lead: {
      name,
      email,
      company: String(payload.company ?? '').trim(),
      notes: String(payload.notes ?? '').trim().slice(0, 4000),
    },
  };
}
