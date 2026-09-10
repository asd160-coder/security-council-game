# Archival asset manifest

What to source, from where, and on what rights basis. Nothing is downloaded
until approved; every item below is declared as a slot in `src/data/archive.js`
before its file exists, and the app plays correctly on designed empty states.

## The rights rule for this project

The game is intended for public deployment, so it uses **only material that is
verifiably public domain**. Two mechanisms qualify, and the manifest keeps them
apart rather than letting one sentence cover both.

**1 · Works of the United States federal government.** CIA and NPIC
reconnaissance product, White House photography, US Navy and Air Force
photography, and the President's own broadcasts. This covers everything in the
archive proper, plus the Stoughton portrait of Kennedy on the background tab.

**2 · Rights dedicated to the public by the copyright holder.** Three items,
all privately made and none of them federal works, which is why the README and
the credits panel name two bases instead of one:

- the photographs of **Khrushchev** at the United Nations and **Castro** in
  Washington, from the **U.S. News & World Report collection at the Library of
  Congress**. USN&WR dedicated to the public all rights it held when it
  donated the collection, so staff photographers' frames carry no known
  restrictions.
- the **Universal Newsreel** film of 29 October 1962 on Day 5. MCA/Universal
  donated the newsreel library to the National Archives and deeded its rights
  and title to the US Government in 1974 without copyright restriction. NARA
  notes that an individual story may still contain underlying third-party
  material, so the excerpt actually used was checked rather than the reel as a
  whole: it is UN Secretariat exteriors, Kuznetsov arriving, and U Thant
  receiving him. The De Gaulle item in the reel's second half is cut.
  Excerpted with `.design/clip-video.swift`, the sibling of the audio tool,
  so any later clip is cut the same way.

Every item renders with a visible source and rights line, and a credits panel
lists them all.

### Quotation is not reproduction

The rule above governs **reproducing a whole work** — a photograph, an audio
clip, a reel of film, the facsimile text of a document. The epigraphs added in
Milestone 16 are a different thing and rest on a different footing: brief
attributed quotation of a sentence or two, for teaching and commentary.

Two of the seven are public domain on rule 1 anyway, both being Kennedy
speeches. The other five are copyrighted or Soviet or Cuban in origin — the
same category this manifest excludes from the archive — and are quoted rather
than reproduced. That distinction is the reason the title footnote and the
credits panel now describe three categories instead of two: dialogue invented
for the simulation, archival material reproduced in full, and real quotation
attributed where it appears.

Each epigraph also carries **how it reached us**, which matters more here than
the rights question. Three of the seven are not documents: Power's line is a
private remark recalled by its addressee and published twenty-three years
later; McNamara is remembering a night forty years afterwards; and "we will
bury you" is a translation that overstated Khrushchev badly enough that he
complained about it himself in 1963. Printing those flat, as though each were
as well attested as a transcript, would teach something false about how
history is known. See `src/data/epigraphs.js`.

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

**Built.** It renders on the ruptured ending only, in
`src/components/ending/ConsequencePanel.jsx`, with its content in
`src/data/consequence.js`.

Both conditions held. Every figure describes October 1962 — 42 R-12 launchers,
roughly a hundred tactical warheads on the island that Washington did not know
about, an invasion force of over a hundred thousand — and the panel states
plainly that what would have followed cannot be estimated honestly, naming the
1980s modelling that the familiar figures actually come from. There is no
depiction of an attack and no casualty arithmetic.

The treatment is the warning interval rather than the explosion: a thirteen-
minute scale with detection, verification, notification and decision marked
inside it, which is the packet's communication-failure brief and is also the
more frightening account. The infographic that prompted this is not used.

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

## Milestone 19 — the overture

