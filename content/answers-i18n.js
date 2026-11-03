// Spanish and Portuguese answer pages, served at /es/answers/<slug> and /pt/answers/<slug>
// by the same route and renderer as the Farsi pages. Translations live in
// content/translations/<lang>/answers/<slug>.json (Nov 2026 job: Haiku 5.5
// translate, Sonnet 5.5 check). Loading also adds the language to the English
// entry's `translations`, which gives both pages their hreflang pair.
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ANSWERS } from './answers.js';

const TR_DIR = join(dirname(fileURLToPath(import.meta.url)), 'translations');

const NOTICE = {
  es: {
    lines: [
      'Esta página fue traducida del inglés con ayuda de IA y revisada por una segunda IA, pero todavía no por un hablante nativo. Puede haber errores.',
      'Las citas bíblicas de esta página están traducidas del inglés, no tomadas de una Biblia en español reconocida.',
    ],
    linkLabel: 'Leer el original en inglés',
  },
  pt: {
    lines: [
      'Esta página foi traduzida do inglês com ajuda de IA e revisada por uma segunda IA, mas ainda não por um falante nativo. Pode haver erros.',
      'As citações bíblicas desta página foram traduzidas do inglês, não tiradas de uma Bíblia em português reconhecida.',
    ],
    linkLabel: 'Ler o original em inglês',
  },
};

function build(lang) {
  const out = {};
  for (const a of ANSWERS) {
    const f = join(TR_DIR, lang, 'answers', `${a.slug}.json`);
    if (!existsSync(f)) continue;
    const t = JSON.parse(readFileSync(f, 'utf8'));
    out[a.slug] = {
      ...t, slug: a.slug, lang, dir: 'ltr', updated: a.updated,
      related: [], notice: NOTICE[lang], source: a.slug,
    };
    a.translations = [...new Set([...(a.translations ?? []), lang])];
  }
  return out;
}

export const ANSWERS_ES_BY_SLUG = build('es');
export const ANSWERS_PT_BY_SLUG = build('pt');
