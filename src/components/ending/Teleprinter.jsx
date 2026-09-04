import styles from './Teleprinter.module.css';

/* The answer arriving.

   The resolution used to appear as a headline like any other. It is the one
   line in the game the player has waited five days for, so it now arrives the
   way the real answer did — over a wire, a line at a time. The wire line
   names where it came from; the label types itself, then the standfirst.

   Typing is a stepped clip on the finished text, which is why nothing is
   withheld: the words are in the DOM from the first frame, a screen reader
   reads them whole, and under reduced motion --dur-teleprinter collapses to
   0.01s and the line is simply there. */

export default function Teleprinter({ eyebrow, wire, label, standfirst }) {
  return (
    <div className={styles.head}>
      <span className={styles.label}>{eyebrow}</span>
      {wire && <span className={styles.wire}>{wire}</span>}
      <h1 className={styles.title}>
        <span className={styles.typed} style={{ '--chars': label.length }}>
          {label}
        </span>
      </h1>
      <p className={styles.standfirst}>
        <span
          className={`${styles.typed} ${styles.typedSecond}`}
          style={{ '--chars': standfirst.length }}
        >
          {standfirst}
        </span>
      </p>
    </div>
  );
}
