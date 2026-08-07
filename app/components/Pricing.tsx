'use client';

import Section from './Section';
import { SUBSCRIPTION_TIERS, formatCHF, type Dictionary } from '../data';

export default function Pricing({ t }: { t: Dictionary }) {
  const models = [
    { id: 'license', featured: false, ...t.pricing.models.license },
    { id: 'project', featured: true, ...t.pricing.models.project },
    { id: 'subscription', featured: false, ...t.pricing.models.subscription }
  ];

  return (
    <Section id="pricing">
      <div className="max-w-4xl">
        <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl">
          {t.pricing.title}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-band-lead">{t.pricing.intro}</p>
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {models.map((model) => (
          <div
            key={model.id}
            className={`flex flex-col scroll-mt-28 border bg-band-card p-6 md:p-8 ${
              model.featured ? 'border-band-brand ring-1 ring-band-brand' : 'border-band-line'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <h4 className="text-xl leading-snug text-band-fg">{model.name}</h4>
              {model.featured && (
                <span className="rounded-full bg-band-brand/10 px-2.5 py-0.5 text-xs font-medium text-band-brand">
                  Most popular
                </span>
              )}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-band-body min-h-[4rem]">{model.detail}</p>

            {/* The subscription model is the one with published rates — that is
                its entire point, so it shows numbers where the others cannot. */}
            {model.id === 'subscription' ? (
              <div className="mt-6">
                <ul className="grid gap-3">
                  {SUBSCRIPTION_TIERS.map((tier) => (
                    <li key={tier.id} className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <span className={tier.featured ? 'text-band-fg' : 'text-band-lead'}>
                        {t.pricing.tiers.names[tier.id as keyof typeof t.pricing.tiers.names]}
                      </span>
                      {tier.monthly === null ? (
                        <span className="text-band-body">{t.pricing.onRequest}</span>
                      ) : (
                        <span className="text-right">
                          <span className="font-medium text-band-fg">
                            {formatCHF(tier.monthly)}
                            {t.pricing.tiers.perMonth}
                          </span>
                          {tier.yearly !== null && (
                            <span className="block text-xs text-band-muted">
                              {formatCHF(tier.yearly)}
                              {t.pricing.tiers.perYear}
                            </span>
                          )}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-band-muted">{t.pricing.tiers.note}</p>
              </div>
            ) : (
              <p className="mt-6 font-medium text-3xl text-band-fg">{t.pricing.onRequest}</p>
            )}

            <ul className="mt-8 grid flex-1 gap-4 border-t border-band-line pt-8">
              {model.includes.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-band-lead">
                  <svg className="h-5 w-5 shrink-0 text-band-brand" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="#scope"
              className={`mt-10 inline-flex min-h-[48px] items-center justify-center rounded-md px-6 font-medium transition-colors ${
                model.featured
                  ? // Lime PLATE with dark ink — stays literal. A lime plate is
                    // lime on every band; only lime-as-text needs the token.
                    'bg-primary text-background hover:bg-primary-hover'
                  : 'border border-band-line text-band-fg hover:border-band-brand hover:text-band-brand'
              }`}
            >
              {model.cta}
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
}
