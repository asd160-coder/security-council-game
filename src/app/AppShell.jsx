import { useReducer } from 'react';
import TitleScreen from '../screens/TitleScreen.jsx';
import RoleSelect from '../screens/RoleSelect.jsx';
import DayView from '../screens/DayView.jsx';
import DayStub from '../screens/DayStub.jsx';
import EndingScreen from '../screens/EndingScreen.jsx';
import DebriefScreen from '../screens/DebriefScreen.jsx';
import { Button, Paper, PaperBody } from '../components/ui/index.jsx';
import { initialState, reducer } from '../lib/gameState.js';
import { getRole } from '../data/roles.js';
import { getDay } from '../data/days/index.js';
import { ARCHIVE } from '../data/archive.js';
import { APP } from '../data/copy.js';
import styles from './AppShell.module.css';

/* Screen routing and the one piece of global chrome — the credits panel.

   All state lives in the reducer in lib/gameState.js. Nothing persists: a
   classroom run starts clean each time, which the design packet asks for so
   repeat play is comparable between students. */

export default function AppShell() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const role = getRole(state.roleId);
  const day = getDay(state.day);

  return (
    <>
      {state.screen === 'title' && (
        <TitleScreen
          onBegin={() => dispatch({ type: 'begin' })}
          onCredits={() => dispatch({ type: 'toggleCredits' })}
        />
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
        <div
          className={styles.credits}
          role="dialog"
          aria-modal="true"
          aria-label={APP.creditsTitle}
          onClick={(event) => {
            if (event.target === event.currentTarget) dispatch({ type: 'toggleCredits' });
          }}
        >
          <div className={styles.creditsInner}>
            <Paper title={APP.creditsTitle}>
              <PaperBody
                paragraphs={[APP.creditsBody, APP.creditsNote, APP.creditsPortraits, APP.creditsMap]}
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
            <Button
              className={styles.creditsClose}
              onClick={() => dispatch({ type: 'toggleCredits' })}
              autoFocus
            >
              {APP.close}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
