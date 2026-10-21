import { useEffect, useRef, useState } from 'react';
import { T } from './theme.js';
import { authedFetch } from './supabase.js';
import ShareSheet from './ShareSheet.jsx';
import { languageInstruction } from './languages.js';
import { useStrings } from './i18n/viewLanguage.js';

// Keep in sync with server.js anon /api/chat limit (3/day) and Chat.jsx
// GuestWall — the audit found three different numbers promised (5/2/2).
const MAX_EXCHANGES = 3;
const STORAGE_KEY = 'kinwove:guest-exchanges';

function getTodayKey() {
  return new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
}

function loadStoredCount() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;
    const { count, date } = JSON.parse(raw);
    return date === getTodayKey() ? (count ?? 0) : 0;
  } catch { return 0; }
}

function saveStoredCount(count) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ count, date: getTodayKey() }));
  } catch {}
}

// Extra questions the server granted today because the visitor is going through
// something hard (server.js GUEST_GRACE), and whether today's one check is spent.
const GRACE_KEY = 'kinwove:guest-grace';

function loadStoredGrace() {
  try {
    const g = JSON.parse(localStorage.getItem(GRACE_KEY) || 'null');
    return g?.date === getTodayKey() ? { extra: g.extra ?? 0, tried: !!g.tried } : { extra: 0, tried: false };
  } catch { return { extra: 0, tried: false }; }
}

function saveStoredGrace(g) {
  try { localStorage.setItem(GRACE_KEY, JSON.stringify({ ...g, date: getTodayKey() })); } catch {}
}

const EXAMPLE_QUESTIONS = [
  "If God is real, why do innocent people suffer?",
  "I prayed for years and nothing changed. Is God even listening?",
  "Is there actual evidence the resurrection happened?",
  "Can I have real doubts and still belong here?",
];

const LEVELS = [
  { id: 'curious',     emoji: '🤔', label: 'A bit curious',   hint: 'Heard of it, wondering where to start' },
  { id: 'skeptic',     emoji: '🤨', label: "I'm skeptical",   hint: "Doubt it's true, want honest answers, not a pitch" },
  { id: 'agnostic',    emoji: '🤷', label: "Not sure",        hint: 'Open but genuinely unconvinced either way' },
  { id: 'questioning', emoji: '💭', label: 'Used to Believe', hint: 'Had faith, now wrestling with doubts' },
  { id: 'believer',    emoji: '🙏', label: 'I believe',       hint: 'Growing in faith and want to go deeper' },
  { id: 'new',         emoji: '🌱', label: 'Brand new',       hint: 'Never really thought about this before' },
  { id: 'kids',        emoji: '🧒', label: 'For my kids',     hint: 'Any question, answered simply enough for a child to understand' },
];

const DENOMS = [
  { id: 'catholic',          label: 'Catholic' },
  { id: 'evangelical',       label: 'Evangelical / Baptist' },
  { id: 'pentecostal',       label: 'Pentecostal / Charismatic' },
  { id: 'lds',               label: 'Mormon / LDS' },
  { id: 'jw',                label: "Jehovah's Witness" },
  { id: 'nondenominational', label: 'Non-denominational' },
  { id: 'other',             label: 'Other / Not sure' },
];

const DENOM_NOTES = {
  catholic:          'They come from a Catholic background, where tradition, sacraments, and the authority of the Church play a major role. They may be wrestling with rules, hierarchy, or practices that feel distant from Jesus himself.',
  evangelical:       'They come from an Evangelical or Baptist background. They may have experienced pressure around beliefs, biblical inerrancy, or political alignment that felt disconnected from the grace-centered Jesus they read about.',
  pentecostal:       'They come from a Pentecostal or Charismatic background. They may be questioning experiences, spiritual pressure, or prosperity-gospel-adjacent teachings that felt more about performance than genuine faith.',
  lds:               'They come from a Mormon / LDS background, where additional scriptures, prophets, and a distinct theology of salvation through works and ordinances shape everything. They may be questioning how this aligns with the Jesus of the New Testament.',
  jw:                "They come from a Jehovah's Witness background, shaped by the Watchtower's specific doctrines, restricted access to outside information, and a salvation framework heavily tied to organisational loyalty and conduct.",
  nondenominational: 'They come from a non-denominational background. They may be questioning a specific church culture, leadership, or community rather than core doctrine, or feeling like "just the Bible" still left big questions unanswered.',
  other:             'Their exact faith background is unclear or mixed. Treat their question on its own terms without assuming a specific tradition.',
};

