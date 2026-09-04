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

   SHOTS. `slate` is the placeholder — a labelled dark frame — until a still
   is sourced, verified and approved, at which point `archiveId` names the
   entry in src/data/archive.js that carries its source and rights, and the
   credits panel lists it with no second list to keep in step. The three
   closing shots are the seats' own portraits, which already exist and are
   already credited as illustrations. */

const PLACEHOLDER = 'Placeholder — shot not yet sourced';

export const BEATS = [
  {
    id: 'berlin',
    line: 'The war had ended.',
    hold: 5200,
    at: null,
    shot: {
      slate: 'Berlin, summer 1945',
      alt: 'Berlin in the summer of 1945: Soviet armour in the eastern sectors, and American troops arriving for the occupation.',
      move: 'in',
      source: `${PLACEHOLDER} · US Army Signal Corps, NARA`,
    },
  },
  {
    id: 'price',
    line: 'It had ended at a terrible price.',
    hold: 6400,
    at: null,
    shot: {
      slate: 'Nagasaki, 9 August 1945',
      alt: 'The cloud over Nagasaki, photographed from the air; then the shadow of a person burned onto the steps of a bank in Hiroshima.',
      move: 'out',
      source: `${PLACEHOLDER} · Charles Levy, USAAF; US Strategic Bombing Survey`,
    },
  },
  {
    id: 'warfare',
    line: 'It ushered in a new age of warfare.',
    hold: 5000,
    at: null,
    shot: {
      slate: 'Operation Crossroads, 1946 · Ivy Mike, 1952',
      alt: 'A nuclear test at sea: the column of water rising over the fleet at Bikini Atoll.',
      move: 'in',
      source: `${PLACEHOLDER} · US Navy; Atomic Energy Commission`,
    },
  },
  {
    id: 'wonders',
    line: 'The nuclear age was supposed to unlock wonders.',
    hold: 5200,
    at: null,
    shot: {
      slate: 'The atomic future, 1950s',
      alt: 'A reactor hall under construction, and a rocket standing on its pad.',
      move: 'left',
      source: `${PLACEHOLDER} · Atomic Energy Commission; NASA`,
    },
  },
  {
    id: 'fear',
    line: 'But all it did was produce suspicion and fear.',
    hold: 5600,
    at: null,
    shot: {
      slate: 'Berlin, October 1961',
      alt: 'The Wall going up; American and Soviet tanks facing each other at Checkpoint Charlie.',
      move: 'right',
      source: `${PLACEHOLDER} · US Army; US Information Agency`,
    },
  },
  {
    id: 'desks',
    line: '',
    hold: 3600,
    at: null,
    shot: {
      slate: 'Duck and Cover, 1951',
      alt: 'Schoolchildren crouched beneath their desks during a civil-defence drill.',
      move: 'in',
      source: `${PLACEHOLDER} · Federal Civil Defense Administration`,
    },
  },
  {
    id: 'spectre',
    line: 'Now we live under the spectre of destruction,',
    hold: 4600,
    at: null,
    shot: {
      archiveId: 'excomm-cabinet-room',
      alt: 'The Executive Committee in session in the Cabinet Room of the White House.',
      move: 'in',
    },
  },
  {
    id: 'blink',
    line: 'and men on both sides who believe the other will blink.',
    hold: 6000,
    at: null,
    shot: {
      slate: 'Kennedy with the Joint Chiefs · Khrushchev',
      alt: 'President Kennedy seated with the Joint Chiefs of Staff; Chairman Khrushchev at the United Nations.',
      move: 'out',
      source: `${PLACEHOLDER} · Cecil Stoughton, White House; US News & World Report, Library of Congress`,
    },
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
