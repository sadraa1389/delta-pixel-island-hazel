-- Lian perfume store — reference schema for PostgreSQL.
-- Canonical ORM schema: prisma/schema.prisma
-- This file is documentation for stage 1. It is not applied as a live migration yet.

create type product_status as enum ('DRAFT', 'ACTIVE', 'ARCHIVED');
create type gender_target as enum ('FEMININE', 'MASCULINE', 'UNISEX');
create type concentration as enum ('PARFUM', 'EDP', 'EDT', 'EDC', 'OIL');
create type fragrance_family as enum (
  'FLORAL',
  'WOODY',
  'ORIENTAL',
  'FRESH',
  'CITRUS',
  'GOURMAND',
  'CHYPRE',
  'FOUGERE'
);

create table if not exists brands (
  id          text primary key,
  slug        text not null unique,
  name        text not null,
  name_fa     text not null,
  description text,
  country     text,
  logo_url    text,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists categories (
  id          text primary key,
  slug        text not null unique,
  name        text not null,
  name_fa     text not null,
  description text,
  parent_id   text references categories (id) on delete set null,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists categories_parent_id_idx on categories (parent_id);

create table if not exists products (
  id               text primary key,
  slug             text not null unique,
  sku              text not null unique,
  name             text not null,
  name_fa          text not null,
  description      text,
  brand_id         text not null references brands (id) on delete restrict,
  category_id      text not null references categories (id) on delete restrict,
  concentration    concentration not null,
  gender_target    gender_target not null,
  fragrance_family fragrance_family,
  volume_ml        integer not null,
  price_amount     integer not null,
  compare_amount   integer,
  stock_qty        integer not null default 0,
  status           product_status not null default 'DRAFT',
  is_featured      boolean not null default false,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists products_brand_id_idx on products (brand_id);
create index if not exists products_category_id_idx on products (category_id);
create index if not exists products_status_idx on products (status);
create index if not exists products_is_featured_idx on products (is_featured);

create table if not exists product_images (
  id         text primary key,
  product_id text not null references products (id) on delete cascade,
  url        text not null,
  alt        text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists product_images_product_id_idx on product_images (product_id);

create table if not exists articles (
  id           text primary key,
  slug         text not null unique,
  title        text not null,
  excerpt      text,
  content      text,
  cover_url    text,
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists articles_published_at_idx on articles (published_at);
