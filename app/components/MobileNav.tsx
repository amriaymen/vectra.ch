'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import LocaleSwitcher from './LocaleSwitcher';
import type { SolutionsMenuModel } from '../lib/nav';
import { COMPANY, type Dictionary, type Locale } from '../data';

export default function MobileNav({
  t,
  locale,
  links,
  solutions,
}: {
  t: Dictionary;
  locale: Locale;
  links: { href: string; label: string }[];
  /** Same model the desktop dropdown renders, so the two cannot drift. */
  solutions: SolutionsMenuModel;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  // Swiss number only — see Footer.tsx for why the international one is hidden.
  const phone: string = COMPANY.phoneSwiss;

  useEffect(() => setMounted(true), []);

  /** True once the panel has been opened, so we only steal focus back after a real open. */
  const restoreFocus = useRef(false);

  // Scroll lock, Escape to close, and `inert` on the rest of the page so focus
  // and screen readers stay inside the panel without a hand-rolled trap.
  useEffect(() => {
    const root = document.documentElement;
    const shell = document.getElementById('page-shell');

    if (open) {
      restoreFocus.current = true;
      root.style.overflow = 'hidden';
      shell?.setAttribute('inert', '');
      // The panel stays mounted off-screen when closed, so it must be inert
      // while hidden or keyboard users can Tab into invisible links.
      panelRef.current?.removeAttribute('inert');
      closeRef.current?.focus();
    } else {
      root.style.overflow = '';
      shell?.removeAttribute('inert');
      panelRef.current?.setAttribute('inert', '');
      // Focus must be restored AFTER the shell's `inert` is removed — the toggle
      // lives inside the shell, and .focus() on an inert subtree is a no-op.
      if (restoreFocus.current) {
        restoreFocus.current = false;
        toggleRef.current?.focus();
      }
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      root.style.overflow = '';
      shell?.removeAttribute('inert');
    };
    // `mounted` matters: the panel is portalled, so panelRef is still null on
    // the first run and the closed-state `inert` would never be applied.
  }, [open, mounted]);

  const close = () => setOpen(false);

  const panel = (
    <>
      {/* Backdrop */}
      <div
        onClick={close}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        id="mobile-nav-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-nav-title"
        /*
         * Explicit transform rather than Tailwind's translate-x-* utilities:
         * those set a custom property that the transform shorthand reads, which
         * is harder to reason about when debugging. This is equivalent and the
         * value is visible in devtools.
         */
        style={{ transform: open ? 'translateX(0)' : 'translateX(100%)' }}
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-line bg-surface transition-transform duration-300 ease-out lg:hidden ${
          open ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <h2 id="mobile-nav-title" className="sr-only">
          {t.nav.menuTitle}
        </h2>

        <div className="flex items-center justify-end border-b border-line px-6 py-6">
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label={t.nav.closeMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-gray-300 transition-colors hover:text-primary"
          >
            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav aria-label={t.nav.menuTitle} className="flex-1 overflow-y-auto px-6 py-4">
          {/* The three funnels, from the same model the desktop panel renders. */}
          {solutions.columns.map((column) => (
            <div key={column.key} className="mb-6">
              <p
                className={`mb-1 text-xs font-medium uppercase tracking-[0.15em] ${
                  column.tone === 'primary'
                    ? 'text-primary'
                    : column.tone === 'accent'
                      ? 'text-accent'
                      : 'text-gray-400'
                }`}
              >
                {column.title}
              </p>
              <p className="mb-3 text-xs leading-relaxed text-gray-500">{column.desc}</p>

              <ul className="grid">
                {column.items.map((item) => (
                  <li key={item.key} className="border-b border-line/40">
                    <a
                      href={item.href}
                      onClick={close}
                      className="flex min-h-[44px] flex-col justify-center py-2 text-base text-gray-200 transition-colors hover:text-primary"
                    >
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="font-medium">{item.name}</span>
                        {item.status && (
                          <span
                            className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] leading-none ${
                              item.status === 'available'
                                ? 'border-primary/40 text-primary'
                                : 'border-line text-gray-500'
                            }`}
                          >
                            {item.status === 'available'
                              ? solutions.labels.available
                              : solutions.labels.running}
                          </span>
                        )}
                        {item.price && (
                          <span className="shrink-0 text-xs text-gray-500">{item.price}</span>
                        )}
                      </span>
                      <span className="text-xs text-gray-400">{item.desc}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <ul className="grid">
            {links.map((link) => (
              <li key={link.href} className="border-b border-line/60">
                <a
                  href={link.href}
                  onClick={close}
                  className="flex min-h-[56px] items-center text-2xl text-gray-200 transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <LocaleSwitcher t={t} locale={locale} variant="panel" />
          </div>
        </nav>

        <div className="grid gap-4 border-t border-line px-6 py-6">
          <a
            href={`/${locale}#scope`}
            onClick={close}
            className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-primary px-6 font-medium text-background transition-colors hover:bg-primary-hover"
          >
            {t.nav.cta}
          </a>
          <div className="grid gap-1 text-sm text-gray-400">
            <a className="transition-colors hover:text-primary" href={`mailto:${COMPANY.email}`}>
              {COMPANY.email}
            </a>
            {phone && (
              <a className="transition-colors hover:text-primary" href={`tel:${phone.replace(/\s/g, '')}`}>
                {phone}
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={t.nav.openMenu}
        className="inline-flex h-11 w-11 items-center justify-center rounded-md text-gray-300 transition-colors hover:text-primary lg:hidden"
      >
        <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Portalled to body so `inert` on #page-shell doesn't disable the panel. */}
      {mounted && createPortal(panel, document.body)}
    </>
  );
}
