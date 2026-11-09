import { test } from 'node:test';
import assert from 'node:assert';
import { LOOKS_BACKWARD, ASKS_TO_SAVE } from '../src/recallTriggers.js';

// Real messages from kinwove users, plus the phrasings they stand for.
test('questions that reach back to an earlier conversation', () => {
  for (const q of [
    'do you rememebr what i asked about romans', // AT, 8 Nov 2026
    'do you remember what i asked about romans',
    'do u remember our study',
    'what did we talk about last time',
    'you said something about grace yesterday',
    'can we pick up where we left off',
    'what was it I asked you about Paul',
  ]) assert.ok(LOOKS_BACKWARD.test(q), q);
});

test('ordinary questions do not trigger a look back', () => {
  for (const q of [
    'what is Lent',
    'walk me through Romans 1:1-17',
    'should we do chapter 2 today',
    'give me the backstory of Romans',
  ]) assert.ok(!LOOKS_BACKWARD.test(q), q);
});

test('asking to save the conversation', () => {
  for (const q of [
    'ok thanks. can you save this conversation for next time', // AT, 8 Nov 2026
    'can you save this',
    'will you remember this next week',
    'keep this chat please',
  ]) assert.ok(ASKS_TO_SAVE.test(q), q);
  for (const q of ['ok thanks', 'how does God save us', 'what does it mean to keep the sabbath'])
    assert.ok(!ASKS_TO_SAVE.test(q), q);
});
