import Link from "next/link";
import { Instagram, Facebook, Twitter } from "lucide-react";

const LINKS = {
  Platform: [
    { label: "Salonları Keşfet", href: "/salonlar" },
    { label: "Hizmetler", href: "/hizmetler" },
    { label: "Nasıl Çalışır?", href: "/#nasil-calisir" },
    { label: "Fiyatlandırma", href: "/fiyatlandirma" },
  ],
  "Salon Sahipleri": [
    { label: "Salon Ekle", href: "/salon-ekle" },
    { label: "Kurumsal", href: "/kurumsal" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Destek", href: "/destek" },
  ],
  Yasal: [
    { label: "Gizlilik Politikası", href: "/gizlilik" },
    { label: "Kullanım Şartları", href: "/sartlar" },
    { label: "Çerez Politikası", href: "/cerezler" },
    { label: "İletişim", href: "/iletisim" },
  ],
};

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{ background: "var(--cream-2)", borderColor: "var(--border-ink)" }}
    >
      {/* Top */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="lg:col-span-2">
          <Link href="/" className="flex flex-col leading-none mb-4 w-fit">
            <span
              className="text-xl tracking-[3px] font-light"
              style={{ color: "var(--gold)", fontFamily: "var(--font-playfair)" }}
            >
              GLAMBOOK
            </span>
            <span className="text-[9px] tracking-[5px] uppercase" style={{ color: "var(--muted-2)" }}>
              STUDIO
            </span>
          </Link>
          <p className="text-sm leading-relaxed max-w-xs mb-6" style={{ color: "var(--muted)" }}>
            İstanbul&apos;un en seçkin güzellik salonlarını bir araya getiren premium randevu platformu.
          </p>
          {/* Socials */}
          <div className="flex gap-3">
            {[
              { icon: Instagram, href: "https://instagram.com" },
              { icon: Facebook,  href: "https://facebook.com" },
              { icon: Twitter,   href: "https://twitter.com" },
            ].map(({ icon: Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center border transition-all hover:border-[var(--gold)] hover:text-[var(--gold)]"
                style={{ borderColor: "var(--border-ink-2)", color: "var(--muted)" }}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Nav columns */}
        {Object.entries(LINKS).map(([title, items]) => (
          <div key={title}>
            <p
              className="text-[10px] tracking-[3px] uppercase font-medium mb-4"
              style={{ color: "var(--ink)" }}
            >
              {title}
            </p>
            <ul className="flex flex-col gap-2.5">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs transition-colors hover:text-[var(--gold)]"
                    style={{ color: "var(--muted)" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="divider-rose" />

      {/* Bottom */}
      <div
        className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
      >
        <p className="text-[11px]" style={{ color: "var(--muted-2)" }}>
          © 2026 GlamBook Studio. Tüm hakları saklıdır.
        </p>
        <div className="flex items-center gap-2">
          <span className="text-[11px]" style={{ color: "var(--muted-2)" }}>İstanbul ile yapıldı</span>
          <span style={{ color: "var(--gold)" }}>♥</span>
        </div>
      </div>
    </footer>
  );
}
