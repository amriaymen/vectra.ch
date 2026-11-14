import Section from './Section';
import type { Dictionary } from '../data';

/** Risk reversal, placed high. These are commitments, not performance metrics. */
export default function TrustStrip({ t }: { t: Dictionary }) {
  // seam={false}: the border-y rule IS this strip's boundary treatment — a 1px
  // line and a gradient ramp are two answers to the same question.
  return (
    <Section padding="tight" seam={false} className="border-y border-band-line">
      {/* 4 items: 2×2 on tablet, one row on desktop. md:grid-cols-3 would orphan one. */}
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {t.trust.map((point) => (
          <li key={point.label} className="flex gap-3">
            <svg
              className="mt-1.5 h-4 w-4 shrink-0 fill-band-brand"
              viewBox="0 0 18 14"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M17.8132 1.63827C17.4365 0.667034 16.669 0.82034 15.8374 0.985126C15.3407 1.08864 13.1316 1.73527 9.63624 5.42094C8.18573 6.95058 7.22887 8.17006 6.59888 9.10009C6.21404 8.62759 5.77314 8.12208 5.31013 7.65887C3.8862 6.23532 2.29825 5.2577 2.2315 5.21662C1.56513 4.80926 0.695214 5.01887 0.286699 5.68473C-0.1213 6.35058 0.087665 7.22191 0.753001 7.63082C0.76661 7.63939 2.13024 8.48248 3.30825 9.66081C4.50961 10.8623 5.5981 12.4871 5.60881 12.5029C5.87382 12.9013 6.31878 13.1338 6.78689 13.1338C6.86725 13.1338 6.94838 13.1271 7.02913 13.1131C7.5816 13.0171 8.02539 12.604 8.16071 12.0597C8.16412 12.0466 8.72543 10.4953 11.6905 7.36916C14.0788 4.85041 15.6714 4.04989 16.2232 3.82783C16.6521 3.64357 17.1302 3.43789 17.1406 3.43351C17.8604 3.13779 18.0944 2.36359 17.8132 1.63827Z" />
            </svg>
            <div>
              <p className="font-medium text-band-fg">{point.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-band-body">{point.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
