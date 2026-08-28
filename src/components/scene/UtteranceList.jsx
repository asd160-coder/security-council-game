import { registerFor } from '../../data/scene.js';
import styles from './UtteranceList.module.css';

/* Things this person could say.

   The old treatment put a brass mono label on top and the sentence
   underneath, in an identical bordered card, four times over. The label
   shouted and the line — the only part that is actually speech — came second.
   Here the sentence is the unit and the label is a tag above it, quiet until
   you reach for it.

   Each utterance carries a rhetorical register derived from its existing
   `feedback` category (see src/data/scene.js). The register changes measure,
   density, indent and rule — never colour, never weight of emphasis, never
   anything that could be read as the interface preferring one. A student
   should see that a settlement and an ultimatum are different kinds of
   speech, and should get no hint from us about which was right.

   `register` overrides the per-option lookup for a whole group. The openings
   of an exchange use it: not one opening anywhere in the game carries a
   `feedback` category, because an opening is not a position — it is a probe,
   and the position is what you take once the answer is in front of you. So
   the openings share one tentative register and the follow-ups differentiate,
   which makes the two-beat shape of an exchange visible rather than leaving
   half the choices in the game with no character at all.

   `note` still renders where it exists: on Day 4 and Day 5 it explains why an
   option costs what it costs when the player's standing has already changed
   the price, and it belongs before the choice rather than after it. */

export default function UtteranceList({ options, label, onChoose, register }) {
  if (!options?.length) return null;

  return (
    <div className={styles.utterances} role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          className={styles.utterance}
          data-register={register ?? registerFor(option.feedback)}
          onClick={() => onChoose(option)}
        >
          <span className={styles.label}>{option.label}</span>
          <span className={styles.line}>{option.line}</span>
          {option.note && <span className={styles.note}>{option.note}</span>}
        </button>
      ))}
    </div>
  );
}
