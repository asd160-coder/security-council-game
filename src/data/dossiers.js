/* The Day 1 information layer.

   These are deliberately short. The design packet is explicit that a dossier
   should help the player interpret the next choice more intelligently, not
   store background for its own sake — so each one ends on what it changes
   about how the player should read the room.

   Only the Day 1 subset lives here. The full 8-12 dossier set belongs to
   Milestone 4. */

export const DOSSIERS = [
  {
    id: 'note-opposing-response',
    kind: 'intelligence',
    label: 'Opposing power response',
    title: 'How firmness is being read on the other side',
    body: [
      'A public position taken at strength is rarely heard as a single statement. It is read as a floor — the least the speaker can now accept without losing face.',
      'Each side is currently trying to establish what the other cannot climb down from.',
    ],
    soWhat:
      'Firm language buys seriousness at the cost of manoeuvre. What you say now becomes the position you must later be seen to hold.',
  },
  {
    id: 'note-un-procedure',
    kind: 'procedure',
    label: 'UN procedure',
    title: 'What the Council can and cannot do',
    body: [
      'The Security Council can convene, investigate, and propose. It cannot compel a permanent member, and both superpowers hold a veto.',
      'Its power in this crisis is not enforcement. It is the creation of a forum where a concession can be made without looking like a surrender.',
    ],
    soWhat:
      'Procedure is slow, and slowness is the point. A process that delays a decision may be the only thing that leaves room for one.',
  },
  {
    id: 'note-backchannel',
    kind: 'channel',
    label: 'Back-channel',
    title: 'The private line',
    body: [
      'Alongside the public exchange runs a quieter one: unofficial meetings, trusted intermediaries, messages that can be denied.',
      'The channel works precisely because nothing said in it is binding — which also means nothing said in it is guaranteed.',
    ],
    soWhat:
      'A private opening lets both sides test a settlement neither could yet propose in public. It is also deniable, and therefore fragile.',
  },
  {
    id: 'note-geography',
    kind: 'geography',
    label: 'Strategic geography',
    title: 'Why proximity changed the calculation',
    body: [
      'Medium-range missiles sited in Cuba place much of the south-eastern United States inside a short flight time. Intermediate-range types would reach considerably further.',
      'The strategic balance was not obviously altered. The warning time was.',
    ],
    soWhat:
      'The crisis is driven less by the number of weapons than by the minutes between launch and impact — and by what those minutes do to the people who must decide.',
  },
  /* ------------------------------------------------------------- Day 2 */
  {
    id: 'note-quarantine-word',
    kind: 'procedure',
    label: 'Quarantine',
    title: 'Why not the word blockade',
    body: [
      'A blockade is, in law, an act of war. Naming this one a quarantine was not a softening of the policy but a careful placing of it: a measure short of war, announced as such, and defensible before an international body.',
      'The ships were still stopped. The word decided what stopping them meant.',
    ],
    soWhat:
      'Language here is not decoration on the policy. It is the part of the policy that determines what the other side is entitled to do in reply.',
  },
  {
    id: 'note-chamber',
    kind: 'procedure',
    label: 'The chamber',
    title: 'What a public session can and cannot settle',
    body: [
      'Nothing said in the Council will remove a missile. What the chamber does is fix positions in front of witnesses, and make it costly to be caught in a falsehood.',
      'Its value to a government under pressure is the same as its danger: whatever is said there cannot afterwards be unsaid.',
    ],
    soWhat:
      'Speak in the chamber to bind the other side, and accept that you are binding yourself by the same act.',
  },
  {
    id: 'note-channel-limits',
    kind: 'channel',
    label: 'Channel limits',
    title: 'What a back-channel can carry',
    body: [
      'A private channel can carry an intention, a warning, or a question that could not survive being asked in public. It cannot carry a guarantee.',
      'Everything passed through it is deniable by design, which is exactly why both sides can afford to use it — and exactly why neither can rely on it.',
    ],
    soWhat:
      'Use the channel to find out what is possible. Do not use it to settle anything you would need to prove later.',
  },
  {
    id: 'memo-aide-day2',
    kind: 'memo',
    label: 'Aide memo',
    title: 'The record is now the constraint',
    body: [
      'Until yesterday both governments could still adjust their positions quietly. Since the broadcast, every adjustment has to be explained to an audience that was not previously in the room.',
    ],
    soWhat:
      'Any settlement from here must be one both sides can describe to their own public without calling it a defeat.',
  },
  /* ------------------------------------------------------------- Day 3 */
  {
    id: 'note-operational',
    kind: 'intelligence',
    label: 'Readiness',
    title: 'What the quarantine does not reach',
    body: [
      'The line stops what has not yet arrived. It does nothing about what is already on the island, and photography shows work at the sites continuing at the same pace.',
      'Every day the quarantine holds is a day the argument for patience gets weaker, because the thing being waited out is being finished.',
    ],
    soWhat:
      'Pressure that works slowly is only useful against a problem that is not itself on a clock. This one is.',
  },
  {
    id: 'note-leverage',
    kind: 'channel',
    label: 'Leverage',
    title: 'What leverage is for',
    body: [
      'Advantage that is never spent is not advantage; it is a position. The question on a day like this is not whether you have leverage but what you intend to exchange it for, and whether the other side can afford to accept.',
      'A settlement the other government cannot survive agreeing to is not available at any price.',
    ],
    soWhat:
      'Ask what the other side needs to be able to say afterwards. That, and not the balance of force, is usually what decides whether a deal exists.',
  },
  {
    id: 'memo-aide-day3',
    kind: 'memo',
    label: 'Aide memo',
    title: 'Two clocks, running at different speeds',
    body: [
      'Diplomacy is measured in days and the construction schedule is measured in days, and they are not the same days. Whichever finishes first decides what the other one was for.',
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
      'A state that sends two incompatible offers in one night is not being devious; it is being more than one thing. Somewhere behind the second letter is an argument the first letter lost.',
      'Choosing which to answer is therefore not a reading of the text. It is a choice about which faction you would rather be negotiating with, made on the assumption that answering one strengthens it.',
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
      'The missiles in Turkey are liquid-fuelled, slow to prepare, and had been under discussion for withdrawal for a year on straightforward military grounds. As weapons they are worth very little.',
      'As a guarantee they are worth what every other guarantee is worth, because they are the same promise made in a different place. That is why they cannot be traded openly, and why they can be removed quietly a few months later without anyone calling it a trade.',
    ],
    soWhat:
      'The difference between a concession and a coincidence is timing and publicity. Both are available if the two sides want them to be.',
  },
  {
    id: 'note-pledge',
    kind: 'procedure',
    label: 'The pledge',
    title: 'What an undertaking not to invade is worth',
    body: [
      'A promise given by one administration binds it for as long as it is in office and no longer, which both governments understand. It cannot be enforced and it will not be written into anything ratified.',
      'It is nevertheless the thing being asked for, because a public undertaking is expensive to break — not impossible, expensive. That is the whole of the security being offered.',
    ],
    soWhat:
      'The settlement rests on a promise that is worth exactly the cost of breaking it. Deciding whether that is enough is the actual question.',
  },
  {
    id: 'memo-aide-day4',
    kind: 'memo',
    label: 'Aide memo',
    title: 'The people who are not in the room',
    body: [
      'Two governments are settling the terms. Two others own the territory and the bases being disposed of, and neither has been asked. Every arrangement reached today has to be carried out by somebody who was not consulted about it.',
    ],
    soWhat:
      'A settlement is not finished when the principals agree. It is finished when the people who have to implement it accept that they were party to it.',
  },
  {
    id: 'memo-aide',
    kind: 'memo',
    label: 'Aide memo',
    title: 'Public statements are already shaping private assumptions',
    body: [
      'Every delegation is now reading every other delegation’s public language for intent. Positions taken for a domestic audience are being filed abroad as evidence of what the speaker will do.',
    ],
    soWhat:
      'There is no purely domestic statement in this crisis. Assume every audience is listening to all of them.',
  },
];

export const getDossier = (id) => DOSSIERS.find((entry) => entry.id === id) ?? null;
