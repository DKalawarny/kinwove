import { test } from 'node:test';
import assert from 'node:assert/strict';
import { plainDashes } from '../src/lib/plainDashes.js';

// Known-bad: the real Ask answer from 27 Nov that came out as "verse-by-verse:, 8:1-11".
const REAL = "**Work through the chapter in chunks, not verse-by-verse:**\n\n- 8:1-11 (the Spirit living in you) — what does it feel like when someone believes you can change?\n- 8:28-30 (all things work together for good) — pause here.";

test('bullet lists keep their bullets and line breaks', () => {
  const out = plainDashes(REAL);
  assert.equal(out.split('\n').length, REAL.split('\n').length);
  assert.match(out, /\n- 8:1-11 \(the Spirit living in you\)/);
  assert.match(out, /\n- 8:28-30 \(all things/);
  assert.doesNotMatch(out, /:,|\?,/);
  assert.doesNotMatch(out, /[—–]/);
});

test('indented and numbered list markers are kept', () => {
  assert.equal(plainDashes('  - one thing — and another'), '  - one thing, and another');
  assert.equal(plainDashes('1. Read it — then wait.'), '1. Read it, then wait.');
  assert.equal(plainDashes('* a\n* b'), '* a\n* b');
});

// Known-good: behaviour on single lines is unchanged.
test('single-line behaviour unchanged', () => {
  assert.equal(plainDashes('Romans 5–8 is the heart.'), 'Romans 5–8 is the heart.');
  assert.equal(plainDashes('Grace — not effort — saves.'), 'Grace, not effort, saves.');
  assert.equal(plainDashes('-'), '-');
  assert.equal(plainDashes('no dashes here'), 'no dashes here');
});

test('a dash on one line never pairs with a dash on the next', () => {
  const out = plainDashes('First point — it matters\nSecond — and this too');
  assert.equal(out.split('\n').length, 2);
});
