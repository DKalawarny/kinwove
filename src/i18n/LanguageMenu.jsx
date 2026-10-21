import { useEffect, useMemo, useRef, useState } from 'react';
import { T } from '../theme.js';
import { LANGUAGES } from '../languages.js';
import { useStrings } from './viewLanguage.js';

function Globe({ size = 15, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" />
      <path d="M2.5 12h19M12 2.5c2.6 2.7 3.9 5.9 3.9 9.5s-1.3 6.8-3.9 9.5M12 2.5C9.4 5.2 8.1 8.4 8.1 12s1.3 6.8 3.9 9.5" />
    </svg>
  );
}

// Each language is listed in its own name first, so a Spanish speaker finds
// "Español" without reading English. `tone` matches where the button sits:
// 'dark' over the landing hero, 'light' on the app's cream headers.
export default function LanguageMenu({ value, onChange, tone = 'light', compact = false }) {
  const { s } = useStrings();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const box = useRef(null);
  const current = LANGUAGES.find((l) => l.code === value) ?? LANGUAGES[0];
  const fg = tone === 'dark' ? 'rgba(253,248,240,0.88)' : T.inkSoft;

  useEffect(() => {
    if (!open) return;
    const away = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false); };
    const esc = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('pointerdown', away);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('pointerdown', away); document.removeEventListener('keydown', esc); };
  }, [open]);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return LANGUAGES;
    return LANGUAGES.filter((l) => l.native.toLowerCase().includes(needle) || l.label.toLowerCase().includes(needle) || l.code.toLowerCase() === needle);
  }, [q]);

  const pick = (code) => { setOpen(false); setQ(''); if (code !== value) onChange(code); };
  const wideScreen = typeof window !== 'undefined' && window.innerWidth >= 700;

  return (
    <div ref={box} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox" aria-expanded={open} aria-label={`${s.language}: ${current.native}`}
        style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: fg, cursor: 'pointer', padding: '8px 4px', whiteSpace: 'nowrap', fontSize: 13.5, fontFamily: T.sans, textShadow: tone === 'dark' ? '0 1px 8px rgba(0,0,0,0.5)' : 'none' }}
      >
        <Globe color={fg} size={compact ? 18 : 15} />
        {!compact && <span dir="auto">{current.native}</span>}
      </button>
      {open && (
        <div role="listbox" aria-label={s.language}
          style={{ position: 'absolute', top: '100%', right: 0, marginTop: 6, width: 270, maxWidth: 'calc(100vw - 32px)', background: T.cream, border: '1px solid rgba(26,17,10,0.12)', borderRadius: 14, boxShadow: '0 18px 50px rgba(0,0,0,0.35)', zIndex: 600, overflow: 'hidden', textShadow: 'none' }}>
          <div style={{ padding: 10, borderBottom: '1px solid rgba(26,17,10,0.08)' }}>
            <input
              value={q} onChange={(e) => setQ(e.target.value)} autoFocus={wideScreen}
              placeholder={s.searchLanguages} aria-label={s.searchLanguages}
              style={{ width: '100%', boxSizing: 'border-box', border: '1px solid rgba(26,17,10,0.15)', borderRadius: 10, padding: '9px 12px', fontSize: 14, fontFamily: T.sans, background: T.white, color: T.ink, outline: 'none' }}
            />
          </div>
          <div style={{ maxHeight: 'min(380px, 60vh)', overflowY: 'auto', padding: '4px 0' }}>
            {list.map((l) => {
              const on = l.code === value;
              return (
                <button key={l.code} role="option" aria-selected={on} onClick={() => pick(l.code)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, width: '100%', textAlign: 'left', background: on ? 'rgba(184,115,58,0.12)' : 'none', border: 'none', padding: '9px 14px', cursor: 'pointer', fontFamily: T.sans }}>
                  <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                    <span dir="auto" style={{ fontSize: 15, color: T.ink, fontWeight: on ? 600 : 500 }}>{l.native}</span>
                    {l.native !== l.label && <span style={{ fontSize: 12, color: T.inkMuted }}>{l.label}</span>}
                  </span>
                  {on && <span style={{ color: T.gold, fontSize: 14 }} aria-hidden="true">✓</span>}
                </button>
              );
            })}
            {list.length === 0 && <div style={{ padding: '12px 14px', fontSize: 13.5, color: T.inkMuted }}>—</div>}
          </div>
        </div>
      )}
    </div>
  );
}
