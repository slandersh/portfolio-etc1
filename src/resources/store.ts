import type { Store } from "@/types";

/**
 * Konfigurasi data Store (Toko).
 * 
 * Objek ini mengelola semua informasi produk, kategori, pendukung (supporters),
 * dan platform donasi yang ditampilkan di halaman /store.
 * 
 * Untuk menambah produk:
 * 1. Tambahkan objek baru ke array `products`
 * 2. Pastikan kategori sesuai dengan daftar di `categories`
 * 3. Gunakan image dari /public/images/projects/...
 * 
 * Untuk menambah platform donasi:
 * 1. Tambahkan entry baru ke `donationPlatforms`
 * 2. Tentukan warna brand platform tersebut
 */
const store: Store = {
  path: "/store",
  label: "Store",
  title: "Store",
  description: "Temukan berbagai macam produk digital pilihan, layanan konsultasi profesional, serta rekomendasi tautan afiliasi yang telah saya kurasi secara khusus. Setiap item dirancang untuk membantu mempercepat alur kerja dan meningkatkan kualitas proyek Anda.",
  categories: ["All", "Affiliate", "Digital Products", "Services", "SaaS", "Request"],
  products: [], // Data produk sekarang dikelola melalui file MDX di src/app/store/products/
  streamLink: "/stream",
  requestLink: "#request",
  whatsappNumber: "6281234567890"
};

export { store };
