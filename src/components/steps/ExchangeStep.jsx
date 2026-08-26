import { useState } from 'react';
import { Button, Reveal } from '../ui/index.jsx';
import { PLAY } from '../../data/copy.js';
import styles from './steps.module.css';

/* The back-channel: an exchange with a reply beat.

   You speak, the counterpart answers in character keyed to what you said, and
   then you choose again with that answer in front of you. The second choice is
   the one that carries the effects — which is the point. In a private channel
   the opening is a probe; what you do with the answer is the decision.

   The whole scene is one step rather than two, so the opening stays on screen
   under the reply and the conversation reads as continuous. */

export default function ExchangeStep({ step, role, onChoose, onConsultAdviser, adviserTaken }) {
  const [opening, setOpening] = useState(null);
  const openings = step.openingsByRole[role.id] ?? [];
  const counterpart = step.counterpartByRole[role.id];
  /* The framing differs per role: three people walk into three different
     rooms, and the room is most of what the scene is. */
  const framing = step.framingByRole?.[role.id] ?? step.framing ?? [];

  return (
    <div className={`${styles.step} ${styles.privateScene}`}>
      <Reveal className={styles.head}>
        <span className={styles.privateMark}>{step.eyebrow}</span>
      </Reveal>

      {counterpart && (
        <Reveal delay={80} className={styles.counterpart}>
          <span className={styles.counterpartName}>{counterpart.name}</span>
          <span className={styles.counterpartTitle}>{counterpart.title}</span>
        </Reveal>
      )}

      <Reveal delay={140} className={`${styles.prose} ${styles.proseMuted}`}>
        {framing.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </Reveal>

      {/* The adviser sits at the opening, before anything has been said — the
          same placement as the public scene, and useless once you have spoken. */}
      {step.adviser && !opening && (
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

      {!opening ? (
        <Reveal delay={240}>
          <div className={styles.choices} role="group" aria-label={step.openingPrompt}>
            {openings.map((option) => (
              <button
                key={option.id}
                type="button"
                className={styles.choice}
                onClick={() => setOpening(option)}
              >
                <span className={styles.choiceLabel}>{option.label}</span>
                <span className={styles.choiceLine}>{option.line}</span>
              </button>
            ))}
          </div>
        </Reveal>
      ) : (
        <>
          <div className={styles.said}>
            <span className={styles.saidLabel}>{PLAY.youSaid}</span>
            <p className={styles.saidLine}>{opening.line}</p>
          </div>

          {/* Announced, because the reply is new information the next decision
              depends on. */}
          <Reveal delay={220} className={styles.reply}>
            <span className={styles.replyLabel}>
              {counterpart ? counterpart.name : PLAY.theyReplied}
            </span>
            <p className={styles.replyLine} aria-live="polite">
              {opening.reply}
            </p>
          </Reveal>

          <Reveal delay={520}>
            <hr className={styles.rule} />
          </Reveal>

          <Reveal delay={580}>
            <div className={styles.choices} role="group" aria-label={step.followPrompt}>
              {opening.follow.map((choice) => (
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

          <Reveal delay={640} className={styles.actions}>
            <Button variant="quiet" onClick={() => setOpening(null)}>
              {PLAY.reconsider}
            </Button>
          </Reveal>
        </>
      )}
    </div>
  );
}
