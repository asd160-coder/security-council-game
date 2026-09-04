import { ChairRank, Desk, DeskLamp, Hatching, Papers, Shell, Telephone, Window } from './parts.jsx';
import styles from './rooms.module.css';

/* An ambassador's office. Private, and watched.

   A desk with a lamp on it, a curtained window, papers, and — from Day 5 —
   a telephone, because that is the day the embassy "has arranged itself
   around the telephone in the way". One or two chairs, never a rank: this is
   a room where two people talk, not a room that holds a meeting.

   The lamp is the whole character of the plate. It is the only warm light in
   the set and it is what separates a private room from an institutional one. */

export default function EmbassyOffice({ occupancy = 'bilateral', light = 'lamp' }) {
  /* Bilateral means someone has come to see you. Solitary means the cable has
     not arrived and you are waiting on it alone. */
  const chairs = occupancy === 'bilateral' ? 2 : 1;

  return (
    <>
      <Shell />
      <Hatching step={34} />
      <Window x={96} width={188} top={40} bottom={214} blinds />
      {/* Drapes, drawn as two heavy verticals rather than a curtain shape —
          the set does not have folds in its vocabulary and does not need them. */}
      <rect x={78} y={34} width={26} height={186} className={styles.drape} />
      <rect x={276} y={34} width={26} height={186} className={styles.drape} />
      <ChairRank y={312} count={chairs} pushedIn={false} spread={chairs === 2 ? 300 : 150} />
      <Desk x={470} y={392} width={452} depth={162} />
      <Papers x={520} y={430} count={3} />
      {occupancy === 'solitary' && <Telephone x={690} y={436} />}
      {light === 'lamp' && <DeskLamp x={846} y={402} pool={1.35} />}
    </>
  );
}
