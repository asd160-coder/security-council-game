/* Day 3 — Escalation and leverage.

   The quarantine is in force and it is working: ships stop, some turn back.
   Work at the sites continues at the same pace regardless. That is the day's
   argument — the instrument is functioning and it is not solving the problem,
   and the pressure that follows arrives from your own side rather than the
   other one.

   Day 2 put you across a table from your counterpart. Day 3 puts you across a
   table from the people you are supposed to be on the same side as, which is
   what keeps the reply beat from reading as a repeat. */

const day3 = {
  id: 'day3',
  number: 3,
  title: 'Escalation and leverage',
  dateline: 'Thursday, 25 October 1962',
  mapState: 'quarantine',

  steps: [
    {
      kind: 'briefing',
      id: 'update',
      archiveId: 'p2-neptune',
      /* Scene text varies with where escalation stands rather than with which
         line was taken: three variants, shared across all three roles. */
      bodyByBand: {
        low: [
          'The line held without incident. Several vessels stopped short of it; others altered course and turned for home. No shot was fired, and both governments have been careful to say so.',
          'Photography from this morning shows work continuing at the sites at the same pace as last week. The quarantine has stopped what has not yet arrived. It has not touched what is already there.',
        ],
        mid: [
          'The first vessels reached the line overnight. Some stopped. Some turned back. One was boarded and found to be carrying nothing of interest, and was allowed to proceed — which both governments have described, accurately, as a success.',
          'Photography from this morning shows work continuing at the sites at the same pace as last week. The quarantine has stopped what has not yet arrived. It has not touched what is already there.',
        ],
        high: [
          'The line held, barely. A vessel was stopped after failing to answer signals, and for some minutes it was not clear to the men involved what they were authorised to do. Both governments have since described the episode as routine.',
          'Photography from this morning shows work continuing at the sites at the same pace as last week. The quarantine has stopped what has not yet arrived. It has not touched what is already there, and there is now less time than there was.',
        ],
      },
      /* One line acknowledging what yesterday's private channel did. Keyed to
         the category, not the specific line — five variants rather than
         eighteen, and the category is what actually differed. */
      channelCallback: {
        confront: 'The position you took in private has been reported accurately upward. Nobody on either side is now under any illusion about where the limit is, which has made the room quieter and considerably narrower.',
        trust: 'Something was established yesterday between two people rather than two governments. It has no standing, cannot be produced, and is the only channel either capital currently trusts.',
        ambiguity: 'You left the question open yesterday, and it has stayed open. That was worth something while the public argument was still moving. It is worth less this morning.',
        settlement: 'The shape of an exit was spoken aloud yesterday by people without the authority to conclude it. It has not been repudiated overnight, which is the most that could be hoped for.',
        sovereignty: 'You insisted yesterday that the country being argued over is a party to the argument. Neither principal has acknowledged it. The smaller delegations noticed.',
      },
      body: [
        'The first vessels reached the line overnight. Some stopped. Some turned back.',
        'Photography from this morning shows work continuing at the sites at the same pace as last week.',
      ],
    },

    /* --------------------------------------------------------- The witness */
    {
      kind: 'witness',
      id: 'witness',
      eyebrow: 'Reached your desk this morning',
      weighLabel: 'What it asks of you',
      byRole: {
        rfk: {
          source: 'Signal relayed from the quarantine line',
          title: 'A destroyer captain asks what he is authorised to do',
          body: [
            'A commanding officer on the line reports that a vessel failed to answer signals for eleven minutes and then complied. He states that his orders tell him what to do if a ship refuses to stop, and do not tell him how long to wait before deciding that it has refused.',
            'He requests clarification. He notes, without comment, that the decision will otherwise be made by whoever is on watch.',
          ],
          weigh:
            'The policy was written in a room. It is being carried out by a man who has eleven minutes and no way to ask.',
        },
        dobrynin: {
          source: 'Embassy cipher room',
          title: 'A clerk brings a cable he has been told not to discuss',
          body: [
            'A junior cipher clerk delivers a cable marked for the Ambassador alone. It instructs the embassy to maintain its present position. It does not say what the present position is, and it does not answer either of the questions you sent.',
            'The clerk waits, in case there is a reply. There is nothing you can tell him that would be true and also useful.',
          ],
          weigh:
            'You are conducting a negotiation on behalf of a government that has not told you what it wants. Everyone in this building can see that, and none of them can say it.',
        },
        uthant: {
          source: 'Secretariat officer, returned from Havana',
          title: 'A staff member reports what she saw on the island',
          body: [
            'She reports that the hospitals in three provinces have been told to prepare for casualties, that schools in the western provinces are closed, and that the population has been told to expect an invasion within days.',
            'She adds that nobody she spoke to had heard the phrase "quarantine line", and that they had all heard the word "blockade".',
          ],
          weigh:
            'The argument in New York is about ships and dates. On the island it is about whether the schools reopen. Both are the same crisis, and only one of them is being discussed.',
        },
      },
    },

    /* -------------------------------------------- Pressure from your own side */
    {
      kind: 'exchange',
      id: 'pressure',
      eyebrow: 'Not a meeting anyone will minute',
      /* Where this happens. One line, read before anyone speaks. */
      place:
        'A corridor, an anteroom, ten minutes between other things. Nowhere anyone will look for a record of it.',
      openingPrompt: 'How you meet it',
      followPrompt: 'How you answer',
      adviser: {
        label: 'Consult your adviser',
        unlocks: 'memo-aide-day3',
      },
      counterpartByRole: {
        /* Invented composites, sanctioned by the brief. No likeness of them
           exists and none may be invented, so they are given a place in the
           room rather than a face. */
        rfk: {
          name: 'A senior military adviser',
          title: 'Speaking for those who want the sites struck',
          presence: 'individual',
        },
        dobrynin: {
          name: 'The embassy military attaché',
          title: 'Reporting separately to Moscow',
          presence: 'individual',
        },
        uthant: {
          name: 'A permanent representative',
          title: 'Speaking for a delegation losing patience',
          presence: 'individual',
        },
      },
      framingByRole: {
        rfk: [
          'He has been right about things before, which is the difficulty. He is not arguing for a war. He is arguing that the window for anything short of one is closing while you talk.',
        ],
        dobrynin: [
          'He does not report to you and never has. He has come to tell you what he intends to send, which is a courtesy, and to see whether you will object, which is not.',
        ],
        uthant: [
          'He has supported your appeals in the chamber and is here to tell you, privately, that his instructions have changed. He would rather you heard it from him.',
        ],
      },
      openingsByRole: {
        rfk: [
          {
            id: 'rfk3p-hear',
            label: 'Hear the case out',
            line: 'Tell me what you would do, and tell me what you think happens on the third day.',
            reply:
              'He is precise, which is what makes it difficult. Strike the sites while they are still incomplete, accept that some will survive, accept that Soviet technicians will be killed, and accept that the response is likely to fall on Berlin rather than on Florida. He does not claim it ends well. He claims the alternative ends worse.',
            follow: [
              {
                id: 'rfk3f-hold',
                label: 'Refuse it, and say why',
                line: 'You have told me what happens on the third day and you have not told me what happens on the tenth. Until you can, the answer is no.',
                feedback: 'restraint',
                effects: { leverage: -1, escalation: -2, legitimacy: 1, councilTrust: 2, civilianRisk: -2 },
              },
              {
                id: 'rfk3f-prepare',
                label: 'Let the preparation continue',
                line: 'Continue the planning. I am not authorising it. I want it ready, and I want the difference between those two things understood by everyone in the building.',
                feedback: 'pressure',
                effects: { leverage: 2, escalation: 2, legitimacy: 0, councilTrust: -1, civilianRisk: 1 },
              },
            ],
          },
          {
            id: 'rfk3p-clock',
            label: 'Put the clock to him',
            line: 'How long before those sites are operational, and how confident are you in that number?',
            reply:
              'He gives you a range of days rather than a number and does not pretend it is better than that. Then he says the thing you were hoping he would not: that the estimate has been revised toward the shorter end twice this week, and that revisions have only ever gone one way.',
            follow: [
              {
                id: 'rfk3f-buy',
                label: 'Buy the time anyway',
                line: 'Then we have days, and I intend to spend them. Bring me the estimate again tomorrow and tell me if it moves.',
                feedback: 'restraint',
                effects: { leverage: 0, escalation: -1, legitimacy: 1, councilTrust: 1, civilianRisk: -1 },
              },
              {
                id: 'rfk3f-deadline',
                label: 'Set a point of decision',
                line: 'Then we will decide by the end of the week, and I will say so to the people who need to hear it. A date concentrates a government.',
                feedback: 'ultimatum',
                effects: { leverage: 2, escalation: 1, legitimacy: 1, councilTrust: 0, civilianRisk: 1 },
              },
            ],
          },
          {
            id: 'rfk3p-cost',
            label: 'Ask what it costs the other side to stop',
            line: 'Set aside what we can do to them. Tell me what it would cost Khrushchev to take those weapons out, and whether he could survive it.',
            reply:
              'He answers that this is not a military question and he is not the man to ask, which is fair — and then answers it anyway. A government that retreats under an ultimatum in public does not usually remain the government. He observes that this is an argument for giving them something, and that he does not like where that argument goes.',
            follow: [
              {
                id: 'rfk3f-facesave',
                label: 'Take the opening he did not mean to give',
                line: 'Then the problem is not force. It is finding something he can show his own people. Get me the list of what we would part with.',
                feedback: 'settlement',
                effects: { leverage: 1, escalation: -2, legitimacy: 1, councilTrust: 2, civilianRisk: -2 },
              },
              {
                id: 'rfk3f-refuse',
                label: 'Refuse the premise',
                line: 'His political survival is not a American interest. He placed them in secret and he can remove them in public.',
                feedback: 'pressure',
                effects: { leverage: 2, escalation: 1, legitimacy: 0, councilTrust: -1, civilianRisk: 1 },
              },
            ],
          },
        ],
        dobrynin: [
          {
            id: 'dob3p-ask',
            label: 'Ask what he intends to send',
            line: 'You are entitled to report what you like. I would prefer to know what it is before Moscow does.',
            reply:
              'He tells you plainly. He intends to report that the embassy is being outmanoeuvred, that the American quarantine is being permitted to establish a precedent, and that the political line has been too accommodating. He does not appear to think this is an accusation.',
            follow: [
              {
                id: 'dob3f-record',
                label: 'Put your own account beside it',
                line: 'Send it. I will send mine in the same bag, and Moscow may weigh two reports rather than one.',
                feedback: 'restraint',
                effects: { leverage: 1, escalation: -1, legitimacy: 1, councilTrust: 1, civilianRisk: -1 },
              },
              {
                id: 'dob3f-block',
                label: 'Try to hold it',
                line: 'You will hold that until I have instructions. One embassy cannot send two policies in one week.',
                feedback: 'pressure',
                effects: { leverage: 2, escalation: 1, legitimacy: 0, councilTrust: -1, civilianRisk: 0 },
              },
            ],
          },
          {
            id: 'dob3p-authority',
            label: 'Establish who speaks for the embassy',
            line: 'While we are being direct: do you consider yourself under my authority in this building, or not?',
            reply:
              'He says that in matters of policy he does, and in matters of military assessment he does not, and that he assumes you would not want it otherwise. It is said without hostility, which is worse. He is describing an arrangement, not defying one.',
            follow: [
              {
                id: 'dob3f-accept',
                label: 'Accept the division',
                line: 'Then report your assessment and leave the policy to me. We will both be more useful if neither pretends to the other’s competence.',
                feedback: 'restraint',
                effects: { leverage: 0, escalation: -1, legitimacy: 1, councilTrust: 2, civilianRisk: -1 },
              },
              {
                id: 'dob3f-assert',
                label: 'Refuse it',
                line: 'In this building, on this question, there is one policy and I am responsible for it. Report that too, if you wish.',
                feedback: 'ultimatum',
                effects: { leverage: 2, escalation: 1, legitimacy: 0, councilTrust: 0, civilianRisk: 0 },
              },
            ],
          },
          {
            id: 'dob3p-warn',
            label: 'Tell him what you saw across the table',
            line: 'You have read the cables. I have sat with them. Let me tell you what I do not think Moscow understands.',
            reply:
              'He listens, and asks one question: whether you believe the Americans would actually strike, or whether you believe they are constructing a position from which to be talked down. He says the whole of his report depends on the answer, and that he genuinely does not know.',
            follow: [
              {
                id: 'dob3f-honest',
                label: 'Tell him you think they would',
                line: 'I think they would. Not because they want to — because the men urging it are winning the argument, and the man resisting it is running out of reasons.',
                feedback: 'settlement',
                effects: { leverage: 0, escalation: -2, legitimacy: 1, councilTrust: 2, civilianRisk: -2 },
              },
              {
                id: 'dob3f-hedge',
                label: 'Keep the judgement to yourself',
                line: 'I think it is not the kind of thing an ambassador should guess at in writing. Report what was said, not what I suppose.',
                feedback: 'ambiguity',
                effects: { leverage: 1, escalation: 0, legitimacy: 0, councilTrust: 1, civilianRisk: 0 },
              },
            ],
          },
        ],
        uthant: [
          {
            id: 'uth3p-why',
            label: 'Ask what changed',
            line: 'You supported the appeal on Tuesday. Tell me what your government heard between then and now.',
            reply:
              'He says his capital has concluded that the Secretary-General is being used — that appeals for restraint delay a resolution which will happen anyway, and that being the party who asked everyone to wait is not a position with a future. He adds that he argued against this view and lost.',
            follow: [
              {
                id: 'uth3f-persist',
                label: 'Continue regardless',
                line: 'Then I shall be used. An office that only acts when it is certain of thanks is not worth having.',
                feedback: 'restraint',
                effects: { leverage: -1, escalation: -2, legitimacy: 2, councilTrust: 1, civilianRisk: -2 },
              },
              {
                id: 'uth3f-adapt',
                label: 'Ask what would keep him',
                line: 'Then tell me what your government would support, and I will consider whether it is something I can put my name to.',
                feedback: 'settlement',
                effects: { leverage: 2, escalation: -1, legitimacy: 0, councilTrust: 2, civilianRisk: -1 },
              },
            ],
          },
          {
            id: 'uth3p-count',
            label: 'Count the room',
            line: 'Before I answer you, tell me how many delegations you speak for this morning.',
            reply:
              'He is candid: four certainly, perhaps seven. Not a majority, but enough that a proposal from your office would now be argued over rather than agreed to. He observes that this is not the same as opposition, and that it is worse, because it is procedural.',
            follow: [
              {
                id: 'uth3f-narrow',
                label: 'Narrow the proposal to what survives',
                line: 'Then I shall ask for less, and ask for it in a form nobody can vote against without explaining themselves.',
                feedback: 'settlement',
                effects: { leverage: 1, escalation: -1, legitimacy: 1, councilTrust: 2, civilianRisk: -1 },
              },
              {
                id: 'uth3f-overrule',
                label: 'Go over the room',
                line: 'Then I shall address the two governments directly and let the Council take note afterwards. The office has that power and this is what it is for.',
                feedback: 'ultimatum',
                effects: { leverage: 2, escalation: -1, legitimacy: 1, councilTrust: -2, civilianRisk: -1 },
              },
            ],
          },
          {
            id: 'uth3p-island',
            label: 'Put the island in front of him',
            line: 'A member of my staff returned from Havana this morning. Before you tell me what your instructions are, I would like you to hear what she saw.',
            reply:
              'He hears it out properly, which you did not expect. Then he says that everything she describes is true and that none of it will change a single vote in this building, and that he is sorry, and that both of those statements are his honest position.',
            follow: [
              {
                id: 'uth3f-record',
                label: 'Put it on the record anyway',
                line: 'Then it will change no votes and it will be in the record. In thirty years that will be the only part of this week anyone defends.',
                feedback: 'restraint',
                effects: { leverage: -1, escalation: -1, legitimacy: 2, councilTrust: 1, civilianRisk: -2 },
              },
              {
                id: 'uth3f-trade',
                label: 'Use it where it will work',
                line: 'Then I shall not waste it here. I shall put it to the two governments privately, where it may embarrass someone into a decision.',
                feedback: 'settlement',
                effects: { leverage: 2, escalation: -1, legitimacy: 1, councilTrust: 1, civilianRisk: -2 },
              },
            ],
          },
        ],
      },
    },

    {
      kind: 'consequence',
      id: 'pressure-consequence',
      after: 'pressure',
      eyebrow: 'What it cost to answer',
      variants: {
        restraint: {
          text: 'You held a line against people on your own side, which is more expensive than holding one against the other. It buys time you have not yet found a use for, and it will be remembered by everyone in the room if the time runs out.',
          unlocks: 'note-operational',
        },
        pressure: {
          text: 'You moved toward the harder argument without conceding it entirely. Preparation has a way of becoming its own case for action: the further it goes, the more expensive stopping it becomes.',
          unlocks: 'note-operational',
        },
        ultimatum: {
          text: 'You fixed a point at which something must happen. A date concentrates a government and removes its excuses — including your own, and including the ones you may want later.',
          unlocks: 'note-leverage',
        },
        settlement: {
          text: 'You went looking for what the other side could afford to accept rather than what you could compel. That is the question a settlement is built from, and it is not a question the people around you were asking.',
          unlocks: 'note-leverage',
        },
        ambiguity: {
          text: 'You kept your judgement to yourself. It remains available, which is worth something, and it is not helping anyone who has to decide today.',
          unlocks: 'note-leverage',
        },
      },
    },

    /* ------------------------------------------------------- Revision */
    {
      kind: 'draftingRevise',
      id: 'revision',
      targetDay: 2,
      eyebrow: 'Drafting — revision',
      prompt:
        'Yesterday’s clause was written before the line was tested and before you knew what your own side would ask of you. It can stand, or it can change.',
      currentLabel: 'As it currently stands',
      optionsByRole: {
        rfk: [
          {
            id: 'rfk3r-harden',
            label: 'Harden it',
            operative: 'the installations shall be rendered inoperable and withdrawn without further delay.',
            effects: { leverage: 2, escalation: 2, legitimacy: -1, councilTrust: -1, civilianRisk: 1 },
          },
          {
            id: 'rfk3r-hold',
            label: 'Let it stand',
            hold: true,
            effects: { leverage: -1, escalation: 0, legitimacy: 0, councilTrust: 1, civilianRisk: 0 },
          },
          {
            id: 'rfk3r-soften',
            label: 'Open it',
            operative:
              'the withdrawal of these installations under verification would be met by assurances this Government is prepared to give.',
            effects: { leverage: -1, escalation: -2, legitimacy: 2, councilTrust: 2, civilianRisk: -2 },
          },
        ],
        dobrynin: [
          {
            id: 'dob3r-harden',
            label: 'Harden it',
            operative: 'the quarantine shall be lifted before any question of withdrawal is entertained.',
            effects: { leverage: 2, escalation: 2, legitimacy: -1, councilTrust: -1, civilianRisk: 1 },
          },
          {
            id: 'dob3r-hold',
            label: 'Let it stand',
            hold: true,
            effects: { leverage: -1, escalation: 0, legitimacy: 0, councilTrust: 1, civilianRisk: 0 },
          },
          {
            id: 'dob3r-soften',
            label: 'Open it',
            operative:
              'a reciprocal withdrawal accompanied by an assurance against invasion would be acceptable to this Government.',
            effects: { leverage: -1, escalation: -2, legitimacy: 2, councilTrust: 2, civilianRisk: -2 },
          },
        ],
        uthant: [
          {
            id: 'uth3r-harden',
            label: 'Give it force',
            operative:
              'the Secretary-General calls upon both Governments to suspend the measures now in force and will report to the Council on any failure to do so.',
            effects: { leverage: 2, escalation: -1, legitimacy: 1, councilTrust: -2, civilianRisk: -1 },
          },
          {
            id: 'uth3r-hold',
            label: 'Let it stand',
            hold: true,
            effects: { leverage: -1, escalation: 0, legitimacy: 0, councilTrust: 1, civilianRisk: 0 },
          },
          {
            id: 'uth3r-soften',
            label: 'Narrow it',
            operative:
              'the Secretary-General asks only that no vessel be intercepted while direct discussions are in progress.',
            effects: { leverage: 0, escalation: -2, legitimacy: 1, councilTrust: 2, civilianRisk: -2 },
          },
        ],
      },
    },

    {
      kind: 'summary',
      id: 'summary',
      eyebrow: 'End of day',
      body: [
        'The line held and the building continued. Both of those are true, and the second one is the reason the first is not a solution. Everyone concerned now understands that the quarantine buys days rather than an outcome.',
        'The pressure today came from your own side, which is the harder kind to answer, and it will not have gone away by morning.',
      ],
      foreshadow:
        'Tomorrow there are terms on the table from more than one direction, and they do not agree with each other.',
      advanceLabel: 'Advance to Day 4',
    },
  ],
};

export default day3;
