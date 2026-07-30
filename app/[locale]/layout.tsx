import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import '../globals.css';
import {
  PRODUCTS,
  COMPANY,
  LOCALES,
  LOCALE_TAGS,
  SERVICE_AREAS,
  SITE_URL,
  getContent,
  isLocale,
  languageAlternates,
  type Locale,
} from '../data';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#121519',
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale as Locale;
  const t = getContent(locale);
  const tags = LOCALE_TAGS[locale];

  return {
    metadataBase: new URL(SITE_URL),
    title: t.meta.title,
    description: t.meta.description,
    keywords: t.meta.keywords,
    authors: [{ name: COMPANY.name }],
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: languageAlternates(),
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `${SITE_URL}/${locale}`,
      siteName: COMPANY.name,
      images: [{ url: '/assets/6.webp', width: 1200, height: 630, alt: t.meta.ogAlt }],
      locale: tags.og,
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => LOCALE_TAGS[l].og),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.title,
      description: t.meta.description,
      images: ['/assets/6.webp'],
    },
  };
}

/** Address and telephone are omitted entirely while COMPANY fields are blank. */
function structuredData(locale: Locale) {
  const t = getContent(locale);
  const hasAddress = Boolean(COMPANY.streetAddress && COMPANY.addressLocality);

  const organisation = {
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    name: COMPANY.name,
    ...(COMPANY.legalName ? { legalName: COMPANY.legalName } : {}),
    url: `${SITE_URL}/${locale}`,
    description: t.meta.description,
    email: COMPANY.email,
    ...(COMPANY.phoneSwiss ? { telephone: COMPANY.phoneSwiss } : {}),
    ...(hasAddress
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: COMPANY.streetAddress,
            postalCode: COMPANY.postalCode,
            addressLocality: COMPANY.addressLocality,
            addressCountry: COMPANY.addressCountry,
          },
        }
      : {}),
    areaServed: [
      { '@type': 'Country', name: 'Switzerland' },
      ...SERVICE_AREAS.map((city) => ({ '@type': 'City', name: city })),
    ],
    knowsLanguage: ['fr', 'de', 'en'],
    sameAs: COMPANY.social,
    serviceType: [
      'School and institution management software',
      'HR, time tracking and payroll systems',
      'Booking and facility management software',
      'Web and mobile application development',
      'Brand identity and motion design',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: t.products.title,
      itemListElement: PRODUCTS.map((study) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'SoftwareApplication',
          name: study.name,
          applicationCategory: 'BusinessApplication',
          url: `${SITE_URL}/${locale}/products/${study.slug}`,
        },
      })),
    },
  };

  // FAQPage is NOT emitted here — it belongs only on the page that actually
  // shows the FAQs, otherwise every case-study URL repeats the same FAQ markup.
  return { '@context': 'https://schema.org', '@graph': [organisation] };
}

import BackToTop from '../components/BackToTop';

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;

  return (
    // suppressHydrationWarning: the inline script below adds `reveal-ready` to
    // <html> before React hydrates, so the server and client className differ by
    // design. Without this, the mismatch warning can abort hydration for the
    // subtree and no client component below would run.
    <html lang={LOCALE_TAGS[locale].html} className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-background font-sans text-white antialiased selection:bg-primary selection:text-background">
        {/*
          Gates the scroll-reveal hidden state. Runs before content paints, so
          there is no flash — and if JS is unavailable the class is never added
          and every section stays visible. See globals.css.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('reveal-ready')",
          }}
        />
        {children}
        <BackToTop />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(locale)) }}
        />
      </body>
    </html>
  );
}
