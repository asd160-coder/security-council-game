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
   and it reads as consequence without costing a branch. */
export const band = (value) => (value >= 5 ? 'high' : value <= -5 ? 'low' : 'mid');

/* Position on the needle track, 0 to 1. */
export const trackerPosition = (value) =>
  (value - TRACKER_SCALE.min) / (TRACKER_SCALE.max - TRACKER_SCALE.min);
