import { TRACKERS } from '../../data/trackers.js';
import { trackerPosition } from '../../lib/trackers.js';
import { deltaRegister, formatDelta, formatValue } from '../../lib/format.js';
import { PLAY } from '../../data/copy.js';
import { Eyebrow } from '../ui/index.jsx';
import styles from './TrackerColumn.module.css';

const REGISTER_CLASS = {
  danger: styles.registerDanger,
  legitimacy: styles.registerLegitimacy,
  neutral: styles.registerNeutral,
};

const DELTA_CLASS = {
  danger: styles.deltaDanger,
  calm: styles.deltaCalm,
  legitimacy: styles.deltaLegitimacy,
  neutral: styles.deltaNeutral,
};

/* Eleven ticks: one for every whole value from -8 to +8 in steps of 1.6, with
   the centre one marked. The exact count matters less than the impression of a
   graduated scale rather than a progress bar. */
const TICKS = Array.from({ length: 17 }, (_, i) => i);

function Gauge({ tracker, value, delta, showMeaning }) {
  const position = trackerPosition(value);
  const register = deltaRegister(tracker.register, delta ?? 0);

  return (
    <div className={`${styles.gauge} ${REGISTER_CLASS[tracker.register]}`}>
      <div className={styles.gaugeHead}>
        <span className={styles.label}>{tracker.label}</span>
        <span className={styles.readout}>
          {formatValue(value)}
          {delta ? (
            <span className={`${styles.delta} ${DELTA_CLASS[register]}`}>{formatDelta(delta)}</span>
          ) : null}
        </span>
      </div>

      <div className={styles.track}>
        <div className={styles.ticks} aria-hidden="true">
          {TICKS.map((tick) => (
            <span
              key={tick}
              className={`${styles.tick} ${tick === 8 ? styles.tickZero : ''}`}
            />
          ))}
        </div>
        <div className={styles.needle} style={{ left: `${position * 100}%` }} />
      </div>

      {showMeaning && <p className={styles.meaning}>{tracker.meaning}</p>}
    </div>
  );
}

export default function TrackerColumn({ trackers, deltas = {}, showMeaning = false }) {
  /* The whole column is a live region: when a choice moves the needles, a
     screen reader hears what changed rather than being left with a silent
     visual. */
  return (
    <section className={styles.column} aria-label={PLAY.trackers}>
      <div className={styles.head}>
        <Eyebrow>{PLAY.trackers}</Eyebrow>
      </div>
      <p className={styles.note}>{PLAY.trackersNote}</p>

      <div aria-live="polite">
        {TRACKERS.map((tracker) => (
          <Gauge
            key={tracker.key}
            tracker={tracker}
            value={trackers[tracker.key]}
            delta={deltas[tracker.key]}
            showMeaning={showMeaning}
          />
        ))}
      </div>
    </section>
  );
}
