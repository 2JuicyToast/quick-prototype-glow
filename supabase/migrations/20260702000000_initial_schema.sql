-- ── Profiles ─────────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  zip_code text,
  bio text,
  location text,
  onboarding_complete boolean default false,
  verified_hours integer default 0,
  events_attended integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy if not exists "Users can view their own profile"
  on public.profiles for select using (auth.uid() = id);

create policy if not exists "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id);

create policy if not exists "Users can insert their own profile"
  on public.profiles for insert with check (auth.uid() = id);

-- ── User preferences ──────────────────────────────────────────────────────────
create table if not exists public.user_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade unique,
  zip_code text,
  age_range text,
  life_status text,
  occupation text,
  transportation_modes text[] default '{}',
  travel_range text,
  low_cost_priority boolean default false,
  access_preferences text[] default '{}',
  resource_interests text[] default '{}',
  personal_interests text[] default '{}',
  career_interests text[] default '{}',
  content_preference text,
  engagement_preference text,
  onboarding_completed boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.user_preferences enable row level security;

create policy if not exists "Users can view their own preferences"
  on public.user_preferences for select using (auth.uid() = user_id);

create policy if not exists "Users can insert their own preferences"
  on public.user_preferences for insert with check (auth.uid() = user_id);

create policy if not exists "Users can update their own preferences"
  on public.user_preferences for update using (auth.uid() = user_id);

-- ── User tags ─────────────────────────────────────────────────────────────────
create table if not exists public.user_tags (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tag text not null,
  source text default 'onboarding',
  created_at timestamptz default now()
);

alter table public.user_tags enable row level security;

create policy if not exists "Users can view their own tags"
  on public.user_tags for select using (auth.uid() = user_id);

create policy if not exists "Users can insert their own tags"
  on public.user_tags for insert with check (auth.uid() = user_id);

create policy if not exists "Users can delete their own tags"
  on public.user_tags for delete using (auth.uid() = user_id);

-- ── Auto-create profile on signup ─────────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
