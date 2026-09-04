import { useCallback, useEffect, useMemo, useState } from 'react';
import BriefingStep from '../components/steps/BriefingStep.jsx';
import PrivateBriefStep from '../components/steps/PrivateBriefStep.jsx';
import DialogueStep from '../components/steps/DialogueStep.jsx';
import ExchangeStep from '../components/steps/ExchangeStep.jsx';
import WitnessStep from '../components/steps/WitnessStep.jsx';
import ConsequenceStep from '../components/steps/ConsequenceStep.jsx';
import CouncilStep from '../components/steps/CouncilStep.jsx';
import ReckoningStep from '../components/steps/ReckoningStep.jsx';
import DraftingStep from '../components/steps/DraftingStep.jsx';
import DraftingComposeStep from '../components/steps/DraftingComposeStep.jsx';
import DraftingReviseStep from '../components/steps/DraftingReviseStep.jsx';
import DraftingAssembleStep from '../components/steps/DraftingAssembleStep.jsx';
import WritingStep from '../components/steps/WritingStep.jsx';
import SummaryStep from '../components/steps/SummaryStep.jsx';
import DossierRail from '../components/panels/DossierRail.jsx';
import ArchiveRail from '../components/panels/ArchiveRail.jsx';
import TrackerColumn from '../components/panels/TrackerColumn.jsx';
import DraftingTray from '../components/panels/DraftingTray.jsx';
import MapPanel from '../components/panels/MapPanel.jsx';
import DayCard, { dayCardWanted } from '../components/scene/DayCard.jsx';
import Epigraph from '../components/scene/Epigraph.jsx';
import { epigraphFor } from '../data/epigraphs.js';
import { moodFor } from '../data/scene.js';
import { PLANNED_DAYS, getDay } from '../data/days/index.js';
import { band, diffTrackers } from '../lib/trackers.js';
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
  exchange: ExchangeStep,
  witness: WitnessStep,
  council: CouncilStep,
  reckoning: ReckoningStep,
  consequence: ConsequenceStep,
  drafting: DraftingStep,
  draftingCompose: DraftingComposeStep,
  draftingRevise: DraftingReviseStep,
  draftingAssemble: DraftingAssembleStep,
  writing: WritingStep,
  summary: SummaryStep,
};

/* The consequence step that reports on a given step id, if there is one. */
const consequenceFor = (day, stepId) =>
  day.steps.find((s) => s.kind === 'consequence' && s.after === stepId) ?? null;

