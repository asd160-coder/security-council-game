/* The endings.

   Four resolutions, twelve role closers, seven modifiers. Every run composes a
   different ending out of them; none is bespoke to a path.

   The rule the writing holds to: the resolution says whether the crisis ended,
   and the modifiers say what it cost. Those are different questions, and the
   whole point of the modifier layer is that they can disagree. A settled
   crisis bought with spent trust is not the same object as a settled crisis
   that left everyone's word intact, and the text should not pretend otherwise.

   The ruptured ending stops at the point where diplomacy stops. What followed
   is not depicted — not from squeamishness, but because nobody knows, and
   because a sober treatment of consequence is its own piece of work rather
   than a paragraph borrowed at the end of this one. */

export const RESOLUTION_ENDINGS = {
  settled: {
    wire: 'Radio Moscow · 17:00 Moscow time · 28 October',
    label: 'Settled',
    standfirst: 'The terms were accepted.',
    body: [
      'The answer came in the morning, by radio broadcast rather than by letter — and the broadcast was itself the concession: a government that means to keep an agreement says so where it cannot later deny having said it. The weapons would be dismantled under observation and shipped home. In exchange, a promise not to invade the island.',
      'Written down afterwards, it looks like an obvious bargain. It was available on the first day and nobody could reach it, because reaching it required each side to believe the other would rather settle than win. That belief is what was actually being built all week.',
    ],
  },

  fragile: {
    wire: 'Radio Moscow · 17:00 Moscow time · 28 October',
    label: 'Settled, on thin ground',
    standfirst: 'The terms were accepted, and the agreement is weaker than it looks.',
    body: [
      'The answer came, and it was yes. The weapons will come out. But the promise rests on assurances given in rooms with no record, by people who may not be in office to honour them, and each government has described the deal to its own public in words the other would dispute.',
      'Agreements like this hold for as long as neither side needs them not to. This one has removed the missiles without removing the reason they were sent, and everyone who negotiated it knows the difference.',
    ],
  },

  contained: {
    wire: 'Washington · the line holds · 28 October',
    label: 'Contained',
    standfirst: 'Nothing was settled. Nothing broke.',
    body: [
      'No answer came, or none that closed the question. The quarantine holds. The sites are still there, further along than they were. Both governments have stepped back from the edge of a decision without stepping away from it, and the machinery that brought them here is still running.',
      'This is not failure and it is not a resolution. It is the crisis postponed, with both sides more ready to fight than when it began — which buys time, and spends the thing time was supposed to buy: the chance to settle.',
    ],
  },

  ruptured: {
    wire: 'Flash · 28 October',
    label: 'The frame breaks',
    standfirst: 'It stopped being a negotiation.',
    body: [
      'The quarantine line is no longer the place where this is being decided. What was available this morning — a letter, a channel, an afternoon in which somebody might have said the thing that changed it — is not available tonight.',
      'The people who spent the week trying to keep this inside the reach of diplomacy are no longer the people making the decisions. What follows is not recorded here. It was decided by men acting on incomplete information, at speed, without the ability to consult the capitals they served.',
    ],
  },
};

/* One closing line per resolution per role. What Kennedy is left holding is
   not what Dobrynin is left holding, and the ending should say so. */
export const ROLE_CLOSERS = {
  settled: {
    rfk: 'You will be credited with the restraint, and the credit will be slightly wrong. The decision not to strike was made repeatedly, by a small number of people, against advice, on days when striking would have been easier to defend.',
    dobrynin: 'You conducted a negotiation your government did not brief you for, and you were right about what the other side would do. Nobody in Moscow will record that, and you will not raise it.',
    uthant: 'Neither government will say the United Nations settled this, and neither would have been able to settle it without somewhere to say things they could not say to each other.',
  },
  fragile: {
    rfk: 'You have an agreement and an understanding, and only one of them is written down. The one that is not written down is the one your allies would object to, which is why it is not written down.',
    dobrynin: 'You have delivered terms you are not certain your government will honour, to a government that is not certain either. Both of you proceeded anyway, which is what the week came to.',
    uthant: 'The arrangement holds and it is not yours, and the parts of it you argued for — consent, verification, the smaller states — are the parts most easily dropped when it is convenient.',
  },
  contained: {
    rfk: 'The recommendation on the table has not gone away. It has simply been postponed again, and it will be back in the morning with a better argument than it had today.',
    dobrynin: 'You are still an ambassador without instructions, in a capital that now watches you for signs, representing a government still deciding what it wants.',
    uthant: 'You have kept open a channel that neither side will admit to using. It is worth more than it looks, and much less than what was needed.',
  },
  ruptured: {
    rfk: 'You were in the room for every decision that led here, including the ones you argued against. That distinction will matter to you and to almost nobody else.',
    dobrynin: 'The embassy is being emptied of paper. You have spent the week telling Moscow what Washington would do, and you were believed too late for it to help.',
    uthant: 'The office you hold exists for exactly this, and it was not enough. It is worth being precise about why, rather than concluding that it never could have been.',
  },
};

/* The price. Only genuine extremes speak; a modifier that fires on an ordinary
   run is furniture. */
export const MODIFIERS = {
  'legitimacy-high': {
    label: 'Legitimacy',
    text: 'What you did can be defended in public, in detail, by people who were not there. That is rarer than it sounds, and it is the part of this that will still be standing in thirty years.',
  },
  'legitimacy-low': {
    label: 'Legitimacy',
    text: 'The result may be sound, but the route to it will not bear examination. Governments that reach good outcomes by means they cannot describe tend to be asked about the means long after the outcome has stopped being interesting.',
  },
  'trust-spent': {
    label: 'Council trust',
    text: 'You will not be taken at your word again quickly. Every position you took this week could be defended on the day. Taken together, they taught the other delegations to check rather than assume — which costs nothing now and a great deal in the next crisis.',
  },
  'leverage-high': {
    label: 'Leverage',
    text: 'You finished holding more than you began with. In the terms this was fought in, that is a victory. It is also why the other side will spend the coming years making sure it is never in this position again.',
  },
  'risk-high': {
    label: 'Civilian risk',
    text: 'The people whose lives were at stake were never party to this, were not consulted, and were closer to the consequences at the end of the week than at the beginning. Whatever else was achieved, that cost fell on the people least able to affect it.',
  },
  'risk-protected': {
    label: 'Civilian risk',
    text: 'Through every decision, the danger to people who had no part in this went down rather than up. It is the least visible thing achieved this week, and the one that would have mattered most.',
  },
  'escalation-low': {
    label: 'Escalation',
    text: 'At no point did either side have to act on a guess about the other under time pressure. That is the condition in which this kind of crisis kills people, and it did not arise.',
  },
};

export const getResolution = (key) => RESOLUTION_ENDINGS[key] ?? null;
export const getRoleCloser = (key, roleId) => ROLE_CLOSERS[key]?.[roleId] ?? null;
export const getModifier = (key) => MODIFIERS[key] ?? null;
