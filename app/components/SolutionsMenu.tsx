'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Nav dropdown listing the solution hubs — the same idea as the competitor's
 * "Nos services" submenu, which is how their hub pages get discovered.
 *
 * Menu semantics (not listbox — these are navigation links, not option values).
 */
export default function SolutionsMenu({
  label,
  items,
}: {
  label: string;
  items: { href: string; label: string; detail: string }[];
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
        <div
          role="menu"
          aria-label={label}
          className="absolute left-0 top-full z-50 mt-1 w-80 overflow-hidden rounded-md border border-line bg-surface p-2"
        >
          {items.map((item) => (
            <a
              key={item.href}
              role="menuitem"
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded px-3 py-3 transition-colors hover:bg-surface-hover"
            >
              <span className="block text-sm text-white">{item.label}</span>
              <span className="mt-0.5 block text-xs leading-relaxed text-gray-400">
                {item.detail}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
