/* Does the game still mean what it is tuned to mean?

   This enumerates every combination of effect-bearing choices for all three
   seats — a little over four million runs — and measures the properties the
   design depends on. It is slow by construction: sampling would hide exactly
   the rare paths that turn out to be dead.

   Five things are asserted, and breaching any of them exits non-zero:

   1. Escalation and civilian risk must not collapse into one axis. If they
      correlate too tightly the player is really moving one needle with two
      labels, and the trade-off the game is about stops existing.
   2. Enough options must move the two in opposite directions, or the axes are
      independent on paper and never in play.
   3. Runs must not end with nothing said about them. A run that finishes with
      no modifier and no pattern gives the student a resolution and no reading
      of how they got there.
   4. Every authored variant must be reachable by somebody. Text nobody can
      see is text that was written for nothing.
   5. Every resolution must have an ending and a debrief reading, so a run
      cannot resolve to something with nothing written for it.

   Per-seat gaps are reported but do not fail: U Thant cannot reach a high
   escalation band on any day, and that is the design working rather than a
   hole in it. Run this after any change to effects, thresholds, or day
   content, and read it beside walk.mjs and engine.mjs.

       npm run audit          this file
       npm run check          walk + engine, the fast structural checks */
const R = new URL('../src', import.meta.url).href;
const { DAYS } = await import(`${R}/data/days/index.js`);
const { applyEffects, initialTrackers, band } = await import(`${R}/lib/trackers.js`);
const { TRACKER_KEYS } = await import(`${R}/data/trackers.js`);
const { resolveOutcome } = await import(`${R}/lib/outcome.js`);
const { readPatterns } = await import(`${R}/lib/debrief.js`);
const { ANSWER_EFFECTS } = await import(`${R}/data/council.js`);
const dayOf = (pool) => Number(pool.tag.match(/^day(\d)/)[1]);

const ROLES = ['rfk', 'dobrynin', 'uthant'];

/* ---- every effect vector authored anywhere, for the correlation ---- */
function allVectors() {
  const out = [];
  const walk = (node) => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) return node.forEach(walk);
    if (node.effects && typeof node.effects === 'object') out.push(node.effects);
    if (node.effectsByRole) Object.values(node.effectsByRole).forEach((e) => out.push(e));
    if (node.bearsByRole) Object.values(node.bearsByRole).forEach((e) => out.push(e));
    Object.values(node).forEach(walk);
  };
  DAYS.forEach(walk);
  return out;
}
function corr(vectors, a, b) {
  const xs = vectors.map((v) => v[a] ?? 0), ys = vectors.map((v) => v[b] ?? 0);
  const n = xs.length, mx = xs.reduce((s, v) => s + v, 0) / n, my = ys.reduce((s, v) => s + v, 0) / n;
  let num = 0, dx = 0, dy = 0;
  for (let i = 0; i < n; i += 1) { const a2 = xs[i]-mx, b2 = ys[i]-my; num += a2*b2; dx += a2*a2; dy += b2*b2; }
  return num / Math.sqrt(dx * dy);
}
function opposed(vectors, a, b) {
  return vectors.filter((v) => (v[a] ?? 0) * (v[b] ?? 0) < 0).length;
}

/* ---- the effect-bearing decision pools, per role, in day order ---- */
function pools(roleId) {
  const out = [];
  for (const day of DAYS) {
    for (const step of day.steps) {
      /* Milestone 11: a step can bear a cost when reached — a pool of one. */
      if (step.bearsByRole?.[roleId]) out.push({ tag: `${day.id}:${step.id}:bears`, opts: [{ e: step.bearsByRole[roleId] }] });
      /* ...and the reckoning's three answers are a decision pool of their own. */
      if (step.kind === 'reckoning') { out.push({ tag: `${day.id}:${step.id}`, opts: Object.entries(ANSWER_EFFECTS).map(([id, e]) => ({ e, answer: id })) }); continue; }
      if (step.kind === 'dialogue') {
        const p = (step.choicesByRole?.[roleId] ?? []).filter((o) => o.effects);
        if (p.length) out.push({ tag: `${day.id}:${step.id}`, opts: p.map((o) => ({ e: o.effects, posture: o.posture, feedback: o.feedback })) });
      }
      if (step.kind === 'exchange') {
        if (step.sharedFollow) {
          out.push({ tag: `${day.id}:${step.id}`, opts: step.sharedFollow.map((o) => ({ e: o.effectsByRole[roleId], posture: o.posture, feedback: o.feedback, strain: o.strain })) });
        } else {
          const follows = (step.openingsByRole?.[roleId] ?? []).flatMap((o) => o.follow ?? []);
          out.push({ tag: `${day.id}:${step.id}`, opts: follows.map((o) => ({ e: o.effects, feedback: o.feedback })) });
        }
      }
      if (step.kind === 'council') continue; // no effects by design
      const slotted = step.slots ?? (step.optionsByRole ? [step] : null);
      if (slotted) for (const slot of slotted) {
        const p = (slot.optionsByRole?.[roleId] ?? []).filter((o) => o.effects);
        if (p.length) out.push({ tag: `${day.id}:${step.id}:${slot.id ?? 'x'}`, opts: p.map((o) => ({ e: o.effects })) });
      }
      if (step.kind === 'draftingRevise') {
        const p = (step.optionsByRole?.[roleId] ?? []).filter((o) => o.effects);
        if (p.length) out.push({ tag: `${day.id}:${step.id}`, opts: p.map((o) => ({ e: o.effects })) });
      }
    }
  }
  return out;
}

