import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button, SourceLine } from '../ui/index.jsx';
import useDialog from '../ui/useDialog.js';
import { EPIGRAPH, PLAY } from '../../data/copy.js';
import styles from './Epigraph.module.css';

/* A real voice, between the days.

   The sibling of DayCard and its opposite in every rule that matters. DayCard
   is a dateline flash: decorative, hidden from assistive technology, gone in
   2.2 seconds, and skipped entirely under prefers-reduced-motion. All three
   are right for a chapter mark and wrong for a sentence somebody actually said
   and you want read. So this one is content — it is in the accessibility
   tree, it waits to be dismissed, and it appears whatever the motion
   preference, because a quotation is not an animation.

   It gets a register of its own, which is load-bearing rather than
   decorative. Everything the game puts in quotation marks in a scene is
   invented, and the title screen promises exactly that; these sentences are
   not invented, so they must never look like a scene. But they are not archive
   paper either. The game's rule is that the board is the present and the paper
   is 1962, and these run from 1956 to 2003 — a memoir written after a fall
   from power, a remark recalled twenty-three years later, a documentary filmed
   forty-one years after the night it describes. Only the two Kennedy speeches
   are contemporaneous documents. Setting a 2003 recollection on 1962 stock
   would be a small lie about what it is.

   So: a plate. A double-ruled frame that appears nowhere else in an interface
   where every border is a single line, the largest type in the game, and the
   apparatus — attribution, provenance, source — descending in weight beneath
   it. The register is still the disclaimer; it is now the right register.

   A day shows this or the DayCard, never both, so the epigraph carries the
   dateline itself and the chapter break is not lost. */

export default function Epigraph({ epigraph, day, onDone }) {
  /* Escape is left to the handler below rather than taken by the hook, because
     here every key does the same thing and one place should own that. What the
     hook adds is the part this could not do for itself: focus moves inside,
     Tab cannot leave, the board behind goes inert, and focus returns to
     whatever the player was on when the day opened. */
  const dialogRef = useDialog(onDone, { closeOnEscape: false });

  useEffect(() => {
    const onKey = (event) => {
      /* Any key continues, as on the dateline card. Tab is the exception:
         there is one control, and a keyboard user reaching for it should not
         find that reaching dismissed the thing they were reading. */
      if (event.key !== 'Tab') onDone();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onDone]);

  return createPortal(
    <div
      ref={dialogRef}
      tabIndex={-1}
      className={styles.screen}
      role="dialog"
      aria-modal="true"
      aria-label={EPIGRAPH.label}
      onClick={(event) => {
        if (event.target === event.currentTarget) onDone();
      }}
    >
      <div className={styles.inner}>
        {day && (
          <span className={styles.dateline}>
            {PLAY.dayLabel(day.number)} · {day.dateline}
          </span>
        )}

        <blockquote className={styles.plate}>
          {/* A printer's ornament. Decoration, and declared as such — it says
              nothing a screen reader needs to hear. */}
          <div className={styles.rule} aria-hidden="true" />

          <p className={styles.quote}>{epigraph.quote}</p>

          <footer className={styles.attribution}>
            <cite className={styles.speaker}>{epigraph.speaker}</cite>
            <span className={styles.role}>{epigraph.role}</span>
            <span className={styles.date}>{epigraph.date}</span>
          </footer>

          {/* How it reached us — the part that stops this being decoration.
              Three of the seven are contested, mistranslated or remembered
              decades late, and a classroom is owed that. */}
          <div className={styles.provenance}>
            <span className={styles.provenanceLabel}>{EPIGRAPH.howItReachedUs}</span>
            <p className={styles.provenanceText}>{epigraph.provenance}</p>
          </div>

          {/* Where the text comes from, which for five of the seven is not
              the same as when it was said. `onBoard` because this no longer
              sits on stock — without it the line paints in ink on near-black
              and disappears. */}
          <div className={styles.source}>
            <SourceLine source={epigraph.source ?? epigraph.date} rights={epigraph.rights} onBoard />
          </div>
        </blockquote>

        <div className={styles.actions}>
          <Button variant="primary" onClick={onDone}>
            {EPIGRAPH.continue}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
