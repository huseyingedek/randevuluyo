import { Salon, Service, Staff } from "@/types";

/* ── Unsplash beauty salon fotoğrafları ── */
const PHOTOS = {
  hair1:  "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=500&fit=crop&q=85",
  hair2:  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=500&fit=crop&q=85",
  hair3:  "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&h=500&fit=crop&q=85",
  skin1:  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=500&fit=crop&q=85",
  skin2:  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=500&fit=crop&q=85",
  nail1:  "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=500&fit=crop&q=85",
  nail2:  "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=500&fit=crop&q=85",
  spa1:   "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&h=500&fit=crop&q=85",
  spa2:   "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=500&fit=crop&q=85",
  brow1:  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=500&fit=crop&q=85",
};

export const MOCK_SALONS: Salon[] = [
  /* ── İstanbul ── */
  {
    id: "1", slug: "atelier-bella",
    name: "Atelier Bella",
    description: "Beşiktaş'ın kalbinde, 12 yıllık deneyimiyle özel saç ve makyaj stüdyosu. Her müşteriye özel yaklaşım, premium ürünler.",
    address: "Sinanpaşa Mah. Ihlamur Yolu Cad. No:14",
    district: "Beşiktaş", city: "İstanbul",
    phone: "+90 212 555 01 23", email: "info@atelierbella.com",
    cover_image: PHOTOS.hair1, gallery: [PHOTOS.hair1, PHOTOS.hair2],
    rating: 4.9, review_count: 312, is_verified: true, is_featured: true,
    categories: ["Saç", "Makyaj", "Cilt Bakımı"],
    opening_hours: {
      monday: { open: true, start: "09:00", end: "19:00" }, tuesday: { open: true, start: "09:00", end: "19:00" },
      wednesday: { open: true, start: "09:00", end: "19:00" }, thursday: { open: true, start: "09:00", end: "20:00" },
      friday: { open: true, start: "09:00", end: "20:00" }, saturday: { open: true, start: "10:00", end: "18:00" },
      sunday: { open: false, start: "", end: "" },
    },
    created_at: "2023-01-15",
  },
  {
    id: "2", slug: "lumiere-estetik",
    name: "Lumière Estetik",
    description: "Nişantaşı'nın prestijli adresinde cilt bakımı, lazer epilasyon ve estetik uygulamalar. Uzman kadromuzla yanınızdayız.",
    address: "Teşvikiye Mah. Abdi İpekçi Cad. No:28",
    district: "Nişantaşı", city: "İstanbul",
    phone: "+90 212 555 02 34", email: "info@lumiere.com.tr",
    cover_image: PHOTOS.skin1, gallery: [PHOTOS.skin1],
    rating: 4.8, review_count: 208, is_verified: true, is_featured: true,
    categories: ["Cilt Bakımı", "Lazer", "Kaş & Kirpik"],
    opening_hours: {
      monday: { open: true, start: "09:00", end: "19:00" }, tuesday: { open: true, start: "09:00", end: "19:00" },
      wednesday: { open: true, start: "09:00", end: "19:00" }, thursday: { open: true, start: "09:00", end: "19:00" },
      friday: { open: true, start: "09:00", end: "19:00" }, saturday: { open: true, start: "10:00", end: "17:00" },
      sunday: { open: false, start: "", end: "" },
    },
    created_at: "2023-03-20",
  },
  {
    id: "3", slug: "haus-nail-studio",
    name: "Haus Nail Studio",
    description: "Kadıköy'ün en trend nail sanatı stüdyosu. Protez tırnak, nail art, manikür ve pedikürde uzman ekip.",
    address: "Moda Cad. No:55 Kat:2",
    district: "Kadıköy", city: "İstanbul",
    phone: "+90 216 555 03 45", email: "info@hausnail.com",
    cover_image: PHOTOS.nail1, gallery: [PHOTOS.nail1],
    rating: 4.7, review_count: 189, is_verified: true, is_featured: false,
    categories: ["Tırnak", "Manikür", "Pedikür"],
    opening_hours: {
      monday: { open: true, start: "10:00", end: "20:00" }, tuesday: { open: true, start: "10:00", end: "20:00" },
      wednesday: { open: true, start: "10:00", end: "20:00" }, thursday: { open: true, start: "10:00", end: "20:00" },
      friday: { open: true, start: "10:00", end: "20:00" }, saturday: { open: true, start: "11:00", end: "19:00" },
      sunday: { open: true, start: "12:00", end: "18:00" },
    },
    created_at: "2023-06-10",
  },
  {
    id: "4", slug: "vera-spa-lounge",
    name: "Vera Spa Lounge",
    description: "Şişli'nin sakin köşesinde masaj, aromaterapi ve holistik spa deneyimi. Günlük koşturmanın stresini bırakın.",
    address: "Halaskargazi Cad. No:78",
    district: "Şişli", city: "İstanbul",
    phone: "+90 212 555 04 56", email: "rezervasyon@veraspa.com",
    cover_image: PHOTOS.spa1, gallery: [PHOTOS.spa1],
    rating: 4.9, review_count: 156, is_verified: true, is_featured: true,
    categories: ["Spa & Masaj", "Aromaterapi"],
    opening_hours: {
      monday: { open: true, start: "10:00", end: "21:00" }, tuesday: { open: true, start: "10:00", end: "21:00" },
      wednesday: { open: true, start: "10:00", end: "21:00" }, thursday: { open: true, start: "10:00", end: "21:00" },
      friday: { open: true, start: "10:00", end: "21:00" }, saturday: { open: true, start: "10:00", end: "22:00" },
      sunday: { open: true, start: "11:00", end: "20:00" },
    },
    created_at: "2023-09-05",
  },
  {
    id: "5", slug: "maison-brow-bar",
    name: "Maison Brow Bar",
    description: "Kaş ve kirpik tasarımında İstanbul'un referans adresi. Laminasyon, lifting, microblading ve ipek kirpik.",
    address: "Büyükdere Cad. Maya Akar Center No:100",
    district: "Levent", city: "İstanbul",
    phone: "+90 212 555 05 67", email: "info@maisonbrow.com",
    cover_image: PHOTOS.brow1, gallery: [PHOTOS.brow1],
    rating: 4.8, review_count: 423, is_verified: true, is_featured: false,
    categories: ["Kaş & Kirpik", "Microblading"],
    opening_hours: {
      monday: { open: true, start: "09:00", end: "19:00" }, tuesday: { open: true, start: "09:00", end: "19:00" },
      wednesday: { open: true, start: "09:00", end: "19:00" }, thursday: { open: true, start: "09:00", end: "19:00" },
      friday: { open: true, start: "09:00", end: "19:00" }, saturday: { open: true, start: "10:00", end: "18:00" },
      sunday: { open: false, start: "", end: "" },
    },
    created_at: "2022-11-20",
  },
  {
    id: "6", slug: "noir-hair-studio",
    name: "Noir Hair Studio",
    description: "Sarıyer'in butik saç stüdyosu. Balayage, highlights, Keratin bakım ve saç tedavisinde uzmanız.",
    address: "Yeniköy Cad. No:22",
    district: "Sarıyer", city: "İstanbul",
    phone: "+90 212 555 06 78", email: "hello@noirhair.com",
    cover_image: PHOTOS.hair2, gallery: [PHOTOS.hair2],
    rating: 4.6, review_count: 97, is_verified: false, is_featured: false,
    categories: ["Saç", "Bakım"],
    opening_hours: {
      monday: { open: false, start: "", end: "" }, tuesday: { open: true, start: "10:00", end: "19:00" },
      wednesday: { open: true, start: "10:00", end: "19:00" }, thursday: { open: true, start: "10:00", end: "19:00" },
      friday: { open: true, start: "10:00", end: "19:00" }, saturday: { open: true, start: "10:00", end: "18:00" },
      sunday: { open: false, start: "", end: "" },
    },
    created_at: "2024-02-01",
  },

  /* ── Ankara ── */
  {
    id: "7", slug: "la-belle-ankara",
    name: "La Belle Ankara",
    description: "Çankaya'nın en seçkin güzellik merkezi. Saç, cilt bakımı ve makyajda profesyonel hizmet anlayışı.",
    address: "Tunalı Hilmi Cad. No:88",
    district: "Çankaya", city: "Ankara",
    phone: "+90 312 555 01 11", email: "info@labelleanakara.com",
    cover_image: PHOTOS.hair3, gallery: [PHOTOS.hair3],
    rating: 4.7, review_count: 184, is_verified: true, is_featured: true,
    categories: ["Saç", "Cilt Bakımı", "Makyaj"],
    opening_hours: {
      monday: { open: true, start: "09:00", end: "19:00" }, tuesday: { open: true, start: "09:00", end: "19:00" },
      wednesday: { open: true, start: "09:00", end: "19:00" }, thursday: { open: true, start: "09:00", end: "20:00" },
      friday: { open: true, start: "09:00", end: "20:00" }, saturday: { open: true, start: "10:00", end: "18:00" },
      sunday: { open: false, start: "", end: "" },
    },
    created_at: "2023-04-10",
  },
  {
    id: "8", slug: "zen-spa-ankara",
    name: "Zen Spa & Wellness",
    description: "Kızılay'ın merkezinde huzurlu bir spa deneyimi. Masaj, aromaterapi ve beden bakımı paketleri.",
    address: "Atatürk Bulvarı No:145",
    district: "Kızılay", city: "Ankara",
    phone: "+90 312 555 02 22", email: "info@zenspa.com.tr",
    cover_image: PHOTOS.spa2, gallery: [PHOTOS.spa2],
    rating: 4.8, review_count: 132, is_verified: true, is_featured: false,
    categories: ["Spa & Masaj", "Aromaterapi"],
    opening_hours: {
      monday: { open: true, start: "10:00", end: "21:00" }, tuesday: { open: true, start: "10:00", end: "21:00" },
      wednesday: { open: true, start: "10:00", end: "21:00" }, thursday: { open: true, start: "10:00", end: "21:00" },
      friday: { open: true, start: "10:00", end: "22:00" }, saturday: { open: true, start: "10:00", end: "22:00" },
      sunday: { open: true, start: "11:00", end: "20:00" },
    },
    created_at: "2023-07-15",
  },

  /* ── İzmir ── */
  {
    id: "9", slug: "mer-beauty-izmir",
    name: "Mer Beauty Studio",
    description: "Alsancak'ın trend güzellik stüdyosu. Saç tasarımı, tırnak sanatı ve cilt bakımında uzman ekip.",
    address: "Kıbrıs Şehitleri Cad. No:65",
    district: "Alsancak", city: "İzmir",
    phone: "+90 232 555 01 33", email: "info@merbeauty.com",
    cover_image: PHOTOS.skin2, gallery: [PHOTOS.skin2],
    rating: 4.9, review_count: 267, is_verified: true, is_featured: true,
    categories: ["Saç", "Tırnak", "Cilt Bakımı"],
    opening_hours: {
      monday: { open: true, start: "09:00", end: "19:00" }, tuesday: { open: true, start: "09:00", end: "19:00" },
      wednesday: { open: true, start: "09:00", end: "19:00" }, thursday: { open: true, start: "09:00", end: "19:00" },
      friday: { open: true, start: "09:00", end: "19:00" }, saturday: { open: true, start: "10:00", end: "18:00" },
      sunday: { open: false, start: "", end: "" },
    },
    created_at: "2023-05-20",
  },
  {
    id: "10", slug: "rose-nail-bar-izmir",
    name: "Rose Nail Bar",
    description: "Karşıyaka'nın sevilen tırnak stüdyosu. Jel tırnak, nail art ve el bakımında mükemmel sonuçlar.",
    address: "Cemal Gürsel Cad. No:112",
    district: "Karşıyaka", city: "İzmir",
    phone: "+90 232 555 02 44", email: "info@rosenailbar.com",
    cover_image: PHOTOS.nail2, gallery: [PHOTOS.nail2],
    rating: 4.6, review_count: 143, is_verified: true, is_featured: false,
    categories: ["Tırnak", "Manikür", "Pedikür"],
    opening_hours: {
      monday: { open: true, start: "10:00", end: "20:00" }, tuesday: { open: true, start: "10:00", end: "20:00" },
      wednesday: { open: true, start: "10:00", end: "20:00" }, thursday: { open: true, start: "10:00", end: "20:00" },
      friday: { open: true, start: "10:00", end: "20:00" }, saturday: { open: true, start: "11:00", end: "18:00" },
      sunday: { open: false, start: "", end: "" },
    },
    created_at: "2023-08-01",
  },

  /* ── Antalya ── */
  {
    id: "11", slug: "soleil-beauty-antalya",
    name: "Soleil Beauty",
    description: "Lara'nın lüks güzellik merkezi. Cilt bakımı, epilasyon ve özel spa paketleriyle fark yaratıyoruz.",
    address: "Lara Cad. No:234",
    district: "Lara", city: "Antalya",
    phone: "+90 242 555 01 55", email: "info@soleilbeauty.com",
    cover_image: PHOTOS.skin1, gallery: [PHOTOS.skin1],
    rating: 4.8, review_count: 198, is_verified: true, is_featured: true,
    categories: ["Cilt Bakımı", "Lazer", "Spa & Masaj"],
    opening_hours: {
      monday: { open: true, start: "09:00", end: "20:00" }, tuesday: { open: true, start: "09:00", end: "20:00" },
      wednesday: { open: true, start: "09:00", end: "20:00" }, thursday: { open: true, start: "09:00", end: "20:00" },
      friday: { open: true, start: "09:00", end: "20:00" }, saturday: { open: true, start: "10:00", end: "19:00" },
      sunday: { open: true, start: "11:00", end: "17:00" },
    },
    created_at: "2023-06-01",
  },

  /* ── Bursa ── */
  {
    id: "12", slug: "brow-lab-bursa",
    name: "Brow Lab Bursa",
    description: "Nilüfer'in prestijli kaş ve kirpik stüdyosu. Microblading, laminasyon ve ipek kirpik uzmanı.",
    address: "Özlüce Mah. No:45",
    district: "Nilüfer", city: "Bursa",
    phone: "+90 224 555 01 66", email: "info@browlabbursa.com",
    cover_image: PHOTOS.brow1, gallery: [PHOTOS.brow1],
    rating: 4.7, review_count: 116, is_verified: true, is_featured: false,
    categories: ["Kaş & Kirpik", "Microblading"],
    opening_hours: {
      monday: { open: true, start: "09:00", end: "19:00" }, tuesday: { open: true, start: "09:00", end: "19:00" },
      wednesday: { open: true, start: "09:00", end: "19:00" }, thursday: { open: true, start: "09:00", end: "19:00" },
      friday: { open: true, start: "09:00", end: "19:00" }, saturday: { open: true, start: "10:00", end: "17:00" },
      sunday: { open: false, start: "", end: "" },
    },
    created_at: "2024-01-10",
  },
];

