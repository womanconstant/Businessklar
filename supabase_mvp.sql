-- BusinessKlar MVP: share + leads (run in Supabase SQL editor)

alter table public.business_cases add column if not exists share_token text;
alter table public.business_cases add column if not exists is_shared boolean default false;

create unique index if not exists idx_business_cases_share_token
  on public.business_cases (share_token)
  where share_token is not null;

-- Optional: allow anonymous read of rows that are explicitly shared (MVP; review for production)
drop policy if exists "business_cases_anon_select_shared" on public.business_cases;
create policy "business_cases_anon_select_shared"
  on public.business_cases for select
  to anon, authenticated
  using (is_shared is true and share_token is not null);

-- Ensure owners can update share fields (adjust if you already have a broader UPDATE policy)
drop policy if exists "business_cases_owner_update" on public.business_cases;
create policy "business_cases_owner_update"
  on public.business_cases for update
  to authenticated
  using (profile_id = auth.uid())
  with check (profile_id = auth.uid());

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references auth.users (id) on delete cascade,
  email text,
  source text default 'report_pdf_gate',
  case_id uuid references public.business_cases (id) on delete set null,
  created_at timestamptz default now()
);

alter table public.leads enable row level security;

drop policy if exists "leads_insert_own" on public.leads;
create policy "leads_insert_own"
  on public.leads for insert
  to authenticated
  with check (profile_id = auth.uid());

drop policy if exists "leads_select_own" on public.leads;
create policy "leads_select_own"
  on public.leads for select
  to authenticated
  using (profile_id = auth.uid());

-- List own cases in dashboard (adjust if you already have a broader SELECT policy)
drop policy if exists "business_cases_owner_select" on public.business_cases;
create policy "business_cases_owner_select"
  on public.business_cases for select
  to authenticated
  using (profile_id = auth.uid());

drop policy if exists "business_cases_owner_delete" on public.business_cases;
create policy "business_cases_owner_delete"
  on public.business_cases for delete
  to authenticated
  using (profile_id = auth.uid());
