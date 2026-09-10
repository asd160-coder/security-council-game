import { ARCHIVE_NOTE, FIGURE_GROUPS, ROAD } from '../data/background.js';
import { getArchive } from '../data/archive.js';
import { BACKGROUND_EPIGRAPHS } from '../data/epigraphs.js';
import { BACKGROUND, EPIGRAPH, PLAY } from '../data/copy.js';
import { Button, Reveal, SourceLine } from '../components/ui/index.jsx';
import styles from './BackgroundScreen.module.css';

/* Before the thirteen days.

   Optional reading, reachable from the title screen and never in the way of
   pressing Begin. Two sections: how the crisis was arrived at, and the six
   people whose motives the days are made of.

   Board register throughout — this is the present interface explaining the
   past, not a 1962 document, so nothing here sits on paper. The figure card
   is the role card from RoleSelect with its control removed: these are things
   to read, not seats to take, so they are articles rather than buttons. */

const DELEGATION_CLASS = {
  'United States': styles.flagUs,
  'Soviet Union': styles.flagUssr,
  'United Nations': styles.flagUn,
  Cuba: styles.flagCuba,
};

/* A still on a road beat: the photograph, what it is, and where it came from,
   credited the way every archival image in the game is credited. */
function RoadFigure({ beat }) {
  const item = getArchive(beat.archiveId);
  if (!item?.file) return null;
  const fitClass = beat.fit === 'contain' ? styles.beatFigureContain : '';
  return (
    <figure className={`${styles.beatFigure} ${fitClass}`}>
      <img
        className={styles.beatStill}
        src={`archive/${item.file}`}
        style={beat.focus ? { objectPosition: beat.focus } : undefined}
        alt={beat.alt}
        loading="lazy"
      />
      <figcaption className={styles.beatCaption}>
        {beat.caption && <p className={styles.beatCaptionText}>{beat.caption}</p>}
        <SourceLine source={item.source} rights={item.rights} onBoard />
      </figcaption>
    </figure>
  );
}

function Figure({ figure }) {
  return (
    <article className={`${styles.card} ${DELEGATION_CLASS[figure.delegation] ?? ''}`}>
      <div className={styles.portraitFrame}>
        {/* Two kinds of face, and the difference is stated rather than styled
            away: a photograph of someone the record photographed, or a painted
            illustration of someone it did not. */}
        {figure.photo ? (
          <img
            className={styles.portrait}
            src={`archive/${figure.photo}`}
            style={{ objectPosition: figure.photoFocus }}
            alt=""
            loading="lazy"
          />
        ) : figure.portrait ? (
          <>
            <img
              className={styles.portrait}
              src={`portraits/${figure.portrait}`}
              style={{ objectPosition: figure.portraitFocus }}
              alt=""
              loading="lazy"
            />
            <span className={styles.illustrationMark}>{PLAY.illustration}</span>
          </>
        ) : (
          /* A declared slot rather than a gap — the same treatment the archive
             gives an item whose file has not been made yet. */
          <span className={styles.awaiting}>
            <span className={styles.awaitingMark} aria-hidden="true">
              ▢
            </span>
            <span className={styles.awaitingNote}>{BACKGROUND.noPortrait}</span>
          </span>
        )}
      </div>

      <div className={styles.cardBody}>
        <span className={styles.delegation}>{figure.delegation}</span>
        <h3 className={styles.name}>{figure.name}</h3>
        <span className={styles.role}>{figure.title}</span>
        <p className={styles.standfirstCard}>{figure.standfirst}</p>

        <dl className={styles.fields}>
          {BACKGROUND.briefFields.map(([key, label]) => (
            <div key={key} className={styles.field}>
              <dt className={styles.fieldLabel}>{label}</dt>
              <dd className={styles.fieldValue}>{figure.brief[key]}</dd>
            </div>
          ))}
        </dl>

        {/* A photograph carries its provenance. An illustration carries its
            marker instead, up on the image, because it has no source to cite. */}
        {figure.source && (
          <div className={styles.provenance}>
            <SourceLine source={figure.source} rights={figure.rights} onBoard />
          </div>
        )}
      </div>
    </article>
  );
}

