import day1 from './day1.js';
import day2 from './day2.js';
import day3 from './day3.js';
import day4 from './day4.js';
import day5 from './day5.js';

/* The day registry. Adding Day 2 is two lines: import the file, add it here.
   Nothing else in the app enumerates days. */
export const DAYS = [day1, day2, day3, day4, day5];

export const getDay = (number) => DAYS.find((day) => day.number === number) ?? null;

export const LAST_BUILT_DAY = DAYS[DAYS.length - 1].number;

/* The full scenario is five days plus a debrief. Only some are built; the
   interface says so plainly rather than hiding the ones that are not. */
export const PLANNED_DAYS = [
  { number: 1, title: 'Discovery' },
  { number: 2, title: 'Public pressure and private channels' },
  { number: 3, title: 'Escalation and leverage' },
  { number: 4, title: 'Negotiation under pressure' },
  { number: 5, title: 'Final decision' },
];
