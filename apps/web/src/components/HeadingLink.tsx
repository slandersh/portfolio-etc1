"use client";

import type React from "react";
import type { JSX } from "react";
import { Heading, Flex, IconButton, useToast } from "@once-ui-system/core";
import type { SpacingProps } from "@once-ui-system/core";

import styles from "@/components/HeadingLink.module.scss";

/**
 * Props untuk komponen HeadingLink.
 */
interface HeadingLinkProps extends SpacingProps {
  /** ID unik elemen yang digunakan sebagai anchor URL (contoh: "work-experience") */
  id: string;
  /** Level heading HTML, 1-6 (h1 hingga h6) */
  level: 1 | 2 | 3 | 4 | 5 | 6;
  /** Konten teks heading */
  children: React.ReactNode;
  /** Style CSS tambahan (opsional) */
  style?: React.CSSProperties;
  /** Class CSS tambahan (opsional) */
  className?: string;
}

/**
 * Komponen heading yang dapat diklik untuk menyalin URL anchor ke clipboard.
 *
 * Digunakan di semua heading di dalam konten MDX (blog/proyek) agar pengguna
 * dapat membagikan link langsung ke bagian tertentu dari halaman.
 *
 * Cara kerja:
 * - Setiap heading MDX dipetakan ke komponen ini oleh `createHeading()` di `mdx.tsx`
 * - Klik heading → URL anchor di-generate (`origin + pathname + #id`) dan disalin
 * - Toast notifikasi sukses/gagal muncul di sudut layar
 * - Ikon link muncul saat hover (via CSS class `styles.visibility`)
 *
 * Pemetaan level ke varian tipografi:
 * - h1 → `display-strong-xs`
 * - h2 → `heading-strong-xl`
 * - h3 → `heading-strong-l`
 * - h4 → `heading-strong-m`
 * - h5 → `heading-strong-s`
 * - h6 → `heading-strong-xs`
 */
export const HeadingLink: React.FC<HeadingLinkProps> = ({
  id,
  level,
  children,
  style,
  className,
  ...props
}) => {
  const { addToast } = useToast();

  const copyURL = (id: string): void => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url).then(
      () => {
        addToast({
          variant: "success",
          message: "Link copied to clipboard.",
        });
      },
      () => {
        addToast({
          variant: "danger",
          message: "Failed to copy link.",
        });
      },
    );
  };

  const variantMap = {
    1: "display-strong-xs",
    2: "heading-strong-xl",
    3: "heading-strong-l",
    4: "heading-strong-m",
    5: "heading-strong-s",
    6: "heading-strong-xs",
  } as const;

  const variant = variantMap[level];
  const asTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Flex
      {...props}
      style={style}
      onClick={() => copyURL(id)}
      className={`${styles.control} ${className || ""}`}
      vertical="center"
      gap="4"
    >
      <Heading className={styles.text} id={id} variant={variant} as={asTag}>
        {children}
      </Heading>
      <IconButton
        className={styles.visibility}
        size="s"
        icon="openLink"
        variant="ghost"
        tooltip="Copy"
        tooltipPosition="right"
      />
    </Flex>
  );
};
