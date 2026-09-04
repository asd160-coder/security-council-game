/* The overture: about seventy seconds before the seat is taken.

   A full playthrough found the game's soft spot was its opening — the hook
   landed at Day 1, scene 3, and a student met two generic screens first.
   This is the answer: the stakes, stated once, in a voice, before anyone is
   asked to choose anything.

   It is an archival montage and deliberately not a rendering. The design
   packet asks for "documentary-editorial rather than cartoon or arcade …
   archival photography … subtle motion", and rules out "explosive cinematic
   imagery" even where it contemplates showing nuclear war. So every shot is
   a real public-domain photograph or frame, moved slowly, layered for depth,
   and the bomb is the real cloud over Nagasaki rather than a drawing of one.

   THE SCRIPT was supplied by the user and revised in four places, each for a
   documentary reason rather than a stylistic one:
     - "The Great War" is 1914–18; the Berlin shot is 1945. So: the war.
     - American tanks did not fight into Berlin. The Soviets took the city
       alone; the Americans arrived in July for the occupation. The shot and
       its caption say that.
     - "We paid a terrible price", over Hiroshima, reads the bombing as the
       narrator's cost. The price fell on people who were not consulted, which
       is the ethic the civilian-risk needle runs on. So: it had ended at one.
     - "Men eager to push the button" is the caricature history.js insists
       the hawks were not. "Men who believe the other will blink" keeps the
       menace and loses the cartoon.
   Everything from "And we are all that stand in their way" is verbatim.

   TWO CLOCKS. Each beat carries `hold`, its length in milliseconds when the
   film runs on a timer, and `at`, its start in seconds within the recorded
   narration. `at` is null until the user records the voice; while it is, the
   timer runs the film and the captions carry the words. Once every beat has
   an `at`, the audio element drives the beats instead, and the two never
   disagree because only one of them is ever in charge.

   SHOTS. `archiveId` names the entry in src/data/archive.js that carries the
   still's source and rights, so the credits panel lists every shot with no
   second list to keep in step. A `slate` — a labelled dark frame — stands in
   for any shot not yet sourced; none remain, but the component still renders
   one rather than a hole if an id ever fails to resolve. The three closing
   shots are the seats' own portraits, already credited as illustrations.

   Fifteen beats, not thirteen: "a terrible price" and "unlock wonders" each
   hold their line across two shots, and the engine is simpler with one shot
   per beat than with two shots inside one. */

export const BEATS = [
  {
    id: 'berlin',
    line: 'The war had ended.',
    hold: 5200,
    at: null,
    shot: { archiveId: 'ov-truman-berlin', alt: 'President Truman, Secretary Byrnes and Admiral Leahy in an open car among the ruins of Berlin, July 1945.', move: 'in' },
  },
  {
    id: 'price',
    line: 'It had ended at a terrible price.',
    hold: 4400,
    at: null,
    shot: { archiveId: 'ov-nagasaki-cloud', alt: 'The cloud over Nagasaki, photographed from the air minutes after the detonation.', move: 'out' },
  },
  {
    /* The same line held; the shot changes. A four-inch contact print shown
       as one — `contain` on the dark ground rather than blown up to fill. */
    id: 'shadow',
    line: '',
    hold: 3400,
    at: null,
    shot: { archiveId: 'ov-hiroshima-shadow', alt: 'The shadow of a person burned onto the steps of a bank in Hiroshima.', move: 'in', fit: 'contain' },
  },
  {
    id: 'warfare',
    line: 'It ushered in a new age of warfare.',
    hold: 5000,
    at: null,
    shot: { archiveId: 'ov-crossroads-baker', alt: 'A nuclear test at sea: the column of water rising over the fleet at Bikini Atoll.', move: 'in' },
  },
  {
    id: 'wonders',
    line: 'The nuclear age was supposed to unlock wonders.',
    hold: 3600,
    at: null,
    shot: { archiveId: 'ov-shippingport', alt: 'The Shippingport reactor under construction on the Ohio River, 1956.', move: 'left' },
  },
  {
    id: 'rocket',
    line: '',
    hold: 3000,
    at: null,
    shot: { archiveId: 'ov-juno-explorer', alt: 'A rocket standing on its pad at night, venting, hours before launch.', move: 'in', fit: 'contain' },
  },
  {
    id: 'fear',
    line: 'But all it did was produce suspicion and fear.',
    hold: 5600,
    at: null,
    shot: { archiveId: 'ov-checkpoint-charlie', alt: 'American and Soviet tanks facing each other across the sector boundary at Checkpoint Charlie, Berlin, October 1961.', move: 'right' },
  },
  {
    id: 'desks',
    line: '',
    hold: 3400,
    at: null,
    shot: { archiveId: 'ov-duck-and-cover', alt: 'Bert the Turtle, the cartoon from the 1951 civil-defence film Duck and Cover, as a monkey dangles a firecracker over him.', move: 'in' },
  },
  {
    id: 'spectre',
    line: 'Now we live under the spectre of destruction,',
    hold: 4600,
    at: null,
    shot: { archiveId: 'excomm-cabinet-room', alt: 'The Executive Committee in session in the Cabinet Room of the White House.', move: 'in' },
  },
  {
    id: 'blink',
    line: 'and men on both sides who believe the other will blink.',
    hold: 6000,
    at: null,
    shot: { archiveId: 'ov-jfk-colonnade', alt: 'President Kennedy on the West Wing Colonnade with Bundy, Nitze, General Taylor and McNamara, 29 October 1962.', move: 'out' },
  },
  {
    id: 'stand',
    line: 'And we are all that stand in their way.',
    hold: 5000,
    at: null,
    shot: { portrait: 'anatoly-dobrynin.jpg', focus: '50% 34%', name: 'Anatoly Dobrynin', move: 'in' },
  },
  {
    id: 'cowards',
    line: 'Some call us cowards.',
    hold: 3400,
    at: null,
    shot: { portrait: 'anatoly-dobrynin.jpg', focus: '50% 34%', name: 'Anatoly Dobrynin', move: 'still' },
  },
  {
    id: 'negotiate',
    line: 'But we negotiate. We compromise, in back rooms.',
    hold: 5200,
    at: null,
    shot: { portrait: 'u-thant.jpg', focus: '50% 24%', name: 'U Thant', move: 'in' },
  },
  {
    id: 'know',
    line: 'Because we know — if we don’t find a way —',
    hold: 4600,
    at: null,
    shot: { portrait: 'u-thant.jpg', focus: '50% 24%', name: 'U Thant', move: 'still' },
  },
  {
    id: 'end',
    line: 'it’ll be the end of all things.',
    hold: 7000,
    at: null,
    shot: { portrait: 'robert-kennedy.jpg', focus: '50% 12%', name: 'Robert Kennedy', move: 'in' },
  },
];

/* Where the narration goes when the user has recorded it. Not an archive
   item — it is the game's own voice, not a document — so it lives beside the
   game rather than in public/archive. */
export const NARRATION_SRC = 'overture/narration.m4a';

/* The audio can only drive the film once every beat knows where it starts. */
export const audioTimed = () => BEATS.every((b) => typeof b.at === 'number');
