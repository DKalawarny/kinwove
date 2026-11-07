// Rough preaching time for sermon prep notes: words at an unhurried preaching
// pace. It reads the notes as written, so outlines come in under what gets preached.
export const PREACH_WPM = 130;

export function wordCount(html) {
  const text = String(html ?? '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/(p|div|li|h[1-6]|blockquote|td|th|tr)>/gi, ' ')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, 'x');
  return (text.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) ?? []).length;
}

export function preachMinutes(words) {
  return words / PREACH_WPM;
}

// "Under a minute", "About 1 min", "About 22 min", "About 1 hr 5 min"
export function preachLabel(words) {
  const m = Math.round(preachMinutes(words));
  if (words === 0) return '';
  if (m < 1) return 'Under a minute';
  if (m < 60) return `About ${m} min`;
  const h = Math.floor(m / 60), r = m % 60;
  return `About ${h} hr${r ? ` ${r} min` : ''}`;
}

export const TARGET_CHOICES = [10, 15, 20, 25, 30, 35, 40, 45, 50, 60];
