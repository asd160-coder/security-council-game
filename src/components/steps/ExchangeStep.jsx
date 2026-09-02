import { useState } from 'react';
import { Button, Reveal } from '../ui/index.jsx';
import { PLAY } from '../../data/copy.js';
import { moodFor } from '../../data/scene.js';
import { roomFor } from '../../data/rooms.js';
import RoleAnchor from '../scene/RoleAnchor.jsx';
import RoomPlate from '../scene/rooms/RoomPlate.jsx';
import SceneEstablish from '../scene/SceneEstablish.jsx';
import SpeakerPresence from '../scene/SpeakerPresence.jsx';
import UtteranceList from '../scene/UtteranceList.jsx';
import scene from '../scene/scene.module.css';
import styles from './steps.module.css';

/* An exchange with a reply beat.

   You speak, the counterpart answers in character keyed to what you said, and
   then you choose again with that answer in front of you. The second choice is
   the one that carries the effects — which is the point. In a private channel
   the opening is a probe; what you do with the answer is the decision.

   The whole scene is one step rather than two, so the opening stays on screen
   under the reply and the conversation reads as continuous.

   Staged across the table: their presence and their reply sit flush on the far
   side, everything of yours is inset behind the near edge. Turn-taking is the
   alternation between the two sides, and the counterpart's presence marker
   lights while their answer is the live thing on screen. */

/* A shared follow-up is a position on the table rather than a personal move.
   It carries the same strategic meaning for all three roles and a different
   line, a different price, and — where standing is against you — a different
   price again. This is where it resolves into an ordinary choice, so nothing
   downstream has to know convergence exists. */
function resolveShared(option, roleId, trackers, unlocked) {
  const strain = option.strain;
  const strained =
    strain && trackers && trackers[strain.tracker] < strain.below;
  /* A line can require that a document has actually been read. The gate is the
     same test the adviser memo uses — has this id been filed — and a locked
     line is shown with its condition rather than removed. */
  const locked = Boolean(option.requires) && !unlocked?.includes(option.requires);
  return {
    id: option.id,
    label: option.label,
    feedback: option.feedback,
    line: option.lineByRole[roleId],
    effects: (strained ? strain.effectsByRole : option.effectsByRole)[roleId],
    note: strained ? strain.note : option.note,
    locked,
    lockedNote: option.requiresNote,
  };
}

export default function ExchangeStep({
  day,
  step,
  role,
  trackers,
  unlocked,
  onChoose,
  onConsultAdviser,
  adviserTaken,
}) {
  const [entered, setEntered] = useState(false);
  const [opening, setOpening] = useState(null);
  const openings = step.openingsByRole[role.id] ?? [];
  const counterpart = step.counterpartByRole[role.id];
  /* The framing differs per role: three people walk into three different
     rooms, and the room is most of what the scene is. */
  const framing = step.framingByRole?.[role.id] ?? step.framing ?? [];
  const mood = moodFor(day.number);
  /* Which room this is. A lookup, not content — see src/data/rooms.js. */
  const room = roomFor(day.id, step.id, role.id);

  const style = {
    '--scene-axis': `${mood.axis}px`,
    '--scene-light': mood.light,
    '--scene-tone': mood.tone,
  };

  if (!entered) {
    return (
      <div className={`${styles.step} ${styles.stepScene}`} style={style}>
        <SceneEstablish
          step={step}
          role={role}
          counterpart={counterpart}
          room={room}
          onEnter={() => setEntered(true)}
        />
      </div>
    );
  }

  return (
    <div className={`${styles.step} ${styles.stepScene}`} style={style}>
      <div className={scene.scene}>
        {/* The room stays present during the conversation as a strip behind
            the head — the same drawing cropped to its top and pushed down in
            contrast, so no utterance is ever read over scenery. */}
        <div className={scene.headWrap}>
          <RoomPlate {...room} variant="band" />
          <Reveal className={scene.head}>
            <span className={scene.eyebrow}>{step.eyebrow}</span>
            {step.place && <span className={scene.place}>{step.place}</span>}
          </Reveal>
        </div>

        {/* Theirs: flush to the far edge. The presence lights while their
            reply is the live thing on screen and goes quiet again once the
            question has come back to you. */}
        <Reveal delay={80} className={scene.far}>
          <SpeakerPresence counterpart={counterpart} speaking={Boolean(opening)} compact />
        </Reveal>

        <Reveal delay={140} className={scene.framing}>
          {framing.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </Reveal>

        {/* The adviser sits at the opening, before anything has been said, and
            is useless once you have spoken. */}
        {step.adviser && !opening && (
          <Reveal delay={200} className={scene.adviser}>
            {adviserTaken ? (
              <span className={scene.adviserTaken}>Adviser consulted · memo filed</span>
            ) : (
              <Button variant="quiet" onClick={onConsultAdviser}>
                {step.adviser.label}
              </Button>
            )}
          </Reveal>
        )}

        {!opening ? (
          <Reveal delay={260} className={scene.near}>
            <div className={scene.nearHead}>
              <span className={scene.nearLabel}>{PLAY.couldSay}</span>
              <RoleAnchor role={role} />
            </div>
            {/* Openings carry no category anywhere in the corpus, and should
                not: probing is what they all are. One register for the group. */}
            <UtteranceList
              options={openings}
              label={step.openingPrompt}
              onChoose={setOpening}
              register="probe"
            />
          </Reveal>
        ) : (
          <>
            <div className={scene.near}>
              <div className={scene.said}>
                <span className={scene.saidLabel}>{PLAY.youSaid}</span>
                <p className={scene.saidLine}>{opening.line}</p>
              </div>
            </div>

            {/* Announced, because the reply is new information the next
                decision depends on. */}
            <Reveal delay={220} className={scene.far}>
              <div className={scene.farReply}>
                <span className={scene.replyLabel}>
                  {counterpart ? counterpart.name : PLAY.theyReplied}
                </span>
                <p className={scene.replyLine} aria-live="polite">
                  {opening.reply}
                </p>
              </div>
            </Reveal>

            <Reveal delay={520} className={scene.near}>
              <div className={scene.nearHead}>
                <span className={scene.nearLabel}>{PLAY.couldSay}</span>
                <RoleAnchor role={role} />
              </div>
              <UtteranceList
                options={
                  step.sharedFollow
                    ? step.sharedFollow.map((o) => resolveShared(o, role.id, trackers, unlocked))
                    : opening.follow
                }
                label={step.followPrompt}
                onChoose={onChoose}
              />
            </Reveal>

            <Reveal delay={600} className={scene.actions}>
              <Button variant="quiet" onClick={() => setOpening(null)}>
                {PLAY.reconsider}
              </Button>
            </Reveal>
          </>
        )}
      </div>
    </div>
  );
}
