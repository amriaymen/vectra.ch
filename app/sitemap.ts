import type { MetadataRoute } from 'next';
import {
  PRODUCTS,
  HUBS,
  LOCALES,
  LOCALE_TAGS,
  SERVICES,
  SITE_URL,
  hubPath,
  languageAlternates,
  servicePath,
} from './data/config';

/** Alternates for entities whose slug differs per locale. */
function alternatesFor(build: (locale: (typeof LOCALES)[number]) => string) {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[LOCALE_TAGS[locale].hreflang] = `${SITE_URL}${build(locale)}`;
  }
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home = LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 1,
    alternates: { languages: languageAlternates('') },
  }));

  // Locale-invariant segment, so languageAlternates rather than alternatesFor.
  const solutionsIndex = LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}/solutions`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
    alternates: { languages: languageAlternates('/solutions') },
  }));

  const hubs = LOCALES.flatMap((locale) =>
    HUBS.map((hub) => ({
      url: `${SITE_URL}${hubPath(locale, hub)}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
      alternates: alternatesFor((l) => hubPath(l, hub)),
    })),
  );

  const services = LOCALES.flatMap((locale) =>
    SERVICES.map((service) => ({
      url: `${SITE_URL}${servicePath(locale, service)}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: alternatesFor((l) => servicePath(l, service)),
    })),
  );

  const work = LOCALES.flatMap((locale) =>
    PRODUCTS.map((study) => ({
      url: `${SITE_URL}/${locale}/products/${study.slug}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
      alternates: { languages: languageAlternates(`/products/${study.slug}`) },
    })),
  );

  return [...home, ...solutionsIndex, ...hubs, ...services, ...work];
}
