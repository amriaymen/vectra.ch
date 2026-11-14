import Section from './Section';
import HeroMedia from './HeroMedia';
import { HERO_MEDIA, type Dictionary } from '../data';

export default function Hero({ t }: { t: Dictionary }) {
  return (
    <Section
      as="main"
      // Its innerClassName padding beats the `padding` prop, leaving a 40px
      // gutter — too small for a seam. It follows the dark Header anyway.
      seam={false}
      id="main"
      className="min-h-[calc(100dvh-76px)] md:min-h-[calc(100dvh-88px)] flex flex-col justify-center"
      innerClassName="w-full py-6 md:py-8 lg:py-10 relative overflow-hidden my-auto"
    >
      {/* Desktop Overlay Video: Floating overlay behind right half of text with top/bottom gaps */}
      <div className="hidden lg:block absolute right-4 md:right-8 lg:right-12 top-3 bottom-3 w-[52%] z-0 pointer-events-none opacity-90">
        <HeroMedia
          poster={HERO_MEDIA.poster}
          sources={HERO_MEDIA.sources}
          label={t.hero.mediaLabel}
        />
        {/* Subtle dark gradient overlay to guarantee text readability over the video */}
        <div className="absolute inset-0 bg-gradient-to-r from-band-bg via-band-bg/40 to-transparent pointer-events-none" />
      </div>

      {/* Main Content: Floats OVER the video on the right */}
      <div className="relative z-10 w-full max-w-5xl">
        <p className="mb-4 text-xs md:text-sm uppercase tracking-[0.2em] text-band-brand font-medium">{t.hero.kicker}</p>

        <h1 className="w-full text-3xl leading-[1.12] tracking-tight sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl drop-shadow-md">
          <span className="block">{t.hero.titleLine1}</span>
          <span className="mt-1 block text-band-lead sm:mt-2">{t.hero.titleLine2}</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-band-lead drop-shadow-sm">{t.hero.body}</p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href="#scope"
            className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-primary px-8 py-4 text-base md:text-lg font-medium text-background transition-colors hover:bg-primary-hover shadow-lg"
          >
            {t.hero.primaryCta}
          </a>
          <a
            href="#work"
            className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md px-2 py-4 text-base md:text-lg text-band-fg transition-colors hover:text-band-brand"
          >
            {t.hero.secondaryCta}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 01-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
        
        {/* Proof Line */}
        <p className="mt-6 text-xs md:text-sm text-band-body font-normal">{t.hero.proof}</p>
      </div>

      {/* Mobile/Tablet Fallback: Stacked cleanly below text */}
      <div className="mt-5 block h-64 lg:hidden">
        <HeroMedia
          poster={HERO_MEDIA.poster}
          sources={HERO_MEDIA.sources}
          label={t.hero.mediaLabel}
        />
      </div>
    </Section>
  );
}
