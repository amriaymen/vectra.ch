'use client';

import { useState } from 'react';
import s from './site.module.css';
import { getCopy, REGIOO_SIGNUP_URL } from './copy';
import { getRegiooCopy } from './regioo.copy';
import { getSpotbaseCopy } from './spotbase.copy';
import { getRaqimCopy, raqimPrice } from './raqim.copy';

/** Tells the contact form which product the visitor was looking at. */
export function announceInterest(name: string) {
  window.dispatchEvent(new CustomEvent('vectra:interest', { detail: name }));
}

/**
 * "What is your trade?" — the visitor answers one question and gets the
 * product, its price and the way to start, without leaving the page.
 */
export default function TradePicker({ locale, estimateHref }: { locale: string; estimateHref: string }) {
  const COPY = getCopy(locale);
  const options = COPY.picker.options;
  const [active, setActive] = useState(0);
  const option = options[active];

  const action =
    option.kind === 'trial'
      ? { href: REGIOO_SIGNUP_URL, external: true }
      : option.kind === 'estimate'
        ? { href: estimateHref, external: false }
        : { href: '#contact', external: false };

  return (
    <div className={s.picker}>
      <div className={s.pickerTabs} role="tablist" aria-label={COPY.picker.title}>
        {options.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`tab-${item.id}`}
            aria-selected={index === active}
            aria-controls="picker-panel"
            tabIndex={index === active ? 0 : -1}
            className={s.pickerTab}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft' && event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
              event.preventDefault();
              const step = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1;
              const next = (index + step + options.length) % options.length;
              setActive(next);
              document.getElementById(`tab-${options[next].id}`)?.focus();
            }}
          >
            <b>{item.tab}</b>
            <small>{item.tag}</small>
          </button>
        ))}
      </div>

      {/* `key` remounts the panel so its entrance animation replays on every choice. */}
      <div key={option.id} id="picker-panel" role="tabpanel" aria-labelledby={`tab-${option.id}`} className={s.pickerPanel}>
        <div className={s.pickerText}>
          <h3>{option.name}</h3>
          <p className={s.pickerLine}>{option.line}</p>
          <ul>
            {option.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <p className={s.price}>
            <b>{option.id === 'raqim' ? raqimPrice(locale) : option.price}</b>
            <span>{option.priceNote}</span>
          </p>
          <div className={s.pickerAction}>
            <a
              className={s.btn}
              data-magnetic
              href={action.href}
              {...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              onClick={() => option.kind === 'demo' && announceInterest(option.name)}
            >
              {option.cta} →
            </a>
            <small>{option.ctaNote}</small>
          </div>
          {option.id === 'regioo' && (
            <a className={s.more} href={`/${locale}/regioo`}>
              {getRegiooCopy(locale).more} →
            </a>
          )}
          {option.id === 'spotbase' && (
            <a className={s.more} href={`/${locale}/spotbase`}>
              {getSpotbaseCopy(locale).more} →
            </a>
          )}
          {option.id === 'raqim' && (
            <a className={s.more} href={`/${locale}/raqim`}>
              {getRaqimCopy(locale).more} →
            </a>
          )}
        </div>

        <div className={s.screen} aria-hidden="true">
          <div className={s.windowBar}>
            <span />
            <span />
            <span />
            <b>{option.name}</b>
          </div>
          <ul>
            {option.screen.map(([when, what, state], index) => (
              <li key={what} style={{ animationDelay: `${120 + index * 90}ms` }}>
                <i>{when}</i>
                <span>{what}</span>
                <em>{state}</em>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
