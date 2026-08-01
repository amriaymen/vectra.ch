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

  const ready: MenuColumn = {
    key: 'ready',
    title: m.ready.title,
    desc: m.ready.desc,
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

  const built: MenuColumn = {
    key: 'built',
    title: m.built.title,
    desc: m.built.desc,
    price: onRequest,
    tone: 'accent',
    items: HUBS.map((hub) => ({
      key: hub,
      name: t.hubs[hub].navLabel,
      desc: t.hubs[hub].navDetail,
      href: hubPath(locale, hub),
    })),
  };

  const team: MenuColumn = {
    key: 'team',
    title: m.team.title,
    desc: m.team.desc,
    price: onRequest,
    tone: 'neutral',
    items: [
      {
        key: 'subscription',
        name: t.pricing.models.subscription.name,
        desc: t.pricing.models.subscription.detail,
        href: `/${locale}#pricing`,
        price: onRequest,
      },
    ],
  };

  return {
    columns: [ready, built, team],
    cta: { label: m.ctaLabel, href: `/${locale}#scope`, note: m.ctaNote },
    labels: {
      available: t.products.statusAvailable,
      running: t.products.statusRunning,
      from: 'Dès',
      perMonth: '/mois',
    },
  };
}
