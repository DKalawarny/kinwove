import { Fragment } from 'react';
import { T } from '../theme.js';
import { splitScriptureRefs } from '../lib/scriptureLinks.js';

// Post text with Bible references ("John 3:16") as gold links that open the passage.
export default function RefText({ text, onRef }) {
  if (!onRef || !text) return text ?? null;
  return splitScriptureRefs(text).map((p, i) => p.ref ? (
    <span
      key={i}
      role="link"
      tabIndex={0}
      onClick={(e) => { e.stopPropagation(); onRef(p.ref); }}
      onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); onRef(p.ref); } }}
      style={{ color: T.goldDark, cursor: 'pointer', textDecoration: 'underline', textDecorationColor: 'rgba(142,85,40,0.35)', textUnderlineOffset: 3 }}
    >{p.text}</span>
  ) : <Fragment key={i}>{p.text}</Fragment>);
}
