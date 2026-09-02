/* The five crisis variables.

   ESCALATION AND CIVILIAN RISK ARE NOT THE SAME AXIS, and the content must not
   let them drift back into being one. Escalation is the temperature between
   the two governments — how close this is to a shooting war. Civilian risk is
   exposure: people on the island, people in the cities, over time.

   They come apart in specific and real ways, and the effect vectors are
   written to that rule. A warning given publicly raises the temperature and
   gives people notice, so escalation rises while exposure falls. Time bought
   at the table lowers the temperature and leaves the sites building and the
   quarantine biting, so escalation falls while exposure rises. Verification
   lowers both, which is why it is the rarest and most valuable move on the
   board.

   This was not true until Milestone 10: the two correlated at r = 0.948 across
   every authored option and there was not one choice where they moved in
   opposite directions. Civilian risk was a second escalation needle wearing a
   different label, which is worse than a needle that does nothing — it implies
   a trade-off the content never actually offered. If a later day is authored,
   check the correlation before shipping it.

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
