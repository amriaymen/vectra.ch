import { CALENDLY_URL, type Dictionary } from '../data';

export interface Scope {
  summary: string;
  phases: { name: string; weeks: string; detail: string }[];
  deliverables: string[];
  weekEstimate: string;
  priceBand: string;
  assumptions: string[];
  risks: string[];
  outOfScope: string[];
}

function List({ title, items }: { title: string; items: string[] }) {
  if (!items?.length) return null;
  return (
    <div>
      <h4 className="text-sm uppercase tracking-[0.15em] text-band-muted">{title}</h4>
      <ul className="mt-3 grid gap-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-band-lead">
            <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ScopeResult({
  t,
  scope,
  emailed,
  onRestart,
}: {
  t: Dictionary;
  scope: Scope;
  emailed: boolean;
  onRestart: () => void;
}) {
  const r = t.scope.result;

  return (
    <div>
      <h3 className="text-2xl leading-snug">{r.title}</h3>
      <p className="mt-4 leading-relaxed text-band-lead">{scope.summary}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-md border border-band-line bg-band-card p-4">
          <p className="text-sm text-band-muted">{r.timeline}</p>
          <p className="font-medium mt-1 text-xl text-band-fg">
            {scope.weekEstimate} {r.weeks}
          </p>
        </div>
        <div className="rounded-md border border-band-brand/40 bg-band-card p-4">
          <p className="text-sm text-band-muted">{r.range}</p>
          <p className="font-medium mt-1 text-xl text-band-brand">{scope.priceBand}</p>
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-band-muted">{r.disclaimer}</p>

      <ol className="mt-8 grid gap-4 border-t border-band-line pt-8">
        {scope.phases.map((phase, index) => (
          <li key={phase.name} className="flex gap-4">
            <span className="font-medium shrink-0 tabular-nums text-band-faint">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <p className="font-medium text-band-fg">
                {phase.name}
                <span className="ml-2 font-normal text-sm text-band-muted">
                  {phase.weeks} {r.weeks}
                </span>
              </p>
              <p className="mt-1 text-sm leading-relaxed text-band-body">{phase.detail}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-8 border-t border-band-line pt-8">
        <List title={r.deliverables} items={scope.deliverables} />
        <List title={r.assumptions} items={scope.assumptions} />
        <List title={r.risks} items={scope.risks} />
        <List title={r.outOfScope} items={scope.outOfScope} />
      </div>

      {emailed && <p className="mt-8 text-sm leading-relaxed text-band-body">{r.emailed}</p>}

      <div className="mt-8 flex flex-wrap gap-4 border-t border-band-line pt-8">
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[48px] items-center rounded-md bg-primary px-6 font-medium text-background transition-colors hover:bg-primary-hover"
        >
          {r.book}
        </a>
        <button
          type="button"
          onClick={onRestart}
          className="min-h-[48px] rounded-md border border-band-line px-6 text-sm transition-colors hover:border-primary hover:text-band-brand"
        >
          {r.restart}
        </button>
      </div>
    </div>
  );
}
