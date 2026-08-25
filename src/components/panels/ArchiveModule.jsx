import { useEffect, useState } from 'react';
import { getArchive, isPresent } from '../../data/archive.js';
import { PLAY } from '../../data/copy.js';
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

export default function ArchiveModule({ id }) {
  const item = getArchive(id);
  const [failed, setFailed] = useState(false);

  /* Correcting a filename should recover without a reload. */
  useEffect(() => setFailed(false), [item?.file]);

  if (!item) return null;

  const present = isPresent(item);
  const showPlaceholder = !present || failed;

  return (
    <figure className={styles.module}>
      <div className={styles.head}>
        <Eyebrow>{PLAY.archive}</Eyebrow>
        <span className={styles.date}>{item.date}</span>
      </div>

      <div className={styles.body}>
        <p className={styles.title}>{item.title}</p>

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

        {present && !failed && item.kind !== 'audio' && (
          <img
            className={styles.image}
            src={`archive/${item.file}`}
            alt={item.caption}
            onError={() => setFailed(true)}
          />
        )}

        {showPlaceholder && (
          <div className={`${styles.awaiting} ${failed ? styles.awaitingFailed : ''}`}>
            <div className={styles.awaitingMark} aria-hidden="true">
              {failed ? '!' : item.kind === 'audio' ? '♪' : '▢'}
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
    </figure>
  );
}
