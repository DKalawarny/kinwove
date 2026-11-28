import { test } from 'node:test';
import assert from 'node:assert/strict';
import { guideShort } from '../content/youtube.js';
import { renderStudyGuidePage, BOOKS } from '../content/bible.js';

const ROM = BOOKS.find((b) => b.code === 'ROM');

test('a Short shows only once YouTube has made it public', () => {
  assert.equal(guideShort('ROM', 8, Date.parse('2026-11-28T15:59:00Z')), null);
  assert.equal(guideShort('ROM', 8, Date.parse('2026-11-28T16:00:00Z')).id, '-5kWwj1yxIY');
  assert.equal(guideShort('ROM', 9, Date.parse('2030-01-01T00:00:00Z')), null);
});

test('the guide page embeds its own Short when public, the general video before', () => {
  const real = Date.now;
  try {
    Date.now = () => Date.parse('2026-11-27T12:00:00Z');
    let html = renderStudyGuidePage(ROM, 8);
    assert.ok(html.includes('small-group-720.mp4') && !html.includes('youtube-nocookie.com/embed/-5kWwj1yxIY'));
    Date.now = () => Date.parse('2026-11-29T12:00:00Z');
    html = renderStudyGuidePage(ROM, 8);
    assert.ok(html.includes('youtube-nocookie.com/embed/-5kWwj1yxIY'));
    assert.ok(html.includes('"embedUrl":"https://www.youtube.com/embed/-5kWwj1yxIY"') || html.includes('youtube.com/embed/-5kWwj1yxIY'));
    assert.ok(!html.includes('small-group-720.mp4'));
    html = renderStudyGuidePage(ROM, 12);
    assert.ok(html.includes('small-group-720.mp4'));
  } finally { Date.now = real; }
});
