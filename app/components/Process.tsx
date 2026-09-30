import Section from './Section';

/**
 * The one electric-blue band. Blue is the "how it works" tone; lime stays
 * reserved for the single call-to-action band so it keeps meaning "act here".
 *
 * Takes its copy as props so each department page carries its own three steps.
 */
export default function Process({
  title,
  intro,
  steps,
}: {
  title: string;
  intro: string;
  steps: { step: string; title: string; detail: string }[];
}) {
  return (
    <Section id="process" tone="accent">
      <div className="max-w-3xl">
        <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl">
          {title}
        </h2>
        {/* Alphas are preserved exactly: /80 and /25 were tuned against this
            blue, and resolving them into opaque tokens would render the same
            today while silently changing what happens on any other band. */}
        <p className="mt-6 text-lg leading-relaxed text-band-lead/80">{intro}</p>
      </div>

      <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
        {steps.map((item) => (
          <li key={item.step} className="border-t border-band-line/25 pt-6">
            <p className="font-medium text-sm tabular-nums text-band-brand">{item.step}</p>
            <h3 className="mt-3 text-xl leading-snug md:text-2xl">{item.title}</h3>
            <p className="mt-3 leading-relaxed text-band-lead/80">{item.detail}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
