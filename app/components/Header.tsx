import Image from 'next/image';
import Link from 'next/link';
import Section from './Section';
import MobileNav from './MobileNav';
import NavLink from './NavLink';
import LocaleSwitcher from './LocaleSwitcher';
import { CALENDLY_URL, DEPARTMENTS, departmentPath, type Dictionary, type Locale } from '../data';

export default function Header({ t, locale }: { t: Dictionary; locale: Locale }) {
  /*
   * Three departments, three routes, nothing else. The labels are the short
   * department names from the dictionary; every href is derived from
   * departmentPath(), never authored, so a locale-mismatched link cannot be
   * written. Legal pages live in the footer.
   */
  const links = DEPARTMENTS.map((department) => ({
    href: departmentPath(locale, department),
    label: t.nav.departments[department],
  }));

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
            The visible lockup is hidden from assistive technology because the
            sr-only label above already names the home link.
          */}
          <span aria-hidden="true" className="hidden sm:grid gap-1">
            <span className="font-medium text-xl leading-none tracking-[0.04em] text-white transition-colors group-hover:text-primary">
              VECTRASTUDIO
            </span>
            <span className="text-[10px] uppercase leading-none tracking-[0.12em] text-band-muted">
              By Timgroup
            </span>
          </span>
        </Link>

        {/*
          Turns on at lg rather than xl — moving up would hand the hamburger to
          every 1024-1279px laptop. Re-measure German at 1024px before adding a
          fourth label.
        */}
        <nav aria-label={t.nav.menuTitle} className="hidden items-center gap-6 lg:flex xl:gap-9">
          {links.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        {/*
          Outside <nav>: these are controls, not site navigation. Inside, the
          "Site navigation" label claimed a language menu and a contact button
          as places on the site.
        */}
        <div className="hidden items-center gap-4 lg:flex">
          <LocaleSwitcher t={t} locale={locale} />
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
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
