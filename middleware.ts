import { NextResponse, type NextRequest } from 'next/server';
import { DEFAULT_LOCALE, LOCALES } from './app/data/config';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  // French is Vectra's primary market language. Other locales remain available
  // through their explicit URLs and the language switcher.
  url.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Everything except API routes, Next internals, static assets and the
  // metadata routes (robots/sitemap must stay locale-less).
  matcher: ['/((?!api|_next|assets|fonts|robots\\.txt|sitemap\\.xml|favicon\\.ico).*)'],
};
