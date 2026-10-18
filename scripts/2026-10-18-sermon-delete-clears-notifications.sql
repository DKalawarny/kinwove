-- Deleting a sermon left its notifications behind; tapping one opened a sermon that no longer exists.
create or replace function public.delete_sermon_notifications()
returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  delete from public.notifications where target_type = 'sermon' and target_id = old.id;
  return old;
end;
$$;
drop trigger if exists trg_delete_sermon_notifications on public.sermons;
create trigger trg_delete_sermon_notifications after delete on public.sermons
  for each row execute function public.delete_sermon_notifications();
