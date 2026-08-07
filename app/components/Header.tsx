import Image from 'next/image';
import Link from 'next/link';
import Section from './Section';
import MobileNav from './MobileNav';
import NavLink from './NavLink';
import LocaleSwitcher from './LocaleSwitcher';
import { buildSectorNav } from '../lib/nav';
import type { Dictionary, Locale } from '../data';

export default function Header({ t, locale }: { t: Dictionary; locale: Locale }) {
  /*
   * Sectors first, then the one page anchor worth a slot.
   *
   * The sector links are real routes; the anchor is not, and `kind` carries
   * that distinction all the way to NavLink so the two read differently and
   * only a route can be marked current. Leading with the routes is the point —
   * the site's structure used to sit behind a dropdown while the bar spent its
   * width scrolling one page.
   *
   * Process, FAQs and now Pricing live in the footer. The header's width is
   * spent on ROUTES; a homepage section that is one scroll away does not earn a
   * permanent slot, and Pricing in particular competed with the CTA beside it,
   * which is itself the pricing path. #work stays because it is the only way in
   * to four real product pages.
   *
   * Anchors are absolute and locale-prefixed. A bare '#work' silently did
   * nothing on nested routes like /fr/products/schoolze, which have no such
   * section.
   */
  const links = [
    ...buildSectorNav(locale, t).map((link) => ({ ...link, kind: 'route' as const })),
    { href: `/${locale}#work`, label: t.nav.work, kind: 'anchor' as const },
  ];

  return (
    <Section
      as="header"
      padding="none"
      // Chrome, not a band: it floats over whatever scrolls beneath, and its
      // backdrop blur would smear a seam gradient.
      seam={false}
      className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-line/50"
      innerClassName="py-4 md:py-5"
    >
      <div className="flex items-center justify-between gap-8">
        {/*
          Logo lockup, proportioned against the monogram rather than by eye.
          The artwork is 1423.26 × 1186.05 (1.2:1) and its rounded square module
          is 474.42 — exactly 40% of the mark's height. At a 28px mark that
          module is 11.2px, which is where gap-3 (12px) comes from.

          `font-medium` is load-bearing: it is the local class in globals.css
          that swaps in the real TT Firs Neue Medium file. The previous
          `font-bold` asked for weight 700, which is not among the three faces
          we ship (200/400/500), so the browser synthesised it — smeared stems
          that fought the crisp geometry of the mark.
        */}
        <Link href={`/${locale}`} className="group inline-flex items-center gap-3">
          <span className="sr-only">{t.nav.home}</span>
          <Image
            className="h-7 w-auto transition-transform group-hover:scale-105"
            src="/assets/logo.svg"
            // Decorative: the wordmark beside it already says "Vectra", and the
            // link has an sr-only label. Alt text here would announce it twice.
            alt=""
            width={34}
            height={28}
            priority
          />
          {/*
            leading-none so items-center centres the glyphs, not the line box —
            "Vectra" has no descenders, so the box would otherwise sit the caps low.

            aria-hidden because the sr-only label above already names the link.
            Without it the accessible name reads "Vectra — home Vectra".
          */}
          <span
            aria-hidden="true"
            className="hidden sm:inline font-medium text-2xl leading-none tracking-tight text-white transition-colors group-hover:text-primary"
          >
            Vectra
          </span>
        </Link>

        {/*
          Two groups, because the links are two different things. Dropping
          Pricing took the logo-to-nav gap at 1024px in German from 34px to
          ~100px, which is why this still turns on at lg rather than xl —
          moving up would hand the hamburger to every 1024-1279px laptop.
        */}
        <nav aria-label={t.nav.menuTitle} className="hidden items-center gap-6 lg:flex xl:gap-9">
          <div className="flex items-center gap-6 xl:gap-9">
            {links
              .filter((link) => link.kind === 'route')
              .map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
          </div>

          {/*
            The divider is a pseudo-element inside the existing gap, not a flex
            child: a real <span> would cost its own 24px gap on top of its 1px,
            handing back a third of the width removing Pricing just won.
          */}
          <div className="relative flex items-center gap-6 before:absolute before:left-[-0.75rem] before:top-1/2 before:h-4 before:w-px before:-translate-y-1/2 before:bg-line xl:gap-9 xl:before:left-[-1.125rem]">
            {links
              .filter((link) => link.kind === 'anchor')
              .map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
          </div>
        </nav>

        {/*
          Outside <nav>: these are controls, not site navigation. Inside, the
          "Site navigation" label claimed a language menu and a contact button
          as places on the site.
        */}
        <div className="hidden items-center gap-4 lg:flex">
          <LocaleSwitcher t={t} locale={locale} />
          <a
            href={`/${locale}#scope`}
            className="inline-flex min-h-[44px] items-center whitespace-nowrap rounded-md bg-primary px-5 font-medium text-background transition-colors hover:bg-primary-hover"
          >
            {t.nav.cta}
          </a>
        </div>

        <MobileNav t={t} locale={locale} links={links} />
      </div>
    </Section>
  );
}
