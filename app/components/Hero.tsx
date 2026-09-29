import Section from './Section';
import { CALENDLY_URL, type Dictionary } from '../data';

/**
 * Typographic on purpose. The hero's only job is to say "three departments" and
 * hand over to the band below, which is the real content of the page — media
 * here described one product and pushed the departments under the fold.
 */
export default function Hero({ t }: { t: Dictionary }) {
  return (
    <Section
      as="main"
      id="main"
      padding="none"
      // Follows the dark Header, so there is no tone change to seam.
      seam={false}
      innerClassName="pt-16 pb-20 md:pt-24 md:pb-28"
    >
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-band-brand md:text-sm">
        {t.hero.kicker}
      </p>

      <h1 className="mt-6 max-w-5xl text-4xl leading-[1.08] tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
        <span className="block">{t.hero.titleLine1}</span>
        <span className="block text-band-body">{t.hero.titleLine2}</span>
      </h1>

      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-band-lead">{t.hero.body}</p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-primary px-8 py-4 text-lg font-medium text-background transition-colors hover:bg-primary-hover"
        >
          {t.hero.primaryCta}
        </a>
        <a
          href="#departments"
          className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md px-2 py-4 text-lg text-band-fg transition-colors hover:text-band-brand"
        >
          {t.hero.secondaryCta}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 transition-transform duration-200 group-hover:translate-y-1"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 5a.75.75 0 01.75.75v6.638l1.96-2.158a.75.75 0 111.08 1.04l-3.25 3.5a.75.75 0 01-1.08 0l-3.25-3.5a.75.75 0 111.08-1.04l1.96 2.158V5.75A.75.75 0 0110 5z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </Section>
  );
}
