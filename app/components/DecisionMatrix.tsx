import Section from './Section';
import Reveal from './Reveal';
import type { Dictionary } from '../data';

export default function DecisionMatrix({ t }: { t: Dictionary }) {
  const { title, subtitle, columns, rows } = t.decisionMatrix;

  return (
    <Section tone="light">
      <Reveal>
        <div className="max-w-4xl">
          <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl">{title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-band-lead">{subtitle}</p>
        </div>
      </Reveal>

      <div className="mt-16 max-w-4xl overflow-x-auto border border-band-line">
        <table className="w-full text-left text-sm">
          {/* bg-band-inset: the header row is recessed one step from the band,
              which is what gray-50 was doing here. */}
          <thead className="border-b border-band-line bg-band-inset">
            <tr>
              <th scope="col" className="w-1/2 px-4 py-4 font-medium text-band-lead">
                {columns[0]}
              </th>
              <th
                scope="col"
                className="w-1/2 border-l border-band-line px-4 py-4 font-medium text-band-lead"
              >
                {columns[1]}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-band-line">
            {rows.map((row) => (
              <tr key={row.condition}>
                <td className="px-4 py-5 leading-relaxed text-band-lead">{row.condition}</td>
                <td className="border-l border-band-line px-4 py-5 font-medium leading-relaxed text-band-fg">
                  {row.choice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
