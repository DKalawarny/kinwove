// Writes kinwove's study notes: an introduction for every book and a plain
// words note under every chapter, served as static files the Bible reader
// fetches one at a time:
//
//   public/study/<BOOK>/intro.json   e.g. public/study/LEV/intro.json
//   public/study/<BOOK>/<n>.json     e.g. public/study/LEV/16.json
//
//   node scripts/build-study-notes.mjs               # everything still missing
//   node scripts/build-study-notes.mjs LEV MAT       # just these books
//   node scripts/build-study-notes.mjs --redo LEV.16 # rewrite one chapter
//
// Resumable: a file that already exists is skipped, so a run that dies halfway
// is finished by running it again.
//
// Each chapter note is written from the chapter itself (NIV + ASV) and the two
// classic public-domain commentaries kinwove already uses for Ask's research
// mode (Matthew Henry, Jamieson-Fausset-Brown), rewritten into plain modern
// English. A second, separate pass checks every note against those same
// sources. A note that still fails after one rewrite is NOT written: it goes in
// public/study/_held.json for a person to look at, and the reader shows nothing
// for that chapter rather than something unchecked.
import { config as loadEnv } from 'dotenv';
import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import Anthropic from '@anthropic-ai/sdk';

loadEnv();
const client = new Anthropic();
const MODEL = 'claude-opus-5-5';
const BIBLE_KEY = process.env.VITE_BIBLE_API_KEY;
const NIV = '78a9f6124f344018-01';
const ASV = '06125adad2d5898a-01';
const ROOT = fileURLToPath(new URL('../public/study/', import.meta.url));
const HELD = ROOT + '_held.json';
const DASH = /[–—]/;

// ── Sources ─────────────────────────────────────────────────────────────────
async function retry(fn, tries = 4) {
  for (let i = 0; ; i++) {
    try { return await fn(); } catch (e) {
      if (i >= tries - 1) throw e;
      await new Promise((r) => setTimeout(r, [2000, 5000, 15000][i] ?? 15000));
    }
  }
}

async function books() {
  const r = await retry(() => fetch(`https://rest.api.bible/v1/bibles/${ASV}/books?include-chapters=true`, { headers: { 'api-key': BIBLE_KEY } }));
  const j = await r.json();
  return j.data.map((b) => ({ code: b.id, name: b.name, chapters: b.chapters.filter((c) => c.number !== 'intro').map((c) => Number(c.number)) }));
}

async function chapterText(bible, id) {
  const p = new URLSearchParams({ 'content-type': 'text', 'include-notes': 'false', 'include-titles': 'false', 'include-chapter-numbers': 'false', 'include-verse-numbers': 'true' });
  return retry(async () => {
    const r = await fetch(`https://rest.api.bible/v1/bibles/${bible}/chapters/${id}?${p}`, { headers: { 'api-key': BIBLE_KEY } });
    if (!r.ok) throw new Error(`bible ${r.status}`);
    return (await r.json()).data.content;
  });
}

async function commentary(code, ch, cap = 9000) {
  const out = [];
  for (const [src, label] of [['matthew-henry', 'Matthew Henry'], ['jamieson-fausset-brown', 'Jamieson, Fausset and Brown']]) {
    try {
      const r = await retry(() => fetch(`https://bible.helloao.org/api/c/${src}/${code}/${ch}.json`));
      if (!r.ok) continue;
      const content = (await r.json())?.chapter?.content ?? [];
      let t = content.filter((c) => c?.type === 'verse' && Array.isArray(c.content))
        .map((c) => `v${c.number}: ${c.content.filter((x) => typeof x === 'string').join(' ')}`).join('\n');
      if (t.length > cap) t = t.slice(0, cap) + ' [truncated]';
      if (t) out.push(`${label}:\n${t}`);
    } catch {}
  }
  return out.join('\n\n');
}

async function ask(system, user, effort = 'high') {
  return retry(async () => {
    const r = await client.messages.create({ model: MODEL, max_tokens: 8000, output_config: { effort }, system, messages: [{ role: 'user', content: user }] });
    if (r.stop_reason === 'refusal') throw new Error('refused');
    const t = r.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
    return JSON.parse(t.slice(t.indexOf('{'), t.lastIndexOf('}') + 1));
  }, 3);
}

// ── Prompts ─────────────────────────────────────────────────────────────────
const VOICE = `Plain everyday words and short sentences, for someone with no church background. No jargon; if a term is unavoidable, explain it in the same sentence. Warm and adult. Never preachy, never tell the reader what to feel or believe.

Non-negotiable:
- Only say what the text and well established background support. Never invent details, quotes, numbers or names.
- Mark interpretation as interpretation. Where scholars are unsure, say so instead of guessing.
- Neutral wording, not one translation's wording ("the LORD", never "Jehovah").
- Be honest about hard or violent passages. Do not soften them or invent a moral.
- Do not repeat old commentators' prejudices (for example anything disparaging Jewish people). Where they speculate, prefer what mainstream modern scholarship supports.
- No dashes as punctuation.`;

