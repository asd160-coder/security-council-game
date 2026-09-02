/* Day 2 — Public pressure and private channels.

   The crisis becomes public. The quarantine is announced, the Council
   convenes, and every position taken from here is taken in front of witnesses.

   Where Day 1 gave each role a different version of the same decision, Day 2
   separates them properly: the public scene is one room the three of them sit
   in differently, and the private scene is three different rooms. Kennedy
   meets Dobrynin; Dobrynin answers Moscow with instructions that have not
   arrived; U Thant approaches both sides with an appeal neither asked for.
   Those are the real back-channels of that week, and they are what make the
   roles diverge rather than share a scene with swapped labels. */

const day2 = {
  id: 'day2',
  number: 2,
  title: 'Public pressure and private channels',
  dateline: 'Tuesday, 23 October 1962',
  mapState: 'quarantine',

  steps: [
    {
      kind: 'briefing',
      id: 'update',
      /* The address and the proclamation that followed it the next morning.
         Examining the proclamation files the legal ground, which is what opens
         the lawfulness line in Day 4's negotiation. */
      archiveIds: ['jfk-address', 'proclamation-3504'],
      body: [
        'The crisis is no longer private. In a broadcast heard across the world, the United States has disclosed the installations and announced a naval quarantine of Cuba. Soviet vessels are already at sea. The Security Council has been convened.',
        'Until last night, both governments could still move quietly. Every position taken from this morning is taken in front of an audience that will remember it.',
      ],
      radioCaption:
        'The address that made the crisis public, and narrowed what either government could quietly agree to afterwards.',
    },

    /* ------------------------------------------------ The public chamber */
    {
      kind: 'dialogue',
      id: 'public-exchange',
      eyebrow: 'Security Council · on the record',
      /* Where this happens. One line, read before anyone speaks. */
      place:
        'The chamber. Cameras, a horseshoe table, and every word carried live to capitals that will read it differently.',
      framing: [
        'The chamber is full and the cameras are running. Nothing said here will move a missile. What is said here will fix what each government can afterwards be held to.',
        'You are called to speak.',
      ],
      adviser: {
        label: 'Consult your adviser',
        unlocks: 'memo-aide-day2',
      },
      choicesByRole: {
        rfk: [
          {
            id: 'rfk2-a',
            label: 'Present the evidence',
            line: 'We do not ask the Council to take our word. The photographs exist, they are dated, and they will be laid before this body so that every delegation may judge for itself.',
            feedback: 'evidence',
            effects: { leverage: 2, escalation: 0, legitimacy: 2, councilTrust: 1, civilianRisk: 0 },
          },
          {
            id: 'rfk2-b',
            label: 'Justify the quarantine in law',
            line: 'This is a quarantine, not a blockade, and the distinction is deliberate. It is a measure short of war, and it will be defended as such before this Council.',
            feedback: 'legalism',
            effects: { leverage: 1, escalation: 0, legitimacy: 2, councilTrust: 2, civilianRisk: -1 },
          },
          {
            id: 'rfk2-c',
            label: 'Warn about the ships',
            line: 'Vessels approaching the quarantine line will be stopped. We would prefer that no ship test it, and we say so now rather than afterwards.',
            feedback: 'warning',
            effects: { leverage: 2, escalation: 2, legitimacy: 0, councilTrust: -1, civilianRisk: -2 },
          },
          {
            id: 'rfk2-d',
            label: 'Leave the door open',
            line: 'Nothing announced last night forecloses a settlement. If these weapons are withdrawn under verification, there is no quarrel here that requires anyone to be humiliated.',
            feedback: 'opening',
            effects: { leverage: 0, escalation: -1, legitimacy: 1, councilTrust: 2, civilianRisk: -1 },
          },
        ],
        dobrynin: [
          {
            id: 'dob2-a',
            label: 'Challenge the evidence',
            line: 'This Council is shown photographs and told what they contain. Interpretation is not proof, and a body that accepts one delegation’s reading of its own pictures has stopped deliberating.',
            feedback: 'evidence',
            effects: { leverage: 2, escalation: 1, legitimacy: 0, councilTrust: -2, civilianRisk: 0 },
          },
          {
            id: 'dob2-b',
            label: 'Attack the quarantine in law',
            line: 'A fleet stopping ships on the high seas is not made lawful by the name given to it. Whatever this measure is called, it is an interference with navigation, and this Council should say so.',
            feedback: 'legalism',
            effects: { leverage: 1, escalation: 1, legitimacy: 2, councilTrust: 1, civilianRisk: 0 },
          },
          {
            id: 'dob2-c',
            label: 'Warn against interception',
            line: 'Our vessels sail lawfully and will continue on their course. Any government that fires on them will have chosen that outcome, and will not be able to say afterwards that it was surprised.',
            feedback: 'warning',
            effects: { leverage: 2, escalation: 2, legitimacy: 0, councilTrust: -1, civilianRisk: -2 },
          },
          {
            id: 'dob2-d',
            label: 'Shift to the wider question',
            line: 'The Council is invited to consider only weapons in Cuba. It might also consider the weapons already sited within reach of my country’s cities, and ask whether one is more tolerable than the other.',
            feedback: 'opening',
            effects: { leverage: 1, escalation: 0, legitimacy: 2, councilTrust: 1, civilianRisk: -1 },
          },
        ],
        uthant: [
          {
            id: 'uth2-a',
            label: 'Ask both to suspend',
            line: 'I ask the two governments concerned for a voluntary suspension: no further arms to Cuba, and no interception of shipping, for a period long enough to permit negotiation.',
            feedback: 'opening',
            effects: { leverage: 1, escalation: -2, legitimacy: 2, councilTrust: 2, civilianRisk: -2 },
          },
          {
            id: 'uth2-b',
            label: 'Offer verification',
            line: 'If the question before this Council is what is present in Cuba, the United Nations can establish it. Neutral observation is slower than accusation, but it is harder to dismiss.',
            feedback: 'evidence',
            effects: { leverage: 1, escalation: -1, legitimacy: 2, councilTrust: 2, civilianRisk: -1 },
          },
          {
            id: 'uth2-c',
            label: 'Address the smaller state',
            line: 'A third country is the ground on which this is being conducted, and has not been asked. Whatever is agreed here, it cannot be an arrangement made over Cuba rather than with it.',
            feedback: 'sovereignty',
            effects: { leverage: 0, escalation: 0, legitimacy: 2, councilTrust: 1, civilianRisk: -1 },
          },
          {
            id: 'uth2-d',
            label: 'Name the danger plainly',
            line: 'The Council should be clear about what is being risked. Not advantage, not standing — the lives of a very large number of people who have no part in this dispute.',
            feedback: 'warning',
            effects: { leverage: -1, escalation: -1, legitimacy: 2, councilTrust: 1, civilianRisk: -2 },
          },
        ],
      },
    },

    {
      kind: 'consequence',
      id: 'public-consequence',
      after: 'public-exchange',
      eyebrow: 'How the chamber received it',
      variants: {
        evidence: {
          text: 'The exchange turns on what can be proved. Delegations that came to be persuaded now have something to weigh, and the argument has moved from assertion toward evidence — which favours whoever is more certain of their facts.',
          unlocks: 'note-chamber',
        },
        legalism: {
          text: 'The dispute becomes a legal one, and legal arguments are slower than military ones. That suits any party who benefits from time, and frustrates any party who does not.',
          unlocks: 'note-quarantine-word',
        },
        warning: {
          text: 'A warning delivered in public cannot be quietly withdrawn. Both governments now have less room to be surprised, and less room to retreat.',
          unlocks: 'note-chamber',
        },
        opening: {
          text: 'You have left a route open in front of witnesses. Some delegations read that as seriousness about a settlement; others begin calculating what else might be conceded.',
          unlocks: 'note-channel-limits',
        },
        sovereignty: {
          text: 'Raising the smaller state changes who the argument is about. It wins standing among delegations that fear being disposed of by larger powers, and irritates both principals.',
          unlocks: 'card-cuba',
        },
      },
    },

    /* ------------------------------------------------ The private channel */
    /* Three genuinely different rooms. The opening probes; the reply is keyed
       to it; the follow-up is the decision and carries the effects. */
    {
      kind: 'exchange',
      id: 'back-channel',
      eyebrow: 'Private channel · not for the record',
      /* Where this happens. One line, read before anyone speaks. */
      place:
        'Somewhere neither government will confirm afterwards. No minute, no aide, no third person.',
      openingPrompt: 'How you open',
      followPrompt: 'How you answer',
      counterpartByRole: {
        /* `presence` chooses how the person opposite is shown, and `roleRef`
           points at the seat whose portrait to use. See src/data/scene.js —
           only figures who are also playable seats have a likeness. */
        rfk: {
          name: 'Anatoly Dobrynin',
          title: 'Soviet Ambassador',
          presence: 'principal',
          roleRef: 'dobrynin',
        },
        dobrynin: {
          name: 'Robert Kennedy',
          title: 'Attorney General',
          presence: 'principal',
          roleRef: 'rfk',
        },
        uthant: {
          name: 'Both missions',
          title: 'Approached separately, within the hour',
          presence: 'body',
        },
      },
      framingByRole: {
        rfk: [
          'A meeting that is not on either schedule. Whatever is said here can be denied by both of you tomorrow, which is the only reason it can be said at all.',
          'He has been asked before whether there are offensive weapons in Cuba, and has said there are not.',
        ],
        dobrynin: [
          'He comes without an appointment, which tells you the matter is real. You have cabled Moscow twice and had no instructions back.',
          'You have previously assured this man that there are no offensive weapons in Cuba. You were not told otherwise.',
        ],
        uthant: [
          'Neither delegation asked for this. You go to both within the hour, separately, and say very nearly the same thing to each — which is the whole of your standing, and the whole of your risk.',
          'If you are seen to lean once, you will not be trusted by either again.',
        ],
      },
      openingsByRole: {
        rfk: [
          {
            id: 'rfk2p-probe',
            label: 'Ask him directly',
            line: 'I am going to ask you once more, and I would like you to think before answering. Are there offensive weapons in Cuba?',
            reply:
              'He does not answer quickly. When he does, it is careful: he has received no information from his government that would let him say anything different from what he has said before — and he does not say that nothing is there.',
            follow: [
              {
                id: 'rfk2f-press',
                label: 'Press the point',
                line: 'Then you have been used by your own government, and you should know it. I am showing you what our aircraft photographed.',
                feedback: 'confront',
                effects: { leverage: 2, escalation: 1, legitimacy: 0, councilTrust: -1, civilianRisk: 0 },
              },
              {
                id: 'rfk2f-spare',
                label: 'Let it stand',
                line: 'I will take that as an honest answer from you, and a dishonest one from Moscow. I would rather deal with the second problem than lose you over the first.',
                feedback: 'trust',
                effects: { leverage: 1, escalation: -1, legitimacy: 1, councilTrust: 2, civilianRisk: -1 },
              },
            ],
          },
          {
            id: 'rfk2p-warn',
            label: 'Deliver the warning',
            line: 'I have not come to negotiate. I have come so that no one in Moscow can say afterwards that they did not understand what will happen if those sites become operational.',
            reply:
              'He receives it without protest and writes nothing down. He asks one question: whether the message carries the President’s authority, or whether it is the opinion of a brother.',
            follow: [
              {
                id: 'rfk2f-authority',
                label: 'Claim the authority',
                line: 'It carries his authority. You may report it in those terms, and I would prefer that you did.',
                feedback: 'confront',
                effects: { leverage: 2, escalation: 2, legitimacy: 0, councilTrust: 0, civilianRisk: 1 },
              },
              {
                id: 'rfk2f-personal',
                label: 'Keep it personal',
                line: 'Report it as coming from someone who sees him every hour and who is telling you the truth about what he is being urged to do.',
                feedback: 'ambiguity',
                effects: { leverage: 1, escalation: 0, legitimacy: 0, councilTrust: 2, civilianRisk: -1 },
              },
            ],
          },
          {
            id: 'rfk2p-offer',
            label: 'Test what is possible',
            line: 'Suppose those sites came out under inspection. What would your government need to be able to say about it afterwards?',
            reply:
              'He does not dismiss the question, which is itself an answer. He observes, without committing to anything, that his government has often noted the presence of American missiles on its own borders — and that a country which had received an assurance about invasion would have less need of defences.',
            follow: [
              {
                id: 'rfk2f-explore',
                label: 'Follow it',
                line: 'An assurance of that kind is not impossible. It would have to be arrived at in the right order, and it could not look like payment.',
                feedback: 'settlement',
                effects: { leverage: 1, escalation: -2, legitimacy: 1, councilTrust: 2, civilianRisk: -2 },
              },
              {
                id: 'rfk2f-refuse',
                label: 'Close it down',
                line: 'Weapons placed in secret are not a bargaining position. They come out first, and what follows can be discussed after they are gone.',
                feedback: 'confront',
                effects: { leverage: 2, escalation: 1, legitimacy: 1, councilTrust: -1, civilianRisk: 1 },
              },
            ],
          },
        ],
        dobrynin: [
          {
            id: 'dob2p-hold',
            label: 'Hold the line you were given',
            line: 'I have told you what my government has told me. If you have evidence that contradicts it, then it contradicts what I was also given to believe.',
            reply:
              'He looks at you for a moment longer than is comfortable, and says he believes you — which is worse than being disbelieved, because it means he has concluded that Moscow lied to its own ambassador.',
            follow: [
              {
                id: 'dob2f-admit',
                label: 'Let the implication stand',
                line: 'Then you understand my position better than my instructions do. I will report this conversation exactly as it occurred.',
                feedback: 'trust',
                effects: { leverage: 0, escalation: -1, legitimacy: 1, councilTrust: 2, civilianRisk: -1 },
              },
              {
                id: 'dob2f-deflect',
                label: 'Turn it back',
                line: 'What a government tells its ambassador is its own affair. What concerns this one is a fleet stopping ships that have broken no law.',
                feedback: 'confront',
                effects: { leverage: 2, escalation: 1, legitimacy: 1, councilTrust: -1, civilianRisk: 0 },
              },
            ],
          },
          {
            id: 'dob2p-parity',
            label: 'Raise the obvious comparison',
            line: 'Before we discuss what is ninety miles from your coast, perhaps you will tell me what is stationed on my country’s western frontier, and by whose leave.',
            reply:
              'He does not pretend not to understand. He says that comparison will be made by others soon enough, and that in his judgement it is a matter which could be dealt with — but that it cannot be dealt with under a public ultimatum without destroying the government that agreed to it.',
            follow: [
              {
                id: 'dob2f-press-parity',
                label: 'Press for it now',
                line: 'Then let it be dealt with. My government will find it easier to be reasonable about Cuba if it can point to something in return.',
                feedback: 'settlement',
                effects: { leverage: 2, escalation: -1, legitimacy: 1, councilTrust: 1, civilianRisk: -1 },
              },
              {
                id: 'dob2f-bank',
                label: 'File it for later',
                line: 'I will report that you did not deny it. That is enough for today.',
                feedback: 'ambiguity',
                effects: { leverage: 1, escalation: -1, legitimacy: 0, councilTrust: 2, civilianRisk: -1 },
              },
            ],
          },
          {
            id: 'dob2p-danger',
            label: 'Speak about the ships',
            line: 'Your quarantine begins at dawn. My government has not told me what its captains have been ordered to do. I am telling you that I do not know, and that this should frighten you.',
            reply:
              'He goes very quiet. He tells you that the same uncertainty exists on his side of the water, that men are being asked to make decisions at sea that ought to be made in capitals, and that neither of you can guarantee what happens at the line.',
            follow: [
              {
                id: 'dob2f-slow',
                label: 'Ask for time at the line',
                line: 'Then let the line be held further out, and let the first ship stopped be one carrying nothing that matters. Give both capitals another day.',
                feedback: 'settlement',
                effects: { leverage: 0, escalation: -2, legitimacy: 1, councilTrust: 2, civilianRisk: 1 },
              },
              {
                id: 'dob2f-warn',
                label: 'Make it a warning',
                line: 'Then you should understand what you have begun. If a Soviet ship is fired upon, what follows will not be decided by either of us.',
                feedback: 'confront',
                effects: { leverage: 2, escalation: 2, legitimacy: 0, councilTrust: -1, civilianRisk: -1 },
              },
            ],
          },
        ],
        uthant: [
          {
            id: 'uth2p-pause',
            label: 'Propose a pause to both',
            line: 'I ask each of you for the same thing: two or three weeks in which no arms arrive and no ship is stopped. I ask it of you separately so that neither can be said to have conceded to the other.',
            reply:
              'Both missions receive it without refusing it. Washington replies that a pause which leaves the existing sites in place is a pause that favours the other side. Moscow replies that it can accept a suspension of shipping only if the quarantine is suspended with it.',
            follow: [
              {
                id: 'uth2f-bridge',
                label: 'Take the two answers as one',
                line: 'Then each of you has told me the condition on which you would agree. I shall put those two conditions together and return them as a single proposal.',
                feedback: 'settlement',
                effects: { leverage: 2, escalation: -2, legitimacy: 2, councilTrust: 2, civilianRisk: -2 },
              },
              {
                id: 'uth2f-public',
                label: 'Put it to the Council',
                line: 'Then I shall place the proposal before the Council in public, and each government may explain there why it cannot accept a pause.',
                feedback: 'confront',
                effects: { leverage: 1, escalation: 0, legitimacy: 2, councilTrust: -1, civilianRisk: 0 },
              },
            ],
          },
          {
            id: 'uth2p-verify',
            label: 'Offer neutral inspection',
            line: 'If neither of you will accept the other’s account of what is in Cuba, accept mine. The United Nations can place observers on the island and report what they find.',
            reply:
              'Washington is interested and asks how quickly it could begin. Moscow is willing in principle. Havana is not consulted by either of them, and when you raise this, both missions treat the omission as a technicality.',
            follow: [
              {
                id: 'uth2f-sovereign',
                label: 'Insist Havana is asked',
                line: 'Observers cannot be placed on a country’s territory by agreement between two other countries. I will ask Cuba myself, and I will accept its answer.',
                feedback: 'sovereignty',
                effects: { leverage: -1, escalation: -1, legitimacy: 2, councilTrust: 2, civilianRisk: -1 },
              },
              {
                id: 'uth2f-expedite',
                label: 'Move while they are willing',
                line: 'Then let it begin at once, while both of you are still saying yes. The consent of the third party can be sought as the observers travel.',
                feedback: 'settlement',
                effects: { leverage: 2, escalation: -2, legitimacy: 0, councilTrust: 1, civilianRisk: -2 },
              },
            ],
          },
          {
            id: 'uth2p-warn-both',
            label: 'Tell each what the other fears',
            line: 'I will not carry threats between you. I will carry one fact: each of you believes the other is prepared to accept a war rather than be humiliated, and each of you is wrong about the other.',
            reply:
              'The reaction is nearly identical in both rooms, which is the most useful thing you learn all day: each side is surprised to be told that the other does not want this, and each is reluctant to be the first to act as though it were true.',
            follow: [
              {
                id: 'uth2f-report',
                label: 'Tell each side what you saw',
                line: 'I have now said the same sentence in two rooms and watched the same relief in both. I intend to tell each of you exactly that.',
                feedback: 'trust',
                effects: { leverage: 1, escalation: -2, legitimacy: 1, councilTrust: 2, civilianRisk: -2 },
              },
              {
                id: 'uth2f-hold',
                label: 'Keep it to yourself',
                line: 'I will hold what I have seen. It is worth more as something I know than as something I have said.',
                feedback: 'ambiguity',
                effects: { leverage: 2, escalation: 0, legitimacy: 0, councilTrust: 1, civilianRisk: 0 },
              },
            ],
          },
        ],
      },
    },

    {
      kind: 'consequence',
      id: 'private-consequence',
      after: 'back-channel',
      eyebrow: 'What the channel carried',
      variants: {
        confront: {
          text: 'Nothing was conceded and nothing was disguised. The other side now knows exactly where the limit is — which removes the danger of miscalculation and removes, with it, most of the room to manoeuvre.',
          unlocks: 'note-channel-limits',
        },
        trust: {
          text: 'Something passed between two people rather than two governments. It is not binding, it could not be produced as evidence, and it may be the most useful thing either of you does this week.',
          unlocks: 'note-channel-limits',
        },
        ambiguity: {
          text: 'You have left the position unclear, and kept a question in reserve. Ambiguity buys time in a private room; it is worth less every hour the public argument hardens around it.',
          unlocks: 'note-channel-limits',
        },
        settlement: {
          text: 'The shape of an exit has been spoken aloud for the first time — deniably, by people without the authority to conclude it. That is how settlements usually begin, and it is a long way from how they are usually finished.',
          unlocks: 'note-channel-limits',
        },
        sovereignty: {
          text: 'You have insisted that the country being argued over is a party to the argument. It costs you time and some patience among the principals, and it is the only position taken today that the smaller state would recognise as its own.',
          unlocks: 'card-cuba',
        },
      },
    },

    /* ------------------------------------------------- Drafting: compose */
    /* Day 1 chose a tone. This chooses a frame and then a commitment, and only
       the commitment costs anything — which is the lesson. Framing is nearly
       free; undertaking to do something is not. */
    {
      kind: 'draftingCompose',
      id: 'drafting',
      eyebrow: 'Drafting — the operative clause',
      prompt:
        'Your statement needs a second sentence. Build it in two parts: how the case is put, and how far it commits you.',
      framePrompt: 'How the case is put',
      operativePrompt: 'What it undertakes. Only this half carries a cost.',
      emptyText: 'Choose a frame, and the clause will begin here.',
      pendingText: '…and then what it undertakes.',
      framesByRole: {
        rfk: [
          { id: 'rfk2fr-evidence', text: 'Whereas the presence of offensive weapons in Cuba has been established by evidence available to this Council,' },
          { id: 'rfk2fr-law', text: 'Whereas the measures taken are measures short of war, adopted openly and defensible in law,' },
          { id: 'rfk2fr-danger', text: 'Whereas the warning time available to either government has been reduced to a matter of minutes,' },
        ],
        dobrynin: [
          { id: 'dob2fr-navigation', text: 'Whereas the stopping of vessels on the high seas is an interference with lawful navigation,' },
          { id: 'dob2fr-parity', text: 'Whereas weapons of comparable range are already stationed within reach of States not party to this dispute,' },
          { id: 'dob2fr-sovereign', text: 'Whereas every State is entitled to arrange for its own defence and that of its allies,' },
        ],
        uthant: [
          { id: 'uth2fr-danger', text: 'Whereas the present course carries a risk to civilian populations that no party to this dispute has sought,' },
          { id: 'uth2fr-process', text: 'Whereas the facts in question are capable of being established by impartial observation,' },
          { id: 'uth2fr-third', text: 'Whereas the territory concerned is that of a Member State which is not a party to the exchange between the two Governments,' },
        ],
      },
      operativesByRole: {
        rfk: [
          {
            id: 'rfk2op-demand',
            label: 'Demand',
            text: 'the installations shall be dismantled and withdrawn forthwith.',
            effects: { leverage: 2, escalation: 2, legitimacy: 0, councilTrust: -1, civilianRisk: 1 },
          },
          {
            id: 'rfk2op-verify',
            label: 'Require verification',
            text: 'the installations should be withdrawn under verification acceptable to this Council.',
            effects: { leverage: 1, escalation: 0, legitimacy: 2, councilTrust: 2, civilianRisk: -1 },
          },
          {
            id: 'rfk2op-invite',
            label: 'Invite consultation',
            text: 'the Governments concerned are invited to consult immediately on the removal of these weapons.',
            effects: { leverage: -1, escalation: -1, legitimacy: 1, councilTrust: 2, civilianRisk: -1 },
          },
        ],
        dobrynin: [
          {
            id: 'dob2op-condemn',
            label: 'Condemn',
            text: 'the quarantine shall be lifted forthwith as contrary to the freedom of the seas.',
            effects: { leverage: 2, escalation: 2, legitimacy: 1, councilTrust: -1, civilianRisk: 1 },
          },
          {
            id: 'dob2op-mutual',
            label: 'Require reciprocity',
            text: 'both Governments should undertake reciprocal steps of withdrawal, neither preceding the other.',
            effects: { leverage: 1, escalation: -1, legitimacy: 2, councilTrust: 2, civilianRisk: -1 },
          },
          {
            id: 'dob2op-suspend',
            label: 'Propose suspension',
            text: 'both Governments are invited to suspend the measures now in force for a stated period.',
            effects: { leverage: -1, escalation: -2, legitimacy: 1, councilTrust: 2, civilianRisk: -2 },
          },
        ],
        uthant: [
          {
            id: 'uth2op-appeal',
            label: 'Appeal',
            text: 'the Secretary-General appeals to both Governments to suspend the measures now in force.',
            effects: { leverage: 0, escalation: -2, legitimacy: 2, councilTrust: 2, civilianRisk: -2 },
          },
          {
            id: 'uth2op-observe',
            label: 'Propose observation',
            text: 'the United Nations should place observers on the territory concerned, with the consent of that State.',
            effects: { leverage: 1, escalation: -1, legitimacy: 2, councilTrust: 1, civilianRisk: -1 },
          },
          {
            id: 'uth2op-convene',
            label: 'Convene the parties',
            text: 'the Secretary-General shall convene the three Governments concerned without delay.',
            effects: { leverage: 2, escalation: -1, legitimacy: 1, councilTrust: 1, civilianRisk: -1 },
          },
        ],
      },
    },

    {
      kind: 'summary',
      id: 'summary',
      eyebrow: 'End of day',
      body: [
        'The crisis has been argued in public and probed in private, and the two versions of it no longer match. What was said in the chamber is now on the record. What was said in the channel exists only in the memory of the people who were there.',
        'Ships are still approaching the line. The gap between what each government can accept and what it can be seen to accept has become the whole problem.',
      ],
      foreshadow:
        'Tomorrow that gap begins to close from one side or the other, and the choice of which will not be entirely yours.',
      advanceLabel: 'Advance to Day 3',
    },
  ],
};

export default day2;
