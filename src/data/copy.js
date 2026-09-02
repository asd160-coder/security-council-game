/* Every string of interface chrome. Scene and historical content lives in the
   day files; this is only the furniture around it.

   The voice rule: this interface never congratulates and never warns. It
   states what happened and lets the student decide what it was worth. */

export const APP = {
  title: 'October 1962',
  subtitle: 'A Security Council Simulation',
  standfirst:
    'Thirteen days in which the United States and the Soviet Union came closer to nuclear war than at any point before or since. You will take one seat inside it.',
  dateline: 'Cuban Missile Crisis · October 1962',
  begin: 'Begin briefing',
  /* Shown only when this browser holds a run in progress. Naming the day is
     what lets a student tell their own run from one somebody left behind on a
     shared machine. */
  resume: (day) => `Resume — you were on Day ${day}`,
  beginFresh: 'Start a new run',
  credits: 'Sources and credits',
  creditsTitle: 'Sources and credits',
  creditsBody:
    'Archival photographs and audio in this simulation are works of the United States federal government and are in the public domain. Each item carries its source where it appears.',
  creditsNote:
    'Dialogue lines are authored for the simulation. They are written in the register of the historical figures and are not quotations.',
  creditsPortraits:
    'Portraits are generated painted illustrations, not photographs. They are interpretations of their subjects and are marked as such wherever they appear.',
  creditsMap:
    'Coastlines and inland water on the situation map are drawn from Natural Earth, which is in the public domain. They are generalised for display; the range rings are computed from published missile ranges rather than drawn.',
  creditsRooms:
    'The rooms behind the conversations are invented. They are drawn in the interface from simple shapes, not photographed or reconstructed, and no scene depicts a real room, meeting or document.',
  close: 'Close',
};

export const ROLE_SELECT = {
  eyebrow: 'Select your seat',
  title: 'Three chairs at the same crisis',
  standfirst:
    'The facts will be identical in each case. What changes is what you are responsible for, what you are afraid of, and what you are able to offer.',
  perspective: 'Perspective',
  emphasis: 'In play',
  tension: 'Central tension',
  choose: 'Take this seat',
  chosen: 'Selected',
};

