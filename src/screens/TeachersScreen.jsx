import { DAY_PROMPTS, READING_A_RUN, TEACHING } from '../data/teaching.js';
import { PATTERNS } from '../data/debrief.js';
import { Button, Reveal } from '../components/ui/index.jsx';
import styles from './TeachersScreen.module.css';

/* For the person running the room.

   Reached from the title, like the background tab, and never in the way of
   pressing Begin. Board register throughout: this is the present interface
   talking to a teacher, not a document from 1962, so nothing here sits on
   paper.

   Two sections and not four. Orientation — length, seats, the three-way split
   — is in the README, and duplicating it here would give it two places to go
   out of date. What is here is the part that needs the game open: questions
   tied to a specific day, and how to read what a student finished with.

   The pattern titles are read from PATTERNS rather than restated, because the
   student saw those exact words in their debrief and a teacher and a student
   discussing the same run should be looking at the same label. */

export default function TeachersScreen({ onBack }) {
  return (
    <main className={styles.screen}>
      <Reveal className={styles.head}>
        <span className="eyebrow">{TEACHING.eyebrow}</span>
        <h1 className={styles.title}>{TEACHING.title}</h1>
        <p className={styles.standfirst}>{TEACHING.standfirst}</p>
      </Reveal>

      {/* ------------------------------------------------ Questions by day */}
      <Reveal delay={100} className={styles.sectionHead}>
        <h2 className="eyebrow">{TEACHING.promptsLabel}</h2>
        <p className={styles.sectionNote}>{TEACHING.promptsNote}</p>
      </Reveal>

      <ol className={styles.days}>
        {Object.entries(DAY_PROMPTS).map(([number, day], index) => (
          <Reveal key={number} delay={140 + index * 60}>
            <li className={styles.day}>
              <div className={styles.dayMark}>
                <span className={styles.dayNumber}>Day {number}</span>
                <span className={styles.dayDate}>{day.dateline}</span>
              </div>

              <div className={styles.dayBody}>
                <h3 className={styles.dayTitle}>{day.title}</h3>

                <p className={styles.turns}>
                  <span className={styles.turnsLabel}>{TEACHING.turnsLabel}</span>
                  {day.turns}
                </p>

                <ul className={styles.questions}>
                  {day.questions.map((question) => (
                    <li key={question.slice(0, 40)} className={styles.question}>
                      {question}
                    </li>
                  ))}
                </ul>

                <p className={styles.weigh}>
                  <span className={styles.weighLabel}>{TEACHING.weighLabel}</span>
                  {day.weigh}
                </p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>

      {/* ------------------------------------------------ Reading a run */}
      <Reveal delay={140} className={styles.sectionHead}>
        <h2 className="eyebrow">{TEACHING.readingLabel}</h2>
        <p className={styles.sectionNote}>{TEACHING.readingNote}</p>
      </Reveal>

      <div className={styles.patterns}>
        {Object.entries(READING_A_RUN).map(([id, entry], index) => (
          <Reveal key={id} delay={160 + index * 50}>
            <article className={styles.pattern}>
              {/* The label the student read, not a second version of it. */}
              <h3 className={styles.patternTitle}>{PATTERNS[id].title}</h3>

              <p className={styles.patternMeans}>
                <span className={styles.patternLabel}>{TEACHING.meansLabel}</span>
                {entry.means}
              </p>

              <p className={styles.patternAsk}>
                <span className={styles.patternLabel}>{TEACHING.askLabel}</span>
                {entry.ask}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      {/* ------------------------------------------------ How long */}
      <Reveal delay={160} className={styles.note}>
        <span className={styles.noteLabel}>{TEACHING.lengthLabel}</span>
        <p className={styles.noteText}>{TEACHING.lengthNote}</p>
      </Reveal>

      {/* ------------------------------------------------ Collecting it */}
      <Reveal delay={200} className={styles.note}>
        <span className={styles.noteLabel}>{TEACHING.copyLabel}</span>
        <p className={styles.noteText}>{TEACHING.copyNote}</p>
      </Reveal>

      <Reveal className={styles.actions}>
        <Button variant="primary" onClick={onBack}>
          {TEACHING.back}
        </Button>
      </Reveal>
    </main>
  );
}
