import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import s from '../../../site/site.module.css';
import Motion from '../../../site/Motion';
import JobDemo from '../../../site/JobDemo';
import Calculator from '../../../site/Calculator';
import { SiteFooter, SiteHeader } from '../../../site/Shell';
import { REGIOO_PRICE_PER_TECHNICIAN, REGIOO_SIGNUP_URL, getCopy } from '../../../site/copy';
import { getRegiooCopy } from '../../../site/regioo.copy';
import { TRADES, TRADE_SLUGS, getTradesCopy, tradeFromSlug, tradePath, type TradeKey } from '../../../site/trades.copy';
import { COMPANY, DEFAULT_LOCALE, LOCALES, LOCALE_TAGS, SITE_URL, isLocale, type Locale } from '../../../data';

type Params = { locale: string; trade: string };

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => TRADES.map((trade) => ({ locale, trade: TRADE_SLUGS[locale][trade] })));
}

// Only the slugs above exist; anything else is a 404, not an empty page.
export const dynamicParams = false;

/** The same page in each language: the slug differs, so one shared path will not do. */
function pathsFor(trade: TradeKey) {
  return Object.fromEntries(LOCALES.map((locale) => [locale, tradePath(locale, trade)])) as Record<Locale, string>;
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale as Locale;
  const trade = tradeFromSlug(locale, params.trade);
  if (!trade) return {};
  const t = getTradesCopy(locale).trades[trade];
  const paths = pathsFor(trade);
  const url = `${SITE_URL}/${locale}${paths[locale]}`;

  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[LOCALE_TAGS[l].hreflang] = `${SITE_URL}/${l}${paths[l]}`;
  languages['x-default'] = `${SITE_URL}/${DEFAULT_LOCALE}${paths[DEFAULT_LOCALE]}`;

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: url, languages },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      url,
      siteName: COMPANY.name,
      locale: LOCALE_TAGS[locale].og,
      type: 'website',
    },
  };
}

export default function TradePage({ params }: { params: Params }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const trade = tradeFromSlug(locale, params.trade);
  if (!trade) notFound();

  const site = getCopy(locale);
  const regioo = getRegiooCopy(locale);
  const { shared, trades } = getTradesCopy(locale);
  const t = trades[trade];
  const paths = pathsFor(trade);
  const url = `${SITE_URL}/${locale}${paths[locale]}`;
  // Trade questions first, then the three every buyer asks: price, trial, tracking.
  const faq = [...t.faq, ...regioo.faq.items.slice(0, 3)];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: shared.breadcrumbHome, item: `${SITE_URL}/${locale}` },
          { '@type': 'ListItem', position: 2, name: 'Regioo', item: `${SITE_URL}/${locale}/regioo` },
          { '@type': 'ListItem', position: 3, name: t.name, item: url },
        ],
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Regioo',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: t.metaDescription,
        url,
        inLanguage: LOCALE_TAGS[locale].hreflang,
        publisher: { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'Vectra' },
        offers: {
          '@type': 'Offer',
          price: REGIOO_PRICE_PER_TECHNICIAN,
          priceCurrency: 'CHF',
          url: REGIOO_SIGNUP_URL,
          description: regioo.hero.note,
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        inLanguage: LOCALE_TAGS[locale].hreflang,
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };

  const trial = (ink = false) => (
    <a
      className={`${s.btn} ${ink ? s.btnInk : ''}`}
      data-magnetic
      href={REGIOO_SIGNUP_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      {regioo.hero.cta} →
    </a>
  );

  return (
    <div className={s.page}>
      <Motion />
      <SiteHeader locale={locale} copy={site} path={paths} />

      <main id="top">
        <section className={s.hero} data-glow>
          <p className={s.kicker}>
            <span className={s.dot} />
            {t.kicker}
          </p>
          <h1 className={`${s.h1} ${s.h1Long}`}>
            <span className={s.rise}>{t.line1}</span>
            <span className={s.rise}>
              <em>{t.line2}</em>
            </span>
          </h1>
          <p className={s.lead}>{t.body}</p>
          <div className={s.actions}>
            {trial()}
            <small>{regioo.hero.note}</small>
          </div>
        </section>

        <section className={`${s.band} ${s.ink}`}>
          <h2 className={s.h2} data-reveal>
            {shared.painsTitle}
          </h2>
          <ol className={`${s.steps} ${s.pains}`}>
            {t.pains.map((pain, index) => (
              <li key={pain.title} data-reveal style={{ transitionDelay: `${index * 110}ms` }}>
                <h3>{pain.title}</h3>
                <p>{pain.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={s.band}>
          <div data-reveal>
            <h2 className={s.h2}>{shared.demoTitle}</h2>
            <p className={s.intro}>{shared.demoIntro}</p>
          </div>
          <div data-reveal>
            <JobDemo locale={locale} job={t.job} />
          </div>
        </section>

        <section className={`${s.band} ${s.hot}`}>
          <div className={s.split}>
            <div data-reveal>
              <h2 className={s.h2}>{shared.proofsTitle}</h2>
              <p className={s.intro}>{shared.proofsBody}</p>
            </div>
            <div className={s.offer} data-reveal>
              <ul>
                {t.proofs.map((proof) => (
                  <li key={proof}>{proof}</li>
                ))}
              </ul>
              <p className={s.offerNote}>{shared.proofsNote}</p>
            </div>
          </div>
        </section>

        <section className={s.band}>
          <h2 className={s.h2} data-reveal>
            {regioo.features.title}
          </h2>
          <ul className={s.features}>
            {regioo.features.items.map((item, index) => (
              <li key={item.title} data-reveal style={{ transitionDelay: `${(index % 3) * 100}ms` }}>
                <b>{String(index + 1).padStart(2, '0')}</b>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
          <a className={s.back} href={`/${locale}/regioo`}>
            {shared.allRegioo} →
          </a>
        </section>

        <section id="prix" className={`${s.band} ${s.ink}`}>
          <div className={s.split}>
            <div data-reveal>
              <h2 className={s.h2}>{regioo.price.title}</h2>
              <p className={s.intro}>{regioo.price.intro}</p>
              <ul className={s.terms}>
                {regioo.price.terms.map((term) => (
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
            {regioo.faq.title}
          </h2>
          <div className={s.faq} data-reveal>
            {faq.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={`${s.band} ${s.rule}`}>
          <h2 className={s.h2} data-reveal>
            {regioo.closing.title}
          </h2>
          <div className={s.actions} data-reveal>
            {trial()}
            <small>{regioo.hero.note}</small>
          </div>

          <nav className={s.others} aria-label={shared.othersTitle}>
            <h3>{shared.othersTitle}</h3>
            {TRADES.filter((other) => other !== trade).map((other) => (
              <a key={other} href={`/${locale}${tradePath(locale, other)}`}>
                {trades[other].name} →
              </a>
            ))}
          </nav>
        </section>
      </main>

      <SiteFooter locale={locale} copy={site} path={paths} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </div>
  );
}
