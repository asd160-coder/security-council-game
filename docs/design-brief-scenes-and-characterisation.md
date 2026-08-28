# October 1962 — a Security Council simulation

## Design brief: rendering choices as scenes, and characters as people

This document describes a working browser game and asks a specific design question about it.
It is written for someone advising on **visual and presentational design**, not on
architecture — the architecture works and is described here only so the advice can be
actionable against it.

---

## 1. What the game is

A single-player, browser-based educational simulation of the Cuban Missile Crisis, built for
classroom use in a Model UN / Historical Crisis Committee register. The student plays **five
days** of the crisis (22–28 October 1962) in one of three seats, makes decisions in scenes,
watches five crisis indicators move, assembles a diplomatic statement clause by clause across
the five days, writes its closing in their own words, and reaches one of four endings followed
by a reflective debrief.

It is **not** a strategy game and deliberately does not read as one. The governing tone is
documentary: closer to an archive reading room than to a war game.

### The three seats

| Role | Position | What they hold | What they fear |
|---|---|---|---|
| **Robert Kennedy** | Attorney General, US | Access to the room where the decision gets made; private channels | That a misstep means humiliation *or* war |
| **Anatoly Dobrynin** | Soviet Ambassador to the US | Ambiguity, private contact, the ability to test intentions — and a government that does not tell him everything | That weakness is exploited, but overreaction traps both sides |
| **U Thant** | Secretary-General, UN | No army, no veto — only the standing to ask both to stop | That mediation arrives too late |

The three play the **same five days** and the **same crisis**. What differs is the room they
walk into, who they talk to, what they can offer, and what a given move costs them. Role
identity is preserved all the way into the ending: each of the four resolutions has a separate
closing passage per role.

### The five days

| Day | Beat | Drafting task |
|---|---|---|
| 1 | Discovery — the photographs | Choose the **tone** of the statement |
| 2 | Public pressure and a private channel | **Compose** a clause: frame + operative |
| 3 | Escalation and leverage | **Revise** the clause (or hold it) |
| 4 | Negotiation under pressure — the Turkey trade | **Assemble** a three-slot bargain |
| 5 | The answer is due | **Write** the closing in your own words |

The drafting ladder is the spine: the student's document accumulates across five days and is
shown complete, with their own closing as its final paragraph, on the ending screen.

### The five indicators

`escalation`, `legitimacy`, `councilTrust`, `leverage`, `civilianRisk` — each on a ±20 scale.
They are explicitly **not scores**. Each carries a `meaning` line describing what movement
represents rather than whether it is good. Rising leverage is not automatically desirable;
this is the point of the whole exercise, and the interface must never resolve that tension on
the student's behalf.

---

## 2. Technical elements

### Stack

- **React 19 + Vite 7**, plain JavaScript (no TypeScript)
- **CSS Modules**, one stylesheet per component
- **All state in a single `useReducer`** (`src/lib/gameState.js`) over one serialisable object
- **No backend, no persistence, no auth, no analytics.** A classroom run starts clean every time
- Static hosting only. ~10,500 lines across `src/`
- Fonts: Libre Franklin (display), Source Serif 4 (body), IBM Plex Mono (labels), self-hosted via `@fontsource`

### The day engine

A day is **an ordered list of steps**. Each step has a `kind`; `kind` selects a renderer from a
map in `src/screens/DayView.jsx`. Adding a day requires no code changes — only a new data file.

```js
const STEP_RENDERERS = {
  briefing, privateBrief, dialogue, exchange, witness, consequence,
  drafting, draftingCompose, draftingRevise, draftingAssemble, writing, summary,
};
```

Actual day shapes:

```
day1: briefing → privateBrief → dialogue → consequence → drafting → summary
day2: briefing → dialogue → consequence → exchange → consequence → draftingCompose → summary
day3: briefing → witness → exchange → consequence → draftingRevise → summary
day4: briefing → witness → exchange → consequence → draftingAssemble → summary
day5: briefing → exchange → consequence → writing → summary
```

### Screen layout (`DayView`)

A three-column CSS grid, collapsing to a single column below 1180px:

