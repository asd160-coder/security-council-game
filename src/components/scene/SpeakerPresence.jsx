import { getRole } from '../../data/roles.js';
import { PLAY } from '../../data/copy.js';
import { DEFAULT_PRESENCE, PRESENCE } from '../../data/scene.js';
import styles from './SpeakerPresence.module.css';

/* The person on the other side of the table.

   Three modes, and they are not a stylistic range — they are what the cast
   actually is. Two of the twelve counterparts in the game are named
   historical figures who are also playable seats, so a portrait for them
   already exists and is used. Three are invented aides the brief sanctions;
   no likeness of them exists, none may be invented, and they get a place
   rather than a face. The remaining six are institutions, and an institution
   drawn as a person would be a lie about how decisions were actually made.

   The asymmetry is the point. You can see the ambassador's face because he is
   a known figure. You cannot see the attaché's because he is a composite. The
   Executive Committee has no face because it is nineteen men in a room. */

function Portrait({ role, speaking }) {
  return (
    <span className={`${styles.frame} ${speaking ? styles.frameSpeaking : ''}`}>
      <img
        className={styles.portrait}
        src={`portraits/${role.portrait}`}
        style={{ objectPosition: role.portraitFocus }}
        alt={`${role.name} — ${PLAY.illustration.toLowerCase()}`}
        loading="eager"
      />
    </span>
  );
}

/* A place where a person is. The brass hairline is the head of the zone; the
   raking gradient gives it a light source, so it reads as occupied space
   rather than as an empty swatch. */
function Zone({ speaking }) {
  return (
    <span
      className={`${styles.zone} ${speaking ? styles.zoneSpeaking : ''}`}
      aria-hidden="true"
    />
  );
}

/* An institution: a row of chairs, in the tick vocabulary the trackers
   already use. One is brass — someone is doing the talking, and it is never
   clear which of them. */
function Seats({ speaking }) {
  return (
    <span
      className={`${styles.seats} ${speaking ? styles.seatsSpeaking : ''}`}
      aria-hidden="true"
    >
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className={`${styles.seat} ${i === 1 ? styles.seatLead : ''}`} />
      ))}
    </span>
  );
}

export default function SpeakerPresence({ counterpart, speaking = false, compact = false }) {
  if (!counterpart) return null;

  const mode = counterpart.presence ?? DEFAULT_PRESENCE;
  /* `roleRef` names a playable seat, which is where the portrait comes from.
     If it is ever wrong the presence falls back rather than breaking — a
     missing face is survivable, a crash is not. */
  const role = mode === PRESENCE.PRINCIPAL ? getRole(counterpart.roleRef) : null;

  return (
    <div className={`${styles.presence} ${compact ? styles.presenceCompact : ''}`}>
      <div className={styles.mark}>
        {role ? (
          <Portrait role={role} speaking={speaking} />
        ) : mode === PRESENCE.BODY ? (
          <Seats speaking={speaking} />
        ) : (
          <Zone speaking={speaking} />
        )}
      </div>

      <div className={styles.identity}>
        <span className={styles.name}>{counterpart.name}</span>
        <span className={styles.title}>{counterpart.title}</span>
        {role && <span className={styles.illustrationMark}>{PLAY.illustration}</span>}
      </div>
    </div>
  );
}
