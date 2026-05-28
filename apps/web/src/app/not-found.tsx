/**
 * @file not-found.tsx
 * @description Halaman 404 — ditampilkan saat pengguna mengakses URL yang tidak ada.
 *
 * Next.js App Router secara otomatis merender file ini ketika:
 * - URL yang diakses tidak cocok dengan rute mana pun
 * - Fungsi `notFound()` dari `next/navigation` dipanggil secara eksplisit
 *   (misalnya saat file MDX tidak ditemukan di `utils.ts`)
 *
 * Cara mengkustomisasi:
 * - Ganti teks di bawah dengan pesan yang lebih sesuai dengan brand Anda
 * - Tambahkan tombol "Kembali ke Beranda" jika diperlukan:
 *   ```tsx
 *   import { Button } from "@once-ui-system/core";
 *   <Button href="/">Kembali ke Beranda</Button>
 *   ```
 *
 * Referensi: https://nextjs.org/docs/app/api-reference/file-conventions/not-found
 */
import { Column, Heading, Text } from "@once-ui-system/core";

/**
 * Komponen halaman 404 (Not Found).
 *
 * Menampilkan pesan error yang jelas saat pengguna mengakses halaman yang tidak tersedia.
 * Dirender secara otomatis oleh Next.js App Router.
 */
export default function NotFound() {
  return (
    <Column as="section" fill center paddingBottom="160">
      <Text marginBottom="s" variant="display-strong-xl">
        404
      </Text>
      <Heading marginBottom="l" variant="display-default-xs">
        Page Not Found
      </Heading>
      <Text onBackground="neutral-weak">The page you are looking for does not exist.</Text>
    </Column>
  );
}
