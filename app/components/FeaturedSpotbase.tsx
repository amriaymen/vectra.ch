import Image from 'next/image';
import Section from './Section';
import Reveal from './Reveal';
import { DEMO_URL, productPath, type Dictionary, type Locale } from '../data';

export default function FeaturedSpotbase({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <Section tone="light">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-band-brand">
            {t.spotbaseFeature.kicker}
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl leading-tight tracking-tight text-band-fg md:text-4xl lg:text-5xl">
            {t.spotbaseFeature.title}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-band-lead">
            {t.spotbaseFeature.body}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center rounded-md bg-primary px-6 font-medium text-background transition-colors hover:bg-primary-hover"
            >
              {t.products.demoCta}
            </a>
            <a
              href={productPath(locale, 'spotbase')}
              className="inline-flex min-h-[48px] items-center text-sm font-medium text-band-fg transition-colors hover:text-band-brand"
            >
              {t.spotbaseFeature.productCta}
            </a>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid gap-6">
            <div className="relative aspect-[16/10] overflow-hidden border border-band-line bg-band-card shadow-[0_20px_55px_rgba(15,23,42,0.12)]">
              <Image
                src="/assets/spotbase-demo.png"
                alt={t.spotbaseFeature.imageAlt}
                fill
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-cover object-center"
              />
            </div>
            <div className="border border-band-line bg-band-card p-6 md:p-8">
              <p className="text-sm font-medium text-band-fg">{t.spotbaseFeature.chainLabel}</p>
              <ol className="mt-6 grid gap-4 border-t border-band-line pt-6">
                {t.spotbaseFeature.chain.map((step, index) => (
                  <li key={step} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
                    <span className="text-sm tabular-nums text-band-brand">0{index + 1}</span>
                    <span className="text-sm leading-relaxed text-band-lead">{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-8 border-t border-band-line pt-6 text-sm leading-relaxed text-band-body">
                {t.spotbaseFeature.ownership}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
