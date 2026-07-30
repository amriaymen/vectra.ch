import type { ReactNode } from 'react';

const VARIANT = {
  neutral: 'bg-surface text-white border-line',
  accent: 'bg-primary text-background border-primary',
  outline: 'bg-transparent text-background border-background/25',
} as const;

/** One badge shape for the whole site. No animation, no emoji. */
export default function Badge({
  variant = 'neutral',
  children,
}: {
  variant?: keyof typeof VARIANT;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide ${VARIANT[variant]}`}
    >
      {children}
    </span>
  );
}
