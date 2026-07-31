'use client';

import { useEffect, useRef, useState } from 'react';

export interface SolutionsMenuData {
  col1Title: string;
  col1Badge: string;
  col1Desc: string;
  products: { name: string; desc: string; href: string }[];
  col2Title: string;
  col2Badge: string;
  col2Desc: string;
  customItems: { name: string; desc: string; href: string }[];
  col3Title: string;
  col3Badge: string;
  col3Desc: string;
  subItems: { name: string; desc: string; href: string }[];
}

export default function SolutionsMenu({
  label,
  menu,
}: {
  label: string;
  menu: SolutionsMenuData;
}) {
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      trigger.current?.focus();
    };
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

  return (
    <div ref={wrapper} className="relative">
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex min-h-[44px] items-center gap-1.5 text-gray-300 transition-colors hover:text-white"
      >
        {label}
        <svg
          className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180 text-primary' : ''}`}
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
        <div
          role="menu"
          aria-label={label}
          className="absolute -left-28 md:-left-36 lg:-left-12 top-full z-50 mt-2 w-[860px] max-w-[92vw] overflow-hidden rounded-2xl border border-line/80 bg-surface/95 p-6 backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {/* 3 Sales Funnels Columns */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-line/60">
            
            {/* Column 1: Ready-to-Use SaaS Products */}
            <div className="flex flex-col space-y-3 pt-2 md:pt-0">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-white flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  {menu.col1Title}
                </span>
                <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                  {menu.col1Badge}
                </span>
              </div>
              <p className="px-2 text-xs text-gray-400 leading-relaxed">
                {menu.col1Desc}
              </p>
              <div className="grid gap-1 pt-1">
                {menu.products.map((item) => (
                  <a
                    key={item.href}
                    role="menuitem"
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex flex-col rounded-xl border border-transparent p-3 transition-all hover:border-line/60 hover:bg-surface-hover/90"
                  >
                    <span className="text-sm font-medium text-white transition-colors group-hover:text-primary flex items-center justify-between">
                      {item.name}
                      <span className="text-xs text-gray-500 opacity-0 transition-opacity group-hover:opacity-100">→</span>
                    </span>
                    <span className="mt-1 text-xs text-gray-400 leading-normal">
                      {item.desc}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Fixed Project Pricing / Custom Scopes */}
            <div className="flex flex-col space-y-3 pt-4 md:pt-0 md:pl-6">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-white flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-blue-400" />
                  {menu.col2Title}
                </span>
                <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-400">
                  {menu.col2Badge}
                </span>
              </div>
              <p className="px-2 text-xs text-gray-400 leading-relaxed">
                {menu.col2Desc}
              </p>
              <div className="grid gap-1 pt-1">
                {menu.customItems.map((item) => (
                  <a
                    key={item.href}
                    role="menuitem"
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex flex-col rounded-xl border border-transparent p-3 transition-all hover:border-line/60 hover:bg-surface-hover/90"
                  >
                    <span className="text-sm font-medium text-white transition-colors group-hover:text-primary flex items-center justify-between">
                      {item.name}
                      <span className="text-xs text-gray-500 opacity-0 transition-opacity group-hover:opacity-100">→</span>
                    </span>
                    <span className="mt-1 text-xs text-gray-400 leading-normal">
                      {item.desc}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Column 3: Unlimited Fractional Subscriptions */}
            <div className="flex flex-col space-y-3 pt-4 md:pt-0 md:pl-6">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-white flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  {menu.col3Title}
                </span>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                  {menu.col3Badge}
                </span>
              </div>
              <p className="px-2 text-xs text-gray-400 leading-relaxed">
                {menu.col3Desc}
              </p>
              <div className="grid gap-1 pt-1">
                {menu.subItems.map((item) => (
                  <a
                    key={item.href}
                    role="menuitem"
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex flex-col rounded-xl border border-transparent p-3 transition-all hover:border-line/60 hover:bg-surface-hover/90"
                  >
                    <span className="text-sm font-medium text-white transition-colors group-hover:text-primary flex items-center justify-between">
                      {item.name}
                      <span className="text-xs text-gray-500 opacity-0 transition-opacity group-hover:opacity-100">→</span>
                    </span>
                    <span className="mt-1 text-xs text-gray-400 leading-normal">
                      {item.desc}
                    </span>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Bar CTA Strip */}
          <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-4 px-2">
            <span className="text-xs text-gray-400">
              ⚡ Vous cherchez un tarif ou une estimation immédiate ?
            </span>
            <a
              href="#scope"
              onClick={() => setOpen(false)}
              className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
            >
              Calculer un projet avec l&apos;IA &rarr;
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

