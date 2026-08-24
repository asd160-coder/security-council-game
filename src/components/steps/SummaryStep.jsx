import { EntryCard } from '../panels/DossierRail.jsx';
import { resolveEntry } from '../../lib/entries.js';
import DraftingTray from '../panels/DraftingTray.jsx';
import { Button, Reveal } from '../ui/index.jsx';
import { getTracker } from '../../data/trackers.js';
import { deltaRegister, formatDelta } from '../../lib/format.js';
import { PLAY, SUMMARY } from '../../data/copy.js';
import styles from './steps.module.css';

const MOVEMENT_CLASS = {
  danger: styles.movementDanger,
  calm: styles.movementCalm,
  legitimacy: styles.movementLegitimacy,
  neutral: styles.movementNeutral,
};

/* End of day.

   Three things a student should leave with: what moved, what they now know
   that they did not this morning, and one sentence about what is coming. The
   draft so far is shown because the ladder should feel cumulative from the
   first rung. */

export default function SummaryStep({ day, step, deltas, unlockedToday, draft, onAdvance }) {
  const moved = Object.entries(deltas).filter(([, value]) => value !== 0);
  /* One preview only. The rest are in the rail, and a summary that reprints
     the whole file stops being a summary. */
  const preview = unlockedToday.length > 0 ? resolveEntry(unlockedToday[unlockedToday.length - 1]) : null;

  return (
    <div className={`${styles.step} ${styles.stepWide}`}>
      <Reveal className={styles.head}>
        <span className="eyebrow">{step.eyebrow}</span>
        <h2 className={styles.dayTitle} style={{ fontSize: 'var(--fs-screen-title)' }}>
          {PLAY.dayLabel(day.number)} · {day.title}
        </h2>
      </Reveal>

      <Reveal delay={120} className={styles.prose}>
        {step.body.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </Reveal>

      <Reveal delay={240}>
        <hr className={styles.rule} />
      </Reveal>

      <Reveal delay={300}>
        <div className={styles.summaryGrid}>
          <section className={styles.summaryBlock} aria-label={SUMMARY.movement}>
            <span className="eyebrow">{SUMMARY.movement}</span>
            {moved.length === 0 ? (
              <p className={styles.note}>{SUMMARY.noMovement}</p>
            ) : (
              <div className={styles.movementList}>
                {moved.map(([key, value]) => {
                  const tracker = getTracker(key);
                  const register = deltaRegister(tracker.register, value);
                  return (
                    <div key={key} className={styles.movementRow}>
                      <span className={styles.movementLabel}>{tracker.label}</span>
                      <span className={`${styles.movementValue} ${MOVEMENT_CLASS[register]}`}>
                        {formatDelta(value)}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {preview && (
            <section className={styles.summaryBlock} aria-label={SUMMARY.filed}>
              <span className="eyebrow">{SUMMARY.filed}</span>
              <EntryCard entry={preview} />
            </section>
          )}
        </div>
      </Reveal>

      <Reveal delay={420}>
        <DraftingTray draft={draft} compact />
      </Reveal>

      <Reveal delay={500} className={styles.actions}>
        <Button variant="primary" onClick={onAdvance}>
          {step.advanceLabel}
        </Button>
      </Reveal>
    </div>
  );
}
