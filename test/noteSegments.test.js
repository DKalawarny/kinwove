import { test } from 'node:test';
import assert from 'node:assert/strict';
import { noteSegments } from '../src/lib/inlineMarks.js';

const shown = (segs) => segs.filter((p) => !p.hide).map((p) => p.v).join('');
const all = (segs) => segs.map((p) => p.v).join('');

test('bold markers hidden but kept, so highlight offsets still line up', () => {
  const s = 'Grace is **not earned**, it is given.';
  const segs = noteSegments(s);
  assert.equal(all(segs), s);
  assert.equal(shown(segs), 'Grace is not earned, it is given.');
  assert.ok(segs.find((p) => p.v === 'not earned').bold);
});

test('highlight crossing a bold edge keeps both', () => {
  const s = 'a **bold** tail';
  const segs = noteSegments(s, [[5, 14]]);
  assert.equal(all(segs), s);
  assert.ok(segs.some((p) => p.bold && p.hl && p.v === 'old'));
  assert.ok(segs.some((p) => !p.bold && p.hl && p.v === ' tai'));
});

test('italics only when asked, and arithmetic or bullets are left alone', () => {
  assert.equal(noteSegments('the *agape* love').some((p) => p.italic), false);
  assert.ok(noteSegments('the *agape* love', [], true).some((p) => p.italic && p.v === 'agape'));
  const plain = '* first point\n2 * 3 * 4';
  assert.equal(shown(noteSegments(plain, [], true)), plain);
});

test('unpaired asterisks show as typed', () => {
  assert.equal(shown(noteSegments('rated 5** out of')), 'rated 5** out of');
});
