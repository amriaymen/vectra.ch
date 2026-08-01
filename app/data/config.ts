// Locale-independent facts, numbers and structure. Prose lives in
// content.en.ts / content.fr.ts so translations can't drift from the numbers.

export const SITE_URL = 'https://vectra.ch';

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
 * ACTION REQUIRED — fill once the Swiss presence is real:
 *   streetAddress / postalCode / addressLocality, phoneSwiss (+41…),
 *   and move email to hello@vectra.ch once that mailbox exists.
 */
export const COMPANY = {
  name: 'Vectra',
  legalName: 'Vectra Sàrl',
  email: 'hello@vectra.ch',
  phoneSwiss: '+41 76 456 81 17',
  phoneInternational: '+41 76 456 81 17',
  streetAddress: 'Chemin de la Colline 19',
  postalCode: '1635',
  addressLocality: 'La Tour-de-Trême',
  addressRegion: 'Fribourg',
  addressCountry: 'CH',
  social: [
    'https://www.linkedin.com/company/vectra/',
    'https://twitter.com/VectraDesign',
    'https://www.facebook.com/people/Vectra/100092321876626/',
    'https://www.instagram.com/vectradesign/',
    'https://www.tiktok.com/@vectra',
  ],
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
 * Where client data is hosted. This is a contractual promise, not a marketing
 * line — the buyer's cantonal data protection officer may ask to verify it.
 *
 * ACTION REQUIRED — name the provider (Infomaniak / Exoscale / Swisscom). A named
 * provider is verifiable; "Swiss servers" is not, and this reader knows it.
 */
export const HOSTING = {
  country: 'Switzerland',
  provider: '',
} as const;

export const CALENDLY_URL = 'https://calendly.com/vectra/30min';

/** Demo booking for the products that are actually sellable. */
export const DEMO_URL = CALENDLY_URL;

export const SERVICE_AREAS = ['Geneva', 'Lausanne', 'Zurich', 'Basel', 'Bern', 'Zug'];

/* ── Public procurement ─────────────────────────────────────────────────── */

/**
 * Schools, communes and cantonal bodies buy under public procurement rules.
 * Below the cantonal invitation threshold a contract can be awarded without an
 * open tender — which is a reason to act, and almost no small studio says it.
 *
 * Deliberately NOT a single hard number: AIMP thresholds differ by canton and
 * are revised biennially. Copy phrases it as "typically under CHF …, confirm
 * against your canton's current thresholds" — an over-precise figure is exactly
 * the error this reader catches.
 */
export const PROCUREMENT = {
  /** Indicative cantonal invitation-procedure ceiling for services, in CHF. */
  invitationCeiling: 150000,
  simapUrl: 'https://www.simap.ch',
} as const;

/* ── Proof ──────────────────────────────────────────────────────────────── */

/**
 * Honest counts. `null` omits the item entirely — modest and true beats
 * inflated, because Swiss buyers verify. The competitor claims "+300 projets /
 * +200 clients / +10 ans"; do not invent numbers to match that.
 *
 * ACTION REQUIRED — set only what you can defend.
 */
export const PROOF: { id: string; value: number | null; suffix?: string }[] = [
  { id: 'systems', value: null }, // Schoolze, SB Pointage, Spotbase, Raqim
  { id: 'years', value: null },
  { id: 'institutions', value: null },
];

export interface Testimonial {
  /** Kept in its original language — translating a real client quote misrepresents it. */
  quote: string;
  name: string;
  role: string;
  organisation: string;
}

/**
 * ACTION REQUIRED — empty renders the section not at all.
 * Two real quotes outperform every visual change made so far. Name + role +
 * organisation, as the competitor does; anonymous quotes read as invented.
 */
export const TESTIMONIALS: Testimonial[] = [];

/** ACTION REQUIRED — needs logo files plus written permission from each client. */
export const CLIENT_LOGOS: { name: string; src: string }[] = [];

/* ── Hero media ─────────────────────────────────────────────────────────── */

/**
 * Ambient hero loop. `sources` empty renders the poster alone, so the hero looks
 * finished before any video exists.
 *
 * ACTION REQUIRED — add '/media/hero.mp4': H.264, ≤ 1 MB, ≤ 15 s seamless loop,
 * NO audio track. Skip WebM: the competitor ships both but lists MP4 first, so
 * their 1.6 MB WebM almost never loads. Then swap `poster` for a WebP of frame 1.
 */
export const HERO_MEDIA: { poster: string; sources: string[] } = {
  poster: '/assets/6.webp',
  sources: ['/assets/hero.mp4'],
};

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
export type PriceBand = (typeof PRICE_BANDS)[number];

/**
 * Subscription tiers — the "unlimited agency" model.
 *
 * ACTION REQUIRED — `monthly`/`yearly` are null on purpose. A null renders
 * "On request", which defeats the point of this model: its entire appeal is
 * published, predictable pricing, and it is our clearest differentiator against
 * a competitor who hides rates behind "contact us".
 */
export const SUBSCRIPTION_TIERS: {
  id: string;
  monthly: number | null;
  yearly: number | null;
  featured: boolean;
}[] = [
  { id: 'design', monthly: null, yearly: null, featured: false },
  { id: 'build', monthly: null, yearly: null, featured: true },
  { id: 'scale', monthly: null, yearly: null, featured: false },
];

/** Project tracks. `from` is null → renders "On request". ACTION REQUIRED. */
export const PROJECT_TRACKS: { id: string; from: number | null }[] = [
  { id: 'management', from: null },
  { id: 'webapps', from: null },
  { id: 'brand', from: null },
  { id: 'growth', from: null },
];

/* ── Hub & spoke information architecture ───────────────────────────────── */

export const HUBS = [
  'school-management',
  'hr-and-payroll',
  'booking-and-facilities',
  'brand-and-communication',
] as const;
export type HubKey = (typeof HUBS)[number];

export const SERVICES = [
  'school-management-software',
  'parent-portal',
  'time-tracking',
  'payroll',
  'facility-booking',
  'explainer-video',
  'web-app-development',
  'data-migration',
] as const;
export type ServiceKey = (typeof SERVICES)[number];

/** Primary hub for breadcrumbs. `null` = cross-cutting, listed under every hub. */
export const SERVICE_HUB: Record<ServiceKey, HubKey | null> = {
  'school-management-software': 'school-management',
  'parent-portal': 'school-management',
  'time-tracking': 'hr-and-payroll',
  payroll: 'hr-and-payroll',
  'facility-booking': 'booking-and-facilities',
  'explainer-video': 'brand-and-communication',
  'web-app-development': null,
  'data-migration': null,
};

/** Localised URL segments. English slugs equal the canonical keys. */
export const HUB_SLUGS: Record<Locale, Record<HubKey, string>> = {
  en: {
    'school-management': 'school-management',
    'hr-and-payroll': 'hr-and-payroll',
    'booking-and-facilities': 'booking-and-facilities',
    'brand-and-communication': 'brand-and-communication',
  },
  fr: {
    'school-management': 'gestion-scolaire',
    'hr-and-payroll': 'rh-et-paie',
    'booking-and-facilities': 'reservation-installations',
    'brand-and-communication': 'marque-communication',
  },
  de: {
    'school-management': 'schulverwaltung',
    'hr-and-payroll': 'hr-und-lohn',
    'booking-and-facilities': 'anlagen-reservation',
    'brand-and-communication': 'marke-kommunikation',
  },
};

export const SERVICE_SLUGS: Record<Locale, Record<ServiceKey, string>> = {
  en: {
    'school-management-software': 'school-management-software',
    'parent-portal': 'parent-portal',
    'time-tracking': 'time-tracking-software',
    payroll: 'payroll-software',
    'facility-booking': 'facility-booking-software',
    'explainer-video': 'explainer-video',
    'web-app-development': 'web-application-development',
    'data-migration': 'data-migration',
  },
  fr: {
    'school-management-software': 'logiciel-gestion-scolaire',
    'parent-portal': 'portail-parents',
    'time-tracking': 'logiciel-pointage',
    payroll: 'logiciel-paie',
    'facility-booking': 'logiciel-reservation-installations',
    'explainer-video': 'video-explicative',
    'web-app-development': 'developpement-application-web',
    'data-migration': 'migration-donnees',
  },
  de: {
    'school-management-software': 'schulverwaltungs-software',
    'parent-portal': 'elternportal',
    'time-tracking': 'zeiterfassungs-software',
    payroll: 'lohn-software',
    'facility-booking': 'anlagen-reservations-software',
    'explainer-video': 'erklaervideo',
    'web-app-development': 'web-app-entwicklung',
    'data-migration': 'datenmigration',
  },
};

export const hubPath = (locale: Locale, hub: HubKey) =>
  `/${locale}/solutions/${HUB_SLUGS[locale][hub]}`;
export const servicePath = (locale: Locale, service: ServiceKey) =>
  `/${locale}/services/${SERVICE_SLUGS[locale][service]}`;

/**
 * hreflang for entities whose slug differs per locale — `/fr/solutions/gestion-scolaire`
 * maps to `/en/solutions/school-management`, so a single shared path will not do.
 */
export function pathAlternates(build: (locale: Locale) => string) {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[LOCALE_TAGS[locale].hreflang] = `${SITE_URL}${build(locale)}`;
  }
  languages['x-default'] = `${SITE_URL}${build(DEFAULT_LOCALE)}`;
  return languages;
}

