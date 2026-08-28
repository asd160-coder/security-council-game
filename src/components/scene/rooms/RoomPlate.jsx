import { useId } from 'react';
import CabinetRoom from './CabinetRoom.jsx';
import Chamber from './Chamber.jsx';
import Corridor from './Corridor.jsx';
import DeskRoom from './DeskRoom.jsx';
import EmbassyOffice from './EmbassyOffice.jsx';
import { FIELD } from './parts.jsx';
import styles from './rooms.module.css';

/* The room, drawn.

   A conversation used to happen on empty board with the place named only in
   prose. This puts the room behind it: not illustration for its own sake, but
   the four things a set tells you before anyone speaks — where this is, how
   formal it is, how far apart the people are, and what kind of pressure the
   room applies.

   Drawn rather than photographed, and geometric rather than rendered, which
   is what keeps the rights rule automatic: nothing here can be mistaken for
   archive, so there is no risk of invented imagery passing as evidence. These
   are board-register — the present interface showing you a room — and never
   paper.

   Two variants off one drawing. `card` is the establishing view. `band` is the
   same field cropped to its top strip and dimmed, so the room stays present
   during the conversation without an utterance ever being read over scenery. */

const ROOMS = {
  cabinet: CabinetRoom,
  embassy: EmbassyOffice,
  chamber: Chamber,
  corridor: Corridor,
  desk: DeskRoom,
};

/* Where the light comes from, and how warm it is. One entry per value of the
   `light` axis — this is the cheapest lever in the system and does more work
   than any other: the same cabinet room at `dawn` and at `night` is two
   different rooms to be in. */
const LIGHTING = {
  day: { x: '50%', y: '4%', r: '78%', warm: 0.05, lift: 0.16 },
  evening: { x: '74%', y: '10%', r: '66%', warm: 0.09, lift: 0.09 },
  night: { x: '50%', y: '2%', r: '58%', warm: 0.04, lift: 0.05 },
  dawn: { x: '24%', y: '14%', r: '70%', warm: 0.13, lift: 0.11 },
  lamp: { x: '78%', y: '52%', r: '52%', warm: 0.17, lift: 0.07 },
  overhead: { x: '50%', y: '0%', r: '62%', warm: 0.03, lift: 0.13 },
};

export default function RoomPlate({
  room = 'corridor',
  light = 'overhead',
  occupancy = 'occupied',
  vantage = 'floor',
  variant = 'card',
}) {
  const uid = useId();
  const Room = ROOMS[room] ?? Corridor;
  const lit = LIGHTING[light] ?? LIGHTING.overhead;
  const band = variant === 'band';

  return (
    <div
      className={`${styles.plate} ${band ? styles.plateBand : styles.plateCard}`}
      /* Decorative without exception. The `place` line already states the room
         in words a screen reader can read, so nothing is lost by hiding this
         and a great deal of noise is avoided by not describing furniture. */
      aria-hidden="true"
    >
      <svg
        className={styles.svg}
        /* Not the whole field. The rooms are drawn tall so the parts have room
           to relate to each other, but the card is a letterbox — so the
           viewBox crops to the band that carries the meaning: the horizon,
           the chairs behind it and the near edge of the table. The band
           variant crops further, to structure alone. */
        viewBox={band ? `0 96 ${FIELD.w} 210` : `0 96 ${FIELD.w} 420`}
        /* The card and the band are different shapes over the same drawing.
           `slice` fills either without distorting; anchoring the band to the
           top (`xMidYMin`) crops to the structure of the room rather than to
           its furniture, which is what makes a 100px strip still legible as a
           chamber or a corridor. */
        preserveAspectRatio={band ? 'xMidYMin slice' : 'xMidYMid slice'}
        role="presentation"
        focusable="false"
      >
        <defs>
          <radialGradient id={`${uid}-light`} cx={lit.x} cy={lit.y} r={lit.r}>
            <stop offset="0%" className={styles.lightCore} stopOpacity={lit.warm} />
            <stop offset="55%" className={styles.lightMid} stopOpacity={lit.warm * 0.4} />
            <stop offset="100%" className={styles.lightEdge} stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect x="0" y="0" width={FIELD.w} height={FIELD.h} className={styles.ground} />

        <g className={styles.structure} style={{ opacity: 0.72 + lit.lift }}>
          <Room occupancy={occupancy} light={light} vantage={vantage} />
        </g>

        {/* The room's own light source, laid over everything it falls on. */}
        <rect x="0" y="0" width={FIELD.w} height={FIELD.h} fill={`url(#${uid}-light)`} />
      </svg>

      {/* The readability contract, in --board at graduated alpha rather than
          neutral black: clear the column the type sits in, then seat the plate
          top and bottom so it has no visible edge against the card. */}
      <span className={styles.scrim} />
    </div>
  );
}
