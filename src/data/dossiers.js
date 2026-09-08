/* The information layer: the notes a student unlocks into their file.

   These are deliberately short. The design packet is explicit that a dossier
   should help the player interpret the next choice more intelligently, not
   store background for its own sake — so each one ends on what it changes
   about how the player should read the room.

   Written for a reader of fourteen to sixteen on first read, after a teacher
   found the first draft "slightly impenetrable" (its opening line was "A
   public position taken at strength is rarely heard as a single statement.
   It is read as a floor"). The rule: one idea per sentence, and no metaphor
   without its plain meaning beside it. A few metaphors are kept on purpose —
   a floor, two clocks, a promise worth the cost of breaking it — because the
   sensibility of the room is part of what is being taught. */

export const DOSSIERS = [
  {
    id: 'note-opposing-response',
    kind: 'intelligence',
    label: 'Opposing power response',
    title: 'How firmness is being read on the other side',
    body: [
      'When a government speaks firmly in public, the other side does not hear one statement. It hears a minimum — a floor — the least that government can now accept without looking weak at home.',
      'Right now each side is trying to work out what the other cannot back down from.',
    ],
    soWhat:
      'Firm words make you look serious, but they also tie your hands. Whatever you say today becomes the position you will be expected to hold tomorrow.',
  },
  {
    id: 'note-un-procedure',
    kind: 'procedure',
    label: 'UN procedure',
    title: 'What the Council can and cannot do',
    body: [
      'The Security Council can call a meeting, send investigators, and propose solutions. It cannot force a permanent member to do anything, and both superpowers can veto any resolution.',
      'Its power in this crisis is not enforcement. It is to be a place where a government can give ground without looking as if it has surrendered.',
    ],
    soWhat:
      'Procedure is slow, and slowness is the point. A process that delays a decision may be the only thing that leaves room for a good one.',
  },
  {
    id: 'note-backchannel',
    kind: 'channel',
    label: 'Back-channel',
    title: 'The private line',
    body: [
      'Alongside the public argument runs a quieter one: unofficial meetings, trusted go-betweens, and messages that either side can later deny sending.',
      'The channel works because nothing said in it is binding. That also means nothing said in it is guaranteed.',
    ],
    soWhat:
      'A private opening lets both sides test a deal that neither could yet propose in public. Because it can be denied, it can also be broken.',
  },
  {
    id: 'note-geography',
    kind: 'geography',
    label: 'Strategic geography',
    title: 'Why proximity changed the calculation',
    body: [
      'Medium-range missiles in Cuba could reach much of the south-eastern United States within a few minutes of launch. Longer-range types would reach considerably further.',
      'The balance of weapons between the two sides did not obviously change. The warning time did.',
    ],
    soWhat:
      'The crisis is driven less by how many weapons there are than by the minutes between launch and impact — and by what those minutes do to the people who have to decide.',
  },
  /* ------------------------------------------------------------- Day 2 */
  {
    id: 'note-quarantine-word',
    kind: 'procedure',
    label: 'Quarantine',
    title: 'Why not the word blockade',
    body: [
      'In international law a blockade is an act of war. Calling this one a quarantine was not a way of softening the policy. It placed the policy carefully: a step short of war, announced as such, and defensible in front of the United Nations.',
      'The ships were still stopped. The word decided what stopping them meant.',
    ],
    soWhat:
      'The words here are not decoration. They are the part of the policy that decides what the other side is allowed to do in reply.',
  },
  {
    id: 'note-chamber',
    kind: 'procedure',
    label: 'The chamber',
    title: 'What a public session can and cannot settle',
    body: [
      'Nothing said in the Council will remove a missile. What the chamber does is fix each side’s position in front of witnesses, and make it costly to be caught lying.',
      'That is its value to a government under pressure, and its danger: whatever is said there cannot afterwards be taken back.',
    ],
    soWhat:
      'Speak in the chamber to pin the other side down, and accept that you are pinning yourself down by the same act.',
  },
  {
    id: 'note-channel-limits',
    kind: 'channel',
    label: 'Channel limits',
    title: 'What a back-channel can carry',
    body: [
      'A private channel can carry an intention, a warning, or a question that could not survive being asked in public. It cannot carry a guarantee.',
      'Everything passed through it can be denied. That is why both sides can afford to use it — and why neither can rely on it.',
    ],
    soWhat:
      'Use the channel to find out what is possible. Do not use it to settle anything you would later need to prove.',
  },
  {
    id: 'memo-aide-day2',
    kind: 'memo',
    label: 'Aide memo',
    title: 'The record is now the constraint',
    body: [
      'Until yesterday both governments could still adjust their positions quietly. Since the broadcast, every change has to be explained to a public that was not in the room before.',
    ],
    soWhat:
      'Any settlement from here has to be one that both governments can describe to their own people without calling it a defeat.',
  },
  /* ------------------------------------------------------------- Day 3 */
  {
    id: 'note-operational',
    kind: 'intelligence',
    label: 'Readiness',
    title: 'What the quarantine does not reach',
    body: [
      'The quarantine line stops ships that have not yet arrived. It does nothing about what is already on the island, and this morning’s photographs show work at the missile sites continuing at the same pace.',
      'Every day the quarantine holds, the argument for patience gets weaker, because the thing everyone is waiting out is being finished.',
    ],
    soWhat:
      'Slow pressure only works against a problem that is not itself on a deadline. This one is.',
  },
  {
    id: 'note-leverage',
    kind: 'channel',
    label: 'Leverage',
    title: 'What leverage is for',
    body: [
      'Leverage — an advantage you can use to press the other side — is worth nothing until it is spent. The question today is not whether you have it, but what you would trade it for, and whether the other side can afford to accept.',
      'A deal the other government cannot survive agreeing to is not available at any price.',
    ],
    soWhat:
      'Ask what the other side needs to be able to say afterwards. That, more than the balance of force, usually decides whether a deal exists.',
  },
  {
    id: 'memo-aide-day3',
    kind: 'memo',
    label: 'Aide memo',
    title: 'Two clocks, running at different speeds',
    body: [
      'Diplomacy takes days. Finishing the missile sites also takes days. Whichever finishes first decides what the other was for.',
    ],
    soWhat:
      'Time is not neutral here. It is working for one side, and it is worth being clear which.',
  },
  /* ------------------------------------------------------------- Day 4 */
  {
    id: 'note-two-letters',
    kind: 'channel',
    label: 'Two letters',
    title: 'Which text is the government',
    body: [
      'A government that sends two incompatible offers in one night is not being cunning. It is more than one thing at once. Somewhere behind the second letter is an argument the first letter lost.',
      'Choosing which letter to answer is therefore not a matter of reading the text. It is a choice about which faction in Moscow you would rather be negotiating with — on the assumption that answering one of them strengthens it.',
    ],
    soWhat:
      'You are not replying to a government. You are replying into an argument inside a government, and your reply is evidence in it.',
  },
  {
    id: 'note-jupiters',
    kind: 'intelligence',
    label: 'The Jupiters',
    title: 'Obsolete and expensive at the same time',
    body: [
      'The American missiles in Turkey are liquid-fuelled, slow to prepare and already out of date; their withdrawal had been discussed for a year on purely military grounds. As weapons they are worth very little.',
      'As a guarantee to an ally they are worth what every guarantee is worth: the same promise, kept in a different place. That is why they cannot be traded openly, and why they can be removed quietly a few months later without anyone calling it a trade.',
    ],
    soWhat:
      'The difference between a concession and a coincidence is timing and publicity. Both can be arranged if the two sides want them to be.',
  },
  {
    id: 'note-pledge',
    kind: 'procedure',
    label: 'The pledge',
    title: 'What an undertaking not to invade is worth',
    body: [
      'A promise made by one administration binds it only while it is in office, and both governments know that. It cannot be enforced, and it will not be written into any treaty.',
      'It is still the thing being asked for, because a public promise is expensive to break — not impossible, expensive. That is the whole of the security on offer.',
    ],
    soWhat:
      'The settlement rests on a promise worth exactly the cost of breaking it. Deciding whether that is enough is the real question.',
  },
  {
    id: 'memo-aide-day4',
    kind: 'memo',
    label: 'Aide memo',
    title: 'The people who are not in the room',
    body: [
      'Two governments are settling the terms. Two others — Cuba and Turkey — own the territory and the bases being bargained away, and neither has been asked. Everything agreed today has to be carried out by somebody who was not consulted.',
    ],
    soWhat:
      'A settlement is not finished when the two leaders agree. It is finished when the people who have to carry it out accept that they were part of it.',
  },
  /* ------------------------------------------------------------- Day 5 */
  {
    id: 'note-waiting',
    kind: 'procedure',
    label: 'Waiting',
    title: 'The part nobody writes down',
    body: [
      'Most of a crisis is not decision. It is the gap between having done what you can and finding out whether it worked — spent by people who cannot leave the building and have nothing left to contribute.',
      'It is also when mistakes get made, because waiting is uncomfortable and there is always somebody willing to fill the gap with an action.',
    ],
    soWhat:
      'The discipline at the end is not choosing well. It is not choosing again just because waiting is hard.',
  },
  {
    id: 'note-assurance',
    kind: 'channel',
    label: 'Assurance',
    title: 'What a private word is worth',
    body: [
      'An assurance given in a room with no record cannot be enforced, shown to anyone, or quoted. Its whole value is the reputation of the person giving it, and the belief that they can deliver what they promise.',
      'That is why it is the last tool available, and why it works only for people who have spent the week being careful about what they said.',
    ],
    soWhat:
      'Everything you did earlier decides whether this works now. That is not a game mechanic; it is what a reputation is.',
  },
  {
    id: 'memo-aide-day5',
    kind: 'memo',
    label: 'Aide memo',
    title: 'Nobody planned for it going well',
    body: [
      'Every hour of preparation this week has gone on what to do if this fails. If the answer is yes, the most delicate phase begins with no plan, run by people who have not slept, improvising the part that has to be got exactly right.',
    ],
    soWhat:
      'Success has its own requirements, and nobody has prepared for them. Assume the first hour after agreement is the one most likely to undo it.',
  },
  {
    id: 'memo-aide',
    kind: 'memo',
    label: 'Aide memo',
    title: 'Public statements are already shaping private assumptions',
    body: [
      'Every delegation is now reading every other delegation’s public words for what they intend to do. Statements made for voters at home are being filed abroad as evidence of what the speaker will actually do.',
    ],
    soWhat:
      'There is no purely domestic statement in this crisis. Assume every audience is listening to all of them.',
  },
  {
    id: 'note-quarantine-law',
    kind: 'procedure',
    label: 'The legal ground',
    title: 'Why it is a quarantine and not a blockade',
    body: [
      'A blockade is an act of war, and declaring one alone would have handed the other side the argument. The proclamation avoids that by resting on two things the United States did not decide by itself: a resolution of Congress, and a vote of the American republics’ consultative body.',
      'Every clause in the document is doing that work. The interdiction is deliberately narrow — named categories of weapons, a stated hour, and an explicit instruction that force is used only after a ship has refused directions.',
    ],
    soWhat:
      'Having read the ground it stands on, you can argue that the quarantine is lawful rather than merely assert it. That argument is only available to someone who has read the document.',
  },
];

export const getDossier = (id) => DOSSIERS.find((entry) => entry.id === id) ?? null;