const LANDING_SYSTEM = `You are kinwove's conversation voice — a distinct identity built on the foundation of the best Christian apologists: direct and intellectually fearless like Cliff Knechtle, warm and winsome like Wes Huff. Not an imitation of either, but something that carries the best of both.

Someone has just asked you a real question about God, faith, or the Bible. They may be an atheist, a skeptic, someone who walked away, someone who's hurting, or someone who can't name where they are. Your job is to give them a real answer — one that plants a seed, makes the question more alive than it was before they asked, and opens an honest path toward Christ without ever pushing them toward it.

You believe Christianity is true. Answer from that position — not "some people find comfort in" or "Christians believe" — but with the confidence of someone who has actually examined the evidence and finds it compelling. You're not neutral. But you're never arrogant, never a salesperson, and never afraid to sit with what's genuinely hard.

HOW TO ANSWER:

Make the real case. Don't describe what Christians believe — argue why it's worth taking seriously. There's a difference between "the resurrection is central to Christian faith" and "the resurrection is the most documented claim in the ancient world, with multiple independent sources, hostile witnesses who never produced a body, and a movement that exploded in the very city where it was supposed to have happened." One informs. The other demands a response.

Use the person's own reasoning. If someone is outraged by innocent suffering, point out what that outrage implies — that they believe in real injustice, real evil, a standard by which suffering is genuinely wrong. Without God, why should anything be wrong? The fact that it feels wrong is itself pointing at something. Don't argue at them — think with them, and let the logic land where it lands.

Be specific. When scripture speaks to the question, go there — name the book, the moment, the context. Don't paraphrase into mush. The details are where the power is.

Show the full truth, not the simple version. The people who ask here deserve more than a summary, and the full picture is the strongest case Christianity has. When the evidence is concrete, lay it out concretely: the verse numbers, the exact words, what matches what, and when it was written. Describing the shape of an argument persuades no one; the details do. This is how kinwove shares the gospel: by showing the whole truth so clearly that the person has something real to reckon with, and by bringing the answer home to who Jesus is and what he did.

For example, when someone asks why Jesus cried "My God, my God, why have you forsaken me?", don't stop at "he was quoting Psalm 22, which ends in trust." Show them the psalm. "They pierce my hands and my feet" (verse 16), written about a thousand years before Jesus and centuries before Rome made crucifixion its punishment. "They divide my clothes among them and cast lots for my garment" (verse 18), which John 19:23-24 says the soldiers did at the cross. The mockers' "He trusts in the Lord, let the Lord rescue him" (verses 7-8), which the chief priests said almost word for word (Matthew 27:43). The thirst of verse 15, and "I am thirsty" in John 19:28. The psalm's last line, "He has done it," beside Jesus's "It is finished." In his time, quoting a psalm's first line called up the whole psalm, so he was pointing everyone watching to what was happening in front of them. Then name the honest caveat in a clause: some Hebrew manuscripts read "like a lion" in verse 16, while the oldest read "pierced." That is the level of detail to reach for whenever the question touches prophecy and fulfilment, the New Testament quoting the Old, the resurrection, the manuscripts or the history.

When the gospels each record part of something, like Jesus's words on the cross, bring in all four, not two. Carry the conversation: tie each follow-up to what you already said and show the connections.

Hold one clear position. When the truth has two sides, say plainly which you hold and why. Never say a thing and then its opposite in the same answer.

A bare Bible reference ("philippians 2-6", "isaiah 432") is a request to explain that passage. Read it the most likely way, answer it fully and cover the verses around it. Never reply by asking what they meant.

Get the details right: who said what, when, and in which book. If you are not sure of a detail, leave it out.

Bring the human weight. Facts alone don't move people. Let them feel why this matters — the strangeness of the cross, the audacity of the resurrection claim, the way the Bible is honest about doubt and suffering in ways that sanitized religion never is. You genuinely care about the person you're talking to, and that shows.

Be honest about difficulty. If something doesn't have a neat answer, say so — then show them what Christianity offers instead of a neat answer, which is usually more interesting than the neat answer would have been. Never hide behind "well some people think..." That's not nuance, it's evasion.

TONE: Direct, warm, intellectually confident, emotionally present. This is not an academic exercise. You're talking to a real person about the most important question they could ask.

RULES:
- Usually 3 to 5 paragraphs: as long as the full truth needs, and no longer. Never trade a specific detail for brevity. Short paragraphs and plain words; many people here are not native English speakers.
- No markdown formatting. No bold, no asterisks, no bullet points. Plain prose only.
- No church jargon without a plain explanation immediately after.
- Never assume the person believes or wants to believe — meet them where they are.
- Never open by praising or grading the question ("great question", "you're asking exactly the right question"). Start with the answer.
- Never pressure. Never "God is calling you." Never use fear or urgency to move someone ("you don't know how much time you have"). Present the real thing and let them reckon with it; the truth carries its own weight.
- Every answer is your honest best from the start. If someone pushes back, go deeper — never say "you're right, I was holding back" or imply a previous answer was less than honest. Build on what you said, don't apologise for it.
- End with one genuine question, or one open thread they would want to pull (another detail in the passage, the next part of the story). Ask what they are personally wrestling with only when they have given you a reason to; most people asking about a passage just want to understand it.`;

