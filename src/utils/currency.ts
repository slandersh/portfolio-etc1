export type Currency = "USD" | "IDR";

interface CurrencyInfo {
  code: Currency;
  symbol: string;
  locale: string;
}

const CURRENCIES: Record<Currency, CurrencyInfo> = {
  USD: { code: "USD", symbol: "$", locale: "en-US" },
  IDR: { code: "IDR", symbol: "Rp", locale: "id-ID" },
};

// Kurs tukar tetap yang digunakan untuk konversi mata uang
// Pada aplikasi produksi, nilai ini sebaiknya diambil dari API kurs real-time
const EXCHANGE_RATE = 15800; 

/**
 * Mendeteksi mata uang pengguna berdasarkan locale browser dan zona waktu.
 *
 * Logika deteksi:
 * - Jika locale dimulai dengan "id" (Bahasa Indonesia) ATAU zona waktu adalah "Asia/Jakarta",
 *   maka mata uang yang dikembalikan adalah IDR (Rupiah Indonesia).
 * - Selain itu, mata uang default adalah USD.
 *
 * Catatan: Fungsi ini hanya berjalan di sisi klien (browser).
 * Saat dieksekusi di server (SSR), akan selalu mengembalikan "USD".
 *
 * @returns {Currency} Kode mata uang yang terdeteksi ("USD" atau "IDR")
 */
export const detectCurrency = (): Currency => {
  if (typeof window === "undefined") return "USD";

  const locale = navigator.language || "en-US";
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (locale.startsWith("id") || timeZone === "Asia/Jakarta") {
    return "IDR";
  }

  return "USD";
};

/**
 * Memformat nilai numerik menjadi string mata uang yang terlokalkan.
 *
 * Perilaku format:
 * - Jika `isStandardized` true DAN mata uang adalah IDR, nilai akan dikalikan dengan EXCHANGE_RATE
 *   (diasumsikan nilai masuk dalam satuan USD).
 * - Untuk IDR dengan nilai >= 1.000.000, digunakan singkatan "jt" (contoh: "Rp 5jt").
 * - Untuk IDR di bawah 1 juta, menggunakan format standar Intl (contoh: "Rp 50.000").
 * - Untuk USD, menggunakan format standar Intl (contoh: "$29.00").
 *
 * @param {number} amount - Nilai numerik yang akan diformat
 * @param {Currency} currency - Kode mata uang tujuan ("USD" atau "IDR")
 * @param {boolean} [isStandardized=true] - Jika true, nilai dianggap dalam USD dan akan dikonversi ke IDR jika perlu
 * @returns {string} String mata uang yang sudah diformat
 */
export const formatCurrency = (amount: number, currency: Currency, isStandardized = true): string => {
  const value = isStandardized && currency === "IDR" ? amount * EXCHANGE_RATE : amount;

  if (currency === "IDR") {
    if (value >= 1000000) {
      return `Rp ${(value / 1000000).toFixed(1).replace(/\.0$/, "")}jt`;
    }
    
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const getExchangeRate = () => EXCHANGE_RATE;

/**
 * Memformat string angka mentah menjadi string nominal terlokalkan dengan pemisah ribuan.
 *
 * Fungsi ini digunakan pada input harga agar tampilan angka mengikuti konvensi lokal:
 * - IDR: menggunakan titik sebagai pemisah ribuan (contoh: "50.000")
 * - USD: menggunakan koma sebagai pemisah ribuan (contoh: "1,000")
 *
 * Karakter non-angka akan dihapus otomatis sebelum diformat.
 *
 * @param {string} value - String angka mentah dari input pengguna
 * @param {Currency} currency - Mata uang yang aktif saat ini untuk menentukan format
 * @returns {string} String angka yang sudah diformat dengan pemisah ribuan yang sesuai
 */
export const formatPriceInput = (value: string, currency: Currency): string => {
  const numericValue = value.replace(/[^0-9]/g, "");
  if (!numericValue) return "";

  const number = Number.parseInt(numericValue, 10);
  
  if (currency === "IDR") {
    // Format IDR: gunakan titik sebagai pemisah ribuan (standar lokal Indonesia)
    return number.toLocaleString("id-ID").replace(/,/g, ".");
  }

  // Format USD: gunakan koma sebagai pemisah ribuan (standar lokal Amerika)
  return number.toLocaleString("en-US");
};

/**
 * Mengembalikan contoh placeholder anggaran yang disesuaikan dengan mata uang aktif.
 *
 * Digunakan pada input "Estimated Budget" di halaman Store untuk memberi petunjuk
 * format penulisan yang benar kepada pengguna.
 *
 * @param {Currency} currency - Mata uang yang sedang aktif
 * @returns {string} Teks placeholder, contoh: "e.g., 5.000.000" untuk IDR atau "e.g., 500" untuk USD
 */
export const getBudgetPlaceholder = (currency: Currency): string => {
  return currency === "IDR" ? "e.g., 5.000.000" : "e.g., 500";
};
