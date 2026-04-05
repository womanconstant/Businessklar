-- Catalog fields for specialists listing / filters. Run when public.consultants exists.
-- Order: run before supabase_marketplace.sql if you add marketplace in the same migration batch;
--   languages/cities below ensure GIN indexes can be created if the base table omitted them.
alter table public.consultants add column if not exists languages text[] default '{}';
alter table public.consultants add column if not exists cities text[] default '{}';
alter table public.consultants add column if not exists categories text[] default '{}';
alter table public.consultants add column if not exists services text[] default '{}';
alter table public.consultants add column if not exists address text;

create index if not exists idx_consultants_categories on public.consultants using gin (categories);
create index if not exists idx_consultants_languages on public.consultants using gin (languages);
create index if not exists idx_consultants_cities on public.consultants using gin (cities);
