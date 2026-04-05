-- BusinessKlar refactor v2: PDF storage path, narrowed share RPC, private bucket (run in Supabase SQL editor)
-- Prerequisites: supabase_mvp.sql + supabase_security_hardening_share.sql applied

-- 1) Persist generated PDF path (private Storage object, not public URL)
alter table public.business_cases add column if not exists pdf_storage_path text;

comment on column public.business_cases.pdf_storage_path is
  'Path inside bucket case_pdfs, format: {auth.uid()}/{case_id}.pdf';

-- 2) Share RPC: use supabase_security_hardening_share.sql (narrow jsonb, not bc.*)

-- 3) Private bucket for PDF artifacts (authenticated signed URLs only)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('case_pdfs', 'case_pdfs', false, 52428800, array['application/pdf']::text[])
on conflict (id) do update set public = excluded.public;

-- 4) Storage RLS: users read/write only under folder named with their auth.uid()
drop policy if exists "case_pdfs_insert_own" on storage.objects;
create policy "case_pdfs_insert_own"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'case_pdfs'
    and split_part(name, '/', 1) = auth.uid()::text
  );

drop policy if exists "case_pdfs_update_own" on storage.objects;
create policy "case_pdfs_update_own"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'case_pdfs'
    and split_part(name, '/', 1) = auth.uid()::text
  )
  with check (
    bucket_id = 'case_pdfs'
    and split_part(name, '/', 1) = auth.uid()::text
  );

drop policy if exists "case_pdfs_select_own" on storage.objects;
create policy "case_pdfs_select_own"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'case_pdfs'
    and split_part(name, '/', 1) = auth.uid()::text
  );

-- 5) Auth: add Site URL + Redirect URLs in Supabase Dashboard (Authentication → URL configuration):
--    - Site URL: your deployed origin, e.g. https://yourdomain.com/
--    - Redirect URLs: https://yourdomain.com/index.html (and local dev equivalents)
--    Email templates: confirmation link uses emailRedirectTo from the client signUp call.
