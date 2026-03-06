import type { Stream } from "@/types";

/**
 * Konfigurasi data Stream (Siaran Langsung).
 * 
 * Objek ini mengelola URL siaran langsung, platform streaming yang tersedia,
 * dan berita/pengumuman terkait aktivitas streaming di halaman /stream.
 * 
 * Untuk memperbarui status stream:
 * 1. Ubah `status` di array `platforms` (Live | Offline | Scheduled)
 * 2. Masukkan URL embed di `featuredStream` jika sedang Live
 * 
 * Untuk menambah berita baru:
 * 1. Tambahkan objek ke array `news` dengan title, date, dan summary
 */
const stream: Stream = {
  path: "/stream",
  label: "Stream",
  title: "Siaran Langsung & Pembaruan",
  description: "Bergabunglah dalam sesi langsung saya dan tetap perbarui berita stream terbaru",
  platforms: [
    { name: "Twitch", link: "https://twitch.tv/mintgyaa", status: "Live" },
    { name: "YouTube", link: "https://youtube.com/@mintgyaa", status: "Offline" },
    { name: "Kick", link: "https://kick.com/mintgyaa", status: "Scheduled" }
  ],
  news: [], // Berita stream sekarang dikelola melalui file MDX di src/app/stream/posts/
};

export { stream };
