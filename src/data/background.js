import { ROLES } from './roles.js';

/* The background tab: what the thirteen days cannot teach on their own.

   Two sections, and the second is the point. The road is dated and short —
   six things that had already happened by October, each followed by the
   assumption it left behind, because the assumptions are what the people in
   this game are actually acting on.

   The briefs then ask the same four questions of every figure: what they
   want, what is pushing them, what they hold, and what they are afraid of.
   Those are the same four questions the game already asks the player on Day 1
   — `privateBrief` in src/data/roles.js is this shape — so the playable seats
   are composed from that data rather than restated here, and cannot drift
   from it. Asking one set of questions of six people is the whole
   instrument. It does not rank the answers.

   Rights: the prose is authored, like every other word the game writes in its
   own voice. The images are not, and they split two ways. The three playable
   seats carry generated `portrait` illustrations under the rule in roles.js —
   marked as illustrations, never archive. The three heads of state carry a
   documentary `photo` with a `source` and `rights` line, because unlike the
   invented aides they were photographed and the record is public. */

export const ROAD = [
  {
    id: 'bay-of-pigs',
    date: 'April 1961',
    title: 'The Bay of Pigs',
    body: [
      'Fourteen hundred Cuban exiles, trained and armed by the CIA, landed at Playa Girón. The air support was cut back and then cancelled, and the brigade was captured within three days. Kennedy took public responsibility for it, eleven weeks into his presidency.',
    ],
    left: 'Castro concluded that the next attempt would come with American troops behind it. Khrushchev concluded that the new president could be pushed.',
  },
  {
    id: 'vienna',
    date: 'June 1961',
    title: 'Vienna',
    body: [
      'The two men met once, for two days, and did not get on. Khrushchev pressed a deadline over Berlin and treated the younger man as someone who could be talked over. Kennedy left believing he had been bullied, and that the impression would have to be corrected somewhere.',
    ],
    left: 'Each left with a reading of the other that neither of them revised before October.',
  },
  {
    id: 'berlin',
    date: 'August 1961',
    title: 'The Wall',
    body: [
      'Berlin was divided overnight, first with wire and then with concrete. The confrontation both governments expected to be the decisive one of the decade was not resolved. It was frozen, with Western troops inside a city the Soviet Union surrounded.',
    ],
    left: 'Berlin became the hostage each side reached for whenever the other pressed somewhere else — Cuba included.',
  },
  {
    id: 'the-gap',
    date: 'October 1961',
    title: 'The missile gap, in reverse',
    body: [
      'The administration said publicly what it had recently established privately: American strategic forces outnumbered Soviet ones by something close to ten to one. The candidate had campaigned on the opposite. The correction was true, and saying it aloud told Moscow that Washington knew.',
    ],
    left: 'A weakness on the record has to be answered. The cheapest answer available was not to build more missiles but to move some closer.',
  },
  {
    id: 'jupiters',
    date: 'Spring 1962',
    title: 'The Jupiters in Turkey',
    body: [
      'Fifteen American Jupiter missiles became operational in Turkey, on the Soviet Union’s southern border. They were liquid-fuelled, slow to fire and already considered obsolete by the people who had put them there.',
      'Their flight time to Moscow was roughly what a missile in Cuba would need to reach Washington.',
    ],
    left: 'By October both governments had missiles on the other’s doorstep. Only one of the two arrangements was being called a crisis.',
  },
  {
    id: 'anadyr',
    date: 'May–September 1962',
    title: 'Operation Anadyr',
    body: [
      'Khrushchev proposed stationing nuclear missiles in Cuba. Castro accepted, but argued for a published defence treaty rather than a secret deployment, and was overruled. Forty-three thousand Soviet personnel crossed the Atlantic under an Arctic cover story, with winter clothing loaded to support it.',
      'In September, Gromyko assured Kennedy that Soviet assistance to Cuba was defensive. In October a U-2 photographed the launch sites.',
    ],
    left: 'The secrecy was the part Kennedy would not forgive, and the part Khrushchev had thought was the whole plan.',
  },
];

/* The three who could start it or stop it, and who are not playable.

   These carry a `photo` rather than a `portrait`, and the difference is the
   point rather than an inconsistency. The invented aides are painted because
   no likeness of them exists to photograph; these three were photographed, so
   the card shows the photograph and credits it, the way the archive does.
   Painted where the record is silent, documentary where it is not.

   Note what the three images have in common: an American photographer, and
   two of the three subjects standing on American soil. That is the same
   limitation ARCHIVE_NOTE describes at the foot of this tab — it is not a
   coincidence, it is what survives. */
