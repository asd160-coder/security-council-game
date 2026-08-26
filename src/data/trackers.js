/* The five crisis variables.

   These are not scores. The brief is firm that they should read as measured
   crisis indicators rather than arcade bars, so each carries a `meaning` line
   describing what movement represents — not whether it is good. Rising
   escalation is dangerous; rising leverage is not automatically desirable.
   Deciding which trade was worth making is the student's job, not the
   interface's.

   `register` maps a tracker to the palette's meaning system:
     danger      → wax red, rationed to escalation and civilian risk
     legitimacy  → brass, the institutional register
     neutral     → signal blue, movement without judgement */

/* The scale has to hold five days of accumulation, not one.

   It was ±8 when a day contained a single choice and Day 1 could move a
   tracker by at most 2. Day 2 has three effect-bearing decisions — the
   chamber, the channel, and the strength of the clause — so a consistent
   player can move one variable by 6 in a day. At ±8 that pins a needle by
   Day 3 and the instrument stops reporting anything for the rest of the run.
   ±14 leaves Day 1 reading as small direction-setting, Day 2 as a marked
   shift, and the ends of the scale reachable but not cheap. */
export const TRACKER_SCALE = { min: -14, max: 14 };

export const TRACKERS = [
  {
    key: 'escalation',
    label: 'Escalation',
    register: 'danger',
    meaning: 'How close the crisis stands to military confrontation.',
  },
  {
    key: 'legitimacy',
    label: 'Legitimacy',
    register: 'legitimacy',
    meaning: 'How defensible your position appears to the wider international community.',
  },
  {
    key: 'councilTrust',
    label: 'Council trust',
    register: 'legitimacy',
    meaning: 'How far other delegations believe your stated position is your real one.',
  },
  {
    key: 'leverage',
    label: 'Diplomatic leverage',
    register: 'neutral',
    meaning: 'How much room you hold to press for terms without conceding first.',
  },
  {
    key: 'civilianRisk',
    label: 'Civilian risk',
    register: 'danger',
    meaning: 'The exposure of populations to the consequences of a failure of diplomacy.',
  },
];

export const TRACKER_KEYS = TRACKERS.map((tracker) => tracker.key);

export const getTracker = (key) => TRACKERS.find((tracker) => tracker.key === key) ?? null;
