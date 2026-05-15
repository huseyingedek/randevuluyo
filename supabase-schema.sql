-- ============================================================
-- GlamBook Studio — Supabase Veritabanı Şeması
-- Supabase SQL Editor'e yapıştırın
-- ============================================================

-- Kullanıcı profilleri (Supabase Auth ile entegre)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone text,
  avatar_url text,
  role text default 'customer' check (role in ('customer', 'owner', 'admin')),
  created_at timestamptz default now()
);
alter table profiles enable row level security;
create policy "Kullanıcılar kendi profillerini görebilir" on profiles
  for select using (auth.uid() = id);
create policy "Kullanıcılar kendi profillerini güncelleyebilir" on profiles
  for update using (auth.uid() = id);

-- Salonlar
create table salons (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references profiles(id) on delete cascade,
  slug text unique not null,
  name text not null,
  description text,
  address text,
  district text,
  city text default 'İstanbul',
  phone text,
  email text,
  cover_image text,
  gallery jsonb default '[]',
  rating numeric(3,2) default 0,
  review_count int default 0,
  is_verified boolean default false,
  is_featured boolean default false,
  is_active boolean default true,
  categories jsonb default '[]',
  opening_hours jsonb,
  created_at timestamptz default now()
);
alter table salons enable row level security;
create policy "Herkese açık salon listesi" on salons
  for select using (is_active = true);
create policy "Salon sahibi kendi salonunu yönetebilir" on salons
  for all using (auth.uid() = owner_id);

-- Hizmetler
create table services (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid references salons(id) on delete cascade,
  name text not null,
  description text,
  duration int not null, -- dakika
  price numeric(10,2) not null,
  category text,
  is_active boolean default true,
  created_at timestamptz default now()
);
alter table services enable row level security;
create policy "Herkese açık hizmet listesi" on services
  for select using (is_active = true);
create policy "Salon sahibi hizmetleri yönetebilir" on services
  for all using (
    exists (
      select 1 from salons
      where salons.id = services.salon_id
      and salons.owner_id = auth.uid()
    )
  );

-- Personel
create table staff (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid references salons(id) on delete cascade,
  name text not null,
  title text,
  avatar_url text,
  specialties jsonb default '[]',
  is_active boolean default true,
  created_at timestamptz default now()
);
alter table staff enable row level security;
create policy "Herkese açık personel listesi" on staff
  for select using (is_active = true);
create policy "Salon sahibi personeli yönetebilir" on staff
  for all using (
    exists (
      select 1 from salons
      where salons.id = staff.salon_id
      and salons.owner_id = auth.uid()
    )
  );

-- Randevular
create table appointments (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid references salons(id) on delete cascade,
  service_id uuid references services(id),
  staff_id uuid references staff(id),
  user_id uuid references profiles(id),
  customer_name text,        -- kayıtsız kullanıcı için
  customer_phone text,
  customer_email text,
  date date not null,
  time time not null,
  status text default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  notes text,
  created_at timestamptz default now()
);
alter table appointments enable row level security;
create policy "Kullanıcı kendi randevularını görebilir" on appointments
  for select using (auth.uid() = user_id);
create policy "Salon sahibi kendi salonunun randevularını görebilir" on appointments
  for select using (
    exists (
      select 1 from salons
      where salons.id = appointments.salon_id
      and salons.owner_id = auth.uid()
    )
  );
create policy "Herkes randevu oluşturabilir" on appointments
  for insert with check (true);
create policy "Salon sahibi randevuları güncelleyebilir" on appointments
  for update using (
    exists (
      select 1 from salons
      where salons.id = appointments.salon_id
      and salons.owner_id = auth.uid()
    )
  );

-- Yorumlar
create table reviews (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid references salons(id) on delete cascade,
  user_id uuid references profiles(id),
  appointment_id uuid references appointments(id),
  rating int not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz default now(),
  unique(appointment_id)
);
alter table reviews enable row level security;
create policy "Herkese açık yorumlar" on reviews
  for select using (true);
create policy "Kullanıcılar yorum yazabilir" on reviews
  for insert with check (auth.uid() = user_id);

-- Rating otomatik güncelleme
create or replace function update_salon_rating()
returns trigger as $$
begin
  update salons set
    rating = (select avg(rating) from reviews where salon_id = new.salon_id),
    review_count = (select count(*) from reviews where salon_id = new.salon_id)
  where id = new.salon_id;
  return new;
end;
$$ language plpgsql;

create trigger salon_rating_trigger
  after insert or update or delete on reviews
  for each row execute function update_salon_rating();

-- Örnek veri
insert into salons (slug, name, description, address, district, categories, is_verified, is_featured, opening_hours)
values
  (
    'atelier-bella',
    'Atelier Bella',
    'Beşiktaş''ın kalbinde, 12 yıllık deneyimiyle özel saç ve makyaj stüdyosu.',
    'Sinanpaşa Mah. Ihlamur Yolu Cad. No:14',
    'Beşiktaş',
    '["Saç", "Makyaj", "Cilt Bakımı"]',
    true,
    true,
    '{"monday":{"open":true,"start":"09:00","end":"19:00"},"tuesday":{"open":true,"start":"09:00","end":"19:00"},"wednesday":{"open":true,"start":"09:00","end":"19:00"},"thursday":{"open":true,"start":"09:00","end":"20:00"},"friday":{"open":true,"start":"09:00","end":"20:00"},"saturday":{"open":true,"start":"10:00","end":"18:00"},"sunday":{"open":false,"start":"","end":""}}'
  );
