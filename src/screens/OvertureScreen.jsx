import { useCallback, useEffect, useRef, useState } from 'react';
import { BEATS, NARRATION_SRC, audioTimed } from '../data/overture.js';
import { getArchive } from '../data/archive.js';
import { OVERTURE, PLAY } from '../data/copy.js';
import { Button, SourceLine } from '../components/ui/index.jsx';
import styles from './OvertureScreen.module.css';

/* The overture. See src/data/overture.js for what it is and why it is a
   montage rather than a rendering.

   ONE CODE PATH, TWO CLOCKS. The film advances either on a timer, one beat's
   `hold` at a time, or on the narration's `timeupdate` against each beat's
   `at`. The audio drives only when it has actually loaded AND every beat is
   timed; otherwise the timer runs and the audio, if any, simply plays over
   it. A missing file is not an error here — it 404s, the element fires
   `error`, and the timer was already in charge.

   MOTION is CSS. The Ken Burns move and the parallax are transforms that run
   for the beat's length, set through --beat; under prefers-reduced-motion
   the stylesheet removes them and leaves the crossfades, so the film still
   plays, it just stops moving. The captions type with the teleprinter's clip
   and collapse to instant under the same preference through --dur-teleprinter.

   SKIP is a button with focus, and Escape. Deliberately not any-key: this is
   seventy seconds, not a quotation, and a keyboard user reaching for Skip
   must be able to get there without dismissing what they meant to keep. */

const CROSSFADE = 900;

function Shot({ shot, beatMs }) {
  const style = { '--beat': `${beatMs}ms` };
  const moveClass = styles[`move-${shot.move ?? 'still'}`] ?? '';

  if (shot.portrait) {
    return (
      <div className={`${styles.layer} ${moveClass}`} style={style}>
        <img
          className={styles.portrait}
          src={`portraits/${shot.portrait}`}
          style={{ objectPosition: shot.focus }}
          alt={`${shot.name} — ${PLAY.illustration}`}
        />
        <span className={styles.illustrationMark}>{PLAY.illustration}</span>
      </div>
    );
  }

  const item = shot.archiveId ? getArchive(shot.archiveId) : null;
  if (item?.file) {
    /* `contain` for the two shots that are the wrong shape to fill a frame —
       a portrait of a rocket, and a four-inch contact print that should read
       as a print rather than be blown up to a wall. The stage's ground is
       near-black, so the letterbox is invisible against a dark photograph. */
    const fitClass = shot.fit === 'contain' ? styles.contain : '';
    return (
      <div className={`${styles.layer} ${moveClass}`} style={style}>
        <img className={`${styles.still} ${fitClass}`} src={`archive/${item.file}`} alt={shot.alt} />
        <div className={styles.source}>
          <SourceLine source={item.source} rights={item.rights} onBoard />
        </div>
      </div>
    );
  }

  /* A slate: a labelled dark frame standing in for a shot with no still —
     none remain in the data, so reaching this now means an archiveId failed
     to resolve, and the frame says so rather than leaving a hole. */
  return (
    <div className={`${styles.layer} ${styles.slate} ${moveClass}`} style={style} role="img" aria-label={shot.alt}>
      <span className={styles.slateLabel}>{shot.slate ?? shot.archiveId ?? '—'}</span>
      <span className={styles.slateNote}>{shot.source ?? 'Shot not found in the archive'}</span>
    </div>
  );
}

export default function OvertureScreen({ onDone }) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(null);
  const [audioDrives, setAudioDrives] = useState(false);
  const audioRef = useRef(null);
  const skipRef = useRef(null);
  const timerRef = useRef(null);
  const doneRef = useRef(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    clearTimeout(timerRef.current);
    audioRef.current?.pause();
    onDone();
  }, [onDone]);

  /* Skip: the button, and Escape. */
  useEffect(() => {
    skipRef.current?.focus();
    const onKey = (event) => {
      if (event.key === 'Escape') finish();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [finish]);

  /* Advance to a beat, keeping the previous one on stage long enough to fade. */
  const goTo = useCallback((next) => {
    setIndex((current) => {
      if (next === current) return current;
      setLeaving(current);
      setTimeout(() => setLeaving(null), CROSSFADE);
      return next;
    });
  }, []);

  /* The timer clock. Re-armed on every beat unless the audio has taken over. */
  useEffect(() => {
    if (audioDrives) return undefined;
    const beat = BEATS[index];
    timerRef.current = setTimeout(() => {
      if (index + 1 < BEATS.length) goTo(index + 1);
      else finish();
    }, beat.hold);
    return () => clearTimeout(timerRef.current);
  }, [index, audioDrives, goTo, finish]);

  /* The audio clock. Only the narration's own time decides the beat. */
  const onTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || !audioDrives) return;
    const t = audio.currentTime;
    let next = 0;
    for (let i = 0; i < BEATS.length; i += 1) if (BEATS[i].at <= t) next = i;
    goTo(next);
  };

  /* Try to play. Begin briefing was a click, so autoplay policy allows it; if
     the file is missing the element errors and the timer stays in charge. */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;
    const play = audio.play();
    if (play?.catch) play.catch(() => {});
    return () => audio.pause();
  }, []);

  const beat = BEATS[index];
  const chars = beat.line.length || 1;

  return (
    <main className={styles.screen}>
      <h1 className="sr-only">{OVERTURE.srTitle}</h1>

      <div className={styles.stage} aria-hidden="true">
        {leaving !== null && (
          <div key={`leave-${BEATS[leaving].id}`} className={`${styles.frame} ${styles.frameLeaving}`}>
            <Shot shot={BEATS[leaving].shot} beatMs={BEATS[leaving].hold} />
          </div>
        )}
        <div key={beat.id} className={styles.frame}>
          <Shot shot={beat.shot} beatMs={beat.hold} />
        </div>
        <div className={styles.grain} />
        <div className={styles.vignette} />
      </div>

      {/* The words. In the DOM whole from the first frame of the beat, typed
          by a clip; the live region carries them to a screen reader once. */}
      <div className={styles.captions}>
        <span className={styles.eyebrow}>{OVERTURE.eyebrow}</span>
        {beat.line && (
          <p
            key={`line-${beat.id}`}
            className={styles.line}
            style={{ '--chars': chars, '--dur-type': `${Math.min(2600, chars * 42)}ms` }}
          >
            {beat.line}
          </p>
        )}
      </div>
      <p className="sr-only" aria-live="polite">
        {beat.line || BEATS[index].shot.alt}
      </p>

      <div className={styles.controls}>
        <span className={styles.counter}>
          {index + 1} / {BEATS.length}
        </span>
        <Button ref={skipRef} variant="quiet" onClick={finish}>
          {OVERTURE.skip}
        </Button>
      </div>

      {/* The audio takes the clock only once it is actually playing, not once
          it has loaded. A browser can load the file and still refuse play() —
          strict autoplay settings, or an activation that does not count — and
          handing over on `canplay` would switch the timer off for an audio
          that never starts, stalling the film on its first beat. */}
      <audio
        ref={audioRef}
        src={NARRATION_SRC}
        preload="auto"
        onPlaying={() => setAudioDrives(audioTimed())}
        onPause={() => setAudioDrives(false)}
        onError={() => setAudioDrives(false)}
        onTimeUpdate={onTimeUpdate}
        onEnded={finish}
      />
    </main>
  );
}
