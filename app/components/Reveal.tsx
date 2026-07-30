'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/** Content must never stay hidden. If nothing has revealed by then, force it. */
const FAIL_OPEN_MS = 2000;

/**
 * Fades and lifts its children into view on first intersection.
 *
 * This mechanism hides content, so every failure path must fail OPEN:
 *  - the hidden state lives behind `.reveal-ready` in globals.css, so no JS at
 *    all means nothing is ever hidden;
 *  - anything already in or above the viewport on mount reveals immediately,
 *    without waiting for an observer callback;
 *  - no IntersectionObserver support reveals immediately;
 *  - and a timeout reveals regardless, so a browser where the observer silently
 *    never fires still shows the page.
 *
 * Hand-written rather than an animation library — this is ~1 KB for fade-and-rise.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  /** Stagger, in ms. Keep small — this delays content appearing. */
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'article';
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = () => el.classList.add('is-visible');

    // Already on screen (or scrolled past) — reveal now rather than waiting.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      reveal();
      return;
    }

    if (!('IntersectionObserver' in window)) {
      reveal();
      return;
    }

    const failOpen = setTimeout(reveal, FAIL_OPEN_MS);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          clearTimeout(failOpen);
          reveal();
          observer.unobserve(entry.target); // reveal once, never re-hide
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(el);

    return () => {
      clearTimeout(failOpen);
      observer.disconnect();
    };
  }, []);

  // TS intersects the ref types of every allowed tag, which no single ref can
  // satisfy. The element type is inert here — we only ever read `classList`.
  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref}
      data-reveal=""
      className={className}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Component>
  );
}
