"use client";

import type { FC } from "react";
import { Column, Flex, Text } from "@once-ui-system/core";
import styles from "./about.module.scss";

/**
 * Tipe data untuk satu section di dalam Table of Contents.
 */
type TocSection = {
  /** Judul section, juga digunakan sebagai ID untuk scrolling */
  title: string;
  /** Jika false, section ini tidak ditampilkan di ToC */
  display: boolean;
  /** Daftar sub-item (heading level 2 ke bawah) */
  items: string[];
};

/**
 * Props untuk komponen TableOfContents.
 */
interface TableOfContentsProps {
  /**
   * Struktur navigasi yang dihasilkan dari halaman about.
   * Setiap item mewakili satu section dengan judul dan sub-item opsional.
   */
  structure: TocSection[];
  /**
   * Konfigurasi ToC dari `about` di `content.tsx`:
   * - `display`  — Apakah ToC ditampilkan (jika false, komponen render null)
   * - `subItems` — Apakah sub-item ditampilkan di bawah setiap section
   */
  about: {
    tableOfContent: {
      display: boolean;
      subItems: boolean;
    };
  };
}

/**
 * Komponen navigasi Table of Contents untuk halaman About.
 *
 * Ditampilkan sebagai panel sticky di sisi kiri halaman (disembunyikan di layar kecil).
 * Mengizinkan pengguna melompat ke section tertentu dengan smooth scroll.
 *
 * Cara kerja:
 * - Setiap section dan sub-item dapat diklik
 * - Klik memanggil `scrollTo()` yang menggunakan `window.scrollTo` dengan offset 80px
 *   (untuk menghindari section tertutup di bawah header yang fixed)
 * - Sub-item hanya ditampilkan jika `about.tableOfContent.subItems` bernilai true
 * - Disembunyikan di breakpoint medium (`m={{ hide: true }}`)
 *
 * Cara mengkonfigurasi:
 * - Edit `about.tableOfContent.display` dan `about.tableOfContent.subItems`
 *   di `src/resources/content.tsx` untuk mengaktifkan/menonaktifkan ToC dan sub-item
 */
const TableOfContents: FC<TableOfContentsProps> = ({ structure, about }) => {
  const scrollTo = (id: string, offset: number) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (!about.tableOfContent.display) return null;

  return (
    <Column
      left="0"
      style={{
        top: "50%",
        transform: "translateY(-50%)",
        whiteSpace: "nowrap",
      }}
      position="fixed"
      paddingLeft="24"
      gap="32"
      m={{ hide: true }}
    >
      {structure
        .filter((section) => section.display)
        .map((section) => (
          <Column key={section.title} gap="12">
            <Flex
              cursor="interactive"
              className={styles.hover}
              gap="8"
              vertical="center"
              onClick={() => scrollTo(section.title, 80)}
            >
              <Flex height="1" minWidth="16" background="neutral-strong" />
              <Text>{section.title}</Text>
            </Flex>
            {about.tableOfContent.subItems &&
              section.items.map((item) => (
                <Flex
                  l={{ hide: true }}
                  key={item}
                  style={{ cursor: "pointer" }}
                  className={styles.hover}
                  gap="12"
                  paddingLeft="24"
                  vertical="center"
                  onClick={() => scrollTo(item, 80)}
                >
                  <Flex height="1" minWidth="8" background="neutral-strong" />
                  <Text>{item}</Text>
                </Flex>
              ))}
          </Column>
        ))}
    </Column>
  );
};

export default TableOfContents;
