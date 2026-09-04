/* Does the engine still do what the content assumes?

   Drives the real reducer — not a model of it — through a complete scripted
   run for each seat, and checks the behaviour the day files depend on: that a
   step bearing a cost applies it on entry rather than on choice, that
   `lastDeltas` reports that cost so the consequence panel can show it, that
   the reckoning stores its answer and applies its effects, and that the
   debrief can read all of it back afterwards.

   The drafting steps are stepped past rather than exercised; they have their
   own shape and this walk is about the engine paths the content leans on.

   Exits non-zero on any failed check.  npm run check */
const R = new URL('../src', import.meta.url).href;
const { reducer, initialState } = await import(`${R}/lib/gameState.js`);
const { DAYS } = await import(`${R}/data/days/index.js`);
const { readPath } = await import(`${R}/lib/debrief.js`);
const { reckoningFor } = await import(`${R}/data/council.js`);

let failures = 0;
const check = (cond, msg) => { if (!cond) { failures += 1; console.log(`  ✗ ${msg}`); } };

for (const roleId of ['rfk', 'dobrynin', 'uthant']) {
  let s = reducer(reducer(initialState, { type: 'begin' }), { type: 'selectRole', roleId });
  const log = [];
  let guard = 0;
  while (s.screen === 'play' && guard++ < 200) {
    const day = DAYS.find((d) => d.number === s.day);
    const step = day.steps[s.stepIndex];
    const key = `${day.id}:${step.id}`;
    const before = s.trackers;
    if (step.bearsByRole?.[roleId]) {
      /* Entering this step should already have applied the cost. */
      const prev = log[log.length - 1];
      const expected = step.bearsByRole[roleId];
      const moved = Object.entries(expected).every(([k, v]) => s.trackers[k] - prev.trackers[k] === v);
      check(moved, `${roleId} ${key}: cost ${JSON.stringify(expected)} did not land on entry (before ${JSON.stringify(prev.trackers)} after ${JSON.stringify(s.trackers)})`);
      check(JSON.stringify(s.lastDeltas) === JSON.stringify(expected), `${roleId} ${key}: lastDeltas should show the cost`);
    }
    log.push({ key, trackers: s.trackers });
    switch (step.kind) {
      case 'briefing': case 'privateBrief': case 'witness': case 'consequence':
        s = reducer(s, { type: 'advance' }); break;
      case 'dialogue': {
        const o = step.choicesByRole[roleId][0];
        s = reducer(s, { type: 'chooseLine', stepKey: key, choice: o }); break; }
      case 'exchange': {
        const opening = step.openingsByRole[roleId][0];
        const follow = step.sharedFollow
          ? (() => { const f = step.sharedFollow.find((x) => !x.requires); return { ...f, line: f.lineByRole[roleId], effects: f.effectsByRole[roleId] }; })()
          : opening.follow[0];
        s = reducer(s, { type: 'chooseLine', stepKey: key, choice: follow }); break; }
      case 'council': {
        const { COUNCIL } = await import(`${R}/data/council.js`);
        const a = COUNCIL[roleId].advisers[0];
        s = reducer(s, { type: 'chooseLine', stepKey: key, choice: { id: a.id, feedback: a.feedback, mandate: a.mandate } }); break; }
      case 'reckoning': {
        const mandate = s.choices[`${day.id}:council`]?.mandate;
        const outcome = s.choices[`${day.id}:negotiation`]?.feedback;
        const r = reckoningFor(roleId, mandate, outcome);
        check(r?.answers?.length === 3, `${roleId} reckoning: expected 3 answers, got ${r?.answers?.length}`);
        const answer = r.answers[0];
        const t0 = s.trackers;
        s = reducer(s, { type: 'chooseLine', stepKey: key, choice: answer });
        check(s.choices[key]?.id === 'own' && s.choices[key]?.feedback === 'own', `${roleId} reckoning: answer not stored`);
        check(s.trackers.legitimacy - t0.legitimacy === 1 && s.trackers.councilTrust - t0.councilTrust === -1, `${roleId} reckoning: 'own' effects not applied`);
        break; }
      /* The drafting steps are not under test here; stepping past them keeps
         the walk on the engine paths that changed. */
      case 'drafting': case 'draftingCompose': case 'draftingRevise': case 'draftingAssemble':
        s = reducer(s, { type: 'advance' }); break;
      case 'writing': s = reducer(s, { type: 'setClosing', text: 'Test closing. Two sentences.' }); break;
      case 'summary': s = reducer(s, { type: 'endDay' }); break;
      default: check(false, `unhandled step kind ${step.kind}`); s = reducer(s, { type: 'advance' });
    }
  }
  check(s.screen === 'ending', `${roleId}: run did not reach the ending (screen=${s.screen}, guard=${guard})`);
  const path = readPath(s, roleId);
  const d3 = path.find((p) => p.day === 3), d4 = path.find((p) => p.day === 4);
  check(d3?.bore?.title && d3?.bore?.effects, `${roleId}: debrief Day 3 has no bore`);
  check(d4?.bore?.title && d4?.bore?.effects, `${roleId}: debrief Day 4 has no bore`);
  check(d4?.answer?.line && d4?.answer?.close, `${roleId}: debrief Day 4 has no answer`);
  console.log(`${roleId}: ${guard} steps · final ${JSON.stringify(s.trackers)} · day3 bore "${d3?.bore?.title?.slice(0, 40)}…" · answer "${d4?.answer?.line?.slice(0, 40)}…"`);
}
if (failures) {
  console.log(`\n${failures} FAILURE${failures > 1 ? 'S' : ''}`);
  process.exit(1);
}
console.log('\nengine: every check passed for all three seats');
