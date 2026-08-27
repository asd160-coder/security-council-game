# Archival asset manifest

What to source, from where, and on what rights basis. Nothing is downloaded
until approved; every item below is declared as a slot in `src/data/archive.js`
before its file exists, and the app plays correctly on designed empty states.

## The rights rule for this project

The game is intended for public deployment, so it uses **only material that is
verifiably public domain**. In practice that means works of the United States
federal government: CIA and NPIC reconnaissance product, White House
photography, US Navy and Air Force photography, and the President's own
broadcasts. Every item renders with a visible source and rights line, and a
credits panel lists them all.

Exact catalogue identifiers, dimensions and file sizes are confirmed at the
point of download, not asserted here.

---

## Status

Three slots are filled, from a single declassified PDF of the first U-2
coverage: the San Diego de los Baños MRBM launch-site readout board, the Los
Palacios encampment board, and the CIA's SS-4 reference photograph from a
Moscow parade. All three are CIA/NPIC product and public domain.

The 22 October address is in: a 2:54 excerpt (3:30–6:24 of the seventeen-minute
broadcast) cut from JFKWHA-142-001, encoded as mono AAC at ~64 kbps. The clip
tool that produced it is `.design/clip-audio.swift` — `swift clip-audio.swift
<in> <out.m4a> <startSeconds> <durationSeconds>` — kept because any later clip
should be cut the same way.

All seven slots are now filled and every day carries media: Day 1 the U-2
launch-site board paired with the SS-4 reference that made identifying it
possible, Day 2 the address, Day 3 the Neptune over the Okhotsk, Day 4 the
Executive Committee, Day 5 a departing freighter with its cargo uncovered for
counting.

One filled item, the Los Palacios encampment board, is deliberately not shown —
it duplicates the launch-site board's function and Day 1 does not need three
frames. It stays available.

Two candidates remain unused: the colour White House photograph of pilot
Richard Heyser in the U-2 PDF, and a larger copy of the departing freighter,
which is only 600px wide in the version to hand.

## Milestone 6 — the consequence visualisation

Deferred deliberately and scoped to the ruptured ending rather than a
between-days interstitial, where there is time to read it. Two conditions
before anything is built: figures sourced for **1962** arsenals rather than the
1980s — nuclear-winter modelling dates from 1983 and the standard casualty
projections describe a far larger exchange than October 1962 could have
produced — and the packet's own treatment, which asks for expanding zones,
communication-failure markers and stability indicators rather than explosive
imagery.

One correction the plates forced: the imagery is annotated **Los Palacios** and
**San Diego de los Baños**, not San Cristóbal. Those are neighbouring sites in
the same Pinar del Río complex, and the slot metadata now says what the boards
say rather than what this manifest originally guessed.

## Tier 1 — Day 1, the three declared slots

These fill the slots that already exist in the build.

### 1. U-2 reconnaissance frame, San Cristóbal MRBM site
- **Date:** 14 October 1962
- **What:** The high-altitude photograph that started the crisis — a
  medium-range ballistic missile site under construction in western Cuba.
- **Repository:** CIA / National Photographic Interpretation Center, held by
  the US National Archives; also in the JFK Library's collections
- **Rights:** Public domain, US federal government work
- **Slot:** `u2-san-cristobal` (Day 1 briefing)
- **Why this one:** It is the evidence itself. Every decision in the scenario
  rests on an image most of the world had not yet seen.

### 2. NPIC briefing board with photo-interpreter annotations
- **Date:** 15–16 October 1962
- **What:** A mounted briefing board of the same imagery, annotated by
  photo interpreters — arrows, chinagraph marks, printed captions identifying
  launch positions and erectors.
- **Repository:** CIA FOIA Electronic Reading Room; National Archives
- **Rights:** Public domain, US federal government work
- **Slot:** New — strongest candidate for a second Day 1 image
- **Why this one:** It shows *interpretation*, not just a photograph. The
  annotated board is where raw imagery became an argument, which is exactly
  the distinction the game is trying to teach. It is also the direct visual
  ancestor of this project's own art direction.

