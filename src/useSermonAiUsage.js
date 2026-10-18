import { useCallback, useEffect, useState } from 'react';
import { supabase } from './supabase.js';

export const FREE_SERMON_LIMIT  = 3;    // lifetime, non-church
export const TRIAL_MSG_LIMIT    = 100;  // total during 5-week trial

// Monthly caps for paid church plans — single source of truth in planConfig.js
import { SERMON_PAID_LIMITS as PAID_LIMITS } from './planConfig.js';
import { PAYMENTS_LIVE } from './usePlan.js';

const PERIOD_FREE  = 'sermon-lifetime';
const PERIOD_TRIAL = 'sermon-trial';

function currentMonthKey() {
  const d = new Date();
  return `sermon-${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

// Tracks AI sermon generation usage.
// free        → 3 lifetime generations
// trial       → 100 total during trial window
// church_base → 250/month
// church_pro  → 250/month
export function useSermonAiUsage(userId, plan = 'free') {
  const isFree  = !plan || plan === 'free';
  const isTrial = plan === 'trial';
  // While payments are off a trial can't be upgraded, so a lifetime cap would
  // lock a church out for good. In the beta a trial church gets the Base plan's
  // monthly allowance instead, and it resets on the 1st.
  const isBeta  = isTrial && !PAYMENTS_LIVE;
  const paidCap = PAID_LIMITS[plan] ?? null;
  const isPaid  = !isFree && !isTrial && paidCap !== null;

  const period = isBeta ? currentMonthKey() : isTrial ? PERIOD_TRIAL : isFree ? PERIOD_FREE : currentMonthKey();
  const limit  = isBeta ? PAID_LIMITS.church_base : isFree ? FREE_SERMON_LIMIT : isTrial ? TRIAL_MSG_LIMIT : paidCap;

  const [used, setUsed] = useState(null);
  const [topup, setTopup] = useState(0);  // extra uses granted by hand ("email us and we'll add some")

  const load = useCallback(async () => {
    if (!userId) { setUsed(0); return; }
    const { data } = await supabase
      .from('ai_usage')
      .select('count, topup')
      .eq('user_id', userId)
      .eq('period', period)
      .maybeSingle();
    setUsed(data?.count ?? 0);
    setTopup(data?.topup ?? 0);
  }, [userId, period]);

  useEffect(() => { load(); }, [load]);

  const loading   = used === null;
  const atLimit   = !loading && limit !== null && (used ?? 0) >= limit + topup;
  const remaining = limit !== null ? Math.max(0, limit + topup - (used ?? 0)) : Infinity;

  async function increment() {
    if (!userId) return;
    await supabase.rpc('increment_ai_usage', {
      p_user_id: userId,
      p_period:  period,
    });
    setUsed((u) => (u ?? 0) + 1);
  }

  return { loading, used: used ?? 0, remaining, atLimit, isFree, isTrial, isBeta, isPaid, limit, increment };
}
