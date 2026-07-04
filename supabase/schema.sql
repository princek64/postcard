create extension if not exists pgcrypto;

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  created_at timestamptz not null default now()
);

create table if not exists public.postcards (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid references public.users(id) on delete cascade,
  recipient_name text not null,
  recipient_contact text not null,
  photo_url text not null,
  filter_type text not null check (filter_type in ('retro','vintage','minimal','sunset')),
  caption text not null check (char_length(caption) <= 40),
  note text not null check (char_length(note) <= 300),
  location_name text not null,
  lat double precision not null,
  lng double precision not null,
  created_at timestamptz not null default now(),
  opened_at timestamptz
);

create index if not exists postcards_sender_id_created_at_idx on public.postcards(sender_id, created_at desc);

alter table public.users enable row level security;
alter table public.postcards enable row level security;

create policy "Users can read their own profile" on public.users for select using (auth.uid() = id);
create policy "Users can insert their own profile" on public.users for insert with check (auth.uid() = id);
create policy "Users can update their own profile" on public.users for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "Anyone can create postcards for MVP link sharing" on public.postcards for insert with check (true);
create policy "Anyone with the link can read postcards for MVP" on public.postcards for select using (true);
create policy "Anyone with the link can mark postcards opened" on public.postcards for update using (true) with check (true);
