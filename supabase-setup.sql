-- KIES 2026 — Supabase schema for symposium-wide question upvoting
-- Run this once in the Supabase SQL editor (or provision via the Supabase MCP connector).
-- Uses the anon public key on the client; RLS below is what keeps writes safe.

-- 1. Votes table --------------------------------------------------------------
create table if not exists public.question_votes (
  id          bigint generated always as identity primary key,
  question_id text        not null,
  device_id   text        not null,
  created_at  timestamptz not null default now(),
  -- one vote per device per question (blocks server-side duplicates)
  constraint question_votes_unique unique (question_id, device_id)
);

create index if not exists question_votes_qid_idx on public.question_votes (question_id);

-- 2. Aggregate count view (read-only popularity tally) ------------------------
create or replace view public.question_vote_counts as
  select question_id, count(*)::int as votes
  from public.question_votes
  group by question_id;

-- 3. Row Level Security -------------------------------------------------------
alter table public.question_votes enable row level security;

-- anon may INSERT a vote (the unique constraint prevents duplicates)
drop policy if exists "anon can insert votes" on public.question_votes;
create policy "anon can insert votes"
  on public.question_votes for insert
  to anon
  with check (true);

-- anon may SELECT (needed to read counts / realtime); no update or delete granted
drop policy if exists "anon can read votes" on public.question_votes;
create policy "anon can read votes"
  on public.question_votes for select
  to anon
  using (true);

-- 4. Realtime -----------------------------------------------------------------
-- Broadcast inserts so every attendee's screen updates live as votes come in.
alter publication supabase_realtime add table public.question_votes;
