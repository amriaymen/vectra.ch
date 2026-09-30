'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import s from './site.module.css';
import { getCopy } from './copy';

/** Where each scrap starts: x in vw, y in vh from the stage centre, and its tilt. */
const SCATTER = [
  { x: -34, y: -30, r: -9 },
  { x: 30, y: -33, r: 7 },
  { x: -38, y: 2, r: 5 },
  { x: 36, y: -4, r: -6 },
  { x: -28, y: 31, r: -4 },
  { x: 27, y: 30, r: 9 },
  { x: -6, y: -38, r: 3 },
  { x: 4, y: 38, r: -8 },
];

/**
 * The page's central idea, made physical: as the visitor scrolls, the scraps a
 * business runs on fly into one tidy system.
 *
 * Scroll drives two CSS variables on the stage: --p (0 → 1 over the whole
 * scene) and --q (0 → 1 over its last third). CSS does all the movement, so
 * there is no per-frame React work. Both default to 1 in the stylesheet: with
 * no JavaScript, or under reduced motion, the visitor simply sees the finished
 * system.
 */
export default function ChaosScene({ locale }: { locale: string }) {
  const COPY = getCopy(locale);
  const scene = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sceneEl = scene.current;
    const stageEl = stage.current;
    if (!sceneEl || !stageEl) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    sceneEl.dataset.live = 'true';
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = sceneEl.getBoundingClientRect();
      const travel = box.height - window.innerHeight;
      const p = travel > 0 ? Math.min(1, Math.max(0, -box.top / travel)) : 1;
      const q = Math.min(1, Math.max(0, (p - 0.62) / 0.3));
      stageEl.style.setProperty('--p', p.toFixed(4));
      stageEl.style.setProperty('--q', q.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={scene} className={s.scene} aria-label={COPY.chaos.after}>
      <div ref={stage} className={s.stage}>
        <p className={`${s.sceneLine} ${s.sceneBefore}`} aria-hidden="true">
          {COPY.chaos.before}
        </p>
        <h2 className={`${s.sceneLine} ${s.sceneAfter}`}>{COPY.chaos.after}</h2>

        <div className={s.window}>
          <div className={s.windowBar}>
            <span />
            <span />
            <span />
            <b>{COPY.chaos.windowTitle}</b>
          </div>
          <ul>
            {COPY.chaos.rows.map((row, index) => (
              <li key={row} style={{ '--i': index } as CSSProperties}>
                <span>{row}</span>
                <em>{COPY.chaos.done}</em>
              </li>
            ))}
          </ul>
        </div>

        {/* Decoration: the same information is in the heading and the list. */}
        <div aria-hidden="true">
          {COPY.chaos.chips.map((chip, index) => {
            const from = SCATTER[index % SCATTER.length];
            return (
              <span
                key={chip}
                className={s.scrap}
                style={{ '--x': from.x, '--y': from.y, '--r': from.r, '--i': index } as CSSProperties}
              >
                {chip}
              </span>
            );
          })}
        </div>

        <p className={s.sceneHint} aria-hidden="true">
          {COPY.chaos.hint} ↓
        </p>
      </div>
    </section>
  );
}
