import { test } from 'node:test';
import assert from 'node:assert';
import { missingEmails } from '../src/emailWatch.js';

const H = 3600 * 1000;
const from = '2026-11-11T17:30:00Z';
const start = new Date(from).getTime();
const person = (id, hoursOld, extra = {}) => ({ id, created_at: new Date(now - hoursOld * H).toISOString(), is_pastor: false, email_opt_out: false, ...extra });
let now;

test('a welcome that went out is not flagged; one that did not is', () => {
  now = start + 10 * H;
  const profiles = [person('a', 3), person('b', 3)];
  const out = missingEmails({ profiles, sent: new Set(['a|welcome']), now, from });
  assert.deepStrictEqual(out.map((m) => `${m.user_id}|${m.kind}`), ['b|welcome']);
});

test('the welcome gets an hour before it counts as missing', () => {
  now = start + 10 * H;
  assert.strictEqual(missingEmails({ profiles: [person('a', 0.5)], sent: new Set(), now, from }).length, 0);
});

test('nothing due before logging started is checked', () => {
  now = start + 2 * H;
  assert.strictEqual(missingEmails({ profiles: [person('a', 5)], sent: new Set(), now, from }).length, 0);
});

test('day 2 email: waits for the daily run, then flags', () => {
  now = start + 200 * H;
  const sent = new Set(['a|welcome', 'b|welcome']);
  assert.strictEqual(missingEmails({ profiles: [person('a', 60)], sent, now, from }).length, 0);
  assert.deepStrictEqual(missingEmails({ profiles: [person('b', 80)], sent, now, from }).map((m) => m.kind), ['welcome-invite']);
});

test('opted out of email: drip not expected, welcome still is', () => {
  now = start + 300 * H;
  const out = missingEmails({ profiles: [person('a', 150, { email_opt_out: true })], sent: new Set(), now, from });
  assert.deepStrictEqual(out.map((m) => m.kind), ['welcome']);
});

test('pastors get the pastor email, not the seeker ones', () => {
  now = start + 300 * H;
  const out = missingEmails({ profiles: [person('p', 150, { is_pastor: true })], sent: new Set(['p|welcome']), now, from });
  assert.deepStrictEqual(out.map((m) => m.kind), ['welcome-pastor']);
});

test('everyone fully emailed: nothing flagged', () => {
  now = start + 300 * H;
  const sent = new Set(['a|welcome', 'a|welcome-invite', 'a|welcome-bible']);
  assert.strictEqual(missingEmails({ profiles: [person('a', 150)], sent, now, from }).length, 0);
});