export default function DayView({ day, role, state, dispatch }) {
  const step = day.steps[state.stepIndex];

  /* While two people are talking, the analytical surface around them steps
     back — the map, the file and the indicators drop in contrast so the room
     is the thing in front of you. They come back the moment the conversation
     resolves, and they come back early on hover or keyboard focus, because a
     teacher pointing at an indicator mid-scene should not have to leave the
     scene to read it. */
  const inConversation =
    step?.kind === 'dialogue' ||
    step?.kind === 'exchange' ||
    step?.kind === 'council' ||
    step?.kind === 'reckoning';

  const stepById = useMemo(
    () => Object.fromEntries(day.steps.map((s) => [s.id, s])),
    [day],
  );

  /* A consequence names the exchange it reports on with `after`, rather than
     the day being scanned for the first step of some kind. That is what lets a
     day hold two conversations — Day 2 has a public one and a private one, and
     each consequence has to find its own. */
  const sourceStep = step?.after ? stepById[step.after] : null;
  const chosen = useMemo(() => {
    if (!sourceStep) return null;
    const choiceId = state.choices[`${day.id}:${sourceStep.id}`]?.id;
    if (!choiceId) return null;
    /* A converging exchange keeps its follow-ups on the step rather than on
       each opening, so look there too. The stored line is already resolved to
       this role, so the shared definition only needs its label back. */
    const shared = sourceStep.sharedFollow?.find((o) => o.id === choiceId);
    if (shared) return { ...shared, line: shared.lineByRole[role.id] };
    const pool =
      sourceStep.kind === 'exchange'
        ? sourceStep.openingsByRole[role.id]?.flatMap((o) => o.follow ?? [])
        : sourceStep.choicesByRole?.[role.id];
    return pool?.find((c) => c.id === choiceId) ?? null;
  }, [day.id, state.choices, sourceStep, role.id]);

  /* The adviser lives on whichever step of this day offers one. */
  const adviserStep = useMemo(() => day.steps.find((s) => s.adviser), [day]);

  /* What a day can know about the run so far, without content having to reach
     into state itself. Escalation is the band that matters for scene text; the
     channel category is the compressed form of what happened in the previous
     day's private exchange. */
  const standing = band(state.trackers.escalation);

  /* The course you agreed to take into the negotiation, if this day has a
     council. `history.channelCategory` cannot serve here — it is hardcoded to
     look at the PREVIOUS day — so the mandate is derived the same way and
     passed alongside it. Found by kind, for the same reason the exchange is:
     a hardcoded step id silently stops working the moment a day renames one. */
  const mandate = useMemo(() => {
    const council = day.steps.find((s) => s.kind === 'council');
    return council ? (state.choices[`${day.id}:${council.id}`]?.mandate ?? null) : null;
  }, [day, state.choices]);
  const history = useMemo(() => {
    /* The previous day's exchange, found by kind rather than by name. This was
       a list of hardcoded step ids and it silently stopped working the moment
       a day named its exchange something new — Day 5's callback could never
       have fired, because Day 4 calls its exchange `negotiation`. */
    const previous = getDay(day.number - 1);
    const exchange = previous?.steps.find((s) => s.kind === 'exchange');
    return {
      channelCategory: exchange
        ? (state.choices[`${previous.id}:${exchange.id}`]?.feedback ?? null)
        : null,
    };
  }, [state.choices, day.number]);

  const Renderer = step ? STEP_RENDERERS[step.kind] : null;

  /* The board's temperature for the day. */
  const mood = moodFor(day.number);

  /* A date card between days: shown once when a new day opens, dismissed by
     time or by hand, and never under reduced motion. Not a step, so the day
     files and the progress pips are untouched; `stepIndex` is read on purpose
     only at the moment the day changes. */
  /* An interstitial when a day opens: the epigraph where the day has one,
     otherwise the dateline flash. Never both — the epigraph carries its own
     dateline. The epigraph is content rather than decoration, so unlike the
     dateline card it is shown whatever the motion preference; `dayCardWanted`
     only gates the flash. Day 1 has an epigraph and no flash, which is why
     the day-number test moved inside. */
  const [card, setCard] = useState(null);
  const dismissCard = useCallback(() => setCard(null), []);
  const epigraph = epigraphFor(day.number);
  useEffect(() => {
    if (state.stepIndex !== 0) return;
    if (epigraph || (day.number > 1 && dayCardWanted())) setCard(day.number);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day.number]);

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
      step?.kind === 'dialogue' ||
      step?.kind === 'exchange' ||
      step?.kind === 'council' ||
      step?.kind === 'reckoning'
        ? (choice) =>
            dispatch({
              type: 'chooseLine',
              stepKey: `${day.id}:${step.id}`,
              choice,
              /* Which entry this line earns, per the consequence that reports
                 on this step. */
              unlockId: consequenceFor(day, step.id)?.variants?.[choice.feedback]?.unlocks,
            })
        : (option) => dispatch({ type: 'chooseDraft', dayNumber: day.number, option }),
    onRevise: (option) =>
      dispatch({
        type: 'reviseDraft',
        targetDay: step.targetDay,
        dayNumber: day.number,
        option,
      }),
    standing,
    history,
    onSubmit: (text) => dispatch({ type: 'setClosing', text }),
    onConsultAdviser: () => dispatch({ type: 'unlock', id: adviserStep?.adviser?.unlocks }),
    /* Examining a primary source files what it teaches. */
    onOpenArchive: (unlockId) => dispatch({ type: 'unlock', id: unlockId }),
    adviserTaken: state.unlocked.includes(adviserStep?.adviser?.unlocks),
    choice: chosen,
    /* The consequence panel wants the movement from the choice just made; the
       summary wants the whole day's. diffTrackers has been sitting in
       lib/trackers.js unused since Milestone 1 waiting for a day with more
       than one choice in it. */
    deltas:
      step?.kind === 'summary'
        ? diffTrackers(state.dayStartTrackers, state.trackers)
        : state.lastDeltas,
    trackers: state.trackers,
    unlockedToday: state.unlockedToday,
    /* The whole file, not just today's. A line gated on having read a document
       has to be able to ask whether it was ever read. */
    unlocked: state.unlocked,
    mandate,
    draft: state.draft,
  };

  return (
    <div className={styles.view} style={{ '--board-tint': mood.tint }}>
      {card === day.number &&
        (epigraph ? (
          <Epigraph epigraph={epigraph} day={day} onDone={dismissCard} />
        ) : (
          <DayCard day={day} onDone={dismissCard} />
        ))}
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
        <div className={`${styles.left} ${inConversation ? styles.recede : ''}`}>
          <MapPanel
            inspected={state.mapInspected}
            onInspect={() => dispatch({ type: 'inspectMap' })}
            day={day.number}
            progress={day.steps.length ? (state.stepIndex + 1) / day.steps.length : 0}
          />
          <DossierRail unlocked={state.unlocked} unlockedToday={state.unlockedToday} />
          {/* Every primary source shown so far, still open. A line gated on
              having read a document is only fair if the document can still
              be read on the day the line is offered. */}
          <ArchiveRail day={day} unlocked={state.unlocked} onOpen={stepProps.onOpenArchive} />
        </div>

        <main className={styles.centre}>
          <div className={styles.progress} aria-hidden="true">
            {day.steps.map((s, index) => (
              <span
                /* Keyed by id, not kind: from Day 2 a day can hold two steps
                   of the same kind — two conversations means two consequences. */
                key={s.id}
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

        <div className={`${styles.right} ${inConversation ? styles.recede : ''}`}>
          <TrackerColumn
            trackers={state.trackers}
            history={state.history}
            deltas={
              /* A step that bears a cost shows it the way a consequence does:
                 the needles move while the reason is on screen. */
              step?.kind === 'consequence' || step?.bearsByRole ? state.lastDeltas : {}
            }
          />
        </div>
      </div>

      {/* The tray is hidden on the summary step, which shows the draft itself
          in a larger form — two copies of the same sheet is one too many. */}
      {step?.kind !== 'summary' && <DraftingTray draft={state.draft} />}
    </div>
  );
}
