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
  description: "Jelajahi produk, layanan, dan tautan afiliasi saya",
  categories: ["All", "Affiliate", "Digital Products", "Services", "SaaS", "Donation", "Request"],
  products: [], // Data produk sekarang dikelola melalui file MDX di src/app/store/products/
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
    }
  ],
  donationPlatforms: [
    { name: "Saweria", link: "https://saweria.co/mintgyaa", color: "#faae2b" },
    { name: "Trakteer", link: "https://trakteer.id/mintgyaa", color: "#be1e2d" },
    { name: "Buy Me a Coffee", link: "https://buymeacoffee.com/mintgyaa", color: "#FFDD00" },
    { name: "Ko-fi", link: "https://ko-fi.com/mintgyaa", color: "#29ABE2" }
  ],
  streamLink: "/stream",
  requestLink: "#request",
  whatsappNumber: "6281234567890"
};

export { store };
