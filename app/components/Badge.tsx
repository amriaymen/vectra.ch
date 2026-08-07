import type { ReactNode } from 'react';

/*
 * `neutral` is band-relative: this is a shared leaf with no idea where it is
 * rendered, and it gets that for free because the band tokens are custom
 * properties, which inherit. No prop, no context.
 *
 * `accent` stays literal — a lime plate with dark ink reads on every band, and
 * is meant to look identical wherever it lands.
 *
 * The former `outline` variant is gone: nothing referenced it.
 */
const VARIANT = {
  neutral: 'bg-band-card text-band-fg border-band-line',
  accent: 'bg-primary text-background border-primary',
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
