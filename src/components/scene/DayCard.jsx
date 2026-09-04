import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PLAY } from '../../data/copy.js';
import { moodFor } from '../../data/scene.js';
import styles from './DayCard.module.css';

/* A date card between days.

   "Advance to Day 3" used to cut straight from one summary into the next
   briefing, and five days read as one long afternoon. This is the chapter
   break: the dateline set large, the day's title, and the one-line mood the
   scene system already carries for it. Two seconds, or a click, or any key.

   Decorative and hidden from assistive technology: the briefing underneath is
   the content, and a screen reader should land there rather than on a card
   that says the same date the briefing's own heading says. Under reduced
   motion it is never shown at all — see `dayCardWanted` — because a two-second
   interstitial is motion whether or not anything on it moves. */

export const dayCardWanted = () =>
  typeof window !== 'undefined' &&
  !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

export default function DayCard({ day, onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2200);
    const onKey = () => onDone();
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
    };
  }, [onDone]);

  return createPortal(
    <div className={styles.card} aria-hidden="true" onClick={onDone}>
      <div className={styles.inner}>
        <span className={styles.number}>{PLAY.dayLabel(day.number)}</span>
        <span className={styles.dateline}>{day.dateline}</span>
        <span className={styles.title}>{day.title}</span>
        <span className={styles.note}>{moodFor(day.number).note}</span>
      </div>
      <span className={styles.hint}>{PLAY.dayCardHint}</span>
    </div>,
    document.body,
  );
}
