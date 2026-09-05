import { useEffect, useReducer, useState } from 'react';
import { createPortal } from 'react-dom';
import TitleScreen from '../screens/TitleScreen.jsx';
import RoleSelect from '../screens/RoleSelect.jsx';
import OvertureScreen from '../screens/OvertureScreen.jsx';
import BackgroundScreen from '../screens/BackgroundScreen.jsx';
import TeachersScreen from '../screens/TeachersScreen.jsx';
import DayView from '../screens/DayView.jsx';
import DayStub from '../screens/DayStub.jsx';
import EndingScreen from '../screens/EndingScreen.jsx';
import DebriefScreen from '../screens/DebriefScreen.jsx';
import { Button, Paper, PaperBody } from '../components/ui/index.jsx';
import useDialog from '../components/ui/useDialog.js';
import { initialState, reducer } from '../lib/gameState.js';
import { getRole } from '../data/roles.js';
import { clearRun, describeRun, loadRun, saveRun } from '../lib/persist.js';
import { getDay } from '../data/days/index.js';
import { ARCHIVE } from '../data/archive.js';
import { APP } from '../data/copy.js';
import styles from './AppShell.module.css';

/* Screen routing and the one piece of global chrome — the credits panel.

   All state lives in the reducer in lib/gameState.js. Nothing persists: a
   classroom run starts clean each time, which the design packet asks for so
   repeat play is comparable between students. */

/* The credits, as their own component and their own portal.

   Both are for focus. A hook cannot be called conditionally, so the panel has
   to be a component before useDialog can manage it — and useDialog marks
   `#root` inert while a dialog is open, which only works if the dialog is
   outside `#root`. This used to render inline, as a sibling of the screens,
   which is why it is portalled now: it joins the other three dialogs on
   `document.body` rather than being the one exception. */
function CreditsPanel({ onClose }) {
  const dialogRef = useDialog(onClose);

  return createPortal(
    <div
      ref={dialogRef}
      tabIndex={-1}
      className={styles.credits}
      role="dialog"
      aria-modal="true"
      aria-label={APP.creditsTitle}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.creditsInner}>
        <Paper title={APP.creditsTitle}>
          <PaperBody
            paragraphs={[
              APP.creditsBody,
              APP.creditsNote,
              APP.creditsPortraits,
              APP.creditsQuotations,
              APP.creditsOverture,
              APP.creditsVoice,
              APP.creditsMap,
              APP.creditsRooms,
            ]}
          />

          <div className={styles.creditsList}>
            {ARCHIVE.map((item) => (
              <p key={item.id} className={styles.creditsItem}>
                <span className={styles.creditsItemTitle}>{item.title}</span>
                {item.source} · {item.rights}
              </p>
            ))}
          </div>
        </Paper>
        <Button className={styles.creditsClose} onClick={onClose}>
          {APP.close}
        </Button>
      </div>
    </div>,
    document.body,
  );
}

export default function AppShell() {
  const [state, dispatch] = useReducer(reducer, initialState);

  /* Read once, on mount. A saved run is an offer on the title screen, never an
     automatic restore — see src/lib/persist.js for why. */
  const [saved, setSaved] = useState(() => loadRun());

  useEffect(() => {
    saveRun(state);
  }, [state]);

  const role = getRole(state.roleId);
  const day = getDay(state.day);

  return (
    <>
      {state.screen === 'title' && (
        <TitleScreen
          onBegin={() => {
            clearRun();
            setSaved(null);
            dispatch({ type: 'begin' });
          }}
          onCredits={() => dispatch({ type: 'toggleCredits' })}
          onBackground={() => dispatch({ type: 'openBackground' })}
          onTeachers={() => dispatch({ type: 'openTeachers' })}
          saved={saved ? describeRun(saved.state) : null}
          onResume={() => {
            dispatch({ type: 'resume', state: saved.state });
            setSaved(null);
          }}
        />
      )}

      {state.screen === 'background' && (
        <BackgroundScreen onBack={() => dispatch({ type: 'closeBackground' })} />
      )}

      {state.screen === 'teachers' && (
        <TeachersScreen onBack={() => dispatch({ type: 'closeTeachers' })} />
      )}

      {state.screen === 'overture' && (
        <OvertureScreen onDone={() => dispatch({ type: 'overtureDone' })} />
      )}

      {state.screen === 'roleSelect' && (
        <RoleSelect onSelect={(roleId) => dispatch({ type: 'selectRole', roleId })} />
      )}

      {state.screen === 'play' && role && day && (
        <DayView day={day} role={role} state={state} dispatch={dispatch} />
      )}

      {state.screen === 'ending' && role && (
        <EndingScreen
          state={state}
          role={role}
          onRestart={() => dispatch({ type: 'restart' })}
          onDebrief={() => dispatch({ type: 'openDebrief' })}
        />
      )}

      {state.screen === 'debrief' && role && (
        <DebriefScreen
          state={state}
          role={role}
          onRestart={() => dispatch({ type: 'restart' })}
        />
      )}

      {state.screen === 'stub' && (
        <DayStub draft={state.draft} onRestart={() => dispatch({ type: 'restart' })} />
      )}

      {state.creditsOpen && (
        <CreditsPanel onClose={() => dispatch({ type: 'toggleCredits' })} />
      )}
    </>
  );
}
