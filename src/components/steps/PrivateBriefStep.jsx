import { Button, Field, Paper, Reveal } from '../ui/index.jsx';
import { PLAY } from '../../data/copy.js';
import styles from './steps.module.css';

/* The role-specific private briefing.

   This is the first moment the three roles diverge, and it is deliberately the
   second thing a player sees: the same crisis, then your particular exposure
   to it. Rendered as paper because it is a document handed to you. */

export default function PrivateBriefStep({ role, step, onAdvance }) {
  const brief = role.privateBrief;

  return (
    <div className={styles.step}>
      <Reveal className={styles.head}>
        <h2 className={styles.dayTitle} style={{ fontSize: 'var(--fs-screen-title)' }}>
          {role.name}
        </h2>
        <span className={styles.dateline}>{role.title}</span>
      </Reveal>

      <Reveal delay={160}>
        <Paper eyebrow={step.eyebrow} title="Your position">
          <Field label="Immediate objective">{brief.objective}</Field>
          <Field label="Pressure">{brief.pressure}</Field>
          <Field label="Advantage">{brief.advantage}</Field>
          <Field label="Fear">{brief.fear}</Field>
        </Paper>
      </Reveal>

      <Reveal delay={300} className={styles.actions}>
        <Button variant="primary" onClick={onAdvance}>
          {PLAY.continue}
        </Button>
      </Reveal>
    </div>
  );
}