export const PLAY = {
  dayLabel: (n) => `Day ${n}`,
  sceneLabel: 'Scene',
  continue: 'Continue',
  trackers: 'Crisis indicators',
  trackersNote: 'Movement shows direction, not success.',
  file: 'Your file',
  fileEmpty: 'Material you unlock will be filed here.',
  fileCount: (n) => `${n} item${n === 1 ? '' : 's'}`,
  draft: 'Draft statement',
  draftEmpty: 'Your statement will be built here, one fragment at a time.',
  draftFragment: (n) => `Fragment ${n}`,
  /* Labels the source a clause was argued from. */
  arguedFrom: 'Argued from',
  map: 'Situation map',
  mapHint: 'Inspect the map',
  mapInspected: 'Geography noted',
  /* The overlay. Opening the map at full size IS inspecting it — one action
     rather than a button that unlocks and a separate control that enlarges. */
  mapExpand: 'Open at full size',
  mapOverlayTitle: 'Strike range from San Cristóbal',
  mapOverlayDay: (n) => `Situation map · Day ${n}`,
  mapScale: 'Coastlines generalised · ranges to scale',
  archiveExpand: 'Examine at full size',
  youSaid: 'You said',
  theyReplied: 'The reply',
  reconsider: 'Take it differently',

  /* Conversation scenes. The establishing card names the room and the two
     people in it before anything is said; `enterScene` is the only way out of
     it, and is deliberately plain — the drama is the room, not the button. */
  scenePlace: 'The room',
  sceneWith: 'Present',
  sceneYou: 'You',
  enterScene: 'Go in',
  /* The accessible name for the first set of options in a dialogue step. The
     exchange steps take theirs from `openingPrompt`/`followPrompt` in the day
     data; a dialogue step has no such field, so the string lives here rather
     than hardcoded in the component. */
  openingPositionLabel: 'Your opening position',
  /* Sits above the player's options, on their side of the table. */
  couldSay: 'What you could say',
  /* The council. `councilPrompt` sits above the three courses; `overruled`
     labels the adviser who comes back afterwards, and is deliberately blunt —
     the point of the beat is that you are answerable to someone. */
  councilPrompt: 'Whose course you carry into the room',
  overruled: 'The advice you did not take',
  stageOne: 'One',
  stageTwo: 'Two',
  standing: 'Where you stand',
  sinceYesterday: 'Since yesterday',
  revised: 'Revised',
  previously: 'Previously — ',
  keepAsWritten: 'Leave the clause as written',
  witnessAdvance: 'Continue',
  slotIndex: (n) => ['One', 'Two', 'Three', 'Four'][n - 1] ?? String(n),
  writingCount: (sentences, words) =>
    `${sentences} sentence${sentences === 1 ? '' : 's'} · ${words} word${words === 1 ? '' : 's'}`,
  archive: 'Archive',
  /* Marks a primary source shown in part rather than whole. */
  excerpted: 'Excerpt — the full document is longer',
  newInFile: 'New in your file',
  soWhat: 'What this changes',
  whyItMatters: 'Why this matters',
  source: 'Source',
  rights: 'Rights',
  awaitingAsset: 'Archival item not yet attached',
  awaitingAssetNote:
    'This slot is declared with its source and rights. The file has not been added to the build.',
  /* Distinct from the above on purpose: an empty slot is expected, a declared
     file that will not load is a mistake, and the two should not look the
     same to whoever is adding assets. */
  missingAsset: 'Archival file could not be loaded',
  missingAssetNote: (file) =>
    `This slot expects "${file}" in public/archive. Check the filename and extension match exactly.`,
  play: 'Play',
  pause: 'Pause',
  skip: 'Skip',
  close: 'Close',
  /* Marks a created likeness. Sits where an archival item carries its source,
     so the difference between the two registers is visible in the same slot. */
  illustration: 'Illustration',
};

export const SUMMARY = {
  eyebrow: 'End of day',
  movement: 'How the crisis moved',
  noMovement: 'No indicator moved today.',
  filed: 'Filed today',
  draftSoFar: 'Your statement so far',
  tomorrow: 'Tomorrow',
};

export const ENDING = {
  eyebrow: 'How it resolved',
  cost: 'What it cost',
  statementTitle: 'Your statement, complete',
  ownWords: 'In conclusion — your own words',
  next: 'The debrief reads this run back to you — why it ended as it did, the five decisions that made it, and how the document came to say what it says.',
  restart: 'Play again as a different role',
};

export const DEBRIEF = {
  day: (n) => `Day ${n}`,
  noChoice: 'No decisive exchange was recorded for this day.',
  draftNote: (action, label) => {
    if (action === 'wrote') return 'Drafting — you wrote the closing';
    if (action === 'revised') return `Drafting — rewrote the clause as ${label}`;
    if (action === 'held') return 'Drafting — left the clause as written';
    return `Drafting — ${label}`;
  },
  mandate: (title) => `You went in having agreed to: ${title.toLowerCase()}`,
  conditionsLabel: 'Where you stood when the question was put',
  finalWas: (label) => `The last thing you did was: ${label.toLowerCase()}.`,
  superseded: 'Superseded',
  revisedOn: (n) => `Revised on Day ${n}`,
  travelled: (n) => `moved ${n}`,
  restart: 'Play again as a different role',
  enter: 'Continue to the debrief',
};

export const STUB = {
  eyebrow: 'End of what is built',
  title: (next) => `Day ${next} is not built yet`,
  body: (built, next) => [
    `You have reached the end of what exists. Days 1 to ${built} are complete: the crisis was introduced and made public, you took positions in the chamber and in private, the indicators moved, material was filed, and your statement has ${built} clauses.`,
    `Days ${next} to 5 and the debrief are specified in the design packet and not yet implemented. The structure they will use is the one you have just played.`,
  ],
  restart: 'Play again as a different role',
};
