"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search, MapPin, Star, CheckCircle, ArrowRight,
  SlidersHorizontal, X, ChevronDown, Grid3X3, List,
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

/* ─── Salon Card Grid ─── */
function SalonCardGrid({ salon, delay = 0 }: { salon: Salon; delay?: number }) {
  const [imgError, setImgError] = useState(false);
  const initials = salon.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2);

  return (
    <div className="animate-fade-in-up" style={{ animationDelay: `${delay}ms` }}>
      <Link href={`/salonlar/${salon.slug}`}>
        <div
          className="group rounded-2xl border overflow-hidden card-hover h-full"
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
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(28,23,20,0.55) 0%, rgba(28,23,20,0.08) 55%, transparent 100%)" }} />
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-light tracking-widest opacity-25" style={{ color: "var(--gold)", fontFamily: "var(--font-playfair)" }}>
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
            <div className="absolute bottom-3 right-3 z-10">
              <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl" style={{ background: "rgba(255,255,255,0.95)" }}>
                <Star size={10} fill="var(--gold)" stroke="var(--gold)" strokeWidth={1.5} />
                <span className="text-[11px] font-semibold" style={{ color: "var(--ink)" }}>{salon.rating.toFixed(1)}</span>
                <span className="text-[10px]" style={{ color: "var(--muted)" }}>({salon.review_count})</span>
              </div>
            </div>
          </div>

          <div className="p-5">
            <h3 className="font-medium text-sm mb-1.5 leading-tight" style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}>
              {salon.name}
            </h3>
            <div className="flex items-center gap-1 mb-3">
              <MapPin size={11} style={{ color: "var(--gold)" }} />
              <span className="text-[11px]" style={{ color: "var(--muted)" }}>{salon.district}</span>
            </div>
            <p className="text-[12px] leading-relaxed mb-4 line-clamp-2" style={{ color: "var(--muted)" }}>
              {salon.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {salon.categories.slice(0, 2).map((cat: string) => (
                  <span key={cat} className="text-[9px] tracking-wide uppercase px-2 py-0.5 rounded-full" style={{ background: "var(--gold-pale)", color: "var(--gold-dim)" }}>
                    {cat}
                  </span>
                ))}
              </div>
              <span className="text-[10px] tracking-wide uppercase flex items-center gap-1 font-medium" style={{ color: "var(--gold)" }}>
                Randevu Al <ArrowRight size={11} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

/* ─── Salon Card List ─── */
function SalonCardList({ salon, delay = 0 }: { salon: Salon; delay?: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="animate-fade-in-up" style={{ animationDelay: `${delay}ms` }}>
      <Link href={`/salonlar/${salon.slug}`}>
        <div
          className="group flex gap-5 rounded-2xl border overflow-hidden p-4 card-hover"
          style={{ background: "var(--white)", borderColor: "var(--border-ink)", boxShadow: "var(--shadow-sm)" }}
        >
          <div className="relative w-32 sm:w-44 flex-shrink-0 rounded-xl overflow-hidden bg-[var(--cream-3)]" style={{ minHeight: "110px" }}>
            {salon.cover_image && !imgError ? (
              <Image
                src={salon.cover_image}
                alt={salon.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onError={() => setImgError(true)}
                sizes="176px"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-light opacity-20" style={{ color: "var(--gold)" }}>
                  {salon.name.slice(0, 2)}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0 py-1">
            <div className="flex items-start justify-between gap-3 mb-1.5">
              <h3 className="font-medium text-sm leading-tight" style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}>
                {salon.name}
              </h3>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Stars rating={salon.rating} size={10} />
                <span className="text-[11px] font-medium" style={{ color: "var(--ink)" }}>{salon.rating.toFixed(1)}</span>
                <span className="text-[10px]" style={{ color: "var(--muted)" }}>({salon.review_count})</span>
              </div>
            </div>
            <div className="flex items-center gap-1 mb-2">
              <MapPin size={11} style={{ color: "var(--gold)" }} />
              <span className="text-[11px]" style={{ color: "var(--muted)" }}>{salon.district}</span>
              {salon.is_verified && (
                <>
                  <span className="mx-1" style={{ color: "var(--muted-2)" }}>·</span>
                  <CheckCircle size={10} style={{ color: "var(--gold)" }} />
                  <span className="text-[10px]" style={{ color: "var(--gold)" }}>Onaylı</span>
                </>
              )}
            </div>
            <p className="text-[12px] leading-relaxed mb-3 line-clamp-2 hidden sm:block" style={{ color: "var(--muted)" }}>
              {salon.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {salon.categories.slice(0, 3).map((cat: string) => (
                  <span key={cat} className="text-[9px] tracking-wide uppercase px-2 py-0.5 rounded-full" style={{ background: "var(--gold-pale)", color: "var(--gold-dim)" }}>
                    {cat}
                  </span>
                ))}
              </div>
              <span className="text-[10px] tracking-wide uppercase flex items-center gap-1 font-medium flex-shrink-0" style={{ color: "var(--gold)" }}>
                Randevu Al <ArrowRight size={11} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

/* ─── Ana Bileşen ─── */
type SortKey = "rating" | "reviews" | "name";

export default function SalonlarPage() {
  const [search, setSearch] = useState("");
  const [district, setDistrict] = useState("Tümü");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortKey>("rating");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = MOCK_SALONS.filter((s: Salon) => {
      const q = search.toLowerCase();
      return (
        (!q || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.categories.some((c: string) => c.toLowerCase().includes(q))) &&
        (district === "Tümü" || s.district === district) &&
        (category === "all" || s.categories.some((c: string) => c.toLowerCase().includes(category.toLowerCase())))
      );
    });

    if (sort === "rating") result = [...result].sort((a, b) => b.rating - a.rating);
    else if (sort === "reviews") result = [...result].sort((a, b) => b.review_count - a.review_count);
    else if (sort === "name") result = [...result].sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [search, district, category, sort]);

  const activeFiltersCount = [
    search,
    district !== "Tümü" ? district : "",
    category !== "all" ? category : "",
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSearch("");
    setDistrict("Tümü");
    setCategory("all");
  };

  return (
    <main style={{ background: "var(--cream)", minHeight: "100vh" }}>

      {/* HERO BAR */}
      <section className="relative py-16 overflow-hidden" style={{ background: "var(--ink)" }}>
        <div className="absolute inset-0 opacity-15" style={{ background: "radial-gradient(ellipse at 30% 50%, var(--gold) 0%, transparent 65%)" }} />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B87060' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="animate-fade-in-up">
              <p className="text-[10px] tracking-[6px] uppercase mb-2" style={{ color: "var(--gold-light)" }}>İstanbul • 500+ Salon</p>
              <h1 className="text-3xl sm:text-4xl font-light" style={{ color: "#fff", fontFamily: "var(--font-playfair)" }}>
                Salon <em className="not-italic" style={{ color: "var(--gold-light)" }}>Keşfet</em>
              </h1>
            </div>

            {/* Ana Arama */}
            <div
              className="animate-scale-in flex items-center gap-3 rounded-2xl px-4 py-3 flex-1 md:max-w-md"
              style={{ background: "rgba(255,255,255,0.97)", boxShadow: "var(--shadow-lg)" }}
            >
              <Search size={16} style={{ color: "var(--muted)" }} className="flex-shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Salon, hizmet veya ilçe ara..."
                className="flex-1 text-sm outline-none bg-transparent"
                style={{ color: "var(--ink)" }}
              />
              {search && (
                <button onClick={() => setSearch("")}>
                  <X size={14} style={{ color: "var(--muted)" }} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FİLTRELER */}
      <div className="sticky top-0 z-40 border-b" style={{ background: "rgba(250,248,246,0.97)", backdropFilter: "blur(12px)", borderColor: "var(--border-ink)" }}>
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">

            {/* Kategori Pills */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className="text-[10px] tracking-wide uppercase px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-all duration-200"
                  style={{
                    background: category === cat.value ? "var(--gold)" : "var(--cream-2)",
                    color: category === cat.value ? "#fff" : "var(--muted)",
                    border: `1.5px solid ${category === cat.value ? "var(--gold)" : "transparent"}`,
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="w-px h-5 flex-shrink-0" style={{ background: "var(--border-ink-2)" }} />

            {/* İlçe */}
            <div className="relative flex-shrink-0">
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="text-[10px] tracking-wide uppercase outline-none appearance-none pl-3 pr-7 py-1.5 rounded-full cursor-pointer font-medium"
                style={{
                  background: district !== "Tümü" ? "var(--gold-pale)" : "var(--cream-2)",
                  color: district !== "Tümü" ? "var(--gold-dim)" : "var(--muted)",
                  border: `1.5px solid ${district !== "Tümü" ? "var(--gold)" : "transparent"}`,
                }}
              >
                {DISTRICTS.map((d) => <option key={d} value={d}>{d === "Tümü" ? "İlçe Seç" : d}</option>)}
              </select>
              <ChevronDown size={10} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--muted)" }} />
            </div>

            {/* Sırala */}
            <div className="relative flex-shrink-0">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="text-[10px] tracking-wide uppercase outline-none appearance-none pl-3 pr-7 py-1.5 rounded-full cursor-pointer font-medium"
                style={{ background: "var(--cream-2)", color: "var(--muted)", border: "1.5px solid transparent" }}
              >
                <option value="rating">En Yüksek Puan</option>
                <option value="reviews">En Çok Yorum</option>
                <option value="name">İsme Göre</option>
              </select>
              <ChevronDown size={10} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--muted)" }} />
            </div>

            <div className="ml-auto flex items-center gap-2 flex-shrink-0">
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 text-[10px] tracking-wide uppercase px-3 py-1.5 rounded-full font-medium transition-all"
                  style={{ background: "var(--danger-bg)", color: "var(--danger)", border: "1.5px solid var(--danger)" }}
                >
                  <X size={10} /> Temizle ({activeFiltersCount})
                </button>
              )}
              {/* View Toggle */}
              <div className="flex items-center rounded-xl overflow-hidden border" style={{ borderColor: "var(--border-ink-2)" }}>
                <button
                  onClick={() => setViewMode("grid")}
                  className="p-1.5 transition-colors"
                  style={{ background: viewMode === "grid" ? "var(--gold)" : "transparent", color: viewMode === "grid" ? "#fff" : "var(--muted)" }}
                >
                  <Grid3X3 size={13} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className="p-1.5 transition-colors"
                  style={{ background: viewMode === "list" ? "var(--gold)" : "transparent", color: viewMode === "list" ? "#fff" : "var(--muted)" }}
                >
                  <List size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SALON LİSTESİ */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        {/* Sonuç sayısı */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            <span className="font-medium" style={{ color: "var(--ink)" }}>{filtered.length}</span> salon bulundu
            {search && <span> — <span style={{ color: "var(--gold)" }}>"{search}"</span> için</span>}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "var(--gold-pale)" }}>
              <Search size={24} style={{ color: "var(--gold)" }} />
            </div>
            <h3 className="text-lg font-medium mb-2" style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}>Salon bulunamadı</h3>
            <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>Arama kriterlerinizi değiştirmeyi deneyin</p>
            <button onClick={clearFilters} className="btn-gold rounded-xl">
              Filtreleri Temizle
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((salon: Salon, i: number) => (
              <SalonCardGrid key={salon.id} salon={salon} delay={i * 60} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((salon: Salon, i: number) => (
              <SalonCardList key={salon.id} salon={salon} delay={i * 60} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
