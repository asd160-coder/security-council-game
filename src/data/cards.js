/* Country and actor perspective cards. Content follows the design packet's card
   template: core interests, public message, private concern, preferred style,
   red lines, possible concessions.

   These are the game's main teaching objects. A student who reads the Soviet
   card understands why Dobrynin's best move looks like obstruction from the
   American chair — which is the whole point of the exercise. */

export const CARDS = [
  {
    id: 'card-us',
    kind: 'country',
    name: 'United States',
    subtitle: 'Washington',
    interests: 'Remove the immediate strategic threat, maintain credibility, avoid appearing weak.',
    publicMessage: 'An unacceptable danger cannot be ignored.',
    privateConcern: 'Escalation may become uncontrollable.',
    style: 'Firm signaling backed by selective flexibility.',
    redLines: 'Perceived strategic humiliation, or unchecked deployment.',
    concessions: 'Private assurance, sequencing, face-saving framing.',
  },
  {
    id: 'card-ussr',
    kind: 'country',
    name: 'Soviet Union',
    subtitle: 'Moscow',
    interests: 'Maintain strategic parity, avoid humiliation, protect influence.',
    publicMessage: 'External pressure is unjust and destabilizing.',
    privateConcern: 'Overreaction could trigger disastrous escalation.',
    style: 'Guarded bargaining, reciprocal movement, resistance to coercive framing.',
    redLines: 'Unilateral retreat without strategic recognition.',
    concessions: 'Mutual steps, private assurances, staged reduction.',
  },
  {
    id: 'card-un',
    kind: 'actor',
    name: 'United Nations',
    subtitle: 'New York',
    interests:
      'Reduce immediate danger, preserve international legitimacy, create negotiating space.',
    publicMessage: 'Restraint and procedure are essential.',
    privateConcern: 'Great-power politics may bypass institutional mediation.',
    style: 'De-escalatory language, procedural pacing, legitimacy-building.',
    redLines: 'Being reduced to symbolic irrelevance.',
    concessions: 'Phased proposals, neutral framing, monitored pause.',
  },
  {
    id: 'card-cuba',
    kind: 'country',
    name: 'Cuba',
    subtitle: 'Havana',
    interests: 'Sovereignty, security, survival amid superpower confrontation.',
    publicMessage: 'An external threat justifies a defensive posture.',
    privateConcern: 'Being treated as a pawn by larger powers.',
    style: 'Assertive defense, suspicion of imposed compromise.',
    redLines: 'Arrangements that ignore Cuban agency or security.',
    concessions: 'Indirect guarantees, conditional de-escalation.',
  },
];

export const getCard = (id) => CARDS.find((card) => card.id === id) ?? null;
