/* Day 5 — The answer.

   Overnight the terms went to Moscow with a term attached. A strike is
   scheduled if nothing comes back. And the single thing none of these three
   can do is make the reply arrive.

   That is what makes Day 5 different from the four days before it. The tension
   is not what to decide; it is that the decision has largely left your hands,
   and what remains is the small set of things you can still do before it does.

   The final table converges as Day 4's did, and each position carries a
   `posture` that lib/outcome.js reads when resolving the run. */

const day5 = {
  id: 'day5',
  number: 5,
  title: 'The answer',
  dateline: 'Sunday, 28 October 1962',
  mapState: 'quarantine',

  steps: [
    {
      kind: 'briefing',
      id: 'update',
      /* What was sent last night, while you were deciding. */
      archiveIds: ['ship-departing', 'jfk-reply-27-oct', 'un-crisis-eases'],
      bodyByBand: {
        low: [
          'The terms went to Moscow overnight. Nothing has come back. The quarantine holds, the sites are unchanged since yesterday, and for the first time in a week there is nothing scheduled to happen in the next few hours that anyone in this building controls.',
          'What was possible to do has been done. The remainder of today belongs to a decision being taken four thousand miles away by people you cannot reach.',
        ],
        mid: [
          'The terms went to Moscow overnight with a term attached. Nothing has come back. Reconnaissance is scheduled at first light and there is a recommendation, already drafted, for what follows if the aircraft find the sites unchanged.',
          'What was possible to do has been done. The remainder of today belongs to a decision being taken four thousand miles away by people you cannot reach.',
        ],
        high: [
          'The terms went to Moscow overnight with a term attached, and the term expires today. Reconnaissance is scheduled at first light. The recommendation for what follows is written, staffed and waiting, and the number of people who would have to agree in order to stop it has become very small.',
          'What was possible to do has been done. The remainder of today belongs to a decision being taken four thousand miles away by people you cannot reach.',
        ],
      },
      channelCallback: {
        selective: 'You chose which of the two letters to believe. If Moscow accepts being taken at its better word, that judgement was correct; if it does not, you will have answered a letter the other government has already moved past.',
        trade: 'You put the Turkish missiles into the bargain. Whatever comes back this morning, an ally learned yesterday that its security was available as currency, and allies do not unlearn that.',
        delay: 'You asked for the two letters to be reconciled before committing. Moscow has not reconciled them. The morning has arrived with the question still open and less time in which to close it.',
        ultimatum: 'You put a term on the offer. It expires today, in front of witnesses, and neither government can now let it pass quietly.',
      },
      body: [
        'The terms went to Moscow overnight. Nothing has come back.',
        'What was possible to do has been done.',
      ],
    },

    /* ------------------------------------------ The last thing you control */
    {
      kind: 'exchange',
      id: 'final',
      /* The slate on the establishing card. */
      clock: '28 OCT · 08:45',
      eyebrow: 'Before the answer comes',
      /* Where this happens. One line, read before anyone speaks. */
      place:
        'A morning with nothing in it but waiting. The decision has left your hands and has not yet arrived anywhere.',
      openingPrompt: 'How you spend the morning',
      followPrompt: 'What you do with the time that is left',
      adviser: {
        label: 'Consult your adviser',
        unlocks: 'memo-aide-day5',
      },
      counterpartByRole: {
        /* Nobody is across the table on the last day. All three face a room
           waiting on a cable that has not come. */
        rfk: {
          name: 'The Executive Committee',
          title: 'In session since before dawn',
          presence: 'body',
        },
        dobrynin: {
          name: 'The embassy',
          title: 'Waiting on Moscow, as you are',
          presence: 'body',
        },
        uthant: {
          name: 'Both missions',
          title: 'Available to you, and to each other only through you',
          presence: 'body',
        },
      },
      framingByRole: {
        rfk: [
          'The room has run out of new arguments. Everyone in it has said what they think, twice, and is now waiting on a broadcast from a government that does not keep American office hours.',
        ],
        dobrynin: [
          'You have sent everything you know. There is nothing further to report and no instruction to act on, and the embassy has arranged itself around the telephone in the way people do when they have stopped pretending to work.',
        ],
        uthant: [
          'Both missions have told you, separately and in almost the same words, that they are waiting. Neither will say it to the other. That gap is the whole of your remaining usefulness.',
        ],
      },
      openingsByRole: {
        rfk: [
          {
            id: 'rfk5p-strike',
            label: 'Ask what stops the strike',
            line: 'If the aircraft go up at first light and the sites are unchanged, what is the actual mechanism by which we do not act on the recommendation?',
            reply:
              'The answer is that there is no mechanism. There is a schedule, a plan and a body of people expecting to execute it, and the only thing between that and the morning is the President deciding again, personally, that today is not the day — which he has now done every day this week.',
          },
          {
            id: 'rfk5p-pilot',
            label: 'Return to the pilot',
            line: 'We have still not answered for the aircraft yesterday. Tell me what we lose by continuing not to.',
            reply:
              'Credibility, in the judgement of most of the room, and less than they think in the judgement of the rest. What is agreed is that answering it now would end the negotiation, and that not answering it costs something with the people who fly the next mission.',
          },
          {
            id: 'rfk5p-what',
            label: 'Ask what we do if the answer is yes',
            line: 'Suppose it comes back and it is yes. What do we do in the first hour, and what do we not do?',
            reply:
              'Nobody has drafted that. Every hour this week has gone on the other case. It is pointed out — by someone junior, and correctly — that a government which has not planned for success will improvise its way through the most delicate part of it.',
          },
        ],
        dobrynin: [
          {
            id: 'dob5p-cable',
            label: 'Send one more assessment',
            line: 'I am going to send one further cable. Not a report. My own judgement of what happens here if the answer is no.',
            reply:
              'The cipher clerk waits while you draft it. Writing it down forces you to be exact, and being exact makes it worse: you find you believe the Americans will act, that you believe it on evidence rather than on nerves, and that you have no way to make Moscow feel the difference.',
          },
          {
            id: 'dob5p-line',
            label: 'Keep the channel warm',
            line: 'I shall telephone him. Not to negotiate — so that the line has been used this morning and is known to be working.',
            reply:
              'He takes the call immediately, which tells you he was near the telephone too. Neither of you has anything to say. You talk for four minutes about nothing, and both of you understand that the point of the call was that it could be made.',
          },
          {
            id: 'dob5p-havana',
            label: 'Speak to Havana',
            line: 'Whatever is agreed this morning will be carried out on Cuban soil. Somebody in this embassy should have spoken to the Cubans before it is.',
            reply:
              'The conversation is short and cold. They have understood for two days that the arrangement is being made over their heads, they say so without heat, and they ask a question you cannot answer: whether the weapons leaving means the guarantee arriving, or merely the weapons leaving.',
          },
        ],
        uthant: [
          {
            id: 'uth5p-both',
            label: 'Carry the same message to both',
            line: 'I shall tell each of you the same thing: that the other is waiting, that the other does not want this, and that I have said so in both rooms.',
            reply:
              'Both receive it, and both ask the same question — whether you have said it to the other yet. It is the third time this week that the most useful thing available to you has been the ability to be believed in two places at once.',
          },
          {
            id: 'uth5p-record',
            label: 'Put the week on the record',
            line: 'Whatever happens this morning, there should be an accurate account of what was proposed, by whom, and when. I intend to prepare one.',
            reply:
              'Your staff point out, reasonably, that this is what people do when they expect to lose. You tell them it is what people do when they expect to be misquoted, and both of you know that the two are not exclusive.',
          },
          {
            id: 'uth5p-cuba',
            label: 'Go to the Cubans',
            line: 'Two governments are about to conclude something on Cuban territory. I am going to ask the Cuban mission what it would require in order to accept it.',
            reply:
              'They tell you: an end to the overflights, a guarantee that means something, and to be asked rather than informed. Then they tell you, without bitterness, that they do not expect to receive any of the three, and thank you for being the only person who came.',
          },
        ],
      },
      /* The four things still available. `posture` is what the outcome logic
         reads; the rest is voice and price, as on Day 4. */
      sharedFollow: [
        {
          id: 'day5-hold',
          label: 'Hold to the terms as sent',
          feedback: 'hold',
          posture: 'hold',
          lineByRole: {
            rfk: 'Nothing further goes to Moscow. The terms are the terms, and adding to them now would tell them we expect to be refused.',
            dobrynin: 'I shall send nothing further. What has been transmitted is accurate, and a second message this morning would read in Moscow as doubt.',
            uthant: 'I shall add nothing to what both Governments already have. They know the terms and they know each other’s position, and further intervention would only give either of them something new to object to.',
          },
          effectsByRole: {
            rfk: { leverage: 1, escalation: 0, legitimacy: 1, councilTrust: 1, civilianRisk: 0 },
            dobrynin: { leverage: 0, escalation: 0, legitimacy: 1, councilTrust: 2, civilianRisk: 0 },
            uthant: { leverage: -1, escalation: 0, legitimacy: 1, councilTrust: 2, civilianRisk: 0 },
          },
          note: 'Silence is a position. It reads as confidence if the terms were good and as indifference if they were not, and you will not know which until the answer comes.',
        },
        {
          id: 'day5-assure',
          label: 'Add a private assurance',
          feedback: 'assure',
          posture: 'assure',
          lineByRole: {
            rfk: 'One more message, privately, and not in any record: the undertaking will be honoured, and the other matter will be dealt with in a few months and never discussed.',
            dobrynin: 'I shall tell Moscow that the American assurance is real, that I have it from the brother, and that I stake my own judgement on it. That is all I have left to add.',
            uthant: 'I shall give each Government my word, separately, that the other has told me it wants this settled. Neither will accept it from the other. Both may accept it from me.',
          },
          effectsByRole: {
            rfk: { leverage: -1, escalation: -2, legitimacy: 0, councilTrust: 2, civilianRisk: -2 },
            dobrynin: { leverage: -1, escalation: -2, legitimacy: 1, councilTrust: 2, civilianRisk: -2 },
            uthant: { leverage: 0, escalation: -2, legitimacy: 1, councilTrust: 2, civilianRisk: -2 },
          },
          strain: {
            tracker: 'councilTrust',
            below: 3,
            effectsByRole: {
              rfk: { leverage: -2, escalation: -1, legitimacy: -1, councilTrust: 1, civilianRisk: -1 },
              dobrynin: { leverage: -2, escalation: -1, legitimacy: 0, councilTrust: 1, civilianRisk: -1 },
              uthant: { leverage: -1, escalation: -1, legitimacy: 0, councilTrust: 1, civilianRisk: -1 },
            },
            note: 'An assurance is worth the record of the person giving it. Yours has been inconsistent this week, and a private promise from a party that has already moved twice will be weighed rather than taken.',
          },
        },
        {
          id: 'day5-extend',
          label: 'Extend the term',
          feedback: 'extend',
          posture: 'extend',
          lineByRole: {
            rfk: 'We give it until tomorrow. Not because the deadline was wrong, but because a war begun over a schedule is not a war anyone will be able to explain.',
            dobrynin: 'I shall ask Washington for another day and I shall ask Moscow to use it. Neither request is strong. Both are worth making.',
            uthant: 'I shall ask both Governments publicly for a further twenty-four hours. It is the one request an office like mine can make that neither can refuse without appearing to want the alternative.',
          },
          effectsByRole: {
            rfk: { leverage: -2, escalation: -1, legitimacy: 1, councilTrust: 1, civilianRisk: -1 },
            dobrynin: { leverage: -1, escalation: -1, legitimacy: 1, councilTrust: 1, civilianRisk: -1 },
            uthant: { leverage: 1, escalation: -1, legitimacy: 2, councilTrust: 1, civilianRisk: -1 },
          },
          note: 'More time has never yet made this worse. It has also not, in five days, made anybody agree to anything they would not otherwise have agreed to.',
        },
        {
          id: 'day5-withdraw',
          label: 'Withdraw the offer',
          feedback: 'withdraw',
          posture: 'withdraw',
          lineByRole: {
            rfk: 'The offer lapses at noon. If they have not answered by then they have answered, and we proceed on the recommendation.',
            dobrynin: 'I shall report that the American offer is being withdrawn and that in my judgement it will not be renewed. Moscow should understand it has hours rather than days.',
            uthant: 'I shall inform the Council that the effort has failed, name what was offered and by whom, and place the reason for its failure on the record while there is still a record.',
          },
          effectsByRole: {
            rfk: { leverage: 2, escalation: 2, legitimacy: -1, councilTrust: -2, civilianRisk: 2 },
            dobrynin: { leverage: 1, escalation: 2, legitimacy: 0, councilTrust: -1, civilianRisk: 2 },
            uthant: { leverage: 0, escalation: 2, legitimacy: 1, councilTrust: -2, civilianRisk: 2 },
          },
          note: 'This is the only move today that cannot be taken back. Everything else leaves the morning open.',
        },
      ],
    },

    {
      kind: 'consequence',
      id: 'final-consequence',
      after: 'final',
      eyebrow: 'And then you wait',
      variants: {
        hold: {
          text: 'Nothing further goes out. The morning passes in the particular quiet of people who have done everything available to them and are now spectators to their own crisis.',
          unlocks: 'note-waiting',
        },
        assure: {
          text: 'The message goes privately, to one person, with nothing behind it but the standing of whoever sends it. It is the smallest instrument used all week and it may be the one that carries.',
          unlocks: 'note-assurance',
        },
        extend: {
          text: 'The clock moves and everything else stays where it was. Both governments have been given another day, and both now know the other was willing to give one.',
          unlocks: 'note-waiting',
        },
        withdraw: {
          text: 'The offer is closing. Everyone who needs to know has been told, and the arguments that were being held back all week are no longer being held back.',
          unlocks: 'note-assurance',
        },
      },
    },

    /* ------------------------------------------------- The writing task */
    {
      kind: 'writing',
      id: 'closing',
      eyebrow: 'Drafting — the closing',
      statementLabel: 'Your statement',
      pendingText: 'Your closing goes here.',
      guidance:
        'Two to four sentences. Say what you are accepting and what you are not; a closing that concedes everything is not a position, and one that concedes nothing is not a settlement.',
      needsMore: 'A little more — two sentences at least.',
      advanceLabel: 'Enter it into the record',
      minSentences: 2,
      minWords: 25,
      promptByRole: {
        rfk: {
          brief:
            'The statement has been built across five days. It needs its last paragraph, and nobody else can write it: what this Government is prepared to accept, and on what understanding.',
          instruction: 'Write the closing of your statement',
          stem: 'In conclusion, this Government ',
          placeholder: 'In conclusion, this Government …',
        },
        dobrynin: {
          brief:
            'The statement has been built across five days. It needs its last paragraph, and nobody else can write it: what the Soviet Government is prepared to accept, and on what understanding.',
          instruction: 'Write the closing of your statement',
          stem: 'In conclusion, the Soviet Government ',
          placeholder: 'In conclusion, the Soviet Government …',
        },
        uthant: {
          brief:
            'The statement has been built across five days. It needs its last paragraph, and nobody else can write it: what you are asking of both Governments, and on what basis you ask it.',
          instruction: 'Write the closing of your statement',
          stem: 'In conclusion, the Secretary-General ',
          placeholder: 'In conclusion, the Secretary-General …',
        },
      },
    },

    {
      kind: 'summary',
      id: 'summary',
      eyebrow: 'End of day',
      body: [
        'The statement is finished. Five days of positions, revisions and terms, ending in a paragraph nobody drafted for you.',
        'What happens now is not in the document and not in your hands. It is in a broadcast that has either been recorded or has not.',
      ],
      foreshadow: 'The answer comes within the hour.',
      advanceLabel: 'Learn how it ended',
    },
  ],
};

export default day5;
