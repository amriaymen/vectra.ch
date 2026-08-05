import type { Metadata } from 'next';
import Link from 'next/link';
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
  COMPANY,
  LOCALES,
  LOCALE_TAGS,
  SERVICES,
  SERVICE_HUB,
  SERVICE_SLUGS,
  SITE_URL,
  getContent,
  hubPath,
  isLocale,
  pathAlternates,
  serviceFromSlug,
  servicePath,
  type Locale,
} from '../../../data';

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    SERVICES.map((service) => ({ locale, slug: SERVICE_SLUGS[locale][service] })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale as Locale;
  const service = serviceFromSlug(locale, params.slug);
  if (!service) return {};

  const t = getContent(locale);
  const copy = t.services[service];

  return {
    title: `${copy.h1} | Vectra`,
    description: copy.intro,
    alternates: {
      canonical: `${SITE_URL}${servicePath(locale, service)}`,
      languages: pathAlternates((l) => servicePath(l, service)),
    },
    openGraph: {
      title: copy.h1,
      description: copy.intro,
      url: `${SITE_URL}${servicePath(locale, service)}`,
      locale: LOCALE_TAGS[locale].og,
      type: 'website',
    },
  };
}

export default function ServicePage({ params }: { params: { locale: string; slug: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const service = serviceFromSlug(locale, params.slug);
  if (!service) notFound();

  const t = getContent(locale);
  const copy = t.services[service];
  const hub = SERVICE_HUB[service];

  /*
   * Cross-cutting services skip the hub rung — but they still hang off
   * Solutions, so the second crumb is unconditional now.
   *
   * It used to branch to a "Services" label pointing at `/{locale}#services`.
   * That was wrong twice over: the anchor was dead (no rendered element owns
   * that id), and there is no services index for a "Services" label to mean.
   */
  const crumbs = [
    { label: t.pages.home, href: `/${locale}` },
    { label: t.pages.solutions, href: `/${locale}/solutions` },
    ...(hub ? [{ label: t.hubs[hub].navLabel, href: hubPath(locale, hub) }] : []),
    { label: copy.h1, href: servicePath(locale, service) },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: copy.h1,
        description: copy.intro,
        serviceType: copy.h1,
        provider: { '@type': 'Organization', name: COMPANY.name, url: SITE_URL },
        areaServed: { '@type': 'Country', name: 'Switzerland' },
        url: `${SITE_URL}${servicePath(locale, service)}`,
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
          {hub && (
            <p className="text-sm uppercase tracking-[0.2em] text-primary">
              {t.hubs[hub].navLabel}
            </p>
          )}
          <h1 className="mt-6 text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {copy.h1}
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-gray-300">{copy.intro}</p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="text-2xl leading-snug md:text-3xl">{t.pages.problemTitle}</h2>
            <p className="mt-6 leading-relaxed text-gray-400">{copy.problem}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="text-2xl leading-snug md:text-3xl">{t.pages.solutionTitle}</h2>
            <p className="mt-6 leading-relaxed text-gray-300">{copy.solution}</p>
          </Reveal>
        </div>

        <Reveal className="mt-16 border-t border-line pt-12">
          <h2 className="text-2xl leading-snug md:text-3xl">{t.pages.included}</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {copy.includes.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed text-gray-300">
                <svg
                  className="mt-1.5 h-4 w-4 shrink-0 fill-primary"
                  viewBox="0 0 18 14"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M17.8132 1.63827C17.4365 0.667034 16.669 0.82034 15.8374 0.985126C15.3407 1.08864 13.1316 1.73527 9.63624 5.42094C8.18573 6.95058 7.22887 8.17006 6.59888 9.10009C6.21404 8.62759 5.77314 8.12208 5.31013 7.65887C3.8862 6.23532 2.29825 5.2577 2.2315 5.21662C1.56513 4.80926 0.695214 5.01887 0.286699 5.68473C-0.1213 6.35058 0.087665 7.22191 0.753001 7.63082C0.76661 7.63939 2.13024 8.48248 3.30825 9.66081C4.50961 10.8623 5.5981 12.4871 5.60881 12.5029C5.87382 12.9013 6.31878 13.1338 6.78689 13.1338C6.86725 13.1338 6.94838 13.1271 7.02913 13.1131C7.5816 13.0171 8.02539 12.604 8.16071 12.0597C8.16412 12.0466 8.72543 10.4953 11.6905 7.36916C14.0788 4.85041 15.6714 4.04989 16.2232 3.82783C16.6521 3.64357 17.1302 3.43789 17.1406 3.43351C17.8604 3.13779 18.0944 2.36359 17.8132 1.63827Z" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        {hub && (
          <div className="mt-12">
            <Link
              href={hubPath(locale, hub)}
              className="group inline-flex min-h-[44px] items-center gap-2 text-primary transition-colors hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 rotate-180 transition-transform duration-200 group-hover:-translate-x-1"
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
              {t.hubs[hub].navLabel}
            </Link>
          </div>
        )}
      </Section>

      <TrustStrip t={t} />
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

      <Faq items={copy.faqs} title={t.faqs.title} id={`faq-${service}`} />
      <CtaBanner t={t} />
      <Footer t={t} locale={locale} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
