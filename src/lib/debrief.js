import { DAYS, getDay } from '../data/days/index.js';
import { councilFor, reckoningFor } from '../data/council.js';
import { resolveOutcome } from './outcome.js';
import { TRACKER_KEYS } from '../data/trackers.js';

/* Turning a finished run into something readable.

   Everything here is derived. The debrief stores nothing of its own — it reads
   the choices, the draft, the closing and the per-day history that playing
   already produced, and resolves them back into the words the player actually
   saw. That matters: a debrief that paraphrases what you did is a report about
   you, and a debrief that quotes it is a record of you. */

/* The decisive choice of a day is the last effect-bearing conversation in it.
   Day 2 has two — the chamber and the channel — and it is the private one that
   set up the next morning, so "last" is the right rule rather than "first". */
function decisiveStep(day) {
  const talking = day.steps.filter((s) => s.kind === 'dialogue' || s.kind === 'exchange');
  return talking[talking.length - 1] ?? null;
}

/* ...but "decisive" was silently doing the work of "only". Day 2's chamber
   session is an effect-bearing choice made on the record in front of the
   world, and the debrief never mentioned it — one of the nine decisions in a
   run simply vanished from the account of that run. This returns the earlier
   conversation of a day when there is one, so the public position can be read
   beside the private one, which on Day 2 is the entire point of the day. */
function earlierStep(day) {
  const talking = day.steps.filter((s) => s.kind === 'dialogue' || s.kind === 'exchange');
  return talking.length > 1 ? talking[0] : null;
}

/* Resolve a stored choice id back to the line the player was shown. Shared
   follow-ups keep their text per role, so the role has to come with it. */
function findChoice(step, roleId, choiceId) {
  if (!step || !choiceId) return null;
  const shared = step.sharedFollow?.find((o) => o.id === choiceId);
  if (shared) {
    return { id: shared.id, label: shared.label, line: shared.lineByRole[roleId], feedback: shared.feedback };
  }
  const pool =
    step.kind === 'exchange'
      ? (step.openingsByRole?.[roleId] ?? []).flatMap((o) => o.follow ?? [])
      : (step.choicesByRole?.[roleId] ?? []);
  return pool.find((c) => c.id === choiceId) ?? null;
}

/* The course you agreed to take into the room, on a day that had a council.
   Not the decisive choice — the negotiation is that — but the thing the
   decisive choice can be read against, which is the whole point of having
   been advised. */
function mandateFor(state, day, roleId) {
  const council = day.steps.find((s) => s.kind === 'council');
  if (!council) return null;
  const stored = state.choices[`${day.id}:${council.id}`];
  if (!stored?.mandate) return null;
  const adviser = councilFor(roleId)?.advisers.find((a) => a.id === stored.id);
  return adviser ? { mandate: stored.mandate, title: adviser.title } : null;
}

const consequenceFor = (day, stepId, feedback) =>
  day.steps.find((s) => s.kind === 'consequence' && s.after === stepId)?.variants?.[feedback]?.text ?? null;

/* The run as five readable beats. */
export function readPath(state, roleId) {
  return DAYS.map((day) => {
    const step = decisiveStep(day);
    const stored = step ? state.choices[`${day.id}:${step.id}`] : null;
    const choice = findChoice(step, roleId, stored?.id);
    /* What the day did to the document, which is not always "added a
       fragment": Day 3 rewrites Day 2's clause rather than writing its own,
       and Day 5 writes the closing, which is not a draft entry at all. */
    const mandate = mandateFor(state, day, roleId);
    const earlier = earlierStep(day);
    const earlierStored = earlier ? state.choices[`${day.id}:${earlier.id}`] : null;
    const earlierChoice = findChoice(earlier, roleId, earlierStored?.id);
    const added = state.draft.find((d) => d.dayNumber === day.number);
    const revisedHere = state.draft.find((d) => d.revisedOnDay === day.number);
    const heldHere = state.draft.find((d) => d.heldOnDay === day.number);
    const wroteClosing = Boolean(state.closing) && day.steps.some((s) => s.kind === 'writing');
    /* What reached the desk and cost something before anything was said. */
    const witness = day.steps.find((s) => s.kind === 'witness' && s.bearsByRole?.[roleId]);
    const bore = witness
      ? {
          title:
            witness.byRole?.[roleId]?.title ?? witness.cardsByRole?.[roleId]?.[0]?.title ?? null,
          effects: witness.bearsByRole[roleId],
        }
      : null;
    /* What you said back to the adviser you overruled, on the day that had
       one. Resolved through the same function the step used, so the debrief
       quotes the reply the player actually read. */
    const reckoning = day.steps.find((s) => s.kind === 'reckoning');
    const answerStored = reckoning ? state.choices[`${day.id}:${reckoning.id}`] : null;
    const spoken =
      answerStored && mandate ? reckoningFor(roleId, mandate.mandate, stored?.feedback) : null;
    const found = spoken?.answers?.find((a) => a.id === answerStored.id) ?? null;
    const answer = found
      ? { adviser: spoken.adviser.title, label: found.label, line: found.line, close: found.close }
      : null;
    return {
      day: day.number,
      title: day.title,
      dateline: day.dateline,
      scene: step?.eyebrow ?? null,
      /* Day 2 only: the position taken in the chamber, before the one taken in
         private. Null everywhere else. */
      alsoScene: earlier?.eyebrow ?? null,
      alsoLabel: earlierChoice?.label ?? null,
      alsoLine: earlierChoice?.line ?? null,
      /* Only Day 4 has a council, so this is null on every other day and the
         screen simply does not render the line. */
      mandate: mandate?.title ?? null,
      label: choice?.label ?? null,
      line: choice?.line ?? null,
      consequence: stored ? consequenceFor(day, step.id, stored.feedback) : null,
      bore,
      answer,
      /* The composing day is named by what it originally chose; the revising
         day by what it changed the clause to. */
      draftLabel: revisedHere ? revisedHere.label : (added?.originalLabel ?? added?.label ?? null),
      draftAction: wroteClosing
        ? 'wrote'
        : revisedHere
          ? 'revised'
          : heldHere
            ? 'held'
            : added
              ? 'added'
              : null,
      movement: state.history.find((h) => h.day === day.number)?.deltas ?? {},
    };
  });
}

