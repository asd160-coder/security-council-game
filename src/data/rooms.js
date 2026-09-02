/* Which room each conversation happens in.

   A resolver, not content. The day files say where they are in prose — "a
   corridor, an anteroom, ten minutes between other things", "the embassy has
   arranged itself around the telephone in the way" — and this maps that to a
   plate. Nothing here is authored: every assignment below is a reading of a
   framing paragraph that already exists.

   Eighteen role-scene combinations, five rooms, no scene with art of its own.
   That is the whole point: the library is small and the variation comes from
   how each room is lit and occupied, not from drawing more rooms.

   Where two roles are in the same room at the same moment they get the same
   plate — Kennedy and Dobrynin in the back-channel are one meeting seen from
   two chairs. Where the "same" step is actually a different event for a
   different role, they diverge: U Thant's version of that scene is not a
   meeting at all, it is him going to both missions separately within the
   hour, so he gets a corridor. */

const ROOMS = {
  /* Day 1. Nobody has said anything yet. Three people in three rooms
     deciding what the first sentence will be. */
  'day1:first-response': {
    rfk: { room: 'cabinet', light: 'evening', occupancy: 'occupied' },
    dobrynin: { room: 'embassy', light: 'lamp', occupancy: 'solitary' },
    uthant: { room: 'desk', light: 'lamp', occupancy: 'solitary' },
  },

  /* "The chamber is full and the cameras are running." All three are in the
     same room, on the record, at the same hour. U Thant is the only one who
     is not addressing it from the floor. */
  'day2:public-exchange': {
    rfk: { room: 'chamber', light: 'day', occupancy: 'full' },
    dobrynin: { room: 'chamber', light: 'day', occupancy: 'full' },
    uthant: { room: 'chamber', light: 'day', occupancy: 'full', vantage: 'dais' },
  },

  /* "No minute, no aide, no third person." Kennedy goes to Dobrynin, so the
     two of them share the embassy. U Thant is not in that room and never
     was — he is moving between two missions. */
  'day2:back-channel': {
    rfk: { room: 'embassy', light: 'lamp', occupancy: 'bilateral' },
    dobrynin: { room: 'embassy', light: 'lamp', occupancy: 'bilateral' },
    uthant: { room: 'corridor', light: 'evening', occupancy: 'solitary' },
  },

  /* The place line names the room outright: a corridor, an anteroom. All
     three are buttonholed in one, by someone who does not report to them. */
  'day3:pressure': {
    rfk: { room: 'corridor', light: 'overhead', occupancy: 'bilateral' },
    dobrynin: { room: 'corridor', light: 'overhead', occupancy: 'bilateral' },
    uthant: { room: 'corridor', light: 'overhead', occupancy: 'bilateral' },
  },

  /* "The room has been arguing since the aircraft was lost" — the cabinet
     room, late. Kennedy arrives at the embassy again without notice. U Thant
     has four delegations in three hours, which is a chamber.

     The council and the reckoning sit in the same room as the negotiation for
     each role: you are advised where you are and answer for it in the same
     place, so the day reads as one continuous sitting rather than three
     locations. Only the occupancy shifts — the embassy empties out by the
     time Dobrynin has to account for what he did. */
  'day4:council': {
    rfk: { room: 'cabinet', light: 'night', occupancy: 'full' },
    dobrynin: { room: 'embassy', light: 'lamp', occupancy: 'bilateral' },
    uthant: { room: 'chamber', light: 'evening', occupancy: 'occupied' },
  },
  'day4:reckoning': {
    rfk: { room: 'cabinet', light: 'night', occupancy: 'full' },
    dobrynin: { room: 'embassy', light: 'lamp', occupancy: 'solitary' },
    uthant: { room: 'chamber', light: 'evening', occupancy: 'occupied' },
  },

  'day4:negotiation': {
    rfk: { room: 'cabinet', light: 'night', occupancy: 'full' },
    dobrynin: { room: 'embassy', light: 'lamp', occupancy: 'bilateral' },
    uthant: { room: 'chamber', light: 'evening', occupancy: 'occupied' },
  },

  /* Waiting. "The room has run out of new arguments." "The embassy has
     arranged itself around the telephone." U Thant is alone with the gap
     between two missions that will not speak to each other. */
  'day5:final': {
    rfk: { room: 'cabinet', light: 'dawn', occupancy: 'occupied' },
    dobrynin: { room: 'embassy', light: 'lamp', occupancy: 'solitary' },
    uthant: { room: 'desk', light: 'dawn', occupancy: 'empty' },
  },
};

/* A step with no entry falls to a corridor: transitional, unremarkable, and
   never wrong enough to be distracting. Better than throwing on a day that
   has not been mapped yet. */
export const DEFAULT_ROOM = { room: 'corridor', light: 'overhead', occupancy: 'empty' };

export function roomFor(dayId, stepId, roleId) {
  return ROOMS[`${dayId}:${stepId}`]?.[roleId] ?? DEFAULT_ROOM;
}

export { ROOMS };
