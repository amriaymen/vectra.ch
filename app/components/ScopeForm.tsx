'use client';

import { useEffect, useState } from 'react';
import Section from './Section';
import ScopeResult, { type Scope } from './ScopeResult';
import type { Dictionary, Locale } from '../data';

const TOTAL_STEPS = 5;

/** Module options per domain — keeps step 2 relevant instead of a generic list. */
const MODULES: Record<string, string[]> = {
  education: ['enrolment', 'attendance', 'grading', 'parentPortal', 'invoicing', 'scheduling', 'multiSite'],
  sports: ['calendar', 'booking', 'memberships', 'payments', 'usage', 'multiSite'],
  hr: ['checkin', 'leave', 'salary', 'payroll', 'staffRecords', 'multiSite'],
  other: ['dashboard', 'records', 'invoicing', 'payments', 'scheduling', 'multiSite'],
};

const MODULE_LABELS: Record<string, { en: string; fr: string; de: string }> = {
  enrolment: { en: 'Enrolment & records', fr: 'Inscriptions et dossiers', de: 'Einschreibungen & Akten' },
  attendance: { en: 'Attendance', fr: 'Présences', de: 'Anwesenheit' },
  grading: { en: 'Grading & reports', fr: 'Notes et bulletins', de: 'Noten & Zeugnisse' },
  parentPortal: { en: 'Parent portal', fr: 'Portail parents', de: 'Elternportal' },
  invoicing: { en: 'Invoicing', fr: 'Facturation', de: 'Rechnungsstellung' },
  scheduling: { en: 'Scheduling', fr: 'Planification', de: 'Stundenplanung' },
  multiSite: { en: 'Multi-site administration', fr: 'Administration multi-sites', de: 'Standortübergreifende Verwaltung' },
  calendar: { en: 'Resource calendar', fr: 'Calendrier des ressources', de: 'Ressourcen-Kalender' },
  booking: { en: 'Online booking', fr: 'Réservation en ligne', de: 'Online-Buchung' },
  memberships: { en: 'Memberships', fr: 'Abonnements', de: 'Mitgliedschaften' },
  payments: { en: 'Payments', fr: 'Paiements', de: 'Zahlungen' },
  usage: { en: 'Usage reporting', fr: 'Rapports d’utilisation', de: 'Auslastungsberichte' },
  checkin: { en: 'Check-in / checkout', fr: 'Pointage entrées / sorties', de: 'Ein- / Ausstempeln' },
  leave: { en: 'Leave management', fr: 'Gestion des congés', de: 'Absenzenverwaltung' },
  salary: { en: 'Salary calculation', fr: 'Calcul des salaires', de: 'Lohnberechnung' },
  payroll: { en: 'Payroll reporting', fr: 'Rapports de paie', de: 'Payroll-Reporting' },
  staffRecords: { en: 'Staff records', fr: 'Dossiers du personnel', de: 'Personalakten' },
  dashboard: { en: 'Dashboards & reporting', fr: 'Tableaux de bord et reporting', de: 'Dashboards & Reporting' },
  records: { en: 'Records management', fr: 'Gestion des dossiers', de: 'Aktenverwaltung' },
};

type Status = 'idle' | 'submitting' | 'done' | 'error';

