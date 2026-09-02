import { applyEffects, diffTrackers, initialTrackers } from './trackers.js';
import { getRole } from '../data/roles.js';
import { getDay, PLANNED_DAYS } from '../data/days/index.js';

/* All game state in one serialisable object.

   That shape is why persistence, added in src/lib/persist.js, is a load and a
   save rather than a refactor — which this comment predicted in Milestone 1
   and is now true. A run is saved so an accidental reload does not destroy it,
   and is never resumed without the student choosing to; the clean-start intent
   the design packet asks for is preserved by asking rather than by forgetting. */

export const initialState = {
  screen: 'title', // title | roleSelect | play | stub | ending | debrief
  roleId: null,
  day: 1,
  stepIndex: 0,
  trackers: initialTrackers(),
  /* Kept so the consequence step and the summary can show what just moved
     without recomputing it from the choice. */
  lastDeltas: {},
  dayStartTrackers: initialTrackers(),
  /* stepKey -> { id, feedback }. The feedback category is stored alongside the
     id because that is what later days actually want: eighteen back-channel
     lines collapse to five categories, and a callback keyed to the category
     costs five variants instead of eighteen. */
  choices: {},
  unlocked: [], // ids from cards.js and dossiers.js, in the order filed
  unlockedToday: [],
  draft: [], // { dayNumber, optionId, label, fragment }
  /* The student's own closing. Not scored, carried into the ending and quoted
     back — which is honest, and is what a debrief will be built from. */
  closing: '',
  /* One snapshot per completed day: where the trackers stood and how far they
     moved that day. The only thing the debrief needs that playing does not —
     dayStartTrackers is overwritten at every boundary, so without this the run
     can be reported at its end but not as a shape over five days. */
  history: [],
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
          choices: {
            ...state.choices,
            [stepKey]: {
              id: choice.id,
              feedback: choice.feedback,
              /* Day 5's final choice carries a posture the outcome logic
                 reads. Earlier days do not set one. */
              ...(choice.posture ? { posture: choice.posture } : {}),
              /* Day 4's council choice carries the course you agreed to take
                 into the negotiation. The reckoning reads it back to work out
                 whom you overruled. Same guarded shape as posture. */
              ...(choice.mandate ? { mandate: choice.mandate } : {}),
            },
          },
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
            /* Present only for composed clauses; a later revision needs the
               halves to rewrite one without losing the other. */
            frameText: option.frameText,
            operativeText: option.operativeText,
            /* What the clause argues FROM. Present only where a drafting
               option cites a document; the tray and the finished statement
               both show it, so a student's argument carries its sources. */
            citation: option.citation,
          },
        ],
        stepIndex: state.stepIndex + 1,
      };
    }

    case 'reviseDraft': {
      /* A revision rewrites an existing clause rather than adding a new one.
         The statement has as many fragments as it has days that wrote one, and
         Day 3 writes none — it edits Day 2's. Keeping `original` is what lets
         the tray show that the document has a history. */
      const { targetDay, option } = action;
      const after = option.effects ? applyEffects(state.trackers, option.effects) : state.trackers;
      return {
        ...state,
        trackers: after,
        lastDeltas: option.effects ?? state.lastDeltas,
        draft: state.draft.map((entry) => {
          if (entry.dayNumber !== targetDay) return entry;
          /* A revision supplies a new operative half and keeps the frame the
             player chose. `hold` supplies neither and leaves the line intact. */
          const operativeText = option.operative ?? entry.operativeText;
          const fragment = option.operative
            ? `${entry.frameText} ${option.operative}`
            : entry.fragment;
          /* Holding is a decision, not an edit. Marking an unchanged clause
             "Revised" would be a small lie on the face of the document. */
          const changed = Boolean(option.operative);
          return {
            ...entry,
            label: option.label,
            fragment,
            operativeText,
            revised: entry.revised || changed,
            revisedOnDay: changed ? action.dayNumber : entry.revisedOnDay,
            /* Holding is still an act on the document and a later reading of
               the run should be able to say so — otherwise the day that chose
               to leave the clause alone looks like a day that did nothing. */
            heldOnDay: changed ? entry.heldOnDay : action.dayNumber,
            original: changed ? entry.original ?? entry.fragment : entry.original,
            /* The label the clause carried before this day touched it. Set
               whether or not the text changed, because the label is
               overwritten either way — without it the composing day loses its
               own name and gets reported under the reviser's. */
            originalLabel: entry.originalLabel ?? entry.label,
          };
        }),
        stepIndex: state.stepIndex + 1,
      };
    }

    case 'setClosing':
      return { ...state, closing: action.text, stepIndex: state.stepIndex + 1 };

    case 'endDay': {
      /* The day boundary. Trackers and the file carry forward; everything
         scoped to a single day resets here, which is what lets the summary
         report the day's movement rather than the run's. */
      const next = state.day + 1;
      const history = [
        ...state.history,
        {
          day: state.day,
          trackers: state.trackers,
          deltas: diffTrackers(state.dayStartTrackers, state.trackers),
        },
      ];
      if (!getDay(next)) {
        /* End of the scenario is an outcome, not an absence. The stub remains
           for a truncated build where later days simply are not written yet. */
        const finished = state.day >= PLANNED_DAYS[PLANNED_DAYS.length - 1].number;
        return { ...state, history, screen: finished ? 'ending' : 'stub' };
      }
      return {
        ...state,
        history,
        day: next,
        stepIndex: 0,
        unlockedToday: [],
        lastDeltas: {},
        dayStartTrackers: state.trackers,
      };
    }

    case 'openDebrief':
      return { ...state, screen: 'debrief' };

    case 'toggleCredits':
      return { ...state, creditsOpen: !state.creditsOpen };

    /* Picking up a saved run. The stored object is spread over a fresh initial
       state rather than used directly, so a save written before a field existed
       still boots with that field at its default instead of undefined. */
    case 'resume':
      return { ...initialState, ...action.state, creditsOpen: false };

    case 'restart':
      return { ...initialState, screen: 'roleSelect' };

    default:
      return state;
  }
}
