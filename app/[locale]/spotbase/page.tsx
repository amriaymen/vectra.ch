import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import s from '../../site/site.module.css';
import Motion from '../../site/Motion';
import CourtDemo from '../../site/CourtDemo';
import LeadForm from '../../site/LeadForm';
import { SiteFooter, SiteHeader } from '../../site/Shell';
import { getCopy } from '../../site/copy';
import { getSpotbaseCopy } from '../../site/spotbase.copy';
import { COMPANY, LOCALES, LOCALE_TAGS, SITE_URL, isLocale, languageAlternates, type Locale } from '../../data';

const PATH = '/spotbase';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale as Locale;
  const t = getSpotbaseCopy(locale);
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

/** No `offers` here: Spotbase has no published price, so the markup states none. */
function structuredData(locale: Locale) {
  const t = getSpotbaseCopy(locale);
  const url = `${SITE_URL}/${locale}${PATH}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': `${url}#software`,
        name: 'Spotbase',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: t.meta.description,
        url,
        inLanguage: LOCALE_TAGS[locale].hreflang,
        publisher: { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'Vectra' },
        featureList: t.features.items.map((item) => item.title),
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

export default function SpotbasePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const site = getCopy(locale);
  const t = getSpotbaseCopy(locale);

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
          <h1 className={s.h1}>
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
            <CourtDemo locale={locale} />
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
          <h2 className={s.h2} data-reveal>
            {t.people.title}
          </h2>
          <ol className={`${s.steps} ${s.people}`}>
            {t.people.items.map((item, index) => (
              <li key={item.who} data-reveal style={{ transitionDelay: `${index * 110}ms` }}>
                <h3>{item.who}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
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

        <section id="demo" className={`${s.band} ${s.ink}`}>
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
              <LeadForm locale={locale} interest="Spotbase" email={COMPANY.email} privacyHref={`/${locale}/legal/privacy`} />
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
