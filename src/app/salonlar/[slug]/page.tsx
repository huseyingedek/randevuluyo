"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Phone, Star, Clock, CheckCircle,
  ArrowLeft, ChevronLeft, ChevronRight, X, Calendar,
} from "lucide-react";
import { MOCK_SALONS, MOCK_SERVICES, MOCK_STAFF, TIME_SLOTS } from "@/lib/mock-data";
import { Service, Staff } from "@/types";
import { format, addDays, startOfToday } from "date-fns";
import { tr } from "date-fns/locale";
import clsx from "clsx";

const DAY_LABELS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
const UNAVAILABLE = ["10:30", "12:00", "14:00", "16:00"];

function generateDays(count = 14) {
  const today = startOfToday();
  return Array.from({ length: count }, (_, i) => addDays(today, i));
}

/* ─── Randevu Modalı ─── */
function BookingModal({
  service, salonName, onClose,
}: {
  service: Service; salonName: string; onClose: () => void;
}) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const days = generateDays();
  const canNext = step === 1 ? !!selectedDay && !!selectedTime : step === 2 ? name.length > 1 && phone.length > 9 : false;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center px-0 md:px-6"
      style={{ background: "rgba(26,23,20,0.55)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="w-full md:max-w-lg rounded-t-3xl md:rounded-2xl border overflow-hidden flex flex-col max-h-[92vh]"
        style={{ background: "var(--white)", borderColor: "var(--border-ink)", boxShadow: "var(--shadow-lg)" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b flex-shrink-0"
          style={{ borderColor: "var(--border-ink)" }}
        >
          <div>
            <p className="text-[10px] tracking-[4px] uppercase" style={{ color: "var(--gold)" }}>Randevu Al</p>
            <p className="text-base font-light mt-0.5" style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}>
              {service.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--cream-2)]"
            style={{ color: "var(--muted)" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 flex-shrink-0" style={{ background: "var(--cream-2)" }}>
          <div
            className="h-full transition-all duration-500"
            style={{ width: `${(step / 3) * 100}%`, background: "var(--gold)" }}
          />
        </div>

        {/* Step tabs */}
        <div className="flex border-b flex-shrink-0" style={{ borderColor: "var(--border-ink)" }}>
          {["Tarih & Saat", "Bilgileriniz", "Onay"].map((s, i) => (
            <div
              key={s}
              className="flex-1 py-3 text-center text-[10px] tracking-widest uppercase"
              style={{ color: step === i + 1 ? "var(--gold)" : step > i + 1 ? "var(--success)" : "var(--muted-2)" }}
            >
              {step > i + 1 ? "✓" : s}
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="px-6 py-6 overflow-y-auto flex-1">
          {/* Step 1: Tarih & Saat */}
          {step === 1 && (
            <div>
              <p className="text-[10px] tracking-widest uppercase mb-4" style={{ color: "var(--muted)" }}>Tarih Seçin</p>
              <div className="flex gap-2 overflow-x-auto pb-3">
                {days.map((day) => {
                  const active = selectedDay?.toDateString() === day.toDateString();
                  return (
                    <button
                      key={day.toISOString()}
                      onClick={() => { setSelectedDay(day); setSelectedTime(null); }}
                      className="flex-shrink-0 flex flex-col items-center px-3 py-3 rounded-xl border w-16 transition-all"
                      style={{
                        background: active ? "var(--gold)" : "var(--cream)",
                        borderColor: active ? "var(--gold)" : "var(--border-ink)",
                        boxShadow: active ? "var(--shadow-rose)" : "none",
                      }}
                    >
                      <span className="text-[9px] tracking-widest uppercase" style={{ color: active ? "rgba(255,255,255,0.7)" : "var(--muted)" }}>
                        {DAY_LABELS[day.getDay() === 0 ? 6 : day.getDay() - 1]}
                      </span>
                      <span className="text-lg font-light mt-1" style={{ color: active ? "#fff" : "var(--ink)", fontFamily: "var(--font-playfair)" }}>
                        {format(day, "d")}
                      </span>
                      <span className="text-[9px]" style={{ color: active ? "rgba(255,255,255,0.6)" : "var(--muted-2)" }}>
                        {format(day, "MMM", { locale: tr })}
                      </span>
                    </button>
                  );
                })}
              </div>

              {selectedDay && (
                <>
                  <p className="text-[10px] tracking-widest uppercase mt-6 mb-4" style={{ color: "var(--muted)" }}>Saat Seçin</p>
                  <div className="grid grid-cols-4 gap-2">
                    {TIME_SLOTS.map((t) => {
                      const busy = UNAVAILABLE.includes(t);
                      const active = selectedTime === t;
                      return (
                        <button
                          key={t}
                          disabled={busy}
                          onClick={() => setSelectedTime(t)}
                          className="py-2.5 rounded-xl text-[11px] border transition-all"
                          style={{
                            background: active ? "var(--gold)" : busy ? "var(--cream-3)" : "var(--cream)",
                            borderColor: active ? "var(--gold)" : "var(--border-ink)",
                            color: active ? "#fff" : busy ? "var(--muted-2)" : "var(--ink)",
                            opacity: busy ? 0.5 : 1,
                            cursor: busy ? "not-allowed" : "pointer",
                          }}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Step 2: İletişim */}
          {step === 2 && (
            <div className="flex flex-col gap-4">
              {[
                { label: "Ad Soyad", value: name, set: setName, type: "text", placeholder: "Adınız ve soyadınız" },
                { label: "Telefon", value: phone, set: setPhone, type: "tel", placeholder: "+90 5XX XXX XX XX" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="text-[10px] tracking-widest uppercase block mb-2" style={{ color: "var(--muted)" }}>
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    value={f.value}
                    onChange={(e) => f.set(e.target.value)}
                    placeholder={f.placeholder}
                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all focus:border-[var(--gold)] placeholder:text-[var(--muted-2)]"
                    style={{ borderColor: "var(--border-ink-2)", color: "var(--ink)", background: "var(--cream)" }}
                  />
                </div>
              ))}
              <div>
                <label className="text-[10px] tracking-widest uppercase block mb-2" style={{ color: "var(--muted)" }}>
                  Not (isteğe bağlı)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  placeholder="Özel bir isteğiniz var mı?"
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all focus:border-[var(--gold)] placeholder:text-[var(--muted-2)] resize-none"
                  style={{ borderColor: "var(--border-ink-2)", color: "var(--ink)", background: "var(--cream)" }}
                />
              </div>
            </div>
          )}

          {/* Step 3: Onay */}
          {step === 3 && (
            <div className="flex flex-col items-center text-center py-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                style={{ background: "var(--success-bg)" }}
              >
                <CheckCircle size={30} style={{ color: "var(--success)" }} />
              </div>
              <p className="text-[10px] tracking-[4px] uppercase mb-2" style={{ color: "var(--success)" }}>Onaylandı</p>
              <h3 className="text-xl font-light mb-6" style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}>
                Randevunuz oluşturuldu
              </h3>
              <div
                className="w-full rounded-xl border divide-y text-left overflow-hidden"
                style={{ borderColor: "var(--border-ink)" }}
              >
                {[
                  ["Salon", salonName],
                  ["Hizmet", service.name],
                  ["Tarih", selectedDay ? format(selectedDay, "d MMMM yyyy, EEEE", { locale: tr }) : ""],
                  ["Saat", selectedTime ?? ""],
                  ["Süre", `${service.duration} dakika`],
                  ["Ücret", `₺${service.price}`],
                  ["Ad Soyad", name],
                  ["Telefon", phone],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between px-4 py-3" style={{ background: "var(--cream)" }}>
                    <span className="text-[10px] tracking-widest uppercase" style={{ color: "var(--muted)" }}>{label}</span>
                    <span className="text-xs font-medium" style={{ color: "var(--ink)" }}>{val}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs mt-5" style={{ color: "var(--muted)" }}>
                Onay SMS ve e-posta ile gönderilecek.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex gap-3 flex-shrink-0" style={{ borderColor: "var(--border-ink)", background: "var(--cream)" }}>
          {step > 1 && step < 3 && (
            <button
              onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
              className="btn-outline rounded-xl px-4 flex items-center gap-1.5 text-[10px]"
            >
              <ChevronLeft size={14} /> Geri
            </button>
          )}
          {step < 3 ? (
            <button
              disabled={!canNext}
              onClick={() => setStep((s) => (s + 1) as 1 | 2 | 3)}
              className="btn-gold flex-1 justify-center rounded-xl disabled:opacity-30"
            >
              {step === 2 ? "Randevuyu Onayla" : "Devam Et"} <ChevronRight size={14} />
            </button>
          ) : (
            <button onClick={onClose} className="btn-gold flex-1 justify-center rounded-xl">
              Kapat
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Salon Detay Sayfası ─── */
export default function SalonDetailPage() {
  const { slug } = useParams();
  const salon = MOCK_SALONS.find((s) => s.slug === slug);
  const services = MOCK_SERVICES.filter((s) => s.salon_id === salon?.id);
  const staff = MOCK_STAFF.filter((s) => s.salon_id === salon?.id);

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeTab, setActiveTab] = useState<"hizmetler" | "uzmanlar" | "yorumlar">("hizmetler");

  if (!salon) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 gap-4" style={{ background: "var(--cream)" }}>
        <p className="text-sm tracking-widest uppercase" style={{ color: "var(--muted)" }}>Salon bulunamadı</p>
        <Link href="/" className="btn-gold rounded-xl">Ana Sayfaya Dön</Link>
      </div>
    );
  }

  const initials = salon.name.split(" ").map((w) => w[0]).join("").slice(0, 2);

  return (
    <div style={{ background: "var(--cream)" }}>
      {/* Cover */}
      <div className="h-64 md:h-96 relative overflow-hidden border-b" style={{ borderColor: "var(--border-ink)" }}>
        {salon.cover_image ? (
          <>
            <Image
              src={salon.cover_image}
              alt={salon.name}
              fill
              className="object-cover"
              priority
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(28,23,20,0.6) 0%, rgba(28,23,20,0.15) 60%, transparent 100%)" }}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: "var(--cream-3)" }}>
            <span className="text-8xl font-light tracking-[12px] opacity-15" style={{ color: "var(--gold)", fontFamily: "var(--font-playfair)" }}>
              {initials}
            </span>
          </div>
        )}
        {/* İsim overlay */}
        <div className="absolute bottom-6 left-6 z-10">
          <h1 className="text-3xl md:text-4xl font-light text-white mb-1" style={{ fontFamily: "var(--font-playfair)", textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
            {salon.name}
          </h1>
          <div className="flex items-center gap-2 text-white/75">
            <MapPin size={13} />
            <span className="text-sm">{salon.district}, {salon.city}</span>
          </div>
        </div>
        {salon.is_verified && (
          <div className="absolute top-5 right-5 z-10">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] tracking-widest uppercase backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.9)", color: "var(--gold)" }}>
              <CheckCircle size={12} /> Doğrulanmış
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="py-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase transition-colors hover:text-[var(--gold)]"
            style={{ color: "var(--muted)" }}
          >
            <ArrowLeft size={13} /> Geri Dön
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-20">
          {/* Sol: Bilgiler + tab */}
          <div className="lg:col-span-2">
            {/* Salon başlık */}
            <div className="mb-8 pb-8 border-b" style={{ borderColor: "var(--border-ink)" }}>
              <div className="flex flex-wrap gap-4 mb-3 animate-fade-in-up">
                <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted)" }}>
                  <MapPin size={13} /> {salon.address}
                </span>
                <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted)" }}>
                  <Phone size={13} /> {salon.phone}
                </span>
              </div>
              <div className="flex items-center gap-3 mb-4 animate-fade-in-up delay-200">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={13} fill={i <= Math.round(salon.rating) ? "var(--gold)" : "none"} stroke="var(--gold)" strokeWidth={1.5} />
                  ))}
                </div>
                <span className="text-sm font-medium" style={{ color: "var(--gold)" }}>{salon.rating}</span>
                <span className="text-xs" style={{ color: "var(--muted)" }}>· {salon.review_count} yorum</span>
              </div>
              <p className="text-sm leading-relaxed animate-fade-in-up delay-300" style={{ color: "var(--muted)" }}>
                {salon.description}
              </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-0 border-b mb-8" style={{ borderColor: "var(--border-ink)" }}>
              {(["hizmetler", "uzmanlar", "yorumlar"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-6 py-3 text-[11px] tracking-widest uppercase border-b-2 transition-all capitalize"
                  style={{
                    borderBottomColor: activeTab === tab ? "var(--gold)" : "transparent",
                    color: activeTab === tab ? "var(--gold)" : "var(--muted)",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab: Hizmetler */}
            {activeTab === "hizmetler" && (
              <div className="flex flex-col gap-3">
                {services.map((svc, i) => (
                  <div
                    key={svc.id}
                    className="animate-fade-in-up rounded-2xl border p-5 flex items-center justify-between gap-4"
                    style={{ animationDelay: `${i * 60}ms`, background: "var(--white)", borderColor: "var(--border-ink)" }}
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-1" style={{ color: "var(--ink)" }}>{svc.name}</p>
                      <p className="text-xs mb-2" style={{ color: "var(--muted)" }}>{svc.description}</p>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-[11px]" style={{ color: "var(--muted)" }}>
                          <Clock size={11} /> {svc.duration} dk
                        </span>
                        <span
                          className="text-[10px] px-2.5 py-0.5 rounded-full"
                          style={{ background: "var(--gold-pale)", color: "var(--gold)", border: "1px solid var(--border)" }}
                        >
                          {svc.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3 flex-shrink-0">
                      <span className="text-lg font-light" style={{ color: "var(--gold)", fontFamily: "var(--font-playfair)" }}>
                        ₺{svc.price}
                      </span>
                      <button
                        onClick={() => setSelectedService(svc)}
                        className="btn-gold rounded-xl text-[10px] py-2 px-4 flex items-center gap-1.5"
                      >
                        <Calendar size={12} /> Randevu Al
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab: Uzmanlar */}
            {activeTab === "uzmanlar" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {staff.map((member, i) => {
                  const si = member.name.split(" ").map((w) => w[0]).join("").slice(0, 2);
                  return (
                    <div
                      key={member.id}
                      className="animate-fade-in-up rounded-2xl border p-5 flex items-start gap-4"
                      style={{ animationDelay: `${i * 80}ms`, background: "var(--white)", borderColor: "var(--border-ink)" }}
                    >
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-sm font-light"
                        style={{ background: "var(--gold-pale)", color: "var(--gold)", border: "1px solid var(--border)" }}
                      >
                        {si}
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-0.5" style={{ color: "var(--ink)" }}>{member.name}</p>
                        <p className="text-[10px] tracking-widest uppercase mb-2" style={{ color: "var(--gold)" }}>{member.title}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {member.specialties.map((sp) => (
                            <span key={sp} className="text-[9px] px-2 py-0.5 rounded-full" style={{ background: "var(--cream-2)", color: "var(--muted)", border: "1px solid var(--border-ink)" }}>
                              {sp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Tab: Yorumlar */}
            {activeTab === "yorumlar" && (
              <div className="flex flex-col gap-5">
                {[
                  { name: "Ayşe K.", rating: 5, date: "12 Mayıs 2026", text: "Muhteşem bir deneyimdi! Tam istediğim gibi oldu, kesinlikle tavsiye ederim." },
                  { name: "Merve T.", rating: 5, date: "8 Mayıs 2026", text: "Balayage için geldim, harika çıktı. Ürünler çok kaliteli." },
                  { name: "Selin B.", rating: 4, date: "3 Mayıs 2026", text: "Güzel bir deneyim. Sonuç harikaydı." },
                ].map((r, i) => (
                  <div
                    key={r.name}
                    className="animate-fade-in-up rounded-2xl border p-5"
                    style={{ animationDelay: `${i * 80}ms`, background: "var(--white)", borderColor: "var(--border-ink)" }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-light"
                          style={{ background: "var(--gold-pale)", color: "var(--gold)" }}
                        >
                          {r.name[0]}
                        </div>
                        <div>
                          <p className="text-xs font-medium" style={{ color: "var(--ink)" }}>{r.name}</p>
                          <div className="flex gap-0.5 mt-0.5">
                            {[1,2,3,4,5].map((s) => (
                              <Star key={s} size={9} fill={s <= r.rating ? "var(--gold)" : "none"} stroke="var(--gold)" strokeWidth={1.5} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px]" style={{ color: "var(--muted-2)" }}>{r.date}</span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{r.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sağ: Sidebar */}
          <div className="lg:col-span-1">
            <div
              className="sticky top-24 rounded-2xl border p-6"
              style={{ background: "var(--white)", borderColor: "var(--border-ink)", boxShadow: "var(--shadow-md)" }}
            >
              <p className="text-[10px] tracking-[4px] uppercase mb-4" style={{ color: "var(--gold)" }}>Hızlı Randevu</p>

              {/* Hizmet listesi */}
              <div className="flex flex-col gap-2 mb-6">
                {services.slice(0, 4).map((svc) => (
                  <button
                    key={svc.id}
                    onClick={() => setSelectedService(svc)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all hover:border-[var(--border-2)] hover:bg-[var(--gold-pale)]"
                    style={{ borderColor: "var(--border-ink)", color: "var(--ink)" }}
                  >
                    <span className="text-xs">{svc.name}</span>
                    <span className="text-xs font-light" style={{ color: "var(--gold)" }}>₺{svc.price}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => services[0] && setSelectedService(services[0])}
                className="btn-gold w-full justify-center rounded-xl mb-6"
              >
                <Calendar size={15} /> Randevu Al
              </button>

              {/* Çalışma saatleri */}
              <div className="border-t pt-5" style={{ borderColor: "var(--border-ink)" }}>
                <p className="text-[10px] tracking-widest uppercase mb-3" style={{ color: "var(--muted)" }}>Çalışma Saatleri</p>
                {Object.entries(salon.opening_hours).slice(0, 6).map(([day, h]) => {
                  const labels: Record<string, string> = { monday: "Pazartesi", tuesday: "Salı", wednesday: "Çarşamba", thursday: "Perşembe", friday: "Cuma", saturday: "Cumartesi" };
                  return (
            