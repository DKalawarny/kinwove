import { useEffect, useRef, useState } from 'react';
import { T } from '../theme.js';

// Landing "Two ways in" videos. Files live in the public `site-video` bucket:
// <name>-1080.mp4, <name>-720.mp4, <name>-poster.jpg, <name>.vtt
const BASE = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/site-video`;

// The cover inside a door card. Tapping it opens the large player.
export function DoorVideoCover({ name, onOpen, label = 'Watch' }) {
  return (
    <button onClick={onOpen} aria-label="Watch the video"
      style={{ position: 'relative', display: 'block', width: '100%', aspectRatio: '16 / 9', borderRadius: 14, overflow: 'hidden', border: 0, padding: 0, cursor: 'pointer', marginBottom: 22, background: '#000' }}>
      <img src={`${BASE}/${name}-poster.jpg`} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.55))' }} />
      <span style={{ position: 'absolute', left: 14, bottom: 12, width: 44, height: 44, borderRadius: '50%', background: 'rgba(245,237,216,0.92)', display: 'grid', placeItems: 'center', boxShadow: '0 6px 24px rgba(0,0,0,0.4)' }}>
        <svg width="15" height="17" viewBox="0 0 20 22" style={{ marginLeft: 3 }}><path d="M0 0l20 11L0 22z" fill="#1A110A" /></svg>
      </span>
      <span style={{ position: 'absolute', left: 68, bottom: 24, fontSize: 13, fontWeight: 600, color: T.cream, letterSpacing: '0.02em', fontFamily: T.sans }}>{label}</span>
    </button>
  );
}

// The large player over the page. When the video ends, the door's own button shows over the last frame.
export function DoorVideoPlayer({ name, endTitle, endLabel, onEndAction, onClose, closeLabel = 'Close', againLabel = 'Watch again' }) {
  const ref = useRef(null);
  const [ended, setEnded] = useState(false);
  const size = typeof window !== 'undefined' && window.innerWidth < 900 ? 720 : 1080;

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    ref.current?.play().then(null, () => {});
    return () => { removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  const again = () => { setEnded(false); if (ref.current) { ref.current.currentTime = 0; ref.current.play().then(null, () => {}); } };

  return (
    <div onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: 'fixed', inset: 0, zIndex: 500, background: 'rgba(8,5,2,0.9)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ position: 'relative', width: 'min(1200px, 100%)' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: -4, right: 0, transform: 'translateY(-100%)', background: 'none', border: 0, color: T.cream, fontSize: 15, cursor: 'pointer', padding: 8, fontFamily: T.sans }}>{closeLabel} ✕</button>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', maxHeight: 'calc(100vh - 32px)', borderRadius: 14, overflow: 'hidden', background: '#000', boxShadow: '0 20px 80px rgba(0,0,0,0.6)' }}>
          <video ref={ref} controls={!ended} playsInline crossOrigin="anonymous" preload="auto" poster={`${BASE}/${name}-poster.jpg`}
            onEnded={() => setEnded(true)} style={{ width: '100%', height: '100%', display: 'block' }}>
            <source src={`${BASE}/${name}-${size}.mp4`} type="video/mp4" />
            <track kind="subtitles" src={`${BASE}/${name}.vtt`} srcLang="en" label="English" default />
          </video>
          {ended && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'clamp(8px, 2vw, 14px)', background: 'rgba(14,9,4,0.94)', padding: 16 }}>
              <div style={{ fontFamily: T.serif, fontSize: 'clamp(18px, 3vw, 34px)', fontWeight: 600, color: T.cream, textAlign: 'center' }}>{endTitle}</div>
              <button onClick={() => { onClose(); onEndAction?.(); }}
                style={{ background: T.cream, color: '#1A110A', border: 'none', padding: '12px 26px', borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: T.sans }}>{endLabel}</button>
              <button onClick={again} style={{ background: 'none', border: 0, color: 'rgba(253,248,240,0.55)', fontSize: 13, cursor: 'pointer', textDecoration: 'underline', fontFamily: T.sans }}>{againLabel}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
