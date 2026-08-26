import { useState } from 'react';
import { Reveal } from '../ui/index.jsx';
import { getTracker } from '../../data/trackers.js';
import { formatDelta } from '../../lib/format.js';
import { PLAY } from '../../data/copy.js';
import styles from './steps.module.css';

/* Day 2 drafting: a frame and a commitment.

   Day 1 asked for a tone and produced a sentence. This asks for two decisions
   that compose one clause — how the case is framed, then how far it commits
   you — and only the second carries a cost. That is the lesson: the framing is
   nearly free, and the strength of what you undertake is the part you pay for.

   Still selection only. No writing until Day 5. */

export default function DraftingComposeStep({ step, role, onChoose }) {
  const [frame, setFrame] = useState(null);
  const frames = step.framesByRole[role.id] ?? [];
  const operatives = step.operativesByRole[role.id] ?? [];

  const commit = (operative) =>
    onChoose({
      id: `${frame.id}+${operative.id}`,
      label: operative.label,
      fragment: `${frame.text} ${operative.text}`,
      effects: operative.effects,
    });

  return (
    <div className={styles.step}>
      <Reveal className={styles.head}>
        <span className="eyebrow">{step.eyebrow}</span>
      </Reveal>

      <Reveal delay={100} className={styles.prose}>
        <p>{step.prompt}</p>
      </Reveal>

      {/* The clause as it currently reads. It exists from the first moment so
          the student can see what they are building, not just what they are
          picking from. */}
      <Reveal delay={180}>
        <div className={styles.clauseSheet}>
          <span className={styles.clauseLabel}>{PLAY.draftFragment(2)}</span>
          <p className={styles.clauseText}>
            {frame ? (
              <>
                {frame.text}{' '}
                <span className={styles.clausePending}>{step.pendingText}</span>
              </>
            ) : (
              <span className={styles.clausePending}>{step.emptyText}</span>
            )}
          </p>
        </div>
      </Reveal>

      <Reveal delay={260} className={styles.composeStage}>
        <div className={styles.stageHead}>
          <span className={styles.stageIndex}>{PLAY.stageOne}</span>
          <span className={styles.stagePrompt}>{step.framePrompt}</span>
        </div>
        <div className={styles.choices} role="group" aria-label={step.framePrompt}>
          {frames.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`${styles.frameOption} ${frame?.id === option.id ? styles.frameChosen : ''}`}
              onClick={() => setFrame(option)}
              aria-pressed={frame?.id === option.id}
            >
              {option.text}
            </button>
          ))}
        </div>
      </Reveal>

      {frame && (
        <Reveal className={styles.composeStage}>
          <div className={styles.stageHead}>
            <span className={styles.stageIndex}>{PLAY.stageTwo}</span>
            <span className={styles.stagePrompt}>{step.operativePrompt}</span>
          </div>
          <div className={styles.choices} role="group" aria-label={step.operativePrompt}>
            {operatives.map((option) => (
              <button
                key={option.id}
                type="button"
                className={styles.choice}
                onClick={() => commit(option)}
              >
                <span className={styles.choiceLabel}>{option.label}</span>
                <span className={styles.choiceLine}>{option.text}</span>
                {/* The cost is shown before the choice is made. This step is
                    about weighing commitment, which needs the weights visible. */}
                <span className={styles.operativeEffects}>
                  {/* Only what actually moves. formatDelta has no zero case —
                      it would render "▼ 0", which reads as a fall. */}
                  {Object.entries(option.effects)
                    .filter(([, value]) => value !== 0)
                    .map(([key, value]) => (
                      <span key={key} className={styles.effectChip}>
                        {getTracker(key)?.label} {formatDelta(value)}
                      </span>
                    ))}
                </span>
              </button>
            ))}
          </div>
        </Reveal>
      )}
    </div>
  );
}
