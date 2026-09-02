import { Button, Field, Paper, PaperBody, Reveal } from '../ui/index.jsx';
import { PLAY } from '../../data/copy.js';
import { reckoningFor } from '../../data/council.js';
import { moodFor } from '../../data/scene.js';
import { roomFor } from '../../data/rooms.js';
import RoomPlate from '../scene/rooms/RoomPlate.jsx';
import scene from '../scene/scene.module.css';
import styles from './steps.module.css';

/* Back in the room, afterwards.

   The adviser whose course you did not take, saying what it cost. Of the two
   you overruled it is the one furthest from what you actually did — see
   reckoningFor() — because a room that agrees with you afterwards is not a
   room worth having.

   No choice here. This is the same beat as a witness: someone who is not
   deciding, and who will carry the decision anyway. Giving it a choice would
   turn being answerable into another lever. */

export default function ReckoningStep({ day, step, role, mandate, choice, onAdvance }) {
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
          <Paper eyebrow={PLAY.overruled} title={reckoning.adviser.title}>
            <PaperBody paragraphs={[reckoning.line]} />
            {reckoning.tail && <Field label={step.weighLabel}>{reckoning.tail}</Field>}
          </Paper>
        </Reveal>

        <Reveal delay={320} className={scene.actions}>
          <Button variant="primary" onClick={onAdvance}>
            {PLAY.continue}
          </Button>
        </Reveal>
      </div>
    </div>
  );
}
