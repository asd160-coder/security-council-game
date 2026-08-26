import { useMemo, useState } from 'react';
import { Button, Reveal } from '../ui/index.jsx';
import { PLAY } from '../../data/copy.js';
import styles from './steps.module.css';

/* The culminating writing task.

   The thing that makes this authorship rather than a form field is what sits
   above the box: the statement assembled since Day 1, with the student's own
   sentences rendering into position beneath it as they type. They are
   finishing a document, in its register, that they have been building for four
   days — not answering a question about one.

   The game does not judge the prose and does not pretend to. What it does is
   carry it into the ending and quote it back, which is honest and is what
   makes a debrief possible later.

   The gate is soft: roughly two sentences enables Continue, with one plain
   line saying what is still wanted. A hard block frustrates a classroom; no
   gate at all makes this skippable furniture. */

const countSentences = (text) =>
  text.split(/[.!?]+(?:\s|$)/).filter((part) => part.trim().length > 3).length;

const countWords = (text) => text.trim().split(/\s+/).filter(Boolean).length;

export default function WritingStep({ step, role, draft, onSubmit }) {
  const prompt = step.promptByRole[role.id];
  const [text, setText] = useState(prompt.stem ?? '');

  const { sentences, words, ready } = useMemo(() => {
    const s = countSentences(text);
    const w = countWords(text);
    return { sentences: s, words: w, ready: s >= step.minSentences && w >= step.minWords };
  }, [text, step.minSentences, step.minWords]);

  return (
    <div className={`${styles.step} ${styles.stepWide}`}>
      <Reveal className={styles.head}>
        <span className="eyebrow">{step.eyebrow}</span>
      </Reveal>

      <Reveal delay={100} className={styles.prose}>
        <p>{prompt.brief}</p>
      </Reveal>

      {/* The document, with the closing rendering into place as it is typed.
          This is the scaffold: nobody is looking at a blank page. */}
      <Reveal delay={180}>
        <div className={styles.clauseSheet}>
          <span className={styles.clauseLabel}>{step.statementLabel}</span>
          {draft.map((entry, index) => (
            <p key={entry.dayNumber} className={styles.statementLine}>
              <span className={styles.statementIndex}>{index + 1}</span>
              {entry.fragment}
            </p>
          ))}
          <p className={`${styles.statementLine} ${styles.statementClosing}`}>
            <span className={styles.statementIndex}>{draft.length + 1}</span>
            {text.trim() ? (
              text
            ) : (
              <span className={styles.clausePending}>{step.pendingText}</span>
            )}
          </p>
        </div>
      </Reveal>

      <Reveal delay={260} className={styles.writingBlock}>
        <label className={styles.writingLabel} htmlFor="closing-statement">
          {prompt.instruction}
        </label>
        <p className={styles.writingGuide} id="closing-guide">
          {step.guidance}
        </p>
        <textarea
          id="closing-statement"
          className={styles.writingBox}
          aria-describedby="closing-guide"
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={6}
          spellCheck="true"
          placeholder={prompt.placeholder}
        />
        <div className={styles.writingFoot}>
          <span className={styles.writingCount} aria-live="polite">
            {PLAY.writingCount(sentences, words)}
          </span>
          {!ready && <span className={styles.writingNeeds}>{step.needsMore}</span>}
        </div>
      </Reveal>

      <Reveal delay={340} className={styles.actions}>
        <Button variant="primary" disabled={!ready} onClick={() => onSubmit(text.trim())}>
          {step.advanceLabel}
        </Button>
      </Reveal>
    </div>
  );
}
