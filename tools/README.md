# tools

Four scripts that check the game means what it is tuned to mean. Plain Node, no
test framework, no dependencies — they import the real `src/` modules and read
the real day files, so there is nothing to keep in sync with the game.

```bash
npm run check     # walk + engine — structural, ~1s, run this often
npm run audit     # the tuning audit — ~4.2M runs, ~30s, run after content changes
npm run bands     # a diagnostic, not a check — run when audit reports a dead band
```

`check` and `audit` **exit non-zero on failure**, so they can gate a commit or a
workflow. `bands` always exits 0; it explains rather than judges.

| Script | Answers |
|---|---|
| `walk.mjs` | Is every path through the content authored? Every choice-bearing step yields options for every seat; every consequence covers every feedback its source can produce; every reckoning has three complete answers; every witness has a card for every seat. |
| `engine.mjs` | Does the reducer still do what the content assumes? Drives the real reducer through a complete run per seat: costs land on entry, `lastDeltas` reports them, the reckoning stores and applies its answer, the debrief reads it all back. |
| `audit.mjs` | Does the tuning still hold? Enumerates every combination of effect-bearing choices for all three seats and asserts four properties. |
| `bands.mjs` | Why can't a seat reach a briefing opening? Reports the escalation range reachable entering each day, and compares candidate thresholds. |
| `webkit-probe.html` | Does a second engine support what the CSS and JS rely on? Open it in Safari — see below. |

## Checking a second engine

The dev preview is Chromium, so it proves nothing about WebKit. `webkit-probe.html`
is a single self-contained page that tests every feature the game depends on which
differs between engines, and prints one verdict line: `inert` (support *and* whether it
actually refuses focus, which are not the same question), `text-wrap: pretty`,
`backdrop-filter`, `aspect-ratio`, `:focus-visible`, `clamp()`, `localStorage`, and the
H.264 and AAC codecs the newsreel and the 22 October address need. It also renders the
epigraph plate, a portrait frame and a blurred scrim so layout can be eyeballed.

Serve it and open it in Safari:

```bash
cp tools/webkit-probe.html public/ && open -a Safari http://localhost:5173/webkit-probe.html
# then: rm public/webkit-probe.html  -- it must not ship with the site
```

**Never leave it in `public/`** — anything there is published with the build.

Last run: Safari on macOS (Darwin 25.2), 2026-09-04 — **all pass**, including the engine
check, so it really was WebKit rather than a Chromium-based browser wearing the name.
`text-wrap: pretty` is reported for information only; it degrades to normal wrapping, so
it cannot fail the verdict.

## What the audit asserts

1. **Escalation and civilian risk must not collapse into one axis** —
   `r < 0.6`. Above that the player is moving one needle with two labels and
   the trade-off the game is about stops existing.
2. **At least 12 options move the two oppositely** — otherwise the axes are
   independent on paper and never in play.
3. **Under 15% of runs end with no interpretive text** — a run finishing with
   neither a modifier nor a pattern hands the student a resolution and no
   reading of how they got there.
4. **Every authored variant is reachable by somebody** — modifiers and briefing
   bands alike. Text nobody can see is text written for nothing.

Point 4 is deliberately *by somebody*, not *by everybody*. U Thant cannot reach
a high escalation band on any day — his ceiling entering Day 4 is −1 — because
he is the seat that cannot let it run hot. That is the design working, and the
audit reports it without failing on it.

## Why these exist

The audit was written to verify a content change and then kept, because it
found things reading could not. Most recently it found that Day 3's `low` and
`high` briefing openings — 148 words describing a line that held quietly and a
line that nearly did not — were unreachable by every seat: the band threshold
was a flat ±7 on escalation, which is where escalation lands after five days,
asked for after only two. Nobody would have noticed by playing, because the
game looked correct; it was simply always telling you the same middle story.

Re-running these is cheap. Reading five days of branching content for holes is
not.
