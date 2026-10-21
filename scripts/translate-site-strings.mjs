// Translates src/i18n/strings.en.js into every language in src/languages.js and
// writes src/i18n/<code>.json. Run after changing any English string:
//
//   node scripts/translate-site-strings.mjs            # every language
//   node scripts/translate-site-strings.mjs es fa      # just these
//   node scripts/translate-site-strings.mjs --missing  # only strings a file lacks
//
// Each language is checked the way the Persian answer page was: translate, then
// a SEPARATE literal back-translation into English, then a comparison of every
// string against the source for added claims, dropped hedges or changed meaning.
// Strings that fail are retranslated once with the problem named, and checked
// again. This proves MEANING, never fluency: nobody on the project reads most
// of these languages, which is why the page carries a notice in each one.
import { config as loadEnv } from 'dotenv';
import { writeFileSync, existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import Anthropic from '@anthropic-ai/sdk';
import { LANGUAGES } from '../src/languages.js';
import { STRINGS_EN } from '../src/i18n/strings.en.js';

loadEnv();
const client = new Anthropic();
const MODEL = 'claude-opus-5-5';
const OUT = (code) => fileURLToPath(new URL(`../src/i18n/${code}.json`, import.meta.url));
const TAGS = /<em>|<\/em>|<br>|<wbr>/g;
const tagsOf = (s) => (s.match(TAGS) ?? []).join('');

async function ask(system, user) {
  const r = await client.messages.create({
    model: MODEL,
    max_tokens: 16000,
    output_config: { effort: 'medium' },
    system,
    messages: [{ role: 'user', content: user }],
  });
  if (r.stop_reason === 'refusal') throw new Error('refused');
  const text = r.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
  const json = text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1);
  return JSON.parse(json);
}

const RULES = `Rules for every value:
- Keep these markup tags exactly, the same number of each, around the matching words: <em>...</em>, <br>, <wbr>.
- "kinwove" is a brand name: always lowercase, never translated. Keep "ChatGPT", emoji, "→", "·" and the number 49. Write "AI" the way that language normally abbreviates it (for example IA in Spanish or French).
- Plain, warm, adult wording. Christian vocabulary the way that language's churches actually say it (Bible, scripture, sermon, pastor, prayer).
- No dashes as punctuation (no em dash or en dash). Use the punctuation and script native speakers expect.
- Do not add or remove claims, promises or hedges. "I don't know" stays an admission of not knowing.`;

async function translate(lang, strings, notes = '') {
  return ask(
    `You translate the interface text of kinwove, a Christian Bible study and community app, from English into ${lang.label} (${lang.native}).\n${RULES}\nReturn ONLY a JSON object with exactly the same keys.`,
    (notes ? `Fix these problems found in an earlier attempt:\n${notes}\n\n` : '') + JSON.stringify(strings, null, 2),
  );
}

async function backTranslate(lang, strings) {
  return ask(
    `Translate each value from ${lang.label} into English as LITERALLY as possible, word for word where you can. Do not smooth it, improve it or guess what was meant: the point is to expose what the ${lang.label} actually says. Keep markup tags. Return ONLY a JSON object with the same keys.`,
    JSON.stringify(strings, null, 2),
  );
}

async function compare(source, back) {
  const pairs = Object.keys(source).map((k) => ({ key: k, source: source[k], backTranslation: back[k] }));
  return ask(
    'You check translations. Each item has the English source and a literal back-translation of the translation. A literal back-translation that reads awkwardly is EXPECTED and is not a problem. Flag an item only when the MEANING differs: an added or dropped claim, a lost hedge or admission, a promise that was not in the source, a changed audience, or wrong religious meaning. Return ONLY {"problems":[{"key":"...","issue":"..."}]} (an empty array if none).',
    JSON.stringify(pairs, null, 2),
  );
}

function structural(source, out) {
  const bad = [];
  for (const k of Object.keys(source)) {
    const v = out[k];
    if (typeof v !== 'string' || !v.trim()) { bad.push({ key: k, issue: 'missing' }); continue; }
    if (tagsOf(v) !== tagsOf(source[k])) bad.push({ key: k, issue: `markup tags must be exactly: ${tagsOf(source[k]) || 'none'}` });
    if (source[k].includes('kinwove') && !v.includes('kinwove')) bad.push({ key: k, issue: 'the brand name "kinwove" must appear, lowercase' });
    if (/[–—]/.test(v)) bad.push({ key: k, issue: 'no dashes as punctuation' });
  }
  return bad;
}

async function doLanguage(lang, source) {
  let out = await translate(lang, source);
  for (let round = 0; round < 2; round++) {
    const bad = structural(source, out);
    const back = await backTranslate(lang, out);
    const { problems = [] } = await compare(source, back);
    const all = [...bad, ...problems.filter((p) => p.key in source)];
    if (!all.length) return { out, flagged: [] };
    if (round === 1) return { out, flagged: all };
    const keys = [...new Set(all.map((p) => p.key))];
    const subset = Object.fromEntries(keys.map((k) => [k, source[k]]));
    const fixed = await translate(lang, subset, all.map((p) => `- ${p.key}: ${p.issue}`).join('\n'));
    out = { ...out, ...Object.fromEntries(keys.filter((k) => typeof fixed[k] === 'string').map((k) => [k, fixed[k]])) };
  }
}

const missingOnly = process.argv.includes('--missing');
const only = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const todo = LANGUAGES.filter((l) => l.code !== 'en' && (only.length ? only.includes(l.code) : true));
const report = [];
let next = 0;
async function worker() {
  while (next < todo.length) {
    const lang = todo[next++];
    try {
      const existing = missingOnly && existsSync(OUT(lang.code)) ? JSON.parse(readFileSync(OUT(lang.code), 'utf8')) : {};
      const source = Object.fromEntries(Object.entries(STRINGS_EN).filter(([k]) => !(k in existing)));
      if (!Object.keys(source).length) { report.push(`${lang.code.padEnd(6)} ok, nothing missing`); console.log(report.at(-1)); continue; }
      const { out: fresh, flagged } = await doLanguage(lang, source);
      const out = { ...existing, ...fresh };
      // A string still failing after the retry falls back to English rather
      // than shipping a translation known to say something else.
      for (const f of flagged) delete out[f.key];
      const clean = Object.fromEntries(Object.keys(STRINGS_EN).filter((k) => typeof out[k] === 'string').map((k) => [k, out[k]]));
      writeFileSync(OUT(lang.code), JSON.stringify(clean, null, 2) + '\n');
      report.push(`${lang.code.padEnd(6)} ok${flagged.length ? `, ${flagged.length} kept in English: ${flagged.map((f) => `${f.key} (${f.issue})`).join('; ')}` : ''}`);
    } catch (e) {
      report.push(`${lang.code.padEnd(6)} FAILED: ${e.message}${existsSync(OUT(lang.code)) ? ' (previous file kept)' : ''}`);
    }
    console.log(report.at(-1));
  }
}
await Promise.all(Array.from({ length: 6 }, worker));
console.log(`\n${report.filter((r) => r.includes(' ok')).length}/${todo.length} languages written`);
