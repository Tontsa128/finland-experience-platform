create table if not exists public.site_visit_events (
  id bigint generated always as identity primary key,
  visitor_id uuid not null,
  visited_at timestamptz not null default now()
);

create index if not exists site_visit_events_visited_at_idx
  on public.site_visit_events (visited_at);

create index if not exists site_visit_events_visitor_id_idx
  on public.site_visit_events (visitor_id);

alter table public.site_visit_events enable row level security;
revoke all on public.site_visit_events from anon, authenticated;
grant all on public.site_visit_events to service_role;

create or replace function public.get_site_visitor_stats()
returns table (monthly_visitors bigint, total_visitors bigint)
language sql
security definer
set search_path = ''
as $$
  select
    count(distinct visitor_id) filter (
      where visited_at >= (
        date_trunc('month', now() at time zone 'Europe/Helsinki')
        at time zone 'Europe/Helsinki'
      )
    )::bigint as monthly_visitors,
    count(distinct visitor_id)::bigint as total_visitors
  from public.site_visit_events;
$$;

revoke all on function public.get_site_visitor_stats() from public, anon, authenticated;
grant execute on function public.get_site_visitor_stats() to service_role;
