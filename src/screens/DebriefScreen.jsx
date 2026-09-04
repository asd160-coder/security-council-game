import { readDocument, readEndingConditions, readMovement, readPath, readPatterns } from '../lib/debrief.js';
import {
  DISCUSSION,
  ENDING_CONDITIONS,
  HISTORY_NOTE,
  NOTES,
  OPENING,
  PATTERNS,
  POSTURE_NOTES,
  ROLE_REFLECTIONS,
  SECTIONS,
} from '../data/debrief.js';
import { AFTERWARDS } from '../data/history.js';
import { getResolution } from '../data/endings.js';
import { getArchive } from '../data/archive.js';
import { getTracker } from '../data/trackers.js';
import { formatDelta, formatValue } from '../lib/format.js';
import { Button, Eyebrow, Reveal } from '../components/ui/index.jsx';
import { DEBRIEF, PLAY } from '../data/copy.js';
import styles from './DebriefScreen.module.css';

/* The debrief.

   Everything on this page is derived from the run — no new state, no scoring,
   no marking. The five days are quoted back in the words the player chose at
   the time; the document is shown with its provenance; the closing is
   reproduced and explicitly not assessed.

   Its job is to make a twenty-five minute session worth discussing for
   another twenty. */

/* Five days as a line. Zero at the left, then where each completed day left
   the tracker; day ticks along the baseline; the register colour of the
   tracker; native titles on the points so a hover names the day and value.
   The ledger's numbers beside it remain the accessible reading. */
const CHART_CLASS = { danger: 'chartDanger', legitimacy: 'chartLegitimacy', neutral: 'chartNeutral' };

function DayChart({ series, register }) {
  const W = 160;
  const H = 36;
  const pad = 4;
  const x = (i) => pad + (i / Math.max(1, series.length - 1)) * (W - pad * 2);
  const y = (v) => H / 2 - (Math.max(-20, Math.min(20, v)) / 20) * (H / 2 - 4);
  const points = series.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  return (
    <svg
      className={`${styles.chart} ${styles[CHART_CLASS[register]] ?? ''}`}
      viewBox={`0 0 ${W} ${H}`}
      width={W}
      height={H}
      aria-hidden="true"
      focusable="false"
    >
      <line x1={pad} y1={H / 2} x2={W - pad} y2={H / 2} className={styles.chartZero} />
      {series.map((v, i) => (
        <line key={`t${i}`} x1={x(i)} y1={H / 2 - 2} x2={x(i)} y2={H / 2 + 2} className={styles.chartTick} />
      ))}
      <polyline points={points} className={styles.chartLine} />
      {series.map((v, i) => (
        <circle key={`p${i}`} cx={x(i)} cy={y(v)} r={i === series.length - 1 ? 3 : 2} className={styles.chartPoint}>
          <title>{i === 0 ? 'Start · 0' : `Day ${i} · ${formatValue(v)}`}</title>
        </circle>
      ))}
    </svg>
  );
}

const KIND_LABEL = { selected: 'Selected', revised: 'Revised', written: 'Written by you' };
const KIND_CLASS = { selected: 'kindSelected', revised: 'kindRevised', written: 'kindWritten' };

