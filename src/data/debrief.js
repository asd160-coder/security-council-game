/* The reflective layer.

   This is a reading of what happened, not a verdict on it. Nothing here
   congratulates, and nothing here scolds. Where a run went badly the text says
   what it cost; where it went well the text says what it cost too, because
   every one of these five days was a choice between things worth having.

   The writing is never assessed. It is quoted. */

export const OPENING = {
  eyebrow: 'Debrief',
  title: 'What happened, and what it was made of',
  standfirst:
    'Five days, one document, and a set of decisions that are easier to judge now than they were at the time. This is a reading of your run — not a score, and not a verdict.',
};

/* Why it ended this way, said as facts about the run. */
export const ENDING_CONDITIONS = {
  settled:
    'It settled because the terms on the table were ones both sides could accept and because, at the last, there was enough standing between you for the acceptance to be believed. Neither of those was inevitable.',
  fragile:
    'It settled, and the ground under it is thin. The terms were reached, but the standing that would make them durable had been spent elsewhere, and an agreement resting on assurances that cannot be produced holds only while both sides want it to.',
  contained:
    'Nothing closed. The crisis did not break and it did not end, which leaves the danger postponed at a higher level of readiness than it began — the outcome that is easiest to defend at the time and hardest to defend afterwards.',
  ruptured:
    'The frame broke. Withdrawing the offer removed the last thing holding this inside diplomacy, and by that point there was neither enough calm nor enough trust remaining for anything to catch it.',
};

export const POSTURE_NOTES = {
  hold: 'Your final act was to add nothing. Silence at the end is a position, and it reads as confidence only if what preceded it earned that reading.',
  assure: 'Your final act was a private word with nothing behind it but your own standing. It is the smallest instrument available and it works only for people who spent the week being careful.',
  extend: 'Your final act was to buy time. Time has never made this worse and has rarely, on its own, made anyone agree to anything.',
  withdraw: 'Your final act was to close the offer. It is the only move in the scenario that cannot be taken back.',
};

/* Patterns, not scores. Each names a trade the run actually made. */
export const PATTERNS = {
  'trust-for-leverage': {
    title: 'You gained standing and gave up room to press',
    text: 'Other delegations came to take your word, and you arrived at the last day with little left to push with. That is the mediator’s bargain, and it is only a good one if somebody with leverage is willing to use it on your behalf.',
  },
  'leverage-for-trust': {
    title: 'You held position and spent credibility to hold it',
    text: 'You finished with more room to press than anyone and less benefit of the doubt. Positions won this way tend to hold for exactly as long as the pressure behind them does.',
  },
  'legitimate-but-doubted': {
    title: 'Defensible in public, doubted in the room',
    text: 'What you did stands up to description — and the people across the table stopped assuming your stated position was your real one. Those two can coexist for a surprisingly long time, and they are not the same asset.',
  },
  'effective-but-indefensible': {
    title: 'Effective, and hard to account for',
    text: 'You got results by means that will not survive being written down. That is often how crises are actually resolved, and it is why the accounts written afterwards are so frequently disputed.',
  },
  'cooled-and-protected': {
    title: 'You brought the temperature down and kept it down',
    text: 'Escalation fell and the exposure of people with no part in this fell with it. It is the least visible achievement available in this scenario, because nothing happening is not an event.',
  },
  'held-by-danger': {
    title: 'Your advantage rested on the danger continuing',
    text: 'You finished holding a strong position in a situation that stayed hot. Leverage of that kind is real, and it is borrowed against the possibility that nobody miscalculates.',
  },
  'risk-carried': {
    title: 'The exposure ended higher than it started',
    text: 'Whatever else was achieved, the people who would have borne the consequence were closer to it at the end of the week than the beginning. They were not consulted at any point, which is historically accurate and worth sitting with.',
  },
  'quiet-throughout': {
    title: 'You kept it quiet and stayed small',
    text: 'The crisis never ran hot on your watch and you never accumulated much with which to shape it. Whether that reads as restraint or as absence is the question your own account has to answer.',
  },
};

