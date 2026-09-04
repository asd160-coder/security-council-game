/* Is every path through the content actually authored?

   Fast and structural — it reads the day files rather than playing them, and
   answers one question: can a seat reach a step that has nothing written for
   it? Three seats times five days is a lot of variants to keep in step by
   hand, and a missing one is invisible until a student walks into it.

   Checks that every choice-bearing step yields options for every role, that
   every consequence covers every feedback its source can produce, that every
   reckoning has three complete answers, and that every witness card exists
   for every seat.

   Exits non-zero if anything is missing.  npm run check */
const R = new URL('../src', import.meta.url).href;
const { DAYS } = await import(`${R}/data/days/index.js`);
const { COUNCIL, RECKONING, ANSWER_STANCES } = await import(`${R}/data/council.js`);

console.log('step counts per day:');
for (const d of DAYS) console.log(`  day ${d.number}: ${d.steps.length} — ${d.steps.map(s=>s.kind).join(' → ')}`);

// every choice-bearing step must yield options for every role
const ROLES = ['rfk','dobrynin','uthant'];
let problems = 0;
for (const day of DAYS) {
  for (const step of day.steps) {
    for (const r of ROLES) {
      if (step.kind === 'dialogue' && !(step.choicesByRole?.[r]?.length)) { problems++; console.log(`  ✗ ${day.id}/${step.id}/${r} no choices`); }
      if (step.kind === 'exchange') {
        const op = step.openingsByRole?.[r] ?? [];
        if (!op.length) { problems++; console.log(`  ✗ ${day.id}/${step.id}/${r} no openings`); }
        for (const o of op) {
          const follows = step.sharedFollow ?? o.follow;
          if (!follows?.length) { problems++; console.log(`  ✗ ${day.id}/${step.id}/${r}/${o.id} no follows`); }
        }
      }
      if (step.kind === 'council' && !(COUNCIL[r]?.advisers?.length)) { problems++; console.log(`  ✗ council missing ${r}`); }
    }
    // a consequence must cover every feedback its source can produce
    if (step.kind === 'consequence') {
      const src = day.steps.find(s => s.id === step.after);
      const feedbacks = new Set();
      if (src?.sharedFollow) src.sharedFollow.forEach(o => feedbacks.add(o.feedback));
      if (src?.choicesByRole) Object.values(src.choicesByRole).flat().forEach(o => feedbacks.add(o.feedback));
      if (src?.openingsByRole) Object.values(src.openingsByRole).flat().forEach(o => (o.follow??[]).forEach(f => feedbacks.add(f.feedback)));
      for (const f of feedbacks) if (!step.variants?.[f]) { problems++; console.log(`  ✗ ${day.id}/${step.id} has no variant for "${f}"`); }
    }
  }
}
// Milestone 11: every reckoning has three answers with a close; every witness has a card
// and, if it bears a cost, a cost for every role
for (const [id, entry] of Object.entries(RECKONING)) for (const st of ANSWER_STANCES) {
  if (!entry.answers?.[st]?.line || !entry.answers?.[st]?.close) { problems++; console.log(`  ✗ reckoning ${id} missing answer "${st}"`); }
}
for (const day of DAYS) for (const step of day.steps) if (step.kind === 'witness') for (const r of ROLES) {
  const cards = step.cardsByRole?.[r] ?? (step.byRole?.[r] ? [step.byRole[r]] : []);
  if (!cards.length) { problems++; console.log(`  ✗ ${day.id}/${step.id}/${r} no card`); }
  if (step.bearsByRole && !step.bearsByRole[r]) { problems++; console.log(`  ✗ ${day.id}/${step.id}/${r} bears nothing`); }
}
console.log(`reckoning answers: ${Object.keys(RECKONING).length} advisers × ${ANSWER_STANCES.length} stances`);

/* The teacher notes are keyed to the same pattern ids the student's debrief
   uses, so a pattern added without its note would leave a teacher reading
   about a trade the notes do not cover — and nothing would say so. */
const { PATTERNS } = await import(`${R}/data/debrief.js`);
const { READING_A_RUN, DAY_PROMPTS } = await import(`${R}/data/teaching.js`);
for (const id of Object.keys(PATTERNS)) {
  if (!READING_A_RUN[id]) { problems++; console.log(`  ✗ pattern "${id}" has no teacher note in data/teaching.js`); }
}
for (const id of Object.keys(READING_A_RUN)) {
  if (!PATTERNS[id]) { problems++; console.log(`  ✗ teacher note "${id}" matches no pattern the debrief can show`); }
}
for (const day of DAYS) {
  if (!DAY_PROMPTS[day.number]) { problems++; console.log(`  ✗ day ${day.number} has no teacher prompts`); }
}
console.log(`teacher notes: ${Object.keys(READING_A_RUN).length} patterns, ${Object.keys(DAY_PROMPTS).length} days`);

if (problems) {
  console.log(`\n${problems} problem${problems > 1 ? 's' : ''}`);
  process.exit(1);
}
console.log('\nEvery choice-bearing step yields options for every role, and every consequence covers every feedback its source can produce.');
