import { Button, Reveal } from '../components/ui/index.jsx';
import { APP } from '../data/copy.js';
import styles from './TitleScreen.module.css';

export default function TitleScreen({ onBegin, onCredits }) {
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
        <Reveal delay={480}>
          <Button variant="primary" onClick={onBegin}>
            {APP.begin}
          </Button>
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
