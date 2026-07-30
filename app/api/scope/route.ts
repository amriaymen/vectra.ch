import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';
import { PRICE_BANDS } from '../../data/config';
import { deliverLead, validateLead } from '../../lib/lead';
import { clientIp, rateLimited } from '../../lib/rate-limit';

/**
 * Drafts a project scope from the intake answers.
 *
 * Two invariants:
 *  1. Claude writes the scope; OUR rules set the price. `priceBand` is a
 *     JSON-schema enum of PRICE_BANDS and is re-validated after parsing, so the
 *     model cannot invent a figure we would not honour.
 *  2. The lead survives an AI failure. Any Claude error still delivers the raw
 *     answers and returns `degraded: true` — never lose a lead because a
 *     generation call failed.
 */

export const maxDuration = 60;

const SCOPE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: [
    'summary',
    'phases',
    'deliverables',
    'weekEstimate',
    'priceBand',
    'assumptions',
    'risks',
    'outOfScope',
  ],
  properties: {
    summary: { type: 'string', description: 'Two sentences describing what will be built.' },
    phases: {
      type: 'array',
      description: 'Three to five delivery phases in order.',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['name', 'weeks', 'detail'],
        properties: {
          name: { type: 'string' },
          weeks: { type: 'string', description: 'Duration, e.g. "2" or "2–3".' },
          detail: { type: 'string', description: 'One sentence on what happens in this phase.' },
        },
      },
    },
    deliverables: { type: 'array', items: { type: 'string' } },
    weekEstimate: { type: 'string', description: 'Total range, e.g. "8–10".' },
    priceBand: {
      type: 'string',
      enum: [...PRICE_BANDS],
      description: 'Pick the band matching the scope. You may only use these exact values.',
    },
    assumptions: { type: 'array', items: { type: 'string' } },
    risks: { type: 'array', items: { type: 'string' } },
    outOfScope: { type: 'array', items: { type: 'string' } },
  },
} as const;

function systemPrompt(locale: string) {
  const language = locale === 'fr' ? 'Swiss French (fr-CH)' : 'English';
  return `You are a senior solutions architect at Vectra, a Swiss studio that builds operational
management systems for institutions and also handles their brand and communication.

What Vectra has actually built (use these as reference for realistic scoping):
- Schoolze — school management portal: enrolment, attendance, grading, parent portal, invoicing.
- Raqim — large-scale multi-site school management: academic records, staff, scheduling, reporting.
- SB Pointage — HR: check-in/checkout, leave management, salary calculation, payroll reporting.
- Spotbase — sports facility management: resource calendars, online booking, memberships, payments.

Your job: turn a prospect's intake answers into a realistic draft project scope.

Rules:
- Write in ${language}. Every string you output must be in that language.
- Be concrete and specific. Name modules, phases and deliverables. No superlatives, no marketing
  adjectives ("seamless", "cutting-edge", "world-class"). Swiss B2B register: precise and understated.
- Base the timeline on Vectra's real pace: a first module or MVP is 3–5 weeks; a full management
  platform is 6–10 weeks; add time for data migration and third-party integrations.
- Phase 1 is always scope and architecture. The final phase is always handover and training.
- "assumptions" must state what you assumed because the intake did not say (e.g. no custom mobile app,
  data supplied in a machine-readable export).
- "risks" must name concrete things that would change the estimate — legacy data quality, an
  unspecified integration, a hard regulatory deadline.
- "outOfScope" must list plausible things a client might expect but that this scope excludes.
- For priceBand, choose the band that matches the total effort you just described. Use only the exact
  enum values provided. Do not mention any other figure anywhere in your output.
- Never promise a specific delivery date, and never state the price as final — it is indicative.`;
}

