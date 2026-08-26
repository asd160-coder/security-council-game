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

   Set from measurement rather than guessed at. Walking all 62,208 complete
   Day 1-3 paths per role showed nothing at the rail on ±14 — but a p90 run,
   the top decile rather than an outlier, finished Day 3 at 10 with only four
   points of headroom, and Day 3 alone can move a tracker by 6. Two more days
   at that rate pins an ordinary strong run during Day 4 with the finale still
   unplayed. At ±20 the same p90 lands near 18 and only maximal play reaches
   the rail on the last day, which is what the end of a scale is for.

   The underlying cause is worth recording: 90% of options are already
   trade-offs, so this is not all-gain design. It is that U Thant's trade-offs
   push the same way in his own terms — lower escalation and higher legitimacy
   are both wins for him — and almost nothing takes legitimacy or council trust
   away. From Day 4 the options are capped at ±2 and several cost those two
   directly. */
export const TRACKER_SCALE = { min: -20, max: 20 };

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
