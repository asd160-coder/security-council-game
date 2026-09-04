/* Presentation data for conversation scenes.

   Nothing here is content. No line, no consequence, no branch — only the
   vocabulary the scene components use to stage what the day files already
   say. Adding a day means adding a mood entry; adding a line means nothing
   here changes at all. */

/* ------------------------------------------------------------- Registers */

/* The corpus carries 23 distinct `feedback` strings, but they are step-scoped:
   only about five are live in any one conversation, several are singletons,
   and the same rhetorical move is called `firm` on Day 1 and `pressure` on
   Day 3. Keying a visual treatment off the raw string would produce 23
   inconsistent buckets.

   So the 23 collapse to five rhetorical registers — how a thing is said, not
   whether it was wise. This is the whole basis of utterance differentiation,
   and it is deliberately NOT a moral scale: nothing in the styling ranks
   these, and no colour varies between them. A student should be able to see
   that two options are different kinds of speech without being told which one
   the interface prefers, because the interface does not prefer one.

   measure — the long view. Space, air, a sentence that is not in a hurry.
   press   — weight applied. Tighter, squarer, more insistent.
   edge    — the closing of an option. Compressed, flush, nothing spare.
   bridge  — something offered both ways. Balanced, held open at both ends.
   probe   — a question that has not decided what it wants yet. */

/* The assignments below are made per step rather than per word, because the
   registers only do their job if the options inside ONE scene look different
   from each other. A map that is tidy in the abstract but hands a single step
   four identical treatments has differentiated nothing. Every conversation
   here spreads across at least three registers; only Day 1 repeats one, and
   that is honest — two of its four openings really are the same kind of
   measured firmness in different words. */
export const REGISTERS = {
  /* press — weight applied, including the weight of refusing to move */
  firm: 'press',
  warning: 'press',
  confront: 'press',
  pressure: 'press',
  selective: 'press',
  hold: 'press',

  /* measure — the long view */
  controlled: 'measure',
  legitimacy: 'measure',
  legalism: 'measure',
  restraint: 'measure',
  delay: 'measure',
  extend: 'measure',

  /* bridge — something offered in both directions */
  diplomatic: 'bridge',
  opening: 'bridge',
  trust: 'bridge',
  settlement: 'bridge',
  trade: 'bridge',
  assure: 'bridge',

  /* edge — an option being closed */
  sovereignty: 'edge',
  ultimatum: 'edge',
  withdraw: 'edge',

  /* probe — a question that has not decided what it wants yet */
  evidence: 'probe',
  ambiguity: 'probe',

  /* The reckoning's three answers: owning a decision is weight applied,
     conceding is an offer both ways, enlisting is the long view. */
  own: 'press',
  concede: 'bridge',
  enlist: 'measure',
};

/* Day 4 and Day 5 openings carry no `feedback` at all — they are probes by
   construction, and all consequence weight sits on the shared follow-ups. An
   unmapped or absent category falls here rather than throwing. */
export const DEFAULT_REGISTER = 'plain';

export const registerFor = (feedback) => REGISTERS[feedback] ?? DEFAULT_REGISTER;

/* ---------------------------------------------------------------- Moods */

/* One entry per day. These do not change what a scene says; they change how
   much room it is given and how the light falls in it, so that five days in
   the same interface do not feel like the same afternoon five times.

   `axis` is the inset of the player's side from the counterpart's, in pixels
   — the width of the table. Day 4 is the widest because it is the day the
   bargain is actually struck and both sides are really present; Day 5 is the
   narrowest because by then there is no one across from you, only a room
   waiting on a cable.

   `light` positions the scene's single raking gradient. */

/* `tint` is the colour temperature of the whole board for the day, laid over
   the ground as one faint gradient from the top: overcast signal on the day of
   discovery, flat daylight for the chamber, sodium brass for the night the
   bargain is struck, stock-rose for the dawn that waits on an answer. */
export const SCENE_MOODS = {
  1: { axis: 56, light: '18% 0%', tone: 0.05, tint: 'rgba(111, 143, 166, 0.1)', note: 'Discovery — evidence on a table' },
  2: { axis: 64, light: '50% 0%', tone: 0.06, tint: 'rgba(195, 201, 208, 0.08)', note: 'The chamber, and the room behind it' },
  3: { axis: 48, light: '78% 0%', tone: 0.08, tint: 'rgba(111, 143, 166, 0.06)', note: 'Enclosed. The clock is in the room' },
  4: { axis: 72, light: '50% 0%', tone: 0.07, tint: 'rgba(168, 133, 60, 0.1)', note: 'Bargaining space — two sides, squared' },
  5: { axis: 40, light: '30% 0%', tone: 0.04, tint: 'rgba(216, 209, 194, 0.09)', note: 'Waiting. Mostly your own company' },
};

export const DEFAULT_MOOD = SCENE_MOODS[1];

export const moodFor = (dayNumber) => SCENE_MOODS[dayNumber] ?? DEFAULT_MOOD;

/* ------------------------------------------------------------- Presence */

/* How the person opposite is shown. The three modes are not a design
   flourish; they are what the cast actually is.

   principal  — a named historical figure who is also a playable seat, so an
                illustrated portrait already exists for them. Two people in
                the whole game qualify.
   individual — an invented aide or official, sanctioned by the brief. No
                likeness exists and none may be invented, so they are given a
                place rather than a face.
   body       — an institution. The Executive Committee is not a person and
                should not be drawn as one; it is a row of chairs.

   Note that U Thant faces `body` every single day. He never once sits across
   from an individual, which is the loneliest fact in the data. */

export const PRESENCE = {
  PRINCIPAL: 'principal',
  INDIVIDUAL: 'individual',
  BODY: 'body',
};

export const DEFAULT_PRESENCE = PRESENCE.INDIVIDUAL;
