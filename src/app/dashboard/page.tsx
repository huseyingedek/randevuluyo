"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutGrid, Calendar, Settings, Users, Scissors,
  TrendingUp, Clock, CheckCircle, XCircle, AlertCircle,
  ChevronRight, Plus, MoreHorizontal
} from "lucide-react";
import clsx from "clsx";
import { MOCK_SERVICES, MOCK_STAFF } from "@/lib/mock-data";

const STATS = [
  { label: "Bugünkü Randevu", value: "12", trend: "+3 dün" },
  { label: "Bu Hafta", value: "67", trend: "+12%" },
  { label: "Aylık Gelir", value: "₺48K", trend: "+18%" },
  { label: "Ortalama Puan", value: "4.9 ★", trend: "312 yorum" },
];

const APPOINTMENTS = [
  { id: "r1", time: "09:00", name: "Ayşe Kaya", service: "Saç Boyama", staff: "Deniz Y.", duration: 120, status: "confirmed" },
  { id: "r2", time: "10:30", name: "Merve Tunç", service: "Manikür", staff: "Aylin T.", duration: 45, status: "confirmed" },
  { id: "r3", time: "11:30", name: "Selin Başak", service: "Kaş Tasarımı", staff: "Elif K.", duration: 30, status: "pending" },
  { id: "r4", time: "13:00", name: "Zeynep Ak", service: "Balayage", staff: "Deniz Y.", duration: 180, status: "confirmed" },
  { id: "r5", time: "14:00", name: "Büşra Can", service: "Keratin", staff: "Elif K.", duration: 150, status: "pending" },
  { id: "r6", time: "16:30", name: "Naz Demir", service: "Saç Kesimi", staff: "Deniz Y.", duration: 60, status: "cancelled" },
];

type Tab = "randevular" | "hizmetler" | "ekip" | "ayarlar";