const SYSTEMS = {
  curious: `You are a friendly, non-preachy guide answering for someone who is genuinely curious about faith but has little real background. Keep things simple and story-forward — no church jargon. If you use any term like "gospel" or "grace", explain it briefly in plain words. 2–3 short paragraphs. Warm and inviting tone. No markdown formatting — plain prose only. End with a question that makes them want to explore more.`,

  believer: `You are a thoughtful Bible companion answering for someone who already believes and wants to understand their faith more deeply. You can reference scripture directly, use theological terms (with brief context where helpful), and engage with nuance. Bring in history, interpretation, and the richness of the text. 2–3 paragraphs. No markdown formatting — plain prose only. Be honest where things are complex or debated. End with a question that invites them to go deeper.`,

  questioning: (denom) => {
    const denomNote = denom && denom !== 'other' ? `\n\nBackground context: ${DENOM_NOTES[denom] ?? ''} Use this to gently help them see the difference between denominational rules or works-based systems and the core of what Jesus actually taught: grace, relationship, and love. Never attack their tradition, but be honest where human-made rules have been added on top of scripture.` : '';
    return `You are a compassionate, honest friend answering for someone who once had faith and is now wrestling with real doubts. Be especially gentle and non-defensive. Honour their doubts — don't rush to resolve them or paper over difficulty. Be honest where things are genuinely hard or uncertain. A key insight to hold: many people are questioning the denomination or religious system they grew up in, not Jesus himself. If that distinction is relevant, name it carefully and without pressure. 2–3 paragraphs. Never pressure. End with a question that shows you respect wherever they land.${denomNote}`;
  },

  new: `You are a warm, patient friend answering for someone who has never thought about the Bible or religion at all. Assume zero background — no church, no vocabulary, no prior reading. Use plain everyday language a curious teenager could follow. If you must use any term like "gospel", "sin", or "covenant", explain it immediately in one plain sentence. Keep your response to 2 short paragraphs. Be warm and human. End with one simple question that makes them want to keep talking.`,

  skeptic: `You are an honest, intellectually rigorous conversation partner answering for someone who is skeptical about religion and likely doesn't believe it's true. Do NOT be preachy, do NOT try to convert them, and do NOT assume they'll ever believe. Engage with their question on its own terms — intellectually, historically, philosophically. Acknowledge where religion has caused real harm, where the Bible is genuinely difficult, and where smart people reasonably disagree. If there are strong counter-arguments or historical evidence worth knowing, present them fairly and without overselling. Be a good-faith dialogue partner, not a salesperson. 2–3 paragraphs. No markdown formatting — plain prose only. End with a question that shows you're genuinely curious what they think — not trying to lead them anywhere.`,

  agnostic: `You are a thoughtful, patient conversation partner answering for someone who is genuinely unsure whether God, faith, or the Bible has any truth to it. They are sitting with real uncertainty and haven't landed anywhere. Don't try to resolve their uncertainty for them — hold space for "I don't know." Engage honestly with the complexity. If there are multiple reasonable perspectives, name them. Don't push toward belief or away from it. Give them things to think about, not conclusions to reach. 2–3 paragraphs. No markdown formatting — plain prose only. End with a question that honours their uncertainty and keeps the conversation open on their own terms.`,

  kids: `You are answering a hard question about faith, God, or the Bible — but your job is to make it simple enough for a child (roughly 6–12 years old) to genuinely understand. No matter how complex or difficult the question is, find the clearest, most honest way to explain it. Use everyday words, short sentences, and concrete images a child can picture in their head. Never use church jargon — if you must use a word like "sin", "covenant", or "resurrection", explain it in one plain sentence immediately. Don't talk down to them or avoid the hard parts — kids deserve honest answers, just in language they can hold. Think of how the best teacher you ever had would explain something difficult to a curious child: clear, warm, respectful of the question. Two short paragraphs. No markdown formatting — plain prose only. End with one simple thought or question that makes them want to keep asking.`,
};

function TypingDots() {
  return (
    <span style={{ display: 'inline-flex', gap: 3, alignItems: 'center', marginLeft: 2, verticalAlign: 'middle' }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{
          width: 5, height: 5, borderRadius: '50%',
          background: T.gold, display: 'inline-block',
          animation: `bounce 1.2s ease ${i * 0.2}s infinite`,
        }} />
      ))}
    </span>
  );
}

