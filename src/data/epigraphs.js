/* Seven real voices, between the days.

   Everything else the game puts in quotation marks is invented. These are not,
   and that is the whole reason they need their own treatment: they sit on
   paper, carry an attribution and a source, and never appear inside a scene.
   A player should never have to wonder which kind of speech they are reading.

   RIGHTS. The archive's rule — verifiably public domain — governs the
   reproduction of whole works: a photograph, an audio clip, a reel of film.
   Two of these seven are public domain on that rule, both being Kennedy
   speeches and therefore federal works. The other five are copyrighted, or
   Soviet or Cuban in origin, and are used here as brief attributed quotation
   for teaching and commentary rather than as archival reproduction, which is
   a different question with a more permissive answer. The credits panel says
   so plainly rather than letting the archive's stricter claim appear to cover
   something it does not.

   PROVENANCE. Each entry carries `provenance`: not who said it, which the
   attribution already gives, but *how it reached us*. Three of the seven need
   it badly. "We will bury you" is a mistranslation that frightened a
   generation. Power's line is a private remark recalled by the man he said it
   to and published twenty-three years later. McNamara is remembering a night
   forty years after it happened. A classroom tool that prints those flat,
   as though all three were equally documented, teaches something false about
   how history is known. Saying how each arrived is the correction, and it is
   the same move every archive item already makes with `whyItMatters`. */

const PD = 'Public domain — work of the US federal government';
const QUOTED = 'Quoted for teaching and commentary — see the credits';

/* Keyed by the moment that shows it. `day1` fires when the seat is taken and
   the first day opens; the rest fire as their day opens, in place of the
   dateline card. */
export const EPIGRAPHS = {
  day1: {
    quote: 'Let us never negotiate out of fear. But let us never fear to negotiate.',
    speaker: 'John F. Kennedy',
    role: 'President of the United States',
    date: 'Inaugural Address, 20 January 1961',
    provenance:
      'Said twenty-one months before the photographs. It is the proposition the next five days test, and the reason this simulation is about talking rather than about weapons.',
    rights: PD,
  },

  day2: {
    quote:
      'I was impressed with Kennedy. I remember liking his face, which was sometimes stern but which often broke into a good natured smile.',
    speaker: 'Nikita Khrushchev',
    role: 'First Secretary of the Communist Party of the Soviet Union',
    date: 'On meeting Kennedy at Vienna, June 1961',
    source: 'Khrushchev Remembers (1970), translated by Strobe Talbott',
    provenance:
      'Recalled in memoirs published in 1970, after he had been removed from power, and in a translation prepared in the West. The two men who came closest to ending the world had met once, and liked each other.',
    rights: QUOTED,
  },

  day3: {
    quote:
      'We will not prematurely or unnecessarily risk the costs of worldwide nuclear war in which even the fruits of victory would be ashes in our mouth — but neither will we shrink from that risk at any time it must be faced.',
    speaker: 'John F. Kennedy',
    role: 'President of the United States',
    date: 'Radio and television address, 22 October 1962',
    provenance:
      'From the broadcast you heard yesterday. Both halves of the sentence are the policy: the refusal to be reckless, and the refusal to be seen as unwilling. Every choice in this simulation sits somewhere between them.',
    rights: PD,
  },

  day4: {
    quote:
      'Restraint? Why are you so concerned with saving their lives? The whole idea is to kill the bastards. At the end of the war, if there are two Americans and one Russian, we win.',
    speaker: 'General Thomas Power',
    role: 'Commander-in-Chief, Strategic Air Command',
    date: 'To William Kaufmann of the RAND Corporation, 1960',
    source: 'Fred Kaplan, The Wizards of Armageddon (1983)',
    provenance:
      'Not a document. A private remark, recalled by the man it was said to and published twenty-three years later. It is anecdote rather than record — and the people arguing for a strike in the room you are about to enter were not caricatures, which is what makes it worth reading before you go in.',
    rights: QUOTED,
  },

  day5: {
    quote:
      'It was a perfectly beautiful night, as fall nights are in Washington. I walked out of the Oval Office, and as I walked out, I thought I might never live to see another Saturday night.',
    speaker: 'Robert McNamara',
    role: 'Secretary of Defense',
    date: 'Recalling the evening of Saturday, 27 October 1962',
    source: 'The Fog of War (2003)',
    provenance:
      'Remembered roughly forty years afterwards, not written down at the time. He is describing the night you have just played — and the fact that he was still describing it four decades later is itself part of what that night was.',
    rights: QUOTED,
  },
};

/* Two more, on the background tab rather than between days: both predate the
   road that tab lays out, and both are voices the archive cannot carry at all,
   for the reasons the tab's own closing note gives. */
export const BACKGROUND_EPIGRAPHS = [
  {
    id: 'khrushchev-1956',
    quote: 'Whether you like it or not, history is on our side. We will bury you.',
    speaker: 'Nikita Khrushchev',
    role: 'First Secretary of the Communist Party of the Soviet Union',
    date: 'To Western ambassadors, Polish embassy, Moscow, 18 November 1956',
    source: 'Contemporary press reports of the reception',
    provenance:
      'The translation overstated him. «Мы вас похороним» carries the Marxist claim that socialism would outlive capitalism — closer to “we will outlast you” than to a threat of attack. Khrushchev said so himself in 1963: “Of course we will not bury you with a shovel.” By then the sentence had spent seven years frightening people, which is a lesson about translation as much as about him.',
    rights: QUOTED,
  },
  {
    id: 'castro-1959',
    quote:
      'I am not a communist and neither is the revolutionary movement, but we do not have to say that we are anticommunists just to fawn on foreign powers.',
    speaker: 'Fidel Castro',
    role: 'Prime Minister of Cuba',
    date: '1959',
    source: 'Widely reported during his visit to the United States',
    provenance:
      'True when he said it, and not true for long. Within two years Cuba was aligned with Moscow and the missiles were on their way. Whether the alignment was his intention from the start or something Washington pushed him into is still argued over, and the date on this sentence is where that argument begins.',
    rights: QUOTED,
  },
];

export const epigraphFor = (dayNumber) => EPIGRAPHS[`day${dayNumber}`] ?? null;
