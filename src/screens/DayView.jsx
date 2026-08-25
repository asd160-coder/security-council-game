import { useMemo } from 'react';
import BriefingStep from '../components/steps/BriefingStep.jsx';
import PrivateBriefStep from '../components/steps/PrivateBriefStep.jsx';
import DialogueStep from '../components/steps/DialogueStep.jsx';
import ConsequenceStep from '../components/steps/ConsequenceStep.jsx';
import DraftingStep from '../components/steps/DraftingStep.jsx';
import SummaryStep from '../components/steps/SummaryStep.jsx';
import DossierRail from '../components/panels/DossierRail.jsx';
import TrackerColumn from '../components/panels/TrackerColumn.jsx';
import DraftingTray from '../components/panels/DraftingTray.jsx';
import MapPanel from '../components/panels/MapPanel.jsx';
import { PLANNED_DAYS } from '../data/days/index.js';
import { APP, PLAY } from '../data/copy.js';
import styles from './DayView.module.css';

/* The play screen.

   Layout follows the design packet: scene in the centre, file and map on the
   left, crisis indicators on the right, drafting tray along the foot. The
   step sequence drives the centre column; the panels around it persist, which
   is what lets a student consult a card without losing their place.

   Adding a day changes nothing here. The renderer map below is keyed by step
   `kind`, so a Day 2 file reusing these kinds simply plays. */

const STEP_RENDERERS = {
  briefing: BriefingStep,
  privateBrief: PrivateBriefStep,
  dialogue: DialogueStep,
  consequence: ConsequenceStep,
  drafting: DraftingStep,
  summary: SummaryStep,
};

export default function DayView({ day, role, state, dispatch }) {
  const step = day.steps[state.stepIndex];

  /* The choice made on this day's dialogue step, needed by the consequence
     step that follows it. Looked up rather than passed down, so steps stay
     independent of one another's order. */
  const dialogueStep = useMemo(() => day.steps.find((s) => s.kind === 'dialogue'), [day]);
  const consequenceStep = useMemo(() => day.steps.find((s) => s.kind === 'consequence'), [day]);
  const chosen = useMemo(() => {
    const key = `${day.id}:dialogue`;
    const choiceId = state.choices[key];
    if (!choiceId || !dialogueStep) return null;
    return dialogueStep.choicesByRole[role.id]?.find((c) => c.id === choiceId) ?? null;
  }, [day.id, state.choices, dialogueStep, role.id]);

  const Renderer = step ? STEP_RENDERERS[step.kind] : null;

  /* The summary is the last step of the day, so its action ends the day
     rather than stepping past the end of the list. */
  const advance = () =>
    step?.kind === 'summary' ? dispatch({ type: 'endDay' }) : dispatch({ type: 'advance' });

  const stepProps = {
    day,
    step,
    role,
    onAdvance: advance,
    onChoose:
      step?.kind === 'dialogue'
        ? (choice) =>
            dispatch({
              type: 'chooseLine',
              stepKey: `${day.id}:dialogue`,
              choice,
              /* Which entry this line earns, per the day's consequence table. */
              unlockId: consequenceStep?.variants?.[choice.feedback]?.unlocks,
            })
        : (option) => dispatch({ type: 'chooseDraft', dayNumber: day.number, option }),
    onConsultAdviser: () => dispatch({ type: 'unlock', id: step?.adviser?.unlocks }),
    adviserTaken: state.unlocked.includes(dialogueStep?.adviser?.unlocks),
    choice: chosen,
    deltas: state.lastDeltas,
    unlockedToday: state.unlockedToday,
    draft: state.draft,
  };

  return (
    <div className={styles.view}>
      <header className={styles.header}>
        <div className={styles.identity}>
          <span className={styles.wordmark}>{APP.title}</span>
          {role.portrait && (
            <img
              className={styles.seatPortrait}
              src={`portraits/${role.portrait}`}
              alt={`${role.name} — ${PLAY.illustration.toLowerCase()}`}
            />
          )}
          <span className={styles.seat}>{role.name}</span>
          <span className={styles.seatDelegation}>{role.delegation}</span>
        </div>

        <nav className={styles.days} aria-label="Crisis days">
          {PLANNED_DAYS.map((planned) => {
            const isCurrent = planned.number === day.number;
            const isFuture = planned.number > day.number;
            return (
              <span
                key={planned.number}
                className={`${styles.dayPip} ${isCurrent ? styles.dayPipActive : ''} ${
                  isFuture ? styles.dayPipFuture : ''
                }`}
                aria-current={isCurrent ? 'step' : undefined}
                title={isFuture ? `${planned.title} — not yet built` : planned.title}
              >
                {planned.number}
              </span>
            );
          })}
        </nav>
      </header>

      <div className={styles.body}>
        <div className={styles.left}>
          <MapPanel
            inspected={state.mapInspected}
            onInspect={() => dispatch({ type: 'inspectMap' })}
          />
          <DossierRail unlocked={state.unlocked} unlockedToday={state.unlockedToday} />
        </div>

        <main className={styles.centre}>
          <div className={styles.progress} aria-hidden="true">
            {day.steps.map((s, index) => (
              <span
                key={s.kind}
                className={`${styles.progressStep} ${
                  index < state.stepIndex ? styles.progressStepDone : ''
                } ${index === state.stepIndex ? styles.progressStepCurrent : ''}`}
              />
            ))}
          </div>

          <p className="sr-only" aria-live="polite">
            {PLAY.dayLabel(day.number)}, {PLAY.sceneLabel} {state.stepIndex + 1} of{' '}
            {day.steps.length}
          </p>

          {Renderer && <Renderer {...stepProps} />}
        </main>

        <div className={styles.right}>
          <TrackerColumn
            trackers={state.trackers}
            deltas={step?.kind === 'consequence' ? state.lastDeltas : {}}
          />
        </div>
      </div>

      {/* The tray is hidden on the summary step, which shows the draft itself
          in a larger form — two copies of the same sheet is one too many. */}
      {step?.kind !== 'summary' && <DraftingTray draft={state.draft} />}
    </div>
  );
}
