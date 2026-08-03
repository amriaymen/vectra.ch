import Section from './Section';
import HeroMedia from './HeroMedia';
import ProofBar from './ProofBar';
import { HERO_MEDIA, type Dictionary } from '../data';

export default function Hero({ t }: { t: Dictionary }) {
  return (
    <Section
      as="main"
      id="main"
      className="min-h-[calc(100dvh-76px)] md:min-h-[calc(100dvh-88px)] flex flex-col justify-center"
      innerClassName="w-full py-8 md:py-12 relative overflow-hidden my-auto"
    >
      {/* Desktop Overlay Video: Floating overlay behind right half of text with top/bottom gaps */}
      <div className="hidden lg:block absolute right-4 md:right-8 lg:right-12 top-6 bottom-6 w-[52%] z-0 pointer-events-none opacity-90">
        <HeroMedia
          poster={HERO_MEDIA.poster}
          sources={HERO_MEDIA.sources}
          label={t.hero.mediaLabel}
        />
        {/* Subtle dark gradient overlay to guarantee text readability over the video */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent pointer-events-none" />
      </div>

      {/* Main Content: Floats OVER the video on the right */}
      <div className="relative z-10 w-full max-w-5xl">
        <p className="mb-6 text-sm uppercase tracking-[0.2em] text-primary">{t.hero.kicker}</p>

        <h1 className="text-3xl leading-[1.12] tracking-tight sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl drop-shadow-md">
          <span className="block">{t.hero.titleLine1}</span>
          <span className="mt-1 block text-gray-300 sm:mt-2">{t.hero.titleLine2}</span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-gray-300 drop-shadow-sm">{t.hero.body}</p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href="#scope"
            className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-primary px-8 py-4 text-lg font-medium text-background transition-colors hover:bg-primary-hover shadow-lg"
          >
            {t.hero.primaryCta}
          </a>
          <a
            href="#work"
            className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md px-2 py-4 text-lg text-white transition-colors hover:text-primary"
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
        <p className="mt-6 text-sm text-gray-400">{t.hero.proof}</p>
      </div>

      {/* Mobile/Tablet Fallback: Stacked cleanly below text */}
      <div className="mt-12 block h-64 lg:hidden">
        <HeroMedia
          poster={HERO_MEDIA.poster}
          sources={HERO_MEDIA.sources}
          label={t.hero.mediaLabel}
        />
      </div>
    </Section>
  );
}