### 3. Executive Committee meeting, Cabinet Room
- **Date:** 16 or 29 October 1962
- **What:** The President and his advisers mid-deliberation.
- **Photographer:** Cecil Stoughton, White House Photographs
- **Repository:** John F. Kennedy Presidential Library and Museum
- **Rights:** Public domain, US federal government work
- **Slot:** `excomm-cabinet-room`
- **Why this one:** The crisis was argued in a room this size, by people who
  disagreed sharply. It makes the deliberation concrete.

### 4. Radio and television address to the nation — audio
- **Date:** 22 October 1962
- **What:** Kennedy informs the public of the missiles and announces the
  quarantine.
- **Repository:** John F. Kennedy Presidential Library and Museum
- **Rights:** Public domain, US federal government work
- **Slot:** `jfk-address`
- **Why this one:** The moment the crisis stopped being secret. Public
  knowledge narrowed what either government could quietly agree to — which is
  a mechanic the later days depend on.
- **Note:** Use a short excerpt, captioned, skippable, per the design packet.

---

## Tier 2 — Days 2 to 5, as they are built

### Day 2 · Public pressure and private channels
- **Kennedy delivering the 22 October address** — still photograph at the
  desk. Stoughton or Robert Knudsen, JFK Library. Public domain.
- **Kennedy signing the quarantine proclamation, 23 October 1962** — JFK
  Library. Public domain. Useful for the moment policy becomes formal.

### Day 3 · Escalation and leverage
- **US Navy destroyer alongside a Soviet freighter** — quarantine enforcement.
  Naval History and Heritage Command. Public domain.
- **P-2 Neptune patrol aircraft over a Soviet freighter with crated missiles
  visible on deck** — one of the most legible images of the whole crisis.
  US Navy, NHHC. Public domain.
- **Low-level reconnaissance photography of Cuban sites** — US Navy RF-8
  Crusader imagery, flown at very low altitude and dramatically sharper than
  the U-2 frames. NHHC / National Archives. Public domain.

### Day 4 · Negotiation under pressure
- **EXCOMM, 29 October 1962** — Stoughton, JFK Library. Public domain.
- **UN Security Council session, 25 October 1962** — the Stevenson–Zorin
  exchange. **Rights caution:** the best-known images are UN Photo, which the
  United Nations licenses and which is *not* public domain. Only use a US
  government photograph of the session if one can be confirmed; otherwise
  carry this beat with typography and leave the slot empty.

### Day 5 and debrief
- **Aerial photograph of a missile site being dismantled**, early November
  1962. Public domain.
- **Soviet ship departing Cuba with missiles uncovered on deck** — US Navy,
  NHHC. Public domain. A quietly powerful closing image.
- **Kennedy's 2 November 1962 announcement that the bases are being
  dismantled** — audio, JFK Library. Public domain.

---

## Tier 3 — high value, worth considering

### EXCOMM tape recordings
- **What:** Kennedy secretly recorded the EXCOMM deliberations. The tapes
  survive and are public domain.
- **Repository:** JFK Library
- **Why:** This is the single most remarkable asset available to this project.
  Students can hear the actual argument — hesitation, disagreement, people
  talking over each other — rather than a narrated summary of it.
- **Caveats:** Audio quality is poor and speakers are hard to distinguish.
  Any excerpt needs a caption identifying the speaker and a transcript line.
  Short excerpts only, and check whether a transcript is needed for
  accessibility rather than merely helpful.

### CIA range-arc briefing map
- **What:** The 1962 briefing chart showing MRBM and IRBM arcs drawn from
  Cuba. Public domain.
- **Why:** Worth having as a reference image beside the game's own SVG map —
  and as the honest source for the range figures. Note the original chart is
  marked in **nautical** miles, which is where the widely repeated and
  incorrect "1,100 / 2,200 statute miles" figures come from.

---

## Not usable

Listed so the decision does not get revisited later.

| Material | Why not |
|---|---|
| CBS, NBC, ABC news broadcasts | Under copyright. No period commercial broadcast audio or video. |
| AP, UPI, Reuters wire photographs | Under copyright. |
| Life, Look, and other magazine photography | Under copyright. |
| UN Photo library images | The UN holds and licenses these; not public domain. |
| Colourised or AI-restored versions | A new copyright may attach to the restoration, and the alteration is itself a problem for a documentary tone. |

---

## Where to look

