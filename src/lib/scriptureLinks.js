import { parseRef } from '../bibleRefUtils.js';

// Finds plain references like "John 3:16", "1 Cor 13:4-7" or "Song of Songs 2:1"
// in free text. Each candidate is kept only if parseRef knows the book, so
// "At 3:30" or a time like "Service 10:30" stays plain text.
const CANDIDATE = /\b(?:[1-3]\s?)?[A-Z][a-z]+(?: of [A-Z][a-z]+)?\.? \d{1,3}:\d{1,3}(?:\s?[–-]\s?\d{1,3})?\b/g;

/** Split text into [{ text }, { text, ref }] parts; ref is the string to open. */
export function splitScriptureRefs(text) {
  const parts = [];
  if (!text) return parts;
  let last = 0;
  for (const m of text.matchAll(CANDIDATE)) {
    const raw = m[0];
    if (!parseRef(raw.replace('.', ''))) continue;
    if (m.index > last) parts.push({ text: text.slice(last, m.index) });
    parts.push({ text: raw, ref: raw.replace('.', '') });
    last = m.index + raw.length;
  }
  if (last < text.length) parts.push({ text: text.slice(last) });
  return parts;
}
