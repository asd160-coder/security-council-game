/* The cabinet, and what it costs to overrule it.

   Day 4 is the day the bargain is actually struck, and until now the player
   walked into that negotiation carrying nothing but their own standing. This
   puts a room behind them first: three advisers, three incompatible courses,
   and one of them is what you carry through the door.

   The shape is deliberately NOT a branch. You hear all three and take one
   mandate; the mandate is recorded and read afterwards, it does not fork the
   day. Nine adviser cards and nine reckonings is the whole authored cost, and
   the negotiation downstream is untouched.

   Two of the three advisers per role argue from a real cable — Ankara and
   Havana, the parties whose consent the settlement needs and who were not
   asked. Those cables used to be a `witness` step of their own on this day.
   They are better here, being used by someone who wants something from you,
   than sitting on a desk with nobody attached to them. */

export const COUNCIL = {
  rfk: {
    room: 'The Executive Committee',
    setting:
      'Reconvened in the Cabinet Room. The recommendation to strike has been on the table since the aircraft was lost, and the room has stopped pretending it is one of several options.',
    advisers: [
      {
        id: 'rfk-strike',
        mandate: 'force',
        feedback: 'pressure',
        source: 'The Joint Chiefs, through the Chairman',
        title: 'Strike the sites while they are still incomplete',
        body: [
          'The military case has not changed and he does not pretend it has: every day of talking is a day of construction, and the estimate of when the sites go live has been revised toward the shorter end twice this week.',
          'He is not asking for an invasion. He is asking for the surface-to-air sites that brought down the aircraft this morning, and he says that if the answer is no it should be no for a reason the room can write down.',
        ],
        weigh:
          'A strike ends the argument about what the weapons might do by starting the argument about what we have done.',
      },
      {
        id: 'rfk-trade',
        mandate: 'trade',
        feedback: 'trade',
        source: 'Cable from the embassy in Ankara',
        title: 'Trade the Turkish missiles and say nothing about it',
        body: [
          'Ankara has read the second letter and understands exactly what is being proposed over its head. The cable is polite and it is not a question: an alliance guarantee is worth what its smallest member believes it is worth.',
          'The course he presses is the trade anyway — but privately, unwritten, and deniable, because a public swap costs more in Ankara than the missiles are worth in Cuba.',
        ],
        weigh:
          'A concession nobody can point to is cheaper than one that has to be defended. It is also one the other side can deny receiving.',
      },
      {
        id: 'rfk-hold',
        mandate: 'hold',
        feedback: 'delay',
        source: 'The Secretary of State',
        title: 'Answer the letter you would rather have received',
        body: [
          'Two letters arrived from Moscow saying different things and nobody in the room knows which one is the government talking. He proposes the obvious manoeuvre and does not dress it up: answer the first one, restate its terms as though they were the only terms, and let the second go unmentioned.',
          'It is not a trick that survives scrutiny. It only has to survive until tomorrow.',
        ],
        weigh:
          'Choosing which letter to hear is a way of choosing which government you are negotiating with.',
      },
    ],
  },

  dobrynin: {
    room: 'The embassy, and Moscow’s silence',
    setting:
      'Three people who report to different places, in a room where the cables come in and no instructions go out. You have asked twice what the second letter was for and been told nothing.',
    advisers: [
      {
        id: 'dob-first',
        mandate: 'trade',
        feedback: 'selective',
        source: 'The counsellor',
        title: 'Treat the first letter as the real one',
        body: [
          'His reading is that the second letter was written by the apparatus and the first by the Chairman, and that the American reply will answer whichever one it prefers regardless of what the embassy says.',
          'His course is to get ahead of that: confirm the first letter privately, before Washington chooses for you, so the concession reads as offered rather than extracted.',
        ],
        weigh:
          'An ambassador who confirms a position he has not been given has either read his government correctly or ended his career.',
      },
      {
        id: 'dob-second',
        mandate: 'force',
        feedback: 'ultimatum',
        source: 'The military attaché',
        title: 'Hold to the second letter and let them refuse it',
        body: [
          'He does not report to you and has not pretended otherwise all week. His position is that the Turkish missiles are the entire point, that a withdrawal without them is a defeat that will be read as one in Moscow, and that the Americans will pay if the price is held.',
          'He intends to send this whether or not you agree, and he has come to tell you so rather than to ask.',
        ],
        weigh:
          'Holding a price the other side has already refused is a way of finding out whether they meant it. It is also a way of running out of time.',
      },
      {
        id: 'dob-admit',
        mandate: 'hold',
        feedback: 'delay',
        source: 'Cable from Havana, via the Soviet mission',
        title: 'Say plainly that you have no instructions',
        body: [
          'Havana is asking questions you cannot answer, because Cuba is not a party to either letter and is being disposed of in both. The mission wants to know what to tell Castro.',
          'The course she presses is the least comfortable one: tell the Americans the truth — that you are not authorised — and let the delay be theirs to worry about rather than a bluff of yours to maintain.',
        ],
        weigh:
          'Admitting you cannot commit is a real cost and a real signal. It is also the only thing you can say that will still be true tomorrow.',
      },
    ],
  },

  uthant: {
    room: 'The Secretariat',
    setting:
      'The people who will still be here when the two governments have finished. Four delegations have said incompatible things to you in three hours and two of them are the countries being spent.',
    advisers: [
      {
        id: 'uth-public',
        mandate: 'force',
        feedback: 'ultimatum',
        source: 'The Under-Secretary for political affairs',
        title: 'Say publicly what both have told you privately',
        body: [
          'His argument is that the office has one instrument and it is the record. Both missions have told you they are waiting; neither will say it to the other; putting that on the record costs nothing and makes the gap visible to everyone watching.',
          'He accepts that it burns the confidences. He argues that confidences you cannot act on are not an asset.',
        ],
        weigh:
          'The Secretary-General has no army and one reputation. Spending it publicly is the only way to spend it at all.',
      },
      {
        id: 'uth-private',
        mandate: 'trade',
        feedback: 'trade',
        source: 'The legal counsel',
        title: 'Carry the terms yourself, unattributed',
        body: [
          'She proposes the narrow, unglamorous thing: take the substance of what each has said, strip the attribution, and put it to the other as a proposal of your own. Neither has to be seen to have moved first.',
          'It works precisely as long as neither side finds it useful to say where it came from.',
        ],
        weigh:
          'A proposal with no author can be accepted without anyone conceding. It can also be disowned by everyone at once.',
      },
      {
        id: 'uth-stand',
        mandate: 'hold',
        feedback: 'delay',
        source: 'Cable from Ankara, copied to the Secretariat',
        title: 'Stand down and keep the office out of it',
        body: [
          'Ankara has read the second letter and objects to being traded; Havana objects to being settled over. Both have written to you because there is nowhere else to write, and neither is asking you to act.',
          'His course is to hold the office back — record the objections, convene nothing, and be available when the two powers have exhausted themselves and need somewhere to put an agreement.',
        ],
        weigh:
          'An institution that spends its standing on a crisis it cannot affect has nothing left for the one it can.',
      },
    ],
  },
};

