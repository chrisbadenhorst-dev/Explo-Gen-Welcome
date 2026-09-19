-- Explo-Gen Technologies — Co-Founder Welcome Experience
-- Run this in the Supabase SQL editor (or via `supabase db push`) once per project.

create extension if not exists "pgcrypto";

create table if not exists applicants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  role text not null default 'Co-Founder',
  created_at timestamptz not null default now()
);

create table if not exists invitations (
  id uuid primary key default gen_random_uuid(),
  applicant_id uuid not null references applicants(id) on delete cascade,
  token text not null unique,
  meeting_date text not null,
  meeting_time text not null,
  personal_message text,
  status text not null default 'pending' check (status in ('pending', 'opened', 'accepted', 'unavailable')),
  opened_at timestamptz,
  responded_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists invitations_token_idx on invitations (token);
create index if not exists invitations_applicant_id_idx on invitations (applicant_id);

create table if not exists responses (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null unique references invitations(id) on delete cascade,
  response text not null check (response in ('accepted', 'unavailable')),
  created_at timestamptz not null default now()
);

-- Row Level Security stays on with no policies: all access goes through the
-- server-only service-role client (lib/supabase/server.ts), never the browser.
alter table applicants enable row level security;
alter table invitations enable row level security;
alter table responses enable row level security;
