import { NextResponse } from 'next/server';
import { deliverLead, validateLead } from '../../lib/lead';
import { clientIp, rateLimited } from '../../lib/rate-limit';

/** Plain lead intake. The AI-drafted path is /api/scope. */
export async function POST(request: Request) {
  const ip = clientIp(request);
  if (rateLimited(`lead:${ip}`, 5)) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // Honeypot: hidden field, so only a bot fills it. Accept and discard.
  if (String(payload.botField ?? '').trim()) {
    return NextResponse.json({ ok: true });
  }

  const validated = validateLead(payload);
  if ('error' in validated) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const details: Record<string, string> = {};
  if (Array.isArray(payload.needs)) details.Needs = payload.needs.map(String).join(', ');
  if (payload.timeline) details.Timeline = String(payload.timeline);

  const delivery = await deliverLead(
    { ...validated.lead, details },
    { subject: `Enquiry — ${validated.lead.company || validated.lead.name}` },
  );

  if (!delivery.ok) {
    return NextResponse.json(
      {
        error:
          delivery.reason === 'unconfigured'
            ? 'Our form is not accepting submissions right now.'
            : 'We could not send your request.',
      },
      { status: delivery.reason === 'unconfigured' ? 500 : 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
