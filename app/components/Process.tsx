import Section from './Section';
import type { Dictionary } from '../data';

/**
 * The one electric-blue band. Blue is the "how it works" tone; lime stays
 * reserved for the single call-to-action band so it keeps meaning "act here".
 */
export default function Process({ t }: { t: Dictionary }) {
  return (
    <Section id="process" tone="accent">
      <div className="max-w-3xl">
        <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl">
          {t.process.title}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-white/80">{t.process.intro}</p>
      </div>

      <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
        {t.process.steps.map((item) => (
          <li key={item.step} className="border-t border-white/25 pt-6">
            <p className="font-medium text-sm tabular-nums text-primary">{item.step}</p>
            <h3 className="mt-3 text-xl leading-snug md:text-2xl">{item.title}</h3>
            <p className="mt-3 leading-relaxed text-white/80">{item.detail}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
