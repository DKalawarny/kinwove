import { test } from 'node:test';
import assert from 'node:assert/strict';
import { tokenizeInline, parseTable } from '../src/lib/inlineMarks.js';

const kinds = (s, italics = true) => tokenizeInline(s, italics).map((p) => `${p.t}:${p.v}`);

test('italic spans render, asterisks gone', () => {
  assert.deepEqual(kinds('It means *unbelieving*, even *faithless*.'), [
    'text:It means ', 'italic:unbelieving', 'text:, even ', 'italic:faithless', 'text:.',
  ]);
  assert.deepEqual(kinds('*(mē ginou apistos alla pistos)*'), ['italic:(mē ginou apistos alla pistos)']);
  assert.deepEqual(kinds(`*"Now Thomas, one of the twelve, said, 'I will never believe.'"* `), [
    `italic:"Now Thomas, one of the twelve, said, 'I will never believe.'"`, 'text: ',
  ]);
});

test('bold still works and wins over italic', () => {
  assert.deepEqual(kinds('**Position A.** It is a *gentle* rebuke.'), [
    'bold:Position A.', 'text: It is a ', 'italic:gentle', 'text: rebuke.',
  ]);
});

test('things that are not italics are left alone', () => {
  for (const s of ['2 * 3 * 4', '5*3*2', '* first point\n* second point', 'a footnote* here', 'price is 3 * the cost*']) {
    assert.deepEqual(kinds(s), [`text:${s}`], s);
  }
});

test('italics are off unless asked for', () => {
  assert.deepEqual(kinds('so *very* glad', false), ['text:so *very* glad']);
});

test('italic inside bold loses its asterisks too', () => {
  assert.deepEqual(kinds('**2. What does *mē ginou* (v.27) mean?**'), [
    'bold:2. What does ', 'bolditalic:mē ginou', 'bold: (v.27) mean?',
  ]);
});

test('a pipe table is parsed into rows', () => {
  const t = parseTable('V. 27b:\n| Translation | Rendering |\n|---|---|\n| ESV | "Do not be unbelieving" |\n| NIV | "Stop doubting" |');
  assert.equal(t.before, 'V. 27b:');
  assert.deepEqual(t.rows, [['Translation', 'Rendering'], ['ESV', '"Do not be unbelieving"'], ['NIV', '"Stop doubting"']]);
});

test('text that only looks a bit like a table is not one', () => {
  for (const s of ['a | b | c', '| just one line |', '| a | b |\n| c | d |', 'Either A | or B\n---\nnext', '| a | b |\n|---|---|\nthen prose']) {
    assert.equal(parseTable(s), null, s);
  }
});
