import ArchiveModule from '../panels/ArchiveModule.jsx';
import { Button, Reveal } from '../ui/index.jsx';
import { PLAY } from '../../data/copy.js';
import styles from './steps.module.css';

/* The shared crisis briefing. Identical for all three roles — the facts do not
   change with the chair, which is the point the next step then complicates. */

export default function BriefingStep({ day, step, onAdvance }) {
  return (
    <div className={`${styles.step} ${styles.stepWide}`}>
      <Reveal delay={0} className={styles.head}>
        <h2 className={styles.dayTitle}>
          <span className={styles.dayNumber}>{PLAY.dayLabel(day.number)}</span>
          {day.title}
        </h2>
        <span className={styles.dateline}>{day.dateline}</span>
      </Reveal>

      <Reveal delay={140}>
        <hr className={styles.rule} />
      </Reveal>

      <Reveal delay={220} className={styles.prose}>
        {step.body.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </Reveal>

      {step.archiveId && (
        <Reveal delay={360}>
          <ArchiveModule id={step.archiveId} />
        </Reveal>
      )}

      <Reveal delay={460} className={styles.actions}>
        <Button variant="primary" onClick={onAdvance}>
          {PLAY.continue}
        </Button>
      </Reveal>
    </div>
  );
}
