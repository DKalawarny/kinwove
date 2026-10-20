// A fetch that survives a dropped connection, for the nightly backups.
//
// 🔴 Why: the backups made hundreds of requests with no retry, so ONE blip
// ("fetch failed", or "terminated" mid-download) ended that half of the run
// and nothing after it was saved. From August to 19 Oct that happened on most
// days: the job runs at 9:30, often as the Mac wakes and Wi-Fi comes back.
//
// Retries network errors, 429 and 5xx, waiting 2s, 5s, 15s, then 30s. The
// body is read inside the retry, because "terminated" happens while reading.
// A 4xx is an answer, not a blip, so it comes straight back as ok: false.

const WAITS = [2000, 5000, 15000, 30000];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const short = url => url.replace(/^https?:\/\/[^/]+/, '').slice(0, 80);

export async function fetchRetry(url, opts = {}, read = 'json') {
  for (let attempt = 0; ; attempt++) {
    const last = attempt >= WAITS.length;
    try {
      const r = await fetch(url, { ...opts, signal: AbortSignal.timeout(120_000) });
      if (!last && (r.status === 429 || r.status >= 500)) throw new Error(`HTTP ${r.status}`);
      if (!r.ok) return { ok: false, status: r.status, body: null };
      const body = read === 'json' ? await r.json() : Buffer.from(await r.arrayBuffer());
      return { ok: true, status: r.status, body };
    } catch (e) {
      if (last) throw e;
      console.warn(`  ↻ ${short(url)}: ${e.message}, trying again (${attempt + 1}/${WAITS.length})`);
      await sleep(WAITS[attempt]);
    }
  }
}
