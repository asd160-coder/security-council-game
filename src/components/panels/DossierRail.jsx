import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { KIND_LABEL, resolveEntry } from '../../lib/entries.js';
import { PLAY } from '../../data/copy.js';
import { Button, Eyebrow, Field, Paper, PaperBody } from '../ui/index.jsx';
import useDialog from '../ui/useDialog.js';
import styles from './DossierRail.module.css';

const KIND_CLASS = {
  country: styles.kindCountry,
  actor: styles.kindActor,
  intelligence: styles.kindIntelligence,
  channel: styles.kindChannel,
  procedure: styles.kindProcedure,
  geography: styles.kindGeography,
  memo: styles.kindMemo,
};

/* `compact` is the version the consequence and summary screens show: the
   title and the one line that says what the entry changes. The whole card
   stayed on those screens for twenty-odd milestones and was the same card the
   rail had just filed, read twice within a minute. The viewer and the rail
   always show it whole. */
export function EntryCard({ entry, compact = false }) {
  if (entry.type === 'card') {
    return (
      <Paper eyebrow={`${KIND_LABEL[entry.kind]} · ${entry.subtitle}`} title={entry.name}>
        <Field label="Core interests">{entry.interests}</Field>
        {!compact && (
          <>
            <Field label="Public message">{entry.publicMessage}</Field>
            <Field label="Private concern">{entry.privateConcern}</Field>
            <Field label="Preferred style">{entry.style}</Field>
            <Field label="Red lines">{entry.redLines}</Field>
            <Field label="Possible concessions">{entry.concessions}</Field>
          </>
        )}
      </Paper>
    );
  }

  return (
    <Paper eyebrow={entry.label} title={entry.title} format={entry.kind === 'memo' ? 'memo' : undefined}>
      {!compact && <PaperBody paragraphs={entry.body} />}
      <Field label={PLAY.soWhat}>{entry.soWhat}</Field>
    </Paper>
  );
}

/* Its own component so useDialog can manage it — a hook cannot be called
   conditionally, and this viewer only exists while an entry is open. */
function DossierViewer({ entry, onClose }) {
  const dialogRef = useDialog(onClose);

  return (
    <div
      ref={dialogRef}
      tabIndex={-1}
      className={styles.viewer}
      role="dialog"
      aria-modal="true"
      aria-label={entry.type === 'card' ? entry.name : entry.title}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.viewerInner}>
        <EntryCard entry={entry} />
        <Button className={styles.viewerClose} onClick={onClose}>
          {PLAY.close}
        </Button>
      </div>
    </div>
  );
}

export default function DossierRail({ unlocked, unlockedToday = [] }) {
  const [openId, setOpenId] = useState(null);

  const close = useCallback(() => setOpenId(null), []);

  useEffect(() => {
    if (!openId) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openId, close]);

  const entries = unlocked.map(resolveEntry).filter(Boolean);
  const open = openId ? resolveEntry(openId) : null;

  return (
    <>
      <section className={styles.rail} aria-label={PLAY.file}>
        <div className={styles.head}>
          <Eyebrow>{PLAY.file}</Eyebrow>
          {entries.length > 0 && (
            <span className={styles.count}>{PLAY.fileCount(entries.length)}</span>
          )}
        </div>

        {entries.length === 0 ? (
          <p className={styles.empty}>{PLAY.fileEmpty}</p>
        ) : (
          <div className={styles.list}>
            {entries.map((entry) => (
              <button
                key={entry.id}
                type="button"
                className={`${styles.item} ${KIND_CLASS[entry.kind]} ${
                  openId === entry.id ? styles.itemActive : ''
                }`}
                onClick={() => setOpenId(entry.id)}
                aria-label={`Open ${KIND_LABEL[entry.kind]}: ${
                  entry.type === 'card' ? entry.name : entry.title
                }`}
              >
                <span className={styles.itemKind}>{KIND_LABEL[entry.kind]}</span>
                <span className={styles.itemName}>
                  {entry.type === 'card' ? entry.name : entry.title}
                </span>
                {unlockedToday.includes(entry.id) && <span className={styles.isNew}>New</span>}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Portalled for the same reason as the map overlay: the rail this lives
          in is position: sticky, and a fixed element inside that stacking
          context paints beneath its siblings whatever its z-index. */}
      {open &&
        createPortal(
          <DossierViewer entry={open} onClose={close} />,
          document.body,
        )}
    </>
  );
}
