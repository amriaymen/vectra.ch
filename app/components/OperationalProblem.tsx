import Section from './Section';
import Reveal from './Reveal';
import type { Dictionary } from '../data';

export default function OperationalProblem({ t }: { t: Dictionary }) {
  return (
    <Section tone="light">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-20">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-band-brand">
            {t.operationalProblem.kicker}
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl leading-tight tracking-tight text-band-fg md:text-4xl lg:text-5xl">
            {t.operationalProblem.title}
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <p className="max-w-xl text-lg leading-relaxed text-band-lead">
            {t.operationalProblem.body}
          </p>
        </Reveal>
      </div>

      <Reveal delay={160}>
        <ul className="mt-12 flex flex-wrap gap-3" aria-label={t.operationalProblem.kicker}>
          {t.operationalProblem.signals.map((signal) => (
            <li
              key={signal}
              className="rounded-full border border-band-line bg-band-card px-4 py-2 text-sm text-band-lead"
            >
              {signal}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
