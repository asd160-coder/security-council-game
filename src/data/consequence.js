/* Milestone 6 — what was actually at stake, shown only when the frame breaks.

   The discipline here is that every figure describes OCTOBER 1962 and not the
   Cold War in general. That rules out most of what circulates about nuclear
   war: nuclear-winter modelling was first published in 1983, and the casualty
   projections people remember — a billion dead, half the world's population —
   describe the arsenals of the late seventies and eighties, which were an
   order of magnitude larger than what existed during this crisis. Applied to
   1962 they are simply the wrong numbers, and a student would carry the wrong
   number away.

   What is defensible is narrower and, as it turns out, worse: how little time
   there was, what was already on the island that Washington did not know
   about, and who would have been making decisions once the shooting started.
   The packet asks for zones, warning times, communication failure and
   stability rather than explosive imagery. That is also the honest material. */

export const CONSEQUENCE = {
  eyebrow: 'What was at stake',
  title: 'The part that was never tested',
  standfirst:
    'The crisis ended before anyone found out. What follows is what was in place on the day it might not have — not a projection of what would have happened, which nobody can honestly give.',

  /* The timeline. Everything that had to happen, inside the interval that
     existed for it to happen in. */
  warning: {
    label: 'Warning time',
    minutes: 13,
    caption:
      'About thirteen minutes from launch in Cuba to impact in Washington. That interval is the whole of the difference these missiles made: what changed was never the balance of force, it was the time available to think.',
    /* Positions are fractions of the interval — this is a diagram of pressure,
       not a schedule anyone published. */
    steps: [
      { at: 0.06, label: 'Detection', note: 'Radar returns, unconfirmed' },
      { at: 0.24, label: 'Verification', note: 'Is it real, and is it one or many' },
      { at: 0.48, label: 'Notification', note: 'Reaching people who may be asleep or airborne' },
      { at: 0.72, label: 'Decision', note: 'Taken on incomplete information, once' },
      { at: 1.0, label: 'Impact', note: null },
    ],
  },

  /* Counts, each with what was and was not known at the time. */
  ledger: {
    label: 'On the island',
    rows: [
      {
        figure: '42',
        unit: 'medium-range missiles',
        note: 'R-12 launchers were delivered and being made ready. The longer-range R-14s were still at sea and never arrived.',
        known: 'Established by reconnaissance during the crisis.',
      },
      {
        figure: '~100',
        unit: 'tactical nuclear weapons',
        note: 'Short-range rockets, cruise missiles and demolition munitions, intended for use against an invasion force on the beaches.',
        known:
          'Not known in Washington at the time. It did not become public for another thirty years.',
      },
      {
        figure: '100,000+',
        unit: 'troops prepared for invasion',
        note: 'The invasion plan was drafted, staffed and ready to execute within days of an order that was never given.',
        known: 'An invasion was among the options argued for throughout the week.',
      },
    ],
  },

  /* The actual mechanism of catastrophe, which is not a decision to start a
     war. */
  breakdown: {
    label: 'Where it would have failed',
    body: [
      'An American landing would have met tactical nuclear weapons held by Soviet commanders who were under attack, out of contact with Moscow, and operating under standing instructions written for a situation nobody had anticipated.',
      'Neither government intended that. Both had spent the week trying to avoid exactly it. The danger was never that someone would choose a nuclear war — it was that the machinery for choosing anything would stop working, far away, in a few minutes, under fire.',
    ],
  },

  /* Said plainly, because the alternative is inventing numbers. */
  unknown: {
    label: 'What is not known',
    body: [
      'What would have followed is not recorded and cannot be estimated honestly. The figures that circulate — a billion dead, a darkened sky — come from modelling done in the 1980s, against arsenals many times larger than those that existed in 1962.',
      'What can be said is narrower. Enough was in place, close enough, with little enough time, that the people responsible spent thirteen days making sure it was never attempted. This ending is what it looks like when that effort stops.',
    ],
  },

  /* The illustrated summary, placed after the 1962 material rather than before
     it, so a reader meets the sourced account first and the general one
     second. It is marked as an illustration and carries no source line —
     the same rule the portraits follow, because it is a made thing rather
     than a document. Its figures describe a late-Cold-War exchange, which the
     section above it has already said. */
  poster: {
    label: 'An illustrated summary',
    file: 'price-of-the-brink.jpg',
    title: 'The price of the brink',
    caption:
      'A summary of what a nuclear exchange between the two powers would have meant, made for this project rather than drawn from the record.',
    note:
      'Its figures describe the arsenals of the later Cold War rather than those of 1962, for the reasons set out above. Read it as a statement of what was ultimately at stake in the confrontation, not as a projection of what October 1962 would have produced.',
    open: 'Open at full size',
  },

  footer:
    'Shown here because your run ended in rupture. Every other ending reaches this page without it, which is the point.',
};
