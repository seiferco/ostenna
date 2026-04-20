-- Patina Marketplace — Initial Schema
-- Run this in Supabase SQL Editor or via migrations

-- Extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";

-- ============================================
-- PROFILES (extends Supabase auth.users)
-- ============================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text,
  bio text,
  avatar_url text,
  location text,
  website text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,

  constraint username_format check (
    username ~ '^[a-z0-9][a-z0-9_-]{2,29}$'
  )
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    new.raw_user_meta_data->>'username',
    coalesce(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'username')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================
-- LISTINGS
-- ============================================
create type listing_status as enum ('active', 'sold', 'expired', 'removed');
create type listing_condition as enum ('new', 'like_new', 'excellent', 'good', 'fair', 'parts');
create type listing_category as enum (
  'espresso_machines',
  'grinders',
  'kettles',
  'accessories',
  'knives',
  'cookware',
  'bakeware',
  'kitchen_tools',
  'other'
);

create table public.listings (
  id uuid primary key default uuid_generate_v4(),
  seller_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text not null,
  price integer not null,
  condition listing_condition not null,
  category listing_category not null,
  location text,
  shipping_offered boolean default false,
  images text[] default '{}',
  status listing_status default 'active' not null,
  views_count integer default 0,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,

  constraint price_positive check (price > 0),
  constraint title_length check (char_length(title) between 5 and 150)
);

-- Full-text search
alter table public.listings add column fts tsvector
  generated always as (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'B')
  ) stored;

create index listings_fts_idx on public.listings using gin(fts);
create index listings_category_idx on public.listings (category);
create index listings_status_idx on public.listings (status);
create index listings_seller_idx on public.listings (seller_id);
create index listings_created_idx on public.listings (created_at desc);

-- ============================================
-- FORUMS
-- ============================================
create table public.forum_categories (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  slug text unique not null,
  description text,
  sort_order integer default 0,
  created_at timestamptz default now() not null
);

create table public.forum_threads (
  id uuid primary key default uuid_generate_v4(),
  category_id uuid not null references public.forum_categories(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  is_pinned boolean default false,
  is_locked boolean default false,
  post_count integer default 1,
  last_post_at timestamptz default now() not null,
  created_at timestamptz default now() not null,

  constraint thread_title_length check (char_length(title) between 5 and 200)
);

create index threads_category_idx on public.forum_threads (category_id, is_pinned desc, last_post_at desc);

create table public.forum_posts (
  id uuid primary key default uuid_generate_v4(),
  thread_id uuid not null references public.forum_threads(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  is_edited boolean default false,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create index posts_thread_idx on public.forum_posts (thread_id, created_at);

-- ============================================
-- FEEDBACK / RATINGS
-- ============================================
create type feedback_role as enum ('buyer', 'seller');

create table public.feedback (
  id uuid primary key default uuid_generate_v4(),
  from_user_id uuid not null references public.profiles(id) on delete cascade,
  to_user_id uuid not null references public.profiles(id) on delete cascade,
  listing_id uuid references public.listings(id) on delete set null,
  role feedback_role not null,
  rating smallint not null,
  comment text,
  created_at timestamptz default now() not null,

  constraint rating_range check (rating between 1 and 5),
  constraint no_self_feedback check (from_user_id != to_user_id),
  constraint unique_feedback unique (from_user_id, to_user_id, listing_id)
);

create index feedback_to_user_idx on public.feedback (to_user_id, created_at desc);

-- Materialized view for fast profile rating display
create materialized view public.user_ratings as
select
  to_user_id as user_id,
  count(*) as total_reviews,
  round(avg(rating), 1) as avg_rating,
  count(*) filter (where rating >= 4) as positive_count,
  count(*) filter (where rating <= 2) as negative_count
from public.feedback
group by to_user_id;

create unique index user_ratings_idx on public.user_ratings (user_id);

-- Refresh ratings on feedback changes
create or replace function refresh_user_ratings()
returns trigger
language plpgsql
security definer
as $$
begin
  refresh materialized view concurrently public.user_ratings;
  return null;
end;
$$;

create trigger on_feedback_change
  after insert or update or delete on public.feedback
  for each statement execute function refresh_user_ratings();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.forum_categories enable row level security;
alter table public.forum_threads enable row level security;
alter table public.forum_posts enable row level security;
alter table public.feedback enable row level security;

-- Profiles
create policy "Profiles are publicly readable"
  on public.profiles for select using (true);
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Listings
create policy "Active listings are publicly readable"
  on public.listings for select using (status = 'active' or seller_id = auth.uid());
create policy "Authenticated users can create listings"
  on public.listings for insert with check (auth.uid() = seller_id);
create policy "Sellers can update own listings"
  on public.listings for update using (auth.uid() = seller_id);
create policy "Sellers can delete own listings"
  on public.listings for delete using (auth.uid() = seller_id);

-- Forum categories (read-only for users)
create policy "Forum categories are publicly readable"
  on public.forum_categories for select using (true);

-- Forum threads
create policy "Threads are publicly readable"
  on public.forum_threads for select using (true);
create policy "Authenticated users can create threads"
  on public.forum_threads for insert with check (auth.uid() = author_id);

-- Forum posts
create policy "Posts are publicly readable"
  on public.forum_posts for select using (true);
create policy "Authenticated users can create posts"
  on public.forum_posts for insert with check (auth.uid() = author_id);
create policy "Authors can edit own posts"
  on public.forum_posts for update using (auth.uid() = author_id);

-- Feedback (permanent record — no edits or deletes)
create policy "Feedback is publicly readable"
  on public.feedback for select using (true);
create policy "Authenticated users can leave feedback"
  on public.feedback for insert with check (auth.uid() = from_user_id);

-- ============================================
-- SEED FORUM CATEGORIES
-- ============================================
insert into public.forum_categories (name, slug, description, sort_order) values
  ('Espresso', 'espresso', 'Machines, techniques, and troubleshooting', 1),
  ('Grinders', 'grinders', 'Burr sets, alignment, and recommendations', 2),
  ('Knives', 'knives', 'Kitchen knives, sharpening, and care', 3),
  ('Cookware', 'cookware', 'Pots, pans, and kitchen equipment', 4),
  ('Deals & Steals', 'deals', 'Share deals you''ve found', 5),
  ('General Discussion', 'general', 'Off-topic and community chat', 6);
