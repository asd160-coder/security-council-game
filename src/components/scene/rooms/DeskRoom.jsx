import { ChairRank, Desk, DeskLamp, Hatching, Papers, Shell, Window } from './parts.jsx';

/* One desk, one chair, one window.

   The room where something gets written, or where someone waits. There is no
   one across the table because there is no one to be across it — this is the
   plate for the scenes that are a person alone with a decision that has
   already left their hands.

   `light: dawn` lifts the window: Day 5 is a morning with nothing in it but
   waiting, and the light arriving is most of what that morning is. */

export default function DeskRoom({ light = 'lamp', occupancy = 'solitary' }) {
  const dawn = light === 'dawn';

  return (
    <>
      <Shell />
      <Hatching step={36} />
      <Window x={598} width={230} top={30} bottom={228} lit={dawn} />
      <ChairRank y={318} count={1} height={82} pushedIn={occupancy === 'empty'} spread={190} />
      <Desk x={150} y={398} width={470} depth={168} />
      <Papers x={214} y={432} count={occupancy === 'empty' ? 2 : 4} />
      {!dawn && <DeskLamp x={520} y={406} />}
    </>
  );
}
