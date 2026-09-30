'use client';

import { useEffect, useState, type FormEvent } from 'react';
import s from './site.module.css';
import { getCopy } from './copy';

type Status = 'idle' | 'sending' | 'done' | 'error';

/** Short contact form, posting to the existing /api/lead endpoint. */
export default function LeadForm({
  locale,
  email,
  privacyHref,
  interest: preset,
}: {
  locale: string;
  email: string;
  privacyHref: string;
  /** Opens the form on this product; it must be one of the listed interests. */
  interest?: string;
}) {
  const t = getCopy(locale).contact;
  const [status, setStatus] = useState<Status>('idle');
  const [missing, setMissing] = useState(false);
  const [interest, setInterest] = useState<string>(
    preset && t.interests.includes(preset) ? preset : t.interests[t.interests.length - 1],
  );

  // A "Demander une démo" button elsewhere on the page preselects the product.
  useEffect(() => {
    const onInterest = (event: Event) => {
      const name = (event as CustomEvent<string>).detail;
      if (t.interests.includes(name)) setInterest(name);
    };
    window.addEventListener('vectra:interest', onInterest);
    return () => window.removeEventListener('vectra:interest', onInterest);
  }, [t.interests]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const mail = String(data.get('email') ?? '').trim();
    if (!name || !mail) {
      setMissing(true);
      return;
    }
    setMissing(false);
    setStatus('sending');
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email: mail,
          company: String(data.get('company') ?? ''),
          notes: `${t.interest}: ${interest}\n\n${String(data.get('notes') ?? '')}`,
          botField: String(data.get('website') ?? ''),
        }),
      });
      setStatus(response.ok ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <p className={s.formDone} role="status">
        {t.success}
      </p>
    );
  }

  return (
    <form className={s.form} onSubmit={submit} noValidate>
      <label>
        {t.name}
        <input name="name" type="text" autoComplete="name" required />
      </label>
      <label>
        {t.email}
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        {t.company}
        <input name="company" type="text" autoComplete="organization" />
      </label>
      <label>
        {t.interest}
        <select value={interest} onChange={(event) => setInterest(event.target.value)}>
          {t.interests.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
      <label className={s.formWide}>
        {t.notes}
        <textarea name="notes" rows={3} />
      </label>
      {/* Honeypot: hidden from people, so only a bot fills it. */}
      <input className={s.trap} name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className={s.formWide}>
        {missing && (
          <p className={s.formError} role="alert">
            {t.required}
          </p>
        )}
        {status === 'error' && (
          <p className={s.formError} role="alert">
            {t.error} <a href={`mailto:${email}`}>{email}</a>.
          </p>
        )}
        <button className={s.btn} type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? t.sending : `${t.send} →`}
        </button>
        <p className={s.formNote}>
          {t.disclosure} <a href={privacyHref}>{t.privacy}</a>
        </p>
      </div>
    </form>
  );
}
