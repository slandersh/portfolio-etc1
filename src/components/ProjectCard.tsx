"use client";

import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
} from "@once-ui-system/core";

/**
 * Props untuk komponen ProjectCard.
 */
interface ProjectCardProps {
  /** URL halaman detail proyek (contoh: "/work/nama-proyek") */
  href: string;
  /** Jika true, gambar pertama diberi prioritas loading tinggi (gunakan untuk kartu di atas fold) */
  priority?: boolean;
  /** Daftar URL gambar yang ditampilkan dalam carousel */
  images: string[];
  /** Judul proyek */
  title: string;
  /** Konten MDX proyek — jika tidak kosong, tampilkan link "Read case study" */
  content: string;
  /** Ringkasan atau deskripsi singkat proyek */
  description: string;
  /** Daftar avatar anggota tim (diambil dari `team[].avatar` di frontmatter MDX) */
  avatars: { src: string }[];
  /** URL external proyek — jika ada, tampilkan link "View project" */
  link: string;
}

/**
 * Kartu proyek yang menampilkan carousel gambar, judul, deskripsi, dan link aksi.
 *
 * Digunakan di `Projects.tsx` untuk merender setiap proyek dari file MDX.
 * Menampilkan dua jenis link:
 * - "Read case study" → link ke halaman detail proyek (`href`)
 * - "View project"   → link eksternal ke proyek langsung (`link`)
 *
 * Gambar diambil dari frontmatter `images` file MDX proyek.
 * Avatar tim diambil dari frontmatter `team[].avatar`.
 *
 * Cara menambah proyek baru:
 * - Buat file baru di `src/app/work/projects/nama-proyek.mdx`
 * - Isi frontmatter dengan `images`, `team`, `link`, dll.
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
}) => {
  return (
    <Column fillWidth gap="m">
      <Carousel
        sizes="(max-width: 960px) 100vw, 960px"
        items={images.map((image) => ({
          slide: image,
          alt: title,
        }))}
      />
      <Flex
        s={{ direction: "column" }}
        fillWidth
        paddingX="s"
        paddingTop="12"
        paddingBottom="24"
        gap="l"
      >
        {title && (
          <Flex flex={5}>
            <Heading as="h2" wrap="balance" variant="heading-strong-xl">
              {title}
            </Heading>
          </Flex>
        )}
        {(avatars?.length > 0 || description?.trim() || content?.trim()) && (
          <Column flex={7} gap="16">
            {avatars?.length > 0 && <AvatarGroup avatars={avatars} size="m" reverse />}
            {description?.trim() && (
              <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
                {description}
              </Text>
            )}
            <Flex gap="24" wrap>
              {content?.trim() && (
                <SmartLink
                  suffixIcon="arrowRight"
                  style={{ margin: "0", width: "fit-content" }}
                  href={href}
                >
                  <Text variant="body-default-s">Read case study</Text>
                </SmartLink>
              )}
              {link && (
                <SmartLink
                  suffixIcon="arrowUpRightFromSquare"
                  style={{ margin: "0", width: "fit-content" }}
                  href={link}
                >
                  <Text variant="body-default-s">View project</Text>
                </SmartLink>
              )}
            </Flex>
          </Column>
        )}
      </Flex>
    </Column>
  );
};
