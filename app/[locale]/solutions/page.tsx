import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '../../components/Header';
import Section from '../../components/Section';
import Reveal from '../../components/Reveal';
import Breadcrumbs from '../../components/Breadcrumbs';
import CtaBanner from '../../components/CtaBanner';
import Footer from '../../components/Footer';
import {
  HUBS,
  LOCALES,
  LOCALE_TAGS,
  SITE_URL,
  getContent,
  hubPath,
  isLocale,
  languageAlternates,
  type Locale,
} from '../../data';

/*
 * The parent every hub page already claimed but did not have.
 *
 * Two things were broken without it. The "Solutions" breadcrumb rung on every
 * hub and service page pointed at `/{locale}#services`, an id owned by a
 * component the homepage imports but never renders — so the middle of the trail
 * went nowhere. And `brand-and-communication` was a live, indexed page with no
 * inbound link anywhere in the UI, because the header deliberately carries only
 * three sectors and WhoWeServe's cards are not links.
 *
 * This iterates HUBS rather than a hand-written list, so a fifth sector appears
 * here the moment it exists.
 */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale as Locale;
  const t = getContent(locale);
  const url = `${SITE_URL}/${locale}/solutions`;

  return {
    title: `${t.pages.allSolutions} | Vectra`,
    description: t.pages.solutionsIntro,
    alternates: {
      canonical: url,
      // languageAlternates, not pathAlternates: the `/solutions` segment is the
      // same in all three locales — only the child hub slug is localised.
      languages: languageAlternates('/solutions'),
    },
    openGraph: {
      title: t.pages.allSolutions,
      description: t.pages.solutionsIntro,
      url,
      locale: LOCALE_TAGS[locale].og,
      type: 'website',
    },
  };
}

export default function SolutionsIndexPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const t = getContent(locale);

  const crumbs = [
    { label: t.pages.home, href: `/${locale}` },
    { label: t.pages.allSolutions, href: `/${locale}/solutions` },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: t.pages.allSolutions,
        description: t.pages.solutionsIntro,
        inLanguage: LOCALE_TAGS[locale].hreflang,
        url: `${SITE_URL}/${locale}/solutions`,
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: HUBS.map((hub, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: t.hubs[hub].navLabel,
            url: `${SITE_URL}${hubPath(locale, hub)}`,
          })),
        },
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
    ],
  };

  return (
    // `page-shell` is not decorative: MobileNav looks it up by id to apply
    // `inert` while its panel is open.
    <div id="page-shell" className="isolate bg-background text-white">
      <Header t={t} locale={locale} />

      {/* seam={false}: pt-4/md:pt-6 beats the padding prop, leaving a 24px gutter. */}
      <Section as="main" seam={false} innerClassName="pt-4 pb-16 md:pt-6 md:pb-20">
        <Breadcrumbs items={crumbs} />

        <div className="mt-8 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-primary">{t.pages.solutions}</p>
          <h1 className="mt-6 text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {t.pages.allSolutions}
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-gray-300">{t.pages.solutionsIntro}</p>
        </div>

        <ul className="mt-16 grid gap-6 md:grid-cols-2 lg:gap-8">
          {HUBS.map((hub, index) => (
            <Reveal as="li" key={hub} delay={index * 60}>
              <Link
                href={hubPath(locale, hub)}
                className="group flex h-full flex-col border border-line bg-surface p-6 transition-colors hover:border-primary/50 md:p-8"
              >
                <h2 className="text-xl leading-snug">{t.hubs[hub].navLabel}</h2>
                <p className="mt-3 flex-1 leading-relaxed text-gray-400">{t.hubs[hub].navDetail}</p>
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
              </Link>
            </Reveal>
          ))}
        </ul>
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
