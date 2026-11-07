import { test } from 'node:test';
import assert from 'node:assert/strict';
import { wordCount, preachLabel } from '../src/lib/preachTime.js';

test('counts words across tags, breaks and entities', () => {
  assert.equal(wordCount('<h2>Grace</h2><p>Saved by&nbsp;grace<br>through faith.</p>'), 6);
  assert.equal(wordCount('<ul><li>One</li><li>two</li></ul>'), 2);
  assert.equal(wordCount("God's love isn't earned"), 4);
  assert.equal(wordCount(''), 0);
  assert.equal(wordCount(null), 0);
});

test('labels the time at a preaching pace', () => {
  assert.equal(preachLabel(0), '');
  assert.equal(preachLabel(40), 'Under a minute');
  assert.equal(preachLabel(130), 'About 1 min');
  assert.equal(preachLabel(2860), 'About 22 min');
  assert.equal(preachLabel(130 * 65), 'About 1 hr 5 min');
  assert.equal(preachLabel(130 * 60), 'About 1 hr');
});
