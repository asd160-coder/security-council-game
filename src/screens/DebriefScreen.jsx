import { readDocument, readEndingConditions, readMovement, readPath, readPatterns } from '../lib/debrief.js';
import {
  DISCUSSION,
  ENDING_CONDITIONS,
  NOTES,
  OPENING,
  PATTERNS,
  POSTURE_NOTES,
  ROLE_REFLECTIONS,
  SECTIONS,
} from '../data/debrief.js';
import { getResolution } from '../data/endings.js';
import { getTracker } from '../data/trackers.js';
import { formatValue } from '../lib/format.js';
import { Button, Eyebrow, Reveal } from '../components/ui/index.jsx';
import { DEBRIEF } from '../data/copy.js';
import styles from './DebriefScreen.module.css';

/* The debrief.

   Everything on this page is derived from the run — no new state, no scoring,
   no marking. The five days are quoted back in the words the player chose at
   the time; the document is shown with its provenance; the closing is
   reproduced and explicitly not assessed.

   Its job is to make a twenty-five minute session worth discussing for
   another twenty. */

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
                {entry.label && <span className={styles.choiceLabel}>{entry.label}</span>}
                {entry.line ? (
                  <p className={styles.choiceLine}>“{entry.line}”</p>
                ) : (
                  <p className={styles.consequence}>{DEBRIEF.noChoice}</p>
                )}
                {entry.consequence && <p className={styles.consequence}>{entry.consequence}</p>}
                {entry.draftAction && (
                  <span className={styles.draftNote}>
                    {DEBRIEF.draftNote(entry.draftAction, entry.draftLabel)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
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
              <span className={styles.ledgerValue}>{formatValue(row.total)}</span>
              <span className={styles.ledgerTravel}>{DEBRIEF.travelled(row.travelled)}</span>
            </div>
          ))}
        </div>
        <p className={styles.caveat}>{NOTES.trackerCaveat}</p>
      </Reveal>

      {/* ------------------------------------------------ For discussion */}
      <Reveal delay={480} className={styles.section}>
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

      <Reveal delay={540} className={styles.foot}>
        <p className={styles.caveat}>{NOTES.teacherBridge}</p>
        <div className={styles.actions}>
          <Button variant="primary" onClick={onRestart}>
            {DEBRIEF.restart}
          </Button>
        </div>
      </Reveal>
    </div>
  );
}
