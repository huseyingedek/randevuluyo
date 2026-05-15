"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

const NAV_LINKS = [
  { href: "/salonlar",   label: "Salonlar" },
  { href: "/hizmetler",  label: "Hizmetler" },
  { href: "/kurumsal",   label: "Kurumsal" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "shadow-md border-b"
          : "border-b border-transparent"
      )}
      style={{
        background: scrolled ? "rgba(250,248,244,0.97)" : "var(--cream)",
        borderColor: scrolled ? "var(--border-ink)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-0.5 leading-none group">
          <span
            className="text-xl tracking-[2px] font-light transition-colors"
            style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}
          >
            randevu
          </span>
          <span
            className="text-xl tracking-[2px] font-semibold transition-colors"
            style={{ color: "var(--gold)", fontFamily: "var(--font-playfair)" }}
          >
            luyo
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[11px] tracking-widest uppercase transition-colors hover:text-[var(--gold)]"
              style={{ color: "var(--muted)" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/giris"
            className="text-[11px] tracking-widest uppercase px-4 py-2 rounded-lg transition-all hover:bg-[var(--cream-2)]"
            style={{ color: "var(--muted)" }}
          >
            Giriş
          </Link>
          <Link href="/salon-ekle" className="btn-gold text-[10px]">
            Salon Ekle
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg transition-colors hover:bg-[var(--cream-2)]"
          style={{ color: "var(--ink)" }}
          onClick={() => setOpen(!open)}
          aria-label="Menü"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={clsx(
          "md:hidden overflow-hidden transition-all duration-300",
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        )}
        style={{ background: "var(--white)", borderTop: `1px solid var(--border-ink)` }}
      >
        <div className="px-6 py-5 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[11px] tracking-widest uppercase py-1"
              style={{ color: "var(--muted)" }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="border-t pt-4 flex flex-col gap-3" style={{ borderColor: "var(--border-ink)" }}>
            <Link href="/giris" className="text-[11px] tracking-widest uppercase" style={{ color: "var(--muted)" }} onClick={() => setOpen(false)}>
              Giriş Yap
            </Link>
            <Link href="/salon-ekle" className="btn-gold justify-center text-[10px]" onClick={() => setOpen(false)}>
              Salon Ekle
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
