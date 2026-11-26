import { useState } from 'react';
import { supabase } from './supabase.js';
import { T } from './theme.js';
import { getStoredUtm, clearStoredUtm } from './utm.js';
import { Turnstile, TURNSTILE_ENABLED } from './Turnstile.jsx';
import { isNativeApp } from './native.js';
import { recordTermsAcceptance, markTermsPending } from './termsConsent.js';
import { KinwoveWordmark } from './components/brand/KinwoveWordmark.jsx';
import { useStrings } from './i18n/viewLanguage.js';
import { rich } from './i18n/rich.jsx';

// Supabase's error text is English. For the few common ones, show the reader's
// language; anything else (and every message in English) stays exactly as sent.
const ERR_KEYS = { 'User already registered': 'aErrRegistered', 'Invalid login credentials': 'aErrBadLogin', 'Email not confirmed': 'aErrNotConfirmed' };
const errText = (msg, str, lang) => (lang === 'en' || !msg ? msg : (str[ERR_KEYS[msg]] ?? msg));

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 13, color: T.inkSoft, marginBottom: 6 }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const input = {
  width: '100%',
  border: `1px solid ${T.line}`,
  borderRadius: 10,
  padding: '11px 14px',
  fontSize: 15,
  background: T.white,
  color: T.ink,
  outline: 'none',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
};

const DEV_LOGIN_ENABLED =
  import.meta.env.DEV &&
  !!import.meta.env.VITE_DEV_LOGIN_EMAIL &&
  !!import.meta.env.VITE_DEV_LOGIN_PASSWORD;

function ResendButton({ email }) {
  const { s: str } = useStrings();
  const [state, setState] = useState('idle'); // idle | sending | sent | error
  async function resend() {
    setState('sending');
    const { error } = await supabase.auth.resend({ type: 'signup', email });
    setState(error ? 'error' : 'sent');
    if (!error) setTimeout(() => setState('idle'), 5000);
  }
  return (
    <button
      onClick={resend}
      disabled={state === 'sending' || state === 'sent'}
      style={{
        width: '100%', background: T.gold, color: T.cream, border: 'none',
        borderRadius: 999, padding: '13px 20px', fontSize: 15, fontWeight: 600,
        cursor: state === 'sending' || state === 'sent' ? 'default' : 'pointer',
        opacity: state === 'sending' ? 0.7 : 1, marginTop: 4,
      }}
    >
      {state === 'sending' ? str.aSending : state === 'sent' ? str.aEmailSent : state === 'error' ? str.aTryAgain : str.aResend}
    </button>
  );
}

