import { ChairRank, Clock, Hatching, Shell, TableEdge, Window } from './parts.jsx';

/* The cabinet room. Where a government argues with itself.

   Long table, a rank of chairs behind it, tall windows with the blinds
   half-drawn, and a clock. The blinds are the detail that makes it read as
   institutional rather than domestic: someone decided how much of the
   outside this room gets to see.

   `occupancy` is the real variable here. Day 1 is a room that has been called
   together; Day 4 is a room that has been arguing since the aircraft was lost
   and whose chairs are no longer squared up; Day 5 is a room that has run out
   of things to say. */

export default function CabinetRoom({ occupancy = 'occupied' }) {
  const chairs = occupancy === 'full' ? 9 : occupancy === 'empty' ? 5 : 7;
  /* Only a room still in session has chairs out of line. */
  const pushedIn = occupancy === 'empty' || occupancy === 'solitary';

  return (
    <>
      <Shell />
      <Hatching step={30} />
      <Window x={72} width={168} blinds />
      <Window x={760} width={168} blinds />
      <Clock x={500} y={92} r={30} />
      <ChairRank y={306} count={chairs} pushedIn={pushedIn} spread={860} />
      <TableEdge y={424} curve={54} />
    </>
  );
}
