"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

export default function GirisPage() {
  const [tab, setTab] = useState<"giris" | "kayit">("giris");
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <div
      className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6 py-16"
      style={{ background: "var(--cream)" }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10 animate-fade-in">
          <p
            className="text-2xl tracking-[4px] font-light mb-1"
            style={{ color: "var(--gold)", fontFamily: "var(--font-playfair)" }}
          >
            GLAMBOOK
          </p>
          <p className="text-[9px] tracking-[6px] uppercase" style={{ color: "var(--muted-2)" }}>STUDIO</p>
        </div>

        {/* Kart */}
        <div
          className="rounded-2xl border overflow-hidden animate-scale-in"
          style={{ background: "var(--white)", borderColor: "var(--border-ink)", boxShadow: "var(--shadow-lg)" }}
        >
          {/* Tabs */}
          <div className="flex border-b" style={{ borderColor: "var(--border-ink)" }}>
            {(["giris", "kayit"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="flex-1 py-4 text-[11px] tracking-widest uppercase transition-all border-b-2"
                style={{
                  borderBottomColor: tab === t ? "var(--gold)" : "transparent",
                  color: tab === t ? "var(--gold)" : "var(--muted)",
                  background: "transparent",
                }}
              >
                {t === "giris" ? "Giriş Yap" : "Kayıt Ol"}
              </button>
            ))}
          </div>

          <div className="p-8">
            {tab === "giris" ? (
              <div className="flex flex-col gap-5">
                <div>
                  <label className="text-[10px] tracking-widest uppercase block mb-2" style={{ color: "var(--muted)" }}>
                    E-posta
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ornek@email.com"
                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all placeholder:text-[var(--muted-2)] focus:border-[var(--gold)]"
                    style={{ borderColor: "var(--border-ink-2)", color: "var(--ink)", background: "var(--cream)" }}
                  />
                </div>
                <div>
                  <label className="text-[10px] tracking-widest uppercase block mb-2" style={{ color: "var(--muted)" }}>
                    Şifre
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-xl border px-4 py-3 pr-11 text-sm outline-none transition-all placeholder:text-[var(--muted-2)] focus:border-[var(--gold)]"
                      style={{ borderColor: "var(--border-ink-2)", color: "var(--ink)", background: "var(--cream)" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      style={{ color: "var(--muted-2)" }}
                    >
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Link href="/sifremi-unuttum" className="text-[11px] hover:underline" style={{ color: "var(--gold)" }}>
                    Şifremi unuttum
                  </Link>
                </div>
                <button className="btn-gold w-full justify-center rounded-xl py-3.5">
                  Giriş Yap <ArrowRight size={15} />
                </button>

                <div className="relative flex items-center gap-3 my-1">
                  <div className="flex-1 h-px" style={{ background: "var(--border-ink)" }} />
                  <span className="text-[11px]" style={{ color: "var(--muted-2)" }}>veya</span>
                  <div className="flex-1 h-px" style={{ background: "var(--border-ink)" }} />
                </div>

                <button
                  className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border text-sm transition-all hover:bg-[var(--cream)]"
                  style={{ borderColor: "var(--border-ink-2)", color: "var(--ink)" }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2a10 10 0 0 0-.16-1.79H9v3.38h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92a8.78 8.78 0 0 0 2.68-6.57z" /><path fill="#34A853" d="M9 18a8.6 8.6 0 0 0 5.96-2.18l-2.92-2.27a5.43 5.43 0 0 1-8.07-2.85H.96v2.34A9 9 0 0 0 9 18z" /><path fill="#FBBC05" d="M3.97 10.7A5.4 5.4 0 0 1 3.69 9c0-.59.1-1.17.28-1.71V4.95H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.05z" /><path fill="#EA4335" d="M9 3.58a4.86 4.86 0 0 1 3.44 1.35l2.58-2.58A8.64 8.64 0 0 0 9 0 9 9 0 0 0 .96 4.95L3.97 7.3A5.43 5.43 0 0 1 9 3.58z" /></svg>
                  Google ile giriş yap
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <div>
                  <label className="text-[10px] tracking-widest uppercase block mb-2" style={{ color: "var(--muted)" }}>Ad Soyad</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Adınız Soyadınız"
                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all placeholder:text-[var(--muted-2)] focus:border-[var(--gold)]"
                    style={{ borderColor: "var(--border-ink-2)", color: "var(--ink)", background: "var(--cream)" }}
                  />
                </div>
                <div>
                  <label className="text-[10px] tracking-widest uppercase block mb-2" style={{ color: "var(--muted)" }}>E-posta</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ornek@email.com"
                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all placeholder:text-[var(--muted-2)] focus:border-[var(--gold)]"
                    style={{ borderColor: "var(--border-ink-2)", color: "var(--ink)", background: "var(--cream)" }}
                  />
                </div>
                <div>
                  <label className="text-[10px] tracking-widest uppercase block mb-2" style={{ color: "var(--muted)" }}>Şifre</label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="En az 8 karakter"
                      className="w-full rounded-xl border px-4 py-3 pr-11 text-sm outline-none transition-all placeholder:text-[var(--muted-2)] focus:border-[var(--gold)]"
                      style={{ borderColor: "var(--border-ink-2)", color: "var(--ink)", background: "var(--cream)" }}
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-2)" }}>
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
                  Kayıt olarak{" "}
                  <Link href="/sartlar" className="underline" style={{ color: "var(--gold)" }}>Kullanım Şartları</Link>
                  {" "}ve{" "}
                  <Link href="/gizlilik" className="underline" style={{ color: "var(--gold)" }}>Gizlilik Politikası</Link>
                  &apos;nı kabul etmiş olursunuz.
                </p>
                <button className="btn-gold w-full justify-center rounded-xl py-3.5">
                  Kayıt Ol <ArrowRight size={15} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
