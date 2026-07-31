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
    <div className="flex flex-col">
      <span aria-hidden="true" className={`mb-4 h-px w-10 ${tone.rule}`} />

      <h3 className={`text-sm font-medium ${tone.title}`}>{column.title}</h3>
      <p className="mt-1.5 text-xs leading-relaxed text-gray-500">{column.desc}</p>
      <p className="mt-2 text-xs text-gray-400">{column.price}</p>

      <ul className="mt-4 grid gap-0.5">
        {column.items.map((item) => (
          <li key={item.key}>
            <a
              href={item.href}
              className="group block rounded-lg px-3 py-2.5 -mx-3 transition-colors hover:bg-surface-hover focus-visible:bg-surface-hover"
            >
              <span className="flex items-baseline justify-between gap-3">
                <span className="text-sm text-white transition-colors group-hover:text-primary group-focus-visible:text-primary">
                  {item.name}
                </span>

                {/* A `running` system is real but not licensable — it must never
                    read as purchasable, here or on its product page. */}
                {item.status && (
                  <span
                    className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] leading-none ${
                      item.status === 'available'
                        ? 'border-primary/40 text-primary'
                        : 'border-line text-gray-500'
                    }`}
                  >
                    {item.status === 'available' ? labels.available : labels.running}
                  </span>
                )}
                {item.price && (
                  <span className="shrink-0 text-xs text-gray-500">{item.price}</span>
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
      {/*
        A disclosure, not role="menu". The ARIA menu pattern promises arrow keys,
        Home/End and typeahead; a list of links wants none of that and gets
        correct Tab order for free.
      */}
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

      {/*
        Two elements on purpose: the outer one owns the centring transform, the
        inner one owns the animated transform. Sharing them would mean both the
        position and the transition write the same transform shorthand through
        Tailwind's CSS variables.
      */}
      <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
        <div
          ref={panel}
          id={panelId}
          onClick={() => setOpen(false)}
          style={{ transform: open ? 'translateY(0)' : 'translateY(-4px)' }}
          className={`w-[52rem] max-w-[calc(100vw-2rem)] rounded-2xl border border-line bg-surface p-8 shadow-2xl transition-[opacity,transform] duration-200 ease-out ${
            open ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
        >
        <div className="grid grid-cols-3 gap-10">
          {menu.columns.map((column) => (
            <Column key={column.key} column={column} labels={menu.labels} />
          ))}
        </div>

          <div className="mt-8 flex items-center justify-between gap-6 border-t border-line pt-5">
            <span className="text-xs text-gray-500">{menu.cta.note}</span>
            <a
              href={menu.cta.href}
              className="text-xs font-medium text-primary transition-colors hover:text-white"
            >
              {menu.cta.label} →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
