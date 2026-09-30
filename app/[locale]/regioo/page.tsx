import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import s from '../../site/site.module.css';
import Motion from '../../site/Motion';
import JobDemo from '../../site/JobDemo';
import Calculator from '../../site/Calculator';
import { SiteFooter, SiteHeader } from '../../site/Shell';
import { REGIOO_PRICE_PER_TECHNICIAN, REGIOO_SIGNUP_URL, getCopy } from '../../site/copy';
import { getRegiooCopy } from '../../site/regioo.copy';
import { TRADES, getTradesCopy, tradePath } from '../../site/trades.copy';
import { COMPANY, LOCALES, LOCALE_TAGS, SITE_URL, isLocale, languageAlternates, type Locale } from '../../data';

const PATH = '/regioo';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale as Locale;
  const t = getRegiooCopy(locale);
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

/** Repeats only what the page shows: the product, its price and the questions. */
function structuredData(locale: Locale) {
  const t = getRegiooCopy(locale);
  const url = `${SITE_URL}/${locale}${PATH}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': `${url}#software`,
        name: 'Regioo',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: t.meta.description,
        url,
        inLanguage: LOCALE_TAGS[locale].hreflang,
        publisher: { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'Vectra' },
        featureList: t.features.items.map((item) => item.title),
        offers: {
          '@type': 'Offer',
          price: REGIOO_PRICE_PER_TECHNICIAN,
          priceCurrency: 'CHF',
          url: REGIOO_SIGNUP_URL,
          description: t.hero.note,
        },
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

function Trial({ label, ink = false }: { label: string; ink?: boolean }) {
  return (
    <a
      className={`${s.btn} ${ink ? s.btnInk : ''}`}
      data-magnetic
      href={REGIOO_SIGNUP_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label} →
    </a>
  );
}

export default function RegiooPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const site = getCopy(locale);
  const t = getRegiooCopy(locale);
  const trades = getTradesCopy(locale);

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
            <Trial label={t.hero.cta} />
            <small>{t.hero.note}</small>
          </div>
        </section>

        <section className={`${s.band} ${s.rule}`}>
          <div data-reveal>
            <h2 className={s.h2}>{t.demo.title}</h2>
            <p className={s.intro}>{t.demo.intro}</p>
          </div>
          <div data-reveal>
            <JobDemo locale={locale} />
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
              <h2 className={s.h2}>{t.privacy.title}</h2>
              <p className={s.intro}>{t.privacy.body}</p>
            </div>
            <div className={s.offer} data-reveal>
              <ul>
                {t.privacy.points.map((point) => (
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
            <div data-reveal>
              <Calculator locale={locale} />
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

        <section className={`${s.band} ${s.rule} ${s.closing}`}>
          <h2 className={s.h2} data-reveal>
            {t.closing.title}
          </h2>
          <div className={s.actions} data-reveal>
            <Trial label={t.hero.cta} />
            <small>{t.hero.note}</small>
          </div>
          <nav className={s.others} aria-label={trades.shared.othersTitle}>
            <h3>{trades.shared.othersTitle}</h3>
            {TRADES.map((trade) => (
              <a key={trade} href={`/${locale}${tradePath(locale, trade)}`}>
                {trades.trades[trade].name} →
              </a>
            ))}
          </nav>
          <a className={s.back} href={`/${locale}`}>
            ← {t.closing.back}
          </a>
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