```
┌────────────┬────────────────────────────┬──────────────┐
│ LEFT       │ CENTRE                     │ RIGHT        │
│ (sticky)   │ the scene — step renderers │ (sticky)     │
│ situation  │ scrolls, drives the day    │ five crisis  │
│ map,       │                            │ indicators   │
│ dossier    │                            │              │
│ rail       │                            │              │
├────────────┴────────────────────────────┴──────────────┤
│ DRAFTING TRAY — the statement so far                   │
└────────────────────────────────────────────────────────┘
```

Rail 260px / centre `1fr` / trackers 232px. Scene prose is capped at `--measure-scene: 34rem`.
On collapse the scene is forced to `order: -1` so it always leads.

### The design token system

One rule governs the entire palette, stated at the top of `src/styles/tokens.css`:

> **The board is the present. The paper is 1962.**

Anything that is the modern interface *reading* the crisis — map, trackers, chrome, choice
buttons — sits on a cold dark **plotting board**. Anything that *is* a document from the crisis
— dossiers, briefing memos, witness cards, the drafting tray — is **archival paper** laid on
top of it. Mixing the two registers is how the whole thing stops looking deliberate.

```css
/* board */            /* paper */              /* accents */
--board:      #12161b  --stock:      #e6e1d6    --wax:    #b23a2f  /* danger only */
--board-raised:#1b2128 --stock-aged: #d8d1c2    --brass:  #a8853c  /* institutional */
--board-inset:#0d1116  --stock-edge: #c4bcaa    --signal: #6f8fa6  /* neutral movement */
--board-line: #2a323b
/* text on board: --silver → --silver-muted → --silver-faint → --silver-fainter */
/* text on paper: --ink → --ink-muted → --ink-faint */
```

Wax red is chinagraph pencil — the mark a photo interpreter makes on a print. It is **rationed
to danger only** (escalation, civilian risk). Brass is the institutional register. `--radius:
2px`, because these are documents and instruments, not software. `prefers-reduced-motion` is
honoured throughout.

### Rights and provenance discipline (a hard constraint)

The project is intended for public deployment, so:

- **Archival photographs** must be verifiably public domain — in practice **US federal works
  only** (CIA/NPIC reconnaissance frames, White House photography, JFK's broadcast address via
  NARA and the JFK Library). AP, Getty, NYT, UN Photo and period commercial broadcast are
  excluded. These live in `public/archive/` and always render with a visible `source` and
  `rights` line, plus a required `whyItMatters` sentence.
- **Portraits and illustrations are AI-generated** — invented likenesses of real people. They
  live in `public/portraits/` and `public/art/`, **never** `public/archive/`. They render only
  on board surfaces, always carry a visible `Illustration` marker, and never carry a source
  line. The folder split is the first line of that distinction; the label is the second.

Any visual proposal that would blur these two categories is out of bounds.

### Controlled convergence (why the content doesn't explode)

From Day 4, an exchange offers several **openings** that converge into a **shared set of
follow-ups**. Each shared follow carries `lineByRole`, `effectsByRole`, and an optional
`strain` block that reprices the option when the player's standing has already slipped:

```js
function resolveShared(option, roleId, trackers) {
  const strained = option.strain && trackers[option.strain.tracker] < option.strain.below;
  return {
    id: option.id, label: option.label, feedback: option.feedback,
    line:    option.lineByRole[roleId],
    effects: (strained ? option.strain.effectsByRole : option.effectsByRole)[roleId],
    note:    strained ? option.strain.note : option.note,
  };
}
```

This is why Day 4 needs 18 follow definitions instead of 36 while showing 4 openings instead of
2. **Any proposed redesign must not reintroduce combinatorial growth in authored content.**

### Current content volume

~140 authored choice objects, 87 distinct effect blocks, 36 counterpart reply passages, 4
resolutions × 12 role closers × 7 modifiers for endings. Verified by exhaustive Node harnesses
that drive the real reducer across all paths (80.6M paths walked; no dead ends, 0.00% at-rail).

---

## 3. How a scene currently renders