const CHAPTER_SYSTEM = `You write the study note shown under each Bible chapter in kinwove, a grace-first Bible app. Think of a study Bible's notes, rewritten so anyone understands every word. The reader's question is: "what does this even mean?"

You are given the chapter in two translations and excerpts from two classic public-domain commentaries. Use the commentaries as your main source for what each part means, brought into plain modern English. Do not copy their wording and do not name them.

How to write it:
- Go straight to meaning. Never define general things (what a parable, psalm, vision, prophet or genealogy is). Explain THIS passage.
- Work through the chapter part by part, like a study Bible's section headings. Each part: a short label with its verse range, then what it means. For a parable, what it points to. For a ritual, custom, law or symbol, what it was and why it mattered then. For poetry or visions, what the images stand for, as best we know.
- Each part's note is at most TWO short sentences.
- Where Christians later read a passage in light of Jesus, you may say so once, marked as how Christians read it.

${VOICE}

Also write one reflection question ("think"): open, honest, and answerable by a skeptic as much as a believer. It never assumes belief, never tells the reader what they should do, and is not a quiz about the text.

Return ONLY JSON:
{"title": "<3 to 7 word plain title>",
 "overview": "<ONE sentence: what this chapter is about>",
 "parts": [{"label": "<2 to 6 words (vv. a-b)>", "note": "<at most two short sentences>"}],
 "keyVerse": <number of the one verse that best captures the chapter>,
 "disagreement": "<one sentence on where Christians genuinely differ about the MAIN meaning of this chapter, or null; never a side issue>",
 "think": "<one reflection question>"}
Use 2 to 6 parts; fewer for short chapters (a single psalm may need only 2).`;

const CHECK_SYSTEM = `You check a study note written for a Bible chapter, against the chapter text (two translations) and two classic commentaries. Flag only real problems:
- a claim, detail, name, number or quote not supported by the chapter, the commentaries, or well established mainstream background;
- interpretation stated as fact, or a disputed point stated as settled;
- preaching, telling the reader what to feel, believe or do; a reflection question that assumes belief;
- defining a general term the reader does not need (what a parable or psalm is);
- wording borrowed from one translation (like "Jehovah"), or a quote that differs between the two translations;
- a part note longer than two sentences, or any dash used as punctuation;
- a "disagreement" that is a side issue rather than about the chapter's main meaning;
- anything disparaging toward Jewish people or any group.
Awkward but accurate is NOT a problem. Mark a problem "serious" only if a reader would be misled: an invented or wrong fact, interpretation stated as settled fact, preaching, or anything disparaging. Wording preferences, length and small imprecision are not serious.
Return ONLY {"problems": [{"issue": "<short description>", "serious": true|false}]} (empty array if none).`;

const INTRO_SYSTEM = `You write the short introduction shown before a book of the Bible in kinwove, a grace-first Bible app, like the book introductions in a study Bible but for someone with no church background. The aim is that a first-time reader knows what kind of book this is, why it is in the Bible, and how to read it without getting lost.

${VOICE}
- Authorship and dates are often debated. Give the traditional view and, where scholars widely disagree, say so plainly in the same field.

Return ONLY JSON:
{"oneLine": "<one sentence: what this book is>",
 "writtenBy": "<who wrote it, honestly including any debate>",
 "when": "<roughly when, and the setting>",
 "writtenTo": "<who it was first for>",
 "why": "<two or three sentences: why it was written and why it matters in the Bible's bigger story>",
 "themes": ["<3 or 4 big themes, each a short phrase>"],
 "outline": [{"label": "<short plain heading>", "chapters": "<e.g. 1-11>"}],
 "readingTip": "<one or two sentences on how to read it well, especially anything that confuses new readers>"}
Use 3 to 7 outline sections covering every chapter.`;

