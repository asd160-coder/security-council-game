/* How hard is the authored prose to read?

   A report, not a gate: reading grade cannot measure idiom, which is the
   thing a student actually trips on — but it finds the long, abstract
   sentences where idiom tends to live, and it shows whether a plain-words
   pass moved anything. Run before and after.

   For every single-quoted string in src/data it splits sentences, scores
   each with Flesch–Kincaid grade, counts abstract nouns (-tion, -ment,
   -ness, -ity …) and rhetorical devices (a semicolon, a dash, "read as",
   "not X; it is Y"), and prints a per-file table and the hardest sentences.
   Primary sources in archive.js — the proclamation, the memorandum, the
   letters — are 1962 legal prose and are meant to read that way; they are
   listed separately and never rewritten.

     node tools/readability.mjs            the table and the twenty hardest
     node tools/readability.mjs 60         the sixty hardest
     node tools/readability.mjs --file days/day2.js   one file's sentences, hardest first */
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data');
const files = [
  ...readdirSync(root).filter((f) => f.endsWith('.js')).map((f) => f),
  ...readdirSync(join(root, 'days')).filter((f) => f.endsWith('.js')).map((f) => `days/${f}`),
];

const ABSTRACT = /\b\w+(tion|ment|ness|ity|ance|ence|ship|hood|ism)s?\b/gi;
const DEVICES = [/\bread as\b/, /\bis not\b.*?[;—]\s*it is\b/, /\bnot\b.*?\bbut\b/, /;/, /—/, /\bfloor\b|\bclock\b|\bspent\b|\bspend\b|\bbuys?\b|\bcurrency\b|\bceiling\b/];

const syllables = (word) => {
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!w) return 0;
  let n = (w.match(/[aeiouy]+/g) ?? []).length;
  if (w.endsWith('e') && !w.endsWith('le') && n > 1) n -= 1;
  return Math.max(1, n);
};

const rows = [];
const perFile = new Map();
for (const file of files) {
  const text = readFileSync(join(root, file), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  for (const m of text.matchAll(/'((?:[^'\\]|\\.)*)'/g)) {
    const s = m[1];
    if (s.length < 60 || /^[a-z0-9-]+$/.test(s)) continue;
    for (const raw of s.split(/(?<=[.!?])\s+(?=[A-Z“"])/)) {
      const sent = raw.trim();
      const words = sent.match(/[A-Za-z’']+/g) ?? [];
      if (words.length < 6) continue;
      const syl = words.reduce((a, w) => a + syllables(w), 0);
      const grade = 0.39 * words.length + 11.8 * (syl / words.length) - 15.59;
      const devices = DEVICES.filter((d) => d.test(sent)).length;
      const abstract = (sent.match(ABSTRACT) ?? []).length;
      rows.push({ file, sent, words: words.length, grade, devices, abstract, score: grade + 1.5 * devices + 0.8 * abstract });
      const pf = perFile.get(file) ?? { n: 0, grade: 0, hard: 0 };
      pf.n += 1; pf.grade += grade; pf.hard += grade >= 12 ? 1 : 0;
      perFile.set(file, pf);
    }
  }
}

const args = process.argv.slice(2);
const only = args.includes('--file') ? args[args.indexOf('--file') + 1] : null;
const top = Number(args.find((a) => /^\d+$/.test(a)) ?? 20);

if (only) {
  for (const r of rows.filter((r) => r.file === only).sort((a, b) => b.score - a.score)) {
    console.log(`[${r.grade.toFixed(1).padStart(4)} g, ${r.devices} dev, ${r.abstract} abs, ${String(r.words).padStart(2)} w] ${r.sent}`);
  }
  process.exit(0);
}

console.log('file                     sentences   mean grade   at grade 12+');
for (const [file, pf] of [...perFile.entries()].sort((a, b) => b[1].grade / b[1].n - a[1].grade / a[1].n)) {
  console.log(`${file.padEnd(24)} ${String(pf.n).padStart(6)}       ${(pf.grade / pf.n).toFixed(1).padStart(5)}        ${String(Math.round((100 * pf.hard) / pf.n)).padStart(3)}%`);
}
const authored = rows.filter((r) => r.file !== 'archive.js');
console.log(`\nauthored prose (archive.js excluded): ${authored.length} sentences; at grade 12+: ${authored.filter((r) => r.grade >= 12).length}; at grade 14+: ${authored.filter((r) => r.grade >= 14).length}`);
console.log(`\n--- ${top} hardest authored sentences (grade + devices + abstract nouns)`);
for (const r of authored.sort((a, b) => b.score - a.score).slice(0, top)) {
  console.log(`[${r.grade.toFixed(1).padStart(4)} g, ${r.devices} dev, ${r.abstract} abs, ${String(r.words).padStart(2)} w] ${r.file}: ${r.sent.slice(0, 140)}`);
}
