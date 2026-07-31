'use client';

import { useEffect, useRef, useState } from 'react';
import Section from './Section';
import type { Dictionary } from '../data';

export default function Problem({ t }: { t: Dictionary }) {
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (vid) {
      vid.play().catch(() => {});
    }
    const timer = setTimeout(() => setLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Section tone="light">
      <h2 className="max-w-5xl text-3xl leading-[1.12] tracking-tight md:text-4xl lg:text-5xl">
        {t.problem.title}
      </h2>

      <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-12 lg:items-center">
        {/* Left Column: Problem Copy */}
        <div className="space-y-6 lg:col-span-7">
          <p className="text-lg leading-relaxed text-gray-600">{t.problem.body1}</p>
          <p className="text-lg leading-relaxed text-gray-600">{t.problem.body2}</p>
        </div>

        {/* Right Column: Optimized Vertical Video Showcase */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[320px] aspect-[9/16] overflow-hidden rounded-xl border border-line/40 bg-surface shadow-2xl">
            {/* Skeleton Pulse while loading */}
            {!loaded && (
              <div className="absolute inset-0 bg-surface/70 animate-pulse flex flex-col justify-between p-6">
                <div className="h-3 w-20 rounded bg-white/10" />
                <div className="space-y-2">
                  <div className="h-4 w-3/4 rounded bg-white/10" />
                  <div className="h-3 w-1/2 rounded bg-white/10" />
                </div>
              </div>
            )}

            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              onCanPlay={() => setLoaded(true)}
              onLoadedData={() => setLoaded(true)}
              onPlay={() => setLoaded(true)}
              className={`h-full w-full object-cover object-center transition-opacity duration-700 ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <source src="/assets/V.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </Section>
  );
}
