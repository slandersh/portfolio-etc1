"use client";

/**
 * @file ScrollToHash.tsx
 * @description Komponen utilitas untuk melakukan smooth scroll ke anchor hash di URL.
 *
 * Komponen ini tidak merender elemen visual apapun (mengembalikan `null`),
 * namun bekerja di background untuk mendeteksi perubahan URL hash dan
 * melakukan scroll ke elemen yang sesuai.
 *
 * Kapan digunakan:
 * - Digunakan di halaman yang memiliki Table of Contents (ToC), seperti halaman /about
 * - Memungkinkan link seperti `/about#work-experience` untuk scroll dengan mulus
 *   ke section yang tepat saat halaman dimuat
 *
 * Cara kerja:
 * 1. Saat `router` berubah (navigasi baru), effect dijalankan
 * 2. Baca hash dari `window.location.hash` (contoh: `#work-experience`)
 * 3. Hapus karakter `#` untuk mendapatkan ID elemen
 * 4. Cari elemen dengan `document.getElementById(id)`
 * 5. Jika ditemukan, scroll ke elemen tersebut dengan animasi smooth
 *
 * Catatan: Tidak memerlukan props — bekerja secara otomatis saat di-mount.
 */
import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Komponen utilitas tanpa tampilan visual yang menangani scroll ke anchor hash.
 *
 * Harus diletakkan di dalam komponen halaman atau layout agar dapat mendeteksi
 * navigasi dan melakukan scroll sesuai hash di URL.
 *
 * @returns `null` — komponen ini tidak merender elemen apapun
 */
export function ScrollToHash() {
  const router = useRouter();

  useEffect(() => {
    // Ambil hash dari URL (contoh: "#work-experience" → "#work-experience")
    const hash = window.location.hash;
    if (hash) {
      // Hapus karakter '#' untuk mendapatkan ID elemen target
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []); // Dijalankan hanya sekali saat komponen di-mount (saat halaman pertama kali dimuat)

  return null; // Komponen ini tidak merender tampilan apapun
}
