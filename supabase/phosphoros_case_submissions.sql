create extension if not exists pgcrypto;

create table if not exists public.phosphoros_case_submissions (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 12 and 180),
  city text not null check (char_length(city) between 2 and 120),
  incident_date date,
  public_date date not null,
  crime_type text not null check (char_length(crime_type) between 2 and 120),
  legal_outcome text not null check (legal_outcome in (
    'Onderzoek loopt',
    'Vervolging loopt',
    'Nog geen uitspraak',
    'Veroordeeld',
    'Gedeeltelijk veroordeeld',
    'Vrijgesproken',
    'Schuldig zonder straf',
    'Sepot / niet vervolgd',
    'Onbekend'
  )),
  perpetrator_status text not null check (perpetrator_status in (
    'investigated',
    'charged',
    'detained',
    'convicted',
    'acquitted',
    'unknown'
  )),
  summary text not null check (char_length(summary) between 40 and 2500),
  source_url text not null check (
    char_length(source_url) <= 2000
    and source_url ~* '^https?://'
  ),
  source_title text check (source_title is null or char_length(source_title) <= 240),
  source_level text not null check (source_level in (
    'Rechtspraak',
    'Openbaar Ministerie / politie',
    'Kwaliteitsmedia',
    'Andere openbare bron'
  )),
  ecli text check (ecli is null or char_length(ecli) <= 120),
  evidence_notes text check (evidence_notes is null or char_length(evidence_notes) <= 3000),
  unknowns text check (unknowns is null or char_length(unknowns) <= 2000),
  submitter_email text check (submitter_email is null or char_length(submitter_email) <= 320),
  consent_public_sources_only boolean not null check (consent_public_sources_only = true),
  review_status text not null default 'pending' check (review_status in ('pending', 'approved', 'rejected')),
  review_notes text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists phosphoros_case_submissions_review_queue
on public.phosphoros_case_submissions (review_status, created_at desc);

alter table public.phosphoros_case_submissions enable row level security;

grant insert on public.phosphoros_case_submissions to anon, authenticated;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'phosphoros_case_submissions'
      and policyname = 'Public can submit cases for review'
  ) then
    create policy "Public can submit cases for review"
    on public.phosphoros_case_submissions
    for insert
    to anon, authenticated
    with check (
      review_status = 'pending'
      and consent_public_sources_only = true
    );
  end if;
end
$$;

comment on table public.phosphoros_case_submissions is
'Public case suggestions. Rows are private and require editorial review before publication.';
