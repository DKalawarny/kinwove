// Spanish and Portuguese Bible study pages: /es/biblia/..., /pt/biblia/...
// Translations live in content/translations/<lang>/study/<CODE>/<n>.json (and
// intro.json), written by the Nov 2026 translation job (Haiku 5.5 translate,
// Sonnet 5.5 check). A chapter with no translation file simply has no page.
// Loaded lazily on first use because content/bible.js imports this file too.
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { esc, shell } from './answers.js';
import { BOOKS, BIBLE_UPDATED } from './bible.js';
import { BOOK_NAMES, PSALM_SINGULAR, LABELS, slugify } from './bible-names.js';

const SITE = 'https://www.kinwove.com';
const TR_DIR = join(dirname(fileURLToPath(import.meta.url)), 'translations');
export const BIBLE_LANGS = ['es', 'pt'];

let cache = null;
function load() {
  if (cache) return cache;
  cache = {};
  for (const lang of BIBLE_LANGS) {
    const books = [];
    for (const b of BOOKS) {
      const p = (f) => join(TR_DIR, lang, 'study', b.code, f);
      if (!existsSync(p('intro.json'))) continue;
      const intro = JSON.parse(readFileSync(p('intro.json'), 'utf8'));
      const chapters = b.chapters.map((_, i) => (existsSync(p(`${i + 1}.json`)) ? JSON.parse(readFileSync(p(`${i + 1}.json`), 'utf8')) : null));
      const name = BOOK_NAMES[lang][b.code];
      books.push({ en: b, code: b.code, name, slug: slugify(name), intro, chapters, testament: b.testament });
    }
    cache[lang] = { books, bySlug: Object.fromEntries(books.map((x) => [x.slug, x])), byCode: Object.fromEntries(books.map((x) => [x.code, x])) };
  }
  return cache;
}

const L = (lang) => LABELS[lang];
const chapterName = (lang, book, n) => `${book.code === 'PSA' ? PSALM_SINGULAR[lang] : book.name} ${n}`;
const indexUrl = (lang) => `${SITE}/${lang}/${L(lang).path}`;
const bookUrl = (lang, book) => `${indexUrl(lang)}/${book.slug}`;
const chapterUrl = (lang, book, n) => `${bookUrl(lang, book)}-${n}`;

// hreflang set for one Bible page, given its English book code (or null for the index).
export function bibleAlternates(code, n) {
  const enBook = code && BOOKS.find((b) => b.code === code);
  const en = !code ? `${SITE}/bible` : n ? `${SITE}/bible/${enBook.slug}-${n}` : `${SITE}/bible/${enBook.slug}`;
  const out = [{ lang: 'en', href: en }];
  const c = load();
  for (const lang of BIBLE_LANGS) {
    const book = code && c[lang].byCode[code];
    if (!code) { if (c[lang].books.length) out.push({ lang, href: indexUrl(lang) }); continue; }
    if (!book || (n && !book.chapters[n - 1])) continue;
    out.push({ lang, href: n ? chapterUrl(lang, book, n) : bookUrl(lang, book) });
  }
  if (out.length === 1) return [];
  out.push({ lang: 'x-default', href: en });
  return out;
}

export function resolveTranslatedBiblePath(lang, path) {
  const c = load()[lang];
  if (!c) return null;
  if (c.bySlug[path]) return { book: c.bySlug[path] };
  const m = path.match(/^(.+)-(\d{1,3})$/);
  const book = m && c.bySlug[m[1]];
  const n = m && Number(m[2]);
  if (!book || !book.chapters[n - 1]) return null;
  return { book, n };
}

export function translatedBibleSitemapEntries() {
  const out = [];
  const c = load();
  for (const lang of BIBLE_LANGS) {
    if (!c[lang].books.length) continue;
    out.push(indexUrl(lang));
    for (const b of c[lang].books) {
      out.push(bookUrl(lang, b));
      b.chapters.forEach((ch, i) => ch && out.push(chapterUrl(lang, b, i + 1)));
    }
  }
  return out;
}

