import Section from './Section';
import { PROCUREMENT, type Dictionary } from '../data';

/**
 * Public-sector buying. Schools, communes and cantonal bodies procure under
 * rules most small studios never mention — saying the threshold out loud is a
 * reason to act, not just reassurance.
 */
export default function Procurement({ t }: { t: Dictionary }) {
  return (
    <Section id="procurement" tone="light">
      <div className="max-w-3xl">
        <h2 className="text-3xl leading-tight tracking-tight md:text-4xl">
          {t.procurement.title}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-band-lead">{t.procurement.intro}</p>
      </div>

      {/* gap-px over a band-line fill: the "grid lines" are the container showing
          through between band-bg cells, so both must track the tone together. */}
      <ul className="mt-12 grid gap-px border border-band-line bg-band-line sm:grid-cols-2">
        {t.procurement.points.map((point) => (
          <li key={point.title} className="bg-band-bg p-6 md:p-8">
            <h3 className="text-lg leading-snug text-band-fg">{point.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-band-lead">{point.detail}</p>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-sm text-band-muted">
        <a
          href={PROCUREMENT.simapUrl}
          target="_blank"
          rel="noopener noreferrer"
          /*
           * hover:text-primary stays LITERAL on this light band. `band-brand`
           * resolves to olive here, which is the right colour (lime on white is
           * 1.15:1) but is a Phase 2 brand decision — and Phase 1's contract is
           * zero visual change. Migrate this when that call is made.
           */
          className="underline underline-offset-4 transition-colors hover:text-primary"
        >
          simap.ch
        </a>
      </p>
    </Section>
  );
}
