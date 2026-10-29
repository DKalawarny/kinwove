// Which daily backup folders to delete (Daniel, 29 Oct 2026): keep the newest
// 30 days, plus the FIRST backup of every month forever, so an old mistake can
// still be undone months later. A folder a day was ~1 GB a year with no limit.
//
// ⚠️ _storage is not a dated folder (it is one mirror, updated in place), so
// it never matches and is never touched.
import fs from 'node:fs';
import path from 'node:path';

export const KEEP_DAYS = 30;

export function toPrune(names, keepDays = KEEP_DAYS) {
  const days = names.filter((f) => /^\d{4}-\d{2}-\d{2}$/.test(f)).sort();
  const recent = new Set(days.slice(-keepDays));
  const firstOfMonth = new Set();
  const seen = new Set();
  for (const d of days) if (!seen.has(d.slice(0, 7))) { seen.add(d.slice(0, 7)); firstOfMonth.add(d); }
  return days.filter((d) => !recent.has(d) && !firstOfMonth.has(d));
}

export function prune(root) {
  const gone = toPrune(fs.readdirSync(root));
  for (const d of gone) fs.rmSync(path.join(root, d), { recursive: true, force: true });
  return gone;
}
