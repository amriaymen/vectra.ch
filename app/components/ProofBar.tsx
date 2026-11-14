'use client';

import { useEffect, useRef, useState } from 'react';
import { PROOF, type Dictionary } from '../data';

/** Counts up on first intersection; renders the final value under reduced motion. */
function Counter({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    setDisplay(0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const duration = 900;
        const start = performance.now();
        let frame = 0;

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          // ease-out so it decelerates into the final number
          setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  // tabular-nums keeps the width stable while the digits change.
  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}

export default function ProofBar({ t }: { t: Dictionary }) {
  const items = PROOF.filter((item) => item.value !== null);
  // Nothing verifiable yet → render nothing at all.
  if (items.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-x-10 gap-y-6">
      {items.map((item) => (
        <li key={item.id}>
          <p className="font-medium text-3xl text-primary md:text-4xl">
            <Counter value={item.value as number} />
            {item.suffix}
          </p>
          <p className="mt-1 text-sm text-gray-400">
            {t.proof[item.id as keyof typeof t.proof]}
          </p>
        </li>
      ))}
    </ul>
  );
}
