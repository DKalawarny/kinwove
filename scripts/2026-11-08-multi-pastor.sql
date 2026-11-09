-- More than one pastor per church (8 Nov 2026).
--
-- A church member the lead pastor makes a "Pastor" gets the dashboard on their
-- own account. What they can do comes from the permission switches that already
-- sit on church_roles (can_post_sermons, can_manage_staff, can_edit_church, ...).
-- The church's owner (churches.pastor_id, or church_roles.is_owner) can do all of it.
--
-- Everything here adds to the existing owner policies; none of them are dropped,
-- so the lead pastor's access is unchanged.

-- 1. One check for "may this person do X in this church?"
create or replace function public.church_can(p_church uuid, p_perm text)
returns boolean
language sql stable security definer
set search_path = public
as $$
  select auth.uid() is not null and (
    exists (select 1 from churches c where c.id = p_church and c.pastor_id = auth.uid())
    or exists (
      select 1 from church_roles r
      where r.church_id = p_church and r.user_id = auth.uid()
        and (r.is_owner or case p_perm
          when 'sermons'  then r.can_post_sermons
          when 'announce' then r.can_post_announcements
          when 'moderate' then r.can_moderate
          when 'staff'    then r.can_manage_staff
          when 'edit'     then r.can_edit_church
          when 'prayers'  then r.can_view_prayers
          else false end)
    )
  );
$$;

create or replace function public.church_is_owner(p_church uuid)
returns boolean
language sql stable security definer
set search_path = public
as $$
  select auth.uid() is not null and (
    exists (select 1 from churches c where c.id = p_church and c.pastor_id = auth.uid())
    or exists (select 1 from church_roles r where r.church_id = p_church and r.user_id = auth.uid() and r.is_owner)
  );
$$;

-- 2. Who may hand out and remove roles: the owner, or someone given "People & roles".
--    (It used to be any admin/elder/pastor badge, which let a badge add or remove roles.)
create or replace function public.church_roles_is_manager(target_church_id uuid)
returns boolean
language sql stable security definer
as $$
  select public.church_can(target_church_id, 'staff');
$$;

-- Only the owner can make someone owner or change who manages people or the
-- church settings. Stops a role manager from promoting themselves.
create or replace function public.guard_church_role_escalation()
returns trigger
language plpgsql security definer
set search_path = public
as $$
begin
  if auth.uid() is null then return NEW; end if;  -- service role / server
  if public.church_is_owner(NEW.church_id) then return NEW; end if;
  if TG_OP = 'INSERT' then
    if NEW.is_owner or NEW.can_manage_staff or NEW.can_edit_church then
      raise exception 'Only the church owner can grant that.';
    end if;
  elsif NEW.is_owner is distinct from OLD.is_owner
     or NEW.can_manage_staff is distinct from OLD.can_manage_staff
     or NEW.can_edit_church is distinct from OLD.can_edit_church then
    raise exception 'Only the church owner can change that.';
  end if;
  return NEW;
end;
$$;
drop trigger if exists trg_guard_church_role_escalation on public.church_roles;
create trigger trg_guard_church_role_escalation
  before insert or update on public.church_roles
  for each row execute function public.guard_church_role_escalation();

-- 3. Accepting a Pastor invite starts with sermons, church posts and moderation on.
--    People & roles, church settings and prayers stay off until the owner turns them on.
create or replace function public.apply_role_invite_on_accept()
returns trigger
language plpgsql security definer
set search_path to 'public'
as $function$
begin
  if NEW.status = 'accepted'
     and (TG_OP = 'INSERT' or OLD.status is distinct from 'accepted')
  then
    if not exists (
      select 1 from public.profiles p
      where p.id = NEW.user_id and p.church_id = NEW.church_id
    ) then
      raise exception 'Cannot accept role invite: not a member of this church.';
    end if;

    NEW.responded_at := coalesce(NEW.responded_at, now());

    insert into public.church_roles (
      church_id, user_id, role_key, role_label, granted_by,
      can_post_sermons, can_post_announcements, can_moderate
    ) values (
      NEW.church_id, NEW.user_id, NEW.role_key, NEW.role_label, NEW.invited_by,
      NEW.role_key = 'pastor', NEW.role_key = 'pastor', NEW.role_key = 'pastor'
    )
    on conflict (church_id, user_id, role_key) do update
      set role_label = excluded.role_label,
          granted_by = excluded.granted_by,
          granted_at = now();

  elsif NEW.status in ('declined', 'cancelled')
        and (TG_OP = 'INSERT' or OLD.status is distinct from NEW.status)
  then
    NEW.responded_at := coalesce(NEW.responded_at, now());
  end if;

  return NEW;
