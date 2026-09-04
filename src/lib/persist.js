/* Keeping a run alive across a reload.

   The design has always been that a classroom run starts clean — that is still
   true, and this does not change it. What it changes is what happens when a
   browser reloads on its own thirty-five minutes in, which until now destroyed
   the whole run and everything the student had written.

   So: the run is saved, and it is never silently resumed. On boot the title
   screen offers to pick it up or start fresh, and the student decides. That
   keeps the clean-start intent while making an accidental reload survivable,
   which are different things and were being traded off against each other by
   accident.

   Storage can throw rather than merely fail — a private window, a browser set
   to block site data, a full quota — so every access here is guarded and every
   failure degrades to exactly the behaviour the game had before this file
   existed. A student whose browser refuses storage gets the old game, not a
   blank page. */

const KEY = 'october-1962:run';

/* Bumped whenever the shape of the state changes. A saved run from an older
   shape is discarded rather than restored, because restoring a run whose
   `choices` or `draft` no longer match the day files would produce a session
   that is broken in ways nobody could diagnose. Losing a stale save is
   annoying; resurrecting one is worse. */
const VERSION = 1;

export function saveRun(state) {
  try {
    /* A run that has not started is not worth keeping, and saving from the
       title screen would mean a fresh visitor is immediately offered their own
       empty session to resume. */
    /* `background` belongs with these: it is a reading surface reached from
       the title, not a state a run can be resumed into. Without it here a
       player who opened the tab would overwrite their saved run with a state
       `loadRun` then refuses, losing the run to a screen they only read. */
    if (state.screen === 'title' || state.screen === 'roleSelect' || state.screen === 'background') {
      window.localStorage.removeItem(KEY);
      return;
    }
    window.localStorage.setItem(KEY, JSON.stringify({ version: VERSION, savedAt: Date.now(), state }));
  } catch {
    /* Storage unavailable or full. The run continues in memory exactly as it
       did before this file existed. */
  }
}

export function loadRun() {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.version !== VERSION || !parsed.state) {
      window.localStorage.removeItem(KEY);
      return null;
    }
    const { state } = parsed;
    /* A stored screen the app cannot render would strand the player with no way
       forward, so anything unexpected is treated as no save at all. */
    if (!['play', 'ending', 'debrief', 'stub'].includes(state.screen)) return null;
    if (!state.roleId) return null;
    return { state, savedAt: parsed.savedAt };
  } catch {
    return null;
  }
}

export function clearRun() {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* Nothing to do: if it cannot be cleared it could not have been written. */
  }
}

/* For the resume prompt. Deliberately coarse — the student needs to recognise
   their own run, not to be told the minute they left it. */
export function describeRun(state) {
  if (state.screen === 'ending' || state.screen === 'debrief') return null;
  return { day: state.day, roleId: state.roleId };
}
