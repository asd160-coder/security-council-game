import { useState } from 'react';
import { Button, Reveal } from '../ui/index.jsx';
import { PLAY } from '../../data/copy.js';
import { moodFor } from '../../data/scene.js';
import { roomFor } from '../../data/rooms.js';
import RoleAnchor from '../scene/RoleAnchor.jsx';
import RoomPlate from '../scene/rooms/RoomPlate.jsx';
import SceneEstablish from '../scene/SceneEstablish.jsx';
import UtteranceList from '../scene/UtteranceList.jsx';
import scene from '../scene/scene.module.css';
import styles from './steps.module.css';

/* The first formal response, and the Council session on Day 2.

   These two are the scenes with nobody opposite: you are speaking to a room
   rather than to a person, and the room is the counterpart. The staging
   reflects that — the far side of the table stays empty, and everything that
   happens is on your side of it.

   Four authored lines, tailored per role, now set as utterances rather than
   as a button stack: the sentence leads and the strategy label is a tag above
   it. Consulting the adviser remains optional and remains the thing that
   rewards attention.

   The establishing beat is local state rather than a step of its own, so the
   day data, the step indices and the progress pips are all untouched. */

export default function DialogueStep({ day, step, role, onChoose, onConsultAdviser, adviserTaken }) {
  const [entered, setEntered] = useState(false);
  const choices = step.choicesByRole[role.id] ?? [];
  const mood = moodFor(day.number);
  /* Which room this is. A lookup, not content — see src/data/rooms.js. */
  const room = roomFor(day.id, step.id, role.id);

  const style = {
    '--scene-axis': `${mood.axis}px`,
    '--scene-light': mood.light,
    '--scene-tone': mood.tone,
  };

  if (!entered) {
    return (
      <div className={`${styles.step} ${styles.stepScene}`} style={style}>
        <SceneEstablish
          step={step}
          role={role}
          counterpart={null}
          room={room}
          onEnter={() => setEntered(true)}
        />
      </div>
    );
  }

  return (
    <div className={`${styles.step} ${styles.stepScene}`} style={style}>
      <div className={`${scene.scene} ${scene.iris}`}>
        {/* The room stays present during the conversation as a strip behind
            the head — the same drawing cropped to its top and pushed down in
            contrast, so no utterance is ever read over scenery. */}
        <div className={scene.headWrap}>
          <RoomPlate {...room} variant="band" />
          <Reveal className={scene.head}>
            <span className={scene.eyebrow}>{step.eyebrow}</span>
            {step.place && <span className={scene.place}>{step.place}</span>}
          </Reveal>
        </div>

        <Reveal delay={100} className={scene.framing}>
          {step.framing.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </Reveal>

        {step.adviser && (
          <Reveal delay={180} className={scene.adviser}>
            {adviserTaken ? (
              <span className={scene.adviserTaken}>Adviser consulted · memo filed</span>
            ) : (
              <>
                <Button variant="quiet" onClick={onConsultAdviser}>
                  {step.adviser.label}
                </Button>
                {step.adviser.hint && <span className={scene.adviserHint}>{step.adviser.hint}</span>}
              </>
            )}
          </Reveal>
        )}

        <Reveal delay={260} className={scene.near}>
          <div className={scene.nearHead}>
            <span className={scene.nearLabel}>{PLAY.couldSay}</span>
            <RoleAnchor role={role} />
          </div>
          <UtteranceList
            options={choices}
            label={PLAY.openingPositionLabel}
            onChoose={onChoose}
          />
        </Reveal>
      </div>
    </div>
  );
}
