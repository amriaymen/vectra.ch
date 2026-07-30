import Section from './Section';
import type { Dictionary } from '../data';

export default function Problem({ t }: { t: Dictionary }) {
  return (
    <Section tone="light">
      <h2 className="max-w-5xl text-3xl leading-[1.12] tracking-tight md:text-4xl lg:text-5xl">
        {t.problem.title}
      </h2>

      <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-12">
        <p className="text-lg leading-relaxed text-gray-600">{t.problem.body1}</p>
        <p className="text-lg leading-relaxed text-gray-600">{t.problem.body2}</p>
      </div>
    </Section>
  );
}
