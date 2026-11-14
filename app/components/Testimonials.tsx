import Section from './Section';
import Reveal from './Reveal';
import { TESTIMONIALS, type Dictionary } from '../data';

/**
 * Named client quotes. An empty TESTIMONIALS array renders nothing — same
 * discipline as the case-study image guard. Anonymous quotes read as invented,
 * so name, role and organisation are all required by the type.
 */
export default function Testimonials({ t }: { t: Dictionary }) {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <Section tone="light">
      <Reveal>
        <h2 className="max-w-3xl text-3xl leading-tight tracking-tight md:text-4xl">
          {t.testimonials.title}
        </h2>
      </Reveal>

      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
        {TESTIMONIALS.map((item, index) => (
          <Reveal as="li" key={`${item.organisation}-${item.name}`} delay={index * 80}>
            <figure className="flex h-full flex-col border border-gray-200 p-6 md:p-8">
              <blockquote className="flex-1 text-lg leading-relaxed text-gray-700">
                <p>{item.quote}</p>
              </blockquote>
              <figcaption className="mt-6 border-t border-gray-200 pt-4 text-sm">
                <span className="font-medium block text-background">{item.name}</span>
                <span className="text-gray-500">
                  {item.role} · {item.organisation}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
