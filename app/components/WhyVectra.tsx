import Section from './Section';
import Reveal from './Reveal';
import { CREDENTIALS, type Dictionary } from '../data';

export default function WhyVectra({ t }: { t: Dictionary }) {
  const { title, trustTitle, items, credentials } = t.whyVectra;

  // Same guard as ProofBar and Testimonials: an unverified fact renders nothing
  // rather than a placeholder. With nothing left to show, the panel goes and the
  // reasons take the full width — no empty second column.
  const verified = CREDENTIALS.filter((c) => c.value !== null);

  return (
    <Section>
      <Reveal>
        <h2 className="max-w-4xl text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl">
          {title}
        </h2>
      </Reveal>

      <div
        className={`mt-16 grid gap-12 lg:gap-16 ${verified.length > 0 ? 'lg:grid-cols-2' : ''}`}
      >
        <dl className="grid gap-8">
          {items.map((item) => (
            <div key={item.label} className="border-l-2 border-primary pl-6">
              <dt className="font-medium leading-snug text-white">{item.label}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-gray-400">{item.detail}</dd>
            </div>
          ))}
        </dl>

        {verified.length > 0 && (
          <div className="h-fit border border-line bg-surface p-6 md:p-8">
            <h3 className="text-xl leading-snug text-white">{trustTitle}</h3>
            <ul className="mt-6 grid gap-6">
              {verified.map((credential) => (
                <li
                  key={credential.id}
                  className="grid gap-1 border-b border-line pb-6 last:border-0 last:pb-0"
                >
                  <span className="text-xs uppercase tracking-wider text-gray-500">
                    {credentials[credential.id]}
                  </span>
                  <span className="text-sm leading-relaxed text-gray-300">{credential.value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Section>
  );
}