Nine stills for the opening film, all works of the United States government and all
registered in `src/data/archive.js` with `overture: true`, so the credits panel lists them
without a second list. Sourced from Wikimedia Commons, with each file's own rights
metadata read before download; one attribution was resolved at the holding institution.
Two more shots are shared with play and were sourced under earlier milestones: the ExComm in
the Cabinet Room (Cecil Stoughton, White House) and the SS-4 in Red Square (CIA reference
photography), the latter added for the second script's line "under threat from nuclear
arsenals". Eleven photographs in all.

| File | What it is | Source | Basis |
|---|---|---|---|
| `truman-berlin-1945-07-16.jpg` | Truman, Byrnes and Leahy in Berlin, 16 July 1945 | NARA 198768, Truman Library | Federal |
| `nagasaki-cloud-1945-08-09.jpg` | The cloud over Nagasaki | Charles Levy, USAAF — NARA | Federal |
| `hiroshima-shadow-1945-11-20.jpg` | Flash burns on the Sumitomo Bank steps | Unidentified photographer for the United States Government, 20 Nov 1945; print at the International Center of Photography, 2006.1.411 | Federal — **attribution from the ICP's record**, not Commons, which says "unknown" |
| `crossroads-baker-1946-07-25.jpg` | Test Baker, Bikini | US Department of Defense | Federal |
| `shippingport-1956-10-10.jpg` | Shippingport under construction | US Nuclear Regulatory Commission | Federal |
| `juno-i-explorer-1958-01-31.jpg` | Juno I on the pad | NASA | Federal |
| `checkpoint-charlie-1961-10-27.jpg` | The tank standoff | US Army / USAMHI | Federal |
| `jfk-colonnade-1962-10-29.jpg` | Kennedy with Bundy, Nitze, Taylor, McNamara | Cecil Stoughton, JFK Library ST-A26-13-62 | Federal — 760px only; the Library blocks automated download, a larger original can be dropped in by hand |
| `duck-and-cover-1951.jpg` | Bert the Turtle, the film's opening cartoon | Federal Civil Defense Administration, LoC mbrs01836081 | Federal — **not the children-under-desks frame**; a frame can be cut from the 452 MB LoC source if wanted |

**Rejected.** An Imperial War Museum photograph of Montgomery decorating Zhukov at the
Brandenburg Gate (TR 2913) is verifiably public domain — Crown copyright expired 1995 — but
would have been a third rights basis; the NARA Truman photograph covered the beat without
one. The Commons Hiroshima shadow was usable only once the ICP's record named the United
States Government as maker; "unknown author" on Commons was not accepted on its own.

**The narration** is not archival and is not listed in the table. It is a synthetic voice,
generated by the user with ElevenLabs on 5 September 2026 from the script in
`src/data/overture.js` — the stock voice "Shaun – Boston", delivered as
`ElevenLabs_2026-09-05T14_08_05_Shaun - Boston_pvc_sp74_s55_sb58_se38_b_m2.mp3` (40.9 s, mono,
128 kbps) and kept byte-for-byte as `.design/narration-source.mp3`. The credits say the voice
is nobody's.

The take's `<break time="3s"/>` marks rendered at 1.75–2.4 s, which gave each image about
3.4 seconds. The film's file, `public/overture/narration.m4a`, is therefore the take rebuilt by
`.design/pad-narration.swift`: each line whole, with 0.20 s of the take before it and 0.35 s
after, followed by a pause cut from the take's own room tone. The pause table, the one place
to tune the film's pace:

| After | Pause |
|---|---|
| a plain line (1, 3, 6, 8, 9, 10, 11) | 2.6 s |
| a line that hands over to a wordless shot (2, 4, 5, 7) | 4.4 s |
| the last line (12) | 4.4 s |

63.45 s in all. The beat times in `overture.js` were read from `.design/speech-segments.swift`
run on the rebuilt file, not typed from the table.

## Milestone 20 — after the first playthrough

