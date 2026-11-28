// Public Bible study pages: /bible, /bible/<book>, /bible/<book>-<chapter>.
// The notes already ship as static JSON for the in-app reader
// (public/study/<CODE>/<n>.json + intro.json). These pages render the same
// files as server HTML so search engines and AI assistants can read them.
// Nothing here is generated at request time and no AI is called.
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { esc, shell } from './answers.js';
import { bibleAlternates, guideAlternates } from './bible-i18n.js';
import { STUDY_GUIDES } from './study-guides.js';
import { guideShort } from './youtube.js';

const SITE = 'https://www.kinwove.com';
// The one-minute "Bible study for small groups" video, shown on every English study guide.
const GUIDE_VIDEO = 'https://sgeziqwlhhzivnxqzbhh.supabase.co/storage/v1/object/public/site-video/small-group';
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

const guideFor = (book, n) => STUDY_GUIDES[book.code]?.[n] ?? null;
const guideUrl = (book, n) => `${chapterUrl(book, n)}-study-guide`;

// /bible/<path> → { book } or { book, n } or { book, n, guide } or null.
export function resolveBiblePath(path) {
  if (path.endsWith('-study-guide')) {
    const hit = resolveBiblePath(path.slice(0, -'-study-guide'.length));
    return hit?.n && guideFor(hit.book, hit.n) ? { ...hit, guide: true } : null;
  }
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
    b.chapters.forEach((_, i) => {
      entries.push(chapterUrl(b, i + 1));
      if (guideFor(b, i + 1)) entries.push(guideUrl(b, i + 1));
    });
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
      ${guideFor(book, n) ? `<a href="${guideUrl(book, n)}">Leading a group? ${esc(name)} study guide →</a>` : ''}
    </div>
    ${askBox(`Ask anything about ${name}…`)}
    ${foot()}`;
  return shell({
    title: `${name} Explained in Plain Words: ${c.title} | kinwove`,
    description: c.overview.slice(0, 155),
    canonical, jsonLd, bodyHtml, alternates: bibleAlternates(book.code, n),
  });
}

export function renderStudyGuidePage(book, n) {
  const c = book.chapters[n - 1];
  const g = guideFor(book, n);
  const name = chapterName(book, n);
  const canonical = guideUrl(book, n);
  const short = guideShort(book.code, n);
  const description = `${name} Bible study guide for small groups: an icebreaker, ${g.questions.length} discussion questions, how it applies this week, and a closing prayer.`;
  const prev = guideFor(book, n - 1) ? [guideUrl(book, n - 1), `${chapterName(book, n - 1)} study guide`] : null;
  const next = guideFor(book, n + 1) ? [guideUrl(book, n + 1), `${chapterName(book, n + 1)} study guide`] : null;
  const jsonLd = [
    {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: `${name} Bible study guide: ${c.title}`, description,
      // Romans was written 6 Nov 2026; every other book's guides 25 Nov 2026 (they quote the BSB).
      datePublished: g.bible === 'BSB' ? '2026-11-25' : '2026-11-06', dateModified: g.bible === 'BSB' ? '2026-11-25' : '2026-11-06',
      author: { '@type': 'Organization', name: 'kinwove' },
      publisher: { '@type': 'Organization', name: 'kinwove', url: SITE },
      mainEntityOfPage: canonical,
      about: { '@type': 'CreativeWork', name: `${name} (Bible)` },
    },
    crumbs([['Bible', `${SITE}/bible`], [book.name, bookUrl(book)], [name, chapterUrl(book, n)], ['Study guide', canonical]]),
    short ? {
      '@context': 'https://schema.org', '@type': 'VideoObject',
      name: `${name} Bible study questions for your small group`,
      description: `Three discussion questions from the free ${name} study guide, in under a minute.`,
      thumbnailUrl: `https://i.ytimg.com/vi/${short.id}/hqdefault.jpg`,
      embedUrl: `https://www.youtube.com/embed/${short.id}`,
      url: `https://www.youtube.com/shorts/${short.id}`,
      uploadDate: short.at,
    } : {
      '@context': 'https://schema.org', '@type': 'VideoObject',
      name: 'Bible study for small groups with kinwove',
      description: 'How a small group leader opens a free study guide, plans the study with Ask, sends it to a friend in the group, and keeps it in Notes.',
      thumbnailUrl: `${GUIDE_VIDEO}-cover.jpg`, contentUrl: `${GUIDE_VIDEO}-720.mp4`,
      uploadDate: '2026-11-27', duration: 'PT59S',
    },
  ];
  const askUrl = `${SITE}/?q=${encodeURIComponent(`Help me lead a group study on ${name}`)}`;
  const bodyHtml = `
    <div class="cat"><a href="${SITE}/bible" style="color:inherit;text-decoration:none">Bible</a> · <a href="${bookUrl(book)}" style="color:inherit;text-decoration:none">${esc(book.name)}</a> · Study guide</div>
    <h1>${esc(name)} Bible study guide: ${esc(c.title)}</h1>
    <div class="answer">${esc(c.overview)}</div>
    ${short ? `<h2>Three questions from this guide, in under a minute</h2>
    <iframe src="https://www.youtube-nocookie.com/embed/${short.id}" title="${esc(name)} Bible study questions" loading="lazy"
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen
      style="display:block;width:100%;max-width:240px;aspect-ratio:9/16;margin:16px auto 0;border:0;border-radius:18px;background:#1A1108;box-shadow:0 10px 40px rgba(26,17,8,.18)"></iframe>` : `
    <h2>See it in one minute</h2>
    <p>How a leader plans this kind of study with kinwove, shares it with the group, and keeps it for later. <a href="${VIDEO_PAGE}">What it shows</a></p>
    <video controls playsinline preload="none" poster="${GUIDE_VIDEO}-cover.jpg"
      style="display:block;width:100%;max-width:240px;aspect-ratio:9/16;margin:16px auto 0;border-radius:18px;background:#1A1108;box-shadow:0 10px 40px rgba(26,17,8,.18)">
      <source src="${GUIDE_VIDEO}-720.mp4" type="video/mp4">
    </video>
    `}
    <h2>Open with</h2><p>${esc(g.open)}</p>
    <h2>Read together</h2><p>${g.read.map(esc).join(', then ')}. If you are leading, read the plain-words note on ${esc(name)} first (linked below).</p>
    <h2>Discussion questions</h2>
    <ol>${g.questions.map((q) => `<li><p>${esc(q)}</p></li>`).join('')}</ol>
    <h2>For our lives this week</h2><p>${esc(g.life)}</p>
    <h2>Close in prayer</h2><p>${esc(g.prayer)}</p>
    <h2>Leader tip</h2><p>${esc(g.tip)}</p>
    ${g.bible === 'BSB' ? '<p class="updated">Bible quotes are from the Berean Standard Bible.</p>' : ''}
    <a class="cta" href="${esc(askUrl)}">Plan this study with Ask →</a>
    <div class="related">
      <div class="cat">Keep going</div>
      ${prev ? `<a href="${prev[0]}">← ${esc(prev[1])}</a>` : ''}
      ${next ? `<a href="${next[0]}">${esc(next[1])} →</a>` : ''}
      <a href="${chapterUrl(book, n)}">${esc(name)} explained in plain words →</a>
      <a href="${bookUrl(book)}">About the book of ${esc(book.name)} →</a>
    </div>
    ${askBox(`Ask anything about ${name}…`)}
    ${foot()}`;
  return shell({
    title: `${name} Bible Study Guide: Questions for Small Groups | kinwove`,
    description: description.slice(0, 155),
    canonical, jsonLd, bodyHtml, alternates: guideAlternates(book.code, n),
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
    canonical, jsonLd, bodyHtml, alternates: bibleAlternates(book.code, null),
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
    canonical, jsonLd, bodyHtml, alternates: bibleAlternates(null, null),
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

// A page whose main content is the small-group video, so search engines can list it
// as a video result (they skip a video that is only part of a page, like the guides).
export const VIDEO_PAGE = `${SITE}/videos/small-group-bible-study`;
export function renderSmallGroupVideoPage() {
  const description = 'A one-minute look at planning a small group Bible study with kinwove: open a free study guide, shape it for your group with Ask, send it to a friend, and keep it in your Notes.';
  const lines = [
    'Leading a small group this week? This is kinwove.',
    'Open the Bible and pick your chapter. This week, Romans 8.',
    'Every chapter has a free study guide: what it means, questions to talk through, and a tip for leading.',
    'Want it shaped for your group? Just ask.',
    '"My group is mostly people new to faith." And it adjusts.',
    'Save it.',
    'Send it to a friend in your group.',
    "It's waiting in your Notes whenever you need it.",
    'kinwove. Free, for anyone leading a study.',
  ];
  const jsonLd = [
    {
      '@context': 'https://schema.org', '@type': 'VideoObject',
      name: 'How to plan a small group Bible study in a minute (Romans 8)',
      description,
      thumbnailUrl: `${GUIDE_VIDEO}-cover.jpg`, contentUrl: `${GUIDE_VIDEO}-720.mp4`,
      uploadDate: '2026-11-27', duration: 'PT59S',
      transcript: lines.join(' '),
      embedUrl: 'https://www.youtube.com/embed/7aP_TAHzNOE',
      publisher: { '@type': 'Organization', name: 'kinwove', url: SITE },
    },
    crumbs([['Bible', `${SITE}/bible`], ['Small group video', VIDEO_PAGE]]),
  ];
  const bodyHtml = `
    <div class="cat"><a href="${SITE}/bible" style="color:inherit;text-decoration:none">Bible</a> · Video</div>
    <h1>How to plan a small group Bible study in a minute</h1>
    <video controls playsinline preload="metadata" poster="${GUIDE_VIDEO}-cover.jpg"
      style="display:block;width:100%;max-width:340px;aspect-ratio:9/16;margin:20px auto 0;border-radius:18px;background:#1A1108;box-shadow:0 10px 40px rgba(26,17,8,.18)">
      <source src="${GUIDE_VIDEO}-720.mp4" type="video/mp4">
    </video>
    <div class="answer" style="margin-top:28px">${esc(description)}</div>
    <h2>What the video shows</h2>
    ${lines.map((l) => `<p>${esc(l)}</p>`).join('')}
    <p style="text-align:center"><a href="https://www.youtube.com/shorts/7aP_TAHzNOE">Watch it on YouTube</a></p>
    <a class="cta" href="${SITE}/bible/romans-8-study-guide">Open the Romans 8 study guide →</a>
    <div class="related">
      <div class="cat">Keep going</div>
      <a href="${SITE}/bible">Every book of the Bible, with a study guide for each chapter →</a>
      <a href="${SITE}/?q=${encodeURIComponent('Help me lead a group study on Romans 8')}">Plan a study with Ask →</a>
    </div>
    ${askBox('Ask anything about leading your group…')}
    ${foot()}`;
  return shell({
    title: 'How to Plan a Small Group Bible Study in a Minute (Video) | kinwove',
    description: description.slice(0, 155),
    canonical: VIDEO_PAGE, jsonLd, bodyHtml,
  });
}

// Short links for videos: kinwove.com/romans8, /1corinthians13, /john3. A Short can't carry a
// clickable link, so the address has to be one a person can remember and type. Goes to the
// chapter's study guide (or its plain-words note when there is no guide), tagged as YouTube.
const SHORT_BOOKS = Object.fromEntries(BOOKS.map((b) => [b.slug.replace(/-/g, ''), b]));
export function resolveShortLink(path) {
  const m = /^\/?([1-3]?[a-z]+)(\d{1,3})\/?$/i.exec(String(path ?? ''));
  if (!m) return null;
  const book = SHORT_BOOKS[m[1].toLowerCase()];
  const n = Number(m[2]);
  if (!book || n < 1 || n > book.chapters.length) return null;
  const tag = `utm_source=youtube&utm_medium=short&utm_campaign=${book.slug.replace(/-/g, '')}${n}`;
  return `${guideFor(book, n) ? guideUrl(book, n) : chapterUrl(book, n)}?${tag}`;
}
