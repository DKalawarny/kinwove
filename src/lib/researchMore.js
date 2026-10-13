// A research answer is short on purpose: it answers what was asked. The rest of
// the brief sits behind tabs under the answer, each fetched only when tapped.
// The model ends its answer with one line naming the voices worth a tab:
//   VOICES: Calvin | N.T. Wright | Augustine

const VOICES_LINE = /\n[ \t]*VOICES:[ \t]*([^\n]*)\s*$/;
// while streaming, the line arrives a few characters at a time
const PARTIAL = /\n[ \t]*(V|VO|VOI|VOIC|VOICE|VOICES)\s*$/;

export function splitVoices(content) {
  const text = String(content ?? '');
  const m = text.match(VOICES_LINE);
  if (!m) return { body: text.replace(PARTIAL, '').trimEnd(), voices: [] };
  const seen = new Set();
  const voices = m[1].split('|').map((v) => v.replace(/[*_`]/g, '').trim())
    .filter((v) => v && v.length <= 40 && !/^none\.?$/i.test(v) && !seen.has(v.toLowerCase()) && seen.add(v.toLowerCase()))
    .slice(0, 4);
  return { body: text.slice(0, m.index).trimEnd(), voices };
}

// The fixed tabs. `ask` is what the model is told to give for that tab.
export const MORE_KINDS = [
  { id: 'language', label: 'Original language', ask: 'the ORIGINAL LANGUAGE section and the TRANSLATION COMPARISON section' },
  { id: 'debates', label: 'Where they disagree', ask: 'THE REAL DEBATES section' },
  { id: 'background', label: 'Background', ask: 'the PASSAGE IN CONTEXT, LITERARY STRUCTURE and CULTURAL & HISTORICAL BACKGROUND sections' },
  { id: 'preachers', label: 'Preachers', ask: 'the EXPOSITORY VOICES section and the PASTORAL WARNINGS section' },
  { id: 'illustrations', label: 'Illustrations', ask: 'the ILLUSTRATIONS section' },
  { id: 'reading', label: 'Further reading', ask: 'the CROSS-REFERENCES section and the GO DEEPER section' },
  { id: 'full', label: 'Full brief', ask: 'the full brief, every section that applies' },
];

// The message sent when a tab is tapped. It repeats the question so the server
// can still find the passage and ground the classic commentaries.
export function moreRequest(tab, question) {
  const about = question ? `About my question ("${String(question).slice(0, 400)}"): ` : '';
  if (tab.voice) {
    return `${about}tell me what ${tab.voice} says on this, and nothing else. Name the specific work. Give the reasoning, not just the conclusion, in 120 to 220 words. If you are not certain ${tab.voice} addressed this, say so plainly in one sentence instead of guessing. Do not repeat your earlier answer. No VOICES line.`;
  }
  if (tab.id === 'full') return `${about}give me ${tab.ask}, in full depth. No VOICES line.`;
  return `${about}give me only ${tab.ask}. Keep it tight: only what bears on this question, about 250 to 400 words. Do not repeat your earlier answer. No VOICES line.`;
}
