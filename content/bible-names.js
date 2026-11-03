// Bible book names and page labels for the translated Bible pages (/es/biblia, /pt/biblia).
export const BOOK_NAMES = {
  es: {
    GEN: 'Génesis', EXO: 'Éxodo', LEV: 'Levítico', NUM: 'Números', DEU: 'Deuteronomio', JOS: 'Josué', JDG: 'Jueces', RUT: 'Rut',
    '1SA': '1 Samuel', '2SA': '2 Samuel', '1KI': '1 Reyes', '2KI': '2 Reyes', '1CH': '1 Crónicas', '2CH': '2 Crónicas', EZR: 'Esdras',
    NEH: 'Nehemías', EST: 'Ester', JOB: 'Job', PSA: 'Salmos', PRO: 'Proverbios', ECC: 'Eclesiastés', SNG: 'Cantares', ISA: 'Isaías',
    JER: 'Jeremías', LAM: 'Lamentaciones', EZK: 'Ezequiel', DAN: 'Daniel', HOS: 'Oseas', JOL: 'Joel', AMO: 'Amós', OBA: 'Abdías',
    JON: 'Jonás', MIC: 'Miqueas', NAM: 'Nahúm', HAB: 'Habacuc', ZEP: 'Sofonías', HAG: 'Hageo', ZEC: 'Zacarías', MAL: 'Malaquías',
    MAT: 'Mateo', MRK: 'Marcos', LUK: 'Lucas', JHN: 'Juan', ACT: 'Hechos', ROM: 'Romanos', '1CO': '1 Corintios', '2CO': '2 Corintios',
    GAL: 'Gálatas', EPH: 'Efesios', PHP: 'Filipenses', COL: 'Colosenses', '1TH': '1 Tesalonicenses', '2TH': '2 Tesalonicenses',
    '1TI': '1 Timoteo', '2TI': '2 Timoteo', TIT: 'Tito', PHM: 'Filemón', HEB: 'Hebreos', JAS: 'Santiago', '1PE': '1 Pedro', '2PE': '2 Pedro',
    '1JN': '1 Juan', '2JN': '2 Juan', '3JN': '3 Juan', JUD: 'Judas', REV: 'Apocalipsis',
  },
  pt: {
    GEN: 'Gênesis', EXO: 'Êxodo', LEV: 'Levítico', NUM: 'Números', DEU: 'Deuteronômio', JOS: 'Josué', JDG: 'Juízes', RUT: 'Rute',
    '1SA': '1 Samuel', '2SA': '2 Samuel', '1KI': '1 Reis', '2KI': '2 Reis', '1CH': '1 Crônicas', '2CH': '2 Crônicas', EZR: 'Esdras',
    NEH: 'Neemias', EST: 'Ester', JOB: 'Jó', PSA: 'Salmos', PRO: 'Provérbios', ECC: 'Eclesiastes', SNG: 'Cânticos', ISA: 'Isaías',
    JER: 'Jeremias', LAM: 'Lamentações', EZK: 'Ezequiel', DAN: 'Daniel', HOS: 'Oseias', JOL: 'Joel', AMO: 'Amós', OBA: 'Obadias',
    JON: 'Jonas', MIC: 'Miqueias', NAM: 'Naum', HAB: 'Habacuque', ZEP: 'Sofonias', HAG: 'Ageu', ZEC: 'Zacarias', MAL: 'Malaquias',
    MAT: 'Mateus', MRK: 'Marcos', LUK: 'Lucas', JHN: 'João', ACT: 'Atos', ROM: 'Romanos', '1CO': '1 Coríntios', '2CO': '2 Coríntios',
    GAL: 'Gálatas', EPH: 'Efésios', PHP: 'Filipenses', COL: 'Colossenses', '1TH': '1 Tessalonicenses', '2TH': '2 Tessalonicenses',
    '1TI': '1 Timóteo', '2TI': '2 Timóteo', TIT: 'Tito', PHM: 'Filemom', HEB: 'Hebreus', JAS: 'Tiago', '1PE': '1 Pedro', '2PE': '2 Pedro',
    '1JN': '1 João', '2JN': '2 João', '3JN': '3 João', JUD: 'Judas', REV: 'Apocalipse',
  },
};

// Singular for a single psalm ("Salmo 23").
export const PSALM_SINGULAR = { es: 'Salmo', pt: 'Salmo' };

