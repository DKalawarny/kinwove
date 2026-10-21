import { Fragment } from 'react';

// Renders the three bits of markup strings.en.js allows: <em>…</em>, <br>, and
// <wbr> (a break on wide screens, a space on phones). Nothing else is markup:
// any other angle bracket stays plain text, so a string can never inject HTML.
export function rich(str, { narrow = false, emStyle } = {}) {
  const out = [];
  const re = /<em>([\s\S]*?)<\/em>|<br>|<wbr>/g;
  let last = 0;
  let m;
  let k = 0;
  while ((m = re.exec(str))) {
    if (m.index > last) out.push(<Fragment key={k++}>{str.slice(last, m.index)}</Fragment>);
    if (m[0] === '<br>') out.push(<br key={k++} />);
    else if (m[0] === '<wbr>') out.push(narrow ? <Fragment key={k++}>{' '}</Fragment> : <br key={k++} />);
    else out.push(<em key={k++} style={emStyle}>{m[1]}</em>);
    last = re.lastIndex;
  }
  if (last < str.length) out.push(<Fragment key={k++}>{str.slice(last)}</Fragment>);
  return out;
}