This is the part the brief is about.

### The data behind one scene

Every conversation already carries far more human material than the interface shows. A real
example from Day 3 (the `exchange` step, `id: 'pressure'`):

```js
{
  kind: 'exchange',
  eyebrow: 'Not a meeting anyone will minute',
  openingPrompt: 'How you meet it',
  followPrompt:  'How you answer',
  adviser: { label: 'Consult your adviser', unlocks: 'memo-aide-day3' },

  counterpartByRole: {
    rfk:      { name: 'A senior military adviser',  title: 'Speaking for those who want the sites struck' },
    dobrynin: { name: 'The embassy military attaché', title: 'Reporting separately to Moscow' },
    uthant:   { name: 'A permanent representative',   title: 'Speaking for a delegation losing patience' },
  },

  framingByRole: {
    rfk: ['He has been right about things before, which is the difficulty. He is not arguing
           for a war. He is arguing that the window for anything short of one is closing
           while you talk.'],
    // …
  },

  openingsByRole: {
    rfk: [{
      id:   'rfk3p-clock',
      label:'Put the clock to him',
      line: 'How long before those sites are operational, and how confident are you in that number?',
      reply:'He gives you a range of days rather than a number and does not pretend it is
             better than that. Then he says the thing you were hoping he would not: that the
             estimate has been revised toward the shorter end twice this week, and that
             revisions have only ever gone one way.',
      follow: [
        { id:'rfk3f-buy',      label:'Buy the time anyway',
          line:'Then we have days, and I intend to spend them…',
          feedback:'restraint', effects:{ escalation:-1, legitimacy:1, councilTrust:1, civilianRisk:-1 } },
        { id:'rfk3f-deadline', label:'Set a point of decision',
          line:'Then we will decide by the end of the week… A date concentrates a government.',
          feedback:'ultimatum', effects:{ leverage:2, escalation:1, legitimacy:1, civilianRisk:1 } },
      ],
    }],
  },
}
```

### What the player actually sees

The `exchange` step renders in two phases, in one continuous scrolling column:

**Before you speak**
1. An eyebrow in tracked uppercase mono (`Not a meeting anyone will minute`)
2. The counterpart as **two lines of text** — name in display 15px, title in mono 10px, with a
   hairline under it
3. One or two paragraphs of framing prose in serif at `--fs-scene`
4. An optional quiet "Consult your adviser" button
5. **A vertical stack of identical buttons**, gap 10px

**After you speak**
6. What you said, in italic serif behind a 2px brass left border
7. The counterpart's reply, in a bordered box on `--board-raised`, name in signal-blue mono
8. A horizontal rule
9. **Another vertical stack of identical buttons**
10. A quiet "Take it differently" reset

Each choice button is the same object every time:

```jsx
<button className={styles.choice}>
  <span className={styles.choiceLabel}>{choice.label}</span>   {/* mono, brass, uppercase, 11px */}
  <span className={styles.choiceLine}>{choice.line}</span>     {/* serif, silver, 16.5px */}
  {choice.note && <span className={styles.choiceNote}>{choice.note}</span>}
</button>
```

```css
.choice {
  width: 100%; text-align: left; display: block; padding: 16px 18px;
  border: 1px solid var(--board-line); border-left: 2px solid transparent;
  background: var(--board-raised);
}
.choice:hover {
  background: #232b34; border-left-color: var(--brass); transform: translateX(2px);
}
```

Reveals are staggered (`Reveal` with `delay` props: 0 / 80 / 140 / 240 / 520 / 580ms) so the
scene assembles rather than appearing at once.

---

## 4. The problem

**The writing is characterised. The interface is not.**

The authored content already does the human work — the military adviser who "has been right
about things before, which is the difficulty"; the attaché who "does not report to you and
never has"; a Soviet ambassador whose own government does not tell him everything. Every choice
is a distinct sentence in a distinct voice.

But **every one of those choices renders as the same grey rectangle in the same vertical
stack.** The result is that a scene of real human pressure reads as a menu. Three consequences:

1. **The counterpart is a caption, not a presence.** Two lines of text and a hairline. The
   player is talking to a label.
