import Link from "next/link";
import { CheckCircle, TrendingUp, Users, Calendar, BarChart3, ArrowRight, Star } from "lucide-react";

const FEATURES = [
  { icon: <Calendar size={22} />, title: "Akıllı Randevu Sistemi", desc: "Gerçek zamanlı uygunluk takvimi. Müşteriler 7/24 randevu alabilir, siz onay veya reddedin." },
  { icon: <Users size={22} />, title: "Müşteri Yönetimi", desc: "Müşteri geçmişi, tercihler ve notlar. Her müşteriyi tanıyın, kişisel deneyim sunun." },
  { icon: <BarChart3 size={22} />, title: "Gelir Analitikleri", desc: "Günlük, haftalık ve aylık raporlar. En çok talep gören hizmetleri ve personeli görün." },
  { icon: <TrendingUp size={22} />, title: "Büyüme Araçları", desc: "Promosyon yönetimi, sadakat programı ve SMS hatırlatıcılar ile doluluk oranını artırın." },
];

const PLANS = [
  {
    name: "Başlangıç",
    price: "Ücretsiz",
    desc: "Küçük salonlar için",
    features: ["5'e kadar hizmet", "Temel randevu takvimi", "E-posta bildirimleri", "Müşteri profilleri"],
    cta: "Hemen Başla",
    href: "/salon-ekle",
    featured: false,
  },
  {
    name: "Pro",
    price: "₺499",
    period: "/ ay",
    desc: "Büyüyen salonlar için",
    features: ["Sınırsız hizmet & personel", "SMS hatırlatıcılar", "Gelir analitiği", "Öncelikli listeleme", "7/24 destek"],
    cta: "14 Gün Ücretsiz Dene",
    href: "/salon-ekle?plan=pro",
    featured: true,
  },
  {
    name: "Kurumsal",
    price: "Özel",
    desc: "Zincir salonlar için",
    features: ["Çoklu şube yönetimi", "API erişimi", "Özel entegrasyonlar", "Dedike hesap yöneticisi"],
    cta: "İletişime Geç",
    href: "/iletisim",
    featured: false,
  },
];

