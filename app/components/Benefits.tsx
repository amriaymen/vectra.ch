import Section from './Section';
import type { Dictionary } from '../data';

export default function Benefits({ t }: { t: Dictionary }) {
  return (
    <Section id="benefits" tone="light">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
        <div>
          <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl">
            {t.benefits.title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-600">{t.benefits.intro}</p>
        </div>

        <ul className="grid gap-px overflow-hidden rounded-xl bg-gray-200">
          {t.benefits.items.map((benefit, index) => (
            <li key={benefit.title} className="bg-white p-6 md:p-8">
              <div className="flex gap-5">
                <span className="font-medium text-lg tabular-nums text-gray-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-xl leading-snug">{benefit.title}</h3>
                  <p className="mt-2 leading-relaxed text-gray-600">{benefit.detail}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
