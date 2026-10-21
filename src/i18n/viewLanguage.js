import { useEffect, useState, useSyncExternalStore } from 'react';
import { LANGUAGES } from '../languages.js';
import { STRINGS_EN } from './strings.en.js';

// The language someone is READING in. One value, shared by the landing page,
// the language menu, "See translation" and the guest ask box. Signed in, App
// keeps it equal to profiles.preferred_language (the language Ask answers in),
// so there is never a second setting to disagree with the first.
//
// Stored per device ('kw:lang'), not per user: it is a display preference like
// a cookie-banner choice, holds nothing a person wrote, and someone reading on
// a friend's phone should get the friend's language back when they hand it over.
const KEY = 'kw:lang';
const CODES = new Set(LANGUAGES.map((l) => l.code));

// Browser tags → our codes. Chinese needs the script, not just "zh".
export function matchLanguage(tag) {
  if (!tag) return null;
  const t = String(tag).toLowerCase();
  if (t === 'zh-tw' || t === 'zh-hant' || t.startsWith('zh-hant-') || t === 'zh-mo') return 'zh-TW';
  if (t === 'zh-hk') return 'yue';
  if (t === 'fil') return 'tl';
  if (CODES.has(tag)) return tag;
  const base = t.split('-')[0];
  return CODES.has(base) ? base : null;
}

function initial() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved && CODES.has(saved)) return saved;
  } catch {}
  const tags = typeof navigator !== 'undefined' ? (navigator.languages?.length ? navigator.languages : [navigator.language]) : [];
  for (const tag of tags) {
    const m = matchLanguage(tag);
    if (m) return m;
  }
  return 'en';
}

let current = typeof window !== 'undefined' ? initial() : 'en';
const listeners = new Set();

export const getViewLang = () => current;

export function setViewLang(code) {
  if (!CODES.has(code) || code === current) return;
  current = code;
  try { localStorage.setItem(KEY, code); } catch {}
  listeners.forEach((fn) => fn());
}

export function useViewLang() {
  return useSyncExternalStore(
    (fn) => { listeners.add(fn); return () => listeners.delete(fn); },
    getViewLang,
    () => 'en',
  );
}

// Translated strings, loaded only for the language in use. English is the
// source and never waits; any key a translation lacks falls back to English.
const files = import.meta.glob('./*.json');
const loaded = { en: STRINGS_EN };

export function useStrings() {
  const lang = useViewLang();
  const [, bump] = useState(0);
  useEffect(() => {
    if (loaded[lang] || !files[`./${lang}.json`]) return;
    let live = true;
    files[`./${lang}.json`]().then((m) => {
      loaded[lang] = { ...STRINGS_EN, ...(m.default ?? m) };
      if (live) bump((n) => n + 1);
    }, () => {});
    return () => { live = false; };
  }, [lang]);
  const s = loaded[lang] ?? STRINGS_EN;
  // `translated` is false while a language is still loading or has no file, so
  // the page never claims a translation it is not showing.
  return { s, lang, translated: lang !== 'en' && !!loaded[lang] };
}
