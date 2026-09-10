import { Button, Reveal } from '../components/ui/index.jsx';
import { APP } from '../data/copy.js';
import styles from './TitleScreen.module.css';

export default function TitleScreen({ onBegin, onCredits, onBackground, onTeachers, saved, onResume }) {
  return (
    <div className={styles.screen}>
      <div className={styles.backdrop} aria-hidden="true">
        <img
          className={styles.backdropImage}
          src="art/kennedy-castro-khrushchev.jpg"
          alt=""
        />
      </div>

      {/* The way into the background reading, promoted from the foot. The
          first thing on the page: an information tab, brass-edged, with one
          line saying what it is — because at the foot, beside the credits,
          nobody found it. In flow rather than pinned to the corner, so on a
          phone it cannot sit on the dateline and the screen's overflow cannot
          clip its focus ring. Not the primary action: the one filled button
          below is still the way in; this is the way to understand it first. */}
      <Reveal delay={0} className={styles.corner}>
        <nav aria-label={APP.backgroundNav}>
          <button type="button" className={styles.tab} onClick={onBackground}>
            <span className={styles.tabEyebrow}>{APP.backgroundEyebrow}</span>
            <span className={styles.tabLabel}>{APP.background}</span>
            <span className={styles.tabBlurb}>{APP.backgroundBlurb}</span>
          </button>
        </nav>
      </Reveal>

      {/* A main landmark, because a screen-reader user navigating by landmark
          had nothing to jump to on this screen at all. */}
      <main className={styles.inner}>
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
                {APP.resume(saved.day, saved.stage)}
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
      </main>

      <div className={styles.foot}>
        <p className={styles.footNote}>{APP.footNote}</p>
        <div className={styles.footActions}>
          <Button variant="quiet" onClick={onTeachers}>
            {APP.teachers}
          </Button>
          <Button variant="quiet" onClick={onCredits}>
            {APP.credits}
          </Button>
        </div>
      </div>
    </div>
  );
}
