import { test } from 'node:test';
import assert from 'node:assert/strict';
import { splitScriptureRefs } from '../src/lib/scriptureLinks.js';

const refs = (t) => splitScriptureRefs(t).filter((p) => p.ref).map((p) => p.ref);

test('finds common references', () => {
  assert.deepEqual(refs('Read John 3:16 and 1 Cor 13:4-7 tonight.'), ['John 3:16', '1 Cor 13:4-7']);
  assert.deepEqual(refs('Song of Songs 2:1, Psalm 23:1 and Romans 8:28–30'), ['Song of Songs 2:1', 'Psalm 23:1', 'Romans 8:28–30']);
});

test('leaves times and unknown words alone', () => {
  assert.deepEqual(refs('Service at 10:30, Doors 9:45, At 3:30'), []);
});

test('keeps all the text in order', () => {
  const t = 'Before John 3:16 after';
  assert.equal(splitScriptureRefs(t).map((p) => p.text).join(''), t);
});