const STATUS_CONFIG = {
  confirmed: { label: "Onaylandı", icon: CheckCircle, color: "#639922", bg: "rgba(99,153,34,0.1)", border: "rgba(99,153,34,0.25)" },
  pending: { label: "Bekliyor", icon: AlertCircle, color: "var(--gold)", bg: "var(--gold-pale)", border: "var(--border-2)" },
  cancelled: { label: "İptal", icon: XCircle, color: "#993556", bg: "rgba(153,53,86,0.1)", border: "rgba(153,53,86,0.25)" },
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("randevular");
  const [sideOpen, setSideOpen] = useState(true);

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "randevular", label: "Randevular", icon: <Calendar size={16} /> },
    { key: "hizmetler", label: "Hizmetler", icon: <Scissors size={16} /> },
    { key: "ekip", label: "Ekip", icon: <Users size={16} /> },
    { key: "ayarlar", label: "Ayarlar", icon: <Settings size={16} /> },
  ];

  return (
    <div className="flex min-h-screen" style={{ background: "var(--cream)", color: "var(--ink)" }}>
      {/* Sidebar */}
      <aside
        className={clsx(
          "flex-shrink-0 border-r flex flex-col transition-all duration-300",
          sideOpen ? "w-56" : "w-16"
        )}
        style={{ background: "var(--white)", borderColor: "var(--border-ink)" }}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b" style={{ borderColor: "var(--border-ink)" }}>
          <Link href="/" className="flex flex-col leading-none">
            {sideOpen ? (
              <>
                <span className="text-base tracking-[2px] font-light" style={{ color: "var(--gold)", fontFamily: "var(--font-playfair)" }}>GLAMBOOK</span>
                <span className="text-[8px] tracking-[4px]" style={{ color: "var(--muted-2)" }}>DASHBOARD</span>
              </>
            ) : (
              <span className="text-base tracking-widest" style={{ color: "var(--gold)", fontFamily: "var(--font-playfair)" }}>G</span>
            )}
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 p-3 flex-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 text-left transition-all w-full rounded-xl",
                activeTab === tab.key
                  ? "bg-[var(--gold-pale)] border border-[var(--border)]"
                  : "border border-transparent hover:bg-[var(--cream-2)]"
              )}
            >
              <span style={{ color: activeTab === tab.key ? "var(--gold)" : "var(--muted)" }}>
                {tab.icon}
              </span>
              {sideOpen && (
                <span
                  className="text-xs tracking-widest uppercase"
                  style={{ color: activeTab === tab.key ? "var(--gold)" : "var(--muted)" }}
                >
                  {tab.label}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Collapse toggle */}
        <button
          onClick={() => setSideOpen(!sideOpen)}
          className="m-3 flex items-center justify-center py-2 rounded-xl border transition-all hover:bg-[var(--cream-2)]"
          style={{ borderColor: "var(--border-ink)", color: "var(--muted)" }}
        >
          <ChevronRight size={14} className={clsx("transition-transform", sideOpen && "rotate-180")} />
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div
          className="h-16 flex items-center justify-between px-8 border-b flex-shrink-0"
          style={{ background: "var(--white)", borderColor: "var(--border-ink)" }}
        >
          <div>
            <p className="text-[10px] tracking-[4px] uppercase" style={{ color: "var(--gold)" }}>Salon Yönetimi</p>
            <p className="text-sm font-light" style={{ color: "var(--ink)" }}>Atelier Bella — Beşiktaş</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px] tracking-wide" style={{ color: "var(--muted)" }}>15 Mayıs 2026, Cuma</span>
            <div
              className="w-8 h-8 flex items-center justify-center text-xs font-light border"
              style={{ background: "var(--gold-pale)", borderColor: "var(--border-ink)", color: "var(--gold)" }}
            >
              AB
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="rounded-2xl border p-5 card-hover" style={{ background: "var(--white)", borderColor: "var(--border-ink)" }}>
                <p className="text-[10px] tracking-widest uppercase mb-2" style={{ color: "var(--muted)" }}>{stat.label}</p>
                <p className="text-2xl font-light mb-1" style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}>{stat.value}</p>
                <p className="text-[10px] flex items-center gap-1" style={{ color: "var(--gold)" }}>
                  <TrendingUp size={10} /> {stat.trend}
                </p>
              </div>
            ))}
          </div>

          {/* Tab: Randevular */}
          {activeTab === "randevular" && (
            <div className="rounded-2xl border" style={{ background: "var(--white)", borderColor: "var(--border-ink)" }}>
              <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "var(--border-ink)" }}>
                <h2 className="text-sm font-light" style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}>Bugünün Randevuları</h2>
                <button
                  className="flex items-center gap-2 px-4 py-2 text-[10px] tracking-widest uppercase border transition-all hover:bg-[var(--gold)] hover:text-white hover:border-[var(--gold)]"
                  style={{ borderColor: "var(--border-2)", color: "var(--gold)" }}
                >
                  <Plus size={12} /> Yeni Randevu
                </button>
              </div>
              <div className="divide-y" style={{ borderColor: "var(--border-ink)" }}>
                {APPOINTMENTS.map((apt) => {
                  const cfg = STATUS_CONFIG[apt.status as keyof typeof STATUS_CONFIG];
                  const Icon = cfg.icon;
                  return (
                    <div key={apt.id} className="flex items-center gap-5 px-6 py-4 hover:bg-[var(--cream-2)] transition-colors">
                      <div className="w-14 text-center flex-shrink-0">
                        <p className="text-sm font-medium" style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}>{apt.time}</p>
                        <p className="text-[9px] tracking-wide" style={{ color: "var(--muted)" }}>{apt.duration} dk</p>
                      </div>
                      <div
                        className="w-px self-stretch"
                        style={{ background: cfg.color, opacity: 0.4 }}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-0.5" style={{ color: "var(--ink)" }}>{apt.name}</p>
                        <p className="text-xs" style={{ color: "var(--muted)" }}>{apt.service} · {apt.staff}</p>
                      </div>
                      <div
                        className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] tracking-wide border"
                        style={{ background: cfg.bg, borderColor: cfg.border, color: cfg.color }}
                      >
                        <Icon size={11} />
                        {cfg.label}
                      </div>
                      <button className="p-1 transition-colors hover:text-[var(--gold)]" style={{ color: "var(--muted)" }}>
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab: Hizmetler */}
          {activeTab === "hizmetler" && (
            <div className="rounded-2xl border" style={{ background: "var(--white)", borderColor: "var(--border-ink)" }}>
              <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "var(--border-ink)" }}>
                <h2 className="text-sm font-light" style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}>Hizmet Listesi</h2>
                <button
                  className="flex items-center gap-2 px-4 py-2 text-[10px] tracking-widest uppercase border transition-all hover:bg-[var(--gold)] hover:text-white hover:border-[var(--gold)]"
                  style={{ borderColor: "var(--border-2)", color: "var(--gold)" }}
                >
                  <Plus size={12} /> Hizmet Ekle
                </button>
              </div>
              <div className="divide-y" style={{ borderColor: "var(--border-ink)" }}>
                {MOCK_SERVICES.map((svc) => (
                  <div key={svc.id} className="flex items-center gap-5 px-6 py-4 hover:bg-[var(--cream-2)] transition-colors">
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-0.5" style={{ color: "var(--ink)" }}>{svc.name}</p>
                      <p className="text-xs" style={{ color: "var(--muted)" }}>{svc.description}</p>
                    </div>
                    <div className="flex items-center gap-6 text-right">
                      <div>
                        <p className="text-[9px] tracking-widest uppercase" style={{ color: "var(--muted)" }}>Süre</p>
                        <p className="text-xs flex items-center gap-1" style={{ color: "var(--ink)" }}>
                          <Clock size={11} /> {svc.duration} dk
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] tracking-widest uppercase" style={{ color: "var(--muted)" }}>Ücret</p>
                        <p className="text-sm font-light" style={{ color: "var(--gold)", fontFamily: "var(--font-playfair)" }}>₺{svc.price}</p>
                      </div>
                      <button className="p-1 transition-colors hover:text-[var(--gold)]" style={{ color: "var(--muted)" }}>
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Ekip */}
          {activeTab === "ekip" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {MOCK_STAFF.map((member) => {
                const si = member.name.split(" ").map(w => w[0]).join("").slice(0, 2);
                return (
                  <div key={member.id} className="border p-6" style={{ background: "var(--white)", borderColor: "var(--border-ink)" }}>
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-12 h-12 flex items-center justify-center text-sm font-light border"
                        style={{ background: "var(--gold-pale)", borderColor: "var(--border-2)", color: "var(--gold)" }}
                      >
                        {si}
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: "var(--ink)" }}>{member.name}</p>
                        <p className="text-[10px] tracking-widest uppercase" style={{ color: "var(--gold)" }}>{member.title}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {member.specialties.map((sp) => (
                        <span key={sp} className="text-[9px] tracking-wide px-2 py-1 border" style={{ borderColor: "rgba(201,168,76,0.2)", color: "var(--muted)" }}>
                          {sp}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
              <button
                className="border p-6 flex flex-col items-center justify-center gap-2 transition-all hover:border-[var(--border-2)]"
                style={{ background: "transparent", borderColor: "rgba(201,168,76,0.2)", color: "var(--muted)", borderStyle: "dashed" }}
              >
                <Plus size={20} style={{ color: "var(--border-2)" }} />
                <span className="text-[10px] tracking-widest uppercase">Ekip Üyesi Ekle</span>
              </button>
            </div>
          )}

          {/* Tab: Ayarlar */}
          {activeTab === "ayarlar" && (
            <div className="max-w-lg border" style={{ background: "var(--white)", borderColor: "var(--border-ink)" }}>
              <div className="px-6 py-4 border-b" style={{ borderColor: "var(--border-ink)" }}>
                <h2 className="text-sm font-light" style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}>Salon Ayarları</h2>
              </div>
              <div className="p-6 flex flex-col gap-5">
                {[
                  { label: "Salon Adı", value: "Atelier Bella" },
                  { label: "Telefon", value: "+90 212 555 01 23" },
                  { label: "Adres", value: "Sinanpaşa Mah. Ihlamur Yolu No:14, Beşiktaş" },
                  { label: "E-posta", value: "info@atelierbella.com" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="text-[10px] tracking-widest uppercase block mb-1.5" style={{ color: "var(--muted)" }}>
                      {field.label}
                    </label>
                    <input
                      defaultValue={field.value}
                      className="w-full border px-4 py-2.5 text-sm outline-none transition-all"
                      style={{ borderColor: "rgba(201,168,76,0.2)", color: "var(--ink)" }}
                    />
                  </div>
                ))}
                <button
                  className="mt-2 px-6 py-3 text-[11px] tracking-widest uppercase font-medium transition-all hover:opacity-90"
                  style={{ background: "var(--gold)", color: "white" }}
                >
                  Kaydet
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
