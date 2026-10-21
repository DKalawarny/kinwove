// The English source for every string the language menu can translate: the
// landing page, the guest ask box, and the few app labels around translation.
// Translations live in src/i18n/<code>.json, written by
// scripts/translate-site-strings.mjs (which also back-translates each one to
// check the meaning). Change a string here, then re-run that script.
//
// Markup the renderer understands (src/i18n/rich.jsx), and that every
// translation must keep exactly:
//   <em>…</em>  emphasis
//   <br>        line break
//   <wbr>       line break on wide screens, a space on phones
export const STRINGS_EN = {
  // Landing: header
  signIn: 'Sign in',
  getStarted: 'Get started',
  referral: "Someone who knows you thought you'd find this worthwhile.",

  // Landing: hero
  heroTitle: "You don't have to have it<wbr>figured out to <em>belong here.</em>",
  heroSub: 'AI that stays in scripture. Real people at every stage. Tools for your church between Sundays.',
  askPlaceholder: 'Ask anything about faith…',
  askButton: 'Ask →',
  example1: 'If God is real, why do innocent people suffer?',
  example2: 'I prayed for years and nothing changed. Is God even listening?',
  example3: 'Is there actual evidence the resurrection happened?',
  example4: 'Can I have real doubts and still belong here?',

  // Landing: two ways in
  twoWaysIn: 'Two ways in',
  forYou: 'For you',
  forYouBody: 'Honest answers to the questions you actually have, doubt included. An AI that stays in scripture and says "I don\'t know" when it doesn\'t, a Bible you can ask anything, and people at every stage of the same road.',
  forYouWho: 'For the curious · the skeptic · the searching · the believer',
  forYou1: 'Ask anything, honest answers with the verses to check',
  forYou2: 'Ask in your own language, 49 and counting',
  forYou3: 'The full Bible, to read or listen to',
  forYou4: 'Notes, highlights, and reading plans',
  forYou5: "No real name needed, so you can ask what you'd never ask out loud",
  forYou6: "Real people and churches, whenever you're ready",
  startAsking: 'Start asking →',
  forChurch: 'For your church',
  forChurchBody: "Sunday's sermon becomes a week of engagement. A research desk for sermon prep, daily questions your congregation actually answers, and a prayer wall that tells you how your people are really doing.",
  forChurch1: 'A research desk with named scholars, the original Greek and Hebrew, and where they disagree',
  forChurch2: "Sunday's outline becomes a week of daily questions",
  forChurch3: 'A soft front door. New people can meet your church before they ever walk in',
  forChurch4: 'Care tools, so you know how your people are really doing',
  freeForChurches: "Free for churches while we're in beta · no card",
  setUpChurch: 'Set up your church →',
  videoEndYou: 'Bring your questions.',
  videoEndChurch: 'From your study to their whole week.',
  watch: 'Watch',
  close: 'Close',
  watchAgain: 'Watch again',

  // Landing: trust band
  trustKicker: 'Why not just ask ChatGPT?',
  trustTitle: 'We know you might not trust AI<wbr>with something this important.',
  trustBody: "Most AI will invent a Bible verse before it will admit it doesn't know. For a question about God, that's not acceptable. kinwove was built with one rule at its core: <em>if it's not in the text, we don't say it.</em>",
  trust1: 'Never invents quotes, statistics, or scripture. "I don\'t know" is built in',
  trust2: 'Every scripture reference is checked against the actual Bible text',
  trust3: 'Honest when faithful Christians genuinely disagree. It tells you that',

  // Landing: closing
  begin: 'Begin',
  closingTitle: "Start asking.<br>We'll meet you there.",
  closingBody: 'No right beliefs required. No background check. Free to explore wherever you are.',
  getStartedFree: 'Get started free →',
  noCard: 'No credit card · Takes 30 seconds',
  alreadyHere: 'Already here?',
  tagline: 'Real answers to hard faith questions.',
  footerAnswers: 'Answers',
  footerPrivacy: 'Privacy',
  footerTerms: 'Terms',
  footerContact: 'Contact',
  machineNotice: 'This page was translated automatically and has not yet been checked by a native speaker.',

  // Language menu + translation, in the app
  language: 'Language',
  searchLanguages: 'Search languages',
  seeTranslation: 'See translation',
  showOriginal: 'Show original',
  translating: 'Translating…',
  translateFailed: "Couldn't translate this right now.",
};
