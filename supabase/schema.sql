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
  caption text not null,
  note text not null check (char_length(note) <= 300),
  location_name text not null,
  lat double precision not null,
  lng double precision not null,
  created_at timestamptz not null default now(),
  opened_at timestamptz
);
create index if not exists postcards_sender_id_created_at_idx on public.postcards(sender_id, created_at desc);
