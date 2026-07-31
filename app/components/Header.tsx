import Image from 'next/image';
import Section from './Section';
import MobileNav from './MobileNav';
import LocaleSwitcher from './LocaleSwitcher';
import SolutionsMenu from './SolutionsMenu';
import { HUBS, hubPath, type Dictionary, type Locale } from '../data';

export default function Header({ t, locale }: { t: Dictionary; locale: Locale }) {
  // Absolute, locale-prefixed anchors. Bare '#work' silently did nothing on
  // nested routes like /fr/work/schoolze, which have no such section.
  const links = [
    { href: `/${locale}#work`, label: t.nav.work },
    { href: `/${locale}#process`, label: t.nav.process },
    { href: `/${locale}#pricing`, label: t.nav.pricing },
    { href: `/${locale}#faqs`, label: t.nav.faqs },
  ];

  const hubs = HUBS.map((hub) => ({
    href: hubPath(locale, hub),
    label: t.hubs[hub].navLabel,
    detail: t.hubs[hub].navDetail,
  }));

  return (
    <Section
      as="header"
      padding="none"
      className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-line/50"
      innerClassName="py-4 md:py-5"
    >
      <div className="flex items-center justify-between gap-8">
        <a href={`/${locale}`} className="inline-flex items-center gap-2.5 group">
          <span className="sr-only">{t.nav.home}</span>
          <Image
            className="h-7 w-auto transition-transform group-hover:scale-105"
            src="/assets/logo.svg"
            alt="Vectra"
            width={32}
            height={28}
            priority
          />
          <span className="text-xl font-bold tracking-tight text-white transition-colors group-hover:text-primary">
            Vectra
          </span>
        </a>

        <nav aria-label={t.nav.menuTitle} className="hidden items-center gap-7 lg:flex">
          <SolutionsMenu label={t.nav.solutions} items={hubs} />
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-300 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <LocaleSwitcher t={t} locale={locale} />
          <a
            href={`/${locale}#scope`}
            className="rounded-md bg-primary px-5 py-2.5 font-medium text-background transition-colors hover:bg-primary-hover"
          >
            {t.nav.cta}
          </a>
        </nav>

        <MobileNav t={t} locale={locale} links={links} hubs={hubs} />
      </div>
    </Section>
  );
}
