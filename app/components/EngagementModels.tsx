import Section from './Section';
import Reveal from './Reveal';
import type { Dictionary } from '../data';

const MODEL_ICONS = [
  // 1. License Software (Cube / Layers)
  <svg key="license" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>,
  // 2. Custom Software (Code Brackets)
  <svg key="custom" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>,
  // 3. Ongoing Partnership (Continuous Loop)
  <svg key="partnership" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>,
];

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
                className="flex h-10 w-10 items-center justify-center bg-background rounded-md shadow-sm"
              >
                {MODEL_ICONS[index % MODEL_ICONS.length]}
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
