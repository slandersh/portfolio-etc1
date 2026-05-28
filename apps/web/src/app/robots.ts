/**
 * @file robots.ts
 * @description Konfigurasi file robots.txt untuk mesin pencari.
 *
 * File ini diekspor sebagai fungsi Next.js App Router (`robots()`) yang
 * secara otomatis menghasilkan respons `robots.txt` pada route `/robots.txt`.
 *
 * Konfigurasi saat ini:
 * - Mengizinkan semua crawler (`userAgent: "*"`) untuk mengindeks semua halaman.
 * - Mengarahkan crawler ke sitemap XML agar dapat menemukan semua URL.
 *
 * Cara mengubah:
 * - Untuk melarang crawler pada halaman tertentu, tambahkan properti `disallow`:
 *   ```ts
 *   rules: [{ userAgent: "*", disallow: ["/admin", "/private"] }]
 *   ```
 * - Untuk hanya mengizinkan crawler tertentu (misalnya Googlebot):
 *   ```ts
 *   rules: [{ userAgent: "Googlebot" }, { userAgent: "*", disallow: "/" }]
 *   ```
 *
 * Referensi: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
import { baseURL } from "@/resources";

/**
 * Menghasilkan konfigurasi robots.txt untuk SEO.
 *
 * @returns Objek konfigurasi robots yang dirender sebagai `robots.txt` oleh Next.js
 */
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*", // Izinkan semua crawler mesin pencari
      },
    ],
    sitemap: `${baseURL}/sitemap.xml`, // URL sitemap untuk membantu indexing
  };
}
