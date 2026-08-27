import { useCallback, useState } from 'react';
import Overlay from '../ui/Overlay.jsx';
import { CONSEQUENCE } from '../../data/consequence.js';
import { PLAY } from '../../data/copy.js';
import styles from './ConsequencePanel.module.css';

/* What was at stake, shown only when the frame breaks.

   The restraint is the design. There is no depiction of an attack, no
   casualty arithmetic and no count-down, because none of those can be given
   honestly for October 1962 — the figures people remember describe arsenals
   from twenty years later. What can be given is what was actually in place:
   how little time existed, what was on the island that Washington did not
   know about, and who would have been deciding once the shooting started.

   That is also, as it happens, the more frightening account. */

export default function ConsequencePanel() {
  const { eyebrow, title, standfirst, warning, ledger, breakdown, unknown, poster, footer } =
    CONSEQUENCE;
  const [posterOpen, setPosterOpen] = useState(false);
  const closePoster = useCallback(() => setPosterOpen(false), []);

  return (
    <section className={styles.panel} aria-label={eyebrow}>
      <div className={styles.head}>
        <span className={styles.sectionLabel}>{eyebrow}</span>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.standfirst}>{standfirst}</p>
      </div>

      {/* ------------------------------------------------ The interval */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>
          {warning.label} · <span className={styles.minutes}>{warning.minutes} minutes</span>
        </span>

        <div className={styles.timeline}>
          <div className={`${styles.track} ${styles.drawn}`} />
          {warning.steps.map((step, index) => {
            const last = index === warning.steps.length - 1;
            const first = index === 0;
            return (
              <div key={step.label}>
                <span className={styles.tick} style={{ left: `${step.at * 100}%` }} aria-hidden="true" />
                <div
                  className={`${styles.marker} ${first ? styles.markerStart : ''} ${last ? styles.markerEnd : ''}`}
                  style={{ left: `${step.at * 100}%` }}
                >
                  <span className={styles.markerLabel}>{step.label}</span>
                  {step.note && <span className={styles.markerNote}>{step.note}</span>}
                </div>
              </div>
            );
          })}
          <p className={styles.timelineFoot}>{warning.caption}</p>
        </div>
      </div>

      {/* ------------------------------------------------ What was there */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>{ledger.label}</span>
        <div className={styles.ledger}>
          {ledger.rows.map((row) => (
            <div key={row.unit} className={styles.row}>
              <div className={styles.figureBlock}>
                <span className={styles.figure}>{row.figure}</span>
                <span className={styles.unit}>{row.unit}</span>
              </div>
              <div className={styles.rowBody}>
                <p className={styles.rowNote}>{row.note}</p>
                <p className={styles.rowKnown}>{row.known}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------ How it fails */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>{breakdown.label}</span>
        <div className={styles.prose}>
          {breakdown.body.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------ What is not known */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>{unknown.label}</span>
        <div className={styles.prose}>
          {unknown.body.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      </div>

      {/* Placed last on purpose: the sourced 1962 account is read first and
          this second, so the general statement lands against the specific
          one rather than instead of it. */}
      {poster && (
        <div className={styles.section}>
          {/* The marker sits on the label row rather than over the artwork: the
              poster's own caption runs along its bottom edge, and a chip in the
              corner covered it. */}
          <span className={styles.posterLabelRow}>
            <span className={styles.sectionLabel}>{poster.label}</span>
            <span className={styles.posterMark}>{PLAY.illustration}</span>
          </span>
          <button
            type="button"
            className={styles.posterButton}
            onClick={() => setPosterOpen(true)}
            aria-label={poster.open}
          >
            <img className={styles.poster} src={`art/${poster.file}`} alt={poster.caption} />
            <span className={styles.expandMark} aria-hidden="true" />
          </button>
          <p className={styles.posterNote}>{poster.note}</p>
        </div>
      )}

      <p className={styles.footer}>{footer}</p>

      {posterOpen && (
        <Overlay eyebrow={poster.label} title={poster.title} onClose={closePoster}>
          <img className={styles.posterFull} src={`art/${poster.file}`} alt={poster.caption} />
        </Overlay>
      )}
    </section>
  );
}
