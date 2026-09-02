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

    {
      kind: 'dialogue',
      id: 'first-response',
      eyebrow: 'First formal response',
      /* Where this happens. One line, read before anyone speaks. */
      place:
        'The room where the first words are chosen. Outside it, nobody yet knows there is anything to choose.',
      framing: [
        'The world does not yet know how far this crisis will go. Officials are watching for signs of panic, weakness, resolve, and restraint. Your first words will not solve the crisis, but they will shape how others interpret your intent.',
        'Choose your initial line carefully.',
      ],
      /* Optional, and deliberately so. Consulting an aide is one of the unlock
         triggers in the content pack, and a player who never presses it simply
         does not receive the memo. */
      adviser: {
        label: 'Consult your adviser',
        unlocks: 'memo-aide',
      },
      choicesByRole: {
        rfk: [
          {
            id: 'rfk-a',
            label: 'Firm warning',
            line: 'The United States cannot ignore a threat of this magnitude. Any response must show that such a deployment carries serious consequences.',
            feedback: 'firm',
            effects: { leverage: 2, escalation: 2, legitimacy: 0, councilTrust: -1, civilianRisk: -1 },
          },
          {
            id: 'rfk-b',
            label: 'Controlled firmness',
            line: 'The response must be serious, but it must also be disciplined. Strength without control may create the very disaster we seek to avoid.',
            feedback: 'controlled',
            effects: { leverage: 1, escalation: 1, legitimacy: 1, councilTrust: 0, civilianRisk: 0 },
          },
          {
            id: 'rfk-c',
            label: 'Quiet opening for diplomacy',
            line: 'Public strength matters, but so does preserving a channel for a solution. A position that leaves no room to move may leave no room for peace.',
            feedback: 'diplomatic',
            effects: { leverage: 0, escalation: 0, legitimacy: 1, councilTrust: 1, civilianRisk: -1 },
          },
          {
            id: 'rfk-d',
            label: 'Legitimacy and caution',
            line: 'Any response must be defensible not only strategically, but internationally. The world must see firmness joined to restraint.',
            feedback: 'legitimacy',
            effects: { leverage: 0, escalation: -1, legitimacy: 2, councilTrust: 1, civilianRisk: -1 },
          },
        ],
        dobrynin: [
          {
            id: 'dob-a',
            label: 'Reject alarmist framing',
            line: 'The language of panic is often the language of escalation. Hasty judgments will only deepen instability.',
            feedback: 'controlled',
            effects: { leverage: 1, escalation: 0, legitimacy: 1, councilTrust: 0, civilianRisk: 0 },
          },
          {
            id: 'dob-b',
            label: 'Signal strength and parity',
            line: 'Strategic pressure cannot be answered by public intimidation alone. Serious states respond to danger with balance, not theatrical threats.',
            feedback: 'firm',
            effects: { leverage: 2, escalation: 1, legitimacy: 0, councilTrust: -1, civilianRisk: 1 },
          },
          {
            id: 'dob-c',
            label: 'Test reciprocal restraint',
            line: 'If there is to be restraint, it must be mutual. One-sided demands invite resistance, but reciprocal caution may still preserve order.',
            feedback: 'diplomatic',
            effects: { leverage: 1, escalation: 0, legitimacy: 1, councilTrust: 1, civilianRisk: -1 },
          },
          {
            id: 'dob-d',
            label: 'Preserve ambiguity',
            line: 'At moments like this, certainty can become a trap. It may be wiser to speak carefully until intentions are clearer.',
            feedback: 'diplomatic',
            effects: { leverage: 0, escalation: -1, legitimacy: 0, councilTrust: 1, civilianRisk: -1 },
          },
        ],
        uthant: [
          {
            id: 'uth-a',
            label: 'Immediate call for restraint',
            line: 'The first duty of states at such a moment is restraint. Escalatory rhetoric may become as dangerous as the weapons in dispute.',
            feedback: 'legitimacy',
            effects: { leverage: 0, escalation: -1, legitimacy: 2, councilTrust: 1, civilianRisk: -1 },
          },
          {
            id: 'uth-b',
            label: 'Procedure and verification',
            line: 'The crisis demands more than accusation. It demands a process that can test facts, reduce suspicion, and slow the rush toward confrontation.',
            feedback: 'legitimacy',
            effects: { leverage: 0, escalation: -1, legitimacy: 2, councilTrust: 2, civilianRisk: -1 },
          },
          {
            id: 'uth-c',
            label: 'Offer mediation',
            line: 'If each side fears humiliation, then diplomacy must create another path. Mediation may be the only way to preserve both peace and dignity.',
            feedback: 'diplomatic',
            effects: { leverage: 1, escalation: 0, legitimacy: 1, councilTrust: 2, civilianRisk: -1 },
          },
          {
            id: 'uth-d',
            label: 'Warn against hardened positions',
            line: 'Once governments commit themselves fully in public, compromise becomes harder. The danger today lies not only in missiles, but in irreversible words.',
            feedback: 'legitimacy',
            effects: { leverage: 0, escalation: 0, legitimacy: 2, councilTrust: 1, civilianRisk: 0 },
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
          fragment:
            'The installation of offensive weapons in Cuba is an unacceptable act that demands immediate correction.',
        },
        {
          id: 'measured',
          label: 'Measured but firm',
          description:
            'Acknowledge the seriousness of the threat while preserving disciplined control.',
          fragment:
            'The developments in Cuba are of the gravest seriousness, and they require a response that is firm, deliberate, and proportionate.',
        },
        {
          id: 'procedural',
          label: 'Procedural and investigative',
          description:
            'Emphasise verification, process, and the need to establish a credible path forward.',
          fragment:
            'The facts in Cuba must be established by means all parties can credit, and a process to verify them should begin without delay.',
        },
        {
          id: 'deescalatory',
          label: 'De-escalatory and diplomatic',
          description:
            'Reduce public temperature and protect room for future negotiation.',
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
