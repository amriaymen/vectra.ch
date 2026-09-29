'use client';

import { useState, type CSSProperties } from 'react';
import s from './site.module.css';
import { getCopy, REGIOO_PRICE_PER_TECHNICIAN, REGIOO_SIGNUP_URL } from './copy';

const MIN = 1;
const MAX = 40;

/** Swiss thousands separator is an apostrophe. */
const chf = (amount: number) => `CHF ${String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, '’')}`;

/** Regioo's price, made tangible: move the slider, read your monthly total. */
export default function Calculator({ locale }: { locale: string }) {
  const COPY = getCopy(locale);
  const [count, setCount] = useState(5);
  const fill = ((count - MIN) / (MAX - MIN)) * 100;

  return (
    <div className={s.calc}>
      <label className={s.calcLabel} htmlFor="technicians">
        {COPY.calc.label}
        <output htmlFor="technicians">{count}</output>
      </label>
      <input
        id="technicians"
        className={s.range}
        type="range"
        min={MIN}
        max={MAX}
        value={count}
        style={{ '--fill': `${fill}%` } as CSSProperties}
        onChange={(event) => setCount(Number(event.target.value))}
      />
      <p className={s.calcTotal} aria-live="polite">
        {/* `key` replays the pop each time the number changes. */}
        <b key={count}>{chf(count * REGIOO_PRICE_PER_TECHNICIAN)}</b>
        <span>{COPY.calc.perMonth}</span>
      </p>
      <p className={s.calcDetail}>{COPY.calc.detail}</p>
      <div className={s.pickerAction}>
        <a className={s.btn} data-magnetic href={REGIOO_SIGNUP_URL} target="_blank" rel="noopener noreferrer">
          {COPY.calc.cta} →
        </a>
        <small>{COPY.calc.note}</small>
      </div>
    </div>
  );
}
