'use client';

import { useEffect, useState } from 'react';
import s from './site.module.css';
import { getRegiooCopy } from './regioo.copy';

const STEP_MS = 2800;

/**
 * One field job, played step by step: what the office sees on the left, what
 * the customer receives on the right. It plays on its own, pauses while the
 * visitor is pointing at it or using the keyboard, and any step can be clicked.
 * Under reduced motion it never auto-advances.
 */
export default function JobDemo({ locale, job }: { locale: string; job?: string }) {
  const t = getRegiooCopy(locale).demo;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setActive((step) => (step + 1) % t.steps.length), STEP_MS);
    return () => window.clearInterval(timer);
  }, [paused, t.steps.length]);

  const step = t.steps[active];

  return (
    <div
      className={s.job}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={s.jobOffice}>
        <p className={s.jobLabel}>{t.office}</p>
        {job && <p className={s.jobTitle}>{job}</p>}
        <ol>
          {t.steps.map((item, index) => (
            <li key={item.label} data-state={index < active ? 'done' : index === active ? 'now' : 'next'}>
              <button type="button" aria-current={index === active ? 'step' : undefined} onClick={() => setActive(index)}>
                <i>{item.time}</i>
                <span>{item.label}</span>
                <em>{item.status}</em>
              </button>
            </li>
          ))}
        </ol>
        <div className={s.jobBar} aria-hidden="true">
          <span style={{ width: `${((active + 1) / t.steps.length) * 100}%` }} />
        </div>
      </div>

      <div className={s.phone}>
        <p className={s.jobLabel}>{t.customer}</p>
        <div className={s.phoneBody} aria-live="polite">
          <b>{t.sender}</b>
          {/* `key` replays the entrance each time the step changes. */}
          {step.sms ? (
            <p key={active} className={s.sms}>
              {step.sms}
              <small>{step.time}</small>
            </p>
          ) : (
            <p key={active} className={s.smsNone}>
              {t.none}
            </p>
          )}
        </div>
        <small className={s.jobCaption}>{t.caption}</small>
      </div>
    </div>
  );
}
