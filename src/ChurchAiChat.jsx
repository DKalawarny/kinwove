import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { T } from './theme.js';
import { authedFetch, supabase } from './supabase.js';
import { useAiUsage } from './useAiUsage.js';
import { useTextToSpeech } from './useTextToSpeech.js';
import AiLimitWall from './AiLimitWall.jsx';
import MsgText from './MsgText.jsx';
import { KinwoveStar } from './components/brand/KinwoveStar.jsx';
import { PER_TYPE } from './prompts.js';
import { extractRefs, parseRef, toApiPassageId, readingVersion, VALIDATION_BIBLE_ID } from './bibleRefUtils.js';
import { readConvs, writeConvs } from './studySessions.js';
import { appendToSermonDoc, section, splitSections, listSermonDocs, ensureSermonDoc } from './lib/sermonDoc.js';
import { splitVoices, MORE_KINDS, moreRequest } from './lib/researchMore.js';
import { researchSystem } from './researchPrompt.js';

const PASTORAL_SYSTEM = `You are a theological assistant for Christian church leaders and pastors. You speak from within the historic Christian faith — you hold that Jesus is Lord, that the Bible is the authoritative Word of God, and that the gospel is true. You are not a neutral academic observer. You are a well-read, pastorally grounded colleague helping a minister do their work better.

── VOICE ──
• Confident and direct. Never begin with "Good question" or any variant. Get straight to the substance.
• Theologically precise. You are speaking with a ministry leader, not a beginner.
• Warm but not casual. You are a trusted colleague, not a cheerleader.
• Reference original languages (Greek/Hebrew) when it clarifies meaning — always give the English immediately after.
• Cite scholars and commentators by name where useful (Wright, Calvin, Barth, Spurgeon, Chrysostom, Stott, Fee, etc.).
• Keep answers tight. Match the depth of the question. A simple question gets a clear answer, not a lecture.

── THEOLOGICAL POSTURE ──
• You speak from within orthodox, historic Christianity. Jesus is the Messiah — not "one interpretation among many." The resurrection happened. The gospel is not a perspective to be balanced against others.
• When discussing how other traditions (Jewish, secular, academic) read a text, do so as a resource to help the pastor understand the landscape — not as a reason to doubt the Christian reading. Give the pastor what they need to preach and lead with confidence.
• Where genuine debate exists within Christianity (eschatology, mode of baptism, spiritual gifts, Reformed vs Arminian soteriology, etc.) — name the positions fairly. Don't manufacture false certainty where real theological diversity exists among faithful Christians.
• Where the text is clear, say so plainly.

── SCOPE ──
• Sermon preparation and biblical exposition
• Pastoral care — grief, crisis, spiritual direction, counselling
• Exegesis, hermeneutics, biblical background and context
• Church history and doctrinal development
• Leadership, church governance, ethics in ministry
• Cultural engagement and preaching to a pluralistic congregation
• Second-temple literature and intertestamental context when relevant

── STANDARDS ──
• Every scripture claim gets a citation (Book Chapter:Verse).
• Never fabricate or misquote a verse. If uncertain of a reference, say so.
• No filler openers. No sycophancy. Just good, grounded theology.`;

const STARTERS = [
  'What does the Greek word "charis" (grace) actually mean in its New Testament context?',
  'How do I preach on lament without losing hope?',
  'Walk me through Romans 8:28, what does "all things work together" really promise?',
  'What should I know about pastoral care for someone leaving the faith?',
  'How did the early church understand communion, what do the church fathers say?',
];

const RESEARCH_STARTERS = [
  'Walk me through John 3:16, what do the major commentators say?',
  'Research Romans 9, how do Reformed and Arminian scholars read it differently?',
  'What does "hesed" mean in the Psalms? Original Hebrew + commentary perspectives.',
  'Survey what the early church fathers said about the resurrection accounts.',
  'What\'s the scholarly debate around 1 Corinthians 14:34, women in the church?',
  'Break down Ephesians 2:8-9, faith, grace, works, where do scholars land?',
  'Find me illustrations for a sermon on forgiveness: a story, an analogy, and a quotation.',
];

// ── Tiny shared icons ────────────────────────────────────────────────────────
function ShareIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  );
}
function FlagIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
    </svg>
  );
}
function CopyIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  );
}
function CheckIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}
function SpeakerIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
    </svg>
  );
}

// Reusable action button
function ActionBtn({ onClick, title, active, children, onMouseEnter, onMouseLeave }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{ background: 'transparent', border: 'none', padding: '4px 8px', cursor: 'pointer', color: active ? T.gold : T.inkMuted, fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 5, transition: 'color 0.15s' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </button>
  );
}

// ── Color schemes ────────────────────────────────────────────────────────────
const LIGHT = {
  bg: '#FDF8F0', text: T.ink, muted: T.inkMuted, soft: T.inkSoft,
  border: T.line, headerBg: '#FFFFFF', card: '#F5ECD9', inputBg: '#FDF8F0',
};
const DARK = {
  bg: '#150D05', text: 'rgba(253,248,240,0.92)', muted: 'rgba(253,248,240,0.38)', soft: 'rgba(253,248,240,0.6)',
  border: 'rgba(184,115,58,0.2)', headerBg: '#1A0E07', card: 'rgba(255,255,255,0.06)', inputBg: 'rgba(255,255,255,0.07)',
};

// ── localStorage helpers ─────────────────────────────────────────────────────
// Moved to studySessions.js so the Desk/Notes surfaces can check for saved
// sessions without pulling this whole chunk in.

