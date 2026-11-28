// kinwove's YouTube Shorts, one per study guide chapter. A guide page shows its chapter's
// Short once the Short is public (`at`, when YouTube publishes it); before that the
// embed would say "video unavailable", so the page keeps the general video.
export const YOUTUBE_CHANNEL = 'https://www.youtube.com/@kinwoveapp';
export const GUIDE_SHORTS = {
  ROM: {
    1: { id: 'Bwovbb2BPDE', at: '2026-11-29T16:00:00Z' },
    2: { id: 'BAlOU2caGfU', at: '2026-11-30T16:00:00Z' },
    3: { id: 'sj3TxxsNwy0', at: '2026-12-01T16:00:00Z' },
    4: { id: '7EZweWMc2ng', at: '2026-12-02T16:00:00Z' },
    5: { id: 'NGD5IrhmDQM', at: '2026-12-03T16:00:00Z' },
    6: { id: 'TW_0PhrSGP8', at: '2026-12-04T16:00:00Z' },
    7: { id: 'NDFXVx4o9uI', at: '2026-12-05T16:00:00Z' },
    8: { id: '-5kWwj1yxIY', at: '2026-11-28T16:00:00Z' },
  },
};
export function guideShort(code, n, now = Date.now()) {
  const s = GUIDE_SHORTS[code]?.[n];
  return s && Date.parse(s.at) <= now ? s : null;
}
