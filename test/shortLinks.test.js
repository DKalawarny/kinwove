import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveShortLink } from '../content/bible.js';

test('a short link goes to the chapter study guide, tagged as YouTube', () => {
  assert.equal(resolveShortLink('/romans8'), 'https://www.kinwove.com/bible/romans-8-study-guide?utm_source=youtube&utm_medium=short&utm_campaign=romans8');
  assert.match(resolveShortLink('/John3'), /\/bible\/john-3-study-guide\?/);
  assert.match(resolveShortLink('/1corinthians13'), /\/bible\/1-corinthians-13-study-guide\?.*campaign=1corinthians13$/);
});

test('anything that is not a real book and chapter is left alone', () => {
  for (const p of ['/romans99', '/romans0', '/answers', '/icon192', '/foo3', '/romans-8', '/']) assert.equal(resolveShortLink(p), null, p);
});
