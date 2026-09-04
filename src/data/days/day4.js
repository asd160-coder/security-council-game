/* Day 4 — Negotiation under pressure.

   Two letters arrive from Moscow overnight and they do not agree with each
   other. The first is personal and cheap: the weapons come out in exchange for
   an undertaking not to invade Cuba. The second is public and expensive, and
   adds the American missiles in Turkey to the price. On the same morning a U-2
   is shot down over Cuba and its pilot killed.

   The pressure today is not escalation. It is being made to choose between
   things you want. Take the cheap letter and risk it being disowned. Take the
   expensive one and pay in the credibility of every alliance guarantee you
   have given. Insist the two be reconciled and lose the window while a dead
   airman argues for retaliation.

   CONVERGENCE. The four answers on the table are properties of the situation
   rather than of the person: they are the four that exist, and all three roles
   are genuinely choosing among the same four. So the openings diverge — three
   different rooms, three different institutional positions — and the follow-ups
   converge, carrying a different line and a different price for each role, and
   a different price again where standing has turned against you. */

const day4 = {
  id: 'day4',
  number: 4,
  title: 'Negotiation under pressure',
  dateline: 'Saturday, 27 October 1962',
  mapState: 'quarantine',

  steps: [
    {
      kind: 'briefing',
      id: 'update',
      /* The room, and the memorandum that created it — read together before
         the council convenes in it. */
      archiveIds: ['excomm-cabinet-room', 'nsam-196'],
      bodyByBand: {
        low: [
          'Two letters arrived from Moscow overnight. The first, received late and evidently written in haste, offers the removal of the weapons in exchange for an undertaking not to invade Cuba. The second, broadcast this morning, adds the American missiles in Turkey to the price.',
          'At eleven o’clock a reconnaissance aircraft was shot down over eastern Cuba. The pilot is dead. Neither government has yet said who gave the order, and there is reason to think neither government knows.',
        ],
        mid: [
          'Two letters arrived from Moscow overnight, and they do not agree with each other. The first offers the weapons’ removal for an undertaking not to invade Cuba. The second, broadcast this morning, adds the American missiles in Turkey.',
          'At eleven o’clock a reconnaissance aircraft was shot down over eastern Cuba. The pilot is dead. Neither government has yet said who gave the order, and there is reason to think neither government knows.',
        ],
        high: [
          'Two letters arrived from Moscow overnight, and they do not agree with each other. The first offers the weapons’ removal for an undertaking not to invade Cuba. The second, broadcast this morning, adds the American missiles in Turkey.',
          'At eleven o’clock a reconnaissance aircraft was shot down over eastern Cuba. The pilot is dead. There are men in both capitals who have wanted an incident of exactly this kind, and they have it, and the pressure to answer it is very close to irresistible.',
        ],
      },
      channelCallback: {
        restraint: 'You held a line against your own side yesterday. That is remembered this morning, and the people you held it against have not changed their minds — they have simply acquired an argument they did not have before.',
        pressure: 'You let the preparation continue yesterday. It has continued. There is now a plan, a schedule, and a body of people who have worked on it, which is not the same thing as a decision but is not nothing either.',
        ultimatum: 'You fixed a point of decision yesterday. It is nearer than it was, and the letters arrived inside it, which is either fortunate timing or evidence that the other side was watching the clock too.',
        settlement: 'You went looking yesterday for what the other side could afford to accept. One of these two letters is very close to the answer you were given.',
        ambiguity: 'You kept your judgement to yourself yesterday. Nobody has since asked you for it, and the argument has moved on without it.',
      },
      body: [
        'Two letters arrived from Moscow overnight, and they do not agree with each other.',
        'At eleven o’clock a reconnaissance aircraft was shot down over eastern Cuba. The pilot is dead.',
      ],
    },

    /* ------------------------------------------------------- The aircraft */
    /* The one thing on this day nobody in the room chose. A witness card with
       a cost on it: the loss lands whether you strike, trade or wait, which is
       the difference between an event and an option. Until this step existed
       the pilot was a sentence in the briefing and moved nothing, and a
       careful player could finish five days without a single needle moving
       against them. The aides are invented; the pilot stays unnamed, as in
       the briefing. */
    {
      kind: 'witness',
      id: 'aircraft',
      eyebrow: 'Reached your desk',
      weighLabel: 'What it asks of you',
      bearsByRole: {
        rfk: { escalation: 2, civilianRisk: 1 },
        dobrynin: { escalation: 2, councilTrust: -1 },
        /* Havana declining the appeal in writing is a blow to the office's
           standing with the missions, which is the one thing the
           Secretary-General's outcome actually turns on. */
        uthant: { civilianRisk: 2, councilTrust: -1, escalation: 1 },
      },
      byRole: {
        rfk: {
          source: 'From the Secretary of Defense’s office',
          format: 'cable',
          stamp: 'Received 27 Oct 1962 · 11:20',
          title: 'The aircraft is confirmed lost, and there is a standing order about it',
          body: [
            'The reconnaissance flight over the eastern sites did not return. Cuban radar tracked it into the surface-to-air envelope and the signal stopped. The pilot’s family has not yet been told, and the officer writing asks that the room remember there is a family at the other end of this before it becomes a number.',
            'He adds, because it is his job to add it, that the committee agreed in advance that a site which fires on our aircraft will be struck. That order exists. It has not been given, and nobody has yet said for how long it can go on not being given.',
          ],
          weigh:
            'Something happened this morning that you did not decide and cannot take back. Everything you argue today is argued in the hour after it.',
        },
        dobrynin: {
          source: 'Embassy cipher room',
          format: 'cable',
          stamp: 'Received 27 Oct 1962 · 12:05',
          title: 'The Americans say a plane is down. Moscow has said nothing.',
          body: [
            'The first account of the aircraft reached the embassy from the American side, by telephone, in a call that was not angry and was worse for it. The caller wished the Ambassador to know what his own side’s forces had done before he read it in the afternoon papers.',
            'The cipher room has nothing from Moscow on the subject. Either the order was given without the capital knowing, or it was given and the capital would prefer the embassy did not. Neither can be said to the Americans, and both are now assumed by them.',
          ],
          weigh:
            'You are being held to account for a thing you did not know had happened, by people who assume you did. Whatever you say today, that is what it is heard through.',
        },
        uthant: {
          source: 'From the Cuban mission, by hand',
          title: 'Havana has ordered its guns to fire on aircraft in its airspace',
          body: [
            'The Cuban mission delivers a note rather than sending it. It states that the Republic has instructed its forces to engage any aircraft violating its airspace, that the population has been mobilised, and that the Secretary-General’s appeal for restraint was received with respect and cannot be acted on while the island is overflown daily.',
            'The officer who brought it stays long enough to say, unofficially, that the hospitals in the western provinces have stopped admitting anyone who is not an emergency, in order to keep the beds.',
          ],
          weigh:
            'The office asked for restraint and was answered with a reason. The people the reason is about are not in this building, and are not in either capital.',
        },
      },
    },

    /* --------------------------------------- The parties who were not asked */
    /* The cabinet, before the other side.

       This replaces the `witness` step that used to sit here. Its two cables —
       Ankara having read the second letter, Havana not being a party to either
       — are not lost: they are now what two of the three advisers are arguing
       from, which is a better use of them than a desk with nobody attached.
       The cast and the courses live in src/data/council.js. */
    {
      kind: 'council',
      id: 'council',
      eyebrow: 'Before you go in',
      weighLabel: 'What it would cost',
      prompt: 'Whose course you carry into the room',
    },

    {
      kind: 'exchange',
      id: 'negotiation',
      /* The slate on the establishing card. */
      clock: '27 OCT · 16:00',
      eyebrow: 'The decisive conversation',
      /* Where this happens. One line, read before anyone speaks. */
      place:
        'The table where the thing is actually settled, if it is settled. Everyone in the room knows it.',
      openingPrompt: 'How you enter it',
      followPrompt: 'Which answer you press for',
      adviser: {
        label: 'Consult your adviser',
        unlocks: 'memo-aide-day4',
      },
      counterpartByRole: {
        /* A committee is not a person and is not drawn as one. Kennedy is,
           because he is a playable seat with a portrait already. */
        rfk: {
          name: 'The Executive Committee',
          title: 'Reconvened after the aircraft was lost',
          presence: 'body',
        },
        dobrynin: {
          name: 'Robert Kennedy',
          title: 'Arrived without notice, for the third time this week',
          presence: 'principal',
          roleRef: 'rfk',
        },
        uthant: {
          name: 'Both missions and two others',
          title: 'Washington, Moscow, Ankara, Havana',
          presence: 'body',
        },
      },
      framingByRole: {
        rfk: [
          'The room has been arguing since the aircraft was lost. There is a standing recommendation to strike the surface-to-air sites tomorrow morning, and there is a letter on the table offering to end the whole thing for a promise.',
        ],
        dobrynin: [
          'He is not here to negotiate and says so immediately. He is here because his government intends to answer one of the two letters today, and someone has to be told which.',
        ],
        uthant: [
          'Four delegations, in three hours, saying incompatible things. Two of them are principals and two of them are the countries being spent. You are the only person who has spoken to all four.',
        ],
      },
      openingsByRole: {
        rfk: [
          {
            id: 'rfk4p-letters',
            label: 'Ask which letter is real',
            line: 'We have two letters and one government. I want an assessment of which of them Khrushchev actually wrote and which one he was made to sign.',
            reply:
              'The room divides on it. The first reads like a man alone at a desk; the second reads like a committee. Nobody will commit to the judgement, and everyone accepts that the choice of which to answer is also a choice about which Khrushchev you are dealing with.',
          },
          {
            id: 'rfk4p-pilot',
            label: 'Start with the aircraft',
            line: 'Before anything else. A man was killed this morning. Tell me what we know about who ordered it and what we are obliged to do about it.',
            reply:
              'Nobody knows. The assessment is that it was a local decision, possibly Soviet, possibly not, and that there is a standing recommendation to answer it tomorrow. It is pointed out, quietly, that answering it would end the negotiation the letters have just opened.',
          },
          {
            id: 'rfk4p-turkey',
            label: 'Put Turkey on the table yourself',
            line: 'The Jupiters are obsolete and we have been trying to withdraw them for a year. Tell me why we cannot simply say so.',
            reply:
              'Because it would be true and would not help. Every guarantee given to every ally rests on the proposition that their security is not tradeable. The missiles are worth nothing militarily and the precedent is worth a great deal, and both of those facts survive being pointed out.',
          },
        ],
        dobrynin: [
          {
            id: 'dob4p-which',
            label: 'Ask which letter he intends to answer',
            line: 'My government has sent two letters. Before you tell me your terms, tell me which of them you are treating as the offer.',
            reply:
              '“The first,” he says, and does not pretend the choice is anything but deliberate. “We intend to answer the letter we prefer and behave as though the second had not arrived.” Then, without embarrassment: “Would Moscow object to being taken at its more reasonable word?”',
          },
          {
            id: 'dob4p-pilot',
            label: 'Raise the aircraft first',
            line: 'A man was killed over Cuba this morning by a weapon my country supplied. I have no instructions about it and I am not going to pretend otherwise.',
            reply:
              '“There are people in my government who consider the matter settled and are waiting only for the morning,” he tells you. “The President has not agreed. He cannot hold that position for very long.” He says it as a fact rather than a threat, which is what makes it one.',
          },
          {
            id: 'dob4p-turkey',
            label: 'Press the Turkish point',
            line: 'The second letter asks for nothing your government has not privately conceded is militarily worthless. Why is it impossible?',
            reply:
              'He does not dispute the military point. “The difficulty is that it cannot be agreed publicly. An alliance that trades one member’s security in public has stopped being one.” Then something more interesting. “Which is a statement about publicity. Not about substance.”',
          },
        ],
        uthant: [
          {
            id: 'uth4p-fourth',
            label: 'Convene all four',
            line: 'I have four delegations telling me incompatible things, and two of them are not being consulted about arrangements that dispose of their territory. I propose to say that in the same room.',
            reply:
              'The two principals decline, separately and politely, and for the same reason: neither will sit at a table where the smaller parties can veto. Ankara and Havana both accept immediately. You have been shown exactly where the power is and exactly what your convening authority is worth.',
          },
          {
            id: 'uth4p-pilot',
            label: 'Take the aircraft as the opening',
            line: 'A man was killed this morning and neither of you appears to know by whose order. I intend to establish that before either of you acts on an assumption.',
            reply:
              'Washington cannot say. Moscow will not. What emerges from three hours of separate conversations is that both governments privately believe it was not authorised at the top, and that neither can say so publicly without appearing to excuse it.',
          },
          {
            id: 'uth4p-sequence',
            label: 'Offer to hold the sequence',
            line: 'The difficulty is not the terms. It is that neither of you can afford to move first. That is a problem an intermediary exists to solve.',
            reply:
              'This is heard properly for the first time all week. Both missions ask, separately, what form such an arrangement would take and how much of it would be public — and both are notably more interested in the second question than the first.',
          },
        ],
      },
      /* ------------------------------------------------------------------
         The four positions on the table. Shared, because these are the four
         answers the situation admits of; role-keyed in voice and in price,
         because a position costs what your chair makes it cost. */
      sharedFollow: [
        {
          id: 'day4-first-letter',
          label: 'Answer the first letter only',
          feedback: 'selective',
          lineByRole: {
            rfk: 'We answer the first letter and behave as though the second never arrived. Accept the terms he offered when he was writing for himself.',
            dobrynin: 'I shall report that the Americans intend to accept the first letter, and I shall recommend that Moscow allow itself to be taken at its more reasonable word.',
            uthant: 'I shall treat the first letter as the offer before this Council, and invite the second to be withdrawn rather than refused.',
          },
          effectsByRole: {
            rfk: { leverage: 2, escalation: -2, legitimacy: 1, councilTrust: -1, civilianRisk: -2 },
            dobrynin: { leverage: -1, escalation: -2, legitimacy: 1, councilTrust: 2, civilianRisk: -2 },
            uthant: { leverage: 1, escalation: -2, legitimacy: 2, councilTrust: 1, civilianRisk: -2 },
          },
          strain: {
            tracker: 'councilTrust',
            below: 4,
            effectsByRole: {
              rfk: { leverage: 1, escalation: -1, legitimacy: 0, councilTrust: -2, civilianRisk: -1 },
              dobrynin: { leverage: -2, escalation: -1, legitimacy: 0, councilTrust: 1, civilianRisk: -1 },
              uthant: { leverage: 0, escalation: -1, legitimacy: 1, councilTrust: -1, civilianRisk: -1 },
            },
            note: 'Choosing which of another government’s letters to believe is a liberty. Taken from a position nobody currently trusts, it reads as convenience rather than judgement.',
          },
        },
        {
          id: 'day4-turkey',
          label: 'Take the second letter and pay in Turkey',
          feedback: 'trade',
          lineByRole: {
            rfk: 'We take the terms as offered, including the Jupiters. They are obsolete, we have wanted them out for a year, and the price of pretending otherwise is a war.',
            dobrynin: 'I shall report that the second letter can be met, and that the Americans require it to be met in a form they are not obliged to acknowledge.',
            uthant: 'I shall put both withdrawals before the Council as a single question, since that is what the second letter has made them.',
          },
          effectsByRole: {
            rfk: { leverage: -2, escalation: -2, legitimacy: -1, councilTrust: 1, civilianRisk: -2 },
            dobrynin: { leverage: 2, escalation: -2, legitimacy: 1, councilTrust: 0, civilianRisk: -2 },
            uthant: { leverage: 1, escalation: -2, legitimacy: 1, councilTrust: -1, civilianRisk: -2 },
          },
          note: 'The missiles are worth nothing. The precedent of trading an ally’s security is worth a great deal, and both remain true after the trade is made.',
        },
        {
          id: 'day4-reconcile',
          label: 'Demand the two letters be reconciled',
          feedback: 'delay',
          lineByRole: {
            rfk: 'We answer neither until Moscow tells us which one it means. I am not negotiating against a government that is still arguing with itself.',
            dobrynin: 'I shall ask Moscow to say plainly which text stands. I would rather deliver one position late than two positions today.',
            uthant: 'I shall ask the Soviet Government to state which text it wishes this Council to consider, and I shall wait for the answer.',
          },
          effectsByRole: {
            rfk: { leverage: 1, escalation: 1, legitimacy: 1, councilTrust: 1, civilianRisk: 1 },
            dobrynin: { leverage: -1, escalation: 1, legitimacy: 2, councilTrust: 1, civilianRisk: 1 },
            uthant: { leverage: -1, escalation: 1, legitimacy: 2, councilTrust: 2, civilianRisk: 1 },
          },
          note: 'Clarity is worth having and it is not free. The aircraft was lost this morning, and every hour spent establishing what the other side means is an hour the people who want to answer it are still arguing.',
        },
        {
          id: 'day4-deadline',
          label: 'Set a term on the offer',
          feedback: 'ultimatum',
          lineByRole: {
            rfk: 'We accept the first letter and we give it until tomorrow evening. After that the offer is withdrawn and the recommendation on the table is the only one left.',
            dobrynin: 'I shall report that the American answer carries a term, and that in my judgement the term is real rather than theatrical.',
            uthant: 'I shall ask both Governments for an answer by tomorrow evening, and I shall say publicly that I have asked.',
          },
          effectsByRole: {
            rfk: { leverage: 2, escalation: 1, legitimacy: 0, councilTrust: -1, civilianRisk: 0 },
            dobrynin: { leverage: 1, escalation: 1, legitimacy: -1, councilTrust: -1, civilianRisk: 1 },
            uthant: { leverage: 2, escalation: 0, legitimacy: -1, councilTrust: -2, civilianRisk: 0 },
          },
          strain: {
            tracker: 'legitimacy',
            below: 4,
            effectsByRole: {
              rfk: { leverage: 1, escalation: 2, legitimacy: -1, councilTrust: -2, civilianRisk: 1 },
              dobrynin: { leverage: 0, escalation: 2, legitimacy: -2, councilTrust: -2, civilianRisk: 1 },
              uthant: { leverage: 1, escalation: 1, legitimacy: -2, councilTrust: -2, civilianRisk: 1 },
            },
            note: 'A deadline is only a deadline if the other side believes you can carry it out. From where you presently stand it will be read as a bluff, and bluffs get tested.',
          },
        },
        /* The one line on this day that has to be earned. It is available only
           to a player who opened Proclamation 3504 and read what the quarantine
           stands on; without that it shows as unavailable, with the reason,
           rather than quietly not being there. Arguing that a measure is lawful
           is not a move you can make from having heard it called lawful. */
        {
          id: 'day4-lawful',
          label: 'Argue the ground it stands on',
          feedback: 'selective',
          requires: 'note-quarantine-law',
          requiresNote:
            'Available once you have read the quarantine proclamation — it is in your archive. The argument is in the document, not in the summary of it.',
          lineByRole: {
            rfk: 'The quarantine is not a blockade and I can tell you exactly why it is not: a congressional resolution, a vote of the American republics, named categories of materiel and an hour it began. Every one of those is on the record and none of them is mine alone.',
            dobrynin: 'Your Government drafted that proclamation carefully, and I have read it carefully. It rests on a vote of your hemisphere and it interdicts named categories only. I am prepared to treat it as what it says it is, and to expect it to stay that.',
            uthant: 'The measure is narrower than either of you describes it. It names its categories, it names its hour, and it instructs that force follow refusal rather than precede it. I would rather both of you argued about what it says than about what it is called.',
          },
          effectsByRole: {
            rfk: { leverage: 1, escalation: -1, legitimacy: 2, councilTrust: 2, civilianRisk: -1 },
            dobrynin: { leverage: 1, escalation: -1, legitimacy: 2, councilTrust: 1, civilianRisk: -1 },
            uthant: { leverage: 0, escalation: -2, legitimacy: 3, councilTrust: 2, civilianRisk: -1 },
          },
          note: 'Legality is the one argument in this room that costs nothing and is available to whoever has actually read the document.',
        },
      ],
    },

    {
      kind: 'consequence',
      id: 'negotiation-consequence',
      after: 'negotiation',
      eyebrow: 'What the table did with it',
      variants: {
        selective: {
          text: 'You chose which of two letters to believe. It is the cheapest settlement available and it rests entirely on the other government preferring to be taken at its better word — which it may, and which it has not yet said it will.',
          unlocks: 'note-two-letters',
        },
        trade: {
          text: 'The bargain is now a trade rather than a demand, which makes it far likelier to be accepted and far harder to describe afterwards. Somebody will have to explain to a third country why its security was the currency.',
          unlocks: 'note-jupiters',
        },
        delay: {
          text: 'You asked for clarity before committing. It is the responsible position and it costs the one thing nobody has: the aircraft was lost this morning, and the argument for answering it does not pause while Moscow decides what it meant.',
          unlocks: 'note-two-letters',
        },
        ultimatum: {
          text: 'A term has been placed on the offer. It concentrates both governments and it removes the possibility of quietly letting the deadline pass, which is a thing both of you might have wanted by tomorrow evening.',
          unlocks: 'note-pledge',
        },
      },
    },

    /* --------------------------------------------------- Assemble the bargain */
    /* Back in the room, afterwards. The adviser you overruled — whichever of
       the two you did not take stands furthest from what you actually did.
       `after` names the negotiation so this step receives its resolved choice
       the same way a consequence does. */
    {
      kind: 'reckoning',
      id: 'reckoning',
      after: 'negotiation',
      eyebrow: 'The room, again',
      place: 'The same table, an hour later. Nobody has left and nothing has been decided twice.',
      weighLabel: 'What they want on the record',
    },

    {
      kind: 'draftingAssemble',
      id: 'bargain',
      eyebrow: 'Drafting — the settlement',
      prompt:
        'Your statement needs the terms themselves. Build them in three parts: what you acknowledge, what you undertake, and what you require in return. Only the third carries a cost.',
      emptyText: 'Begin with what you are prepared to acknowledge.',
      slots: [
        {
          id: 'acknowledge',
          prompt: 'What you acknowledge',
          pendingText: '…what you acknowledge,',
          optionsByRole: {
            rfk: [
              { id: 'rfk4a-concern', text: 'Recognising that the installations in Cuba are a matter of legitimate concern to this Council,' },
              { id: 'rfk4a-sovereign', text: 'Recognising that the Republic of Cuba is entitled to security within its own territory,' },
              { id: 'rfk4a-mutual', text: 'Recognising that weapons sited close to any State’s borders reduce the time available to its government to think,' },
            ],
            dobrynin: [
              { id: 'dob4a-alarm', text: 'Recognising that the deployment in Cuba was undertaken without notice and has caused genuine alarm,' },
              { id: 'dob4a-sovereign', text: 'Recognising that the Republic of Cuba is entitled to security within its own territory,' },
              { id: 'dob4a-mutual', text: 'Recognising that weapons sited close to any State’s borders reduce the time available to its government to think,' },
            ],
            uthant: [
              { id: 'uth4a-danger', text: 'Recognising that the present course places civilian populations at a risk neither Government has sought,' },
              { id: 'uth4a-third', text: 'Recognising that arrangements affecting the territory of a Member State require the consent of that State,' },
              { id: 'uth4a-mutual', text: 'Recognising that weapons sited close to any State’s borders reduce the time available to its government to think,' },
            ],
          },
        },
        {
          id: 'undertake',
          prompt: 'What you undertake',
          pendingText: '…what you undertake,',
          optionsByRole: {
            rfk: [
              { id: 'rfk4u-noinvade', text: 'this Government will give an assurance against invasion of the island,' },
              { id: 'rfk4u-quarantine', text: 'this Government will lift the quarantine upon the commencement of withdrawal,' },
              { id: 'rfk4u-consult', text: 'this Government will consult its allies before any arrangement affecting their territory,' },
            ],
            dobrynin: [
              { id: 'dob4u-withdraw', text: 'the Soviet Government will withdraw the weapons under international observation,' },
              { id: 'dob4u-nofurther', text: 'the Soviet Government will introduce no further armaments while discussions continue,' },
              { id: 'dob4u-consult', text: 'the Soviet Government will seek the consent of the Cuban Government to any inspection,' },
            ],
            uthant: [
              { id: 'uth4u-observe', text: 'the United Nations will provide observers acceptable to all parties concerned,' },
              { id: 'uth4u-convene', text: 'the Secretary-General will convene the Governments concerned and remain in continuous session,' },
              { id: 'uth4u-report', text: 'the Secretary-General will report to the Council on the conduct of every party,' },
            ],
          },
        },
        {
          id: 'require',
          prompt: 'What you require in return. This is the half that costs.',
          pendingText: '…and what you require in return.',
          optionsByRole: {
            rfk: [
              {
                id: 'rfk4r-forthwith',
                label: 'Immediate dismantling',
                text: 'upon the immediate dismantling of the weapons, verified before any undertaking takes effect.',
                effects: { leverage: 2, escalation: 1, legitimacy: 0, councilTrust: -2, civilianRisk: 1 },
              },
              {
                id: 'rfk4r-verified',
                citation: {
                  archiveId: 'jfk-reply-27-oct',
                  quote:
                    'to remove promptly the quarantine measures now in effect and… to give assurances against an invasion of Cuba',
                },
                label: 'Verified removal',
                text: 'upon the verified removal of the weapons concerned, the two steps proceeding together.',
                effects: { leverage: 0, escalation: -2, legitimacy: 2, councilTrust: 2, civilianRisk: -2 },
              },
              {
                id: 'rfk4r-turkey',
                label: 'A withdrawal in return',
                text: 'upon withdrawal of the weapons, this Government undertaking a comparable withdrawal elsewhere in due course and without public announcement.',
                effects: { leverage: -2, escalation: -2, legitimacy: -1, councilTrust: 1, civilianRisk: -2 },
              },
            ],
            dobrynin: [
              {
                id: 'dob4r-lift',
                citation: {
                  archiveId: 'jfk-reply-27-oct',
                  quote:
                    'You would agree to remove these weapons systems from Cuba under appropriate United Nations observation and supervision',
                },
                label: 'The quarantine lifted',
                text: 'upon the lifting of the quarantine and an undertaking against invasion given publicly.',
                effects: { leverage: 2, escalation: 1, legitimacy: -1, councilTrust: -1, civilianRisk: 1 },
              },
              {
                id: 'dob4r-mutual',
                label: 'Reciprocal withdrawal',
                text: 'upon a reciprocal undertaking, neither withdrawal preceding the other.',
                effects: { leverage: 0, escalation: -2, legitimacy: 2, councilTrust: 2, civilianRisk: -2 },
              },
              {
                id: 'dob4r-quiet',
                label: 'Assurance, quietly',
                text: 'upon an assurance against invasion, the question of other deployments being reserved for later and quieter discussion.',
                effects: { leverage: -1, escalation: -2, legitimacy: 1, councilTrust: 1, civilianRisk: -2 },
              },
            ],
            uthant: [
              {
                id: 'uth4r-suspend',
                citation: {
                  archiveId: 'proclamation-3504',
                  quote:
                    'force shall not be used except in case of failure or refusal to comply with directions… In any case, force shall be used only to the extent necessary',
                },
                label: 'Both measures suspended',
                text: 'upon both Governments suspending the measures now in force for the duration of the discussions.',
                effects: { leverage: 1, escalation: -2, legitimacy: 1, councilTrust: 1, civilianRisk: -2 },
              },
              {
                id: 'uth4r-consent',
                label: 'Cuban consent',
                text: 'upon the consent of the Government of Cuba, which shall be sought and not assumed.',
                effects: { leverage: -2, escalation: -1, legitimacy: 2, councilTrust: 2, civilianRisk: -1 },
              },
              {
                id: 'uth4r-report',
                label: 'Compliance reported',
                text: 'upon both Governments accepting that any failure to comply will be reported to this Council by name.',
                effects: { leverage: 2, escalation: 0, legitimacy: 1, councilTrust: -2, civilianRisk: 0 },
              },
            ],
          },
        },
      ],
    },

    {
      kind: 'summary',
      id: 'summary',
      eyebrow: 'End of day',
      body: [
        'Terms exist. They are written down, they have been said aloud to people who can act on them, and they are not yet agreed by anyone whose agreement is required. Two governments have moved a very long way in a single day, and two others have been told what has been decided about them.',
        'The aircraft is still down and nobody has answered for it. That question was not settled today; it was postponed, and the postponement is the only reason anything else was possible.',
      ],
      foreshadow:
        'Tomorrow it is accepted or it is not, and whichever happens, it happens before the day is out.',
      advanceLabel: 'Advance to Day 5',
    },
  ],
};

export default day4;
