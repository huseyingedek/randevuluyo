"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search, MapPin, Star, CheckCircle, ArrowRight,
  Scissors, Sparkles, Heart, Flower2, Calendar, Zap,
} from "lucide-react";
import { MOCK_SALONS, CATEGORIES, DISTRICTS } from "@/lib/mock-data";
import { Salon } from "@/types";

/* ─── Stars ─── */
function Stars({ rating, size = 11 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          fill={i <= Math.round(rating) ? "var(--gold)" : "none"}
          stroke={i <= Math.round(rating) ? "var(--gold)" : "var(--muted-2)"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

/* ─── Salon Kartı ─── */
function SalonCard({ salon, delay = 0 }: { salon: Salon; delay?: number }) {
  const [imgError, setImgError] = useState(false);
  const initials = salon.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2);

  return (
    <div className="animate-fade-in-up" style={{ animationDelay: `${delay}ms` }}>
      <div
        className="group rounded-2xl border overflow-hidden card-hover"
        style={{ background: "var(--white)", borderColor: "var(--border-ink)", boxShadow: "var(--shadow-sm)" }}
      >
        <div className="relative h-52 overflow-hidden bg-[var(--cream-3)]">
          {salon.cover_image && !imgError ? (
            <>
              <Image
                src={salon.cover_image}
                alt={salon.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onError={() => setImgError(true)}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(28,23,20,0.55) 0%, rgba(28,23,20,0.1) 50%, transparent 100%)" }} />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl font-light tracking-widest opacity-25" style={{ color: "var(--gold)", fontFamily: "var(--font-playfair)" }}>
                {initials}
              </span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2 z-10">
            {salon.is_featured && (
              <span className="text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full font-medium" style={{ background: "var(--gold)", color: "#fff" }}>
                One Cikan
              </span>
            )}
            {salon.is_verified && (
              <span className="text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full font-medium flex items-center gap-1" style={{ background: "rgba(255,255,255,0.92)", color: "var(--gold)" }}>
                <CheckCircle size={9} /> Onayli
              </span>
            )}
          </div>

          {/* Hover CTA */}
          <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <Link
              href={`/salonlar/${salon.slug}`}
              className="btn-gold text-[10px] py-2.5 px-5 rounded-xl"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
            >
              Randevu Al <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-medium text-sm leading-tight" style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}>
              {salon.name}
            </h3>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Stars rating={salon.rating} />
              <span className="text-[11px] font-medium" style={{ color: "var(--ink)" }}>{salon.rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 mb-3">
            <MapPin size={11} style={{ color: "var(--gold)" }} />
            <span className="text-[11px]" style={{ color: "var(--muted)" }}>{salon.district}</span>
            <span className="text-[11px] mx-1" style={{ color: "var(--muted-2)" }}>·</span>
            <span className="text-[11px]" style={{ color: "var(--muted-2)" }}>{salon.review_count} yorum</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {salon.categories.slice(0, 3).map((cat: string) => (
              <span key={cat} className="text-[9px] tracking-wide uppercase px-2 py-0.5 rounded-full" style={{ background: "var(--gold-pale)", color: "var(--gold-dim)" }}>
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Kategori görselleri */
const CAT_IMAGES: Record<string, string> = {
  "Sac": "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=75",
  "Tirnak": "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=75",
  "Cilt": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=75",
  "Kas": "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&q=75",
  "Spa": "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=75",
  "Makyaj": "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=75",
  "all": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=75",
};

const CAT_ICONS: Record<string, React.ReactNode> = {
  "Sac": <Scissors size={18} />,
  "Tirnak": <Sparkles size={18} />,
  "Cilt": <Heart size={18} />,
  "Kas": <Flower2 size={18} />,
  "Spa": <Zap size={18} />,
  "Makyaj": <Star size={18} />,
  "all": <Search size={18} />,
};

function getCatKey(value: string): string {
  if (value === "all") return "all";
  if (value.startsWith("Sac") || value === "Sac") return "Sac";
  if (value.startsWith("T")) return "Tirnak";
  if (value.startsWith("Cil")) return "Cilt";
  if (value.startsWith("Ka")) return "Kas";
  if (value.startsWith("Spa")) return "Spa";
  if (value.startsWith("Mak")) return "Makyaj";
  return value.split(" ")[0];
}

/* ─── Ana Sayfa ─── */
export default function HomePage() {
  const [search, setSearch] = useState("");
  const [district, setDistrict] = useState("");
  const [category, setCategory] = useState("");

  const filtered = MOCK_SALONS.filter((s: Salon) => {
    const q = search.toLowerCase();
    return (
      (!q || s.name.toLowerCase().includes(q) || s.categories.some((c: string) => c.toLowerCase().includes(q))) &&
      (!district || district === "Tümü" || s.district === district) &&
      (!category || category === "all" || s.categories.some((c: string) => c.includes(category)))
    );
  });

  return (
    <main>
      {/* HERO */}
      <section className="relative h-[92vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1600&q=80"
          alt="Luxury beauty salon"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(28,23,20,0.62) 0%, rgba(28,23,20,0.35) 50%, rgba(184,112,96,0.18) 100%)" }} />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="animate-fade-in text-[10px] tracking-[8px] uppercase mb-4 opacity-80" style={{ color: "var(--gold-light)" }}>
            İstanbul&apos;un En Seçkin Platformu
          </p>
          <h1
            className="animate-fade-in-up delay-100 text-4xl sm:text-5xl md:text-6xl font-light leading-tight mb-6"
            style={{ color: "#fff", fontFamily: "var(--font-playfair)" }}
          >
            Güzelliğinizi<br />
            <em className="not-italic" style={{ color: "var(--gold-light)" }}>Keşfedin</em>
          </h1>
          <p className="animate-fade-in delay-200 text-sm sm:text-base leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.85)" }}>
            İstanbul&apos;un en iyi güzellik salonlarına tek tıkla ulaşın,<br className="hidden sm:block" />
            anında randevu alın.
          </p>

          {/* Arama */}
          <div
            className="animate-scale-in delay-300 flex flex-col sm:flex-row gap-3 rounded-2xl p-3"
            style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}
          >
            <div className="flex items-center gap-3 flex-1 px-3">
              <Search size={16} style={{ color: "var(--muted)" }} className="flex-shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Salon veya hizmet ara..."
                className="flex-1 text-sm outline-none bg-transparent"
                style={{ color: "var(--ink)" }}
              />
            </div>
            <div className="w-px hidden sm:block" style={{ background: "var(--border-ink)" }} />
            <div className="flex items-center gap-3 px-3">
              <MapPin size={16} style={{ color: "var(--muted)" }} className="flex-shrink-0" />
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="text-sm outline-none bg-transparent appearance-none pr-4 cursor-pointer"
                style={{ color: district ? "var(--ink)" : "var(--muted-2)" }}
              >
                {DISTRICTS.map((d: string) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <Link href="/salonlar" className="btn-gold rounded-xl justify-center" style={{ minWidth: "120px" }}>
              Ara <ArrowRight size={14} />
            </Link>
          </div>

          {/* Stats */}
          <div className="animate-fade-in delay-500 flex items-center justify-center gap-8 mt-8">
            {[
              { n: "500+", l: "Premium Salon" },
              { n: "50K+", l: "Mutlu Müşteri" },
              { n: "4.9",  l: "Ortalama Puan" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <p className="text-lg font-medium" style={{ color: "#fff", fontFamily: "var(--font-playfair)" }}>{s.n}</p>
                <p className="text-[10px] tracking-wide opacity-70" style={{ color: "rgba(255,255,255,0.8)" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KATEGORİLER */}
      <section className="py-20" style={{ background: "var(--cream)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="rose-line mx-auto mb-4" />
            <p className="text-[10px] tracking-[6px] uppercase mb-2" style={{ color: "var(--gold)" }}>Kategoriler</p>
            <h2 className="text-3xl font-light" style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}>
              İhtiyacınıza Göre Seçin
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat: { label: string; value: string }, i: number) => {
              const key = getCatKey(cat.value);
              const imgSrc = CAT_IMAGES[key] || "";
              const icon = CAT_ICONS[key];
              const active = category === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setCategory(active ? "" : cat.value)}
                  className="animate-fade-in-up group relative rounded-2xl overflow-hidden aspect-square"
                  style={{ animationDelay: `${i * 60}ms`, outline: active ? "2px solid var(--gold)" : "none", outlineOffset: "2px" }}
                >
                  {imgSrc && (
                    <Image
                      src={imgSrc}
                      alt={cat.label}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, 16vw"
                    />
                  )}
                  <div
                    className="absolute inset-0"
                    style={{ background: active ? "rgba(184,112,96,0.55)" : "linear-gradient(to top, rgba(28,23,20,0.65) 0%, rgba(28,23,20,0.1) 60%, transparent 100%)" }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-4 gap-1.5">
                    {icon && <span style={{ color: active ? "#fff" : "var(--gold-light)" }}>{icon}</span>}
                    <span className="text-[10px] tracking-wide font-medium text-center px-1 leading-tight" style={{ color: "#fff" }}>
                      {cat.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SALONLAR */}
      <section className="py-20" style={{ background: "var(--cream-2)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="rose-line mb-4" />
              <p className="text-[10px] tracking-[6px] uppercase mb-2" style={{ color: "var(--gold)" }}>
                {CATEGORIES.find((c: { label: string; value: string }) => c.value === category)?.label || "Tüm Salonlar"}
              </p>
              <h2 className="text-3xl font-light" style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}>
                Öne Çıkan Salonlar
              </h2>
            </div>
            <Link
              href="/salonlar"
              className="flex items-center gap-2 text-[11px] tracking-widest uppercase transition-colors hover:text-[var(--gold)]"
              style={{ color: "var(--muted)" }}
            >
              Tümünü Gör <ArrowRight size={14} />
            </Link>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((salon: Salon, i: number) => (
                <SalonCard key={salon.id} salon={salon} delay={i * 80} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-sm" style={{ color: "var(--muted)" }}>Bu kriterlere uygun salon bulunamadı.</p>
            </div>
          )}
        </div>
      </section>

      {/* NASIL ÇALIŞIR */}
      <section id="nasil-calisir" className="py-24" style={{ background: "var(--cream)" }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="rose-line mx-auto mb-4" />
          <p className="text-[10px] tracking-[6px] uppercase mb-2" style={{ color: "var(--gold)" }}>Nasıl Çalışır?</p>
          <h2 className="text-3xl font-light mb-14" style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}>
            Üç Adımda Randevu
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: <Search size={26} />, step: "01", title: "Salon Bul", desc: "Konum, kategori veya isme göre istediğiniz salonu kolayca bulun." },
              { icon: <Calendar size={26} />, step: "02", title: "Tarih Seç", desc: "Uygun olan gün ve saati seçin, uzmanınızı belirleyin." },
              { icon: <CheckCircle size={26} />, step: "03", title: "Randevu Al", desc: "Tek tıkla onaylayın. SMS ve e-posta ile hatırlatma alın." },
            ].map((item, i) => (
              <div key={item.step} className="animate-fade-in-up flex flex-col items-center gap-4" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "var(--gold-pale)", color: "var(--gold)" }}>
                  {item.icon}
                </div>
                <p className="text-[10px] tracking-[4px] uppercase" style={{ color: "var(--muted-2)" }}>{item.step}</p>
                <h3 className="text-lg font-medium" style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden" style={{ background: "var(--ink)" }}>
        <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(ellipse at 60% 50%, var(--gold) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[6px] uppercase mb-4" style={{ color: "var(--gold-light)" }}>Salon Sahibi misiniz?</p>
          <h2 className="text-3xl sm:text-4xl font-light mb-6 leading-snug" style={{ color: "#fff", fontFamily: "var(--font-playfair)" }}>
            Salonunuzu En Premium<br />
            <em className="not-italic" style={{ color: "var(--gold-light)" }}>Platforma Ekleyin</em>
          </h2>
          <p className="text-sm leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.75)" }}>
            Online randevu yönetimi, müşteri takibi ve daha fazlasıyla işinizi büyütün.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/salon-ekle" className="btn-gold rounded-xl justify-center">
              Ücretsiz Başla <ArrowRight size={15} />
            </Link>
            <Link href="/kurumsal" className="btn-outline rounded-xl justify-center">
              Daha Fazla Bilgi
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
