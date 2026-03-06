"use client";

import { Card, Column, Media, Row, Avatar, Text } from "@once-ui-system/core";
import { formatDate } from "@/utils/formatDate";
import { person } from "@/resources";

/**
 * Props untuk komponen Post.
 */
interface PostProps {
  /** Objek postingan blog yang berisi metadata dan slug (dari file MDX) */
  // biome-ignore lint/suspicious/noExplicitAny: <Struktur metadata MDX bersifat dinamis dan fleksibel tergantung frontmatter>
  post: any;
  /** Jika true, tampilkan gambar thumbnail dari metadata postingan */
  thumbnail: boolean;
  /** Arah layout kartu: "row" (horizontal) atau "column" (vertikal) */
  direction?: "row" | "column";
}

/**
 * Komponen kartu postingan blog tunggal.
 *
 * Menampilkan informasi postingan dalam format kartu yang dapat diklik.
 * Digunakan oleh `Posts.tsx` di halaman /blog dan juga di halaman beranda (preview blog).
 *
 * Konten yang ditampilkan:
 * - Thumbnail gambar (opsional, dikontrol oleh prop `thumbnail`)
 * - Nama dan avatar penulis (dari `person` di `content.tsx`)
 * - Tanggal publikasi (diformat oleh `formatDate`)
 * - Judul postingan
 * - Tag postingan (opsional, dari frontmatter `tag`)
 *
 * @param {PostProps} props - Props komponen
 */
export default function Post({ post, thumbnail, direction }: PostProps) {
  return (
    <Card
      fillWidth
      key={post.slug}
      href={`/blog/${post.slug}`}
      transition="micro-medium"
      direction={direction}
      border="transparent"
      background="transparent"
      padding="4"
      radius="l-4"
      gap={direction === "column" ? undefined : "24"}
      s={{ direction: "column" }}
    >
      {post.metadata.image && thumbnail && (
        <Media
          priority
          sizes="(max-width: 768px) 100vw, 640px"
          border="neutral-alpha-weak"
          cursor="interactive"
          radius="l"
          src={post.metadata.image}
          alt={`Thumbnail of ${post.metadata.title}`}
          aspectRatio="16 / 9"
        />
      )}
      <Row fillWidth>
        <Column maxWidth={28} paddingY="24" paddingX="l" gap="20" vertical="center">
          <Row gap="24" vertical="center">
            <Row vertical="center" gap="16">
              <Avatar src={person.avatar} size="s" />
              <Text variant="label-default-s">{person.name}</Text>
            </Row>
            <Text variant="body-default-xs" onBackground="neutral-weak">
              {formatDate(post.metadata.publishedAt, false)}
            </Text>
          </Row>
          <Text variant="heading-strong-l" wrap="balance">
            {post.metadata.title}
          </Text>
          {post.metadata.tag && (
            <Text variant="label-strong-s" onBackground="neutral-weak">
              {post.metadata.tag}
            </Text>
          )}
        </Column>
      </Row>
    </Card>
  );
}
