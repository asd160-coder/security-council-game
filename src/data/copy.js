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
  credits: 'Sources and credits',
  creditsTitle: 'Sources and credits',
  creditsBody:
    'Archival photographs and audio in this simulation are works of the United States federal government and are in the public domain. Each item carries its source where it appears.',
  creditsNote:
    'Dialogue lines are authored for the simulation. They are written in the register of the historical figures and are not quotations.',
  creditsPortraits:
    'Portraits are generated painted illustrations, not photographs. They are interpretations of their subjects and are marked as such wherever they appear.',
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
  map: 'Situation map',
  mapHint: 'Inspect the map',
  mapInspected: 'Geography noted',
  /* The overlay. Opening the map at full size IS inspecting it — one action
     rather than a button that unlocks and a separate control that enlarges. */
  mapExpand: 'Open at full size',
  mapOverlayTitle: 'Strike range from San Cristóbal',
  mapOverlayDay: (n) => `Situation map · Day ${n}`,
  mapScale: 'Coastlines schematic · ranges to scale',
  archiveExpand: 'Examine at full size',
  archive: 'Archive',
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

export const STUB = {
  eyebrow: 'End of the vertical slice',
  title: 'Day 2 is not built yet',
  body: [
    'You have reached the end of what exists. Day 1 is complete: the crisis was introduced, you took a position, the indicators moved, material was filed, and the first fragment of your statement was written.',
    'Days 2 to 5 and the debrief are specified in the design packet and not yet implemented. The structure they will use is the one you have just played.',
  ],
  restart: 'Play again as a different role',
};
