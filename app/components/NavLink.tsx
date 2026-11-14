'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * One header link, and the only client code in the bar.
 *
 * The boundary sits HERE rather than on Header so the dictionary stays on the
 * server: Header takes the whole `Dictionary` object, and marking it
 * `'use client'` would serialise all of it into the RSC payload of every page
 * to power one string comparison.
 */
export type NavKind = 'route' | 'anchor';

export interface NavLinkProps {
  href: string;
  label: string;
  /**
   * `route` is a real page and can be current. `anchor` is a `#` link into the
   * homepage and never can be — usePathname() drops the hash, so `/fr#work`
   * compares equal to `/fr` and would light up across the entire homepage.
   */
  kind: NavKind;
}

const BASE =
  'inline-flex min-h-[44px] items-center whitespace-nowrap transition-colors';

/** Trailing slashes: no next.config sets `trailingSlash`, but normalise anyway. */
const trim = (path: string) => path.replace(/\/+$/, '') || '/';

export default function NavLink({ href, label, kind }: NavLinkProps) {
  const pathname = usePathname();

  if (kind === 'anchor') {
    return (
      <a href={href} className={`${BASE} text-gray-300 hover:text-white`}>
        {label}
      </a>
    );
  }

  /*
   * Exact match, deliberately not startsWith.
   *
   * startsWith('/de/solutions') would light up all three sectors on the
   * solutions index. It also would not buy the thing it looks like it buys:
   * service pages live at /de/services/*, not under their hub's URL, so their
   * parent sector cannot be derived from the path at all — that mapping is
   * SERVICE_HUB. A service page states its hub in the breadcrumb and kicker
   * instead, which is where that job belongs.
   */
  const active = trim(pathname ?? '') === trim(href);

  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      /*
       * Underline rather than lime text: Section.tsx reserves lime for actions
       * and the header CTA is a lime button, so a lime LABEL would compete with
       * it. A lime rule under a white label reads as position, not as an action.
       *
       * No font-medium on the active state — per the logo comment in Header,
       * that class swaps in a different font file, so the label would change
       * width and reflow the bar by a few px on every navigation.
       */
      className={`${BASE} ${
        active
          ? 'text-white underline decoration-primary decoration-2 underline-offset-8'
          : 'text-gray-300 hover:text-white'
      }`}
    >
      {label}
    </Link>
  );
}
