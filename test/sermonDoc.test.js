import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mdToHtml, section, joinSections, escHtml } from '../src/lib/sermonDoc.js';

test('markdown shapes from a research answer become rich text', () => {
  assert.equal(mdToHtml('## The Passage'), '<h3>The Passage</h3>');
  assert.equal(mdToHtml('── THE REAL DEBATES ──'), '<h3>THE REAL DEBATES</h3>');
  assert.equal(mdToHtml('**Position A.** It is a *gentle* rebuke.'), '<p><b>Position A.</b> It is a <i>gentle</i> rebuke.</p>');
  assert.equal(mdToHtml('- one\n- two'), '<ul><li>one</li><li>two</li></ul>');
  assert.match(mdToHtml('> "Now Thomas was not with them."'), /^<blockquote[^>]*>"Now Thomas was not with them\."<\/blockquote>$/);
  assert.equal(mdToHtml('first\n\n---\n\nsecond'), '<p>first</p><p>second</p>');
});

test('a pipe table becomes a real table', () => {
  const html = mdToHtml('| Scholar | Reading |\n|---|---|\n| Carson | Mild rebuke |');
  assert.match(html, /^<table/);
  assert.match(html, /<th[^>]*>Scholar<\/th>/);
  assert.match(html, /<td[^>]*>Mild rebuke<\/td>/);
});

test('angle brackets in AI text can never become tags', () => {
  const html = mdToHtml('Use <script>alert(1)</script> and **<b onmouseover=x>bold</b>**');
  assert.ok(!/<script/i.test(html));
  assert.ok(!/onmouseover=x>/.test(html.replace(/&lt;b onmouseover=x&gt;/g, '')));
  assert.equal(escHtml('<a href="x">'), '&lt;a href="x"&gt;');
});

test('things that are not markdown are left as plain paragraphs', () => {
  assert.equal(mdToHtml('2 * 3 * 4 = 24'), '<p>2 * 3 * 4 = 24</p>');
  assert.equal(mdToHtml('a | b | c'), '<p>a | b | c</p>');
  assert.equal(mdToHtml('line one\nline two'), '<p>line one<br>line two</p>');
  assert.equal(mdToHtml(''), '');
});

test('sections are built for each kind of save', () => {
  assert.equal(section.clip('He came back.'), '<p>He came back.</p>');
  assert.match(section.verse('John 20:27', 'Put your finger here', 'He offers it.'), /^<h2>John 20:27<\/h2><blockquote[^>]*>Put your finger here<\/blockquote><p>He offers it\.<\/p>$/);
  assert.equal(section.own('The big idea', 'He came back.'), '<h2>The big idea</h2><p>He came back.</p>');
  assert.equal(section.answer('Why?', 'Because.'), '<h2>Why?</h2><p>Because.</p>');
});

test('appending keeps what is there, and upgrades an old plain-text body', () => {
  assert.equal(joinSections('', '<p>new</p>'), '<p>new</p>');
  assert.equal(joinSections('<p>old</p>', '<p>new</p>'), '<p>old</p><p><br></p><p>new</p>');
  assert.equal(joinSections('old line & more\nsecond', '<p>new</p>'), 'old line &amp; more<br>second<p><br></p><p>new</p>');
});