The first playthrough asked for photographs on the Background tab's road, real photographs
of the three seats in the overture in place of the painted portraits (which were also
cropped to nothing but face — they are now shown whole, as plates over a blurred copy of
themselves), the film's cartoon replaced by its real classroom, and type one step larger.
Every still below is a work of the United States federal government. Each was checked on
its Commons file page for photographer, source, licence template and size before download;
the John F. Kennedy Library items were fetched from the Commons copies because the Library
blocks automated download. The downloads were approved as a list in the plan of 5 September
2026.

| File | What it is | Source | Basis / note |
|---|---|---|---|
| `camp-david-1961-04-22.jpg` | Kennedy and Eisenhower at Camp David, 22 April 1961, five days after the Bay of Pigs landing | Robert Knudsen, White House; NARA 194198 | Federal — downscaled from 2966px to 1600 |
| `vienna-1961-06-03.jpg` | Kennedy and Khrushchev, Vienna, 3 June 1961 | US Department of State; JFK Library PX 96-33:12 | Federal — downscaled from 2894px to 1600 |
| `potsdamer-platz-1961-11-22.jpg` | Border fortifications at Potsdamer Platz, 22 November 1961 | US Army Berlin Brigade; NARA 6003846 | Federal — 1460px as found; the numeral is the Army's own report mark, kept |
| `corona-mys-shmidta-1960-08-18.jpg` | The first CORONA satellite frame: Mys Shmidta airfield, 18 August 1960 | National Reconnaissance Office | Federal — 499×640 as found, shown whole, never upscaled; nro.gov refuses automated fetches, so no larger print was found |
| `jupiter-turkey-deployment-chart.jpg` | The Army's briefing chart of the Turkish Jupiter deployment: Çiğli, one squadron, fifteen missiles | US Army Aviation and Missile Command | Federal — **a chart, not a photograph**, 558×440, captioned as such; the Commons file is titled as if it were a photograph |
| `dobrynin-kennedy-1962-03-30.jpg` | Dobrynin with Kennedy in the Oval Office, 30 March 1962 | Robert Knudsen, White House; JFK Library KN-C20738 | Federal — downscaled from 2524px to 1800 |
| `dobrynin-1962-03-30-crop.jpg` | Detail of the same: the Ambassador | as above | Federal — crop 1034×1525 of the original |
| `u-thant-kennedy-stevenson-1962-01-19.jpg` | Kennedy, U Thant and Stevenson at the Waldorf-Astoria, 19 January 1962 | Cecil Stoughton, White House; JFK Library JFKWHP-1962-01-19-B | Federal — downscaled from 3000px to 1600 |
| `u-thant-1962-01-19-crop.jpg` | Detail of the same: the Secretary-General | as above | Federal — crop 900×1410 |
| `rfk-oval-office-1962-02-28-crop.jpg` | Detail: Attorney General Robert Kennedy in the Oval Office, 28 February 1962, with Rusk, Johnson and the President | Abbie Rowe, White House; JFK Library JFKWHP-1962-02-28-D | Federal — crop 750×1100 of a 3000px original |
| `duck-and-cover-1951-classroom.jpg` | Two children under their desks: a frame of *Duck and Cover*, 1951 | Federal Civil Defense Administration; Internet Archive `gov.ntis.ava11109vnb1`, h.264 copy, frame at 186.8 s | Federal — 640×480, cut with `.design/frame-grab.swift`; replaces `duck-and-cover-1951.jpg` (Bert the Turtle), which is removed |

The Anadyr beat reuses `u2-mrbm-launch-site-1962-10-15.jpg` from Milestone 4.

**Rejected or set aside.** "Robert Kennedy (1962)" on Commons is an Anefo photograph under
CC BY-SA 3.0 NL — not public domain. "U Thant and John F. Kennedy" (PNG) rests on Myanmar's
copyright term. "AG RFK" and "Robert Kennedy" are Getty scans under a non-renewal claim —
not a basis this project accepts. A 1962 New York World-Telegram & Sun photograph of a
Brooklyn school drill (LC-DIG-ds-01489) would have been the stronger children-under-desks
picture but a third rights basis, and the Library's rights page could not be read from here
(bot wall); the film frame under the federal basis was preferred. The Stoughton photograph of
the Kennedy brothers on the West Wing Colonnade (3 October 1962, NARA 194239) was downloaded
and set aside: in it the faces are too small to serve a beat whose point is a face.