export const MOCK_SERVICES: Service[] = [
  { id: "s1", salon_id: "1", name: "Saç Kesimi",            description: "Yıkama + kesim + fön dahil",          duration: 60,  price: 350,  category: "Saç"    },
  { id: "s2", salon_id: "1", name: "Saç Boyama (Tek Renk)", description: "Premium boyalar ile tam kaplama",      duration: 120, price: 850,  category: "Saç"    },
  { id: "s3", salon_id: "1", name: "Balayage",              description: "Doğal geçişli ombre tekniği",          duration: 180, price: 1800, category: "Saç"    },
  { id: "s4", salon_id: "1", name: "Keratin Bakımı",        description: "Düzleştirici keratin protein tedavisi",duration: 150, price: 1200, category: "Bakım"  },
  { id: "s5", salon_id: "1", name: "Gelin Saçı",            description: "Özel gün konsültan + saç tasarımı",   duration: 120, price: 2500, category: "Özel"   },
  { id: "s6", salon_id: "1", name: "Profesyonel Makyaj",    description: "Günlük, gece veya özel etkinlik",      duration: 75,  price: 950,  category: "Makyaj" },
];

export const MOCK_STAFF: Staff[] = [
  { id: "st1", salon_id: "1", name: "Deniz Yılmaz", title: "Baş Stilist",       avatar: "", specialties: ["Saç Kesimi", "Balayage", "Gelin"] },
  { id: "st2", salon_id: "1", name: "Elif Kara",    title: "Renk Uzmanı",       avatar: "", specialties: ["Boyama", "Balayage", "Keratin"]   },
  { id: "st3", salon_id: "1", name: "Aylin Tekin",  title: "Makyaj Sanatçısı",  avatar: "", specialties: ["Makyaj", "Gelin Makyajı"]         },
];

export const CATEGORIES = [
  { label: "Tümü",         value: "all"          },
  { label: "Saç & Bakım",  value: "Saç"          },
  { label: "Tırnak",       value: "Tırnak"       },
  { label: "Cilt Bakımı",  value: "Cilt Bakımı"  },
  { label: "Kaş & Kirpik", value: "Kaş & Kirpik" },
  { label: "Spa & Masaj",  value: "Spa & Masaj"  },
];

export const CITIES = [
  "Tüm Şehirler",
  "İstanbul",
  "Ankara",
  "İzmir",
  "Antalya",
  "Bursa",
];

/* Geriye dönük uyumluluk */
export const DISTRICTS = ["Tümü", "Beşiktaş", "Kadıköy", "Nişantaşı", "Şişli", "Levent", "Sarıyer"];

export const TIME_SLOTS = [
  "09:00","09:30","10:00","10:30","11:00","11:30",
  "12:00","12:30","13:00","13:30","14:00","14:30",
  "15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30",
];
