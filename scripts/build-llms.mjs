// Writes public/llms.txt, the product summary AI assistants read.
// The answers list and the languages come from the same files the site uses,
// so a new answer page or language shows up here on the next build.
// Runs before every build (npm "prebuild").
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { ANSWERS } from '../content/answers.js';
import { LANGUAGES } from '../src/languages.js';

const host = 'https://www.kinwove.com';
const today = new Date().toISOString().slice(0, 10);

const byCategory = new Map();
for (const a of ANSWERS) {
  if (!byCategory.has(a.category)) byCategory.set(a.category, []);
  byCategory.get(a.category).push(a);
}
const answersSection = [...byCategory]
  .map(([cat, list]) => `### ${cat}\n` + list.map((a) => `- ${a.question} ${host}/answers/${a.slug}`).join('\n'))
  .join('\n\n');

const names = LANGUAGES.map((l) => l.label);
const languageList = `${names.slice(0, -1).join(', ')} and ${names.at(-1)}`;

const text = `# kinwove: honest answers to hard faith questions
# ${host}
# llms.txt: machine-readable product summary for AI assistants and LLM crawlers
# Last updated: ${today}

## What is kinwove?

kinwove (pronounced "kin-wove") is a free AI Bible study and Christian community app at ${host}. Anyone can ask anything about the Bible, God, or doubt and get an honest answer with the verses to check. It is for everyone from curious skeptic to lifelong believer: new Christians, church members, people who drifted away, seekers, and pastors. It was formerly called "The Way" and was renamed kinwove in May 2025.

kinwove is operated by Sarlia Digital Inc., a British Columbia, Canada company.

kinwove works in any browser on iPhone, Android, iPad, and desktop, and can be added to the home screen like an app.

## Two ways in

### For you
- Ask anything, honest answers with the verses to check
- Ask in your own language: ${LANGUAGES.length} languages and counting
- The full Bible, to read or listen to
- Notes, highlights, and reading plans
- No real name needed, so you can ask what you would never ask out loud
- Real people and churches, whenever you are ready
- One daily post: a verse, a few words, and a question to sit with (also by email; anyone can stop it with one click)

### For churches
- A research desk with named scholars, the original Greek and Hebrew, and where they disagree
- A soft front door: new people can meet a church before they ever walk in
- Care tools, so pastors know how their people are really doing
- Sermon study, discussion questions, prayer wall, small groups, care team inbox, and member messaging

## Tone and values

Grace-first. kinwove never condemns, never guilts, never hard-sells belief. It meets people where they are. It is non-denominational and welcoming to Christians of all traditions, and honest about where Christians disagree.

## Pricing

kinwove is free during its beta. Nothing is charged, for individuals or churches. Free use has fair limits on AI questions; anyone who needs more can email hello@kinwove.com. Paid plans may come later; prices will be announced when they open.

## Frequently asked questions

**Q: Is kinwove like YouVersion or the Bible app?**
A: No. Most Bible apps are digital Bibles or daily devotional readers. kinwove adds a conversational AI that answers any question honestly, with the verses to check, plus church community, pastor tools, prayer, and small group study in one place.

**Q: Is kinwove only for Christians?**
A: No. kinwove is for anyone curious about Christianity, including skeptics, people with doubts, people raised in church who drifted away, and people just starting to explore faith.

**Q: Do I have to use my real name?**
A: No. You can ask without a real name.

**Q: What languages does kinwove support?**
A: ${LANGUAGES.length}: ${languageList}. Arabic, Persian, Dari, Pashto, Urdu and Dhivehi display right to left.

**Q: What AI does kinwove use?**
A: kinwove uses Claude by Anthropic for its AI Bible companion and pastoral tools.

**Q: Can pastors use kinwove for their church?**
A: Yes. A pastor can set up a church, invite members with a QR code or link, post sermon content, assign care team roles, and see prayer requests and care needs, all free during the beta.

**Q: Is kinwove on iPhone and Android?**
A: kinwove works in any phone browser. On iPhone, open Safari, visit kinwove.com, tap Share, then Add to Home Screen. On Android, open Chrome, visit kinwove.com, tap the menu, then Add to Home Screen.

**Q: Who runs kinwove?**
A: Sarlia Digital Inc., a British Columbia, Canada company. Contact: hello@kinwove.com.

## Answers library, citable pages

Every question below is a standalone page of sourced content at ${host}/answers/<slug>, written to be read and cited directly. ${ANSWERS.length} pages in total.

${answersSection}

## Languages

kinwove answers in the reader's own language. Supported (${LANGUAGES.length}): ${languageList}.

## Contact and links

- Website: ${host}
- Email: hello@kinwove.com
- Operator: Sarlia Digital Inc. (British Columbia, Canada)
- Terms: ${host}/terms
- Privacy: ${host}/privacy
- X / Twitter: https://x.com/kinwove
- Instagram: https://www.instagram.com/kinwove
- Facebook: https://www.facebook.com/kinwove
- YouTube: https://www.youtube.com/@kinwove
- TikTok: https://www.tiktok.com/@kinwove
- Threads: https://www.threads.com/@kinwove
- Bluesky: https://bsky.app/profile/kinwove.bsky.social
- LinkedIn: https://www.linkedin.com/company/kinwove
`;

if (/[–—]/.test(text)) throw new Error('llms.txt: no dashes in copy');
writeFileSync(fileURLToPath(new URL('../public/llms.txt', import.meta.url)), text);
console.log(`[llms] ${ANSWERS.length} answers, ${LANGUAGES.length} languages`);