export default function DebriefScreen({ state, role, onRestart }) {
  const conditions = readEndingConditions(state, role.id);
  const ending = getResolution(conditions.resolution);
  const path = readPath(state, role.id);
  const document = readDocument(state);
  const patterns = readPatterns(state.trackers);
  const movement = readMovement(state);
  const reflection = ROLE_REFLECTIONS[role.id];

  return (
    <div className={styles.screen}>
      <Reveal className={styles.head}>
        <Eyebrow>{OPENING.eyebrow}</Eyebrow>
        <h1 className={styles.title}>{OPENING.title}</h1>
        <p className={styles.standfirst}>{OPENING.standfirst}</p>
      </Reveal>

      {/* ------------------------------------------------ Why it ended */}
      <Reveal delay={120} className={styles.section}>
        <div className={styles.sectionHead}>
          <Eyebrow>{SECTIONS.ending}</Eyebrow>
          <span className={styles.dayTitle}>{ending.label}</span>
        </div>
        <div className={styles.prose}>
          <p>{ENDING_CONDITIONS[conditions.resolution]}</p>
          {conditions.posture && POSTURE_NOTES[conditions.posture] && (
            <p>{POSTURE_NOTES[conditions.posture]}</p>
          )}
        </div>

        {/* The numbers the rule was actually applied to. `readEndingConditions`
            has gathered these since the debrief was built and the screen showed
            a restatement of the rule instead — which is the one thing its own
            comment says not to do. The figures are the honest version: this is
            what your run was standing at when the question was put. */}
        <div className={styles.conditions}>
          <span className={styles.conditionsLabel}>{DEBRIEF.conditionsLabel}</span>
          <div className={styles.conditionsRow}>
            {[
              ['escalation', conditions.escalation],
              ['councilTrust', conditions.councilTrust],
              ['legitimacy', conditions.legitimacy],
            ].map(([key, value]) => (
              <span key={key} className={styles.condition}>
                <span className={styles.conditionKey}>{getTracker(key)?.label}</span>
                <span className={styles.conditionValue}>{formatValue(value)}</span>
              </span>
            ))}
          </div>
          {conditions.finalLabel && (
            <p className={styles.conditionsFinal}>{DEBRIEF.finalWas(conditions.finalLabel)}</p>
          )}
        </div>
      </Reveal>

      {/* ------------------------------------------------ The five days */}
      <Reveal delay={180} className={styles.section}>
        <div className={styles.sectionHead}>
          <Eyebrow>{SECTIONS.path}</Eyebrow>
        </div>
        <div className={styles.path}>
          {path.map((entry) => (
            <div key={entry.day} className={styles.dayRow}>
              <div className={styles.dayMark}>
                <span className={styles.dayNumber}>{DEBRIEF.day(entry.day)}</span>
                <span className={styles.dayTitle}>{entry.title}</span>
              </div>
              <div className={styles.dayBody}>
                {/* What the day did to you before you said anything. */}
                {entry.bore && (
                  <span className={styles.boreNote}>
                    {DEBRIEF.bore(entry.bore.title)}
                    {' — '}
                    {Object.entries(entry.bore.effects)
                      .filter(([, value]) => value !== 0)
                      .map(([key, value]) => `${getTracker(key)?.label} ${formatDelta(value)}`)
                      .join(' · ')}
                  </span>
                )}
                {/* Only Day 4 has a council. Reading the mandate above the
                    choice is the point: what you agreed to do, then what you
                    did. */}
                {entry.mandate && (
                  <span className={styles.mandateNote}>{DEBRIEF.mandate(entry.mandate)}</span>
                )}
                {/* Day 2 said two things — one in the chamber and one in a room
                    with no minute taken. Reading them together is the day. */}
                {entry.alsoLabel && (
                  <div className={styles.alsoSaid}>
                    <span className={styles.alsoScene}>{entry.alsoScene}</span>
                    <span className={styles.choiceLabel}>{entry.alsoLabel}</span>
                    {entry.alsoLine && <p className={styles.choiceLine}>“{entry.alsoLine}”</p>}
                  </div>
                )}
                {entry.label && <span className={styles.choiceLabel}>{entry.label}</span>}
                {entry.line ? (
                  <p className={styles.choiceLine}>“{entry.line}”</p>
                ) : (
                  <p className={styles.consequence}>{DEBRIEF.noChoice}</p>
                )}
                {entry.consequence && <p className={styles.consequence}>{entry.consequence}</p>}
                {/* The reckoning's answer: what you said to the adviser you
                    overruled, and what they said last. */}
                {entry.answer && (
                  <div className={styles.answered}>
                    <span className={styles.answeredLabel}>{DEBRIEF.answered}</span>
                    <p className={styles.choiceLine}>“{entry.answer.line}”</p>
                    <p className={styles.consequence}>{entry.answer.close}</p>
                  </div>
                )}
                {entry.draftAction && (
                  <span className={styles.draftNote}>
                    {DEBRIEF.draftNote(entry.draftAction, entry.draftLabel)}
                  </span>
                )}

                {/* What the person in this chair actually did, beside what the
                    student did. Set apart and subordinate: the student's own
                    words stay the thing being read, and this is the second
                    data point rather than the answer. Rendered whatever the
                    student chose, including on a day they walked past. */}
                {entry.history && (
                  <div className={styles.history}>
                    <span className={styles.historyLabel}>{HISTORY_NOTE.label(role.name)}</span>
                    <p className={styles.historyText}>{entry.history.did}</p>
                    <p className={styles.historyThen}>
                      <span className={styles.historyThenLabel}>{HISTORY_NOTE.then}</span>
                      {entry.history.then}
                    </p>
                    <p className={styles.historySource}>{entry.history.source}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className={styles.caveat}>{HISTORY_NOTE.caveat}</p>
      </Reveal>

      {/* ------------------------------------------------ The document */}
      <Reveal delay={240} className={styles.section}>
        <div className={styles.sectionHead}>
          <Eyebrow>{SECTIONS.document}</Eyebrow>
        </div>
        <p className={styles.caveat}>{NOTES.documentCaveat}</p>
        <div className={styles.document}>
          {document.map((part, index) => (
            <div key={`${part.day}-${part.kind}-${index}`} className={styles.part}>
              <div className={styles.partHead}>
                <span className={styles.partDay}>{DEBRIEF.day(part.day)}</span>
                <span className={`${styles.partKind} ${styles[KIND_CLASS[part.kind]]}`}>
                  {part.kind === 'revised' && part.revisedOnDay
                    ? DEBRIEF.revisedOn(part.revisedOnDay)
                    : KIND_LABEL[part.kind]}
                </span>
                {part.label && <span className={styles.partDay}>{part.label}</span>}
              </div>
              <p className={styles.partText}>{part.text}</p>
              {/* Where a clause argued from a document rather than only
                  asserting, the debrief says so — as the ending does. */}
              {part.citation && (
                <p className={styles.partCitation}>
                  <span className={styles.partCitationMark}>{PLAY.arguedFrom}</span>
                  {getArchive(part.citation.archiveId)?.title}
                </p>
              )}
              {part.original && (
                <p className={styles.superseded}>
                  <span className={styles.supersededLabel}>{DEBRIEF.superseded}</span>
                  {part.original}
                </p>
              )}
            </div>
          ))}
        </div>
      </Reveal>

      {/* ------------------------------------------------ Their own words */}
      {state.closing && (
        <Reveal delay={300} className={styles.section}>
          <div className={styles.sectionHead}>
            <Eyebrow>{SECTIONS.words}</Eyebrow>
          </div>
          <div className={styles.ownWords}>
            <p className={styles.ownWordsText}>{state.closing}</p>
          </div>
          <p className={styles.caveat}>{NOTES.writingCaveat}</p>
        </Reveal>
      )}

      {/* ------------------------------------------------ The office */}
      <Reveal delay={360} className={styles.section}>
        <div className={styles.sectionHead}>
          <Eyebrow>{SECTIONS.role}</Eyebrow>
          <span className={styles.dayTitle}>{role.name}</span>
        </div>
        <div className={styles.prose}>
          {reflection.body.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
        <p className={styles.caveat}>{reflection.tension}</p>
      </Reveal>

      {/* ------------------------------------------------ What it traded */}
      <Reveal delay={420} className={styles.section}>
        <div className={styles.sectionHead}>
          <Eyebrow>{SECTIONS.trackers}</Eyebrow>
        </div>
        {patterns.length > 0 && (
          <div className={styles.patterns}>
            {patterns.map((key) => (
              <div key={key} className={styles.pattern}>
                <span className={styles.patternTitle}>{PATTERNS[key].title}</span>
                <p className={styles.patternText}>{PATTERNS[key].text}</p>
              </div>
            ))}
          </div>
        )}
        <div className={styles.ledger}>
          {movement.map((row) => (
            <div key={row.key} className={styles.ledgerRow}>
              <span className={styles.ledgerLabel}>{getTracker(row.key)?.label}</span>
              <DayChart
                series={[0, ...state.history.map((h) => h.trackers[row.key])]}
                register={getTracker(row.key)?.register}
              />
              <span className={styles.ledgerValue}>{formatValue(row.total)}</span>
              <span className={styles.ledgerTravel}>{DEBRIEF.travelled(row.travelled)}</span>
            </div>
          ))}
        </div>
        <p className={styles.caveat}>{NOTES.trackerCaveat}</p>
      </Reveal>

      {/* ------------------------------------------------ What followed */}
      {/* The game had a rich "before" — the background tab's road from 1961 —
          a simulated middle, and no "after" at all. This is the after, and it
          sits before the discussion prompts because two of them are much
          better questions once the student knows how it actually ended. */}
      <Reveal delay={480} className={styles.section}>
        <div className={styles.sectionHead}>
          <Eyebrow>{SECTIONS.history}</Eyebrow>
          <span className={styles.dayTitle}>{AFTERWARDS.title}</span>
        </div>
        <div className={styles.prose}>
          {AFTERWARDS.body.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
        <p className={styles.caveat}>{AFTERWARDS.note}</p>
      </Reveal>

      {/* ------------------------------------------------ For discussion */}
      <Reveal delay={540} className={styles.section}>
        <div className={styles.sectionHead}>
          <Eyebrow>{DISCUSSION.eyebrow}</Eyebrow>
        </div>
        <p className={styles.caveat}>{DISCUSSION.standfirst}</p>
        <div className={styles.prompts}>
          {DISCUSSION.prompts.map((prompt, index) => (
            <div key={prompt.q} className={styles.prompt}>
              <span className={styles.promptIndex}>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <p className={styles.promptQ}>{prompt.q}</p>
                <p className={styles.promptNote}>{prompt.note}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={600} className={styles.foot}>
        <p className={styles.caveat}>{NOTES.teacherBridge}</p>
        <div className={styles.actions}>
          <Button variant="primary" onClick={onRestart}>
            {DEBRIEF.restart}
          </Button>
          {/* The browser's own Save as PDF, reached through the print dialog.
              No library: the print engine sets better text than a client-side
              PDF builder, which either rasterises the page or needs its layout
              built by hand. Nothing is transmitted — the run has been in this
              browser all along and the student chooses who gets the file. */}
          <Button variant="quiet" onClick={() => window.print()}>
            {DEBRIEF.savePdf}
          </Button>
        </div>
      </Reveal>

      {/* ------------------------------------- The teacher's copy, for print */}
      {/* A different selection of the same run, not a second copy of its text:
          seat, outcome, the five decisions in the student's own words, the
          trade, and the closing they wrote. One page, so thirty of them can be
          collected.

          `display: none` on screen and shown only inside @media print, which
          also keeps it out of the accessibility tree — a screen reader should
          not read the run twice. */}
      <div className={styles.teacherCopy} data-print="teachers">
        <h2 className={styles.tcTitle}>{DEBRIEF.teacherCopyTitle}</h2>
        <p className={styles.tcMeta}>
          {role.name} · {role.title} — {ending.label}
        </p>

        <ol className={styles.tcDays}>
          {path.map((entry) => (
            <li key={entry.day} className={styles.tcDay}>
              <span className={styles.tcDayLabel}>
                {DEBRIEF.day(entry.day)} · {entry.title}
              </span>
              {entry.label && <span className={styles.tcChoice}>{entry.label}</span>}
              {entry.line ? (
                <p className={styles.tcLine}>“{entry.line}”</p>
              ) : (
                <p className={styles.tcLine}>{DEBRIEF.noChoice}</p>
              )}
            </li>
          ))}
        </ol>

        {patterns.length > 0 && (
          <p className={styles.tcTrade}>
            <span className={styles.tcLabel}>{DEBRIEF.teacherCopyTrade}</span>
            {patterns.map((key) => PATTERNS[key].title).join(' · ')}
          </p>
        )}

        {state.closing && (
          <div className={styles.tcClosing}>
            <span className={styles.tcLabel}>{DEBRIEF.teacherCopyClosing}</span>
            <p className={styles.tcClosingText}>{state.closing}</p>
          </div>
        )}

        <p className={styles.tcFoot}>{DEBRIEF.teacherCopyFoot}</p>
      </div>
    </div>
  );
}
