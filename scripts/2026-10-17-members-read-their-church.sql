-- Members of a private church could not open their own church page: the only
-- SELECT policies on churches were "verified public", "the pastor" and "admins".
-- A security definer helper reads the caller's church_id without going through
-- the profiles policies, so this policy can never recurse.
create or replace function public.current_user_church_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$ select church_id from public.profiles where id = auth.uid() $$;

revoke all on function public.current_user_church_id() from public;
grant execute on function public.current_user_church_id() to authenticated;

drop policy if exists "Members read their own church" on public.churches;
create policy "Members read their own church" on public.churches
  for select to authenticated
  using (id = public.current_user_church_id());
