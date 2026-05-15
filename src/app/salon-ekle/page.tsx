"use client";

import { useState } from "react";
import { CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";

const STEPS = ["Temel Bilgiler", "Hizmetler", "Çalışma Saatleri", "Tamamlandı"];

const DAYS = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];

const CATEGORIES = ["Saç & Bakım", "Tırnak", "Cilt Bakımı", "Kaş & Kirpik", "Spa & Masaj", "Makyaj", "Lazer"];

export default function SalonEklePage() {
  const [step, setStep] = useState(0);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [hours, setHours] = useState(
    DAYS.map((d) => ({ day: d, open: d !== "Pazar", start: "09:00", end: "19:00" }))
  );

  const toggleCat = (cat: string) => {
    setSelectedCats((prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]);
  };

  const toggleDay = (i: number) => {
    setHours((prev) => prev.map((h, idx) => idx === i ? { ...h, open: !h.open } : h));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] px-6 py-14" style={{ background: "var(--cream)" }}>
      <div className="max-w-2xl mx-auto">
        {/* Başlık */}
        <div className="text-center mb-10 animate-fade-in">
          <p className="text-[10px] tracking-[6px] uppercase mb-2" style={{ color: "var(--gold)" }}>Salon Kaydı</p>
          <h1 className="text-3xl font-light" style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}>
            Salonunuzu ekleyin
          </h1>
        </div>

        {/* Progress steps */}
        <div className="flex items-center gap-0 mb-10 animate-fade-in delay-100">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all"
                  style={{
                    background: i < step ? "var(--success)" : i === step ? "var(--gold)" : "var(--cream-3)",
                    color: i <= step ? "#fff" : "var(--muted)",
                  }}
                >
                  {i < step ? <CheckCircle size={16} /> : i + 1}
                </div>
                <span className="text-[9px] tracking-wide whitespace-nowrap hidden sm:block" style={{ color: i === step ? "var(--gold)" : "var(--muted)" }}>
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className="flex-1 h-px mx-2 transition-all"
                  style={{ background: i < step ? "var(--gold)" : "var(--border-ink-2)" }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Kart */}
        <div
          className="rounded-2xl border p-8 animate-scale-in"
          style={{ background: "var(--white)", borderColor: "var(--border-ink)", boxShadow: "var(--shadow-md)" }}
        >
          {/* Step 0: Temel bilgiler */}
          {step === 0 && (
            <div className="flex flex-col gap-5">
              <h2 className="text-lg font-light mb-2" style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}>
                Temel bilgiler
              </h2>
              {[
                { label: "Salon Adı", placeholder: "örn. Bella Beauty Studio", type: "text" },
                { label: "Telefon", placeholder: "+90 5XX XXX XX XX", type: "tel" },
                { label: "E-posta", placeholder: "salon@email.com", type: "email" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="text-[10px] tracking-widest uppercase block mb-2" style={{ color: "var(--muted)" }}>{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all focus:border-[var(--gold)] placeholder:text-[var(--muted-2)]"
                    style={{ borderColor: "var(--border-ink-2)", color: "var(--ink)", background: "var(--cream)" }}
                  />
                </div>
              ))}
              <div>
                <label className="text-[10px] tracking-widest uppercase block mb-2" style={{ color: "var(--muted)" }}>İlçe</label>
                <select
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all focus:border-[var(--gold)] appearance-none"
                  style={{ borderColor: "var(--border-ink-2)", color: "var(--ink)", background: "var(--cream)" }}
                >
                  {["Beşiktaş", "Kadıköy", "Nişantaşı", "Şişli", "Levent", "Sarıyer", "Üsküdar"].map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] tracking-widest uppercase block mb-2" style={{ color: "var(--muted)" }}>Açık Adres</label>
                <textarea
                  rows={2}
                  placeholder="Cadde, bina no, kat..."
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all focus:border-[var(--gold)] placeholder:text-[var(--muted-2)] resize-none"
                  style={{ borderColor: "var(--border-ink-2)", color: "var(--ink)", background: "var(--cream)" }}
                />
              </div>
              <div>
                <label className="text-[10px] tracking-widest uppercase block mb-2" style={{ color: "var(--muted)" }}>Salon Hakkında</label>
                <textarea
                  rows={3}
                  placeholder="Salonunuzu kısaca tanıtın..."
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all focus:border-[var(--gold)] placeholder:text-[var(--muted-2)] resize-none"
                  style={{ borderColor: "var(--border-ink-2)", color: "var(--ink)", background: "var(--cream)" }}
                />
              </div>
            </div>
          )}

          {/* Step 1: Hizmetler / kategoriler */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-light mb-2" style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}>
                Hangi hizmetleri sunuyorsunuz?
              </h2>
              <p className="text-xs mb-6" style={{ color: "var(--muted)" }}>Birden fazla kategori seçebilirsiniz.</p>
              <div className="grid grid-cols-2 gap-3">
                {CATEGORIES.map((cat) => {
                  const active = selectedCats.includes(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => toggleCat(cat)}
                      className="flex items-center gap-3 rounded-xl border p-4 text-left transition-all"
                      style={{
                        background: active ? "var(--gold-pale)" : "var(--cream)",
                        borderColor: active ? "var(--gold)" : "var(--border-ink-2)",
                        color: active ? "var(--gold)" : "var(--ink)",
                      }}
                    >
                      <div
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all"
                        style={{ borderColor: active ? "var(--gold)" : "var(--muted-2)", background: active ? "var(--gold)" : "transparent" }}
                      >
                        {active && <CheckCircle size={12} color="#fff" />}
                      </div>
                      <span className="text-xs font-medium">{cat}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Çalışma saatleri */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-light mb-6" style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}>
                Çalışma saatleri
              </h2>
              <div className="flex flex-col gap-3">
                {hours.map((h, i) => (
                  <div key={h.day} className="flex items-center gap-4">
                    <button
                      onClick={() => toggleDay(i)}
                      className="flex items-center gap-2 w-28 flex-shrink-0"
                    >
                      <div
                        className="w-9 h-5 rounded-full transition-all relative"
                        style={{ background: h.open ? "var(--gold)" : "var(--cream-3)" }}
                      >
                        <div
                          className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all"
                          style={{ left: h.open ? "calc(100% - 18px)" : "2px", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }}
                        />
                      </div>
                      <span className="text-xs" style={{ color: h.open ? "var(--ink)" : "var(--muted)" }}>{h.day.slice(0, 3)}</span>
                    </button>
                    {h.open ? (
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="time"
                          value={h.start}
                          onChange={(e) => setHours((prev) => prev.map((x, idx) => idx === i ? { ...x, start: e.target.value } : x))}
                          className="rounded-lg border px-3 py-2 text-xs outline-none focus:border-[var(--gold)]"
                          style={{ borderColor: "var(--border-ink-2)", color: "var(--ink)", background: "var(--cream)" }}
                        />
                        <span className="text-xs" style={{ color: "var(--muted)" }}>–</span>
                        <input
                          type="time"
                          value={h.end}
                          onChange={(e) => setHours((prev) => prev.map((x, idx) => idx === i ? { ...x, end: e.target.value } : x))}
                          className="rounded-lg border px-3 py-2 text-xs outline-none focus:border-[var(--gold)]"
                          style={{ borderColor: "var(--border-ink-2)", color: "var(--ink)", background: "var(--cream)" }}
                        />
                      </div>
                    ) : (
                      <span className="text-xs" style={{ color: "var(--muted-2)" }}>Kapalı</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Tamamlandı */}
          {step === 3 && (
            <div className="text-center py-8">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: "var(--success-bg)" }}
              >
                <CheckCircle size={36} style={{ color: "var(--success)" }} />
              </div>
              <h2 className="text-2xl font-light mb-3" style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}>
                Başvurunuz alındı!
              </h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
                Salonunuz 24 saat içinde incelenerek onaylanacak ve yayına alınacaktır. E-posta ile bilgilendirileceksiniz.
              </p>
              <a href="/dashboard" className="btn-gold rounded-xl mx-auto">
                Dashboard&apos;a Git <ArrowRight size={15} />
              </a>
            </div>
          )}
        </div>

        {/* Navigation */}
        {step < 3 && (
          <div className="flex gap-3 mt-6 animate-fade-in">
            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="btn-outline rounded-xl flex items-center gap-2"
              >
                <ArrowLeft size={15} /> Geri
              </button>
            )}
            <button
              onClick={() => setStep((s) => s + 1)}
              className="btn-gold rounded-xl flex-1 justify-center"
            >
              {step === STEPS.length - 2 ? "Tamamla" : "Devam Et"} <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
