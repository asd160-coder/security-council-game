import { TRACKER_KEYS, TRACKER_SCALE } from '../data/trackers.js';

/* Every tracker starts at zero. Day 1 is calibrated so no single choice can
   push a variable anywhere near an extreme — the content pack is explicit that
   the first day should establish direction, not decide the ending. */
export const initialTrackers = () =>
  Object.fromEntries(TRACKER_KEYS.map((key) => [key, 0]));

const clamp = (value) =>
  Math.max(TRACKER_SCALE.min, Math.min(TRACKER_SCALE.max, value));

/* Pure. Given the current values and a choice's effects, return the next
   values. Unknown keys in `effects` are ignored rather than silently creating
   a sixth tracker, so a typo in day content cannot invent a variable. */
export function applyEffects(trackers, effects = {}) {
  const next = { ...trackers };
  for (const key of TRACKER_KEYS) {
    if (typeof effects[key] === 'number') {
      next[key] = clamp(next[key] + effects[key]);
    }
  }
  return next;
}

/* The difference between two tracker sets, keeping only what actually moved.
   Used for the delta annotations and the end-of-day summary. */
export function diffTrackers(before, after) {
  const deltas = {};
  for (const key of TRACKER_KEYS) {
    const change = after[key] - before[key];
    if (change !== 0) deltas[key] = change;
  }
  return deltas;
}

/* Which third of the scale a value sits in.

   Used by day content that varies its scene text with where the crisis stands
   rather than with which line was taken — three variants instead of a tree,
   and it reads as consequence without costing a branch.

   The cut scales with how far into the run the reading is taken, and that is
   a fix rather than a flourish. A flat +/-7 is where escalation lands after
   five days of accumulation; asking for it on Day 3, when only two days have
   moved the needle, is asking for something the game cannot produce. The
   audit found the consequence: entering Day 3 the reachable escalation range
   is -4..+6 for Kennedy, -3..+5 for Dobrynin and -5..0 for U Thant, so every
   seat read `mid` every time and both of Day 3's other briefing openings —
   148 words describing a line that held quietly or a line that nearly did
   not — could never be seen by anybody.

   Scaling the cut to 3 / 5 / 7 makes them reachable without touching a single
   effect vector, which is what keeps the tuning honest: the correlations, the
   ending distribution and the modifier coverage are all where they were.

   U Thant still never reads `high`. His escalation ceiling entering Day 4 is
   -1 and entering Day 5 is +2 — he is the seat that cannot let it run hot,
   and that is the design working, not a gap in it. */
const BAND_CUT = { 1: 3, 2: 3, 3: 3, 4: 5, 5: 7 };

export const band = (value, dayNumber) => {
  const cut = BAND_CUT[dayNumber] ?? 7;
  return value >= cut ? 'high' : value <= -cut ? 'low' : 'mid';
};

/* Position on the needle track, 0 to 1. */
export const trackerPosition = (value) =>
  (value - TRACKER_SCALE.min) / (TRACKER_SCALE.max - TRACKER_SCALE.min);
