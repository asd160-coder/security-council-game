import { Reveal } from '../ui/index.jsx';
import styles from './steps.module.css';

/* Day 1 drafting: tone selection.

   Deliberately low-friction. The player is not writing yet — they are choosing
   the register their statement will open in, and the fragment that choice
   produces goes straight into the tray where they can see it. The ladder from
   here is wording frames, revision, assembly, and finally original writing on
   Day 5. */

export default function DraftingStep({ step, onChoose }) {
  return (
    <div className={styles.step}>
      <Reveal className={styles.head}>
        <span className="eyebrow">{step.eyebrow}</span>
      </Reveal>

      <Reveal delay={100} className={styles.prose}>
        <p>{step.prompt}</p>
      </Reveal>

      <Reveal delay={180}>
        <p className={styles.note}>{step.note}</p>
      </Reveal>

      <Reveal delay={260}>
        <div className={styles.draftOptions} role="group" aria-label={step.prompt}>
          {step.options.map((option) => (
            <button
              key={option.id}
              type="button"
              className={styles.draftOption}
              onClick={() => onChoose(option)}
            >
              <span className={styles.draftLabel}>{option.label}</span>
              <span className={styles.draftDescription}>{option.description}</span>
            </button>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
