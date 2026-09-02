import { Field, Paper, PaperBody, Reveal } from '../ui/index.jsx';
import { PLAY } from '../../data/copy.js';
import { councilFor } from '../../data/council.js';
import { moodFor } from '../../data/scene.js';
import { roomFor } from '../../data/rooms.js';
import RoomPlate from '../scene/rooms/RoomPlate.jsx';
import UtteranceList from '../scene/UtteranceList.jsx';
import scene from '../scene/scene.module.css';
import styles from './steps.module.css';

/* Your own side, before the other one.

   Three advisers press three incompatible courses and you carry one of them
   into the negotiation. The cards are the witness treatment — paper, because
   what each of them puts in front of you is a cable or a paper, not the
   interface talking — and the choice underneath is the ordinary utterance
   list every other scene uses.

   This is one choice, not a branch. The mandate is recorded and read
   afterwards by the reckoning; the negotiation itself is untouched. That is
   what keeps a cabinet from costing three times the day. */

export default function CouncilStep({ day, step, role, onChoose }) {
  const cabinet = councilFor(role.id);
  if (!cabinet) return null;

  const mood = moodFor(day.number);
  const room = roomFor(day.id, step.id, role.id);

  const style = {
    '--scene-axis': `${mood.axis}px`,
    '--scene-light': mood.light,
    '--scene-tone': mood.tone,
  };

  /* The adviser cards carry the argument; the utterances carry the commitment.
     Label and line are pulled from the same card so the two never drift. */
  const options = cabinet.advisers.map((adviser) => ({
    id: adviser.id,
    label: adviser.title,
    line: adviser.weigh,
    feedback: adviser.feedback,
    mandate: adviser.mandate,
  }));

  return (
    <div className={`${styles.step} ${styles.stepScene}`} style={style}>
      <div className={scene.scene}>
        <div className={scene.headWrap}>
          <RoomPlate {...room} variant="band" />
          <Reveal className={scene.head}>
            <span className={scene.eyebrow}>{step.eyebrow}</span>
            <span className={scene.place}>{cabinet.room}</span>
          </Reveal>
        </div>

        <Reveal delay={100} className={scene.framing}>
          <p>{cabinet.setting}</p>
        </Reveal>

        <div className={styles.witnessStack}>
          {cabinet.advisers.map((adviser, index) => (
            <Reveal key={adviser.id} delay={180 + index * 110}>
              <Paper eyebrow={adviser.source} title={adviser.title}>
                <PaperBody paragraphs={adviser.body} />
                <Field label={step.weighLabel}>{adviser.weigh}</Field>
              </Paper>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200 + cabinet.advisers.length * 110} className={scene.near}>
          <div className={scene.nearHead}>
            <span className={scene.nearLabel}>{PLAY.councilPrompt}</span>
          </div>
          <UtteranceList options={options} label={step.prompt} onChoose={onChoose} />
        </Reveal>
      </div>
    </div>
  );
}
