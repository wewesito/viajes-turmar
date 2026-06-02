create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  destination text not null,
  departure text,
  style text,
  travel_month text,
  travelers integer default 1,
  nights integer default 0,
  budget_max numeric default 0,
  estimated_total numeric default 0,
  score integer default 0,
  preferences jsonb default '[]'::jsonb,
  source text default 'web',
  status text not null default 'new',
  ip text,
  user_agent text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  path text,
  payload jsonb default '{}'::jsonb,
  ip text,
  user_agent text,
  created_at timestamptz not null default now()
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
  name text not null,
  email text not null,
  phone text,
  preferred_language text default 'es',
  created_at timestamptz not null default now()
);

create table if not exists public.proposals (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers(id) on delete cascade,
  title text not null,
  destination text not null,
  status text not null default 'draft',
  total numeric default 0,
  currency text default 'EUR',
  itinerary jsonb default '[]'::jsonb,
  conditions text,
  valid_until date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid references public.proposals(id) on delete cascade,
  provider text not null,
  provider_payment_id text,
  status text not null default 'pending',
  amount numeric not null,
  currency text default 'EUR',
  created_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid references public.proposals(id) on delete cascade,
  title text not null,
  kind text not null,
  storage_path text,
  status text not null default 'draft',
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists analytics_events_created_at_idx on public.analytics_events (created_at desc);
create index if not exists proposals_customer_id_idx on public.proposals (customer_id);
