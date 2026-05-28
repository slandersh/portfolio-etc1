import type { Community } from "@/types";

/**
 * Konfigurasi data Community & Support.
 * 
 * Objek ini mengelola informasi berita komunitas, link Discord,
 * daftar pendukung (supporters), dan platform donasi.
 */
const community: Community = {
  path: "/community",
  label: "Community & Support",
  title: "Community & Support",
  description: "Terbuka bagi siapa saja yang ingin bergabung dengan komunitas kami dan mendukung karya saya sebisa mungkin",
  headline: "Community & Support",
  subline: "Tempat berkumpulnya para kreator dan developer dari berbagai latar belakang. Mari kita tumbuh bersama, berbagi pengetahuan, dan saling memberikan dukungan untuk menciptakan karya-karya luar biasa yang membawa dampak positif bagi sesama.",
  discordLink: "https://discord.com/invite/649fHwz6v2",
  news: [
    {
      title: "Discord Server Resmi Diluncurkan!",
      date: "2026-03-05",
      summary: "Mari bergabung untuk diskusi teknis, berbagi proyek, dan kolaborasi langsung.",
      link: "https://discord.com/invite/649fHwz6v2"
    },
    {
      title: "Program Mentorship Komunitas",
      date: "2026-03-01",
      summary: "Kami membuka sesi tanya jawab mingguan untuk membantu pemula di dunia software engineering.",
    },
    {
      title: "Workshop: Building with Once UI",
      date: "2026-02-20",
      summary: "Pelajari cara membangun antarmuka premium menggunakan sistem desain Once UI.",
      link: "https://once-ui.com"
    },
    {
      title: "Donasi untuk Proyek Open Source",
      date: "2026-02-15",
      summary: "Seluruh hasil donasi bulan ini akan dialokasikan untuk pengembangan library UI kustom.",
    }
  ],
  supporters: [
    {
      name: "Alice",
      amount: "$10",
      message: "Teruslah berkarya!",
      date: "2026-03-01"
    },
    {
      name: "Bob",
      amount: "$5",
      date: "2026-02-28"
    },
    {
      name: "Charlie",
      amount: "$25",
      message: "Terima kasih atas SaaS kit-nya, luar biasa!",
      date: "2026-02-25"
    },
    {
      name: "David",
      amount: "$50",
      message: "Konten streaming Anda sangat menginspirasi.",
      date: "2026-02-20"
    },
    {
      name: "Eve",
      amount: "$15",
      date: "2026-02-18"
    }
  ],
  donationPlatforms: [
    { name: "Saweria", link: "https://saweria.co/mintgyaa", color: "#faae2b" },
    { name: "Trakteer", link: "https://trakteer.id/mintgyaa", color: "#be1e2d" },
    { name: "Buy Me a Coffee", link: "https://buymeacoffee.com/mintgyaa", color: "#FFDD00" },
    { name: "Ko-fi", link: "https://ko-fi.com/mintgyaa", color: "#29ABE2" }
  ],
};

export { community };