export default function BackgroundScreen({ onBack }) {
  return (
    /* `main`, and the section labels are real headings: this page had no
       landmark at all, and its outline jumped h1 -> h3 because every section
       label was a styled span. Both leave a screen-reader user without a way
       to move through a long read. */
    <main className={styles.screen}>
      <Reveal className={styles.head}>
        {/* A way back at the top as well as the foot: this is a long read,
            and a student who opened it from the title's tab should not have
            to scroll past all of it to leave. */}
        <div className={styles.headActions}>
          <Button variant="quiet" onClick={onBack}>
            {BACKGROUND.back}
          </Button>
        </div>
        <span className="eyebrow">{BACKGROUND.eyebrow}</span>
        <h1 className={styles.title}>{BACKGROUND.title}</h1>
        <p className={styles.standfirst}>{BACKGROUND.standfirst}</p>
      </Reveal>

      {/* Two sentences from before the road, and the only place in the game
          where Khrushchev and Castro speak in their own words. The archive
          cannot carry either of them — see the note at the foot of this page —
          so they are quoted, with how each reached us. */}
      <Reveal delay={100} className={styles.sectionHead}>
        <h2 className="eyebrow">{EPIGRAPH.backgroundLabel}</h2>
        <p className={styles.sectionNote}>{EPIGRAPH.backgroundNote}</p>
      </Reveal>

      <div className={styles.quotes}>
        {BACKGROUND_EPIGRAPHS.map((q, index) => (
          <Reveal key={q.id} delay={140 + index * 90}>
            <blockquote className={styles.quoteCard}>
              <div className={styles.quoteRule} aria-hidden="true" />
              <p className={styles.quoteText}>{q.quote}</p>
              <footer className={styles.quoteAttribution}>
                <cite className={styles.quoteSpeaker}>{q.speaker}</cite>
                <span className={styles.quoteDate}>{q.date}</span>
              </footer>
              <div className={styles.quoteProvenance}>
                <span className={styles.quoteProvenanceLabel}>{EPIGRAPH.howItReachedUs}</span>
                <p className={styles.quoteProvenanceText}>{q.provenance}</p>
              </div>
              {/* onBoard, because these no longer sit on stock. */}
              <div className={styles.quoteSource}>
                <SourceLine source={q.source} rights={q.rights} onBoard />
              </div>
            </blockquote>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120} className={styles.sectionHead}>
        <h2 className="eyebrow">{BACKGROUND.roadLabel}</h2>
        <p className={styles.sectionNote}>{BACKGROUND.roadNote}</p>
      </Reveal>

      <ol className={styles.road}>
        {ROAD.map((beat, index) => (
          <Reveal key={beat.id} delay={180 + index * 60}>
            <li className={styles.beat}>
              <span className={styles.beatDate}>{beat.date}</span>
              <div className={styles.beatBody}>
                <h3 className={styles.beatTitle}>{beat.title}</h3>
                {beat.archiveId && <RoadFigure beat={beat} />}
                {beat.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className={styles.beatText}>
                    {paragraph}
                  </p>
                ))}
                <p className={styles.beatLeft}>
                  <span className={styles.beatLeftLabel}>{BACKGROUND.whatItLeft}</span>
                  {beat.left}
                </p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>

      {FIGURE_GROUPS.map((group) => (
        <section key={group.id} className={styles.group}>
          <Reveal className={styles.sectionHead}>
            <h2 className="eyebrow">{group.label}</h2>
            <p className={styles.sectionNote}>{group.note}</p>
          </Reveal>

          <div className={styles.grid}>
            {group.figures.map((figure, index) => (
              <Reveal key={figure.id} delay={100 + index * 90}>
                <Figure figure={figure} />
              </Reveal>
            ))}
          </div>
        </section>
      ))}

      <Reveal className={styles.note}>
        <span className={styles.noteLabel}>{ARCHIVE_NOTE.label}</span>
        {ARCHIVE_NOTE.body.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className={styles.noteText}>
            {paragraph}
          </p>
        ))}
      </Reveal>

      <Reveal className={styles.actions}>
        <Button variant="primary" onClick={onBack}>
          {BACKGROUND.back}
        </Button>
      </Reveal>
    </main>
  );
}
