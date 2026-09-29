import type { MetadataRoute } from 'next';
import { DEFAULT_LOCALE, LOCALES, LOCALE_TAGS, SITE_URL, type Locale } from './data/config';
import { TRADES, tradePath } from './site/trades.copy';

/** One page, with its address in each language. */
type Page = { paths: Record<Locale, string>; priority: number };

const same = (path: string) => Object.fromEntries(LOCALES.map((l) => [l, path])) as Record<Locale, string>;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: Page[] = [
    { paths: same(''), priority: 1 },
    { paths: same('/regioo'), priority: 0.9 },
    { paths: same('/spotbase'), priority: 0.9 },
    // Trade pages have a translated address, so each language gets its own.
    ...TRADES.map((trade) => ({
      paths: Object.fromEntries(LOCALES.map((l) => [l, tradePath(l, trade)])) as Record<Locale, string>,
      priority: 0.8,
    })),
  ];

  return pages.flatMap(({ paths, priority }) => {
    const languages: Record<string, string> = {};
    for (const l of LOCALES) languages[LOCALE_TAGS[l].hreflang] = `${SITE_URL}/${l}${paths[l]}`;
    languages['x-default'] = `${SITE_URL}/${DEFAULT_LOCALE}${paths[DEFAULT_LOCALE]}`;

    return LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}${paths[locale]}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority,
      alternates: { languages },
    }));
  });
}