/* Patterns rather than numbers. The point of a tracker was never its value; it
   was the trade it recorded, and a trade is a relationship between two of
   them. Strength decides which patterns are worth mentioning. */
/* Thresholds set against measured distributions, not the nominal scale — half
   of all Kennedy and Dobrynin runs used to match no pattern at all, so the
   debrief named no trade in the very section built to name one. */
const PATTERN_RULES = [
  { id: 'trust-for-leverage', test: (t) => t.councilTrust >= 4 && t.leverage <= 5, strength: (t) => t.councilTrust - t.leverage },
  { id: 'leverage-for-trust', test: (t) => t.leverage >= 6 && t.councilTrust <= 3, strength: (t) => t.leverage - t.councilTrust },
  { id: 'legitimate-but-doubted', test: (t) => t.legitimacy >= 6 && t.councilTrust <= 3, strength: (t) => t.legitimacy - t.councilTrust },
  { id: 'effective-but-indefensible', test: (t) => t.leverage >= 6 && t.legitimacy <= 4, strength: (t) => t.leverage - t.legitimacy },
  { id: 'cooled-and-protected', test: (t) => t.escalation <= -4 && t.civilianRisk <= -4, strength: (t) => -(t.escalation + t.civilianRisk) },
  { id: 'held-by-danger', test: (t) => t.escalation >= 2 && t.leverage >= 6, strength: (t) => t.escalation + t.leverage },
  { id: 'risk-carried', test: (t) => t.civilianRisk >= 1, strength: (t) => t.civilianRisk * 2 },
  { id: 'quiet-throughout', test: (t) => t.escalation <= -6 && t.leverage <= 4, strength: (t) => -t.escalation },
];

export function readPatterns(trackers, limit = 2) {
  return PATTERN_RULES.filter((r) => r.test(trackers))
    .sort((a, b) => b.strength(trackers) - a.strength(trackers))
    .slice(0, limit)
    .map((r) => r.id);
}

/* Which trackers actually travelled, largest first. Used to say what the five
   days did rather than where they finished. */
export function readMovement(state) {
  return TRACKER_KEYS.map((key) => ({
    key,
    total: state.trackers[key],
    travelled: state.history.reduce((sum, h) => sum + Math.abs(h.deltas[key] ?? 0), 0),
  }))
    .filter((m) => m.travelled > 0)
    .sort((a, b) => Math.abs(b.total) - Math.abs(a.total));
}

/* The conditions that produced the ending, as facts about this run rather than
   a restatement of the rule. */
export function readEndingConditions(state, roleId) {
  const { resolution, posture, modifiers } = resolveOutcome({
    trackers: state.trackers,
    choices: state.choices,
    roleId,
  });
  const day5 = getDay(5);
  const finalStep = decisiveStep(day5);
  const finalChoice = findChoice(finalStep, roleId, state.choices[`${day5.id}:${finalStep.id}`]?.id);
  return {
    resolution,
    posture,
    modifiers,
    finalLabel: finalChoice?.label ?? null,
    escalation: state.trackers.escalation,
    councilTrust: state.trackers.councilTrust,
    legitimacy: state.trackers.legitimacy,
  };
}

/* The document, tagged so the debrief can show what was inherited, what was
   rewritten, and what the player wrote themselves. */
export function readDocument(state) {
  const parts = state.draft.map((entry) => ({
    day: entry.dayNumber,
    /* A clause is named by what it was chosen as, unless a later day actually
       rewrote it — a day that left it alone does not get to rename it. */
    label: entry.revised ? entry.label : (entry.originalLabel ?? entry.label),
    originalLabel: entry.originalLabel ?? null,
    text: entry.fragment,
    revised: Boolean(entry.revised),
    revisedOnDay: entry.revisedOnDay ?? null,
    original: entry.revised ? entry.original : null,
    /* What the clause argued from, where it argued from anything. */
    citation: entry.citation ?? null,
    kind: entry.revised ? 'revised' : 'selected',
  }));
  if (state.closing) {
    parts.push({
      day: 5,
      label: null,
      text: state.closing,
      revised: false,
      revisedOnDay: null,
      original: null,
      kind: 'written',
    });
  }
  return parts;
}
