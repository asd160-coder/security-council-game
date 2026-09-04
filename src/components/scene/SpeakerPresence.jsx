import { useId } from 'react';
import { getRole } from '../../data/roles.js';
import { PLAY } from '../../data/copy.js';
import { DEFAULT_PRESENCE, PRESENCE } from '../../data/scene.js';
import styles from './SpeakerPresence.module.css';

/* The person on the other side of the table.

   `presence` says what the counterpart IS — one person (`individual`), a
   playable seat's own likeness (`principal`), or an institution (`body`) —
   and an institution never gets a face, because nineteen men in a room drawn
   as one man would be a lie about how the decision was actually made.

   Whether that person has a face is a separate question, answered by whether
   a portrait exists for them. It used to be answered by `presence`: only the
   two historical figures who are also playable seats had portraits, and every
   invented aide got a lit silhouette instead. That asymmetry was deliberate —
   you could see the ambassador because he is a known figure and not the
   attaché because he is a composite — but it also meant a scene could not be
   given a face even when one had been made for it.

   So a counterpart may now carry its own `portrait`, and the silhouette is
   the fallback for anyone who has not been drawn yet rather than a statement
   about who deserves drawing. What still holds is the labelling: every face
   here is a painted illustration, carries the illustration marker, lives in
   public/portraits and never in public/archive, and — for the invented
   aides — is a likeness of nobody at all. See the credits panel, which says
   so in as many words. */

function Portrait({ name, portrait, portraitFocus, speaking }) {
  return (
    <span className={`${styles.frame} ${speaking ? styles.frameSpeaking : ''}`}>
      <img
        className={styles.portrait}
        src={`portraits/${portrait}`}
        style={{ objectPosition: portraitFocus }}
        alt={`${name} — ${PLAY.illustration.toLowerCase()}`}
        loading="eager"
      />
    </span>
  );
}

/* A place where a person is. The brass hairline is the head of the zone; the
   raking gradient gives it a light source, so it reads as occupied space
   rather than as an empty swatch. */
function Zone({ speaking, light = 'overhead' }) {
  const uid = useId();
  /* A head and shoulders cut from the room's light: a shape, never a face.
     The rim lights the side the room's light comes from — a lamp or an
     evening window is on the far side, everything else is overhead or ahead.
     Until this existed the zone was a plain gradient that read as a missing
     image on the one card meant to introduce the person. */
  const fromRight = light === 'lamp' || light === 'evening';
  return (
    <span
      className={`${styles.zone} ${speaking ? styles.zoneSpeaking : ''}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 70 156" className={styles.silhouette} focusable="false">
        <defs>
          <linearGradient id={`${uid}-rim`} x1={fromRight ? 1 : 0} x2={fromRight ? 0 : 1} y1="0" y2="0">
            <stop offset="0%" className={styles.rimLit} />
            <stop offset="70%" className={styles.rimDark} />
          </linearGradient>
        </defs>
        <path
          d="M35 24c-9 0-15 7-15 17 0 9 5 16 10 19-14 4-24 14-26 30l-2 66h66l-2-66c-2-16-12-26-26-30 5-3 10-10 10-19 0-10-6-17-15-17z"
          className={styles.figure}
          stroke={`url(#${uid}-rim)`}
        />
      </svg>
    </span>
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

export default function SpeakerPresence({ counterpart, speaking = false, compact = false, light }) {
  if (!counterpart) return null;

  const mode = counterpart.presence ?? DEFAULT_PRESENCE;
  /* Two sources for a face, in order. `roleRef` names a playable seat and
     borrows its likeness; a counterpart may also carry a `portrait` of its
     own, which is how someone who is not a seat gets drawn. Either may be
     absent or wrong, and the presence falls back rather than breaking — a
     missing face is survivable, a crash is not. An institution is never
     given one. */
  const role = counterpart.roleRef ? getRole(counterpart.roleRef) : null;
  const face =
    mode === PRESENCE.BODY
      ? null
      : role
        ? { name: role.name, portrait: role.portrait, portraitFocus: role.portraitFocus }
        : counterpart.portrait
          ? {
              name: counterpart.name,
              portrait: counterpart.portrait,
              portraitFocus: counterpart.portraitFocus,
            }
          : null;

  return (
    <div className={`${styles.presence} ${compact ? styles.presenceCompact : ''}`}>
      <div className={styles.mark}>
        {face ? (
          <Portrait {...face} speaking={speaking} />
        ) : mode === PRESENCE.BODY ? (
          <Seats speaking={speaking} />
        ) : (
          <Zone speaking={speaking} light={light} />
        )}
      </div>

      <div className={styles.identity}>
        <span className={styles.name}>{counterpart.name}</span>
        <span className={styles.title}>{counterpart.title}</span>
        {face && <span className={styles.illustrationMark}>{PLAY.illustration}</span>}
      </div>
    </div>
  );
}