/* Breaches collect rather than throwing, so one run reports everything that
   is wrong instead of stopping at the first thing. */
const failures = [];
const require = (ok, msg) => { if (!ok) failures.push(msg); return ok ? 'ok' : 'FAIL'; };

const vectors = [...allVectors(), ...Object.values(ANSWER_EFFECTS)];
const rRisk = corr(vectors, 'escalation', 'civilianRisk');
const opp = opposed(vectors, 'escalation', 'civilianRisk');
console.log('=== civilian risk versus escalation, across all authored effect vectors ===');
console.log(`  vectors                    : ${vectors.length}`);
console.log(`  r(escalation, civilianRisk): ${rRisk.toFixed(3)}   (target < 0.6)   ${require(rRisk < 0.6, `r(escalation, civilianRisk) = ${rRisk.toFixed(3)}, must stay under 0.6 or the two needles are one axis with two labels`)}`);
console.log(`  options moving them oppositely: ${opp}   (target >= 12)   ${require(opp >= 12, `only ${opp} options move escalation and civilian risk oppositely, want at least 12`)}`);
console.log(`  r(escalation, leverage)    : ${corr(vectors,'escalation','leverage').toFixed(3)}`);

console.log('\n=== payoff coverage: runs that finish with nothing said about them ===');
let grand = { runs: 0, silent: 0 };
for (const roleId of ROLES) {
  const ps = pools(roleId);
  const total = ps.reduce((n, p) => n * p.opts.length, 1);
  let runs = 0, silent = 0, noMod = 0, noPat = 0;
  const res = {};
  const idx = new Array(ps.length).fill(0);
  while (true) {
    let t = initialTrackers(); let posture = null; let feedback = null;
    for (let i = 0; i < ps.length; i += 1) {
      const o = ps[i].opts[idx[i]];
      t = applyEffects(t, o.e);
      if (o.posture) posture = o.posture;
      if (o.feedback) feedback = o.feedback;
    }
    const choices = { 'day5:final': { posture, feedback } };
    const { resolution, modifiers } = resolveOutcome({ trackers: t, choices, roleId });
    const patterns = readPatterns(t);
    runs += 1;
    res[resolution] = (res[resolution] ?? 0) + 1;
    if (!modifiers.length) noMod += 1;
    if (!patterns.length) noPat += 1;
    if (!modifiers.length && !patterns.length) silent += 1;
    let k = ps.length - 1;
    while (k >= 0 && ++idx[k] >= ps[k].opts.length) { idx[k] = 0; k -= 1; }
    if (k < 0) break;
  }
  grand.runs += runs; grand.silent += silent;
  const pc = (n) => `${((n / runs) * 100).toFixed(1)}%`;
  console.log(`  ${roleId.padEnd(9)} ${runs.toLocaleString().padStart(9)} runs · no modifier ${pc(noMod).padStart(6)} · no pattern ${pc(noPat).padStart(6)} · NEITHER ${pc(silent).padStart(6)}`);
  console.log(`            resolutions: ${Object.entries(res).map(([k2,v])=>`${k2} ${((v/runs)*100).toFixed(0)}%`).join(', ')}`);
}
const silentPc = (grand.silent / grand.runs) * 100;
console.log(`  ALL       ${grand.runs.toLocaleString()} runs · finish with no interpretive text at all: ${silentPc.toFixed(1)}%   (target < 15%)   ${require(silentPc < 15, `${silentPc.toFixed(1)}% of runs end with neither a modifier nor a pattern — the student gets a resolution and no reading of how they reached it`)}`);

console.log('\n=== where final tracker values actually land (percentiles over all runs) ===');
for (const roleId of ROLES) {
  const ps = pools(roleId);
  const vals = Object.fromEntries(TRACKER_KEYS.map((k) => [k, []]));
  const idx = new Array(ps.length).fill(0);
  while (true) {
    let t = initialTrackers();
    for (let i = 0; i < ps.length; i += 1) t = applyEffects(t, ps[i].opts[idx[i]].e);
    for (const k of TRACKER_KEYS) vals[k].push(t[k]);
    let k2 = ps.length - 1;
    while (k2 >= 0 && ++idx[k2] >= ps[k2].opts.length) { idx[k2] = 0; k2 -= 1; }
    if (k2 < 0) break;
  }
  const q = (a, p) => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(p * (s.length - 1))]; };
  console.log(`  ${roleId}`);
  for (const k of TRACKER_KEYS) {
    const a = vals[k];
    console.log(`    ${k.padEnd(13)} min ${String(q(a,0)).padStart(4)}  p10 ${String(q(a,0.1)).padStart(4)}  p50 ${String(q(a,0.5)).padStart(4)}  p90 ${String(q(a,0.9)).padStart(4)}  max ${String(q(a,1)).padStart(4)}`);
  }
}

