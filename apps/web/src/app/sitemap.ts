/**
 * @file sitemap.ts
 * @description Generator sitemap XML otomatis untuk mesin pencari.
 *
 * File ini diekspor sebagai fungsi async Next.js App Router (`sitemap()`) yang
 * secara otomatis menghasilkan respons sitemap XML pada route `/sitemap.xml`.
 *
 * Sitemap yang dihasilkan mencakup tiga jenis URL:
 * 1. **Rute statis aktif** — Semua halaman yang diaktifkan di `routes` config
 *    (contoh: /, /about, /blog, /work, /gallery, /store, /stream)
 * 2. **Postingan blog** — Semua file MDX di `src/app/blog/posts/`
 * 3. **Halaman proyek** — Semua file MDX di `src/app/work/projects/`
 *
 * Cara menambah URL ke sitemap:
 * - Untuk rute baru: tambahkan rute di `once-ui.config.ts` → `routes`
 * - Untuk halaman dinamis lain: buat array URL baru dan sertakan di return statement
 *
 * Referensi: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
import { getPosts } from "@/utils/utils";
import { baseURL, routes as routesConfig } from "@/resources";

/**
 * Menghasilkan daftar URL untuk sitemap XML secara otomatis.
 *
 * URL terakhir dimodifikasi (`lastModified`) untuk postingan blog dan proyek
 * diambil dari frontmatter `publishedAt` file MDX masing-masing.
 *
 * @returns Array objek sitemap berisi `url` dan `lastModified`
 */
export default async function sitemap() {
  // Ambil semua postingan blog dan buat URL-nya
  const blogs = getPosts(["src", "app", "blog", "posts"]).map((post) => ({
    url: `${baseURL}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  // Ambil semua proyek dan buat URL-nya
  const works = getPosts(["src", "app", "work", "projects"]).map((post) => ({
    url: `${baseURL}/work/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  // Filter hanya rute yang aktif (bernilai true) dari konfigurasi
  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route as keyof typeof routesConfig],
  );

  // Buat URL untuk setiap rute statis aktif
  const routes = activeRoutes.map((route) => ({
    url: `${baseURL}${route !== "/" ? route : ""}`,
    lastModified: new Date().toISOString().split("T")[0], // Tanggal hari ini dalam format YYYY-MM-DD
  }));

  return [...routes, ...blogs, ...works];
}
