import Link from 'next/link';
import Section from './Section';
import { COMPANY, type Dictionary, type Locale } from '../data';

const SOCIAL_LABELS = ['LinkedIn', 'X', 'Facebook', 'Instagram', 'TikTok'];

export default function Footer({ t, locale = 'fr' }: { t: Dictionary; locale?: Locale }) {
  /*
   * Show a phone number only once it is a Swiss one. A +216 number sitting
   * beside Swiss positioning reads as a contradiction to exactly the buyer we
   * are addressing — email alone is better until phoneSwiss is set.
   */
  // Annotated: COMPANY is `as const`, so the empty literal would narrow to never.
  const phone: string = COMPANY.phoneSwiss;
  const hasAddress = Boolean(COMPANY.streetAddress && COMPANY.addressLocality);

  return (
    <Section as="footer" tone="dark" className="border-t border-band-line">
      <div className="grid gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:gap-16">
        <div>
          <h2 className="max-w-xl text-3xl leading-tight tracking-tight md:text-4xl">
            {t.footer.title}
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            {/* Locale-prefixed, not a bare '#scope'. The Footer renders on every
                route, and only the homepage has that section — this button did
                nothing at all on product, hub, service and legal pages. */}
            <a
              className="inline-flex min-h-[48px] items-center rounded-md bg-primary px-8 py-4 text-lg font-medium text-background transition-colors hover:bg-primary-hover"
              href={`/${locale}#scope`}
            >
              {t.footer.button}
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-band-body">{t.footer.note}</p>
          </div>
        </div>

        <div className="grid content-start gap-8">
          <div className="grid gap-2 text-sm">
            <a className="transition-colors hover:text-band-brand" href={`mailto:${COMPANY.email}`}>
              {COMPANY.email}
            </a>
            {phone && (
              <a
                className="transition-colors hover:text-band-brand"
                href={`tel:${phone.replace(/\s/g, '')}`}
              >
                {phone}
              </a>
            )}
            {hasAddress && (
              <address className="not-italic text-band-body">
                {COMPANY.streetAddress}
                <br />
                {COMPANY.postalCode} {COMPANY.addressLocality} (Fribourg), Suisse
              </address>
            )}
          </div>

          <nav aria-label={t.footer.social} className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {COMPANY.social.map((href, index) => (
              <a
                key={href}
                className="text-band-body transition-colors hover:text-band-brand"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {SOCIAL_LABELS[index]}
              </a>
            ))}
          </nav>

          {/*
            Process, Pricing and FAQs live here rather than in the header. All
            three are homepage sections, and the header's width is spent on
            ROUTES — the sectors, and the one anchor that leads to real product
            pages. Pricing in particular sat next to a CTA that is itself the
            pricing path, so it was competing with the thing it duplicates.

            Ordered along the funnel: how we work, what it costs, then answers.
            "All solutions" leads it because this is the only sitewide entry to
            the solutions index.
          */}
          <nav
            aria-label={t.nav.menuTitle}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
          >
            <Link
              className="inline-flex min-h-[44px] items-center text-band-body transition-colors hover:text-band-brand"
              href={`/${locale}/solutions`}
            >
              {t.pages.allSolutions}
            </Link>
            <a
              className="inline-flex min-h-[44px] items-center text-band-body transition-colors hover:text-band-brand"
              href={`/${locale}#process`}
            >
              {t.nav.process}
            </a>
            <a
              className="inline-flex min-h-[44px] items-center text-band-body transition-colors hover:text-band-brand"
              href={`/${locale}#pricing`}
            >
              {t.nav.pricing}
            </a>
            <a
              className="inline-flex min-h-[44px] items-center text-band-body transition-colors hover:text-band-brand"
              href={`/${locale}#faqs`}
            >
              {t.nav.faqs}
            </a>
          </nav>

          {/* Legal Navigation Links */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-band-body">
            <Link className="transition-colors hover:text-band-brand" href={`/${locale}/legal/terms`}>
              {locale === 'de' ? 'AGB' : locale === 'en' ? 'Terms' : 'Conditions'}
            </Link>
            <span>·</span>
            <Link className="transition-colors hover:text-band-brand" href={`/${locale}/legal/privacy`}>
              {locale === 'de' ? 'Datenschutz' : locale === 'en' ? 'Privacy' : 'Confidentialité'}
            </Link>
            <span>·</span>
            <Link className="transition-colors hover:text-band-brand" href={`/${locale}/legal/impressum`}>
              {locale === 'de' ? 'Impressum' : locale === 'en' ? 'Legal Notice' : 'Mentions légales'}
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-2 border-t border-band-line pt-8 text-sm text-band-muted md:flex-row md:justify-between">
        <p>
          {t.footer.rights} © {new Date().getFullYear()}
        </p>
        <p>{t.footer.team}</p>
      </div>
    </Section>
  );
}
