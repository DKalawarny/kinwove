import { useEffect, useState } from 'react';
import { Compass, Users, Heart, BookOpen, Building2, UserCheck, Shield, Search, Sparkles, Volume2, StickyNote, Mic, KeyRound } from 'lucide-react';
import { T } from './theme.js';
import { KinwoveStar } from './components/brand/KinwoveStar.jsx';

// ─── Content ────────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: 'start',
    Icon: Compass,
    title: 'Getting started',
    items: [
      {
        q: 'What is kinwove?',
        a: 'kinwove is a faith community for people at every stage of their spiritual journey, from the curious to the committed. You can ask questions about the Bible and faith, read and study Scripture, share posts, pray together, and find a church.',
      },
      {
        q: 'How do I set up my profile?',
        a: 'Tap your name in the bottom nav (or in the sidebar on desktop) to open your profile. From there you can add a photo or build an avatar, pick a banner colour, and add a bio. Settings → Edit profile has the rest: your name, city, language, what you\'re looking for, and the voice used to read answers aloud.',
      },
      {
        q: 'What does Ask do?',
        a: 'Ask is kinwove\'s AI, powered by Claude. It answers Scripture questions, explores theology, and helps you work through doubt, without judging where you are. Tap Ask in the sidebar, or the centre button of the bottom nav on mobile. Your past chats are under ◷ Conversation history in Ask\'s menu.',
      },
      {
        q: 'Can I see my Ask conversations on another device?',
        a: 'Yes. New accounts sync conversations to your account automatically, so they show up wherever you sign in. You can check or change this in Conversation history: it says "Synced" when it\'s on.',
      },
      {
        q: 'Can I use kinwove in my language?',
        a: 'Yes. Pick your language from the globe in the top bar, or in Settings → Edit profile. Ask replies in that language, and posts and comments in other languages have a "See translation" link. Some buttons and menus are still in English only.',
      },
    ],
  },
  {
    id: 'community',
    Icon: Users,
    title: 'Feed & posting',
    items: [
      {
        q: 'How do I make a post?',
        a: 'Open the Feed and tap the compose box at the top of the Posts tab. Write your thought, attach up to 4 photos, choose who can see it, and tap Post. Tap ✶ Milestone to mark a step in your journey.',
      },
      {
        q: 'Who can see my posts?',
        a: 'You choose when you write it: Public, Church (your church family), or Only me. Public posts show on your profile and in the Feed of people connected to you, like members of your church.',
      },
      {
        q: 'Can I post anonymously?',
        a: 'Yes. Tap 👤 Anonymous in the compose box before you post. Your name and photo won\'t appear on it.',
      },
      {
        q: 'How do I edit or delete my post?',
        a: 'Open your profile and go to the Posts tab. Tap ⋯ on the post and choose Edit post or Delete post.',
      },
      {
        q: 'How do I react to a post?',
        a: 'Use the reaction buttons under each post: 👍 Yes, ❤️ Love, 🙏 Amen, and 💡 Insightful. Tap again to remove your reaction.',
      },
      {
        q: 'How do I comment?',
        a: 'Tap Comment under any post to open the conversation. Comments are visible to whoever can see the post.',
      },
      {
        q: 'How do I save a post to read later?',
        a: 'Tap the bookmark at the bottom right of a post. Saved posts are under the Saves tab on your profile. Tap the bookmark again to remove it.',
      },
      {
        q: 'How do I report a post?',
        a: 'Tap ⋯ on a post you didn\'t write and choose 🚩 Report post. Pick a reason and tap Submit report. Reports are confidential and reviewed by our team.',
      },
    ],
  },
  {
    id: 'circles',
    Icon: Users,
    title: 'Circles',
    items: [
      {
        q: 'What are Circles?',
        a: 'Circles are small private groups: for a Bible study, a friend group, or anyone you want to stay close to. Open the Feed and tap the Circles tab.',
      },
      {
        q: 'How do I start a Circle?',
        a: 'In Feed → Circles, tap + New. Give it a name and share the join code with the people you want in it. As the host you can delete the circle.',
      },
      {
        q: 'How do I join a Circle?',
        a: 'Get the 6 character code from someone in the circle. In Feed → Circles, tap Join with code and enter it. You\'re in straight away.',
      },
      {
        q: 'Can I be in more than one Circle?',
        a: 'Yes, as many as you like. Each circle has its own conversation, and a dot shows on a circle when there\'s something new.',
      },
    ],
  },
  {
    id: 'prayer',
    Icon: Heart,
    title: 'Prayer',
    items: [
      {
        q: 'Where do I keep my own prayers?',
        a: 'Open your profile and tap the Prayer Journal tab. Prayers there are private: only you can see them.',
      },
      {
        q: 'How do I ask others to pray for me?',
        a: 'Open the Feed, tap the 🙏 Prayers tab, then tap Share a prayer request…. These are visible to the community.',
      },
      {
        q: 'How do I pray for someone else\'s request?',
        a: 'In Feed → 🙏 Prayers, tap 🙏 Praying on a request. The person gets a quiet notification that someone is praying for them. Tap 💬 Encourage to leave them a few words.',
      },
      {
        q: 'How do I mark a prayer as answered?',
        a: 'In your Prayer Journal, tap ⋯ on the prayer and choose Mark answered. You can add a short testimony of what happened.',
      },
      {
        q: 'Does my church have its own prayer list?',
        a: 'Yes. Members can open their church page and tap the 🙏 Pray tab to see and pray for requests from the congregation.',
      },
    ],
  },
  {
    id: 'bible',
    Icon: BookOpen,
    title: 'Bible & study',
    items: [
      {
        q: 'How does the Bible reader work?',
        a: 'Open the Bible tab and pick a book and chapter. Tap any verse for options: 💬 Ask about it, Explain simply, Historical context, Cross-references, Original language, Compare versions, ✏ Note, highlight colours, and Share. You can choose NIV, KJV, NKJV, or ASV, turn on dark mode, and tap Aa to change the text size.',
      },
      {
        q: 'Are there study notes for each chapter?',
        a: 'Yes. Every chapter has a short plain-language study note, and each book has an introduction: what happens, the background, where Christians read it differently, and a question to think about.',
      },
      {
        q: 'How do I highlight a verse?',
        a: 'Tap the verse and choose one of the highlight colours in the popup. Your highlights also show up on your Notes page.',
      },
      {
        q: 'Can I listen to a chapter read aloud?',
        a: 'Yes. Tap ▶ Read chapter above the verses. While it plays you can go back or skip 10 seconds, pause, or stop, and it carries on into the next chapter.',
      },
      {
        q: 'Can I start listening from a specific verse?',
        a: 'Yes. Tap the verse and choose ▶ Read from here. Next time you open that chapter, the button offers to resume from that verse.',
      },
      {
        q: 'How do I change the voice that reads answers aloud?',
        a: 'Go to Settings → Edit profile → Read-back voice and choose James (deep and unhurried) or Grace (soft and soothing). This is the voice used when you tap Listen on an Ask answer.',
      },
      {
        q: 'Are there reading plans?',
        a: 'Yes. In the Bible tab, open Reading plans and pick one. Tap Mark read to move on to the next chapter.',
      },
      {
        q: 'What\'s the daily verse?',
        a: 'Each day has a verse, shown in the header. Tap it to open the verse card, then Read in context to open the whole chapter.',
      },
    ],
  },
  {
    id: 'notes',
    Icon: StickyNote,
    title: 'Notes',
    items: [
      {
        q: 'How do I take a note on a Bible verse?',
        a: 'Tap the verse, choose ✏ Note, write your thought, and tap Save note. A small gold dot appears beside verses that have a note.',
      },
      {
        q: 'How do I save an answer from Ask?',
        a: 'Tap Note under any answer. It\'s saved to your Notes page under Saved notes, along with the question you asked.',
      },
      {
        q: 'Where do I find all my notes?',
        a: 'Tap Notes in the sidebar (on mobile, it\'s in the ⋮ menu). Saved notes and any sermon prep notes come first, then your verse notes and highlights grouped by book, Genesis through Revelation. Tap + New note to write one from scratch.',
      },
      {
        q: 'Can I edit a note after saving it?',
        a: 'Yes. Tap Edit on the note, make your changes, and save. Clearing all the text and saving deletes the note.',
      },
      {
        q: 'Can I search my notes?',
        a: 'Yes. Use the search bar at the top of the Notes page to search by book name, your note, or the verse text.',
      },
      {
        q: 'What does "Ask about this" do on a note?',
        a: 'It opens Ask with that verse ready in the box, so you can dig deeper into what you were thinking about.',
      },
      {
        q: 'Can I jump from a note back to the verse?',
        a: 'Yes. Tap the gold verse reference at the top of the note (for example GENESIS 1:3 ↗) to open that passage in the Bible.',
      },
    ],
  },
  {
    id: 'ai',
    Icon: Sparkles,
    title: 'AI & scripture accuracy',
    items: [
      {
        q: 'How does kinwove make sure the AI gets scripture right?',
        a: 'Every scripture reference the AI gives is checked against the Bible as the answer appears. A small ✓ means the reference was confirmed. A ⚠ means it couldn\'t be confirmed, so check it in your Bible.',
      },
      {
        q: 'Can I tap a scripture reference in an answer?',
        a: 'Yes. References in gold are tappable. Tap one to read the verse right there, in the version you read in the Bible tab (NIV unless you picked another).',
      },
      {
        q: 'Why is some text shown with a line down the side?',
        a: 'That marks a paraphrase: a summary of what a passage says, not its exact words. It\'s shown in a different style so you can tell the difference at a glance.',
      },
      {
        q: 'Does the AI know about commonly misquoted "Bible verses"?',
        a: 'Yes. It recognises sayings people often treat as scripture that aren\'t in the Bible, like "God helps those who help themselves" and "Everything happens for a reason", and says so gently.',
      },
      {
        q: 'What if I think the AI got something wrong?',
        a: 'Tap Flag under the answer (next to Share and Copy). It\'s logged for our team to review. No AI is perfect, and flags help us find and fix patterns.',
      },
      {
        q: 'Is the AI meant to replace reading the Bible?',
        a: 'No. It\'s built to help you engage with Scripture, not to stand in for it. Always check references in your own Bible.',
      },
    ],
  },
  {
    id: 'church',
    Icon: Building2,
    title: 'Church',
    items: [
      {
        q: 'How do I find a church?',
        a: 'Tap Church in the nav. If you haven\'t joined one yet, you\'ll see the directory: search by name, city, or denomination. If you already have a church, use the Find button and choose Find a church.',
      },
      {
        q: 'How do I join a church?',
        a: 'Open the church page and tap Join. Some churches let you in straight away; others have the pastor approve requests. Once you\'re in, you\'ll see the church\'s posts, sermons, and prayer list on its page.',
      },
      {
        q: 'What do members see on the church page?',
        a: 'The church\'s own feed (posts, events, polls, and announcements), the latest sermon and its daily questions, a 🙏 Pray tab, and Talk to someone for when you need a person to talk to.',
      },
      {
        q: 'Will my church email me?',
        a: 'When your pastor publishes a sermon they can email it to the congregation. During that week you may also get one short morning email with the day\'s sermon question and the daily verse. Every email has an unsubscribe link at the bottom.',
      },
      {
        q: 'I\'m a pastor, how do I register my church?',
        a: 'Open Settings (the ⋮ menu on mobile) and tap Apply as a pastor. Fill in your details and your church, and your pastor dashboard is ready straight away. If we can\'t verify your email, your church shows a "Self-reported" badge until it\'s verified.',
      },
      {
        q: 'How does the youth invite work?',
        a: 'Pastors can make a separate youth invite code in the dashboard\'s People tab. When someone joins with it, they\'re added as a youth member. If they\'ve entered a date of birth, they get full access once they turn 17.',
      },
    ],
  },
  {
    id: 'sermonprep',
    Icon: Mic,
    title: 'Sermons (pastors)',
    items: [
      {
        q: 'What is the Study tab in my church dashboard?',
        a: 'Study is a research space for sermon prep: a pastoral AI for theology, exegesis, and pastoral care, with a desk beside it holding a Bible and your prep notes. Ask anything, save the answers worth keeping, and name each session so you can come back to it.',
      },
      {
        q: 'How do prep notes and series work?',
        a: 'Any Study answer can be saved as a note, and you can write your own in the desk\'s Notes. Give notes a series name ("Romans", or this Sunday\'s title) and they group together. Drag notes by the ⋮⋮ grip to reorder them, highlight in four colours, and print a note or a whole series. The series shows a rough preaching time as it grows.',
      },
      {
        q: 'How do I turn my prep notes into a sermon?',
        a: 'Tap "Use in sermon →" on a series heading. Uncheck anything you don\'t want carried over, then tap Continue →. A sermon draft opens in the Sermons tab with your notes.',
      },
      {
        q: 'How do I publish a sermon?',
        a: 'In the Sermons tab, tap Publish to congregation. Before it goes out you\'ll see exactly what members will see, can add a short note from you, and choose whether to email it. Tap Send a test to me to see the email in your own inbox first. Your work is kept if you leave the page before saving.',
      },
      {
        q: 'Do my prep notes show up in my personal notes too?',
        a: 'Yes, they appear in a read-only Sermon prep section of your Notes page. To edit one, open it in your church Study tab.',
      },
      {
        q: 'Are scripture references in Study checked like they are in Ask?',
        a: 'Yes. Gold references are tappable and checked in the background: ✓ means confirmed, ⚠ means check your Bible before you preach it.',
      },
    ],
  },
  {
    id: 'friends',
    Icon: UserCheck,
    title: 'Friends & messages',
    items: [
      {
        q: 'How do I add a friend?',
        a: 'Open someone\'s profile and tap + Friend. They\'ll get a notification and can accept.',
      },
      {
        q: 'Where are my friends and friend requests?',
        a: 'Open your profile and tap the Friends count. You\'ll see your friends and any requests waiting for you.',
      },
      {
        q: 'How do I send a direct message?',
        a: 'Open someone\'s profile and tap ✉ Message, or tap the messages button at the top right. Conversations are private between the two of you.',
      },
    ],
  },
  {
    id: 'account',
    Icon: KeyRound,
    title: 'Account & settings',
    items: [
      {
        q: 'How do I change my password or email?',
        a: 'Open Settings (the ⋮ menu on mobile) and tap Email & password. Type a new password twice (at least 8 characters) and tap Update password. To change your email, type the new one and tap Update email, then confirm from both inboxes.',
      },
      {
        q: 'How do I turn off some notifications?',
        a: 'Settings → Email & password has a Notifications list. Switch off comments and reactions, prayer support, friends, direct messages, or church and sermons. Care team and safety alerts can\'t be muted.',
      },
      {
        q: 'How do I stop the daily email?',
        a: 'Tap Unsubscribe at the bottom of any kinwove email. The daily email and church question emails each have their own link, so you can stop one and keep the others.',
      },
      {
        q: 'How do I delete my account?',
        a: 'Open Settings (the ⋮ menu on mobile) and tap Delete account. This permanently removes your profile, posts, prayers, and conversations, and can\'t be undone.',
      },
    ],
  },
  {
    id: 'privacy',
    Icon: Shield,
    title: 'Privacy & safety',
    items: [
      {
        q: 'Who can see my profile?',
        a: 'Your name, photo, and city are visible to people signed in to kinwove. Your posts follow the audience you chose for each one. Your Prayer Journal is only ever visible to you.',
      },
      {
        q: 'How do I block someone?',
        a: 'Tap ⋯ on one of their posts, or on their profile, and choose Block. Their posts disappear for you and they can\'t interact with yours. They aren\'t notified. To unblock, go to Settings → Email & password → Blocked accounts.',
      },
      {
        q: 'Are my conversations with the AI private?',
        a: 'Yes. Your Ask conversations are never shown to other people or on your profile. They\'re saved to your account so you can pick them up on any device. Questions are also kept on our side so we can improve answers and catch problems.',
      },
    ],
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function QuestionRow({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${T.line}` }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: '100%', textAlign: 'left', background: 'none', border: 'none',
          padding: '17px 0', cursor: 'pointer', outline: 'none',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20,
        }}
      >
        <span style={{
          fontSize: 14.5, fontWeight: 600, color: T.ink, lineHeight: 1.45, flex: 1,
          fontFamily: 'inherit',
        }}>{q}</span>
        <span style={{
          fontSize: 20, color: open ? T.goldDark : T.inkMuted, flexShrink: 0,
          lineHeight: 1, fontWeight: 300, marginTop: 1,
          transition: 'color 0.15s',
        }}>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div style={{
          paddingBottom: 18,
          fontFamily: "'Lora', Georgia, serif",
          fontSize: 14.5, color: T.inkSoft, lineHeight: 1.8,
        }}>
          {a}
        </div>
      )}
    </div>
  );
}

function SearchResultRow({ item }) {
  const [open, setOpen] = useState(false);
  const Icon = item.SectionIcon;
  return (
    <div style={{ borderBottom: `1px solid ${T.line}` }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: '100%', textAlign: 'left', background: 'none', border: 'none',
          padding: '16px 0', cursor: 'pointer', outline: 'none',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20,
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
            <Icon size={12} strokeWidth={1.75} color={T.goldDark} />
            <span style={{ fontSize: 11, fontWeight: 600, color: T.goldDark, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
              {item.sectionTitle}
            </span>
          </div>
          <span style={{ fontSize: 14.5, fontWeight: 600, color: T.ink, lineHeight: 1.4 }}>{item.q}</span>
        </div>
        <span style={{ fontSize: 20, color: open ? T.goldDark : T.inkMuted, flexShrink: 0, fontWeight: 300, marginTop: 18, lineHeight: 1 }}>
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div style={{ paddingBottom: 18, fontFamily: "'Lora', Georgia, serif", fontSize: 14.5, color: T.inkSoft, lineHeight: 1.8 }}>
          {item.a}
        </div>
      )}
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function HelpPage({ onClose, onOpenTour }) {
  const [activeId, setActiveId] = useState('start');
  const [searchQuery, setSearchQuery] = useState('');
  const [isWide, setIsWide] = useState(() => window.innerWidth >= 800);

  useEffect(() => {
    const handle = () => setIsWide(window.innerWidth >= 800);
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  const query = searchQuery.trim().toLowerCase();
  const allItems = SECTIONS.flatMap((s) =>
    s.items.map((item) => ({ ...item, sectionTitle: s.title, SectionIcon: s.Icon }))
  );
  const searchResults = query.length >= 2
    ? allItems.filter((item) => item.q.toLowerCase().includes(query) || item.a.toLowerCase().includes(query))
    : null;

  const activeSection = SECTIONS.find((s) => s.id === activeId);

  return (
    <div className="scene" style={{ minHeight: '100vh', background: T.cream }}>

      {/* ── Walnut header ─────────────────────────────────────────── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: '#1e1208',
        borderBottom: 'none',
          boxShadow: '0 1px 0 rgba(255,255,255,0.04)',
      }}><div style={{ height: 56, padding: '0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={onClose}
          style={{
            background: 'transparent', border: 'none', color: '#e8b563',
            fontSize: 20, cursor: 'pointer', width: 36, height: 36, borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.15s', outline: 'none', flexShrink: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(232,181,99,0.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          aria-label="Back"
        >←</button>

        {/* Search inside header */}
        <div style={{ flex: 1, position: 'relative', maxWidth: 480, margin: '0 auto' }}>
          <Search size={14} style={{
            position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
            color: 'rgba(232,181,99,0.55)', pointerEvents: 'none',
          }} />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search help topics…"
            style={{
              width: '100%', boxSizing: 'border-box',
              padding: '8px 32px 8px 34px',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(232,181,99,0.22)',
              borderRadius: 8,
              fontFamily: 'inherit', fontSize: 13.5,
              color: '#f4e9d4', outline: 'none',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'rgba(232,181,99,0.55)')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(232,181,99,0.22)')}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'rgba(244,233,212,0.5)', fontSize: 15, lineHeight: 1, padding: 2,
              }}
            >×</button>
          )}
        </div>
        <div style={{ width: 36, flexShrink: 0 }} aria-hidden="true" />
      </div></div>

      {/* ── Body ──────────────────────────────────────────────────── */}
      {isWide ? (
        /* ── Desktop: two-column ──────────────────────────────────── */
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', minHeight: 'calc(100vh - 56px)' }}>

          {/* Left nav */}
          <nav style={{
            width: 220, flexShrink: 0, padding: '28px 0',
            borderRight: `1px solid ${T.line}`,
            background: T.white,
          }}>
            <div style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: T.inkMuted,
              padding: '0 20px', marginBottom: 10,
            }}>Topics</div>
            {SECTIONS.map((s) => {
              const Icon = s.Icon;
              const active = s.id === activeId && !searchResults;
              return (
                <button
                  key={s.id}
                  onClick={() => { setActiveId(s.id); setSearchQuery(''); }}
                  style={{
                    width: '100%', textAlign: 'left', border: 'none',
                    padding: '9px 20px', cursor: 'pointer', outline: 'none',
                    display: 'flex', alignItems: 'center', gap: 10,
                    borderLeft: `3px solid ${active ? '#A85530' : 'transparent'}`,
                    background: active ? 'rgba(184,115,58,0.06)' : 'transparent',
                    color: active ? '#8a5a20' : T.inkSoft,
                    fontWeight: active ? 600 : 400,
                    fontSize: 13.5,
                    transition: 'all 0.12s',
                  }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'rgba(44,24,16,0.03)'; }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                >
                  <Icon size={14} strokeWidth={active ? 2 : 1.75} style={{ flexShrink: 0, opacity: active ? 1 : 0.6 }} />
                  {s.title}
                </button>
              );
            })}

            {/* Footer help link */}
            <div style={{
              marginTop: 32, padding: '16px 20px',
              borderTop: `1px solid ${T.line}`,
            }}>
              {onOpenTour && (
                <button
                  onClick={onOpenTour}
                  style={{
                    width: '100%', marginBottom: 14,
                    background: 'rgba(184,115,58,0.08)',
                    border: '1px solid rgba(184,115,58,0.25)',
                    borderRadius: 10, padding: '9px 12px',
                    fontSize: 12.5, fontWeight: 600,
                    color: '#8a5a20', cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(184,115,58,0.14)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(184,115,58,0.08)')}
                >
                  <KinwoveStar size={12} style={{ verticalAlign: 'middle', marginRight: 5, flexShrink: 0 }} /> Take the tour again
                </button>
              )}
              <div style={{ fontSize: 12, color: T.inkMuted, lineHeight: 1.6 }}>
                Still need help?
              </div>
              <a
                href="mailto:hello@kinwove.com"
                style={{ fontSize: 12.5, color: '#A85530', fontWeight: 600, textDecoration: 'none' }}
              >
                hello@kinwove.com
              </a>
            </div>
          </nav>

          {/* Right content */}
          <div style={{ flex: 1, padding: '36px 48px', minWidth: 0, background: T.cream }}>
            {searchResults !== null ? (
              /* Search results */
              <>
                <div style={{ marginBottom: 28 }}>
                  <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 22, fontWeight: 600, color: T.ink, margin: '0 0 4px' }}>
                    Search results
                  </h2>
                  <p style={{ fontSize: 13, color: T.inkMuted, margin: 0 }}>
                    {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
                  </p>
                </div>
                {searchResults.length === 0 ? (
                  <div style={{ padding: '40px 0', textAlign: 'center', color: T.inkMuted }}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>🤔</div>
                    <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 17, color: T.ink, marginBottom: 6 }}>No results found</div>
                    <div style={{ fontSize: 13.5 }}>Try a different search, or tap <KinwoveStar size={12} style={{ verticalAlign: 'middle', marginRight: 2, flexShrink: 0 }} /> Ask for a live answer.</div>
                  </div>
                ) : searchResults.map((item, i) => (
                  <SearchResultRow key={i} item={item} />
                ))}
              </>
            ) : activeSection ? (
              /* Section content */
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
                  <activeSection.Icon size={22} strokeWidth={1.5} color="#A85530" />
                  <h2 style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: 24, fontWeight: 600, color: T.ink, margin: 0, letterSpacing: '-0.02em',
                  }}>{activeSection.title}</h2>
                </div>
                {activeSection.items.map((item, i) => (
                  <QuestionRow key={i} q={item.q} a={item.a} />
                ))}
              </>
            ) : null}
          </div>
        </div>
      ) : (
        /* ── Mobile: stacked sections ─────────────────────────────── */
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '16px 14px 80px' }}>
          {onOpenTour && !searchResults && (
            <button
              onClick={onOpenTour}
              style={{
                width: '100%', marginBottom: 14,
                background: 'rgba(184,115,58,0.07)',
                border: '1px solid rgba(184,115,58,0.22)',
                borderRadius: 12, padding: '12px 16px',
                fontSize: 14, fontWeight: 600,
                color: '#8a5a20', cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              <KinwoveStar size={12} style={{ verticalAlign: 'middle', marginRight: 5, flexShrink: 0 }} /> Take the feature tour
            </button>
          )}
          {searchResults !== null ? (
            <>
              {searchResults.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px 20px', color: T.inkMuted }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>🤔</div>
                  <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 16, color: T.ink, marginBottom: 6 }}>No results found</div>
                  <div style={{ fontSize: 13.5 }}>Try a different search or tap <KinwoveStar size={12} style={{ verticalAlign: 'middle', marginRight: 2, flexShrink: 0 }} /> Ask.</div>
                </div>
              ) : searchResults.map((item, i) => <SearchResultRow key={i} item={item} />)}
            </>
          ) : (
            SECTIONS.map((s) => <MobileSection key={s.id} section={s} />)
          )}
        </div>
      )}
    </div>
  );
}

function MobileSection({ section }) {
  const [open, setOpen] = useState(false);
  const Icon = section.Icon;
  return (
    <div style={{
      background: T.white, border: `1px solid ${T.line}`,
      borderRadius: 12, marginBottom: 8, overflow: 'hidden',
    }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: '100%', textAlign: 'left', background: 'none', border: 'none',
          padding: '14px 16px', cursor: 'pointer', outline: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Icon size={15} strokeWidth={1.75} color={open ? '#A85530' : T.inkSoft} style={{ flexShrink: 0 }} />
          <span style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 15, fontWeight: 600,
            color: open ? T.ink : T.inkSoft,
          }}>{section.title}</span>
        </div>
        <span style={{ fontSize: 18, color: open ? '#A85530' : T.inkMuted, fontWeight: 300, lineHeight: 1 }}>
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div style={{ padding: '0 16px', borderTop: `1px solid ${T.line}` }}>
          {section.items.map((item, i) => <QuestionRow key={i} q={item.q} a={item.a} />)}
        </div>
      )}
    </div>
  );
}
