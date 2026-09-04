import { Button, Field, Paper, PaperBody, Reveal } from '../ui/index.jsx';
import { PLAY } from '../../data/copy.js';
import { getTracker } from '../../data/trackers.js';
import { formatDelta } from '../../lib/format.js';
import styles from './steps.module.css';

/* The witness.

   Someone who is not making the decision and will carry it anyway. No choices
   here — the beat exists to put a face on the abstraction before the player is
   asked to intensify or pause, and giving it a choice would turn a person into
   another lever.

   Rendered on paper: this is a document that reached your desk, not the
   interface talking. The core brief sanctions invented aides and witnesses,
   and the principals stay historical.

   A witness can cost something. From Milestone 11 a step may carry
   `bearsByRole`, applied by the reducer as the step is reached — the eleven
   minutes on the quarantine line, the aircraft that did not come back. The
   paper says what happened; the board underneath it says what it moved. That
   split is the two-register rule doing work: 1962 does not know what our
   needles are. */

export default function WitnessStep({ step, role, onAdvance }) {
  /* One card or several. Day 3 hands over a single person; a day may hand over
     the parties whose consent is now needed and who were not asked. Same beat
     either way — documents that reached your desk, and no choices on them. */
  const cards = step.cardsByRole?.[role.id] ?? (step.byRole?.[role.id] ? [step.byRole[role.id]] : []);
  if (cards.length === 0) return null;

  const cost = Object.entries(step.bearsByRole?.[role.id] ?? {}).filter(([, value]) => value !== 0);

  return (
    <div className={styles.step}>
      <Reveal className={styles.head}>
        <span className="eyebrow">{step.eyebrow}</span>
      </Reveal>

      <div className={styles.witnessStack}>
        {cards.map((card, index) => (
          <Reveal key={card.title} delay={120 + index * 110}>
            <Paper eyebrow={card.source} title={card.title} format={card.format} stamp={card.stamp}>
              <PaperBody paragraphs={card.body} />
              <Field label={card.weighLabel ?? step.weighLabel}>{card.weigh}</Field>
            </Paper>
          </Reveal>
        ))}
      </div>

      {cost.length > 0 && (
        <Reveal delay={200 + cards.length * 110} className={styles.bore}>
          <span className={styles.boreLabel}>{PLAY.whatItCost}</span>
          <span className={styles.operativeEffects}>
            {cost.map(([key, value]) => (
              <span key={key} className={styles.effectChip}>
                {getTracker(key)?.label} {formatDelta(value)}
              </span>
            ))}
          </span>
        </Reveal>
      )}

      <Reveal delay={280 + cards.length * 110} className={styles.actions}>
        <Button variant="primary" onClick={onAdvance}>
          {PLAY.witnessAdvance}
        </Button>
      </Reveal>
    </div>
  );
}
