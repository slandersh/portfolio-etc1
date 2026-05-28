import { getPosts } from "@/utils/utils";
import { Column } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

/**
 * Props untuk komponen Projects.
 */
interface ProjectsProps {
  /**
   * Rentang indeks proyek yang akan ditampilkan (1-based).
   * - `[n]`    → tampilkan dari indeks n hingga akhir
   * - `[n, m]` → tampilkan dari indeks n hingga m (inklusif)
   *
   * Contoh penggunaan di halaman beranda:
   * - `range={[1, 1]}` → proyek pertama saja (di atas section blog)
   * - `range={[2]}`   → semua proyek mulai dari yang kedua (di bawah section blog)
   */
  range?: [number, number?];
  /** Daftar slug proyek yang akan dikecualikan dari tampilan */
  exclude?: string[];
}

/**
 * Komponen daftar proyek yang membaca semua file MDX dari `src/app/work/projects/`.
 *
 * Proyek diurutkan dari yang terbaru ke yang terlama berdasarkan `publishedAt`.
 * Setiap proyek dirender menggunakan `ProjectCard` dengan carousel gambar, avatar tim,
 * deskripsi, dan link ke halaman detail atau proyek eksternal.
 *
 * Cara menambah proyek baru:
 * 1. Buat file `src/app/work/projects/nama-proyek.mdx`
 * 2. Isi frontmatter: `title`, `publishedAt`, `summary`, `images`, `team`, `link`
 * 3. Proyek akan otomatis muncul di halaman /work dan beranda
 *
 * @param {ProjectsProps} props - Props komponen
 */
export function Projects({ range, exclude }: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  // Kecualikan proyek berdasarkan slug (pencocokan tepat)
  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={`/work/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          content={post.content}
          avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
          link={post.metadata.link || ""}
        />
      ))}
    </Column>
  );
}