export default function Auth({ onAuth, onBack, initialMode = 'signin' }) {
  const { s: str, lang } = useStrings();
  const [mode, setMode] = useState(initialMode); // signin | signup | verify
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaReset, setCaptchaReset] = useState(0);
  const resetCaptcha = () => setCaptchaReset((n) => n + 1);

  async function handleDevLogin() {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase.auth.signInWithPassword({
      email: import.meta.env.VITE_DEV_LOGIN_EMAIL,
      password: import.meta.env.VITE_DEV_LOGIN_PASSWORD,
    });
    setLoading(false);
    if (err) return setError(`Dev login failed: ${err.message}`);
    onAuth(data.session);
  }

  async function handleSignUp(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const utm = getStoredUtm();
    const { data: signUpData, error: err } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        captchaToken,
        data: {
          // First-touch attribution — stored in raw_user_meta_data,
          // visible in the Supabase dashboard under Authentication → Users.
          ...(utm?.utm_source   && { utm_source:   utm.utm_source }),
          ...(utm?.utm_medium   && { utm_medium:   utm.utm_medium }),
          ...(utm?.utm_campaign && { utm_campaign: utm.utm_campaign }),
          ...(utm?.ref          && { referral_ref:  utm.ref }),
          ...(utm?.landing_url  && { landing_url:   utm.landing_url }),
        },
      },
    });
    setLoading(false);
    if (err) { resetCaptcha(); return setError(err.message); }
    clearStoredUtm(); // attribution captured — clean up
    // Record which version of the Terms this person ticked the box for. Fire and
    // forget: the account already exists, and a failed log must never block
    // someone getting into the app. Server stamps the time, IP and user agent.
    recordTermsAcceptance(signUpData?.user?.id);
    // If Supabase returns a session immediately (email confirmation disabled),
    // hand it to App.jsx so the wizard can run. Otherwise show the verify screen.
    if (signUpData?.session) {
      onAuth(signUpData.session);
    } else {
      setMode('verify');
    }
  }

  async function handleSignIn(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase.auth.signInWithPassword({ email, password, options: { captchaToken } });
    setLoading(false);
    if (err) { resetCaptcha(); return setError(err.message); }
    onAuth(data.session);
  }

  async function handleReset(e) {
    e.preventDefault();
    setLoading(true); setError(null);
    const { error: err } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin });
    setLoading(false);
    if (err) return setError(err.message);
    setResetSent(true);
  }

  async function handleGoogle() {
    setError(null);
    // Signing up with Google: the box is ticked here, but the acceptance can
    // only be written once we're back with a session. Park it.
    if (mode === 'signup') markTermsPending();
    const utm = getStoredUtm();
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
        // First-touch attribution carried through the OAuth round-trip.
        queryParams: {
          ...(utm?.utm_source && { utm_source: utm.utm_source }),
        },
      },
    });
    if (err) setError(err.message);
    // On success the browser redirects to Google, then back — App.jsx picks up
    // the session via onAuthStateChange, so there's nothing to do here.
  }

  // After the recovery link lands, Supabase already has a session in recovery
  // state — set the new password, then proceed straight into the app.
  async function handleUpdatePassword(e) {
    e.preventDefault();
    setLoading(true); setError(null);
    const { error: err } = await supabase.auth.updateUser({ password });
    if (err) { setLoading(false); return setError(err.message); }
    const { data } = await supabase.auth.getSession();
    setLoading(false);
    if (data?.session) onAuth(data.session);
  }

  const btn = {
    width: '100%',
    background: T.ink,
    color: T.cream,
    border: 'none',
    borderRadius: 999,
    padding: '13px 20px',
    fontSize: 15,
    fontWeight: 600,
    cursor: loading ? 'not-allowed' : 'pointer',
    opacity: loading ? 0.6 : 1,
    marginTop: 8,
  };

  if (mode === 'reset') {
    return (
      <div style={wrap}>
        <div style={card}>
          <div style={eyebrow}><KinwoveWordmark size={26} textColor={T.ink} starColor={T.honey} /></div>
          <h2 style={title}>{str.aResetTitle}</h2>
          {resetSent ? (
            <>
              <p style={{ color: T.inkSoft, fontSize: 15, lineHeight: 1.6 }}>
                {str.aResetSentPre} <strong>{email}</strong>, {str.aResetSentPost}
              </p>
              <button onClick={() => { setMode('signin'); setResetSent(false); setError(null); }} style={{ ...btn, background: 'transparent', color: T.inkMuted, border: `1px solid ${T.line}`, marginTop: 10 }}>
                {str.aBackToSignIn}
              </button>
            </>
          ) : (
            <form onSubmit={handleReset}>
              <p style={{ color: T.inkSoft, fontSize: 14, lineHeight: 1.6, margin: '0 0 14px' }}>
                {str.aResetIntro}
              </p>
              <Field label={str.aEmail}>
                <input style={input} type="email" name="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@somewhere.com" required />
              </Field>
              {error && <div style={{ color: T.error, fontSize: 13, marginBottom: 10 }}>{errText(error, str, lang)}</div>}
              <button type="submit" style={btn} disabled={loading}>{loading ? str.aSending : str.aSendReset}</button>
              <button type="button" onClick={() => { setMode('signin'); setError(null); }} style={{ background: 'none', border: 'none', color: T.goldDark, fontSize: 13, cursor: 'pointer', marginTop: 14, width: '100%' }}>{str.aBackToSignInArrow}</button>
            </form>
          )}
        </div>
      </div>
    );
  }

  if (mode === 'recovery') {
    return (
      <div style={wrap}>
        <div style={card}>
          <div style={eyebrow}><KinwoveWordmark size={26} textColor={T.ink} starColor={T.honey} /></div>
          <h2 style={title}>{str.aNewPwTitle}</h2>
          <form onSubmit={handleUpdatePassword}>
            <Field label={str.aNewPw}>
              <input style={input} type={showPassword ? 'text' : 'password'} name="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={str.aMin8} minLength={8} required />
            </Field>
            {error && <div style={{ color: T.error, fontSize: 13, marginBottom: 10 }}>{errText(error, str, lang)}</div>}
            <button type="submit" style={btn} disabled={loading}>{loading ? str.aSaving : str.aSaveNewPw}</button>
          </form>
        </div>
      </div>
    );
  }

  if (mode === 'verify') {
    return (
      <div style={wrap}>
        <div style={card}>
          <div style={eyebrow}><KinwoveWordmark size={26} textColor={T.ink} starColor={T.honey} /></div>
          <h2 style={title}>{str.aCheckEmail}</h2>
          <p style={{ color: T.inkSoft, fontSize: 15, lineHeight: 1.6 }}>
            {str.aVerifyPre} <strong>{email}</strong>. {str.aVerifyPost}
          </p>
          <p style={{ color: T.inkMuted, fontSize: 13, lineHeight: 1.6, marginTop: 0 }}>
            {str.aNoEmail}
          </p>
          <ResendButton email={email} />
          <button onClick={() => setMode('signin')} style={{ ...btn, background: 'transparent', color: T.inkMuted, border: `1px solid ${T.line}`, marginTop: 10 }}>
            {str.aBackToSignIn}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={wrap}>
      <div style={card}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: T.goldDark, fontSize: 14, cursor: 'pointer', padding: 0, marginBottom: 16 }}>
          {str.aBack}
        </button>
        <div style={eyebrow}><KinwoveWordmark size={26} textColor={T.ink} starColor={T.honey} /></div>
        <h2 style={title}>{mode === 'signin' ? str.aWelcomeBack : str.aJoin}</h2>

        {/* Google blocks OAuth inside embedded webviews (disallowed_useragent)
            and the redirect can't land back in the app shell — email-only
            sign-in in the native app until a system-browser flow ships. */}
        {!isNativeApp && <button
          type="button"
          onClick={handleGoogle}
          disabled={loading || (mode === 'signup' && !ageConfirmed)}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            background: T.white, color: T.ink, border: `1px solid ${T.line}`,
            borderRadius: 999, padding: '12px 20px', fontSize: 15, fontWeight: 600,
            cursor: (loading || (mode === 'signup' && !ageConfirmed)) ? 'not-allowed' : 'pointer',
            opacity: (loading || (mode === 'signup' && !ageConfirmed)) ? 0.6 : 1,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"/>
            <path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z"/>
            <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.46 3.44 1.35l2.58-2.58C13.47.89 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"/>
          </svg>
          {str.gGoogle}
        </button>}

        {/* Signing in shows no checkbox — but Google creates an account for
            anyone who has never used it, so the terms still need naming here. */}
        {!isNativeApp && mode === 'signin' && (
          <p style={{ fontSize: 11.5, color: T.inkMuted, lineHeight: 1.5, margin: '10px 0 0', textAlign: 'center' }}>
            {str.aByContinuing}{' '}
            <a href="/terms" target="_blank" rel="noopener" style={{ color: T.goldDark }}>{str.gTerms}</a> {str.gAnd}{' '}
            <a href="/privacy" target="_blank" rel="noopener" style={{ color: T.goldDark }}>{str.gPrivacy}</a>.
          </p>
        )}

        {!isNativeApp && <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '18px 0' }}>
          <div style={{ flex: 1, height: 1, background: T.line }} />
          <span style={{ fontSize: 12, color: T.inkMuted }}>{str.aOr}</span>
          <div style={{ flex: 1, height: 1, background: T.line }} />
        </div>}

        <form onSubmit={mode === 'signin' ? handleSignIn : handleSignUp}>
          <Field label={str.aEmail}>
            <input
              style={input}
              type="email"
              name="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@somewhere.com"
              required
            />
          </Field>
          <Field label={str.aPassword}>
            <div style={{ position: 'relative' }}>
              <input
                style={{ ...input, paddingRight: 44 }}
                type={showPassword ? 'text' : 'password'}
                name="password"
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === 'signup' ? str.aMin8 : ''}
                minLength={8}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 12, color: T.inkMuted, padding: '2px 4px',
                }}
              >
                {showPassword ? str.aHide : str.aShow}
              </button>
            </div>
          </Field>

          {mode === 'signin' && (
            <button type="button" onClick={() => { setMode('reset'); setError(null); }} style={{ background: 'none', border: 'none', color: T.goldDark, fontSize: 13, cursor: 'pointer', padding: '6px 0 8px', margin: '0 0 6px', textDecoration: 'underline', textUnderlineOffset: 3 }}>
              {str.aForgot}
            </button>
          )}

          {error && (
            <div style={{ color: T.error, fontSize: 13, marginBottom: 10 }}>{errText(error, str, lang)}</div>
          )}

          {mode === 'signup' && (
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={ageConfirmed}
                onChange={(e) => setAgeConfirmed(e.target.checked)}
                style={{ marginTop: 3, accentColor: T.gold, width: 16, height: 16, flexShrink: 0 }}
              />
              <span style={{ fontSize: 13, color: T.inkSoft, lineHeight: 1.5 }}>
                {str.gAgePre}{' '}
                <a href="/terms" target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()} style={{ color: T.goldDark }}>{str.gTerms}</a> {str.gAnd}{' '}
                <a href="/privacy" target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()} style={{ color: T.goldDark }}>{str.gPrivacy}</a>.
                <span style={{ display: 'block', color: T.inkMuted, fontSize: 11.5, marginTop: 3 }}>
                  {str.aUnder13}
                </span>
              </span>
            </label>
          )}

          <Turnstile onToken={setCaptchaToken} resetKey={captchaReset} />

          {(() => {
            const disabled = loading || (mode === 'signup' && !ageConfirmed) || (TURNSTILE_ENABLED && !captchaToken);
            return (
          <button type="submit" style={{ ...btn, opacity: disabled ? 0.6 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }} disabled={disabled}>
            {loading ? str.aOneMoment : mode === 'signin' ? str.signIn : str.aCreateAccount}
          </button>
            );
          })()}
        </form>

        {DEV_LOGIN_ENABLED && (
          <button
            onClick={handleDevLogin}
            disabled={loading}
            style={{
              ...btn,
              background: 'transparent',
              color: T.goldDark,
              border: `1px dashed ${T.goldLight}`,
              marginTop: 12,
            }}
          >
            ⚡ Dev quick-login ({import.meta.env.VITE_DEV_LOGIN_EMAIL})
          </button>
        )}

        <div style={{ marginTop: 16, textAlign: 'center', fontSize: 13, color: T.inkMuted }}>
          {mode === 'signin' ? (
            <>
              {str.aNewHere}{' '}
              <button
                onClick={() => { setMode('signup'); setError(null); }}
                style={{ background: 'none', border: 'none', color: T.goldDark, cursor: 'pointer', fontSize: 13 }}
              >
                {str.aCreateAnAccount}
              </button>
            </>
          ) : (
            <>
              {str.aHaveOne}{' '}
              <button
                onClick={() => { setMode('signin'); setError(null); }}
                style={{ background: 'none', border: 'none', color: T.goldDark, cursor: 'pointer', fontSize: 13 }}
              >
                {str.signIn}
              </button>
            </>
          )}
        </div>

        <div style={{ marginTop: 20, fontSize: 12, color: T.inkMuted, textAlign: 'center', lineHeight: 1.5 }}>
          {rich(str.aSafeSpace)}
        </div>
      </div>
    </div>
  );
}

// Same dawn-over-hills scene as the landing hero, darkened, so signing in feels like the same place.
const AUTH_BG = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/site-video/hero-hills.jpg`;
const wrap = {
  minHeight: '100vh',
  background: `linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.62) 60%, rgba(26,17,10,0.9) 100%), url("${AUTH_BG}") center / cover no-repeat, #1A110A`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
};

const card = {
  background: T.parchment,
  borderRadius: 22,
  border: '1px solid rgba(26,17,10,0.12)',
  borderTop: `3px solid ${T.honey}`,
  boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
  padding: 'clamp(22px, 5.5vw, 34px)',
  maxWidth: 420,
  width: '100%',
};

const eyebrow = {
  fontFamily: T.display,
  fontSize: 18,
  fontWeight: 500,
  letterSpacing: '-0.02em',
  color: T.goldDark,
  marginBottom: 18,
};

const title = {
  fontFamily: T.display,
  fontSize: 30,
  fontWeight: 600,
  color: T.ink,
  letterSpacing: '-0.02em',
  lineHeight: 1.1,
  margin: '0 0 22px',
};
