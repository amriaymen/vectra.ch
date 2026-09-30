import Link from 'next/link';
import Section from './Section';
import { COMPANY, DEPARTMENTS, departmentPath, type Dictionary, type Locale } from '../data';

export default function Footer({ t, locale }: { t: Dictionary; locale: Locale }) {
  // Annotated: COMPANY is `as const`, so the empty literal would narrow to never.
  const phone: string = COMPANY.phoneSwiss;
  const hasAddress = Boolean(COMPANY.streetAddress && COMPANY.addressLocality);

  const linkClass =
    'inline-flex min-h-[44px] items-center text-band-body transition-colors hover:text-band-brand';

  return (
    <Section as="footer" tone="dark" className="border-t border-band-line">
      {/*
        No call to action here. On the homepage and the department pages the
        lime CtaBanner sits directly above the footer, and a second button under
        it competed with the one band whose whole job is to be acted on.
      */}
      <div className="grid gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:gap-16">
        <div>
          <h2 className="max-w-xl text-3xl leading-tight tracking-tight md:text-4xl">
            {t.footer.title}
          </h2>

          {/* Full department names: the footer has the width the header lacks. */}
          <nav aria-label={t.nav.menuTitle} className="mt-8 grid gap-1 text-lg">
            {DEPARTMENTS.map((department) => (
              <Link
                key={department}
                className="inline-flex min-h-[44px] items-center text-band-lead transition-colors hover:text-band-brand"
                href={departmentPath(locale, department)}
              >
                {t.departments.items[department].name}
              </Link>
            ))}
          </nav>
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
            {COMPANY.phoneBureau && (
              <a
                className="transition-colors hover:text-band-brand"
                href={`tel:${COMPANY.phoneBureau.replace(/\s/g, '')}`}
              >
                {COMPANY.phoneBureau}
              </a>
            )}
            {hasAddress && (
              <address className="not-italic text-band-body">
                {COMPANY.streetAddress}
                <br />
                {COMPANY.postalCode} {COMPANY.addressLocality} ({COMPANY.addressRegion}),{' '}
                {t.footer.country}
              </address>
            )}
            <p className="text-band-body">{t.footer.group.replace('{group}', COMPANY.groupName)}</p>
          </div>

          {COMPANY.social.length > 0 && (
            <nav aria-label={t.footer.social} className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {COMPANY.social.map((href) => (
                <a
                  key={href}
                  className="text-band-body transition-colors hover:text-band-brand"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {href}
                </a>
              ))}
            </nav>
          )}

          <div className="flex flex-wrap items-center gap-x-5 text-sm">
            <Link className={linkClass} href={`/${locale}/legal/terms`}>
              {t.footer.legal.terms}
            </Link>
            <Link className={linkClass} href={`/${locale}/legal/privacy`}>
              {t.footer.legal.privacy}
            </Link>
            <Link className={linkClass} href={`/${locale}/legal/impressum`}>
              {t.footer.legal.impressum}
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
