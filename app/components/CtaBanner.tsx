import Section from './Section';
import { CALENDLY_URL, type Dictionary } from '../data';

/** The single full-bleed lime band on the page. Lime means: act here. */
export default function CtaBanner({ t }: { t: Dictionary }) {
  return (
    <Section tone="action" padding="tight">
      <div className="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:gap-10">
        <h2 className="text-2xl leading-snug tracking-tight md:text-3xl">{t.cta.title}</h2>
        {/*
          NOT tokenised, deliberately — this is an INVERSE CHIP, not a card.
          It is a dark plate placed on a bright band precisely to contrast its
          host, so it must stay literal: `bg-band-card` would track the band and
          on any dark tone the button would vanish into its own background.
          Same rule as the icon chip in EngagementModels. Roles, not literals —
          and `bg-background` here means "the opposite of this band", not
          "recessed", which is what it means inside ScopeForm and WhoWeServe.
        */}
        <a
          className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-background px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-surface md:justify-self-end"
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.cta.button}
        </a>
      </div>
    </Section>
  );
}
