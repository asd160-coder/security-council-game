import { Button } from '../ui/index.jsx';
import { PLAY } from '../../data/copy.js';
import RoleAnchor from './RoleAnchor.jsx';
import RoomPlate from './rooms/RoomPlate.jsx';
import SpeakerPresence from './SpeakerPresence.jsx';
import styles from './SceneEstablish.module.css';

/* Before anyone speaks: the room, and who is in it.

   This is a phase of the conversation step rather than a step of its own.
   Making it a step would have shifted every step index and progress pip in
   the day for a beat that carries no state, so it lives here and the day data
   is untouched.

   The two presences arrive from opposite sides — the counterpart from the far
   edge, you from the near one — which is the whole of the "walking into the
   room" idea and about as much of it as a documentary register will take.
   The movement is a CSS animation, so `prefers-reduced-motion` removes it and
   both presences are simply already there. Nothing is ever withheld: the
   card's content is in the DOM from the first frame either way.

   The card still needs its click under reduced motion. That is an
   interaction, not an animation, and skipping it would put a player who has
   asked for less movement into a different flow from everyone else. */

export default function SceneEstablish({ step, role, counterpart, room, onEnter }) {
  return (
    <div className={styles.establish}>
      {room && <RoomPlate {...room} variant="card" />}

      <div className={styles.head}>
        {step.place && <span className={styles.place}>{step.place}</span>}
        <span className={styles.eyebrow}>{step.eyebrow}</span>
      </div>

      <div className={styles.stage}>
        {/* Day 1 and the Council session have no counterpart — you are
            addressing the room itself. That used to be drawn as a rank of
            abstract seats on the far side, standing in for a room there was
            no other way to show. The plate behind now IS the room, complete
            with its own chairs, so the stand-in has been removed rather than
            drawn twice. */}
        {counterpart ? (
          <div className={`${styles.side} ${styles.sideFar}`}>
            <SpeakerPresence counterpart={counterpart} />
          </div>
        ) : (
          <div className={`${styles.side} ${styles.sideFar} ${styles.sideEmpty}`} aria-hidden="true" />
        )}

        <span className={styles.table} aria-hidden="true" />

        <div className={`${styles.side} ${styles.sideNear}`}>
          <span className={styles.youMark}>{PLAY.sceneYou}</span>
          <RoleAnchor role={role} size="large" label />
        </div>
      </div>

      <div className={styles.actions}>
        <Button variant="primary" onClick={onEnter}>
          {PLAY.enterScene}
        </Button>
      </div>
    </div>
  );
}