export default function ScopeForm({ t, locale }: { t: Dictionary; locale: Locale }) {
  const [step, setStep] = useState(1);
  const [domain, setDomain] = useState('education');
  const [modules, setModules] = useState<string[]>([]);
  const [scale, setScale] = useState({ users: '', sites: '', existing: '' });
  const [timeline, setTimeline] = useState('standard');
  const [budget, setBudget] = useState('unsure');
  const [form, setForm] = useState({ name: '', email: '', company: '', notes: '', botField: '' });

  const [status, setStatus] = useState<Status>('idle');
  const [scope, setScope] = useState<Scope | null>(null);
  const [emailed, setEmailed] = useState(false);
  const [degraded, setDegraded] = useState(false);
  const [error, setError] = useState('');
  const [progressIndex, setProgressIndex] = useState(0);

  const moduleLabel = (id: string) => MODULE_LABELS[id]?.[locale] ?? id;

  // Staged progress: generation runs 15–40s, too long for a bare spinner.
  useEffect(() => {
    if (status !== 'submitting') {
      setProgressIndex(0);
      return;
    }
    const timers = [
      setTimeout(() => setProgressIndex(1), 4000),
      setTimeout(() => setProgressIndex(2), 12000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [status]);

  const toggleModule = (id: string) =>
    setModules((current) =>
      current.includes(id) ? current.filter((m) => m !== id) : [...current, id],
    );

  const reset = () => {
    setStatus('idle');
    setStep(1);
    setScope(null);
    setDegraded(false);
    setModules([]);
    setForm({ name: '', email: '', company: '', notes: '', botField: '' });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('submitting');
    setError('');

    try {
      const response = await fetch('/api/scope', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          locale,
          domain: t.scope.domains[domain as keyof typeof t.scope.domains],
          modules: modules.map(moduleLabel),
          ...scale,
          timeline: t.scope.timelines[timeline as keyof typeof t.scope.timelines].label,
          budget: t.scope.budgets[budget as keyof typeof t.scope.budgets],
        }),
      });

      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || `Request failed (${response.status})`);

      if (body.scope) {
        setScope(body.scope as Scope);
        setEmailed(Boolean(body.emailed));
      } else {
        setDegraded(true);
      }
      setStatus('done');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : t.scope.errors.generic);
    }
  };

  const fieldClass =
    'w-full rounded-md border border-line bg-background px-4 py-3 text-base text-white placeholder-gray-500 transition-colors focus:border-primary focus:outline-none';
  const labelClass = 'mb-2 block text-sm text-gray-300';
  const optionClass = (active: boolean) =>
    `flex min-h-[48px] cursor-pointer items-start gap-3 rounded-md border px-4 py-3 transition-colors ${
      active ? 'border-primary bg-background text-white' : 'border-line text-gray-400 hover:border-gray-600'
    }`;

  const nextDisabled = (step === 2 && modules.length === 0) || false;

  return (
    <Section id="scope" className="border-y border-line">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
        <div>
          <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl">
            {t.scope.title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-300">{t.scope.intro}</p>
          <p className="mt-6 text-sm leading-relaxed text-gray-500">{t.scope.aside}</p>
        </div>

        <div className="border border-line bg-surface p-6 md:p-10">
          {status === 'done' && scope ? (
            <ScopeResult t={t} scope={scope} emailed={emailed} onRestart={reset} />
          ) : status === 'done' && degraded ? (
            <div className="py-8">
              <h3 className="text-2xl leading-snug">{t.scope.result.title}</h3>
              <p className="mt-4 leading-relaxed text-gray-400">{t.scope.errors.degraded}</p>
              <button
                type="button"
                onClick={reset}
                className="mt-8 min-h-[48px] rounded-md border border-line px-6 text-sm transition-colors hover:border-primary hover:text-primary"
              >
                {t.scope.result.restart}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-8">
                <div className="mb-2 flex items-baseline justify-between gap-4 text-sm text-gray-400">
                  <span>
                    {t.scope.stepOf
                      .replace('{current}', String(step))
                      .replace('{total}', String(TOTAL_STEPS))}
                  </span>
                  <span className="text-right">{t.scope.stepNames[step - 1]}</span>
                </div>
                <div
                  role="progressbar"
                  aria-valuenow={step}
                  aria-valuemin={1}
                  aria-valuemax={TOTAL_STEPS}
                  aria-label={t.scope.stepNames[step - 1]}
                  className="h-1 w-full overflow-hidden rounded-full bg-surface-hover"
                >
                  <div
                    className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
                    style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                  />
                </div>
              </div>

              {step === 1 && (
                <fieldset>
                  <legend className="text-xl leading-snug">{t.scope.q1.title}</legend>
                  <p className="mt-2 text-sm text-gray-400">{t.scope.q1.hint}</p>
                  <div className="mt-6 grid gap-3">
                    {Object.entries(t.scope.domains).map(([key, label]) => (
                      <label key={key} className={optionClass(domain === key)}>
                        <input
                          type="radio"
                          name="domain"
                          checked={domain === key}
                          onChange={() => {
                            setDomain(key);
                            setModules([]);
                          }}
                          className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
                        />
                        <span className="text-sm">{label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              {step === 2 && (
                <fieldset>
                  <legend className="text-xl leading-snug">{t.scope.q2.title}</legend>
                  <p className="mt-2 text-sm text-gray-400">{t.scope.q2.hint}</p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {(MODULES[domain] ?? MODULES.other).map((id) => (
                      <label key={id} className={optionClass(modules.includes(id))}>
                        <input
                          type="checkbox"
                          checked={modules.includes(id)}
                          onChange={() => toggleModule(id)}
                          className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
                        />
                        <span className="text-sm">{moduleLabel(id)}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              {step === 3 && (
                <div>
                  <h3 className="text-xl leading-snug">{t.scope.q3.title}</h3>
                  <p className="mt-2 text-sm text-gray-400">{t.scope.q3.hint}</p>
                  <div className="mt-6 grid gap-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className={labelClass} htmlFor="scope-users">
                          {t.scope.fields.users}
                        </label>
                        <input
                          id="scope-users"
                          type="text"
                          inputMode="numeric"
                          value={scale.users}
                          onChange={(e) => setScale({ ...scale, users: e.target.value })}
                          className={fieldClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="scope-sites">
                          {t.scope.fields.sites}
                        </label>
                        <input
                          id="scope-sites"
                          type="text"
                          inputMode="numeric"
                          value={scale.sites}
                          onChange={(e) => setScale({ ...scale, sites: e.target.value })}
                          className={fieldClass}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="scope-existing">
                        {t.scope.fields.existing}
                      </label>
                      <input
                        id="scope-existing"
                        type="text"
                        value={scale.existing}
                        onChange={(e) => setScale({ ...scale, existing: e.target.value })}
                        placeholder={t.scope.fields.existingPlaceholder}
                        className={fieldClass}
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="grid gap-8">
                  <fieldset>
                    <legend className="text-xl leading-snug">{t.scope.q4.title}</legend>
                    <p className="mt-2 text-sm text-gray-400">{t.scope.q4.hint}</p>
                    <div className="mt-6 grid gap-3">
                      {Object.entries(t.scope.timelines).map(([key, option]) => (
                        <label key={key} className={optionClass(timeline === key)}>
                          <input
                            type="radio"
                            name="timeline"
                            checked={timeline === key}
                            onChange={() => setTimeline(key)}
                            className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
                          />
                          <span>
                            <span className="block text-sm text-white">{option.label}</span>
                            <span className="mt-0.5 block text-xs text-gray-400">{option.detail}</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="sr-only">{t.scope.q4.hint}</legend>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(t.scope.budgets).map(([key, label]) => (
                        <label
                          key={key}
                          className={`inline-flex min-h-[44px] cursor-pointer items-center rounded-full border px-4 text-sm transition-colors ${
                            budget === key
                              ? 'border-primary bg-primary text-background'
                              : 'border-line text-gray-400 hover:border-gray-600'
                          }`}
                        >
                          <input
                            type="radio"
                            name="budget"
                            checked={budget === key}
                            onChange={() => setBudget(key)}
                            className="sr-only"
                          />
                          {label}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>
              )}

              {step === 5 && (
                <div>
                  <h3 className="text-xl leading-snug">{t.scope.q5.title}</h3>
                  <div className="mt-6 grid gap-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className={labelClass} htmlFor="scope-name">
                          {t.scope.fields.name} <span aria-hidden="true">*</span>
                        </label>
                        <input
                          id="scope-name"
                          type="text"
                          required
                          autoComplete="name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className={fieldClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="scope-email">
                          {t.scope.fields.email} <span aria-hidden="true">*</span>
                        </label>
                        <input
                          id="scope-email"
                          type="email"
                          required
                          autoComplete="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className={fieldClass}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="scope-company">
                        {t.scope.fields.company}
                      </label>
                      <input
                        id="scope-company"
                        type="text"
                        autoComplete="organization"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="scope-notes">
                        {t.scope.fields.notes}
                      </label>
                      <textarea
                        id="scope-notes"
                        rows={4}
                        maxLength={4000}
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        placeholder={t.scope.fields.notesPlaceholder}
                        className={fieldClass}
                      />
                    </div>

                    {/* Honeypot — hidden from users, filled by bots. */}
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      value={form.botField}
                      onChange={(e) => setForm({ ...form, botField: e.target.value })}
                      className="hidden"
                    />
                  </div>
                </div>
              )}

              {status === 'submitting' && (
                <div aria-live="polite" className="mt-8 grid gap-2 rounded-md border border-line bg-surface p-4">
                  {Object.values(t.scope.progress).map((label, index) => (
                    <p
                      key={label}
                      className={`flex items-center gap-2 text-sm transition-colors ${
                        index <= progressIndex ? 'text-primary' : 'text-gray-600'
                      }`}
                    >
                      <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-current" />
                      {label}
                    </p>
                  ))}
                </div>
              )}

              {status === 'error' && (
                <p
                  role="alert"
                  className="mt-6 rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                >
                  {error} {t.scope.errors.notSent}
                </p>
              )}

              <div className="mt-8 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    disabled={status === 'submitting'}
                    className="min-h-[44px] px-2 text-sm text-gray-400 transition-colors hover:text-white disabled:opacity-40"
                  >
                    {t.scope.back}
                  </button>
                ) : (
                  <span />
                )}

                {step < TOTAL_STEPS ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    disabled={nextDisabled}
                    className="min-h-[48px] rounded-md bg-primary px-6 font-medium text-background transition-colors hover:bg-primary-hover disabled:opacity-40"
                  >
                    {t.scope.next}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="min-h-[48px] rounded-md bg-primary px-8 font-medium text-background transition-colors hover:bg-primary-hover disabled:opacity-60"
                  >
                    {status === 'submitting' ? t.scope.submitting : t.scope.submit}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
