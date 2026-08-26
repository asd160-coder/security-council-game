import { Reveal } from '../ui/index.jsx';
import { getTracker } from '../../data/trackers.js';
import { formatDelta } from '../../lib/format.js';
import { PLAY } from '../../data/copy.js';
import styles from './steps.module.css';

/* Day 3 drafting: revision.

   Day 1 chose a tone, Day 2 composed a clause, and this goes back to something
   already written. That is the harder academic move and the one students
   usually skip: a draft is not finished when it is first written, and deciding
   to leave it alone is also a decision.

   Holding is therefore a real option with a real trade — consistency reads as
   reliability and costs you the room to adapt — rather than the wrong answer. */

export default function DraftingReviseStep({ step, role, draft, onRevise }) {
  const target = draft.find((entry) => entry.dayNumber === step.targetDay);
  const options = step.optionsByRole[role.id] ?? [];

  return (
    <div className={styles.step}>
      <Reveal className={styles.head}>
        <span className="eyebrow">{step.eyebrow}</span>
      </Reveal>

      <Reveal delay={100} className={styles.prose}>
        <p>{step.prompt}</p>
      </Reveal>

      {/* The clause as it currently stands, on paper, before anything is done
          to it. */}
      {target && (
        <Reveal delay={180} className={styles.revisionCurrent}>
          <div className={styles.clauseSheet}>
            <span className={styles.clauseLabel}>{step.currentLabel}</span>
            <p className={styles.clauseText}>{target.fragment}</p>
          </div>
        </Reveal>
      )}

      <Reveal delay={280}>
        <div className={styles.revisionOptions} role="group" aria-label={step.prompt}>
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`${styles.choice} ${option.hold ? styles.revisionHold : ''}`}
              onClick={() =>
                /* Holding supplies no operative, and the reducer leaves the
                   line exactly as it was. */
                onRevise(option)
              }
            >
              <span className={styles.choiceLabel}>{option.label}</span>
              <span className={styles.choiceLine}>
                {option.hold ? PLAY.keepAsWritten : `… ${option.operative}`}
              </span>
              <span className={styles.operativeEffects}>
                {Object.entries(option.effects)
                  .filter(([, value]) => value !== 0)
                  .map(([key, value]) => (
                    <span key={key} className={styles.effectChip}>
                      {getTracker(key)?.label} {formatDelta(value)}
                    </span>
                  ))}
              </span>
            </button>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