const PRINCIPALS = [
  {
    id: 'jfk',
    name: 'John F. Kennedy',
    title: 'President of the United States',
    delegation: 'United States',
    standfirst:
      'Twenty months into a presidency that has already gone badly wrong once over Cuba, and the only man who can order the strike or refuse it.',
    photo: 'jfk-portrait-1962-03.jpg',
    photoFocus: '50% 20%',
    source: 'Cecil Stoughton, White House Photographs, John F. Kennedy Presidential Library · 6 March 1962',
    rights: 'Public domain — work of the US federal government',
    brief: {
      objective:
        'Get the missiles out of Cuba without a war, and without a settlement that looks like one he was frightened into.',
      pressure:
        'The Chiefs want the sites struck. Congress has spent the summer accusing him of tolerating them. And he has been wrong in public before, about this island, in front of these same people.',
      advantage:
        'He decides. The committee argues and the services plan, but nothing moves unless he says it moves.',
      fear: 'That the first move he cannot take back turns out to have been the unnecessary one.',
    },
  },
  {
    id: 'khrushchev',
    name: 'Nikita Khrushchev',
    title: 'First Secretary of the Communist Party of the Soviet Union',
    delegation: 'Soviet Union',
    standfirst:
      'Playing a weak hand quickly, on a reading of Kennedy he formed in Vienna and never updated.',
    photo: 'khrushchev-un-1960.jpg',
    photoFocus: '50% 22%',
    source: 'Warren K. Leffler, U.S. News & World Report Collection, Library of Congress · United Nations General Assembly, 1960',
    rights: 'Public domain — rights dedicated to the public by the copyright holder',
    brief: {
      objective:
        'Correct a strategic imbalance cheaply, keep Cuba, and be seen in Moscow to have done both.',
      pressure:
        'American missiles on his own border, a Presidium that remembers what he promised it, and Chinese accusations that peaceful coexistence is another word for losing.',
      advantage:
        'Secrecy, for as long as it holds — and a private correspondence with Kennedy that no ministry on either side controls.',
      fear: 'Not defeat. Humiliation, which is a different thing and harder to survive at home.',
    },
  },
  {
    id: 'castro',
    name: 'Fidel Castro',
    title: 'Prime Minister of Cuba',
    delegation: 'Cuba',
    standfirst:
      'Certain the invasion is coming, and not a party to the bargain being made about his island.',
    photo: 'castro-washington-1959.jpg',
    photoFocus: '50% 22%',
    source: 'U.S. News & World Report Collection, Library of Congress · MATS Terminal, Washington, 1959',
    rights: 'Public domain — rights dedicated to the public by the copyright holder',
    brief: {
      objective:
        'Make an invasion expensive enough that it is not attempted, and remain a government that decides its own defence.',
      pressure:
        'An exile brigade that has already landed once, an embargo, and covert operations that have tried to kill him.',
      advantage:
        'The weapons are on Cuban soil by Cuban consent, and neither superpower can remove them without saying so out loud.',
      fear: 'That the two of them settle it over his head — and that his consent turns out not to have been required.',
    },
  },
];

/* The playable seats, in the same shape, read from roles.js so the two can
   never disagree about what a seat is for. */
const SEATS = ROLES.map((role) => ({
  id: role.id,
  name: role.name,
  title: role.title,
  delegation: role.delegation,
  standfirst: role.standfirst,
  portrait: role.portrait,
  portraitFocus: role.portraitFocus,
  brief: {
    objective: role.privateBrief.objective,
    pressure: role.privateBrief.pressure,
    advantage: role.privateBrief.advantage,
    fear: role.privateBrief.fear,
  },
}));

export const FIGURE_GROUPS = [
  {
    id: 'principals',
    label: 'The three who could end it',
    note: 'None of them is a seat in this simulation. Every decision the game gives you is a decision about what one of these men will do next.',
    figures: PRINCIPALS,
  },
  {
    id: 'seats',
    label: 'The three seats you can take',
    note: 'The same four questions, asked of the people who have to carry out a decision they did not make alone.',
    figures: SEATS,
  },
];

/* The historiographical point, and the honest place to make it. The archive
   rule that governs this project is itself a fact about the crisis. */
export const ARCHIVE_NOTE = {
  label: 'A note on whose papers survive',
  body: [
    'Almost everything quotable about October 1962 is American. The Kennedy administration recorded its own deliberations, and those tapes and documents are public. The Soviet and Cuban records are not open on the same terms, and the letters the endgame actually turned on cannot be reproduced here.',
    'The briefs above are written for this simulation from historians’ accounts. Where the Soviet or Cuban position appears in the archive, it appears as what an American document says it was. That asymmetry is not neutral, and a class is better off knowing it than not.',
  ],
};
