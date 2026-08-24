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
              </div>
              <p className={styles.fragmentText}>{entry.fragment}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
