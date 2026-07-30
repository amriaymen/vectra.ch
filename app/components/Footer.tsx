import Section from './Section';
import { COMPANY, type Dictionary } from '../data';

const SOCIAL_LABELS = ['LinkedIn', 'X', 'Facebook', 'Instagram', 'TikTok'];

export default function Footer({ t }: { t: Dictionary }) {
  /*
   * Show a phone number only once it is a Swiss one. A +216 number sitting
   * beside Swiss positioning reads as a contradiction to exactly the buyer we
   * are addressing — email alone is better until phoneSwiss is set.
   */
  // Annotated: COMPANY is `as const`, so the empty literal would narrow to never.
  const phone: string = COMPANY.phoneSwiss;
  const hasAddress = Boolean(COMPANY.streetAddress && COMPANY.addressLocality);

  return (
    <Section as="footer" tone="dark" className="border-t border-line">
      <div className="grid gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:gap-16">
        <div>
          <h2 className="max-w-xl text-3xl leading-tight tracking-tight md:text-4xl">
            {t.footer.title}
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a
              className="inline-flex min-h-[48px] items-center rounded-md bg-primary px-8 py-4 text-lg font-medium text-background transition-colors hover:bg-primary-hover"
              href="#scope"
            >
              {t.footer.button}
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-gray-400">{t.footer.note}</p>
          </div>
        </div>

        <div className="grid content-start gap-8">
          <div className="grid gap-2 text-sm">
            <a className="transition-colors hover:text-primary" href={`mailto:${COMPANY.email}`}>
              {COMPANY.email}
            </a>
            {phone && (
              <a
                className="transition-colors hover:text-primary"
                href={`tel:${phone.replace(/\s/g, '')}`}
              >
                {phone}
              </a>
            )}
            {hasAddress && (
              <address className="not-italic text-gray-400">
                {COMPANY.streetAddress}
                <br />
                {COMPANY.postalCode} {COMPANY.addressLocality}, Switzerland
              </address>
            )}
          </div>

          <nav aria-label={t.footer.social} className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {COMPANY.social.map((href, index) => (
              <a
                key={href}
                className="text-gray-400 transition-colors hover:text-primary"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {SOCIAL_LABELS[index]}
              </a>
            ))}
          </nav>

          {/*
            TODO: these three pages do not exist yet. A .ch site selling to Swiss
            customers needs a real privacy policy (nLPD) and an Impressum. They
            were previously non-clickable <div>s, which is worse than absent —
            keeping them as plain text until the pages exist is deliberate.
          */}
          <p className="text-sm text-gray-500">{t.footer.legal}</p>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-2 border-t border-line pt-8 text-sm text-gray-500 md:flex-row md:justify-between">
        <p>
          {t.footer.rights} © {new Date().getFullYear()}
        </p>
        <p>{t.footer.team}</p>
      </div>
    </Section>
  );
}
