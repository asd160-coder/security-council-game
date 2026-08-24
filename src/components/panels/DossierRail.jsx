import { useCallback, useEffect, useState } from 'react';
import { getCard } from '../../data/cards.js';
import { getDossier } from '../../data/dossiers.js';
import { PLAY } from '../../data/copy.js';
import { Button, Eyebrow, Field, Paper, PaperBody } from '../ui/index.jsx';
import styles from './DossierRail.module.css';

/* Resolves an unlock id against both content sets, so the rail does not care
   whether an item is a perspective card or an intelligence note. */
export function resolveEntry(id) {
  const card = getCard(id);
  if (card) return { ...card, type: 'card' };
  const dossier = getDossier(id);
  if (dossier) return { ...dossier, type: 'dossier' };
  return null;
}

const KIND_CLASS = {
  country: styles.kindCountry,
  actor: styles.kindActor,
  intelligence: styles.kindIntelligence,
  channel: styles.kindChannel,
  procedure: styles.kindProcedure,
  geography: styles.kindGeography,
  memo: styles.kindMemo,
};

const KIND_LABEL = {
  country: 'Country',
  actor: 'Actor',
  intelligence: 'Intel',
  channel: 'Channel',
  procedure: 'Procedure',
  geography: 'Geography',
  memo: 'Memo',
};

export function EntryCard({ entry }) {
  if (entry.type === 'card') {
    return (
      <Paper eyebrow={`${KIND_LABEL[entry.kind]} · ${entry.subtitle}`} title={entry.name}>
        <Field label="Core interests">{entry.interests}</Field>
        <Field label="Public message">{entry.publicMessage}</Field>
        <Field label="Private concern">{entry.privateConcern}</Field>
        <Field label="Preferred style">{entry.style}</Field>
        <Field label="Red lines">{entry.redLines}</Field>
        <Field label="Possible concessions">{entry.concessions}</Field>
      </Paper>
    );
  }

  return (
    <Paper eyebrow={entry.label} title={entry.title}>
      <PaperBody paragraphs={entry.body} />
      <Field label={PLAY.soWhat}>{entry.soWhat}</Field>
    </Paper>
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

      {open && (
        <div
          className={styles.viewer}
          role="dialog"
          aria-modal="true"
          aria-label={open.type === 'card' ? open.name : open.title}
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div className={styles.viewerInner}>
            <EntryCard entry={open} />
            <Button className={styles.viewerClose} onClick={close} autoFocus>
              {PLAY.close}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
