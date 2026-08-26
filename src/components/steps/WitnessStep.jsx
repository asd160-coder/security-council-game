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
  const witness = step.byRole[role.id];
  if (!witness) return null;

  return (
    <div className={styles.step}>
      <Reveal className={styles.head}>
        <span className="eyebrow">{step.eyebrow}</span>
      </Reveal>

      <Reveal delay={120}>
        <Paper eyebrow={witness.source} title={witness.title}>
          <PaperBody paragraphs={witness.body} />
          <Field label={step.weighLabel}>{witness.weigh}</Field>
        </Paper>
      </Reveal>

      <Reveal delay={280} className={styles.actions}>
        <Button variant="primary" onClick={onAdvance}>
          {PLAY.witnessAdvance}
        </Button>
      </Reveal>
    </div>
  );
}
