import DraftingTray from '../components/panels/DraftingTray.jsx';
import { Button, Reveal } from '../components/ui/index.jsx';
import { LAST_BUILT_DAY } from '../data/days/index.js';
import { STUB } from '../data/copy.js';
import styles from './DayStub.module.css';

/* The end of the slice.

   This says plainly that Day 2 does not exist rather than staging a fake
   continuation. A prototype that pretends to be finished is harder to give
   useful feedback on than one that marks its own edge. */

export default function DayStub({ draft, onRestart }) {
  const next = LAST_BUILT_DAY + 1;

  return (
    <div className={styles.screen}>
      <div className={styles.inner}>
        <Reveal>
          <span className="eyebrow">{STUB.eyebrow}</span>
          <h2 className={styles.title}>{STUB.title(next)}</h2>
        </Reveal>

        <Reveal delay={120} className={styles.prose}>
          {STUB.body(LAST_BUILT_DAY, next).map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </Reveal>

        <Reveal delay={220}>
          <hr className={styles.rule} />
        </Reveal>

        <Reveal delay={280} className={styles.draftWrap}>
          <DraftingTray draft={draft} compact />
        </Reveal>

        <Reveal delay={360} className={styles.actions}>
          <Button variant="primary" onClick={onRestart}>
            {STUB.restart}
          </Button>
        </Reveal>
      </div>
    </div>
  );
}
