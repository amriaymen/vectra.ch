import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '../../../components/Header';
import ProductMedia from '../../../components/ProductMedia';
import Section from '../../../components/Section';
import CtaBanner from '../../../components/CtaBanner';
import Footer from '../../../components/Footer';
import {
  DEMO_URL,
  PRODUCTS,
  LOCALES,
  LOCALE_TAGS,
  SITE_URL,
  getContent,
  isLocale,
  languageAlternates,
  type Locale,
} from '../../../data';

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => PRODUCTS.map((study) => ({ locale, slug: study.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale as Locale;
  const study = PRODUCTS.find((s) => s.slug === params.slug);
  if (!study) return {};

  const t = getContent(locale);
  const copy = t.products.items[study.slug as keyof typeof t.products.items];
  const title = `${study.name} — ${copy.tagline} | Vectra`;
  const languages = languageAlternates(`/products/${study.slug}`);

  return {
    title,
    description: copy.summary,
    alternates: { canonical: `${SITE_URL}/${locale}/products/${study.slug}`, languages },
    openGraph: {
      title,
      description: copy.summary,
      url: `${SITE_URL}/${locale}/products/${study.slug}`,
      locale: LOCALE_TAGS[locale].og,
      type: 'article',
      ...(study.image ? { images: [{ url: study.image, alt: study.name }] } : {}),
    },
  };
}

export default function CaseStudyPage({ params }: { params: { locale: string; slug: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const study = PRODUCTS.find((s) => s.slug === params.slug);
  if (!study) notFound();

  const t = getContent(locale);
  const copy = t.products.items[study.slug as keyof typeof t.products.items];

  // SoftwareApplication, not CreativeWork: these are licensed products, and it
  // is the type eligible for richer results.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: study.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: copy.summary,
    inLanguage: LOCALE_TAGS[locale].hreflang,
    url: `${SITE_URL}/${locale}/products/${study.slug}`,
    ...(study.image ? { image: `${SITE_URL}${study.image}` } : {}),
    author: { '@type': 'Organization', name: 'Vectra', url: SITE_URL },
    featureList: copy.modules,
    keywords: [...copy.modules, ...study.tech].join(', '),
    // Only a sellable product carries an offer — a `running` system must not
    // look purchasable in search results either.
    ...(study.status === 'available'
      ? {
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            priceCurrency: 'CHF',
          },
        }
      : {}),
  };

  return (
    <div id="page-shell" className="isolate bg-background text-white">
      <Header t={t} locale={locale} />

      <Section as="main" innerClassName="pt-8 pb-16 md:pt-12 md:pb-20">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-primary">
            {t.products.domains[study.domain]}
          </p>
          <h1 className="mt-6 text-4xl leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            {study.name}
          </h1>
          <p className="mt-4 text-xl text-gray-400">{copy.tagline}</p>
          <p className="mt-8 text-lg leading-relaxed text-gray-300">{copy.summary}</p>

          {/* Demo CTA only where a demo actually exists. */}
          {study.status === 'available' && (
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-[48px] items-center rounded-md bg-primary px-8 font-medium text-background transition-colors hover:bg-primary-hover"
            >
              {t.products.demoCta}
            </a>
          )}
        </div>

        {study.image && (
          <div className="relative mt-12 h-64 w-full overflow-hidden border border-line md:h-[28rem]">
            <ProductMedia
              poster={study.image}
              video={study.video}
              alt={`${study.name} — ${copy.tagline}`}
              priority
              sizes="(min-width: 1024px) 1152px, 100vw"
            />
          </div>
        )}

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
          <div className="grid gap-8">
            <div>
              <h2 className="text-sm uppercase tracking-[0.15em] text-gray-500">
                {t.products.forWhoLabel}
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-gray-300">{copy.forWho}</p>
            </div>
          </div>

          <aside className="grid content-start gap-8 border border-line bg-surface p-6 md:p-8">
            <div>
              <h2 className="text-sm uppercase tracking-[0.15em] text-gray-500">
                {t.products.modulesLabel}
              </h2>
              <ul className="mt-3 grid gap-2">
                {copy.modules.map((module) => (
                  <li key={module} className="flex gap-3 text-sm leading-relaxed text-gray-300">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"
                    />
                    {module}
                  </li>
                ))}
              </ul>
            </div>

            {copy.scale && (
              <div>
                <h2 className="text-sm uppercase tracking-[0.15em] text-gray-500">
                  {t.products.scaleLabel}
                </h2>
                <p className="mt-2 text-gray-300">{copy.scale}</p>
              </div>
            )}

            <div>
              <h2 className="text-sm uppercase tracking-[0.15em] text-gray-500">
                {t.products.stackLabel}
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {study.tech.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-surface-hover px-3 py-1 text-xs text-gray-400"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {copy.outcome && <p className="font-medium text-primary">{copy.outcome}</p>}
          </aside>
        </div>

        <div className="mt-16 border-t border-line pt-10">
          <a
            href={`/${locale}#work`}
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
            {t.products.title}
          </a>
        </div>
      </Section>

      <CtaBanner t={t} />
      <Footer t={t} locale={locale} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
