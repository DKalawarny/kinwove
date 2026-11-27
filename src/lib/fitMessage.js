// A direct message holds at most 2000 characters (dm_messages_body_check).
// Ask answers are usually longer, so a share to a friend failed while the
// sheet still said "Sent!". This keeps the heading and the link to the full
// answer, and cuts the text at a paragraph, then a sentence, then a word.
export const DM_MAX = 2000;

export function fitMessage(heading, text, url, max = DM_MAX) {
  const h = (heading ?? '').trim();
  const t = (text ?? '').trim();
  const u = (url ?? '').trim();
  const join = (body, link) => [h, body, link].filter(Boolean).join('\n\n');
  const full = join(t, u);
  if (full.length <= max) return full;
  // Cut: say what the link is, so the friend knows there is more.
  const link = u ? `Read the rest: ${u}` : '';
  const room = max - join('', link).length - (h ? 2 : 0) - (link ? 2 : 0) - 1; // 1 for a possible ellipsis
  if (room <= 0) return full.slice(0, max);
  const cut = t.slice(0, room);
  const floor = Math.floor(room * 0.5);
  // A paragraph or sentence end needs no ellipsis; a cut inside a sentence does.
  let end = cut.lastIndexOf('\n\n');
  if (end < floor) end = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('? '), cut.lastIndexOf('! ')) + 1;
  if (end >= floor) return join(cut.slice(0, end).trimEnd(), link);
  end = cut.lastIndexOf(' ');
  if (end < floor) end = room;
  return join(cut.slice(0, end).trimEnd() + '…', link);
}
