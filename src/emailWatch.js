// Which emails should have gone out by now and have no record in email_log.
// /api/health/emails runs this; .github/workflows/email-watch.yml fails (and
// GitHub emails Daniel) when it returns anything.
//
// Each check names when the email is due after the person finished setup
// (profiles.created_at) and how long to allow before calling it missing.
// The welcome sequence cron runs once a day at 14:00 UTC over a 24 h window,
// so its emails can arrive up to a day after they first become due.
const H = 3600 * 1000;
export const EMAIL_CHECKS = [
  { kind: 'welcome',        dueAfter: 0,       grace: 1 * H,  who: () => true,               what: 'welcome email after setup' },
  { kind: 'welcome-invite', dueAfter: 48 * H,  grace: 26 * H, who: (p) => !p.is_pastor,      what: 'day 2 email (invite a friend)', optIn: true },
  { kind: 'welcome-pastor', dueAfter: 72 * H,  grace: 26 * H, who: (p) => !!p.is_pastor,     what: 'day 3 email (sermon tools, pastors)', optIn: true },
  { kind: 'welcome-bible',  dueAfter: 120 * H, grace: 26 * H, who: (p) => !p.is_pastor,      what: 'day 5 email (the Bible with Ask)', optIn: true },
];

// profiles: [{ id, created_at, is_pastor, email_opt_out }] (internal and
// system accounts already removed). sent: Set of `${user_id}|${kind}` for
// every ok row. from: when logging started; nothing due before it is checked.
export function missingEmails({ profiles, sent, now, from }) {
  const fromMs = new Date(from).getTime();
  const out = [];
  for (const p of profiles) {
    const made = new Date(p.created_at).getTime();
    for (const c of EMAIL_CHECKS) {
      if (!c.who(p) || (c.optIn && p.email_opt_out)) continue;
      const due = made + c.dueAfter;
      if (due < fromMs || now < due + c.grace) continue;
      if (!sent.has(`${p.id}|${c.kind}`)) out.push({ user_id: p.id, kind: c.kind, what: c.what, due: new Date(due).toISOString() });
    }
  }
  return out;
}
