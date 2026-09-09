/* Where the words are.

   A reading-load map, not a gate. For one seat it counts the words in every
   field a student is shown, per step kind and per day, and estimates what a
   single path through each day asks them to read — one reply, one set of
   follow-ups, the mean consequence, the compact filed card — so a pass that
   means to cut reading can measure before it cuts, and see afterwards what
   moved. The first such pass (Milestone 25) found the "where things stand"
   ledger had quietly become the largest single item in the game, which no
   amount of playing would have shown.

     node tools/words.mjs                 the rfk seat
     node tools/words.mjs --role uthant   another seat

   Documents are counted twice: the first paragraph (what a folded document
   shows) and the whole text (what "Read the rest" opens). Only the first
   counts toward the path. */
import { DAYS } from '../src/data/days/index.js';
import { getArchive } from '../src/data/archive.js';
import { councilFor } from '../src/data/council.js';
import { getRole } from '../src/data/roles.js';

const ROLE = process.argv.includes('--role') ? process.argv[process.argv.indexOf('--role') + 1] : 'rfk';
if (!getRole(ROLE)) {
  console.error(`unknown role "${ROLE}"`);
  process.exit(2);
}

const wc = (s) => (typeof s === 'string' ? (s.match(/[A-Za-z’'0-9]+/g) ?? []).length : 0);
const arr = (x) => (Array.isArray(x) ? x : x == null ? [] : [x]);
const sum = (a, f = wc) => arr(a).reduce((t, x) => t + f(x), 0);
const mean = (a, f = wc) => (arr(a).length ? Math.round(sum(a, f) / arr(a).length) : 0);

const fields = new Map();
const add = (day, kind, field, n) => {
  const key = `${kind}.${field}`;
  const row = fields.get(key) ?? { total: 0, byDay: {} };
  row.total += n;
  row.byDay[day] = (row.byDay[day] ?? 0) + n;
  fields.set(key, row);
};

const path = {};
const onPath = (day, n) => {
  path[day] = (path[day] ?? 0) + n;
};

for (const day of DAYS) {
  const d = day.number;
  for (const step of day.steps) {
    const k = step.kind;
    if (k === 'briefing') {
      const body = sum(step.bodyByBand?.mid ?? step.body);
      const situation = sum(step.situation?.sides, (s) => wc(s.who) + wc(s.did)) + wc(step.situation?.today);
      const explainers = sum(step.explainers, (e) => wc(e.term) + wc(e.text));
      const callback = step.channelCallback ? mean(Object.values(step.channelCallback)) : 0;
      const docs = arr(step.archiveIds ?? step.archiveId).map(getArchive).filter((item) => item?.kind === 'document');
      const docFirst = sum(docs, (item) => wc(item.text?.[0]));
      const docWhole = sum(docs, (item) => sum(item.text));
      add(d, k, 'body', body);
      add(d, k, 'situation', situation);
      add(d, k, 'explainers', explainers);
      add(d, k, 'callback (one)', callback);
      add(d, k, 'document, first paragraph', docFirst);
      add(d, k, 'document, whole', docWhole);
      add(d, k, 'VISIBLE (folded documents)', body + situation + explainers + callback + docFirst);
      onPath(d, body + situation + explainers + callback + docFirst);
    } else if (k === 'privateBrief') {
      const brief = getRole(ROLE)?.privateBrief ?? {};
      const n = sum(Object.values(brief));
      add(d, k, 'fields', n);
      onPath(d, n);
    } else if (k === 'exchange') {
      const framing = sum(step.framingByRole?.[ROLE]);
      const ops = arr(step.openingsByRole?.[ROLE]);
      const openings = sum(ops, (o) => wc(o.label) + wc(o.line));
      const reply = mean(ops, (o) => wc(o.reply));
      const follows = step.sharedFollow ?? ops[0]?.follow;
      const followSet = sum(follows, (f) => wc(f.label) + wc(f.line ?? f.lineByRole?.[ROLE]) + wc(f.note));
      add(d, k, 'framing', framing);
      add(d, k, 'openings (labels + lines)', openings);
      add(d, k, 'reply (one, mean)', reply);
      add(d, k, 'follow-ups (one set)', followSet);
      add(d, k, 'adviser hint', wc(step.adviser?.hint));
      onPath(d, framing + openings + reply + followSet + wc(step.adviser?.hint));
    } else if (k === 'dialogue') {
      const framing = sum(step.framing);
      const choices = sum(step.choicesByRole?.[ROLE], (c) => wc(c.label) + wc(c.line));
      add(d, k, 'framing', framing);
      add(d, k, 'choices (labels + lines)', choices);
      onPath(d, framing + choices);
    } else if (k === 'council') {
      const cabinet = councilFor(ROLE);
      const setting = wc(cabinet?.setting);
      const weighs = sum(cabinet?.advisers, (a) => wc(a.title) + wc(a.weigh));
      const firstBody = sum(cabinet?.advisers?.[0]?.body);
      const allBodies = sum(cabinet?.advisers, (a) => sum(a.body));
      add(d, k, 'setting', setting);
      add(d, k, 'memo heads + weigh lines', weighs);
      add(d, k, 'memo bodies, first open', firstBody);
      add(d, k, 'memo bodies, all', allBodies);
      onPath(d, setting + weighs + firstBody);
    } else if (k === 'witness') {
      const cards = arr(step.cardsByRole?.[ROLE] ?? step.byRole?.[ROLE]);
      const n = sum(cards, (c) => wc(c.title) + sum(c.body) + wc(c.weigh));
      add(d, k, 'cards', n);
      onPath(d, n);
    } else if (k === 'reckoning') {
      /* The reckoning's text lives in council.js keyed by mandate and outcome;
         one line and three answers, roughly the size of a consequence. */
      add(d, k, '(see council.js RECKONING)', 0);
    } else if (k === 'consequence') {
      const variant = mean(Object.values(step.variants ?? {}), (v) => wc(v.text));
      add(d, k, 'variant (one, mean)', variant);
      add(d, k, 'compact card (est.)', 30);
      onPath(d, variant + 30);
    } else if (k.startsWith('drafting')) {
      const prompt = wc(step.prompt) + wc(step.note);
      const options = sum(step.optionsByRole?.[ROLE] ?? step.options, (o) => wc(o.label) + wc(o.description) + wc(o.operative));
      const slots = sum(step.slots, (s) => sum(s.options ?? s.optionsByRole?.[ROLE], (o) => wc(o.label) + wc(o.description) + wc(o.text) + wc(o.fragment)));
      const compose = sum(step.frames, (o) => wc(o.label) + wc(o.text) + wc(o.description)) + sum(step.operatives, (o) => wc(o.label) + wc(o.text) + wc(o.description));
      add(d, k, 'prompt + note', prompt);
      add(d, k, 'options', options + slots + compose);
      onPath(d, prompt + options + slots + compose);
    } else if (k === 'summary') {
      const body = sum(step.body) + wc(step.foreshadow);
      add(d, k, 'body + foreshadow', body);
      add(d, k, 'latest fragment + compact card (est.)', 55);
      onPath(d, body + 55);
    } else if (k === 'writing') {
      const p = step.promptByRole?.[ROLE];
      const n = wc(p?.brief) + wc(p?.instruction) + sum(step.guidance) + wc(step.needsMore);
      add(d, k, 'brief + instruction + guidance', n);
      onPath(d, n);
    }
  }
}

const days = DAYS.map((day) => day.number);
console.log(`seat: ${ROLE}\n`);
console.log('field'.padEnd(52) + 'total' + days.map((d) => `   d${d}`).join(''));
for (const [key, row] of [...fields.entries()].sort((a, b) => b[1].total - a[1].total)) {
  if (row.total === 0) continue;
  console.log(key.padEnd(52) + String(row.total).padStart(5) + days.map((d) => String(row.byDay[d] ?? 0).padStart(5)).join(''));
}
const total = days.reduce((t, d) => t + (path[d] ?? 0), 0);
console.log(`\non one path through each day (estimate): ${days.map((d) => `d${d} ${path[d] ?? 0}`).join(' · ')} — ${total} words in play, about ${Math.round(total / 200)} minutes of reading at 200 wpm, before the ending and the debrief.`);
