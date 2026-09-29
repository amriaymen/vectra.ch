'use client';

import { useEffect, useState } from 'react';
import s from './site.module.css';
import { getSpotbaseCopy } from './spotbase.copy';

const HOURS = ['17:00', '18:00', '19:00', '20:00', '21:00'];

/** Slots already booked when the demo opens, as "court-hour" indexes. */
const TAKEN = new Set(['0-0', '0-2', '0-3', '1-1', '1-2', '2-0', '2-3', '2-4']);

/**
 * A small booking calendar the visitor can use. Clicking a free slot books it;
 * clicking a slot that is already taken is refused, which is the product's
 * first promise. The message on the right lists whatever is still free, the way
 * Spotbase's broadcast generator does.
 */
export default function CourtDemo({ locale }: { locale: string }) {
  const t = getSpotbaseCopy(locale).demo;
  const [mine, setMine] = useState<Set<string>>(new Set());
  const [refused, setRefused] = useState<string | null>(null);

  // The refusal notice clears itself, so the next click starts clean.
  useEffect(() => {
    if (!refused) return;
    const timer = window.setTimeout(() => setRefused(null), 2600);
    return () => window.clearTimeout(timer);
  }, [refused]);

  function toggle(key: string) {
    if (TAKEN.has(key)) {
      setRefused(key);
      return;
    }
    setRefused(null);
    setMine((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const freeHours = (court: number) =>
    HOURS.filter((_, hour) => !TAKEN.has(`${court}-${hour}`) && !mine.has(`${court}-${hour}`));

  return (
    <div className={s.job}>
      <div className={s.jobOffice}>
        <p className={s.jobLabel}>{t.calendar}</p>
        <div className={s.courts} role="group" aria-label={t.calendar}>
          <span />
          {HOURS.map((hour) => (
            <i key={hour}>{hour}</i>
          ))}
          {t.courts.map((court, courtIndex) => (
            <div key={court} className={s.courtRow}>
              <b>{court}</b>
              {HOURS.map((hour, hourIndex) => {
                const key = `${courtIndex}-${hourIndex}`;
                const state = TAKEN.has(key) ? 'taken' : mine.has(key) ? 'mine' : 'free';
                const label = state === 'taken' ? t.taken : state === 'mine' ? t.yours : t.free;
                return (
                  <button
                    key={key}
                    type="button"
                    data-state={state}
                    data-refused={refused === key ? 'true' : undefined}
                    aria-pressed={state === 'mine'}
                    aria-label={`${court}, ${hour}, ${label}`}
                    onClick={() => toggle(key)}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <p className={s.courtNote} role="status" data-alert={refused ? 'true' : undefined}>
          {refused ? t.blocked : t.hint}
        </p>
      </div>

      <div className={s.phone}>
        <p className={s.jobLabel}>{t.message}</p>
        <div className={s.phoneBody} aria-live="polite">
          <b>WhatsApp</b>
          {/* `key` replays the entrance whenever the free slots change. */}
          <p key={[...mine].sort().join()} className={s.sms}>
            {t.greeting}
            {t.courts.map((court, courtIndex) => {
              const free = freeHours(courtIndex);
              return (
                <span key={court} className={s.smsLine}>
                  <strong>{court}</strong> {free.length ? free.join(' · ') : t.full}
                </span>
              );
            })}
            {t.closing}
          </p>
        </div>
        <small className={s.jobCaption}>{t.caption}</small>
      </div>
    </div>
  );
}
