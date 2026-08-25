import { useCallback, useState } from 'react';
import CrisisMap from '../map/CrisisMap.jsx';
import MapOverlay from '../map/MapOverlay.jsx';
import useDelayedFrame from '../../lib/useDelayedFrame.js';
import { RANGE_RINGS } from '../map/geography.js';
import { PLAY } from '../../data/copy.js';
import { Eyebrow } from '../ui/index.jsx';
import styles from './MapPanel.module.css';

/* The map panel.

   Opening the map at full size IS inspecting it: one action rather than a
   button that unlocks and a separate control that enlarges. The first open
   files the strategic geography note and draws the rings; every later open is
   the player consulting a reference they have earned.

   Two triggers for that one action — the map itself, because people click
   maps, and a labelled control beneath it, because a corner mark alone is
   easy to miss. */

export default function MapPanel({ inspected, onInspect }) {
  const [open, setOpen] = useState(false);
  const frame = useDelayedFrame(inspected);

  const openOverlay = useCallback(() => {
    setOpen(true);
    onInspect();
  }, [onInspect]);

  return (
    <>
      <section className={styles.panel} aria-label={PLAY.map}>
        <div className={styles.head}>
          <Eyebrow>{PLAY.map}</Eyebrow>
          {inspected && <span className={styles.inspected}>{PLAY.mapInspected}</span>}
        </div>

        <button
          type="button"
          className={styles.frameButton}
          onClick={openOverlay}
          aria-label={PLAY.mapExpand}
        >
          {/* No labels in the rail: at this width they are unreadable, and they
              are what made the panel feel cluttered. They return at full size. */}
          <CrisisMap frame={frame} showRings={inspected} labels={false} />
          <span className={styles.expandMark} aria-hidden="true" />
        </button>

        <button type="button" className={styles.inspect} onClick={openOverlay}>
          {PLAY.mapExpand}
        </button>

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

          <span className={styles.schematic}>{PLAY.mapScale}</span>
        </div>
      </section>

      {open && <MapOverlay onClose={() => setOpen(false)} />}
    </>
  );
}
