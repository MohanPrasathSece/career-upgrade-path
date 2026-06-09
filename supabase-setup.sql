-- ============================================================
-- Career Upgrade — Full Supabase Setup
-- Run this in: https://supabase.com/dashboard/project/noyxkzdttsmgypxdiuhf/sql/new
-- Safe to re-run (uses IF NOT EXISTS + DROP POLICY IF EXISTS)
-- ============================================================


-- ── 1. SUBMISSIONS TABLE (contact form enquiries) ────────────
create table if not exists public.submissions (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  email           text not null,
  phone           text,
  address         text,
  date_of_birth   date,
  course          text,
  funding_type    text,
  when_to_start   text,
  additional_info text,
  message         text not null,
  is_read         boolean not null default false,
  notes           text,
  status          text not null default 'New'
                  check (status in ('New', 'In Review', 'Contacted', 'Closed')),
  created_at      timestamptz not null default now()
);

create index if not exists submissions_created_at_idx
  on public.submissions (created_at desc);

alter table public.submissions enable row level security;

-- Drop and recreate policies safely
do $$
begin
  if exists (select 1 from pg_policies where policyname = 'Service role full access on submissions' and tablename = 'submissions') then
    drop policy "Service role full access on submissions" on public.submissions;
  end if;
end $$;
create policy "Service role full access on submissions"
  on public.submissions for all using (true) with check (true);

do $$
begin
  if exists (select 1 from pg_policies where policyname = 'Anon can insert submissions' and tablename = 'submissions') then
    drop policy "Anon can insert submissions" on public.submissions;
  end if;
end $$;
create policy "Anon can insert submissions"
  on public.submissions for insert to anon with check (true);


-- ── 2. APPLICATIONS TABLE (apply form) ──────────────────────
create table if not exists public.applications (
  id              uuid primary key default gen_random_uuid(),
  full_name       text not null,
  email           text not null,
  phone           text not null,
  address         text,
  date_of_birth   date,
  funding_type    text not null check (funding_type in ('Government Funded', 'Fee Paying')),
  when_to_start   text,
  message         text,
  status          text not null default 'New'
                  check (status in ('New', 'In Review', 'Enrolled', 'Rejected')),
  notes           text,
  is_read         boolean not null default false,
  created_at      timestamptz not null default now()
);

create index if not exists applications_created_at_idx
  on public.applications (created_at desc);

alter table public.applications enable row level security;

drop policy if exists "Service role full access on applications" on public.applications;
create policy "Service role full access on applications"
  on public.applications for all using (true) with check (true);

drop policy if exists "Anon can insert applications" on public.applications;
create policy "Anon can insert applications"
  on public.applications for insert to anon with check (true);


-- ── 3. ADMIN USERS TABLE (login credentials) ────────────────
create table if not exists public.admin_users (
  id          uuid primary key default gen_random_uuid(),
  username    text not null unique,
  password    text not null,
  created_at  timestamptz not null default now()
);

alter table public.admin_users enable row level security;

drop policy if exists "Service role full access on admin_users" on public.admin_users;
create policy "Service role full access on admin_users"
  on public.admin_users for all using (true) with check (true);

-- Default admin credentials — CREATE VIA API AFTER DEPLOYMENT
-- Use the /api/admin/login endpoint with username "admin" and password "CareerUpgradeAdmin@2026"
-- The password will be automatically hashed on first login.
-- Or run: INSERT INTO public.admin_users (username, password) VALUES ('admin', 'plaintext-for-first-login');


-- ── 4. PAGE VIEWS TABLE (analytics) ─────────────────────────
create table if not exists public.page_views (
  id              uuid primary key default gen_random_uuid(),
  path            text not null,
  referrer        text,
  ip_hash         text not null,
  user_agent      text,
  created_at      timestamptz not null default now()
);

create index if not exists page_views_created_at_idx
  on public.page_views (created_at desc);

create index if not exists page_views_path_idx
  on public.page_views (path);

alter table public.page_views enable row level security;

drop policy if exists "Anon can insert page_views" on public.page_views;
create policy "Anon can insert page_views"
  on public.page_views for insert to anon with check (true);

drop policy if exists "Service role full access on page_views" on public.page_views;
create policy "Service role full access on page_views"
  on public.page_views for all using (true) with check (true);


-- ── 5. OPTIMIZED ANALYTICS SUMMARY RPC ──────────────────────
create or replace function get_analytics_summary(prev_days int)
returns json as $$
declare
  total_views bigint;
  unique_visitors bigint;
  views_by_path json;
  views_by_referrer json;
  daily_stats json;
begin
  -- 1. Total views
  select count(*) into total_views 
  from public.page_views 
  where created_at >= now() - (prev_days || ' days')::interval;
  
  -- 2. Unique visitors
  select count(distinct ip_hash) into unique_visitors 
  from public.page_views 
  where created_at >= now() - (prev_days || ' days')::interval;
  
  -- 3. Views by path
  select json_agg(r) into views_by_path from (
    select path, count(*) as count, count(distinct ip_hash) as unique_count
    from public.page_views
    where created_at >= now() - (prev_days || ' days')::interval
    group by path
    order by count desc
    limit 15
  ) r;
  
  -- 4. Views by referrer
  select json_agg(r) into views_by_referrer from (
    select coalesce(nullif(referrer, ''), 'Direct / Bookmark') as referrer, count(*) as count
    from public.page_views
    where created_at >= now() - (prev_days || ' days')::interval
    group by referrer
    order by count desc
    limit 10
  ) r;
  
  -- 5. Daily stats
  select json_agg(r) into daily_stats from (
    select 
      created_at::date::text as date,
      count(*) as views,
      count(distinct ip_hash) as uniques
    from public.page_views
    where created_at >= now() - (prev_days || ' days')::interval
    group by created_at::date
    order by date asc
  ) r;

  return json_build_object(
    'total_views', coalesce(total_views, 0),
    'unique_visitors', coalesce(unique_visitors, 0),
    'views_by_path', coalesce(views_by_path, '[]'::json),
    'views_by_referrer', coalesce(views_by_referrer, '[]'::json),
    'daily_stats', coalesce(daily_stats, '[]'::json)
  );
end;
$$ language plpgsql security definer;