/* What the adviser you overruled says afterwards.

   Keyed by adviser id, so it is nine blocks and not twenty-seven: each is
   written to hold whatever happened, because "I said we should have done X
   and we did Y" is true regardless of how Y turned out. The band-conditional
   tail is where the outcome lands, and it reuses the same feedback categories
   the consequence steps already key on.

   Which of the two overruled advisers speaks is decided in reckoningFor()
   below. The room does not get to agree with you afterwards; that is the
   point of having one. */
export const RECKONING = {
  'rfk-strike': {
    line: 'He does not say he was right. He says the sites were incomplete this morning and are less incomplete tonight, and asks whether anyone intends to write down when that stops being true.',
    tails: {
      trade: 'He has read the terms. He wants it recorded that the price was paid in a place he cannot defend.',
      selective: 'He notes that answering one letter does not stop work under the other one.',
      delay: 'He asks what changes tomorrow that has not changed today. Nobody answers him.',
      ultimatum: 'This, at least, he understands. He says so, and does not sound pleased about it.',
    },
  },
  'rfk-trade': {
    line: 'She points out that Ankara will learn what was decided here from someone else, and that the cable in front of you was the courtesy of an ally telling you first.',
    tails: {
      trade: 'She is not relieved. She asks who tells them, and when, and whether it is in writing.',
      selective: 'She asks what happens when the second letter is raised again, because it will be.',
      delay: 'She observes that a delay is a decision Ankara will also have to be told about.',
      ultimatum: 'She asks whether the alliance was consulted about the risk it is now carrying.',
    },
  },
  'rfk-hold': {
    line: 'He is careful about it, which is worse than if he were not. He says the manoeuvre was available all day and remains available, and that the room chose something harder instead.',
    tails: {
      trade: 'He accepts the trade. He would have preferred it cost nothing, and notes that it did not.',
      selective: 'He says this is what he proposed and does not press the point further.',
      delay: 'He says a day bought without an argument is still a day, and leaves it there.',
      ultimatum: 'He asks what the position is if the answer is no, and is told there is not one yet.',
    },
  },

  'dob-first': {
    line: 'He does not raise his voice. He says the first letter was the one with a settlement in it, and that the embassy has now spent the hours in which it could have been confirmed cheaply.',
    tails: {
      trade: 'He allows that it arrived anyway. He notes it arrived as a concession rather than an offer.',
      selective: 'He says this is what he proposed, and asks why it took the room three hours.',
      delay: 'He asks what the embassy will report tomorrow that it could not report today.',
      ultimatum: 'He says the Americans do not believe the price and that they are not wrong.',
    },
  },
  'dob-second': {
    line: 'The attaché is unmoved and does not stay long. He says the Turkish missiles were the only thing worth having and that whatever was obtained instead will be described in Moscow as what was left.',
    tails: {
      trade: 'He asks whether it is in writing. Told that it is not, he says that answers the question.',
      selective: 'He says a settlement that skips the second letter skips the reason there was one.',
      delay: 'He observes that time was the one thing the other side had more of.',
      ultimatum: 'He does not object. He notes that he sent his own cable regardless.',
    },
  },
  'dob-admit': {
    line: 'She says the mission still has nothing to tell Havana, and that Cuba will read the settlement in the newspapers like everybody else.',
    tails: {
      trade: 'She asks which part of it Cuba agreed to. There is no answer that survives the asking.',
      selective: 'She notes that neither letter mentioned Havana, and that the reply does not either.',
      delay: 'She says the questions do not stop arriving because you have stopped answering them.',
      ultimatum: 'She asks what the embassy does if the demand is refused, and is not given a plan.',
    },
  },

  'uth-public': {
    line: 'He does not argue. He says the record is the only thing the office holds, and that it was available today and will be worth less tomorrow.',
    tails: {
      trade: 'He asks whose terms they were. Told it does not matter, he says it will.',
      selective: 'He notes that a proposal with no author also has no record.',
      delay: 'He says the gap between the two missions is now a day wider and no more visible.',
      ultimatum: 'He accepts it. He wanted it said in the chamber rather than in a corridor.',
    },
  },
  'uth-private': {
    line: 'She is practical about it. She says the substance was there to be carried, that neither side had to be seen to move first, and that the opening does not stay open.',
    tails: {
      trade: 'She asks whether either government will admit where the terms came from. Neither will.',
      selective: 'She says the quiet version was available and would have cost less standing.',
      delay: 'She notes that the two missions are still not speaking, and that this was the fix.',
      ultimatum: 'She warns that a public position leaves nobody a way to climb down.',
    },
  },
  'uth-stand': {
    line: 'He does not think the office should have been spent at all. He says Ankara and Havana wrote to you because there was nowhere else to write, and that answering them is not the same as being able to help.',
    tails: {
      trade: 'He asks what the Secretariat is now responsible for enforcing. Nobody has decided.',
      selective: 'He observes that the office has now taken a side in a dispute it cannot arbitrate.',
      delay: 'He is content. He says the office is still available, which was the whole objective.',
      ultimatum: 'He asks what happens to the office if the demand is refused in public.',
    },
  },
};

