'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { MenuColumn, SolutionsMenuModel } from '../lib/nav';

/** Column accent, drawn only from theme tokens. No stock Tailwind palettes. */
const TONE: Record<MenuColumn['tone'], { rule: string; title: string }> = {
  primary: { rule: 'bg-primary', title: 'text-primary' },
  accent: { rule: 'bg-accent', title: 'text-accent' },
  neutral: { rule: 'bg-line', title: 'text-gray-300' },
};

function Column({ column, labels }: { column: MenuColumn; labels: SolutionsMenuModel['labels'] }) {
  const tone = TONE[column.tone];

  return (
    <div className="group/col flex flex-col transition-opacity duration-200 group-hover/menu:opacity-60 hover:!opacity-100">
      <span aria-hidden="true" className={`mb-3.5 h-px w-10 ${tone.rule}`} />

      <h3 className={`text-sm font-medium ${tone.title}`}>{column.title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-gray-400">{column.desc}</p>

      <ul className="mt-4 grid gap-0.5">
        {column.items.map((item) => (
          <li key={item.key}>
            <a
              href={item.href}
              className="group/item block rounded-md px-3 py-2 -mx-3 transition-colors hover:bg-surface-hover focus-visible:bg-surface-hover"
            >
              <span className="flex items-baseline justify-between gap-3">
                <span className="text-sm font-medium text-white transition-colors group-hover/item:text-primary group-focus-visible:text-primary">
                  {item.name}
                </span>

                {item.status && (
                  <span
                    className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium leading-none ${
                      item.status === 'available'
                        ? 'border-primary/40 text-primary bg-primary/5'
                        : 'border-line text-gray-400'
                    }`}
                  >
                    {item.status === 'available' ? labels.available : labels.running}
                  </span>
                )}
                {item.price && (
                  <span className="shrink-0 font-mono text-xs text-gray-400">{item.price}</span>
                )}
              </span>
              <span className="mt-0.5 block text-xs leading-relaxed text-gray-500">
                {item.desc}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SolutionsMenu({
  label,
  menu,
}: {
  label: string;
  menu: SolutionsMenuModel;
}) {
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const panelId = useId();

  /*
   * The panel stays mounted so it can transition, which means it must be
   * `inert` while closed — otherwise Tab walks into an invisible menu. Same
   * lesson as MobileNav.
   */
  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    if (open) el.removeAttribute('inert');
    else el.setAttribute('inert', '');
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const close = (returnFocus: boolean) => {
      setOpen(false);
      if (returnFocus) trigger.current?.focus();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close(true);
    };
    const onPointer = (e: MouseEvent) => {
      if (!wrapper.current?.contains(e.target as Node)) close(false);
    };
    // Tabbing past the last link should dismiss, not leave a panel hanging open.
    const onFocusIn = (e: FocusEvent) => {
      if (!wrapper.current?.contains(e.target as Node)) close(false);
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('focusin', onFocusIn);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('focusin', onFocusIn);
    };
  }, [open]);

  return (
    <div ref={wrapper} className="relative">
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
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

      <div className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 ${open ? '' : 'pointer-events-none'}`}>
        <div
          ref={panel}
          id={panelId}
          onClick={() => setOpen(false)}
          style={{ transform: open ? 'translateY(0)' : 'translateY(-4px)' }}
          className={`w-[54rem] max-w-[calc(100vw-2rem)] border border-line bg-surface p-7 shadow-2xl transition-[opacity,transform] duration-200 ease-out ${
            open ? 'visible opacity-100 pointer-events-auto' : 'invisible opacity-0 pointer-events-none'
          }`}
        >
          {/* Introductory Context Header */}
          <div className="mb-6 border-b border-line/60 pb-4">
            <h2 className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-primary">
              {menu.headerTitle}
            </h2>
            <p className="mt-1 text-xs text-gray-400">
              {menu.headerSubtitle}
            </p>
          </div>

          {/* Three Engagement Model Columns */}
          <div className="group/menu grid grid-cols-3 gap-8 md:gap-10">
            {menu.columns.map((column) => (
              <Column key={column.key} column={column} labels={menu.labels} />
            ))}
          </div>

          {/* Bottom Full-Width Scope Generator CTA */}
          <div className="mt-7 flex items-center justify-between gap-6 border-t border-line/60 pt-4">
            <span className="text-xs text-gray-400">{menu.cta.note}</span>
            <a
              href={menu.cta.href}
              className="group/cta inline-flex items-center gap-1.5 text-xs font-medium text-primary transition-colors hover:text-white"
            >
              <span>{menu.cta.label}</span>
              <span className="transition-transform duration-200 group-hover/cta:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
