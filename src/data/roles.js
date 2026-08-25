/* The three playable roles. Everything here is drawn from the core brief and
   the Day 1 content pack — the private briefings are quoted rather than
   paraphrased, because they are the first thing that makes the roles feel
   different from one another.

   `startingUnlock` is granted at role selection, per the content pack.

   `portrait` names a file in public/portraits — deliberately NOT
   public/archive. These are generated painted illustrations, not
   photographs: invented likenesses of real people. They render only on board
   surfaces, always carry the illustration marker, and never carry a source
   line, because source lines belong to archival material. The folder split
   is the first line of that distinction and the label is the second. */

export const ROLES = [
  {
    id: 'rfk',
    portrait: 'robert-kennedy.jpg',
    /* Each source frames its subject at a different scale, so the crop
       origin is per-image rather than shared. */
    portraitFocus: '50% 12%',
    name: 'Robert Kennedy',
    title: 'Attorney General of the United States',
    delegation: 'United States',
    perspective: 'US executive pressure and back-channel diplomacy',
    emphasis: 'Strategic credibility, private flexibility, managing escalation',
    tension: 'Balancing firmness against catastrophic escalation',
    startingUnlock: 'card-us',
    /* Shown on the role card at selection — short enough to compare three of
       them side by side without reading. */
    standfirst:
      'Close to the room where the decision will be made, and close enough to the President to say what others cannot.',
    privateBrief: {
      objective:
        'Help shape a response that protects US credibility without triggering uncontrollable escalation.',
      pressure:
        'Military voices and domestic expectations may favor firmness. Delay may be read as weakness.',
      advantage:
        'Access to executive decision-making and the possibility of private diplomatic signaling.',
      fear: 'A misstep could lead either to humiliation or to war.',
    },
  },
  {
    id: 'dobrynin',
    portrait: 'anatoly-dobrynin.jpg',
    /* Each source frames its subject at a different scale, so the crop
       origin is per-image rather than shared. */
    portraitFocus: '50% 34%',
    name: 'Anatoly Dobrynin',
    title: 'Soviet Ambassador to the United States',
    delegation: 'Soviet Union',
    perspective: 'Soviet signaling and strategic parity',
    emphasis: 'Guarded bargaining, prestige, reciprocal concessions',
    tension: 'Protecting Soviet standing without humiliation or uncontrolled escalation',
    startingUnlock: 'card-ussr',
    standfirst:
      'The channel between Moscow and Washington runs through this embassy — and through a man not always told everything by his own government.',
    privateBrief: {
      objective:
        'Protect Soviet interests and strategic standing while avoiding a disastrous breakdown in communication.',
      pressure: 'Public retreat would be humiliating; hardline posturing may increase danger.',
      advantage:
        'Ambiguity, private contact, and the ability to test the intentions of the other side.',
      fear: 'Weakness may be exploited, but overreaction may trap both sides.',
    },
  },
  {
    id: 'uthant',
    portrait: 'u-thant.jpg',
    /* Each source frames its subject at a different scale, so the crop
       origin is per-image rather than shared. */
    portraitFocus: '50% 24%',
    name: 'U Thant',
    title: 'Secretary-General of the United Nations',
    delegation: 'United Nations',
    perspective: 'UN mediation and international legitimacy',
    emphasis: 'De-escalation, procedural legitimacy, bridge-building',
    tension: 'Seeking peace and procedural legitimacy amid great-power confrontation',
    startingUnlock: 'card-un',
    standfirst:
      'No army, no veto, and no guarantee that either superpower will listen — only the standing to ask them both to stop.',
    privateBrief: {
      objective: 'Create space for de-escalation before public positions harden beyond repair.',
      pressure: 'The major powers may treat the UN as symbolic unless it acts quickly and credibly.',
      advantage:
        'Institutional legitimacy, neutrality, and the ability to frame restraint as a global necessity.',
      fear: 'If mediation comes too late, events may outrun diplomacy.',
    },
  },
];

export const getRole = (id) => ROLES.find((role) => role.id === id) ?? null;
