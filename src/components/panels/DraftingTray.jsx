import { PLAY } from '../../data/copy.js';
import { Eyebrow } from '../ui/index.jsx';
import styles from './DraftingTray.module.css';

/* The statement, assembled one fragment per day.

   On Day 1 it holds a single line. The tray exists in this slice anyway,
   because its job across the full scenario is to make the drafting ladder
   visible from the beginning — a student should be able to see the document
   growing, not discover it on Day 5. */

export default function DraftingTray({ draft, compact = false }) {
  return (
    <section className={`${styles.tray} ${compact ? styles.compact : ''}`} aria-label={PLAY.draft}>
      <div className={styles.head}>
        <Eyebrow>{PLAY.draft}</Eyebrow>
      </div>

      {draft.length === 0 ? (
        <p className={styles.empty}>{PLAY.draftEmpty}</p>
      ) : (
        <div className={styles.sheet}>
          {draft.map((entry, index) => (
            <div key={entry.dayNumber} className={styles.fragment}>
              <div className={styles.fragmentHead}>
                <span className={styles.fragmentIndex}>{PLAY.draftFragment(index + 1)}</span>
                <span className={styles.fragmentTone}>{entry.label}</span>
                {entry.revised && <span className={styles.revisedMark}>{PLAY.revised}</span>}
              </div>
              <p className={styles.fragmentText}>{entry.fragment}</p>
              {/* A revised clause keeps the line it replaced. The point of a
                  drafting ladder is that the document has a history, and that
                  is only legible if the earlier wording is still visible. */}
              {entry.revised && entry.original && entry.original !== entry.fragment && (
                <p className={styles.fragmentOriginal}>
                  <span className={styles.originalLabel}>{PLAY.previously}</span>
                  {entry.original}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
