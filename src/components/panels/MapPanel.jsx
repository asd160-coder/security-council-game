import CrisisMap from '../map/CrisisMap.jsx';
import useDelayedFrame from '../../lib/useDelayedFrame.js';
import { RANGE_RINGS } from '../map/geography.js';
import { PLAY } from '../../data/copy.js';
import { Button, Eyebrow } from '../ui/index.jsx';
import styles from './MapPanel.module.css';

/* The map panel.

   Inspecting is a real action with a real reward: the frame moves to the
   Caribbean, the range rings draw, and the strategic geography note is filed.
   Before that the map is still doing work — it is showing the four capitals
   this crisis runs between. */

export default function MapPanel({ inspected, onInspect }) {
  const frame = useDelayedFrame(inspected);

  return (
    <section className={styles.panel} aria-label={PLAY.map}>
      <div className={styles.head}>
        <Eyebrow>{PLAY.map}</Eyebrow>
        {inspected && <span className={styles.inspected}>{PLAY.mapInspected}</span>}
      </div>

      <div className={styles.frame}>
        <CrisisMap frame={frame} showRings={inspected} />
      </div>

      {/* The inspect control sits under the map rather than in its header:
          in a 260px rail a header with a button in it wraps to four lines,
          and this reads more clearly as an action on the thing above it. */}
      {!inspected && (
        <button type="button" className={styles.inspect} onClick={onInspect}>
          {PLAY.mapHint}
        </button>
      )}

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.swatchSite} aria-hidden="true" />
          <span className={styles.legendText}>Missile site</span>
        </div>

        {inspected &&
          RANGE_RINGS.map((ring) => (
            <div key={ring.id} className={styles.legendItem}>
              <span className={styles.swatchRing} aria-hidden="true" />
              <span className={styles.legendText}>
                {ring.label}
                <br />
                <span className={styles.legendNote}>{ring.note}</span>
              </span>
            </div>
          ))}

        <span className={styles.schematic}>Coastlines schematic · ranges to scale</span>
      </div>
    </section>
  );
}
