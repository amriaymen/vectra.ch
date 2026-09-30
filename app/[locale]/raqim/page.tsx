import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import s from '../../site/site.module.css';
import Motion from '../../site/Motion';
import AdmissionDemo from '../../site/AdmissionDemo';
import LeadForm from '../../site/LeadForm';
import { SiteFooter, SiteHeader } from '../../site/Shell';
import { getCopy } from '../../site/copy';
import { RAQIM_BANDS, getRaqimCopy, raqimBands, raqimPrice } from '../../site/raqim.copy';
import { COMPANY, LOCALES, LOCALE_TAGS, SITE_URL, isLocale, languageAlternates, type Locale } from '../../data';

const PATH = '/raqim';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale as Locale;
  const t = getRaqimCopy(locale);
  const url = `${SITE_URL}/${locale}${PATH}`;

  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: { canonical: url, languages: languageAlternates(PATH) },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url,
      siteName: COMPANY.name,
      locale: LOCALE_TAGS[locale].og,
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => LOCALE_TAGS[l].og),
      type: 'website',
    },
  };
}

/** The offer appears in the markup only once a Swiss price exists. */
function structuredData(locale: Locale) {
  const t = getRaqimCopy(locale);
  const url = `${SITE_URL}/${locale}${PATH}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': `${url}#software`,
        name: 'Raqim',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: t.meta.description,
        url,
        inLanguage: LOCALE_TAGS[locale].hreflang,
        publisher: { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'Vectra' },
        featureList: t.features.items.map((item) => item.title),
        // One offer per priced band; none while the bands are empty.
        ...(RAQIM_BANDS.some((band) => band.chf !== null)
          ? {
              offers: raqimBands(locale)
                .filter((band) => band.priced)
                .map((band) => ({
                  '@type': 'Offer',
                  price: RAQIM_BANDS[raqimBands(locale).indexOf(band)].chf,
                  priceCurrency: 'CHF',
                  name: band.label,
                  description: t.price.excl,
                })),
            }
          : {}),
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        inLanguage: LOCALE_TAGS[locale].hreflang,
        mainEntity: t.faq.items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };
}

export default function RaqimPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const site = getCopy(locale);
  const t = getRaqimCopy(locale);

  return (
    <div className={s.page}>
      <Motion />
      <SiteHeader locale={locale} copy={site} path={PATH} />

      <main id="top">
        <section className={s.hero} data-glow>
          <p className={s.kicker}>
            <span className={s.dot} />
            {t.hero.kicker}
          </p>
          <h1 className={`${s.h1} ${s.h1Long}`}>
            <span className={s.rise}>{t.hero.line1}</span>
            <span className={s.rise}>
              <em>{t.hero.line2}</em>
            </span>
          </h1>
          <p className={s.lead}>{t.hero.body}</p>
          <div className={s.actions}>
            <a className={s.btn} data-magnetic href="#demo">
              {t.hero.cta} →
            </a>
            <small>{t.hero.note}</small>
          </div>
        </section>

        <section className={`${s.band} ${s.rule}`}>
          <div data-reveal>
            <h2 className={s.h2}>{t.demo.title}</h2>
            <p className={s.intro}>{t.demo.intro}</p>
          </div>
          <div data-reveal>
            <AdmissionDemo locale={locale} />
          </div>
        </section>

        <section className={`${s.band} ${s.rule}`}>
          <h2 className={s.h2} data-reveal>
            {t.features.title}
          </h2>
          <ul className={s.features}>
            {t.features.items.map((item, index) => (
              <li key={item.title} data-reveal style={{ transitionDelay: `${(index % 3) * 100}ms` }}>
                <b>{String(index + 1).padStart(2, '0')}</b>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={`${s.band} ${s.hot}`}>
          <div className={s.split}>
            <div data-reveal>
              <h2 className={s.h2}>{t.security.title}</h2>
              <p className={s.intro}>{t.security.body}</p>
            </div>
            <div className={s.offer} data-reveal>
              <ul>
                {t.security.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="prix" className={`${s.band} ${s.ink}`}>
          <div className={s.split}>
            <div data-reveal>
              <h2 className={s.h2}>{t.price.title}</h2>
              <p className={s.intro}>{t.price.intro}</p>
              <ul className={s.terms}>
                {t.price.terms.map((term) => (
                  <li key={term}>{term}</li>
                ))}
              </ul>
            </div>
            <div className={s.calc} data-reveal>
              <p className={s.calcTotal}>
                <b>{raqimPrice(locale)}</b>
                {RAQIM_BANDS.some((band) => band.chf !== null) && (
                  <span>
                    {t.price.perYear} · {t.price.excl}
                  </span>
                )}
              </p>
              <table className={s.bands}>
                <tbody>
                  {raqimBands(locale).map((band) => (
                    <tr key={band.label}>
                      <th scope="row">{band.label}</th>
                      <td>{band.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className={s.calcDetail}>{t.price.note}</p>
              <div className={s.pickerAction}>
                <a className={s.btn} data-magnetic href="#demo">
                  {t.hero.cta} →
                </a>
                <small>{t.card.ctaNote}</small>
              </div>
            </div>
          </div>
        </section>

        <section id="questions" className={s.band}>
          <h2 className={s.h2} data-reveal>
            {t.faq.title}
          </h2>
          <div className={s.faq} data-reveal>
            {t.faq.items.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="demo" className={`${s.band} ${s.ink} ${s.rule}`}>
          <div className={s.split}>
            <div data-reveal>
              <h2 className={s.h2}>{t.closing.title}</h2>
              <p className={s.intro}>{t.closing.body}</p>
              <p className={s.direct}>
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
                <a href={`tel:${COMPANY.phoneSwiss.replace(/\s/g, '')}`}>{COMPANY.phoneSwiss}</a>
              </p>
              <a className={s.back} href={`/${locale}`}>
                ← {t.closing.back}
              </a>
            </div>
            <div data-reveal>
              <LeadForm locale={locale} interest="Raqim" email={COMPANY.email} privacyHref={`/${locale}/legal/privacy`} />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} copy={site} path={PATH} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(locale)) }}
      />
    </div>
  );
}
