// One running document per Study session. Everything a pastor saves while
// preparing (a research answer, a selected line, a verse and their note, their
// own words) is pasted onto the end of that session's document, so the whole
// sermon's material sits on one page they can edit, print, or read at a podium.
// Stored as a church_notes row with source = 'doc'; no schema change.
import { parseTable } from './inlineMarks.js';
import { plainDashes } from './plainDashes.js';

export const DOC_SOURCE = 'doc';

export function escHtml(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Inline markdown inside already-escaped text.
function inline(escaped) {
  return escaped
    .replace(/\*\*([^*\n](?:[^*]|\*(?!\*))*?)\*\*/g, '<b>$1</b>')
    .replace(/(?<![*\w])\*(?![\s*])([^*\n]+?)(?<![\s*])\*(?![*\w])/g, '<i>$1</i>');
}

// A saved AI answer is markdown; the notes editor is rich text. Convert the
// handful of shapes research answers use, and escape everything else.
export function mdToHtml(md) {
  const out = [];
  for (const raw of String(md ?? '').replace(/\r/g, '').split(/\n{2,}/)) {
    const para = raw.replace(/^\s*```[a-z]*\s*$/gm, '').trim();
    if (!para) continue;
    if (/^(-{3,}|\*{3,})$/.test(para)) continue; // dividers add nothing in a document
    const table = parseTable(para.replace(/^[ \t]*>[ \t]?/gm, ''));
    if (table) {
      if (table.before) out.push(`<p>${inline(escHtml(table.before)).replace(/\n/g, '<br>')}</p>`);
      const [head, ...rows] = table.rows;
      const tr = (cells, tag) => `<tr>${cells.map((c) => `<${tag} style="border:1px solid rgba(26,17,8,0.18);padding:4px 8px;text-align:left;vertical-align:top">${inline(escHtml(c))}</${tag}>`).join('')}</tr>`;
      out.push(`<table style="border-collapse:collapse;margin:6px 0">${tr(head, 'th')}${rows.map((r) => tr(r, 'td')).join('')}</table>`);
      continue;
    }
    const heading = para.match(/^(#{1,6})\s+(.*)$/s);
    if (heading && !heading[2].includes('\n')) { out.push(`<h3>${inline(escHtml(heading[2]))}</h3>`); continue; }
    // "── SECTION ──" and ALL CAPS one-liners are the brief's section labels
    const label = para.match(/^[─—–-]{1,3}\s*(.+?)\s*[─—–-]{1,3}$/);
    if (label && !para.includes('\n')) { out.push(`<h3>${escHtml(label[1])}</h3>`); continue; }
    const lines = para.split('\n');
    if (lines.every((l) => /^\s*(?:[-•]|\d+[.)])\s+/.test(l))) {
      out.push(`<ul>${lines.map((l) => `<li>${inline(escHtml(l.replace(/^\s*(?:[-•]|\d+[.)])\s+/, '')))}</li>`).join('')}</ul>`);
      continue;
    }
    const quoted = lines.every((l) => /^\s*>/.test(l));
    const text = inline(escHtml(lines.map((l) => l.replace(/^[ \t]*>[ \t]?/, '')).join('\n'))).replace(/\n/g, '<br>');
    out.push(quoted ? `<blockquote style="margin:6px 0;padding-left:12px;border-left:3px solid rgba(184,115,58,0.4)">${text}</blockquote>` : `<p>${text}</p>`);
  }
  return out.join('');
}

// The pieces that get pasted in. Each returns an HTML section.
export const section = {
  // same no-dashes pass the chat applies on screen, so the pasted copy matches what was read
  answer: (question, answerMd) => `${question ? `<h2>${escHtml(question)}</h2>` : ''}${mdToHtml(String(answerMd ?? '').split('\n').map((l) => plainDashes(l)).join('\n'))}`,
  clip: (text) => `<p>${escHtml(text).replace(/\n/g, '<br>')}</p>`,
  verse: (ref, verseText, reflection) =>
    `<h2>${escHtml(ref)}</h2>${verseText ? `<blockquote style="margin:6px 0;padding-left:12px;border-left:3px solid rgba(184,115,58,0.4)">${escHtml(verseText)}</blockquote>` : ''}${reflection ? `<p>${escHtml(reflection).replace(/\n/g, '<br>')}</p>` : ''}`,
  own: (title, body) => `${title ? `<h2>${escHtml(title)}</h2>` : ''}<p>${escHtml(body).replace(/\n/g, '<br>')}</p>`,
};

// One part of an answer, pasted without the question above it.
section.part = (md) => mdToHtml(String(md ?? '').split('\n').map((l) => plainDashes(l)).join('\n'));

// A research answer is long; a pastor usually wants one part of it. Split it at
// its own headings and dividers so each part can be added on its own.
const isDivider = (p) => /^(-{3,}|\*{3,})$/.test(p);
function isHeading(p) {
  if (p.includes('\n')) return false;
  return /^#{1,6}\s+\S/.test(p)
    || /^[─—–-]{1,3}\s*\S.*\S\s*[─—–-]{1,3}$/.test(p)
    || /^\*\*[^*]+\*\*:?$/.test(p)
    || (/^\d{1,2}[.)]\s+\S/.test(p) && p.length <= 110 && !/[.!:;,]$/.test(p))
    || (/^[A-Z0-9][A-Z0-9 ,'’&:()\/-]{3,70}$/.test(p) && /[A-Z]{3}/.test(p));
}
export function splitSections(md) {
  const paras = String(md ?? '').replace(/\r/g, '').split(/\n{2,}/).map((x) => x.trim()).filter(Boolean);
  const out = [];
  let cur = [];
  const onlyHeadings = () => cur.length > 0 && cur.every(isHeading);
  const flush = () => { if (cur.length) out.push(cur.join('\n\n')); cur = []; };
  for (const para of paras) {
    if (isDivider(para)) { if (!onlyHeadings()) flush(); continue; }
    // a heading starts a new part, unless the part so far is itself only headings
    // ("THE REAL DEBATES" followed by "1. Does Thomas touch Jesus?")
    if (isHeading(para) && cur.length && !onlyHeadings()) flush();
    cur.push(para);
  }
  flush();
  // a trailing lone heading has nothing under it: fold it into the part before
  if (out.length > 1 && isHeading(out[out.length - 1])) { const last = out.pop(); out[out.length - 1] += `\n\n${last}`; }
  return out;
}

// An older document body may still be plain text; make it HTML before appending.
function asHtml(body) {
  if (!body) return '';
  return /<[a-z]/i.test(body) ? body : escHtml(body).replace(/\n/g, '<br>');
}

export function joinSections(existingBody, html) {
  const cur = asHtml(existingBody);
  return cur ? `${cur}<p><br></p>${html}` : html;
}

// Sermons that have a document, newest first: [{ id, title, created_at }]
export async function listSermonDocs(supabase, churchId) {
  if (!churchId) return [];
  const { data } = await supabase.from('church_notes').select('id, series, created_at')
    .eq('church_id', churchId).eq('source', DOC_SOURCE).not('series', 'is', null)
    .order('created_at', { ascending: false });
  const seen = new Set();
  return (data ?? []).filter((r) => r.series?.trim() && !seen.has(r.series.trim()) && seen.add(r.series.trim()))
    .map((r) => ({ id: r.id, title: r.series.trim(), created_at: r.created_at }));
}

// "New sermon": make its (empty) document now, so it has a page from the start.
export async function ensureSermonDoc(supabase, { churchId, userId, series }) {
  const name = (series || '').trim();
  if (!churchId || !userId || !name) return { error: new Error('missing') };
  const { data: found } = await supabase.from('church_notes').select('id')
    .eq('church_id', churchId).eq('author_id', userId).eq('source', DOC_SOURCE).eq('series', name).limit(1);
  if (found?.length) return { id: found[0].id };
  const { data, error } = await supabase.from('church_notes').insert({
    church_id: churchId, author_id: userId, title: name, body: '', series: name, source: DOC_SOURCE,
  }).select('id').single();
  return { error, id: data?.id };
}

// Paste a section onto the end of the session's document, creating it on first use.
// `series` is the session name; without one, everything goes to a general "Notes" page.
export async function appendToSermonDoc(supabase, { churchId, userId, series, html }) {
  if (!churchId || !userId || !html) return { error: new Error('missing') };
  const name = (series || '').trim() || null;
  let q = supabase.from('church_notes').select('id, body')
    .eq('church_id', churchId).eq('author_id', userId).eq('source', DOC_SOURCE);
  q = name ? q.eq('series', name) : q.is('series', null);
  const { data: found, error: findErr } = await q.order('created_at', { ascending: true }).limit(1);
  if (findErr) return { error: findErr };
  if (found?.length) {
    const { error } = await supabase.from('church_notes')
      .update({ body: joinSections(found[0].body, html), updated_at: new Date().toISOString() })
      .eq('id', found[0].id);
    return { error, id: found[0].id };
  }
  const { data, error } = await supabase.from('church_notes').insert({
    church_id: churchId, author_id: userId,
    title: name ?? 'Notes', body: html, series: name, source: DOC_SOURCE,
  }).select('id').single();
  return { error, id: data?.id };
}
