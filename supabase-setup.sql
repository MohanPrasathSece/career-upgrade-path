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
-- Use the /api/admin/login endpoint with username "admin" and password "Admin@2025"
-- The password will be automatically hashed on first login.
-- Or run: INSERT INTO public.admin_users (username, password) VALUES ('admin', 'plaintext-for-first-login');
