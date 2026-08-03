import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '../../../components/Header';
import Section from '../../../components/Section';
import Reveal from '../../../components/Reveal';
import Breadcrumbs from '../../../components/Breadcrumbs';
import TrustStrip from '../../../components/TrustStrip';
import Testimonials from '../../../components/Testimonials';
import Process from '../../../components/Process';
import Faq from '../../../components/Faq';
import CtaBanner from '../../../components/CtaBanner';
import Footer from '../../../components/Footer';
import {
  PRODUCTS,
  HUBS,
  HUB_DOMAINS,
  HUB_SLUGS,
  LOCALES,
  LOCALE_TAGS,
  SITE_URL,
  getContent,
  hubFromSlug,
  hubPath,
  isLocale,
  pathAlternates,
  servicePath,
  servicesForHub,
  type Locale,
} from '../../../data';

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    HUBS.map((hub) => ({ locale, hub: HUB_SLUGS[locale][hub] })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; hub: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale as Locale;
  const hub = hubFromSlug(locale, params.hub);
  if (!hub) return {};

  const t = getContent(locale);
  const copy = t.hubs[hub];

  return {
    title: `${copy.h1} | Vectra`,
    description: copy.intro,
    alternates: {
      canonical: `${SITE_URL}${hubPath(locale, hub)}`,
      languages: pathAlternates((l) => hubPath(l, hub)),
    },
    openGraph: {
      title: copy.h1,
      description: copy.intro,
      url: `${SITE_URL}${hubPath(locale, hub)}`,
      locale: LOCALE_TAGS[locale].og,
      type: 'website',
    },
  };
}

export default function HubPage({ params }: { params: { locale: string; hub: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const hub = hubFromSlug(locale, params.hub);
  if (!hub) notFound();

  const t = getContent(locale);
  const copy = t.hubs[hub];
  const services = servicesForHub(hub);
  const related = PRODUCTS.filter((study) => HUB_DOMAINS[hub].includes(study.domain));

  const crumbs = [
    { label: t.pages.home, href: `/${locale}` },
    { label: t.pages.solutions, href: `/${locale}#services` },
    { label: copy.navLabel, href: hubPath(locale, hub) },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: copy.h1,
        description: copy.intro,
        inLanguage: LOCALE_TAGS[locale].hreflang,
        url: `${SITE_URL}${hubPath(locale, hub)}`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.label,
          item: `${SITE_URL}${crumb.href}`,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: copy.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };

  return (
    <div id="page-shell" className="isolate bg-background text-white">
      <Header t={t} locale={locale} />

      <Section as="main" innerClassName="pt-4 pb-16 md:pt-6 md:pb-20">
        <Breadcrumbs items={crumbs} />

        <div className="mt-8 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-primary">{copy.kicker}</p>
          <h1 className="mt-6 text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {copy.h1}
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-gray-300">{copy.intro}</p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="text-2xl leading-snug md:text-3xl">{t.pages.problemTitle}</h2>
            <ul className="mt-6 grid gap-4">
              {copy.problem.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-gray-400">
                  <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-gray-600" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="text-2xl leading-snug md:text-3xl">{t.pages.solutionTitle}</h2>
            <ul className="mt-6 grid gap-4">
              {copy.solution.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-gray-300">
                  <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <TrustStrip t={t} />

      <Section>
        <Reveal>
          <h2 className="text-2xl leading-snug md:text-3xl">{t.pages.servicesInArea}</h2>
        </Reveal>
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:gap-8">
          {services.map((service, index) => (
            <Reveal as="li" key={service} delay={index * 60}>
              <a
                href={servicePath(locale, service)}
                className="group flex h-full flex-col border border-line bg-surface p-6 transition-colors hover:border-primary/50 md:p-8"
              >
                <h3 className="text-xl leading-snug">{t.services[service].h1}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-gray-400">
                  {t.services[service].intro}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm text-primary">
                  {t.products.readMore}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>

        {related.length > 0 && (
          <div className="mt-16 border-t border-line pt-12">
            <Reveal>
              <h2 className="text-2xl leading-snug md:text-3xl">{t.pages.relatedWork}</h2>
            </Reveal>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {related.map((study) => {
                const studyCopy = t.products.items[study.slug as keyof typeof t.products.items];
                return (
                  <li key={study.slug}>
                    <a
                      href={`/${locale}/products/${study.slug}`}
                      className="flex items-baseline justify-between gap-4 rounded-md border border-line px-5 py-4 transition-colors hover:border-primary/50"
                    >
                      <span>
                        <span className="block text-white">{study.name}</span>
                        <span className="mt-0.5 block text-sm text-gray-500">
                          {studyCopy.tagline}
                        </span>
                      </span>
                      <span aria-hidden="true" className="text-primary">
                        →
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </Section>

      <Testimonials t={t} />
      <Process t={t} />

      <Section tone="light">
        <div className="max-w-2xl">
          <h2 className="text-2xl leading-snug md:text-3xl">{t.pages.pricingTitle}</h2>
          <p className="mt-4 leading-relaxed text-gray-600">{t.pages.pricingBody}</p>
          <a
            href={`/${locale}#scope`}
            className="mt-8 inline-flex min-h-[48px] items-center rounded-md bg-background px-8 font-medium text-white transition-colors hover:bg-surface"
          >
            {t.pages.pricingCta}
          </a>
        </div>
      </Section>

      <Faq items={copy.faqs} title={t.faqs.title} id={`faq-${hub}`} />
      <CtaBanner t={t} />
      <Footer t={t} locale={locale} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
