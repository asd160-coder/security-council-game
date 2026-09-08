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
    interests: 'Get the missiles out, keep America’s word credible, and not look weak.',
    publicMessage: 'This danger is unacceptable and cannot be ignored.',
    privateConcern: 'That the crisis escalates beyond anyone’s control.',
    style: 'Firm in public, with room to be flexible in private.',
    redLines: 'Being seen to be humiliated, or the missiles staying and multiplying.',
    concessions: 'A private assurance, a careful order of steps, and wording that lets the other side save face.',
  },
  {
    id: 'card-ussr',
    kind: 'country',
    name: 'Soviet Union',
    subtitle: 'Moscow',
    interests: 'Keep up with American nuclear strength, avoid humiliation, and keep its influence and its ally.',
    publicMessage: 'American pressure is unjust and endangers the peace.',
    privateConcern: 'That an overreaction on either side triggers a disaster.',
    style: 'Cautious bargaining, matching step for step, and refusing to be bullied.',
    redLines: 'Retreating alone, with nothing to show for it.',
    concessions: 'Matching steps, private assurances, and a reduction in stages.',
  },
  {
    id: 'card-un',
    kind: 'actor',
    name: 'United Nations',
    subtitle: 'New York',
    interests: 'Reduce the immediate danger, keep the United Nations respected, and make room for talks.',
    publicMessage: 'Restraint and proper procedure are essential.',
    privateConcern: 'That the superpowers settle it between themselves and bypass the United Nations.',
    style: 'Calming language, a measured pace, and building legitimacy.',
    redLines: 'Being reduced to a symbol with no real part in events.',
    concessions: 'Step-by-step proposals, neutral wording, and a supervised pause.',
  },
  {
    id: 'card-cuba',
    kind: 'country',
    name: 'Cuba',
    subtitle: 'Havana',
    interests: 'Its independence, its safety, and its survival between two superpowers.',
    publicMessage: 'An outside threat justifies preparing to defend ourselves.',
    privateConcern: 'Being treated as a pawn by larger powers.',
    style: 'Assertive self-defence, and suspicion of any compromise imposed from outside.',
    redLines: 'Any arrangement that ignores Cuba’s say or its security.',
    concessions: 'Indirect guarantees, and de-escalation with conditions.',
  },
];

export const getCard = (id) => CARDS.find((card) => card.id === id) ?? null;
