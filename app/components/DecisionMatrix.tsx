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
          <p className="mt-6 text-lg leading-relaxed text-gray-600">{subtitle}</p>
        </div>
      </Reveal>

      <div className="mt-16 max-w-4xl overflow-x-auto border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th scope="col" className="w-1/2 px-4 py-4 font-medium text-gray-600">
                {columns[0]}
              </th>
              <th
                scope="col"
                className="w-1/2 border-l border-gray-200 px-4 py-4 font-medium text-gray-600"
              >
                {columns[1]}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map((row) => (
              <tr key={row.condition}>
                <td className="px-4 py-5 leading-relaxed text-gray-600">{row.condition}</td>
                <td className="border-l border-gray-200 px-4 py-5 font-medium leading-relaxed text-background">
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
