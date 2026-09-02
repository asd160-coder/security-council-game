/* How a run resolves.

   Pure, and deliberately readable: a teacher should be able to look at this
   and say what produced an ending, and a student should be able to be told.

   Two layers. RESOLUTION answers whether the crisis ended, and is weighted to
   the final decision — the climax should be the climax — with standing
   deciding which way a borderline call falls. MODIFIERS answer at what price,
   and are what keep "successful" and "right" from collapsing into each other:
   a settled crisis bought with spent trust and overwhelming leverage is a win
   by one measure and something else by another, and that combination is
   reachable on purpose. */

export const RESOLUTIONS = ['settled', 'fragile', 'contained', 'ruptured'];

/* The posture of the final decision, read off the Day 5 choice. */
export const POSTURES = ['hold', 'assure', 'extend', 'withdraw'];

export function resolveOutcome({ trackers, choices, roleId, dayId = 'day5', stepId = 'final' }) {
  const final = choices?.[`${dayId}:${stepId}`] ?? null;
  const posture = final?.posture ?? final?.feedback ?? null;
  const { escalation, legitimacy, councilTrust, leverage, civilianRisk } = trackers;

  const resolution = resolveCategory(posture, trackers);

  /* Only genuine extremes speak. A modifier that fires on an ordinary run is
     not a modifier, it is furniture.

     But the first version of these thresholds was set against the ±20 scale
     rather than against where runs actually land, and the result was the
     opposite failure: two thirds of Kennedy and Dobrynin runs finished with
     NO modifier at all, so the layer this file calls the point was silent for
     most players. Measured over all 311,040 runs per role, the values below
     now sit around the tenth and ninetieth percentile of what is actually
     reachable — extreme enough to mean something, common enough to be read.
     `legitimacy-low` was worse than rare: unreachable for U Thant and 252
     paths in 311,040 for Kennedy. */
  const modifiers = [];
  if (legitimacy >= 9) modifiers.push('legitimacy-high');
  if (legitimacy <= 1) modifiers.push('legitimacy-low');
  if (councilTrust <= 0) modifiers.push('trust-spent');
  if (leverage >= 9) modifiers.push('leverage-high');
  if (civilianRisk >= 1) modifiers.push('risk-high');
  if (civilianRisk <= -8) modifiers.push('risk-protected');
  if (escalation <= -7 && resolution !== 'ruptured') modifiers.push('escalation-low');

  return { resolution, posture, modifiers };
}

/* A settlement reached with people left more exposed than they started is not
   a clean settlement, whatever the two governments signed. It is the thing
   `fragile` was for: an agreement resting on something that will not bear
   weight.

   This is the only place civilian risk touches the outcome, and it was added
   in Milestone 10 because until then it touched nothing at all — the one
   tracker that could not influence which of the four endings you got, in a
   game about the cost of brinkmanship. It demotes rather than decides, which
   is the right size for it: exposure does not settle a crisis or break it, it
   determines what the settlement cost. */
function tempered(resolution, civilianRisk) {
  return resolution === 'settled' && civilianRisk >= 3 ? 'fragile' : resolution;
}

function resolveCategory(posture, { escalation, councilTrust, legitimacy, civilianRisk }) {
  /* Withdrawing the offer is the only move that can break the frame outright.
     Whether it does depends on what is left to catch it: either the crisis is
     already hot enough that nothing will, or standing has been spent so far
     that nobody's word can.

     The second condition is not decoration. The Secretary-General has no
     escalatory instrument at all — across every path his escalation never
     exceeds +1 — so without it his own choices could never break the frame,
     only be present while it broke. What he can spend is his standing, and a
     mediator who declares failure publicly with none left has removed the last
     thing holding this inside diplomacy. The same is true of the other two:
     withdrawing when nobody believes you is not a threat, it is a starting
     gun. */
  if (posture === 'withdraw') {
    return escalation >= 4 || councilTrust <= -2 ? 'ruptured' : 'contained';
  }

  /* Above a certain heat nothing settles, however well the last move is
     played. Standing cannot rescue a crisis that has already outrun it. */
  if (escalation >= 9) return 'contained';

  if (posture === 'assure') {
    /* A private assurance closes the gap only if the other side has reason to
       believe you. That is what council trust has been measuring. */
    return councilTrust >= 4 ? tempered('settled', civilianRisk) : 'fragile';
  }

  if (posture === 'hold') {
    /* Holding works when the terms were already acceptable and the temperature
       is low enough for silence to read as confidence rather than refusal. */
    if (escalation <= 0 && councilTrust >= 2) return tempered('settled', civilianRisk);
    return escalation <= 4 ? 'fragile' : 'contained';
  }

  if (posture === 'extend') {
    /* More time is rarely wasted and rarely decisive. It settles only where
       the standing was already strong enough to settle without it. */
    if (councilTrust >= 6 && legitimacy >= 6) return tempered('settled', civilianRisk);
    return escalation <= 5 ? 'fragile' : 'contained';
  }

  return 'fragile';
}