console.log('\n=== is every authored variant reachable by somebody? ===');
const seenMod = {}, seenPat = {}, seenBand = {};
for (const roleId of ROLES) {
  const ps = pools(roleId);
  const idx = new Array(ps.length).fill(0);
  const mineM = {}, mineP = {}; const bandsAt = {};
  while (true) {
    let t = initialTrackers(); let posture = null; let feedback = null; let seenDay = 0;
    for (let i = 0; i < ps.length; i += 1) {
      const o = ps[i].opts[idx[i]];
      const d = dayOf(ps[i]);
      if (d !== seenDay) { seenDay = d; (bandsAt[d] ??= {})[band(t.escalation, d)] = ((bandsAt[d] ??= {})[band(t.escalation, d)] ?? 0) + 1; }
      t = applyEffects(t, o.e);
      if (o.posture) posture = o.posture;
      if (o.feedback) feedback = o.feedback;
    }
    const { modifiers } = resolveOutcome({ trackers: t, choices: { 'day5:final': { posture, feedback } }, roleId });
    modifiers.forEach((m) => { mineM[m] = (mineM[m] ?? 0) + 1; seenMod[m] = true; });
    readPatterns(t, 99).forEach((p) => { mineP[p] = (mineP[p] ?? 0) + 1; seenPat[p] = true; });
    let k = ps.length - 1;
    while (k >= 0 && ++idx[k] >= ps[k].opts.length) { idx[k] = 0; k -= 1; }
    if (k < 0) break;
  }
  const tot = ps.reduce((n, p) => n * p.opts.length, 1);
  const fmt = (o) => Object.entries(o).map(([k, v]) => `${k} ${((v / tot) * 100).toFixed(0)}%`).join(', ');
  console.log(`  ${roleId}\n    modifiers: ${fmt(mineM) || 'NONE'}\n    patterns : ${fmt(mineP) || 'NONE'}`);
  for (const day of DAYS) {
    const authored = Object.keys(day.steps.find((s) => s.kind === 'briefing')?.bodyByBand ?? {});
    if (!authored.length) continue;
    const reached = bandsAt[day.number] ?? {};
    const missing = authored.filter((b) => !reached[b]);
    authored.forEach((b) => { if (reached[b]) seenBand[`${day.id}:${b}`] = true; });
    console.log(`    ${day.id} briefing bands: ${authored.map((b) => `${b} ${reached[b] ? 'reached' : 'UNREACHABLE'}`).join(', ')}${missing.length ? '  <-- ' + missing.join(',') : ''}`);
  }
}
/* Read from the source rather than restated. This was a hardcoded list, which
   meant a modifier added to src/data/endings.js would not be covered by the
   very check that exists to find unreachable ones — the audit quietly grading
   its own homework. */
const { MODIFIERS } = await import(`${R}/data/endings.js`);
/* The outcome vocabulary, checked rather than merely declared. RESOLUTIONS in
   src/lib/outcome.js listed the four valid resolutions and nothing read it, so
   a fifth could have been resolved to with no ending written for it. */
const { RESOLUTIONS } = await import(`${R}/lib/outcome.js`);
const { RESOLUTION_ENDINGS } = await import(`${R}/data/endings.js`);
const { ENDING_CONDITIONS } = await import(`${R}/data/debrief.js`);
for (const r of RESOLUTIONS) {
  require(Boolean(RESOLUTION_ENDINGS[r]), `resolution "${r}" has no ending in data/endings.js`);
  require(Boolean(ENDING_CONDITIONS[r]), `resolution "${r}" has no debrief reading in data/debrief.js`);
}
console.log(`  resolutions: ${RESOLUTIONS.length}, each with an ending and a debrief reading`);

const ALL_MODS = Object.keys(MODIFIERS);
const dead = ALL_MODS.filter((m) => !seenMod[m]);
require(!dead.length, `modifiers no seat can reach: ${dead.join(', ')}`);
console.log(dead.length ? `\n  UNREACHABLE MODIFIERS: ${dead}` : '\n  every modifier is reachable by at least one role');

/* A band that no seat reaches is text written for nobody. A band that only
   some seats reach is fine and expected — U Thant cannot run hot — so the
   assertion is deliberately "reachable by someone", not "reachable by all". */
const deadBands = [];
for (const day of DAYS) {
  for (const b of Object.keys(day.steps.find((s) => s.kind === 'briefing')?.bodyByBand ?? {})) {
    if (!seenBand[`${day.id}:${b}`]) deadBands.push(`${day.id}:${b}`);
  }
}
require(!deadBands.length, `briefing bands no seat can reach: ${deadBands.join(', ')}`);
console.log(deadBands.length ? `  UNREACHABLE BANDS: ${deadBands.join(', ')}` : '  every briefing band is reachable by at least one seat');

if (failures.length) {
  console.log(`\n${failures.length} AUDIT FAILURE${failures.length > 1 ? 'S' : ''}`);
  failures.forEach((f) => console.log(`  ✗ ${f}`));
  process.exit(1);
}
console.log('\naudit: every target met');
