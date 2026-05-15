"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search, MapPin, Star, CheckCircle, ArrowRight,
  Scissors, Sparkles, Heart, Flower2, Zap,
  Calendar, Shield, Clock, ChevronRight,
} from "lucide-react";
import { MOCK_SALONS, CATEGORIES, DISTRICTS } from "@/lib/mock-data";
import { Salon } from "@/types";

/* ─── Counter animasyonu ─── */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, duration / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Stars ─── */
function Stars({ rating, size = 11 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size}
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
      <Link href={`/salonlar/${salon.slug}`}>
        <div className="group rounded-2xl border overflow-hidden card-hover h-full"
          style={{ background: "var(--white)", borderColor: "var(--border-ink)", boxShadow: "var(--shadow-sm)" }}
        >
          <div className="relative h-56 overflow-hidden bg-[var(--cream-3)]">
            {salon.cover_image && !imgError ? (
              <>
                <Image src={salon.cover_image} alt={salon.name} fill
                  className="object-cover transition-transform duration-700 group-hover:scale-108"
                  onError={() => setImgError(true)}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(28,23,20,0.6) 0%, rgba(28,23,20,0.05) 50%, transparent 100%)" }} />
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-light tracking-widest opacity-20" style={{ color: "var(--gold)", fontFamily: "var(--font-playfair)" }}>
                  {initials}
                </span>
              </div>
            )}

            <div className="absolute top-3 left-3 flex gap-2 z-10">
              {salon.is_featured && (
                <span className="text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full font-medium" style={{ background: "var(--gold)", color: "#fff" }}>
                  Öne Çıkan
                </span>
              )}
              {salon.is_verified && (
                <span className="text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full font-medium flex items-center gap-1" style={{ background: "rgba(255,255,255,0.92)", color: "var(--gold)" }}>
                  <CheckCircle size={9} /> Onaylı
                </span>
              )}
            </div>

            {/* Rating badge */}
            <div className="absolute bottom-3 right-3 z-10">
              <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl" style={{ background: "rgba(255,255,255,0.95)" }}>
                <Star size={10} fill="var(--gold)" stroke="var(--gold)" strokeWidth={1.5} />
                <span className="text-[11px] font-semibold" style={{ color: "var(--ink)" }}>{salon.rating.toFixed(1)}</span>
              </div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-[11px] tracking-widest uppercase transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                style={{ background: "var(--gold)", color: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
                Randevu Al <ArrowRight size={13} />
              </div>
            </div>
          </div>

          <div className="p-5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-medium text-sm leading-tight" style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}>
                {salon.name}
              </h3>
              <Stars rating={salon.rating} />
            </div>
            <div className="flex items-center gap-1 mb-3">
              <MapPin size={11} style={{ color: "var(--gold)" }} />
              <span className="text-[11px]" style={{ color: "var(--muted)" }}>{salon.district}</span>
              <span className="text-[11px] mx-1" style={{ color: "var(--muted-2)" }}>·</span>
              <span className="text-[11px]" style={{ color: "var(--muted-2)" }}>{salon.review_count} yorum</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {salon.categories.slice(0, 3).map((cat: string) => (
                <span key={cat} className="text-[9px] tracking-wide uppercase px-2 py-0.5 rounded-full"
                  style={{ background: "var(--gold-pale)", color: "var(--gold-dim)" }}>
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

/* Kategori görselleri */
const CAT_IMAGES: Record<string, string> = {
  "Sac":    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=75",
  "Tirnak": "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=75",
  "Cilt":   "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=75",
  "Kas":    "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&q=75",
  "Spa":    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=75",
  "Makyaj": "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=75",
  "all":    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=75",
};

const CAT_ICONS: Record<string, React.ReactNode> = {
  "Sac":    <Scissors size={20} />,
  "Tirnak": <Sparkles size={20} />,
  "Cilt":   <Heart size={20} />,
  "Kas":    <Flower2 size={20} />,
  "Spa":    <Zap size={20} />,
  "Makyaj": <Star size={20} />,
  "all":    <Search size={20} />,
};

function getCatKey(value: string): string {
  if (value === "all") return "all";
  if (value.toLowerCase().includes("saç") || value === "Saç") return "Sac";
  if (value.toLowerCase().includes("tırnak")) return "Tirnak";
  if (value.toLowerCase().includes("cilt")) return "Cilt";
  if (value.toLowerCase().includes("kaş") || value.toLowerCase().includes("kirpik")) return "Kas";
  if (value.toLowerCase().includes("spa") || value.toLowerCase().includes("masaj")) return "Spa";
  if (value.toLowerCase().includes("makyaj")) return "Makyaj";
  return "all";
}

/* ─── Ana Sayfa ─── */
export default function HomePage() {
  const [search, setSearch] = useState("");
  const [district, setDistrict] = useState("");
  const [category, setCategory] = useState("");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filtered = MOCK_SALONS.filter((s: Salon) => {
    const q = search.toLowerCase();
    return (
      (!q || s.name.toLowerCase().includes(q) || s.categories.some((c: string) => c.toLowerCase().includes(q))) &&
      (!district || district === "Tümü" || s.district === district) &&
      (!category || category === "all" || s.categories.some((c: string) => c.toLowerCase().includes(category.toLowerCase())))
    );
  });

  return (
    <main>
      {/* ── HERO ── */}
      <section className="relative h-[96vh] min-h-[620px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1800&q=85"
          alt="Luxury beauty salon"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />

        {/* Gradient katmanları */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(28,23,20,0.72) 0%, rgba(28,23,20,0.4) 45%, rgba(184,112,96,0.2) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(184,112,96,0.15) 0%, transparent 60%)" }} />

        {/* Dekoratif çizgi */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 opacity-40">
          <div style={{ width: "1px", height: "80px", background: "linear-gradient(to bottom, transparent, var(--gold))" }} />
          <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--gold)" }} />
          <div style={{ width: "1px", height: "80px", background: "linear-gradient(to bottom, var(--gold), transparent)" }} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="animate-fade-in text-[9px] tracking-[10px] uppercase mb-5 opacity-85" style={{ color: "var(--gold-light)" }}>
            Türkiye&apos;nin En Seçkin Rezervasyon Platformu
          </p>

          <h1 className="animate-fade-in-up delay-100 font-light leading-tight mb-6"
            style={{ color: "#fff", fontFamily: "var(--font-playfair)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1.15 }}>
            Güzelliğinizi<br />
            <em className="not-italic" style={{
              color: "var(--gold-light)",
              fontStyle: "italic",
              WebkitTextStroke: "0px",
            }}>Keşfedin</em>
          </h1>

          <p className="animate-fade-in delay-200 text-sm sm:text-base leading-relaxed mb-10 opacity-90" style={{ color: "rgba(255,255,255,0.85)" }}>
            Türkiye&apos;nin en iyi güzellik salonlarına tek tıkla ulaşın,<br className="hidden sm:block" />
            anında randevu alın.
          </p>

          {/* Arama Kutusu */}
          <div className="animate-scale-in delay-300 flex flex-col sm:flex-row gap-2 rounded-2xl p-2.5"
            style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 24px 80px rgba(0,0,0,0.3)" }}>
            <div className="flex items-center gap-3 flex-1 px-4 py-2">
              <Search size={16} style={{ color: "var(--muted)" }} className="flex-shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Salon, hizmet veya şehir ara..."
                className="flex-1 text-sm outline-none bg-transparent"
                style={{ color: "var(--ink)" }}
              />
            </div>
            <div className="w-px hidden sm:block my-2" style={{ background: "var(--border-ink)" }} />
            <div className="flex items-center gap-2 px-4 py-2">
              <MapPin size={15} style={{ color: "var(--muted)" }} className="flex-shrink-0" />
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="text-sm outline-none bg-transparent appearance-none pr-3 cursor-pointer"
                style={{ color: district ? "var(--ink)" : "var(--muted-2)" }}
              >
                {DISTRICTS.map((d: string) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <Link
              href={`/salonlar${search ? `?q=${search}` : ""}`}
              className="btn-gold rounded-xl justify-center px-6"
              style={{ minWidth: "130px" }}
            >
              Ara <ArrowRight size={14} />
            </Link>
          </div>

          {/* Stats */}
          <div className="animate-fade-in delay-500 flex items-center justify-center gap-10 mt-10">
            {[
              { n: 500, s: "+", l: "Premium Salon" },
              { n: 50,  s: "K+", l: "Mutlu Müşteri" },
              { n: 4.9, s: "",  l: "Ortalama Puan" },
            ].map((stat) => (
              <div key={stat.l} className="text-center">
                <p className="text-xl sm:text-2xl font-light mb-0.5" style={{ color: "#fff", fontFamily: "var(--font-playfair)" }}>
                  {stat.n}{stat.s}
                </p>
                <p className="text-[9px] tracking-[3px] uppercase opacity-60" style={{ color: "rgba(255,255,255,0.8)" }}>{stat.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
          <div style={{ width: "1px", height: "32px", background: "linear-gradient(to bottom, transparent, #fff)" }} />
        </div>
      </section>

      {/* ── ÖZELLIKLER ── */}
      <section className="py-14" style={{ background: "var(--ink)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.08)" }}>
            {[
              { icon: <Shield size={20} />, title: "Güvenli Ödeme", desc: "SSL korumalı ödeme altyapısı" },
              { icon: <Clock size={20} />,  title: "7/24 Destek",   desc: "Her zaman yanınızdayız" },
              { icon: <Star size={20} />,   title: "Onaylı Salonlar", desc: "Kalite güvenceli partnerler" },
            ].map((f) => (
              <div key={f.title} className="flex items-center gap-4 px-8 py-6" style={{ background: "var(--ink)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(184,112,96,0.15)", color: "var(--gold)" }}>
                  {f.icon}
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: "#fff" }}>{f.title}</p>
                  <p className="text-[11px] opacity-50" style={{ color: "rgba(255,255,255,0.7)" }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KATEGORİLER ── */}
      <section className="py-24" style={{ background: "var(--cream)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="rose-line mx-auto mb-4" />
            <p className="text-[9px] tracking-[8px] uppercase mb-3" style={{ color: "var(--gold)" }}>Hizmetler</p>
            <h2 className="text-3xl sm:text-4xl font-light" style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}>
              İhtiyacınıza Göre Seçin
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat, i) => {
              const key = getCatKey(cat.value);
              const imgSrc = CAT_IMAGES[key] || "";
              const icon = CAT_ICONS[key];
              const active = category === cat.value;
              return (
                <Link
                  key={cat.value}
                  href={`/salonlar?category=${cat.value}`}
                  onClick={() => setCategory(active ? "" : cat.value)}
                  className="animate-fade-in-up group relative rounded-2xl overflow-hidden cursor-pointer"
                  style={{
                    animationDelay: `${i * 70}ms`,
                    aspectRatio: "1",
                    outline: active ? "2.5px solid var(--gold)" : "none",
                    outlineOffset: "3px",
                  }}
                >
                  {imgSrc && (
                    <Image src={imgSrc} alt={cat.label} fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, 16vw"
                    />
                  )}
                  <div className="absolute inset-0 transition-all duration-300"
                    style={{ background: active ? "rgba(184,112,96,0.6)" : "linear-gradient(to top, rgba(28,23,20,0.72) 0%, rgba(28,23,20,0.08) 60%, transparent 100%)" }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-5 gap-2">
                    <span style={{ color: active ? "#fff" : "var(--gold-light)" }} className="transition-transform duration-300 group-hover:-translate-y-1">
                      {icon}
                    </span>
                    <span className="text-[10px] tracking-wide font-medium text-center px-2 leading-tight" style={{ color: "#fff" }}>
                      {cat.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ÖNERILEN SALONLAR ── */}
      <section className="py-24" style={{ background: "var(--cream-2)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div>
              <span className="rose-line mb-4" />
              <p className="text-[9px] tracking-[8px] uppercase mb-3" style={{ color: "var(--gold)" }}>Önerilen</p>
              <h2 className="text-3xl sm:text-4xl font-light" style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}>
                Öne Çıkan Salonlar
              </h2>
            </div>
            <Link href="/salonlar"
              className="group flex items-center gap-2 text-[10px] tracking-widest uppercase font-medium transition-all"
              style={{ color: "var(--muted)" }}
            >
              Tüm Salonlar
              <span className="flex items-center justify-center w-7 h-7 rounded-full transition-all group-hover:bg-[var(--gold)] group-hover:text-white"
                style={{ background: "var(--cream-3)", color: "var(--muted)" }}>
                <ChevronRight size={13} />
              </span>
            </Link>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.slice(0, 6).map((salon: Salon, i: number) => (
                <SalonCard key={salon.id} salon={salon} delay={i * 80} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 rounded-2xl" style={{ background: "var(--cream)", border: "1px dashed var(--border-2)" }}>
              <p className="text-sm" style={{ color: "var(--muted)" }}>Bu kriterlere uygun salon bulunamadı.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20" style={{ background: "var(--cream)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { target: 500, suffix: "+", label: "Premium Salon" },
              { target: 50000, suffix: "+", label: "Mutlu Müşteri" },
              { target: 98, suffix: "%", label: "Memnuniyet" },
              { target: 12, suffix: "+", label: "İlçe" },
            ].map((stat) => (
              <div key={stat.label} className="animate-fade-in-up">
                <p className="text-3xl sm:text-4xl font-light mb-1" style={{ color: "var(--gold)", fontFamily: "var(--font-playfair)" }}>
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </p>
                <div className="divider-rose my-3 mx-auto w-12" />
                <p className="text-[10px] tracking-[4px] uppercase" style={{ color: "var(--muted)" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NASIL ÇALIŞIR ── */}
      <section id="nasil-calisir" className="py-24 relative overflow-hidden" style={{ background: "var(--cream-2)" }}>
        <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(ellipse at 80% 50%, var(--gold-pale) 0%, transparent 60%)" }} />
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <span className="rose-line mx-auto mb-4" />
          <p className="text-[9px] tracking-[8px] uppercase mb-3" style={{ color: "var(--gold)" }}>Nasıl Çalışır?</p>
          <h2 className="text-3xl sm:text-4xl font-light mb-16" style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}>
            Üç Adımda Randevu
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Bağlantı çizgisi */}
            <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--gold-light), transparent)" }} />

            {[
              { icon: <Search size={28} />, step: "01", title: "Salon Bul", desc: "Konum, kategori veya isme göre istediğiniz salonu kolayca bulun." },
              { icon: <Calendar size={28} />, step: "02", title: "Tarih Seç", desc: "Uygun olan gün ve saati seçin, uzmanınızı belirleyin." },
              { icon: <CheckCircle size={28} />, step: "03", title: "Randevu Al", desc: "Tek tıkla onaylayın. SMS ve e-posta ile hatırlatma alın." },
            ].map((item, i) => (
              <div key={item.step} className="animate-fade-in-up flex flex-col items-center gap-4" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: "var(--white)", color: "var(--gold)", boxShadow: "var(--shadow-md)" }}>
                    {item.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 text-[9px] tracking-widest font-medium px-2 py-0.5 rounded-full" style={{ background: "var(--gold)", color: "#fff" }}>
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-medium" style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--muted)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24" style={{ background: "var(--cream)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="rose-line mx-auto mb-4" />
            <p className="text-[9px] tracking-[8px] uppercase mb-3" style={{ color: "var(--gold)" }}>Yorumlar</p>
            <h2 className="text-3xl font-light" style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}>
              Müşterilerimiz Ne Diyor?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Selin A.", salon: "Atelier Bella", text: "Hayatımda gittiğim en iyi salon. Saç boyamam muhteşem çıktı, kesinlikle tavsiye ederim.", rating: 5 },
              { name: "Melis K.", salon: "Lumière Estetik", text: "Cilt bakımından sonra farkı hemen hissettim. Çok profesyonel ekip ve hijyenik ortam.", rating: 5 },
              { name: "Zeynep T.", salon: "Vera Spa Lounge", text: "Spa deneyimi harika. Rezervasyon sistemi çok kolay, bir tıkla hallediyorsunuz.", rating: 5 },
            ].map((review, i) => (
              <div key={review.name} className="animate-fade-in-up rounded-2xl p-6" style={{ animationDelay: `${i * 100}ms`, background: "var(--white)", boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-ink)" }}>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} size={12} fill="var(--gold)" stroke="var(--gold)" strokeWidth={1.5} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--muted)" }}>&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid var(--border-ink)" }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-medium" style={{ background: "var(--gold-pale)", color: "var(--gold)" }}>
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="text-[12px] font-medium" style={{ color: "var(--ink)" }}>{review.name}</p>
                    <p className="text-[10px]" style={{ color: "var(--muted-2)" }}>{review.salon}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 relative overflow-hidden" style={{ background: "var(--ink)" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(184,112,96,0.18) 0%, transparent 65%)" }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--gold-dim), transparent)" }} />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <p className="text-[9px] tracking-[8px] uppercase mb-5" style={{ color: "var(--gold-light)" }}>Salon Sahibi misiniz?</p>
          <h2 className="text-3xl sm:text-5xl font-light mb-6 leading-snug" style={{ color: "#fff", fontFamily: "var(--font-playfair)" }}>
            Salonunuzu En Premium<br />
            <em className="not-italic" style={{ color: "var(--gold-light)", fontStyle: "italic" }}>Platforma Ekleyin</em>
          </h2>
          <p className="text-sm leading-relaxed mb-10 opacity-80" style={{ color: "rgba(255,255,255,0.75)" }}>
            Online randevu yönetimi, müşteri takibi ve daha fazlasıyla işinizi büyütün.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/salon-ekle" className="btn-gold rounded-xl justify-center py-3.5 px-8 text-[11px]">
              Ücretsiz Başla <ArrowRight size={15} />
            </Link>
            <Link href="/kurumsal" className="btn-outline rounded-xl justify-center py-3.5 px-8 text-[11px]">
              Daha Fazla Bilgi
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
