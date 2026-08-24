import { applyEffects, initialTrackers } from './trackers.js';
import { getRole } from '../data/roles.js';

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
      return {
        ...state,
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

    case 'endDay':
      return { ...state, screen: 'stub' };

    case 'toggleCredits':
      return { ...state, creditsOpen: !state.creditsOpen };

    case 'restart':
      return { ...initialState, screen: 'roleSelect' };

    default:
      return state;
  }
}
