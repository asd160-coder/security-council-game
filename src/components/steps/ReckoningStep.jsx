import { useState } from 'react';
import { Button, Field, Paper, PaperBody, Reveal } from '../ui/index.jsx';
import { PLAY } from '../../data/copy.js';
import { reckoningFor } from '../../data/council.js';
import { moodFor } from '../../data/scene.js';
import { roomFor } from '../../data/rooms.js';
import RoleAnchor from '../scene/RoleAnchor.jsx';
import RoomPlate from '../scene/rooms/RoomPlate.jsx';
import UtteranceList from '../scene/UtteranceList.jsx';
import scene from '../scene/scene.module.css';
import styles from './steps.module.css';

/* Back in the room, afterwards.

   The adviser whose course you did not take, saying what it cost. Of the two
   you overruled it is the one furthest from what you actually did — see
   reckoningFor() — because a room that agrees with you afterwards is not a
   room worth having.

   And then you answer. Until Milestone 11 this was a card and a Continue
   button: the emotional payoff of the whole cabinet cycle, and the player
   clicked past it. Now the three things you can say back are the ordinary
   utterance list, each trading a point between two needles, and the adviser
   gets the last word. The choice is dispatched from Continue rather than on
   the click, so their reply is read before the room moves on — the same
   two-beat shape as an exchange with the seats reversed: this time it is you
   being answered back. */

export default function ReckoningStep({ day, step, role, mandate, choice, onChoose, onAdvance }) {
  const [answer, setAnswer] = useState(null);

  /* The negotiation's own category. `choice` is the resolved follow-up for the
     step this one names with `after`, which is how consequence steps already
     find what they report on. */
  const outcome = choice?.feedback;
  const reckoning = reckoningFor(role.id, mandate, outcome);

  /* No mandate means the council was somehow skipped. Advancing quietly is
     better than a blank screen a student cannot get past. */
  if (!reckoning) {
    return (
      <div className={styles.step}>
        <Reveal className={styles.actions}>
          <Button variant="primary" onClick={onAdvance}>
            {PLAY.continue}
          </Button>
        </Reveal>
      </div>
    );
  }

  const mood = moodFor(day.number);
  const room = roomFor(day.id, step.id, role.id);
  const style = {
    '--scene-axis': `${mood.axis}px`,
    '--scene-light': mood.light,
    '--scene-tone': mood.tone,
  };
  const answers = reckoning.answers ?? [];

  return (
    <div className={`${styles.step} ${styles.stepScene}`} style={style}>
      <div className={scene.scene}>
        <div className={scene.headWrap}>
          <RoomPlate {...room} variant="band" />
          <Reveal className={scene.head}>
            <span className={scene.eyebrow}>{step.eyebrow}</span>
            <span className={scene.place}>{step.place}</span>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <Paper eyebrow={PLAY.overruled} title={reckoning.adviser.title} titleAs="h2">
            <PaperBody paragraphs={[reckoning.line]} />
            {reckoning.tail && <Field label={step.weighLabel}>{reckoning.tail}</Field>}
          </Paper>
        </Reveal>

        {answers.length === 0 ? (
          /* Data without answers falls back to the old beat. */
          <Reveal delay={320} className={scene.actions}>
            <Button variant="primary" onClick={onAdvance}>
              {PLAY.continue}
            </Button>
          </Reveal>
        ) : !answer ? (
          <Reveal delay={320} className={scene.near}>
            <div className={scene.nearHead}>
              <span className={scene.nearLabel}>{PLAY.reckoningPrompt}</span>
              <RoleAnchor role={role} />
            </div>
            <UtteranceList options={answers} label={PLAY.reckoningPrompt} onChoose={setAnswer} />
          </Reveal>
        ) : (
          <>
            <div className={scene.near}>
              <div className={scene.said}>
                <span className={scene.saidLabel}>{PLAY.youSaid}</span>
                <p className={scene.saidLine}>{answer.line}</p>
              </div>
            </div>

            {/* Their last word. Announced, as a reply is. */}
            <Reveal delay={220} className={scene.far}>
              <div className={scene.farReply}>
                <span className={scene.replyLabel}>{reckoning.adviser.source}</span>
                <p className={scene.replyLine} aria-live="polite">
                  {answer.close}
                </p>
              </div>
            </Reveal>

            <Reveal delay={520} className={scene.actions}>
              <Button variant="primary" onClick={() => onChoose(answer)}>
                {PLAY.continue}
              </Button>
            </Reveal>
            <Reveal delay={600} className={scene.actions}>
              <Button variant="quiet" onClick={() => setAnswer(null)}>
                {PLAY.reconsider}
              </Button>
            </Reveal>
          </>
        )}
      </div>
    </div>
  );
}
