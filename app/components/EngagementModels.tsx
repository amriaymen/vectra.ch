import Section from './Section';
import Reveal from './Reveal';
import type { Dictionary } from '../data';

export default function EngagementModels({ t }: { t: Dictionary }) {
  const { title, items } = t.engagementModels;

  return (
    <Section tone="light">
      <Reveal>
        <h2 className="max-w-4xl text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl">
          {title}
        </h2>
      </Reveal>

      <ul className="mt-16 grid gap-6 md:grid-cols-3">
        {items.map((item, index) => (
          <Reveal as="li" key={item.title} delay={index * 80}>
            <div className="flex h-full flex-col border border-gray-200 p-6 md:p-8">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center bg-background text-lg text-white"
              >
                {item.step}
              </span>
              <h3 className="mt-6 text-xl leading-snug text-background">{item.title}</h3>
              <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-gray-600">
                {item.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