/* What the office allowed. Tied to the run, not to a biography. */
export const ROLE_REFLECTIONS = {
  rfk: {
    title: 'What it meant to sit in that chair',
    body: [
      'You were never the person who decided, and you were in the room for every decision. That is the particular position the Attorney General held that week: close enough to the President to say the thing nobody else would say, and without the authority to make it stick.',
      'Almost every pressure you met came from your own side. The people arguing for the harder course were not reckless, they were early — their case got stronger every day the sites came closer to operational, and refusing it required deciding again each morning rather than once.',
    ],
    tension:
      'The office gave you leverage and made you responsible for restraint. Those two are not naturally allies, and the run above is a record of how you spent the tension between them.',
  },
  dobrynin: {
    title: 'What it meant to sit in that chair',
    body: [
      'You conducted a negotiation on behalf of a government that did not tell you its position. Every assurance you gave was given in good faith on information you had reason to doubt, and the people you gave it to could see that.',
      'Your instrument was ambiguity, and ambiguity has a short life. It buys room while a situation is still moving and becomes indistinguishable from evasion once positions harden — which is roughly what happened between the chamber and the last morning.',
    ],
    tension:
      'An ambassador’s authority is borrowed. You spent the week deciding how much of it to risk on judgements your own capital had not authorised, and the run above shows what that bought.',
  },
  uthant: {
    title: 'What it meant to sit in that chair',
    body: [
      'You had no army, no veto and no power to compel anyone. What you had was the ability to be believed in two rooms at once, and every decision you made either added to that or spent it.',
      'The office cannot escalate. Across five days there was no move available to you that raised the temperature, which is a real description of the Secretariat and also a real limit — the crisis could break around you, and you could not have broken it.',
    ],
    tension:
      'Your standing was the instrument and the thing at stake. Using it consumed it, and holding it back preserved something that only mattered when it was used.',
  },
};

/* Two to four prompts a teacher can put straight to a class. Open questions,
   not comprehension checks. */
export const DISCUSSION = {
  eyebrow: 'For discussion',
  standfirst:
    'These are open questions. They have defensible answers in more than one direction, which is why they are worth twenty minutes.',
  prompts: [
    {
      q: 'Was the outcome you reached a good one, or only a successful one?',
      note: 'Use the trade your run actually made. A settled crisis bought with spent credibility, or a principled position that achieved nothing, are both available here.',
    },
    {
      q: 'Which of your five decisions would you defend in public, and which only in private?',
      note: 'Diplomacy routinely requires both. The interesting question is whether the two sets can be reconciled afterwards by the person who made them.',
    },
    {
      q: 'Neither Cuba nor Turkey was party to the arrangement made about them. What follows from that?',
      note: 'This was historically true. It is worth asking whether a settlement reached over somebody’s head is a settlement or a postponement.',
    },
    {
      q: 'Would a different role have reached a better outcome from the same starting point?',
      note: 'Compare with someone who played another seat. The facts were identical; what changed was what each office made possible.',
    },
  ],
};

export const SECTIONS = {
  ending: 'Why it ended this way',
  path: 'The five days',
  document: 'How the document grew',
  words: 'Your own words',
  role: 'The office you held',
  trackers: 'What the run traded',
  history: 'What actually happened',
};

/* The label on the per-day comparison. Deliberately flat: "in the event" and
   "actually" both carry a faint suggestion that the record is the correct
   answer, and the whole point of the section is that it is a second data
   point rather than a mark scheme. */
export const HISTORY_NOTE = {
  label: (name) => `What ${name} did`,
  then: 'And then',
  caveat:
    'Folded under each day is what the person in your chair did on the same day; open the ones you want. It is offered for comparison, not as the right answer — several of these decisions were argued over at the time and are still argued over now.',
};

export const NOTES = {
  trackerCaveat:
    'These five measures are tendencies and pressures, not scores. Nothing in them says whether a decision was right — only what it made more likely, and what it cost to make it so.',
  documentCaveat:
    'Selected text was chosen from options. Revised text was rewritten on a later day. The closing is entirely your own.',
  writingCaveat:
    'This is not assessed and has not been marked. It is here because it is the part of the document nobody else could have written.',
  teacherBridge:
    'A complete run takes twenty to twenty-five minutes, and this page is the artefact it produces. The statement above can be read aloud, compared between students who held different offices, or marked against whatever criteria the class is already using for source-based writing.',
};
