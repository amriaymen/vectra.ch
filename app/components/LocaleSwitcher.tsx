'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { LOCALES, LOCALE_TAGS, type Dictionary, type Locale } from '../data';

/** Swaps the leading locale segment, preserving path and hash. */
function pathFor(pathname: string, target: Locale) {
  const segments = pathname.split('/').filter(Boolean);
  segments[0] = target;
  return `/${segments.join('/')}`;
}

export default function LocaleSwitcher({
  t,
  locale,
  variant = 'header',
}: {
  t: Dictionary;
  locale: Locale;
  variant?: 'header' | 'panel';
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || `/${locale}`;
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!wrapper.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  const href = (target: Locale) =>
    `${pathFor(pathname, target)}${typeof window !== 'undefined' ? window.location.hash : ''}`;

  // In the mobile panel there's room for plain side-by-side links — simpler and
  // one tap instead of two.
  if (variant === 'panel') {
    return (
      <div>
        <p className="mb-3 text-sm text-gray-500">{t.nav.language}</p>
        <div className="flex gap-2">
          {LOCALES.map((option) => (
            <a
              key={option}
              href={href(option)}
              hrefLang={LOCALE_TAGS[option].hreflang}
              aria-current={option === locale ? 'true' : undefined}
              className={`inline-flex min-h-[44px] items-center rounded-md border px-4 text-sm transition-colors ${
                option === locale
                  ? 'border-primary bg-primary text-background'
                  : 'border-line text-gray-300 hover:border-gray-600'
              }`}
            >
              {LOCALE_TAGS[option].label}
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={wrapper} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t.nav.language}
        className="inline-flex min-h-[44px] items-center gap-1.5 px-2 text-gray-300 transition-colors hover:text-white"
      >
        <span aria-hidden="true">{locale.toUpperCase()}</span>
        <svg
          className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t.nav.language}
          className="absolute right-0 top-full z-50 mt-1 min-w-[9rem] overflow-hidden rounded-md border border-line bg-surface py-1"
        >
          {LOCALES.map((option) => (
            <li key={option} role="option" aria-selected={option === locale}>
              <a
                href={href(option)}
                hrefLang={LOCALE_TAGS[option].hreflang}
                className={`flex min-h-[44px] items-center px-4 text-sm transition-colors ${
                  option === locale ? 'text-primary' : 'text-gray-300 hover:bg-surface-hover hover:text-white'
                }`}
              >
                {LOCALE_TAGS[option].label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
