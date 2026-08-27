/* Archival media slots.

   Every item here is DECLARED before it exists. The app renders a designed
   empty state when `file` is absent, so the slice is fully playable with an
   empty public/archive directory — and gains its photographs and audio by
   dropping files in, with no code change.

   Rules this project holds itself to, because the game is intended for public
   deployment:

   - Only material that is verifiably public domain. In practice that means US
     federal works: CIA/NPIC reconnaissance frames, White House photography,
     and the President's own broadcast address, via NARA and the JFK Library.
   - Period commercial radio and television news (CBS, NBC, ABC) remains under
     copyright and is not used, however atmospheric it would be.
   - `source` and `rights` render visibly wherever the item renders. They are
     not optional metadata; they are part of the design.
   - `whyItMatters` is required. The design packet asks that every clip be
     followed by one sentence explaining its relevance, and a caption that only
     describes the picture does not do that job. */

export const ARCHIVE = [
  {
    id: 'u2-mrbm-launch-site',
    kind: 'image',
    file: 'u2-mrbm-launch-site-1962-10-15.jpg',
    title: 'MRBM launch site, San Diego de los Baños',
    date: 'Readout board dated 15 October 1962',
    caption:
      'U-2 photography of western Cuba, marked up by photo interpreters: eight missile trailers, four probable erector/launcher units, tent areas and construction.',
    source: 'CIA / National Photographic Interpretation Center',
    rights: 'Public domain — work of the US federal government',
    whyItMatters:
      'This is the evidence itself. Every decision that follows rests on an image most of the world had not yet seen.',
  },
  {
    id: 'npic-briefing-board',
    kind: 'image',
    file: 'npic-briefing-board-1962-10-15.jpg',
    title: 'Military encampment, Los Palacios',
    date: 'Readout board dated 15 October 1962',
    caption:
      'A second readout board from the same coverage, annotating a convoy, six missile trailers, equipment and tents. Reference NPIC G-6731.',
    source: 'CIA / National Photographic Interpretation Center',
    rights: 'Public domain — work of the US federal government',
    whyItMatters:
      'The board is where a photograph became an argument. Someone had to decide what the shapes on the film meant, and then persuade a president of it.',
  },
  {
    id: 'ss4-reference',
    kind: 'image',
    file: 'ss4-reference-red-square.jpg',
    title: 'SS-4 medium-range ballistic missile, Moscow parade',
    date: 'Reference photograph, early 1960s',
    caption:
      'A Soviet SS-4 on its transporter in Red Square. Photographs like this gave interpreters the measurements they compared against the shapes in the Cuban imagery.',
    source: 'CIA reference photography',
    rights: 'Public domain — work of the US federal government',
    whyItMatters:
      'Identification was comparison. The missiles were recognised in Cuba because the Soviet Union had already paraded them through its own capital.',
  },
  {
    id: 'excomm-cabinet-room',
    kind: 'image',
    file: 'excomm-cabinet-room-1962-10.jpg',
    title: 'Executive Committee meeting, Cabinet Room',
    date: 'October 1962',
    caption:
      'The Executive Committee in session at the White House. Robert Kennedy stands at the left of the frame; the Vice-President sits at the table. The room in which every option was argued, repeatedly, by people who disagreed.',
    source: 'Cecil Stoughton, White House Photographs, John F. Kennedy Presidential Library',
    rights: 'Public domain — work of the US federal government',
    whyItMatters:
      'The crisis was argued in a room this size. The people in it disagreed sharply, and the record of their disagreement survives.',
  },
  {
    id: 'jfk-address',
    kind: 'audio',
    file: 'jfk-address-1962-10-22.m4a',
    title: 'Radio and television address to the nation',
    date: '22 October 1962',
    caption:
      'An excerpt from the address in which the President sets out what has been found in Cuba, what these weapons can reach, and why a build-up conducted in secret is treated differently from one conducted openly. Two minutes fifty-four seconds of a seventeen-minute broadcast.',
    source: 'John F. Kennedy Presidential Library and Museum, JFKWHA-142-001',
    rights: 'Public domain — work of the US federal government',
    whyItMatters:
      'The moment the crisis stopped being secret. Public knowledge narrowed what either government could quietly agree to.',
  },
  {
    id: 'p2-neptune',
    kind: 'image',
    file: 'p2-neptune-okhotsk-1962-10.jpg',
    title: 'Patrol aircraft over the Okhotsk',
    date: 'October 1962',
    caption:
      'A US Navy P-2 Neptune of squadron VP-18 passing low over the Soviet freighter Okhotsk, her deck cargo in plain view. The quarantine was enforced largely by being seen to be enforced.',
    source: 'US Navy, Naval History and Heritage Command',
    rights: 'Public domain — work of the US federal government',
    whyItMatters:
      'This is what the line actually looked like: an aircraft, a ship, and two governments watching to see what the other would do about it.',
  },
  {
    id: 'ship-departing',
    kind: 'image',
    file: 'soviet-ship-departing-1962-11.jpg',
    title: 'Soviet freighter leaving Cuba, deck cargo uncovered',
    date: 'November 1962',
    caption:
      'A departing freighter photographed from directly above, her crated cargo left uncovered on deck so that it could be counted from the air. Verification, conducted by consent and without anyone having to say so.',
    source: 'US Navy, Naval History and Heritage Command',
    rights: 'Public domain — work of the US federal government',
    whyItMatters:
      'The settlement held because both sides arranged to let the other watch it being kept. That is what a verified withdrawal looked like in practice.',
  },
];

export const getArchive = (id) => ARCHIVE.find((item) => item.id === id) ?? null;

/* True once a file has actually been placed in public/archive and wired above. */
export const isPresent = (item) => Boolean(item && item.file);
