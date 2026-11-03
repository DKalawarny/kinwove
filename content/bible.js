// Public Bible study pages: /bible, /bible/<book>, /bible/<book>-<chapter>.
// The notes already ship as static JSON for the in-app reader
// (public/study/<CODE>/<n>.json + intro.json). These pages render the same
// files as server HTML so search engines and AI assistants can read them.
// Nothing here is generated at request time and no AI is called.
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { esc, shell } from './answers.js';

const SITE = 'https://www.kinwove.com';
const STUDY_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'study');
// When the notes were written; used as lastmod for every Bible page.
export const BIBLE_UPDATED = '2026-10-29';

// Protestant canon order, matching the codes in public/study.
const ORDER = [
  'GEN', 'EXO', 'LEV', 'NUM', 'DEU', 'JOS', 'JDG', 'RUT', '1SA', '2SA', '1KI', '2KI',
  '1CH', '2CH', 'EZR', 'NEH', 'EST', 'JOB', 'PSA', 'PRO', 'ECC', 'SNG', 'ISA', 'JER',
  'LAM', 'EZK', 'DAN', 'HOS', 'JOL', 'AMO', 'OBA', 'JON', 'MIC', 'NAM', 'HAB', 'ZEP',
  'HAG', 'ZEC', 'MAL',
  'MAT', 'MRK', 'LUK', 'JHN', 'ACT', 'ROM', '1CO', '2CO', 'GAL', 'EPH', 'PHP', 'COL',
  '1TH', '2TH', '1TI', '2TI', 'TIT', 'PHM', 'HEB', 'JAS', '1PE', '2PE', '1JN', '2JN',
  '3JN', 'JUD', 'REV',
];
const NT_START = ORDER.indexOf('MAT');

function readJson(path) {
  try { return JSON.parse(readFileSync(path, 'utf8')); } catch { return null; }
}

// Loaded once at startup: 66 intros + 1,189 chapter notes, a few MB.
export const BOOKS = ORDER.map((code, i) => {
  const intro = readJson(join(STUDY_DIR, code, 'intro.json'));
  if (!intro) return null;
  const chapters = [];
  for (let n = 1; existsSync(join(STUDY_DIR, code, `${n}.json`)); n++) {
    const note = readJson(join(STUDY_DIR, code, `${n}.json`));
    if (note) chapters.push(note);
  }
  const name = intro.book;
  return {
    code, name, intro, chapters,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    testament: i < NT_START ? 'Old Testament' : 'New Testament',
  };
}).filter(Boolean);

const BY_SLUG = Object.fromEntries(BOOKS.map((b) => [b.slug, b]));

// "Psalm 23", not "Psalms 23".
function chapterName(book, n) {
  return `${book.code === 'PSA' ? 'Psalm' : book.name} ${n}`;
}
const bookUrl = (book) => `${SITE}/bible/${book.slug}`;
const chapterUrl = (book, n) => `${SITE}/bible/${book.slug}-${n}`;

// /bible/<path> → { book } or { book, n } or null.
export function resolveBiblePath(path) {
  if (BY_SLUG[path]) return { book: BY_SLUG[path] };
  const m = path.match(/^(.+)-(\d{1,3})$/);
  const book = m && BY_SLUG[m[1]];
  const n = m && Number(m[2]);
  if (!book || n < 1 || n > book.chapters.length) return null;
  return { book, n };
}

export function bibleSitemapEntries() {
  const entries = [`${SITE}/bible`];
  for (const b of BOOKS) {
    entries.push(bookUrl(b));
    b.chapters.forEach((_, i) => entries.push(chapterUrl(b, i + 1)));
  }
  return entries;
}

const crumbs = (items) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })),
});

const PASTOR_LINE = 'Written with care from classic study sources. Not yet reviewed by a pastor.';

function askBox(placeholder) {
  return `
    <div class="askbox">
      <div class="cat">Still wondering something?</div>
      <form action="${SITE}/" method="get">
        <input type="text" name="q" required maxlength="500" autocomplete="off"
               placeholder="${esc(placeholder)}" aria-label="Ask your own question">
        <button type="submit">Ask</button>
      </form>
      <div class="note">Three questions free, no account needed.</div>
    </div>`;
}