const crumbs = (items) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })),
});

function askBox(lang, name) {
  const l = L(lang);
  return `
    <div class="askbox">
      <div class="cat">${esc(l.stillWondering)}</div>
      <form action="${SITE}/" method="get">
        <input type="text" name="q" required maxlength="500" autocomplete="off"
               placeholder="${esc(l.askPlaceholder(name))}" aria-label="${esc(l.askButton)}">
        <button type="submit">${esc(l.askButton)}</button>
      </form>
      <div class="note">${esc(l.askNote)}</div>
    </div>`;
}

function foot(lang, enHref) {
  const l = L(lang);
  return `
    <div class="updated">${esc(l.updated)} ${esc(BIBLE_UPDATED)}</div>
    <div class="foot">
      <p style="font-style:italic;line-height:1.7;margin:0 0 10px">${esc(l.pastorLine)} ${esc(l.differNote)}</p>
      <p style="font-style:italic;line-height:1.7;margin:0 0 10px">${esc(l.translated)}</p>
      <a href="${indexUrl(lang)}">${esc(l.allBooks)}</a> · <a href="${enHref}" hreflang="en">${esc(l.english)}</a> · <a href="${SITE}">kinwove</a>
    </div>`;
}

const article = (headline, description, canonical, lang) => ({
  '@context': 'https://schema.org', '@type': 'Article', inLanguage: lang,
  headline, description, datePublished: BIBLE_UPDATED, dateModified: BIBLE_UPDATED,
  author: { '@type': 'Organization', name: 'kinwove' },
  publisher: { '@type': 'Organization', name: 'kinwove', url: SITE },
  mainEntityOfPage: canonical,
});

