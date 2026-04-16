-- BusinessKlar first public release: support_requests, business_cases.updated_at, legal form columns
-- Apply after supabase_mvp.sql + supabase_refactor_v2.sql (order: MVP → refactor v2 → this file)

-- ---------------------------------------------------------------------------
-- 1) Support tickets from contact form (anonymous + authenticated insert)
-- ---------------------------------------------------------------------------
create table if not exists public.support_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  topic text not null,
  email text not null,
  message text not null,
  user_id uuid references auth.users (id) on delete set null,
  status text not null default 'new',
  lang text,
  source_page text
);

create index if not exists idx_support_requests_created_at on public.support_requests (created_at desc);

alter table public.support_requests enable row level security;

drop policy if exists "support_requests_insert_public" on public.support_requests;
create policy "support_requests_insert_public"
  on public.support_requests for insert
  to anon, authenticated
  with check (
    length(trim(coalesce(topic, ''))) >= 1
    and length(trim(coalesce(email, ''))) >= 3
    and length(trim(coalesce(message, ''))) >= 1
    and (user_id is null or user_id = auth.uid())
  );

-- Explicit INSERT for API roles (table may exist without default grants depending on migration order)
grant insert on table public.support_requests to anon;
grant insert on table public.support_requests to authenticated;

-- No client SELECT (operators use Supabase dashboard / service role)

-- ---------------------------------------------------------------------------
-- 2) business_cases: updated_at + automatic touch on UPDATE
-- ---------------------------------------------------------------------------
alter table public.business_cases add column if not exists updated_at timestamptz;

update public.business_cases
  set updated_at = coalesce(created_at, timezone('utc', now()))
  where updated_at is null;

alter table public.business_cases alter column updated_at set default timezone('utc', now());

create or replace function public.bk_touch_business_cases_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at := timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists trg_business_cases_updated_at on public.business_cases;
-- PG14+: EXECUTE FUNCTION. On older Postgres use: EXECUTE PROCEDURE ... (same function)
create trigger trg_business_cases_updated_at
  before update on public.business_cases
  for each row
  execute function public.bk_touch_business_cases_updated_at();

-- ---------------------------------------------------------------------------
-- 3) Stable legal form fields (optional columns; also mirrored in result_data from client)
-- ---------------------------------------------------------------------------
alter table public.business_cases add column if not exists recommended_legal_form_key text;
alter table public.business_cases add column if not exists recommended_legal_form_label text;

comment on column public.business_cases.recommended_legal_form_key is 'Machine key: eu, ug, gmbh, gbr, partg';
comment on column public.business_cases.recommended_legal_form_label is 'German UI label at save time (informational)';
