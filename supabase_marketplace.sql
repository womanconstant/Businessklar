-- BusinessKlar: specialist profiles + conversations
-- Apply after public.consultants exists. Recommended order with consultants_directory.sql:
--   1) consultants_directory.sql (catalog columns + indexes; may add languages/cities if missing)
--   2) this file (marketplace columns, chat tables, RLS)

-- --- consultants: ownership + marketplace fields --------------------------------
alter table public.consultants add column if not exists profile_id uuid references auth.users (id) on delete set null;
alter table public.consultants add column if not exists company_name text;
alter table public.consultants add column if not exists email text;
alter table public.consultants add column if not exists phone text;
alter table public.consultants add column if not exists display_name text;
alter table public.consultants add column if not exists description text;
alter table public.consultants add column if not exists status text default 'draft';
alter table public.consultants add column if not exists is_published boolean default false;
alter table public.consultants add column if not exists is_verified boolean default false;
alter table public.consultants add column if not exists created_at timestamptz default now();
alter table public.consultants add column if not exists updated_at timestamptz default now();

comment on column public.consultants.status is 'draft | review | published | suspended';
comment on column public.consultants.profile_id is 'auth.users id of the specialist owner';

create index if not exists idx_consultants_profile_id on public.consultants (profile_id);

create unique index if not exists idx_consultants_one_profile
  on public.consultants (profile_id)
  where profile_id is not null;

-- --- conversations: one thread per (client, consultant listing) -----------------
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid (),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  client_user_id uuid not null references auth.users (id) on delete cascade,
  consultant_id uuid not null references public.consultants (id) on delete cascade,
  constraint conversations_client_consultant_unique unique (client_user_id, consultant_id)
);

create index if not exists idx_conversations_client on public.conversations (client_user_id);
create index if not exists idx_conversations_consultant on public.conversations (consultant_id);

-- --- participants: per-user soft hide (deleted_at only for that user) ----------
create table if not exists public.conversation_participants (
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  deleted_at timestamptz,
  primary key (conversation_id, user_id)
);

create index if not exists idx_conv_part_user on public.conversation_participants (user_id);

-- --- messages ------------------------------------------------------------------
create table if not exists public.conversation_messages (
  id uuid primary key default gen_random_uuid (),
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  sender_user_id uuid not null references auth.users (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now ()
);

create index if not exists idx_conv_messages_conv on public.conversation_messages (conversation_id, created_at);

create or replace function public.touch_conversation_updated_at ()
returns trigger
language plpgsql
as $$
begin
  update public.conversations
  set updated_at = now()
  where id = new.conversation_id;
  return new;
end;
$$;

drop trigger if exists trg_conv_messages_touch on public.conversation_messages;
create trigger trg_conv_messages_touch
  after insert on public.conversation_messages
  for each row execute function public.touch_conversation_updated_at ();

-- --- RLS consultants -----------------------------------------------------------
alter table public.consultants enable row level security;

drop policy if exists "consultants_select_catalog_or_own" on public.consultants;
create policy "consultants_select_catalog_or_own"
  on public.consultants for select
  to anon, authenticated
  using (
    is_published is true
    or profile_id = (select auth.uid ())
  );

drop policy if exists "consultants_insert_own" on public.consultants;
create policy "consultants_insert_own"
  on public.consultants for insert
  to authenticated
  with check (profile_id = (select auth.uid ()));

drop policy if exists "consultants_update_own" on public.consultants;
create policy "consultants_update_own"
  on public.consultants for update
  to authenticated
  using (profile_id = (select auth.uid ()))
  with check (profile_id = (select auth.uid ()));

-- --- RLS conversations ---------------------------------------------------------
alter table public.conversations enable row level security;

drop policy if exists "conversations_select_participant" on public.conversations;
create policy "conversations_select_participant"
  on public.conversations for select
  to authenticated
  using (
    exists (
      select 1 from public.conversation_participants cp
      where cp.conversation_id = conversations.id
        and cp.user_id = (select auth.uid ())
        and cp.deleted_at is null
    )
  );

drop policy if exists "conversations_insert_client" on public.conversations;
create policy "conversations_insert_client"
  on public.conversations for insert
  to authenticated
  with check (
    client_user_id = (select auth.uid ())
    and exists (
      select 1 from public.consultants c
      where c.id = consultant_id
        and c.profile_id is not null
        and c.profile_id <> (select auth.uid ())
    )
  );

-- Touch trigger updates conversations.updated_at; participants must be allowed to UPDATE that row under RLS.
drop policy if exists "conversations_update_participant" on public.conversations;
create policy "conversations_update_participant"
  on public.conversations for update
  to authenticated
  using (
    exists (
      select 1 from public.conversation_participants cp
      where cp.conversation_id = conversations.id
        and cp.user_id = (select auth.uid ())
        and cp.deleted_at is null
    )
  )
  with check (
    exists (
      select 1 from public.conversation_participants cp
      where cp.conversation_id = conversations.id
        and cp.user_id = (select auth.uid ())
        and cp.deleted_at is null
    )
  );

-- --- RLS participants ----------------------------------------------------------
alter table public.conversation_participants enable row level security;

drop policy if exists "conv_part_select_if_member" on public.conversation_participants;
create policy "conv_part_select_if_member"
  on public.conversation_participants for select
  to authenticated
  using (
    exists (
      select 1 from public.conversation_participants me
      where me.conversation_id = conversation_participants.conversation_id
        and me.user_id = (select auth.uid ())
        and me.deleted_at is null
    )
  );

drop policy if exists "conv_part_insert_creator" on public.conversation_participants;
create policy "conv_part_insert_creator"
  on public.conversation_participants for insert
  to authenticated
  with check (
    exists (
      select 1 from public.conversations conv
      where conv.id = conversation_id
        and conv.client_user_id = (select auth.uid ())
        and (
          user_id = (select auth.uid ())
          or user_id = (select c.profile_id from public.consultants c where c.id = conv.consultant_id)
        )
    )
  );

drop policy if exists "conv_part_update_own_soft_delete" on public.conversation_participants;
create policy "conv_part_update_own_soft_delete"
  on public.conversation_participants for update
  to authenticated
  using (user_id = (select auth.uid ()))
  with check (user_id = (select auth.uid ()));

-- --- RLS messages --------------------------------------------------------------
alter table public.conversation_messages enable row level security;

drop policy if exists "conv_msg_select_participant" on public.conversation_messages;
create policy "conv_msg_select_participant"
  on public.conversation_messages for select
  to authenticated
  using (
    exists (
      select 1 from public.conversation_participants cp
      where cp.conversation_id = conversation_messages.conversation_id
        and cp.user_id = (select auth.uid ())
        and cp.deleted_at is null
    )
  );

drop policy if exists "conv_msg_insert_participant" on public.conversation_messages;
create policy "conv_msg_insert_participant"
  on public.conversation_messages for insert
  to authenticated
  with check (
    sender_user_id = (select auth.uid ())
    and exists (
      select 1 from public.conversation_participants cp
      where cp.conversation_id = conversation_messages.conversation_id
        and cp.user_id = (select auth.uid ())
        and cp.deleted_at is null
    )
  );
