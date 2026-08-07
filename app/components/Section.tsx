import type { ReactNode } from 'react';

/**
 * Exactly four section backgrounds. `surface` is deliberately NOT one of them:
 * at #181C21 against #121519 it measures 1.07:1, which is optically invisible —
 * using it as a band produced the illusion of variation with none of the effect.
 * It remains the CARD colour, which is what it actually is.
 */
type Tone = 'dark' | 'light' | 'action' | 'accent';
type Padding = 'default' | 'tight' | 'none';

const TONE: Record<Tone, string> = {
  dark: 'bg-background text-white',
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

/*
 * Seam sizing, keyed to the padding it has to hide inside.
 *
 * The seam (Phase 3) is a gradient in the band's TOP GUTTER, which carries no
 * text — that is the entire reason it cannot break contrast. So its height is a
 * function of the padding, and always leaves >=16px of clean gutter. A seam
 * that reaches the first baseline is a bug, not a longer fade.
 *
 * `none` gets nothing. Note also that four call sites override padding via
 * `innerClassName` and WIN (pt-* is emitted after py-*): the sub-page <main>
 * elements measure 24px and Hero measures 40px. Those pass `seam={false}`
 * rather than relying on this map.
 */
const SEAM: Record<Padding, string> = {
  default: 'seam-default',
  tight: 'seam-tight',
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
  seam = true,
  children,
}: {
  id?: string;
  tone?: Tone;
  padding?: Padding;
  as?: 'section' | 'header' | 'footer' | 'main' | 'div';
  className?: string;
  innerClassName?: string;
  /**
   * Opt out of the seam — the gradient a band paints from its predecessor's
   * colour into its own. Set `false` where the top gutter is too small to hold
   * one (any section overriding padding through `innerClassName`) or where the
   * element is chrome rather than a band (the sticky Header, whose backdrop
   * blur would smear the ramp).
   */
  seam?: boolean;
  children: ReactNode;
}) {
  return (
    <Tag
      id={id}
      /*
       * `data-tone` is the whole tone-awareness mechanism: it selects the band
       * palette in globals.css, and custom properties inherit from here to
       * every descendant. It is also what Phase 3's seam reads, via sibling
       * adjacency — CSS sees the DOM as rendered, so a section that returned
       * null (Testimonials, with no quotes) is correctly not a neighbour.
       *
       * `isolate` is load-bearing for that seam: it makes this element a
       * stacking context, so the seam's `z-index:-1` paints above this band's
       * own background but below its content. Without it the seam would fall
       * behind the background and vanish.
       */
      data-tone={tone}
      data-seam={seam ? undefined : 'none'}
      className={`relative isolate ${SEAM[seam ? padding : 'none']} ${TONE[tone]} ${className}`}
    >
      <div
        className={`mx-auto w-full max-w-[1400px] px-4 md:px-8 lg:px-12 ${PADDING[padding]} ${innerClassName}`}
      >
        {children}
      </div>
    </Tag>
  );
}