export default function KurumsalPage() {
  return (
    <div style={{ background: "var(--cream)" }}>
      {/* Hero */}
      <section
        className="py-24 px-6 text-center border-b"
        style={{ background: "var(--white)", borderColor: "var(--border-ink)" }}
      >
        <p className="text-[10px] tracking-[6px] uppercase mb-4 animate-fade-in" style={{ color: "var(--gold)" }}>
          Salon Sahipleri İçin
        </p>
        <span className="rose-line mx-auto mb-6 block animate-fade-in delay-100" />
        <h1
          className="text-4xl md:text-5xl font-light mb-5 animate-fade-in-up delay-200"
          style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}
        >
          Salonunuzu dijitale<br />
          <em className="italic" style={{ color: "var(--gold)" }}>taşıyın</em>
        </h1>
        <p
          className="text-sm leading-relaxed max-w-lg mx-auto mb-10 animate-fade-in-up delay-300"
          style={{ color: "var(--muted)" }}
        >
          GlamBook ile randevularınızı otomatize edin, müşteri portföyünüzü büyütün ve gelirinizi artırın.
        </p>
        <div className="flex gap-3 justify-center animate-fade-in-up delay-400">
          <Link href="/salon-ekle" className="btn-gold rounded-xl">
            Hemen Başla <ArrowRight size={15} />
          </Link>
          <Link href="#ozellikler" className="btn-outline rounded-xl">
            Özellikleri Gör
          </Link>
        </div>

        {/* Mini sosyal kanıt */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 animate-fade-in-up delay-500">
          {[
            { val: "200+", label: "Kayıtlı Salon" },
            { val: "15K+", label: "Aylık Randevu" },
            { val: "4.9", label: "Salon Puanı" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-light" style={{ color: "var(--gold)", fontFamily: "var(--font-playfair)" }}>{s.val}</p>
              <p className="text-[11px] tracking-wide" style={{ color: "var(--muted)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Özellikler */}
      <section id="ozellikler" className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-[5px] uppercase mb-2" style={{ color: "var(--gold)" }}>Platform</p>
          <h2 className="text-3xl font-light" style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}>
            İhtiyacınız olan her şey
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="animate-fade-in-up rounded-2xl p-8 border"
              style={{ animationDelay: `${i * 100}ms`, background: "var(--white)", borderColor: "var(--border-ink)" }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: "var(--gold-pale)", color: "var(--gold)" }}
              >
                {f.icon}
              </div>
              <h3 className="text-base font-medium mb-2" style={{ color: "var(--ink)" }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider-rose" />

      {/* Fiyatlandırma */}
      <section className="py-16 px-6" style={{ background: "var(--white)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[5px] uppercase mb-2" style={{ color: "var(--gold)" }}>Fiyatlandırma</p>
            <h2 className="text-3xl font-light" style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}>
              Size uygun planı seçin
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {PLANS.map((plan, i) => (
              <div
                key={plan.name}
                className="animate-fade-in-up rounded-2xl border p-8 flex flex-col relative"
                style={{
                  animationDelay: `${i * 100}ms`,
                  background: plan.featured ? "var(--ink)" : "var(--cream)",
                  borderColor: plan.featured ? "var(--ink)" : "var(--border-ink)",
                  boxShadow: plan.featured ? "var(--shadow-lg)" : "var(--shadow-sm)",
                }}
              >
                {plan.featured && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] tracking-widest uppercase px-4 py-1.5 rounded-full"
                    style={{ background: "var(--gold)", color: "#fff" }}
                  >
                    En Popüler
                  </span>
                )}
                <div className="mb-6">
                  <p className="text-[11px] tracking-widest uppercase mb-1" style={{ color: plan.featured ? "rgba(201,168,76,0.7)" : "var(--muted)" }}>
                    {plan.name}
                  </p>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-3xl font-light" style={{ color: plan.featured ? "var(--gold)" : "var(--ink)", fontFamily: "var(--font-playfair)" }}>
                      {plan.price}
                    </span>
                    {plan.period && <span className="text-sm mb-1" style={{ color: plan.featured ? "rgba(245,243,238,0.4)" : "var(--muted)" }}>{plan.period}</span>}
                  </div>
                  <p className="text-xs" style={{ color: plan.featured ? "rgba(245,243,238,0.5)" : "var(--muted)" }}>{plan.desc}</p>
                </div>

                <ul className="flex flex-col gap-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs" style={{ color: plan.featured ? "rgba(245,243,238,0.75)" : "var(--ink)" }}>
                      <CheckCircle size={14} style={{ color: "var(--gold)", flexShrink: 0, marginTop: 1 }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={plan.featured ? "btn-gold w-full justify-center rounded-xl" : "btn-outline w-full justify-center rounded-xl"}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6" style={{ background: "var(--cream-2)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-light" style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}>
              Salon sahipleri ne diyor?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Deniz Y.", salon: "Atelier Bella", text: "GlamBook ile doluluk oranımız %40 arttı. Artık telefona bakmak zorunda kalmıyoruz.", rating: 5 },
              { name: "Elif K.", salon: "Lumière Estetik", text: "Müşteri yönetimi inanılmaz kolaylaştı. SMS hatırlatıcılar sayesinde no-show'lar azaldı.", rating: 5 },
              { name: "Aylin T.", salon: "Haus Nail Studio", text: "Kurulum çok kolaydı, destek ekibi her adımda yanımızdaydı. Kesinlikle tavsiye ederim.", rating: 5 },
            ].map((t, i) => (
              <div
                key={t.name}
                className="animate-fade-in-up rounded-2xl p-6 border"
                style={{ animationDelay: `${i * 120}ms`, background: "var(--white)", borderColor: "var(--border-ink)" }}
              >
                <div className="flex gap-0.5 mb-4">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={12} fill="var(--gold)" stroke="var(--gold)" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--ink)" }}>&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="text-xs font-medium" style={{ color: "var(--ink)" }}>{t.name}</p>
                  <p className="text-[11px]" style={{ color: "var(--gold)" }}>{t.salon}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