// ── Checks a computer can do without asking anyone ─────────────────────────
function mechanical(note, text) {
  const p = [];
  if (!note?.title || !note?.overview || !Array.isArray(note?.parts) || !note.parts.length) p.push('missing fields');
  if (!new RegExp(`\\[${note?.keyVerse}\\]`).test(text)) p.push(`key verse ${note?.keyVerse} is not in this chapter`);
  const all = JSON.stringify(note ?? {});
  if (DASH.test(all)) p.push('uses a dash as punctuation');
  if (/jehovah/i.test(all)) p.push('uses "Jehovah"');
  for (const part of note?.parts ?? []) {
    if ((part.note.match(/[.!?](?=\s+[A-Z"'(]|\s*$)/g) ?? []).length > 2) p.push(`part "${part.label}" is longer than two sentences`);
  }
  return p;
}

// ── One chapter ─────────────────────────────────────────────────────────────
async function doChapter(book, n) {
  const id = `${book.code}.${n}`;
  const [asv, niv, notes] = await Promise.all([chapterText(ASV, id), chapterText(NIV, id), commentary(book.code, n)]);
  const sources = `${book.name} ${n}\n\nNew International Version:\n${niv}\n\nAmerican Standard Version:\n${asv}\n\nClassic commentary excerpts:\n${notes || '(none available for this chapter)'}`;
  let note = await ask(CHAPTER_SYSTEM, sources);
  for (let round = 0; round < 2; round++) {
    const mech = mechanical(note, asv);
    const { problems = [] } = await ask(CHECK_SYSTEM, `${sources}\n\nThe study note to check:\n${JSON.stringify(note, null, 2)}`, 'medium');
    const all = [...mech, ...problems.map((p) => p.issue ?? String(p))];
    // Mechanical problems (missing key verse, dashes, "Jehovah", length) and
    // serious ones block; minor wording issues only earn a rewrite.
    const blocking = [...mech, ...problems.filter((p) => p.serious).map((p) => p.issue)];
    if (!all.length || (round === 1 && !blocking.length)) return { note, held: null };
    if (round === 1) return { note: null, held: { id, problems: blocking, note } };
    note = await ask(CHAPTER_SYSTEM, `${sources}\n\nAn earlier draft had these problems. Write it again without them:\n${all.map((x) => `- ${x}`).join('\n')}\n\nEarlier draft:\n${JSON.stringify(note, null, 2)}`);
  }
}

async function doIntro(book) {
  const intro = await ask(INTRO_SYSTEM, `Write the introduction for the book of ${book.name} (${book.chapters.length} chapters).`);
  const { problems = [] } = await ask(
    `You check a short introduction to a book of the Bible for a general audience. Flag only: claims that are false or not mainstream; disputed authorship or dates stated as settled; preaching; dashes used as punctuation; an outline that does not cover chapters 1 to ${book.chapters.length}; anything disparaging toward any group. Return ONLY {"problems": [...]}`,
    `Book: ${book.name}\n\n${JSON.stringify(intro, null, 2)}`, 'medium');
  if (DASH.test(JSON.stringify(intro))) problems.push('uses a dash as punctuation');
  if (!problems.length) return { intro, held: null };
  const again = await ask(INTRO_SYSTEM, `Write the introduction for the book of ${book.name} (${book.chapters.length} chapters). An earlier draft had these problems; avoid them:\n${problems.map((x) => `- ${x}`).join('\n')}`);
  if (DASH.test(JSON.stringify(again))) return { intro: null, held: { id: `${book.code}.intro`, problems, note: again } };
  return { intro: again, held: null };
}

// ── Run ─────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const redo = new Set(args.filter((a, i) => args[i - 1] === '--redo'));
const onlyBooks = new Set(args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--redo'));
const held = existsSync(HELD) ? JSON.parse(readFileSync(HELD, 'utf8')) : {};
const all = (await books()).filter((b) => !onlyBooks.size || onlyBooks.has(b.code) || [...redo].some((r) => r.startsWith(b.code + '.')));

const jobs = [];
for (const b of all) {
  mkdirSync(ROOT + b.code, { recursive: true });
  const introFile = `${ROOT}${b.code}/intro.json`;
  if (!existsSync(introFile) || redo.has(`${b.code}.intro`)) jobs.push({ kind: 'intro', book: b, file: introFile, id: `${b.code}.intro` });
  for (const n of b.chapters) {
    const file = `${ROOT}${b.code}/${n}.json`;
    const id = `${b.code}.${n}`;
    if (redo.size && !redo.has(id)) continue;
    if (!existsSync(file) || redo.has(id)) jobs.push({ kind: 'chapter', book: b, n, file, id });
  }
}
console.log(`${jobs.length} notes to write`);

let next = 0, done = 0, heldCount = 0;
const saveHeld = () => writeFileSync(HELD, JSON.stringify(held, null, 2) + '\n');
async function worker() {
  while (next < jobs.length) {
    const job = jobs[next++];
    try {
      const { note, intro, held: h } = job.kind === 'intro' ? await doIntro(job.book) : await doChapter(job.book, job.n);
      const out = note ?? intro;
      if (out) {
        writeFileSync(job.file, JSON.stringify({ ...out, book: job.book.name, ...(job.n ? { chapter: job.n } : {}) }, null, 2) + '\n');
        delete held[job.id];
      } else {
        held[job.id] = h; heldCount++;
      }
      saveHeld();
      done++;
      if (done % 10 === 0 || h) console.log(`${done}/${jobs.length}${h ? `  HELD ${job.id}: ${h.problems.join('; ')}` : ''}`);
    } catch (e) {
      console.log(`FAILED ${job.id}: ${e.message} (run again to retry)`);
    }
  }
}
await Promise.all(Array.from({ length: 6 }, worker));
console.log(`\nfinished: ${done} written or held, ${heldCount} held for review. Re-run to retry any FAILED.`);
