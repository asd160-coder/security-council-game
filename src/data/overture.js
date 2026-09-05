/* The overture: about a minute before the seat is taken.

   A full playthrough found the game's soft spot was its opening — the hook
   landed at Day 1, scene 3, and a student met two generic screens first.
   This is the answer: the stakes, stated once, in a voice, before anyone is
   asked to choose anything.

   It is an archival montage and deliberately not a rendering. The design
   packet asks for "documentary-editorial rather than cartoon or arcade …
   archival photography … subtle motion", and rules out "explosive cinematic
   imagery" even where it contemplates showing nuclear war. So every shot is
   a real public-domain photograph, moved slowly, and the bomb is the real
   cloud over Nagasaki rather than a drawing of one.

   THE SCRIPT is the user's second draft, verbatim, as recorded. The first
   draft had been revised here in four places for documentary reasons. The
   second keeps three: "the war" rather than "the Great War", which is
   1914–18; a price that was exacted rather than one "we paid", in the user's
   own words; and the Berlin caption, which says the Americans arrived for the
   occupation, because American tanks did not fight into the city. It sets
   aside the fourth: "men on both sides eager to push the button" is back.
   That is the caricature history.js insists the hawks were not, and it stays
   because the narrator is the seat's voice, not the game's — and the pictures
   under it, the tanks at Checkpoint Charlie and the president with his
   Chiefs, are captioned as what they show, not as eager men.

   THE VOICE is synthesised — ElevenLabs, a stock voice — and the credits say
   so. It was delivered with the breaks between lines rendered at about two
   seconds, which gave each image three and a half, so .design/pad-narration.swift
   rebuilt it with a longer pause after every line; docs/asset-manifest.md has
   the pause table. The pauses are cut from the take's own silence rather than
   inserted as empty time: not for the ear — the take's floor is −90 dB — but
   because AVFoundation drops an empty range at the end of a composition, and
   the last pause is exactly there.

   TWO CLOCKS. Each beat carries `at`, its start in seconds within the
   narration, and `hold`, its length in milliseconds when the film runs on a
   timer. Every `at` was read from .design/speech-segments.swift run on the
   rebuilt file, never typed from a plan: a spoken beat begins 0.15 s before
   its line, because `timeupdate` fires about four times a second and the
   caption should land on the voice rather than a quarter-second behind it; a
   wordless beat begins 1.3 s after the line before it ends (1.5 s after the
   Nagasaki line, so that shot is not cut short). Each `hold` is the gap to
   the next `at`, so the Ken Burns move, which runs for --beat, is paced to
   the real beat, and the timer plays the same film if the audio cannot start.
   Only one clock is ever in charge, and tools/walk.mjs refuses a beat out of
   order or a hold that has drifted from its gap.

   SHOTS. `archiveId` names the entry in src/data/archive.js that carries the
   still's source and rights, so the credits panel lists every shot with no
   second list to keep in step. The component still renders a labelled slate
   rather than a hole if an id ever fails to resolve. The five closing beats
   are photographs of the three men — the record is not silent about them —
   each an archive item with its source; two are details cut from a wider
   frame, and the archive says so. They are shown as plates (see Shot),
   whole, after the first playthrough found the painted portraits cropped
   to nothing but face. The portraits remain everywhere else in the game.

   Sixteen beats from twelve lines: four lines hand over to a wordless shot
   inside their pause — the shadow at Hiroshima, the rocket, a classroom
   under its desks, the president with the Chiefs — and the engine is simpler
   with one shot per beat than with two shots inside one. The classroom is a
   frame of the 1951 film Duck and Cover, cut with .design/frame-grab.swift;
   the first cut used the film's opening cartoon, and the first playthrough
   asked for the children instead. */