end;
$function$;

-- Two triggers ran the same notify function, so every role invite arrived twice.
drop trigger if exists trg_notify_role_invited on public.church_role_invites;

-- 4. Sermons: the team reads drafts and manages the week's content and series.
drop policy if exists "sermons: team reads church sermons" on public.sermons;
create policy "sermons: team reads church sermons" on public.sermons
  for select using (public.church_can(church_id, 'sermons'));

drop policy if exists "sermon_content: team manages" on public.sermon_content;
create policy "sermon_content: team manages" on public.sermon_content
  for all using (exists (select 1 from sermons s where s.id = sermon_content.sermon_id and public.church_can(s.church_id, 'sermons')))
  with check (exists (select 1 from sermons s where s.id = sermon_content.sermon_id and public.church_can(s.church_id, 'sermons')));

drop policy if exists "sermon_series: team manages" on public.sermon_series;
create policy "sermon_series: team manages" on public.sermon_series
  for all using (public.church_can(church_id, 'sermons'))
  with check (public.church_can(church_id, 'sermons'));

drop policy if exists "sermon_discussions: team moderates" on public.sermon_discussions;
create policy "sermon_discussions: team moderates" on public.sermon_discussions
  for delete using (exists (
    select 1 from sermons s
    where s.id = coalesce(sermon_discussions.sermon_id,
      (select sc.sermon_id from sermon_content sc where sc.id = sermon_discussions.sermon_content_id))
      and public.church_can(s.church_id, 'moderate')));

-- The sermon's feed post is added, updated and removed by whoever publishes or unpublishes it.
drop policy if exists "posts: team updates sermon announcements" on public.posts;
create policy "posts: team updates sermon announcements" on public.posts
  for update using (scope = 'church' and (body_data->>'is_sermon_announcement') = 'true' and public.church_can(scope_id, 'sermons'));
drop policy if exists "posts: team deletes sermon announcements" on public.posts;
create policy "posts: team deletes sermon announcements" on public.posts
  for delete using (scope = 'church' and (body_data->>'is_sermon_announcement') = 'true' and public.church_can(scope_id, 'sermons'));

-- 5. Church settings, invites and blocks follow their switches.
drop policy if exists "churches: team edits" on public.churches;
create policy "churches: team edits" on public.churches
  for update using (public.church_can(id, 'edit'));

drop policy if exists "role invites: people managers" on public.church_role_invites;
create policy "role invites: people managers" on public.church_role_invites
  for all using (public.church_can(church_id, 'staff'))
  with check (public.church_can(church_id, 'staff'));

drop policy if exists "church_blocks: moderators" on public.church_blocks;
create policy "church_blocks: moderators" on public.church_blocks
  for all using (public.church_can(church_id, 'moderate'))
  with check (public.church_can(church_id, 'moderate'));

-- 6. Prep notes are the author's own. A note marked shared is readable by the
--    other pastors who can preach. (Before this, anyone with any church role,
--    care team included, could read every pastor's prep notes.)
alter table public.church_notes add column if not exists shared boolean not null default false;

drop policy if exists "church leaders can read notes" on public.church_notes;
create policy "church leaders can read notes" on public.church_notes
  for select using (author_id = auth.uid() or (shared and public.church_can(church_id, 'sermons')));

drop policy if exists "church leaders can insert notes" on public.church_notes;
create policy "church leaders can insert notes" on public.church_notes
  for insert with check (author_id = auth.uid() and public.church_can(church_id, 'sermons'));
