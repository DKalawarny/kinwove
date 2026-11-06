import { chapterLinksForRefs } from './bible.js';
// ── kinwove Answers — crawlable, GEO-optimized faith-question pages ───────────
// These are REAL server-rendered HTML pages (not the React SPA), so Google and
// AI engines (ChatGPT, Perplexity, Gemini) can actually read + cite them.
//
// Each page follows 2026 AI-citation best practice:
//   • a tight 40–60 word direct answer up top (the block engines lift verbatim)
//   • scripture as evidence (citations lift AI visibility ~30–40%)
//   • an FAQ section with FAQPage schema
//   • Article schema + a fresh dateModified
//   • a soft CTA into the app + internal links to related answers
//
// To add a question: append an object below. Keep `answer` self-contained and
// ~40–60 words. Voice = grace-first, honest about uncertainty, never preachy,
// welcoming to skeptics (see src/prompts.js).

export const ANSWERS = [
  // ── For pastors ────────────────────────────────────────────────────────────
  // Every stranger who has ever signed up for kinwove arrived via an AI search
  // engine, and the /answers pages are why — real server-rendered HTML a model
  // can read and cite. There were 48 of them and all 48 were written for
  // seekers, so a pastor could not find kinwove at all.
  //
  // These deliberately target pastoral problems rather than tool queries.
  // "AI sermon generator" is contested by eight dedicated products with
  // exact-match domains; "what do I do when someone leaves my church hurt" is
  // not, and it is closer to what kinwove is actually for.
  {
    slug: 'how-do-i-keep-my-congregation-engaged-between-sundays',
    question: 'How do I keep my congregation engaged between Sundays?',
    category: 'For Pastors',
    updated: '2026-09-21',
    answer:
      'The gap is not attention, it is continuity. Most people leave on Sunday with a real question and no way to keep pulling the thread before it fades by Tuesday. What works is giving them somewhere to take the question during the week, not sending them more content.',
    body: [
      { h: 'The problem is Tuesday, not Sunday',
        p: 'Almost nobody disengages during the sermon. They disengage on Tuesday, when the thing that landed on Sunday meets a week that has no room for it. By the time the next Sunday comes around, the thread is gone and you start again. More announcements and more posts do not fix that, because the issue is not that people forgot. It is that they had nowhere to put what they were thinking.' },
      { h: 'A question travels further than a reminder',
        p: 'One honest question from Sunday, asked again midweek, does more than a devotional nobody opens. It gives someone a reason to think rather than a thing to consume. And the answers tell you something a headcount never will: what your people are actually wrestling with, in their words, while it is still live.' },
      { h: 'Most of what people want to ask, they will not ask you',
        p: 'Not because they distrust you, but because asking the pastor makes a doubt official. People will type a question at eleven at night that they would never raise in a foyer. A church that gives them a private place to ask is not competing with pastoral conversation. It is usually the thing that leads to one.' },
    ],
    scriptures: [
      { ref: 'Acts 17:11', text: 'Now the Berean Jews were of more noble character than those in Thessalonica, for they received the message with great eagerness and examined the Scriptures every day to see if what Paul said was true.' },
      { ref: 'Deuteronomy 6:7', text: 'Impress them on your children. Talk about them when you sit at home and when you walk along the road, when you lie down and when you get up.' },
    ],
    faqs: [
      { q: 'Is a church app just another thing nobody opens?', a: 'Usually, when it is built around announcements. Attendance tools get opened when there is an event. Something people take a real question to gets opened when they have one, which is more often and less predictable.' },
      { q: 'How do I know if it is working?', a: 'Not by installs. By whether questions are being asked midweek, and whether they are the kind of questions people were not asking out loud before.' },
      { q: 'Does this replace small groups?', a: 'No, and it should not try. It tends to surface what someone brings to a group rather than substitute for the room.' },
    ],
    related: ['what-do-i-do-when-someone-leaves-my-church-hurt', 'should-my-church-use-ai'],
  },

  {
    slug: 'what-do-i-do-when-someone-leaves-my-church-hurt',
    question: 'What do I do when someone leaves my church hurt?',
    category: 'For Pastors',
    updated: '2026-09-21',
    answer:
      'Most people who leave hurt do not leave loudly. They step back from serving, then from attending, then they are gone, and the first real conversation about it never happens. What helps is making it possible to stay connected without having to stage a confrontation first.',
    body: [
      { h: 'They rarely tell you the real reason',
        p: 'The stated reason is usually a scheduling change or a season of busyness. The actual reason is often something smaller and sharper: a comment, being overlooked, carrying too much for too long without anyone noticing. By the time someone can name it, they have usually already left, and the naming happens to a friend rather than to you.' },
      { h: 'Burnout in a volunteer looks like commitment right up until it does not',
        p: 'The people who leave hurt are very often the ones who were doing the most. They say yes, they cover gaps, they are dependable, and then they are gone. The warning sign is not complaining. It is a reliable person going quiet.' },
      { h: 'The door back has to be low',
        p: 'Someone who left hurt will not book a meeting with the pastor. They might read something. They might ask a question anonymously at midnight. Keeping a low, undramatic way to stay near a church matters more than any exit conversation, because it does not require them to decide anything first.' },
    ],
    scriptures: [
      { ref: 'Psalm 34:18', text: 'The Lord is close to the brokenhearted and saves those who are crushed in spirit.' },
      { ref: 'Galatians 6:2', text: 'Carry each other\u2019s burdens, and in this way you will fulfill the law of Christ.' },
    ],
    faqs: [
      { q: 'Should I chase someone who has stepped back?', a: 'Contact them, but without an agenda about returning. A message that asks how they are and expects nothing lands very differently from one that is trying to recover an attender.' },
      { q: 'What if I was part of the hurt?', a: 'Then saying so plainly, without explaining why it happened, does more than any process. Most people are not waiting for an explanation. They are waiting to hear that it was seen.' },
      { q: 'How do I stop this happening to the next person?', a: 'Watch the people carrying the most, and check on them when nothing is wrong. Church hurt concentrates among the committed.' },
    ],
    related: ['how-do-i-pastor-someone-who-is-deconstructing', 'how-do-i-keep-my-congregation-engaged-between-sundays'],
  },

  {
    slug: 'how-do-i-pastor-someone-who-is-deconstructing',
    question: 'How do I pastor someone who is deconstructing?',
    category: 'For Pastors',
    updated: '2026-09-21',
    answer:
      'Deconstruction is usually not a rejection of Jesus. It is the collapse of a particular account of him, often one that was over-certain. The fastest way to lose someone is to answer questions they have not asked yet, and the surest way to keep them is to let the questions stay open longer than is comfortable.',
    body: [
      { h: 'Early pushback loses them permanently',
        p: 'Someone who has started asking hard questions has usually been asking them privately for a long time before you hear one. The first time they say it out loud is a test of whether it is safe to say the second one. Correcting quickly, even gently, answers that test in the wrong direction.' },
      { h: 'It is usually a person, not an argument',
        p: 'Very few people deconstruct because of a book. Most deconstruct because something happened: a leader who was not what they seemed, a prayer that went unanswered in the worst way, a church that closed ranks. The intellectual questions come later and are real, but they are rarely the root.' },
      { h: 'Honest uncertainty is more credible than a tidy answer',
        p: 'Saying you do not know, when you do not, buys more trust than any apologetic. People in this position have usually had enough confident answers. What they have not had is someone who could stay in the room without needing the question resolved.' },
    ],
    scriptures: [
      { ref: 'Mark 9:24', text: 'Immediately the boy\u2019s father exclaimed, "I do believe; help me overcome my unbelief!"' },
      { ref: 'John 20:27', text: 'Then he said to Thomas, "Put your finger here; see my hands. Reach out your hand and put it into my side. Stop doubting and believe."' },
    ],
    faqs: [
      { q: 'Should I recommend apologetics resources?', a: 'Only if they ask. Handing someone material unprompted usually reads as being handled rather than heard.' },
      { q: 'What if they stop attending?', a: 'Attendance is often the last thing to go and the first thing to come back. Staying in contact while they are not attending matters more than getting them back in a seat.' },
      { q: 'Is deconstruction the same as losing faith?', a: 'Frequently not. A good number of people who go through it end up with a faith that holds better, precisely because it survived the questions.' },
    ],
    related: ['what-do-i-do-when-someone-leaves-my-church-hurt', 'how-can-i-believe-when-i-have-doubts'],
  },

  {
    slug: 'should-my-church-use-ai',
    question: 'Should my church use AI?',
    category: 'For Pastors',
    updated: '2026-09-21',
    answer:
      'For research and preparation, it is a reasonable tool and a fast one. For anything that speaks to your congregation in your name, the risk is not that it writes badly. It is that it writes confidently about things it has got wrong, and nobody checks.',
    body: [
      { h: 'The real failure mode is confident invention',
        p: 'A language model will produce a quotation from a commentator who never wrote it, in the right register, with the right cadence. It does not sound uncertain when it is wrong. That is manageable for your own study, where you check sources anyway, and much less manageable when the output goes straight to a congregation.' },
      { h: 'Preparation is a different question from proclamation',
        p: 'Using AI to find every place a word appears, or to summarise four views on a passage before you pick one, is closer to a concordance than to ghostwriting. Using it to produce the sermon is a different act, and worth being honest with yourself about which one you are doing.' },
      { h: 'Your people will ask it anyway',
        p: 'Whether or not a church adopts AI, its members are already typing their hardest questions into one at eleven at night. The practical question is not whether AI enters the conversation, but whether anything in it points back toward a real person in a real church.' },
    ],
    scriptures: [
      { ref: '1 Thessalonians 5:21', text: 'But test them all; hold on to what is good.' },
      { ref: 'Proverbs 18:17', text: 'In a lawsuit the first to speak seems right, until someone comes forward and cross-examines.' },
    ],
    faqs: [
      { q: 'Is it dishonest to use AI in sermon prep?', a: 'Not inherently, any more than using a commentary is. It becomes a problem when it replaces the study rather than speeding it up, or when it is hidden.' },
      { q: 'How do I stop it inventing citations?', a: 'Check every quotation against the source before it leaves your desk. Tools that quote retrieved text rather than recalling it from memory are meaningfully safer.' },
      { q: 'Should I tell my congregation we use it?', a: 'For administration, nobody expects disclosure. For anything presented as your own words, most people would want to know, and finding out later costs more than saying so.' },
    ],
    related: ['how-do-i-keep-my-congregation-engaged-between-sundays', 'how-do-i-pastor-someone-who-is-deconstructing'],
  },

  {
    slug: 'is-the-resurrection-of-jesus-real',
    question: 'Is the resurrection of Jesus real?',
    category: 'Faith & Doubt',
    updated: '2026-07-06',
    answer:
      'There is no way to prove the resurrection like a lab experiment, but it rests on unusually early evidence: eyewitness reports circulating within a few years, followers who died rather than recant, and a movement that exploded around one claim, that a crucified man was seen alive. You can weigh it honestly without pretending it is simple.',
    body: [
      { h: 'The evidence is earlier than most people assume',
        p: 'The claim was not a legend that grew over centuries. In 1 Corinthians 15, Paul passes on a creed most scholars date to within a few years of the crucifixion, naming specific people who said they saw Jesus alive, most still living when he wrote. Whatever you conclude, you are dealing with early testimony, not distant myth.' },
      { h: 'The behavior of the first followers is hard to explain away',
        p: 'The disciples went from hiding in fear to publicly proclaiming a risen Jesus, and many were killed for refusing to take it back. People die for things they believe are true. They rarely die for something they know they made up. That does not prove they were right, but it means they were not simply lying.' },
      { h: 'Honest doubt is welcome here',
        p: 'You do not have to arrive at certainty to explore this. Thomas doubted out loud in a room full of believers and was not shamed for it. He was invited to look closer. If you are weighing the evidence with real questions, you are exactly the kind of person this was written for.' },
    ],
    scriptures: [
      { ref: '1 Corinthians 15:3–6', text: 'For what I received I passed on to you as of first importance: that Christ died for our sins according to the Scriptures, that he was buried, that he was raised on the third day… and that he appeared to more than five hundred.' },
      { ref: 'John 20:27', text: 'Then he said to Thomas, "Put your finger here; see my hands. Reach out your hand and put it into my side. Stop doubting and believe."' },
    ],
    faqs: [
      { q: 'Can the resurrection be proven?', a: 'Not the way a repeatable experiment can. It is a historical claim, so it is weighed by evidence, the early eyewitness reports, the empty tomb accounts, and the transformation of the first followers, rather than proven with certainty.' },
      { q: 'Do you have to believe it to explore Christianity?', a: 'No. Many people start with honest questions and no firm conclusion. Doubt is treated as a starting point here, not a disqualification.' },
      { q: 'Why do Christians say it matters so much?', a: 'Because the entire Christian claim hinges on it, that death was defeated and forgiveness is real. Paul himself said if it did not happen, the faith is empty.' },
    ],
    related: ['why-does-god-allow-suffering', 'how-can-i-believe-when-i-have-doubts'],
  },

  {
    slug: 'why-does-god-allow-suffering',
    question: 'Why does God allow suffering?',
    category: 'Suffering & Evil',
    updated: '2026-07-06',
    answer:
      'Christianity does not give a tidy formula for why suffering happens, but it makes two claims: that a world with real love requires real freedom, which can be misused, and that God did not stay distant from pain. He entered it. The answer it offers is less an explanation and more a presence in the middle of it.',
    body: [
      { h: 'The honest starting point: it does not fully explain it',
        p: 'The Bible never hands you a clean equation for suffering. The book of Job spends dozens of chapters refusing easy answers. If someone tells you Christianity solves the problem of pain neatly, they are overselling it. What it offers is different, and, for many people, deeper.' },
      { h: 'Love requires freedom, and freedom can be misused',
        p: 'A world where people can genuinely love is a world where they can also genuinely harm. You cannot have one without the possibility of the other. Much of the worst suffering comes from freedom turned against others. Not from God causing it, but from God allowing a world where love is real enough to be refused.' },
      { h: 'God did not watch from a distance',
        p: 'The central Christian claim is not that God explains suffering from far away, but that he stepped into it: betrayed, tortured, and killed. Whatever you are carrying, the faith says you are not carrying it in front of a God who has never felt pain. He is described again and again as close to the brokenhearted.' },
    ],
    scriptures: [
      { ref: 'Psalm 34:18', text: 'The Lord is close to the brokenhearted and saves those who are crushed in spirit.' },
      { ref: 'John 16:33', text: 'In this world you will have trouble. But take heart! I have overcome the world.' },
      { ref: 'Romans 8:28', text: 'And we know that in all things God works for the good of those who love him.' },
    ],
    faqs: [
      { q: 'Does God cause suffering?', a: 'Christianity distinguishes between God causing suffering and God allowing a world where freedom, and therefore harm, is possible. Much suffering flows from that freedom being misused, not from God directly willing pain.' },
      { q: 'What comfort does faith actually offer in pain?', a: 'Less a tidy explanation, more a presence: the claim that God entered suffering himself and stays near those who are hurting, and that pain is not the end of the story.' },
      { q: 'Is it okay to be angry at God about suffering?', a: 'Yes. The Bible is full of people crying out honestly, the Psalms especially. Bringing your anger to God is treated as a form of relationship, not rebellion.' },
    ],
    related: ['is-the-resurrection-of-jesus-real', 'how-can-i-believe-when-i-have-doubts'],
  },

  {
    slug: 'how-can-i-believe-when-i-have-doubts',
    question: 'How can I believe in God when I have doubts?',
    category: 'Faith & Doubt',
    updated: '2026-07-06',
    answer:
      'Doubt is not the opposite of faith — certainty is not required to begin. Throughout the Bible, people believe and question at the same time. Faith is less a switch you flip and more a direction you lean while still carrying questions. You are allowed to explore honestly without first resolving every doubt.',
    body: [
      { h: 'Doubt and faith are not enemies',
        p: 'A lot of people assume you need to silence every question before you are allowed to believe. The Bible does not model that. A father once said to Jesus, "I do believe; help my unbelief", belief and doubt in the same breath, and he was not turned away. Honest questions are treated as part of the journey, not a barrier to it.' },
      { h: 'You do not have to start with certainty',
        p: 'Faith is not pretending to be sure of things you are not sure of. It is more like taking a step in a direction while still holding open questions. Many people begin by simply being willing to explore, reading, asking, praying tentatively, long before they would call themselves certain of anything.' },
      { h: 'Bring the questions, not a performance',
        p: 'You do not need to clean yourself up or fake conviction first. The invitation is to come as you actually are, skeptical, wondering, half-convinced, and keep asking. That is not second-class faith. For a lot of people, it is exactly where real faith starts.' },
    ],
    scriptures: [
      { ref: 'Mark 9:24', text: 'Immediately the boy’s father exclaimed, "I do believe; help me overcome my unbelief!"' },
      { ref: 'Matthew 7:7', text: 'Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.' },
    ],
    faqs: [
      { q: 'Is doubt a sin?', a: 'No. The Bible repeatedly shows people of deep faith wrestling with doubt. Doubt is treated as part of an honest relationship with God, not as failure.' },
      { q: 'Do I need to be sure before I can pray?', a: 'No. Many people pray tentatively, even skeptically, as a way of exploring. You can start a conversation with God without first resolving your questions.' },
      { q: 'What if my doubts never fully go away?', a: 'Faith and questions often coexist for a lifetime. Leaning toward trust while still holding some questions is a normal, honest form of belief. Not a lesser one.' },
    ],
    related: ['is-the-resurrection-of-jesus-real', 'why-does-god-allow-suffering'],
  },

  {
    slug: 'can-i-trust-the-bible',
    question: `Can I trust the Bible?`,
    category: 'Bible',
    updated: '2026-07-06',
    answer: `The Bible is a library written over centuries, and its reliability is testable: it has more early manuscripts than any ancient text, they agree closely, and archaeology keeps confirming its people and places. You can question it honestly, many who set out to disprove it ended up trusting it, without checking your mind at the door.`,
    body: [
      { h: `It has stronger manuscript evidence than any ancient text`, p: `No ancient document comes close to the Bible in how early and how widely its manuscripts survive — thousands of copies, some within a couple of generations of the events. Where copies differ, it is mostly spelling and word order, not the core message. You are not reading a text that drifted freely over time.` },
      { h: `It was written to be examined, not just accepted`, p: `The Bible names real rulers, cities, and dates you can check. Luke opens his gospel saying he carefully investigated everything. It invites scrutiny rather than demanding blind acceptance, which is part of why many skeptics who studied it closely came away convinced.` },
      { h: `Reliable does not mean simple`, p: `There are hard passages and honest tensions worth wrestling with. Trusting the Bible does not mean pretending those do not exist. It means engaging them openly. That is exactly what kinwove is for.` },
    ],
    scriptures: [
      { ref: `2 Timothy 3:16`, text: `All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness.` },
      { ref: `Isaiah 40:8`, text: `The grass withers and the flowers fall, but the word of our God endures forever.` },
    ],
    faqs: [
      { q: `Hasn't the Bible been changed over time?`, a: `The manuscript evidence argues against it: thousands of early copies let scholars trace the text closely, and the differences that exist are minor, not changes to core teaching.` },
      { q: `Do you have to take every word literally?`, a: `No. The Bible holds history, poetry, letters, and parables, different kinds of writing read different ways. Reading it well means reading each part as what it is.` },
      { q: `Where should a beginner start?`, a: `Many start with the Gospel of John or Mark to meet Jesus directly, then Psalms for honest prayer. You can also just ask kinwove where to begin.` },
    ],
    related: ['is-jesus-really-god', 'how-can-i-believe-when-i-have-doubts'],
  },

  {
    slug: 'is-jesus-really-god',
    // Reciprocal half of the hreflang pair with content/answers-fa.js. Without
    // it the Farsi page points here and gets nothing back, and Google treats
    // the two as unrelated pages rather than translations of one another.
    translations: ['fa'],
    question: `Is Jesus really God?`,
    category: 'Jesus Christ',
    updated: '2026-07-06',
    answer: `Christianity claims Jesus was not just a wise teacher but God in human form. He forgave sins as only God can, accepted worship, and said "before Abraham was born, I am." Either that is true, or he was profoundly mistaken, but "just a good moral teacher" was never really on the table.`,
    body: [
      { h: `He said and did things only God could rightly do`, p: `Jesus forgave sins against other people, accepted worship, and applied God's own name to himself. His fiercest critics understood exactly what he was claiming. They accused him of blasphemy for it. He did not leave "just a teacher" as an option.` },
      { h: `Liar, lunatic, or Lord`, p: `A man who says what Jesus said is either lying, deluded, or telling the truth. The one thing he cannot be is merely a great moral teacher, because great moral teachers do not claim to be God. You have to decide which of the three he was.` },
      { h: `The first followers worshiped him as God`, p: `Within a few years of his death, devout Jewish monotheists, people for whom worshiping a human was unthinkable, were praying to Jesus and calling him Lord. Something convinced them he was more than a man.` },
    ],
    scriptures: [
      { ref: `John 8:58`, text: `"Very truly I tell you," Jesus answered, "before Abraham was born, I am!"` },
      { ref: `John 1:1`, text: `In the beginning was the Word, and the Word was with God, and the Word was God.` },
    ],
    faqs: [
      { q: `Didn't Jesus just claim to be a prophet?`, a: `His claims went far beyond prophethood: forgiving sins, accepting worship, taking God's name for himself. That is why he was charged with blasphemy.` },
      { q: `Where does the Bible say Jesus is God?`, a: `In many places: John 1:1, John 8:58, Colossians 1, and Jesus accepting Thomas's worship as "My Lord and my God" in John 20:28.` },
      { q: `Can I follow Jesus if I'm not sure he's God?`, a: `Many people start following and exploring before they are certain. Faith often grows on the way, not before you set out.` },
    ],
    related: ['is-the-resurrection-of-jesus-real', 'is-christianity-the-only-way-to-god'],
  },

  {
    slug: 'what-happens-when-you-die',
    question: `What happens when you die?`,
    category: 'Eternal Life',
    updated: '2026-07-06',
    answer: `Christianity teaches death is not the end but a doorway: that there is life beyond it, and what you do with Jesus in this life matters for the next. The hope it describes is not vague survival but resurrection, reunion, and a God who promises to wipe every tear away.`,
    body: [
      { h: `Death is described as a doorway, not a wall`, p: `The Bible does not treat death as final erasure but as a passage. Jesus told a dying man beside him, "today you will be with me in paradise." The Christian hope is not that we drift into nothing, but that we continue, and are made whole.` },
      { h: `The hope is resurrection, not just a ghostly afterlife`, p: `Christianity's promise is bodily resurrection and a renewed world, not merely floating souls. Everything broken finally restored, with no more death, mourning, or pain.` },
      { h: `What you do with Jesus matters`, p: `The Bible is honest that this life carries weight for the next, and that how we respond to God's offer of grace matters. But the tone is invitation, not fear, a door held open, not a threat.` },
    ],
    scriptures: [
      { ref: `John 11:25`, text: `I am the resurrection and the life. The one who believes in me will live, even though they die.` },
      { ref: `Revelation 21:4`, text: `He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain.` },
    ],
    faqs: [
      { q: `Is heaven real?`, a: `Christianity teaches heaven is real. Not a distant cloud, but being fully with God in a restored world, free of pain and death.` },
      { q: `What about hell?`, a: `The Bible speaks of separation from God as a real possibility, but frames the whole message as an invitation into life, not primarily a threat.` },
      { q: `Can anyone know for sure what happens after death?`, a: `No one can prove it. Christianity offers it as hope grounded in Jesus's resurrection, a reason to trust, not a lab result.` },
    ],
    related: ['is-the-resurrection-of-jesus-real', 'does-god-love-me'],
  },

  {
    slug: 'how-do-i-start-praying',
    question: `How do I start praying?`,
    category: 'Prayer',
    updated: '2026-07-06',
    answer: `Prayer is simpler than most people think: it is just honest talking to God in your own words. You do not need special language, a certain posture, or the right feelings. You can start with a single sentence: even "God, I don't know if you're there, but I'm listening." That counts.`,
    body: [
      { h: `There is no formula to get right`, p: `Prayer is not a spell with magic words. Jesus actually warned against long, showy prayers and taught a short, plain one as a model. If you can talk, you can pray.` },
      { h: `Start honest, not polished`, p: `You do not have to sound religious or hide how you actually feel. The Psalms are full of raw, unfiltered prayers: anger, fear, doubt, joy. God is not waiting for eloquence. He is after honesty.` },
      { h: `A simple way to begin`, p: `Find a quiet minute and say what is true: what you are grateful for, what you are afraid of, what you need. Then listen for a moment. That is prayer, and you can do it anywhere.` },
    ],
    scriptures: [
      { ref: `Matthew 6:6`, text: `But when you pray, go into your room, close the door and pray to your Father, who is unseen.` },
      { ref: `Philippians 4:6`, text: `Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.` },
    ],
    faqs: [
      { q: `Do I have to pray out loud?`, a: `No. You can pray silently, in writing, or out loud, whatever helps you be honest.` },
      { q: `What if I don't know what to say?`, a: `Start with one true sentence. "Help," "thank you," or "I don't understand" are all real prayers.` },
      { q: `Does God actually hear me?`, a: `Christianity teaches God is near to everyone who calls on him honestly, that no sincere prayer goes unheard.` },
    ],
    related: ['how-do-i-become-a-christian', 'does-god-love-me'],
  },

  {
    slug: 'how-do-i-become-a-christian',
    question: `How do I become a Christian?`,
    category: 'Salvation',
    updated: '2026-07-06',
    answer: `Becoming a Christian is not about cleaning up your life first or passing a test. At its core it is a turning: trusting that Jesus is who he said he is, that his death covers your wrongs, and asking him into your life. It can be as simple as an honest prayer, meant sincerely.`,
    body: [
      { h: `It starts with grace, not performance`, p: `You do not become a Christian by being good enough. The whole point is that no one is. It is a gift you receive, not a status you earn. That is what grace means: unearned love.` },
      { h: `The turning has a few simple parts`, p: `Historically it is summed up as: believe Jesus is Lord and rose from the dead, turn from going your own way, and receive him. Not a ritual performed perfectly, a direction you choose.` },
      { h: `A prayer to begin`, p: `There are no magic words, but many start with something like: "Jesus, I believe you're real. I've gone my own way and I need you. Forgive me, and come into my life." If you mean it, that is the beginning.` },
    ],
    scriptures: [
      { ref: `Romans 10:9`, text: `If you declare with your mouth, "Jesus is Lord," and believe in your heart that God raised him from the dead, you will be saved.` },
      { ref: `Ephesians 2:8`, text: `For it is by grace you have been saved, through faith, and this is not from yourselves, it is the gift of God.` },
    ],
    faqs: [
      { q: `Do I have to fix my life first?`, a: `No. You come as you are. Change tends to follow, but it is never the entry requirement. Grace is.` },
      { q: `Is there a specific prayer I have to say?`, a: `No exact words are required. What matters is honestly turning to Jesus and meaning it.` },
      { q: `What do I do after?`, a: `Start talking to God, reading the Gospels, and finding others on the same road. kinwove can help with all three.` },
    ],
    related: ['how-do-i-start-praying', 'will-god-forgive-me'],
  },

  {
    slug: 'is-there-evidence-that-god-exists',
    question: `Is there evidence that God exists?`,
    category: 'Faith & Doubt',
    updated: '2026-07-06',
    answer: `There is no single knockdown proof of God, but there are real reasons people find persuasive: that anything exists at all, that the universe is finely tuned for life, that we have a deep sense of right and wrong, and that longing for meaning is nearly universal. It is a case to weigh, not a formula to force.`,
    body: [
      { h: `Why is there something rather than nothing?`, p: `The universe had a beginning, and everything that begins seems to have a cause. That does not prove God, but it points many thoughtful people toward a cause beyond the universe itself, something outside space and time.` },
      { h: `The universe looks strangely fit for life`, p: `The physical constants that make life possible sit in an astonishingly narrow range. Some explain this away; others find it easier to believe it was intended. Both are honest responses to a genuinely striking fact.` },
      { h: `Our moral sense is hard to explain away`, p: `Almost everyone feels that some things are truly wrong, not just unpopular. That deep intuition, that justice and love are real, fits a universe with a moral God more naturally than one without.` },
    ],
    scriptures: [
      { ref: `Romans 1:20`, text: `For since the creation of the world God's invisible qualities have been clearly seen, being understood from what has been made.` },
      { ref: `Psalm 19:1`, text: `The heavens declare the glory of God; the skies proclaim the work of his hands.` },
    ],
    faqs: [
      { q: `Can God's existence be proven?`, a: `Not with mathematical certainty. It is weighed through reasoning and evidence, the origin of the universe, fine-tuning, morality, experience, like a case, not a proof.` },
      { q: `Doesn't science explain everything without God?`, a: `Science explains how things work, not why anything exists at all. Many scientists hold faith; the two are not necessarily in conflict.` },
      { q: `Is it okay to want more certainty?`, a: `Yes. Wanting good reasons is healthy. Faith and honest questioning belong together.` },
    ],
    related: ['how-can-i-believe-when-i-have-doubts', 'is-jesus-really-god'],
  },

  {
    slug: 'what-is-the-meaning-of-life',
    question: `What is the meaning of life?`,
    category: 'Purpose',
    updated: '2026-07-06',
    answer: `Christianity's answer is that you were made on purpose, by a God who loves you, to know him and to love others, and that your life has weight beyond what you produce or achieve. Meaning is not something you have to manufacture alone; it is something you were built for and can be found.`,
    body: [
      { h: `You are not an accident`, p: `The Christian claim is that you were intended. Known before you were born, made in God's image. Whatever else is true of your life, it starts from being wanted, not random. That reframes everything.` },
      { h: `Meaning is relational, not just achievement`, p: `The deepest purpose the Bible describes is not success but love, being loved by God and loving others. That is why people who "have it all" often still feel empty. We were made for connection, not accumulation.` },
      { h: `Your worth is not earned`, p: `You do not have to justify your existence by being impressive. Christianity says your value is given, not achieved. Both humbling and freeing. You can stop auditioning for a place you already have.` },
    ],
    scriptures: [
      { ref: `Jeremiah 1:5`, text: `Before I formed you in the womb I knew you, before you were born I set you apart.` },
      { ref: `Ephesians 2:10`, text: `For we are God's handiwork, created in Christ Jesus to do good works.` },
    ],
    faqs: [
      { q: `What if I don't feel like my life has purpose?`, a: `Christianity locates purpose in being loved and made on purpose, not in feelings or output, so it holds even on the days it does not feel true.` },
      { q: `Isn't meaning just something we make up?`, a: `Christianity says meaning is discovered, not invented, that you were made for something and can find it rather than manufacture it.` },
      { q: `How do I find my specific purpose?`, a: `It usually starts with knowing you are loved, then loving others with what you have been given. The specifics unfold from there.` },
    ],
    related: ['does-god-love-me', 'am-i-too-far-gone-for-god'],
  },

  {
    slug: 'is-christianity-the-only-way-to-god',
    question: `Is Christianity the only way to God?`,
    category: 'Faith & Doubt',
    updated: '2026-07-06',
    answer: `Christianity does make an exclusive claim, that Jesus is the way to God, which can sound arrogant. But it is less a boast about Christians being better and more a claim about what Jesus uniquely did: opened a door none of us could open ourselves. It is worth understanding before dismissing.`,
    body: [
      { h: `The claim is about Jesus, not about Christians`, p: `Christianity does not say Christians are superior people or that others are foolish. It says Jesus did something unique, bridging the gap between God and humanity himself. The exclusivity is about him, not the people who follow him.` },
      { h: `Every worldview makes exclusive claims`, p: `The idea that "all paths lead to God" is itself an exclusive claim. It says every religion that denies it is wrong. There is no neutral ground. The honest question is not whether a view is exclusive, but whether it is true.` },
      { h: `It is an open door, not a closed club`, p: `The same faith that says Jesus is the only way also says that door is open to absolutely anyone. No matter your past, background, or how far off you feel. Exclusive path, radically inclusive welcome.` },
    ],
    scriptures: [
      { ref: `John 14:6`, text: `Jesus answered, "I am the way and the truth and the life. No one comes to the Father except through me."` },
      { ref: `Revelation 22:17`, text: `Whoever is thirsty, let them come; and whoever wishes, let them take the free gift of the water of life.` },
    ],
    faqs: [
      { q: `Isn't it arrogant to say one religion is right?`, a: `It can sound that way, but every worldview, including "all are equal", claims to be the true one. The real question is which is true, not which sounds humblest.` },
      { q: `What about people who never heard of Jesus?`, a: `The Bible leaves some of this in God's hands and describes him as perfectly just and more merciful than we are. Christians trust God to judge fairly.` },
      { q: `Can I explore Christianity while respecting my background?`, a: `Yes. Many people explore honestly, bringing their questions and heritage with them. You are welcome here exactly as you are.` },
    ],
    related: ['is-jesus-really-god', 'is-there-evidence-that-god-exists'],
  },

  {
    slug: 'does-god-love-me',
    question: `Does God love me?`,
    category: 'Grace',
    updated: '2026-07-06',
    answer: `Yes, and not because of what you have done or how you feel. The central Christian claim is that God loves you as you are, not as you should be. It is summed up in one line: while we were still a mess, Christ died for us. His love is a fact about him, not a reward for you.`,
    body: [
      { h: `His love is not earned, that is the whole point`, p: `You do not have to become lovable first. The Bible's most famous line about God's love says he acted "while we were still sinners", at our worst, not our best. His love comes before your performance, not after it.` },
      { h: `It is personal, not just general`, p: `This is not a vague cosmic warmth toward humanity in general. The Bible describes a God who knows the hairs on your head, who is close to the brokenhearted, who calls you by name. You, specifically.` },
      { h: `True even when you don't feel it`, p: `Feelings come and go. God's love is described as steady and unfailing, not dependent on your mood or track record. On the days you feel least lovable, it is exactly as true.` },
    ],
    scriptures: [
      { ref: `Romans 5:8`, text: `But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.` },
      { ref: `Zephaniah 3:17`, text: `The Lord your God is with you; he will take great delight in you; he will rejoice over you with singing.` },
    ],
    faqs: [
      { q: `Does God love me even after what I've done?`, a: `Yes. The Bible is emphatic that nothing you have done places you beyond God's love or reach.` },
      { q: `Why doesn't it feel like God loves me?`, a: `Feelings are not a reliable gauge. God's love is described as constant and unearned, true even when it does not feel true.` },
      { q: `How do I experience God's love?`, a: `Many start by asking him to make it real, reading how Jesus treated broken people, and being honest in prayer.` },
    ],
    related: ['am-i-too-far-gone-for-god', 'will-god-forgive-me'],
  },

  {
    slug: 'what-does-the-bible-say-about-anxiety',
    question: `What does the Bible say about anxiety?`,
    category: 'Mental Health',
    updated: '2026-07-06',
    answer: `The Bible speaks to anxiety often, and never with shame. Its repeated message is: you are not carrying this alone, so hand it over. "Do not be afraid" appears more than any other command. Not because life isn't hard, but because God promises to be with you in it. An invitation to release, not a rebuke for feeling it.`,
    body: [
      { h: `Anxiety is not treated as a failure of faith`, p: `The Bible is full of people crying out in fear and being met with compassion, not scolding. Even Jesus felt deep distress. Feeling anxious does not mean something is wrong with your faith. It means you are human.` },
      { h: `The recurring invitation: hand it over`, p: `Again and again the Bible says to bring your worries to God rather than carry them alone, to "cast your anxiety on him, because he cares for you." Not "try harder to stop worrying," but "give it to someone bigger."` },
      { h: `Peace is offered, not demanded`, p: `The promise is not a life without hard things, but a peace that can hold you inside them. One the Bible says "transcends understanding." Practical: pray honestly, name what you fear, and release it, one day at a time.` },
    ],
    scriptures: [
      { ref: `Philippians 4:6-7`, text: `Do not be anxious about anything... and the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.` },
      { ref: `1 Peter 5:7`, text: `Cast all your anxiety on him because he cares for you.` },
    ],
    faqs: [
      { q: `Is anxiety a sin?`, a: `No. The Bible treats fear and worry with compassion, not condemnation, and repeatedly meets anxious people with reassurance.` },
      { q: `Does faith mean I won't feel anxious?`, a: `No. It means you do not carry it alone. Many people of deep faith also seek counseling and medical help, faith and care work together.` },
      { q: `What verse helps most with anxiety?`, a: `Philippians 4:6-7 is the one many return to: bring it to God, and receive a peace beyond understanding.` },
    ],
    related: ['does-god-love-me', 'how-do-i-start-praying'],
  },

  {
    slug: 'will-god-forgive-me',
    question: `Will God forgive me?`,
    category: 'Grace',
    updated: '2026-07-06',
    answer: `Yes. Christianity's core promise is that no sin is too big for God's forgiveness. It is not earned by making up for it; it is received. The Bible says if you confess, God is faithful to forgive and clean the slate entirely. Removing your wrongs "as far as the east is from the west."`,
    body: [
      { h: `Forgiveness is the point, not the fine print`, p: `Christianity is not grudging about this. Forgiveness is the center of the message. It is why Jesus came. Whatever you have done, the door is described as open and the offer already made.` },
      { h: `It is received, not earned`, p: `You cannot pay God back into forgiving you, and you do not have to. The Bible says forgiveness is a gift, secured by Jesus, not by your penance. Your job is simply to receive it honestly.` },
      { h: `The slate is truly wiped`, p: `This is not partial or probationary. Scripture uses total images: sins removed as far as east from west, thrown into the depths of the sea, remembered no more. Forgiven means forgiven.` },
    ],
    scriptures: [
      { ref: `1 John 1:9`, text: `If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.` },
      { ref: `Psalm 103:12`, text: `As far as the east is from the west, so far has he removed our transgressions from us.` },
    ],
    faqs: [
      { q: `Is any sin too big to be forgiven?`, a: `No. The Bible presents no sin as beyond God's forgiveness for those who honestly turn to him.` },
      { q: `Do I have to earn forgiveness?`, a: `No. It is received as a gift, not earned by good deeds or self-punishment.` },
      { q: `What if I keep doing the same thing?`, a: `God's forgiveness is not a limited quantity. The invitation to return is always open, again and again.` },
    ],
    related: ['am-i-too-far-gone-for-god', 'how-do-i-become-a-christian'],
  },

  {
    slug: 'am-i-too-far-gone-for-god',
    question: `Am I too far gone for God?`,
    category: 'Grace',
    updated: '2026-07-06',
    answer: `No one is too far gone. This is one of the most consistent messages in the Bible: that no past, no failure, and no distance puts you beyond God's reach. The people Jesus welcomed most were the ones everyone else had written off. If you are wondering whether there is still room for you, the answer is yes.`,
    body: [
      { h: `The Bible is full of "unqualified" people God used`, p: `Moses was a murderer. David committed adultery. Peter denied Jesus. Paul persecuted Christians. Not one was too far gone, several became the story's heroes. Your past is not a disqualification.` },
      { h: `Jesus went straight to the written-off`, p: `The religious crowd was scandalized that Jesus spent his time with the people they had given up on. That was the point. He said he came for those who know they need help, not those who think they do not.` },
      { h: `The distance you feel is not the distance that's real`, p: `Feeling far from God is not the same as being beyond him. The most famous story Jesus told is about a son who blew everything and came home, and his father ran to meet him while he was still a long way off.` },
    ],
    scriptures: [
      { ref: `Luke 15:20`, text: `But while he was still a long way off, his father saw him and was filled with compassion for him; he ran to his son and threw his arms around him.` },
      { ref: `Romans 8:38-39`, text: `Neither death nor life, neither the present nor the future, will be able to separate us from the love of God that is in Christ Jesus our Lord.` },
    ],
    faqs: [
      { q: `Is it ever too late to turn to God?`, a: `As long as you are alive, the Bible presents the door as open. No amount of time or wrong closes it.` },
      { q: `What if my past is really bad?`, a: `Some of the Bible's central figures had terrible pasts. God's reach is not limited by the size of your regrets.` },
      { q: `How do I come back to God?`, a: `Simply turn toward him honestly. A prayer as plain as "I'm here, I need you" is enough to start.` },
    ],
    related: ['will-god-forgive-me', 'does-god-love-me'],
  },

  {
    slug: 'what-is-the-gospel',
    question: `What is the gospel?`,
    category: 'Salvation',
    updated: '2026-07-06',
    answer: `The gospel means "good news," and it is this: that God loves you, that Jesus lived, died, and rose to deal with everything broken between you and God, and that this rescue is a gift you receive rather than a reward you earn. In short. You are more flawed than you feared, and more loved than you hoped.`,
    body: [
      { h: `It is news, not advice`, p: `Most religion is advice. Do these things and get to God. The gospel is news, that God already came to you. It is not a to-do list; it is an announcement of something already done.` },
      { h: `The core of it in one line`, p: `Jesus took what we owed and offered us what we could never earn. His death paid the debt; his resurrection opened the door. All that is left is to receive it.` },
      { h: `Why it is called "good"`, p: `Because it does not depend on you being good enough, which is a relief, since no one is. It meets you at your worst and calls you loved anyway.` },
    ],
    scriptures: [
      { ref: `John 3:16`, text: `For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.` },
      { ref: `Romans 5:8`, text: `But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.` },
    ],
    faqs: [
      { q: `What does "gospel" actually mean?`, a: `It is an old word for "good news", specifically the news that God has rescued people through Jesus.` },
      { q: `Is the gospel about being a good person?`, a: `No. It is the opposite, that you cannot be good enough on your own, so God did for you what you could not do for yourself.` },
      { q: `How do I respond to it?`, a: `By receiving it, trusting Jesus and turning to him. It is a gift to accept, not a standard to meet.` },
    ],
    related: ['how-do-i-become-a-christian', 'what-is-grace'],
  },

  {
    slug: 'who-is-the-holy-spirit',
    question: `Who is the Holy Spirit?`,
    category: 'Holy Spirit',
    updated: '2026-07-06',
    answer: `The Holy Spirit is God himself present and active. Not a force or an "it," but the third person of the Trinity. Christians describe the Spirit as God living within them: comforting, guiding, convicting, and giving strength. Where God can feel distant, the Spirit is the nearness.`,
    body: [
      { h: `Not a force, but God present`, p: `The Bible speaks of the Spirit as personal. He can be grieved, he speaks, he guides. He is God with us and in us, not an impersonal energy.` },
      { h: `What the Spirit does`, p: `Comforts the hurting, gives wisdom, produces character over time (love, joy, peace, patience), and makes God's presence real rather than theoretical.` },
      { h: `Why it matters for you`, p: `It means faith is not you white-knuckling toward God from a distance. The Spirit is God closing the distance, living in ordinary people and slowly changing them from the inside.` },
    ],
    scriptures: [
      { ref: `John 14:26`, text: `But the Advocate, the Holy Spirit, whom the Father will send in my name, will teach you all things.` },
      { ref: `Galatians 5:22-23`, text: `But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness.` },
    ],
    faqs: [
      { q: `Is the Holy Spirit a person or a force?`, a: `Christianity describes the Spirit as a person, God himself, not an impersonal force.` },
      { q: `How do I receive the Holy Spirit?`, a: `The Bible teaches the Spirit comes to those who turn to Jesus. It is part of what happens when you become a Christian, not a separate achievement.` },
      { q: `Can I feel the Holy Spirit?`, a: `Sometimes, but it is not mainly about feelings. The Spirit is often known by slow change: growing peace, wisdom, and love over time.` },
    ],
    related: ['what-is-the-trinity', 'what-is-the-gospel'],
  },

  {
    slug: 'what-is-the-trinity',
    question: `What is the Trinity?`,
    category: 'Jesus Christ',
    updated: '2026-07-06',
    answer: `The Trinity is the Christian belief that God is one being who exists as three persons: Father, Son, and Holy Spirit. Not three gods, and not one person wearing three masks, but one God in three. It is genuinely hard to picture, which is honest: an infinite God being fully understandable would be more suspicious.`,
    body: [
      { h: `One God, three persons`, p: `Christians are firmly monotheists. One God. But the Bible presents Father, Son, and Spirit as each fully God, distinct yet united. That tension is the Trinity.` },
      { h: `Why analogies fall short`, p: `Water as ice, liquid, and steam; or a person as parent, worker, and friend. Every analogy breaks down, because nothing in creation is quite like it. That is expected when describing the Creator.` },
      { h: `Why it actually matters`, p: `It means God is, in his very nature, relationship and love. Not a solitary ruler, but a communion of love that has always existed. That shapes everything about how Christians see God.` },
    ],
    scriptures: [
      { ref: `Matthew 28:19`, text: `Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.` },
      { ref: `2 Corinthians 13:14`, text: `May the grace of the Lord Jesus Christ, and the love of God, and the fellowship of the Holy Spirit be with you all.` },
    ],
    faqs: [
      { q: `Do Christians believe in three gods?`, a: `No. Christianity is monotheistic, one God, who exists as three persons: Father, Son, and Holy Spirit.` },
      { q: `Is the word "Trinity" in the Bible?`, a: `The word itself is not, but the idea is drawn from many passages where Father, Son, and Spirit are each called God and shown as distinct.` },
      { q: `Do I have to fully understand it to be a Christian?`, a: `No. Even lifelong Christians find it mysterious. You are not required to explain it, only to trust the God it describes.` },
    ],
    related: ['is-jesus-really-god', 'who-is-the-holy-spirit'],
  },

  {
    slug: 'what-does-the-bible-say-about-depression',
    question: `What does the Bible say about depression?`,
    category: 'Mental Health',
    updated: '2026-07-06',
    answer: `The Bible never shames people for depression. It is full of them. David, Elijah, and even Jesus knew deep anguish. Its message is not "snap out of it" but "you are not alone in this, and it is not the end of your story." Faith and seeking real help, counseling, medicine, belong together.`,
    body: [
      { h: `Scripture is honest about the darkness`, p: `The Psalms include raw cries like "why, my soul, are you so downcast?" Elijah asked to die. The Bible does not pretend faith erases pain. It gives words to it.` },
      { h: `You are not carrying it alone`, p: `The repeated promise is God's nearness in the low places: "close to the brokenhearted." Not a fix on demand, but a presence that does not leave.` },
      { h: `Faith and help are not rivals`, p: `Seeking a counselor, a doctor, or medication is not a lack of faith. It is stewarding the life you have. Many faithful people carry depression and get real help for it. Both are good.` },
    ],
    scriptures: [
      { ref: `Psalm 34:18`, text: `The Lord is close to the brokenhearted and saves those who are crushed in spirit.` },
      { ref: `Psalm 42:11`, text: `Why, my soul, are you downcast? Put your hope in God, for I will yet praise him.` },
    ],
    faqs: [
      { q: `Is depression a sin or a lack of faith?`, a: `No. The Bible shows people of deep faith wrestling with despair. Depression is treated with compassion, not blame.` },
      { q: `Should Christians take medication or see a therapist?`, a: `Many do, and Scripture gives no reason not to. Caring for your mind is part of caring for the life God gave you.` },
      { q: `What can I do right now if I'm struggling?`, a: `Tell someone, reach out for help, and if you are in crisis, contact a crisis line. You are not meant to carry this alone.` },
    ],
    related: ['what-does-the-bible-say-about-anxiety', 'does-god-love-me'],
  },

  {
    slug: 'how-do-i-read-the-bible-as-a-beginner',
    question: `How do I read the Bible as a beginner?`,
    category: 'Bible',
    updated: '2026-07-06',
    answer: `Don't start at page one. Begin with the Gospel of John or Mark to meet Jesus directly, then try Psalms for honest prayer and Proverbs for daily wisdom. Read a little at a time, ask what it says about God and people, and don't worry about understanding everything at once.`,
    body: [
      { h: `Start with Jesus, not Genesis`, p: `Genesis-to-front is where many beginners get stuck. Start with a Gospel, John or Mark, where you meet Jesus himself. Everything else makes more sense in that light.` },
      { h: `Small and steady beats marathon`, p: `A few verses read slowly and thought about beats rushing chapters. Ask three simple questions: what does this say about God, about people, and about me?` },
      { h: `It is okay not to get it all`, p: `Some passages are hard, and even scholars debate them. Confusion is not failure. It is an invitation to ask. You can bring any question to kinwove as you read.` },
    ],
    scriptures: [
      { ref: `Psalm 119:105`, text: `Your word is a lamp for my feet, a light on my path.` },
      { ref: `Joshua 1:8`, text: `Keep this Book of the Law always on your lips; meditate on it day and night.` },
    ],
    faqs: [
      { q: `Which Bible translation should a beginner use?`, a: `A readable modern one like the NIV or NLT is a great start, clear English without losing the meaning.` },
      { q: `Where exactly should I start reading?`, a: `The Gospel of John or Mark to meet Jesus, then Psalms and Proverbs. Skip trying to read cover to cover at first.` },
      { q: `What if I don't understand what I read?`, a: `That is normal. Note your questions and ask — kinwove can explain passages in plain language as you go.` },
    ],
    related: ['can-i-trust-the-bible', 'how-do-i-start-praying'],
  },

  {
    slug: 'what-is-grace',
    question: `What is grace?`,
    category: 'Grace',
    updated: '2026-07-06',
    answer: `Grace is love you did not earn and cannot repay. It is the heart of Christianity: not "be good and God will accept you," but "God accepts you, and that changes you." Grace means the acceptance comes first: before you clean up, before you deserve it, before you even ask.`,
    body: [
      { h: `Unearned, on purpose`, p: `Every other system runs on earning. Do more, get more. Grace flips it: the gift comes first, freely, precisely to people who could never earn it. That is what makes it grace and not wages.` },
      { h: `It is not a license, it is a change`, p: `People worry grace means "do whatever you want." In practice it does the opposite, being loved when you least deserve it tends to change you more than any threat ever could.` },
      { h: `Why it is such a relief`, p: `Grace means you can stop performing. You do not have to earn your place; it is given. For anyone worn out from trying to be enough, that is the best news there is.` },
    ],
    scriptures: [
      { ref: `Ephesians 2:8-9`, text: `For it is by grace you have been saved, through faith, and this is not from yourselves, it is the gift of God, not by works, so that no one can boast.` },
      { ref: `2 Corinthians 12:9`, text: `My grace is sufficient for you, for my power is made perfect in weakness.` },
    ],
    faqs: [
      { q: `What is the simple definition of grace?`, a: `Unearned love and favor from God. Receiving good you did not earn and could not repay.` },
      { q: `Does grace mean I can do whatever I want?`, a: `No. Grace is not permission to do wrong; it is love that changes you from the inside, which usually leads away from it.` },
      { q: `How is grace different from mercy?`, a: `Mercy is not getting the punishment you deserve; grace is getting the good you do not deserve. They go together.` },
    ],
    related: ['does-god-love-me', 'what-is-the-gospel'],
  },

  {
    slug: 'why-do-i-need-jesus-if-im-a-good-person',
    question: `Why do I need Jesus if I'm a good person?`,
    category: 'Salvation',
    updated: '2026-07-06',
    answer: `Christianity does not say you are worthless. It says "good enough" was never the standard, for anyone. The point is not that you are terrible, but that none of us fully lives up to even our own ideals, and Jesus offers relationship, not just moral improvement. It is less about being bad and more about being loved.`,
    body: [
      { h: `Everyone falls short of their own standard`, p: `You do not have to be a villain to sense the gap. Most honest people admit they do not fully live up to what they know is right. The bar is not "better than average"; it is perfect, and no one clears it.` },
      { h: `It is about relationship, not a report card`, p: `Jesus does not offer mainly to make you a nicer person. He offers connection with God: something being good, on its own, cannot manufacture. Good people can still be far from God.` },
      { h: `Grace is for good people too`, p: `The gift is not only for the obviously broken. It is for the respectable, the moral, the "I'm basically fine". All of whom are also invited to receive rather than earn.` },
    ],
    scriptures: [
      { ref: `Romans 3:23`, text: `For all have sinned and fall short of the glory of God.` },
      { ref: `Ephesians 2:8-9`, text: `For it is by grace you have been saved, through faith... not by works, so that no one can boast.` },
    ],
    faqs: [
      { q: `Isn't being a good person enough?`, a: `Christianity says goodness is real but not the point. The offer is relationship with God, which good behavior alone cannot create.` },
      { q: `Does Christianity think I'm a bad person?`, a: `No. It says everyone, good and bad alike, falls short of perfection and is equally invited into grace.` },
      { q: `So do good works matter at all?`, a: `Yes, but as a response to being loved, not as the way to earn it. Grace comes first; good living flows from it.` },
    ],
    related: ['what-is-grace', 'how-do-i-become-a-christian'],
  },

  {
    slug: 'does-god-answer-prayer',
    question: `Does God answer prayer?`,
    category: 'Prayer',
    updated: '2026-07-06',
    answer: `Christianity teaches that God hears and answers prayer, but not like a vending machine. Sometimes the answer is yes, sometimes no, sometimes wait. The promise is not that you always get what you ask, but that you are always heard, and that God works for good even through the answers you did not want.`,
    body: [
      { h: `Heard is the first promise`, p: `Before results, the Bible's core claim is that God listens — that no honest prayer disappears into silence. You are heard even when the answer is not yet clear.` },
      { h: `"No" and "wait" are answers too`, p: `A loving parent does not grant every request. Some unanswered prayers, looking back, were mercies. God answering wisely is better than God answering instantly.` },
      { h: `Prayer changes the one praying`, p: `Prayer is not only about outcomes; it is a relationship. Many people find that even when circumstances do not change, they do: gaining peace, perspective, or strength to endure.` },
    ],
    scriptures: [
      { ref: `1 John 5:14`, text: `This is the confidence we have in approaching God: that if we ask anything according to his will, he hears us.` },
      { ref: `Matthew 7:7`, text: `Ask and it will be given to you; seek and you will find; knock and the door will be opened.` },
    ],
    faqs: [
      { q: `Why do some prayers go unanswered?`, a: `Christianity frames "no" and "wait" as real answers from a wise, loving God. Not silence. Sometimes an unanswered prayer is later seen as a mercy.` },
      { q: `Does God answer the prayers of non-Christians?`, a: `The Bible shows God responding to honest seekers of all kinds. You do not have to have it all figured out to pray.` },
      { q: `How do I know if God answered?`, a: `Answers come as yes, no, wait, or an unexpected redirect. Looking back over time often makes them clearer than they felt in the moment.` },
    ],
    related: ['how-do-i-start-praying', 'why-does-god-feel-so-far-away'],
  },

  {
    slug: 'what-does-the-bible-say-about-money',
    question: `What does the Bible say about money?`,
    category: 'Money & Giving',
    updated: '2026-07-06',
    answer: `The Bible talks about money constantly. Not to shame wealth, but to warn that money makes a terrible master. It is a tool, not a god. Generosity is treated as freedom, greed as a trap, and contentment as worth more than riches. The heart follows the treasure, so watch where yours goes.`,
    body: [
      { h: `Money is a tool, not the enemy`, p: `The Bible does not call money evil. It calls the love of money a root of trouble. Wealth is fine; being owned by it is the danger.` },
      { h: `Generosity is framed as freedom`, p: `Giving is presented not as loss but as liberation, proof that money has not captured you. "It is more blessed to give than to receive" is about the giver's freedom, not just the receiver's gain.` },
      { h: `Contentment beats accumulation`, p: `"Godliness with contentment is great gain." The Bible keeps redirecting from "how much can I get" to "is my heart free", because where your treasure is, your heart follows.` },
    ],
    scriptures: [
      { ref: `1 Timothy 6:10`, text: `For the love of money is a root of all kinds of evil.` },
      { ref: `Matthew 6:21`, text: `For where your treasure is, there your heart will be also.` },
    ],
    faqs: [
      { q: `Is it a sin to be rich?`, a: `No. The Bible warns against loving money and trusting it, not against having it. Wealth is a responsibility, not a crime.` },
      { q: `Do I have to give money to God or church?`, a: `Generosity is encouraged throughout the Bible as a joyful freedom, not a fee. It is framed as good for the giver, not a toll.` },
      { q: `What does the Bible say about debt or greed?`, a: `It cautions against being enslaved by debt and against greed, and points instead toward contentment and open-handedness.` },
    ],
    related: ['what-is-the-meaning-of-life', 'what-does-the-bible-say-about-anxiety'],
  },

  {
    slug: 'what-does-the-bible-say-about-loneliness',
    question: `What does the Bible say about loneliness?`,
    category: 'Mental Health',
    updated: '2026-07-06',
    answer: `The Bible takes loneliness seriously and answers it two ways: with the promise that God is always present — "I will never leave you" — and with the design that we were made for community, not isolation. You are not meant to do life alone, and even when people are absent, you are not truly abandoned.`,
    body: [
      { h: `The promise of presence`, p: `Again and again, God's answer to fear and isolation is "I am with you." The Bible insists you are never fully alone, even in the moments it feels most true.` },
      { h: `We were made for each other`, p: `From the start, "it is not good for man to be alone." Loneliness is not a personal failing. It is a signal that you were built for connection, and it is worth answering by reaching toward others.` },
      { h: `A first step out`, p: `Isolation deepens itself. Even one honest conversation, one message sent, one community joined can begin to break it. Faith communities exist partly for exactly this.` },
    ],
    scriptures: [
      { ref: `Deuteronomy 31:6`, text: `Be strong and courageous... for the Lord your God goes with you; he will never leave you nor forsake you.` },
      { ref: `Psalm 68:6`, text: `God sets the lonely in families.` },
    ],
    faqs: [
      { q: `Does God care that I'm lonely?`, a: `Yes. The Bible repeatedly promises God's presence to the isolated and describes him as setting the lonely in community.` },
      { q: `Is loneliness a sign something is wrong with me?`, a: `No. It is a normal human signal that you were made for connection. Not a flaw, but a pointer toward reaching out.` },
      { q: `What can I actually do about it?`, a: `Small steps: one honest conversation, one message, one community. kinwove exists partly to help people not walk it alone.` },
    ],
    related: ['does-god-love-me', 'why-should-i-go-to-church'],
  },

  {
    slug: 'is-hell-real',
    question: `Is hell real?`,
    category: 'Eternal Life',
    updated: '2026-07-06',
    answer: `The Bible does speak of hell as real, but it is best understood as the tragic possibility of a life fully turned away from God, not a threat God delights in. The emphasis of Scripture is overwhelmingly on the invitation: God "wants everyone to come to repentance." Hell is what he is rescuing people from, not longing to send them to.`,
    body: [
      { h: `Taken seriously, not sensationally`, p: `The Bible treats separation from God as a real and weighty possibility. But the lurid pop-culture image is not the center of the message. The rescue is.` },
      { h: `Freedom makes refusal possible`, p: `A God who honors real freedom is a God whose love can be genuinely refused. Many describe hell less as God locking people out and more as God honoring a "no" some insist on.` },
      { h: `The tone is invitation`, p: `Scripture keeps stressing that God "is patient with you, not wanting anyone to perish." The point of talking about hell is to say: there is a way home, and it is open.` },
    ],
    scriptures: [
      { ref: `2 Peter 3:9`, text: `The Lord is not slow in keeping his promise... he is patient with you, not wanting anyone to perish, but everyone to come to repentance.` },
      { ref: `1 Timothy 2:4`, text: `God our Savior, who wants all people to be saved and to come to a knowledge of the truth.` },
    ],
    faqs: [
      { q: `Does God send people to hell?`, a: `The Bible frames it more as honoring a freely chosen turning-away, with God relentlessly inviting people home rather than eager to condemn.` },
      { q: `How can a loving God allow hell?`, a: `Real love requires real freedom, including the freedom to refuse God. Christianity presents God as doing everything to rescue, not to condemn.` },
      { q: `Should fear of hell be why I follow God?`, a: `Christianity invites people primarily through love and grace, not fear. The healthiest reason to come is that God is good, not just that hell is bad.` },
    ],
    related: ['what-happens-when-you-die', 'is-christianity-the-only-way-to-god'],
  },

  {
    slug: 'how-do-i-know-gods-will-for-my-life',
    question: `How do I know God's will for my life?`,
    category: 'Purpose',
    updated: '2026-07-06',
    answer: `God's will is less a hidden map you have to crack and more a direction you can walk. Most of it is already clear: love God, love people, live with integrity. For the specific decisions, the Bible points to prayer, wisdom, godly counsel, and trusting that God guides people who are genuinely willing to follow.`,
    body: [
      { h: `Most of God's will is not secret`, p: `The Bible spends far more time on how to live than on which job to take. Love, honesty, kindness, humility. Start living the clear parts, and the specific ones tend to clarify.` },
      { h: `Guidance, not a treasure hunt`, p: `You do not have to fear "missing" some single hidden plan. God is described as guiding willing people step by step, "he will make your paths straight", not hiding the ball.` },
      { h: `Practical ways to discern`, p: `Pray honestly, seek wisdom in Scripture, ask trusted people who know you, notice your gifts and the needs around you, and take a faithful next step. Direction usually comes as you move, not before.` },
    ],
    scriptures: [
      { ref: `Proverbs 3:5-6`, text: `Trust in the Lord with all your heart... in all your ways submit to him, and he will make your paths straight.` },
      { ref: `Micah 6:8`, text: `And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.` },
    ],
    faqs: [
      { q: `What if I make the wrong decision?`, a: `Christianity presents God as able to guide and redeem willing people even through mistakes. You are not one wrong choice away from ruining a hidden plan.` },
      { q: `Does God have one specific plan for me?`, a: `The Bible emphasizes God's character and clear commands more than a single secret blueprint, while trusting he guides the details as you walk with him.` },
      { q: `How do I hear God's guidance?`, a: `Through prayer, Scripture, wise counsel, your circumstances and gifts, and a willingness to actually follow what becomes clear.` },
    ],
    related: ['what-is-the-meaning-of-life', 'how-do-i-start-praying'],
  },

  {
    slug: 'what-does-it-mean-to-be-born-again',
    question: `What does it mean to be born again?`,
    category: 'Salvation',
    updated: '2026-07-06',
    answer: `"Born again" is Jesus's own phrase for a fresh start so deep it is like beginning life over. It is not about religious behavior but inner renewal, God giving you a new heart and a new beginning, no matter your past. Less turning over a new leaf, more receiving a new life.`,
    body: [
      { h: `Jesus's own image`, p: `A religious leader named Nicodemus asked Jesus how to enter God's kingdom, and Jesus answered, "you must be born again." It is his picture of a beginning so total it is like a second birth.` },
      { h: `Inner change, not just behavior`, p: `It is not mainly about joining a religion or cleaning up your habits. The Bible describes God giving "a new heart", a change that starts inside and works outward.` },
      { h: `A real fresh start`, p: `Whatever your history, being born again means the slate is genuinely new. Not your old self trying harder, but a new life received as a gift.` },
    ],
    scriptures: [
      { ref: `John 3:3`, text: `Jesus replied, "Very truly I tell you, no one can see the kingdom of God unless they are born again."` },
      { ref: `2 Corinthians 5:17`, text: `Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!` },
    ],
    faqs: [
      { q: `Does "born again" mean joining a specific denomination?`, a: `No. It is Jesus's term for spiritual rebirth, a new beginning through him, not a label for one church group.` },
      { q: `How do I get "born again"?`, a: `The Bible ties it to turning to Jesus in faith. It is God's work in you, received rather than achieved.` },
      { q: `Does it erase my past?`, a: `That is the point, a genuinely new start. The old is described as gone, the new as here.` },
    ],
    related: ['how-do-i-become-a-christian', 'am-i-too-far-gone-for-god'],
  },

  {
    slug: 'why-should-i-go-to-church',
    question: `Why should I go to church?`,
    category: 'Church',
    updated: '2026-07-06',
    answer: `You do not have to attend church to have faith, but Christianity was never meant to be done alone. Church, at its best, is people carrying each other: encouragement, honesty, belonging, and shared purpose. It is less a building or a performance and more a family you are not meant to grow without.`,
    body: [
      { h: `Faith was designed to be shared`, p: `The Bible assumes community, not solo spirituality: "let us encourage one another." We grow, are held accountable, and are carried in ways isolation can never provide.` },
      { h: `It is people, not a building`, p: `Church is not the architecture or the service; it is the people. At its best it is a place to be known, to serve, and to belong, especially on the days faith feels thin.` },
      { h: `Honest about its flaws`, p: `Churches are full of imperfect people and sometimes get it wrong. That is worth naming. But a good community, flawed and real, still beats trying to do life and faith entirely alone.` },
    ],
    scriptures: [
      { ref: `Hebrews 10:24-25`, text: `And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together... but encouraging one another.` },
      { ref: `Ecclesiastes 4:9-10`, text: `Two are better than one... If either of them falls down, one can help the other up.` },
    ],
    faqs: [
      { q: `Can I be a Christian without going to church?`, a: `Yes, faith is personal, but the Bible strongly encourages community, because we are not designed to grow alone.` },
      { q: `What if I've been hurt by a church?`, a: `That is real and worth honoring. Not all communities are healthy; the goal is a good one, not just any one, and it is okay to take time.` },
      { q: `How do I find a good church?`, a: `Look for honesty, grace, and genuine care over performance. kinwove's directory can help you find a community near you.` },
    ],
    related: ['what-does-the-bible-say-about-loneliness', 'how-do-i-become-a-christian'],
  },

  {
    slug: 'what-does-the-bible-say-about-fear',
    question: `What does the Bible say about fear?`,
    category: 'Mental Health',
    updated: '2026-07-06',
    answer: `"Do not be afraid" is the most repeated command in the Bible. Said not because life is safe, but because God promises to be with you in it. Scripture does not scold fear; it meets it with presence. The antidote it offers is not pretending you are not afraid, but not facing it alone.`,
    body: [
      { h: `Fear is met with presence, not shame`, p: `Over and over, God's response to frightened people is "I am with you." The point is not to feel no fear, but to know you are not alone in it.` },
      { h: `Courage is fear plus company`, p: `Biblical courage is not the absence of fear; it is moving forward because God goes with you. "Be strong and courageous... for the Lord your God will be with you."` },
      { h: `Perfect love drives out fear`, p: `The deeper answer is love. The more secure you are in being loved by God, the less power fear holds. "There is no fear in love; perfect love drives out fear."` },
    ],
    scriptures: [
      { ref: `Isaiah 41:10`, text: `So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you.` },
      { ref: `1 John 4:18`, text: `There is no fear in love. But perfect love drives out fear.` },
    ],
    faqs: [
      { q: `Why does the Bible say "do not fear" so often?`, a: `Because fear is universal, and God's repeated answer is his presence: you do not face it alone.` },
      { q: `Does faith mean I'll never be afraid?`, a: `No. It means fear does not have the final word. Courage in the Bible is acting while afraid, trusting God is with you.` },
      { q: `What verse helps most with fear?`, a: `Isaiah 41:10, "do not fear, for I am with you", is one many people hold onto.` },
    ],
    related: ['what-does-the-bible-say-about-anxiety', 'does-god-love-me'],
  },

  {
    slug: 'why-does-god-feel-so-far-away',
    question: `Why does God feel so far away?`,
    category: 'Faith & Doubt',
    updated: '2026-07-06',
    answer: `Feeling distant from God is one of the most common experiences of faith, and feeling far is not the same as being far. Even great believers went through it; some of the Psalms are written from exactly that place. The distance is usually in the feeling, not the reality, and it rarely lasts.`,
    body: [
      { h: `You are in good company`, p: `The Psalms cry out "why do you hide your face?", and they are Scripture. Feeling God's absence is not a sign you have failed at faith; it is part of many honest faith journeys.` },
      { h: `Feelings are not the measure`, p: `God's nearness is described as a fact, not a mood. "I will never leave you." Emotions rise and fall; the promise does not. You can be held even when you do not feel it.` },
      { h: `What can help`, p: `Keep showing up honestly, even prayers of "I don't feel you, but I'm still here" count. Community, Scripture, and time often bring the felt sense back. Dry seasons usually pass.` },
    ],
    scriptures: [
      { ref: `Psalm 13:1`, text: `How long, Lord? Will you forget me forever? How long will you hide your face from me?` },
      { ref: `Deuteronomy 31:8`, text: `The Lord himself goes before you and will be with you; he will never leave you nor forsake you.` },
    ],
    faqs: [
      { q: `Does God actually leave people?`, a: `The Bible promises the opposite, that God never leaves. Feeling distant is common, but it is described as a feeling, not the reality.` },
      { q: `Did I do something to push God away?`, a: `Not necessarily. Spiritual dryness happens to almost everyone, often for no clear reason. It is not proof of failure.` },
      { q: `How do I feel close to God again?`, a: `Keep showing up honestly in prayer, community, and Scripture. The felt closeness usually returns with time; the promise holds in the meantime.` },
    ],
    related: ['how-can-i-believe-when-i-have-doubts', 'does-god-answer-prayer'],
  },

  {
    slug: 'what-is-faith',
    question: `What is faith?`,
    category: 'Faith & Doubt',
    updated: '2026-07-06',
    answer: `Faith is not pretending to be certain about things you cannot see. It is trust, leaning your weight on what you have good reason to believe, even without total proof. You already live by faith every day: in people, in chairs, in tomorrow. Faith in God is that same trust, aimed higher.`,
    body: [
      { h: `Trust, not blind certainty`, p: `Faith is often caricatured as believing without reason. Biblically it is closer to trust, confidence based on what you have come to know of God's character, not a leap into the dark.` },
      { h: `You already live by faith`, p: `You trust a chair to hold you, a friend to keep a promise, a pilot you have never met. None of it is total certainty. Faith is not foreign to you. It is how you already move through life.` },
      { h: `Faith and doubt can coexist`, p: `Faith does not require the absence of questions. It is leaning toward trust while still holding some doubts, and that is a normal, honest kind of belief, not a lesser one.` },
    ],
    scriptures: [
      { ref: `Hebrews 11:1`, text: `Now faith is confidence in what we hope for and assurance about what we do not see.` },
      { ref: `Mark 9:24`, text: `Immediately the boy's father exclaimed, "I do believe; help me overcome my unbelief!"` },
    ],
    faqs: [
      { q: `Is faith the same as blind belief?`, a: `No. Biblical faith is trust grounded in reasons and in God's character, not belief with your eyes shut.` },
      { q: `Can I have faith and still doubt?`, a: `Yes. Faith and doubt regularly coexist. Leaning toward trust while holding questions is a normal form of belief.` },
      { q: `How do I grow in faith?`, a: `The same way you grow any trust, by getting to know the person. Prayer, Scripture, and experience deepen it over time.` },
    ],
    related: ['how-can-i-believe-when-i-have-doubts', 'is-there-evidence-that-god-exists'],
  },

  {
    slug: 'how-do-i-forgive-someone-who-hurt-me',
    question: `How do I forgive someone who hurt me?`,
    category: 'Relationships',
    updated: '2026-07-06',
    answer: `Forgiveness is not saying what happened was okay, forgetting it, or forcing reconciliation. It is choosing to release the debt and hand the desire for revenge to God, for your own freedom as much as anything. It is usually a process, not a single moment, and it does not mean the wound was not real.`,
    body: [
      { h: `What forgiveness is not`, p: `It is not excusing, forgetting, or automatically restoring trust with someone unsafe. You can forgive and still set boundaries. Forgiveness releases the offense; it does not deny it.` },
      { h: `It is mostly for you`, p: `Holding onto revenge keeps you chained to the person who hurt you. Forgiveness hands that weight to God, "leave room for God's justice", and frees you to stop carrying it.` },
      { h: `A process, not a switch`, p: `Deep hurts rarely forgive in one moment. It is often a decision you make again and again, with God's help, until the grip loosens. That is normal, not failure.` },
    ],
    scriptures: [
      { ref: `Colossians 3:13`, text: `Bear with each other and forgive one another... Forgive as the Lord forgave you.` },
      { ref: `Ephesians 4:32`, text: `Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.` },
    ],
    faqs: [
      { q: `Does forgiving mean I have to reconcile?`, a: `No. Forgiveness releases the offense; reconciliation requires trust and safety, which are not always wise or possible.` },
      { q: `What if I don't feel like forgiving?`, a: `Forgiveness starts as a choice, not a feeling. The feelings often follow later, sometimes long after the decision.` },
      { q: `How does God's forgiveness relate to mine?`, a: `The Bible ties them together. We forgive because we have been forgiven so much ourselves. His grace fuels ours.` },
    ],
    related: ['will-god-forgive-me', 'what-is-grace'],
  },

  {
    slug: 'why-did-jesus-have-to-die',
    question: 'Why did Jesus have to die?',
    category: 'Jesus Christ',
    updated: '2026-07-09',
    answer:
      `Christianity's central claim is that the cross was not an accident but a rescue: Jesus willingly took on himself the weight of human wrong so that forgiveness could be real rather than pretended. Justice and mercy meet there: sin is taken seriously, and people are loved anyway. His death absorbs what we could not fix ourselves.`,
    body: [
      { h: `Forgiveness always costs someone something`, p: `When someone wrongs you deeply and you forgive them, you absorb the cost. The debt does not vanish, you carry it. The cross is that same logic at full scale: God does not wave sin away as if it never mattered. He absorbs it himself. That is why Christians call it grace rather than leniency.` },
      { h: `It was chosen, not suffered helplessly`, p: `The Gospels are insistent on this: Jesus was not cornered by events. He set his face toward Jerusalem knowing what waited there, and said plainly that no one takes his life from him. He lays it down. Whatever else the cross is, it is a decision made out of love, not a tragedy that got out of hand.` },
      { h: `The death is only half the claim`, p: `Christianity never presents the cross alone. It presents cross and resurrection together. The death deals with what is broken; the resurrection announces that death and failure do not get the last word. If you are weighing this, weigh both. One without the other is not the Christian message.` },
    ],
    scriptures: [
      { ref: `John 10:18`, text: `No one takes it from me, but I lay it down of my own accord. I have authority to lay it down and authority to take it up again.` },
      { ref: `Romans 5:8`, text: `But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.` },
      { ref: `1 Peter 2:24`, text: `He himself bore our sins in his body on the cross, so that we might die to sins and live for righteousness; by his wounds you have been healed.` },
    ],
    faqs: [
      { q: `Couldn't God just forgive without a death?`, a: `The Christian answer is that real forgiveness always absorbs a real cost. Pretending wrong never happened is not forgiveness, it is denial. The cross is God absorbing the cost himself rather than passing it on.` },
      { q: `Was Jesus's death a punishment from an angry God?`, a: `The New Testament frames it as God's own initiative and love, Father and Son acting together to rescue, not a reluctant victim appeasing a furious deity. "God so loved the world" is the stated motive.` },
      { q: `What does his death actually change for me?`, a: `Christianity claims it makes forgiveness available as a gift: your record does not have to be carried, hidden, or paid off. It was dealt with. Receiving that is what faith means.` },
    ],
    related: ['what-is-the-gospel', 'is-the-resurrection-of-jesus-real', 'what-is-grace'],
  },

  {
    slug: 'what-is-sin',
    question: 'What is sin, really?',
    category: 'Salvation',
    updated: '2026-07-09',
    answer:
      `Sin is not primarily rule-breaking. It is relationship-breaking. The Bible's word means "missing the mark": living turned away from God and, usually, at cost to other people and yourself. That is why the answer to sin is not trying harder but coming home. It is a fracture that gets healed, not a score that gets settled.`,
    body: [
      { h: `Less like a crime, more like a fracture`, p: `Modern ears hear "sin" as a list of banned behaviors. Scripture treats it as something deeper: a bent-away-ness from the God who made you, which then shows up in behaviors. Jesus was hardest not on obvious rule-breakers but on people whose hearts were far away while their conduct looked clean.` },
      { h: `Why the Bible refuses to grade on a curve`, p: `Romans says all have sinned, the saint and the scoundrel alike. That sounds harsh until you see what it does: it removes the ranking system entirely. Nobody gets to look down on anybody. The ground at the foot of the cross is level, which is bad news for pride and very good news for everyone else.` },
      { h: `The diagnosis exists for the sake of the cure`, p: `Christianity talks about sin the way a doctor talks about a tumor. Not to shame you, but because naming it is the first step to healing it. Any version of faith that uses sin to crush people has lost the plot. The point of the diagnosis is that a cure exists, and it is offered freely.` },
    ],
    scriptures: [
      { ref: `Romans 3:23–24`, text: `For all have sinned and fall short of the glory of God, and all are justified freely by his grace through the redemption that came by Christ Jesus.` },
      { ref: `Isaiah 53:6`, text: `We all, like sheep, have gone astray, each of us has turned to our own way; and the Lord has laid on him the iniquity of us all.` },
      { ref: `1 John 1:9`, text: `If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.` },
    ],
    faqs: [
      { q: `Are some sins worse than others?`, a: `Scripture does distinguish consequences, some wrongs wound more deeply, but it refuses a ranking system that lets anyone claim superiority. All of it separates; all of it is forgivable.` },
      { q: `Is being tempted the same as sinning?`, a: `No. Jesus himself was tempted and did not sin. Temptation is the pull; sin is the yielding. Feeling the pull is human, not guilt.` },
      { q: `What do I do about my sin?`, a: `Bring it into the light rather than managing it in the dark. Confession, honest naming before God, is met with forgiveness, not humiliation. That is the consistent promise.` },
    ],
    related: ['what-is-repentance', 'will-god-forgive-me', 'why-do-i-need-jesus-if-im-a-good-person'],
  },

  {
    slug: 'what-is-repentance',
    question: 'What does it mean to repent?',
    category: 'Salvation',
    updated: '2026-07-09',
    answer:
      `Repentance is a change of direction, not a session of self-hatred. The biblical word means to turn, to stop walking away from God and start walking toward him. It involves honestly naming what is wrong, but its energy is hope, not shame: you turn because someone is waiting for you, gladly.`,
    body: [
      { h: `The word means "turn around"`, p: `In both Hebrew and Greek, repentance is movement language, a turning, a homecoming. It is less "feel terrible about yourself" and more "you are headed the wrong way; come back." The feeling that matters is not self-loathing but the dawning sense that home is better than where you were going.` },
      { h: `The father runs, that is the tone of it`, p: `Jesus told a story about a son who blew his inheritance and rehearsed a groveling apology on the road home. He never got to finish it. The father saw him far off and ran. That story is Jesus's own picture of what repentance meets: not a lecture, not probation, a running father and a feast.` },
      { h: `It is a practice, not a one-time event`, p: `Turning happens at the start of faith and then keeps happening, small course corrections for the rest of your life. Christians repent regularly not because grace runs out but because turning back quickly beats drifting far. It gets less dramatic and more natural, like steering.` },
    ],
    scriptures: [
      { ref: `Luke 15:20`, text: `But while he was still a long way off, his father saw him and was filled with compassion for him; he ran to his son, threw his arms around him and kissed him.` },
      { ref: `Acts 3:19`, text: `Repent, then, and turn to God, so that your sins may be wiped out, that times of refreshing may come from the Lord.` },
      { ref: `2 Corinthians 7:10`, text: `Godly sorrow brings repentance that leads to salvation and leaves no regret, but worldly sorrow brings death.` },
    ],
    faqs: [
      { q: `Is repentance just feeling guilty?`, a: `No. Guilt can even be a counterfeit of it. Scripture distinguishes godly sorrow, which turns and moves toward God, from worldly sorrow, which just spirals. Repentance is the turning, not the wallowing.` },
      { q: `Do I have to fix myself before coming to God?`, a: `The order is the opposite: you come as you are, and the turning and mending happen in relationship with him. The father ran before the apology was finished.` },
      { q: `What if I keep failing at the same thing?`, a: `Then you keep turning back. Jesus told Peter to forgive seventy-seven times, a picture of God's own patience. Repeated struggle met with repeated return is a normal Christian life, not a failed one.` },
    ],
    related: ['what-is-sin', 'am-i-too-far-gone-for-god', 'how-do-i-become-a-christian'],
  },

  {
    slug: 'what-does-the-bible-say-about-grief',
    question: 'What does the Bible say about grief and losing someone?',
    category: 'Mental Health',
    updated: '2026-07-09',
    answer:
      `The Bible treats grief as love with nowhere to go: real, heavy, and nothing to apologize for. Jesus himself wept at a friend's grave even knowing what came next. Scripture offers no timetable and no shame, but it does offer two things: a God described as near to the brokenhearted, and a hope that death does not get the final word.`,
    body: [
      { h: `Jesus wept, that is not a small detail`, p: `At the tomb of Lazarus, standing minutes from raising him, Jesus cried. Grief is not a failure of faith; the founder of the faith grieved. Whatever anyone has told you about needing to be strong or "having enough faith," the shortest verse in the Bible quietly says otherwise.` },
      { h: `The Psalms give you words when you have none`, p: `Nearly a third of the Psalms are laments — raw, unedited grief addressed straight to God. "How long, Lord?" is scripture. You are allowed to bring God the anger, the numbness, and the questions. The Bible does not ask you to perform okay-ness; it hands you a vocabulary for not being okay.` },
      { h: `Grieving with hope is still grieving`, p: `Paul told grieving believers they do not mourn "as those who have no hope", but notice he assumed they would mourn. Christian hope does not skip the valley; it walks through it believing reunion and resurrection are real. The sorrow and the hope sit side by side, and both are honest.` },
    ],
    scriptures: [
      { ref: `John 11:35`, text: `Jesus wept.` },
      { ref: `Psalm 34:18`, text: `The Lord is close to the brokenhearted and saves those who are crushed in spirit.` },
      { ref: `1 Thessalonians 4:13`, text: `Brothers and sisters, we do not want you to be uninformed about those who sleep in death, so that you do not grieve like the rest of mankind, who have no hope.` },
      { ref: `Revelation 21:4`, text: `He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain, for the old order of things has passed away.` },
    ],
    faqs: [
      { q: `Is it wrong to be angry at God after a loss?`, a: `No. The Psalms model exactly that, grief and protest brought directly to God rather than hidden from him. He is described as receiving it, not punishing it.` },
      { q: `How long is grief supposed to last?`, a: `Scripture gives no deadline. People in the Bible mourned for extended seasons, and no one is rebuked for grieving too long. Grief has its own pace; God stays for all of it.` },
      { q: `Will I see the person I lost again?`, a: `Christian hope says yes for those in Christ. Resurrection and reunion are core promises, not poetic flourishes. That hope does not erase the ache now, but it changes what the ache means.` },
    ],
    related: ['what-happens-when-you-die', 'what-does-the-bible-say-about-depression', 'why-does-god-allow-suffering'],
  },

  {
    slug: 'what-does-the-bible-say-about-addiction',
    question: 'What does the Bible say about addiction?',
    category: 'Mental Health',
    updated: '2026-07-09',
    answer:
      `The Bible does not use the word addiction, but it knows the experience intimately: doing the thing you hate, being mastered by what promised freedom. It responds without disgust: offering grace instead of shame, community instead of isolation, and a God who is patient with relapse. Faith and practical help, like recovery programs and counseling, belong together.`,
    body: [
      { h: `Paul described the trap exactly`, p: `"I do not do the good I want to do, but the evil I do not want to do. This I keep on doing." That is Romans 7, and anyone in addiction recognizes it instantly. The Bible is not naive about compulsion. It describes the divided will with more honesty than most modern writing, and without a trace of contempt.` },
      { h: `Shame is the fuel; grace cuts the fuel line`, p: `Addiction thrives in secrecy and self-hatred. You use to numb the shame of using. Grace attacks that engine directly: you are loved as-is, before you are fixed. That is why confession to safe people and to God is so central to recovery. What comes into the light loses its leverage in the dark.` },
      { h: `God works through means. Use all of them`, p: `Seeking help is not a lack of faith. Recovery programs, counselors, medication, sponsors, honest community, Christians see these as instruments of grace, not alternatives to it. Twelve-step programs themselves grew from Christian soil: admitting powerlessness and turning to a higher power is an old, old road.` },
    ],
    scriptures: [
      { ref: `Romans 7:15, 24–25`, text: `I do not understand what I do. For what I want to do I do not do, but what I hate I do… What a wretched man I am! Who will rescue me from this body that is subject to death? Thanks be to God, who delivers me through Jesus Christ our Lord!` },
      { ref: `1 Corinthians 6:12`, text: `"I have the right to do anything," you say, but not everything is beneficial. "I have the right to do anything", but I will not be mastered by anything.` },
      { ref: `2 Corinthians 12:9`, text: `My grace is sufficient for you, for my power is made perfect in weakness.` },
    ],
    faqs: [
      { q: `Is addiction a sin or a disease?`, a: `It is rarely useful to force that choice. It involves the body, the brain, wounds, and the will all at once. The Bible's category is bondage, and its posture is rescue and compassion, not blame-sorting.` },
      { q: `Does relapse mean God has given up on me?`, a: `No. Scripture's picture is a father who keeps receiving a returning child. Recovery for most people includes falls; each return to the light counts, and none of them exhausts grace.` },
      { q: `Should I get professional help or just pray?`, a: `Both. Prayer and practical means are allies, not rivals. Seeing a counselor or joining a recovery group is often exactly how the prayer gets answered.` },
    ],
    related: ['am-i-too-far-gone-for-god', 'what-is-grace', 'what-does-the-bible-say-about-depression'],
  },

  {
    slug: 'how-does-god-speak-to-us-today',
    question: 'How does God speak to us today?',
    category: 'Prayer',
    updated: '2026-07-09',
    answer:
      `Christians believe God still speaks. Most reliably through the Bible, and also through prayer, wise counsel, circumstances, and the quiet internal nudge many describe as the Holy Spirit. It is rarely an audible voice. The consistent testimony is that his voice today never contradicts what he has already said in scripture.`,
    body: [
      { h: `The Bible is the baseline, not the backup`, p: `If you want to hear God and have never really read the Gospels, start there, that is the one channel Christians across every century agree on. Scripture is described as living and active, and most people who say "God spoke to me" mean a passage suddenly read them as much as they read it.` },
      { h: `The whisper, not the earthquake`, p: `Elijah expected God in wind, earthquake, and fire, and got a low whisper. That story sets the pattern. Most believers describe guidance as quiet: a persistent impression, an unshakeable peace or lack of it, a thought that arrives with unusual weight during prayer. Subtle is normal. Spectacular is rare.` },
      { h: `Test it. You are told to`, p: `Scripture itself says test everything. A genuine nudge from God will not contradict the Bible, will tend toward love and truth rather than ego, and usually survives the scrutiny of wise, mature people you trust. If a "word from God" flatters your worst instincts or isolates you from everyone, be suspicious.` },
    ],
    scriptures: [
      { ref: `1 Kings 19:11–12`, text: `After the earthquake came a fire, but the Lord was not in the fire. And after the fire came a gentle whisper.` },
      { ref: `Hebrews 4:12`, text: `For the word of God is alive and active. Sharper than any double-edged sword… it judges the thoughts and attitudes of the heart.` },
      { ref: `John 10:27`, text: `My sheep listen to my voice; I know them, and they follow me.` },
    ],
    faqs: [
      { q: `Why doesn't God just speak audibly?`, a: `He can, and scripture records it, rarely. The normal pattern, even in the Bible, is quieter: word, whisper, wisdom, community. Many believers suspect the quietness is invitation: it draws you close rather than compelling you from a distance.` },
      { q: `How do I know it's God and not just my own thoughts?`, a: `Test it against scripture, time, and trusted counsel. God's voice tends to sound like Jesus: truthful, loving, sometimes uncomfortable but never degrading. If it contradicts the Bible, it is not him.` },
      { q: `What if I hear nothing at all?`, a: `Silence is a common season, not a verdict. Keep showing up: reading, praying honestly, staying in community. Many of the most trusted voices in Christian history walked long quiet stretches.` },
    ],
    related: ['how-do-i-start-praying', 'does-god-answer-prayer', 'how-do-i-know-gods-will-for-my-life'],
  },

  {
    slug: 'what-is-heaven-like',
    question: 'What is heaven actually like?',
    category: 'Eternal Life',
    updated: '2026-07-09',
    answer:
      `The Bible's picture of heaven is more physical and more interesting than clouds and harps: a renewed creation, "a new heaven and a new earth", with resurrection bodies, a city, a feast, reunion, and God himself present, wiping away every tear. Less an escape from the world than the world finally made right.`,
    body: [
      { h: `Not clouds, a renewed earth`, p: `The Bible's final chapters do not show souls floating away; they show heaven coming down. Revelation ends with a city descending, God moving in with people, and creation healed. Christian hope is not evacuation from reality but resurrection of it, which is why the promise includes bodies, not just spirits.` },
      { h: `The best analogies are a feast and a homecoming`, p: `Jesus's favorite image for what is coming was a banquet: tables, wine, laughter, invited guests. Add reunion ("we will be with the Lord and with one another") and the picture is less like a formal ceremony and more like the best wedding reception you have ever attended, with no closing time.` },
      { h: `What is absent matters as much as what is present`, p: `No more death, mourning, crying, or pain, the old order gone. Everything that has ever made you say "this is not how it should be" is on the demolition list. And the center of it all is not the scenery but the presence: "God himself will be with them." That presence is what makes it heaven.` },
    ],
    scriptures: [
      { ref: `Revelation 21:1–4`, text: `Then I saw a new heaven and a new earth… God's dwelling place is now among the people, and he will dwell with them… He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain.` },
      { ref: `1 Corinthians 2:9`, text: `What no eye has seen, what no ear has heard, and what no human mind has conceived. The things God has prepared for those who love him.` },
      { ref: `John 14:2–3`, text: `My Father's house has many rooms… I am going there to prepare a place for you… that you also may be where I am.` },
    ],
    faqs: [
      { q: `Will we recognize people we love in heaven?`, a: `The strong implication of scripture is yes: resurrection accounts show a recognizable Jesus, and Paul comforts the grieving with the promise of being together. Reunion is part of the hope, not a folk addition to it.` },
      { q: `Will heaven be boring?`, a: `Only if feasts, exploration, meaningful work, and unbroken relationships bore you. The biblical picture is a renewed creation with things to do: eternal life is described as knowing God, which is a depth to explore, not a waiting room.` },
      { q: `Who gets in?`, a: `Entry is by grace received, not points earned, that is the consistent New Testament claim. It is a gift accepted through trust in Jesus, open to anyone, which is why deathbed thieves and lifelong saints arrive on the same basis.` },
    ],
    related: ['what-happens-when-you-die', 'is-hell-real', 'what-is-the-gospel'],
  },

  {
    slug: 'do-christians-take-the-bible-literally',
    question: 'Do Christians have to take the Bible literally?',
    category: 'Bible',
    updated: '2026-07-09',
    answer:
      `Thoughtful Christians take the Bible seriously, which means reading each part as the kind of writing it is: history as history, poetry as poetry, parable as parable, letters as letters. Nobody thinks God is literally a rock or a hen. The honest question for any passage is not "literal or not?" but "what is this text actually claiming?"`,
    body: [
      { h: `The Bible is a library, not a single book`, p: `Sixty-six documents, written across roughly 1,500 years, in multiple languages and genres: law, chronicle, poetry, prophecy, biography, letters, apocalyptic vision. Reading Psalms the way you read Acts is like reading a love poem the way you read a lab report. Taking scripture seriously starts with respecting what kind of writing you are holding.` },
      { h: `Jesus himself spoke in figures, constantly`, p: `He called himself a door, a vine, bread, and a shepherd, and taught almost entirely in parables. His original hearers did not think he was made of wood. The Bible's own characters model reading with judgment: attentive to metaphor, alert to hyperbole, and dead serious about the truth those figures carry.` },
      { h: `Where it matters most, the claims are meant as fact`, p: `This is not a dodge that dissolves everything into metaphor. The writers plant flags on certain claims as sober history, above all the crucifixion and resurrection, which Paul says were witnessed by hundreds. Christianity stakes itself on those being real events. The genre-reading cuts both ways: poetry is poetry, and testimony is testimony.` },
    ],
    scriptures: [
      { ref: `Psalm 91:4`, text: `He will cover you with his feathers, and under his wings you will find refuge.` },
      { ref: `John 10:9`, text: `I am the gate; whoever enters through me will be saved.` },
      { ref: `1 Corinthians 15:14`, text: `And if Christ has not been raised, our preaching is useless and so is your faith.` },
    ],
    faqs: [
      { q: `Isn't picking genres just picking what's convenient?`, a: `No. Genre is a property of the text, not a preference of the reader. Hebrew poetry has recognizable structure; parables are introduced as parables; letters name their senders. Scholars across the spectrum, including skeptical ones, read this way.` },
      { q: `What about the parts that seem to conflict with science?`, a: `Many Christians hold that Genesis answers who and why, not the mechanics of how, ancient cosmology framing theological claims. Christians land in different places here while sharing the same core faith, and the debate is far older than Darwin.` },
      { q: `Can I trust a book I don't fully understand?`, a: `You already trust people you don't fully understand. Start with the Gospels, take them on their own terms, and let the difficult parts wait. Understanding grows by reading, not before it.` },
    ],
    related: ['can-i-trust-the-bible', 'how-do-i-read-the-bible-as-a-beginner'],
  },

  {
    slug: 'what-is-baptism',
    question: 'What is baptism and do I need it?',
    category: 'Church',
    updated: '2026-07-09',
    answer:
      `Baptism is the ancient, physical way Christians go public with faith, going under water as a picture of an old life buried, coming up as a picture of new life begun. Jesus was baptized and told his followers to be. It does not earn salvation, which is by grace, but it marks and celebrates it, like a wedding ring on a marriage.`,
    body: [
      { h: `A funeral and a birth in one motion`, p: `Paul says in baptism you are "buried with Christ and raised with him." Going under the water enacts the death of the old you; rising enacts resurrection. It is theology you can feel, which is precisely why Jesus gave his followers something physical to do, not just something mental to believe.` },
      { h: `It is the going-public moment`, p: `In the early church, baptism was how you crossed the line visibly, the point where private belief became public identity, witnessed by a community that now walked with you. That is still its power. Faith can begin invisibly in a heart, but people are embodied, and commitments become real to us when they are enacted in front of others.` },
      { h: `The thief on the cross settles the "requirement" anxiety`, p: `A criminal dying next to Jesus believed and was promised paradise that day. No baptism possible. Salvation is by grace through faith, full stop. So baptism is not a toll gate; it is obedience and celebration. If you believe, the New Testament's assumption is simply: why wait?` },
    ],
    scriptures: [
      { ref: `Romans 6:4`, text: `We were therefore buried with him through baptism into death in order that, just as Christ was raised from the dead through the glory of the Father, we too may live a new life.` },
      { ref: `Matthew 28:19`, text: `Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.` },
      { ref: `Acts 2:38`, text: `Repent and be baptized, every one of you, in the name of Jesus Christ for the forgiveness of your sins.` },
    ],
    faqs: [
      { q: `Do I have to be baptized to be saved?`, a: `Salvation is by grace through faith. The thief on the cross was saved without baptism. But baptism is Jesus's clear instruction for believers, so the better question than "must I?" is "why wouldn't I?"` },
      { q: `I was baptized as a baby. Does that count?`, a: `Christian traditions differ sincerely here. Some honor infant baptism as God's grace preceding your awareness; others practice believer's baptism as a personal public step. Talk with a pastor you trust; this is a family discussion, not a salvation issue.` },
      { q: `How do I actually get baptized?`, a: `Ask at a local church. Any pastor will be glad you did. There is usually a short conversation about your faith first, then it happens in a service, a pool, a lake, or wherever there is water and witnesses.` },
    ],
    related: ['how-do-i-become-a-christian', 'what-does-it-mean-to-be-born-again', 'why-should-i-go-to-church'],
  },

  {
    slug: 'what-does-the-bible-say-about-divorce',
    question: 'What does the Bible say about divorce?',
    category: 'Relationships',
    updated: '2026-07-09',
    answer:
      `The Bible treats marriage as sacred and divorce as a tearing God never wanted for anyone: while explicitly acknowledging real grounds like unfaithfulness and abandonment, and never treating divorced people as second-class. If you are divorced or facing it: God's grace is not reduced for you, and safety from abuse is never unfaithfulness.`,
    body: [
      { h: `What Jesus actually said, and why`, p: `Asked about divorce, Jesus pointed back to the beginning, two becoming one flesh, and called divorce a concession to hardened hearts, not the design. His seriousness was protective: in his world, discarded wives were left destitute. He named unfaithfulness as grounds; Paul later added abandonment. The Bible is realistic that some marriages die.` },
      { h: `Divorce is not the unforgivable sin`, p: `Somewhere along the way, church culture treated divorce as a permanent stain, which scripture never does. God himself is described in Jeremiah as having divorced unfaithful Israel. The metaphor would be impossible if divorce made someone untouchable. Divorced people served, led, and belonged in the early church, and they belong now.` },
      { h: `If you are in danger, leaving is not the sin`, p: `Nothing in the Bible obligates anyone to remain under abuse. The same God called a refuge for the oppressed does not chain the oppressed to their oppressor. Getting safe, for you and your children, is wisdom, and churches that say otherwise are misusing the text. Grace covers this ground fully.` },
    ],
    scriptures: [
      { ref: `Matthew 19:8`, text: `Jesus replied, "Moses permitted you to divorce your wives because your hearts were hard. But it was not this way from the beginning."` },
      { ref: `Malachi 2:16`, text: `"The man who hates and divorces his wife," says the Lord, the God of Israel, "does violence to the one he should protect."` },
      { ref: `Psalm 34:18`, text: `The Lord is close to the brokenhearted and saves those who are crushed in spirit.` },
    ],
    faqs: [
      { q: `Can a divorced person remarry?`, a: `Christian traditions read the texts differently, but many hold remarriage is permitted where there were biblical grounds, and all agree grace meets people in their actual histories. Talk it through with a pastor who knows your story, not just the verses.` },
      { q: `Is divorce ever the right choice?`, a: `Scripture names unfaithfulness and abandonment as grounds, and protection from abuse is a moral necessity. Divorce is always a grief, but sometimes it is the least-bad faithful option in a broken situation.` },
      { q: `Does God still love me after my divorce?`, a: `Completely and undiminished. Divorce is a wound, not a disqualification. God is described as especially near the brokenhearted, which includes the divorced, not everyone except them.` },
    ],
    related: ['how-do-i-forgive-someone-who-hurt-me', 'does-god-love-me', 'will-god-forgive-me'],
  },

  {
    slug: 'what-does-the-bible-say-about-self-worth',
    question: 'What does the Bible say about self-worth?',
    category: 'Purpose',
    updated: '2026-07-09',
    answer:
      `The Bible grounds your worth in something no failure, follower count, or opinion can touch: you are made in the image of God, known before birth, and valued enough that Christ died for you. Your worth is conferred, not earned, which means it also cannot be un-earned. That is a foundation, not a mood.`,
    body: [
      { h: `Worth by design, not by performance`, p: `The Bible's first claim about you is Genesis 1: made in the image of God. Not "valuable once successful" or "worthy if attractive": imaged, from the start, like every human you will ever meet. Every other measure of worth fluctuates. This one was settled before you did anything at all.` },
      { h: `The price tag argument`, p: `In any market, worth is what someone will pay. The Christian claim is staggering on exactly this point: God judged you worth the cross. "While we were still sinners", not after cleanup, not at your best, Christ died for us. Whatever your inner critic says, it is now arguing with the price God actually paid.` },
      { h: `Known completely, loved anyway`, p: `Psalm 139 says you were seen and known before birth, every day written down, nothing hidden. Most of us fear that full exposure would end love. The gospel says the opposite happened: the one who knows the very worst of you is the one who moved toward you. That is the only self-worth that can survive being fully known.` },
    ],
    scriptures: [
      { ref: `Genesis 1:27`, text: `So God created mankind in his own image, in the image of God he created them; male and female he created them.` },
      { ref: `Psalm 139:13–14`, text: `For you created my inmost being; you knit me together in my mother's womb. I praise you because I am fearfully and wonderfully made.` },
      { ref: `Romans 5:8`, text: `But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.` },
    ],
    faqs: [
      { q: `Isn't self-worth just pride?`, a: `No. Pride is inflating yourself above others; biblical worth is receiving a value God assigned to everyone. Humility is not thinking you are worthless; it is being free enough of the worth question to love people.` },
      { q: `I feel worthless, what do I actually do?`, a: `Feelings lag facts. Read Psalm 139 slowly, tell God honestly how you feel, and let trusted people speak truth to you, and if the darkness is heavy or constant, see a counselor too. God works through help.` },
      { q: `Does God value some people more than others?`, a: `No. The image of God is universal, and the New Testament goes out of its way to flatten every hierarchy: Jew and Greek, slave and free. Nobody outranks you in the economy of grace.` },
    ],
    related: ['does-god-love-me', 'what-is-the-meaning-of-life', 'what-does-the-bible-say-about-depression'],
  },

  {
    slug: 'what-does-the-bible-say-about-rest',
    question: 'What does the Bible say about rest and burnout?',
    category: 'Mental Health',
    updated: '2026-07-09',
    answer:
      `Rest is not a reward for finishing. It is a rhythm God built into creation and modeled himself. The Bible commands a day off (Sabbath), shows Jesus napping in boats and withdrawing from crowds, and diagnoses hurry as a spiritual problem, not a virtue. "Come to me, all you who are weary" is a standing invitation.`,
    body: [
      { h: `Rest is in the design, not the fine print`, p: `God rests on the seventh day of creation. Not from exhaustion, but to establish a rhythm. Sabbath later becomes one of the Ten Commandments, sitting alongside "do not murder." Scripture takes rest that seriously. A culture that treats exhaustion as a status symbol is arguing with the design specs of being human.` },
      { h: `Jesus was never in a hurry`, p: `Read the Gospels for pace: Jesus sleeps through a storm, withdraws to lonely places while crowds are still asking for him, and walks everywhere. Carrying the most important mission in history, he was unhurried. If he could leave needs unmet to pray and rest, your inbox can survive a Sabbath too.` },
      { h: `Burnout is often a theology problem`, p: `Underneath chronic overwork is usually a belief: it all depends on me. Sabbath is a weekly protest against that lie. You stop, and the world keeps turning, because God runs it and you do not. Psalm 127 is blunt: it is vain to rise early and stay up late, "for he grants sleep to those he loves."` },
    ],
    scriptures: [
      { ref: `Matthew 11:28–29`, text: `Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me… and you will find rest for your souls.` },
      { ref: `Psalm 127:2`, text: `In vain you rise early and stay up late, toiling for food to eat, for he grants sleep to those he loves.` },
      { ref: `Mark 6:31`, text: `Then, because so many people were coming and going that they did not even have a chance to eat, he said to them, "Come with me by yourselves to a quiet place and get some rest."` },
    ],
    faqs: [
      { q: `Is taking a day off really a spiritual practice?`, a: `Yes. Sabbath is one of the Ten Commandments and one Jesus practiced. Stopping is an act of trust: it declares the world is God's responsibility, not yours alone.` },
      { q: `What does Sabbath look like today?`, a: `Not legalism. Jesus said Sabbath was made for man, not man for Sabbath. Pick a regular stretch to stop working, do what restores you, and enjoy God and people. Rhythm matters more than rules.` },
      { q: `What if I literally can't rest: kids, two jobs, caregiving?`, a: `Scripture's God sees that and is not grading you against someone else's calendar. Start with rest in slivers, minutes of prayer, real sleep where possible, and let others help. The invitation "come to me" fits inside any life.` },
    ],
    related: ['what-does-the-bible-say-about-anxiety', 'what-is-the-meaning-of-life'],
  },

  {
    slug: 'how-do-i-find-a-church',
    question: 'How do I find a church as a beginner?',
    category: 'Church',
    updated: '2026-07-09',
    answer:
      `Look for three things: the Bible taught honestly, people who are warm before they know what you can offer, and grace at the center rather than performance. Visit a few: churches differ widely in style, and style is preference, not doctrine. You can just walk in on a Sunday. Nobody expects you to know anything.`,
    body: [
      { h: `What actually matters (and what doesn't)`, p: `Music volume, building size, and dress code are taste. What matters: Is scripture taught seriously and honestly? Is grace the message, or is it pressure and performance? Do people seem genuinely glad you exist? A small church with warm people beats an impressive one where you stay anonymous, unless anonymity is what you need at first, which is also okay.` },
      { h: `Your first visit, demystified`, p: `You can arrive a few minutes early, sit near the back, and just watch. Singing is optional. Nobody will make you speak, and the offering plate is for regulars, not guests. If anyone asks, "it's my first time" is a complete sentence, and usually gets you a warm welcome. Give a church two or three visits before deciding; one odd Sunday happens everywhere.` },
      { h: `Why bother with church at all`, p: `Because faith was never designed to be practiced alone. The New Testament's word for church means assembly. It is a body, and bodies have parts that need each other. Community is where encouragement, honest questions, prayer when life breaks, and casseroles when it really breaks, actually happen. Online content can teach you; it cannot know you.` },
    ],
    scriptures: [
      { ref: `Hebrews 10:24–25`, text: `And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together, as some are in the habit of doing, but encouraging one another.` },
      { ref: `Acts 2:42`, text: `They devoted themselves to the apostles' teaching and to fellowship, to the breaking of bread and to prayer.` },
    ],
    faqs: [
      { q: `What denomination should I choose?`, a: `As a beginner, don't stress the labels. Find a church that teaches the Bible, centers on Jesus, and treats people with grace. The denominational nuances will make more sense later, and matter less than you think at the start.` },
      { q: `What if I've been hurt by church before?`, a: `That wound is real, and God is not the people who hurt you. Take it slow, maybe start with one trusted person or a small group rather than a big service. A healthy church will give you room to heal, not pressure to perform.` },
      { q: `Do I need to believe before I attend?`, a: `Not at all. Churches are full of people mid-question, and any good one welcomes honest seekers. Attending is exploring, not signing anything.` },
    ],
    related: ['why-should-i-go-to-church', 'how-do-i-become-a-christian', 'what-is-baptism'],
  },

  {
    slug: 'what-is-the-book-of-enoch',
    question: `What is the Book of Enoch, and why isn't it in the Bible?`,
    category: 'Bible',
    updated: '2026-07-18',
    answer:
      `1 Enoch is a real ancient Jewish text, visions of angels, judgment, and a coming "Son of Man", written centuries before Jesus. It was never hidden or banned: most Jewish and Christian traditions weighed it and did not include it in Scripture, though the Ethiopian Orthodox Church still does. Jude even quotes it.`,
    body: [
      { h: `What the book actually is`, p: `1 Enoch is a collection of Jewish writings from roughly the third century BC onward, attributed to the Enoch of Genesis 5 who "walked with God." Its most famous sections describe angels ("Watchers") who abandoned heaven, the giants that followed, cosmic journeys, and a glorious "Son of Man" who judges the earth. It was widely read in the centuries around Jesus. Fragments were found among the Dead Sea Scrolls.` },
      { h: `It was weighed, not hidden`, p: `The internet loves the idea of "books the church banned," but the history is less cinematic. Ancient communities knew Enoch well and most concluded it was valuable but not Scripture. It never appears in the Hebrew Bible's canon lists, and the early church largely reached the same judgment. The Ethiopian Orthodox Tewahedo Church is the notable exception: its canon includes 1 Enoch to this day. Different shelf, not a locked vault.` },
      { h: `Why it still matters for readers of the 66 books`, p: `Jude 1:14–15 quotes 1 Enoch directly, and the New Testament's world, its language about angels, judgment, and the Son of Man, is easier to understand when you know what people were reading at the time. You can take Enoch seriously as history without treating it as doctrine. That is exactly how kinwove's AI companion handles it: it can quote the real text, clearly labeled as outside the 66-book canon.` },
    ],
    scriptures: [
      { ref: `Jude 1:14–15`, text: `Enoch, the seventh from Adam, prophesied about them: "See, the Lord is coming with thousands upon thousands of his holy ones to judge everyone."` },
      { ref: `Genesis 5:24`, text: `Enoch walked faithfully with God; then he was no more, because God took him away.` },
    ],
    faqs: [
      { q: `Was the Book of Enoch removed from the Bible?`, a: `No. It was never in the canon most traditions use, so there was nothing to remove. It circulated widely, was weighed by Jewish and Christian communities, and was not included, though the Ethiopian Orthodox Church does count it as Scripture.` },
      { q: `Is it wrong to read the Book of Enoch?`, a: `No. Many pastors and scholars read it for historical background. The key is reading it as an ancient witness to what people believed, not as a basis for doctrine, the same way you might read other writings from the period.` },
      { q: `Why does Jude quote it if it isn't Scripture?`, a: `Quoting a text approvingly doesn't make the whole text Scripture, Paul quotes pagan poets in Acts 17. Jude cites a line his readers knew to make a true point about judgment.` },
    ],
    related: ['can-i-trust-the-bible', 'do-christians-take-the-bible-literally', 'how-do-i-read-the-bible-as-a-beginner'],
  },
  // ── Added 2026-09-26 from real questions asked by logged-out visitors ───────
  // Every one of these came out of qa_events — someone typed it into the box
  // with no account. Demand is measured, not guessed. Judas and "was the Bible
  // rewritten" were each asked by two different people.
  {
    slug: 'did-judas-go-to-heaven',
    question: 'Did Judas go to heaven?',
    category: 'Eternal Life',
    updated: '2026-09-26',
    answer: 'The Bible never says. Jesus calls Judas "the son of destruction" (John 17:12) and Acts says he "went where he belongs" (Acts 1:25), which sounds final, but Scripture stops short of a verdict, and Christians have disagreed for two thousand years. The honest answer is that we are not told.',
    body: [
      {
        h: 'What the text actually says',
        p: 'Matthew says Judas was "seized with remorse," returned the thirty pieces of silver, said "I have sinned, for I have betrayed innocent blood," and hanged himself (Matthew 27:3–5). Jesus had earlier said of him that it would be better for that man if he had not been born (Matthew 26:24). Acts 1:25 says he left his apostolic ministry "to go where he belongs." Those are heavy words. But none of them is a sentence pronounced on his soul, and the Bible, which is not shy about judgment elsewhere, does not give one here.',
      },
      {
        h: 'The word behind "remorse" is worth knowing',
        p: 'Matthew 27:3 uses metamelomai, a word meaning regret or being sorry afterward. The New Testament\'s usual word for repentance is metanoia, which means a change of mind that turns you around. Some readers make a great deal of that difference: Judas felt the weight of what he had done, but grief is not the same as turning back. Others point out that the two words overlap in Greek and that building a doctrine of someone\'s eternity on one verb is more than the text can carry. Both cautions are fair.',
      },
      {
        h: 'Peter is the comparison the Gospels invite',
        p: 'On the same night, Peter denied knowing Jesus three times, publicly, with curses (Matthew 26:69–75). He also wept bitterly. The difference in the story is not the size of the failure but what each man did next: one went back to the others and was restored by Jesus on a beach (John 21:15–19), the other went off alone. That is the contrast the Gospels draw, and it is about despair versus return, not about a sin too big to forgive.',
      },
      {
        h: 'Why the answer stays open',
        p: 'Christians have landed in different places. Many read John 17:12 and Acts 1:25 as settling it. Others note that Jesus said he lost none the Father gave him "except" Judas, and that the same Jesus prayed forgiveness over the people killing him. The reason this page will not hand you a verdict is that Scripture does not, and pretending otherwise would be inventing an answer to make the question stop. What the Bible is unambiguous about is the door: "whoever comes to me I will never drive away" (John 6:37).',
      },
    ],
    scriptures: [
      { ref: 'Matthew 27:3–5', text: 'When Judas, who had betrayed him, saw that Jesus was condemned, he was seized with remorse and returned the thirty pieces of silver.' },
      { ref: 'John 17:12', text: 'None has been lost except the one doomed to destruction so that Scripture would be fulfilled.' },
      { ref: 'Acts 1:25', text: 'To take over this apostolic ministry, which Judas left to go where he belongs.' },
      { ref: 'John 6:37', text: 'Whoever comes to me I will never drive away.' },
    ],
    faqs: [
      { q: 'Does the Bible say Judas went to hell?', a: 'It does not say so directly. John 17:12 calls him "the one doomed to destruction" and Acts 1:25 says he went "where he belongs," and many Christians read those as a verdict. But neither line is a statement about his eternal destiny in the way the question expects, and the New Testament never says plainly where Judas is.' },
      { q: 'Could Judas have been forgiven if he had asked?', a: 'On the Bible\'s own terms, yes. Peter denied Jesus and was restored days later. Paul described himself as the worst of sinners and was forgiven. Nothing in Scripture describes betrayal as the one sin placed beyond reach, what it describes is Judas not coming back.' },
      { q: 'Did Judas have a choice, if the betrayal was prophesied?', a: 'This is one of the oldest arguments in Christian thought, and it is not settled. Scripture holds both that the betrayal fulfilled prophecy and that Judas is held responsible for it, without explaining how both are true. Anyone who tells you the tension resolves neatly is adding to the text.' },
      { q: 'Why does it matter what happened to Judas?', a: 'Usually because of the question underneath it: is there a point past which someone has gone too far? The Bible\'s answer to that one is much clearer than its answer about Judas. The invitation stays open to anyone who comes.' },
    ],
    related: ['will-god-forgive-me', 'am-i-too-far-gone-for-god', 'is-hell-real'],
  },
  {
    slug: 'has-the-bible-been-changed',
    question: 'Has the Bible been changed or rewritten over the centuries?',
    category: 'Bible',
    updated: '2026-09-26',
    answer: 'Not in the way the question usually imagines. We do not have one late copy at the end of a chain. We have thousands of early ones from scattered places, and they can be compared against each other. Most differences are spelling and word order. The handful that matter are printed in your Bible, in the footnotes.',
    body: [
      {
        h: 'Why the "telephone game" picture does not fit',
        p: 'Telephone works because each person hears only the previous whisper. Manuscripts do not work that way. Copies spread outward across Egypt, Syria, Greece, Italy and North Africa, in different languages, under communities that disagreed with each other, and we have those copies. There are roughly 5,800 Greek manuscripts of the New Testament, plus thousands in Latin, Syriac and Coptic, some within a century or so of the originals. Comparing them is how scholars detect changes rather than guess about them.',
      },
      {
        h: 'The Dead Sea Scrolls were a live test',
        p: 'Before 1947, the oldest complete Hebrew manuscripts of Isaiah were medieval. Then a scroll of Isaiah turned up at Qumran roughly a thousand years older. If a millennium of copying quietly rewrote the text, this was where it would show. It did not: the scroll matches the later text closely, with differences that are overwhelmingly spelling and minor wording. That is a real, checkable result, not an article of faith.',
      },
      {
        h: 'What the real differences look like',
        p: 'Most variants are invisible in translation: a spelling, a swapped word order, a repeated line, a name written in full instead of short. Two longer passages are genuinely disputed: the ending of Mark (16:9–20) and the woman caught in adultery (John 7:53–8:11). Notice what your Bible already does with them. It prints them with a footnote saying the earliest manuscripts do not include them. A text being quietly rewritten does not advertise its own uncertain passages in the margin.',
      },
      {
        h: 'Where the honest uncertainty actually is',
        p: 'You can say truthfully that we do not possess the original documents, that scribes made mistakes, and that a small number of passages are contested. What the evidence does not support is the bigger claim, that the content was reshaped to say something new. The doctrines people assume were inserted later are in the earliest manuscripts we have. If you want to press on this, press on the footnotes; that is where the real argument lives, and it is smaller and more interesting than the rumour.',
      },
    ],
    scriptures: [
      { ref: 'Isaiah 40:8', text: 'The grass withers and the flowers fall, but the word of our God endures forever.' },
      { ref: 'Luke 1:1–3', text: 'Many have undertaken to draw up an account of the things that have been fulfilled among us... I myself have carefully investigated everything from the beginning.' },
    ],
    faqs: [
      { q: 'Did the Council of Nicaea change the Bible?', a: 'No. Nicaea (325 AD) debated how to describe Jesus\' relationship to the Father and produced a creed. It did not edit the biblical text and did not decide the canon, that is a persistent internet claim with no support in the records of the council itself.' },
      { q: 'What about all the translation differences?', a: 'Those are translation choices, not changes to the text. Versions differ over how to render Hebrew and Greek into English, word-for-word versus meaning-for-meaning. You can compare several versions of a verse side by side and see the range for yourself.' },
      { q: 'Were books removed from the Bible?', a: 'Some books were weighed and not included, which is different from removal. Catholic and Orthodox Bibles include books Protestant Bibles do not. The disagreement is old, public, and documented. Not a secret deletion.' },
      { q: 'How can scholars know what the original said?', a: 'By comparing manuscripts. When copies from different centuries and regions agree, that reading is almost certainly early; when they diverge, the divergence itself is visible and gets footnoted. It is the same method used on any ancient text, and the New Testament has far more surviving copies than most.' },
    ],
    related: ['can-i-trust-the-bible', 'who-decided-which-books-are-in-the-bible', 'what-is-the-book-of-enoch'],
  },
  {
    slug: 'who-decided-which-books-are-in-the-bible',
    question: 'Who decided which books are in the Bible?',
    category: 'Bible',
    updated: '2026-09-26',
    answer: 'No single person or council picked them. Books that were already being read everywhere, that traced back to apostles, and that agreed with the rest gradually became recognised as Scripture. Later councils confirmed a list the churches were already using. They ratified, they did not choose.',
    body: [
      {
        h: 'It was recognition, not selection',
        p: 'The usual picture is a committee in a room with a pile of books and a vote. The history is slower and more ordinary. Letters and Gospels circulated, were read aloud in gatherings, copied, and sent on. Over time some were used everywhere and treated as carrying apostolic authority; others were valued but local, or clearly later. By the time anyone drew up an official list, the list mostly described existing practice.',
      },
      {
        h: 'The tests they applied',
        p: 'Three criteria come up again and again in the ancient sources. Was it connected to an apostle or their circle? Was it received broadly, not just by one region or faction? Did it agree with the faith already handed down? Those are the tests that kept out later writings. Many second-century gospels fail the first test plainly, being written long after the people whose names they carry.',
      },
      {
        h: 'The dates worth knowing',
        p: 'The Muratorian Fragment, usually dated around 170 AD, already lists most of the New Testament. Athanasius\' Easter letter of 367 AD names the 27 books we now have. The councils of Hippo (393) and Carthage (397) affirmed that list. Note the order: the list existed in use for generations before the councils, which is the opposite of the story where a council invents it.',
      },
      {
        h: 'Where the genuine arguments were',
        p: 'Some books were debated for a long time: Hebrews, James, 2 Peter, 2 and 3 John, Jude, Revelation. That debate is recorded; nobody hid it. And the disagreement never fully closed: Catholic and Orthodox Bibles include books Protestant Bibles place outside the canon, and the Ethiopian Orthodox canon is wider still. You can hold that history honestly without concluding the whole thing was arbitrary.',
      },
    ],
    scriptures: [
      { ref: '2 Peter 3:15–16', text: 'Paul also wrote you... His letters contain some things that are hard to understand, which ignorant and unstable people distort, as they do the other Scriptures.' },
      { ref: '1 Thessalonians 2:13', text: 'You accepted it not as a human word, but as it actually is, the word of God.' },
    ],
    faqs: [
      { q: 'Did Constantine choose the books of the Bible?', a: 'No. This claim spread through popular fiction rather than history. Constantine convened Nicaea in 325 to address a dispute about Christ\'s divinity; the canon was not its subject, and lists resembling our New Testament predate him.' },
      { q: 'Why were the "lost gospels" left out?', a: 'Most were written well after the apostolic period, the Gospel of Thomas, Judas and Mary come from the second century or later, so they failed the apostolic test, and several conflict sharply with the earlier material. They were known and rejected, not undiscovered.' },
      { q: 'Why do Catholic Bibles have more books?', a: 'Catholic and Orthodox Bibles include the deuterocanonical books (Tobit, Judith, Wisdom, Sirach, Baruch, 1–2 Maccabees and additions). They were in the Greek Old Testament used by early Christians; the Reformers followed the Hebrew canon instead. Both sides have argued it in public for five centuries.' },
      { q: 'Could a book still be added?', a: 'In practice, no. The tests themselves rule it out. Nothing new can now be apostolic in origin or already received by the ancient churches.' },
    ],
    related: ['what-is-the-book-of-enoch', 'has-the-bible-been-changed', 'can-i-trust-the-bible'],
  },
  {
    slug: 'can-you-believe-in-evolution-and-the-bible',
    question: 'Can you believe in evolution and the Bible?',
    category: 'Faith & Doubt',
    updated: '2026-09-26',
    answer: 'Many Christians do, including scientists and pastors. Others hold a young earth and read Genesis 1 as sequential days. Christianity has not settled this, and no historic creed makes a position on it a condition of faith, the creeds say God made the world, not how long it took.',
    body: [
      {
        h: 'The range of views, stated fairly',
        p: 'Young-earth creationism reads the six days as six ordinary days and the earth as thousands of years old. Old-earth creationism accepts the scientific age of the universe while holding that God acted specially at points. Evolutionary creation holds that evolution is the mechanism God used, the way gravity is the mechanism by which he holds planets in orbit. Intelligent design argues some structures point to a designer. These are all held by people who take the Bible seriously.',
      },
      {
        h: 'The real question is what kind of writing Genesis 1 is',
        p: 'That is not a dodge; it is the actual disagreement. Genesis 1 is patterned: three days of forming, three of filling, a refrain closing each. Ancient readers encountered it alongside other creation accounts and would have noticed what it pointedly does not say: no warring gods, sun and moon demoted to lamps rather than deities. Whether that patterning signals poetry making a theological claim, or a plain chronological record, is where the argument lives.',
      },
      {
        h: 'This debate is older than Darwin',
        p: 'Augustine, writing around 400 AD, warned Christians not to make confident scientific pronouncements from Genesis that informed outsiders could see were false. He thought it brought the faith into disrepute. He had no stake in evolution; he was arguing about how to read the text. Origen raised similar questions earlier. The idea that a non-literal reading is a modern retreat is not historically accurate.',
      },
      {
        h: 'What does not change either way',
        p: 'On every one of these views, the world is made rather than accidental, human beings bear God\'s image and carry a dignity that is given rather than earned, and something has gone wrong that we did not fix ourselves. If you are weighing Christianity, you do not have to resolve the age of the earth first. Plenty of believers hold that question open for life.',
      },
    ],
    scriptures: [
      { ref: 'Genesis 1:1', text: 'In the beginning God created the heavens and the earth.' },
      { ref: 'Psalm 19:1', text: 'The heavens declare the glory of God; the skies proclaim the work of his hands.' },
      { ref: 'Colossians 1:16–17', text: 'In him all things were created... and in him all things hold together.' },
    ],
    faqs: [
      { q: 'Do you have to believe in a literal six-day creation to be a Christian?', a: 'No historic creed requires it, and major traditions, Catholic, Orthodox, Anglican and many Protestant bodies, contain people on both sides. Some individual churches and denominations do hold a required position, so it can matter locally even though it is not a universal test of faith.' },
      { q: 'Are there scientists who are Christians?', a: 'Yes, including prominent ones. Francis Collins led the Human Genome Project and writes as a Christian who accepts evolution. The categories "scientist" and "believer" have never been mutually exclusive in practice.' },
      { q: 'What about Adam and Eve?', a: 'This is the sharpest point in the discussion, and views genuinely differ: a first historical couple, a representative pair within a population, or a theological portrait of humanity. Christians who accept evolution hold a range of positions here rather than one.' },
      { q: 'Does evolution disprove God?', a: 'It is a description of a mechanism, and a mechanism does not settle whether there is intention behind it. Knowing how a process works tells you how, not whether anyone meant it. People draw opposite conclusions from the same biology, which is a clue the biology alone is not doing the deciding.' },
    ],
    related: ['do-christians-take-the-bible-literally', 'is-there-evidence-that-god-exists', 'do-genesis-1-and-2-contradict'],
  },
  {
    slug: 'are-there-dinosaurs-in-the-bible',
    question: 'Are there dinosaurs in the Bible?',
    category: 'Bible',
    updated: '2026-09-26',
    answer: 'Not by name. The word "dinosaur" was coined in 1841, long after the Bible was written. Two creatures in Job, Behemoth and Leviathan, are sometimes proposed. Most scholars read them as a hippopotamus and a crocodile, or as symbols of untamed chaos, rather than as dinosaurs.',
    body: [
      {
        h: 'Behemoth and Leviathan',
        p: 'In Job 40–41 God describes two creatures at length. Behemoth eats grass like an ox, lies among the reeds in the marsh, and has a tail that "sways like a cedar." Leviathan is armoured, breathes fire and smoke, and cannot be caught with a hook. Some readers see a sauropod and a dragon-like reptile. Others note the marsh habitat and grass diet fit a hippo, and the armour and river setting fit a crocodile, with the fire imagery doing what poetry does.',
      },
      {
        h: 'What those chapters are doing',
        p: 'Context matters more than the zoology. God is answering Job out of a storm, and the whole speech is a list of things Job did not make and cannot control: the sea, the stars, the wild ox, the ostrich, the hawk. Behemoth and Leviathan are the climax of that argument. Whatever animal stands behind them, they are there to make Job feel small, and the poetry is heightened deliberately.',
      },
      {
        h: 'Why the Bible does not discuss them',
        p: 'Scripture is not a catalogue of the natural world. It never mentions kangaroos, penguins or bacteria either, and no one finds that suspicious. It is written to people in a particular place about who God is and what he is doing, in the categories they had. Expecting a species list is asking it for a kind of book it is not.',
      },
      {
        h: 'Where the actual disagreement is',
        p: 'Nobody disputes that fossils exist. The disagreement is about timeline: whether dinosaurs died out tens of millions of years before humans, or co-existed with them on a young-earth reading. That is the same argument as the age of the earth, and Christians land in different places on it, see the evolution page for the range.',
      },
    ],
    scriptures: [
      { ref: 'Job 40:15', text: 'Look at Behemoth, which I made along with you and which feeds on grass like an ox.' },
      { ref: 'Job 41:1', text: 'Can you pull in Leviathan with a fishhook or tie down its tongue with a rope?' },
      { ref: 'Psalm 104:24–26', text: 'How many are your works, Lord!... There is the sea, vast and spacious... and Leviathan, which you formed to frolic there.' },
    ],
    faqs: [
      { q: 'Is Leviathan a dragon?', a: 'In the Old Testament\'s imagery, Leviathan often functions as a sea monster standing for chaos that only God can master, the same role sea-monsters play in other ancient Near Eastern literature. Isaiah 27:1 uses it symbolically of God\'s enemies. Whether a real animal lies behind the image is debated.' },
      { q: 'Does the Bible say how old the earth is?', a: 'No. It gives genealogies, and a young-earth figure is reached by adding those up, an approach associated with Archbishop Ussher in the 1600s. Whether biblical genealogies are complete lists or selective ones is itself disputed, since they demonstrably skip generations elsewhere.' },
      { q: 'Did dinosaurs go on the ark?', a: 'The text does not say. Young-earth accounts often propose juveniles were taken aboard; readers who accept an old earth see no issue because the animals were long extinct. It depends entirely on the timeline you hold.' },
    ],
    related: ['can-you-believe-in-evolution-and-the-bible', 'do-christians-take-the-bible-literally', 'can-i-trust-the-bible'],
  },
  {
    slug: 'do-men-have-fewer-ribs-than-women',
    question: 'Do men have one fewer rib than women?',
    category: 'Bible',
    updated: '2026-09-26',
    answer: 'No. Men and women both have twelve pairs, twenty-four ribs. The idea comes from Genesis 2, but the Bible never claims men are short a rib, and it would not follow anyway: an injury to a parent does not change what their children are born with.',
    body: [
      {
        h: 'The anatomy, plainly',
        p: 'Every standard anatomy text gives the same count for both sexes: twelve pairs. A small percentage of people of either sex are born with an extra cervical rib or one fewer, and that variation is not sex-linked. This is about as settled as a medical fact can be, and it has been checkable for as long as anyone has been able to count.',
      },
      {
        h: 'Genesis does not say what people think it says',
        p: 'Genesis 2:21–22 describes God taking something from the man\'s side while he sleeps and building the woman from it. That is the whole claim. There is no verse anywhere saying men therefore have fewer ribs, that inference was added by readers, not by the text. Notably, it is also the wrong kind of inference: acquired changes are not inherited, which is why circumcision has never produced a generation born circumcised.',
      },
      {
        h: 'The Hebrew word is more interesting than the myth',
        p: 'The word is tsela. Everywhere else in the Old Testament it usually means "side": the side of the tabernacle, the side of a hill, side chambers of the temple. "Rib" is a reasonable rendering here but not the obvious one. Read as "side," the picture shifts: not a spare part, but one being divided into two. Ancient Jewish commentators made much of that, and so did Matthew Henry, in a line often quoted. Not from the head to rule over him, nor from the feet to be trampled, but from the side to stand beside him.',
      },
      {
        h: 'Why this question is worth asking out loud',
        p: 'People usually raise it as a gotcha, sometimes half-expecting embarrassment. It deserves a straight answer instead: the science is clear, and the text never made the claim. Plenty of arguments against Christianity are substantial and worth a long conversation. This one is a misreading that got repeated, and it is fine to just set it down.',
      },
    ],
    scriptures: [
      { ref: 'Genesis 2:21–22', text: 'So the Lord God caused the man to fall into a deep sleep; and while he was sleeping, he took one of the man\'s ribs and then closed up the place with flesh.' },
      { ref: 'Genesis 2:23', text: 'This is now bone of my bones and flesh of my flesh; she shall be called "woman," for she was taken out of man.' },
    ],
    faqs: [
      { q: 'Where did the missing-rib idea come from?', a: 'From assuming Genesis 2 must have left a permanent mark, and from repetition. It was widespread enough in the 1500s that the anatomist Vesalius had to publicly point out that the count is the same in both sexes.' },
      { q: 'Does it matter whether tsela means rib or side?', a: 'Not for doctrine, but it changes the picture. "Side" suggests one whole being separated into two who belong together, which is exactly what the man\'s response in verse 23 is reaching for.' },
      { q: 'Does Genesis 2 make women secondary?', a: 'The text argues the opposite of what it is often quoted for. The man is alone and it is "not good"; the woman is called a helper using a Hebrew word most often applied to God himself, and the man\'s reaction is recognition, not ownership.' },
    ],
    related: ['do-genesis-1-and-2-contradict', 'do-christians-take-the-bible-literally', 'can-i-trust-the-bible'],
  },
  {
    slug: 'do-genesis-1-and-2-contradict',
    question: 'Do Genesis 1 and 2 contradict each other?',
    category: 'Bible',
    updated: '2026-09-26',
    answer: 'They tell the same story at different scales. Genesis 1 is a wide shot of the whole cosmos across six days; Genesis 2 zooms in on one garden and one couple. The tension people notice, the order of trees, animals and the man, turns on whether chapter 2 is sequential at all.',
    body: [
      {
        h: 'What actually differs',
        p: 'In Genesis 1, vegetation appears on day three, animals on days five and six, and humanity last, male and female together. In Genesis 2, the man is formed, then a garden is planted, then animals are brought to him to name, then the woman. Read as two chronologies, they clash. That is a real observation, and it has been noticed for a very long time.',
      },
      {
        h: 'The wide-shot, close-up convention',
        p: 'Ancient Near Eastern narrative often gives a general account and then doubles back to treat one part in detail. Genesis does it repeatedly afterwards. The nations are listed in chapter 10, then chapter 11 goes back to explain Babel. Chapter 2 opens by marking the seventh day, which reads as closing the first account rather than continuing it. On that reading it is not a second timeline but a close-up.',
      },
      {
        h: 'The verb question',
        p: 'Genesis 2:19 says God "formed" the animals and brought them to the man. Hebrew narrative verbs do not carry tense the way English does, and some translations render it "had formed". The NIV does. If that is right, the verse is recalling something already done, not sequencing it after the man. Hebrew scholars disagree about whether the pluperfect is justified here, which is worth knowing rather than glossing over.',
      },
      {
        h: 'The two-source reading',
        p: 'Many scholars hold that the chapters come from different sources: the first more structured and liturgical, the second earthier, using a different name for God. Christians respond in different ways: some reject the theory, others accept it and hold that the final text is composed deliberately, two complementary angles set side by side by an editor who could plainly see the differences and kept both anyway.',
      },
      {
        h: 'What each is for',
        p: 'The two chapters answer different questions. Genesis 1 asks who made everything and says it is ordered, intended, good. Genesis 2 asks what human beings are for and answers with dust and breath, work, limits, and the first thing called "not good", being alone. Read together they say the universe has an author and you are not incidental to it.',
      },
    ],
    scriptures: [
      { ref: 'Genesis 1:27', text: 'So God created mankind in his own image, in the image of God he created them; male and female he created them.' },
      { ref: 'Genesis 2:7', text: 'Then the Lord God formed a man from the dust of the ground and breathed into his nostrils the breath of life.' },
      { ref: 'Genesis 2:18', text: 'It is not good for the man to be alone. I will make a helper suitable for him.' },
    ],
    faqs: [
      { q: 'Are there two creation stories in the Bible?', a: 'There are two accounts in Genesis 1 and 2, and poetic passages elsewhere, Psalm 104, Proverbs 8, Job 38, that describe creation differently again. Whether "two stories" or one told twice depends on how you read chapter 2\'s relationship to chapter 1.' },
      { q: 'Why does God have different names in the two chapters?', a: 'Chapter 1 uses Elohim, chapter 2 uses YHWH Elohim. Source critics treat this as evidence of different authors; others argue the shift is deliberate, the transcendent creator of chapter 1 named personally in chapter 2, where he is walking in a garden.' },
      { q: 'Does this mean the Bible has errors?', a: 'It means the Bible was written by real people in real genres, which its own authors never hid. Whether the difference is an error depends on whether chapter 2 claims to be sequential, and the text does not say that it does.' },
    ],
    related: ['can-you-believe-in-evolution-and-the-bible', 'do-christians-take-the-bible-literally', 'has-the-bible-been-changed'],
  },
  {
    slug: 'what-does-christianity-say-about-reincarnation',
    question: 'What does Christianity say about reincarnation?',
    category: 'Eternal Life',
    updated: '2026-09-26',
    answer: 'Christianity does not teach it. The New Testament describes one life, then judgment, then resurrection. Not a return in another body. The hope it offers is not coming back as someone else, but being raised as yourself, recognisably you, with the damage undone.',
    body: [
      {
        h: 'The verse that sets the shape',
        p: 'Hebrews 9:27 says people are destined to die once, and after that to face judgment. That is the assumption underneath the whole New Testament: a single life that counts, not a sequence of attempts. Whatever else Christians argue about regarding the afterlife, none of the historic traditions teach rebirth into another body on earth.',
      },
      {
        h: 'Resurrection is a different idea, and the difference matters',
        p: 'Reincarnation treats the body as temporary housing. You move on, the shell is discarded. Christianity claims the opposite: bodies matter, and the promise is that yours is raised and made new. Paul spends a whole chapter on it (1 Corinthians 15), and the resurrection accounts are pointed about it: the risen Jesus eats fish, is touched, keeps his scars. Not a spirit escaping a body. A body brought back.',
      },
      {
        h: 'The two passages people raise',
        p: 'In John 9:2 the disciples ask whether a man born blind sinned, which sounds like pre-existence, Jesus rejects the premise of the question entirely. And Jesus says of John the Baptist that he is "the Elijah who was to come" (Matthew 11:14), while John himself denies being Elijah (John 1:21). Luke 1:17 resolves it: John comes "in the spirit and power of Elijah." A role taken up, not a soul returned.',
      },
      {
        h: 'If reincarnation is what you actually believe',
        p: 'It is worth naming what draws people to it, because it is usually something reasonable: a sense that one life is too short to get anywhere, or that justice needs more time than we get. Christianity answers those with different machinery: not more attempts, but grace, which is the claim that you are not working your way up across lifetimes because the distance was closed from the other side. You can find that unconvincing. But it is a real answer to the real concern, not an evasion of it.',
      },
    ],
    scriptures: [
      { ref: 'Hebrews 9:27', text: 'Just as people are destined to die once, and after that to face judgment.' },
      { ref: '1 Corinthians 15:42–44', text: 'The body that is sown is perishable, it is raised imperishable... it is sown a natural body, it is raised a spiritual body.' },
      { ref: 'Luke 1:17', text: 'And he will go on before the Lord, in the spirit and power of Elijah.' },
    ],
    faqs: [
      { q: 'Did early Christians believe in reincarnation?', a: 'There is no evidence the mainstream did. Origen speculated about the pre-existence of souls, which is a different idea and was later condemned. The claim that reincarnation was taught and then removed from the Bible has no manuscript support, and we have manuscripts old enough to check.' },
      { q: 'What about near-death experiences or past-life memories?', a: 'Christians vary in how they interpret these. Some see genuine spiritual experience, others psychological or cultural explanations. What is fair to say is that such accounts are interpreted through the framework the person already holds, which is why they tend to match the expectations of the culture they occur in.' },
      { q: 'If there is only one life, what about people who never hear about Jesus?', a: 'One of the oldest open questions in Christian thought, and answers genuinely differ. What most traditions hold in common is that God is just and nobody is judged for information they could not have had. Beyond that, Christians disagree, and pretending otherwise would be false.' },
    ],
    related: ['what-happens-when-you-die', 'is-hell-real', 'what-is-heaven-like'],
  },
  {
    slug: 'what-if-church-hurt-you',
    question: 'What if church hurt you, or felt like it was all about money?',
    category: 'Church',
    updated: '2026-09-26',
    answer: 'Then you saw something real and you are right to name it. Jesus was angrier about religious money and religious pretending than about almost anything else. Leaving a church that was harming you is not leaving God, and nothing here will tell you to go back to it.',
    body: [
      {
        h: 'Your read was probably accurate',
        p: 'People who walk out of churches are often told they were too sensitive, or looking for an excuse. Usually they were not. If the giving talk arrived every week, if questions were treated as disloyalty, if a leader was untouchable, if you left services feeling smaller. Those are not misperceptions. They are the things the New Testament warns about, written down because they were already happening in the first century.',
      },
      {
        h: 'What Jesus did about religious money',
        p: 'The one time the Gospels show Jesus physically overturning anything, it is tables in a temple where faith had been turned into commerce. He reserved his hardest language not for the irreligious but for religious professionals. Calling them whitewashed tombs, saying they loaded people with burdens they would not lift themselves. If church money made you angry, you are in the same place the story puts Jesus.',
      },
      {
        h: 'The distinction that has to be made honestly',
        p: 'It is easy to say "the church failed you, God did not", and it can sound like a dodge, because for a lot of people the church was the only face God had. So take it slowly. A church is people with authority, and authority can be misused. That is a claim Christianity makes about human beings, not an exception to it. Every character in the Bible who abuses religious power is in there as a warning, not an embarrassment to be explained away.',
      },
      {
        h: 'You are allowed to take your time',
        p: 'There is no obligation to find a new church this month, or this year. Some people need a long distance before anything churchlike is safe again. If you eventually want to try, it is fair to ask blunt questions first, who has power here, where does the money go, what happens when someone disagrees, can I leave without being pursued. Any healthy church can answer those. A church that treats the questions as an attack has answered them.',
      },
      {
        h: 'And in the meantime',
        p: 'You can keep asking about God without a building. Reading, praying badly, arguing with it, asking the questions you were told not to ask, none of that requires an institution\'s permission. Plenty of people do their most honest thinking about faith in exactly this stretch, after they stop performing it for a room.',
      },
    ],
    scriptures: [
      { ref: 'Matthew 21:12–13', text: 'Jesus entered the temple courts and drove out all who were buying and selling there... "My house will be called a house of prayer, but you are making it a den of robbers."' },
      { ref: 'Matthew 23:4', text: 'They tie up heavy, cumbersome loads and put them on other people\'s shoulders, but they themselves are not willing to lift a finger to move them.' },
      { ref: '1 Timothy 3:3', text: 'Not violent but gentle, not quarrelsome, not a lover of money.' },
      { ref: 'Matthew 11:28', text: 'Come to me, all you who are weary and burdened, and I will give you rest.' },
    ],
    faqs: [
      { q: 'Is it a sin to stop going to church?', a: 'The New Testament encourages Christians not to give up meeting together, and it is written to people in community. But it is not a command to stay somewhere harmful, and nothing in it suggests God is keeping an attendance record against someone who left a place that was hurting them.' },
      { q: 'Does the Bible actually require tithing?', a: 'Christians disagree. Tithing is Old Testament law; the New Testament talks about generous, un-pressured giving. "Not reluctantly or under compulsion" (2 Corinthians 9:7). Compulsion is the part that gets quietly dropped when giving is being pushed from a stage.' },
      { q: 'How do I know if a church is healthy?', a: 'Watch what happens to people who disagree, whether the finances are open, whether leaders are accountable to anyone who can actually say no, and whether you can leave without pressure. Those tell you more than the preaching or the music.' },
      { q: 'Can I be a Christian without a church?', a: 'People do, and many are in that position for reasons that were not their choice. Most Christians would say community matters and is worth finding eventually, but "eventually," and not the one that hurt you.' },
    ],
    related: ['why-should-i-go-to-church', 'how-do-i-find-a-church', 'does-god-love-me'],
  },
  // ── Added 2026-09-26 — the church side ─────────────────────────────────────
  // Two kinds here. The leader-pain and sermon-craft pages come from qa_events:
  // three separate people described burning out or being hurt while leading,
  // and two asked for real sermon help. The adoption pages are Daniel's call —
  // "maybe someone comes across it and wants to sign up passively" — and he is
  // right that a page nobody wrote cannot be stumbled on.
  //
  // ⚠️ NOTE ON VOICE. These are written FOR the pastor, not ABOUT them, and the
  // existing pastor pages are all about caring for somebody else. Nothing here
  // tells a hurting leader to try harder.
  {
    slug: 'what-do-i-do-when-im-the-pastor-who-is-burned-out',
    question: "What do I do when I'm the pastor who's burned out?",
    category: 'For Pastors',
    updated: '2026-09-26',
    answer: 'Stop treating it as a spiritual failure first. Burnout in ministry is usually a load problem, not a faith problem: too many roles, no day off that holds, and nobody pastoring you. The first move is telling one person the truth, before deciding anything bigger.',
    body: [
      {
        h: 'It is not a sign you were never called',
        p: 'The first thing most burned-out pastors reach for is the possibility that they were wrong about all of it. That is worth naming because it is so common and so rarely true. Exhaustion is a poor witness in its own trial. It argues that everything was always false, using evidence it collected while depleted. Elijah asked to die immediately after the most public victory of his life. What God sent first was food and sleep, twice, before any conversation.',
      },
      {
        h: 'The load is usually the actual problem',
        p: 'Small-church ministry quietly becomes six jobs: preaching, counselling, admin, facilities, finance, and being publicly cheerful about it. Any one of those is a role. Together they are unsustainable no matter how strong the calling, and the sustainability question is separate from the calling question. Before deciding whether to leave, it is worth writing down every actual task of the last month. Most pastors are shocked by the list, and it reframes the problem from "what is wrong with me" to "what would be wrong with anyone doing this."',
      },
      {
        h: 'Nobody is pastoring you',
        p: 'This is the part that makes ministry burnout different. The person the congregation brings its worst weeks to has, very often, nowhere to bring their own. You cannot be pastored by the people you pastor. The roles will not hold it. That means it has to come from outside: another pastor in a different town, a spiritual director, a counsellor, a denominational contact if you have one. Not a friend inside the congregation, however close. That arrangement fails for both of you.',
      },
      {
        h: 'What to do this week',
        p: 'Tell one person outside your church the unedited version. Not a prayer-request version. If you are having thoughts of ending your life, treat that as urgent and tell someone today: a doctor, a crisis line, someone who can sit with you. Then, if you can, take a real day off with your phone somewhere else, and notice how strongly you resist it. That resistance is information about how far this has gone.',
      },
      {
        h: 'Leaving is a legitimate option, but not this week',
        p: 'Some pastors do need to leave a post, and some need to leave vocational ministry, and neither is a betrayal. But exhaustion is a bad chair to make that decision from. The usual counsel is to get rest and outside support in place first, and revisit it clear-headed. The decision made when you are slept and supported is the one worth trusting.',
      },
    ],
    scriptures: [
      { ref: '1 Kings 19:5–7', text: 'All at once an angel touched him and said, "Get up and eat."... "Get up and eat, for the journey is too much for you."' },
      { ref: 'Exodus 18:17–18', text: 'What you are doing is not good. You and these people who come to you will only wear yourselves out. The work is too heavy for you; you cannot handle it alone.' },
      { ref: 'Matthew 11:28–29', text: 'Come to me, all you who are weary and burdened, and I will give you rest.' },
      { ref: 'Mark 6:31', text: 'Come with me by yourselves to a quiet place and get some rest.' },
    ],
    faqs: [
      { q: 'Is burnout a sin or a lack of faith?', a: 'No. Scripture shows exhausted leaders: Moses, Elijah, Jeremiah, Paul describing being "under great pressure, far beyond our ability to endure." In every case the response is provision and help, not rebuke. Jethro\'s advice to Moses is essentially an organisational restructure.' },
      { q: 'Should I tell my elders or my congregation?', a: 'Usually elders or whoever you are accountable to, first, and in a form you control. Congregations vary enormously in how they receive this. If there is any chance the information will be used against you, get outside counsel before disclosing anything.' },
      { q: 'How do I take a sabbath when Sunday is a work day?', a: 'Pick a different fixed day and defend it like an appointment, because that is what it is. The common failure is leaving it flexible. A flexible day off is absorbed within about three weeks.' },
      { q: 'What if I cannot afford to take time off?', a: 'Many pastors cannot, and pretending otherwise is useless. Then the realistic move is subtraction: what can be dropped, delegated badly, or done to a lower standard for three months. Something is going to give. It is better for that to be a choice than a collapse.' },
    ],
    related: ['i-was-hurt-serving-in-church-leadership', 'what-does-the-bible-say-about-rest', 'what-does-the-bible-say-about-depression'],
  },
  {
    slug: 'i-was-hurt-serving-in-church-leadership',
    question: 'What if I was hurt while serving in church leadership?',
    category: 'For Pastors',
    updated: '2026-09-26',
    answer: 'It is a particular kind of injury: the place you served became the place that hurt you, so the usual source of comfort is the wound. That is not fragility. Leaders get criticised in ways members never see, and often have nowhere to say so.',
    body: [
      {
        h: 'Why this one cuts differently',
        p: 'When someone is hurt at work, church is often where they go to recover. When you are hurt at church while leading it, that route closes: the community, the building, the songs and the people are all inside the injury. Add that most of the criticism arrived about you rather than to you, and that you were expected to keep leading worship the following Sunday as though none of it had happened.',
      },
      {
        h: 'What you are not allowed to say out loud',
        p: 'Leaders absorb things they cannot repeat. You know why a family really left. You were told something in confidence that was about you. You heard the meeting-after-the-meeting. Carrying information you cannot discharge is its own weight, and it is one of the reasons leadership hurt lingers longer than it seems it should.',
      },
      {
        h: 'Some of it was ordinary, some was not',
        p: 'Worth separating honestly, because the response differs. Ordinary hardship: people leaving, disagreement, criticism of a decision, the loneliness of the role. Not ordinary: being bullied, having your character attacked, financial pressure tied to compliance, being pushed out without process, or being told that submission meant silence. The first is the cost of the work. The second is abuse and should be named as such, not spiritualised into a lesson.',
      },
      {
        h: 'You are allowed to step back',
        p: 'Stepping down from a role is not stepping away from God, and you do not need to have forgiven everyone before you are permitted to rest. Forgiveness in the Bible is not the same as returning to the arrangement that injured you, and it is not a prerequisite for getting out of it. Reconciliation takes two; you only ever controlled your half.',
      },
      {
        h: 'Coming back, if you ever want to',
        p: 'Some people return to leadership, some to a pew somewhere else, some take years. All of those are real outcomes. If you do try again, it is reasonable to ask blunt questions first, who holds the leaders accountable, what happens when someone disagrees, can a person step down without being punished for it. You have earned the right to ask.',
      },
    ],
    scriptures: [
      { ref: 'Psalm 55:12–14', text: 'If an enemy were insulting me, I could endure it... But it is you, a man like myself, my companion, my close friend, with whom I once enjoyed sweet fellowship at the house of God.' },
      { ref: '2 Corinthians 1:8', text: 'We were under great pressure, far beyond our ability to endure, so that we despaired of life itself.' },
      { ref: '2 Timothy 4:16', text: 'At my first defense, no one came to my support, but everyone deserted me. May it not be held against them.' },
    ],
    faqs: [
      { q: 'Am I bitter for still being angry about it?', a: 'Anger at genuine wrong is not bitterness. Scripture is full of it, most of the Psalms included. Bitterness is a direction it can settle into over years. Being angry about something that actually happened, recently, is just accurate.' },
      { q: 'Do I have to forgive the people who did this?', a: 'Christians are called to forgive, and it is worth saying clearly that forgiveness is not pretending it was acceptable, not resuming the relationship, and not a switch you can throw on command. It is usually slow, and it does not require the other person to have access to you.' },
      { q: 'Should I warn the next church about what happened?', a: 'If there was misconduct affecting others, especially anything involving safeguarding, reporting it is a responsibility, not gossip. If it was conflict and hurt without misconduct, most counsellors advise dealing with it in a safe setting first rather than carrying the case forward.' },
      { q: 'Can I still love God if I cannot walk into a church?', a: 'Yes. Plenty of people have done their most honest praying in exactly that stretch. The building is not the relationship, and God is not standing behind the people who hurt you.' },
    ],
    related: ['what-do-i-do-when-im-the-pastor-who-is-burned-out', 'what-if-church-hurt-you', 'how-do-i-forgive-someone-who-hurt-me'],
  },
  {
    slug: 'im-the-only-one-leading-my-church',
    question: "What if I'm the only one leading, with no team and no support?",
    category: 'For Pastors',
    updated: '2026-09-26',
    answer: 'Most churches are small and most pastors are doing several jobs at once, often bivocational, frequently unpaid. The trap is measuring a one-person church against a resourced one with staff. Sustainability, not scale, is the thing to solve first, and it starts with deciding what is allowed to be done badly.',
    body: [
      {
        h: 'You are the norm, not the exception',
        p: 'Media attention goes to large churches, so solo pastors often assume they are failing at something everyone else has worked out. Most congregations worldwide are small, and most of the people leading them are doing it alongside other work, with no staff. The model in your head, a team, a budget, a building manager, describes a minority of churches.',
      },
      {
        h: 'Decide what is allowed to be done badly',
        p: 'One person cannot do six roles well, and trying is how the whole thing ends. The useful exercise is deciding in advance which things are done properly and which are done to a lower standard on purpose. Perhaps the preaching and the visiting are protected, and the newsletter goes out late, the social media stops, and the building fund waits. Naming it as a decision keeps it from becoming a private sense of failure.',
      },
      {
        h: 'Delegate badly rather than not at all',
        p: 'Solo leaders often hold on because nobody else will do it to the standard they would. That reasoning ends in one exhausted person doing everything. A volunteer doing a task at seventy per cent is a genuine gain, and the drop in quality is usually less visible to everyone else than it is to you. It also gives people a stake, which is how churches grow leaders.',
      },
      {
        h: 'Find one peer outside your church',
        p: 'The single most protective factor solo pastors report is one other pastor to talk to, someone with no stake in your congregation. A monthly call is enough. Denominational networks, local ministerial associations and online groups exist for this, and if none is available near you, pastors in other towns are usually glad to be asked.',
      },
    ],
    scriptures: [
      { ref: 'Exodus 18:21–22', text: 'Select capable men... and appoint them as officials... That will make your load lighter, because they will share it with you.' },
      { ref: 'Ecclesiastes 4:9–10', text: 'Two are better than one... If either of them falls down, one can help the other up. But pity anyone who falls and has no one to help them up.' },
      { ref: 'Zechariah 4:10', text: 'Who dares despise the day of small things?' },
    ],
    faqs: [
      { q: 'Is a small church a failing church?', a: 'Nothing in the New Testament measures a church by size. The letters are written to house churches. Faithfulness, care and truth are the measures used; attendance is not one of them.' },
      { q: 'How do I lead when I also work another job?', a: 'Bivocational ministry has a long history, Paul made tents. It usually means fewer commitments held properly rather than many held loosely, and being honest with the congregation about what you can and cannot do.' },
      { q: 'What if my congregation expects more than I can give?', a: 'Expectations that are never discussed tend to grow. Stating plainly what is realistic, ideally with elders or leaders present, is usually better received than pastors fear, and it gives people the chance to step up.' },
    ],
    related: ['what-do-i-do-when-im-the-pastor-who-is-burned-out', 'how-do-i-keep-my-congregation-engaged-between-sundays', 'what-does-the-bible-say-about-rest'],
  },
  {
    slug: 'how-do-i-preach-on-lament-without-losing-hope',
    question: 'How do I preach on lament without losing hope?',
    category: 'For Pastors',
    updated: '2026-09-26',
    answer: "Let the lament be as long as the text makes it. Most sermons on grief rush to resolution in the last five minutes, which teaches people their sorrow is a stage to get through. The Bible's laments sit in it, and one of them never resolves at all.",
    body: [
      {
        h: 'The pressure to resolve is the problem',
        p: 'Preachers feel it acutely: you cannot send people home in despair. So the sermon spends twenty minutes on the pain and five on the hope, and the five minutes carry all the weight. What the congregation actually hears is that grief is the setup and comfort is the point, so anyone still in the grief a year later concludes they are doing it wrong.',
      },
      {
        h: 'Psalm 88 is the permission slip',
        p: 'Psalm 88 is in the Bible and it does not turn. It ends with darkness as the psalmist\'s closest friend. No resolution, no "but yet." That psalm is a pastoral gift precisely because someone decided it belonged in the book of prayers. Preaching it as written, without patching the ending, tells people their unresolved season is not outside the life of faith.',
      },
      {
        h: 'Where the turn belongs, when there is one',
        p: 'Most laments do turn, and the turn is worth showing rather than asserting. In Psalm 13 the shift comes after four verses of "how long"; in Lamentations 3 the famous line about mercies new every morning sits in the middle of a book about a destroyed city, surrounded on both sides by grief. Show the structure. Hope that is earned by the text lands differently from hope bolted on because the service has to end.',
      },
      {
        h: 'Practical moves in the room',
        p: 'Say plainly that some people present are in this today and are not being asked to feel better by the end. Use the text\'s own words rather than paraphrasing the pain into something milder. Resist illustrations where the grief gets fixed. If you pray at the close, pray the lament too, not only the hope, congregations learn what is permitted by what gets prayed aloud.',
      },
      {
        h: 'And for the preacher',
        p: 'Pastors often preach lament while in it. That can be the most honest sermon a congregation hears, and it can also be more than you can carry from the front. It is legitimate to preach this text in a season when you cannot say the hopeful part with full conviction. The text says it for you, which is part of why it was written down.',
      },
    ],
    scriptures: [
      { ref: 'Psalm 88:18', text: 'You have taken from me friend and neighbor. Darkness is my closest friend.' },
      { ref: 'Psalm 13:1–2', text: 'How long, Lord? Will you forget me forever? How long will you hide your face from me?' },
      { ref: 'Lamentations 3:22–23', text: "Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning." },
      { ref: 'John 11:35', text: 'Jesus wept.' },
    ],
    faqs: [
      { q: 'Is it wrong to end a sermon without resolution?', a: 'Not if the text does. Psalm 88 ends in darkness, and preaching it honestly may be the most comforting thing a grieving person hears that year, because it tells them Scripture has a category for where they are.' },
      { q: 'How much of my own grief should I share?', a: 'Enough to be honest, not so much that the congregation ends up caring for you from the pews. A useful test: are you telling them about a wound, or bleeding on them? Processed pain preaches; raw pain usually needs somewhere else first.' },
      { q: 'What about people who need hope right now?', a: 'They still get it, hope that has taken the loss seriously is sturdier than hope that skipped it. What honest lament removes is the pressure to perform recovery on someone else\'s schedule.' },
      { q: 'Should lament ever be part of a normal Sunday?', a: 'Many pastors argue it should be, precisely so that grief is not reserved for funerals. Congregations that only ever sing triumph give people nothing to say to God on the worst week of their lives.' },
    ],
    related: ['what-does-the-bible-say-about-grief', 'where-do-i-find-sermon-illustrations', 'what-do-i-do-when-im-the-pastor-who-is-burned-out'],
  },
  {
    slug: 'where-do-i-find-sermon-illustrations',
    question: "Where do I find sermon illustrations that don't feel canned?",
    category: 'For Pastors',
    updated: '2026-09-26',
    answer: 'The recycled ones, the starfish, the footprints, the drowning man refusing three rescues, fail because the congregation has heard them. Better sources are close at hand: the text itself, your own week, the work your people actually do, and history that is specific enough to be surprising.',
    body: [
      {
        h: 'Why the famous ones stopped working',
        p: 'An illustration works by making an abstract claim concrete and slightly surprising. The circulated classics have lost the surprise, many in your congregation have heard them from two other preachers, and a recognised illustration signals that the sermon came from a file rather than from wrestling with the passage. That signal costs more than the illustration gains.',
      },
      {
        h: 'Four sources that stay fresh',
        p: 'Your own week, told small and without a hero: the argument in the kitchen, the thing you got wrong on Tuesday. The work your congregation actually does: nurses, tradespeople, teachers, carers all have processes that map onto grace, patience and repair, and using them tells people their working life is visible from the pulpit. History specific enough to be strange rather than the same three anecdotes. And the Bible itself: the surrounding narrative is usually a better illustration of the doctrine than anything imported.',
      },
      {
        h: 'Make it carry one thing',
        p: 'The common failure is an illustration that is more interesting than the point, so people remember the story and not the claim. Test it by asking what a listener would say the sermon was about if they only remembered this. If the answer is the story, it needs shortening or cutting.',
      },
      {
        h: 'Using AI for this honestly',
        p: 'A model is useful for the first stage: analogies you have not thought of, historical examples to go and verify, a way into a passage you have preached too often. It is not a source of facts. Anything specific it hands you (a date, a study, a quotation, a moving story about a named person) has to be checked before it goes in front of people, because fabricated detail in a sermon is a real cost to your credibility. Using it as a thinking partner is fine; using it as a research assistant without verification is not.',
      },
    ],
    scriptures: [
      { ref: 'Matthew 13:34', text: 'Jesus spoke all these things to the crowd in parables; he did not say anything to them without using a parable.' },
      { ref: 'Mark 4:33', text: 'With many similar parables Jesus spoke the word to them, as much as they could understand.' },
      { ref: '1 Corinthians 2:1', text: 'I did not come with eloquence or human wisdom as I proclaimed to you the testimony about God.' },
    ],
    faqs: [
      { q: 'Is it dishonest to tell a story that happened to someone else?', a: 'Not if you say so. Telling another person\'s story as your own is the line, and congregations rarely forget catching a preacher at it. "A friend told me" costs nothing and keeps you honest.' },
      { q: 'How many illustrations should a sermon have?', a: 'Most preaching guides suggest one strong image per main point at most, and many good sermons carry a single one throughout. More than that and they compete with each other.' },
      { q: 'Can I use stories about my own family?', a: 'With their permission, and with real care as children get older. A good rule many pastors adopt: nothing your child would be embarrassed to have repeated at school, and nothing your spouse has not heard first.' },
      { q: 'Are illustration websites worth it?', a: 'They are convenient and they are also where the overused ones come from, if it is in a database, others have used it. Better as a prompt for your own thinking than as a source to lift from.' },
    ],
    related: ['how-do-i-preach-on-lament-without-losing-hope', 'should-my-church-use-ai', 'how-do-i-keep-my-congregation-engaged-between-sundays'],
  },
  {
    slug: 'does-my-church-need-an-app',
    question: 'Does my church need an app?',
    category: 'For Pastors',
    updated: '2026-09-26',
    answer: 'Most small churches do not need a custom app, and the ones that buy one often find it sits unused. The real question is narrower: is there something your congregation needs between Sundays that a website and a group chat genuinely cannot do?',
    body: [
      {
        h: 'Start with the problem, not the product',
        p: 'Churches usually arrive at "we need an app" by way of a different frustration: people are disconnected midweek, announcements are not landing, newcomers disappear after three visits. An app may or may not touch those. Write the actual problem down first in one sentence. If it is "our announcements are not read," an app mostly relocates the unread announcement.',
      },
      {
        h: 'What a free website and a group chat already do',
        p: 'Service times, location, what to expect on a first visit, a sermon archive, a giving link. A plain website does all of that and is what visitors search for. Group messaging handles reminders and prayer chains. Between them they cover a large share of what small churches say they want, at no cost, and people are already competent with both.',
      },
      {
        h: 'Where a dedicated space earns its place',
        p: 'The case is stronger when something needs to be ongoing, private, and not tangled with the rest of someone\'s digital life. Prayer requests people would not post in a group chat. Sermon discussion that continues through the week. A place a newcomer can read and lurk without having to announce themselves. Those are hard to do in a chat thread, which scrolls, and on a website, which does not hold a conversation.',
      },
      {
        h: 'The questions worth asking any provider',
        p: 'What happens to our data if we stop paying? Who can see prayer requests and personal information, and is that enforced technically or by policy? What does it cost after the first year? Can we export what our congregation has written? How do you handle minors? A provider that answers those plainly is telling you something; one that deflects is also telling you something.',
      },
      {
        h: 'An honest note about kinwove',
        p: 'kinwove is one of the tools in this category, and it is in free beta, so this page would be poor advice if it pretended otherwise. It is built around Bible study, questions people are nervous to ask aloud, prayer and sermon discussion, rather than around push notifications and event admin. If what your church needs is check-in, rotas and giving, other tools do that better and this page would rather say so than sell you something you will not use.',
      },
    ],
    scriptures: [
      { ref: 'Acts 2:46', text: 'Every day they continued to meet together in the temple courts. They broke bread in their homes and ate together with glad and sincere hearts.' },
      { ref: 'Hebrews 10:24–25', text: 'And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together.' },
    ],
    faqs: [
      { q: 'Will an app make our congregation more connected?', a: 'Only if it carries something people already want to do. Tools amplify existing habits more than they create them: a congregation that talks midweek will talk more, and one that does not usually will not start because of software.' },
      { q: 'How much do church apps cost?', a: 'Widely: from free tiers to several hundred dollars a month for platforms with giving, check-in and event management. The larger cost is usually staff time to keep it populated, which is easy to underestimate.' },
      { q: 'What about older members who are not online?', a: 'Any digital tool has to be additional rather than the only channel, or you exclude the people most likely to need care. If an announcement only exists in the app, some of your congregation does not have it.' },
      { q: 'Is it safe to put prayer requests in an app?', a: 'Depends entirely on the provider. Prayer requests contain health, family and mental-health information. Ask specifically who can read them and whether that is enforced by the database or by a promise. The difference matters.' },
    ],
    related: ['should-my-church-use-ai', 'how-do-i-keep-my-congregation-engaged-between-sundays', 'how-do-we-follow-up-with-first-time-visitors'],
  },
  {
    slug: 'how-do-we-follow-up-with-first-time-visitors',
    question: 'How do we follow up with first-time visitors?',
    category: 'For Pastors',
    updated: '2026-09-26',
    answer: 'Lightly, quickly, and with an exit. One short message within a few days, from a person rather than the church, that does not ask for anything. The most common mistake is not following up too little. It is following up too hard.',
    body: [
      {
        h: 'What visitors are actually worried about',
        p: 'Most first-time visitors arrive braced for two things: being singled out during the service, and being pursued afterwards. That fear shapes everything. It is why people sit at the back, leave during the last song, and give a fake-ish email if a card is pressed on them. Any follow-up that confirms the fear ends the relationship faster than no follow-up at all.',
      },
      {
        h: 'The shape that works',
        p: 'One message, a few days later, from a named human being. Warm, three or four sentences, no request attached. Say you were glad they came, offer one concrete thing they might want to know, and make the exit explicit, that there is no obligation to reply and no one will chase them. Then actually do not chase them. A second unanswered message is usually where people decide the place is not safe to explore quietly.',
      },
      {
        h: 'Stop making people identify themselves at the door',
        p: 'Connection cards, stand-up-and-wave welcomes and visitor gifts all force a decision on someone whose main need is to observe without commitment. Letting people be anonymous for as long as they want is a feature, not a gap. The ones who want contact will find a way to make it; the ones who do not will come back, which is the actual goal.',
      },
      {
        h: 'Make the first visit legible before it happens',
        p: 'Much of what follow-up tries to repair could be prevented by the website. What time it really starts, how long it runs, what people wear, whether children stay in, where to park, whether anyone will ask them to speak, what happens with money. Anxiety about those details keeps people away and makes the ones who come guarded. Answering them plainly does more than any follow-up sequence.',
      },
      {
        h: 'A realistic measure',
        p: 'Most visitors do not return, and that is normal: people are looking for a fit, and yours will not be it for many of them. The useful question is not whether someone came back but whether leaving was easy and being there was comfortable. Those are the things that make someone recommend you to a friend even after they chose elsewhere.',
      },
    ],
    scriptures: [
      { ref: 'Romans 15:7', text: 'Accept one another, then, just as Christ accepted you, in order to bring praise to God.' },
      { ref: 'Hebrews 13:2', text: 'Do not forget to show hospitality to strangers, for by so doing some people have shown hospitality to angels without knowing it.' },
      { ref: 'Luke 14:13–14', text: 'When you give a banquet, invite the poor, the crippled, the lame, the blind, and you will be blessed.' },
    ],
    faqs: [
      { q: 'How soon should we contact someone?', a: 'Within a few days is usual, soon enough to be connected to the visit, late enough not to feel like surveillance. Same-day messages often read as intense to someone who has not decided anything yet.' },
      { q: 'Should the pastor do the follow-up?', a: 'In a small church it is natural, though it can feel weightier to the visitor than a message from an ordinary member. What matters more is that it comes from a person with a name rather than a church-wide account.' },
      { q: 'What if they gave us their details but never replied?', a: 'Treat that as an answer and leave it. Giving contact details under mild social pressure is not consent to a sequence, and people notice the difference between welcome and pursuit.' },
      { q: 'Is it worth asking why someone did not come back?', a: 'Rarely useful and often uncomfortable to receive. If you want that information, it is better gathered from people who stayed, asking what nearly stopped them coming back in the first month.' },
    ],
    related: ['does-my-church-need-an-app', 'how-do-i-find-a-church', 'how-do-i-keep-my-congregation-engaged-between-sundays'],
  },
  {
    slug: 'why-are-young-adults-leaving-our-church',
    question: 'Why are young adults leaving our church, and what can we do?',
    category: 'For Pastors',
    updated: '2026-09-26',
    answer: 'Surveys keep finding the same reasons, and they are not the ones churches expect. Not music, not style, but questions being shut down, hypocrisy in leadership, and how the church treats people it disagrees with. Programmes aimed at the symptom rarely move it.',
    body: [
      {
        h: 'What people actually say when they leave',
        p: 'Asked directly, young adults cite being unable to raise doubts without becoming a project, watching how leaders behaved when they thought it did not count, and how people outside the church were spoken about. Style complaints come up, but far down the list and usually as an acceptable thing to say instead of the real one. Churches that respond with a rebrand are answering the polite version of the question.',
      },
      {
        h: 'Doubt is the hinge',
        p: 'The single most repeated theme is what happened when someone admitted uncertainty. If the response was concern, correction, or a quiet change in how they were treated, they learned the community was conditional on agreement, and most people will not stay in a place where honesty costs them standing. Churches where doubt can be said out loud and survive it keep a noticeably higher share of their young adults, which makes sense: they never forced the choice.',
      },
      {
        h: 'What tends to help',
        p: 'Give questions somewhere real to go: a setting where hard ones get taken seriously rather than deflected, and where "we do not know" is an available answer. Give young adults actual responsibility rather than a designated ministry slot. Be visibly accountable about money and power, because that generation assumes institutions hide both and is watching to see if yours does. And speak about people who disagree with you as you would if they were in the room.',
      },
      {
        h: 'What usually does not',
        p: 'A separate young adults service, a new band, coffee, social media, or an event series aimed at a demographic. None of these is bad. They just do not address why people said they left, and they can make things worse by signalling that the church heard "we are boring" when what was said was closer to "we did not trust you with the truth."',
      },
      {
        h: 'Some of them come back, and how you part matters',
        p: 'A meaningful share of people who leave in their twenties return later, and the biggest factor in whether that door stays open is how they were treated on the way out. Someone pursued, guilted, or gossiped about does not come back. Someone who left and was told they were still welcome sometimes does, years later.',
      },
    ],
    scriptures: [
      { ref: 'Mark 9:24', text: 'Immediately the boy\'s father exclaimed, "I do believe; help me overcome my unbelief!"' },
      { ref: 'Jude 1:22', text: 'Be merciful to those who doubt.' },
      { ref: 'John 20:27', text: 'Then he said to Thomas, "Put your finger here; see my hands. Reach out your hand and put it into my side. Stop doubting and believe."' },
      { ref: '1 Timothy 4:12', text: 'Don\'t let anyone look down on you because you are young, but set an example for the believers.' },
    ],
    faqs: [
      { q: 'Is this just a phase they grow out of?', a: 'Some return, many do not, and treating it as a phase is itself one of the complaints. It tells someone their reasoning is being waited out rather than engaged. Better to take the stated reasons at face value.' },
      { q: 'Should we change our music or service style?', a: 'Only if you want to for its own sake. Style shows up in surveys but well below integrity, honesty about doubt, and how outsiders are treated. Changing the music and nothing else tends to disappoint everyone.' },
      { q: 'How do we let people doubt without teaching error?', a: 'By separating the question from the verdict. A church can hold clear convictions and still be a place where someone can say "I am not sure I believe this" without consequence. What drives people out is not being corrected, it is being managed.' },
      { q: 'What about young adults who moved away?', a: 'Plenty of departures are practical rather than spiritual: university, work, rent. Worth knowing which you are dealing with before diagnosing a crisis, and worth staying in touch with the ones who simply moved.' },
    ],
    related: ['how-do-i-pastor-someone-who-is-deconstructing', 'how-can-i-believe-when-i-have-doubts', 'what-if-church-hurt-you'],
  },
  // ── Added 2026-09-26 — SEARCH-INTENT pages ─────────────────────────────────
  // Daniel: "i mean a pastor looking for a study platform or a place to organize
  // his congregation a chat board etc."
  //
  // A different axis from every other page here. The rest answer someone with a
  // QUESTION; these answer someone already SHOPPING — they have decided they
  // need a tool and are comparing. That person searches in categories ("church
  // discussion board", "online bible study platform"), not in questions.
  //
  // ⚠️ THESE MUST STAY HONEST TO WORK. A buyer comparing options can tell a
  // sales page from a useful one in about ten seconds, and this audience talks
  // to each other. Each page names what kinwove does NOT do and says it is in
  // free beta. No competitor is named with specifics I have not verified.
  {
    slug: 'best-platform-for-church-small-groups',
    question: 'What is the best platform for church small groups and Bible study?',
    category: 'For Pastors',
    updated: '2026-09-26',
    answer: 'There is no single best one: the honest question is which of four jobs you need done: midweek messaging, structured study, private prayer, or admin and giving. Most churches try to buy one tool for all four, and that is usually why it ends up unused.',
    body: [
      {
        h: 'Separate the four jobs before you compare anything',
        p: 'Midweek chatter is one job. Structured study, a plan, a passage, questions that carry over week to week, is another. Prayer that people would not post in a group chat is a third. Admin, rotas, check-in and giving is a fourth, and it is the one most "church platforms" are actually built around. Tools that are excellent at the fourth are often weak at the second, which is how a church ends up paying for software its small groups never open.',
      },
      {
        h: 'What general-purpose tools do well, and where they stop',
        p: 'Group messaging apps are free, everyone already has them, and nobody needs training. For reminders and quick coordination they are hard to beat. They stop at three points: conversation scrolls away, so a study thread is gone by the following week; there is no privacy boundary, so sensitive prayer sits in the same place as the rota; and there is no way for a newcomer to read quietly before joining in. Social network groups add reach but put your congregation\'s spiritual conversation inside an advertising business.',
      },
      {
        h: 'What to actually check before committing',
        p: 'Who can read prayer requests, and is that enforced by the database or by a promise in the marketing copy? What happens to everything your people wrote if you stop paying. Can you export it? What does year two cost? How are minors handled? Does it work for the member who only has a phone and limited data? Ask those five in writing. The answers, and the willingness to give them, tell you more than any feature list.',
      },
      {
        h: 'The adoption problem is bigger than the feature problem',
        p: 'Almost every church that regrets a platform decision regrets it for the same reason: nobody used it. Assume that anything requiring a new account, a new app and a new habit will lose most of your congregation unless a leader is in there every week giving people a reason to return. Before buying, decide who that person is. If the answer is "the pastor, on top of everything else," look again at the page on being the only one leading.',
      },
      {
        h: 'Where kinwove fits, honestly',
        p: 'kinwove is built for the second and third jobs: Bible study, questions people are nervous to ask out loud, prayer, and sermon discussion that continues through the week. It is in free beta. It does not do check-in, rotas, childcare records or giving, and if those are your actual problem, a church management system is the right category and this is not it. It is also worth knowing it works for individuals, so a leader can try it alone before asking a congregation to sign up for anything.',
      },
    ],
    scriptures: [
      { ref: 'Acts 2:42', text: 'They devoted themselves to the apostles\' teaching and to fellowship, to the breaking of bread and to prayer.' },
      { ref: 'Colossians 3:16', text: 'Let the message of Christ dwell among you richly as you teach and admonish one another with all wisdom.' },
    ],
    faqs: [
      { q: 'Do we need paid software for small groups?', a: 'Often not. Plenty of thriving small groups run on a messaging thread and a printed study guide. Paid tools earn their place when you need privacy boundaries, content that persists, or study material you are not writing yourself.' },
      { q: 'What is the difference between a church management system and a study platform?', a: 'A church management system is an administrative database: membership, giving, rotas, attendance. A study platform is where the spiritual conversation happens. Some products claim both; be sceptical about which half was built first and which was added to complete a feature grid.' },
      { q: 'How do we get people to actually use it?', a: 'One named person posting into it every week, and a real reason to open it, a question people want to answer, a study that continues. Tools do not create habits; someone tending it does.' },
      { q: 'What about churches with older congregations?', a: 'Anything digital has to be additive, never the only channel. If an announcement exists only online, part of your congregation does not have it, and the people most likely to need pastoral care are often the ones least likely to be there.' },
    ],
    related: ['does-my-church-need-an-app', 'how-do-we-organize-our-congregation-online', 'how-do-i-keep-my-congregation-engaged-between-sundays'],
  },
  {
    slug: 'how-do-we-organize-our-congregation-online',
    question: 'How do we organise our congregation online?',
    category: 'For Pastors',
    updated: '2026-09-26',
    answer: 'Decide what has to reach everyone, what is a conversation, and what is private, then give each its own channel. Most church communication problems are one channel doing all three jobs, which is why announcements get missed and prayer requests end up somewhere they should not be.',
    body: [
      {
        h: 'Three channels, not one',
        p: 'Broadcast is anything that must reach everyone: service changes, closures, deaths. Conversation is the ongoing life of the church: study, questions, encouragement. Confidential is prayer and pastoral need. Collapse all three into one group chat and each undermines the others: the announcement is buried under conversation, and someone shares something private in front of two hundred people because it was the only place to say it.',
      },
      {
        h: 'Broadcast should be boring and duplicated',
        p: 'Use something with near-universal reach, keep the volume low enough that people still read it, and always duplicate offline for members who are not online, a notice sheet, a phone call rota. The test of a broadcast channel is whether an urgent message on a Saturday night actually lands. If you are not confident it would, it is not a broadcast channel.',
      },
      {
        h: 'Conversation needs a reason to return',
        p: 'This is where most church spaces die. A forum nobody posts in is worse than none, because the silence is visible. Conversation works when something recurring lives there: the sermon discussion each week, a study people are working through, a question worth answering. Someone has to tend it, and that should be a named person who is not the pastor if at all possible.',
      },
      {
        h: 'Confidential needs a real boundary',
        p: 'Prayer requests routinely contain health information, family breakdown, addiction and mental health. That deserves more than an honour system. Ask any tool you are considering who can technically read it: the answer for a normal group chat is everyone in the group, and for many platforms it is any administrator. Decide deliberately who that should be and tell your congregation plainly, because they are entitled to know before they type.',
      },
      {
        h: 'Write the rules down once',
        p: 'A short, public note on what goes where, who moderates, and what happens if someone is unkind, saves an enormous amount of pastoral repair later. Include what you do with people\'s data and how someone leaves. Churches routinely collect more personal information than they have any plan for.',
      },
    ],
    scriptures: [
      { ref: '1 Corinthians 14:40', text: 'But everything should be done in a fitting and orderly way.' },
      { ref: 'Proverbs 11:13', text: 'A gossip betrays a confidence, but a trustworthy person keeps a secret.' },
      { ref: 'Galatians 6:2', text: 'Carry each other\'s burdens, and in this way you will fulfill the law of Christ.' },
    ],
    faqs: [
      { q: 'Is a group chat enough for a small church?', a: 'For a genuinely small congregation that already knows each other, often yes, for broadcast and conversation. The gap it leaves is confidential prayer, which most churches only notice after something private has been shared with everyone.' },
      { q: 'Should the church have its own space or use social media?', a: 'Social platforms bring reach and cost nothing up front. The trade is that your congregation\'s spiritual conversation sits inside an advertising business, beside a feed designed to pull attention away, and you do not control who sees what.' },
      { q: 'Who should moderate?', a: 'Not the pastor alone. Name two or three people, agree in advance what gets removed, and make sure someone other than the person being complained about can act.' },
      { q: 'What about safeguarding and young people?', a: 'Any space including minors needs a policy before it opens, who has access, whether adults can message children directly, and how concerns are reported. If a platform cannot tell you how it handles this, that is an answer.' },
    ],
    related: ['best-platform-for-church-small-groups', 'church-discussion-board-for-congregations', 'does-my-church-need-an-app'],
  },
  {
    slug: 'church-discussion-board-for-congregations',
    question: 'How do we set up a discussion board for our congregation?',
    category: 'For Pastors',
    updated: '2026-09-26',
    answer: 'The hard part is not setting one up, it is giving people a reason to post. Most church boards die within two months because they launched empty and general. The ones that survive are anchored to something recurring, usually the sermon, and tended by a named person.',
    body: [
      {
        h: 'Why most church boards go quiet',
        p: 'A board launches with a general invitation to discuss anything, which gives nobody a specific reason to be the first to speak. People look, see three posts from the pastor, and do not return. Silence then becomes self-reinforcing, because an empty board signals that nobody is there. The fix is not promotion; it is anchoring it to something that happens every week regardless.',
      },
      {
        h: 'Anchor it to Sunday',
        p: 'The sermon is the one thing your whole congregation shares and already has opinions about. A question posted from it each week, a real question, not a comprehension check, gives people something specific to answer. It also means the board is never empty, because there is new content whether or not anyone replies. Churches that report a working discussion space almost always describe some version of this.',
      },
      {
        h: 'Someone has to tend it, and not the pastor',
        p: 'Every living board has a person who reads everything, replies to the quiet contributors, and makes sure nobody\'s first post sits ignored. That is a real job of maybe twenty minutes a week. It should not default to the pastor: if the pastor is the only voice, it becomes a broadcast channel with a comment box, and members write for approval rather than to each other.',
      },
      {
        h: 'Decide the rules before you need them',
        p: 'Agree in advance what is out of bounds, who can remove a post, and how someone raises a concern about another member. Church boards tend to break on politics, on doctrinal disputes between members, and on one person posting far more than everyone else. All three are much easier to handle with a written norm to point at than as a judgement call about a specific person.',
      },
      {
        h: 'Let people read without joining in',
        p: 'The majority will never post, and that is normal rather than failure. Newcomers especially need to watch for weeks before they are ready to be visible. Forcing an introduction post is one of the reliable ways to lose them. Judge it by whether people are reading and whether the ones who do post get answered, not by how many contribute.',
      },
      {
        h: 'Where kinwove fits',
        p: 'kinwove includes a sermon discussion space of exactly this shape, a question carried through the week, with the congregation able to answer and reply, plus a prayer wall and Bible study alongside it. It is in free beta. It is not a general-purpose forum with categories and threads, so if you want a traditional message board with sub-forums, that is a different kind of product.',
      },
    ],
    scriptures: [
      { ref: 'Proverbs 27:17', text: 'As iron sharpens iron, so one person sharpens another.' },
      { ref: 'Acts 17:11', text: 'They received the message with great eagerness and examined the Scriptures every day to see if what Paul said was true.' },
      { ref: 'Ephesians 4:29', text: 'Do not let any unwholesome talk come out of your mouths, but only what is helpful for building others up.' },
    ],
    faqs: [
      { q: 'How many people do we need for a board to work?', a: 'Fewer than most expect. Twenty engaged members can sustain a weekly conversation. What matters is consistency of the anchor post and someone replying, not headcount.' },
      { q: 'What do we do about arguments?', a: 'Have a stated norm, act early and privately rather than publicly, and be willing to close a thread. Most church board conflicts are not really about the topic, and moving the conversation off the board and into a phone call usually resolves what replies will not.' },
      { q: 'Should posting be anonymous?', a: 'An anonymous option lets people ask things they would never sign their name to, which is often where the real questions are. The trade-off is accountability, so most spaces that offer it keep it to specific areas such as prayer or questions rather than everywhere.' },
      { q: 'Can we just use a Facebook group?', a: 'Many churches do, and the reach is genuine. The trade-offs are that not everyone has an account, the conversation sits next to an attention-optimised feed, and you do not own or control the space.' },
    ],
    related: ['how-do-we-organize-our-congregation-online', 'best-platform-for-church-small-groups', 'how-do-i-keep-my-congregation-engaged-between-sundays'],
  },
  {
    slug: 'online-bible-study-platform-for-churches',
    question: 'What should we look for in an online Bible study platform?',
    category: 'For Pastors',
    updated: '2026-09-26',
    answer: 'Look at what it does when someone asks a hard question. Study tools are easy to compare on features and hard to compare on the thing that matters, whether a member with a real doubt gets a serious answer or a deflection that teaches them not to ask again.',
    body: [
      {
        h: 'The feature list is the least useful comparison',
        p: 'Every product in this category has reading plans, notes, highlights and a search. Those are table stakes and they look identical on a website. What separates them is editorial: which translations, whose commentary, what happens at the edges where Christians disagree, and whether the tool will admit uncertainty. None of that appears on a pricing page.',
      },
      {
        h: 'Test it with the question your members actually have',
        p: 'Before deciding, put a genuinely hard question into whatever you are evaluating. Did Judas go to heaven. Why does Genesis 1 not match Genesis 2. Why did God command what he commanded in Joshua. A tool that hands back confident certainty where the church has argued for centuries will eventually embarrass you in front of a member who knows better. One that says "Christians differ here, and this is why" is safe to put in front of a congregation.',
      },
      {
        h: 'Ask where the answers come from',
        p: 'If a platform uses AI, most new ones do, ask what it is grounded in, whether it cites what it draws on, and what it does when it does not know. AI that fabricates a plausible-sounding commentary attribution is worse than no AI, because it is wrong in a register that sounds authoritative. Ask also whether a member\'s conversations are private from church staff, and be clear with your congregation either way.',
      },
      {
        h: 'Consider who it is for',
        p: 'Tools built for seminary-trained users assume vocabulary most congregations do not have. Tools built for daily devotion often cannot go deep enough for someone in real difficulty. Be honest about which of your people you are buying for, and whether the sceptic, the new believer and the forty-year member can all use the same thing.',
      },
      {
        h: 'What kinwove does and does not do',
        p: 'kinwove is built around asking: tap any verse for a plain explanation, the historical context, cross-references, the underlying Hebrew or Greek, or a comparison of translations, and ask follow-up questions in plain language. It answers honestly where Christians disagree and says when it does not know, which is the test above. It is in free beta. It has no curriculum library, no video content and no group-admin tooling, so a church wanting a packaged course to run on a projector is better served elsewhere.',
      },
    ],
    scriptures: [
      { ref: '2 Timothy 2:15', text: 'Do your best to present yourself to God as one approved, a worker who does not need to be ashamed and who correctly handles the word of truth.' },
      { ref: 'Acts 8:30–31', text: '"Do you understand what you are reading?" "How can I," he said, "unless someone explains it to me?"' },
      { ref: 'Nehemiah 8:8', text: 'They read from the Book of the Law of God, making it clear and giving the meaning so that the people understood what was being read.' },
    ],
    faqs: [
      { q: 'Is it safe to let AI answer Bible questions?', a: 'It depends entirely on how it behaves at the limits. The risks are confident invention and flattening genuine disagreement into one answer. Test it with a contested question before putting it in front of your congregation, and prefer tools that cite and that will say they do not know.' },
      { q: 'Will this replace our in-person study?', a: 'It should not, and the good ones do not try. What a tool adds is the six days between meetings. The question someone has on Wednesday that will be forgotten by the next gathering.' },
      { q: 'What about members who ask things they would not say in group?', a: 'That is the strongest argument for having one. A great deal of honest doubt never gets voiced in a room, and a private place to ask often surfaces what pastoral conversation never reaches.' },
      { q: 'How much should this cost?', a: 'The range runs from free to per-seat subscriptions. Judge it on whether members will actually use it: an unused paid platform is the most common outcome in this category, and it is not primarily a pricing failure.' },
    ],
    related: ['best-platform-for-church-small-groups', 'should-my-church-use-ai', 'church-discussion-board-for-congregations'],
  },
  // ── 6 Oct 2026: pastor + seeker + study-tool pages (teardown gaps) ──────────
  // Written to be found and cited. No dashes. kinwove is the natural answer at
  // the end of each, never a pitch (matches the existing pastor pages).
  {
    slug: 'why-wont-my-congregation-use-our-church-app',
    question: 'Why won’t my congregation use the church app we pay for?',
    category: 'For Pastors',
    updated: '2026-10-06',
    answer: 'Usually because most church apps are broadcast tools: announcements, giving, sermon audio. There is nothing for a member to do during the week. People open an app that answers a real question at 11pm, or lets them pray for someone by name. Adoption follows usefulness, not features.',
    body: [
      { h: 'Most church apps talk, they do not listen', p: 'A feed of announcements, a giving button and last week’s sermon are things you push at people. None of them gives a member a reason to open the app on a Tuesday. An app people actually use answers something, or lets them do something, when they are alone and thinking about their faith.' },
      { h: 'The week is where faith is lived, and where the app has to earn its place', p: 'Sunday is covered. The question a member sits with is on Wednesday, when the sermon has faded and the week has no room for it. An app that meets them there gets opened. One that only repeats Sunday does not.' },
      { h: 'Start with what a person needs, not what the church wants to send', p: 'A place to ask a hard question privately, a prayer wall where their name is actually seen, the week’s sermon turned into something to chew on. These pull people back. Push features (notices, campaigns) do not, however well built.' },
      { h: 'Free removes the other barrier', p: 'A paid app the church bought still has to be worth the member’s time. A free one they can simply try lowers the cost of the first open to nothing, which is where adoption actually starts. kinwove is free, and built around what a member does midweek rather than what the office sends out.' },
    ],
    scriptures: [
      { ref: 'Deuteronomy 6:7', text: 'Impress them on your children. Talk about them when you sit at home and when you walk along the road, when you lie down and when you get up.' },
      { ref: '1 Thessalonians 5:11', text: 'Therefore encourage one another and build each other up, just as in fact you are doing.' },
    ],
    faqs: [
      { q: 'Should we build our own app?', a: 'Rarely worth it for a single church. The cost is not the build, it is the years of upkeep and the adoption problem, which a custom app does not solve on its own.' },
      { q: 'How do we get people to download it?', a: 'Give them a reason that lives in the week, not just at launch. A prayer wall with their name on it, or a place to ask what they could not ask on Sunday, does more than a QR code in the bulletin.' },
      { q: 'Is a group chat enough?', a: 'For announcements, often. But a chat does not hold a prayer wall, a private question, or sermon follow-up, and it buries anything that matters under everything that does not.' },
    ],
    related: ['does-my-church-need-an-app', 'how-do-i-keep-my-congregation-engaged-between-sundays'],
  },
  {
    slug: 'small-church-alternative-to-expensive-church-software',
    question: 'What can a small church do instead of expensive church software?',
    category: 'For Pastors',
    updated: '2026-10-06',
    answer: 'Most small churches need three things, not a platform: a way to talk between Sundays, a prayer wall, and sermon follow-up. You can have all three free. The heavy admin suites (check-in, accounting, scheduling) are worth paying for once you are big enough to feel their absence, and not before.',
    body: [
      { h: 'Name what you actually need first', p: 'The big church platforms bundle twenty tools because they sell to large staffs. A small church usually feels the lack of three: connection during the week, a shared place to pray, and a way to keep a sermon alive past Sunday. Buy for the need you have, not the feature list.' },
      { h: 'The three that matter can be free', p: 'A community space, a prayer wall, and sermon discussion do not require a budget line. kinwove gives a church those at no cost, which for most congregations under a couple of hundred people is the whole job.' },
      { h: 'When paid software earns its price', p: 'Child check-in, giving and accounting, room and volunteer scheduling. When those start eating your week by hand, a paid suite pays for itself. Until then it is mostly shelfware you are talking people into using.' },
      { h: 'Small is an advantage here', p: 'A small church can get everyone onto something simple in a week, which a large one cannot. Start with the free pieces, prove people use them, and add paid tools only where a real task is still being done by hand.' },
    ],
    scriptures: [
      { ref: 'Acts 2:46', text: 'Every day they continued to meet together in the temple courts. They broke bread in their homes and ate together with glad and sincere hearts.' },
      { ref: 'Luke 14:28', text: 'Suppose one of you wants to build a tower. Won’t you first sit down and estimate the cost to see if you have enough money to complete it?' },
    ],
    faqs: [
      { q: 'Is free church software actually any good?', a: 'For connection, prayer and sermon follow-up, yes. Free does not mean limited here; it means the cost is carried elsewhere, not by a small church’s budget.' },
      { q: 'What about giving and donations?', a: 'That is one area where a dedicated, paid tool is usually worth it for the security and records. You can run giving separately from the community side.' },
      { q: 'Will we outgrow the free tools?', a: 'Some churches do and add paid admin software on top. The connection, prayer and study layer tends to stay useful at any size.' },
    ],
    related: ['does-my-church-need-an-app', 'best-platform-for-church-small-groups'],
  },
  {
    slug: 'keep-up-with-prayer-requests-without-burning-out',
    question: 'How do I keep up with my congregation’s prayer requests without burning out?',
    category: 'For Pastors',
    updated: '2026-10-06',
    answer: 'The usual problem is that every request routes through one person: you. A shared prayer wall and a small care team spread the load, so people are prayed for and followed up without the whole weight landing on the pastor. You stay in it; you just stop being the only one in it.',
    body: [
      { h: 'The bottleneck is you, and it is not sustainable', p: 'When every prayer request comes to the pastor by text, in the foyer, or after the service, two things happen: some get lost, and you carry all of them alone. Neither serves the person who asked.' },
      { h: 'A prayer wall makes the request visible to more than one person', p: 'When a request is somewhere the whole church can see and pray, the person is held by the body, not just the pastor. That is closer to how the New Testament describes a church praying anyway.' },
      { h: 'A care team shares the follow-up', p: 'A few trusted people who receive and respond to requests mean no one slips through and no one person burns out. The pastor sees what needs a pastor; the rest is genuinely shared.' },
      { h: 'What this protects', p: 'Not your inbox, your capacity to keep doing this for years. A pastor who carries every request alone does not last. kinwove has a prayer wall and a care team built for exactly this, so requests are seen and answered without routing through one exhausted person.' },
    ],
    scriptures: [
      { ref: 'Galatians 6:2', text: 'Carry each other’s burdens, and in this way you will fulfill the law of Christ.' },
      { ref: 'James 5:16', text: 'Therefore confess your sins to each other and pray for each other so that you may be healed. The prayer of a righteous person is powerful and effective.' },
    ],
    faqs: [
      { q: 'Should prayer requests be public?', a: 'Give people the choice. A wall that lets someone post openly, by topic, or privately to a care team covers the sensitive ones without losing the shared ones.' },
      { q: 'What if I miss one?', a: 'That is the risk when everything routes through you. Spreading requests across a wall and a care team is what stops things being missed.' },
      { q: 'Isn’t delegating prayer less pastoral?', a: 'The opposite. A church praying for its own is the goal; the pastor doing it alone is the bottleneck, not the ideal.' },
    ],
    related: ['what-do-i-do-when-im-the-pastor-who-is-burned-out', 'im-the-only-one-leading-my-church'],
  },
  {
    slug: 'how-to-start-small-groups-that-dont-fizzle-out',
    question: 'How do I start small groups that don’t fizzle out?',
    category: 'For Pastors',
    updated: '2026-10-06',
    answer: 'Groups die in the gap between meetings. A group that meets Thursday has six other days with nothing holding it together, so by the next Thursday the thread is gone. Give the group a shared space with the week’s study and a prayer thread, and it stays alive on the days it is not in a room.',
    body: [
      { h: 'The meeting is not the problem, the week is', p: 'Most small groups are fine in the room. They fade because nothing connects one meeting to the next. People forget what was said, miss a week, and quietly drop off, not because they stopped caring but because there was nothing to hold onto between.' },
      { h: 'Give the group something shared to return to', p: 'A space with the week’s passage or question, where people can add a thought or a prayer before the next meeting, keeps the group present in members’ lives on the days they are apart. That continuity is what turns attenders into a group.' },
      { h: 'Make it easy to pray for each other midweek', p: 'A prayer thread inside the group means a request on Tuesday is held by the group by Thursday. That is where the bond forms, not in the lesson.' },
      { h: 'Keep the barrier low', p: 'Groups fizzle when the tools are a hassle. A simple shared space people already have on their phone, free, with the study and the prayers in one place, is what keeps a group going. kinwove gives groups exactly that.' },
    ],
    scriptures: [
      { ref: 'Hebrews 10:24-25', text: 'And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together, as some are in the habit of doing, but encouraging one another.' },
      { ref: 'Ecclesiastes 4:9-10', text: 'Two are better than one, because they have a good return for their labor: If either of them falls down, one can help the other up.' },
    ],
    faqs: [
      { q: 'How big should a small group be?', a: 'Small enough that everyone speaks, usually under a dozen. What keeps it alive is the connection between meetings more than the size.' },
      { q: 'What do we do between meetings?', a: 'Not much, and that is the point: a shared space with the week’s study and a prayer thread does the holding without asking anyone to do homework.' },
      { q: 'Our groups keep losing people. Why?', a: 'Almost always the gap between meetings. Nothing carries the group through the week, so each meeting starts from cold.' },
    ],
    related: ['best-platform-for-church-small-groups', 'online-bible-study-platform-for-churches'],
  },
  {
    slug: 'how-do-i-shepherd-people-who-only-come-on-sunday',
    question: 'How do I shepherd the people who only come on Sunday?',
    category: 'For Pastors',
    updated: '2026-10-06',
    answer: 'You cannot shepherd someone you only meet once a week in a crowd. The shepherding happens in the week, in the small moments a Sunday service has no room for: a question they can ask, a prayer they can share, a place they are seen. The goal is not more services, it is a way to be present between them.',
    body: [
      { h: 'Sunday is a crowd, not a conversation', p: 'You can preach to a room of two hundred; you cannot know a room of two hundred. For the person who only comes Sunday, you are a voice from the front, and they are a face you half recognise. That is not anyone’s fault, it is the format.' },
      { h: 'The week is where knowing happens', p: 'A member becomes known when they ask something, share a burden, or show up in a smaller way than a service. If the only touchpoint is Sunday, there is no room for any of that, and people stay strangers inside their own church.' },
      { h: 'Lower the cost of reaching out', p: 'Most people will not call the pastor or come to an event. They will tap a question, add a prayer, or reply in a thread. Meeting them at that low bar is how the once-a-week attender becomes someone you actually pastor.' },
      { h: 'A place to be seen without a program', p: 'Not another meeting to run, a space that is simply there during the week: ask, pray, be noticed. kinwove gives a congregation that, so the Sunday-only member has a way in that does not depend on the pastor spotting them in a crowd.' },
    ],
    scriptures: [
      { ref: 'John 10:14', text: 'I am the good shepherd; I know my sheep and my sheep know me.' },
      { ref: 'Ezekiel 34:12', text: 'As a shepherd looks after his scattered flock when he is with them, so will I look after my sheep.' },
    ],
    faqs: [
      { q: 'How do I reach people who never come to midweek events?', a: 'Meet them where they already are, on their phone, with a low-effort way to ask, pray or be seen. Events ask people to show up; the week-long space meets them without that.' },
      { q: 'Is this just more work for the pastor?', a: 'It should be less. A shared space plus a care team means the quiet member is seen by the body, not only by you.' },
      { q: 'What about older members not on their phones?', a: 'They are usually the ones a phone-based tool is not for, and that is fine. This reaches the ones a Sunday-only rhythm loses, which skews younger.' },
    ],
    related: ['how-do-i-keep-my-congregation-engaged-between-sundays', 'why-are-young-adults-leaving-our-church'],
  },
  {
    slug: 'what-is-the-unforgivable-sin',
    question: 'What is the unforgivable sin, and have I committed it?',
    category: 'Grace',
    updated: '2026-10-06',
    answer: 'Jesus called it blasphemy against the Holy Spirit: a settled, final rejection of God, attributing the work of his Spirit to evil. If you are worried you have committed it, that worry is itself strong evidence you have not. The hardened heart it describes does not lie awake afraid it has gone too far.',
    body: [
      { h: 'What Jesus actually said', p: 'In Mark 3 and Matthew 12, Jesus speaks of blasphemy against the Holy Spirit as unforgivable. He says it to religious leaders who watched him heal and called it the work of the devil, looking straight at God’s goodness and naming it evil, with their eyes open.' },
      { h: 'Why the fear is the clue', p: 'The sin describes a heart so hard it no longer wants God and feels no pull toward him. Someone afraid they have committed it is grieved, wants to be forgiven, and is reaching toward God. That very desire is the opposite of the hardness Jesus named. The worry is the evidence against the worst.' },
      { h: 'This is often anxiety, not theology', p: 'Many people tormented by this question are dealing with fear, scrupulosity or a harsh picture of God more than an actual act. The answer is not a cleverer argument but the plain truth that God has never turned away someone who came back to him.' },
      { h: 'Where to take it', p: 'If this fear sits on you, it is worth talking through slowly rather than carrying alone at 2am. kinwove can walk through what Jesus meant with you, in your own words, as long as you need, and point you to a pastor or counsellor when that is what helps.' },
    ],
    scriptures: [
      { ref: 'Mark 3:28-29', text: 'Truly I tell you, people can be forgiven all their sins and every slander they utter, but whoever blasphemes against the Holy Spirit will never be forgiven; they are guilty of an eternal sin.' },
      { ref: '1 John 1:9', text: 'If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.' },
    ],
    faqs: [
      { q: 'I think I said something terrible about God. Is that it?', a: 'A blurted word, especially in pain or anger, is not the settled rejection Jesus described. Scripture is full of people who said hard things to God and were not cast off.' },
      { q: 'Why does this fear feel so strong?', a: 'Because it attacks the thing you most want to be true. That is often a sign of a tender conscience, not a lost one, and it is worth talking through rather than ruminating on.' },
      { q: 'Can God forgive anything else?', a: 'Yes. The whole weight of the New Testament is that no sin is beyond grace for the person who turns back.' },
    ],
    related: ['will-god-forgive-me', 'am-i-too-far-gone-for-god'],
  },
  {
    slug: 'can-i-lose-my-salvation',
    question: 'Can I lose my salvation?',
    category: 'Salvation',
    updated: '2026-10-06',
    answer: 'Sincere Christians land in different places on this. Many point to Jesus saying no one can snatch his sheep from his hand, and to Paul saying nothing can separate us from God’s love. Others read the warnings in Hebrews seriously. What nearly all agree on: a single sin or a hard season does not undo you, and a heart that wants God is not a heart God is discarding.',
    body: [
      { h: 'Two honest readings', p: 'One stresses God’s keeping: salvation rests on what Christ did, and he holds his people to the end. The other takes the New Testament’s warnings about falling away at face value. Both are held by serious Christians reading the same Bible carefully, and this page will not pretend the debate is settled.' },
      { h: 'The verses people lean on', p: 'For security: Jesus in John 10, that no one can snatch his sheep from his hand, and Paul in Romans 8, that nothing can separate us from the love of God. For caution: the warnings in Hebrews against turning away. Honest faith holds both in view rather than quoting one and ignoring the other.' },
      { h: 'What the question is usually underneath', p: 'Most people asking are not running a theology debate. They are afraid a sin, a doubt, or a cold stretch has already cost them God. On that, the Bible is not ambiguous: turning back is always open, and the father runs toward the returning child.' },
      { h: 'Where to take the fear', p: 'If this is keeping you up, the useful next step is to talk it through with the actual verses in front of you, not to spiral. kinwove can walk through both readings honestly and sit with the fear underneath, and point you to a pastor when that is the right call.' },
    ],
    scriptures: [
      { ref: 'John 10:28', text: 'I give them eternal life, and they shall never perish; no one will snatch them out of my hand.' },
      { ref: 'Romans 8:38-39', text: 'For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, will be able to separate us from the love of God.' },
    ],
    faqs: [
      { q: 'I sinned badly after becoming a Christian. Am I out?', a: 'No. Scripture’s pattern is confession and return, not expulsion for a fall. The door back is always open.' },
      { q: 'Why do Christians disagree on this?', a: 'Because the Bible holds both strong assurances and real warnings, and faithful people weigh them differently. It is a genuine, old disagreement, not a trick.' },
      { q: 'Does doubt mean I’ve lost it?', a: 'No. Doubt is something faith passes through, not proof it is gone. Many strong believers have walked long seasons of it.' },
    ],
    related: ['does-god-love-me', 'how-can-i-believe-when-i-have-doubts'],
  },
  {
    slug: 'is-it-okay-to-be-angry-at-god',
    question: 'Is it okay to be angry at God?',
    category: 'Faith & Doubt',
    updated: '2026-10-06',
    answer: 'Yes. The Bible is full of people who brought God their anger, and he did not strike them down for it. A third of the Psalms are laments, some of them furious. Job accused God to his face. Honest anger brought to God is a form of relationship, not the end of one. What harms faith is not the anger; it is the silence that walks away.',
    body: [
      { h: 'Scripture takes anger to God, not around him', p: 'The Psalms shout, question and accuse. Job demands an answer and does not get a tidy one. Jeremiah tells God he feels deceived. These are in the Bible on purpose: they show that faith has room for rage, and that God would rather have your anger than your absence.' },
      { h: 'Anger is usually grief with nowhere to go', p: 'People get angry at God over loss, injustice, a prayer that went unanswered. Underneath the anger is almost always pain. Naming it to God is how the pain starts to move, rather than hardening into distance.' },
      { h: 'The danger is not the anger, it is the turning away', p: 'What quietly ends a faith is not a hard word thrown at God; it is deciding he is not worth talking to anymore. The angry psalmists stayed in the conversation, and that is why they came out the other side.' },
      { h: 'Somewhere to say it', p: 'If you are angry at God and have nowhere to put it, that is worth more than a verse thrown at it. kinwove can sit with the anger and the loss underneath it, in your own words, without rushing you to feel better, and point you to a person when that is what you need.' },
    ],
    scriptures: [
      { ref: 'Psalm 13:1-2', text: 'How long, Lord? Will you forget me forever? How long will you hide your face from me? How long must I wrestle with my thoughts?' },
      { ref: 'Lamentations 3:19-20', text: 'I remember my affliction and my wandering, the bitterness and the gall. I well remember them, and my soul is downcast within me.' },
    ],
    faqs: [
      { q: 'Isn’t it a sin to be angry at God?', a: 'The Bible treats honest lament as part of faith, not a sin. It records it without condemning it. What it warns against is hardening and walking away.' },
      { q: 'What do I do with the anger?', a: 'Bring it to God plainly, the way the Psalms do. Say the real thing. Anger spoken to God tends to move; anger swallowed tends to calcify.' },
      { q: 'Will God be offended?', a: 'He already knows what you feel. Saying it is honesty, not news to him, and the Bible shows him meeting people who did exactly that.' },
    ],
    related: ['why-does-god-feel-so-far-away', 'why-does-god-allow-suffering'],
  },
  {
    slug: 'how-do-i-study-the-bible-deeper-on-my-own',
    question: 'How do I study the Bible deeper on my own?',
    category: 'Bible',
    updated: '2026-10-06',
    answer: 'Go slower, not wider. Pick one book and stay in it. Read a passage, then ask three questions: what does it say, what did it mean to the first readers, and what does it ask of me. The depth comes from asking better questions of a smaller passage, not from covering more ground.',
    body: [
      { h: 'Depth is narrow, not broad', p: 'Reading the whole Bible in a year is a fine habit, but it is not the same as studying. To go deeper, shrink the field: one book, read slowly, the same passage revisited. You learn more from Philippians read five times than from five books read once.' },
      { h: 'Three questions open almost any passage', p: 'What does it actually say (read it twice, notice the words). What did it mean to the people who first heard it (who wrote it, to whom, why). What does it ask of me now. Most good Bible study is those three questions asked honestly, in that order.' },
      { h: 'Get the context the passage assumes', p: 'A verse means what it meant in its chapter, its book and its moment. A quick read of who wrote it and why, before you apply it, stops most misreadings. This is where a good study tool earns its place: answering "what’s going on here" the moment the question arises.' },
      { h: 'Ask your questions out loud', p: 'The questions that come up mid-passage are the study. Having somewhere to ask them, and get a grounded, sourced answer without closing the book, is what keeps a solo study going. kinwove is built for exactly that: ask anything about the passage in front of you and keep reading.' },
    ],
    scriptures: [
      { ref: 'Psalm 1:2', text: 'But whose delight is in the law of the Lord, and who meditates on his law day and night.' },
      { ref: '2 Timothy 2:15', text: 'Do your best to present yourself to God as one approved, a worker who does not need to be ashamed and who correctly handles the word of truth.' },
    ],
    faqs: [
      { q: 'Which Bible book should I start with?', a: 'A Gospel like Mark or John, or a short letter like Philippians. Start where Jesus is clearest and the book is short enough to reread.' },
      { q: 'Do I need commentaries?', a: 'They help, but you can go a long way with the three questions and a tool that answers context as you read. Add commentaries when a passage keeps puzzling you.' },
      { q: 'How long should I spend?', a: 'Fifteen focused minutes on one passage beats an hour of skimming. Consistency and attention matter more than length.' },
    ],
    related: ['how-do-i-read-the-bible-as-a-beginner', 'can-ai-help-me-study-the-bible'],
  },
  {
    slug: 'can-ai-help-me-study-the-bible',
    question: 'Can AI help me study the Bible?',
    category: 'Bible',
    updated: '2026-10-06',
    answer: 'Yes, for a specific job: answering the questions that come up as you read, the moment they come up, with the passage and context in front of you. It is a study companion, not an authority. Use it to open a passage and point you to scripture, not to replace reading the Bible, a church, or a pastor.',
    body: [
      { h: 'What AI is genuinely good at here', p: 'You hit a word, a name, a custom, a hard verse, and normally the question goes unanswered because reaching for a commentary breaks the flow. A good AI companion answers it right there, in plain language, and sends you back to the text. That is a real gain for solo study.' },
      { h: 'What it is not', p: 'It is not the Holy Spirit, a pastor, or the final word. It can be confident and wrong, and it should always be checked against the actual scripture it cites. Treat it like a knowledgeable friend reading alongside you, not a verdict.' },
      { h: 'Use it to go to the text, not around it', p: 'The right use keeps you in the Bible: ask, get a grounded answer with the references, then read those for yourself. The wrong use is letting it summarise so you never open the passage. A tool that always points back to scripture is doing its job.' },
      { h: 'What to look for in one', p: 'Honesty about uncertainty, references you can check, and no pressure. kinwove is built this way on purpose: it answers in your own language, cites the scripture, says when a question is genuinely debated, and never hard-sells a conclusion.' },
    ],
    scriptures: [
      { ref: 'Acts 17:11', text: 'Now the Berean Jews were of more noble character than those in Thessalonica, for they received the message with great eagerness and examined the Scriptures every day to see if what Paul said was true.' },
      { ref: 'John 16:13', text: 'But when he, the Spirit of truth, comes, he will guide you into all the truth.' },
    ],
    faqs: [
      { q: 'Is it wrong to use AI for Bible study?', a: 'Not if you use it as a companion that points you to scripture and a church, rather than as a replacement for either. Check what it says against the Bible it cites.' },
      { q: 'Will it just tell me what I want to hear?', a: 'A poor one might. A good one names where faithful Christians disagree and sends you to the text instead of settling it for you. That honesty is what to look for.' },
      { q: 'Can it replace my pastor or my church?', a: 'No, and it should not try. It is useful between Sundays and in the questions you would not take to anyone; it points you toward people, not away from them.' },
    ],
    related: ['how-do-i-study-the-bible-deeper-on-my-own', 'should-my-church-use-ai'],
  },

  // ── Famous verses explained (added 2026-11-02). Verse text is the NIV, fetched
  // from api.bible, not typed from memory.
  {
    slug: 'what-does-john-3-16-mean',
    question: `What does John 3:16 mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `John 3:16 says that God loved the whole world so much that he gave his only Son, Jesus, so that anyone who trusts him will not be lost but will have life that lasts forever. It is often called the Bible in one sentence: God's love comes first, the gift is Jesus, and the way in is trust, open to anyone.`,
    body: [
      { h: `Where it comes from`, p: `Jesus is talking at night with Nicodemus, a respected religious teacher who has come with honest questions (John 3:1-21). Jesus has just told him he must be "born again", and verse 16 explains why that new start is possible: it begins with God's love, not with anything Nicodemus does.` },
      { h: `"The world" means everyone`, p: `In John's Gospel "the world" usually means humanity turned away from God. The surprise is that God loves exactly that world, not just good people or one nation. Nobody is outside the reach of this verse.` },
      { h: `"Believes" means trust, not just agreement`, p: `To believe in Jesus here is to rely on him, the way you trust a bridge by walking onto it. And "eternal life" in John is not only life after death; it is a new quality of life with God that starts now (John 17:3).` },
      { h: `Read the next verse too`, p: `John 3:17 adds that God did not send his Son to condemn the world but to save it. The heart of the passage is rescue, not threat.` },
    ],
    scriptures: [
      { ref: `John 3:16`, text: `For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.` },
    ],
    faqs: [
      { q: `Who is speaking in John 3:16?`, a: `Most readers take it as Jesus speaking to Nicodemus, though some scholars think the Gospel writer begins commenting around verse 16. The meaning is the same either way.` },
      { q: `What does "perish" mean in John 3:16?`, a: `To be lost, cut off from the life God gives. The verse sets it against eternal life, so it is about two directions a life can go.` },
      { q: `Why is John 3:16 so famous?`, a: `Because it says the whole Christian message in one sentence: God's love, the gift of Jesus, trust as the response, and life as the result.` },
    ],
    related: ['what-is-the-gospel', 'does-god-love-me'],
  },

  {
    slug: 'what-does-jeremiah-29-11-mean',
    question: `What does Jeremiah 29:11 mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `Jeremiah 29:11 is God's promise to Jewish exiles in Babylon that he had not abandoned them and still had a good future planned, even though it would come after seventy years, not right away. It is a real promise of hope, but it was given to a whole people in a long hardship, not a guarantee that any one plan of ours will work out quickly.`,
    body: [
      { h: `The setting matters`, p: `Jeremiah wrote this as a letter to people who had been forced from their homes to Babylon. False prophets were telling them they would be home in two years. Jeremiah told them the opposite: settle in, build houses, plant gardens, pray for the city you are in, because this will take seventy years (Jeremiah 29:4-10).` },
      { h: `So what is the promise?`, p: `That God's plans for them were for peace and not disaster, and that the hard years were not the end of the story. Many of those who first heard it would not live to see the return. The hope was bigger than their own lifetimes.` },
      { h: `Can Christians apply it to themselves?`, p: `Many do, and the character of God it shows is the same today: he does not forget people in hard places. The honest way to hold it is as a promise that God is good and present in a long wait, rather than a promise that things will go our way soon.` },
    ],
    scriptures: [
      { ref: `Jeremiah 29:11`, text: `“For I know the plans I have for you,” declares the Lord, “plans to prosper you and not to harm you, plans to give you hope and a future.` },
      { ref: `Jeremiah 29:10`, text: `This is what the Lord says: “When seventy years are completed for Babylon, I will come to you and fulfill my good promise to bring you back to this place.` },
    ],
    faqs: [
      { q: `Who was Jeremiah 29:11 written to?`, a: `To the Jewish people taken into exile in Babylon around 597 BC, in a letter Jeremiah sent from Jerusalem.` },
      { q: `Is Jeremiah 29:11 taken out of context?`, a: `It often is, when it is read as a promise of quick success. In context it is a promise of hope that holds through a long, hard season.` },
      { q: `What does "prosper" mean here?`, a: `The Hebrew word is shalom: peace, wholeness and wellbeing, not mainly money.` },
    ],
    related: ['how-do-i-know-gods-will-for-my-life', 'why-does-god-feel-so-far-away'],
  },

  {
    slug: 'what-does-philippians-4-13-mean',
    question: `What does Philippians 4:13 mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `In Philippians 4:13 Paul says he can face anything, having plenty or going hungry, because Christ gives him strength. It is about contentment in every situation, not a promise that we can achieve any goal we set. Paul wrote it from prison.`,
    body: [
      { h: `Read the two verses before it`, p: `Paul has just said he has learned to be content whether well fed or hungry, living in plenty or in want (Philippians 4:11-12). "All this" in verse 13 points back to those situations. The strength is for enduring both good and hard times well.` },
      { h: `Written in chains`, p: `Paul was in custody when he wrote Philippians, not sure whether he would live (Philippians 1:20-21). The verse comes from someone who had lost a great deal and found that Christ was enough anyway.` },
      { h: `What it means for us`, p: `It is a deep comfort for someone in a hard season: you are not left to carry it on your own strength. It is less a promise of winning and more a promise of not being alone in whatever comes.` },
    ],
    scriptures: [
      { ref: `Philippians 4:13`, text: `I can do all this through him who gives me strength.` },
      { ref: `Philippians 4:11-12`, text: `I am not saying this because I am in need, for I have learned to be content whatever the circumstances. I know what it is to be in need, and I know what it is to have plenty. I have learned the secret of being content in any and every situation, whether well fed or hungry, whether living in plenty or in want.` },
    ],
    faqs: [
      { q: `Does Philippians 4:13 mean I can do anything?`, a: `Not in the sense of achieving any goal. In context it means Christ gives strength to stay content and faithful in every circumstance, good or bad.` },
      { q: `Why do some Bibles say "all things" and others "all this"?`, a: `The Greek simply says "all things". Some translations, like the NIV, write "all this" to show it refers to the situations Paul has just listed.` },
      { q: `Where was Paul when he wrote it?`, a: `In custody, most likely in Rome, waiting to hear whether he would be released or executed.` },
    ],
    related: ['what-does-the-bible-say-about-money', 'what-does-the-bible-say-about-fear'],
  },

  {
    slug: 'what-does-romans-8-28-mean',
    question: `What does Romans 8:28 mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `Romans 8:28 says that God works in all things for the good of those who love him. It does not say everything that happens is good. It says God can bring good even out of what is painful, and the "good" the next verses describe is becoming like Jesus, not an easy life.`,
    body: [
      { h: `Not "everything is good"`, p: `Paul has just written about creation groaning, believers groaning, and the Spirit praying with groans too deep for words (Romans 8:22-26). He is not pretending suffering is good. He is saying God is at work inside it.` },
      { h: `Translations read it slightly differently`, p: `Some Bibles say "God works for the good", others "all things work together for good". The Greek can be read either way. Most scholars think Paul means God himself is the one working, which fits the verses around it.` },
      { h: `What "good" means here`, p: `The next verse says God's purpose is for his people "to be conformed to the image of his Son" (Romans 8:29). The good is becoming like Jesus and belonging to God, a good that suffering cannot take away. The chapter ends by saying nothing can separate us from God's love (Romans 8:38-39).` },
      { h: `A word of care`, p: `This verse is meant for comfort, but it can hurt when quoted too quickly to someone in fresh grief. It is often better held quietly, alongside someone, than offered as an answer.` },
    ],
    scriptures: [
      { ref: `Romans 8:28`, text: `And we know that in all things God works for the good of those who love him, who have been called according to his purpose.` },
    ],
    faqs: [
      { q: `Does Romans 8:28 mean bad things happen for a reason?`, a: `It says God works in all things for good, not that every bad thing was good or sent on purpose. Christians differ on how much God directly causes, but agree he can redeem what is broken.` },
      { q: `Who is Romans 8:28 for?`, a: `Paul addresses "those who love him, who have been called according to his purpose", that is, followers of Jesus.` },
      { q: `What is the context of Romans 8:28?`, a: `A chapter about the Spirit's help in suffering, ending with the promise that nothing can separate us from God's love.` },
    ],
    related: ['why-does-god-allow-suffering', 'what-does-the-bible-say-about-grief'],
  },

  {
    slug: 'what-does-proverbs-3-5-6-mean',
    question: `What does Proverbs 3:5-6 mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `Proverbs 3:5-6 says to trust God with your whole heart instead of relying only on your own understanding, and to acknowledge him in everything you do, and he will make your paths straight. It is not anti-thinking; it is about not making yourself the final judge of what is wise.`,
    body: [
      { h: `"With all your heart"`, p: `In Hebrew thinking the heart is not just feelings; it is the centre of thinking, choosing and wanting. Trusting with all your heart means bringing your whole self, decisions included, to God.` },
      { h: `"Lean not on your own understanding"`, p: `Proverbs is a book that loves wisdom and careful thought. So this does not mean switching your mind off. It means not resting your full weight on what you can see and figure out, because your view is limited.` },
      { h: `"He will make your paths straight"`, p: `A straight path is one that leads where it should without needless detours. Proverbs presents this as the general pattern of a life lived with God, not a promise that every road will be easy.` },
    ],
    scriptures: [
      { ref: `Proverbs 3:5-6`, text: `Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.` },
    ],
    faqs: [
      { q: `What does "submit to him" mean in Proverbs 3:6?`, a: `Older translations say "acknowledge him". It means recognising God in every part of life, not just the religious parts.` },
      { q: `Does Proverbs 3:5 mean I should not think things through?`, a: `No. Proverbs constantly praises wisdom and good counsel. It warns against trusting only yourself.` },
      { q: `Who wrote Proverbs 3?`, a: `Proverbs is traditionally linked with King Solomon, written as a parent's advice to a child.` },
    ],
    related: ['how-do-i-know-gods-will-for-my-life', 'what-is-faith'],
  },

  {
    slug: 'what-does-isaiah-41-10-mean',
    question: `What does Isaiah 41:10 mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `Isaiah 41:10 is God telling his people not to be afraid, because he is with them, he is their God, and he will strengthen, help and hold them up. It was first spoken to a frightened people facing exile and powerful empires, and it is one of the Bible's most direct answers to fear.`,
    body: [
      { h: `Who first heard it`, p: `These words speak to Israel at a time when great empires were rising and the nation felt small and exposed. God calls them "my servant" and reminds them he chose them and has not rejected them (Isaiah 41:8-9).` },
      { h: `The reason not to fear`, p: `The verse does not say "nothing bad will happen". It gives a different reason not to fear: "I am with you". The comfort is God's presence, not the absence of trouble.` },
      { h: `"My righteous right hand"`, p: `The right hand stood for strength and action. God promises to hold his people up with the same hand that acts with power and faithfulness.` },
    ],
    scriptures: [
      { ref: `Isaiah 41:10`, text: `So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.` },
    ],
    faqs: [
      { q: `Who was Isaiah 41:10 written to?`, a: `To the people of Israel, facing the threat of powerful empires and, in this part of Isaiah, the experience of exile.` },
      { q: `What does "dismayed" mean?`, a: `Anxiously looking around, losing heart. The Hebrew pictures someone glancing about in alarm.` },
      { q: `Is Isaiah 41:10 a promise for Christians today?`, a: `Christians read it as showing who God is: present with his people in fear. Jesus makes a similar promise in Matthew 28:20.` },
    ],
    related: ['what-does-the-bible-say-about-fear', 'what-does-the-bible-say-about-anxiety'],
  },

  {
    slug: 'what-does-joshua-1-9-mean',
    question: `What does Joshua 1:9 mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `Joshua 1:9 is God telling Joshua to be strong and courageous and not afraid, because God will be with him wherever he goes. Joshua had just lost his mentor Moses and was about to lead a whole nation into an unknown land. The courage comes from God's presence, not from Joshua's own confidence.`,
    body: [
      { h: `A command given to someone scared`, p: `God says "be strong and courageous" three times in this chapter (Joshua 1:6, 7, 9). You do not repeat that to someone who already feels brave. Joshua was stepping into a role far bigger than him.` },
      { h: `The reason is the second half`, p: `The command rests on the promise: "the Lord your God will be with you wherever you go." Courage here is not pretending to be fearless. It is moving forward because you are not going alone.` },
      { h: `Strength tied to God's word`, p: `Just before this, God tells Joshua to keep his law close and think on it day and night (Joshua 1:8). Courage and trust in what God has said go together.` },
    ],
    scriptures: [
      { ref: `Joshua 1:9`, text: `Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.` },
    ],
    faqs: [
      { q: `Who is God speaking to in Joshua 1:9?`, a: `Joshua, who had just taken over leadership of Israel after Moses died.` },
      { q: `Why does God say "be strong and courageous" so many times?`, a: `Because Joshua faced a huge task and real fear. The repetition is encouragement, not a scolding.` },
      { q: `Can Christians apply Joshua 1:9 today?`, a: `The specific mission was Joshua's, but the promise of God's presence fits the whole Bible's message, so Christians take courage from it.` },
    ],
    related: ['what-does-the-bible-say-about-fear', 'what-is-faith'],
  },

  {
    slug: 'what-does-matthew-11-28-mean',
    question: `What does Matthew 11:28 mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `In Matthew 11:28 Jesus invites everyone who is worn out and weighed down to come to him for rest. He goes on to describe himself as gentle and humble, and his way of life as an easy yoke and a light burden. It is one of the warmest invitations in the Bible.`,
    body: [
      { h: `Who he is talking to`, p: `"All you who are weary and burdened" fits people exhausted by life, but in Jesus's day it also fit people crushed by religious rules heaped on them by teachers who did not help carry them (Matthew 23:4).` },
      { h: `What a yoke is`, p: `A yoke was the wooden frame that joined two animals to pull together. Teachers spoke of taking on the "yoke" of their teaching. Jesus offers his own, and says it fits well and is light, because he pulls alongside you.` },
      { h: `Rest is a gift, and also a way of life`, p: `"I will give you rest" is pure gift. "Learn from me" is an invitation to an ongoing relationship. The rest Jesus offers runs deeper than a day off; it is rest for the soul.` },
    ],
    scriptures: [
      { ref: `Matthew 11:28-30`, text: `“Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls. For my yoke is easy and my burden is light.”` },
    ],
    faqs: [
      { q: `What does "my yoke is easy" mean?`, a: `That following Jesus fits well and is not crushing, because he shares the load. "Easy" here means well fitting, not effortless.` },
      { q: `Who does Jesus invite in Matthew 11:28?`, a: `Everyone who is tired and weighed down. There is no qualification except needing rest.` },
      { q: `What kind of rest is Jesus talking about?`, a: `Rest for the soul: being loved and accepted rather than having to earn your place, along with real relief from carrying life alone.` },
    ],
    related: ['what-does-the-bible-say-about-rest', 'what-is-grace'],
  },

  {
    slug: 'what-does-psalm-46-10-mean',
    question: `What does "Be still, and know that I am God" mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `"Be still, and know that I am God" (Psalm 46:10) is God speaking in the middle of chaos, telling people to stop striving and recognise that he is in control. In context it sounds less like "relax quietly" and more like "stop fighting, enough", spoken over wars and upheaval.`,
    body: [
      { h: `The psalm is loud`, p: `Psalm 46 pictures mountains falling into the sea, nations in uproar and kingdoms falling (Psalm 46:2-6). It opens with "God is our refuge and strength, an ever-present help in trouble." Verse 10 lands in the middle of that noise.` },
      { h: `"Be still" means "stop"`, p: `The Hebrew word means to let go, to cease, to drop your hands. It is addressed to the warring nations as much as to God's people: lay down your weapons and see who is God.` },
      { h: `What it offers us`, p: `For anxious people it still works as an invitation to quiet trust, and many Christians pray it that way. The deeper point is that you can stop trying to hold everything together, because God is the one who does.` },
    ],
    scriptures: [
      { ref: `Psalm 46:10`, text: `He says, “Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.”` },
    ],
    faqs: [
      { q: `Where is "Be still and know that I am God" in the Bible?`, a: `Psalm 46:10.` },
      { q: `Who is speaking in Psalm 46:10?`, a: `God himself, speaking to the nations and to his people in the middle of turmoil.` },
      { q: `Does "be still" mean to meditate?`, a: `Not originally. It means to stop striving or fighting. Quiet prayer is a fitting way to live it out, but the word itself is about ceasing.` },
    ],
    related: ['what-does-the-bible-say-about-anxiety', 'how-do-i-start-praying'],
  },

  {
    slug: 'what-does-2-corinthians-5-17-mean',
    question: `What does 2 Corinthians 5:17 mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `2 Corinthians 5:17 says that anyone who is joined to Christ is part of God's new creation: the old has gone and the new has come. It means your past does not get the final word on who you are. It does not mean every old habit disappears overnight.`,
    body: [
      { h: `"In Christ"`, p: `This is Paul's favourite way to describe a follower of Jesus: someone whose life is now bound up with his. What is true of Jesus, risen and alive, starts to become true of them.` },
      { h: `New creation is bigger than one person`, p: `Some translations say "he is a new creation", others "there is a new creation". Paul's point includes both: God has begun remaking the whole world through Jesus, and each believer is part of that.` },
      { h: `Old and new, honestly`, p: `Paul's own letters show believers still struggling. The verse is about a new identity and direction that is real from day one, with change that keeps growing over a lifetime.` },
    ],
    scriptures: [
      { ref: `2 Corinthians 5:17`, text: `Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!` },
    ],
    faqs: [
      { q: `Does 2 Corinthians 5:17 mean I will not struggle anymore?`, a: `No. It means you have a new identity and a new beginning. Growth and struggle continue, as Paul's own letters show.` },
      { q: `What is "the old" in 2 Corinthians 5:17?`, a: `The life defined by sin, shame and separation from God. It no longer gets to define a person who is in Christ.` },
      { q: `What comes right after 2 Corinthians 5:17?`, a: `Paul says God reconciled us to himself through Christ and gave us the message of reconciliation (2 Corinthians 5:18-19).` },
    ],
    related: ['what-does-it-mean-to-be-born-again', 'am-i-too-far-gone-for-god'],
  },
  // ── More famous verses and topics (added 2026-11-02). Scripture fields are NIV
  // fetched from api.bible (see ~/Library/Caches/kinwove-verse-pages/).
  {
    slug: 'what-does-romans-12-2-mean',
    question: `What does Romans 12:2 mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `Romans 12:2 means that God changes people from the inside, by renewing how they think, instead of leaving them shaped by the habits and pressures of the world around them. Paul wrote it after eleven chapters about God's mercy, so it describes a life that responds to grace, not a program for earning it. As the mind is renewed, a person grows able to recognize what God's good will looks like.`,
    body: [
      { h: `Where it sits in Romans`, p: `Paul wrote Romans to the church in Rome, probably around AD 57. Chapters 1 to 11 explain what God has done in Christ for people who could never fix themselves. Chapter 12 turns to how that shapes everyday life, and verse 1 says this new life is offered to God because of his mercy. Verse 2 follows straight on from that.` },
      { h: `Being transformed is something done to you`, p: `"Do not conform" is something you resist. "Be transformed" is something that happens to you. The verse does not hand you a self-improvement plan. It invites you to let God reshape your thinking over time, through his word, his Spirit and the company of other believers.` },
      { h: `What "the pattern of this world" means`, p: `Paul is not telling Christians to avoid culture or everything modern. He means the default way of seeing things that most people absorb without noticing: what counts as success, who matters, what to fear. A renewed mind starts to see those things the way God does.` },
      { h: `Knowing God's will`, p: `Many people read this verse hoping for a method to get a specific answer about a job or a relationship. Paul's point is broader. A mind that is being renewed slowly learns to recognize what is good and loving, which is the heart of God's will. The rest of the chapter shows what that looks like: humility, real love, hospitality and not repaying evil with evil.` },
    ],
    scriptures: [
      { ref: `Romans 12:2`, text: `Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God’s will is—his good, pleasing and perfect will.` },
    ],
    faqs: [
      { q: `Who wrote Romans 12:2?`, a: `The apostle Paul, writing to the Christians in Rome, probably around AD 57.` },
      { q: `Does Romans 12:2 mean Christians should avoid the world?`, a: `No. It is about not letting the world's assumptions shape your mind, not about withdrawing from people or culture.` },
      { q: `How is the mind renewed?`, a: `Christians usually point to reading Scripture, prayer, worship and life with other believers, while trusting that the real change is God's work, not ours alone.` },
    ],
    related: ['how-do-i-know-gods-will-for-my-life', 'what-does-2-corinthians-5-17-mean'],
  },

  {
    slug: 'what-is-the-fruit-of-the-spirit',
    question: `What is the fruit of the Spirit?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `The fruit of the Spirit is the character the Holy Spirit grows in a person who belongs to Christ: love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. Paul lists it in Galatians 5:22-23 as one fruit with many sides, not nine separate achievements. It grows over time from God's life in a person, not from straining to be good.`,
    body: [
      { h: `Why Paul wrote this`, p: `Paul wrote Galatians to churches in the region of Galatia, around the middle of the first century. Some teachers there were telling believers they needed to keep parts of the Jewish law to be fully accepted by God. Paul pushes back hard: they were set free by Christ (Galatians 5:1), and that freedom is meant to be used to love and serve each other (Galatians 5:13).` },
      { h: `Fruit, not works`, p: `Just before this list, Paul describes the "acts of the flesh" (Galatians 5:19-21), things people do when left to themselves. Then he changes the picture. Fruit is not manufactured. It grows when a tree is healthy and connected to its source. Paul says Christians should keep in step with the Spirit (Galatians 5:25), not grit their teeth.` },
      { h: `One fruit, many sides`, p: `The word "fruit" is singular. Love comes first and the others can be read as what love looks like in practice: patient with people, kind, faithful, gentle, in control of itself. You do not get to pick the three you are naturally good at.` },
      { h: `Not a checklist to grade yourself`, p: `It is easy to read this list and feel like a failure. Fruit grows slowly and in seasons. The point is not that you already show all of it, but that the Spirit is at work in you and it is growing. Many Christians find it more honest to ask "is this growing?" than "have I arrived?"` },
    ],
    scriptures: [
      { ref: `Galatians 5:22-23`, text: `But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. Against such things there is no law.` },
    ],
    faqs: [
      { q: `How many fruits of the Spirit are there?`, a: `Paul names nine qualities, but he calls them one fruit. They belong together as one character.` },
      { q: `What does "against such things there is no law" mean?`, a: `No law forbids these qualities. A life shaped by the Spirit already fulfills what the law was aiming at, love for God and neighbour.` },
      { q: `Is the fruit of the Spirit the same as spiritual gifts?`, a: `No. Gifts are abilities given for serving others and they differ from person to person. The fruit is character, and it is meant to grow in every believer.` },
    ],
    related: ['who-is-the-holy-spirit', 'what-is-grace'],
  },

  {
    slug: 'what-does-love-is-patient-love-is-kind-mean',
    question: `What does "love is patient, love is kind" mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `"Love is patient, love is kind" opens Paul's description of real love in 1 Corinthians 13:4-7, where he shows love by what it does and refuses to do. He wrote it to a church that was proud, divided and competing over spiritual gifts, to show them that without love even impressive gifts are worth nothing. It is often read at weddings, but it was first written for a whole community learning to live together.`,
    body: [
      { h: `A letter to a messy church`, p: `Paul wrote 1 Corinthians to the believers in Corinth, around AD 53 to 55. They were splitting into factions and treating some spiritual gifts as signs of being more important. Chapters 12 and 14 deal with those gifts. Chapter 13 sits in the middle as the point of it all: the most gifted person without love is just noise (1 Corinthians 13:1).` },
      { h: `Love described as actions`, p: `Paul does not define love as a feeling. Patient, kind, not envious, not boastful, not easily angered: these are things you can see in how someone treats people. Read it slowly and almost every line is a quiet correction of something the Corinthians were doing.` },
      { h: `Love is not being a doormat`, p: `"Keeps no record of wrongs" does not mean pretending harm never happened or staying in danger. The same passage says love does not delight in evil and rejoices with the truth. Real love forgives, but it also tells the truth and protects people. Christians widely agree it never requires accepting abuse.` },
      { h: `The love behind the description`, p: `Many readers notice that this passage describes Jesus perfectly, and describes them only partly. That can be freeing. The love Paul describes is first the way God loves us, and it grows in us as we receive it.` },
    ],
    scriptures: [
      { ref: `1 Corinthians 13:4-7`, text: `Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres.` },
    ],
    faqs: [
      { q: `Is 1 Corinthians 13 about marriage?`, a: `Not originally. Paul wrote it to a whole church, but its picture of love fits marriage very well, which is why it is read at weddings.` },
      { q: `Does "keeps no record of wrongs" mean I have to trust someone who hurt me?`, a: `No. Forgiving is letting go of the debt. Trust is rebuilt over time, and love also protects people and stands with the truth.` },
      { q: `What kind of love is Paul talking about?`, a: `A self-giving love that seeks the good of others, the kind of love God shows in Christ.` },
    ],
    related: ['how-do-i-forgive-someone-who-hurt-me', 'does-god-love-me'],
  },

  {
    slug: 'what-does-isaiah-40-31-mean',
    question: `What does Isaiah 40:31 mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `Isaiah 40:31 promises that people who put their hope in the Lord will have their strength renewed, even when their own strength runs out. It was spoken to God's people in a long season of loss and exile, when they felt forgotten. The verse is about God supplying strength to the tired, not about people who never get tired.`,
    body: [
      { h: `Comfort for a worn out people`, p: `Isaiah 40 begins a new section of the book with words of comfort for Israel. These chapters speak to people facing, or living through, exile in Babylon in the 500s BC, far from home and wondering if God had given up on them. Just before this verse, they say God has stopped seeing them (Isaiah 40:27).` },
      { h: `God does not grow tired`, p: `The answer is a reminder of who God is: the Creator who never grows weary and who gives strength to the weak (Isaiah 40:28-29). Even young people at their peak stumble and fall (Isaiah 40:30). Human strength always runs out. God's does not.` },
      { h: `Hoping, or waiting`, p: `The NIV says "hope in the Lord." Other translations say "wait for the Lord." The Hebrew idea includes both: a patient, expectant trust that keeps looking to God when nothing seems to be happening yet.` },
      { h: `Soar, run, walk`, p: `Notice the order. Soaring sounds best, but the promise ends with walking and not fainting. Some days God's strength looks like a breakthrough. Many days it simply looks like being able to keep going. Both are the promise at work.` },
    ],
    scriptures: [
      { ref: `Isaiah 40:31`, text: `but those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.` },
    ],
    faqs: [
      { q: `Who was Isaiah 40:31 written to?`, a: `To the people of Israel facing or living in exile, who felt God had forgotten them.` },
      { q: `Does Isaiah 40:31 mean I will never feel tired if I trust God?`, a: `No. It assumes people do get tired. It promises that God renews strength, often one step at a time.` },
      { q: `Why does the verse mention eagles?`, a: `Eagles rise high on the wind without flapping hard, a picture of being carried by strength that is not your own.` },
    ],
    related: ['what-does-isaiah-41-10-mean', 'what-does-the-bible-say-about-rest'],
  },

  {
    slug: 'what-does-micah-6-8-mean',
    question: `What does Micah 6:8 mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `Micah 6:8 says that what God wants from his people is not bigger religious offerings but a life of justice, mercy and humble closeness to him. Micah was answering people who thought they could keep God happy with sacrifices while treating others unfairly. It is a summary of a faithful life, not a list of steps to earn God's favor.`,
    body: [
      { h: `A courtroom scene`, p: `Micah was a prophet in Judah in the 700s BC, around the same time as Isaiah. In chapter 6, God brings a case against his people and reminds them of everything he did for them, including bringing them out of Egypt (Micah 6:3-5). He had already been good to them.` },
      { h: `The wrong question`, p: `The people respond by asking what they should bring to God: burnt offerings, thousands of rams, rivers of oil, even their own child (Micah 6:6-7). The offers grow more extreme because they think God is hard to please. Verse 8 cuts through all of it. God has already shown them what is good.` },
      { h: `Three things that belong together`, p: `To act justly is to treat people fairly, especially those with little power. To love mercy is to delight in kindness and loyal love, not just do it grudgingly. To walk humbly with God is the root of the other two, a daily, unpretentious walk with him.` },
      { h: `Not a way to earn God`, p: `Micah 6:8 is sometimes read as "just be a good person and that is enough." In context, it describes how people who already belong to God should live in response to what he has done. Justice and mercy flow from walking with him.` },
    ],
    scriptures: [
      { ref: `Micah 6:8`, text: `He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.` },
    ],
    faqs: [
      { q: `Who was the prophet Micah?`, a: `A prophet from a small town in Judah who spoke God's word in the 700s BC, especially against injustice toward the poor.` },
      { q: `Is Micah 6:8 saying sacrifices did not matter?`, a: `It is saying worship without justice and mercy misses the point. God wanted their hearts and their treatment of others, not just rituals.` },
      { q: `What does it mean to walk humbly with God?`, a: `To live close to God day by day, depending on him and not pretending to be more than you are.` },
    ],
    related: ['what-is-grace', 'what-is-repentance'],
  },

  {
    slug: 'what-does-2-timothy-1-7-mean',
    question: `What does 2 Timothy 1:7 mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `2 Timothy 1:7 means that the Spirit God gives his people does not make them timid, but gives them power, love and self-discipline. Paul wrote it to encourage Timothy, a younger leader who seems to have been hesitant, to keep using his gift and not be ashamed of the gospel. It is encouragement for the fearful, not a rebuke of anyone who feels afraid.`,
    body: [
      { h: `A letter near the end`, p: `Paul wrote 2 Timothy to Timothy, a younger co-worker he loved like a son. Most readers understand it as written late in Paul's life, from prison in Rome. Paul knew hard days were coming for Timothy, and the letter is full of warm, personal encouragement.` },
      { h: `Fan the gift into flame`, p: `Right before this verse, Paul reminds Timothy to fan into flame the gift God gave him (2 Timothy 1:6). Right after, he tells him not to be ashamed of the message about Jesus or of Paul in chains (2 Timothy 1:8). Verse 7 is the reason Timothy can do both: God's Spirit in him is not a spirit of shrinking back.` },
      { h: `Power, love and self-discipline`, p: `These three belong together. Power without love can crush people. Love without power can feel helpless. Self-discipline, sometimes translated "sound mind," keeps a person steady and clear headed instead of driven by panic.` },
      { h: `Not a verdict on anxiety`, p: `Some people hear this verse as "if you feel fear, you lack faith." That is not Paul's point. He is reminding an anxious friend what God has already given him. Feeling afraid is human. The verse points to a strength that is there even when fear is too.` },
    ],
    scriptures: [
      { ref: `2 Timothy 1:7`, text: `For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.` },
    ],
    faqs: [
      { q: `Is it "Spirit" or "spirit" in 2 Timothy 1:7?`, a: `Translations differ. The NIV understands it as the Holy Spirit. Others use lowercase "spirit," meaning the attitude God gives. Either way, the source is God.` },
      { q: `Does 2 Timothy 1:7 mean anxiety is a sin?`, a: `No. It encourages someone who struggled with fear. It does not condemn people for feeling afraid.` },
      { q: `Who was Timothy?`, a: `A younger church leader who travelled with Paul and later led the church in Ephesus.` },
    ],
    related: ['what-does-the-bible-say-about-fear', 'what-does-the-bible-say-about-anxiety'],
  },

  {
    slug: 'what-does-psalm-139-14-mean',
    question: `What does Psalm 139:14 mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `Psalm 139:14 is a prayer of praise to God for making the person praying with great care and wonder. It belongs to a psalm about how completely God knows us, from before birth through every place we could go. It is first a song about God's goodness, and from that comes a deep sense of our own worth.`,
    body: [
      { h: `A psalm about being fully known`, p: `Psalm 139 is headed as a psalm of David. It begins with God knowing when we sit and rise and what we will say before we say it (Psalm 139:1-4). Then it says there is nowhere we could go to be beyond God's presence (Psalm 139:7-12). Being known that well could feel frightening, but the psalm treats it as comfort.` },
      { h: `Made with care`, p: `Just before this verse, the psalmist says God knit him together in his mother's womb (Psalm 139:13). Verse 14 is his response: praise. Your existence was not an accident or an afterthought. You were made on purpose by someone who knows you completely.` },
      { h: `What "fearfully" means`, p: `"Fearfully" here does not mean scary. It carries the sense of awe and reverence. The way we are made should make us stand back in wonder at the God who made us.` },
      { h: `More than a self-esteem verse`, p: `This verse is often used to tell people to feel good about themselves, and it does speak to worth. But it points first to God's works, not our looks or achievements. The psalm ends by asking God to search the heart and lead in the right way (Psalm 139:23-24). Being wonderfully made and still growing go together.` },
    ],
    scriptures: [
      { ref: `Psalm 139:14`, text: `I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.` },
    ],
    faqs: [
      { q: `Who wrote Psalm 139?`, a: `The psalm's heading names David, and it has traditionally been read as his prayer.` },
      { q: `Does Psalm 139:14 apply to everyone?`, a: `It is one person's prayer, but the Bible teaches that every human being is made by God and in his image, so Christians apply it to all people.` },
      { q: `What if I do not feel wonderfully made?`, a: `Many people do not. The psalm is a truth about God's care, and it can be prayed honestly as something you are still learning to believe.` },
    ],
    related: ['what-does-the-bible-say-about-self-worth', 'does-god-love-me'],
  },

  {
    slug: 'what-does-lamentations-3-22-23-mean',
    question: `What does Lamentations 3:22-23 mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `Lamentations 3:22-23 says that God's love and compassion have not run out, and that his mercies are new every morning. These words were written in the middle of grief, after Jerusalem had been destroyed, not on a good day. They show hope that holds on while the pain is still real.`,
    body: [
      { h: `A book of grief`, p: `Lamentations is a set of five poems mourning the fall of Jerusalem to Babylon, around 587 BC. The city was burned, the temple destroyed and many people killed or taken away. Tradition links the book to Jeremiah, though the book itself does not name its author.` },
      { h: `Hope in the middle of the dark`, p: `Chapter 3 opens with some of the bleakest lines in the Bible, a person who feels God himself has turned against him. Then, almost in the exact middle of the whole book, the writer says he calls something to mind (Lamentations 3:21), and that gives him hope. Verses 22 and 23 are what he remembers.` },
      { h: `New every morning`, p: `The writer does not say the suffering is over. He says God's compassion has not failed, and that each day brings a fresh supply of it. You do not need tomorrow's mercy today. There will be new mercy when tomorrow comes.` },
      { h: `Permission to lament`, p: `This passage is a gift to anyone grieving. It shows faith can sit honestly with loss, complaint and tears, and still find something true to hold. Hope here is not denial. It is remembering who God is while everything else hurts.` },
    ],
    scriptures: [
      { ref: `Lamentations 3:22-23`, text: `Because of the Lord’s great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.` },
    ],
    faqs: [
      { q: `Who wrote Lamentations?`, a: `The book does not say. Jewish and Christian tradition has long linked it to the prophet Jeremiah.` },
      { q: `What does "new every morning" mean?`, a: `That God's mercy is renewed daily. Each day has its own fresh supply of his compassion.` },
      { q: `Is it wrong to lament as a Christian?`, a: `No. Lamentations, many psalms and Jesus himself show that honest grief can be part of faith.` },
    ],
    related: ['what-does-the-bible-say-about-grief', 'what-does-the-bible-say-about-depression'],
  },

  {
    slug: 'what-does-john-14-6-mean',
    question: `What does John 14:6 mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `In John 14:6 Jesus says that he himself is the way to God the Father, the truth about God and the source of real life. He said it to his worried disciples on the night before he died, after Thomas asked how they could know the way. Christians have always read it as a claim that Jesus is uniquely the way to God, though they discuss what that means for people who never hear of him.`,
    body: [
      { h: `The night before the cross`, p: `John 14 takes place at the Last Supper. Jesus has just told his friends he is leaving, and they are shaken. He begins by telling them not to let their hearts be troubled, and promises he is going to prepare a place for them (John 14:1-3).` },
      { h: `An answer to Thomas`, p: `Thomas honestly says they do not know where Jesus is going, so how can they know the way (John 14:5)? Jesus does not hand him a map. He points to himself. The way to God is not a set of directions but a person to follow and trust.` },
      { h: `Way, truth and life`, p: `Jesus is the way, because through him people come to the Father. He is the truth, because he shows what God is really like (John 14:9). He is the life, because the life of God is found in him. All three are offered to people who were confused and afraid.` },
      { h: `What about people who never hear?`, p: `Christians agree this verse means salvation comes only through Jesus. They differ on how. Some hold that a person must consciously believe in Jesus in this life. Others hold that Jesus can save some who never heard of him clearly, but still only through him. Both views take the verse seriously and leave final judgment with a God who is just and merciful.` },
    ],
    scriptures: [
      { ref: `John 14:6`, text: `Jesus answered, “I am the way and the truth and the life. No one comes to the Father except through me.` },
    ],
    faqs: [
      { q: `Who was Jesus talking to in John 14:6?`, a: `His disciples, especially Thomas, at the Last Supper on the night before he was crucified.` },
      { q: `Is John 14:6 arrogant?`, a: `It is a bold claim. But Jesus said it as comfort to frightened friends, and he backed it by giving his own life for others.` },
      { q: `Does John 14:6 mean other religions have nothing true in them?`, a: `Many Christians believe other traditions can contain real truths about God, while holding that Jesus is the one way to the Father.` },
    ],
    related: ['is-christianity-the-only-way-to-god', 'is-jesus-really-god'],
  },

  {
    slug: 'what-does-matthew-6-33-mean',
    question: `What does Matthew 6:33 mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `In Matthew 6:33 Jesus tells his listeners to make God's kingdom and God's way of life their first concern, and trust God to provide the everyday things they need. "All these things" means food, drink and clothing, the very things people worry about. It is an invitation out of worry, not a promise of wealth.`,
    body: [
      { h: `Part of a talk about worry`, p: `This verse comes from the Sermon on the Mount, in a passage where Jesus tells people not to worry about what they will eat, drink or wear (Matthew 6:25-34). He points to birds that are fed and wildflowers that are clothed, and reminds them their Father knows what they need (Matthew 6:32).` },
      { h: `What it means to seek first`, p: `To seek God's kingdom first is to make God's rule and God's priorities the center of your life, ahead of security and possessions. "His righteousness" means living rightly in God's way, which Jesus has been describing all through the sermon.` },
      { h: `What it does not promise`, p: `"All these things will be given to you" is about basic needs, not luxury. Jesus is not offering a deal where putting God first guarantees prosperity. Christians in every age have put God first and still known hardship. The promise is that the Father cares and provides what we truly need.` },
      { h: `One day at a time`, p: `Jesus ends the passage by saying not to worry about tomorrow, because each day has enough trouble of its own (Matthew 6:34). Seeking first is not a single decision but a daily practice of turning back to God when worry rises.` },
    ],
    scriptures: [
      { ref: `Matthew 6:33`, text: `But seek first his kingdom and his righteousness, and all these things will be given to you as well.` },
    ],
    faqs: [
      { q: `What are "all these things" in Matthew 6:33?`, a: `Food, drink and clothing, the daily needs Jesus mentions in the verses just before.` },
      { q: `Does Matthew 6:33 mean I should not plan or work?`, a: `No. The Bible values work and wisdom. Jesus is addressing anxious worry, not responsible planning.` },
      { q: `What is the kingdom of God?`, a: `God's rule and reign, which Jesus brought near and which shapes how his followers live now.` },
    ],
    related: ['what-does-the-bible-say-about-anxiety', 'what-does-the-bible-say-about-money'],
  },

  {
    slug: 'what-does-hebrews-11-1-mean',
    question: `What does Hebrews 11:1 mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `Hebrews 11:1 means that faith is a confident trust in God about things that are promised but not yet seen. It is not blind faith or believing without reasons, but trust based on who God has shown himself to be. The rest of Hebrews 11 explains it through real people who trusted God's promises over a lifetime.`,
    body: [
      { h: `Written to people under pressure`, p: `We do not know who wrote Hebrews. It was written to Christians, probably with a Jewish background, who were facing hardship and were tempted to drift away. Chapter 10 ends by urging them not to throw away their confidence but to keep going (Hebrews 10:35-39). Chapter 11 shows them what that kind of faith looks like.` },
      { h: `Confidence and assurance`, p: `Faith here has two sides. It is confidence about what we hope for, like the future God has promised. It is also assurance about what we cannot see right now, like God himself and his care. It is a settled trust that shapes how we live today.` },
      { h: `Not blind faith`, p: `Some read this verse as believing things without evidence. But the chapter that follows is full of people who trusted God because of what he had already said and done. Their faith rested on God's track record. It was trust in someone reliable, not a leap in the dark.` },
      { h: `A long list of ordinary people`, p: `Hebrews 11 names Abel, Noah, Abraham, Sarah, Moses, Rahab and many others. Several of them doubted, failed or waited years. The chapter even says many died before seeing the promises fulfilled (Hebrews 11:13). Faith is shown in persevering, not in never struggling.` },
    ],
    scriptures: [
      { ref: `Hebrews 11:1`, text: `Now faith is confidence in what we hope for and assurance about what we do not see.` },
    ],
    faqs: [
      { q: `Who wrote Hebrews?`, a: `No one knows for certain. The letter does not name its author, and Christians have suggested several possibilities over the centuries.` },
      { q: `Is faith the opposite of evidence?`, a: `Not in Hebrews. Faith is trust in God based on what he has revealed and done, extended into what we cannot yet see.` },
      { q: `Can you have faith and still have doubts?`, a: `Yes. Many people named in Hebrews 11 struggled. Faith often means holding on to God while questions remain.` },
    ],
    related: ['what-is-faith', 'how-can-i-believe-when-i-have-doubts'],
  },

  {
    slug: 'what-does-romans-6-23-mean',
    question: `What does Romans 6:23 mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `Romans 6:23 means that sin pays out death, while God freely gives eternal life through Jesus Christ. Paul sets two pictures side by side: wages, which are earned, and a gift, which is not. Christians agree on that contrast, though they hold different views on exactly what the final "death" involves.`,
    body: [
      { h: `The question behind the verse`, p: `Paul wrote Romans to the church in Rome, probably around AD 57. In chapter 6 he answers a question his teaching about grace raised: if God forgives freely, should we keep on sinning (Romans 6:1)? His answer is no, because belonging to Christ means a new life and a new master.` },
      { h: `Wages and a gift`, p: `All through the chapter Paul uses the picture of slavery and service (Romans 6:16-22). Sin is a master that pays its workers, and what it pays is death. God is different. He does not pay wages. He gives a gift that no one could earn: eternal life in Christ.` },
      { h: `What "death" means here`, p: `Death in Romans includes physical death and separation from God, the life we were made for. Christians differ on the final outcome. Many hold that those who reject God face conscious separation forever. Others hold that the final death means ceasing to exist. A smaller number hope all will finally be reconciled. Each view tries to take Scripture seriously.` },
      { h: `The good news half`, p: `People often stop at the first half. Paul does not. The weight of the verse falls on the gift. Whatever you have earned, God offers something you never could: life with him, through Jesus.` },
    ],
    scriptures: [
      { ref: `Romans 6:23`, text: `For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.` },
    ],
    faqs: [
      { q: `Is Romans 6:23 written to non-Christians?`, a: `It was written to Christians in Rome, reminding them why sin no longer rules them. It is also often shared as a summary of the gospel.` },
      { q: `Does Romans 6:23 mean all sins are equally bad?`, a: `It means every sin leads away from life with God. Christians still recognize that some wrongs do more harm than others.` },
      { q: `How do you receive the gift of eternal life?`, a: `Christians understand it is received through trusting Jesus, not earned. They differ on the role of baptism and the church in that.` },
    ],
    related: ['what-is-sin', 'is-hell-real'],
  },

  {
    slug: 'what-does-ephesians-2-8-9-mean',
    question: `What does Ephesians 2:8-9 mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `Ephesians 2:8-9 means that people are saved by God's grace, received through faith, and not by their own good deeds, so no one can take credit for it. It comes right after a description of people as spiritually dead and made alive by God. Christians agree salvation is God's gift, while traditions differ on how faith, works and the church fit together.`,
    body: [
      { h: `From dead to alive`, p: `Ephesians is a letter traditionally from Paul to the church in Ephesus, though some scholars think a follower wrote in his name. Chapter 2 begins by describing people as dead in their sins (Ephesians 2:1). Then God, rich in mercy, made them alive with Christ (Ephesians 2:4-5). Dead people do not raise themselves. That is the background to verses 8 and 9.` },
      { h: `Grace, faith and gift`, p: `Grace is God's undeserved kindness. Faith is how we receive it, like an open hand. And the whole thing is a gift. Christians debate whether "this is not from yourselves" refers to faith itself or to the whole of salvation, but either way the source is God.` },
      { h: `Then why do good works?`, p: `The very next verse says we are God's handiwork, created in Christ for good works (Ephesians 2:10). Works are not the root of salvation. They are the fruit. Everyone agrees on that much, but Catholic, Orthodox and Protestant Christians describe the connection differently, especially on justification and how faith works itself out in love.` },
      { h: `No one can boast`, p: `This verse levels everyone. The most religious person and the most broken person come to God the same way, with empty hands. That is humbling, and for many it is a relief: you do not have to earn your place.` },
    ],
    scriptures: [
      { ref: `Ephesians 2:8-9`, text: `For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God— not by works, so that no one can boast.` },
    ],
    faqs: [
      { q: `Does Ephesians 2:8-9 mean works do not matter?`, a: `No. Verse 10 says we were created for good works. They do not earn salvation, but they matter as the life that grows from it.` },
      { q: `Do Catholics and Protestants disagree about Ephesians 2:8-9?`, a: `Both affirm salvation is by grace. They differ on how justification works and how faith and works relate, a debate that goes back to the Reformation.` },
      { q: `What does "through faith" mean?`, a: `Faith is trusting God and receiving what he gives. It is not a work that earns, but the way the gift is received.` },
    ],
    related: ['what-is-grace', 'can-i-lose-my-salvation'],
  },
  {
    slug: 'what-does-philippians-4-6-7-mean',
    question: `What does Philippians 4:6-7 mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `Philippians 4:6-7 invites you to bring every worry to God in prayer, with thanks, and promises that God's peace will guard your heart and mind even when it does not make sense. It is an invitation, not a scolding for feeling anxious. Paul wrote it from custody, so he knew real pressure.`,
    body: [
      { h: `Who wrote it and where`, p: `Paul wrote Philippians to a church he loved in the city of Philippi, probably around AD 60, while he was under arrest and unsure whether he would live or die (Philippians 1:20-23). These are not words from someone with an easy life. Just before this, he says the Lord is near (Philippians 4:5), and that nearness is the ground for everything that follows.` },
      { h: `What "do not be anxious" really asks`, p: `Paul is not telling people to switch off a feeling by willpower. He gives them somewhere to take it: "in every situation," big or small, bring it to God. Prayer, honest asking, and thanks all go together. Thanks does not mean pretending things are fine. It means remembering what God has already done while you ask for help with what you are facing now.` },
      { h: `A peace that stands guard`, p: `The promise is not that every problem disappears. It is that God's peace will "guard" your heart and mind. Philippi was a Roman colony used to soldiers, and the picture is of a sentry keeping watch. The peace "transcends all understanding," which means it can show up before the situation is solved.` },
      { h: `Anxiety, faith, and getting help`, p: `Feeling anxious is not proof that your faith is weak. Many faithful people live with anxiety, and some live with an anxiety disorder that needs real treatment. Prayer and getting help go together: talking to a doctor or a counsellor is not a failure to trust God, it can be one of the ways God answers. If anxiety is overwhelming you, please reach out to someone today.` },
    ],
    scriptures: [
      { ref: `Philippians 4:6-7`, text: `Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.` },
    ],
    faqs: [
      { q: `Is it a sin to feel anxious?`, a: `No. Feelings come uninvited. Paul is offering a place to take your anxiety, not condemning you for having it. Jesus himself was deeply distressed in Gethsemane (Mark 14:33-34).` },
      { q: `Does Philippians 4:6-7 mean I should not see a doctor for anxiety?`, a: `No. Prayer and medical or counselling care work together. Paul travelled with Luke, whom he calls a doctor (Colossians 4:14). Getting help is wise, not faithless.` },
      { q: `What comes right after Philippians 4:6-7?`, a: `Paul encourages readers to fill their minds with what is true, noble, right, and lovely (Philippians 4:8). Prayer and what you dwell on are meant to go together.` },
    ],
    related: ['what-does-the-bible-say-about-anxiety', 'how-do-i-start-praying'],
  },

  {
    slug: 'what-does-1-peter-5-7-mean',
    question: `What does 1 Peter 5:7 mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `1 Peter 5:7 means you can hand all your worries over to God, because he genuinely cares about you. The reason given is not that you are strong enough, but that God is kind. Peter wrote it to Christians who were going through real hardship.`,
    body: [
      { h: `Written to people under pressure`, p: `Peter wrote this letter to scattered Christians in what is now Turkey (1 Peter 1:1). They were being mistreated and misunderstood for their faith. The letter talks openly about suffering, so this verse lands among people with real reasons to worry.` },
      { h: `Connected to humility`, p: `The verse just before says to humble yourselves under God's mighty hand, trusting him to lift you up in time (1 Peter 5:6). Handing over your anxiety is part of that humility. It admits you were never meant to carry everything alone.` },
      { h: `The reason is God's care`, p: `"Because he cares for you" is the heart of it. God is not irritated by your worries or tired of hearing them. "All" your anxiety includes the small things and the ones you feel embarrassed about. You may need to hand the same worry over many times, and that is fine.` },
      { h: `Care for your mind and body too`, p: `Casting your anxiety on God is not a replacement for help. Prayer and getting help go together: a doctor, a counsellor, or a trusted friend can be part of how God carries you. Struggling with anxiety is not a sign that you lack faith. It is a sign that you are human, and the verse is written for exactly that.` },
    ],
    scriptures: [
      { ref: `1 Peter 5:7`, text: `Cast all your anxiety on him because he cares for you.` },
    ],
    faqs: [
      { q: `What does "cast" mean in 1 Peter 5:7?`, a: `To throw something off yourself and onto someone else. It is a picture of deliberately handing over a weight you were carrying.` },
      { q: `If I still feel anxious after praying, did I do it wrong?`, a: `No. Feelings often take time to settle, and many people hand the same worry to God again and again. Keep praying and consider talking to a doctor or counsellor too.` },
      { q: `What comes after 1 Peter 5:7?`, a: `Peter tells readers to stay alert, and a few verses later promises that after they have suffered a little while, God himself will restore and strengthen them (1 Peter 5:8-10).` },
    ],
    related: ['what-does-the-bible-say-about-anxiety', 'does-god-love-me'],
  },

  {
    slug: 'what-does-romans-3-23-mean',
    question: `What does Romans 3:23 mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `Romans 3:23 means every person, without exception, has done wrong and falls short of the goodness God made us for. It puts everyone on level ground. In context it is not the end of a sentence: the very next verse says all can be made right with God freely, by his grace.`,
    body: [
      { h: `Who Paul is writing to`, p: `Paul wrote Romans around AD 57 to a church in Rome made up of both Jewish and non Jewish believers. Part of his aim was to show that no group stands above another before God. In the chapters before this, he builds the case that everyone needs God's mercy.` },
      { h: `"All" means everyone`, p: `The point is not that some people are worse than others. It is that no one, religious or not, can claim to have lived up to what God intended. "Fall short of the glory of God" pictures missing the mark of who we were made to be.` },
      { h: `Read the sentence to the end`, p: `In the NIV, verse 23 ends with a comma, because Paul's sentence keeps going. Verse 24 says all are justified freely by God's grace through what Christ Jesus did. The same "all" who have sinned are the "all" who can be made right as a gift. Romans 3:23 is the diagnosis, and the cure follows straight away.` },
      { h: `Why this is good news`, p: `If everyone falls short, then no one has to pretend. You do not need to prove you are better than others to come to God. Grace is offered on the same terms to everyone, which means it is offered to you.` },
    ],
    scriptures: [
      { ref: `Romans 3:23`, text: `for all have sinned and fall short of the glory of God,` },
    ],
    faqs: [
      { q: `Does Romans 3:23 mean I am a bad person?`, a: `It means you are a person who needs grace, like everyone else. The verse levels the ground. It does not single you out.` },
      { q: `What is "the glory of God" in Romans 3:23?`, a: `God's own goodness and beauty, and the likeness of it he made people to reflect. Sin means we do not reflect it as we were meant to.` },
      { q: `What verse comes after Romans 3:23?`, a: `Romans 3:24, which says all are justified freely by God's grace through the redemption that came by Christ Jesus.` },
    ],
    related: ['what-is-sin', 'what-is-grace'],
  },

  {
    slug: 'what-is-the-great-commission',
    question: `What is the Great Commission?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `The Great Commission is Jesus's instruction to his followers in Matthew 28:19-20 to make disciples of all nations, baptizing them and teaching them to follow what he commanded. It ends with a promise that he will be with them always. It is the closing scene of Matthew's Gospel.`,
    body: [
      { h: `The setting`, p: `After his resurrection, Jesus met his eleven remaining disciples on a mountain in Galilee. Matthew is honest that some of them still doubted (Matthew 28:16-17). Jesus did not wait for perfect faith before sending them. He began by saying all authority in heaven and on earth had been given to him (Matthew 28:18), and the commission rests on that.` },
      { h: `The main task is making disciples`, p: `"Go" matters, but the central command is to "make disciples": people who learn from Jesus and follow him over a lifetime. "All nations" means all peoples, not only Israel. Baptizing and teaching describe how that happens: welcoming people in, and helping them live what Jesus taught.` },
      { h: `Where Christians differ on baptism`, p: `Christians agree that baptism matters here, but faithful traditions understand it differently. Some baptize infants of believing families, seeing baptism as a sign of God's promise to the household. Others baptize only those old enough to profess faith themselves. There are also different views on whether to immerse, pour, or sprinkle, and on what baptism itself accomplishes. These differences are held sincerely on all sides.` },
      { h: `The promise at the end`, p: `The last words are not a command but a comfort: "I am with you always, to the very end of the age." The task is big, and the people sent were ordinary and unsure. The commission was never meant to be carried out alone.` },
    ],
    scriptures: [
      { ref: `Matthew 28:19-20`, text: `Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you. And surely I am with you always, to the very end of the age.”` },
    ],
    faqs: [
      { q: `Is the Great Commission only for pastors and missionaries?`, a: `Most Christians understand it as given to the whole church. For most people it looks like living and sharing their faith where they already are.` },
      { q: `Why is it called the Great Commission?`, a: `The name is a later label, not a phrase from the Bible. A commission is a task someone is sent to do, and this one is the final charge Jesus gives in Matthew.` },
      { q: `Does the Great Commission appear in other Gospels?`, a: `Similar sendings appear elsewhere, for example Luke 24:46-49, John 20:21, and Acts 1:8, each with its own emphasis.` },
    ],
    related: ['what-is-baptism', 'what-is-the-gospel'],
  },

  {
    slug: 'what-does-john-16-33-mean',
    question: `What does John 16:33 mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `In John 16:33 Jesus tells his followers plainly that they will have trouble in this world, but they can have peace in him because he has overcome the world. He does not promise an easy life. He promises his presence and his victory in the middle of a hard one.`,
    body: [
      { h: `Said the night before the cross`, p: `Jesus spoke these words at his last meal with his disciples, in a long farewell talk that runs through John 13 to 16. Within hours he would be arrested. Just before this verse, he warns that they will scatter and leave him alone, yet he says he is not alone, because the Father is with him (John 16:32).` },
      { h: `Honest about trouble`, p: `"In this world you will have trouble" is one of the most honest lines in the Bible. Following Jesus does not exempt anyone from grief, illness, or loss. If you are struggling, it does not mean you have done something wrong or that God has left.` },
      { h: `Peace in a person`, p: `The peace Jesus offers is "in me." It is not found in circumstances going well, but in being connected to him. That is why it can sit alongside real trouble.` },
      { h: `Why "take heart"`, p: `Jesus speaks of overcoming the world in the past tense, though the cross and resurrection were still ahead. He was that sure of the outcome. Taking heart is not denying the trouble. It is remembering who has the final word.` },
    ],
    scriptures: [
      { ref: `John 16:33`, text: `“I have told you these things, so that in me you may have peace. In this world you will have trouble. But take heart! I have overcome the world.”` },
    ],
    faqs: [
      { q: `Does John 16:33 mean Christians should expect suffering?`, a: `It means trouble is part of life for everyone, Christians included. Jesus says it up front so it does not shake people's faith when it comes.` },
      { q: `What does "overcome the world" mean?`, a: `That the forces opposed to God, including sin and death, do not get the last word. Christians see this victory in Jesus's death and resurrection.` },
      { q: `What happens after John 16:33?`, a: `Jesus prays for himself, his disciples, and all future believers in John 17, then is arrested in John 18.` },
    ],
    related: ['why-does-god-allow-suffering', 'what-does-the-bible-say-about-fear'],
  },

  {
    slug: 'what-does-psalm-37-4-mean',
    question: `What does Psalm 37:4 mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `Psalm 37:4 means that when God himself becomes your joy, your deepest desires find their answer in him. It is not a promise that you will get whatever you want if you are religious enough. The psalm is about trusting God when it looks like the wrong people are winning.`,
    body: [
      { h: `The setting of the psalm`, p: `Psalm 37 is credited to David and reads like wisdom from an older man (Psalm 37:25). It opens by telling readers not to fret over people who do evil and seem to prosper (Psalm 37:1). The whole psalm is about patience: wicked success does not last, and God can be trusted with the outcome.` },
      { h: `Not a blank cheque`, p: `A common misreading treats this verse as a deal: delight in God, then collect what you want. But the delight comes first, and it is delight in the Lord himself, not in what he can give. People who find their joy in God tend to find their desires changing too.` },
      { h: `Two faithful ways to read it`, p: `Some Christians read it as God fulfilling the desires of people whose hearts are set on him. Others emphasise that God shapes and gives the desires themselves. The two readings overlap more than they compete: both put God, not the wish list, at the centre.` },
      { h: `Read it with the verses around it`, p: `The next verses say to commit your way to the Lord, trust him, be still, and wait patiently (Psalm 37:5-7). That is the tone of the verse: quiet trust over time, not quick results.` },
    ],
    scriptures: [
      { ref: `Psalm 37:4`, text: `Take delight in the Lord, and he will give you the desires of your heart.` },
    ],
    faqs: [
      { q: `If I pray and do not get what I want, did Psalm 37:4 fail?`, a: `No. The verse is not a guarantee about specific requests. It describes what happens when God himself becomes your delight.` },
      { q: `What does it mean to delight in the Lord?`, a: `To enjoy God, not only obey him: to find him good, beautiful, and worth your attention, in prayer, worship, and everyday life.` },
      { q: `Who wrote Psalm 37?`, a: `Its heading credits David. It is a wisdom psalm about trusting God when evil seems to be winning.` },
    ],
    related: ['how-do-i-know-gods-will-for-my-life', 'does-god-answer-prayer'],
  },

  {
    slug: 'what-does-hebrews-13-5-mean',
    question: `What does Hebrews 13:5 mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `Hebrews 13:5 means you can loosen your grip on money and be content, because God has promised he will never leave you or forsake you. Your security rests on his presence, not your bank balance. The promise is the reason for the contentment.`,
    body: [
      { h: `Written to people who had lost things`, p: `We do not know for sure who wrote Hebrews. It was written to Christians, many likely from a Jewish background, who had faced pressure for their faith, including having their property taken (Hebrews 10:34). Talk of money and contentment came to people who knew what loss felt like.` },
      { h: `The love of money, not money`, p: `The verse warns against the love of money, not against having or using it. The problem is when money becomes what you trust to keep you safe. Contentment means being at peace with what you have, not refusing to plan or work.` },
      { h: `An old promise repeated`, p: `"Never will I leave you; never will I forsake you" echoes promises God made long before, to Israel through Moses (Deuteronomy 31:6) and to Joshua (Joshua 1:5). The writer applies them to ordinary believers. The next verse draws on Psalm 118:6 to say the Lord is our helper, so we need not be afraid.` },
      { h: `What this means for you`, p: `If money worries keep you up at night, this verse does not shame you. It offers a steadier place to stand: whatever you have or lose, you will not lose God.` },
    ],
    scriptures: [
      { ref: `Hebrews 13:5`, text: `Keep your lives free from the love of money and be content with what you have, because God has said, “Never will I leave you; never will I forsake you.”` },
    ],
    faqs: [
      { q: `Does Hebrews 13:5 say money is evil?`, a: `No. It warns against loving money and letting it become your security. Money itself is a tool.` },
      { q: `Where does "never will I leave you" come from?`, a: `It echoes God's promises in Deuteronomy 31:6 and Joshua 1:5, applied here to all who trust him.` },
      { q: `Is it wrong to want more money?`, a: `Wanting to provide for yourself and others is not wrong. The verse is about what your heart rests on, and about learning contentment.` },
    ],
    related: ['what-does-the-bible-say-about-money', 'what-does-the-bible-say-about-loneliness'],
  },

  {
    slug: 'what-does-james-1-2-4-mean',
    question: `What does James 1:2-4 mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `James 1:2-4 means that hard times can be faced with a deep kind of joy, because God can use them to grow endurance and maturity in you. It does not mean you must feel happy about pain. It is about what trials can produce, not about pretending they do not hurt.`,
    body: [
      { h: `Who wrote it and to whom`, p: `The letter is traditionally credited to James, the brother of Jesus, who led the church in Jerusalem. He writes to believers "scattered among the nations" (James 1:1), likely Jewish Christians who were poor and facing hardship. He is writing to people already in trouble, not lecturing from comfort.` },
      { h: `"Consider" is a choice, not a feeling`, p: `"Consider it pure joy" asks you to weigh things up, not to fake a smile. You can grieve and still believe that God is at work. The joy is in what the trial can produce, not in the trial itself.` },
      { h: `Growth takes time`, p: `James describes a process: testing produces perseverance, and perseverance, given time, leads to maturity. "Let perseverance finish its work" admits this is slow. Being in the middle of it does not mean you are failing.` },
      { h: `God is not the author of evil`, p: `This passage does not mean God sends harm to teach you a lesson. Later in the same chapter James says God tempts no one and that every good gift comes from him (James 1:13, 17). Right after this passage, he invites anyone who lacks wisdom to ask God, who gives generously without finding fault (James 1:5).` },
    ],
    scriptures: [
      { ref: `James 1:2-4`, text: `Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance. Let perseverance finish its work so that you may be mature and complete, not lacking anything.` },
    ],
    faqs: [
      { q: `Does James 1:2-4 mean I should not be sad when things go wrong?`, a: `No. Sadness and lament are all through the Bible. James is talking about a settled hope underneath the pain, not a cheerful face over it.` },
      { q: `Does God send trials to test me?`, a: `Christians understand this in different ways, but James is clear that God does not tempt anyone to do evil (James 1:13). The focus here is on what God can grow in you through hardship.` },
      { q: `What does "mature and complete" mean?`, a: `Grown up in faith and whole, not perfect. It is the steady, rooted character that endurance builds over time.` },
    ],
    related: ['why-does-god-allow-suffering', 'how-can-i-believe-when-i-have-doubts'],
  },

  {
    slug: 'what-does-1-john-1-9-mean',
    question: `What does 1 John 1:9 mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `1 John 1:9 means that when we honestly admit our sins to God, he forgives us and makes us clean, because he is faithful to his promises and just. Forgiveness rests on God's character, not on how well you confess. It is an invitation to honesty, not a test.`,
    body: [
      { h: `Who wrote it and why`, p: `This letter is traditionally credited to the apostle John, written to churches he cared for, probably late in the first century. He wanted them to be sure of their relationship with God and to walk honestly in the light (1 John 1:7).` },
      { h: `Honesty instead of pretending`, p: `The verse sits between two warnings: claiming to be without sin is self deception (1 John 1:8), and claiming we have not sinned makes God out to be a liar (1 John 1:10). Confession simply means agreeing with God about what is true. It is the opposite of hiding.` },
      { h: `Why "faithful and just"`, p: `It may seem surprising that justice is the reason God forgives. John explains a few verses later that Jesus is our advocate and the atoning sacrifice for our sins (1 John 2:1-2). Because the debt has been dealt with, forgiving those who come to him is right, not a bending of the rules.` },
      { h: `A common worry`, p: `Some people fear they are only forgiven for sins they remember to list. The verse does not say that. It says God will purify us from "all" unrighteousness. Christians differ on how confession relates to first coming to faith versus ongoing life with God, but they agree that forgiveness is a gift, not a payment you earn by confessing perfectly.` },
    ],
    scriptures: [
      { ref: `1 John 1:9`, text: `If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.` },
    ],
    faqs: [
      { q: `Do I need to confess every single sin to be forgiven?`, a: `No. God forgives and cleanses from "all" unrighteousness. Confession is about honesty with God, not perfect record keeping.` },
      { q: `Do I have to confess to a priest or pastor?`, a: `Traditions differ. Some, such as Catholic and Orthodox churches, practise confession with a priest, while many Protestants confess directly to God and sometimes to a trusted believer (James 5:16).` },
      { q: `What if I still feel guilty after confessing?`, a: `Feelings can lag behind what is true. The verse rests on God's faithfulness, not on how forgiven you feel today.` },
    ],
    related: ['will-god-forgive-me', 'what-is-repentance'],
  },

  {
    slug: 'what-does-psalm-34-18-mean',
    question: `What does Psalm 34:18 mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `Psalm 34:18 means that God draws especially near to people who are heartbroken and crushed, and he rescues them. Your pain does not push God away. It is where he promises to be close.`,
    body: [
      { h: `Written from a low place`, p: `The heading of Psalm 34 links it to a time when David was on the run for his life and pretended to be insane to escape a foreign king (1 Samuel 21:10-15). This is not a psalm written from a throne. It comes from someone frightened and humiliated who found God faithful.` },
      { h: `Close, not distant`, p: `The verse does not tell the brokenhearted to cheer up or try harder. It says the Lord is close to them. Grief, despair, and feeling crushed are not signs that God has stepped back. They are where this promise applies most.` },
      { h: `Saved does not mean spared`, p: `The next verse admits that the righteous may have many troubles, and says the Lord delivers them (Psalm 34:19). The psalm does not pretend hard things will not happen. Rescue may come slowly, and closeness comes first.` },
      { h: `You do not have to carry it alone`, p: `If you are crushed in spirit right now, God's nearness can come through people too: a friend, a pastor, a counsellor, or a doctor. Reaching out is not a lack of faith. If you are in danger or thinking of ending your life, please contact local emergency services or a crisis line now.` },
    ],
    scriptures: [
      { ref: `Psalm 34:18`, text: `The Lord is close to the brokenhearted and saves those who are crushed in spirit.` },
    ],
    faqs: [
      { q: `Does Psalm 34:18 mean God is not close to me when I feel fine?`, a: `No. God is near to all his people. The verse simply assures those in pain that their brokenness does not keep him away.` },
      { q: `Why do I not feel God close when I am heartbroken?`, a: `Many people in the Bible felt that too, and said so in prayer (Psalm 22:1). The promise does not depend on feeling it in the moment.` },
      { q: `Who wrote Psalm 34?`, a: `Its heading credits David, linking it to his escape described in 1 Samuel 21.` },
    ],
    related: ['what-does-the-bible-say-about-grief', 'what-does-the-bible-say-about-depression'],
  },

  {
    slug: 'what-does-romans-10-9-mean',
    question: `What does Romans 10:9 mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `Romans 10:9 says that anyone who openly declares that Jesus is Lord and truly believes God raised him from the dead will be saved. Salvation is received by trusting Jesus, not earned by keeping rules. Christians agree on that core, though they explain what saving faith involves in somewhat different ways.`,
    body: [
      { h: `The context in Romans`, p: `Paul wrote to the church in Rome around AD 57. In this chapter he contrasts trying to be right with God by keeping the law with receiving it through faith. Just before, he says the message is not far away but near, in your mouth and heart (Romans 10:8). Right after, he stresses it is open to everyone, Jew or Gentile (Romans 10:12-13).` },
      { h: `What "Jesus is Lord" meant`, p: `In the Roman world, calling someone "lord" was a claim of loyalty, and Caesar expected that title. Declaring "Jesus is Lord" was more than words. It meant Jesus, not anyone else, had the final claim on your life.` },
      { h: `Heart and mouth together`, p: `Paul pairs believing in the heart with declaring with the mouth (Romans 10:10). The point is not a magic formula, but real trust that shows itself openly. Belief in the resurrection matters because it is God's own confirmation of who Jesus is.` },
      { h: `Where Christians differ`, p: `Faithful Christians agree salvation is by God's grace through faith, but describe it differently. Some stress that true faith includes turning from sin and following Jesus as Lord. Others stress that faith is simply trusting the promise, with growth following. Some traditions, including Catholic, Orthodox, and Lutheran churches, see baptism as closely tied to this confession, while many evangelicals see it as a response that follows. These are long standing conversations among sincere believers.` },
    ],
    scriptures: [
      { ref: `Romans 10:9`, text: `If you declare with your mouth, “Jesus is Lord,” and believe in your heart that God raised him from the dead, you will be saved.` },
    ],
    faqs: [
      { q: `Is saying "Jesus is Lord" enough to be saved?`, a: `Paul links the words to real belief in the heart. It is trust in Jesus, expressed openly, not the words alone.` },
      { q: `Do I need to say it out loud in front of people?`, a: `Paul's point is that faith is not hidden. How and when that happens varies, and many churches connect public confession with baptism.` },
      { q: `Why does believing in the resurrection matter so much?`, a: `Because the resurrection shows God accepted Jesus's death for us and confirmed who he is (Romans 4:25). Without it, Paul says faith would be futile (1 Corinthians 15:17).` },
    ],
    related: ['how-do-i-become-a-christian', 'what-is-faith'],
  },

  {
    slug: 'what-does-2-corinthians-12-9-mean',
    question: `What does 2 Corinthians 12:9 mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-02',
    answer: `In 2 Corinthians 12:9 God tells Paul that his grace is enough, and that his power shows most clearly in human weakness. Paul had begged God to remove a painful problem, and the answer was not removal but grace to carry it. Weakness, in God's hands, is not the end of the story.`,
    body: [
      { h: `The situation behind it`, p: `Paul wrote 2 Corinthians to a church being swayed by impressive teachers he sarcastically calls "super apostles" (2 Corinthians 11:5). Instead of boasting about his strengths, Paul boasts about his weaknesses. He mentions a remarkable vision, then something humbling that followed it.` },
      { h: `The thorn in the flesh`, p: `Paul describes "a thorn in my flesh" that tormented him, and says he pleaded with the Lord three times to take it away (2 Corinthians 12:7-8). Nobody knows exactly what it was. Suggestions include an illness, poor eyesight, persistent opponents, or an ongoing struggle. Not knowing may help: many people can see their own situation in it.` },
      { h: `A no that was also a yes`, p: `God did not remove the thorn. He gave Paul something else: grace that was sufficient and power that worked through weakness. Honest prayer can receive a different answer than the one asked for, and that is not a sign God has stopped caring.` },
      { h: `Not a call to pretend`, p: `This verse does not mean you should hide pain or refuse help. Paul was open about his struggle. It means weakness does not disqualify you. Paul goes on to say that when he is weak, then he is strong (2 Corinthians 12:10), because Christ's strength rests on him.` },
    ],
    scriptures: [
      { ref: `2 Corinthians 12:9`, text: `But he said to me, “My grace is sufficient for you, for my power is made perfect in weakness.” Therefore I will boast all the more gladly about my weaknesses, so that Christ’s power may rest on me.` },
    ],
    faqs: [
      { q: `What was Paul's thorn in the flesh?`, a: `We do not know. Christians have suggested illness, an eye problem, opponents, or temptation, but Paul never says.` },
      { q: `Does 2 Corinthians 12:9 mean God will not heal me?`, a: `No. It describes Paul's experience, not a rule for everyone. God sometimes heals and sometimes gives strength to endure. Keep praying, and keep getting good care.` },
      { q: `What does "my power is made perfect in weakness" mean?`, a: `That God's strength is seen most clearly when it is obviously not our own. "Made perfect" carries the idea of being brought to full effect.` },
    ],
    related: ['what-is-grace', 'why-does-god-allow-suffering'],
  },
  {
    slug: 'what-does-the-bible-say-about-anger',
    question: `What does the Bible say about anger?`,
    category: 'Mental Health',
    updated: '2026-11-02',
    answer: `The Bible does not call anger itself a sin, but it warns that anger handled badly quickly turns into harm. "In your anger do not sin" assumes you will feel angry sometimes. The invitation is to be slow to anger, deal with it honestly, and not let it settle in and take over.`,
    body: [
      { h: `Feeling angry is not the problem`, p: `God is described as angry at injustice, and Jesus was angry when people were being exploited in the temple. Anger can be a sign that you care about something that matters. Scripture does not ask you to pretend you are fine.` },
      { h: `What you do with it matters`, p: `The warning is about what anger can grow into: harsh words, revenge, a grudge that lasts for years. "Do not let the sun go down while you are still angry" is practical wisdom. Deal with it before it hardens.` },
      { h: `Slow is the goal, not never`, p: `James says to be "quick to listen, slow to speak and slow to become angry." Slow means there is room to pause, breathe, and ask what is really going on underneath, often hurt, fear, or exhaustion.` },
      { h: `Grace when you get it wrong`, p: `Everyone has said things in anger they regret. The gospel is not only a warning; it is a way back. You can own what you did, apologise, and receive forgiveness, from God and often from the people you hurt.` },
    ],
    scriptures: [
      { ref: `Ephesians 4:26-27`, text: `“In your anger do not sin”: Do not let the sun go down while you are still angry, and do not give the devil a foothold.` },
      { ref: `James 1:19-20`, text: `My dear brothers and sisters, take note of this: Everyone should be quick to listen, slow to speak and slow to become angry, because human anger does not produce the righteousness that God desires.` },
    ],
    faqs: [
      { q: `Is it a sin to be angry?`, a: `Not in itself. Scripture says "in your anger do not sin", which separates the feeling from what you do with it.` },
      { q: `Did Jesus get angry?`, a: `Yes. He was angry at hard hearts and at people being cheated in the temple. His anger was aimed at wrongs, not at protecting his pride.` },
      { q: `What if my anger feels out of control?`, a: `That is worth taking seriously and getting help with, from a counsellor, a doctor, or a trusted pastor. Asking for help is a strong step, not a failure. If you or anyone else is in danger, contact local emergency services.` },
    ],
    related: ['is-it-okay-to-be-angry-at-god', 'how-do-i-forgive-someone-who-hurt-me'],
  },

  {
    slug: 'what-does-the-bible-say-about-pride',
    question: `What does the Bible say about pride?`,
    category: 'Grace',
    updated: '2026-11-02',
    answer: `The Bible treats pride as one of the most dangerous attitudes a person can have, because it puts self at the centre and shuts out God and others. "Pride goes before destruction." The answer it offers is not self hatred but humility: seeing yourself honestly, as someone loved and dependent on grace.`,
    body: [
      { h: `What the Bible means by pride`, p: `Biblical pride is not being glad about good work or caring for yourself. It is the attitude that says "I do not need God, and I am above other people." It shows up as arrogance, but also as refusing help or being unable to admit fault.` },
      { h: `Why it is so dangerous`, p: `Pride blinds. It makes it hard to see your own mistakes, hard to listen, and hard to receive anything as a gift. Proverbs puts it bluntly: pride comes before a fall.` },
      { h: `Humility is not thinking less of yourself`, p: `Humility in Scripture is honesty. You are not the centre of the universe, and you are also deeply valued. Both are true. A humble person can receive love and give it freely because they are not busy defending themselves.` },
      { h: `More grace for the proud too`, p: `James says "he gives us more grace." God's opposition to pride is not a door slammed shut. The moment you lower your guard and admit you need him, grace is already there.` },
    ],
    scriptures: [
      { ref: `Proverbs 16:18`, text: `Pride goes before destruction, a haughty spirit before a fall.` },
      { ref: `James 4:6`, text: `But he gives us more grace. That is why Scripture says: “God opposes the proud but shows favor to the humble.”` },
    ],
    faqs: [
      { q: `Is it wrong to feel proud of my kids or my work?`, a: `No. Being glad about something good is different from the self exalting pride Scripture warns about. Gratitude and joy are not arrogance.` },
      { q: `How do I know if I struggle with pride?`, a: `Notice how you handle correction, other people's success, and admitting you were wrong. Those are often where pride hides.` },
      { q: `Is low self worth the opposite of pride?`, a: `Not really. Both keep the focus on yourself. Humility rests in being loved by God, which frees you from needing to be either above or below others.` },
    ],
    related: ['what-does-the-bible-say-about-self-worth', 'what-is-grace'],
  },

  {
    slug: 'what-does-the-bible-say-about-patience',
    question: `What does the Bible say about patience?`,
    category: 'Faith & Doubt',
    updated: '2026-11-02',
    answer: `The Bible describes patience as a fruit of the Holy Spirit, something God grows in you over time rather than something you have to manufacture alone. It covers patience with people, patience in hard seasons, and patience with God's timing. Scripture is honest that waiting is hard, and it pairs patience with hope and prayer.`,
    body: [
      { h: `Patience is grown, not forced`, p: `Paul lists forbearance, an old word for patience, among the fruit of the Spirit. Fruit grows slowly and naturally. If you feel impatient, that is not proof you have failed; it is a place where God is still at work.` },
      { h: `Patience with people`, p: `Much of the Bible's talk about patience is about how we treat each other: bearing with people's flaws, giving them time to change, not snapping at the first frustration. "Love is patient" comes first in the famous list for a reason.` },
      { h: `Patience in hard seasons`, p: `Romans says "patient in affliction." That is not passive endurance. It sits next to joy in hope and faithfulness in prayer. You hold on, you keep talking to God, and you trust the season is not the end.` },
      { h: `Waiting on God's timing`, p: `Many people in Scripture waited years for promises to come true, and they were honest about how hard it was. Patience does not mean you stop asking. It means you keep trusting while you ask.` },
    ],
    scriptures: [
      { ref: `Romans 12:12`, text: `Be joyful in hope, patient in affliction, faithful in prayer.` },
      { ref: `Galatians 5:22-23`, text: `But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. Against such things there is no law.` },
    ],
    faqs: [
      { q: `Should I pray for patience?`, a: `Yes, many Christians do. Patience is described as something the Spirit grows in you, so asking for it is exactly the right place to start.` },
      { q: `Is it wrong to feel impatient with God?`, a: `No. The Psalms are full of people asking "how long?" Honest impatience brought to God is still faith.` },
      { q: `Does patience mean putting up with mistreatment?`, a: `No. Patience with people's flaws is not the same as accepting abuse or harm. Your safety matters, and getting help is not impatience.` },
    ],
    related: ['does-god-answer-prayer', 'how-do-i-know-gods-will-for-my-life'],
  },

  {
    slug: 'what-does-the-bible-say-about-hope',
    question: `What does the Bible say about hope?`,
    category: 'Faith & Doubt',
    updated: '2026-11-02',
    answer: `In the Bible, hope is not wishful thinking; it is confident trust that God is good and will keep his promises. It rests on who God is and on the resurrection of Jesus, not on how things look today. That is why Christians can have hope even in grief and hard seasons.`,
    body: [
      { h: `Hope is anchored, not vague`, p: `Everyday hope says "I hope it works out." Biblical hope says "God will be faithful." It is grounded in God's character and in what he has already done, especially in raising Jesus from the dead.` },
      { h: `Hope does not deny the pain`, p: `Lamentations was written after a city was destroyed. Right in the middle of that grief come the words "his compassions never fail. They are new every morning." Hope does not skip the sorrow; it speaks inside it.` },
      { h: `Hope is a gift, not a performance`, p: `Paul prays that "the God of hope" would fill people with joy and peace. Hope is something God gives through the Holy Spirit. You do not have to generate it by trying harder.` },
      { h: `Hope looks forward`, p: `Christian hope points to a future where God makes all things new, wipes away tears, and puts right what is broken. That future gives meaning to today, even when today is hard.` },
    ],
    scriptures: [
      { ref: `Romans 15:13`, text: `May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.` },
      { ref: `Lamentations 3:22-23`, text: `Because of the Lord’s great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.` },
    ],
    faqs: [
      { q: `What is the difference between hope and optimism?`, a: `Optimism expects circumstances to improve. Biblical hope trusts God's faithfulness whether circumstances improve or not.` },
      { q: `What if I feel hopeless right now?`, a: `You are not alone, and feeling hopeless is not a failure of faith. Please talk to someone you trust or a counsellor. If you are thinking about ending your life, call or text 988 in the US or Canada, or your local emergency number.` },
      { q: `What is the Christian hope for the future?`, a: `That God will raise the dead, make all things new, and live with his people, with no more death, mourning, or pain.` },
    ],
    related: ['what-does-the-bible-say-about-depression', 'what-is-heaven-like'],
  },

  {
    slug: 'what-does-the-bible-say-about-marriage',
    question: `What does the Bible say about marriage?`,
    category: 'Relationships',
    updated: '2026-11-02',
    answer: `The Bible describes marriage as a covenant: a lifelong promise of faithful love in which two people "become one flesh." It pictures marriage as companionship, mutual care, and a reflection of God's own faithful love. Scripture is also honest that marriages can be hard, and grace meets people in every kind of marriage story.`,
    body: [
      { h: `A covenant, not just a contract`, p: `From Genesis on, marriage is described as two people leaving their old homes and being united. A covenant is a promise of loyalty that holds through good and bad seasons, not a deal that ends when one side underperforms.` },
      { h: `Companionship and care`, p: `"Two are better than one." Marriage in Scripture is about not being alone: helping each other up, carrying each other's burdens, and growing together over years. The New Testament calls spouses to love, honour, and serve each other.` },
      { h: `A picture of God's faithful love`, p: `The Bible often uses marriage to describe how God loves his people: patiently, faithfully, and with forgiveness. Faithfulness in marriage is a small, daily echo of that bigger love.` },
      { h: `When marriage is hard or has ended`, p: `Many marriages go through seasons of distance and pain, and some end in divorce. Scripture holds marriage in high regard, but it never says people who have walked through divorce are beyond God's love. If there is abuse in a marriage, safety comes first. Abuse is never God's will, and seeking protection is right.` },
    ],
    scriptures: [
      { ref: `Genesis 2:24`, text: `That is why a man leaves his father and mother and is united to his wife, and they become one flesh.` },
      { ref: `Ecclesiastes 4:9-10`, text: `Two are better than one, because they have a good return for their labor: If either of them falls down, one can help the other up. But pity anyone who falls and has no one to help them up.` },
    ],
    faqs: [
      { q: `What is the purpose of marriage in the Bible?`, a: `Companionship, faithful love, mutual care, and a reflection of God's covenant love for his people.` },
      { q: `What if my marriage is struggling?`, a: `You are not the first. Many couples find help through a counsellor, a trusted pastor, or other couples who have been through hard seasons. Asking for help early is wise.` },
      { q: `Does God still love me if I am divorced?`, a: `Yes. Divorce is painful, but it does not put anyone outside God's love or grace.` },
    ],
    related: ['what-does-the-bible-say-about-divorce', 'how-do-i-forgive-someone-who-hurt-me'],
  },

  {
    slug: 'what-does-the-bible-say-about-friendship',
    question: `What does the Bible say about friendship?`,
    category: 'Relationships',
    updated: '2026-11-02',
    answer: `The Bible values friendship highly, describing a true friend as someone who "loves at all times" and stays close in hard seasons. It shows deep friendships, like David and Jonathan or Ruth and Naomi. Jesus himself called his disciples friends and said the greatest love is laying down your life for them.`,
    body: [
      { h: `Friends who stay`, p: `Proverbs says "a friend loves at all times." A real friend is not only there for the good times. They show up when life falls apart, and that loyalty is something Scripture treats as precious.` },
      { h: `Friendship in the Bible's stories`, p: `David and Jonathan's friendship was so close it survived danger and family conflict. Ruth refused to leave Naomi after loss. These stories show friendship as loyal, costly, and deeply human.` },
      { h: `Jesus calls us friends`, p: `Jesus told his followers, "I have called you friends." He also said "greater love has no one than this: to lay down one's life for one's friends," and then did exactly that. Friendship with God is at the heart of the gospel.` },
      { h: `Choosing friends wisely`, p: `The Bible also notes that the people around us shape us. Good friends tell you the truth kindly, encourage you, and help you grow. It is wise to invest in friendships like that and to be that kind of friend.` },
    ],
    scriptures: [
      { ref: `Proverbs 17:17`, text: `A friend loves at all times, and a brother is born for a time of adversity.` },
      { ref: `John 15:13`, text: `Greater love has no one than this: to lay down one’s life for one’s friends.` },
    ],
    faqs: [
      { q: `What makes a good friend, according to the Bible?`, a: `Loyalty, honesty, kindness, and staying close in hard times.` },
      { q: `Can Christians be friends with people who do not share their faith?`, a: `Yes. Jesus was known as a friend of people others avoided. Many Christians have close friends of different beliefs.` },
      { q: `What if I do not have close friends right now?`, a: `That is painful and more common than people admit. God sees you in it, and small steps like joining a group or reaching out to one person can open doors over time.` },
    ],
    related: ['what-does-the-bible-say-about-loneliness', 'how-do-i-find-a-church'],
  },

  {
    slug: 'what-does-the-bible-say-about-work',
    question: `What does the Bible say about work?`,
    category: 'Purpose',
    updated: '2026-11-02',
    answer: `The Bible sees work as good and meaningful, part of how people were made to care for the world, not just a way to pay bills. Whatever you do can be done "as working for the Lord." Scripture also sets limits: work is not your whole identity, and rest matters too.`,
    body: [
      { h: `Work was part of the good design`, p: `Before anything went wrong in Genesis, people were given the task of tending the garden. Work is not a punishment. Making, building, caring, and serving are ways of reflecting a creative God.` },
      { h: `Any honest work can matter`, p: `"Whatever you do, work at it with all your heart, as working for the Lord." This applies to cleaning, coding, parenting, driving, or leading. No honest work is too ordinary to be done for God.` },
      { h: `Work is not your worth`, p: `The Bible also guards against work becoming an idol. Your value does not come from your job title or productivity. That frees you to work well without being crushed by it.` },
      { h: `Rest is part of the plan`, p: `God built a rhythm of rest into the week. Overworking is not more faithful. Taking real rest is a way of trusting that the world does not depend on you alone.` },
    ],
    scriptures: [
      { ref: `Colossians 3:23-24`, text: `Whatever you do, work at it with all your heart, as working for the Lord, not for human masters, since you know that you will receive an inheritance from the Lord as a reward. It is the Lord Christ you are serving.` },
      { ref: `Proverbs 16:3`, text: `Commit to the Lord whatever you do, and he will establish your plans.` },
    ],
    faqs: [
      { q: `Does God care about my job?`, a: `Yes. Scripture treats everyday work as something that can be offered to God, not as separate from your faith.` },
      { q: `What if I hate my job?`, a: `That is a real struggle. You can bring it honestly to God, look for meaning where you can, and also feel free to pursue a change. Staying is not automatically more spiritual.` },
      { q: `What if I am out of work right now?`, a: `Your worth to God does not depend on having a job. It is a hard season, and it is okay to ask for help, practical and emotional.` },
    ],
    related: ['what-does-the-bible-say-about-rest', 'what-is-the-meaning-of-life'],
  },

  {
    slug: 'what-does-the-bible-say-about-drinking-alcohol',
    question: `What does the Bible say about drinking alcohol?`,
    category: 'Bible',
    updated: '2026-11-02',
    answer: `The Bible clearly warns against drunkenness, but it does not forbid drinking alcohol altogether. Wine appears in Scripture both as a gift and as a danger. Faithful Christians differ: some traditions drink in moderation, others choose to abstain completely.`,
    body: [
      { h: `Drunkenness is clearly warned against`, p: `Across both Testaments, getting drunk is treated as harmful. "Wine is a mocker and beer a brawler." Paul says "do not get drunk on wine" and instead be filled with the Spirit. Losing control and harming yourself or others is the concern.` },
      { h: `Wine also appears as a gift`, p: `The Psalms speak of "wine that gladdens human hearts," and Jesus' first miracle in John's Gospel was turning water into wine at a wedding. Many Christians read these passages as showing that moderate drinking is not sinful in itself.` },
      { h: `Why some Christians abstain`, p: `Other Christians and whole traditions choose not to drink at all. Reasons include the harm alcohol does in many families, love for people who struggle with it, and Paul's teaching about not causing others to stumble. This is a sincere conviction, not legalism.` },
      { h: `If drinking has become a struggle`, p: `If alcohol feels hard to control, you are not alone and you are not beyond help. Addiction is real, and recovery often needs support: a doctor, a counsellor, a recovery group, or a trusted friend. Grace meets you there, not at the finish line.` },
    ],
    scriptures: [
      { ref: `Proverbs 20:1`, text: `Wine is a mocker and beer a brawler; whoever is led astray by them is not wise.` },
      { ref: `Psalm 104:15`, text: `wine that gladdens human hearts, oil to make their faces shine, and bread that sustains their hearts.` },
    ],
    faqs: [
      { q: `Is drinking alcohol a sin?`, a: `Scripture clearly calls drunkenness wrong. Christians differ on moderate drinking: some see it as permitted, others choose to abstain. Both views are held by faithful believers.` },
      { q: `Did Jesus drink wine?`, a: `The Gospels describe Jesus sharing meals where wine was served, and he turned water into wine at a wedding. Christians draw different conclusions from this.` },
      { q: `What if I think I have a drinking problem?`, a: `Please reach out to someone: a doctor, a recovery group such as Alcoholics Anonymous, or a trusted pastor or friend. Asking for help is a brave and good step.` },
    ],
    related: ['what-does-the-bible-say-about-addiction', 'will-god-forgive-me'],
  },

  {
    slug: 'what-does-the-bible-say-about-tattoos',
    question: `What does the Bible say about tattoos?`,
    category: 'Bible',
    updated: '2026-11-02',
    answer: `The only verse that directly mentions tattoos is Leviticus 19:28, part of the law given to ancient Israel. Christians differ on whether that command applies today. Many conclude tattoos are a matter of personal conscience, while others choose to avoid them out of caution.`,
    body: [
      { h: `What Leviticus 19:28 says`, p: `The verse reads "do not cut your bodies for the dead or put tattoo marks on yourselves." It sits in the law of Moses, alongside many commands for ancient Israel, and is connected in the same verse to mourning practices for the dead.` },
      { h: `Why Christians read it differently`, p: `Some Christians see the command as tied to its original setting and to the parts of the law Christians are no longer bound by, like food laws. Others see a lasting principle about honouring the body and choose to avoid tattoos. Both are sincere readings.` },
      { h: `Questions worth asking`, p: `Whatever view you hold, Christians often ask: what does this mean to me, would it honour God and others, and am I doing this freely or under pressure? Those questions tend to matter more than the ink itself.` },
      { h: `God looks at the heart`, p: `If you already have tattoos, you are not less loved. Scripture says "the Lord looks at the heart." Your worth to God is not written on your skin.` },
    ],
    scriptures: [
      { ref: `Leviticus 19:28`, text: `“ ‘Do not cut your bodies for the dead or put tattoo marks on yourselves. I am the Lord.` },
      { ref: `1 Samuel 16:7`, text: `But the Lord said to Samuel, “Do not consider his appearance or his height, for I have rejected him. The Lord does not look at the things people look at. People look at the outward appearance, but the Lord looks at the heart.”` },
    ],
    faqs: [
      { q: `Is getting a tattoo a sin?`, a: `Christians disagree. Some see Leviticus 19:28 as part of the law of Moses that does not bind Christians today; others see a principle worth keeping. Many treat it as a matter of conscience.` },
      { q: `Can I still be a Christian with tattoos?`, a: `Yes. Tattoos do not decide whether someone belongs to God. Faith in Jesus does.` },
      { q: `Why do Christians follow some Old Testament laws and not others?`, a: `Most Christian traditions see parts of the law of Moses as fulfilled in Jesus, while its moral heart continues. Traditions draw those lines in slightly different places.` },
    ],
    related: ['do-christians-take-the-bible-literally', 'what-does-the-bible-say-about-self-worth'],
  },

  {
    slug: 'what-does-the-bible-say-about-gossip',
    question: `What does the Bible say about gossip?`,
    category: 'Relationships',
    updated: '2026-11-02',
    answer: `The Bible warns against gossip because it damages trust and "separates close friends." Scripture calls us to use our words to build people up rather than tear them down behind their backs. It also offers grace, since almost everyone has said things they wish they had not.`,
    body: [
      { h: `Why gossip does so much harm`, p: `Gossip spreads stories about people who are not there to speak for themselves. Proverbs says "a gossip separates close friends." Even when the details are true, passing them around can wound people and break trust.` },
      { h: `Words that build up`, p: `Paul says to let only "what is helpful for building others up" come out of our mouths. A simple test: would I say this if they were in the room, and does it help them?` },
      { h: `Gossip versus honest concern`, p: `Not every conversation about someone is gossip. Asking for advice, protecting someone from harm, or reporting wrongdoing to the right person can be wise and necessary. The difference is usually the motive and who needs to know.` },
      { h: `Grace when you have gossiped`, p: `If you have hurt someone with your words, you can stop, own it, and where it is safe and wise, make it right. God's forgiveness covers this too, and changing the habit is possible.` },
    ],
    scriptures: [
      { ref: `Proverbs 16:28`, text: `A perverse person stirs up conflict, and a gossip separates close friends.` },
      { ref: `Ephesians 4:29`, text: `Do not let any unwholesome talk come out of your mouths, but only what is helpful for building others up according to their needs, that it may benefit those who listen.` },
    ],
    faqs: [
      { q: `Is it gossip if it is true?`, a: `It can be. Gossip is less about whether something is true and more about whether sharing it helps or harms.` },
      { q: `How do I stop a conversation that turns into gossip?`, a: `Gently change the subject, or say something kind about the person being discussed. Often that is enough.` },
      { q: `What if people are gossiping about me?`, a: `That hurts. You can bring the pain to God, talk to someone you trust, and where it is safe, address it directly with the person.` },
    ],
    related: ['how-do-i-forgive-someone-who-hurt-me', 'what-if-church-hurt-you'],
  },

  {
    slug: 'what-does-the-bible-say-about-jealousy',
    question: `What does the Bible say about jealousy?`,
    category: 'Mental Health',
    updated: '2026-11-02',
    answer: `The Bible treats envy, wanting what someone else has and resenting them for it, as something that quietly eats away at a person and their relationships. "Envy rots the bones." Scripture's answer is contentment and gratitude, rooted in being secure in God's love.`,
    body: [
      { h: `Envy hurts the one who carries it`, p: `Proverbs says "a heart at peace gives life to the body, but envy rots the bones." Envy rarely harms the person envied as much as it harms the one holding it. It steals joy and peace.` },
      { h: `It damages relationships`, p: `James links envy and selfish ambition to "disorder and every evil practice." When we compare and resent, we start seeing people as rivals instead of neighbours, and community breaks down.` },
      { h: `Not all jealousy is the same`, p: `The Bible also speaks of God as "jealous" for his people, meaning a protective love that does not want to lose them. That is different from envy, which wants what belongs to someone else.` },
      { h: `The way out is contentment`, p: `Paul wrote that he had "learned" contentment, which means it took practice. Gratitude, celebrating others' good things, and remembering you are already loved by God all loosen envy's grip over time.` },
    ],
    scriptures: [
      { ref: `Proverbs 14:30`, text: `A heart at peace gives life to the body, but envy rots the bones.` },
      { ref: `James 3:16`, text: `For where you have envy and selfish ambition, there you find disorder and every evil practice.` },
    ],
    faqs: [
      { q: `Is feeling jealous a sin?`, a: `A passing feeling is human. Scripture's concern is when envy is fed and allowed to turn into resentment or harm.` },
      { q: `Why does the Bible call God jealous?`, a: `It describes God's protective, committed love for his people, not envy of what belongs to others.` },
      { q: `How do I stop comparing myself to others?`, a: `Practise gratitude, limit what feeds comparison where you can, and remind yourself that your worth comes from God's love, not your ranking.` },
    ],
    related: ['what-does-the-bible-say-about-self-worth', 'what-does-the-bible-say-about-money'],
  },

  {
    slug: 'what-does-the-bible-say-about-love',
    question: `What does the Bible say about love?`,
    category: 'Grace',
    updated: '2026-11-02',
    answer: `The Bible says love is at the very heart of who God is and what he asks of us. "We love because he first loved us": our love for God and others flows from his love for us. Scripture describes love as patient, kind, and committed, more about action than feeling.`,
    body: [
      { h: `God's love comes first`, p: `The Bible does not start with "try harder to love." It starts with God loving people first, before they have earned it. "We love because he first loved us." Love begins as something received.` },
      { h: `What love looks like`, p: `1 Corinthians 13 gives the most famous description: patient, kind, not envious, not proud, keeping no record of wrongs. It is a picture of love as everyday behaviour, not just a warm feeling.` },
      { h: `Love God, love your neighbour`, p: `Jesus summed up all of God's commands in two: love God with everything you are, and love your neighbour as yourself. Everything else hangs on those.` },
      { h: `Love is costly, and so is grace`, p: `The clearest picture of love in the Bible is Jesus giving his life for people who did not deserve it. That is the love we are invited to receive, and, slowly, to share.` },
    ],
    scriptures: [
      { ref: `1 Corinthians 13:4-7`, text: `Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres.` },
      { ref: `1 John 4:19`, text: `We love because he first loved us.` },
    ],
    faqs: [
      { q: `What does "God is love" mean?`, a: `That love is not just something God does; it is who he is. Everything he does flows from love.` },
      { q: `Is love a feeling or a choice?`, a: `In the Bible it is mostly a choice expressed in action, though feelings often come along with it.` },
      { q: `Does loving someone mean I have to accept harmful behaviour?`, a: `No. Love "does not delight in evil." Loving someone can include setting boundaries and protecting yourself from harm.` },
    ],
    related: ['does-god-love-me', 'what-does-john-3-16-mean'],
  },

  {
    slug: 'what-does-the-bible-say-about-lying',
    question: `What does the Bible say about lying?`,
    category: 'Relationships',
    updated: '2026-11-02',
    answer: `The Bible calls us to speak truthfully, because lies break trust and damage relationships. Not giving false testimony is one of the Ten Commandments, and Paul says to "put off falsehood and speak truthfully." Scripture is also honest that people lie, and it offers forgiveness and a way to start again.`,
    body: [
      { h: `Truth holds people together`, p: `Paul's reason for honesty is relational: "we are all members of one body." Trust is what lets families, friendships, and communities work. Lies, even small ones, wear that trust down.` },
      { h: `God delights in trustworthy people`, p: `Proverbs says the Lord "delights in people who are trustworthy." Honesty is not just a rule; it reflects a God who is faithful and true.` },
      { h: `Truth with kindness`, p: `Being honest does not mean being harsh. Scripture calls for "speaking the truth in love." You can be truthful and gentle at the same time.` },
      { h: `When you have lied`, p: `Most people have lied, sometimes out of fear or shame. The way forward is the same as with any wrong: admit it, make it right where you can, and receive God's forgiveness. You are not defined by your worst moment.` },
    ],
    scriptures: [
      { ref: `Ephesians 4:25`, text: `Therefore each of you must put off falsehood and speak truthfully to your neighbor, for we are all members of one body.` },
      { ref: `Proverbs 12:22`, text: `The Lord detests lying lips, but he delights in people who are trustworthy.` },
    ],
    faqs: [
      { q: `Are white lies okay?`, a: `Scripture consistently values truthfulness. Many Christians look for ways to be kind and honest at the same time rather than relying on small lies.` },
      { q: `Is it ever right to lie?`, a: `Christians have discussed hard cases, such as hiding people from those who want to harm them, and come to different conclusions. These are rare situations, not everyday ones.` },
      { q: `Will God forgive me for lying?`, a: `Yes. Lying is a real wrong, but no wrong is beyond God's forgiveness when you turn back to him.` },
    ],
    related: ['will-god-forgive-me', 'what-is-repentance'],
  },

  {
    slug: 'what-does-the-bible-say-about-kindness',
    question: `What does the Bible say about kindness?`,
    category: 'Relationships',
    updated: '2026-11-02',
    answer: `The Bible calls kindness a fruit of the Holy Spirit and asks Christians to "be kind and compassionate to one another." Our kindness is meant to reflect God's kindness to us. It is not a soft extra; Scripture places it near the centre of what God asks.`,
    body: [
      { h: `Kindness starts with God`, p: `The New Testament describes God's kindness as what leads people to change. Paul says to be kind and forgiving "just as in Christ God forgave you." We show kindness because we have received it.` },
      { h: `What God asks is simple`, p: `Micah sums it up: "act justly and to love mercy and to walk humbly with your God." Mercy and kindness are not optional add ons to faith; they are close to its heart.` },
      { h: `Kindness in ordinary life`, p: `Kindness in Scripture is practical: feeding the hungry, welcoming strangers, being patient with difficult people, speaking gently. Small acts count.` },
      { h: `Kindness is not weakness`, p: `Being kind does not mean having no boundaries or accepting mistreatment. Jesus was kind and also honest and firm. Real kindness wants what is truly good for people, including you.` },
    ],
    scriptures: [
      { ref: `Ephesians 4:32`, text: `Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.` },
      { ref: `Micah 6:8`, text: `He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.` },
    ],
    faqs: [
      { q: `Why is kindness so important in the Bible?`, a: `Because it reflects God's own kindness to us, and it is one of the clearest signs of the Holy Spirit at work.` },
      { q: `How can I be kind to people who are unkind to me?`, a: `It is hard, and it often starts small: not repaying harm with harm, praying for them, and keeping healthy boundaries.` },
      { q: `Is kindness the same as being nice?`, a: `Not quite. Niceness avoids discomfort; kindness seeks someone's real good, which sometimes includes honest words.` },
    ],
    related: ['what-is-grace', 'how-do-i-forgive-someone-who-hurt-me'],
  },

  {
    slug: 'what-does-the-bible-say-about-worrying-about-the-future',
    question: `What does the Bible say about worrying about the future?`,
    category: 'Mental Health',
    updated: '2026-11-02',
    answer: `The Bible invites you to bring your worries about the future to God instead of carrying them alone. Jesus said "do not worry about tomorrow," not because tomorrow does not matter, but because God holds it. Scripture offers prayer and God's peace as the way through, not a demand to simply stop feeling anxious.`,
    body: [
      { h: `Jesus understood worry`, p: `When Jesus spoke about worry, he pointed to birds and flowers that God cares for. His point was gentle: if God looks after them, he will look after you. Worry is met with reassurance, not scolding.` },
      { h: `One day at a time`, p: `"Each day has enough trouble of its own." Jesus does not pretend there will be no trouble. He invites you to face today's portion with God, rather than carrying every possible tomorrow at once.` },
      { h: `Turn worry into prayer`, p: `Paul's advice is practical: in every situation, bring your requests to God with thanksgiving. The promise is that "the peace of God" will guard your heart and mind, even when the situation has not changed yet.` },
      { h: `Planning is not the same as worrying`, p: `The Bible encourages wise planning. The difference is whether you plan while trusting God, or spin in fear trying to control what you cannot. If worry has become constant or overwhelming, talking to a counsellor or doctor is a wise step too.` },
    ],
    scriptures: [
      { ref: `Matthew 6:34`, text: `Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.` },
      { ref: `Philippians 4:6-7`, text: `Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.` },
    ],
    faqs: [
      { q: `Is worrying a sin?`, a: `Scripture treats worry as a burden to hand over, not a crime to be punished. Jesus meets worried people with comfort.` },
      { q: `How do I stop worrying about the future?`, a: `Start small: name the worry to God in prayer, focus on what you can do today, and talk with someone you trust. Peace often grows slowly.` },
      { q: `What if my anxiety will not go away?`, a: `Ongoing anxiety is common and treatable. Seeing a doctor or counsellor is not a lack of faith; it is a good way to care for yourself.` },
    ],
    related: ['what-does-the-bible-say-about-anxiety', 'what-does-the-bible-say-about-fear'],
  },

  // ── From real visitor questions (6 Nov 2026) ──────────────────────────────
  // Each of these was asked on the homepage or in Ask in Oct and Nov 2026 and
  // had no page: the mark of the beast and Matthew 24 (a new member, 3 Nov),
  // lust and Hermeticism (31 Oct), Psalm 22, 1 Peter 4:6, "who is Jesus" and
  // Philippians 2.
  {
    slug: 'what-is-the-mark-of-the-beast',
    question: `What is the mark of the beast?`,
    category: 'Bible',
    updated: '2026-11-06',
    answer: `The mark of the beast comes from Revelation 13, where people who worship the beast take a mark on their right hand or forehead, and without it they cannot buy or sell. Christians disagree about whether it is a future, literal mark. Most agree on the main point: it stands for whose side you are on, and no one takes it by accident.`,
    body: [
      { h: `Where it comes from`, p: `In Revelation 13, John sees a beast that forces everyone to take a mark on the right hand or forehead, so that "they could not buy or sell unless they had the mark." The chapter ends with the famous number: "That number is 666." Revelation is full of symbols, so the question is what this one stands for.` },
      { h: `Three ways Christians read it`, p: `Many evangelicals expect a literal mark under a world ruler before Jesus returns. Others read it as Rome under Nero: spelled in Hebrew letters, "Nero Caesar" adds up to 666, and some early copies of Revelation even read 616, which matches another spelling of his name. Others see it as a picture of any power, in any age, that demands the loyalty that belongs to God alone.` },
      { h: `Why a hand and a forehead`, p: `In Revelation 7 and 14, God's people carry his name on their foreheads. The mark of the beast is the dark copy of that. In the Old Testament, God's words were to be tied on the hand and forehead (Deuteronomy 6:8), meaning what you do and what you think. So the mark is about worship and allegiance, not a tattoo or a chip on its own.` },
      { h: `You cannot take it by accident`, p: `Revelation describes people choosing to worship the beast. A vaccine, a bank card or a barcode is not a hidden act of worship. If you are worried you might have it, that worry itself shows your heart is turned toward God, which is the opposite of what the mark means.` },
    ],
    scriptures: [
      { ref: `Revelation 13:16-18`, text: `It also forced all people, great and small, rich and poor, free and slave, to receive a mark on their right hands or on their foreheads, so that they could not buy or sell unless they had the mark, which is the name of the beast or the number of its name. This calls for wisdom. Let the person who has insight calculate the number of the beast, for it is the number of a man. That number is 666.` },
    ],
    faqs: [
      { q: `Is the mark of the beast a microchip?`, a: `Revelation does not say so. People have linked it to many technologies over the centuries. The text is about who you worship, not the device in your pocket.` },
      { q: `Does Matthew 24 talk about the mark of the beast?`, a: `Not directly. Matthew 24 warns about false messiahs and persecution. Some Christians connect the two passages, and many read Matthew 24 mostly as Jerusalem's fall in AD 70.` },
      { q: `What does 666 mean?`, a: `Many scholars think it spells Nero's name in Hebrew numbers. Others see 6 as falling just short of 7, the Bible's number of completeness.` },
    ],
    related: ['what-does-matthew-24-mean', 'is-hell-real'],
  },
  {
    slug: 'what-does-matthew-24-mean',
    question: `What does Matthew 24 mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-06',
    answer: `In Matthew 24, Jesus predicts the temple in Jerusalem will be destroyed and warns his followers about false messiahs, wars, persecution and his return. Christians debate how much refers to Rome destroying Jerusalem in AD 70 and how much to the end of history. Its main message is the same either way: do not be deceived, stay faithful, and be ready.`,
    body: [
      { h: `The setting`, p: `Jesus' disciples point out how impressive the temple buildings are, and he answers that "not one stone here will be left on another." On the Mount of Olives they ask when this will happen and what the sign of his coming will be. The rest of the chapter answers both questions, which is why it is hard to untangle.` },
      { h: `False messiahs and hard times`, p: `Jesus warns that many will come claiming to be the Messiah, and that wars, famines and earthquakes are "the beginning of birth pains," not the end itself. His followers will be persecuted and hated. "The one who stands firm to the end will be saved."` },
      { h: `AD 70 or the end of time?`, p: `In AD 70 Roman armies destroyed Jerusalem and the temple, within a generation of Jesus speaking, and many readers see most of the chapter fulfilled then. Others see a double fulfilment, with AD 70 as a preview of the final days. Many see a shift partway through, from Jerusalem's fall to Jesus' return.` },
      { h: `Be ready, not afraid`, p: `Jesus says no one knows the day or hour, "not even the angels in heaven, nor the Son, but only the Father." So the chapter is not a timetable to decode. It ends with stories about servants who keep faithfully doing their work. The point is to live ready, not to live scared.` },
    ],
    scriptures: [
      { ref: `Matthew 24:4-6`, text: `Jesus answered: “Watch out that no one deceives you. For many will come in my name, claiming, ‘I am the Messiah,’ and will deceive many. You will hear of wars and rumors of wars, but see to it that you are not alarmed. Such things must happen, but the end is still to come.` },
      { ref: `Matthew 24:36`, text: `“But about that day or hour no one knows, not even the angels in heaven, nor the Son, but only the Father.` },
    ],
    faqs: [
      { q: `Is Matthew 24 about the end times?`, a: `At least partly. Christians agree it speaks of Jesus' return, but many read much of it as Jerusalem's destruction in AD 70.` },
      { q: `Does Matthew 24 mention the mark of the beast?`, a: `No. The mark comes from Revelation 13. Some Christians connect the two passages; the text itself does not.` },
      { q: `Should Matthew 24 make me afraid?`, a: `Jesus says the opposite: "see to it that you are not alarmed." The chapter calls for faithfulness and readiness, not fear.` },
    ],
    related: ['what-is-the-mark-of-the-beast', 'what-is-heaven-like'],
  },
  {
    slug: 'what-does-the-bible-say-about-lust',
    question: `What does the Bible say about lust?`,
    category: 'Relationships',
    updated: '2026-11-06',
    answer: `The Bible does not treat attraction or desire as sin. Lust is something else: looking at someone as something to use or possess. Jesus said lust in the heart counts, not only what we do with our bodies. But the Bible's answer is not shame. It is a new heart, honest confession, and a God who forgives and helps us change.`,
    body: [
      { h: `Attraction is not lust`, p: `God made people with bodies and desire, and the Song of Songs celebrates love and attraction openly. Noticing that someone is attractive is not a sin. Lust is when that turns into wanting them as something to have.` },
      { h: `Adultery can happen in the mind`, p: `In Matthew 5:28 Jesus says "anyone who looks at a woman lustfully has already committed adultery with her in his heart." He is raising the bar from the body to the heart. Unfaithfulness does not start when something physical happens. It starts when you keep looking and let yourself want someone.` },
      { h: `Married or single changes the question`, p: `Jesus says this while talking about adultery, so his warning is mainly about wanting someone who is not your husband or wife. If you are married, desire for your own spouse is not lust at all; the Bible celebrates it (Proverbs 5:18-19, Song of Songs, 1 Corinthians 7:3-5). Desire for someone else is the danger, and Jesus is clear that it counts even if nothing physical ever happens. If you are single, being drawn to someone you might one day marry is not adultery. The question is whether you see them as a whole person to honour or as something to have.` },
      { h: `Why the body matters`, p: `Paul says "your bodies are temples of the Holy Spirit" and "you were bought at a price. Therefore honor God with your bodies." Desire is not the enemy, but it is meant to serve love, not take from people.` },
      { h: `Not shame, and not managing it alone`, p: `Some people say lust is just part of them and the goal is to harness it. The Bible agrees that shame does not heal anyone. But it offers more than control: God promises to forgive and "purify us from all unrighteousness." Change usually comes through honesty with God and a trusted friend, plus practical steps, more than willpower alone.` },
    ],
    scriptures: [
      { ref: `Matthew 5:27-28`, text: `“You have heard that it was said, ‘You shall not commit adultery.’ But I tell you that anyone who looks at a woman lustfully has already committed adultery with her in his heart.` },
      { ref: `1 Corinthians 6:19-20`, text: `Do you not know that your bodies are temples of the Holy Spirit, who is in you, whom you have received from God? You are not your own; you were bought at a price. Therefore honor God with your bodies.` },
      { ref: `1 John 1:9`, text: `If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.` },
    ],
    faqs: [
      { q: `Is it a sin to be attracted to someone?`, a: `No. Attraction is part of being human. Lust is wanting someone as something to use or have.` },
      { q: `I'm married and attracted to someone else. Have I already sinned?`, a: `A passing notice is not the sin. Jesus says adultery begins in the heart, so the sin starts when you keep looking and let yourself want them: replaying it, picturing it, letting it grow. That is real unfaithfulness even if you never act on it. Turn your attention back to your spouse, be honest with God, and if it keeps pulling at you, tell a trusted friend or counsellor before it goes further.` },
      { q: `What if I keep failing?`, a: `You are not alone, and you are not too far gone. Confess it, receive forgiveness, tell someone you trust, and get practical help. If it has become compulsive, a counsellor can help.` },
      { q: `Is masturbation lust?`, a: `The Bible never mentions it directly, and Christians disagree. Most agree that the thoughts and habits around it are what matter.` },
    ],
    related: ['will-god-forgive-me', 'what-does-the-bible-say-about-marriage'],
  },
  {
    slug: 'why-did-jesus-say-my-god-why-have-you-forsaken-me',
    question: `Why did Jesus say "My God, why have you forsaken me?"`,
    category: 'Jesus Christ',
    updated: '2026-11-06',
    answer: `On the cross Jesus cried out the opening line of Psalm 22, "My God, my God, why have you forsaken me?" It was real anguish as he carried the weight of sin. It was also a pointer: Psalm 22 describes pierced hands and feet, mockers, and clothing divided by lot, and it ends in victory. People who knew the psalm would have heard the whole song.`,
    body: [
      { h: `He was quoting a psalm`, p: `Matthew records Jesus crying "Eli, Eli, lema sabachthani?" in Aramaic, the first line of Psalm 22. In Jesus' day, quoting the opening of a psalm called the whole psalm to mind, much like naming a hymn by its first line.` },
      { h: `The psalm describes the cross`, p: `Psalm 22 was written about a thousand years earlier, long before crucifixion existed, yet it reads like an eyewitness account. "They pierce my hands and my feet" (v. 16). "They divide my clothes among them and cast lots for my garment" (v. 18), which John 19:23-24 says the soldiers did. Mockers sneer "let the Lord rescue him" (v. 8), almost word for word what the crowd shouted in Matthew 27:43. And "my tongue sticks to the roof of my mouth" (v. 15) matches Jesus saying "I am thirsty."` },
      { h: `The psalm ends in victory`, p: `Psalm 22 does not stay in despair. It turns to praise, says God "has not hidden his face from him but has listened to his cry for help," and ends with future generations being told "He has done it!" Many hear that last line echoed in Jesus' final words, "It is finished."` },
      { h: `Was Jesus really abandoned?`, p: `Christians hold two things together. The cry was not an act: Jesus truly experienced the horror of bearing sin and separation. Yet the Father did not stop loving the Son. Jesus prayed this psalm as someone still trusting, still saying "my God." That is why it can become your prayer too when God feels far away.` },
    ],
    scriptures: [
      { ref: `Matthew 27:46`, text: `About three in the afternoon Jesus cried out in a loud voice, “Eli, Eli, lema sabachthani?” (which means “My God, my God, why have you forsaken me?” ).` },
      { ref: `Psalm 22:16-18`, text: `Dogs surround me, a pack of villains encircles me; they pierce my hands and my feet. All my bones are on display; people stare and gloat over me. They divide my clothes among them and cast lots for my garment.` },
      { ref: `Psalm 22:24`, text: `For he has not despised or scorned the suffering of the afflicted one; he has not hidden his face from him but has listened to his cry for help.` },
    ],
    faqs: [
      { q: `What does "Eli, Eli, lema sabachthani" mean?`, a: `It is Aramaic for "My God, my God, why have you forsaken me?", the first line of Psalm 22.` },
      { q: `Did God turn his back on Jesus?`, a: `Christians describe it differently. All agree Jesus truly felt forsaken as he bore sin, and that the Father's love for the Son never ended. Psalm 22 itself says God "listened to his cry for help."` },
      { q: `Is Psalm 22 a prophecy about Jesus?`, a: `The New Testament writers read it that way, pointing to the pierced hands and feet, the mocking and the divided clothing. Jewish readers have usually read it as David's own suffering.` },
    ],
    related: ['why-did-jesus-have-to-die', 'why-does-god-feel-so-far-away'],
  },
  {
    slug: 'did-jesus-preach-to-the-dead',
    question: `Did Jesus preach to the dead?`,
    category: 'Bible',
    updated: '2026-11-06',
    answer: `Two verses in 1 Peter raise the question. 1 Peter 3:19 says Christ "made proclamation to the imprisoned spirits," and 1 Peter 4:6 says "the gospel was preached even to those who are now dead." Christians read them differently, but neither verse teaches a second chance after death. Most read 4:6 as believers who heard the gospel in life and have since died.`,
    body: [
      { h: `What 1 Peter 3:19 says`, p: `Peter says Christ was "put to death in the body but made alive in the Spirit," and then "made proclamation to the imprisoned spirits" who disobeyed in the days of Noah. Many scholars think these spirits are fallen angels, and that Christ announced his victory over them. Others think Christ preached through Noah to the people of his day.` },
      { h: `What 1 Peter 4:6 says`, p: `This verse says the gospel "was preached even to those who are now dead." The word "now" matters: most readers take it to mean Christians who heard the gospel while they were alive and have since died. The world judged them, but they live with God.` },
      { h: `The old creed line`, p: `The Apostles' Creed says Jesus "descended to the dead," and some traditions picture him freeing the faithful of earlier ages. Christians still debate exactly what that means. What they agree on is that Jesus' death and resurrection reached every part of creation.` },
      { h: `Is there a second chance after death?`, p: `Most Christians say these verses do not teach one, and Hebrews 9:27 says people die once and then face judgment. The Bible's urgent invitation is for now. And it describes God as patient, "not wanting anyone to perish."` },
    ],
    scriptures: [
      { ref: `1 Peter 3:18-19`, text: `For Christ also suffered once for sins, the righteous for the unrighteous, to bring you to God. He was put to death in the body but made alive in the Spirit. After being made alive, he went and made proclamation to the imprisoned spirits—` },
      { ref: `1 Peter 4:6`, text: `For this is the reason the gospel was preached even to those who are now dead, so that they might be judged according to human standards in regard to the body, but live according to God in regard to the spirit.` },
    ],
    faqs: [
      { q: `Who are the "imprisoned spirits" in 1 Peter 3:19?`, a: `Most likely fallen angels, connected to the days of Noah. Some read them as the people of Noah's time who heard God's warning and rejected it.` },
      { q: `What did Jesus do between his death and resurrection?`, a: `The Bible gives few details. Jesus told the thief on the cross, "today you will be with me in paradise," and the creeds say he went to the realm of the dead.` },
      { q: `Does this mean people who never heard the gospel get another chance?`, a: `These verses do not say so. Christians hold different views on people who never heard, and all of them trust God to judge fairly.` },
    ],
    related: ['what-happens-when-you-die', 'is-hell-real'],
  },
  {
    slug: 'who-is-jesus',
    question: `Who is Jesus?`,
    category: 'Jesus Christ',
    updated: '2026-11-06',
    answer: `Jesus was a Jewish teacher from Nazareth who lived in the first century, was crucified under Pontius Pilate, and, his followers say, rose from the dead. Even historians who are not Christians accept that he lived and was crucified. Christians believe he is God the Son, who became human to bring people back to God.`,
    body: [
      { h: `A real person in history`, p: `Jesus' life is reported in the four Gospels, and also mentioned by Roman and Jewish writers such as Tacitus and Josephus, who were not his followers. Nearly all historians, believing or not, accept that he lived, taught in Galilee and was crucified in Jerusalem around AD 30.` },
      { h: `What he claimed`, p: `Jesus did not only teach about God. He forgave sins, which only God can do, and said "I am the way and the truth and the life." When he asked his disciples, "Who do you say I am?", Peter answered, "You are the Messiah, the Son of the living God."` },
      { h: `More than a good teacher`, p: `Because of what he claimed, many people find it hard to call Jesus only a wise moral teacher. If his claims were false, he was either deceived or deceiving. If they were true, he is who Christians say he is. You have to decide what to do with what he said.` },
      { h: `Why it matters`, p: `John says "the Word became flesh and made his dwelling among us." Christians believe God came close in Jesus: he lived the life we could not, died for our sins, and rose again. Who Jesus is changes what life, death and forgiveness mean.` },
    ],
    scriptures: [
      { ref: `Matthew 16:15-16`, text: `“But what about you?” he asked. “Who do you say I am?” Simon Peter answered, “You are the Messiah, the Son of the living God.”` },
      { ref: `John 1:14`, text: `The Word became flesh and made his dwelling among us. We have seen his glory, the glory of the one and only Son, who came from the Father, full of grace and truth.` },
    ],
    faqs: [
      { q: `Was Jesus a real person?`, a: `Yes. Almost all historians accept that he lived and was crucified, based on the Gospels and on non-Christian Roman and Jewish writers.` },
      { q: `Did Jesus claim to be God?`, a: `Christians believe so. He forgave sins, accepted worship and spoke of himself as one with the Father. His opponents understood him to be making that claim.` },
      { q: `What do other religions say about Jesus?`, a: `Islam honours him as a prophet. Many Jewish people see him as a teacher but not the Messiah. Christianity alone says he is God become human, who rose from the dead.` },
    ],
    related: ['is-jesus-really-god', 'is-the-resurrection-of-jesus-real'],
  },
  {
    slug: 'what-does-philippians-2-mean',
    question: `What does Philippians 2 mean?`,
    category: 'Bible verses explained',
    updated: '2026-11-06',
    answer: `Philippians 2 calls Christians to humility and unity by pointing to Jesus. Paul says Jesus, though he was God, "made himself nothing," became a servant, and died on a cross, and so God exalted him above every name. Followers of Jesus are to think the same way: put others first and serve, trusting that God is at work in them.`,
    body: [
      { h: `Be like-minded`, p: `Paul opens by asking the church to be "one in spirit and of one mind." He says to "do nothing out of selfish ambition or vain conceit," but in humility to "value others above yourselves." This is the problem the rest of the chapter answers.` },
      { h: `The Christ hymn`, p: `Verses 6 to 11 may be one of the earliest Christian hymns. Jesus, "being in very nature God," did not cling to his rights but "made himself nothing," became human, and obeyed to the point of death on a cross. So God raised him to the highest place, and one day "every knee should bow" and every tongue confess that Jesus Christ is Lord.` },
      { h: `Work it out, because God works in you`, p: `Paul says to "continue to work out your salvation with fear and trembling, for it is God who works in you." This is not earning salvation. It is living out what God has already started, with God doing the deepest work.` },
      { h: `Real examples`, p: `Paul ends with two people who live this out: Timothy, who cares for others more than himself, and Epaphroditus, who nearly died serving. Humility is not an idea; it looks like ordinary people putting others first.` },
    ],
    scriptures: [
      { ref: `Philippians 2:3-4`, text: `Do nothing out of selfish ambition or vain conceit. Rather, in humility value others above yourselves, not looking to your own interests but each of you to the interests of the others.` },
      { ref: `Philippians 2:5-8`, text: `In your relationships with one another, have the same mindset as Christ Jesus: Who, being in very nature God, did not consider equality with God something to be used to his own advantage; rather, he made himself nothing by taking the very nature of a servant, being made in human likeness. And being found in appearance as a man, he humbled himself by becoming obedient to death— even death on a cross!` },
    ],
    faqs: [
      { q: `What does "made himself nothing" mean?`, a: `Jesus did not stop being God. He set aside his rights and glory to become a servant. Christians debate the exact sense of the Greek word, but agree on that.` },
      { q: `Does "work out your salvation" mean we earn it?`, a: `No. The next line says "it is God who works in you." Paul means living out a salvation God gives.` },
      { q: `Is Philippians 2 about humility?`, a: `Yes, and about unity. Jesus' humility is both the reason Christians can be humble and the pattern for how they treat each other.` },
    ],
    related: ['is-jesus-really-god', 'what-does-the-bible-say-about-pride'],
  },
  {
    slug: 'is-hermeticism-compatible-with-christianity',
    question: `Is Hermeticism compatible with Christianity?`,
    category: 'Faith & Doubt',
    updated: '2026-11-06',
    answer: `Most Christians say no, though they often admire what draws people to it. Hermeticism is an old tradition of secret wisdom, astrology and alchemy, linked to "Hermes Trismegistus." It teaches that people rise toward God through hidden knowledge and self-mastery. Christianity says God comes down to us in Jesus, and we are saved by grace, not by mastering secrets.`,
    body: [
      { h: `What Hermeticism is`, p: `Hermeticism grew from writings that appeared in Roman Egypt in the early centuries AD, credited to a legendary sage called Hermes Trismegistus. It mixes philosophy, astrology and alchemy. Its core idea is that the human mind can climb back to the divine through hidden knowledge, and that the self can be refined and transformed.` },
      { h: `Where it overlaps`, p: `People are often drawn to Hermeticism for good reasons: a sense that the world is full of meaning, a longing for God, and a desire to become whole. Christianity shares those longings. Some Christian thinkers in the Renaissance were fascinated by Hermetic texts for exactly that reason.` },
      { h: `Where it parts ways`, p: `The difference is the direction. Hermeticism is about climbing up through secret knowledge and control. The gospel is about God coming down in Jesus, openly, for everyone. Paul warns against "hollow and deceptive philosophy," and the Bible forbids divination and sorcery (Deuteronomy 18:10-12). In Acts 19, new believers in Ephesus burned their books of sorcery.` },
      { h: `If someone you love is exploring it`, p: `Start with what they are longing for, not with an argument. If they already believe there is no eternal life except through Christ, that is common ground. Ask what Hermeticism gives them that they have not found in Jesus, and listen. Then share how Jesus meets that longing without asking them to master it alone.` },
    ],
    scriptures: [
      { ref: `Colossians 2:8`, text: `See to it that no one takes you captive through hollow and deceptive philosophy, which depends on human tradition and the elemental spiritual forces of this world rather than on Christ.` },
      { ref: `Deuteronomy 18:10-12`, text: `Let no one be found among you who sacrifices their son or daughter in the fire, who practices divination or sorcery, interprets omens, engages in witchcraft, or casts spells, or who is a medium or spiritist or who consults the dead. Anyone who does these things is detestable to the Lord; because of these same detestable practices the Lord your God will drive out those nations before you.` },
    ],
    faqs: [
      { q: `Is The Kybalion Christian?`, a: `No. The Kybalion is a 1908 book presenting "Hermetic principles." It is not Christian and does not come from the ancient Hermetic writings.` },
      { q: `Can a Christian study Hermeticism?`, a: `Studying it to understand history or a friend is different from practising it. Most Christians would warn against using its practices, like astrology or rituals, as a spiritual path.` },
      { q: `What does the Bible say about secret knowledge?`, a: `The gospel is not a secret for the few. Paul says Christ is the one "in whom are hidden all the treasures of wisdom and knowledge," and that wisdom is offered openly to everyone.` },
    ],
    related: ['is-christianity-the-only-way-to-god', 'who-is-jesus'],
  },
];

export const ANSWERS_BY_SLUG = Object.fromEntries(ANSWERS.map((a) => [a.slug, a]));

// ── Rendering ────────────────────────────────────────────────────────────────

export function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

const SITE = 'https://www.kinwove.com';
const HEAD_FONT = "Georgia,'Times New Roman',serif";

export function shell({ title, description, canonical, jsonLd, bodyHtml, lang = 'en', dir = 'ltr', alternates = [] }) {
  // hreflang pairs must be RECIPROCAL — each page has to point at the other and
  // at itself — or Google treats them as unrelated duplicates rather than
  // translations of one another. Callers pass the full set, their own URL
  // included.
  const altTags = alternates
    .map((x) => `<link rel="alternate" hreflang="${esc(x.lang)}" href="${esc(x.href)}">`)
    .join('\n');
  return `<!doctype html><html lang="${esc(lang)}" dir="${esc(dir)}"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500&display=swap" rel="stylesheet">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(canonical)}">
${altTags}
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:site_name" content="kinwove">
<meta property="og:image" content="${SITE}/og-image.png">
<meta name="twitter:card" content="summary_large_image">
${jsonLd.map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n')}
<style>
  :root{--ink:#1A1108;--soft:#5A4733;--muted:#9C7B5E;--gold:#B8733A;--parch:#FAF3E2;--cream:#F5EDD8;--line:rgba(26,17,8,0.12)}
  *{box-sizing:border-box}body{margin:0;background:var(--parch);color:var(--ink);font-family:Newsreader,Georgia,serif;line-height:1.65;font-size:18px}
  .bar{background:#1A1108;padding:24px 20px 14px}.bar a{color:#FDF8F0;font-family:${HEAD_FONT};font-size:22px;font-weight:600;text-decoration:none}
  /* Same wordmark as the app header (KinwoveWordmark): Fraunces, dotless i, star as its dot. */
  .bar a.wm{font-family:'Fraunces',Georgia,serif;font-weight:500;font-size:28px;line-height:1;letter-spacing:-0.022em;font-variation-settings:"opsz" 70;display:inline-block}
  .wm-i{position:relative;display:inline-block}
  .wm-i svg{position:absolute;top:-0.72em;left:50%;transform:translateX(-50%);width:0.28em;height:0.28em;display:block}
  main{max-width:720px;margin:0 auto;padding:28px 20px 64px}
  .cat{font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--gold);font-weight:700;margin-bottom:10px}
  h1{font-family:${HEAD_FONT};font-size:30px;line-height:1.2;margin:0 0 18px;letter-spacing:-0.01em}
  .answer{background:#fff;border:1px solid var(--line);border-left:4px solid var(--gold);border-radius:12px;padding:18px 20px;font-size:19px;color:var(--ink);margin:0 0 28px}
  h2{font-family:${HEAD_FONT};font-size:21px;margin:30px 0 8px}
  p{margin:0 0 14px;color:var(--soft)}
  blockquote{margin:18px 0;padding:14px 18px;background:var(--cream);border-radius:10px;font-style:italic;color:var(--ink)}
  blockquote .ref{display:block;font-style:normal;font-size:13px;color:var(--gold);font-weight:700;margin-top:8px}
  .faq{margin-top:36px;border-top:1px solid var(--line);padding-top:8px}
  .faq h3{font-family:${HEAD_FONT};font-size:17px;margin:22px 0 4px}
  .cta{display:block;text-align:center;margin:36px 0 8px;background:#1A1108;color:#F5EDD8;text-decoration:none;padding:15px 22px;border-radius:999px;font-weight:600;font-size:16px}
  .related{margin-top:34px;border-top:1px solid var(--line);padding-top:18px}
  .related a{display:block;color:var(--gold);text-decoration:none;font-size:16px;margin:8px 0}
  .foot{margin-top:40px;font-size:13px;color:var(--muted)}.foot a{color:var(--gold);text-decoration:none}
  .updated{font-size:12px;color:var(--muted);margin-top:2px}
  /* Ask box — these pages are where search and ChatGPT drop people, and until
     now they dead-ended in two links to more static pages. The form hands the
     question to the app's existing ?q= handler: guests get three free
     exchanges, signed-in people get it sent straight into their chat. */
  .askbox{margin-top:34px;border-top:1px solid var(--line);padding-top:22px}
  .askbox .cat{margin-bottom:10px}
  .askbox form{display:flex;gap:8px;flex-wrap:wrap}
  .askbox input{flex:1 1 240px;min-width:0;padding:13px 15px;font-size:16px;font-family:inherit;
    color:var(--ink);background:#fff;border:1px solid var(--line);border-radius:10px;outline:none}
  .askbox input:focus{border-color:var(--gold)}
  .askbox button{padding:13px 22px;font-size:15px;font-weight:600;font-family:inherit;cursor:pointer;
    color:#fff;background:var(--ink);border:none;border-radius:999px}
  .askbox .note{font-size:12.5px;color:var(--muted);margin-top:9px}
</style></head><body>
<div class="bar"><a class="wm" href="${SITE}" aria-label="kinwove">k<span class="wm-i">ı<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1 L13.4 9.6 L22 11 L13.4 12.4 L12 23 L10.6 12.4 L2 11 L10.6 9.6 Z" fill="#D4A24A"/></svg></span>nwove</a></div>
<main>${bodyHtml}</main>
</body></html>`;
}

// ── /for-churches ───────────────────────────────────────────────────────────
// On Daniel's list since 31 July. Until now /for-churches, /pastors and
// /sermon-prep all returned the SPA fallback — a pastor who received an outreach
// email and looked kinwove up landed on "You don't have to have it figured out
// to belong here", which tells them nothing about what is being offered to them.
//
// Deliberately does not lead with sermon writing. AlignedAI gives that away free
// to 4,600+ pastors and monetises donation processing; competing on their
// strongest, cheapest feature is a bad trade. What kinwove has that they do not
// is somewhere a congregation's actual doubts can go.
export function renderForChurchesPage() {
  const canonical = `${SITE}/for-churches`;
  const title = 'kinwove for churches, where your congregation takes the questions they do not ask out loud';
  const description =
    'A place your people can take the questions they would not raise in a foyer: honest answers grounded in scripture, a prayer wall, and somewhere the week between Sundays actually goes. Free while in beta.';
  const jsonLd = [
    {
      '@context': 'https://schema.org', '@type': 'WebPage',
      name: title, description, url: canonical,
      publisher: { '@type': 'Organization', name: 'kinwove', url: SITE },
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: [
        { q: 'What does kinwove actually do for a church?',
          a: 'It gives your congregation somewhere to take the questions they are not raising on a Sunday: answered honestly, grounded in scripture, without pressure. Alongside that: a prayer wall, a feed for your church, and sermon discussion.' },
        { q: 'Is this a sermon writing tool?',
          a: 'No. There are good tools for that and kinwove is not trying to be one. This is about the six days after the sermon rather than the writing of it.' },
        { q: 'What does it cost?',
          a: 'Nothing at the moment. kinwove is in free beta and is not taking payment from churches while that lasts.' },
        { q: 'What happens to what people type into it?',
          a: 'Conversations belong to the person who had them. A pastor does not get a feed of what their congregation has been asking, and kinwove stores no IP address and does no location tracking.' },
        { q: 'How much work is this for me?',
          a: 'A church page takes a few minutes to set up. After that the useful part runs without you: people ask what they were going to ask anyway, and you see the prayer wall.' },
      ].map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];

  const bodyHtml = `
    <div class="cat">kinwove for churches</div>
    <h1>The questions your people are not asking you</h1>
    <div class="answer">Most of what someone is wrestling with never reaches the foyer. Not because they distrust you, because asking the pastor makes a doubt official. kinwove gives them somewhere to ask it at eleven at night, honestly, and usually that is what leads to a conversation with you rather than replacing one.</div>

    <h2>What it is</h2>
    <p>A place your congregation can take a hard question and get a straight answer: grounded in scripture, willing to say "I don't know", and built for people who are doubting or new rather than people who already speak the language. Around that sits a prayer wall, a feed for your church, and somewhere the week between Sundays can go.</p>

    <h2>What it is not</h2>
    <p>It is not a sermon writer. There are several good ones and kinwove is not trying to be another. It is not church management, giving, or a website builder. It does not hand you a dashboard of what your congregation has been confessing at midnight. Those conversations belong to the people who had them.</p>

    <h2>Why a pastor might want it</h2>
    <p>Because the discipleship problem is Tuesday, not Sunday. People leave with something real and by midweek it has been crowded out, and nothing in a normal church app is built for the moment they wanted to keep pulling the thread. A question asked honestly midweek does more than a devotional nobody opens.</p>
    <p>And because some of your people are already typing their hardest questions into an AI tonight. That is happening whether or not a church is involved. The only open question is whether anything in that conversation points back toward a real person in a real church.</p>

    <blockquote>Now the Berean Jews were of more noble character than those in Thessalonica, for they received the message with great eagerness and examined the Scriptures every day to see if what Paul said was true.<span class="ref">Acts 17:11</span></blockquote>

    <h2>Honest about where this is</h2>
    <p>kinwove is young. It is in free beta, it is not taking money from churches, and it does not yet have a congregation using it at scale. You would be early, with everything that means both ways. If that is the wrong stage for your church, that is a completely reasonable read.</p>
    <p>What that also means: if you tell us what your people actually need, it can still be built around that.</p>

    <h2>Questions</h2>
    <div class="faq">
      <h3>Is this a sermon writing tool?</h3>
      <p>No. This is about the six days after the sermon rather than the writing of it.</p>
      <h3>What does it cost?</h3>
      <p>Nothing while kinwove is in beta. No card, no trial clock.</p>
      <h3>Do I see what my congregation asks?</h3>
      <p>No. Their conversations are theirs. You see the prayer wall, and what people choose to post.</p>
      <h3>How much setup is it?</h3>
      <p>A few minutes for a church page and a join code. After that it mostly runs without you.</p>
      <h3>What do you do with people's data?</h3>
      <p>kinwove stores no IP address and does no location tracking. Conversations belong to the person who had them.</p>
    </div>

    <p style="margin-top:32px"><a class="cta" href="${SITE}/?church=1">Set up your church page →</a></p>
    <p style="font-size:14px;color:var(--muted)">Or write to <a href="mailto:hello@kinwove.com" style="color:var(--gold)">hello@kinwove.com</a> and ask a real question first. A person answers.</p>
  `;

  return shell({ title, description, canonical, jsonLd, bodyHtml });
}

export function renderAnswerPage(a, lang = 'en') {
  // A translated page lives at /<lang>/answers/<slug> and is its OWN canonical.
  // Pointing it at the English URL would ask Google to drop it, which defeats
  // the point of translating it at all.
  const isTranslated = lang !== 'en';
  const canonical = isTranslated ? `${SITE}/${lang}/answers/${a.slug}` : `${SITE}/answers/${a.slug}`;
  const alternates = (isTranslated || (a.translations ?? []).length)
    ? [
        { lang: 'en', href: `${SITE}/answers/${a.source ?? a.slug}` },
        ...(isTranslated
          ? [{ lang, href: `${SITE}/${lang}/answers/${a.slug}` }]
          : (a.translations ?? []).map((t) => ({ lang: t, href: `${SITE}/${t}/answers/${a.slug}` }))),
        { lang: 'x-default', href: `${SITE}/answers/${a.source ?? a.slug}` },
      ]
    : [];
  const askUrl = `${SITE}/?q=${encodeURIComponent(a.question)}`;
  const jsonLd = [
    {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: a.question, description: a.answer,
      dateModified: a.updated, datePublished: a.updated,
      author: { '@type': 'Organization', name: 'kinwove' },
      publisher: { '@type': 'Organization', name: 'kinwove', url: SITE },
      mainEntityOfPage: canonical,
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: a.faqs.map((f) => ({
        '@type': 'Question', name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];
  const related = a.related.map((s) => ANSWERS_BY_SLUG[s]).filter(Boolean);
  // Only the English pages: translated refs are not in English book names.
  const chapters = isTranslated ? [] : chapterLinksForRefs(a.scriptures.map((x) => x.ref));
  // Translation notice. Rendered ONLY when the translation supplies its own
  // wording — never auto-generated in English, which would be useless to the
  // reader it is meant to warn.
  const noticeHtml = a.notice
    ? `<aside style="border:1px solid #E8D5BB;background:#FDF8F0;border-radius:10px;padding:14px 16px;margin:0 0 26px;font-size:14px;line-height:1.85;color:#5A4733">`
      + a.notice.lines.map((l) => `<div>${esc(l)}</div>`).join('')
      + `<div style="margin-top:8px"><a href="${SITE}/answers/${esc(a.source ?? a.slug)}" style="color:#B8733A">${esc(a.notice.linkLabel)}</a></div>`
      + `</aside>`
    : '';

  const bodyHtml = `
    <div class="cat">${esc(a.category)}</div>
    <h1>${esc(a.question)}</h1>
    ${noticeHtml}
    <div class="answer">${esc(a.answer)}</div>
    ${a.body.map((s) => `<h2>${esc(s.h)}</h2><p>${esc(s.p)}</p>`).join('')}
    ${a.scriptures.map((s) => `<blockquote>${esc(s.text)}<span class="ref">, ${esc(s.ref)}</span></blockquote>`).join('')}
    ${chapters.length ? `<div class="related"><div class="cat">Read the whole chapter</div>${chapters.map((c) => `<a href="${c.url}">${esc(c.label)}: ${esc(c.title)} →</a>`).join('')}</div>` : ''}
    <a class="cta" href="${esc(askUrl)}">Ask your own question →</a>
    <div class="faq">
      <div class="cat">Common questions</div>
      ${a.faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}
    </div>
    <div class="askbox">
      <div class="cat">Still wondering something?</div>
      <form action="${SITE}/" method="get">
        <input type="text" name="q" required maxlength="500" autocomplete="off"
               placeholder="Ask your own question…" aria-label="Ask your own question">
        <button type="submit">Ask</button>
      </form>
      <div class="note">Three questions free, no account needed.</div>
    </div>
    ${related.length ? `<div class="related"><div class="cat">Keep exploring</div>${related.map((r) => `<a href="${SITE}/answers/${r.slug}">${esc(r.question)} →</a>`).join('')}</div>` : ''}
    <div class="updated">Last updated ${esc(a.updated)}</div>
    <div class="foot">
      <p style="font-style:italic;line-height:1.7;margin:0 0 10px">kinwove's answers are designed never to invent quotes, statistics, or scripture: every Bible reference is verified against the actual text, and where faithful Christians genuinely disagree, we say so.</p>
      <a href="${SITE}/answers">All questions</a> · <a href="${SITE}">kinwove, honest answers to hard faith questions</a>
    </div>`;
  return shell({
    title: `${a.question} | kinwove`,
    description: a.answer.slice(0, 155),
    canonical, jsonLd, bodyHtml,
    lang, dir: a.dir ?? 'ltr', alternates,
  });
}

export function renderAnswerIndex() {
  const canonical = `${SITE}/answers`;
  const jsonLd = [{
    '@context': 'https://schema.org', '@type': 'CollectionPage',
    name: 'Honest answers to hard faith questions', url: canonical,
  }];
  const bodyHtml = `
    <div class="cat">kinwove answers</div>
    <h1>Honest answers to hard faith questions</h1>
    <p>Real questions about faith, doubt, God, and the Bible, answered honestly, without pressure. Ask your own anytime.</p>
    <div class="related" style="border-top:none;margin-top:20px;padding-top:0">
      ${ANSWERS.map((a) => `<a href="${SITE}/answers/${a.slug}">${esc(a.question)} →</a>`).join('')}
    </div>
    <a class="cta" href="${SITE}">Open kinwove →</a>`;
  return shell({
    title: 'Honest answers to hard faith questions | kinwove',
    description: 'Real, honest answers to hard questions about faith, doubt, suffering, the resurrection, and the Bible. No pressure, no agenda.',
    canonical, jsonLd, bodyHtml,
  });
}
