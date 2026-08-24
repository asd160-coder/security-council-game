import { Button, Reveal } from '../ui/index.jsx';
import styles from './steps.module.css';

/* The first formal response.

   Four authored lines, tailored per role. The strategy label sits above the
   line in mono and the line itself is set in serif at reading size, because
   the label is interface and the line is speech.

   Consulting the adviser is optional and unlocks the aide memo. A player who
   never presses it simply does not receive it — the content pack treats
   attention as the thing being rewarded. */

export default function DialogueStep({ step, role, onChoose, onConsultAdviser, adviserTaken }) {
  const choices = step.choicesByRole[role.id] ?? [];

  return (
    <div className={styles.step}>
      <Reveal className={styles.head}>
        <span className="eyebrow">{step.eyebrow}</span>
      </Reveal>

      <Reveal delay={100} className={`${styles.prose} ${styles.proseMuted}`}>
        {step.framing.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </Reveal>

      {step.adviser && (
        <Reveal delay={200} className={styles.adviser}>
          {adviserTaken ? (
            <span className={styles.adviserTaken}>Adviser consulted · memo filed</span>
          ) : (
            <Button variant="quiet" onClick={onConsultAdviser}>
              {step.adviser.label}
            </Button>
          )}
        </Reveal>
      )}

      <Reveal delay={280}>
        <hr className={styles.rule} />
      </Reveal>

      <Reveal delay={340}>
        <div className={styles.choices} role="group" aria-label="Your opening position">
          {choices.map((choice) => (
            <button
              key={choice.id}
              type="button"
              className={styles.choice}
              onClick={() => onChoose(choice)}
            >
              <span className={styles.choiceLabel}>{choice.label}</span>
              <span className={styles.choiceLine}>{choice.line}</span>
            </button>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
