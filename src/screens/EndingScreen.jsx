import { resolveOutcome } from '../lib/outcome.js';
import { getModifier, getResolution, getRoleCloser } from '../data/endings.js';
import { TRACKERS } from '../data/trackers.js';
import { formatValue } from '../lib/format.js';
import ConsequencePanel from '../components/ending/ConsequencePanel.jsx';
import Teleprinter from '../components/ending/Teleprinter.jsx';
import ArchiveModule from '../components/panels/ArchiveModule.jsx';
import { Button, Reveal, SourceLine } from '../components/ui/index.jsx';
import { DEBRIEF, ENDING, PLAY } from '../data/copy.js';
import { getArchive } from '../data/archive.js';
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
  /* The two endings in which the deal was kept get the photograph of it being
     kept — a Soviet freighter leaving Cuba with its missiles on deck, uncovered
     so that American aircraft could count them — and the 29 October newsreel.
     Both used to sit in the Day 5 briefing, before the answer had come, and
     gave it away. Contained and ruptured get neither: nothing was kept. */
  const settledOut = resolution === 'settled' || resolution === 'fragile';
  const backdrop = settledOut ? getArchive('ship-departing') : null;

  return (
    <main className={styles.screen}>
      {backdrop?.file && (
        <Reveal className={styles.backdrop}>
          <figure className={styles.backdropFigure}>
            <img className={styles.backdropImage} src={`archive/${backdrop.file}`} alt={backdrop.caption} />
            <figcaption className={styles.backdropCaption}>
              <span className={styles.backdropTitle}>{backdrop.title}</span>
              <SourceLine source={backdrop.source} rights={backdrop.rights} onBoard />
            </figcaption>
          </figure>
        </Reveal>
      )}

      {/* The answer arriving: the resolution types itself onto the board
          under a wire line before the prose fades in. Same words as before. */}
      <Teleprinter
        eyebrow={ENDING.eyebrow}
        wire={ending.wire}
        label={ending.label}
        standfirst={ending.standfirst}
      />

      <Reveal delay={140} className={styles.prose}>
        {ending.body.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </Reveal>

      {settledOut && (
        <Reveal delay={200} className={styles.newsreel}>
          <span className="eyebrow">{ENDING.newsreelLabel}</span>
          <ArchiveModule id="un-crisis-eases" />
        </Reveal>
      )}

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

      {/* Only when the frame breaks. Every other ending reaches the document
          without passing through this, which is the whole point of it. */}
      {resolution === 'ruptured' && (
        <Reveal delay={460}>
          <ConsequencePanel />
        </Reveal>
      )}

      <Reveal delay={480}>
        <hr className={styles.rule} />
      </Reveal>

      {/* The statement, whole. */}
      <Reveal delay={520}>
        <div className={styles.statement} data-print="statement">
          {/* Stamped, because the draft in the tray has finally stopped being
              a draft. */}
          <span className={styles.delivered} aria-hidden="true">
            {ENDING.delivered}
          </span>
          <div className={styles.statementHead}>
            <span className={styles.statementTitle}>{ENDING.statementTitle}</span>
            <span className={styles.statementRole}>
              {role.name} · {role.delegation}
            </span>
          </div>

          {state.draft.map((entry) => (
            <div key={entry.dayNumber}>
              <p className={styles.line}>{entry.fragment}</p>
              {/* A clause that was argued from a document says so here, in the
                  finished statement, which is where it matters most: the
                  difference between a document that asserts and one that
                  cites is the whole of what a student is learning to write. */}
              {entry.citation && (
                <p className={styles.citation}>
                  <span className={styles.citationMark}>{PLAY.arguedFrom}</span>
                  {getArchive(entry.citation.archiveId)?.title}
                </p>
              )}
            </div>
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
          <Button variant="quiet" onClick={() => window.print()}>
            {ENDING.print}
          </Button>
        </div>
      </Reveal>
    </main>
  );
}