// ── History modal ────────────────────────────────────────────────────────────
function HistoryModal({ open, onClose, conversations, onLoad, onDelete, onNew }) {
  useEffect(() => {
    if (!open) return;
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open, onClose]);

  if (!open) return null;
  const convs = conversations.filter((c) => c.messages.length > 0);

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(44,24,16,0.55)', zIndex: 300, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '20px 16px', overflowY: 'auto', animation: 'fadeIn 0.15s ease' }}>
      <div onClick={(e) => e.stopPropagation()} className="fade-up" style={{ background: T.parchment, borderRadius: 18, maxWidth: 680, width: '100%', margin: '40px 0', border: `1px solid ${T.line}`, boxShadow: '0 20px 60px rgba(0,0,0,0.25)', overflow: 'hidden' }}>
        <div style={{ padding: '18px 20px', borderBottom: `1px solid ${T.line}`, background: T.cream, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: T.goldDark, marginBottom: 3 }}>Your history</div>
            <div style={{ fontFamily: T.serif, fontSize: 22, color: T.ink, fontWeight: 600, letterSpacing: '-0.018em' }}>Conversations</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => { onNew(); onClose(); }} style={{ background: T.ink, color: T.cream, border: 'none', borderRadius: 999, padding: '8px 16px', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>+ New</button>
            <button onClick={onClose} style={{ background: 'transparent', border: `1px solid ${T.line}`, borderRadius: 999, padding: '8px 14px', fontSize: 13, color: T.inkSoft, cursor: 'pointer' }}>Close</button>
          </div>
        </div>
        {convs.length === 0 && (
          <div style={{ padding: '48px 32px', textAlign: 'center', color: T.inkMuted, fontFamily: T.serif, fontSize: 16, lineHeight: 1.6 }}>
            No conversations yet.<br />Start asking. Your history will appear here.
          </div>
        )}
        {convs.map((c) => (
          <div key={c.id} onClick={() => { onLoad(c); onClose(); }}
            style={{ padding: '16px 20px', borderBottom: `1px solid ${T.line}`, cursor: 'pointer', background: T.white, display: 'flex', alignItems: 'center', gap: 12 }}
            onMouseEnter={(e) => (e.currentTarget.style.background = T.parchment)}
            onMouseLeave={(e) => (e.currentTarget.style.background = T.white)}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: T.serif, fontSize: 14, fontWeight: 600, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.title}</div>
              <div style={{ fontSize: 11, color: T.inkMuted, marginTop: 2 }}>
                {new Date(c.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                {' · '}{c.messages.length} message{c.messages.length !== 1 ? 's' : ''}
              </div>
            </div>
            <button onClick={(e) => { e.stopPropagation(); onDelete(c.id); }} style={{ background: 'none', border: 'none', fontSize: 13, color: T.inkMuted, cursor: 'pointer', flexShrink: 0, padding: '4px 6px' }}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function ChurchAiChat({ session, profile, churchId, churchPlan, onOpenDesk, inSplit, onNoteSaved, openSessionTitle, onSessionOpened, onSessionTitle, sermonBarEl }) {
  const userId  = session?.user?.id;
  const plan    = churchPlan ?? 'church_base';
  const ttsVoice = profile?.tts_voice ?? 'onyx';

  const [dark, setDark] = useState(() => localStorage.getItem('church_ask_dark') === '1');
  // Church Study is sermon research; the personal modes live on the personal side
  const [researchMode, setResearchMode] = useState(true);
  const C = dark ? DARK : LIGHT;
  function toggleDark() { setDark((d) => { localStorage.setItem('church_ask_dark', d ? '0' : '1'); return !d; }); }

  const aiUsage = useAiUsage(userId, plan);
  const { speakingId, paused: ttsPaused, speak: speakMsg, stop: stopTts, pause: pauseTts, resume: resumeTts, rewind: rewindTts, supported: ttsSupported } = useTextToSpeech({ voice: ttsVoice });

  // Conversation persistence
  const [convId, setConvId]       = useState(() => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`);
  const [convTitle, setConvTitle] = useState('New conversation');
  const [history, setHistory]     = useState(() => readConvs(userId, churchId));

  // Chat state
  const [messages, setMessages]   = useState([]);
  const [input, setInput]         = useState('');
  const [busy, setBusy]           = useState(false);
  const [error, setError]         = useState(null);

  // Action bar state
  const [savedToNoteIdx, setSavedToNoteIdx] = useState({});
  // Scripture-reference verification + tap-to-preview (same trust UX as Ask)
  const [refStatusMap, setRefStatusMap] = useState({});
  const [versePopover, setVersePopover] = useState(null); // { refRaw, text|null }
  const [saveError, setSaveError] = useState(null);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [flaggedMsgs, setFlaggedMsgs] = useState(new Set());

  // What this sermon's research has covered so far. Kept with the sermon's saved
  // conversation, so one sermon's research never leaks into another's.
  const [researchMemory, setResearchMemory] = useState(null);

  // Mode
  const [personType]     = useState(() => localStorage.getItem(`church_ask_mode_${userId}`) ?? 'deeper');

  // UI
  const [menuOpen, setMenuOpen]       = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  const bottomRef    = useRef(null);
  const inputRef     = useRef(null);
  const scrollRef    = useRef(null);
  const userScrolled = useRef(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (!userScrolled.current) {
      el.scrollTo({ top: el.scrollHeight, behavior: busy ? 'instant' : 'smooth' });
    }
  }, [messages, busy]);

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    userScrolled.current = !nearBottom;
    setShowScrollBtn(!nearBottom);
  }

  function scrollToBottom() {
    userScrolled.current = false;
    setShowScrollBtn(false);
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }

  // ── Highlight → note: select a passage in an answer, save just that ───────
  // Chip is positioned in the scroll container's content space (y includes
  // scrollTop) so it rides along with the text.
  const [selNote, setSelNote] = useState(null); // { text, x, y, saved }
  function handleSelectionEnd() {
    setTimeout(() => { // let the browser finalize the selection first
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed) { setSelNote((s) => (s?.saved ? s : null)); return; }
      const text = sel.toString().trim();
      if (text.length < 8) { setSelNote(null); return; }
      const node = sel.anchorNode?.nodeType === 1 ? sel.anchorNode : sel.anchorNode?.parentElement;
      const msgEl = node?.closest?.('[data-msg-role="assistant"]');
      const rootEl = scrollRef.current;
      if (!msgEl || !rootEl?.contains(msgEl)) { setSelNote(null); return; }
      const rect = sel.getRangeAt(0).getBoundingClientRect();
      const rootRect = rootEl.getBoundingClientRect();
      setSelNote({
        text,
        x: Math.min(Math.max(rect.left - rootRect.left + rect.width / 2, 76), rootRect.width - 76),
        y: Math.max(rect.top - rootRect.top + rootEl.scrollTop - 40, 2),
        saved: false,
      });
    }, 10);
  }
  async function saveSelectionToNotes() {
    if (!selNote || selNote.saved || !churchId || !userId) return;
    if (needSermon()) return;
    const sessionTitle = convTitle !== 'New conversation' ? convTitle : null;
    // A selected line is pasted onto the end of this session's one document.
    const { error } = await appendToSermonDoc(supabase, { churchId, userId, series: sessionTitle, html: section.clip(selNote.text) });
    if (!error) {
      setSelNote((s) => (s ? { ...s, saved: true } : s));
      onNoteSaved?.();
      try { window.getSelection()?.removeAllRanges(); } catch { /* ignore */ }
      setTimeout(() => setSelNote(null), 1400);
    }
  }

  // The desk (Bible pane, notes form) files things under the open session
  useEffect(() => { onSessionTitle?.(convTitle !== 'New conversation' ? convTitle : ''); }, [convTitle]);

  // Persist conversation to localStorage. A chat with no sermon open is listed in
  // history under its first question, but that never becomes a sermon name.
  useEffect(() => {
    if (messages.length === 0) return;
    const firstUser = messages.find((m) => m.role === 'user')?.content ?? '';
    const named = convTitle !== 'New conversation';
    const title = named ? convTitle : (firstUser ? firstUser.slice(0, 70) + (firstUser.length > 70 ? '…' : '') : convTitle);
    const updated = { id: convId, title, named, messages, memory: researchMemory, updatedAt: Date.now() };
    setHistory((prev) => {
      const next = [updated, ...prev.filter((c) => c.id !== convId)].slice(0, 50);
      writeConvs(userId, churchId, next);
      return next;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, researchMemory, convTitle]);

  // ── Send ──────────────────────────────────────────────────────────────────
  // Server said limit reached (its count is authoritative and can differ from
  // the local one) — flip into the same wall the local gate uses.
  const [serverLimit, setServerLimit] = useState(false);
  const atLimit = aiUsage.atLimit || serverLimit;

  async function send(text, opts = {}) {
    const prompt = (text ?? input).trim();
    if (!prompt || busy || atLimit) return;
    setInput(''); setError(null); setTimeout(() => inputRef.current?.focus(), 0);
    // "Fresh answer" asks the opening question again from a clean start
    if (opts.fresh) { setMore({}); setSavedParts({}); setSavedToNoteIdx({}); }
    const next = [...(opts.fresh ? [] : messages), { role: 'user', content: prompt }];
    setMessages(next);
    setBusy(true);
    let assistantContent = '';
    let fromSaved = false;
    try {
      const readerVersion = readingVersion();
      // The opening question goes without this sermon's memory, so its answer can be saved and replayed
      const system = researchMode
        ? researchSystem({ versionName: readerVersion.name, memory: next.length === 1 ? null : researchMemory })
        : PASTORAL_SYSTEM + (PER_TYPE[personType] ?? '');
      const res = await authedFetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ system, messages: next.map((m) => ({ role: m.role, content: m.content })), personType, plan, groundCommentary: researchMode, researchVersionName: readerVersion.name, fresh: opts.fresh === true }),
      });
      if (res.status === 429) {
        // Limit reached — show the upgrade wall, and put the question back in
        // the box so nothing typed is lost.
        setServerLimit(true);
        setMessages(messages);
        setInput(prompt);
        return;
      }
      if (!res.ok || !res.body) throw new Error((await res.text().catch(() => '')) || `HTTP ${res.status}`);
      setMessages((m) => [...m, { role: 'assistant', content: '' }]);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = '';
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const events = buf.split('\n\n'); buf = events.pop() ?? '';
        for (const raw of events) {
          const lines = raw.split('\n');
          const ev   = lines.find((l) => l.startsWith('event: '))?.slice(7).trim();
          const data = lines.find((l) => l.startsWith('data: '))?.slice(6);
          if (!ev || !data) continue;
          let payload; try { payload = JSON.parse(data); } catch { continue; }
          if (ev === 'cache_hit') fromSaved = true;
          if (ev === 'text') {
            assistantContent += payload.delta;
            setMessages((m) => { const c = m.slice(); c[c.length - 1] = { role: 'assistant', content: c[c.length - 1].content + payload.delta }; return c; });
          } else if (ev === 'error') throw new Error(payload.message || 'stream error');
        }
      }
    } catch (e) { setError(e.message || 'Something went wrong.');
    } finally {
      setBusy(false);
      if (assistantContent) {
        if (!fromSaved) aiUsage.increment();
        validateRefsForMsg(next.length, assistantContent);
        if (researchMode) {
          const allMsgs = [...next.map((m) => ({ role: m.role, content: m.content })), { role: 'assistant', content: assistantContent }];
          authedFetch('/api/research/update-memory', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: allMsgs, perSermon: true, prior: researchMemory ?? '' }),
          }).then(r => r.json()).then(d => { if (d.memory) setResearchMemory(d.memory); }).catch(() => {});
        }
      }
      inputRef.current?.focus();
    }
  }

  // ── Scripture refs: verify against the Bible API + preview on tap ─────────
  async function validateRefsForMsg(msgIdx, fullText) {
    const refs = extractRefs(fullText);
    if (refs.size === 0) return;
    setRefStatusMap((prev) => ({ ...prev, [msgIdx]: new Map([...refs.keys()].map((r) => [r, 'loading'])) }));
    const results = new Map();
    await Promise.all([...refs.entries()].map(async ([raw, verseId]) => {
      try {
        const res = await fetch(`/api/bible/${VALIDATION_BIBLE_ID}/verses/${verseId}`);
        results.set(raw, res.ok ? 'ok' : 'invalid');
      } catch { results.set(raw, 'invalid'); }
    }));
    setRefStatusMap((prev) => ({ ...prev, [msgIdx]: results }));
  }

  async function handleRefClick(refRaw) {
    const parsed = parseRef(refRaw);
    if (!parsed) return;
    const verseId = toApiPassageId(parsed);
    const version = readingVersion();
    setVersePopover({ refRaw, text: null, versionName: version.name });
    try {
      const res = await fetch(`/api/bible/${version.id}/verses/${verseId}`);
      if (!res.ok) { setVersePopover(null); return; }
      const json = await res.json();
      setVersePopover({ refRaw, text: json?.data?.content ?? null, versionName: version.name });
    } catch { setVersePopover(null); }
  }

  // ── Save to notes ─────────────────────────────────────────────────────────
  async function saveToNotes(assistantIdx) {
    if (!churchId || !userId) return;
    if (savedToNoteIdx[assistantIdx]) return;
    if (needSermon()) return;
    const question = messages.slice(0, assistantIdx).reverse().find((m) => m.role === 'user')?.content ?? '';
    const answer   = splitVoices(messages[assistantIdx]?.content).body;
    if (!answer) return;
    const sessionTitle = convTitle !== 'New conversation' ? convTitle : null;
    const { error } = await appendToSermonDoc(supabase, { churchId, userId, series: sessionTitle, html: section.answer(question, answer) });
    if (!error) { setSavedToNoteIdx((prev) => ({ ...prev, [assistantIdx]: true })); onNoteSaved?.(); }
  }

  // ── Flag ──────────────────────────────────────────────────────────────────
  async function handleFlag(msgIdx, msgText) {
    setFlaggedMsgs((prev) => new Set([...prev, msgIdx]));
    try {
      await authedFetch('/api/ai-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message_text: msgText?.slice(0, 4000) }),
      });
    } catch { /* fire-and-forget */ }
  }

  // ── Conversation management ───────────────────────────────────────────────
  function newConversation() {
    setMessages([]); setInput(''); setError(null); setSavedToNoteIdx({}); setSavedParts({}); setMore({}); setResearchMemory(null); setSaveError(null); setFlaggedMsgs(new Set());
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setConvId(id); setConvTitle('New conversation');
  }
  function loadConversation(conv) {
    setConvId(conv.id); setConvTitle(conv.named === false ? 'New conversation' : conv.title); setResearchMemory(conv.memory ?? null);
    setMessages(conv.messages); setSaveError(null); setError(null); setFlaggedMsgs(new Set()); setSavedToNoteIdx({}); setSavedParts({}); setMore({});
  }
  // "Clear this chat": empty the chat, keep the sermon open
  function clearChat() {
    const keep = convTitle;
    newConversation();
    setConvTitle(keep);
  }
  function deleteConversation(id) {
    setHistory((prev) => { const next = prev.filter((c) => c.id !== id); writeConvs(userId, churchId, next); return next; });
  }
  const isEmpty = messages.length === 0;

  // Note → thread: a saved note's series is its session title. Load that
  // session on request; if it isn't in this browser's history (sessions are
  // per-device), open the history picker instead of failing silently.
  useEffect(() => {
    if (!openSessionTitle) return;
    const conv = history.find((c) => c.title === openSessionTitle);
    if (conv) loadConversation(conv);
    else setHistoryOpen(true);
    onSessionOpened?.();
  }, [openSessionTitle]);

  // The sermons this church has a document for, newest first. The session title
  // doubles as a picker: bring up an old sermon, or one made ahead of time.
  const [sermons, setSermons] = useState([]);
  const [sermonMenuOpen, setSermonMenuOpen] = useState(false);
  const [newSermonName, setNewSermonName] = useState('');
  function refreshSermons() { listSermonDocs(supabase, churchId).then(setSermons, () => {}); }
  useEffect(() => { refreshSermons(); }, [churchId]);
  // a chat started with no sermon open: naming or picking a sermon keeps it
  const looseChat = convTitle === 'New conversation' && messages.length > 0;
  const [saveHint, setSaveHint] = useState(false);
  // Saving needs a sermon to save to. With none open, ask for one instead of guessing.
  function needSermon() {
    if (convTitle !== 'New conversation') return false;
    refreshSermons(); setSaveHint(true); setSermonMenuOpen(true);
    return true;
  }
  function switchToSermon(title) {
    setSermonMenuOpen(false); setSaveHint(false);
    if (title === convTitle) return;
    const conv = history.find((c) => c.title === title && c.named !== false);
    if (conv) loadConversation(conv);
    else { if (!looseChat) newConversation(); setConvTitle(title); }
  }
  async function createSermon(rawName) {
    const name = (rawName || '').trim();
    if (!name || !churchId || !userId) return;
    setSermonMenuOpen(false); setNewSermonName(''); setSaveHint(false);
    if (!looseChat) newConversation();
    setConvTitle(name);
    await ensureSermonDoc(supabase, { churchId, userId, series: name });
    refreshSermons();
    onNoteSaved?.();
  }
  // Add one part of an answer to the sermon's page
  const [savedParts, setSavedParts] = useState({});
  async function savePartToNotes(msgIdx, partIdx, md) {
    const key = `${msgIdx}:${partIdx}`;
    if (!churchId || !userId || savedParts[key]) return;
    if (needSermon()) return;
    const sessionTitle = convTitle !== 'New conversation' ? convTitle : null;
    const { error } = await appendToSermonDoc(supabase, { churchId, userId, series: sessionTitle, html: section.part(md) });
    if (!error) { setSavedParts((prev) => ({ ...prev, [key]: true })); onNoteSaved?.(); refreshSermons(); }
  }

  // Tabs under a research answer: each pulls one more piece, only when tapped.
  // { [msgIdx]: { active: tabKey, items: { [tabKey]: { text, loading, error } } } }
  const [more, setMore] = useState({});
  const tabKey = (tab) => (tab.voice ? `voice:${tab.voice}` : tab.id);
  async function loadMore(i, tab) {
    const key = tabKey(tab);
    const kept = messages[i]?.more?.[key];
    const have = more[i]?.items?.[key] ?? (kept ? { text: kept } : null);
    if (more[i]?.active === key && !have?.error) { setMore((p) => ({ ...p, [i]: { ...p[i], active: null } })); return; }
    setMore((p) => ({ ...p, [i]: { active: key, items: { ...(p[i]?.items ?? {}) } } }));
    if (have && !have.error) return;
    const put = (patch) => setMore((p) => ({ ...p, [i]: { ...p[i], items: { ...(p[i]?.items ?? {}), [key]: { ...(p[i]?.items?.[key] ?? { text: '' }), ...patch } } } }));
    if (atLimit) { put({ text: '', loading: false, error: 'limit' }); return; }
    put({ text: '', loading: true, error: null });
    const question = messages.slice(0, i).reverse().find((m) => m.role === 'user')?.content ?? '';
    const readerVersion = readingVersion();
    // Tabs under the opening answer stand alone (no memory), so they can be saved and replayed too
    const system = researchSystem({ versionName: readerVersion.name, memory: i === 1 ? null : researchMemory });
    let text = '';
    let fromSaved = false;
    try {
      const res = await authedFetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ system, messages: [...(i === 1 ? [] : messages.slice(0, i + 1).map((m) => ({ role: m.role, content: m.content }))), { role: 'user', content: moreRequest(tab, question) }], personType, plan, groundCommentary: true, researchTab: true, researchVersionName: readerVersion.name }),
      });
      if (res.status === 429) { setServerLimit(true); put({ loading: false, error: 'limit' }); return; }
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = '';
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const events = buf.split('\n\n'); buf = events.pop() ?? '';
        for (const raw of events) {
          const lines = raw.split('\n');
          const ev   = lines.find((l) => l.startsWith('event: '))?.slice(7).trim();
          const data = lines.find((l) => l.startsWith('data: '))?.slice(6);
          if (!ev || !data) continue;
          let payload; try { payload = JSON.parse(data); } catch { continue; }
          if (ev === 'cache_hit') fromSaved = true;
          if (ev === 'text') { text += payload.delta; put({ text }); }
          else if (ev === 'error') throw new Error(payload.message || 'stream error');
        }
      }
      put({ text: splitVoices(text).body, loading: false });
      const done = splitVoices(text).body;
      if (done) setMessages((m) => m.map((x, k) => (k === i ? { ...x, more: { ...(x.more ?? {}), [key]: done } } : x)));
      if (text && !fromSaved) aiUsage.increment();
    } catch {
      put({ loading: false, error: text ? null : 'failed' });
    }
  }
  async function saveMoreToNotes(i, tab) {
    const key = `${i}:more:${tabKey(tab)}`;
    const text = more[i]?.items?.[tabKey(tab)]?.text ?? messages[i]?.more?.[tabKey(tab)];
    if (!churchId || !userId || !text || savedParts[key]) return;
    if (needSermon()) return;
    const sessionTitle = convTitle !== 'New conversation' ? convTitle : null;
    const html = `<h3>${(tab.voice ?? tab.label).replace(/&/g, '&amp;').replace(/</g, '&lt;')}</h3>${section.part(text)}`;
    const { error } = await appendToSermonDoc(supabase, { churchId, userId, series: sessionTitle, html });
    if (!error) { setSavedParts((prev) => ({ ...prev, [key]: true })); onNoteSaved?.(); refreshSermons(); }
  }

  // The sermon bar: name, list and New sermon. On the Study screen it sits across
  // the top of all three panes (portaled into the slot ChurchAdmin gives us).
  const B = sermonBarEl ? { text: T.ink, border: T.line, soft: T.inkSoft } : C;
  const sermonBar = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0, marginRight: 8 }}>
      <KinwoveStar size={15} style={{ flexShrink: 0 }} />
      <span style={{ fontSize: 15, fontFamily: T.serif, fontWeight: 600, color: convTitle === 'New conversation' ? B.soft : B.text, opacity: convTitle === 'New conversation' ? 0.7 : 1, letterSpacing: '-0.01em', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {convTitle === 'New conversation' ? 'No sermon open' : convTitle}
      </span>
      <div style={{ position: 'relative', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
        <button
          onClick={() => { if (!sermonMenuOpen) refreshSermons(); setSermonMenuOpen((v) => !v); }}
          title="Your sermons"
          style={{ background: sermonMenuOpen ? 'rgba(184,115,58,0.18)' : 'transparent', border: `1px solid ${sermonMenuOpen ? T.gold : B.border}`, color: B.soft, borderRadius: 999, padding: '4px 10px', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap' }}
        >
          Sermons <span style={{ fontSize: 9, opacity: 0.6 }}>▾</span>
        </button>
        <button
          onClick={() => { refreshSermons(); setSermonMenuOpen(true); }}
          style={{ background: T.gold, color: T.cream, border: 'none', borderRadius: 999, padding: '5px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', marginLeft: 6 }}
        >
          + New sermon
        </button>
        {sermonMenuOpen && <div onClick={() => { setSermonMenuOpen(false); setSaveHint(false); }} style={{ position: 'fixed', inset: 0, zIndex: 199 }} />}
        {sermonMenuOpen && (
          <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: T.white, border: `1px solid ${T.line}`, borderRadius: 14, boxShadow: '0 8px 32px rgba(44,24,16,0.18)', width: 'min(340px, 80vw)', zIndex: 200, overflow: 'hidden' }}>
            {saveHint && (
              <div style={{ padding: '10px 12px 0', fontSize: 12.5, color: T.goldDark, fontFamily: T.sans, fontWeight: 600, lineHeight: 1.45 }}>Name a sermon or pick one, then add it again. This chat comes with it.</div>
            )}
            <form onSubmit={(e) => { e.preventDefault(); createSermon(newSermonName); }} style={{ display: 'flex', gap: 6, padding: 10, borderBottom: `1px solid ${T.line}` }}>
              <input
                autoFocus value={newSermonName} onChange={(e) => setNewSermonName(e.target.value)}
                placeholder="New sermon name…"
                style={{ flex: 1, minWidth: 0, border: `1px solid ${T.line}`, borderRadius: 8, padding: '7px 10px', fontSize: 13, fontFamily: T.sans, color: T.ink, background: T.parchment, outline: 'none' }}
              />
              <button type="submit" disabled={!newSermonName.trim()} style={{ background: T.ink, color: T.cream, border: 'none', borderRadius: 8, padding: '7px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer', opacity: newSermonName.trim() ? 1 : 0.5 }}>Create</button>
            </form>
            <div style={{ maxHeight: 320, overflowY: 'auto' }}>
              {sermons.length === 0 && (
                <div style={{ padding: '14px 14px', fontSize: 12.5, color: T.inkMuted, lineHeight: 1.5 }}>No sermons yet. Name one above to start its page.</div>
              )}
              {sermons.map((sm) => {
                const active = sm.title === convTitle;
                return (
                  <button key={sm.id} onClick={() => switchToSermon(sm.title)}
                    style={{ width: '100%', textAlign: 'left', background: active ? 'rgba(184,115,58,0.10)' : 'none', border: 'none', borderBottom: `1px solid ${T.line}`, padding: '10px 14px', cursor: 'pointer', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
                    <span style={{ fontFamily: T.serif, fontSize: 14, fontWeight: 600, color: active ? T.goldDark : T.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sm.title}</span>
                    <span style={{ fontSize: 11, color: T.inkMuted, flexShrink: 0 }}>{new Date(sm.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <HistoryModal open={historyOpen} onClose={() => setHistoryOpen(false)} conversations={history} onLoad={loadConversation} onDelete={deleteConversation} onNew={newConversation} />

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden', background: C.bg, color: C.text, transition: 'background 0.2s, color 0.2s', borderRadius: inSplit ? 0 : 8, padding: inSplit ? '12px 16px' : '12px 20px', position: 'relative' }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10, borderBottom: `1px solid ${C.border}`, marginBottom: 4, flexShrink: 0 }}>
          {sermonBarEl
            ? <>{createPortal(sermonBar, sermonBarEl)}<span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: C.muted, flex: 1 }}>Research</span></>
            : sermonBar}

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setMenuOpen((v) => !v)} style={{ background: menuOpen ? 'rgba(184,115,58,0.18)' : 'transparent', border: `1px solid ${menuOpen ? T.gold : C.border}`, color: C.soft, borderRadius: 999, padding: '5px 11px', fontSize: 16, cursor: 'pointer', lineHeight: 1 }}>⋮</button>
            {menuOpen && <div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 199 }} />}
            {menuOpen && (
              <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: C.headerBg, border: `1px solid ${C.border}`, borderRadius: 14, boxShadow: '0 8px 32px rgba(44,24,16,0.18)', overflow: 'hidden', minWidth: 220, zIndex: 200 }}>
                {/* Dark mode toggle */}
                <button onClick={() => { toggleDark(); setMenuOpen(false); }} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', borderBottom: `1px solid ${C.border}`, padding: '13px 16px', fontSize: 14, color: C.text, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 15 }}>{dark ? '☀' : '🌙'}</span>
                    <span>{dark ? 'Light mode' : 'Dark mode'}</span>
                  </span>
                </button>
                <button onClick={() => { clearChat(); setMenuOpen(false); }} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', borderBottom: `1px solid ${C.border}`, padding: '13px 16px', fontSize: 14, color: C.text, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 16, lineHeight: 1 }}>↺</span><span style={{ fontWeight: 700 }}>Clear this chat</span>
                </button>
                <button onClick={() => { setHistoryOpen(true); setMenuOpen(false); }} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '13px 16px', fontSize: 14, color: C.text, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 15 }}>◷</span><span>Conversation history</span>
                </button>
              </div>
            )}
          </div>
          </div>{/* end right-side flex group */}
        </div>

        {/* ── Messages ── */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseUp={handleSelectionEnd}
          onTouchEnd={handleSelectionEnd}
          style={{ flex: 1, overflowY: 'auto', padding: '12px 0', position: 'relative' }}
        >
          {/* Floating "Add to notes" chip over a text selection */}
          {selNote && (
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={saveSelectionToNotes}
              style={{
                position: 'absolute', top: selNote.y, left: selNote.x, transform: 'translateX(-50%)',
                zIndex: 30, background: selNote.saved ? '#3d6b35' : T.ink, color: T.cream,
                border: 'none', borderRadius: 999, padding: '6px 13px', fontSize: 12, fontWeight: 600,
                cursor: 'pointer', boxShadow: '0 3px 12px rgba(26,17,8,0.35)', whiteSpace: 'nowrap',
              }}
            >
              {selNote.saved ? '✓ Noted' : '📝 Add to notes'}
            </button>
          )}
          {isEmpty && !atLimit && (
            <div style={{ textAlign: 'center', padding: '24px 0 32px' }}>
              <div style={{ marginBottom: 10 }}><KinwoveStar size={22} /></div>
              {researchMode ? (
                <>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.muted, marginBottom: 12 }}>📚 Sermon Research</div>
                  <div style={{ fontSize: 13, color: C.soft, lineHeight: 1.6, maxWidth: 380, margin: '0 auto 6px' }}>
                    Multi-source commentary briefs: Calvin, Wesley, N.T. Wright, Church Fathers, and more.
                  </div>
                  <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.5, maxWidth: 360, margin: '0 auto 24px' }}>
                    Every response shows what different scholars say and where they disagree, so you can come to your own conclusion.
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 480, margin: '0 auto', textAlign: 'left' }}>
                    {RESEARCH_STARTERS.map((s) => (
                      <button key={s} onClick={() => send(s)} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: '10px 14px', fontSize: 13, color: C.soft, cursor: 'pointer', textAlign: 'left', lineHeight: 1.45, fontFamily: T.serif, fontStyle: 'italic' }}>{s}</button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.muted, marginBottom: 12 }}>Pastoral AI</div>
                  <div style={{ fontSize: 13, color: C.soft, lineHeight: 1.6, maxWidth: 340, margin: '0 auto 24px' }}>Theology, sermon prep, pastoral care, exegesis. Ask anything.</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 440, margin: '0 auto', textAlign: 'left' }}>
                    {STARTERS.map((s) => (
                      <button key={s} onClick={() => send(s)} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: '10px 14px', fontSize: 13, color: C.soft, cursor: 'pointer', textAlign: 'left', lineHeight: 1.45, fontFamily: T.serif, fontStyle: 'italic' }}>{s}</button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* At the monthly limit with no conversation open: center the upgrade
              card in the empty space instead of leaving a large blank void. */}
          {isEmpty && atLimit && (
            <div style={{ minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 0' }}>
              <AiLimitWall plan={plan} panelMode onTopupSuccess={() => { setServerLimit(false); aiUsage.refreshAfterTopup(); }} />
            </div>
          )}

          {messages.map((m, i) => {
            const isAssistant = m.role === 'assistant';
            const isStreaming  = isAssistant && m.content === '' && busy;
            const isLast       = i === messages.length - 1;
            const canAct       = isAssistant && !isStreaming && m.content.length > 0 && !(isLast && busy);
            const { body, voices } = isAssistant ? splitVoices(m.content) : { body: m.content, voices: [] };
            return (
              <div key={i} style={{ marginBottom: 20, display: 'flex', flexDirection: 'column', alignItems: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                {m.role === 'user' ? (
                  <div style={{ maxWidth: '80%', background: T.ink, color: T.cream, borderRadius: '16px 16px 4px 16px', padding: '10px 14px', fontSize: 14, lineHeight: 1.55 }}>
                    {m.content}
                  </div>
                ) : (
                  <>
                    <div data-msg-role="assistant" style={{ maxWidth: '100%', background: 'transparent', fontSize: 15, lineHeight: 1.72, color: C.text, fontFamily: T.serif, letterSpacing: '-0.01em', wordBreak: 'break-word' }}>
                      {isStreaming
                        ? <span style={{ color: T.inkMuted, fontStyle: 'italic' }}>…</span>
                        : (() => {
                          // A finished answer shows its parts, each with its own "add to notes"
                          const parts = canAct && churchId ? splitSections(body) : [];
                          if (parts.length < 2) return <MsgText text={body} onRefClick={handleRefClick} refStatus={refStatusMap[i]} plain={m.role === 'assistant'} />;
                          return parts.map((part, k) => {
                            const added = savedParts[`${i}:${k}`];
                            return (
                              <div key={k} style={{ padding: '10px 0 8px', borderTop: k ? `1px solid ${C.border}` : 'none' }}>
                                <MsgText text={part} onRefClick={handleRefClick} refStatus={refStatusMap[i]} plain />
                                <div style={{ marginTop: 6 }}>
                                  <button
                                    onClick={() => savePartToNotes(i, k, part)}
                                    title={added ? 'Added to this sermon\'s notes' : 'Add just this part to this sermon\'s notes'}
                                    style={{ background: added ? 'rgba(61,107,53,0.10)' : 'transparent', border: `1px solid ${added ? 'rgba(61,107,53,0.35)' : C.border}`, color: added ? '#3d6b35' : C.soft, borderRadius: 999, padding: '3px 11px', fontSize: 11.5, fontFamily: T.sans, fontWeight: 600, letterSpacing: 0, cursor: added ? 'default' : 'pointer' }}
                                  >
                                    {added ? '✓ Added to notes' : '＋ Add this part to notes'}
                                  </button>
                                </div>
                              </div>
                            );
                          });
                        })()
                      }
                    </div>

                    {/* ── More on this: one tab per voice or kind, fetched when tapped ── */}
                    {canAct && researchMode && (() => {
                      const tabs = [...voices.map((v) => ({ voice: v, label: v })), ...MORE_KINDS];
                      const st = more[i];
                      const open = tabs.find((t) => tabKey(t) === st?.active);
                      const item = open ? (st.items?.[tabKey(open)] ?? (m.more?.[tabKey(open)] ? { text: m.more[tabKey(open)] } : null)) : null;
                      const added = open ? savedParts[`${i}:more:${tabKey(open)}`] : false;
                      return (
                        <div style={{ width: '100%', marginTop: 12 }}>
                          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: C.muted, marginRight: 2 }}>More</span>
                            {tabs.map((t) => {
                              const on = st?.active === tabKey(t);
                              return (
                                <button key={tabKey(t)} onClick={() => loadMore(i, t)}
                                  style={{ background: on ? T.ink : (t.voice ? 'rgba(184,115,58,0.10)' : 'transparent'), color: on ? T.cream : (t.voice ? T.goldDark : C.soft), border: `1px solid ${on ? T.ink : (t.voice ? 'rgba(184,115,58,0.35)' : C.border)}`, borderRadius: 999, padding: '4px 12px', fontSize: 12, fontFamily: T.sans, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                                  {t.label}{!on && (st?.items?.[tabKey(t)]?.text || m.more?.[tabKey(t)]) ? ' ✓' : ''}
                                </button>
                              );
                            })}
                          </div>
                          {open && (
                            <div data-more-panel style={{ marginTop: 10, padding: '12px 14px', border: `1px solid ${C.border}`, borderRadius: 12, background: C.card, fontSize: 15, lineHeight: 1.72, color: C.text, fontFamily: T.serif, letterSpacing: '-0.01em', wordBreak: 'break-word' }}>
                              {item?.error === 'failed' && <span style={{ fontFamily: T.sans, fontSize: 13, color: C.soft }}>That did not load. Tap the tab again to retry.</span>}
                              {item?.error === 'limit' && <span style={{ fontFamily: T.sans, fontSize: 13, color: C.soft }}>You have used all your questions for now. Tabs you already opened still work.</span>}
                              {!item?.error && !item?.text && <span style={{ color: T.inkMuted, fontStyle: 'italic' }}>…</span>}
                              {item?.text && <MsgText text={item.text} onRefClick={handleRefClick} plain />}
                              {item?.text && !item.loading && churchId && (
                                <div style={{ marginTop: 8 }}>
                                  <button onClick={() => saveMoreToNotes(i, open)}
                                    style={{ background: added ? 'rgba(61,107,53,0.10)' : 'transparent', border: `1px solid ${added ? 'rgba(61,107,53,0.35)' : C.border}`, color: added ? '#3d6b35' : C.soft, borderRadius: 999, padding: '3px 11px', fontSize: 11.5, fontFamily: T.sans, fontWeight: 600, letterSpacing: 0, cursor: added ? 'default' : 'pointer' }}>
                                    {added ? '✓ Added to notes' : '＋ Add this part to notes'}
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {/* ── Action bar ── */}
                    {canAct && (
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 2, marginTop: 8, flexWrap: 'wrap' }}>

                        {/* Save to notes */}
                        {churchId && (
                          <ActionBtn
                            onClick={() => saveToNotes(i)}
                            title={savedToNoteIdx[i] ? 'The whole answer is on this sermon\'s page' : 'Add the whole answer to this sermon\'s page'}
                            active={savedToNoteIdx[i]}
                          >
                            📝 {savedToNoteIdx[i] ? 'Whole answer added' : 'Add whole answer'}
                          </ActionBtn>
                        )}

                        {/* Fresh answer: only on the opening answer, before any follow-up */}
                        {researchMode && i === 1 && messages.length === 2 && (
                          <ActionBtn onClick={() => send(messages[0].content, { fresh: true })} title="Ask this again for a new take">
                            ↻ Fresh answer
                          </ActionBtn>
                        )}

                        {/* Share */}
                        <ActionBtn
                          onClick={async () => {
                            const text = body;
                            if (navigator.share) {
                              try { await navigator.share({ text }); } catch {}
                            } else {
                              try { await navigator.clipboard.writeText(text); } catch {}
                            }
                          }}
                          title="Share this response"
                        >
                          <ShareIcon size={13} />
                          Share
                        </ActionBtn>

                        {/* Flag */}
                        {!flaggedMsgs.has(i) ? (
                          <ActionBtn
                            onClick={() => handleFlag(i, m.content)}
                            title="Something seems off, flag this response"
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#c05050')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = T.inkMuted)}
                          >
                            <FlagIcon size={13} />
                            Flag
                          </ActionBtn>
                        ) : (
                          <span style={{ padding: '4px 8px', fontSize: 12, color: T.inkMuted }}>Flagged</span>
                        )}

                        {/* Copy */}
                        <ActionBtn
                          onClick={async () => {
                            try { await navigator.clipboard.writeText(body); setCopiedIdx(i); setTimeout(() => setCopiedIdx(null), 2000); } catch {}
                          }}
                          title="Copy response"
                          active={copiedIdx === i}
                        >
                          {copiedIdx === i ? <CheckIcon size={13} /> : <CopyIcon size={13} />}
                          {copiedIdx === i ? 'Copied' : 'Copy'}
                        </ActionBtn>

                        {/* Listen / playback controls */}
                        {ttsSupported && (
                          speakingId === i ? (
                            // ── Active playback bar ──
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, background: dark ? 'rgba(184,115,58,0.12)' : 'rgba(184,115,58,0.08)', borderRadius: 999, padding: '2px 6px 2px 4px' }}>
                              {/* Waveform indicator */}
                              {!ttsPaused && (
                                <span style={{ display: 'inline-flex', alignItems: 'flex-end', gap: 2, height: 13, marginRight: 4, marginLeft: 2 }}>
                                  {[1, 0.5, 0.8, 0.4].map((h, k) => (
                                    <span key={k} style={{ width: 3, borderRadius: 2, background: T.gold, height: `${h * 100}%`, animation: `micPulse 0.8s ease-in-out ${k * 0.15}s infinite alternate` }} />
                                  ))}
                                </span>
                              )}
                              {/* ⏪ -10s */}
                              <button
                                onClick={() => rewindTts(10)}
                                title="Back 10 seconds"
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.gold, fontSize: 12, padding: '4px 6px', display: 'inline-flex', alignItems: 'center', gap: 3 }}
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/>
                                </svg>
                                <span style={{ fontSize: 10, fontWeight: 700 }}>10</span>
                              </button>
                              {/* ⏸/▶ pause/resume */}
                              <button
                                onClick={() => ttsPaused ? resumeTts() : pauseTts()}
                                title={ttsPaused ? 'Resume' : 'Pause'}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.gold, fontSize: 12, padding: '4px 6px', display: 'inline-flex', alignItems: 'center' }}
                              >
                                {ttsPaused ? (
                                  // ▶ play
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill={T.gold} stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                                ) : (
                                  // ⏸ pause
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill={T.gold} stroke="none"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                                )}
                              </button>
                              {/* ■ stop */}
                              <button
                                onClick={() => stopTts()}
                                title="Stop"
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.soft, fontSize: 12, padding: '4px 6px', display: 'inline-flex', alignItems: 'center' }}
                              >
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                              </button>
                            </span>
                          ) : (
                            <ActionBtn onClick={() => speakMsg(i, body)} title="Read aloud">
                              <SpeakerIcon size={13} />
                              Listen
                            </ActionBtn>
                          )
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}

          {error && <div style={{ fontSize: 13, color: '#A53F2B', padding: '8px 0', textAlign: 'center' }}>{error}</div>}
          {saveError && <div style={{ fontSize: 12, color: '#A53F2B', padding: '6px 0', textAlign: 'center' }}>{saveError}</div>}
          <div ref={bottomRef} />
        </div>

        {/* ── Scroll to bottom button ── */}
        {showScrollBtn && (
          <button
            onClick={scrollToBottom}
            style={{
              position: 'absolute', bottom: 90, left: '50%', transform: 'translateX(-50%)',
              background: T.ink, color: T.cream, border: 'none', borderRadius: 999,
              padding: '7px 16px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(26,17,8,0.25)', zIndex: 10, whiteSpace: 'nowrap',
            }}
          >
            {busy ? '↓ Still loading' : '↓ Scroll to bottom'}
          </button>
        )}

        {/* ── Input ── */}
        {atLimit ? (
          // When the chat is empty the wall is centered in the message area
          // above, so only pin it at the bottom when there's a conversation.
          !isEmpty && (
            <div style={{ overflowY: 'auto', flexShrink: 0, maxHeight: '70%' }}>
              <AiLimitWall plan={plan} panelMode onTopupSuccess={() => { setServerLimit(false); aiUsage.refreshAfterTopup(); }} />
            </div>
          )
        ) : (
          <div style={{ borderTop: `1px solid ${C.border}`, padding: '12px 0 0', flexShrink: 0 }}>
            {/* Mobile: floating desk buttons above input */}
            {onOpenDesk && (
              <div style={{ display: 'flex', gap: 7, marginBottom: 10, justifyContent: 'flex-end' }}>
                <button
                  onClick={() => onOpenDesk('bible')}
                  style={{ background: 'rgba(184,115,58,0.10)', border: `1px solid rgba(184,115,58,0.28)`, borderRadius: 999, padding: '5px 13px', fontSize: 12, fontWeight: 600, color: T.gold, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}
                >📖 Bible</button>
                <button
                  onClick={() => onOpenDesk('notes')}
                  style={{ background: 'rgba(184,115,58,0.10)', border: `1px solid rgba(184,115,58,0.28)`, borderRadius: 999, padding: '5px 13px', fontSize: 12, fontWeight: 600, color: T.gold, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}
                >📝 Notes</button>
              </div>
            )}
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder={researchMode ? 'Enter a passage or topic to research…' : 'Ask a theological question…'}
                rows={2}
                style={{ flex: 1, padding: '10px 14px', borderRadius: 12, border: `1px solid ${C.border}`, fontSize: 14, fontFamily: T.sans ?? 'inherit', background: C.inputBg, color: C.text, outline: 'none', resize: 'none', lineHeight: 1.5 }}
              />
              <button
                onClick={() => send()}
                disabled={busy || !input.trim()}
                style={{ padding: '10px 18px', borderRadius: 12, border: 'none', background: busy || !input.trim() ? T.line : T.ink, color: T.cream, fontSize: 14, fontWeight: 600, cursor: busy || !input.trim() ? 'default' : 'pointer', flexShrink: 0, alignSelf: 'flex-end', transition: 'background 0.15s' }}
              >{busy ? '…' : '↑'}</button>
            </div>
          </div>
        )}
      </div>

      {/* Verse preview — tap a scripture chip in an answer to read it in place */}
      {versePopover && (
        <div
          onClick={() => setVersePopover(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 400, background: 'rgba(44,24,16,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#FDF8F0', borderRadius: '20px 20px 0 0', padding: '24px 24px 36px', width: '100%', maxWidth: 560, boxShadow: '0 -8px 40px rgba(44,24,16,0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#A85530', letterSpacing: 1.5, textTransform: 'uppercase' }}>
                {versePopover.refRaw.replace(/[()*]/g, '')}
              </span>
              <button onClick={() => setVersePopover(null)} aria-label="Close" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9C7B5E', fontSize: 18, lineHeight: 1, padding: '0 0 0 12px' }}>×</button>
            </div>
            {versePopover.text === null
              ? <div style={{ fontSize: 15, color: '#9C7B5E', fontStyle: 'italic' }}>Loading…</div>
              : <p style={{ fontFamily: T.serif, fontSize: 17, lineHeight: 1.75, color: '#2C1810', margin: '0 0 10px', maxHeight: '55vh', overflowY: 'auto' }}>{versePopover.text}</p>}
            <div style={{ fontSize: 11, color: '#9C7B5E' }}>{versePopover.versionName} · api.bible</div>
          </div>
        </div>
      )}
    </>
  );
}
