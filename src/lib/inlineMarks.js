// Splits a run of AI text into plain / bold / italic pieces so MsgText can render
// **bold** and *italic* instead of showing the asterisks. Italics are opt-in
// (AI replies only) so a person's own message is never restyled.
const BOLD = /\*\*([^*\n][^*]*?)\*\*/g;
// Same, but the bold run may hold single-asterisk italics inside it.
const BOLD_NESTING = /\*\*([^*\n](?:[^*]|\*(?!\*))*?)\*\*/g;
// An opening * must not follow a letter/digit and must touch the first word; the
// closing * must touch the last word. That leaves "2 * 3 * 4", "5*3*2", a "* "
// bullet and a lone footnote * alone.
const ITALIC = /(?<![*\w])\*(?![\s*])([^*\n]+?)(?<![\s*])\*(?![*\w])/g;

function split(s, re, type, rest) {
  const out = [];
  let last = 0, m;
  re.lastIndex = 0;
  while ((m = re.exec(s)) !== null) {
    if (m.index > last) out.push(...rest(s.slice(last, m.index)));
    out.push({ t: type, v: m[1] });
    last = m.index + m[0].length;
  }
  if (last < s.length) out.push(...rest(s.slice(last)));
  return out;
}

export function tokenizeInline(s, italics = false) {
  const plain = (x) => [{ t: 'text', v: x }];
  const inner = italics ? (x) => split(x, ITALIC, 'italic', plain) : plain;
  const out = [];
  for (const p of split(s, italics ? BOLD_NESTING : BOLD, 'bold', inner)) {
    // *italic* inside **bold** (a bold heading quoting a Greek phrase)
    if (p.t === 'bold' && italics && p.v.includes('*')) {
      for (const q of split(p.v, ITALIC, 'italic', plain)) out.push({ t: q.t === 'italic' ? 'bolditalic' : 'bold', v: q.v });
    } else out.push(p);
  }
  return out;
}

// A markdown pipe table inside one paragraph: header row, |---| rule, body rows.
// Returns { before, rows } (rows[0] is the header) or null if this isn't one.
export function parseTable(para) {
  const lines = para.split('\n');
  const start = lines.findIndex((l) => /^\s*\|.*\|\s*$/.test(l));
  if (start < 0 || lines.length - start < 3) return null;
  if (!/^\s*\|[\s:|-]+\|\s*$/.test(lines[start + 1]) || !lines[start + 1].includes('-')) return null;
  const body = lines.slice(start).filter((l) => l.trim());
  if (!body.every((l) => /^\s*\|.*\|\s*$/.test(l))) return null;
  const cells = (l) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
  return { before: lines.slice(0, start).join('\n').trim(), rows: [cells(body[0]), ...body.slice(2).map(cells)] };
}
