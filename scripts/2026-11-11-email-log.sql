-- A record of every email the server sends (11 Nov 2026).
--
-- Until now sendEmail() handed each email to Resend and kept nothing, so
-- "did Jennifer get her welcome?" could not be answered. One row per send:
-- which email (kind), whose account (user_id, null for guests and staff
-- alerts), Resend's id to look it up in the Resend dashboard, and the error
-- when Resend refused it. No addresses, subjects or bodies are kept.
--
-- Only the server (service role) reads or writes it: RLS on, no policies.

create table if not exists public.email_log (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  kind       text not null,
  user_id    uuid references auth.users(id) on delete set null,
  resend_id  text,
  ok         boolean not null,
  error      text
);

create index if not exists email_log_user_kind on public.email_log (user_id, kind);
create index if not exists email_log_created on public.email_log (created_at desc);

alter table public.email_log enable row level security;
revoke all on public.email_log from anon, authenticated;
