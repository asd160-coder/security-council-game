import { PLAY } from '../../data/copy.js';
import { getArchive } from '../../data/archive.js';
import { Eyebrow } from '../ui/index.jsx';
import styles from './DraftingTray.module.css';

/* The statement, assembled one fragment per day.

   On Day 1 it holds a single line. The tray exists in this slice anyway,
   because its job across the full scenario is to make the drafting ladder
   visible from the beginning — a student should be able to see the document
   growing, not discover it on Day 5. */

/* One clause. `index` is its place in the whole statement, whichever part of
   the sheet it is shown on. */
function Fragment({ entry, index }) {
  return (
    <div className={styles.fragment}>
      <div className={styles.fragmentHead}>
        <span className={styles.fragmentIndex}>{PLAY.draftFragment(index + 1)}</span>
        {/* The clause's own character, not the last action taken on it.
            Rewriting it renames it; leaving it alone does not. */}
        <span className={styles.fragmentTone}>
          {entry.revised ? entry.label : (entry.originalLabel ?? entry.label)}
        </span>
        {entry.revised && <span className={styles.revisedMark}>{PLAY.revised}</span>}
      </div>
      <p className={styles.fragmentText}>{entry.fragment}</p>
      {/* What the clause argues from. A statement that cites its source is a
          different kind of document from one that only asserts. */}
      {entry.citation && (
        <p className={styles.citation}>
          <span className={styles.citationMark}>{PLAY.arguedFrom}</span>
          “{entry.citation.quote}”
          <span className={styles.citationSource}>{getArchive(entry.citation.archiveId)?.title}</span>
        </p>
      )}
      {/* A revised clause keeps the line it replaced. The point of a drafting
          ladder is that the document has a history, and that is only legible
          if the earlier wording is still visible. */}
      {entry.revised && entry.original && entry.original !== entry.fragment && (
        <p className={styles.fragmentOriginal}>
          <span className={styles.originalLabel}>{PLAY.previously}</span>
          {entry.original}
        </p>
      )}
    </div>
  );
}

export default function DraftingTray({ draft, compact = false, latest = false }) {
  /* On the end-of-day summary only the newest clause is open. The statement
     was on the tray all day; here the rest is one click away, so the summary
     reads as a summary rather than reprinting the document every evening. */
  const earlier = latest ? draft.slice(0, -1) : [];
  const shown = latest ? draft.slice(-1) : draft;

  return (
    <section className={`${styles.tray} ${compact ? styles.compact : ''}`} aria-label={PLAY.draft}>
      <div className={styles.head}>
        <Eyebrow>{PLAY.draft}</Eyebrow>
      </div>

      {draft.length === 0 ? (
        <p className={styles.empty}>{PLAY.draftEmpty}</p>
      ) : (
        <div className={styles.sheet}>
          {earlier.length > 0 && (
            <details className={styles.earlier}>
              <summary className={styles.earlierLabel}>{PLAY.draftEarlier(earlier.length)}</summary>
              {earlier.map((entry, index) => (
                <Fragment key={entry.dayNumber} entry={entry} index={index} />
              ))}
            </details>
          )}
          {shown.map((entry, index) => (
            <Fragment key={entry.dayNumber} entry={entry} index={earlier.length + index} />
          ))}
        </div>
      )}
    </section>
  );
}
