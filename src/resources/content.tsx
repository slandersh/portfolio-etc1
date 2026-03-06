import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Store, Work, Stream } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";
import { store } from "./store";
import { stream } from "./stream";

const person: Person = {
  firstName: "Roy Subagya",
  lastName: "Santoso",
  name: "Roy Subagya Santoso",
  role: "Software Engineer",
  avatar: "/images/Avatar.png",
  email: "Roysubagya01@gmail.com",
  location: "Asia/Jakarta", // Format zona waktu IANA, contoh: 'Asia/Jakarta' atau 'Europe/Vienna'
  languages: ["English", "Bahasa"], // Opsional: kosongkan array jika tidak ingin menampilkan bahasa
};

const newsletter: Newsletter = {
  display: true,
  title: `Subscribe to ${person.firstName}'s Newsletter`,
  description: "My weekly newsletter about creativity and engineering",
};

const social: Social[] = [
  // Tautan sosial akan ditampilkan secara otomatis di header dan footer.
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/roysubagya",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/roy-subagya-santoso/",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/ry.universe_/",
    essential: true,
  },
  {
    name: "Discord",
    icon: "discord",
    link: "https://discord.com/invite/649fHwz6v2",
    community: true,
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: "Build a website for my portfolio",
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Mintgyaa</strong>{""}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
    I'm Mintgyaa, a <Text as="span" size="xl" weight="strong">Software Engineer</Text>, based in Jakarta, Indonesia. <br /> This is my portfolio website , a place to show my work as a software engineer. <br /> 
</>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
     "I'm Mintgyaa, a Software Engineer, based in Jakarta, Indonesia. This is my portfolio website , a place to show my work as a software engineer. "+
     "I'm passionate about building innovative and user-friendly software. "+
     "I'm always looking for new challenges and opportunities to learn and grow. "+
     "I'm a team player and I enjoy collaborating with others to create something great."
    ),
  },
  work: {
    display: true, // Ubah ke false untuk menyembunyikan bagian ini
    title: "Work Experience",
    experiences: [
      {
        company: "FLY",
        timeframe: "2022 - Present",
        role: "Senior Design Engineer",
        achievements: [
          "Redesigned the UI/UX for the FLY platform, resulting in a 20% increase in user engagement and 30% faster load times.",
          "Spearheaded the integration of AI tools into design workflows, enabling designers to iterate 50% faster.",
        ],
        images: [
          // Opsional: kosongkan array jika tidak ingin menampilkan gambar
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "Once UI Project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Creativ3",
        timeframe: "2018 - 2022",
        role: "Lead Designer",
        achievements: [
          "Developed a design system that unified the brand across multiple platforms, improving design consistency by 40%.",
          "Led a cross-functional team to launch a new product line, contributing to a 15% increase in overall company revenue.",
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // Ubah ke false untuk menyembunyikan bagian ini
    title: "Studies",
    institutions: [
      {
        name: "University of Jakarta",
        description: "Studied software engineering.",
      },
      {
        name: "Build the Future",
        description: "Studied online marketing and personal branding.",
      },
    ],
  },
  technical: {
    display: true, // Ubah ke false untuk menyembunyikan bagian ini
    title: "Technical skills",
    skills: [
      {
        title: "Figma",
        description: "Able to prototype in Figma with Once UI with unnatural speed.",
        tags: [
          {
            name: "Figma",
            icon: "figma",
          },
        ],
        // Opsional: kosongkan array jika tidak ingin menampilkan gambar
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Next.js",
        description: "Building next gen apps with Next.js + Once UI + Supabase.",
        tags: [
          {
            name: "JavaScript",
            icon: "javascript",
          },
          {
            name: "Next.js",
            icon: "nextjs",
          },
          {
            name: "Supabase",
            icon: "supabase",
          },
        ],
        // Opsional: kosongkan array jika tidak ingin menampilkan gambar
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about creativity and engineering...",
  description: `Read what ${person.name} has been up to recently`,
  // Buat postingan blog baru dengan menambahkan file .mdx baru ke app/blog/posts
  // Semua postingan akan tampil di rute /blog
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Created projects by ${person.name}`,
  // Buat halaman proyek baru dengan menambahkan file .mdx baru ke app/work/projects
  // Semua proyek akan tampil di rute /home dan /work
};

// Data stream sekarang dikelola di src/resources/stream.ts

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Gambar-gambar berikut adalah placeholder, ganti dengan foto Anda sendiri
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

// Data store sekarang dikelola di src/resources/store.ts

// Ekspor semua konten
export { person, social, newsletter, home, about, blog, work, gallery, store, stream };
