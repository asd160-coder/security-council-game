# October 1962 — A Security Council Simulation

A browser-based classroom simulation of the Cuban Missile Crisis, in the register of Model
UN and Historical Crisis Committee. One student, one seat, five days, and a written
statement they build a clause at a time and finish in their own words.

It is not a quiz and it does not keep score.

---

## For a teacher

**How long.** About 40 minutes for one playthrough — roughly 25 minutes of reading plus
time to decide. It fits a single period.

**What the student actually does.** They take one of three seats and live five days of
October 1962. Each day they read a briefing, meet someone, and choose what to say. Their
choices assemble a diplomatic statement: Day 1 sets its tone, Day 2 composes a clause, Day 3
revises that clause, Day 4 assembles the terms of a bargain, and Day 5 asks them to write
its closing paragraph themselves. The run ends with that finished document, an outcome, and
a debrief that reads the five days back to them.

**The three seats see different material.** The crisis is identical; what changes is what
each of them is responsible for, afraid of, and able to offer. Just over half the writing is
tied to a particular seat, so a single playthrough shows less than half of it. **The
strongest use of this in a classroom is to split the room three ways and compare
afterwards** — the same fortnight from three chairs is the point, and the discussion prompts
at the end of the debrief assume it.

| Seat | Position | What they hold |
|---|---|---|
| Robert Kennedy | Attorney General of the United States | Access to the room where the decision is made, and a private channel |
| Anatoly Dobrynin | Soviet Ambassador to the United States | Ambiguity, private contact, and a government that does not tell him everything |
| U Thant | Secretary-General of the United Nations | No army and no veto — only the standing to ask both to stop |

**The five days**

| | | |
|---|---|---|
| Day 1 | Discovery | Tuesday, 16 October 1962 |
| Day 2 | Public pressure and private channels | Tuesday, 23 October 1962 |
| Day 3 | Escalation and leverage | Thursday, 25 October 1962 |
| Day 4 | Negotiation under pressure | Saturday, 27 October 1962 |
| Day 5 | The answer | Sunday, 28 October 1962 |

**There is no score.** Five indicators move — escalation, legitimacy, council trust,
diplomatic leverage, civilian risk — and the interface says so plainly: *movement shows
direction, not success.* Rising leverage is not automatically good. Deciding which trade was
worth making is the student's job, and the game does not do it for them. Nothing
congratulates and nothing warns.

**The student's writing is not assessed.** The closing paragraph they write on Day 5 is
quoted back to them, in their own document, and never marked.

---

## Sources and what is in the archive

The simulation deploys publicly, so it uses only material that is verifiably in the public
domain. That rests on two bases, and the difference is worth keeping straight.

Most of it consists of **works of the United States federal government**: CIA and NPIC
reconnaissance photography, White House photography, the President's broadcast address, and
federal documents via NARA, the JFK Presidential Library, and the Office of the Historian.

The photographs of Khrushchev and Castro on the background tab are not federal works. They
come from the **U.S. News & World Report collection at the Library of Congress**, whose
rights the magazine dedicated to the public when it donated the collection. That is a
donor's dedication rather than a federal authorship, and it is named here rather than
folded into the sentence above. Every item carries its source and rights where it
appears.

The archive currently holds six photographs, one audio excerpt, one newsreel film, and
three primary source texts: National Security Action Memorandum 196, Proclamation 3504, and
President Kennedy's reply to Chairman Khrushchev of 27 October 1962.

**One limitation, stated rather than hidden.** Khrushchev's letters of 26, 27 and 28 October
are the documents the endgame actually turns on, and they cannot be used here: they are
Soviet works, and the English text the Department of State prints is a translation, which is
a federal work without clearing the work underneath it. The same exclusion applies to the UN
record of the Stevenson–Zorin exchange, the Scali memorandum, Castro's letter, and the OAS
resolution. **The result is an archive holding a rights-clean arc across 22–28 October in
which the Soviet side appears only as what American documents say it said.** That is a real
historiographical limitation and it is worth naming to a class rather than letting it pass —
whose archives are open is itself part of the history.

Portraits are generated painted illustrations, not photographs, and are marked as such
wherever they appear. The rooms behind the conversations are invented, drawn in the
interface from simple shapes; no scene depicts a real room, meeting or document. Coastlines
on the situation map come from Natural Earth, which is public domain.

Dialogue is authored for the simulation. It is written in the register of the historical
figures and is **not** quotation.

---

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
```

Requires Node 18+. There is no backend, no database and no accounts — it is a static site,
and `vite.config.js` sets `base: './'` so the build works from a subdirectory.

**Deploying.** `.github/workflows/pages.yml` builds on every push to `main` and deploys to
GitHub Pages **only when run by hand** — publishing is a decision, not a side effect of a
commit. To put it live: make the repository public, set *Settings → Pages → Source* to
"GitHub Actions", then run the "Build and deploy" workflow from the Actions tab. It will
appear at `https://asd160-coder.github.io/security-council-game/`.

**A run is held in the browser and is not sent anywhere.** Nothing a student writes leaves
their machine.

---

## How it is put together

- **React 19 + Vite**, plain JavaScript, CSS Modules. No state library — all game state is
  one serialisable object in a single `useReducer` (`src/lib/gameState.js`).
- **A day is data.** `src/data/days/dayN.js` is an ordered list of steps; each step's `kind`
  selects a renderer from a map in `src/screens/DayView.jsx`. Adding a day needs no new
  code.
- **Convergence keeps the writing finite.** From Day 4 several openings converge on one set
  of follow-ups carrying per-role lines, so the content grows with the number of positions
  rather than with the number of paths.
- **One rule governs the palette**, stated at the top of `src/styles/tokens.css`: *the board
  is the present, the paper is 1962.* Anything that is the modern interface reading the
  crisis sits on a dark plotting board; anything that **is** a 1962 document is archival
  paper laid on top of it. The documentary quotations are the one exception — they span
  1956 to 2003, so they are neither, and get a third treatment of their own.

```
src/data/       days, roles, trackers, endings, archive, dossiers, the council
src/lib/        the reducer, tracker maths, outcome resolution, the debrief reading
src/components/ steps, scene staging and room plates, panels, shared primitives
src/screens/    title, role select, the play screen, ending, debrief
docs/           the design packet, content packs, and the asset manifest
```

`docs/asset-manifest.md` carries the sourcing rules in full, including the distinction that
matters most for documents: **provenance, not custody** — a `.gov` URL says who is hosting
something, not who wrote it.
