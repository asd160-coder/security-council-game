import { EntryCard } from '../panels/DossierRail.jsx';
import { resolveEntry } from '../../lib/entries.js';
import { Button, Reveal } from '../ui/index.jsx';
import { PLAY } from '../../data/copy.js';
import styles from './steps.module.css';

/* How your position was read, plus the information it earned.

   The content pack lists the unlock as its own beat. It is kept on this screen
   rather than given a separate click, because the unlock IS the consequence of
   the choice and separating them costs a beat of momentum in a day that only
   has a few minutes. It gets its own heading and its own reveal, so it still
   reads as a distinct moment. */

export default function ConsequenceStep({ step, choice, onAdvance }) {
  const variant = step.variants[choice.feedback];
  const unlocked = variant?.unlocks ? resolveEntry(variant.unlocks) : null;

  return (
    <div className={styles.step}>
      <Reveal className={styles.head}>
        <span className="eyebrow">{step.eyebrow}</span>
      </Reveal>

      <Reveal delay={80} className={styles.echo}>
        <span className={styles.echoLabel}>The line you took</span>
        <p className={styles.echoLine}>{choice.line}</p>
      </Reveal>

      {/* The feedback is announced, because it is the game's answer to the
          decision that was just made. */}
      <Reveal delay={260} className={styles.prose}>
        <p aria-live="polite">{variant?.text}</p>
      </Reveal>

      {unlocked && (
        <Reveal delay={620} className={styles.unlock}>
          <div className={styles.unlockHead}>
            <span className={styles.unlockLabel}>{PLAY.newInFile}</span>
          </div>
          <EntryCard entry={unlocked} />
        </Reveal>
      )}

      <Reveal delay={780} className={styles.actions}>
        <Button variant="primary" onClick={onAdvance}>
          {PLAY.continue}
        </Button>
      </Reveal>
    </div>
  );
}
