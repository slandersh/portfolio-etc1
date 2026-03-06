/**
 * @file ThemeToggle.tsx
 * @description Komponen tombol untuk toggle antara mode terang (light) dan gelap (dark).
 *
 * Komponen ini menggunakan hook `useTheme` dari Once UI untuk mengubah tema secara global.
 * State `mounted` digunakan untuk mencegah hydration mismatch antara SSR dan klien,
 * sedangkan `currentTheme` dibaca langsung dari data-attribute `<html>` agar sinkron
 * dengan tema yang sudah diinisialisasi oleh script di `layout.tsx`.
 *
 * Cara kerja:
 * 1. Saat komponen pertama kali dimount, baca tema aktif dari `document.documentElement`
 * 2. Setiap kali `theme` dari `useTheme` berubah, sinkronkan `currentTheme`
 * 3. Ikon dan target tema berikutnya dihitung dari `currentTheme`
 * 4. Klik tombol → panggil `setTheme(nextTheme)` → hook mengupdate data-attribute dan localStorage
 *
 * Dikonfigurasi untuk ditampilkan di header via `display.themeSwitcher` di `once-ui.config.ts`.
 */
"use client";

import { useEffect, useState } from "react";
import { Row, ToggleButton, useTheme } from "@once-ui-system/core";

/**
 * Tombol toggle tema light/dark dengan deteksi tema aktif secara otomatis.
 *
 * Menampilkan ikon yang sesuai dengan tema berikutnya (bukan yang aktif),
 * sehingga pengguna bisa memperkirakan hasil klik sebelum mengkliknya.
 * - Tema aktif gelap → tampilkan ikon "light" (klik akan beralih ke terang)
 * - Tema aktif terang → tampilkan ikon "dark" (klik akan beralih ke gelap)
 *
 * Dikonfigurasi aktif/nonaktif melalui `display.themeSwitcher` di `once-ui.config.ts`.
 */
export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");

  // Efek pertama: tandai bahwa komponen sudah di-mount di sisi klien
  // dan baca tema aktif dari atribut HTML (yang diset oleh script di layout.tsx)
  useEffect(() => {
    setMounted(true);
    setCurrentTheme(document.documentElement.getAttribute("data-theme") || "light");
  }, []);

  // Efek kedua: sinkronkan currentTheme setiap kali `theme` dari useTheme() berubah
  useEffect(() => {
    setCurrentTheme(document.documentElement.getAttribute("data-theme") || "light");
  }); // Tanpa dependency array — berjalan setelah setiap render (sesuai perilaku asli)
  const icon = currentTheme === "dark" ? "light" : "dark";         // Ikon menunjukkan tema BERIKUTNYA
  const nextTheme = currentTheme === "light" ? "dark" : "light";  // Target tema saat diklik

  return (
    <ToggleButton
      prefixIcon={icon}
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} mode`}
    />
  );
};
