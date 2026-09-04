import Overlay from '../ui/Overlay.jsx';
import { PLAY } from '../../data/copy.js';
import styles from './ArchiveOverlay.module.css';

/* An archival item at full size.

   The readout boards are the reason this exists: at panel width the
   interpreters' arrows are visible but their coordinates and reference numbers
   are not, and those are exactly the details that make the thing feel like a
   document rather than an illustration. */

export default function ArchiveOverlay({ item, onClose }) {
  return (
    <Overlay eyebrow={PLAY.archive} title={item.title} onClose={onClose}>
      {/* A document has nothing to enlarge — it has something to read. At
          overlay width it gets the measure a page of prose actually needs,
          which is the whole reason for opening it. */}
      {item.kind === 'document' ? (
        <div className={styles.documentWrap}>
          {item.text.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className={styles.documentLine}>
              {paragraph}
            </p>
          ))}
          {item.excerpt && <p className={styles.documentCut}>{PLAY.excerpted}</p>}
        </div>
      ) : item.kind === 'video' ? (
        <div className={styles.videoWrap}>
          <video className={styles.video} controls preload="metadata" playsInline src={`archive/${item.file}`}>
            Your browser does not support video playback.
          </video>
        </div>
      ) : item.kind === 'audio' ? (
        /* Reached from the archive rail. Nothing to enlarge; the overlay is
           simply where the player goes back to listen. */
        <div className={styles.audioWrap}>
          <audio className={styles.audio} controls preload="none" src={`archive/${item.file}`}>
            Your browser does not support audio playback.
          </audio>
        </div>
      ) : (
        <div className={styles.imageWrap}>
          <img className={styles.image} src={`archive/${item.file}`} alt={item.caption} />
        </div>
      )}

      <aside className={styles.aside}>
        <p className={styles.date}>{item.date}</p>
        <p className={styles.caption}>{item.caption}</p>

        <div className={styles.why}>
          <span className={styles.whyLabel}>{PLAY.whyItMatters}</span>
          <p className={styles.whyText}>{item.whyItMatters}</p>
        </div>

        <p className={styles.source}>
          <span className={styles.sourceKey}>Source</span> {item.source}
          {' · '}
          <span className={styles.sourceKey}>Rights</span> {item.rights}
        </p>
      </aside>
    </Overlay>
  );
}
