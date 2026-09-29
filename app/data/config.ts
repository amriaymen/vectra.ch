// Locale-independent facts, numbers and structure. Prose lives in
// content.en.ts / content.fr.ts so translations can't drift from the numbers.

export const SITE_URL = 'https://www.vectrastudio.ch';

export const LOCALES = ['fr', 'de', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

/**
 * French is the default: Romandie (Geneva, Lausanne, Valais) is where the
 * school, commune and sports-club buyers are, and French-first reads as local
 * rather than as an exporter. The established Swiss competitor does the same.
 */
export const DEFAULT_LOCALE: Locale = 'fr';

/** BCP-47 tags for <html lang>, hreflang and OpenGraph. */
export const LOCALE_TAGS: Record<Locale, { html: string; hreflang: string; og: string; label: string }> = {
  fr: { html: 'fr-CH', hreflang: 'fr-CH', og: 'fr_CH', label: 'Français' },
  de: { html: 'de-CH', hreflang: 'de-CH', og: 'de_CH', label: 'Deutsch' },
  en: { html: 'en', hreflang: 'en', og: 'en_CH', label: 'English' },
};

/** hreflang set for a path, shared by every route's generateMetadata and the sitemap. */
export function languageAlternates(path = '') {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[LOCALE_TAGS[locale].hreflang] = `${SITE_URL}/${locale}${path}`;
  }
  languages['x-default'] = `${SITE_URL}/${DEFAULT_LOCALE}${path}`;
  return languages;
}

/**
 * Swiss thousands separator is an apostrophe: CHF 18'000.
 * Standard across all Swiss language regions — not a space, not a comma.
 */
export function formatCHF(amount: number): string {
  return `CHF ${amount.toLocaleString('de-CH').replace(/[’  ,.]/g, "'")}`;
}

/**
 * Company identity. Empty strings are treated as "omit" by every consumer, so
 * nothing false is published while they're blank.
 *
 * The registered entity is verified against the Fribourg commercial-register
 * extract. The Impressum and privacy page draw their contact details from this
 * object, so the published details remain consistent.
 */
export const COMPANY = {
  name: 'Vectra',
  legalName: 'TIMGroupe Sàrl',
  groupName: 'TIMGroupe',
  uid: 'CHE-421.583.207',
  email: 'hello@vectrastudio.ch',
  phoneSwiss: '+41 76 456 81 17',
  phoneBureau: '+41 78 257 73 39',
  streetAddress: 'c/o Zouheir Lommini, Chemin des Ebastements 29',
  postalCode: '1618',
  addressLocality: 'Châtel-Saint-Denis',
  addressRegion: 'Fribourg',
  registeredSeat: 'Bulle',
  addressCountry: 'CH',
  social: [],
} as const;

/**
 * Gates every claim of SWISS ORIGIN. Do not bypass it.
 *
 * Under the Swissness legislation a *service* may be marketed as Swiss only if
 * the company's registered office is in Switzerland and it is actually run from
 * there; misleading use of "Swiss" or the Swiss cross is prohibited by law, not
 * merely discouraged. Copy drifts, a derived flag does not — so the origin claim
 * is computed from whether a real registered office exists.
 *
 * While false, the site says it *serves* Swiss institutions (true, and legal).
 * Fill COMPANY.legalName + streetAddress + addressLocality and every origin
 * claim, the footer address and the JSON-LD `address` switch on together.
 */
export const SWISS_ENTITY = Boolean(
  COMPANY.legalName && COMPANY.streetAddress && COMPANY.addressLocality,
);

/**
 * Two DIFFERENT facts that must never be conflated. Systems we build and run for
 * clients sit on Swiss infrastructure; this marketing site does not. Saying both
 * out loud is the honest position — and the Impressum previously claimed
 * "l'intégralité du site et des données clients" was hosted exclusively in
 * Switzerland, which the scope form's own API calls contradict (see SUBPROCESSORS).
 *
 * A named provider is verifiable; "Swiss servers" is not, and the cantonal data
 * protection officer reading this knows the difference.
 */
export const HOSTING = {
  /** Client systems. A contractual promise their DPO may ask us to evidence. */
  client: {
    provider: 'Infomaniak Network SA',
    location: 'Genève',
    country: 'Switzerland',
  },
  /** This marketing site. Deliberately stated separately. */
  site: {
    provider: 'Vercel',
    country: 'US',
  },
} as const;

/**
 * Every third party that receives personal data entered on this site. Adding a
 * call to a new service without adding it here is a compliance defect, not a
 * style one — nLPD Art. 19 requires the disclosure, and the privacy page renders
 * this array rather than restating it, so the two cannot drift apart.
 *
 * Basis verified against each provider's own published terms (Aug 2026):
 * Anthropic's privacy policy §5 relies on standard contractual clauses for
 * transfers to countries without an adequacy decision; Resend's DPA §6.5 routes
 * Swiss transfers through the EU SCCs read against the FADP. Neither is an
 * adequacy decision — do not describe it as one.
 */
export const SUBPROCESSORS = [
  { id: 'anthropic', name: 'Anthropic PBC', country: 'US' },
  { id: 'resend', name: 'Resend', country: 'US' },
] as const;

export const CALENDLY_URL = 'https://calendly.com/vectra/30min';

