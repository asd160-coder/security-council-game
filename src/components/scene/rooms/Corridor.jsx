import { Clock, Doorway, Hatching, Receding, Shell } from './parts.jsx';
import styles from './rooms.module.css';

/* A corridor. Somewhere between two rooms that matter.

   Walls running away to a lit doorway, a hard floor, and a clock. This is the
   only plate in the set built on perspective, and that is the point: a
   corridor is a place you are passing through, and the vanishing point is
   what makes it feel that way.

   It is also the most exposed room here. Nothing in it is yours, anyone can
   walk down it, and whatever is said has to be said before someone does. */

export default function Corridor({ light = 'overhead', occupancy = 'bilateral' }) {
  /* An evening corridor is one you are crossing on your own errand; an
     overhead-lit one is a working building in the middle of a working day,
     with a door open at the end of it. */
  const open = light !== 'evening';

  return (
    <>
      <Shell />
      <Receding inset={268} />
      <Doorway x={446} width={108} top={78} open={open} />
      {/* Light from the one place you are not: a bright sill, and its spill
          down the floor toward you. The corridor's only light is a door. */}
      {open && (
        <>
          <line x1={446} y1={250} x2={554} y2={250} className={styles.sill} />
          <path d="M 446 250 L 554 250 L 660 440 L 340 440 Z" className={styles.spill} />
        </>
      )}
      {/* Floor rule, running to the vanishing point. */}
      <Hatching y={250} height={370} step={44} vertical={false} />
      <Clock x={232} y={104} r={26} />
      {occupancy !== 'solitary' && (
        /* A bench against the wall: the one piece of furniture a corridor
           has, and a reason two people might stop in one. */
        <rect x={62} y={330} width={190} height={13} rx="2" className={styles.bench} />
      )}
    </>
  );
}