## Milestone 21 — the second voice, and a bed under it

**The narration** is a second ElevenLabs take, generated by the user on 8 September 2026 —
the stock voice "Rory – Masculine Educated", delivered as
`ElevenLabs_2026-09-08T14_46_28_Rory - Masculine Educated_pvc_sp74_s64_sb59_se63_b_e2.mp3`
(53.2 s, mono, 128 kbps) and kept byte-for-byte as `.design/narration-source.mp3`, replacing
the first take (the "Shaun – Boston" voice, which the user found robotic; it remains in git
history). The script is the twelve lines of `src/data/overture.js`; line ten was rewritten
for this take. The credits still say the voice is nobody's.

**Finding the lines.** This voice reads at half the first take's pace and pauses inside its
lines, so `speech-segments.swift` found eighteen stretches where the first take gave twelve,
and every pause carries the same room tone (−65 dB; no rendered silence to tell a line break
from a breath). On-device speech recognition was built for it (`.design/transcribe.swift`,
as an app bundle — TCC judges the launching application, not the tool, and would not show a
prompt from this session), but authorisation never arrived, so the lines were placed by
`.design/align-lines.py --by-words` with two corrections read off the waveform: line one is
"The …", a two-second hole, then "war had ended" (a fragment at full speech level, not a
breath); and lines six and seven were spoken in one breath with no dip between them. Beat 10
("with men on both sides…") therefore begins 1.73 s into that breath by share of syllables —
the one beat time that is an estimate. Every other line boundary is a clear gap.

