import Image from 'next/image';
import Section from './Section';
import MobileNav from './MobileNav';
import LocaleSwitcher from './LocaleSwitcher';
import { buildSectorNav } from '../lib/nav';
import type { Dictionary, Locale } from '../data';

export default function Header({ t, locale }: { t: Dictionary; locale: Locale }) {
  /*
   * Sectors first, then the two page anchors worth a slot.
   *
   * The sector links are real routes; the anchors are not. Leading with the
   * routes is the point — the site's structure used to sit behind a dropdown
   * while the bar spent its width scrolling one page. Process and FAQs moved to
   * the footer: nobody navigates to "FAQ" from a header in a considered
   * institutional purchase, and both are one scroll away.
   *
   * Anchors are absolute and locale-prefixed. A bare '#work' silently did
   * nothing on nested routes like /fr/products/schoolze, which have no such
   * section.
   */
  const links = [
    ...buildSectorNav(locale, t),
    { href: `/${locale}#work`, label: t.nav.work },
    { href: `/${locale}#pricing`, label: t.nav.pricing },
  ];

  return (
    <Section
      as="header"
      padding="none"
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
        <a href={`/${locale}`} className="group inline-flex items-center gap-3">
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
        </a>

        {/* gap-6 at lg, widening at xl: five labels in French are tight at 1024px. */}
        <nav aria-label={t.nav.menuTitle} className="hidden items-center gap-6 lg:flex xl:gap-9">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-gray-300 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <LocaleSwitcher t={t} locale={locale} />
          <a
            href={`/${locale}#scope`}
            className="whitespace-nowrap rounded-md bg-primary px-5 py-2.5 font-medium text-background transition-colors hover:bg-primary-hover"
          >
            {t.nav.cta}
          </a>
        </nav>

        <MobileNav t={t} locale={locale} links={links} />
      </div>
    </Section>
  );
}
