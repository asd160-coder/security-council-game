#!/usr/bin/env python3
"""Where each line of the script begins and ends in a recorded take.

  align-lines.py <transcript.txt> <script.txt>
      transcript: one "start duration word" per line, from transcribe
      script:     the lines as recorded, one per line
  align-lines.py --by-words <segments.txt> <script.txt>
      fallback when recognition is refused: segments as "start end" per line
      (from speech-segments.swift), grouped into one span per script line so
      that each group's spoken length best matches the line's share of words.
      Weaker — it must be confirmed by ear.

Prints one line per script line — start, end, matched/total words, the text —
and, last, the spans in pad-narration.swift's "start:end,…" form. A line under
80% matched is flagged: listen to it.
"""
import sys, re, difflib

def norm(w):
    return re.sub(r"[^a-z0-9']", "", w.lower().replace("’", "'"))

def load_script(path):
    lines = [l.strip() for l in open(path, encoding="utf-8") if l.strip()]
    return [[norm(w) for w in re.findall(r"[\w'’-]+", l) if norm(w)] for l in lines], lines

def by_transcript(transcript_path, script_path):
    words = []
    for l in open(transcript_path, encoding="utf-8"):
        parts = l.split()
        if len(parts) >= 3:
            words.append((float(parts[0]), float(parts[1]), norm(" ".join(parts[2:]))))
    lines, text = load_script(script_path)
    swords = [w for line in lines for w in line]
    owner = [i for i, line in enumerate(lines) for _ in line]
    twords = [w for (_, _, w) in words]
    sm = difflib.SequenceMatcher(a=swords, b=twords, autojunk=False)
    exact, positional = {}, {}
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == "equal":
            for k in range(i2 - i1): exact[i1 + k] = j1 + k
        elif tag == "replace" and (i2 - i1) == (j2 - j1):
            for k in range(i2 - i1): positional[i1 + k] = j1 + k
    spans = []
    for li, line in enumerate(lines):
        idx = [i for i in range(len(owner)) if owner[i] == li]
        hits = [exact[i] for i in idx if i in exact] + [positional[i] for i in idx if i in positional]
        n_exact = sum(1 for i in idx if i in exact)
        if not hits:
            spans.append((None, None, 0, len(line), text[li])); continue
        start = words[min(hits)][0]
        end = words[max(hits)][0] + words[max(hits)][1]
        spans.append((start, end, n_exact, len(line), text[li]))
    return spans

def by_words(segments_path, script_path):
    segs = []
    for l in open(segments_path, encoding="utf-8"):
        parts = l.replace(":", " ").split()
        if len(parts) >= 2:
            segs.append((float(parts[0]), float(parts[1])))
    lines, text = load_script(script_path)
    counts = [len(l) for l in lines]
    speech = sum(e - s for s, e in segs)
    expected = [speech * c / sum(counts) for c in counts]
    n, k = len(segs), len(lines)
    INF = float("inf")
    cost = [[INF] * (n + 1) for _ in range(k + 1)]
    back = [[-1] * (n + 1) for _ in range(k + 1)]
    cost[0][0] = 0.0
    for li in range(1, k + 1):
        for j in range(li, n + 1):
            for i in range(li - 1, j):
                if cost[li - 1][i] == INF: continue
                dur = sum(e - s for s, e in segs[i:j])
                c = cost[li - 1][i] + abs(dur - expected[li - 1])
                if c < cost[li][j]: cost[li][j], back[li][j] = c, i
    spans, j = [], n
    for li in range(k, 0, -1):
        i = back[li][j]
        spans.append((segs[i][0], segs[j - 1][1], counts[li - 1], counts[li - 1], text[li - 1]))
        j = i
    return list(reversed(spans))

if __name__ == "__main__":
    a = sys.argv[1:]
    if len(a) == 3 and a[0] == "--by-words":
        spans = by_words(a[1], a[2]); mode = "by word count — confirm by ear"
    elif len(a) == 2:
        spans = by_transcript(a[0], a[1]); mode = "from the transcript"
    else:
        print(__doc__); sys.exit(2)
    flagged = 0
    for i, (s, e, m, n, t) in enumerate(spans, 1):
        flag = ""
        if s is None or m < 0.8 * n:
            flag = "   <-- listen"; flagged += 1
        ss = "  --  " if s is None else f"{s:6.2f}"
        ee = "  --  " if e is None else f"{e:6.2f}"
        print(f"{i:2d}  {ss} – {ee}  {m:2d}/{n:<2d}  {t}{flag}")
    ok = [sp for sp in spans if sp[0] is not None]
    print(f"\n{len(ok)} of {len(spans)} lines placed {mode}; {flagged} flagged")
    if len(ok) == len(spans):
        print(",".join(f"{s:.2f}:{e:.2f}" for s, e, *_ in spans))
    else:
        sys.exit(1)