**The pause table** (shorter than the first take's; the voice lingers on its own):

| After | Pause |
|---|---|
| a plain line (1, 3, 8, 9, 10, 11) | 2.0 s |
| a line that hands over to a wordless shot (2, 4, 5, and the six-and-seven breath) | 3.6 s |
| the last line (12) | 4.0 s |

The clean padded voice is `.design/narration-voice.m4a`, 75.05 s — longer than the seventy
planned because three lines carry long holes inside them. Beat times come from the padder's
report on this file, confirmed by the detector at `--gap 2.3`.

**The bed** is not a recording: `.design/make-bed.swift` synthesises it — A1 and E2 with the
A an octave up detuned a quarter-hertz, four soft harmonics each, a slow breathing swell, a
faint A4 shimmer, a low-pass near 600 Hz; an 8 s fade-in and a 6 s fade-out to silence at
the film's end; peak −18 dBFS, RMS −26.9 dBFS. `.design/mix-narration.swift` puts it under
the voice at −10 dB, giving a bed measured at −37 dBFS RMS in the pauses, 22 dB under the
voice's loudest hundred milliseconds (−15 dBFS), and −51 dBFS in the film's last second. `public/overture/narration.m4a` is that mix; the bed WAV is not
committed (12 MB, reproducible from the script and its four arguments: 75.05 8 6).

## Milestone 22 — twelve shots at the voice's own pace

The user heard Milestone 21 and found it robotic and slow, and could not hear the bed. The
first was largely the padding: two to four seconds of silence after every line of a take
that already pauses inside its lines. The second was physics: a 55–110 Hz drone 22 dB under
the voice, below what laptop speakers reproduce.

**The narration now plays as delivered.** Nothing inside the take is cut, stretched or
moved. The one addition is a tail of the take's own room tone — `pad-narration.swift` with a
single span, `0.00:51.85` (the last word's end) and a 4.5 s pause — so the last photograph
can hold and the bed can fade: 56.71 s in all, and the detector finds the take's eighteen
stretches at exactly their original positions in the tailed file. The padded 75 s file of
Milestone 21 is gone (git history has it).

**One image per line — twelve shots.** At the voice's own pace there is no gap for a
wordless shot, so four were cut with the user's leave: the Hiroshima shadow, the Juno rocket,
the ExComm room and the President with the Chiefs. The three overture-only stills
(`hiroshima-shadow-1945-11-20.jpg`, `juno-i-explorer-1958-01-31.jpg`,
`jfk-colonnade-1962-10-29.jpg`) and their archive entries are removed so the credits list
only what plays; the ExComm still stays, Day 1 uses it. Beat 7 ("with men on both sides…")
remains the one estimated cue, 1.73 s into the breath it shares with line six.

**The bed, second version** (`.design/make-bed.swift`): the low fifth kept for real speakers,
and above it the same fifth at A3 and E4 — three voices each detuned a third of a percent so
they chorus, six harmonics falling as 1/n, low-passed near 1.5 kHz, with its own slow swell —
which small speakers can carry. Fade-in 4 s, fade-out 5 s to silence at the film's end; peak
−18 dBFS, RMS −31.4 dBFS. Mixed at +1.4 dB so the bed measures **−29.4 dBFS in the pause after
line two and −30.1 dBFS after line eight, 13.5 dB under the voice's loudest hundred
milliseconds (−15.9 dBFS)**; −27.4 dBFS in the first second (fading in under "The war"),
−38.6 dBFS in the last. The bed WAV is reproducible from the script and its arguments
(56.711995 4 5); the gain is one argument to `mix-narration.swift`.

**A stray syllable, silenced** (10 September 2026). Listening at the title, the user heard
a voice say something like "all" before "The war had ended." The detector had always shown
it — a 0.35 s segment at 0.15 s and a blip at 1.80 s, two seconds before the line proper
begins at 2.65 s — and the third-pass notes had read it as a clipped "The"; the ear says
otherwise. `.design/mute-range.swift` replaces 0–2.52 s of the clean voice with silence
(20 ms fades, every other sample untouched, the length unchanged, so no `at` moves), the
bed was regenerated from the same arguments and mixed at the same +1.4 dB, and
`public/overture/narration.m4a` and `.design/narration-voice.m4a` were replaced. The first
image now holds for two and a half seconds of bed before the voice enters. The delivered
take (`narration-source.mp3`) is untouched.

## Milestone 24 — a room you can see, and a debrief you can answer

No new sourcing beyond one still. The drawn rooms behind the establishing card were lifted
two to three times in luminance (a palette change, not an asset). The freighter photograph
(`soviet-ship-departing-1962-11.jpg`, November 1962) and the 29 October newsreel
(`un-crisis-eases-1962-10-29.mp4`) moved from the Day 5 briefing, where they appeared before
the answer had come, to the settled endings. The three principals' photographs the Background
tab already carried (`jfk-portrait-1962-03.jpg`, `khrushchev-un-1960.jpg`,
`castro-washington-1959.jpg`) are now registered in `src/data/archive.js` so the debrief's
timeline and its "What followed" strip can credit them through the same path as every still.

| File | What it is | Source | Basis / note |
|---|---|---|---|
| `test-ban-signing-1963-10-07.jpg` | President Kennedy signing the Limited Nuclear Test Ban Treaty in the Treaty Room, 7 October 1963 | Robert Knudsen, White House; JFK Library KN-C30095 | Federal — 760×694, the Library's web size (it blocks automated download of larger prints); shown at strip size only |

**Rejected.** For the hotline paragraph the only federal photograph of the Washington–Moscow
terminal on Commons ("Hotlineroom.jpg", White House/NSA) is from 2005, and the museum
photograph of the 1963-era teleprinter is a visitor's own under a share-alike licence. The
paragraph runs with the Test Ban signing beside it instead.
