// When a message to Ask reaches back to an earlier conversation, or asks for
// this one to be kept. Lives on its own so the server and its tests share one copy.
//
// Real people misspell "remember" and say "what I asked" as often as "what you
// said". AT typed "do you rememebr what i asked about romans" (8 Nov 2026), the
// old pattern missed it, and Ask told a returning user it couldn't see their
// first Romans thread, which was saved on their account the whole time.
export const LOOKS_BACKWARD = /\b(earlier|before|last time|previously|the other day|yesterday|last (week|night|month|year|session)|we (talked|discussed|spoke|were talking|went over|covered)|you (said|told|mentioned|asked|gave)|i (asked|told|mentioned|said|was asking)|do (you|u) re?m[a-z]{3,7}|(you|u) re?mem[a-z]{1,5}|remember (when|that|our|what|me)|recall|that conversation|our (last |previous )?(chat|conversation|talk|study)|back (when|to the)|from (before|the start)|go back|pick up where|left off)\b/i;

// "can you save this conversation for next time". Ask used to say it couldn't
// and suggest a screenshot, though the thread was already saved.
export const ASKS_TO_SAVE = /\b(save|keep|store|bookmark)\b[^.?!]{0,30}\b(conversation|chat|convo|thread|study|session|this)\b|\b(for|until) next time\b|\b(will|would|can) (you|u) (remember|keep)\b/i;
