import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "GlamBook Studio — Premium Güzellik Randevusu",
  description: "İstanbul'un en seçkin güzellik salonlarında anında randevu alın.",
  openGraph: {
    title: "GlamBook Studio",
    description: "Premium güzellik randevu platformu",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${geist.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col" style={{ background: "var(--cream)", color: "var(--ink)" }}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
