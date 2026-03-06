# Magic Portfolio — Dokumentasi Proyek

Magic Portfolio adalah template portofolio yang sederhana, bersih, dan ramah untuk pemula. Template ini mendukung sistem konten berbasis MDX untuk proyek dan postingan blog, halaman tentang saya / CV, serta galeri foto.

Lihat demo [di sini](https://demo.magic-portfolio.com).

![Magic Portfolio](public/images/og/home.jpg)

---

## Memulai

**1. Clone repository**
```
git clone https://github.com/once-ui-system/magic-portfolio.git
```

**2. Install dependensi**
```
npm install
```

**3. Jalankan server pengembangan**
```
npm run dev
```

**4. Edit konfigurasi tampilan & tema**
```
src/resources/once-ui.config.ts
```

**5. Edit konten (profil, proyek, dll.)**
```
src/resources/content.tsx
```

**6. Tambah postingan blog / proyek baru**
```
Buat file .mdx baru di src/app/blog/posts atau src/app/work/projects
```

Magic Portfolio dibangun dengan [Once UI](https://once-ui.com) untuk [Next.js](https://nextjs.org). Memerlukan Node.js v18.17+.

---

## Dokumentasi

Dokumentasi lengkap tersedia di: [docs.once-ui.com](https://docs.once-ui.com/docs/magic-portfolio/quick-start)

---

## Fitur

### Once UI
- Semua token, komponen & fitur dari [Once UI](https://once-ui.com)

### SEO
- Pembuatan gambar open-graph dan X secara otomatis via `next/og`
- Pembuatan schema dan metadata otomatis berdasarkan file konten

### Desain
- Tata letak responsif yang dioptimalkan untuk semua ukuran layar
- Desain timeless tanpa animasi berlebihan
- Opsi kustomisasi tak terbatas melalui [data attributes](https://once-ui.com/docs/theming)

### Konten
- Render bagian secara kondisional berdasarkan file konten
- Aktifkan atau nonaktifkan halaman blog, work, gallery, dan about / CV
- Buat dan tampilkan tautan sosial secara otomatis
- Konfigurasi proteksi password untuk URL tertentu

### Lokalisasi
- Versi Magic Portfolio yang sudah dilokalisasi tersedia dengan library `next-intl`
- Untuk menggunakan lokalisasi, pindah ke branch `i18n`

---

## Panduan Maintenance & Pengembangan

### Struktur Direktori Utama

```
magic-portfolio/
├── src/
│   ├── app/              # Halaman-halaman Next.js (App Router)
│   │   ├── about/        # Halaman About / CV
│   │   ├── blog/         # Halaman Blog + folder posts/ (file .mdx)
│   │   ├── gallery/      # Halaman Galeri Foto
│   │   ├── store/        # Halaman Store (produk, donasi, request)
│   │   ├── stream/       # Halaman Stream (live streaming)
│   │   ├── work/         # Halaman Work + folder projects/ (file .mdx)
│   │   └── api/          # API Routes (autentikasi, OG image, RSS)
│   ├── components/       # Komponen React yang dapat digunakan ulang
│   │   ├── store/        # Komponen khusus halaman Store
│   │   └── ...
│   ├── resources/        # Konfigurasi dan konten utama
│   │   ├── content.tsx       # ← EDIT INI untuk mengubah profil & konten
│   │   └── once-ui.config.ts # ← EDIT INI untuk mengubah tema & konfigurasi
│   ├── types/            # Definisi tipe TypeScript
│   └── utils/            # Fungsi utilitas (format tanggal, mata uang, dll.)
└── public/               # Aset statis (gambar, file PDF, dll.)
```

### Cara Menambah Konten Baru

**Menambah Postingan Blog:**
1. Buat file baru di `src/app/blog/posts/nama-postingan.mdx`
2. Isi frontmatter YAML di bagian atas file:
   ```yaml
   ---
   title: "Judul Postingan"
   publishedAt: "2026-03-04"
   summary: "Ringkasan singkat untuk SEO"
   ---
   ```
3. Tulis konten MDX di bawah frontmatter

**Menambah Proyek:**
1. Buat file baru di `src/app/work/projects/nama-proyek.mdx`
2. Isi frontmatter dengan informasi proyek (title, publishedAt, summary, images, team)

**Mengubah Profil:**
- Edit objek `person` di `src/resources/content.tsx`

**Mengubah Produk Store:**
- Edit array `products` dalam objek `store` di `src/resources/content.tsx`

### Mengubah Mata Uang
- Kurs tukar diatur di `src/utils/currency.ts` pada konstanta `EXCHANGE_RATE`
- Deteksi otomatis mata uang berdasarkan zona waktu diatur di fungsi `detectCurrency`

---

## Pembuat

Lorant One: [Threads](https://www.threads.net/@lorant.one) / [LinkedIn](https://www.linkedin.com/in/lorant-one/)

---

## Bergabung dengan Komunitas

- Bergabunglah dengan Design Engineers Club di [Discord](https://discord.com/invite/5EyAQ4eNdS) dan bagikan proyekmu!
- Sudah deploy? Bagikan juga di [Once UI Hub](https://once-ui.com/hub)! Kami menampilkan aplikasi favorit kami di halaman utama.

---

## Lisensi

Didistribusikan di bawah Lisensi CC BY-NC 4.0.
- Atribusi wajib diberikan.
- Penggunaan komersial tidak diizinkan.
- Lisensi dapat diperluas ke [Dopler CC](https://dopler.app/license) dengan membeli lisensi [Once UI Pro](https://once-ui.com/pricing).

Lihat `LICENSE.txt` untuk informasi lebih lanjut.

---

## Deploy dengan Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fonce-ui-system%2Fmagic-portfolio&project-name=portfolio&repository-name=portfolio&redirect-url=https%3A%2F%2Fgithub.com%2Fonce-ui-system%2Fmagic-portfolio&demo-title=Magic%20Portfolio&demo-description=Showcase%20your%20designers%20or%20developer%20portfolio&demo-url=https%3A%2F%2Fdemo.magic-portfolio.com&demo-image=%2F%2Fraw.githubusercontent.com%2Fonce-ui-system%2Fmagic-portfolio%2Fmain%2Fpublic%2Fimages%2Fog%2Fhome.jpg)