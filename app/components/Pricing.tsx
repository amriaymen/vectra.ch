'use client';

import Section from './Section';
import { type Dictionary } from '../data';

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
        <p className="mt-6 text-lg leading-relaxed text-gray-300">{t.pricing.intro}</p>
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {models.map((model) => (
          <div
            key={model.id}
            className={`flex flex-col scroll-mt-28 rounded-xl border bg-surface p-6 md:p-8 ${
              model.featured ? 'border-primary ring-1 ring-primary' : 'border-line'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <h4 className="text-xl leading-snug text-white">{model.name}</h4>
              {model.featured && (
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  Most popular
                </span>
              )}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-gray-400 min-h-[4rem]">{model.detail}</p>

            <p className="mt-6 font-medium text-3xl text-white">
              {t.pricing.onRequest}
            </p>

            <ul className="mt-8 grid flex-1 gap-4 border-t border-line pt-8">
              {model.includes.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-gray-300">
                  <svg className="h-5 w-5 shrink-0 text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
                  ? 'bg-primary text-background hover:bg-primary-hover'
                  : 'border border-line text-white hover:border-primary hover:text-primary'
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
