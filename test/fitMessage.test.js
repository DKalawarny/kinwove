import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fitMessage, DM_MAX } from '../src/lib/fitMessage.js';

const URL = 'https://www.kinwove.com?s=abc1234';
const para = (n) => `Paragraph ${n}. ` + 'Paul says there is now no condemnation for those in Christ. '.repeat(6);

test('a short share is sent whole', () => {
  assert.equal(fitMessage('Heading', 'Short answer.', URL), `Heading\n\nShort answer.\n\n${URL}`);
});

test('a long answer fits the limit and keeps heading and link', () => {
  const text = Array.from({ length: 12 }, (_, i) => para(i + 1)).join('\n\n');
  const out = fitMessage('The Trap That Makes Grace Real', text, URL);
  assert.ok(text.length > DM_MAX);
  assert.ok(out.length <= DM_MAX, `length ${out.length}`);
  assert.ok(out.startsWith('The Trap That Makes Grace Real\n\nParagraph 1.'));
  assert.ok(out.endsWith(`in Christ.\n\nRead the rest: ${URL}`), 'ends on a whole paragraph, link labelled');
  assert.ok(!out.includes('.…'));
});

test('no link yet and no heading still fits', () => {
  const out = fitMessage('', 'word '.repeat(1000), '');
  assert.ok(out.length <= DM_MAX);
  assert.ok(out.endsWith('word…'));
});

test('one huge paragraph is cut at a sentence', () => {
  const out = fitMessage('H', 'This is a sentence. '.repeat(200), URL);
  assert.ok(out.length <= DM_MAX);
  assert.ok(out.endsWith(`This is a sentence.\n\nRead the rest: ${URL}`));
});