### JFK Presidential Library — `jfklibrary.org`
The single best starting point. Holds the White House Photographs collection
(Stoughton, Knudsen), the Presidential Recordings including the EXCOMM tapes,
and the televised addresses. Use the digital archive search; most items carry
a clear rights statement and a downloadable master.

Search terms that work: `Cuban missile crisis`, `Executive Committee`,
`October 1962`, plus photographer surnames `Stoughton` and `Knudsen`.

### National Archives Catalog — `catalog.archives.gov`
The deepest holdings, and the least convenient interface. Everything is
described at series and item level with an explicit "Use Restrictions" field —
read that field rather than assuming. Filter by *Photographs and Graphic
Works* or *Sound Recordings* and by the relevant record group (Department of
Defense, CIA, Navy).

### CIA FOIA Electronic Reading Room — `cia.gov/readingroom`
Where the declassified reconnaissance product lives, including the annotated
NPIC briefing boards. A dedicated Cuban Missile Crisis collection was released
for the fiftieth anniversary. This is the only place to get the briefing
boards at usable resolution.

### Naval History and Heritage Command — `history.navy.mil`
Quarantine photography: destroyers alongside Soviet freighters, the P-2
Neptune overflights, RF-8 low-level reconnaissance. US Navy work, public
domain, and consistently well captioned with dates and hull numbers.

### Library of Congress — `loc.gov`
Prints and Photographs Division. Mixed rights — the site gives a rights
advisory per item, and a good deal of what it holds is *not* public domain.
Read the advisory every time.

### Wikimedia Commons — `commons.wikimedia.org`
Useful as an *index*, not as a source. It aggregates federal works and shows
the rights reasoning, but the reasoning is user-supplied and sometimes wrong.
Use it to discover an image, then follow its citation back to the originating
archive and download from there.

## The two hard cases

Most figures in this scenario are easy to source. Two are not.

**Anatoly Dobrynin.** Soviet official photography is not public domain and its
status is genuinely tangled. The workable route is US government photographs
taken during his long Washington posting — White House arrivals, signings,
State Department occasions — which are federal works.

**U Thant.** The obvious images are UN Photo, which the UN licenses. The same
route applies: look for US government photographs of his White House visits
rather than UN chamber photography.

If neither yields a rights-clear image, the interface is designed to work
without portraits and should be left to do so.

---

## Portraits

The role cards and dossiers currently carry **no portraits**, by design. If
portraits are added, one rule governs them, and it is an extension of the rule
already in `src/styles/tokens.css`:

> **A photograph is 1962. An illustration is now.**
> Archival photography renders on paper, in the archival register, with its
> source line. Any created portrait must be visibly an *interpretation* —
> drawn, screened, or otherwise plainly not photographic — and belongs to the
> board, the present-day interface.

Why this matters more than usual here: this is a history product for students,
and the whole design argues that the material on screen is real. A created
likeness that reads as a photograph borrows that credibility without earning
it, and a student cannot tell which is which. The core brief's own guardrail
against fictionalising the central historical actors points the same way.

Practical consequences:

- Never place a created portrait on the paper surface, and never give it a
  source line. Those are reserved for archival material.
- Keep created portraits in a treatment that could not be mistaken for a
  photograph: line work, a coarse halftone, a single-colour screen print.
- Label them. A small `Illustration` marker in the mono register, in the same
  position an archival item carries its source, keeps the distinction visible
  without belabouring it.
- Consistency is what sells it. Three portraits in three different styles read
  as clip art; three in one committed treatment read as an editorial decision.

---

## Practical notes for whoever adds the files

- Files go in `public/archive/`. Reference them by filename in the `file`
  field of the matching entry in `src/data/archive.js`.
- Suggested naming: `subject-YYYY-MM-DD.ext`, e.g.
  `u2-san-cristobal-1962-10-14.jpg`.
- Images: JPEG, long edge around 1600px. The interface renders archival
  imagery in greyscale with slightly raised contrast, so colour scans are
  fine as sources.
- Audio: MP3, mono is fine, excerpt to under about 45 seconds.
- Every new item needs `caption`, `source`, `rights` and `whyItMatters`
  filled in. `whyItMatters` is not optional — the design packet requires one
  sentence of relevance after every clip, and a caption that only describes
  the picture does not do that job.
