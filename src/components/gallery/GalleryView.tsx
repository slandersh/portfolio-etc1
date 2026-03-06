/**
 * @file GalleryView.tsx
 * @description Komponen tampilan galeri foto dalam tata letak masonry (batu bata).
 *
 * Membaca daftar gambar dari `gallery.images` di `src/resources/content.tsx`
 * dan menampilkannya dalam grid dua kolom (satu kolom di layar kecil).
 *
 * Setiap gambar:
 * - Dapat diperbesar saat diklik (`enlarge` prop)
 * - Diberi prioritas loading untuk 10 gambar pertama (di atas fold)
 * - Aspect ratio ditentukan berdasarkan `image.orientation`:
 *   - "horizontal" → 16 / 9
 *   - lainnya (vertikal) → 3 / 4
 *
 * Cara menambah gambar:
 * - Tambahkan gambar ke `public/images/gallery/`
 * - Tambahkan entry ke array `gallery.images` di `src/resources/content.tsx`
 *   dengan `src`, `alt`, dan `orientation` ("horizontal" atau "vertical")
 */
"use client";

import { Media, MasonryGrid } from "@once-ui-system/core";
import { gallery } from "@/resources";

/**
 * Komponen galeri foto yang menggunakan tata letak masonry grid.
 *
 * Digunakan di halaman `/gallery`. Data gambar bersumber dari konfigurasi
 * `gallery` di `src/resources/content.tsx`.
 */
export default function GalleryView() {
  return (
    <MasonryGrid columns={2} s={{ columns: 1 }}>
      {gallery.images.map((image, index) => (
        <Media
          enlarge
          priority={index < 10}
          sizes="(max-width: 560px) 100vw, 50vw"
          key={image.src} // Gunakan src sebagai key karena lebih stabil daripada index
          radius="m"
          aspectRatio={image.orientation === "horizontal" ? "16 / 9" : "3 / 4"}
          src={image.src}
          alt={image.alt}
        />
      ))}
    </MasonryGrid>
  );
}
