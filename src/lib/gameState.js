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
  lastUnlock: null, // what the most recent filing actually added, or null
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

/* `lastUnlock` records what this filing actually added — the id if it was
   new, null if the file already held it. The consequence screen reads it to
   decide whether to announce NEW IN YOUR FILE, because a dossier the player
   was handed two scenes ago is not new, however the day file is wired. Day 2
   did exactly that once: two consequences pointed at the same note, and the
   second presented it as a discovery. */
const fileUnlock = (state, id) => {
  if (!id) return state;
  if (state.unlocked.includes(id)) return { ...state, lastUnlock: null };
  return {
    ...state,
    unlocked: [...state.unlocked, id],
    unlockedToday: [...state.unlockedToday, id],
    lastUnlock: id,
  };
};

/* Landing on a step can cost something the player did not choose.

   A step may carry `bearsByRole`: an effect vector applied the moment the
   step is reached, before anything on it is read. Day 3's cable and Day 4's
   lost aircraft use it. Until Milestone 11 every movement of every needle
   was a consequence of the player's own choice, so a careful player finished
   five days without one ever moving against them — a crisis in which nothing
   simply happens. Applied on entry rather than on exit so the indicators show
   the loss while the card is in front of you. */
const enter = (state, stepIndex) => {
  const step = getDay(state.day)?.steps[stepIndex];
  const effects = step?.bearsByRole?.[state.roleId];
  if (!effects) return { ...state, stepIndex };
  return {
    ...state,
    stepIndex,
    trackers: applyEffects(state.trackers, effects),
    lastDeltas: effects,
  };
};

export function reducer(state, action) {
  switch (action.type) {
    case 'begin':
      return { ...state, screen: 'roleSelect' };

    /* Optional reading, reached from the title and returning to it. Not part
       of a run: see the guard in src/lib/persist.js. */
    case 'openBackground':
      return { ...state, screen: 'background' };

    case 'closeBackground':
      return { ...state, screen: 'title' };

    /* The facilitation notes, on the same terms as the background reading:
       reached from the title, returning to it, and not part of a run. Both are
       named in the guard in src/lib/persist.js, and a screen that is not named
       there will destroy a saved run rather than merely fail to save. */
    case 'openTeachers':
      return { ...state, screen: 'teachers' };

    case 'closeTeachers':
      return { ...state, screen: 'title' };

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
      return enter(state, state.stepIndex + 1);

    case 'chooseLine': {
      const { stepKey, choice, unlockId } = action;
      const before = state.trackers;
      const after = applyEffects(before, choice.effects);
      /* The information a choice earns is filed at the moment the choice is
         made, not when the consequence screen happens to render it. The
         consequence step shows what was filed; it does not do the filing. */
      return fileUnlock(
        enter(
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
          },
          state.stepIndex + 1,
        ),
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
      /* A drafting choice carries weight of its own: how strongly a clause
         commits you is a decision with a cost. That includes Day 1's tone —
         this comment used to say the tones had no effects, and the day file
         has carried them since Milestone 2. */
      const after = option.effects ? applyEffects(state.trackers, option.effects) : state.trackers;
      return enter({
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
      }, state.stepIndex + 1);
    }

    case 'reviseDraft': {
      /* A revision rewrites an existing clause rather than adding a new one.
         The statement has as many fragments as it has days that wrote one, and
         Day 3 writes none — it edits Day 2's. Keeping `original` is what lets
         the tray show that the document has a history. */
      const { targetDay, option } = action;
      const after = option.effects ? applyEffects(state.trackers, option.effects) : state.trackers;
      return enter({
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
      }, state.stepIndex + 1);
    }

    case 'setClosing':
      return enter({ ...state, closing: action.text }, state.stepIndex + 1);

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
      /* The new day's first step may bear a cost of its own; `enter` looks the
         day up from the state it is handed, so the day is set first. */
      return enter(
        {
          ...state,
          history,
          day: next,
          unlockedToday: [],
          lastDeltas: {},
          dayStartTrackers: state.trackers,
        },
        0,
      );
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