export function renderTranslatedChapterPage(lang, book, n) {
  const l = L(lang);
  const c = book.chapters[n - 1];
  const name = chapterName(lang, book, n);
  const canonical = chapterUrl(lang, book, n);
  const prevN = n > 1 && book.chapters[n - 2] ? n - 1 : null;
  const nextN = n < book.chapters.length && book.chapters[n] ? n + 1 : null;
  const faqs = [
    { q: l.whatAbout(name), a: c.overview },
    ...(c.disagreement ? [{ q: l.whereDiffer(name), a: c.disagreement }] : []),
  ];
  const jsonLd = [
    article(l.chapterTitle(name, c.title), c.overview, canonical, lang),
    { '@context': 'https://schema.org', '@type': 'FAQPage', inLanguage: lang,
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    crumbs([[l.bible, indexUrl(lang)], [book.name, bookUrl(lang, book)], [name, canonical]]),
  ];
  const askUrl = `${SITE}/?q=${encodeURIComponent(l.askQ(name))}`;
  const bodyHtml = `
    <div class="cat"><a href="${indexUrl(lang)}" style="color:inherit;text-decoration:none">${esc(l.bible)}</a> · <a href="${bookUrl(lang, book)}" style="color:inherit;text-decoration:none">${esc(book.name)}</a></div>
    <h1>${esc(l.chapterTitle(name, c.title))}</h1>
    <div class="answer">${esc(c.overview)}</div>
    ${c.parts.map((p) => `<h2>${esc(p.label)}</h2><p>${esc(p.note)}</p>`).join('')}
    ${c.keyVerse ? `<blockquote style="font-style:normal">${esc(l.keyVerse)}: ${esc(`${name}:${c.keyVerse}`)}</blockquote>` : ''}
    ${c.disagreement ? `<h2>${esc(l.differ)}</h2><p>${esc(c.disagreement)}</p>` : ''}
    ${c.think ? `<h2>${esc(l.think)}</h2><p>${esc(c.think)}</p>` : ''}
    <a class="cta" href="${esc(askUrl)}">${esc(l.askCta(name))}</a>
    <div class="related">
      <div class="cat">${esc(l.keepReading)}</div>
      ${prevN ? `<a href="${chapterUrl(lang, book, prevN)}">← ${esc(chapterName(lang, book, prevN))}</a>` : ''}
      ${nextN ? `<a href="${chapterUrl(lang, book, nextN)}">${esc(chapterName(lang, book, nextN))} →</a>` : ''}
      <a href="${bookUrl(lang, book)}">${esc(l.aboutBook(book.name))} →</a>
    </div>
    ${askBox(lang, name)}
    ${foot(lang, `${SITE}/bible/${book.en.slug}-${n}`)}`;
  return shell({
    title: `${l.chapterTitle(name, c.title)} | kinwove`,
    description: c.overview.slice(0, 155),
    canonical, jsonLd, bodyHtml, lang, alternates: bibleAlternates(book.code, n),
  });
}

export function renderTranslatedBookPage(lang, book) {
  const l = L(lang);
  const i = book.intro;
  const canonical = bookUrl(lang, book);
  const jsonLd = [
    article(l.bookTitle(book.name), i.oneLine, canonical, lang),
    crumbs([[l.bible, indexUrl(lang)], [book.name, canonical]]),
  ];
  const section = (h, p) => (p ? `<h2>${esc(h)}</h2><p>${esc(p)}</p>` : '');
  const bodyHtml = `
    <div class="cat"><a href="${indexUrl(lang)}" style="color:inherit;text-decoration:none">${esc(l.bible)}</a> · ${esc(book.testament === 'Old Testament' ? l.ot : l.nt)}</div>
    <h1>${esc(l.bookH1(book.name))}</h1>
    <div class="answer">${esc(i.oneLine)}</div>
    ${section(l.writtenBy, i.writtenBy)}
    ${section(l.when, i.when)}
    ${section(l.writtenTo, i.writtenTo)}
    ${section(l.why, i.why)}
    ${i.themes?.length ? `<h2>${esc(l.themes)}</h2><p>${i.themes.map(esc).join(' · ')}</p>` : ''}
    ${i.outline?.length ? `<h2>${esc(l.outline)}</h2>${i.outline.map((o) => `<p><strong style="color:var(--ink)">${esc(o.label)}</strong> (${esc(o.chapters)})</p>`).join('')}` : ''}
    ${section(l.tip, i.readingTip)}
    <div class="related">
      <div class="cat">${esc(l.everyChapter(book.name))}</div>
      ${book.chapters.map((c, k) => (c ? `<a href="${chapterUrl(lang, book, k + 1)}">${esc(chapterName(lang, book, k + 1))}: ${esc(c.title)} →</a>` : '')).join('')}
    </div>
    ${askBox(lang, book.name)}
    ${foot(lang, `${SITE}/bible/${book.en.slug}`)}`;
  return shell({
    title: `${l.bookTitle(book.name)} | kinwove`,
    description: i.oneLine.slice(0, 155),
    canonical, jsonLd, bodyHtml, lang, alternates: bibleAlternates(book.code, null),
  });
}

export function renderTranslatedBibleIndex(lang) {
  const l = L(lang);
  const c = load()[lang];
  const canonical = indexUrl(lang);
  const list = (t) => c.books.filter((b) => b.testament === t).map((b) => `<a href="${bookUrl(lang, b)}">${esc(b.name)} →</a>`).join('');
  const bodyHtml = `
    <div class="cat">kinwove</div>
    <h1>${esc(l.indexH1)}</h1>
    <p>${esc(l.indexIntro)}</p>
    <div class="related" style="border-top:none;margin-top:20px;padding-top:0"><div class="cat">${esc(l.ot)}</div>${list('Old Testament')}</div>
    <div class="related"><div class="cat">${esc(l.nt)}</div>${list('New Testament')}</div>
    <a class="cta" href="${SITE}">${esc(l.open)}</a>
    ${foot(lang, `${SITE}/bible`)}`;
  return shell({
    title: `${l.indexTitle} | kinwove`, description: l.indexDesc, canonical,
    jsonLd: [{ '@context': 'https://schema.org', '@type': 'CollectionPage', inLanguage: lang, name: l.indexH1, url: canonical }],
    bodyHtml, lang, alternates: bibleAlternates(null, null),
  });
}
