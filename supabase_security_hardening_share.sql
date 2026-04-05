-- BusinessKlar: fix shared-case access (run in Supabase SQL editor after supabase_mvp.sql)
--
-- Problem: policy "business_cases_anon_select_shared" allowed SELECT for any row with
-- is_shared=true to roles anon + authenticated, without binding to share_token — a client
-- could omit the token filter and read all shared cases.
--
-- Fix: drop that policy; expose only a SECURITY DEFINER function that returns one row by token.

drop policy if exists "business_cases_anon_select_shared" on public.business_cases;

-- Idempotent: replace function body
create or replace function public.get_shared_case_by_token (p_token text)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'legal_form', bc.legal_form,
    'activity_text', bc.activity_text,
    'city_name', bc.city_name,
    'revenue_y1', bc.revenue_y1,
    'expenses_monthly', bc.expenses_monthly
  )
  from public.business_cases bc
  where bc.is_shared is true
    and bc.share_token is not null
    and bc.share_token = p_token
  limit 1;
$$;

comment on function public.get_shared_case_by_token (text) is
  'Returns minimal jsonb for share.html by token; does not expose raw_data or full row.';

grant execute on function public.get_shared_case_by_token (text) to anon;
grant execute on function public.get_shared_case_by_token (text) to authenticated;
grant execute on function public.get_shared_case_by_token (text) to service_role;

-- Ensure business_cases_owner_insert exists (supabase_mvp.sql): required for save flow.
