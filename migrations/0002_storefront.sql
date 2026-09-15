create table if not exists brands (
  id text primary key,
  slug text not null unique,
  name text not null,
  name_fa text not null,
  description text,
  country text,
  logo_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists categories (
  id text primary key,
  slug text not null unique,
  name text not null,
  name_fa text not null,
  description text,
  parent_id text references categories(id) on delete set null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists products (
  id text primary key,
  slug text not null unique,
  sku text not null unique,
  name text not null,
  name_fa text not null,
  description text,
  brand_id text not null references brands(id) on delete restrict,
  category_id text not null references categories(id) on delete restrict,
  concentration text not null check (concentration in ('PARFUM','EDP','EDT','EDC','OIL')),
  gender_target text not null check (gender_target in ('FEMININE','MASCULINE','UNISEX')),
  fragrance_family text,
  volume_ml integer not null check (volume_ml > 0),
  price_amount integer not null check (price_amount >= 0),
  compare_amount integer check (compare_amount is null or compare_amount >= price_amount),
  stock_qty integer not null default 0 check (stock_qty >= 0),
  status text not null default 'ACTIVE' check (status in ('DRAFT','ACTIVE','ARCHIVED')),
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists product_images (
  id text primary key,
  product_id text not null references products(id) on delete cascade,
  url text not null,
  alt text,
  sort_order integer not null default 0
);

create table if not exists articles (
  id text primary key,
  slug text not null unique,
  title text not null,
  excerpt text,
  content text,
  cover_url text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists reviews (
  id text primary key,
  product_id text not null references products(id) on delete cascade,
  user_id text references "user"("id") on delete set null,
  user_name text not null,
  text text not null check (length(trim(text)) between 5 and 2000),
  rating integer not null check (rating between 1 and 5),
  status text not null default 'PENDING' check (status in ('PENDING','APPROVED','REJECTED')),
  created_at timestamptz not null default now()
);

create table if not exists newsletter_subscribers (
  id text primary key,
  email text not null unique,
  subscribed_at timestamptz not null default now()
);

create table if not exists carts (
  id text primary key,
  user_id text references "user"("id") on delete cascade,
  session_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (user_id is not null or session_id is not null)
);

create table if not exists cart_items (
  id text primary key,
  cart_id text not null references carts(id) on delete cascade,
  product_id text not null references products(id) on delete restrict,
  quantity integer not null check (quantity > 0),
  unique(cart_id, product_id)
);

create index if not exists products_brand_idx on products(brand_id);
create index if not exists products_category_idx on products(category_id);
create index if not exists products_status_idx on products(status);
create index if not exists products_featured_idx on products(is_featured);
create index if not exists products_created_idx on products(created_at desc);
create index if not exists product_images_product_idx on product_images(product_id, sort_order);
create index if not exists articles_published_idx on articles(published_at desc);
create index if not exists reviews_product_status_idx on reviews(product_id, status, created_at desc);
create index if not exists carts_user_idx on carts(user_id);
create index if not exists cart_items_cart_idx on cart_items(cart_id);

create or replace function set_storefront_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists brands_updated_at on brands;
create trigger brands_updated_at before update on brands for each row execute function set_storefront_updated_at();
drop trigger if exists categories_updated_at on categories;
create trigger categories_updated_at before update on categories for each row execute function set_storefront_updated_at();
drop trigger if exists products_updated_at on products;
create trigger products_updated_at before update on products for each row execute function set_storefront_updated_at();
drop trigger if exists articles_updated_at on articles;
create trigger articles_updated_at before update on articles for each row execute function set_storefront_updated_at();
drop trigger if exists carts_updated_at on carts;
create trigger carts_updated_at before update on carts for each row execute function set_storefront_updated_at();

insert into brands (id, slug, name, name_fa, country) values
('brand-chanel','chanel','Chanel','شنل','فرانسه'),
('brand-dior','dior','Dior','دیور','فرانسه'),
('brand-tom-ford','tom-ford','Tom Ford','تام فورد','آمریکا'),
('brand-yves-saint-laurent','yves-saint-laurent','Yves Saint Laurent','ایو سن لوران','فرانسه'),
('brand-creed','creed','Creed','کرید','فرانسه'),
('brand-armani','armani','Giorgio Armani','جورجیو آرمانی','ایتالیا')
on conflict (id) do nothing;

insert into categories (id, slug, name, name_fa, sort_order) values
('cat-women','women','Women','زنانه',1),
('cat-men','men','Men','مردانه',2),
('cat-unisex','unisex','Unisex','یونیسکس',3),
('cat-niche','niche','Niche','نیش',4)
on conflict (id) do nothing;

insert into products (id, slug, sku, name, name_fa, description, brand_id, category_id, concentration, gender_target, fragrance_family, volume_ml, price_amount, compare_amount, stock_qty, status, is_featured) values
('p-001','bleu-de-chanel-edp','SKU-001','Bleu de Chanel EDP','بلو د شنل ادو پرفیوم','رایحه‌ای چوبی و مرکباتی با شخصیت مدرن.','brand-chanel','cat-men','EDP','MASCULINE','WOODY',100,8900000,9900000,12,'ACTIVE',true),
('p-002','coco-mademoiselle-edp','SKU-002','Coco Mademoiselle EDP','کوکو مادمازل ادو پرفیوم','ترکیبی شیک از مرکبات، رز و پچولی.','brand-chanel','cat-women','EDP','FEMININE','CHYPRE',100,9200000,10200000,8,'ACTIVE',true),
('p-003','sauvage-edp','SKU-003','Sauvage EDP','ساواج ادو پرفیوم','رایحه‌ای تازه، ادویه‌ای و بسیار پرطرفدار.','brand-dior','cat-men','EDP','MASCULINE','FRESH',100,7800000,8500000,15,'ACTIVE',true),
('p-004','j-adore-edp','SKU-004','J’adore EDP','جادور ادو پرفیوم','گل‌فام و زنانه با امضای لوکس دیور.','brand-dior','cat-women','EDP','FEMININE','FLORAL',100,8500000,9300000,10,'ACTIVE',false),
('p-005','fucking-fabulous','SKU-005','Fucking Fabulous','فاکینگ فبیولس','رایحه‌ای جسور با بادام، چرم و تونکا.','brand-tom-ford','cat-unisex','EDP','UNISEX','ORIENTAL',50,14900000,16500000,5,'ACTIVE',true),
('p-006','lost-cherry','SKU-006','Lost Cherry','لاست چری','گیلاس شیرین و آکوردهای گرم و مجلل.','brand-tom-ford','cat-unisex','EDP','UNISEX','GOURMAND',50,16800000,18000000,4,'ACTIVE',false),
('p-007','ombre-leather','SKU-007','Ombré Leather','امبر لدر','چرم گرم با حس عمیق و ماندگار.','brand-tom-ford','cat-men','EDP','MASCULINE','WOODY',100,13900000,15200000,9,'ACTIVE',false),
('p-008','black-opium','SKU-008','Black Opium','بلک اوپیوم','قهوه، وانیل و گل سفید در ترکیبی اغواگر.','brand-yves-saint-laurent','cat-women','EDP','FEMININE','GOURMAND',90,7900000,8700000,11,'ACTIVE',true),
('p-009','libre-edp','SKU-009','Libre EDP','لیبر ادو پرفیوم','اسطوخودوس، شکوفه پرتقال و وانیل.','brand-yves-saint-laurent','cat-women','EDP','FEMININE','FLORAL',90,7600000,8300000,14,'ACTIVE',false),
('p-010','la-nuit-de-lhomme','SKU-010','La Nuit de L’Homme','لا نویی د الهوم','هل و چوب‌های گرم برای شب‌های خاص.','brand-yves-saint-laurent','cat-men','EDT','MASCULINE','WOODY',100,6800000,7400000,13,'ACTIVE',false),
('p-011','aventus','SKU-011','Aventus','اونتوس','میوه‌ای، دودی و چوبی با شخصیت نمادین.','brand-creed','cat-men','EDP','MASCULINE','FRUITY',100,32900000,34900000,3,'ACTIVE',true),
('p-012','aventus-for-her','SKU-012','Aventus For Her','اونتوس زنانه','رایحه‌ای میوه‌ای و گلی با پایه چوبی.','brand-creed','cat-women','EDP','FEMININE','FRUITY',75,28900000,30500000,3,'ACTIVE',false),
('p-013','silver-mountain-water','SKU-013','Silver Mountain Water','سیلور مانتین واتر','شفاف، خنک و الهام‌گرفته از طبیعت کوهستان.','brand-creed','cat-unisex','EDP','UNISEX','FRESH',100,25900000,27500000,4,'ACTIVE',false),
('p-014','acqua-di-gio-profondo','SKU-014','Acqua di Giò Profondo','آکوا دی جیو پروفوندو','دریایی و مرکباتی با عمق مدیترانه‌ای.','brand-armani','cat-men','EDP','MASCULINE','FRESH',75,7200000,7900000,16,'ACTIVE',false),
('p-015','si-passione','SKU-015','Sì Passione','سی پشن','میوه‌ای و گلی با امضای زنانه آرمانی.','brand-armani','cat-women','EDP','FEMININE','FLORAL',100,7400000,8100000,12,'ACTIVE',false),
('p-016','my-way','SKU-016','My Way','مای وی','گل سفید و وانیل با حس مدرن و روشن.','brand-armani','cat-women','EDP','FEMININE','FLORAL',90,7100000,7800000,10,'ACTIVE',false),
('p-017','tobacco-vanille','SKU-017','Tobacco Vanille','توباکو وانیل','تنباکو، وانیل و ادویه‌های گرم.','brand-tom-ford','cat-unisex','EDP','UNISEX','ORIENTAL',50,15900000,17200000,6,'ACTIVE',true),
('p-018','chance-eau-tendre','SKU-018','Chance Eau Tendre','چنس او تندر','لطیف، میوه‌ای و گلی برای استفاده روزانه.','brand-chanel','cat-women','EDT','FEMININE','FLORAL',100,8100000,8900000,9,'ACTIVE',false),
('p-019','dior-homme-intense','SKU-019','Dior Homme Intense','دیور هوم اینتنس','زنبق و چوب‌های گرم با شخصیت رسمی.','brand-dior','cat-men','EDP','MASCULINE','WOODY',100,8400000,9100000,7,'ACTIVE',false),
('p-020','gris-dior','SKU-020','Gris Dior','گری دیور','چایپر مدرن با نت‌های رز و چوب.','brand-dior','cat-unisex','EDP','UNISEX','CHYPRE',100,9900000,10800000,6,'ACTIVE',false)
on conflict (id) do nothing;

insert into product_images (id, product_id, url, alt, sort_order)
select 'img-' || id, id, 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85', name_fa, 0 from products
on conflict (id) do nothing;
