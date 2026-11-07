import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sermonLabel } from '../src/lib/sermonLabel.js';

test('this week only while it is this week', () => {
  const now = new Date('2026-11-07T12:00:00');
  assert.equal(sermonLabel('2026-11-02', now), "This week's sermon");
  assert.equal(sermonLabel('2026-11-09', now), "This week's sermon");
  assert.match(sermonLabel('2026-07-27', now), /^Sermon · /);
  assert.match(sermonLabel('2025-07-27', now), /2025/);
  assert.equal(sermonLabel(null, now), "This week's sermon");
});
