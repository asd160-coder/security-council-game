import { resolveOutcome } from '../lib/outcome.js';
import { getModifier, getResolution, getRoleCloser } from '../data/endings.js';
import { TRACKERS } from '../data/trackers.js';
import { formatValue } from '../lib/format.js';
import { Button, Reveal } from '../components/ui/index.jsx';
import { DEBRIEF, ENDING } from '../data/copy.js';
import styles from './EndingScreen.module.css';

/* How the run resolved.

   Three layers, in the order they matter: what happened, what it left this
   particular person holding, and what it cost. The last of those is why a
   settled crisis and a good outcome are allowed to come apart here.

   Then the document, complete for the first time — four days of assembled
   clauses and the student's own closing as its final paragraph. That is the
   artefact the session produces, and the thing a teacher can actually read. */

export default function EndingScreen({ state, role, onRestart, onDebrief }) {
  const { resolution, modifiers } = resolveOutcome({
    trackers: state.trackers,
    choices: state.choices,
    roleId: role.id,
  });

  const ending = getResolution(resolution);
  const closer = getRoleCloser(resolution, role.id);

  return (
    <div className={styles.screen}>
      <Reveal className={styles.head}>
        <span className={styles.label}>{ENDING.eyebrow}</span>
        <h1 className={styles.title}>{ending.label}</h1>
        <p className={styles.standfirst}>{ending.standfirst}</p>
      </Reveal>

      <Reveal delay={140} className={styles.prose}>
        {ending.body.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </Reveal>

      {closer && (
        <Reveal delay={260} className={styles.closer}>
          <p className={styles.closerText}>{closer}</p>
        </Reveal>
      )}

      {modifiers.length > 0 && (
        <>
          <Reveal delay={340}>
            <hr className={styles.rule} />
          </Reveal>
          <Reveal delay={380}>
            <span className="eyebrow">{ENDING.cost}</span>
          </Reveal>
          <Reveal delay={420} className={styles.modifiers}>
            {modifiers.map((key) => {
              const modifier = getModifier(key);
              if (!modifier) return null;
              return (
                <div key={key} className={styles.modifier}>
                  <span className={styles.modifierLabel}>{modifier.label}</span>
                  <p className={styles.modifierText}>{modifier.text}</p>
                </div>
              );
            })}
          </Reveal>
        </>
      )}

      <Reveal delay={480}>
        <hr className={styles.rule} />
      </Reveal>

      {/* The statement, whole. */}
      <Reveal delay={520}>
        <div className={styles.statement}>
          <div className={styles.statementHead}>
            <span className={styles.statementTitle}>{ENDING.statementTitle}</span>
            <span className={styles.statementRole}>
              {role.name} · {role.delegation}
            </span>
          </div>

          {state.draft.map((entry) => (
            <p key={entry.dayNumber} className={styles.line}>
              {entry.fragment}
            </p>
          ))}

          {state.closing && (
            <div className={styles.ownWords}>
              <span className={styles.ownWordsLabel}>{ENDING.ownWords}</span>
              <p className={styles.line}>{state.closing}</p>
            </div>
          )}
        </div>
      </Reveal>

      <Reveal delay={580} className={styles.standing}>
        {TRACKERS.map((tracker) => (
          <span key={tracker.key} className={styles.standingItem}>
            <span className={styles.standingLabel}>{tracker.label}</span>
            <span className={styles.standingValue}>{formatValue(state.trackers[tracker.key])}</span>
          </span>
        ))}
      </Reveal>

      <Reveal delay={640} className={styles.foot}>
        <p className={styles.next}>{ENDING.next}</p>
        <div className={styles.actions}>
          <Button variant="primary" onClick={onDebrief}>
            {DEBRIEF.enter}
          </Button>
          <Button onClick={onRestart}>{ENDING.restart}</Button>
        </div>
      </Reveal>
    </div>
  );
}
