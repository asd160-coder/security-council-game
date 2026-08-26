import { applyEffects, initialTrackers } from './trackers.js';
import { getRole } from '../data/roles.js';
import { getDay } from '../data/days/index.js';

/* All game state in one serialisable object. Nothing is persisted: a classroom
   run should start clean every time, and the design packet asks for a
   deterministic flow for repeat testing. Because the shape is plain data,
   adding persistence later is a load and a save, not a refactor. */

export const initialState = {
  screen: 'title', // title | roleSelect | play | stub
  roleId: null,
  day: 1,
  stepIndex: 0,
  trackers: initialTrackers(),
  /* Kept so the consequence step and the summary can show what just moved
     without recomputing it from the choice. */
  lastDeltas: {},
  dayStartTrackers: initialTrackers(),
  choices: {}, // stepKey -> choice id, kept for later days to reference
  unlocked: [], // ids from cards.js and dossiers.js, in the order filed
  unlockedToday: [],
  draft: [], // { dayNumber, optionId, label, fragment }
  mapInspected: false,
  creditsOpen: false,
};

const fileUnlock = (state, id) => {
  if (!id || state.unlocked.includes(id)) return state;
  return {
    ...state,
    unlocked: [...state.unlocked, id],
    unlockedToday: [...state.unlockedToday, id],
  };
};

export function reducer(state, action) {
  switch (action.type) {
    case 'begin':
      return { ...state, screen: 'roleSelect' };

    case 'selectRole': {
      const role = getRole(action.roleId);
      if (!role) return state;
      /* The starting perspective card is granted with the seat, per the
         content pack. */
      return fileUnlock(
        { ...state, roleId: role.id, screen: 'play', stepIndex: 0 },
        role.startingUnlock,
      );
    }

    case 'advance':
      return { ...state, stepIndex: state.stepIndex + 1 };

    case 'chooseLine': {
      const { stepKey, choice, unlockId } = action;
      const before = state.trackers;
      const after = applyEffects(before, choice.effects);
      /* The information a choice earns is filed at the moment the choice is
         made, not when the consequence screen happens to render it. The
         consequence step shows what was filed; it does not do the filing. */
      return fileUnlock(
        {
          ...state,
          trackers: after,
          lastDeltas: choice.effects,
          choices: { ...state.choices, [stepKey]: choice.id },
          stepIndex: state.stepIndex + 1,
        },
        unlockId,
      );
    }

    case 'unlock':
      return fileUnlock(state, action.id);

    case 'inspectMap':
      if (state.mapInspected) return state;
      return fileUnlock({ ...state, mapInspected: true }, 'note-geography');

    case 'chooseDraft': {
      const { dayNumber, option } = action;
      /* One fragment per day. Re-choosing on the same day replaces rather than
         appends, so a player who changes their mind does not end up with two. */
      const kept = state.draft.filter((entry) => entry.dayNumber !== dayNumber);
      /* From Day 2 the drafting choice carries weight of its own: how strongly
         a clause commits you is a decision with a cost. Day 1's tone options
         have no effects and are unaffected by this. */
      const after = option.effects ? applyEffects(state.trackers, option.effects) : state.trackers;
      return {
        ...state,
        trackers: after,
        lastDeltas: option.effects ?? state.lastDeltas,
        draft: [
          ...kept,
          {
            dayNumber,
            optionId: option.id,
            label: option.label,
            fragment: option.fragment,
          },
        ],
        stepIndex: state.stepIndex + 1,
      };
    }

    case 'endDay': {
      /* The day boundary. Trackers and the file carry forward; everything
         scoped to a single day resets here, which is what lets the summary
         report the day's movement rather than the run's. */
      const next = state.day + 1;
      if (!getDay(next)) return { ...state, screen: 'stub' };
      return {
        ...state,
        day: next,
        stepIndex: 0,
        unlockedToday: [],
        lastDeltas: {},
        dayStartTrackers: state.trackers,
      };
    }

    case 'toggleCredits':
      return { ...state, creditsOpen: !state.creditsOpen };

    case 'restart':
      return { ...initialState, screen: 'roleSelect' };

    default:
      return state;
  }
}
