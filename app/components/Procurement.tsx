import Section from './Section';
import { PROCUREMENT, type Dictionary } from '../data';

/**
 * Public-sector buying. Schools, communes and cantonal bodies procure under
 * rules most small studios never mention — saying the threshold out loud is a
 * reason to act, not just reassurance.
 */
export default function Procurement({ t }: { t: Dictionary }) {
  return (
    <Section id="procurement" tone="surface" className="border-y border-line">
      <div className="max-w-3xl">
        <h2 className="text-3xl leading-tight tracking-tight md:text-4xl">
          {t.procurement.title}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-gray-300">{t.procurement.intro}</p>
      </div>

      <ul className="mt-12 grid gap-px overflow-hidden rounded-xl bg-line sm:grid-cols-2">
        {t.procurement.points.map((point) => (
          <li key={point.title} className="bg-surface p-6 md:p-8">
            <h3 className="text-lg leading-snug text-white">{point.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">{point.detail}</p>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-sm text-gray-500">
        <a
          href={PROCUREMENT.simapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 transition-colors hover:text-primary"
        >
          simap.ch
        </a>
      </p>
    </Section>
  );
}
