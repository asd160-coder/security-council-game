import { useCallback, useEffect, useRef, useState } from 'react';
import { getArchive, isPresent } from '../../data/archive.js';
import { PLAY } from '../../data/copy.js';
import ArchiveOverlay from './ArchiveOverlay.jsx';
import { Eyebrow, SourceLine } from '../ui/index.jsx';
import styles from './ArchiveModule.module.css';

/* Renders one declared archival slot.

   Three states, not two. A slot with no file shows what belongs there and
   where it comes from — a designed state, and why the slice plays correctly
   with an empty public/archive directory. A slot whose file fails to load
   shows the same block with a different message, because `isPresent` can only
   check that the data names a file; it has no way to know the file is on disk.
   Without this a mistyped extension renders a browser broken-image glyph in
   the middle of an otherwise careful interface, and says nothing about why. */

export default function ArchiveModule({ id, onOpen }) {
  const item = getArchive(id);
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  /* Correcting a filename should recover without a reload. */
  useEffect(() => setFailed(false), [item?.file]);

  /* Reading a document to its end files it, the same as opening it.

     The text is set inline in full, so a student who reads it there has
     examined it in every sense that matters — and until this existed the
     game disagreed: the unlock fired only on the click that opens the
     overlay, and a line gated on the document three days later told a
     student who had read every word that they had not. A sentinel at the
     foot of the text fires once when it scrolls into view. The click path
     stays; this is in addition to it, not instead. */
  const endRef = useRef(null);
  const onOpenRef = useRef(onOpen);
  onOpenRef.current = onOpen;
  useEffect(() => {
    const target = endRef.current;
    if (!target || item?.kind !== 'document' || !item.unlocks) return undefined;
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        onOpenRef.current?.(item.unlocks);
        observer.disconnect();
      }
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [item?.id, item?.kind, item?.unlocks]);

  if (!item) return null;

  const present = isPresent(item);
  /* Documents ship in the bundle, so the awaiting/missing states cannot
     apply to them. */
  const showPlaceholder = item.kind !== 'document' && (!present || failed);

  return (
    <figure className={styles.module}>
      <div className={styles.head}>
        <Eyebrow>{PLAY.archive}</Eyebrow>
        <span className={styles.date}>{item.date}</span>
      </div>

      <div className={styles.body}>
        <p className={styles.title}>{item.title}</p>

        {/* Moving image. `preload="none"` for the same reason as the audio: a
            three-megabyte newsreel should not be fetched by a classroom that
            never presses play. `playsInline` so iPad does not hijack it into
            fullscreen. */}
        {present && !failed && item.kind === 'video' && (
          <video
            className={styles.video}
            controls
            preload="none"
            playsInline
            src={`archive/${item.file}`}
            onError={() => setFailed(true)}
          >
            Your browser does not support video playback.
          </video>
        )}

        {present && !failed && item.kind === 'audio' && (
          <audio
            className={styles.audio}
            controls
            preload="none"
            src={`archive/${item.file}`}
            onError={() => setFailed(true)}
          >
            Your browser does not support audio playback.
          </audio>
        )}

        {/* A primary source text, set as paper. This is the one place in the
            archive where the register matters more than the medium: a 1962
            document is not the present interface reading the crisis, it IS
            1962, so it goes on stock rather than on the board. */}
        {item.kind === 'document' && (
          <button
            type="button"
            className={styles.document}
            /* Examining a document is the act that files it. Same shape as the
               map: the thing you did IS the unlock, rather than a separate
               control that claims you read it. */
            onClick={() => {
              setOpen(true);
              if (item.unlocks) onOpen?.(item.unlocks);
            }}
            aria-label={PLAY.archiveExpand}
          >
            {item.text.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={styles.documentLine}>
                {paragraph}
              </p>
            ))}
            {/* Said plainly rather than left to be noticed. A proclamation runs
                nine hundred words; taking the part that argues and marking the
                cut is better than silently abridging. */}
            {item.excerpt && <p className={styles.documentCut}>{PLAY.excerpted}</p>}
            <span
              ref={endRef}
              className={styles.readMark}
              data-read-mark=""
              data-unlocks={item.unlocks ?? ''}
              aria-hidden="true"
            />
            <span className={styles.documentMark} aria-hidden="true" />
          </button>
        )}

        {/* An image that loaded is a control: the boards carry coordinates and
            reference numbers that only resolve at full size. Audio is not —
            there is nothing to enlarge. */}
        {present && !failed && item.kind === 'image' && (
          <button
            type="button"
            className={styles.imageButton}
            onClick={() => setOpen(true)}
            aria-label={PLAY.archiveExpand}
          >
            <img
              className={styles.image}
              src={`archive/${item.file}`}
              alt={item.caption}
              onError={() => setFailed(true)}
            />
            <span className={styles.expandMark} aria-hidden="true" />
          </button>
        )}

        {showPlaceholder && (
          <div className={`${styles.awaiting} ${failed ? styles.awaitingFailed : ''}`}>
            <div className={styles.awaitingMark} aria-hidden="true">
              {failed ? '!' : item.kind === 'audio' ? '♪' : item.kind === 'video' ? '▷' : '▢'}
            </div>
            <p className={styles.awaitingTitle}>
              {failed ? PLAY.missingAsset : PLAY.awaitingAsset}
            </p>
            <p className={styles.awaitingNote}>
              {failed ? PLAY.missingAssetNote(item.file) : PLAY.awaitingAssetNote}
            </p>
          </div>
        )}

        <figcaption className={styles.caption}>{item.caption}</figcaption>

        <div className={styles.why}>
          <span className={styles.whyLabel}>{PLAY.whyItMatters}</span>
          <p className={styles.whyText}>{item.whyItMatters}</p>
        </div>

        <SourceLine source={item.source} rights={item.rights} onBoard />
      </div>

      {open && <ArchiveOverlay item={item} onClose={close} />}
    </figure>
  );
}