export const LABELS = {
  es: {
    bible: 'Biblia', path: 'biblia', ot: 'Antiguo Testamento', nt: 'Nuevo Testamento',
    explained: 'explicado', chapterTitle: (name, t) => `${name} explicado en palabras sencillas: ${t}`,
    bookH1: (b) => `El libro de ${b}, explicado de forma sencilla`, bookTitle: (b) => `El libro de ${b} explicado de forma sencilla`,
    indexH1: 'Cada capítulo de la Biblia, explicado en palabras sencillas',
    indexTitle: 'La Biblia explicada capítulo por capítulo, en palabras sencillas',
    indexIntro: 'Una explicación breve y sencilla de cada capítulo, como una Biblia de estudio que cualquiera puede seguir: qué sucede, el contexto que ayuda a entenderlo, dónde los cristianos lo leen de forma distinta y una pregunta para pensar.',
    indexDesc: 'Una explicación sencilla de cada capítulo de la Biblia, con introducciones a cada libro, contexto, dónde difieren los cristianos y una pregunta para pensar.',
    keyVerse: 'Versículo clave', differ: 'Dónde difieren los cristianos', think: 'Algo para pensar',
    keepReading: 'Sigue leyendo', aboutBook: (b) => `Sobre el libro de ${b}`, everyChapter: (b) => `Cada capítulo de ${b}`,
    writtenBy: 'Quién lo escribió', when: 'Cuándo', writtenTo: 'Para quién se escribió', why: 'Por qué se escribió',
    themes: 'Grandes temas', outline: 'Cómo está organizado', tip: 'Un consejo para leerlo',
    whatAbout: (n) => `¿De qué trata ${n}?`, whereDiffer: (n) => `¿En qué difieren los cristianos sobre ${n}?`,
    stillWondering: '¿Todavía te preguntas algo?', askPlaceholder: (n) => `Pregunta lo que quieras sobre ${n}…`,
    askButton: 'Preguntar', askNote: 'Tres preguntas gratis, sin necesidad de cuenta. kinwove responde en español.',
    askCta: (n) => `Pregunta sobre ${n} →`, askQ: (n) => `Ayúdame a entender ${n}`,
    pastorLine: 'Escrito con cuidado a partir de fuentes clásicas de estudio. Aún no ha sido revisado por un pastor.',
    translated: 'Traducido del inglés con ayuda de IA y revisado por una segunda IA. Las citas bíblicas están traducidas del inglés, no tomadas de una Biblia en español.',
    differNote: 'Donde cristianos fieles realmente no están de acuerdo, la nota lo dice.',
    allBooks: 'Todos los libros de la Biblia', english: 'Read in English', updated: 'Última actualización', open: 'Abrir kinwove →',
  },
  pt: {
    bible: 'Bíblia', path: 'biblia', ot: 'Antigo Testamento', nt: 'Novo Testamento',
    explained: 'explicado', chapterTitle: (name, t) => `${name} explicado em palavras simples: ${t}`,
    bookH1: (b) => `O livro de ${b}, explicado de forma simples`, bookTitle: (b) => `O livro de ${b} explicado de forma simples`,
    indexH1: 'Cada capítulo da Bíblia, explicado em palavras simples',
    indexTitle: 'A Bíblia explicada capítulo por capítulo, em palavras simples',
    indexIntro: 'Uma explicação curta e simples de cada capítulo, como uma Bíblia de estudo que qualquer pessoa consegue acompanhar: o que acontece, o contexto que ajuda a entender, onde os cristãos leem de forma diferente e uma pergunta para refletir.',
    indexDesc: 'Uma explicação simples de cada capítulo da Bíblia, com introduções a cada livro, contexto, onde os cristãos discordam e uma pergunta para refletir.',
    keyVerse: 'Versículo-chave', differ: 'Onde os cristãos discordam', think: 'Algo para refletir',
    keepReading: 'Continue lendo', aboutBook: (b) => `Sobre o livro de ${b}`, everyChapter: (b) => `Cada capítulo de ${b}`,
    writtenBy: 'Quem escreveu', when: 'Quando', writtenTo: 'Para quem foi escrito', why: 'Por que foi escrito',
    themes: 'Grandes temas', outline: 'Como está organizado', tip: 'Uma dica para ler',
    whatAbout: (n) => `Sobre o que é ${n}?`, whereDiffer: (n) => `Onde os cristãos discordam sobre ${n}?`,
    stillWondering: 'Ainda tem alguma dúvida?', askPlaceholder: (n) => `Pergunte o que quiser sobre ${n}…`,
    askButton: 'Perguntar', askNote: 'Três perguntas grátis, sem precisar de conta. O kinwove responde em português.',
    askCta: (n) => `Pergunte sobre ${n} →`, askQ: (n) => `Me ajude a entender ${n}`,
    pastorLine: 'Escrito com cuidado a partir de fontes clássicas de estudo. Ainda não foi revisado por um pastor.',
    translated: 'Traduzido do inglês com ajuda de IA e revisado por uma segunda IA. As citações bíblicas foram traduzidas do inglês, não tiradas de uma Bíblia em português.',
    differNote: 'Onde cristãos fiéis realmente discordam, a nota diz isso.',
    allBooks: 'Todos os livros da Bíblia', english: 'Read in English', updated: 'Última atualização', open: 'Abrir o kinwove →',
  },
};

// "1 Corintios" → "1-corintios", "Génesis" → "genesis"
export function slugify(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, '-');
}
