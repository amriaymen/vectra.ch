import type { ReactNode } from 'react';

type Tone = 'dark' | 'light' | 'action' | 'accent' | 'surface';
type Padding = 'default' | 'tight' | 'none';

const TONE: Record<Tone, string> = {
  dark: 'bg-background text-white',
  surface: 'bg-surface text-white',
  light: 'bg-white text-background',
  /** Lime. Reserved for the single call-to-action band. */
  action: 'bg-primary text-background',
  /** Electric blue. The process/how-it-works tone. */
  accent: 'bg-accent text-white',
};

const PADDING: Record<Padding, string> = {
  default: 'py-20 md:py-28',
  tight: 'py-10 md:py-14',
  none: '',
};

/**
 * Owns every section's horizontal rhythm. All page-level content must go through
 * this so the page keeps a single left edge at every breakpoint — section
 * components must not set their own horizontal padding or max width.
 */
export default function Section({
  id,
  tone = 'dark',
  padding = 'default',
  as: Tag = 'section',
  className = '',
  innerClassName = '',
  children,
}: {
  id?: string;
  tone?: Tone;
  padding?: Padding;
  as?: 'section' | 'header' | 'footer' | 'main' | 'div';
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}) {
  return (
    <Tag id={id} className={`${TONE[tone]} ${className}`}>
      <div
        className={`mx-auto w-full max-w-[1400px] px-4 md:px-8 lg:px-12 ${PADDING[padding]} ${innerClassName}`}
      >
        {children}
      </div>
    </Tag>
  );
}
