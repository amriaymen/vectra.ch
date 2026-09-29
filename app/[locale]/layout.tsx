import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import '../globals.css';
import { COMPANY, LOCALES, LOCALE_TAGS, SITE_URL, isLocale, type Locale } from '../data';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f4f0e8',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  authors: [{ name: COMPANY.name }],
  icons: {
    icon: [{ url: '/assets/logo.svg', type: 'image/svg+xml' }],
    shortcut: '/assets/logo.svg',
    apple: '/assets/logo.svg',
  },
};

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
    <html lang={LOCALE_TAGS[locale].html} className="scroll-smooth">
      <head>
        {/*
          The Medium face now renders the logo wordmark, so it is on the critical
          path. Without this preload, `font-display: swap` shows the brand name
          in a fallback system font on every cold load, then swaps — a visible
          flash on the one word that must not look wrong.
        */}
        <link
          rel="preload"
          as="font"
          type="font/woff"
          href="/fonts/TT%20Firs%20Neue%20Trial%20Medium.woff"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
