'use client';

import { useState } from 'react';
import Section from './Section';
import Badge from './Badge';
import {
  PROJECT_TRACKS,
  SUBSCRIPTION_TIERS,
  formatCHF,
  type Dictionary,
} from '../data';

export default function Pricing({ t }: { t: Dictionary }) {
  const [yearly, setYearly] = useState(false);

  return (
    <Section id="pricing">
      <div className="max-w-4xl">
        <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl">
          {t.pricing.title}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-gray-300">{t.pricing.intro}</p>
      </div>

      {/* ── Subscription ───────────────────────────────────────────── */}
      <div className="mt-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h3 className="text-2xl leading-snug md:text-3xl">{t.pricing.subscriptionTitle}</h3>
            <p className="mt-3 leading-relaxed text-gray-400">{t.pricing.subscriptionIntro}</p>
          </div>

          <div
            role="group"
            aria-label={`${t.pricing.monthly} / ${t.pricing.yearly}`}
            className="inline-flex shrink-0 rounded-md border border-line p-1"
          >
            {[
              { value: false, label: t.pricing.monthly },
              { value: true, label: t.pricing.yearly },
            ].map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => setYearly(option.value)}
                aria-pressed={yearly === option.value}
                className={`min-h-[40px] rounded px-4 text-sm transition-colors ${
                  yearly === option.value
                    ? 'bg-primary font-medium text-background'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {SUBSCRIPTION_TIERS.map((tier) => {
            const copy = t.pricing.tiers[tier.id as keyof typeof t.pricing.tiers];
            const amount = yearly ? tier.yearly : tier.monthly;
            return (
              <div
                key={tier.id}
                className={`flex flex-col rounded-xl border bg-surface p-6 md:p-8 ${
                  tier.featured ? 'border-primary' : 'border-line'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-xl leading-snug">{copy.name}</h4>
                  {tier.featured && <Badge variant="accent">{t.pricing.featured}</Badge>}
                </div>

                <p className="mt-3 text-sm leading-relaxed text-gray-400">{copy.detail}</p>

                <p className="mt-6">
                  <span className="font-medium text-3xl text-white">
                    {amount === null ? t.pricing.onRequest : formatCHF(amount)}
                  </span>
                  {amount !== null && (
                    <span className="ml-1 text-sm text-gray-500">
                      {yearly ? t.pricing.perYear : t.pricing.perMonth}
                    </span>
                  )}
                </p>
                {amount !== null && yearly && (
                  <p className="mt-1 text-xs text-gray-500">{t.pricing.yearlyNote}</p>
                )}

                <ul className="mt-6 grid flex-1 gap-3 border-t border-line pt-6">
                  {copy.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-gray-300">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="#scope"
                  className={`mt-8 inline-flex min-h-[48px] items-center justify-center rounded-md px-6 font-medium transition-colors ${
                    tier.featured
                      ? 'bg-primary text-background hover:bg-primary-hover'
                      : 'border border-line text-white hover:border-primary hover:text-primary'
                  }`}
                >
                  {t.pricing.subscriptionCta}
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Fixed-scope projects ───────────────────────────────────── */}
      <div className="mt-20 border-t border-line pt-12">
        <div className="max-w-2xl">
          <h3 className="text-2xl leading-snug md:text-3xl">{t.pricing.projectsTitle}</h3>
          <p className="mt-3 leading-relaxed text-gray-400">{t.pricing.projectsIntro}</p>
        </div>

        <div className="mt-10 border-t border-line">
          {PROJECT_TRACKS.map((track) => {
            const copy = t.pricing.tracks[track.id as keyof typeof t.pricing.tracks];
            return (
              <div
                key={track.id}
                className="grid gap-3 border-b border-line py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:items-baseline md:gap-8"
              >
                {/* Name and price sit together at the top on mobile; the price
                    used to land last, below the description. */}
                <div className="flex items-baseline justify-between gap-4 md:block">
                  <h4 className="text-xl leading-snug">{copy.name}</h4>
                  <p className="font-medium shrink-0 text-primary md:mt-2">
                    {track.from === null
                      ? t.pricing.onRequest
                      : `${t.pricing.from} ${formatCHF(track.from)}`}
                  </p>
                </div>
                <p className="leading-relaxed text-gray-400">{copy.detail}</p>
              </div>
            );
          })}
        </div>

        <a
          href="#scope"
          className="mt-10 inline-flex min-h-[48px] items-center justify-center rounded-md border border-line px-8 font-medium text-white transition-colors hover:border-primary hover:text-primary"
        >
          {t.pricing.projectCta}
        </a>
      </div>
    </Section>
  );
}
