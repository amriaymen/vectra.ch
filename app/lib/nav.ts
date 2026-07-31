import {
  HUBS,
  PRODUCTS,
  PROJECT_TRACKS,
  SUBSCRIPTION_TIERS,
  formatCHF,
  hubPath,
  productPath,
  type Dictionary,
  type Locale,
} from '../data';

/**
 * The Solutions menu model, shared by the desktop dropdown and the mobile panel.
 *
 * Every href is DERIVED from the config path helpers — never authored in the
 * dictionaries. That is the whole point of this module: the menu previously
 * hardcoded `/en/solutions/gestion-scolaire`, a French slug on an English URL,
 * which 404'd. Composing from `hubPath()` / `productPath()` makes a
 * locale-mismatched link impossible to write.
 */

export interface MenuItem {
  key: string;
  name: string;
  desc: string;
  href: string;
  /** Only products carry one; drives the chip and whether we may imply purchase. */
  status?: 'available' | 'running';
  /** Rendered right-aligned. Already formatted, or the "on request" string. */
  price?: string;
}

export interface MenuColumn {
  key: 'ready' | 'built' | 'team';
  /** Buyer statement, e.g. "Something already exists". */
  title: string;
  /** How it works commercially — demoted beneath the statement. */
  desc: string;
  /** Entry price for the whole column. */
  price: string;
  /** Design-system tone. No stock Tailwind palettes. */
  tone: 'primary' | 'accent' | 'neutral';
  items: MenuItem[];
}

export interface SolutionsMenuModel {
  columns: MenuColumn[];
  cta: { label: string; href: string; note: string };
  labels: { available: string; running: string; from: string; perMonth: string };
}

export function buildSolutionsMenu(locale: Locale, t: Dictionary): SolutionsMenuModel {
  const m = t.solutionsMenu;
  const onRequest = t.pricing.onRequest;

  /** Lowest non-null figure, or the honest "on request" fallback. */
  const cheapest = (values: (number | null)[], suffix = '') => {
    const set = values.filter((v): v is number => v !== null);
    return set.length ? `${t.pricing.from} ${formatCHF(Math.min(...set))}${suffix}` : onRequest;
  };

  // ── 1. Something already exists ──────────────────────────────────────────
  // All four products, each with its domain and an honest status. A `running`
  // system is real and in production but not licensable, so it gets no
  // purchase language here either — the nav must not promise what the product
  // page refuses.
  const ready: MenuColumn = {
    key: 'ready',
    title: m.ready.title,
    desc: m.ready.desc,
    // PRODUCTS carries no price yet, so this reads "On request" rather than
    // inventing a licence fee. Add a `from` field there and it lights up.
    price: onRequest,
    tone: 'primary',
    items: PRODUCTS.map((product) => ({
      key: product.slug,
      name: product.name,
      desc: t.products.domains[product.domain],
      href: productPath(locale, product.slug),
      status: product.status,
    })),
  };

  // ── 2. We need it built ──────────────────────────────────────────────────
  // The four domain hubs. A custom build is scoped by sector, so this is where
  // domains belong — and it restores the internal links to pages that were
  // orphaned when the hubs left the nav.
  const built: MenuColumn = {
    key: 'built',
    title: m.built.title,
    desc: m.built.desc,
    price: cheapest(PROJECT_TRACKS.map((track) => track.from)),
    tone: 'accent',
    items: HUBS.map((hub) => ({
      key: hub,
      name: t.hubs[hub].navLabel,
      desc: t.hubs[hub].navDetail,
      href: hubPath(locale, hub),
    })),
  };

  // ── 3. We need a team ────────────────────────────────────────────────────
  // Three real tiers with distinct anchors, replacing two entries that both
  // pointed at #pricing and made the column read as padding.
  const team: MenuColumn = {
    key: 'team',
    title: m.team.title,
    desc: m.team.desc,
    price: cheapest(
      SUBSCRIPTION_TIERS.map((tier) => tier.monthly),
      t.pricing.perMonth,
    ),
    tone: 'neutral',
    items: SUBSCRIPTION_TIERS.map((tier) => {
      const copy = t.pricing.tiers[tier.id as keyof typeof t.pricing.tiers];
      return {
        key: tier.id,
        name: copy.name,
        desc: copy.detail,
        href: `/${locale}#tier-${tier.id}`,
        price:
          tier.monthly === null
            ? onRequest
            : `${formatCHF(tier.monthly)}${t.pricing.perMonth}`,
      };
    }),
  };

  return {
    columns: [ready, built, team],
    cta: { label: m.ctaLabel, href: `/${locale}#scope`, note: m.ctaNote },
    labels: {
      available: t.products.statusAvailable,
      running: t.products.statusRunning,
      from: t.pricing.from,
      perMonth: t.pricing.perMonth,
    },
  };
}
