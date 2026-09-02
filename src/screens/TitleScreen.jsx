import { Button, Reveal } from '../components/ui/index.jsx';
import { APP } from '../data/copy.js';
import styles from './TitleScreen.module.css';

export default function TitleScreen({ onBegin, onCredits, saved, onResume }) {
  return (
    <div className={styles.screen}>
      <div className={styles.backdrop} aria-hidden="true">
        <img
          className={styles.backdropImage}
          src="art/kennedy-castro-khrushchev.jpg"
          alt=""
        />
      </div>

      <div className={styles.inner}>
        <Reveal delay={60}>
          <span className={styles.dateline}>{APP.dateline}</span>
        </Reveal>
        <Reveal delay={160}>
          <h1 className={styles.title}>{APP.title}</h1>
        </Reveal>
        <Reveal delay={260}>
          <p className={styles.subtitle}>{APP.subtitle}</p>
        </Reveal>
        <Reveal delay={380}>
          <p className={styles.standfirst}>{APP.standfirst}</p>
        </Reveal>
        <Reveal delay={480} className={styles.actions}>
          {/* A run left open in this browser. Offered rather than restored: a
              classroom session is meant to start clean, and the student is the
              one who knows whether the last run was theirs. Resuming leads,
              because it is the choice that does not throw work away. */}
          {saved ? (
            <>
              <Button variant="primary" onClick={onResume}>
                {APP.resume(saved.day)}
              </Button>
              <Button variant="quiet" onClick={onBegin}>
                {APP.beginFresh}
              </Button>
            </>
          ) : (
            <Button variant="primary" onClick={onBegin}>
              {APP.begin}
            </Button>
          )}
        </Reveal>
      </div>

      <div className={styles.foot}>
        <p className={styles.footNote}>
          An educational simulation. Artwork is illustrated, not photographic. Dialogue is authored
          in the register of the historical figures and is not quoted.
        </p>
        <Button variant="quiet" onClick={onCredits}>
          {APP.credits}
        </Button>
      </div>
    </div>
  );
}
