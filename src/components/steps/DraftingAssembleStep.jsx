import { useState } from 'react';
import { Reveal } from '../ui/index.jsx';
import { getTracker } from '../../data/trackers.js';
import { formatDelta } from '../../lib/format.js';
import { PLAY } from '../../data/copy.js';
import styles from './steps.module.css';

/* Day 4 drafting: assemble a bargain.

   Day 1 chose a tone, Day 2 composed a clause, Day 3 revised one. This builds
   a settlement out of three parts — what you acknowledge, what you undertake,
   and what you require in return — which is the shape a negotiated text
   actually has, and the shape of the trade this crisis was settled by.

   Only the third slot moves the trackers. Acknowledging costs nothing and
   undertaking costs little; what you demand back is where the price is. */

export default function DraftingAssembleStep({ step, role, onChoose }) {
  const [picked, setPicked] = useState({});
  const slots = step.slots;
  const activeIndex = slots.findIndex((slot) => !picked[slot.id]);

  const choose = (slot, option) => {
    const next = { ...picked, [slot.id]: option };
    setPicked(next);
    if (slots.every((s) => next[s.id])) {
      const parts = slots.map((s) => next[s.id]);
      onChoose({
        id: parts.map((p) => p.id).join('+'),
        label: parts[parts.length - 1].label,
        fragment: parts.map((p) => p.text).join(' '),
        /* Kept so a later day can revise one part without losing the others,
           the way Day 3 revises Day 2's operative and keeps its frame. */
        parts: Object.fromEntries(slots.map((s, i) => [s.id, parts[i].text])),
        effects: parts.reduce((acc, p) => ({ ...acc, ...(p.effects ?? {}) }), {}),
        /* If any part of the assembled clause was argued from a document, the
           clause carries that citation. Only the third slot — the half that
           costs — has any, so there is never more than one to find. */
        citation: parts.find((p) => p.citation)?.citation ?? undefined,
      });
    }
  };

  return (
    <div className={styles.step}>
      <Reveal className={styles.head}>
        <span className="eyebrow">{step.eyebrow}</span>
      </Reveal>

      <Reveal delay={100} className={styles.prose}>
        <p>{step.prompt}</p>
      </Reveal>

      {/* The bargain as it currently reads. Present from the first moment so
          the student is building a document, not filling in a form. */}
      <Reveal delay={180}>
        <div className={styles.clauseSheet}>
          <span className={styles.clauseLabel}>{PLAY.draftFragment(3)}</span>
          <p className={styles.clauseText}>
            {slots.some((s) => picked[s.id]) ? (
              slots.map((slot) =>
                picked[slot.id] ? (
                  <span key={slot.id}>{picked[slot.id].text} </span>
                ) : (
                  <span key={slot.id} className={styles.clausePending}>
                    {slot.pendingText}{' '}
                  </span>
                ),
              )
            ) : (
              <span className={styles.clausePending}>{step.emptyText}</span>
            )}
          </p>
        </div>
      </Reveal>

      {slots.map((slot, index) => {
        if (index > activeIndex && activeIndex !== -1) return null;
        const options = slot.optionsByRole[role.id] ?? [];
        const chosen = picked[slot.id];
        return (
          <Reveal key={slot.id} delay={index === 0 ? 260 : 0} className={styles.composeStage}>
            <div className={styles.stageHead}>
              <span className={styles.stageIndex}>{PLAY.slotIndex(index + 1)}</span>
              <span className={styles.stagePrompt}>{slot.prompt}</span>
            </div>
            <div className={styles.choices} role="group" aria-label={slot.prompt}>
              {options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`${styles.frameOption} ${chosen?.id === option.id ? styles.frameChosen : ''}`}
                  onClick={() => choose(slot, option)}
                  aria-pressed={chosen?.id === option.id}
                >
                  {option.text}
                  {option.effects && (
                    <span className={styles.operativeEffects}>
                      {Object.entries(option.effects)
                        .filter(([, value]) => value !== 0)
                        .map(([key, value]) => (
                          <span key={key} className={styles.effectChip}>
                            {getTracker(key)?.label} {formatDelta(value)}
                          </span>
                        ))}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
