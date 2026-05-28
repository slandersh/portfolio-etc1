import { getPosts } from "@/utils/utils";
import { Grid } from "@once-ui-system/core";
import Post from "./Post";

/**
 * Props untuk komponen Posts.
 */
interface PostsProps {
  /**
   * Rentang indeks postingan yang akan ditampilkan (1-based).
   * - `[n]`    → tampilkan dari indeks n hingga akhir
   * - `[n, m]` → tampilkan dari indeks n hingga m (inklusif)
   * Contoh: `range={[1, 2]}` menampilkan postingan pertama dan kedua.
   */
  range?: [number] | [number, number];
  /** Jumlah kolom grid (default: "1") */
  columns?: "1" | "2" | "3";
  /** Jika true, tampilkan gambar thumbnail di setiap kartu postingan */
  thumbnail?: boolean;
  /** Arah layout kartu: "row" (horizontal) atau "column" (vertikal) */
  direction?: "row" | "column";
  /** Daftar slug postingan yang akan dikecualikan dari tampilan */
  exclude?: string[];
}

/**
 * Komponen daftar postingan blog dengan filter dan fitur range.
 *
 * Membaca semua file MDX dari `src/app/blog/posts/`, mengurutkannya dari
 * yang terbaru ke yang terlama berdasarkan `publishedAt`, lalu menampilkannya
 * dalam grid yang dikonfigurasi.
 *
 * Digunakan di:
 * - `/blog` — menampilkan semua postingan
 * - Halaman beranda — menampilkan preview 2 postingan terbaru (`range={[1, 2]}`)
 * - Halaman detail proyek (untuk postingan terkait, dikecualikan via `exclude`)
 *
 * @param {PostsProps} props - Props komponen
 */
export function Posts({
  range,
  columns = "1",
  thumbnail = false,
  exclude = [],
  direction,
}: PostsProps) {
  let allBlogs = getPosts(["src", "app", "blog", "posts"]);

  // Kecualikan postingan berdasarkan slug (pencocokan tepat)
  if (exclude.length) {
    allBlogs = allBlogs.filter((post) => !exclude.includes(post.slug));
  }

  const sortedBlogs = allBlogs.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedBlogs = range
    ? sortedBlogs.slice(range[0] - 1, range.length === 2 ? range[1] : sortedBlogs.length)
    : sortedBlogs;

  return (
    <>
      {displayedBlogs.length > 0 && (
        <Grid columns={columns} s={{ columns: 1 }} fillWidth marginBottom="40" gap="16">
          {displayedBlogs.map((post) => (
            <Post key={post.slug} post={post} thumbnail={thumbnail} direction={direction} />
          ))}
        </Grid>
      )}
    </>
  );
}
