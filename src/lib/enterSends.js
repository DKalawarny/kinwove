// Enter sends a message, Shift+Enter adds a line. Two exceptions:
// - a phone keyboard has no Shift key, so in a multi-line box Return adds a line
//   and the Send button sends (a one-line input still submits on Return);
// - Japanese, Chinese and Korean keyboards press Enter to pick a word, which must not send.
export function enterSends(e) {
  if (e.key !== 'Enter' || e.shiftKey) return false;
  if (e.nativeEvent?.isComposing || e.isComposing || e.keyCode === 229) return false;
  const multiLine = e.target?.tagName === 'TEXTAREA' || e.target?.isContentEditable;
  const touch = typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches;
  return !(multiLine && touch);
}
