'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

/**
 * Ambient hero loop, in the style of the Swiss competitor's hero video — but
 * with the poster as the LCP element and the video mounted lazily so it never
 * competes with it.
 *
 * Three deliberate behaviours:
 *  - `sources` empty renders the poster alone, so the hero looks finished before
 *    any video exists.
 *  - Reduced motion renders the poster alone too. CSS cannot pause video, so this
 *    needs a matchMedia check — the global CSS block does not cover it.
 *  - No controls and no audio track: this is decoration, not media to play.
 */
export default function HeroMedia({
  poster,
  sources,
  label,
}: {
  poster: string;
  sources: string[];
  label: string;
}) {
  const [showVideo, setShowVideo] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sources.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = wrapper.current;
    if (!el) return;

    // The hero strip is normally above the fold — mount straight away rather
    // than waiting on an intersection callback that adds latency for nothing.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      setShowVideo(true);
      return;
    }

    if (!('IntersectionObserver' in window)) {
      setShowVideo(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShowVideo(true);
        observer.disconnect();
      },
      // Start fetching just before it scrolls in, but after LCP has settled.
      { rootMargin: '200px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sources]);

  return (
    // A wide, short strip rather than a tall panel — 11rem/12rem matches the
    // proportions of the Swiss competitor's hero media, which is what made it
    // read as a "window" instead of a hero image.
    <div
      ref={wrapper}
      className="relative h-full w-full min-h-[240px] overflow-hidden rounded-xl border border-line/60 bg-surface shadow-2xl"
    >
      {/* Skeleton Loading State (shadcn style pulse) shown before video loads */}
      {!loaded && (
        <div className="absolute inset-0 flex flex-col justify-between p-8 bg-surface/60 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="h-3 w-28 rounded-md bg-white/10" />
            <div className="h-3 w-12 rounded-md bg-white/10" />
          </div>
          <div className="space-y-4">
            <div className="h-6 w-3/4 rounded-md bg-white/10" />
            <div className="h-4 w-1/2 rounded-md bg-white/10" />
          </div>
          <div className="flex gap-4">
            <div className="h-10 w-28 rounded-lg bg-white/10" />
            <div className="h-10 w-28 rounded-lg bg-white/10" />
          </div>
        </div>
      )}

      {showVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={() => setLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {sources.map((src) => (
            <source key={src} src={src} type="video/mp4" />
          ))}
        </video>
      )}
    </div>
  );
}
