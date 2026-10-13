import { test } from 'node:test';
import assert from 'node:assert/strict';
import { splitVoices, moreRequest, MORE_KINDS } from '../src/lib/researchMore.js';

test('the voices line is taken off the answer and becomes tabs', () => {
  const r = splitVoices('Thomas is met, not shamed.\n\nVOICES: Calvin | N.T. Wright | Augustine');
  assert.equal(r.body, 'Thomas is met, not shamed.');
  assert.deepEqual(r.voices, ['Calvin', 'N.T. Wright', 'Augustine']);
});

test('odd voices lines are cleaned up', () => {
  assert.deepEqual(splitVoices('A.\nVOICES: **Calvin** | calvin |  | Wesley | Stott | Keener | Carson').voices, ['Calvin', 'Wesley', 'Stott', 'Keener']);
  assert.deepEqual(splitVoices('A.\nVOICES: none').voices, []);
  assert.deepEqual(splitVoices('A.\nVOICES:').voices, []);
  assert.equal(splitVoices('A.\nVOICES:').body, 'A.');
});

test('an answer without the line is left alone', () => {
  assert.deepEqual(splitVoices('Just an answer.'), { body: 'Just an answer.', voices: [] });
  assert.equal(splitVoices('He hears many VOICES: prophets | kings\nand more after.').body, 'He hears many VOICES: prophets | kings\nand more after.');
  assert.equal(splitVoices('').body, '');
});

test('a half-arrived line never flashes on screen while streaming', () => {
  assert.equal(splitVoices('The answer.\n\nVOI').body, 'The answer.');
  assert.equal(splitVoices('The answer.\n\nVOICES: Cal').body, 'The answer.');
  assert.equal(splitVoices('Ends with a V\nV').body, 'Ends with a V');
});

test('a tab request repeats the question and asks for one thing', () => {
  const q = 'John 20:24-29, is Jesus rebuking Thomas?';
  assert.match(moreRequest({ voice: 'Calvin' }, q), /John 20:24-29.*what Calvin says/s);
  assert.match(moreRequest(MORE_KINDS[0], q), /only the ORIGINAL LANGUAGE section/);
  assert.ok(MORE_KINDS.every((k) => k.id && k.label && k.ask));
});
