// "This week's sermon" only while it is this week's; older ones say when they were.
export function sermonLabel(date, now = new Date()) {
  if (!date) return "This week's sermon";
  const d = new Date(/^\d{4}-\d{2}-\d{2}$/.test(date) ? `${date}T00:00:00` : date);
  if (Number.isNaN(d.getTime())) return "This week's sermon";
  if (now - d < 7 * 86400000) return "This week's sermon";
  const opts = { month: 'short', day: 'numeric', ...(d.getFullYear() !== now.getFullYear() ? { year: 'numeric' } : {}) };
  return `Sermon · ${d.toLocaleDateString(undefined, opts)}`;
}
