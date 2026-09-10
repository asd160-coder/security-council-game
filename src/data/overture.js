/* The overture: under a minute before the seat is taken.

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

   THE SCRIPT is the user's, verbatim, as recorded — twelve lines. Two are
   worth a note. "Men on both sides eager to push the button" is the
   caricature history.js insists the hawks were not; it stays because the
   narrator is the seat's voice, not the game's, and the pictures under it
   are captioned as what they show. And "the war", not "the Great War",
   because the Berlin shot is 1945.

   THE VOICE is synthesised — ElevenLabs, a stock voice — and the credits say
   so. Third pass. The first take was replaced for sounding robotic; the
   second was padded with two to four seconds of silence after every line,
   which made that sound robotic too, and the user said so. So the take now
   plays as delivered — nothing inside it is cut, stretched or moved; the
   one addition is a few seconds of its own room tone at the end, so the
   last photograph can hold and the bed can fade. Under the voice is a low
   drone the game makes for itself (.design/make-bed.swift), mixed in by
   .design/mix-narration.swift; docs/asset-manifest.md has the level.

   WHERE THE LINES BEGIN. This voice pauses inside its lines as long as it
   pauses between them, and macOS speech recognition could not be reached
   from a tool (see .design/transcribe.swift), so the lines were placed by
   word count (.design/align-lines.py) with two facts read off the waveform:
   the take opens with a stray syllable at 0.15 s — first read as a clipped
   "The", heard by the user as "all" — and line one proper begins at 2.65 s;
   and lines six and seven were spoken in one breath. Beat 7 therefore begins
   1.73 s into that breath by share of syllables — the one `at` that is an
   estimate rather than a measurement. The stray syllable has since been
   silenced in place (.design/mute-range.swift), so the first image holds for
   two and a half seconds of bed before the voice enters; no `at` moved.

   TWO CLOCKS. Each beat carries `at`, its start in seconds within the
   narration, and `hold`, its length in milliseconds when the film runs on a
   timer. A spoken beat begins 0.15 s before its line, because `timeupdate`
   fires about four times a second and the caption should land on the voice
   rather than a quarter-second behind it. Each `hold` is the gap to the
   next `at`, the last to the file's end, so the Ken Burns move, which runs
   for --beat, is paced to the real beat, and the timer plays the same film
   if the audio cannot start. Only one clock is ever in charge, and
   tools/walk.mjs refuses a beat out of order or a hold that has drifted
   from its gap. Timings are read from the clean voice file
   (.design/narration-voice.m4a), never the mixed one, whose bed fills the
   silences.

   SHOTS. `archiveId` names the entry in src/data/archive.js that carries the
   still's source and rights, so the credits panel lists every shot with no
   second list to keep in step. The component still renders a labelled slate
   rather than a hole if an id ever fails to resolve. The five closing beats
   are photographs of the three men, shown as plates (see Shot), whole; two
   are details cut from a wider frame, and the archive says so.

   Twelve beats, one image per line. At the voice's own pace there is no gap
   for a wordless shot to live in, so the four that sat inside the pauses —
   the shadow at Hiroshima, the rocket, the ExComm room, the President with
   the Chiefs — were cut, with the user's leave, in favour of focus. */

export const BEATS = [
  {
    id: 'berlin',
    line: 'The war had ended.',
    at: 0,
    hold: 4500,
    shot: { archiveId: 'ov-truman-berlin', alt: 'President Truman, Secretary Byrnes and Admiral Leahy in an open car among the ruins of Berlin, July 1945.', move: 'in' },
  },
  {
    id: 'price',
    line: 'It exacted a terrible price.',
    at: 4.5,
    hold: 3800,
    shot: { archiveId: 'ov-nagasaki-cloud', alt: 'The cloud over Nagasaki, photographed from the air minutes after the detonation.', move: 'out' },
  },
  {
    id: 'warfare',
    line: 'It ushered in a new age of warfare.',
    at: 8.3,
    hold: 3600,
    shot: { archiveId: 'ov-crossroads-baker', alt: 'A nuclear test at sea: the column of water rising over the fleet at Bikini Atoll.', move: 'in' },
  },
  {
    id: 'wonders',
    line: 'Where once we hoped for a new era of wonders,',
    at: 11.9,
    hold: 4900,
    shot: { archiveId: 'ov-shippingport', alt: 'The Shippingport reactor under construction on the Ohio River, 1956.', move: 'left' },
  },
  {
    id: 'spectre',
    line: 'now we live under the spectre of destruction,',
    at: 16.8,
    hold: 3950,
    shot: { archiveId: 'ov-duck-and-cover-classroom', alt: 'Two schoolchildren curled under their desks with their hands over their necks, a frame from the 1951 civil-defence film Duck and Cover.', move: 'in', fit: 'contain' },
  },
  {
    id: 'arsenals',
    line: 'under threat from nuclear arsenals',
    at: 20.75,
    hold: 1750,
    shot: { archiveId: 'ss4-reference', alt: 'A Soviet SS-4 medium-range missile on its transporter, paraded through Red Square.', move: 'right' },
  },
  {
    /* The one estimated cue: this line and the one before were spoken in a
       single breath, and its start is placed by share of syllables. */
    id: 'button',
    line: 'with men on both sides eager to push the button.',
    at: 22.5,
    hold: 2850,
    shot: { archiveId: 'ov-checkpoint-charlie', alt: 'American and Soviet tanks facing each other across the sector boundary at Checkpoint Charlie, Berlin, October 1961.', move: 'right' },
  },
  {
    id: 'stand',
    line: 'And we are all that stand in their way.',
    at: 25.35,
    hold: 8200,
    shot: { archiveId: 'ov-dobrynin-kennedy', alt: 'Ambassador Dobrynin seated across from President Kennedy in the Oval Office, March 1962, photographers behind them.', move: 'in', fit: 'plate' },
  },
  {
    id: 'cowards',
    line: 'Some call us cowards.',
    at: 33.55,
    hold: 3100,
    shot: { archiveId: 'ov-dobrynin', alt: 'Anatoly Dobrynin, seated, a folder on his knee.', move: 'still', fit: 'plate' },
  },
  {
    id: 'negotiate',
    line: 'But we are the negotiators, the compromisers, working in back rooms.',
    at: 36.65,
    hold: 3950,
    shot: { archiveId: 'ov-u-thant-kennedy-stevenson', alt: 'President Kennedy, U Thant and Adlai Stevenson side by side on a sofa in a hotel suite, January 1962.', move: 'in', fit: 'plate' },
  },
  {
    id: 'know',
    line: 'Because we know — if we don’t find a way',
    at: 40.6,
    hold: 7600,
    shot: { archiveId: 'ov-u-thant', alt: 'U Thant, seated, hands folded.', move: 'still', fit: 'plate' },
  },
  {
    id: 'end',
    line: 'it’ll be the end of all things.',
    at: 48.2,
    hold: 8510,
    shot: { archiveId: 'ov-rfk', alt: 'Robert Kennedy seated in the Oval Office, looking towards the President, February 1962.', move: 'in', fit: 'plate' },
  },
];

/* The narration. Not an archive item — it is the game's own voice, not a
   document — so it lives beside the game rather than in public/archive. The
   file is the rebuilt take; the delivered one is .design/narration-source.mp3. */
export const NARRATION_SRC = 'overture/narration.m4a';

/* The audio can only drive the film once every beat knows where it starts. */
export const audioTimed = () => BEATS.every((b) => typeof b.at === 'number');
