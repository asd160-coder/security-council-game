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

const SPARK_CLASS = {
  danger: styles.sparkDanger,
  legitimacy: styles.sparkLegitimacy,
  neutral: styles.sparkNeutral,
};

/* The run so far, as a line: zero, then where each finished day left this
   tracker, then now. One series, in the tracker's own register colour, with
   no axis and no labels — the readout beside it is the accessible value and
   the debrief carries the full ledger. A history of one point is a dot; the
   line grows a segment each day, which is the point of drawing it. */
function Sparkline({ tracker, series }) {
  const W = 60;
  const H = 16;
  const x = (i) => (series.length > 1 ? (i / (series.length - 1)) * (W - 4) + 2 : W / 2);
  const y = (v) => H / 2 - (Math.max(-20, Math.min(20, v)) / 20) * (H / 2 - 1.5);
  const points = series.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const last = series[series.length - 1];
  return (
    <svg
      className={`${styles.spark} ${SPARK_CLASS[tracker.register]}`}
      viewBox={`0 0 ${W} ${H}`}
      width={W}
      height={H}
      aria-hidden="true"
      focusable="false"
    >
      <line x1="0" y1={H / 2} x2={W} y2={H / 2} className={styles.sparkZero} />
      {series.length > 1 && <polyline points={points} className={styles.sparkLine} />}
      <circle cx={x(series.length - 1)} cy={y(last)} r="1.8" className={styles.sparkEnd} />
    </svg>
  );
}

function Gauge({ tracker, value, delta, showMeaning, series }) {
  const position = trackerPosition(value);
  const register = deltaRegister(tracker.register, delta ?? 0);

  return (
    <div className={`${styles.gauge} ${REGISTER_CLASS[tracker.register]}`}>
      <div className={styles.gaugeHead}>
        <span className={styles.label}>{tracker.label}</span>
        {series && <Sparkline tracker={tracker} series={series} />}
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

export default function TrackerColumn({ trackers, deltas = {}, showMeaning = false, history }) {
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
            series={
              history ? [0, ...history.map((h) => h.trackers[tracker.key]), trackers[tracker.key]] : null
            }
          />
        ))}
      </div>
    </section>
  );
}