function foot() {
  return `
    <div class="updated">Last updated ${esc(BIBLE_UPDATED)}</div>
    <div class="foot">
      <p style="font-style:italic;line-height:1.7;margin:0 0 10px">${esc(PASTOR_LINE)} Where faithful Christians genuinely disagree, the note says so.</p>
      <a href="${SITE}/bible">All books of the Bible</a> · <a href="${SITE}/answers">Hard faith questions</a> · <a href="${SITE}">kinwove</a>
    </div>`;
}

export function renderChapterPage(book, n) {
  const c = book.chapters[n - 1];
  const name = chapterName(book, n);
  const canonical = chapterUrl(book, n);
  const prev = n > 1 ? [chapterUrl(book, n - 1), chapterName(book, n - 1)] : null;
  const next = n < book.chapters.length ? [chapterUrl(book, n + 1), chapterName(book, n + 1)] : null;
  const faqs = [
    { q: `What is ${name} about?`, a: c.overview },
    ...(c.disagreement ? [{ q: `Where do Christians disagree about ${name}?`, a: c.disagreement }] : []),
  ];
  const jsonLd = [
    {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: `${name} explained: ${c.title}`, description: c.overview,
      datePublished: BIBLE_UPDATED, dateModified: BIBLE_UPDATED,
      author: { '@type': 'Organization', name: 'kinwove' },
      publisher: { '@type': 'Organization', name: 'kinwove', url: SITE },
      mainEntityOfPage: canonical,
      about: { '@type': 'CreativeWork', name: `${name} (Bible)` },
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
    crumbs([['Bible', `${SITE}/bible`], [book.name, bookUrl(book)], [name, canonical]]),
  ];
  const askUrl = `${SITE}/?q=${encodeURIComponent(`Help me understand ${name}`)}`;
  const bodyHtml = `
    <div class="cat"><a href="${SITE}/bible" style="color:inherit;text-decoration:none">Bible</a> · <a href="${bookUrl(book)}" style="color:inherit;text-decoration:none">${esc(book.name)}</a></div>
    <h1>${esc(name)} explained: ${esc(c.title)}</h1>
    <div class="answer">${esc(c.overview)}</div>
    ${c.parts.map((p) => `<h2>${esc(p.label)}</h2><p>${esc(p.note)}</p>`).join('')}
    ${c.keyVerse ? `<blockquote style="font-style:normal">Key verse: ${esc(`${name}:${c.keyVerse}`)}</blockquote>` : ''}
    ${c.disagreement ? `<h2>Where Christians differ</h2><p>${esc(c.disagreement)}</p>` : ''}
    ${c.think ? `<h2>Something to think about</h2><p>${esc(c.think)}</p>` : ''}
    <a class="cta" href="${esc(askUrl)}">Ask about ${esc(name)} →</a>
    <div class="related">
      <div class="cat">Keep reading</div>
      ${prev ? `<a href="${prev[0]}">← ${esc(prev[1])}</a>` : ''}
      ${next ? `<a href="${next[0]}">${esc(next[1])} →</a>` : ''}
      <a href="${bookUrl(book)}">About the book of ${esc(book.name)} →</a>
    </div>
    ${askBox(`Ask anything about ${name}…`)}
    ${foot()}`;
  return shell({
    title: `${name} Explained in Plain Words: ${c.title} | kinwove`,
    description: c.overview.slice(0, 155),
    canonical, jsonLd, bodyHtml,
  });
}

export function renderBookPage(book) {
  const i = book.intro;
  const canonical = bookUrl(book);
  const jsonLd = [
    {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: `The book of ${book.name}: an introduction`, description: i.oneLine,
      datePublished: BIBLE_UPDATED, dateModified: BIBLE_UPDATED,
      author: { '@type': 'Organization', name: 'kinwove' },
      publisher: { '@type': 'Organization', name: 'kinwove', url: SITE },
      mainEntityOfPage: canonical,
    },
    crumbs([['Bible', `${SITE}/bible`], [book.name, canonical]]),
  ];
  const section = (h, p) => (p ? `<h2>${esc(h)}</h2><p>${esc(p)}</p>` : '');
  const bodyHtml = `
    <div class="cat"><a href="${SITE}/bible" style="color:inherit;text-decoration:none">Bible</a> · ${esc(book.testament)}</div>
    <h1>The book of ${esc(book.name)}, explained simply</h1>
    <div class="answer">${esc(i.oneLine)}</div>
    ${section('Who wrote it', i.writtenBy)}
    ${section('When', i.when)}
    ${section('Who it was written to', i.writtenTo)}
    ${section('Why it was written', i.why)}
    ${i.themes?.length ? `<h2>Big themes</h2><p>${i.themes.map(esc).join(' · ')}</p>` : ''}
    ${i.outline?.length ? `<h2>How it is laid out</h2>${i.outline.map((o) => `<p><strong style="color:var(--ink)">${esc(o.label)}</strong> (${esc(o.chapters)})</p>`).join('')}` : ''}
    ${section('A tip for reading it', i.readingTip)}
    <div class="related">
      <div class="cat">Every chapter of ${esc(book.name)}</div>
      ${book.chapters.map((c, k) => `<a href="${chapterUrl(book, k + 1)}">${esc(chapterName(book, k + 1))}: ${esc(c.title)} →</a>`).join('')}
    </div>
    ${askBox(`Ask anything about ${book.name}…`)}
    ${foot()}`;
  return shell({
    title: `The Book of ${book.name} Explained Simply | kinwove`,
    description: i.oneLine.slice(0, 155),
    canonical, jsonLd, bodyHtml,
  });
}

export function renderBibleIndex() {
  const canonical = `${SITE}/bible`;
  const jsonLd = [{
    '@context': 'https://schema.org', '@type': 'CollectionPage',
    name: 'Every book and chapter of the Bible, explained in plain words', url: canonical,
  }];
  const list = (testament) => BOOKS.filter((b) => b.testament === testament)
    .map((b) => `<a href="${bookUrl(b)}">${esc(b.name)} →</a>`).join('');
  const bodyHtml = `
    <div class="cat">kinwove Bible study</div>
    <h1>Every chapter of the Bible, explained in plain words</h1>
    <p>A short, simple explanation of every chapter, like a study Bible anyone can follow: what happens, the background that helps it make sense, where Christians read it differently, and a question to think about.</p>
    <div class="related" style="border-top:none;margin-top:20px;padding-top:0">
      <div class="cat">Old Testament</div>${list('Old Testament')}
    </div>
    <div class="related">
      <div class="cat">New Testament</div>${list('New Testament')}
    </div>
    <a class="cta" href="${SITE}">Open kinwove →</a>
    ${foot()}`;
  return shell({
    title: 'The Bible Explained Chapter by Chapter, in Plain Words | kinwove',
    description: 'A simple explanation of every chapter of the Bible, with book introductions, background, where Christians differ, and a question to think about.',
    canonical, jsonLd, bodyHtml,
  });
}

// Answer pages link each scripture they quote to its chapter page.
// "Psalm 34:18" → /bible/psalms-34, "1 Corinthians 15:3–6" → /bible/1-corinthians-15.
const NAME_ALIASES = { psalm: 'psalms', 'song of songs': 'song of solomon' };
export function chapterLinksForRefs(refs) {
  const seen = new Set();
  const out = [];
  for (const ref of refs) {
    const m = String(ref).match(/^((?:[1-3] )?[A-Za-z]+(?: [A-Za-z]+)*) (\d{1,3})/);
    if (!m) continue;
    const raw = m[1].toLowerCase();
    const slug = (NAME_ALIASES[raw] ?? raw).replace(/\s+/g, '-');
    const hit = resolveBiblePath(`${slug}-${m[2]}`);
    if (!hit || seen.has(`${slug}-${m[2]}`)) continue;
    seen.add(`${slug}-${m[2]}`);
    out.push({ url: chapterUrl(hit.book, hit.n), label: chapterName(hit.book, hit.n), title: hit.book.chapters[hit.n - 1].title });
  }
  return out;
}
