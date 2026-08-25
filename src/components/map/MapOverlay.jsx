import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import CrisisMap from './CrisisMap.jsx';
import { RANGE_RINGS } from './geography.js';
import { getDossier } from '../../data/dossiers.js';
import { PLAY } from '../../data/copy.js';
import { Button, Eyebrow } from '../ui/index.jsx';
import styles from './MapOverlay.module.css';

/* The map at full size.

   The rings are the most informative thing the interface draws and they are
   illegible in a 260px rail, so this is where they are actually read. The
   reading column carries the same geography note that gets filed — the file
   keeps the record on paper, this is the live instrument.

   Rendered through a portal, not in place. The left rail is position: sticky,
   which creates a stacking context, and a fixed overlay inside one is trapped
   there — the scene column painted straight over the top of it no matter what
   z-index the overlay claimed. */

export default function MapOverlay({ onClose }) {
  const closeRef = useRef(null);
  const note = getDossier('note-geography');

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return createPortal(
    <div
      className={styles.scrim}
      role="dialog"
      aria-modal="true"
      aria-label={PLAY.mapOverlayTitle}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.panel}>
        <div className={styles.head}>
          <div className={styles.heading}>
            <Eyebrow>{PLAY.mapOverlayDay(1)}</Eyebrow>
            <h2 className={styles.title}>{PLAY.mapOverlayTitle}</h2>
          </div>
          <Button ref={closeRef} onClick={onClose}>
            {PLAY.close}
          </Button>
        </div>

        <div className={styles.body}>
          <div className={styles.mapWrap}>
            <CrisisMap frame="regional" showRings />
          </div>

          <aside className={styles.aside}>
            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <span className={styles.swatchSite} aria-hidden="true" />
                <span className={styles.legendText}>Missile site</span>
              </div>
              {RANGE_RINGS.map((ring) => (
                <div key={ring.id} className={styles.legendItem}>
                  <span className={styles.swatchRing} aria-hidden="true" />
                  <span className={styles.legendText}>
                    {ring.label}
                    <span className={styles.legendNote}>{ring.note}</span>
                  </span>
                </div>
              ))}
            </div>

            {note && (
              <div className={styles.note}>
                {note.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            )}

            <p className={styles.scale}>{PLAY.mapScale}</p>
          </aside>
        </div>
      </div>
    </div>,
    document.body,
  );
}
