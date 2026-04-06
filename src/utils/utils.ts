import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import { notFound } from "next/navigation";
import type { Metadata } from "@/types";

/**
 * Mendapatkan daftar semua file MDX dalam direktori yang diberikan.
 *
 * Jika direktori tidak ditemukan, fungsi ini akan memicu halaman 404 (notFound).
 *
 * @param {string} dir - Path absolut ke direktori yang akan dibaca
 * @returns {string[]} Daftar nama file MDX (hanya nama file, bukan path penuh)
 */
function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

/**
 * Membaca satu file MDX dan mengekstrak metadata (dari frontmatter) serta kontennya.
 *
 * Menggunakan library `gray-matter` untuk memisahkan blok YAML frontmatter
 * dari konten MDX utama.
 *
 * Jika file tidak ditemukan, fungsi ini akan memicu halaman 404 (notFound).
 *
 * @param {string} filePath - Path absolut ke file MDX yang akan dibaca
 * @returns {{ metadata: Metadata, content: string }} Objek berisi metadata dan konten MDX
 */
function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: Metadata = {
    title: data.title || "",
    subtitle: data.subtitle || "",
    publishedAt: data.publishedAt,
    summary: data.summary || "",
    image: data.image || "",
    images: data.images || [],
    tag: data.tag || "",
    team: data.team || [],
    link: data.link || "",
    price: data.price || "",
    category: data.category || "",
    badge: data.badge || "",
    date: data.date || "",
  };

  return { metadata, content };
}

/**
 * Membaca semua file MDX dalam sebuah direktori dan mengembalikan data lengkapnya.
 *
 * Setiap file akan diparsing, dan slug-nya (nama file tanpa ekstensi) akan
 * diekstrak secara otomatis untuk digunakan sebagai URL segment.
 *
 * @param {string} dir - Path absolut ke direktori yang berisi file-file MDX
 * @returns Array objek dengan properti: `metadata`, `slug`, dan `content`
 */
function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

/**
 * Fungsi utama untuk mengambil semua postingan (blog/work) dari direktori tertentu.
 *
 * Cara penggunaan:
 * ```typescript
 * // Mengambil semua postingan blog
 * const blogPosts = getPosts(["src", "app", "blog", "posts"]);
 *
 * // Mengambil semua proyek
 * const projects  = getPosts(["src", "app", "work", "projects"]);
 * ```
 *
 * @param {string[]} customPath - Array segmen path yang akan digabung dengan `process.cwd()`
 *   untuk menentukan direktori sumber MDX
 * @returns Array postingan MDX yang sudah diparsing, masing-masing berisi `metadata`, `slug`, dan `content`
 */
export function getPosts(customPath = ["", "", "", ""]) {
  const postsDir = path.join(process.cwd(), ...customPath);
  return getMDXData(postsDir);
}
