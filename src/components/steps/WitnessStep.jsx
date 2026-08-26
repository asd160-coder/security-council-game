import { Button, Field, Paper, PaperBody, Reveal } from '../ui/index.jsx';
import { PLAY } from '../../data/copy.js';
import styles from './steps.module.css';

/* The witness.

   Someone who is not making the decision and will carry it anyway. No choices
   here — the beat exists to put a face on the abstraction before the player is
   asked to intensify or pause, and giving it a choice would turn a person into
   another lever.

   Rendered on paper: this is a document that reached your desk, not the
   interface talking. The core brief sanctions invented aides and witnesses,
   and the principals stay historical. */

export default function WitnessStep({ step, role, onAdvance }) {
  /* One card or several. Day 3 hands over a single person; Day 4 hands over
     the parties whose consent is now needed and who were not asked. Same beat
     either way — documents that reached your desk, and no choices on them. */
  const cards = step.cardsByRole?.[role.id] ?? (step.byRole?.[role.id] ? [step.byRole[role.id]] : []);
  if (cards.length === 0) return null;

  return (
    <div className={styles.step}>
      <Reveal className={styles.head}>
        <span className="eyebrow">{step.eyebrow}</span>
      </Reveal>

      <div className={styles.witnessStack}>
        {cards.map((card, index) => (
          <Reveal key={card.title} delay={120 + index * 110}>
            <Paper eyebrow={card.source} title={card.title}>
              <PaperBody paragraphs={card.body} />
              <Field label={card.weighLabel ?? step.weighLabel}>{card.weigh}</Field>
            </Paper>
          </Reveal>
        ))}
      </div>

      <Reveal delay={280 + cards.length * 110} className={styles.actions}>
        <Button variant="primary" onClick={onAdvance}>
          {PLAY.witnessAdvance}
        </Button>
      </Reveal>
    </div>
  );
}
