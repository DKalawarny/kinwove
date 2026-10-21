import { useState } from 'react';
import { T } from '../theme.js';
import { authedFetch } from '../supabase.js';
import { RTL_LANGS } from '../languages.js';
import { useStrings } from './viewLanguage.js';

// "See translation" under something a person wrote: a post, a comment, a
// prayer. Shows only when the reader has picked a language other than English,
// so English readers see nothing new. The translation appears under the
// original (the original never disappears), Facebook style.
const cache = new Map(); // `${lang}\n${text}` → translation, for this page load

export default function SeeTranslation({ text, style }) {
  const { s, lang } = useStrings();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({ status: 'idle', text: '' });
  const body = typeof text === 'string' ? text.trim() : '';
  if (lang === 'en' || body.length < 2) return null;

  const key = `${lang}\n${body}`;
  const shown = cache.get(key) ?? (state.status === 'done' && state.lang === lang ? state.text : null);

  const toggle = async () => {
    if (open) { setOpen(false); return; }
    setOpen(true);
    if (cache.has(key)) return;
    setState({ status: 'loading', text: '' });
    try {
      const r = await authedFetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: body, target: lang }),
      });
      if (!r.ok) throw new Error(String(r.status));
      const { translation } = await r.json();
      cache.set(key, translation);
      setState({ status: 'done', text: translation, lang });
    } catch {
      setState({ status: 'error', text: '' });
    }
  };

  return (
    <div style={{ marginTop: 6, ...style }}>
      <button onClick={toggle}
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: 12.5, color: T.goldDark, fontFamily: T.sans, fontWeight: 600 }}>
        {open ? s.showOriginal : s.seeTranslation}
      </button>
      {open && (
        <div dir={RTL_LANGS.has(lang) ? 'rtl' : 'auto'}
          style={{ marginTop: 6, paddingLeft: 10, borderLeft: `2px solid rgba(184,115,58,0.35)`, fontFamily: T.display, fontSize: 15.5, lineHeight: 1.55, color: T.ink, whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
          {shown ?? (state.status === 'error'
            ? <span style={{ fontSize: 13, color: T.inkMuted, fontFamily: T.sans }}>{s.translateFailed}</span>
            : <span style={{ fontSize: 13, color: T.inkMuted, fontFamily: T.sans }}>{s.translating}</span>)}
        </div>
      )}
    </div>
  );
}
