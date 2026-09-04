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
  /* The provenance line under the title. It changed in Milestone 13: the
     dialogue is now set in quotation marks, so "is not quoted" — true of
     history, false of the punctuation — had to stop being the wording a
     player reads first. */
  footNote:
    'An educational simulation. Artwork is illustrated, not photographic. The dialogue in its scenes is written for this simulation and is not quotation. Where a real person is actually quoted — between the days, and in the background — the quotation is attributed and sourced where it appears.',
  /* Shown only when this browser holds a run in progress. Naming the day is
     what lets a student tell their own run from one somebody left behind on a
     shared machine. */
  resume: (day) => `Resume — you were on Day ${day}`,
  beginFresh: 'Start a new run',
  credits: 'Sources and credits',
  background: 'Background and the people in it',
  teachers: 'For teachers',
  creditsTitle: 'Sources and credits',
  creditsBody:
    'Archival photographs and audio in this simulation are in the public domain, on one of two bases: most are works of the United States federal government, and the photographs of Khrushchev and Castro come from the U.S. News & World Report collection, whose rights the magazine dedicated to the public when it gave the collection to the Library of Congress. Each item carries its source where it appears.',
  creditsNote:
    'Dialogue lines are authored for the simulation and written in the register of the historical figures. Speech shown in quotation marks is invented; no line in this game is a historical quotation.',
  creditsPortraits:
    'Portraits are generated painted illustrations, not photographs. Where the subject is a historical figure the portrait is an interpretation of them; where the subject is one of the simulation’s invented aides it is a likeness of nobody at all. Both are marked as illustrations wherever they appear.',
  creditsMap:
    'Coastlines and inland water on the situation map are drawn from Natural Earth, which is in the public domain. They are generalised for display; the range rings are computed from published missile ranges rather than drawn.',
  creditsQuotations:
    'The quotations shown between the days are real, and are attributed and dated where they appear. Two are works of the United States federal government and are in the public domain; the rest are quoted briefly, with attribution, for teaching and commentary. Each card also states how the words reached us, because several are recollections made long afterwards, and one is a translation that overstated the speaker.',
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

export const BACKGROUND = {
  eyebrow: 'Before the thirteen days',
  title: 'How it got here, and who was deciding',
  standfirst:
    'The simulation begins on the morning the photographs are read. This is what had already happened by then, and what the six people in it were each trying to protect. None of it is needed to play; all of it is what the play is about.',
  roadLabel: 'The road, 1961–62',
  roadNote:
    'Six things that had already happened. What matters is less the events than the assumption each one left behind, because the assumptions are what everybody is acting on in October.',
  whatItLeft: 'What it left',
  /* The four questions, asked of everyone. Same shape as `privateBrief` in
     src/data/roles.js, which is where three of the six answers come from. */
  briefFields: [
    ['objective', 'What they want'],
    ['pressure', 'What is pushing them'],
    ['advantage', 'What they hold'],
    ['fear', 'What they are afraid of'],
  ],
  noPortrait: 'Illustration not yet made',
  back: 'Back to the title',
};

export const EPIGRAPH = {
  label: 'A voice from the record',
  howItReachedUs: 'How this reached us',
  continue: 'Continue',
  /* The background tab's pair, which sit above the road rather than between
     days: both predate it, and both are voices the archive cannot carry. */
  backgroundLabel: 'Two sentences from before the road',
  backgroundNote:
    'Neither of these men appears in the archive in his own words, for the reasons set out at the foot of this page. They are quoted here instead, with the same care about how each one reached us.',
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
  /* The line at sea. */
  mapQuarantine: 'Quarantine line',
  mapQuarantineNote: '500 nautical miles from Cape Maisí',
  mapPositions: 'Ship positions indicative',
  /* Day 4: the price in the second letter lies outside this frame. */
  mapTurkey: 'The second letter’s price — the Jupiter missiles at İzmir, Turkey — lies 5,900 miles east of this frame. The small map shows it on the wide view.',
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
  /* The date card between days. */
  dayCardHint: 'Continue',
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
  /* Under a card that bears a cost: the board reading what the paper did. */
  whatItCost: 'What it cost',
  /* The reckoning's answer beat. */
  reckoningPrompt: 'What you say to them',
  slotIndex: (n) => ['One', 'Two', 'Three', 'Four'][n - 1] ?? String(n),
  writingCount: (sentences, words) =>
    `${sentences} sentence${sentences === 1 ? '' : 's'} · ${words} word${words === 1 ? '' : 's'}`,
  archive: 'Archive',
  /* The archive rail: every primary source shown so far, still open. */
  archiveCount: (n) => `${n} item${n === 1 ? '' : 's'}`,
  archiveUnread: 'Unread',
  archiveKind: { image: 'Photo', audio: 'Audio', video: 'Film', document: 'Text' },
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
  print: 'Print the statement',
  delivered: 'As delivered · 28 October 1962',
  restart: 'Play again as a different role',
};

export const DEBRIEF = {
  day: (n) => `Day ${n}`,
  noChoice: 'No decisive exchange was recorded for this day.',
  /* The teacher's copy. "Save as PDF" rather than "Print" because saving is
     what a student is actually being asked to do, and every current print
     dialog offers it. */
  savePdf: 'Save as PDF',
  teacherCopyTitle: 'October 1962 — record of a run',
  teacherCopyTrade: 'What the run traded',
  teacherCopyClosing: 'Closing paragraph, written by the student',
  teacherCopyFoot:
    'Produced by the student from their own browser. The five days are quoted as they were chosen; the closing paragraph is the student’s own writing and has not been assessed.',
  draftNote: (action, label) => {
    if (action === 'wrote') return 'Drafting — you wrote the closing';
    if (action === 'revised') return `Drafting — rewrote the clause as ${label}`;
    if (action === 'held') return 'Drafting — left the clause as written';
    return `Drafting — ${label}`;
  },
  mandate: (title) => `You went in having agreed to: ${title.toLowerCase()}`,
  /* What reached the desk and cost something before anything was said. */
  bore: (title) => `Reached your desk: ${title.toLowerCase()}`,
  /* The reckoning's answer, read back against the person it was said to. */
  answered: 'What you said afterwards, to the adviser you overruled',
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
