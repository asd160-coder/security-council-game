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
    file: null, // public/archive/excomm-cabinet-room-1962-10-29.jpg
    title: 'Executive Committee meeting, Cabinet Room',
    date: 'October 1962',
    caption:
      'The President and his advisers during the Executive Committee deliberations at the White House.',
    source: 'Cecil Stoughton, White House Photographs, John F. Kennedy Presidential Library',
    rights: 'Public domain — work of the US federal government',
    whyItMatters:
      'The crisis was argued in a room this size. The people in it disagreed sharply, and the record of their disagreement survives.',
  },
  {
    id: 'jfk-address',
    kind: 'audio',
    file: null, // public/archive/jfk-address-1962-10-22.mp3
    title: 'Radio and television address to the nation',
    date: '22 October 1962',
    caption:
      'The President informs the American public of the missile installations and announces a naval quarantine of Cuba.',
    source: 'John F. Kennedy Presidential Library and Museum',
    rights: 'Public domain — work of the US federal government',
    whyItMatters:
      'The moment the crisis stopped being secret. Public knowledge narrowed what either government could quietly agree to.',
  },
];

export const getArchive = (id) => ARCHIVE.find((item) => item.id === id) ?? null;

/* True once a file has actually been placed in public/archive and wired above. */
export const isPresent = (item) => Boolean(item && item.file);
