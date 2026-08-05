import { hubPath, type Dictionary, type HubKey, type Locale } from '../data';

/**
 * The sector links in the header, shared by the desktop bar and the mobile panel.
 *
 * Every href is DERIVED from `hubPath()` — never authored in the dictionaries.
 * That is the whole point of this module: the nav previously hardcoded
 * `/en/solutions/gestion-scolaire`, a French slug on an English URL, which 404'd.
 * Composing from the path helper makes a locale-mismatched link impossible to write.
 *
 * Sectors rather than engagement models. A school director knows they run a
 * school; they do not know whether they want to licence software or commission a
 * build, so a menu asking them to choose between the two asks a question they
 * cannot answer at the moment they arrive.
 */

/**
 * Order is deliberate: schools lead, because that is the primary vertical.
 *
 * `brand-and-communication` is excluded — communication is how we get a system
 * adopted, not a service sold on its own. Its hub page stays live and indexed;
 * it just does not compete for space in the bar.
 */
const NAV_HUBS: readonly HubKey[] = [
  'school-management',
  'booking-and-facilities',
  'hr-and-payroll',
];

export interface NavLink {
  label: string;
  href: string;
}

export function buildSectorNav(locale: Locale, t: Dictionary): NavLink[] {
  return NAV_HUBS.map((hub) => ({
    label: t.hubs[hub].navShort,
    href: hubPath(locale, hub),
  }));
}