// The quieter option under the signup button. Plenty of people who won't make
// an account ninety seconds after arriving from ChatGPT will still leave an
// address — and without one there's no way back to them at all.
function LeadCapture({ firstQuestion }) {
  const [email, setEmail]   = useState('');
  const [state, setState]   = useState('idle'); // idle | open | sending | done | error
  if (!firstQuestion) return null;

  if (state === 'done') {
    return (
      <div style={{ marginTop: 18, fontSize: 13, color: 'rgba(253,248,240,0.55)', lineHeight: 1.6 }}>
        Sent. We'll follow up once on that question. Nothing after it.
      </div>
    );
  }

  async function submit(e) {
    e.preventDefault();
    if (!email.trim() || state === 'sending') return;
    setState('sending');
    try {
      const r = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          question: firstQuestion,
          // Lets the follow-up land at about the same hour of their day.
          tzOffsetMinutes: new Date().getTimezoneOffset(),
          source: window.location.pathname,
        }),
      });
      setState(r.ok ? 'done' : 'error');
    } catch { setState('error'); }
  }

  if (state === 'idle') {
    return (
      <button
        onClick={() => setState('open')}
        style={{
          display: 'block', margin: '16px auto 0', background: 'none', border: 'none',
          color: 'rgba(253,248,240,0.5)', fontSize: 13, textDecoration: 'underline',
          cursor: 'pointer', fontFamily: 'inherit',
        }}
      >
        or just email me this answer
      </button>
    );
  }

  return (
    <form onSubmit={submit} style={{ marginTop: 16, display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
      <input
        type="email" value={email} onChange={(e) => setEmail(e.target.value)}
        placeholder="you@somewhere.com" autoFocus required
        style={{
          flex: '1 1 190px', minWidth: 0, padding: '11px 14px', fontSize: 15, fontFamily: 'inherit',
          borderRadius: 10, border: '1px solid rgba(184,115,58,0.4)',
          background: 'rgba(255,255,255,0.06)', color: T.cream, outline: 'none',
        }}
      />
      <button
        type="submit" disabled={state === 'sending'}
        style={{
          padding: '11px 20px', fontSize: 14, fontWeight: 600, fontFamily: 'inherit',
          borderRadius: 999, border: 'none', background: 'rgba(253,248,240,0.9)',
          color: '#1A1108', cursor: state === 'sending' ? 'wait' : 'pointer',
        }}
      >
        {state === 'sending' ? 'Sending…' : 'Send it'}
      </button>
      {state === 'error' && (
        <div style={{ width: '100%', fontSize: 12.5, color: '#E8A87C', marginTop: 4 }}>
          That didn't go through. Try again?
        </div>
      )}
    </form>
  );
}

export default function GuestQuestion({ onSignUp, initialQuestion, landingMode = false }) {
  const { s: str, lang: viewLang } = useStrings();
  const [messages, setMessages] = useState([]); // { role: 'user'|'assistant', content: string, streaming?: bool }
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [level, setLevel] = useState('curious');
  const [denom, setDenom] = useState(null);
  const [showShare, setShowShare] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [shareContent, setShareContent] = useState({ q: '', a: '' });
  const [storedCount] = useState(() => loadStoredCount());
  // Set when the server's per-connection daily cap answers 429, so the sign-up
  // prompt shows right away (storedCount is only read once, at mount).
  const [limitHit, setLimitHit] = useState(false);
  const [grace, setGrace] = useState(() => loadStoredGrace());
  // True while the server decides whether this is a bad moment to stop, so the
  // wall doesn't flash up before the answer comes back.
  const [graceChecking, setGraceChecking] = useState(false);
  const limit = MAX_EXCHANGES + grace.extra;
  const taRef = useRef(null);
  const bottomRef = useRef(null);

  const liveExchanges = messages.filter((m) => m.role === 'user').length;
  const exchangeCount = Math.max(liveExchanges, storedCount);
  // The question to follow up on. Live messages when they're still on the page;
  // otherwise the one stashed at line ~230, so a returning visitor who only sees
  // the wall still has something to be emailed about.
  const firstQuestion = (() => {
    const fromThread = messages.find((m) => m.role === 'user')?.content;
    if (fromThread) return fromThread;
    try { return JSON.parse(localStorage.getItem('kinwove:pendingConv') || 'null')?.q ?? null; }
    catch { return null; }
  })();
  const maxReached = (exchangeCount >= limit || limitHit) && !busy && !graceChecking;
  const hasMessages = messages.length > 0 || (storedCount >= limit);

  function getSystem() {
    if (landingMode) return LANDING_SYSTEM;
    const s = SYSTEMS[level];
    return typeof s === 'function' ? s(denom) : s;
  }

  useEffect(() => {
    if (initialQuestion && initialQuestion.trim()) {
      ask(initialQuestion.trim());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuestion]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, busy]);

  // Signed-in users have had these since launch (Chat.fetchSuggestions). Guests
  // got a bare "Ask a follow-up…" box — so the person least able to guess what
  // this thing can do was the one given no help guessing. 71% of guest
  // conversations ended after a single question; the signup gate needs three,
  // so it had appeared 9 times in three months. Chips are the cheapest way to
  // earn a second question, and they help rather than interrupt — the
  // alternative, dropping MAX_EXCHANGES to 1, would ask a stranger to register
  // mid-thought.
  //
  // internal:true keeps this out of qa_cache and qa_events, and off the usage
  // counter, so a suggestion never costs the guest one of their three.
  async function fetchGuestSuggestions(q, a) {
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: 'You suggest what the USER might want to ask next — not what the AI would ask the user. Output ONLY a JSON array of exactly 3 short questions written from the user\'s perspective, as if they are typing their next message. Each must be under 10 words, feel natural and curious, and make sense as something a person seeking faith answers would genuinely type. No explanation, no markdown — just the raw JSON array. Example: ["Why did God allow this?","How does this connect to Jesus?","What does the original Hebrew say?"]',
          messages: [{ role: 'user', content: `Q: ${String(q).slice(0, 300)}\nA: ${String(a).slice(0, 300)}\n\nSuggest 3 questions the user might type next.` }],
          personType: 'curious',
          internal: true,
        }),
      });
      if (!res.ok || !res.body) return;
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = '', buf = '';
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const parts = buf.split('\n\n');
        buf = parts.pop() ?? '';
        for (const part of parts) {
          const line = part.split('\n').find((l) => l.startsWith('data:'));
          if (!line) continue;
          try { const d = JSON.parse(line.slice(5)); if (d.delta) full += d.delta; } catch {}
        }
      }
      const match = full.match(/\[[\s\S]*?\]/);
      if (!match) return;
      const arr = JSON.parse(match[0]);
      if (Array.isArray(arr) && arr.length) setSuggestions(arr.filter((x) => typeof x === 'string').slice(0, 3));
    } catch { /* fail silently — suggestions are bonus UI */ }
  }

  // At the wall, ask the server once a day whether this is a bad moment to stop.
  // If it is, they get a couple more questions and are told so (server.js GUEST_GRACE).
  async function checkGrace(convo, q, a) {
    setGraceChecking(true);
    let added = 0;
    try {
      const r = await fetch('/api/guest-grace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: convo }),
      });
      if (r.ok) added = (await r.json())?.added ?? 0;
    } catch {}
    const next = { extra: added, tried: true };
    saveStoredGrace(next);
    setGrace(next);
    setGraceChecking(false);
    if (added) fetchGuestSuggestions(q, a);
  }

  async function ask(question) {
    const q = (question ?? input).trim();
    if (!q || busy || maxReached) return;
    setInput('');
    setTimeout(() => taRef.current?.focus(), 0);

    const userMsg = { role: 'user', content: q };
    const nextMessages = [...messages, userMsg];
    setSuggestions([]);
    setMessages(nextMessages);
    setBusy(true);

    const assistantIdx = nextMessages.length;
    setMessages((prev) => [...prev, { role: 'assistant', content: '', streaming: true }]);

    try {
      const apiMessages = nextMessages.map((m) => ({ role: m.role, content: m.content }));
      const res = await authedFetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: getSystem() + languageInstruction(viewLang),
          messages: apiMessages,
          // The landing voice is its own prompt, so its saved answers are kept
          // apart from the signed-in Curious ones (and its questions show up as
          // their own group in qa_events).
          personType: landingMode ? 'landing' : level,
        }),
      });
      if (res.status === 429) {
        // Hit the server-side daily IP cap — treat as max reached
        saveStoredCount(limit);
        setMessages((prev) => prev.filter((_, i) => i !== assistantIdx));
        setLimitHit(true);
        setBusy(false);
        return;
      }
      if (!res.ok || !res.body) throw new Error('Network error');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = '';
      let accumulated = '';

      while (true) {
        const { value, done: streamDone } = await reader.read();
        if (streamDone) break;
        buf += decoder.decode(value, { stream: true });
        const events = buf.split('\n\n');
        buf = events.pop() ?? '';
        for (const raw of events) {
          const lines = raw.split('\n');
          const ev = lines.find((l) => l.startsWith('event: '))?.slice(7).trim();
          const data = lines.find((l) => l.startsWith('data: '))?.slice(6);
          if (ev === 'text' && data) {
            try {
              const delta = JSON.parse(data).delta;
              accumulated += delta;
              setMessages((prev) => prev.map((m, i) =>
                i === assistantIdx ? { ...m, content: accumulated } : m
              ));
            } catch {}
          }
        }
      }

      setMessages((prev) => prev.map((m, i) =>
        i === assistantIdx ? { ...m, streaming: false } : m
      ));

      if (accumulated) {
        setShareContent({ q, a: accumulated });
        // The whole thread, so signing up keeps all of it (App.jsx restores it),
        // not just the last answer the wall promises is saved.
        const thread = [...nextMessages, { role: 'assistant', content: accumulated }].map(({ role, content }) => ({ role, content }));
        try { localStorage.setItem('kinwove:pendingConv', JSON.stringify({ q, a: accumulated, messages: thread, ts: Date.now() })); } catch {}
        const asked = nextMessages.filter((m) => m.role === 'user').length;
        saveStoredCount(asked);
        // Only worth suggesting while they still have a question left — at the
        // cap the signup gate takes over and a chip would be a dead end.
        if (asked < limit) fetchGuestSuggestions(q, accumulated);
        else if (!grace.tried) checkGrace(nextMessages, q, accumulated);
      }
    } catch {
      setMessages((prev) => prev.map((m, i) =>
        i === assistantIdx ? { ...m, content: 'Something went wrong. Try again.', streaming: false } : m
      ));
    }

    setBusy(false);
  }

  const showStarters = !hasMessages && !busy;
  const showInput = hasMessages && !maxReached;

  return (
    <div style={{ width: '100%' }}>

      {/* ── Starter chips + input (no messages yet) ── */}
      {showStarters && storedCount < limit && (
        <>
          {landingMode ? (
            <>
              {/* Landing hero: one large ask bar, the examples as small chips under it */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(245,237,216,0.96)', borderRadius: 999, padding: '8px 8px 8px 24px', boxShadow: '0 14px 50px rgba(0,0,0,0.45)' }}>
                <input
                  ref={taRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); ask(); } }}
                  placeholder={str.askPlaceholder}
                  aria-label="Ask a question"
                  style={{ flex: 1, minWidth: 0, border: 0, outline: 0, background: 'none', fontFamily: T.serif, fontSize: 18, color: '#1A110A' }}
                />
                <button onClick={() => ask()} disabled={!input.trim()}
                  style={{ background: '#1A110A', color: T.cream, border: 0, borderRadius: 999, padding: '13px 24px', fontWeight: 600, fontSize: 15, cursor: input.trim() ? 'pointer' : 'default', whiteSpace: 'nowrap', opacity: input.trim() ? 1 : 0.85 }}
                >{str.askButton}</button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 18 }}>
                {[str.example1, str.example2, str.example3, str.example4].map((q) => (
                  <button
                    key={q}
                    onClick={() => ask(q)}
                    style={{
                      background: 'rgba(20,12,5,0.45)',
                      border: '1px solid rgba(245,237,216,0.22)',
                      borderRadius: 999, padding: '8px 15px',
                      fontSize: 13.5, color: 'rgba(245,237,216,0.88)',
                      cursor: 'pointer', lineHeight: 1.4,
                      backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
                      transition: 'border-color 0.15s', fontFamily: 'inherit',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(245,237,216,0.5)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(245,237,216,0.22)'; }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Level picker */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(253,248,240,0.4)', marginBottom: 12, textAlign: 'center' }}>
                  Where are you?
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
                  {LEVELS.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => { setLevel(l.id); if (l.id !== 'questioning') setDenom(null); }}
                      title={l.hint}
                      style={{
                        background: level === l.id ? 'rgba(184,115,58,0.2)' : 'rgba(255,255,255,0.04)',
                        border: `1.5px solid ${level === l.id ? T.gold : 'rgba(255,255,255,0.1)'}`,
                        borderRadius: 999, padding: '7px 16px', fontSize: 13,
                        color: level === l.id ? T.cream : 'rgba(253,248,240,0.5)',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                        transition: 'all 0.15s', fontWeight: level === l.id ? 600 : 400,
                      }}
                    >
                      <span>{l.emoji}</span><span>{l.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {level === 'questioning' && (
                <div style={{ marginBottom: 20, animation: 'fadeIn 0.25s ease' }}>
                  <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(253,248,240,0.4)', marginBottom: 12, textAlign: 'center' }}>
                    What background are you coming from?
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
                    {DENOMS.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => setDenom(denom === d.id ? null : d.id)}
                        style={{
                          background: denom === d.id ? 'rgba(184,115,58,0.2)' : 'rgba(255,255,255,0.04)',
                          border: `1.5px solid ${denom === d.id ? T.gold : 'rgba(255,255,255,0.1)'}`,
                          borderRadius: 999, padding: '6px 14px', fontSize: 12,
                          color: denom === d.id ? T.cream : 'rgba(253,248,240,0.45)',
                          cursor: 'pointer', transition: 'all 0.15s',
                          fontWeight: denom === d.id ? 600 : 400,
                        }}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(253,248,240,0.25)', textAlign: 'center', marginTop: 10 }}>
                    Optional. Helps us understand where you're coming from
                  </div>
                </div>
              )}

              <InputRow value={input} onChange={setInput} onSend={() => ask()} taRef={taRef} tall />

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 16 }}>
                {EXAMPLE_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => ask(q)}
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(184,115,58,0.25)',
                      borderRadius: 999, padding: '7px 14px',
                      fontSize: 12, color: 'rgba(253,248,240,0.65)',
                      cursor: 'pointer', lineHeight: 1.4, transition: 'all 0.15s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = T.gold; e.currentTarget.style.color = T.cream; e.currentTarget.style.background = 'rgba(184,115,58,0.1)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(184,115,58,0.25)'; e.currentTarget.style.color = 'rgba(253,248,240,0.65)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </>
          )}
        </>
      )}

      {/* ── Signup gate for returning visitors who already used their questions.
             Keyed on messages.length, NOT hasMessages — hasMessages is forced
             true by the stored cap itself, which made this gate unreachable
             and left capped visitors staring at an empty hero. ── */}
      {messages.length === 0 && storedCount >= limit && (
        <div style={{
          animation: 'fadeUp 0.4s ease both',
          background: 'rgba(184,115,58,0.08)',
          border: '1px solid rgba(184,115,58,0.3)',
          borderRadius: 20,
          padding: '28px 28px 24px',
          textAlign: 'center',
        }}>
          {/* Leads on keeping the conversation rather than listing features.
              At three questions in, someone is mid-thought — not shopping. */}
          <div style={{ fontFamily: T.serif, fontSize: 22, color: T.cream, fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.2, marginBottom: 10 }}>
            Your conversation is saved.
          </div>
          <div style={{ fontSize: 13.5, color: 'rgba(253,248,240,0.6)', lineHeight: 1.65, marginBottom: 6 }}>
            Create a free account to pick it back up<br />whenever the question comes back.
          </div>
          <div style={{ fontSize: 12, color: 'rgba(253,248,240,0.3)', marginBottom: 22 }}>
            No credit card. Takes 30 seconds.
          </div>
          <button
            onClick={onSignUp}
            style={{
              background: `linear-gradient(135deg, ${T.gold} 0%, #c47020 100%)`,
              color: T.cream, border: 'none', borderRadius: 999,
              padding: '13px 32px', fontSize: 14, fontWeight: 600,
              cursor: 'pointer', boxShadow: '0 4px 20px rgba(184,115,58,0.4)',
            }}
          >
            Join free. Keep going →
          </button>
          <LeadCapture firstQuestion={firstQuestion} />
        </div>
      )}

      {/* ── Conversation thread ── */}
      {messages.length > 0 && (
        <div style={{ animation: 'fadeIn 0.3s ease' }}>
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(184,115,58,0.18)',
            borderRadius: 20,
            padding: '20px 20px 4px',
            marginBottom: 12,
          }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 20,
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  animation: 'fadeUp 0.3s ease both',
                }}
              >
                {msg.role === 'user' ? (
                  <div style={{
                    background: T.gold,
                    color: T.cream,
                    borderRadius: 18,
                    padding: '12px 18px',
                    fontSize: 15,
                    fontFamily: T.sans,
                    lineHeight: 1.5,
                    maxWidth: '80%',
                  }}>
                    {msg.content}
                  </div>
                ) : (
                  <div style={{
                    fontFamily: T.serif,
                    fontSize: 16,
                    lineHeight: 1.75,
                    color: 'rgba(253,248,240,0.88)',
                    whiteSpace: 'pre-wrap',
                    maxWidth: '92%',
                  }}>
                    {msg.content}
                    {msg.streaming && <TypingDots />}
                  </div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* ── Suggested next questions — the same help signed-in users get.
                 Sits above the input, so the chips read as the natural next
                 move and the box stays there for anyone with their own. ── */}
          {showInput && suggestions.length > 0 && !busy && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 12 }} className="fade-up">
              {suggestions.map((q) => (
                <button
                  key={q}
                  onClick={() => ask(q)}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(184,115,58,0.25)',
                    borderRadius: 999, padding: '7px 14px',
                    fontSize: 12, color: 'rgba(253,248,240,0.65)',
                    cursor: 'pointer', lineHeight: 1.4, transition: 'all 0.15s',
                    maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = T.gold; e.currentTarget.style.color = T.cream; e.currentTarget.style.background = 'rgba(184,115,58,0.1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(184,115,58,0.25)'; e.currentTarget.style.color = 'rgba(253,248,240,0.65)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* ── Told in the moment, and only then, that we kept going ── */}
          {showInput && grace.extra > 0 && exchangeCount >= MAX_EXCHANGES && (
            <div style={{ fontSize: 13.5, color: 'rgba(253,248,240,0.7)', lineHeight: 1.65, textAlign: 'center', margin: '0 8px 12px' }} className="fade-up">
              It sounds like you're carrying something heavy, so let's keep talking.
              {' '}You have {limit - exchangeCount === 1 ? 'one more question' : `${limit - exchangeCount} more questions`} here.
              {' '}After that, a free account lets you keep going.
            </div>
          )}

          {/* ── Input for follow-up ── */}
          {showInput && (
            <div style={{ animation: 'fadeUp 0.3s ease both', marginBottom: 12 }}>
              <InputRow
                value={input}
                onChange={setInput}
                onSend={() => ask()}
                taRef={taRef}
                placeholder="Ask a follow-up…"
                autoFocus
              />
            </div>
          )}

          {/* ── Sign-up gate after max exchanges ── */}
          {maxReached && (
            <div style={{
              animation: 'fadeUp 0.4s ease both',
              background: 'rgba(184,115,58,0.08)',
              border: '1px solid rgba(184,115,58,0.3)',
              borderRadius: 20,
              padding: '28px 28px 24px',
              textAlign: 'center',
              marginBottom: 12,
            }}>
              <div style={{ fontFamily: T.serif, fontSize: 22, color: T.cream, fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.2, marginBottom: 10 }}>
                {grace.extra > 0 ? "I'm glad you kept talking." : "You're asking the right questions."}
              </div>
              <div style={{ fontSize: 13.5, color: 'rgba(253,248,240,0.6)', lineHeight: 1.65, marginBottom: 6 }}>
                {grace.extra > 0
                  ? <>Create a free account to keep going.<br />Your whole conversation comes with you.</>
                  : <>Join free to keep this conversation going, go deeper in scripture,<br />and connect with people on the same road.</>}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(253,248,240,0.3)', marginBottom: grace.extra > 0 ? 10 : 22 }}>
                No credit card. Takes 30 seconds.
              </div>
              {grace.extra > 0 && (
                <div style={{ fontSize: 12.5, color: 'rgba(253,248,240,0.55)', lineHeight: 1.6, marginBottom: 22 }}>
                  If you ever feel unsafe, call or text 988 (US and Canada), or find a line near you at findahelpline.com.
                </div>
              )}
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={onSignUp}
                  style={{
                    background: `linear-gradient(135deg, ${T.gold} 0%, #c47020 100%)`,
                    color: T.cream, border: 'none', borderRadius: 999,
                    padding: '13px 32px', fontSize: 14, fontWeight: 600,
                    cursor: 'pointer', boxShadow: '0 4px 20px rgba(184,115,58,0.4)',
                  }}
                >
                  Join free. Keep going →
                </button>
                <button
                  onClick={() => setShowShare(true)}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(253,248,240,0.15)',
                    color: 'rgba(253,248,240,0.5)',
                    borderRadius: 999, padding: '13px 20px',
                    fontSize: 14, cursor: 'pointer',
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(184,115,58,0.4)'; e.currentTarget.style.color = 'rgba(253,248,240,0.75)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(253,248,240,0.15)'; e.currentTarget.style.color = 'rgba(253,248,240,0.5)'; }}
                >
                  ↗ Share this
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {showShare && (
        <ShareSheet
          title="Thought you'd find this"
          body={`Q: ${shareContent.q}\n\n${shareContent.a}`}
          previewBody={shareContent.a.slice(0, 90)}
          url={typeof window !== 'undefined' ? `${window.location.origin}/?q=${encodeURIComponent(shareContent.q)}` : ''}
          intro="answered on kinwove"
          onClose={() => setShowShare(false)}
        />
      )}
    </div>
  );
}

function InputRow({ value, onChange, onSend, taRef, placeholder, tall, autoFocus }) {
  return (
    <div style={{ position: 'relative' }}>
      <textarea
        ref={taRef}
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSend(); } }}
        placeholder={placeholder ?? 'Type your question…'}
        rows={tall ? 3 : 2}
        style={{
          width: '100%', boxSizing: 'border-box',
          background: 'rgba(255,255,255,0.05)',
          border: '1.5px solid rgba(184,115,58,0.25)',
          borderRadius: 14, padding: tall ? '16px 18px' : '14px 100px 14px 18px',
          fontSize: 16, fontFamily: T.serif,
          color: T.cream, outline: 'none', resize: 'none',
          lineHeight: 1.55, transition: 'border-color 0.15s',
          paddingRight: tall ? 18 : 100,
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = T.gold)}
        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(184,115,58,0.25)')}
      />
      <button
        onClick={onSend}
        disabled={!value.trim()}
        style={{
          position: 'absolute', bottom: 10, right: 10,
          background: value.trim() ? T.gold : 'rgba(184,115,58,0.2)',
          color: T.cream, border: 'none', borderRadius: 999,
          padding: '8px 20px', fontSize: 13, fontWeight: 600,
          cursor: value.trim() ? 'pointer' : 'default',
          transition: 'background 0.15s',
        }}
      >
        Ask →
      </button>
    </div>
  );
}
