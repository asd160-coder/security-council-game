import { ChairRank, Emblem, Hatching, MicBank, PlacardRow, Shell, TableEdge } from './parts.jsx';

/* The Security Council chamber. Everything here is on the record.

   A horseshoe of table, name cards along it, a bank of microphones, tiered
   seating behind, and an emblem on the back wall. The emblem is invented — a
   disc and a ring — rather than the real insignia, because reproducing a
   living organisation's mark is a provenance question this project does not
   need to open.

   `vantage: 'dais'` is U Thant's view. He does not address this room from the
   floor; he sits above it, and the horizon rises to say so. */

export default function Chamber({ occupancy = 'full', vantage = 'floor' }) {
  const dais = vantage === 'dais';
  const horizon = dais ? 218 : 250;
  const seats = occupancy === 'full' ? 11 : occupancy === 'occupied' ? 8 : 5;

  return (
    <>
      <Shell horizon={horizon} />
      <Hatching step={28} height={horizon} />
      <Emblem x={500} y={dais ? 108 : 126} r={dais ? 70 : 58} />
      {/* Two tiers, because a chamber is people behind people. */}
      <ChairRank y={horizon + 4} count={seats} height={54} spread={940} />
      <ChairRank y={horizon + 62} count={seats - 2} height={66} spread={880} />
      <TableEdge y={dais ? 402 : 418} curve={dais ? 110 : 96} inset={30} />
      <PlacardRow y={dais ? 372 : 388} count={dais ? 7 : 6} spread={840} />
      <MicBank y={dais ? 372 : 388} count={dais ? 7 : 6} spread={840} height={42} lit />
    </>
  );
}