export function hubFromSlug(locale: Locale, slug: string): HubKey | undefined {
  return HUBS.find((hub) => HUB_SLUGS[locale][hub] === slug);
}
export function serviceFromSlug(locale: Locale, slug: string): ServiceKey | undefined {
  return SERVICES.find((service) => SERVICE_SLUGS[locale][service] === slug);
}
/** Services listed on a hub: its own, plus the cross-cutting ones. */
export const servicesForHub = (hub: HubKey) =>
  SERVICES.filter((s) => SERVICE_HUB[s] === hub || SERVICE_HUB[s] === null);

/* ── Products ───────────────────────────────────────────────────────────── */

export type Domain = 'education' | 'sports' | 'hr' | 'product' | 'brand';

/** Which products are relevant to a hub, for the proof block on each page. */
export const HUB_DOMAINS: Record<HubKey, Domain[]> = {
  'school-management': ['education'],
  'hr-and-payroll': ['hr'],
  'booking-and-facilities': ['sports'],
  'brand-and-communication': ['brand', 'product'],
};

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
 */
export const PRODUCTS: {
  slug: string;
  name: string;
  domain: Domain;
  status: 'available' | 'running';
  image: string | null;
  tech: string[];
  featured: boolean;
}[] = [
  {
    slug: 'spotbase',
    name: 'Spotbase',
    domain: 'sports',
    status: 'available',
    // ACTION REQUIRED — the most urgent screenshot on the site: this is the one
    // product a visitor can actually buy, and it is the featured card.
    image: null,
    tech: ['Next.js', 'Supabase', 'Stripe'],
    featured: true,
  },
  {
    slug: 'schoolze',
    name: 'Schoolze',
    domain: 'education',
    status: 'running',
    image: '/assets/6.webp', // confirmed: this screenshot is Schoolze
    tech: ['Next.js', 'Node', 'PostgreSQL'],
    featured: false,
  },
  {
    slug: 'sb-pointage',
    name: 'SB Pointage',
    domain: 'hr',
    status: 'running',
    image: null, // ACTION REQUIRED: screenshot needed (mask employee/salary data)
    tech: ['Next.js', 'Node', 'PostgreSQL'],
    featured: false,
  },
  {
    slug: 'raqim',
    name: 'Raqim',
    domain: 'education',
    status: 'running',
    image: null, // ACTION REQUIRED: screenshot needed (mask pupil data)
    tech: ['Next.js', 'Node', 'PostgreSQL'],
    featured: false,
  },
];

/** Product names are brand names, so the slug is identical in every locale. */
export const productPath = (locale: Locale, slug: string) => `/${locale}/products/${slug}`;

/** Secondary work — range, without diluting the management-systems story. */
export const ALSO_BUILT: { id: string; image: string }[] = [
  { id: 'hellodesk', image: '/assets/5.webp' },
  { id: 'audio', image: '/assets/3.webp' },
  { id: 'spectrum', image: '/assets/8.webp' },
];