/* Whose voice comes back.

   Of the two advisers you did not take, the one who speaks is the one standing
   furthest from what you actually did — so the room does not get to agree with
   you afterwards, which is the point of having one.

   "Furthest" needs a scale, and the three courses sit on one already: force at
   one end, a bargain at the other, and holding in between. The negotiation's
   outcome lands on the same scale. Whoever is furthest from where it landed is
   the person with something to say.

   An earlier version picked the adviser who opposed your MANDATE, which broke
   in the obvious case: take the hawk's advice, then trade anyway, and the
   dealmaker would come back to complain about getting what he wanted. */

const POSITION = { force: 1, hold: 0.5, trade: 0 };

/* Where the negotiation actually landed. `ultimatum` is a hard line, `trade`
   is the bargain, and the two middle outcomes sit between them. */
const OUTCOME_POSITION = {
  ultimatum: 1,
  selective: 0.66,
  delay: 0.5,
  trade: 0,
};

export function reckoningFor(roleId, mandate, feedback) {
  const cabinet = COUNCIL[roleId];
  if (!cabinet) return null;

  const overruled = cabinet.advisers.filter((a) => a.mandate !== mandate);
  if (overruled.length === 0) return null;

  const landed = OUTCOME_POSITION[feedback] ?? 0.5;
  /* Ties break on array order, so the same run always produces the same
     reckoning — a cabinet that says something different on a replay of
     identical choices would be worse than one that repeats itself. */
  const speaker = overruled.reduce((furthest, adviser) => {
    const d = Math.abs((POSITION[adviser.mandate] ?? 0.5) - landed);
    const best = Math.abs((POSITION[furthest.mandate] ?? 0.5) - landed);
    return d > best ? adviser : furthest;
  }, overruled[0]);

  const entry = RECKONING[speaker.id];
  return {
    adviser: speaker,
    line: entry?.line ?? '',
    tail: entry?.tails?.[feedback] ?? null,
  };
}

export const councilFor = (roleId) => COUNCIL[roleId] ?? null;
