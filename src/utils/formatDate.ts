/**
 * Memformat tanggal ISO string menjadi teks tanggal yang mudah dibaca.
 *
 * Fungsi ini menerima string tanggal (dalam format ISO 8601 atau "YYYY-MM-DD") dan
 * mengembalikan format tanggal panjang dalam Bahasa Inggris (contoh: "March 4, 2026").
 *
 * Jika `includeRelative` diaktifkan, fungsi juga akan menambahkan keterangan waktu relatif
 * dari saat ini (contoh: "March 4, 2026 (2d ago)").
 *
 * Keterangan waktu relatif:
 * - Lebih dari 1 tahun yang lalu → "{n}y ago" (contoh: "2y ago")
 * - Lebih dari 1 bulan yang lalu → "{n}mo ago" (contoh: "3mo ago")
 * - Lebih dari 1 hari yang lalu  → "{n}d ago" (contoh: "5d ago")
 * - Hari ini                      → "Today"
 *
 * Catatan: Perbandingan waktu bersifat sederhana (berdasarkan selisih angka kalender,
 * bukan selisih milidetik). Ini sudah cukup untuk kebutuhan tampilan di blog/portofolio.
 *
 * @param {string} date - String tanggal dalam format ISO 8601 (contoh: "2026-03-04" atau "2026-03-04T00:00:00")
 * @param {boolean} [includeRelative=false] - Jika true, tambahkan keterangan waktu relatif
 * @returns {string} Tanggal yang sudah diformat (contoh: "March 4, 2026" atau "March 4, 2026 (2d ago)")
 */
export function formatDate(date: string, includeRelative = false) {
  const currentDate = new Date();

  // Pastikan string tanggal memiliki komponen waktu agar parsing konsisten di semua browser
  const normalizedDate = !date.includes("T") ? `${date}T00:00:00` : date;

  const targetDate = new Date(normalizedDate);
  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  // Tentukan label waktu relatif berdasarkan selisih terbesar
  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  // Format tanggal panjang dalam Bahasa Inggris (contoh: "March 4, 2026")
  const fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Kembalikan hanya tanggal panjang jika waktu relatif tidak diminta
  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
