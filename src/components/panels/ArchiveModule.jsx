import { getArchive, isPresent } from '../../data/archive.js';
import { PLAY } from '../../data/copy.js';
import { Eyebrow, SourceLine } from '../ui/index.jsx';
import styles from './ArchiveModule.module.css';

/* Renders one declared archival slot.

   If the file has not been added to the build, this shows the slot itself —
   what belongs here, where it comes from, and that its rights are already
   cleared. That is a designed state, not a fallback, and it is why the slice
   plays correctly with an empty public/archive directory. */

export default function ArchiveModule({ id }) {
  const item = getArchive(id);
  if (!item) return null;

  const present = isPresent(item);

  return (
    <figure className={styles.module}>
      <div className={styles.head}>
        <Eyebrow>{PLAY.archive}</Eyebrow>
        <span className={styles.date}>{item.date}</span>
      </div>

      <div className={styles.body}>
        <p className={styles.title}>{item.title}</p>

        {present ? (
          item.kind === 'audio' ? (
            <audio className={styles.audio} controls preload="none" src={`archive/${item.file}`}>
              Your browser does not support audio playback.
            </audio>
          ) : (
            <img className={styles.image} src={`archive/${item.file}`} alt={item.caption} />
          )
        ) : (
          <div className={styles.awaiting}>
            <div className={styles.awaitingMark} aria-hidden="true">
              {item.kind === 'audio' ? '♪' : '▢'}
            </div>
            <p className={styles.awaitingTitle}>{PLAY.awaitingAsset}</p>
            <p className={styles.awaitingNote}>{PLAY.awaitingAssetNote}</p>
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
