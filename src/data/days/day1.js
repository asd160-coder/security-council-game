/* Day 1 — Discovery.

   Scene text, choice lines, effect values and feedback templates are taken
   from day-1-content-pack.md rather than rewritten. The one authored addition
   is `fragment` on each drafting option: the pack says the chosen tone becomes
   the first stored fragment of the player's draft, but does not supply the
   fragment text, and the drafting tray needs something real to hold.

   A day is an ordered list of steps. Each step's `kind` selects a renderer and
   its `id` is how choices are keyed and how a consequence finds the exchange it
   reports on — which is what lets a day hold more than one conversation.
   Adding Day 2 means writing the next file in this directory and registering
   it — no component needs to change so long as it reuses these kinds. */

const day1 = {
  id: 'day1',
  number: 1,
  title: 'Discovery',
  dateline: 'Tuesday, 16 October 1962',
  mapState: 'discovery',

  steps: [
    {
      kind: 'briefing',
      id: 'briefing',
      archiveIds: ['u2-mrbm-launch-site', 'ss4-reference'],
      body: [
        'Reconnaissance has revealed missile installations in Cuba. What was once suspicion is becoming strategic reality. Across Washington, Moscow, and the United Nations, leaders are now weighing the same question: how can this threat be answered without pushing the world toward catastrophe?',
        'Every public statement, every private message, and every signal of weakness or resolve may shape what comes next.',
      ],
      radioCaption:
        'A brief radio bulletin signals rising public anxiety as governments move from uncertainty toward response.',
    },

    {
      kind: 'privateBrief',
      id: 'private-brief',
      eyebrow: 'For your eyes only',
    },

    /* The first conversation, and until Milestone 10 the only one in the game
       where nobody answered you.

       Day 1 was a `dialogue`: four positions, one click, and a narrator to tell
       you how it had been received. It was a fifth the size of Day 4 and it was
       the first thing anybody saw. It is now an `exchange` like every other
       day — you probe, someone answers, and you take a position with their
       answer in front of you.

       The four positions the day already had are kept; they were good. What is
       new is the room they are taken in and the person who makes you say them
       out loud. Nobody here has a portrait, which is true rather than a
       shortfall: on 16 October these are internal conversations, and the
       photographs have not left a very small circle. */
    {
      kind: 'exchange',
      id: 'first-response',
      eyebrow: 'First formal response',
      place:
        'The room where the first words are chosen. Outside it, nobody yet knows there is anything to choose.',
      openingPrompt: 'How you open',
      followPrompt: 'The line you take',
      adviser: {
        label: 'Consult your adviser',
        unlocks: 'memo-aide',
      },
      counterpartByRole: {
        rfk: {
          name: 'The President',
          title: 'Before there is a committee, or a decision',
          presence: 'individual',
        },
        dobrynin: {
          name: 'The counsellor',
          title: 'Who has read the traffic, and knows what is not in it',
          presence: 'individual',
        },
        uthant: {
          name: 'A deputy',
          title: 'Who will still be here when both governments have finished',
          presence: 'individual',
        },
      },
      framingByRole: {
        rfk: [
          'The photographs were read out at breakfast and the room has not yet decided what it is. There is no committee, no position and no announcement — there is a brother who wants to know what you think before anyone else tells him.',
        ],
        dobrynin: [
          'Something has changed in Washington this morning and nobody has told you what. The counsellor has been through the overnight traffic twice and has come to say what is not in it, which takes longer than saying what is.',
        ],
        uthant: [
          'Nobody has informed you of anything, which is itself information. Your deputy has noticed the same pattern you have — meetings moved, appointments cancelled — and has come to ask what the office intends to do about a crisis it has not been told exists.',
        ],
      },
      openingsByRole: {
        rfk: [
          {
            id: 'rfk1p-what',
            label: 'Ask what the photographs establish',
            line: 'Before anyone tells me what to do about it — what do we actually know, and how certain are the people who know it?',
            reply:
              'He tells you what the interpreters told him, in their words rather than his: medium-range sites, not yet operational, construction moving faster than anyone budgeted for. Then he adds the part that is his own. They were certain enough to wake him, and he has not been given a second opinion because there is not one.',
            follow: [
              {
                id: 'rfk1f-firm',
                label: 'Firm warning',
                line: 'Then the answer has to be that this cannot stand, and it has to be said early enough that nobody in Moscow can claim they misread us.',
                feedback: 'firm',
                effects: { leverage: 2, escalation: 2, legitimacy: 0, councilTrust: -1, civilianRisk: -1 },
              },
              {
                id: 'rfk1f-controlled',
                label: 'Controlled firmness',
                line: 'Then we are serious and we are disciplined, and we do not confuse the two. Strength without control makes the disaster we are trying to avoid.',
                feedback: 'controlled',
                effects: { leverage: 1, escalation: 1, legitimacy: 1, councilTrust: 0, civilianRisk: 0 },
              },
            ],
          },
          {
            id: 'rfk1p-time',
            label: 'Ask how long there is',
            line: 'How long before those sites can do what they were built to do? Give me the number you would defend, not the one that sounds calm.',
            reply:
              'He does not have a number and will not invent one. What he has is a range, and the fact that the range has been revised twice since the first frame was read — both times toward the shorter end. He says nobody has told him revisions ever go the other way.',
            follow: [
              {
                id: 'rfk1f-legitimacy',
                label: 'Legitimacy and caution',
                line: 'Then whatever we do has to be defensible the day after, not only the day we do it. The world has to see firmness joined to restraint or it will only see the firmness.',
                feedback: 'legitimacy',
                effects: { leverage: 0, escalation: -1, legitimacy: 2, councilTrust: 1, civilianRisk: 1 },
              },
              {
                id: 'rfk1f-firm2',
                label: 'A deadline of our own',
                line: 'Then we set our own clock rather than living on theirs. A date concentrates a government, including this one.',
                feedback: 'firm',
                effects: { leverage: 2, escalation: 1, legitimacy: 1, councilTrust: -1, civilianRisk: 0 },
              },
            ],
          },
          {
            id: 'rfk1p-say',
            label: 'Say what you think before he asks',
            line: 'I will tell you what I think and you can decide what it is worth. Whatever we do first is the thing everyone else will have to live inside.',
            reply:
              'He lets you finish, which is not always what happens. Then he asks the question you were hoping to be spared: whether you would say the same thing with the Chiefs in the room, and whether you would say it tomorrow when the room is larger and the recommendation is already on the table.',
            follow: [
              {
                id: 'rfk1f-diplomatic',
                label: 'Quiet opening for diplomacy',
                line: 'Yes — and I would add that public strength matters less than keeping a way through. A position with no room to move may leave no room for peace.',
                feedback: 'diplomatic',
                effects: { leverage: 0, escalation: 0, legitimacy: 1, councilTrust: 1, civilianRisk: -1 },
              },
              {
                id: 'rfk1f-controlled2',
                label: 'Answer for it in the room',
                line: 'Yes, and in front of them. If it is only true when the room is small it was never worth saying.',
                feedback: 'controlled',
                effects: { leverage: 1, escalation: 0, legitimacy: 1, councilTrust: 1, civilianRisk: 0 },
              },
            ],
          },
        ],
        dobrynin: [
          {
            id: 'dob1p-traffic',
            label: 'Ask what the traffic shows',
            line: 'Tell me what came in overnight, and then tell me what did not come in that you expected to.',
            reply:
              'The traffic is ordinary, and that is his point. No instruction, no warning, no request for a reading of the American mood — on a morning when the American mood has plainly changed. He says an embassy that is not being told anything is usually an embassy whose government has decided something.',
            follow: [
              {
                id: 'dob1f-controlled',
                label: 'Reject alarmist framing',
                line: 'Then we do not supply the alarm ourselves. The language of panic is the language of escalation, and I will not be its first speaker.',
                feedback: 'controlled',
                effects: { leverage: 1, escalation: 0, legitimacy: 1, councilTrust: 0, civilianRisk: 0 },
              },
              {
                id: 'dob1f-firm',
                label: 'Signal strength and parity',
                line: 'Then we answer as a serious state answers: with balance, not with reassurance. Pressure is not met by looking eager to be liked.',
                feedback: 'firm',
                effects: { leverage: 2, escalation: 1, legitimacy: 0, councilTrust: -1, civilianRisk: 1 },
              },
            ],
          },
          {
            id: 'dob1p-auth',
            label: 'Ask what you are authorised to say',
            line: 'If I am asked today — directly, by someone who already knows the answer — what am I permitted to say?',
            reply:
              'He is careful, because the honest answer is unhelpful. You are authorised to repeat what you have already said, which is that there are no offensive weapons in Cuba. He notes, without emphasis, that you were given that line by people who did not tell you what it was for.',
            follow: [
              {
                id: 'dob1f-diplomatic',
                label: 'Test reciprocal restraint',
                line: 'Then I say the least that is true and I ask for something back. If there is to be restraint it has to be mutual, or it is just a concession with a longer name.',
                feedback: 'diplomatic',
                effects: { leverage: 1, escalation: 0, legitimacy: 1, councilTrust: 1, civilianRisk: -1 },
              },
              {
                id: 'dob1f-ambiguity',
                label: 'Preserve ambiguity',
                line: 'Then I say very little, carefully, until I know what I am defending. Certainty offered early becomes a trap sprung late.',
                feedback: 'diplomatic',
                effects: { leverage: 0, escalation: -1, legitimacy: 0, councilTrust: 1, civilianRisk: 1 },
              },
            ],
          },
          {
            id: 'dob1p-plain',
            label: 'Say plainly that you have not been told',
            line: 'I want it recorded, here, between us, that I do not know what my own government has done. I would rather find that out from you than from an American.',
            reply:
              'He does not pretend to be surprised, and he does not offer comfort. He says the embassy has been in this position before and that the ambassadors who survived it were the ones who did not guess. Then he asks what you want him to do with the conversation you have just had.',
            follow: [
              {
                id: 'dob1f-legitimacy',
                label: 'Keep your own record',
                line: 'Write it down. If I am going to be held to a position I was not given, there should be a paper somewhere saying when I was not given it.',
                feedback: 'controlled',
                effects: { leverage: 0, escalation: -1, legitimacy: 2, councilTrust: 1, civilianRisk: 0 },
              },
              {
                id: 'dob1f-diplomatic2',
                label: 'Nothing, for now',
                line: 'Nothing. This conversation did not happen, and I will go on saying what I have been told to say until somebody in Moscow tells me otherwise.',
                feedback: 'diplomatic',
                effects: { leverage: 1, escalation: 0, legitimacy: 0, councilTrust: 0, civilianRisk: 1 },
              },
            ],
          },
        ],
        uthant: [
          {
            id: 'uth1p-office',
            label: 'Ask what the office can actually do',
            line: 'Before we decide what to say — what is it, precisely, that this office can do that neither of them can do for themselves?',
            reply:
              'He gives you the short list because it is short. You can convene, you can ask, and you can put something on the record that both of them will have to answer. You cannot compel, you cannot verify without consent, and you cannot make either of them take a call. He adds that the list has never been longer than this and has occasionally been enough.',
            follow: [
              {
                id: 'uth1f-restraint',
                label: 'Immediate call for restraint',
                line: 'Then we use the one instrument we have, and early. The first duty of states at a moment like this is restraint, and someone has to be the one who says so.',
                feedback: 'legitimacy',
                effects: { leverage: 0, escalation: -1, legitimacy: 2, councilTrust: 1, civilianRisk: -1 },
              },
              {
                id: 'uth1f-mediation',
                label: 'Offer mediation',
                line: 'Then we offer the thing neither of them can ask for. If both sides fear humiliation, a third party is the only way either climbs down.',
                feedback: 'diplomatic',
                effects: { leverage: 1, escalation: 0, legitimacy: 1, councilTrust: 2, civilianRisk: -1 },
              },
            ],
          },
          {
            id: 'uth1p-who',
            label: 'Ask who has told you what',
            line: 'Who has actually informed this office of anything? Not what we have inferred — what we have been told.',
            reply:
              'Nobody has. He has the list of what was cancelled and by whom, and the observation that the cancellations are all on one side of the building. He says the office is being managed rather than consulted, and that this is usually the last quiet morning before it is asked to do something impossible.',
            follow: [
              {
                id: 'uth1f-procedure',
                label: 'Procedure and verification',
                line: 'Then we insist on the thing they are avoiding: a process that can test a fact. Accusation without verification is just two governments shouting dates at each other.',
                feedback: 'legitimacy',
                effects: { leverage: 0, escalation: -1, legitimacy: 2, councilTrust: 2, civilianRisk: -1 },
              },
              {
                id: 'uth1f-wait',
                label: 'Wait to be told',
                line: 'Then we wait to be informed, and we note the hour at which we were not. An office that acts on inference can be accused of taking a side before anyone has stated one.',
                feedback: 'legitimacy',
                effects: { leverage: 0, escalation: -1, legitimacy: 1, councilTrust: 1, civilianRisk: 1 },
              },
            ],
          },
          {
            id: 'uth1p-first',
            label: 'Say you intend to move before being asked',
            line: 'I do not intend to wait to be invited into this. Tell me what it costs the office if I am early and wrong.',
            reply:
              'He tells you plainly: if you are early and wrong you have spent the only thing the office holds, and you will be asked to sit down by people who were glad of you last week. Then he says the other half, which he clearly does not enjoy saying. If you are late and right, the same thing happens, and later.',
            follow: [
              {
                id: 'uth1f-harden',
                label: 'Warn against hardened positions',
                line: 'Then we speak now, while there is still something to say. Once both governments have committed themselves in public, compromise stops being available to either of them.',
                feedback: 'legitimacy',
                effects: { leverage: 0, escalation: 0, legitimacy: 2, councilTrust: 1, civilianRisk: -1 },
              },
              {
                id: 'uth1f-quiet',
                label: 'Move quietly first',
                line: 'Then we go to both privately before we go to anyone publicly. What is said in a corridor can be withdrawn; what is said in the chamber cannot.',
                feedback: 'diplomatic',
                effects: { leverage: 1, escalation: -1, legitimacy: 0, councilTrust: 2, civilianRisk: 0 },
              },
            ],
          },
        ],
      },
    },

    {
      kind: 'consequence',
      id: 'consequence',
      after: 'first-response',
      eyebrow: 'How your position was read',
      /* Keyed by the chosen line's `feedback`. Each strategy type also carries
         the unlock it earns, following the content pack's trigger table. */
      variants: {
        firm: {
          text: 'Your stance projects seriousness and resolve. Others are less likely to dismiss your position, but some now read the crisis as moving closer to confrontation.',
          unlocks: 'note-opposing-response',
        },
        controlled: {
          text: 'Your response balances pressure with caution. You have preserved authority without fully closing the door to later maneuver.',
          unlocks: 'note-opposing-response',
        },
        diplomatic: {
          text: 'Your words leave room for negotiation. Some actors may see this as wisdom; others may question whether it signals hesitation.',
          unlocks: 'note-backchannel',
        },
        legitimacy: {
          text: 'Your emphasis on process and restraint strengthens your international standing. However, not every actor will value legitimacy as highly as immediate advantage.',
          unlocks: 'note-un-procedure',
        },
      },
    },

    {
      kind: 'drafting',
      id: 'drafting',
      eyebrow: 'Drafting — opening line',
      prompt: 'Choose the tone of your opening diplomatic line.',
      note: 'This becomes the first fragment of the statement you will build across the crisis.',
      options: [
        {
          id: 'condemnatory',
          label: 'Condemnatory and urgent',
          description:
            'Frame the crisis as unacceptable and requiring immediate correction.',
        effects: { leverage: 1, escalation: 1, legitimacy: 0, councilTrust: -1, civilianRisk: -1 },
          fragment:
            'The installation of offensive weapons in Cuba is an unacceptable act that demands immediate correction.',
        },
        {
          id: 'measured',
          label: 'Measured but firm',
          description:
            'Acknowledge the seriousness of the threat while preserving disciplined control.',
        effects: { leverage: 1, escalation: 0, legitimacy: 1, councilTrust: 0, civilianRisk: 0 },
          fragment:
            'The developments in Cuba are of the gravest seriousness, and they require a response that is firm, deliberate, and proportionate.',
        },
        {
          id: 'procedural',
          label: 'Procedural and investigative',
          description:
            'Emphasise verification, process, and the need to establish a credible path forward.',
        effects: { leverage: 0, escalation: -1, legitimacy: 2, councilTrust: 1, civilianRisk: 0 },
          fragment:
            'The facts in Cuba must be established by means all parties can credit, and a process to verify them should begin without delay.',
        },
        {
          id: 'deescalatory',
          label: 'De-escalatory and diplomatic',
          description:
            'Reduce public temperature and protect room for future negotiation.',
        effects: { leverage: -1, escalation: -1, legitimacy: 1, councilTrust: 1, civilianRisk: 1 },
          fragment:
            'However serious these developments, the immediate task is to reduce the danger of miscalculation and to keep open every channel through which a settlement might be found.',
        },
      ],
    },

    {
      kind: 'summary',
      id: 'summary',
      eyebrow: 'End of day',
      body: [
        'The crisis has entered a new phase. Your first response has shaped how others read your intent: as strength, caution, diplomacy, or procedural restraint. None of these paths is without cost.',
        'Tomorrow, public pressure will grow. Private channels may open — or close. What is said next may matter even more than what has already been discovered.',
      ],
      advanceLabel: 'Advance to Day 2',
    },
  ],
};

export default day1;
