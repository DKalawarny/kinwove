import { plainDashes } from './plainDashes.js';
import { tokenizeInline } from './inlineMarks.js';

// An Ask answer as plain text for apps that do not read markdown (WhatsApp, text,
// email, Messenger, Facebook, copy). Inside kinwove the same answer shows bold and
// headings; out there the marks were showing as literal ** and ###.
export function shareText(md) {
  if (typeof md !== 'string' || !md) return md ?? '';
  const lines = plainDashes(md).split('\n');
  const out = [];
  for (let line of lines) {
    if (/^\s*```/.test(line)) continue;                       // code fence lines
    if (/^\s*(---+|\*\*\*+|___+)\s*$/.test(line)) { out.push(''); continue; } // dividers
    line = line.replace(/^(\s*)#{1,6}\s+/, '$1');            // ### Heading
    line = line.replace(/^(\s*)>\s?/, '$1');                  // > quote
    line = line.replace(/^(\s*)[-*+]\s+/, '$1• ');            // - bullet
    line = line.replace(/\[([^\]\n]+)\]\((https?:\/\/[^)\s]+)\)/g, '$1 ($2)'); // [text](url)
    line = line.replace(/`([^`\n]+)`/g, '$1');                // `code`
    out.push(tokenizeInline(line, true).map((p) => p.v).join(''));
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}
