import { useCallback, useState } from 'react';
import { DAYS } from '../../data/days/index.js';
import { getArchive } from '../../data/archive.js';
import { PLAY } from '../../data/copy.js';
import ArchiveOverlay from './ArchiveOverlay.jsx';
import { Eyebrow } from '../ui/index.jsx';
import styles from './ArchiveRail.module.css';

/* Every primary source shown so far, still open.

   The archive used to exist only inside the briefing that introduced each
   item. That made the one mechanic which rewards reading a document — Day 4's
   legal line, gated on the quarantine proclamation — unfair in practice: the
   proclamation was shown on Day 2, the day was gone, and a student who met
   the locked line had no way back to the thing it asked for.

   Derived, not stored: the list is every archive id declared by a briefing
   up to today, which is exactly what the player has been shown. Opening a
   document here files what it teaches, the same act as opening it in the
   briefing. A document whose lesson is not yet filed is marked unread. */

const KIND_CLASS = {
  image: 'kindImage',
  audio: 'kindAudio',
  document: 'kindDocument',
};

export function archiveUpTo(dayNumber) {
  return DAYS.filter((day) => day.number <= dayNumber)
    .flatMap((day) =>
      day.steps
        .filter((step) => step.kind === 'briefing')
        .flatMap((step) => step.archiveIds ?? (step.archiveId ? [step.archiveId] : [])),
    )
    .map((id) => getArchive(id))
    .filter(Boolean);
}

export default function ArchiveRail({ day, unlocked = [], onOpen }) {
  const [openId, setOpenId] = useState(null);
  const close = useCallback(() => setOpenId(null), []);

  const items = archiveUpTo(day.number);
  const open = openId ? getArchive(openId) : null;
  if (items.length === 0) return null;

  const unread = (item) =>
    item.kind === 'document' && Boolean(item.unlocks) && !unlocked.includes(item.unlocks);

  return (
    <>
      <section className={styles.rail} aria-label={PLAY.archive}>
        <div className={styles.head}>
          <Eyebrow>{PLAY.archive}</Eyebrow>
          <span className={styles.count}>{PLAY.archiveCount(items.length)}</span>
        </div>

        <div className={styles.list}>
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.item} ${styles[KIND_CLASS[item.kind]] ?? ''}`}
              onClick={() => {
                setOpenId(item.id);
                /* Examining a document is the act that files it — the same
                   rule as the briefing and the map. */
                if (item.kind === 'document' && item.unlocks) onOpen?.(item.unlocks);
              }}
              aria-label={`${PLAY.archiveExpand}: ${item.title}`}
            >
              <span className={styles.itemKind}>{PLAY.archiveKind[item.kind]}</span>
              <span className={styles.itemName}>{item.title}</span>
              {unread(item) && <span className={styles.isUnread}>{PLAY.archiveUnread}</span>}
            </button>
          ))}
        </div>
      </section>

      {open && <ArchiveOverlay item={open} onClose={close} />}
    </>
  );
}