export const BEATS = [
  {
    id: 'berlin',
    line: 'The war had ended.',
    at: 0,
    hold: 3650,
    shot: { archiveId: 'ov-truman-berlin', alt: 'President Truman, Secretary Byrnes and Admiral Leahy in an open car among the ruins of Berlin, July 1945.', move: 'in' },
  },
  {
    id: 'price',
    line: 'It exacted a terrible price.',
    at: 3.65,
    hold: 2850,
    shot: { archiveId: 'ov-nagasaki-cloud', alt: 'The cloud over Nagasaki, photographed from the air minutes after the detonation.', move: 'out' },
  },
  {
    /* The line's pause; the shot changes. A four-inch contact print shown
       as one — `contain` on the dark ground rather than blown up to fill. */
    id: 'shadow',
    line: '',
    at: 6.5,
    hold: 3300,
    shot: { archiveId: 'ov-hiroshima-shadow', alt: 'The shadow of a person burned onto the steps of a bank in Hiroshima.', move: 'in', fit: 'contain' },
  },
  {
    id: 'warfare',
    line: 'It ushered in a new age of warfare.',
    at: 9.8,
    hold: 4650,
    shot: { archiveId: 'ov-crossroads-baker', alt: 'A nuclear test at sea: the column of water rising over the fleet at Bikini Atoll.', move: 'in' },
  },
  {
    id: 'wonders',
    line: 'Where once we hoped for a new era of wonders,',
    at: 14.45,
    hold: 3250,
    shot: { archiveId: 'ov-shippingport', alt: 'The Shippingport reactor under construction on the Ohio River, 1956.', move: 'left' },
  },
  {
    id: 'rocket',
    line: '',
    at: 17.7,
    hold: 3500,
    shot: { archiveId: 'ov-juno-explorer', alt: 'A rocket standing on its pad at night, venting, hours before launch.', move: 'in', fit: 'contain' },
  },
  {
    id: 'spectre',
    line: 'now we live under the spectre of destruction,',
    at: 21.2,
    hold: 2900,
    shot: { archiveId: 'excomm-cabinet-room', alt: 'The Executive Committee in session in the Cabinet Room of the White House.', move: 'in' },
  },
  {
    id: 'cover',
    line: '',
    at: 24.1,
    hold: 3500,
    shot: { archiveId: 'ov-duck-and-cover-classroom', alt: 'Two schoolchildren curled under their desks with their hands over their necks, a frame from the 1951 civil-defence film Duck and Cover.', move: 'in', fit: 'contain' },
  },
  {
    id: 'arsenals',
    line: 'under threat from nuclear arsenals',
    at: 27.6,
    hold: 4300,
    shot: { archiveId: 'ss4-reference', alt: 'A Soviet SS-4 medium-range missile on its transporter, paraded through Red Square.', move: 'right' },
  },
  {
    id: 'button',
    line: 'with men on both sides eager to push the button.',
    at: 31.9,
    hold: 2900,
    shot: { archiveId: 'ov-checkpoint-charlie', alt: 'American and Soviet tanks facing each other across the sector boundary at Checkpoint Charlie, Berlin, October 1961.', move: 'right' },
  },
  {
    id: 'chiefs',
    line: '',
    at: 34.8,
    hold: 3500,
    shot: { archiveId: 'ov-jfk-colonnade', alt: 'President Kennedy on the West Wing Colonnade with Bundy, Nitze, General Taylor and McNamara, 29 October 1962.', move: 'out' },
  },
  {
    id: 'stand',
    line: 'And we are all that stand in their way.',
    at: 38.3,
    hold: 4950,
    shot: { archiveId: 'ov-dobrynin-kennedy', alt: 'Ambassador Dobrynin seated across from President Kennedy in the Oval Office, March 1962, photographers behind them.', move: 'in', fit: 'plate' },
  },
  {
    id: 'cowards',
    line: 'Some call us cowards.',
    at: 43.25,
    hold: 4200,
    shot: { archiveId: 'ov-dobrynin', alt: 'Anatoly Dobrynin, seated, a folder on his knee.', move: 'still', fit: 'plate' },
  },
  {
    id: 'negotiate',
    line: 'But we negotiate. We compromise, in back rooms.',
    at: 47.45,
    hold: 5450,
    shot: { archiveId: 'ov-u-thant-kennedy-stevenson', alt: 'President Kennedy, U Thant and Adlai Stevenson side by side on a sofa in a hotel suite, January 1962.', move: 'in', fit: 'plate' },
  },
  {
    id: 'know',
    line: 'Because we know — if we don’t find a way',
    at: 52.9,
    hold: 4750,
    shot: { archiveId: 'ov-u-thant', alt: 'U Thant, seated, hands folded.', move: 'still', fit: 'plate' },
  },
  {
    id: 'end',
    line: 'it’ll be the end of all things.',
    at: 57.65,
    hold: 5800,
    shot: { archiveId: 'ov-rfk', alt: 'Robert Kennedy seated in the Oval Office, looking towards the President, February 1962.', move: 'in', fit: 'plate' },
  },
];

/* The narration. Not an archive item — it is the game's own voice, not a
   document — so it lives beside the game rather than in public/archive. The
   file is the rebuilt take; the delivered one is .design/narration-source.mp3. */
export const NARRATION_SRC = 'overture/narration.m4a';

/* The audio can only drive the film once every beat knows where it starts. */
export const audioTimed = () => BEATS.every((b) => typeof b.at === 'number');
