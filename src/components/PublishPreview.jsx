import { useEffect, useState } from 'react';
import { T } from '../theme.js';
import { supabase, authedFetch } from '../supabase.js';
import { KinwoveStar } from './brand/KinwoveStar.jsx';

export const PASTOR_NOTE_MAX = 400;

// What the congregation will see when a sermon goes out: the feed card and the
// email, with an optional short note from the pastor on both. Nothing is posted
// or sent until the pastor presses Publish here.
export default function PublishPreview({ churchId, sermonId, title, scriptureRef, initialNote = '', busy = false, onPublish, onCancel, dailyQuestions = null }) {
  // The week's daily questions: passed in from the editor, or read for a saved sermon (dashboard)
  const [savedQuestions, setSavedQuestions] = useState([]);
  useEffect(() => {
    if (dailyQuestions || !sermonId) return;
    supabase.from('sermon_content').select('body, day, sort_order').eq('sermon_id', sermonId).eq('kind', 'daily_verse')
      .order('day', { ascending: true, nullsFirst: false }).order('sort_order', { ascending: true })
      .then(({ data }) => setSavedQuestions((data ?? []).filter((q) => q.body?.trim())), () => {});
  }, [sermonId, dailyQuestions]);
  const questions = dailyQuestions ?? savedQuestions;
  const firstQuestion = questions[0]?.body ?? '';
  const [note, setNote] = useState(initialNote);
  // The pastor can publish quietly (a small fix, a midweek extra) without emailing everyone
  const [sendEmail, setSendEmail] = useState(true);
  const [churchName, setChurchName] = useState('');
  // An email goes out the first time a sermon is published; republishing an edit
  // updates the feed post without emailing everyone again.
  const [alreadyPosted, setAlreadyPosted] = useState(false);

  useEffect(() => {
    if (!churchId) return;
    supabase.from('churches').select('name').eq('id', churchId).maybeSingle()
      .then(({ data }) => setChurchName(data?.name ?? ''), () => {});
  }, [churchId]);
  useEffect(() => {
    if (!churchId || !sermonId) return;
    supabase.from('posts').select('id, body_data').eq('scope', 'church').eq('scope_id', churchId)
      .contains('body_data', { sermon_id: sermonId, is_sermon_announcement: true }).limit(1)
      .then(({ data }) => {
        const ann = data?.[0];
        setAlreadyPosted(!!ann);
        if (ann?.body_data?.pastor_note && !initialNote) setNote(ann.body_data.pastor_note);
      }, () => {});
  }, [churchId, sermonId]); // eslint-disable-line react-hooks/exhaustive-deps

  // The real email, built by the server with this week's church posts and prayers
  const [emailHtml, setEmailHtml] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  useEffect(() => {
    if (!churchId || alreadyPosted || !sendEmail) return;
    const t = setTimeout(() => {
      authedFetch('/api/sermon-email-preview', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ churchId, title, scriptureRef, note, firstQuestion }),
      }).then((r) => (r.ok ? r.json() : null)).then((d) => {
        if (d?.html) { setEmailHtml(d.html); setEmailSubject(d.subject ?? ''); }
      }).catch(() => {});
    }, 400);
    return () => clearTimeout(t);
  }, [churchId, title, scriptureRef, note, alreadyPosted, sendEmail, firstQuestion]);

  // One test copy to yourself; an admin can send it to another address
  const [isAdmin, setIsAdmin] = useState(false);
  const [testTo, setTestTo] = useState('hello@kinwove.com');
  const [testState, setTestState] = useState('idle'); // idle | sending | sent | error
  const [testMsg, setTestMsg] = useState('');
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const id = data?.user?.id;
      if (!id) return;
      supabase.from('profiles').select('is_admin').eq('id', id).maybeSingle()
        .then(({ data: p }) => setIsAdmin(!!p?.is_admin), () => {});
    }, () => {});
  }, []);
  async function sendTest() {
    setTestState('sending'); setTestMsg('');
    try {
      const r = await authedFetch('/api/sermon-email-test', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ churchId, title, scriptureRef, note, firstQuestion, ...(isAdmin && testTo.trim() ? { to: testTo.trim() } : {}) }),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) { setTestState('error'); setTestMsg(d?.error ?? "Couldn't send the test"); return; }
      setTestState('sent'); setTestMsg(`Test sent to ${d.to}`);
    } catch { setTestState('error'); setTestMsg("Couldn't send the test"); }
  }

  const label = { fontSize: 10.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.inkMuted, margin: '18px 0 8px' };
  const trimmed = note.trim();

  return (
    <div onClick={() => !busy && onCancel()} style={{ position: 'fixed', left: 0, right: 0, top: 'var(--vvtop, 0px)', height: 'var(--vvh, 100%)', zIndex: 520, background: 'rgba(26,17,8,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, boxSizing: 'border-box' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: T.cream, borderRadius: 18, width: '100%', maxWidth: 520, maxHeight: '100%', overflowY: 'auto', padding: '22px 20px 18px', boxSizing: 'border-box', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ fontFamily: T.serif, fontSize: 21, fontWeight: 600, color: T.ink }}>Before it goes out</div>
        <div style={{ fontSize: 13.5, color: T.inkSoft, marginTop: 4, lineHeight: 1.5 }}>
          This is what your congregation will see. Your outline and notes stay private.
        </div>

        <div style={label}>A note from you · optional</div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value.slice(0, PASTOR_NOTE_MAX))}
          rows={3}
          placeholder="A line for your people, e.g. looking forward to Sunday, bring a friend"
          style={{ width: '100%', boxSizing: 'border-box', border: `1px solid ${T.line}`, borderRadius: 12, padding: '10px 12px', fontSize: 15, fontFamily: T.serif, color: T.ink, background: T.white, resize: 'vertical', outline: 'none', lineHeight: 1.5 }}
        />
        <div style={{ fontSize: 11, color: T.inkMuted, textAlign: 'right', marginTop: 2 }}>{note.length}/{PASTOR_NOTE_MAX}</div>

        <div style={label}>In your church feed</div>
        <div style={{ background: T.parchment, border: `1px solid ${T.goldLight}`, borderRadius: 12, padding: '12px 14px' }}>
          <div style={{ fontSize: 11, letterSpacing: 1.4, textTransform: 'uppercase', color: T.goldDark, fontWeight: 700, marginBottom: 6, display: 'flex', alignItems: 'center' }}>
            <KinwoveStar size={12} style={{ marginRight: 5, flexShrink: 0 }} /> This week's sermon
          </div>
          <div style={{ fontFamily: T.serif, fontSize: 17, fontWeight: 600, color: T.ink, lineHeight: 1.3, marginBottom: 4 }}>{title.trim() || 'Untitled sermon'}</div>
          {scriptureRef?.trim() && <div style={{ fontSize: 13, color: T.goldDark, fontStyle: 'italic', marginBottom: 6 }}>{scriptureRef.trim()}</div>}
          {trimmed && <div style={{ fontFamily: T.serif, fontSize: 14.5, color: T.ink, lineHeight: 1.55, margin: '6px 0 4px', whiteSpace: 'pre-wrap' }}>{trimmed}</div>}
          <span style={{ display: 'inline-block', marginTop: 6, background: T.ink, color: T.cream, borderRadius: 999, padding: '8px 14px', fontSize: 13, fontWeight: 600 }}>Discuss this sermon →</span>
        </div>

        <div style={label}>{alreadyPosted ? 'Email' : 'Email to your congregation'}</div>
        {questions.length > 0 && (
          <div style={{ fontSize: 13.5, color: T.inkSoft, lineHeight: 1.5, marginBottom: 10 }}>
            Each morning this week, members also get that day's question in their kinwove email ({questions.length} {questions.length === 1 ? 'question' : 'questions'}). They can stop these anytime.
          </div>
        )}
        {!alreadyPosted && (
          <label style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 14, color: T.ink, cursor: 'pointer', marginBottom: 10 }}>
            <input type="checkbox" checked={sendEmail} onChange={(e) => setSendEmail(e.target.checked)} style={{ width: 18, height: 18, accentColor: T.gold, margin: 0 }} />
            Also email my congregation
          </label>
        )}
        {alreadyPosted ? (
          <div style={{ fontSize: 13.5, color: T.inkSoft, lineHeight: 1.5 }}>
            This sermon already went out, so publishing again updates the feed post. No new email is sent.
          </div>
        ) : !sendEmail ? (
          <div style={{ fontSize: 13.5, color: T.inkSoft, lineHeight: 1.5 }}>
            No email. The sermon goes into your church feed and members still get the usual in-app notification.
          </div>
        ) : (
          <div>
            <div style={{ fontSize: 12, color: T.inkMuted, marginBottom: 6 }}>
              Subject: <span style={{ color: T.ink, fontWeight: 600 }}>{emailSubject || `New sermon: "${title.trim() || 'Untitled sermon'}"${churchName ? ` at ${churchName}` : ''}`}</span>
            </div>
            <div style={{ border: `1px solid ${T.line}`, borderRadius: 12, overflow: 'hidden', background: '#F5EDD8' }}>
              {emailHtml
                // Look only: links inside must not navigate the box away from the email
                // (a click on "Open kinwove" loaded the website in here). No scripts run;
                // same-origin is only so the box can grow to the email's full height.
                ? <iframe title="Email preview" srcDoc={emailHtml} sandbox="allow-same-origin" tabIndex={-1}
                    onLoad={(e) => { try { const d = e.currentTarget.contentDocument; e.currentTarget.style.height = `${Math.max(200, d.documentElement.scrollHeight)}px`; } catch { /* keep default */ } }}
                    style={{ width: '100%', height: 420, border: 0, display: 'block', pointerEvents: 'none' }} />
                : <div style={{ padding: 18, fontSize: 13, color: T.inkMuted }}>Loading the email…</div>}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
              {isAdmin && (
                <input value={testTo} onChange={(e) => setTestTo(e.target.value)} aria-label="Send the test to"
                  style={{ flex: '1 1 180px', minWidth: 0, border: `1px solid ${T.line}`, borderRadius: 999, padding: '8px 12px', fontSize: 13, background: T.white, color: T.ink, outline: 'none' }} />
              )}
              <button onClick={sendTest} disabled={testState === 'sending'}
                style={{ background: 'none', border: `1px solid ${T.line}`, borderRadius: 999, padding: '8px 14px', fontSize: 13, color: T.goldDark, fontWeight: 600, cursor: 'pointer', opacity: testState === 'sending' ? 0.6 : 1 }}>
                {testState === 'sending' ? 'Sending…' : isAdmin ? 'Send a test' : 'Send a test to me'}
              </button>
              {testMsg && <span style={{ fontSize: 12.5, color: testState === 'error' ? '#A53F2B' : T.inkSoft }}>{testMsg}</span>}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
          <button onClick={() => onPublish(trimmed, sendEmail && !alreadyPosted)} disabled={busy}
            style={{ flex: 1, background: T.ink, color: T.cream, border: 'none', borderRadius: 999, padding: '13px 18px', fontSize: 15, fontWeight: 600, cursor: 'pointer', opacity: busy ? 0.6 : 1 }}>
            {busy ? 'Publishing…' : 'Publish now'}
          </button>
          <button onClick={onCancel} disabled={busy}
            style={{ background: 'transparent', border: `1px solid ${T.line}`, borderRadius: 999, padding: '13px 16px', fontSize: 14, color: T.inkSoft, cursor: 'pointer' }}>
            Go back and edit
          </button>
        </div>
      </div>
    </div>
  );
}
