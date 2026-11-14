import Section from './Section';
import Reveal from './Reveal';
import type { Dictionary } from '../data';

export default function SchoolManagement({ t }: { t: Dictionary }) {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-band-brand">
            {t.schoolManagement.kicker}
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl">
            {t.schoolManagement.title}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-band-lead">
            {t.schoolManagement.body}
          </p>
          <a
            href="#scope"
            className="mt-8 inline-flex min-h-[48px] items-center justify-center rounded-md bg-primary px-6 font-medium text-background transition-colors hover:bg-primary-hover"
          >
            {t.nav.cta}
          </a>
        </Reveal>

        <Reveal delay={100}>
          <div className="border border-band-line bg-band-card p-6 md:p-8">
            <p className="text-sm leading-relaxed text-band-body">{t.schoolManagement.modulesLabel}</p>
            <ul className="mt-6 grid gap-4 border-t border-band-line pt-6">
              {t.schoolManagement.modules.map((module) => (
                <li key={module} className="flex gap-3 text-sm leading-relaxed text-band-lead">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-band-brand" />
                  {module}
                </li>
              ))}
            </ul>
            <p className="mt-8 border-t border-band-line pt-6 text-sm leading-relaxed text-band-brand">
              {t.schoolManagement.delivery}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
