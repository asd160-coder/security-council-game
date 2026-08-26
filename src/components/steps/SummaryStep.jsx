import { EntryCard } from '../panels/DossierRail.jsx';
import { resolveEntry } from '../../lib/entries.js';
import DraftingTray from '../panels/DraftingTray.jsx';
import { Button, Reveal } from '../ui/index.jsx';
import { getTracker } from '../../data/trackers.js';
import { deltaRegister, formatDelta, formatValue } from '../../lib/format.js';
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

export default function SummaryStep({ day, step, deltas, trackers, unlockedToday, draft, onAdvance }) {
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
                      <span className={styles.movementPair}>
                        {/* Where it now stands, then how far it came today.
                            From Day 2 these are different numbers, and the
                            standing is the one that carries into tomorrow. */}
                        {trackers && (
                          <span className={styles.movementStanding}>
                            {formatValue(trackers[key])}
                          </span>
                        )}
                        <span className={`${styles.movementValue} ${MOVEMENT_CLASS[register]}`}>
                          {formatDelta(value)}
                        </span>
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

      {/* One sentence pointing at tomorrow. The field has been in the day data
          since Day 1 and was never rendered; Day 2 needs it, because its whole
          job is to hand the player to Day 3. */}
      {step.foreshadow && (
        <Reveal delay={470} className={styles.tomorrow}>
          <span className="eyebrow">{SUMMARY.tomorrow}</span>
          <p className={styles.tomorrowText}>{step.foreshadow}</p>
        </Reveal>
      )}

      <Reveal delay={500} className={styles.actions}>
        <Button variant="primary" onClick={onAdvance}>
          {step.advanceLabel}
        </Button>
      </Reveal>
    </div>
  );
}