2. **Choices are undifferentiated.** A choice that costs you a great deal, one that is
   cautious, and one that is cruel are visually identical. The weight is in the prose and the
   prose has to carry it alone.
3. **The player's own line has no author.** You are Robert Kennedy for five days and never see
   him. The role portrait appears at seat selection and then vanishes.

### What is wanted

Make each scene read as **a room with people in it**, and each choice as **something a
particular person would say** — so that the decision carries emotional and human weight rather
than reading as an option list.

Specifically:

- Give the **counterpart** presence in the scene — they should feel like someone across a table
  who is applying pressure, not a heading
- Make the **player's own voice** visible and continuous — that these are *your* words in *your*
  mouth, accumulating over five days into a document with your name on it
- Differentiate **choices from one another** so their human character is legible before the
  player commits, without turning them into colour-coded "good/bad" options — the whole design
  refuses to tell the student which trade was right
- Find the visual register for **a conversation** as distinct from a briefing, a document, or
  an instrument reading

### Constraints any proposal must respect

1. **Tone.** Documentary and serious. This is a classroom tool about the closest the world came
   to nuclear war. Nothing that reads as a visual novel, a dating-sim dialogue box, comic
   panels, RPG portraits with emotion states, or gamified feedback.
2. **The two-register rule.** Board = the present reading the crisis. Paper = 1962 documents.
   A conversation is a *scene*, not a document — which is an open question this brief would
   like answered: does dialogue get a third register, or does it belong to the board?
3. **Rights.** No new photographic material of real people beyond US federal public domain.
   Counterparts are invented aides and advisers (sanctioned by the source brief) and have **no
   likenesses at all** — any proposal depending on portraits of them needs to say what the
   image actually is, and it must be marked as illustration.
4. **No judgement in the visual language.** The interface must not signal which choice is
   correct. Differentiation must be *characterful*, not *evaluative*.
5. **Content cost.** Anything requiring new per-choice authored assets multiplies by ~140
   choices × 3 roles. Solutions that derive from data that already exists (`feedback` category,
   `effects`, `counterpartByRole`, `framingByRole`, `strain`) are strongly preferred.
6. **Technical.** React 19 + CSS Modules, no new heavy dependencies, static hosting, must
   degrade at 768px and honour `prefers-reduced-motion`. Everything is keyboard-reachable and
   labelled today; it must stay that way.

### Data already available to drive differentiation

- `choice.feedback` — a category string per choice (`restraint`, `pressure`, `ultimatum`,
  `settlement`, …). 18 back-channel lines collapse to 5 categories. Already stored in state.
- `choice.effects` — which of the five indicators move and by how much, known **before** the
  click
- `choice.note` — a sentence explaining why an option costs what it costs, when the player's
  standing has changed its price
- `counterpartByRole` — name and title, per role, per scene
- `framingByRole` — the room, per role
- `role.portrait` + `role.portraitFocus` — an illustrated likeness of the player's own
  character, currently used only at seat selection
- `state.trackers` — the player's standing at the moment the choice is offered

---

## 5. The question

**How should this game render its conversations so that choices read as scenes and speakers
read as people?**

Concretely, advice is wanted on:

- The **visual grammar of a dialogue scene** in a serious documentary interface — layout,
  hierarchy, how a speaker is established, how turn-taking is shown, what separates a
  conversation from the surrounding chrome
- **Differentiating choices by character rather than by value** — typographic, spatial or
  compositional treatments that let a cautious line, a hard line and a cruel line look like
  different kinds of speech without ranking them
- **Giving a counterpart presence without a photograph** — since no likeness of these invented
  people exists or can be sourced
- **Making the player's own voice continuous** across five days, given that their words already
  accumulate into a real document
- **Reference points**: documentary film, archival exhibition design, radio drama,
  transcript-based theatre, editorial and long-form journalism layout — any tradition that has
  solved "put a human voice on a surface" without leaning on game-interface conventions

---

*The game is complete and playable end to end. This brief concerns presentation of existing
content, not new features or new scope.*
