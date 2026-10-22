import { useEffect, useState } from 'react';
import { T } from './theme.js';
import { KinwoveStar } from './components/brand/KinwoveStar.jsx';

// kinwove's study notes: a plain-words explanation under every chapter and an
// introduction for every book. Written ahead of time by
// scripts/build-study-notes.mjs (from the text and two classic public-domain
// commentaries, then checked), and served as static files, so reading one is
// instant and never counts against anyone's Ask questions.
//
// A chapter with no file (or one held back for review) shows nothing at all.
// Unknown paths come back as the app's HTML page with a 200, so a response
// counts only if it parses as JSON with the expected shape.
const cache = new Map();
function useStudyFile(path, isValid) {
  const [data, setData] = useState(() => cache.get(path) ?? null);
  useEffect(() => {
    if (!path) return;
    if (cache.has(path)) { setData(cache.get(path)); return; }
    let live = true;
    setData(null);
    fetch(path).then((r) => (r.ok ? r.text() : null)).then((t) => {
      let j = null;
      try { j = t ? JSON.parse(t) : null; } catch {}
      const ok = j && isValid(j) ? j : null;
      cache.set(path, ok);
      if (live) setData(ok);
    }, () => {});
    return () => { live = false; };
  }, [path]);
  return data;
}

const isChapter = (j) => typeof j.title === 'string' && Array.isArray(j.parts);
const isIntro = (j) => typeof j.oneLine === 'string' && Array.isArray(j.outline);

export function useBookIntro(bookId) {
  return useStudyFile(bookId ? `/study/${bookId}/intro.json` : null, isIntro);
}

function Label({ children, C }) {
  return <div style={{ fontSize: 10.5, letterSpacing: '0.14em', fontWeight: 700, textTransform: 'uppercase', color: C.verse, margin: '18px 0 6px' }}>{children}</div>;
}

export function ChapterStudyNote({ bookId, chapter, bookName, verses, C, onAsk, onOpenIntro }) {
  const note = useStudyFile(`/study/${bookId}/${chapter}.json`, isChapter);
  if (!note) return null;
  const key = verses?.find((v) => v.number === note.keyVerse);
  return (
    <section aria-label={`${bookName} ${chapter} explained`}
      style={{ marginTop: 40, padding: '22px 20px 20px', background: C.card, border: `1px solid ${C.cardBorder}`, borderTop: `3px solid ${T.gold}`, borderRadius: 16, textAlign: 'left' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 11, letterSpacing: '0.14em', fontWeight: 700, textTransform: 'uppercase', color: C.verse }}>
        <KinwoveStar size={10} color={T.gold} /> {bookName} {chapter} in plain words
      </div>
      <h3 style={{ fontFamily: T.serif, fontSize: 21, fontWeight: 600, color: C.text, margin: '8px 0 6px', letterSpacing: '-0.015em', lineHeight: 1.25 }}>{note.title}</h3>
      <p style={{ fontFamily: T.serif, fontSize: 15.5, lineHeight: 1.65, color: C.text, opacity: 0.85, margin: 0 }}>{note.overview}</p>

      <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {note.parts.map((p) => (
          <div key={p.label}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{p.label}</div>
            <div style={{ fontFamily: T.serif, fontSize: 15, lineHeight: 1.6, color: C.text, opacity: 0.82, marginTop: 2 }}>{p.note}</div>
          </div>
        ))}
      </div>

      {key && (
        <>
          <Label C={C}>Key verse</Label>
          <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 15.5, lineHeight: 1.6, color: C.text, borderLeft: `3px solid ${T.gold}`, paddingLeft: 12 }}>
            “{key.text}” <span style={{ fontStyle: 'normal', fontSize: 12.5, color: C.muted }}>({chapter}:{key.number})</span>
          </div>
        </>
      )}

      {note.disagreement && (
        <>
          <Label C={C}>Where Christians differ</Label>
          <div style={{ fontFamily: T.serif, fontSize: 14.5, lineHeight: 1.6, color: C.text, opacity: 0.8 }}>{note.disagreement}</div>
        </>
      )}

      {note.think && (
        <>
          <Label C={C}>Something to think about</Label>
          <div style={{ fontFamily: T.serif, fontSize: 15.5, lineHeight: 1.6, color: C.text }}>{note.think}</div>
        </>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 18 }}>
        {onAsk && (
          <button onClick={onAsk} style={{ background: 'none', border: `1px solid ${C.border}`, borderRadius: 999, padding: '8px 14px', fontSize: 13, fontWeight: 600, color: C.verse, cursor: 'pointer' }}>
            Ask about this chapter
          </button>
        )}
        {onOpenIntro && (
          <button onClick={onOpenIntro} style={{ background: 'none', border: `1px solid ${C.border}`, borderRadius: 999, padding: '8px 14px', fontSize: 13, fontWeight: 600, color: C.verse, cursor: 'pointer' }}>
            About {bookName}
          </button>
        )}
      </div>
    </section>
  );
}

export function BookIntroSheet({ intro, bookName, C, onClose }) {
  useEffect(() => {
    const esc = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [onClose]);
  if (!intro) return null;
  const row = (label, text) => text && (
    <>
      <Label C={C}>{label}</Label>
      <div style={{ fontFamily: T.serif, fontSize: 15, lineHeight: 1.65, color: C.text, opacity: 0.85 }}>{text}</div>
    </>
  );
  return (
    <div role="dialog" aria-modal="true" aria-label={`About ${bookName}`} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(10,6,3,0.55)', zIndex: 450, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div style={{ background: C.bg, color: C.text, width: '100%', maxWidth: 640, maxHeight: '88vh', overflowY: 'auto', borderRadius: '20px 20px 0 0', padding: '22px 20px calc(28px + env(safe-area-inset-bottom, 0px))', boxShadow: '0 -10px 40px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.14em', fontWeight: 700, textTransform: 'uppercase', color: C.verse }}>About this book</div>
            <h2 style={{ fontFamily: T.serif, fontSize: 26, fontWeight: 600, margin: '6px 0 8px', letterSpacing: '-0.02em' }}>{bookName}</h2>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ background: 'none', border: 'none', fontSize: 20, color: C.muted, cursor: 'pointer', padding: 4 }}>✕</button>
        </div>
        <p style={{ fontFamily: T.serif, fontSize: 16.5, lineHeight: 1.6, margin: 0 }}>{intro.oneLine}</p>
        {row('Why it matters', intro.why)}
        {row('Who wrote it', intro.writtenBy)}
        {row('When', intro.when)}
        {row('First written for', intro.writtenTo)}
        {intro.themes?.length > 0 && (
          <>
            <Label C={C}>Big themes</Label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {intro.themes.map((t) => (
                <span key={t} style={{ fontSize: 13, padding: '5px 11px', borderRadius: 999, background: C.section, border: `1px solid ${C.border}`, color: C.text }}>{t}</span>
              ))}
            </div>
          </>
        )}
        <Label C={C}>How the book unfolds</Label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {intro.outline.map((o) => (
            <div key={o.label + o.chapters} style={{ display: 'flex', gap: 10, fontSize: 14.5, lineHeight: 1.5 }}>
              <span style={{ flexShrink: 0, minWidth: 64, color: C.muted, fontVariantNumeric: 'tabular-nums' }}>Ch. {o.chapters}</span>
              <span style={{ color: C.text }}>{o.label}</span>
            </div>
          ))}
        </div>
        {row('Reading tip', intro.readingTip)}
      </div>
    </div>
  );
}
