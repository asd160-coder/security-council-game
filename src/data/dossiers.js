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