function intakeSummary(payload: Record<string, unknown>) {
  const arr = (v: unknown) => (Array.isArray(v) ? v.map(String).join(', ') : '');
  return [
    `Domain: ${String(payload.domain ?? '—')}`,
    `Modules requested: ${arr(payload.modules) || '—'}`,
    `Approximate users: ${String(payload.users ?? '—')}`,
    `Sites or locations: ${String(payload.sites ?? '—')}`,
    `Must integrate with: ${String(payload.existing ?? '—')}`,
    `Timeline preference: ${String(payload.timeline ?? '—')}`,
    `Budget indication: ${String(payload.budget ?? '—')}`,
    `Organisation: ${String(payload.company ?? '—')}`,
    '',
    'In their own words:',
    String(payload.notes ?? '(nothing added)'),
  ].join('\n');
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (rateLimited(`scope:${ip}`, 3)) {
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
  const { lead } = validated;

  const locale = payload.locale === 'fr' ? 'fr' : 'en';
  const intake = intakeSummary(payload);
  const details = {
    Domain: String(payload.domain ?? '—'),
    Modules: Array.isArray(payload.modules) ? payload.modules.map(String).join(', ') : '—',
    Users: String(payload.users ?? '—'),
    Sites: String(payload.sites ?? '—'),
    Integrations: String(payload.existing ?? '—'),
    Timeline: String(payload.timeline ?? '—'),
    Budget: String(payload.budget ?? '—'),
  };

  /** Deliver the raw intake and tell the client the draft is unavailable. */
  async function degrade(reason: string) {
    console.error(`[scope] falling back to plain lead delivery: ${reason}`);
    const delivery = await deliverLead(
      { ...lead, details },
      { subject: `Scope request (no AI draft) — ${lead.company || lead.name}` },
    );
    if (!delivery.ok) {
      return NextResponse.json(
        { error: 'We could not send your request.' },
        { status: delivery.reason === 'unconfigured' ? 500 : 502 },
      );
    }
    return NextResponse.json({ ok: true, degraded: true });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return degrade('ANTHROPIC_API_KEY is not set');
  }

  const client = new Anthropic();
  let draft: Record<string, unknown>;

  try {
    const response = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 16000,
      thinking: { type: 'adaptive' },
      system: systemPrompt(locale),
      output_config: { format: { type: 'json_schema', schema: SCOPE_SCHEMA } },
      messages: [{ role: 'user', content: intake }],
    });

    // Check stop_reason before touching content — a refusal has no usable text.
    if (response.stop_reason === 'refusal') {
      return degrade('model returned stop_reason: refusal');
    }

    const text = response.content.find((block) => block.type === 'text');
    if (!text || text.type !== 'text') {
      return degrade('no text block in response');
    }

    draft = JSON.parse(text.text);
  } catch (err) {
    // Most specific first. In the TS SDK APIConnectionError extends APIError,
    // so it has to be checked before APIError.
    if (err instanceof Anthropic.RateLimitError) return degrade('Anthropic rate limit');
    if (err instanceof Anthropic.APIConnectionError) return degrade(`connection: ${err.message}`);
    if (err instanceof Anthropic.APIError) return degrade(`api ${err.status}: ${err.message}`);
    return degrade(`unexpected: ${err instanceof Error ? err.message : String(err)}`);
  }

  // Re-validate the price band server-side. Structured outputs enforce the enum,
  // but this is the guarantee we actually rely on — never trust it blindly.
  if (!(PRICE_BANDS as readonly string[]).includes(String(draft.priceBand))) {
    return degrade(`price band outside the allowed set: ${String(draft.priceBand)}`);
  }
  if (!Array.isArray(draft.phases) || draft.phases.length === 0) {
    return degrade('draft contained no phases');
  }

  const delivery = await deliverLead(
    { ...lead, details },
    {
      subject: `Scope request — ${lead.company || lead.name}`,
      extra: `DRAFT SCOPE\n\n${JSON.stringify(draft, null, 2)}`,
    },
  );

  // The draft is still worth showing even if the email failed; flag it so the UI
  // does not claim a copy is in their inbox.
  return NextResponse.json({ ok: true, scope: draft, emailed: delivery.ok });
}
