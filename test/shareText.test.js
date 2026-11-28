import { test } from 'node:test';
import assert from 'node:assert/strict';
import { shareText } from '../src/lib/shareText.js';

test('bold, italics and headings lose their marks', () => {
  const md = '### Start with why\n\n**Now read Romans 8:1-11 together** (the *core* promise)';
  assert.equal(shareText(md), 'Start with why\n\nNow read Romans 8:1-11 together (the core promise)');
});

test('list dashes become bullets and numbered lists stay', () => {
  assert.equal(shareText('- one\n- two\n1. first'), '• one\n• two\n1. first');
});

test('dividers, quotes, fences and links read cleanly', () => {
  const md = '> "There is now no condemnation"\n\n---\n\n```\nplan\n```\n\nSee [the guide](https://www.kinwove.com/bible/romans-8-study-guide)';
  assert.equal(shareText(md), '"There is now no condemnation"\n\nplan\n\nSee the guide (https://www.kinwove.com/bible/romans-8-study-guide)');
});

test('dashes follow the no-dash rule, verse ranges and maths are kept', () => {
  const out = shareText('Not theologically — personally. Read 8:1–11. 2 * 3 * 4 = 24');
  assert.ok(!out.includes('—'), out);
  assert.ok(out.includes('8:1–11'), out);
  assert.ok(out.includes('2 * 3 * 4'), out);
});

test('a share link and plain text pass through untouched', () => {
  const s = 'Start With Why Paul Even Wrote This\n\nHello there.\n\nhttps://www.kinwove.com?s=2i3tcsy';
  assert.equal(shareText(s), s);
});
