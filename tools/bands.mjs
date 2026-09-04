/* Which briefing openings can a seat actually reach, and why not?

   A diagnostic rather than a check — it never fails, it explains. Run it when
   audit.mjs reports an unreachable briefing band, or before changing the band
   thresholds in src/lib/trackers.js.

   A briefing's opening is chosen by reading escalation as the day opens, so
   what a seat can reach on a given day is decided entirely by the days before
   it. This exhausts every combination of the effect-bearing choices up to each
   day boundary and reports the escalation range that survives, the band each
   range lands in, and — for anything unreachable — how far short it falls.

   It also compares candidate thresholds, because that is the question the
   first half raises. The live cuts are read from `band()` itself rather than
   restated here, so this cannot quietly disagree with the code it diagnoses.

       node tools/bands.mjs */
const R = new URL('../src', import.meta.url).href;
const { DAYS } = await import(`${R}/data/days/index.js`);
const { applyEffects, initialTrackers, band } = await import(`${R}/lib/trackers.js`);
const { ANSWER_EFFECTS } = await import(`${R}/data/council.js`);

const ROLES = ['rfk', 'dobrynin', 'uthant'];

/* The effect-bearing decision pools per seat, tagged with their day so a walk
   can stop at a boundary. Mirrors audit.mjs; kept separate because that one
   also needs posture and feedback and this one does not. */
function pools(roleId) {
  const out = [];
  for (const day of DAYS) {
    for (const step of day.steps) {
      const push = (opts) => opts.length && out.push({ day: day.number, opts });
      if (step.bearsByRole?.[roleId]) push([{ e: step.bearsByRole[roleId] }]);
      if (step.kind === 'reckoning') { push(Object.values(ANSWER_EFFECTS).map((e) => ({ e }))); continue; }
      if (step.kind === 'dialogue') push((step.choicesByRole?.[roleId] ?? []).filter((o) => o.effects).map((o) => ({ e: o.effects })));
      if (step.kind === 'exchange') {
        if (step.sharedFollow) push(step.sharedFollow.map((o) => ({ e: o.effectsByRole[roleId] })));
        else push((step.openingsByRole?.[roleId] ?? []).flatMap((o) => o.follow ?? []).map((o) => ({ e: o.effects })));
      }
      if (step.kind === 'council') continue;
      const slotted = step.slots ?? (step.optionsByRole ? [step] : null);
      if (slotted) for (const slot of slotted) push((slot.optionsByRole?.[roleId] ?? []).filter((o) => o.effects).map((o) => ({ e: o.effects })));
      if (step.kind === 'draftingRevise') push((step.optionsByRole?.[roleId] ?? []).filter((o) => o.effects).map((o) => ({ e: o.effects })));
    }
  }
  return out;
}

/* Every escalation value reachable entering `targetDay`. Computed once per
   seat per day and reused by both halves of the report. */
function escalationEntering(roleId, targetDay) {
  const ps = pools(roleId).filter((p) => p.day < targetDay);
  if (!ps.length) return [0];
  const vals = [];
  const idx = new Array(ps.length).fill(0);
  for (;;) {
    let t = initialTrackers();
    for (let i = 0; i < ps.length; i += 1) t = applyEffects(t, ps[i].opts[idx[i]].e);
    vals.push(t.escalation);
    let k = ps.length - 1;
    while (k >= 0 && ++idx[k] >= ps[k].opts.length) { idx[k] = 0; k -= 1; }
    if (k < 0) break;
  }
  return vals;
}

const BANDED_DAYS = DAYS.filter((d) => Object.keys(d.steps.find((s) => s.kind === 'briefing')?.bodyByBand ?? {}).length)
  .map((d) => d.number);

const reach = {};
for (const roleId of ROLES) {
  reach[roleId] = {};
  for (const n of BANDED_DAYS) reach[roleId][n] = escalationEntering(roleId, n);
}

/* The live cuts, recovered by probing band() rather than by restating the
   table — if someone changes the thresholds, this follows them. */
const liveCut = (dayNumber) => {
  for (let v = 0; v <= 40; v += 1) if (band(v, dayNumber) === 'high') return v;
  return Infinity;
};

console.log('=== what each seat can reach entering each banded day ===\n');
for (const roleId of ROLES) {
  console.log(roleId);
  for (const n of BANDED_DAYS) {
    const vals = reach[roleId][n];
    const s = [...vals].sort((a, b) => a - b);
    const cut = liveCut(n);
    const hit = new Set(vals.map((v) => band(v, n)));
    const authored = Object.keys(DAYS.find((d) => d.number === n).steps.find((x) => x.kind === 'briefing').bodyByBand);
    const missing = authored.filter((b) => !hit.has(b));
    console.log(
      `  day${n}  escalation entering: min ${String(s[0]).padStart(3)}  p50 ${String(s[Math.floor(s.length / 2)]).padStart(3)}  max ${String(s[s.length - 1]).padStart(3)}` +
      `   cut +/-${cut}   reaches: ${[...hit].join(',')}` +
      (missing.length ? `   MISSING: ${missing.join(',')}` : ''),
    );
    for (const b of missing) {
      console.log(b === 'high'
        ? `          high: needs >= ${cut}, best reachable ${s[s.length - 1]} (short by ${cut - s[s.length - 1]})`
        : `          low: needs <= ${-cut}, lowest reachable ${s[0]} (short by ${s[0] + cut})`);
    }
  }
  console.log();
}

/* Candidate thresholds. The live row is generated from band() so it is always
   present and always correct; the rest are proposals to compare against it. */
const CANDIDATES = {
  live: Object.fromEntries(BANDED_DAYS.map((n) => [n, liveCut(n)])),
  'flat 7': Object.fromEntries(BANDED_DAYS.map((n) => [n, 7])),
  'scaled 4/5/7': { 3: 4, 4: 5, 5: 7 },
  'scaled 3/5/8': { 3: 3, 4: 5, 5: 8 },
};

console.log('=== candidate thresholds, and what each would make reachable ===');
for (const [name, cuts] of Object.entries(CANDIDATES)) {
  console.log(`\n  ${name}`);
  let deadForAll = 0;
  for (const n of BANDED_DAYS) {
    const cut = cuts[n];
    const anyHit = { low: false, mid: false, high: false };
    const perRole = ROLES.map((roleId) => {
      const vals = reach[roleId][n];
      const c = { low: 0, mid: 0, high: 0 };
      vals.forEach((v) => { c[v >= cut ? 'high' : v <= -cut ? 'low' : 'mid'] += 1; });
      Object.keys(anyHit).forEach((k) => { if (c[k]) anyHit[k] = true; });
      return `${roleId} ${['low', 'mid', 'high'].map((k) => `${k[0]}:${((c[k] / vals.length) * 100).toFixed(0)}%`).join(' ')}`;
    });
    const dead = Object.entries(anyHit).filter(([, v]) => !v).map(([k]) => k);
    deadForAll += dead.length;
    console.log(`    day${n} (+/-${cut})  ${perRole.join('   |   ')}`);
    if (dead.length) console.log(`           DEAD FOR EVERY SEAT: ${dead.join(', ')}`);
  }
  console.log(`    -> band variants no seat can reach: ${deadForAll}`);
}
