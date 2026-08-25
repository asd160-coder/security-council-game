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
    id: 'u2-san-cristobal',
    kind: 'image',
    file: null, // public/archive/u2-san-cristobal-1962-10-14.jpg
    title: 'U-2 reconnaissance frame, San Cristóbal',
    date: '14 October 1962',
    caption:
      'A high-altitude photograph of a medium-range ballistic missile site under construction in western Cuba.',
    source: 'CIA / National Photographic Interpretation Center, via the US National Archives',
    rights: 'Public domain — work of the US federal government',
    whyItMatters:
      'This is the evidence itself. Every decision that follows rests on an image most of the world had not yet seen.',
  },
  {
    id: 'npic-briefing-board',
    kind: 'image',
    file: null, // public/archive/npic-briefing-board-1962-10-16.jpg
    title: 'NPIC briefing board, annotated',
    date: '15–16 October 1962',
    caption:
      'A mounted briefing board of the same imagery, marked up by photo interpreters to identify launch positions, erectors and support vehicles.',
    source: 'CIA / National Photographic Interpretation Center, FOIA Electronic Reading Room',
    rights: 'Public domain — work of the US federal government',
    whyItMatters:
      'The board is where a photograph became an argument. Someone had to decide what the shapes on the film meant, and then persuade a president of it.',
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
