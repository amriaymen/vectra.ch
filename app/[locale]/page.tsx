import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import s from '../site/site.module.css';
import Motion from '../site/Motion';
import ChaosScene from '../site/ChaosScene';
import TradePicker from '../site/TradePicker';
import Calculator from '../site/Calculator';
import LeadForm from '../site/LeadForm';
import { SiteFooter, SiteHeader } from '../site/Shell';
import { REGIOO_PRICE_PER_TECHNICIAN, REGIOO_SIGNUP_URL, getCopy } from '../site/copy';
import ScopeForm from '../components/ScopeForm';
import {
  CALENDLY_URL,
  COMPANY,
  LOCALES,
  LOCALE_TAGS,
  SITE_URL,
  getContent,
  isLocale,
  languageAlternates,
  type Locale,
} from '../data';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale as Locale;
  const copy = getCopy(locale);
  const url = `${SITE_URL}/${locale}`;

  return {
    title: copy.meta.title,
    description: copy.meta.description,
    alternates: { canonical: url, languages: languageAlternates() },
    openGraph: {
      title: copy.meta.title,
      description: copy.meta.description,
      url,
      siteName: COMPANY.name,
      locale: LOCALE_TAGS[locale].og,
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => LOCALE_TAGS[l].og),
      type: 'website',
    },
  };
}

/**
 * What search engines and AI assistants read. Every value repeats something
 * visible on the page, so the markup can never claim more than the page does.
 */
function structuredData(locale: Locale) {
  const copy = getCopy(locale);
  const url = `${SITE_URL}/${locale}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Vectra',
        alternateName: 'Vectrastudio',
        legalName: COMPANY.legalName,
        identifier: COMPANY.uid,
        url,
        email: COMPANY.email,
        telephone: COMPANY.phoneSwiss,
        parentOrganization: { '@type': 'Organization', name: COMPANY.groupName },
        address: {
          '@type': 'PostalAddress',
          streetAddress: COMPANY.streetAddress,
          postalCode: COMPANY.postalCode,
          addressLocality: COMPANY.addressLocality,
          addressRegion: COMPANY.addressRegion,
          addressCountry: COMPANY.addressCountry,
        },
        areaServed: copy.meta.area,
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Regioo',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: copy.meta.regioo,
        url: REGIOO_SIGNUP_URL,
        publisher: { '@id': `${SITE_URL}/#organization` },
        offers: {
          '@type': 'Offer',
          price: REGIOO_PRICE_PER_TECHNICIAN,
          priceCurrency: 'CHF',
          description: copy.meta.regiooOffer,
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        inLanguage: LOCALE_TAGS[locale].hreflang,
        mainEntity: copy.faq.items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };
}

export default function Home({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const copy = getCopy(locale);

  return (
    <div className={s.page}>
      <Motion />
      <SiteHeader locale={locale} copy={copy} />

      <main id="top">
        <section className={s.hero} data-glow>
          <p className={s.kicker}>
            <span className={s.dot} />
            {copy.hero.kicker}
          </p>
          <h1 className={s.h1}>
            <span className={s.rise}>{copy.hero.line1}</span>
            <span className={s.rise}>
              <em>{copy.hero.line2}</em>
            </span>
          </h1>
          <p className={s.lead}>{copy.hero.body}</p>
          <div className={s.actions}>
            <a className={s.btn} data-magnetic href="#metier">
              {copy.hero.primary} →
            </a>
            <small>{copy.hero.note}</small>
          </div>
        </section>

        <div className={s.ticker} aria-hidden="true">
          <div>
            {[...copy.trades, ...copy.trades, ...copy.trades, ...copy.trades].map((trade, index) => (
              <span key={index}>{trade} ✳</span>
            ))}
          </div>
        </div>

        <ChaosScene locale={locale} />

        <section id="metier" className={s.band}>
          <div data-reveal>
            <h2 className={s.h2}>{copy.picker.title}</h2>
            <p className={s.intro}>{copy.picker.intro}</p>
          </div>
          <div data-reveal>
            <TradePicker locale={locale} estimateHref="#scope" />
          </div>
        </section>

        <section className={`${s.band} ${s.ink}`}>
          <div className={s.split}>
            <div data-reveal>
              <h2 className={s.h2}>{copy.calc.title}</h2>
              <p className={s.intro}>{copy.calc.intro}</p>
            </div>
            <div data-reveal>
              <Calculator locale={locale} />
            </div>
          </div>
        </section>

        <section className={s.band}>
          <h2 className={s.h2} data-reveal>
            {copy.steps.title}
          </h2>
          <ol className={s.steps}>
            {copy.steps.items.map((step, index) => (
              <li key={step.n} data-reveal style={{ transitionDelay: `${index * 110}ms` }}>
                <b>{step.n}</b>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="sur-mesure" className={`${s.band} ${s.hot}`}>
          <div className={s.split}>
            <div data-reveal>
              <p className={s.kicker}>{copy.custom.kicker}</p>
              <h2 className={s.h2}>{copy.custom.title}</h2>
              <p className={s.intro}>{copy.custom.body}</p>
            </div>
            <div className={s.offer} data-reveal>
              <p className={s.price}>
                <b>{copy.custom.price}</b>
              </p>
              <ul>
                {copy.custom.facts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
              <div className={s.pickerAction}>
                <a className={`${s.btn} ${s.btnInk}`} data-magnetic href="#scope">
                  {copy.custom.cta} →
                </a>
                <small>{copy.custom.note}</small>
              </div>
            </div>
          </div>
        </section>

        {/* The instant estimate is older code written for the dark theme; `legacy` re-skins it. */}
        <div className={s.legacy}>
          <ScopeForm t={getContent(locale)} locale={locale} />
        </div>

        <section id="design" className={s.band}>
          <div data-reveal>
            <p className={s.kicker}>{copy.design.kicker}</p>
            <h2 className={s.h2}>{copy.design.title}</h2>
            <p className={s.intro}>{copy.design.body}</p>
          </div>
          <ul className={s.plans}>
            {copy.design.plans.map((plan, index) => (
              <li
                key={plan.id}
                className={plan.id === 'build' ? s.planOn : undefined}
                data-reveal
                style={{ transitionDelay: `${index * 110}ms` }}
              >
                {plan.id === 'build' && <small>{copy.design.recommended}</small>}
                <h3>{plan.name}</h3>
                <p className={s.price}>
                  <b>{plan.price}</b>
                  <span>{copy.design.perMonth}</span>
                </p>
                <ul>
                  {plan.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <a
                  className={`${s.btn} ${plan.id === 'build' ? '' : s.btnGhost}`}
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {copy.design.cta} →
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section id="questions" className={`${s.band} ${s.rule}`}>
          <h2 className={s.h2} data-reveal>
            {copy.faq.title}
          </h2>
          <div className={s.faq} data-reveal>
            {copy.faq.items.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="contact" className={`${s.band} ${s.ink}`}>
          <div className={s.split}>
            <div data-reveal>
              <h2 className={s.h2}>{copy.contact.title}</h2>
              <p className={s.intro}>{copy.contact.body}</p>
              <p className={s.direct}>
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
                <a href={`tel:${COMPANY.phoneSwiss.replace(/\s/g, '')}`}>{COMPANY.phoneSwiss}</a>
              </p>
            </div>
            <div data-reveal>
              <LeadForm locale={locale} email={COMPANY.email} privacyHref={`/${locale}/legal/privacy`} />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} copy={copy} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(locale)) }}
      />
    </div>
  );
}
