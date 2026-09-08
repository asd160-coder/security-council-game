import ArchiveModule from '../panels/ArchiveModule.jsx';
import { Button, Reveal } from '../ui/index.jsx';
import { PLAY } from '../../data/copy.js';
import styles from './steps.module.css';

/* The shared crisis briefing. Identical for all three roles — the facts do not
   change with the chair, which is the point the next step then complicates. */

export default function BriefingStep({ day, step, onAdvance, standing, history, onOpenArchive }) {
  /* From Day 3 an opening can vary with where the crisis stands, and can
     acknowledge what the previous day's private channel did. Both are optional;
     Days 1 and 2 supply neither and render exactly as before. */
  const body = step.bodyByBand?.[standing] ?? step.body;
  const callback = step.channelCallback?.[history?.channelCategory] ?? null;
  const archive = step.archiveIds ?? (step.archiveId ? [step.archiveId] : []);

  /* Leaving the briefing is the last chance to notice what was read. The
     archive module files a document when its foot scrolls into view, but that
     relies on an intersection observer, which a throttled or backgrounded tab
     can starve. This is the check that needs no rendering: if the foot of a
     document is at or above the bottom of the viewport when Continue is
     pressed, the student reached it. */
  const leave = () => {
    document.querySelectorAll('[data-read-mark][data-unlocks]').forEach((mark) => {
      const id = mark.getAttribute('data-unlocks');
      if (id && mark.getBoundingClientRect().top <= window.innerHeight) onOpenArchive?.(id);
    });
    onAdvance();
  };

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
        {body.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </Reveal>

      {/* Where things stand: what each side has actually done, as plain facts,
          before any prose about how it feels. The first playthrough by a
          teacher found the briefings gave a mood and not a situation — the
          student could not tell what was being responded to. */}
      {step.situation && (
        <Reveal delay={280} className={styles.situation}>
          <span className={styles.situationLabel}>{PLAY.situationLabel}</span>
          <dl className={styles.situationList}>
            {step.situation.sides.map(({ who, did }) => (
              <div key={who} className={styles.situationRow}>
                <dt className={styles.situationWho}>{who}</dt>
                <dd className={styles.situationDid}>{did}</dd>
              </div>
            ))}
          </dl>
          {step.situation.today && (
            <p className={styles.situationToday}>
              <span className={styles.situationTodayLabel}>{PLAY.situationToday}</span>
              {step.situation.today}
            </p>
          )}
        </Reveal>
      )}

      {/* In other words: the two or three ideas a student needs to hold to act
          today — what a quarantine is and why it is dangerous, why the Turkish
          missiles matter, what the two letters mean — each in plain words. */}
      {step.explainers?.length > 0 && (
        <Reveal delay={300} className={styles.explainers}>
          <span className={styles.explainersLabel}>{PLAY.explainersLabel}</span>
          {step.explainers.map((entry) => (
            <div key={entry.term} className={styles.explainer}>
              <span className={styles.explainerTerm}>{entry.term}</span>
              <p className={styles.explainerText}>{entry.text}</p>
            </div>
          ))}
        </Reveal>
      )}

      {callback && (
        <Reveal delay={320} className={styles.callback}>
          <span className={styles.callbackLabel}>{PLAY.sinceYesterday}</span>
          <p className={styles.callbackText}>{callback}</p>
        </Reveal>
      )}

      {/* A day may carry more than one item. Day 1 shows the Cuban frame and
          the reference photograph that made identifying it possible, because
          the pair is the lesson and either alone is only half of it. */}
      {archive.map((id, index) => (
        <Reveal key={id} delay={360 + index * 120}>
          <ArchiveModule id={id} onOpen={onOpenArchive} />
        </Reveal>
      ))}

      <Reveal delay={460} className={styles.actions}>
        <Button variant="primary" onClick={leave}>
          {PLAY.continue}
        </Button>
      </Reveal>
    </div>
  );
}
