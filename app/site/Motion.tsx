'use client';

import { useEffect } from 'react';

/**
 * Page-wide motion, in one small client component:
 *  - `[data-reveal]` elements rise into view once;
 *  - `[data-magnetic]` buttons lean toward the pointer;
 *  - `[data-glow]` areas expose the pointer position as --mx / --my.
 *
 * Everything fails open: the hidden state only applies once this component has
 * added `motion-on` to <html>, and never under reduced motion.
 */
export default function Motion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.documentElement;
    root.classList.add('motion-on');

    const reveal = (el: Element) => el.classList.add('is-in');
    const items = [...document.querySelectorAll('[data-reveal]')];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    items.forEach((el) => observer.observe(el));
    // Nothing may stay hidden if the observer never fires.
    const failOpen = window.setTimeout(() => items.forEach(reveal), 2500);

    const fine = window.matchMedia('(pointer: fine)').matches;
    const onMove = (event: PointerEvent) => {
      if (!fine) return;
      const target = event.target as Element | null;
      const magnet = target?.closest<HTMLElement>('[data-magnetic]');
      if (magnet) {
        const box = magnet.getBoundingClientRect();
        const x = (event.clientX - box.left - box.width / 2) * 0.22;
        const y = (event.clientY - box.top - box.height / 2) * 0.3;
        magnet.style.transform = `translate(${x}px, ${y}px)`;
      }
      const glow = target?.closest<HTMLElement>('[data-glow]');
      if (glow) {
        const box = glow.getBoundingClientRect();
        glow.style.setProperty('--mx', `${event.clientX - box.left}px`);
        glow.style.setProperty('--my', `${event.clientY - box.top}px`);
      }
    };
    const onOut = (event: PointerEvent) => {
      const magnet = (event.target as Element | null)?.closest<HTMLElement>('[data-magnetic]');
      if (magnet && !magnet.contains(event.relatedTarget as Node | null)) magnet.style.transform = '';
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerout', onOut, { passive: true });

    return () => {
      window.clearTimeout(failOpen);
      observer.disconnect();
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerout', onOut);
      root.classList.remove('motion-on');
    };
  }, []);

  return null;
}
