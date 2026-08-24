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
