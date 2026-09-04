import CrisisMap from './CrisisMap.jsx';
import { RANGE_RINGS } from './geography.js';
import { getDossier } from '../../data/dossiers.js';
import { PLAY } from '../../data/copy.js';
import Overlay from '../ui/Overlay.jsx';
import styles from './MapOverlay.module.css';

/* The map at full size.

   The rings are the most informative thing the interface draws and they are
   illegible in a 260px rail, so this is where they are actually read. The
   reading column carries the same geography note that gets filed — the file
   keeps the record on paper, this is the live instrument. */

export default function MapOverlay({ onClose, day = 1 }) {
  const note = getDossier('note-geography');

  return (
    <Overlay
      eyebrow={PLAY.mapOverlayDay(day)}
      title={PLAY.mapOverlayTitle}
      onClose={onClose}
    >
      <div className={styles.mapWrap}>
        <CrisisMap frame="regional" showRings day={day} />
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
          {day >= 2 && (
            <div className={styles.legendItem}>
              <span className={styles.swatchArc} aria-hidden="true" />
              <span className={styles.legendText}>
                {PLAY.mapQuarantine}
                <span className={styles.legendNote}>{PLAY.mapQuarantineNote}</span>
              </span>
            </div>
          )}
          {day >= 2 && (
            <div className={styles.legendItem}>
              <span className={styles.swatchShip} aria-hidden="true" />
              <span className={styles.legendText}>
                {PLAY.mapPositions}
              </span>
            </div>
          )}
        </div>

        {note && (
          <div className={styles.note}>
            {note.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        )}

        {day >= 4 && <p className={styles.scale}>{PLAY.mapTurkey}</p>}
        <p className={styles.scale}>{PLAY.mapScale}</p>
      </aside>
    </Overlay>
  );
}
