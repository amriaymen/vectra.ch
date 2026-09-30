'use client';

import { useEffect, useState } from 'react';
import s from './site.module.css';
import { getRaqimCopy } from './raqim.copy';

const STEP_MS = 2800;

/**
 * One enrolment, played step by step: the office's admissions queue on the
 * left, the family's own space on the right. Same behaviour as the Regioo
 * demo: plays on its own, pauses under the pointer, every step is clickable,
 * never auto-advances under reduced motion.
 */
export default function AdmissionDemo({ locale }: { locale: string }) {
  const t = getRaqimCopy(locale).demo;
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
        <p className={s.jobTitle}>{t.student}</p>
        <ol>
          {t.steps.map((item, index) => (
            <li key={item.label} data-state={index < active ? 'done' : index === active ? 'now' : 'next'}>
              <button type="button" aria-current={index === active ? 'step' : undefined} onClick={() => setActive(index)}>
                <i>{String(index + 1).padStart(2, '0')}</i>
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
        <p className={s.jobLabel}>{t.family}</p>
        <div className={s.phoneBody} aria-live="polite">
          <b>Raqim</b>
          {/* `key` replays the entrance each time the step changes. */}
          <p key={active} className={s.sms}>
            {step.family}
            <small>{step.status}</small>
          </p>
        </div>
        <small className={s.jobCaption}>{t.caption}</small>
      </div>
    </div>
  );
}
