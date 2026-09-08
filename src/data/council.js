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
        format: 'cable',
        stamp: 'Received 27 Oct 1962 · 09:30',
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
      'The people who will still be here when the two governments have finished. Four delegations have said incompatible things to you in three hours, and two of them are the countries being bargained away.',
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
/* Three things you can say back, whichever adviser it is.

   The stances repeat across all nine so the register reads consistently —
   own the decision, concede the part that was right, or ask the person you
   overruled to help carry what you chose instead — and the lines are written
   per adviser so each answer speaks to that person's argument. Each trades
   one point between two needles: being answerable costs something, which is
   the reason the room gets to speak at all. */
export const ANSWER_STANCES = ['own', 'concede', 'enlist'];

export const ANSWER_LABEL = {
  own: 'Own it',
  concede: 'Concede the point',
  enlist: 'Ask them to help carry it',
};

export const ANSWER_EFFECTS = {
  own: { legitimacy: 1, councilTrust: -1 },
  concede: { councilTrust: 1, leverage: -1 },
  enlist: { councilTrust: 1, escalation: 1 },
};

export const RECKONING = {
  'rfk-strike': {
    line: 'He does not say he was right. “The sites were incomplete this morning. They are less incomplete tonight.” Then, to the room rather than to you: “Does anyone intend to write down when that stops being true?”',
    tails: {
      trade: 'He has read the terms. “I want it recorded that the price was paid somewhere I cannot defend.”',
      selective: '“Answering one letter,” he says, “does not stop work under the other one.”',
      delay: '“What changes tomorrow that has not changed today?” Nobody answers him.',
      ultimatum: 'This, at least, he understands. He says so, and does not sound pleased about it.',
    },
    answers: {
      own: {
        line: 'I heard the case and I decided against it. That is what the chair is for, and it is what the chair will be blamed for if you are right.',
        close: '“A fair answer,” he says. “Not a reassuring one.” He will keep the wing on alert regardless.',
      },
      concede: {
        line: 'You were right that the sites are further along tonight than they were this morning, and I still would not do it. I want you to know I did the arithmetic.',
        close: 'He allows that the arithmetic was done. “I would like to see it again in the morning,” he says, “when the sites have moved.”',
      },
      enlist: {
        line: 'Then help me carry it. If this has failed by first light I want your plan on the table, and I want it to be one I can defend afterwards.',
        close: '“It has been on the table since Tuesday,” he says. “I will bring it back with the pages in order.”',
      },
    },
  },
  'rfk-trade': {
    line: '“Ankara will learn what was decided here from somebody else,” she says. “The cable in front of you was the courtesy of an ally telling us first.”',
    tails: {
      trade: 'She is not relieved. “Who tells them? When? And is it in writing?”',
      selective: '“What happens when the second letter is raised again?” she asks. It will be.',
      delay: '“A delay is a decision,” she says. “Ankara will have to be told about that one too.”',
      ultimatum: '“Was the alliance consulted,” she asks, “about the risk it is now carrying?”',
    },
    answers: {
      own: {
        line: 'I heard Ankara and I decided against telling them. That is what the chair is for, and it is what the chair will answer for if they find out first.',
        close: '“They will find out first,” she says. “I will draft the apology tonight, so that it is at least accurate.”',
      },
      concede: {
        line: 'You were right that an ally told us first and that it deserved better than silence, and I still would not put the trade in writing. I want you to know I read the cable twice.',
        close: '“The cable was written to be read twice,” she says. “I will tell Ankara that it was.”',
      },
      enlist: {
        line: 'Then help me carry it. Draft what we tell Ankara, tonight, in language that survives being printed, and have it ready before they ask.',
        close: '“I have been drafting it since the second letter was broadcast,” she says. “The hard part is the first sentence.”',
      },
    },
  },
  'rfk-hold': {
    line: 'He is careful about it, which is worse than if he were not. “The manoeuvre was available all day. It remains available.” A pause. “The room chose something harder.”',
    tails: {
      trade: 'He accepts the trade. “I would have preferred it cost nothing. It did not.”',
      selective: '“This is what I proposed,” he says, and does not press it further.',
      delay: '“A day bought without an argument is still a day,” he says, and leaves it there.',
      ultimatum: '“And the position if the answer is no?” He is told there is not one yet.',
    },
    answers: {
      own: {
        line: 'I heard the manoeuvre and I chose something harder. That is what the chair is for, and if it fails the failure is mine and not the room’s.',
        close: '“The room will carry it anyway. That is what a room is for.” He does not say it as a complaint.',
      },
      concede: {
        line: 'You were right that the first letter was the one with a settlement in it, and I still could not answer as though the second did not exist. I want you to know I nearly did.',
        close: '“Nearly is the usual distance in this business,” he says. He will keep the draft reply in his pocket in case it closes.',
      },
      enlist: {
        line: 'Then help me carry it. If the second letter comes back tomorrow I want a reply to it that does not concede the first, and I want it from you.',
        close: '“I have one. Two paragraphs.” He does not smile. “The second is the difficult one.”',
      },
    },
  },

  'dob-first': {
    line: 'He does not raise his voice. “The first letter was the one with a settlement in it,” he says. “We have now spent the hours in which it could have been confirmed cheaply.”',
    tails: {
      trade: 'He allows that it arrived anyway. “As a concession,” he says. “Not as an offer.”',
      selective: '“This is what I proposed,” he says. “Why did it take three hours?”',
      delay: '“What do we report tomorrow,” he asks, “that we could not report today?”',
      ultimatum: '“The Americans do not believe the price,” he says. “They are not wrong.”',
    },
    answers: {
      own: {
        line: 'I heard you and I did not send what you wanted sent. The Ambassador answers for what leaves this building, and I will answer for it.',
        close: '“Understood,” he says. “Moscow will still ask why the cheap hour was not used.”',
      },
      concede: {
        line: 'You were right that the hours could have been used more cheaply, and I still could not confirm what I had not been told. I want you to know I counted them too.',
        close: '“The hours are counted in Moscow too,” he says, “by people who were not in this room to hear the reasons.”',
      },
      enlist: {
        line: 'Then help me carry it. Draft the cable that tells Moscow what we did and why, in language they can defend to each other, and have it encoded before midnight.',
        close: '“The draft will be ready,” he says. “The encoding will not be the slow part.”',
      },
    },
  },
  'dob-second': {
    line: 'The attaché is unmoved and does not stay long. “The Turkish missiles were the only thing worth having,” he says. “Whatever was obtained instead will be described in Moscow as what was left.”',
    tails: {
      trade: '“Is it in writing?” Told that it is not: “That answers the question.”',
      selective: '“A settlement that skips the second letter,” he says, “skips the reason there was one.”',
      delay: '“Time was the one thing the other side had more of.”',
      ultimatum: 'He does not object. He notes that he sent his own cable regardless.',
    },
    answers: {
      own: {
        line: 'I heard the case for the Turkish missiles and I did not make it. The Ambassador decides what this embassy asks for, and this embassy did not ask for that.',
        close: '“The Ambassador decides. The Ministry remembers.” He has already reported which.',
      },
      concede: {
        line: 'You were right that the second letter was the one with something in it for us, and I still would not stake the settlement on it. I want you to know I read it as carefully as you did.',
        close: 'He allows that it was read. “Reading it was never the difficulty. Asking for it was.”',
      },
      enlist: {
        line: 'Then help me carry it. If Moscow asks tomorrow why the Turkish missiles were not pressed, I want the answer to come from you, and I want it to be true.',
        close: '“It will be true,” he says. “I cannot promise it will be kind.”',
      },
    },
  },
  'dob-admit': {
    line: '“We still have nothing to tell Havana,” she says. “Cuba will read the settlement in the newspapers, like everybody else.”',
    tails: {
      trade: '“Which part of it did Cuba agree to?” There is no answer that survives the asking.',
      selective: '“Neither letter mentioned Havana,” she says. “The reply does not either.”',
      delay: '“The questions do not stop arriving,” she says, “because we have stopped answering them.”',
      ultimatum: '“And if the demand is refused?” She is not given a plan.',
    },
    answers: {
      own: {
        line: 'I heard you and I did not say we had no instructions. An embassy that admits that in public stops being an embassy, and I decided it would not be this one.',
        close: '“An embassy that cannot answer Havana has already stopped being one for Havana.” She leaves it there.',
      },
      concede: {
        line: 'You were right that Havana will read this in the newspapers, and I still could not tell them what I did not know myself. I want you to know I tried to reach the mission.',
        close: '“The mission was reached,” she says. “They had nothing to tell us either. That was rather the point.”',
      },
      enlist: {
        line: 'Then help me carry it. Write to Havana tonight, from this embassy, saying what we did and what we did not know, before they read it from anyone else.',
        close: '“I have already begun,” she says. “It is honest. It will not be enough.”',
      },
    },
  },

  'uth-public': {
    line: 'He does not argue. “The record is the only thing this office holds,” he says. “It was available today. It will be worth less tomorrow.”',
    tails: {
      trade: '“Whose terms were they?” Told it does not matter: “It will.”',
      selective: '“A proposal with no author,” he says, “also has no record.”',
      delay: '“The gap between the two missions is a day wider,” he says, “and no more visible.”',
      ultimatum: 'He accepts it. He wanted it said in the chamber rather than in a corridor.',
    },
    answers: {
      own: {
        line: 'I heard the case for saying it publicly and I did not say it. The office decides what it puts on the record, and I decided it would not put this.',
        close: '“The office decides,” he says. “The record will show the decision as a silence. Which is also a record.”',
      },
      concede: {
        line: 'You were right that the record is the only thing this office holds, and I still would not spend it today. I want you to know I nearly took the floor.',
        close: '“The floor was there. It will be there tomorrow, worth a little less.” He will keep the statement drafted.',
      },
      enlist: {
        line: 'Then help me carry it. Draft what the office would say if both governments fail by morning, and draft it so that neither can claim we took a side.',
        close: '“That draft is the hardest sentence in this building,” he says. “I will have it by six.”',
      },
    },
  },
  'uth-private': {
    line: 'She is practical about it. “The substance was there to be carried. Neither side had to be seen to move first.” Then: “The opening does not stay open.”',
    tails: {
      trade: '“Will either government admit where the terms came from?” Neither will.',
      selective: '“The quiet version was available,” she says, “and would have cost less standing.”',
      delay: '“The two missions are still not speaking,” she says. “That was the thing this would have fixed.”',
      ultimatum: '“A public position,” she says, “leaves nobody a way to climb down.”',
    },
    answers: {
      own: {
        line: 'I heard the case for carrying the terms myself and I did not carry them. The office keeps its hands clean or it keeps nothing, and that was mine to decide.',
        close: '“Clean hands are a fine thing to keep,” she says. “I have never seen anyone settle a crisis with them.”',
      },
      concede: {
        line: 'You were right that the substance was there and that someone had to carry it, and I still would not be the one seen doing it. I want you to know I know what that cost.',
        close: '“The cost is a day,” she says. “Days are the one thing this week has not been generous with.”',
      },
      enlist: {
        line: 'Then help me carry it. Find out tonight what each mission would accept from the other if the words arrived with no name on them, and bring me the words.',
        close: '“You will have the words by morning,” she says. “The names will be the harder part to leave off.”',
      },
    },
  },
  'uth-stand': {
    line: 'He does not think the office should have been spent at all. “Ankara and Havana wrote to you because there was nowhere else to write,” he says. “Answering them is not the same as being able to help.”',
    tails: {
      trade: '“What is the Secretariat now responsible for enforcing?” Nobody has decided.',
      selective: '“The office has taken a side,” he says, “in a dispute it cannot arbitrate.”',
      delay: 'He is content. “The office is still available. That was the whole objective.”',
      ultimatum: '“And what happens to this office,” he asks, “if the demand is refused in public?”',
    },
    answers: {
      own: {
        line: 'I heard the case for keeping the office out of it and I put the office into it. That is what the office is for, and if it is spent, it was mine to spend.',
        close: '“It was,” he says. “I hope the next Secretary-General is given something to spend.”',
      },
      concede: {
        line: 'You were right that answering Ankara and Havana was not the same as being able to help them, and I still could not leave them unanswered. I want you to know I read both letters twice.',
        close: '“They were good letters. They will be answered again next week, by somebody else.” He takes the point.',
      },
      enlist: {
        line: 'Then help me carry it. Draft the reply to both missions that says what the office did today and what it could not do, and make it something they can show their governments.',
        close: '“The drafting is easy. The showing is not.” He will do the first tonight.',
      },
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
    /* What you can say back, in utterance shape. An adviser without answers
       (there are none, but data should not have to promise that) yields an
       empty list and the step falls back to a plain Continue. */
    answers: ANSWER_STANCES.map((id) => ({
      id,
      label: ANSWER_LABEL[id],
      feedback: id,
      effects: ANSWER_EFFECTS[id],
      line: entry?.answers?.[id]?.line ?? '',
      close: entry?.answers?.[id]?.close ?? '',
    })).filter((answer) => answer.line),
  };
}

export const councilFor = (roleId) => COUNCIL[roleId] ?? null;
