import Link from "next/link";
import { Scissors, Sparkles, Heart, Flower2, Clock, ArrowRight } from "lucide-react";

const SERVICES = [
  {
    icon: <Scissors size={28} />,
    category: "Saç & Bakım",
    color: "var(--gold-pale)",
    iconColor: "var(--gold)",
    items: [
      { name: "Saç Kesimi", desc: "Yıkama + kesim + fön dahil", duration: "45–60 dk", from: "₺250" },
      { name: "Saç Boyama", desc: "Tek renk, kaplama", duration: "90–120 dk", from: "₺600" },
      { name: "Balayage / Ombre", desc: "Doğal geçişli renklendirme", duration: "150–180 dk", from: "₺1.200" },
      { name: "Keratin Bakımı", desc: "Protein + düzleştirici tedavi", duration: "120–150 dk", from: "₺900" },
      { name: "Saç Bakım Maskesi", desc: "Nemlendirici yoğun bakım", duration: "30–45 dk", from: "₺200" },
    ],
  },
  {
    icon: <Sparkles size={28} />,
    category: "Tırnak",
    color: "#FFF0F5",
    iconColor: "#C44569",
    items: [
      { name: "Klasik Manikür", desc: "Şekillendirme + oje", duration: "30–45 dk", from: "₺180" },
      { name: "Jel Manikür", desc: "Uzun süren jel kaplama", duration: "45–60 dk", from: "₺280" },
      { name: "Protez Tırnak", desc: "Akrilik veya jel protez", duration: "60–90 dk", from: "₺400" },
      { name: "Pedikür", desc: "Ayak bakımı + oje", duration: "45–60 dk", from: "₺250" },
      { name: "Nail Art", desc: "Özel tasarım tırnak sanatı", duration: "60–120 dk", from: "₺150" },
    ],
  },
  {
    icon: <Heart size={28} />,
    category: "Cilt Bakımı",
    color: "#F0F5FF",
    iconColor: "#4A6FA5",
    items: [
      { name: "Derin Temizlik", desc: "Blackhead + cilt arındırma", duration: "60–75 dk", from: "₺450" },
      { name: "Nemlendirme Tedavisi", desc: "Hyaluron + serum uygulaması", duration: "45–60 dk", from: "₺350" },
      { name: "Kimyasal Peeling", desc: "AHA/BHA asit peeling", duration: "45–60 dk", from: "₺500" },
      { name: "Lazer Epilasyon", desc: "Uzun vadeli tüy giderme", duration: "30–90 dk", from: "₺300" },
    ],
  },
  {
    icon: <Flower2 size={28} />,
    category: "Kaş & Kirpik",
    color: "#F5F0FF",
    iconColor: "#7F77DD",
    items: [
      { name: "Kaş Tasarımı", desc: "Yüz şekline göre tasarım", duration: "20–30 dk", from: "₺120" },
      { name: "Kaş Laminasyonu", desc: "Kalıcı şekillendirme", duration: "45–60 dk", from: "₺350" },
      { name: "Microblading", desc: "Yarı kalıcı kaş dövmesi", duration: "90–120 dk", from: "₺1.500" },
      { name: "İpek Kirpik", desc: "Tek tek veya hacim", duration: "90–120 dk", from: "₺500" },
      { name: "Kirpik Lifting", desc: "Kalıcı kirpik kıvırma", duration: "45–60 dk", from: "₺350" },
    ],
  },
];

export default function HizmetlerPage() {
  return (
    <div style={{ background: "var(--cream)" }}>
      {/* Hero */}
      <section
        className="py-20 px-6 text-center border-b"
        style={{ background: "var(--white)", borderColor: "var(--border-ink)" }}
      >
        <p className="text-[10px] tracking-[6px] uppercase mb-4 animate-fade-in" style={{ color: "var(--gold)" }}>
          Hizmet Kataloğu
        </p>
        <span className="rose-line mx-auto mb-6 block animate-fade-in delay-100" />
        <h1
          className="text-4xl md:text-5xl font-light mb-4 animate-fade-in-up delay-200"
          style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}
        >
          Sunduğumuz{" "}
          <em className="italic" style={{ color: "var(--gold)" }}>hizmetler</em>
        </h1>
        <p
          className="text-sm leading-relaxed max-w-md mx-auto animate-fade-in-up delay-300"
          style={{ color: "var(--muted)" }}
        >
          Güzellik rutininizin her adımı için en iyi salonlardaki uzmanları bir araya getirdik.
        </p>
      </section>

      {/* Hizmet kategorileri */}
      <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col gap-12">
        {SERVICES.map((group, gi) => (
          <div key={group.category} className="animate-fade-in-up" style={{ animationDelay: `${gi * 120}ms` }}>
            {/* Kategori başlık */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: group.color, color: group.iconColor }}
              >
                {group.icon}
              </div>
              <div>
                <h2 className="text-xl font-light" style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}>
                  {group.category}
                </h2>
                <p className="text-xs" style={{ color: "var(--muted)" }}>{group.items.length} hizmet</p>
              </div>
            </div>

            {/* Hizmet kartları */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.items.map((item) => (
                <div
                  key={item.name}
                  className="rounded-2xl border p-5 bg-white card-hover"
                  style={{ borderColor: "var(--border-ink)" }}
                >
                  <h3 className="text-sm font-medium mb-1" style={{ color: "var(--ink)" }}>{item.name}</h3>
                  <p className="text-xs mb-4 leading-relaxed" style={{ color: "var(--muted)" }}>{item.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5" style={{ color: "var(--muted)" }}>
                      <Clock size={12} />
                      <span className="text-[11px]">{item.duration}</span>
                    </div>
                    <div>
                      <span className="text-[10px] mr-1" style={{ color: "var(--muted-2)" }}>itibaren</span>
                      <span className="text-sm font-light" style={{ color: "var(--gold)", fontFamily: "var(--font-playfair)" }}>
                        {item.from}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <section
        className="py-16 px-6 text-center border-t"
        style={{ background: "var(--cream-2)", borderColor: "var(--border-ink)" }}
      >
        <h2 className="text-2xl font-light mb-4" style={{ color: "var(--ink)", fontFamily: "var(--font-playfair)" }}>
          Hemen randevu alın
        </h2>
        <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
          Size en yakın salonu bulup istediğiniz hizmeti dakikalar içinde rezerve edin.
        </p>
        <Link href="/salonlar" className="btn-gold rounded-xl mx-auto">
          Salonları Keşfet <ArrowRight size={15} />
        </Link>
      </section>
    </div>
  );
}