/** Demo booking for the products that are actually sellable. */
export const DEMO_URL = CALENDLY_URL;

export const SERVICE_AREAS = ['Geneva', 'Lausanne', 'Zurich', 'Basel', 'Bern', 'Zug'];

/* ── Pricing ────────────────────────────────────────────────────────────── */

/**
 * The ONLY price bands the scope synthesizer may return. Exposed to Claude as a
 * JSON-schema enum and re-validated server-side, so the model cannot invent a
 * number you would not honour.
 *
 * ACTION REQUIRED — replace with bands you are willing to stand behind. Market
 * anchor: the Swiss competitor publishes a CHF 1'400/day rate and quotes
 * websites at "CHF 5'000–100'000+".
 */
export const PRICE_BANDS = [
  "CHF 8'000 – 15'000",
  "CHF 15'000 – 30'000",
  "CHF 30'000 – 60'000",
  "CHF 60'000 – 120'000",
  "Above CHF 120'000",
] as const;

/**
 * Subscription tiers — the "unlimited agency" model. Published, predictable
 * pricing is the whole appeal here and our clearest differentiator against a
 * competitor who hides rates behind "contact us".
 *
 * `yearly` is ten months of the monthly rate: an annual commitment gets two
 * months free. Keep that ratio when rates change — the copy states it.
 * A null still renders "On request", so a tier can be withdrawn honestly.
 */
export const SUBSCRIPTION_TIERS: {
  id: string;
  monthly: number | null;
  yearly: number | null;
  featured: boolean;
}[] = [
  { id: 'design', monthly: 1500, yearly: 15000, featured: false },
  { id: 'build', monthly: 1800, yearly: 18000, featured: true },
  { id: 'scale', monthly: 2400, yearly: 24000, featured: false },
];

/**
 * Starting price of an on-demand development project, in CHF. Lives here, not
 * in the dictionaries, so the three locales cannot state different numbers.
 */
export const PROJECT_FROM = 10000;

/* ── Departments ────────────────────────────────────────────────────────── */

/**
 * The site's whole information architecture: three departments, one page each.
 * The key is also the URL segment and is identical in every locale, so the
 * locale switcher can swap the leading segment and always land on a real page.
 */
export const DEPARTMENTS = ['saas', 'development', 'design'] as const;
export type DepartmentKey = (typeof DEPARTMENTS)[number];

export const departmentPath = (locale: Locale, department: DepartmentKey) =>
  `/${locale}/${department}`;

/* ── Products ───────────────────────────────────────────────────────────── */

export type Domain = 'education' | 'sports' | 'hr';

/**
 * Vectra's OWN SaaS products, licensed to institutions — not bespoke client
 * builds. That distinction drives the copy: a product needs features, a price
 * and a demo, not a client problem/solution narrative.
 *
 * `status` is the honesty control:
 *   'available' — sellable today, gets a "Book a demo" call to action.
 *   'running'   — real and in production, but not yet packaged for licensing.
 *                 No demo CTA, no purchase language. Never promise a buying
 *                 path that does not exist.
 *
 * `image: null` renders the card WITHOUT an image. Deliberate: an earlier build
 * captioned a school-management screenshot as a "warehouse ERP". A missing image
 * beats a contradicting one.
 *
 * `video` is a muted, looping screen capture that replaces the still where one
 * exists. It still needs `image` set as its poster: the poster is what the
 * crawler gets, and what a visitor sees before the loop decodes.
 *
 * A capture is a PUBLICATION of whatever is on screen. Record against a demo
 * tenant — never a live client one. Real end-user names or amounts in a frame
 * are a client-confidentiality breach and an nLPD Art. 6 problem, and neither
 * is undone by taking the file down later.
 */
export const PRODUCTS: {
  slug: string;
  name: string;
  domain: Domain;
  status: 'available' | 'running';
  image: string | null;
  video: string | null;
  tech: string[];
}[] = [
  {
    slug: 'spotbase',
    name: 'Spotbase',
    domain: 'sports',
    status: 'available',
    // Sanitized demonstration capture; the original live-tenant assets remain unused.
    image: '/assets/spotbase-demo.png',
    video: null,
    tech: ['Next.js', 'Supabase', 'Stripe'],
  },
  {
    slug: 'schoolze',
    name: 'Schoolze',
    domain: 'education',
    status: 'running',
    image: '/assets/6.webp', // confirmed: this screenshot is Schoolze
    video: null,
    tech: ['Next.js', 'Node', 'PostgreSQL'],
  },
  {
    slug: 'sb-pointage',
    name: 'SB Pointage',
    domain: 'hr',
    status: 'running',
    image: null, // ACTION REQUIRED: screenshot needed (mask employee/salary data)
    video: null,
    tech: ['Next.js', 'Node', 'PostgreSQL'],
  },
  {
    slug: 'raqim',
    name: 'Raqim',
    domain: 'education',
    status: 'running',
    // Recorded against a test tenant, so no pupil data is exposed. The flip side
    // is that the figures on screen read 1 class / 1 pupil.
    image: '/assets/raqim-poster.webp',
    video: '/assets/raqim.mp4',
    tech: ['Next.js', 'Node', 'PostgreSQL'],
  },
];
