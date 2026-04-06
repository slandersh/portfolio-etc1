import type { IconName } from "@/resources/icons";
import type { zones } from "tzdata";

/**
 * IANA time zone string (e.g., 'Asia/Calcutta', 'Europe/Vienna').
 * See: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 */
export type IANATimeZone = Extract<keyof typeof zones, string>; // Narrow to string keys for React usage

/**
 * Represents a person featured in the portfolio.
 */
export type Person = {
  /** First name of the person */
  firstName: string;
  /** Last name of the person */
  lastName: string;
  /** The name you want to display, allows variations like nicknames */
  name: string;
  /** Role or job title */
  role: string;
  /** Path to avatar image */
  avatar: string;
  /** Email address */
  email: string;
  /** IANA time zone location */
  location: IANATimeZone;
  /** Languages spoken */
  languages?: string[];
};

/**
 * Newsletter Section
 * @description The below information will be displayed on the Home page in Newsletter block
 */
export type Newsletter = {
  /** Whether to display the newsletter section */
  display: boolean;
  /** Title of the newsletter   */
  title: React.ReactNode;
  /** Description of the newsletter */
  description: React.ReactNode;
};

/**
 * Social link configuration.
 */
export interface Social {
  name: string;
  icon: IconName;
  link: string;
  community?: boolean;
  essential?: boolean;
}

/**
 * Base interface for page configuration with common properties.
 */
export interface BasePageConfig {
  /** Path to the page
   *
   * The path should be relative to the public directory
   */
  path: `/${string}` | string;
  /** Label for navigation or display */
  label: string;
  /** Title of the page */
  title: string;
  /** Description for SEO and metadata */
  description: string;
  /** OG Image should be put inside `public/images` folder */
  image?: `/images/${string}` | string;
}

/**
 * Home page configuration.
 */
export interface Home extends BasePageConfig {
  /** The image to be displayed in metadata
   *
   * The image needs to be put inside `/public/images/` directory
   */
  image: `/images/${string}` | string;
  /** The headline of the home page */
  headline: React.ReactNode;
  /** Featured badge, which appears above the headline */
  featured: {
    display: boolean;
    title: React.ReactNode;
    href: string;
  };
  /** The sub text which appears below the headline */
  subline: React.ReactNode;
}

/**
 * About page configuration.
 * @description Configuration for the About page, including sections for table of contents, avatar, calendar, introduction, work experience, studies, and technical skills.
 */
export interface About extends BasePageConfig {
  /** Table of contents configuration */
  tableOfContent: {
    /** Whether to display the table of contents */
    display: boolean;
    /** Whether to show sub-items in the table of contents */
    subItems: boolean;
  };
  /** Avatar section configuration */
  avatar: {
    /** Whether to display the avatar */
    display: boolean;
  };
  /** Calendar section configuration */
  calendar: {
    /** Whether to display the calendar */
    display: boolean;
    /** Link to the calendar */
    link: string;
  };
  /** Introduction section */
  intro: {
    /** Whether to display the introduction */
    display: boolean;
    /** Title of the introduction section */
    title: string;
    /** Description of the introduction section */
    description: React.ReactNode;
  };
  /** Work experience section */
  work: {
    /** Whether to display work experience */
    display: boolean;
    /** Title for the work experience section */
    title: string;
    /** List of work experiences */
    experiences: Array<{
      /** Company name */
      company: string;
      /** Timeframe of employment */
      timeframe: string;
      /** Role or job title */
      role: string;
      /** Achievements at the company */
      achievements: React.ReactNode[];
      /** Images related to the experience */
      images?: Array<{
        /** Image source path */
        src: string;
        /** Image alt text */
        alt: string;
        /** Image width ratio */
        width: number;
        /** Image height ratio */
        height: number;
      }>;
    }>;
  };
  /** Studies/education section */
  studies: {
    /** Whether to display studies section */
    display: boolean;
    /** Title for the studies section */
    title: string;
    /** List of institutions attended */
    institutions: Array<{
      /** Institution name */
      name: string;
      /** Description of studies */
      description: React.ReactNode;
    }>;
  };
  /** Technical skills section */
  technical: {
    /** Whether to display technical skills section */
    display: boolean;
    /** Title for the technical skills section */
    title: string;
    /** List of technical skills */
    skills: Array<{
      /** Skill title */
      title: string;
      /** Skill description */
      description?: React.ReactNode;
      /** Skill tags */
      tags?: Array<{
        name: string;
        icon?: string;
      }>;
      /** Images related to the skill */
      images?: Array<{
        /** Image source path */
        src: string;
        /** Image alt text */
        alt: string;
        /** Image width ratio */
        width: number;
        /** Image height ratio */
        height: number;
      }>;
    }>;
  };
}

/**
 * Blog page configuration.
 * @description Configuration for the Blog page, including metadata and navigation label.
 */
export interface Blog extends BasePageConfig {}

/**
 * Work/projects page configuration.
 * @description Configuration for the Work/Projects page, including metadata and navigation label.
 */
export interface Work extends BasePageConfig {}

/**
 * Gallery page configuration.
 * @description Configuration for the Gallery page, including metadata, navigation label, and image list.
 */
export interface Gallery extends BasePageConfig {
  /** List of images in the gallery */
  images: Array<{
    /** Image source path */
    src: string;
    /** Image alt text */
    alt: string;
    /** Image orientation (horizontal/vertical) */
    orientation: string;
  }>;
}

/**
 * Product category for the store.
 */
export type ProductCategory = {
  /** Name of the category */
  name: string;
  /** Icon for the category */
  icon?: string;
};

/**
 * Product configuration for the store.
 */
export type Product = {
  /** Title of the product */
  title: string;
  /** Description of the product */
  description: string;
  /** Price of the product (optional) */
  price?: string;
  /** Category of the product */
  category: string;
  /** Link to purchase or view the product */
  link: string;
  /** Image source path */
  image?: string;
  /** Optional tag for the product (e.g., 'New', 'Featured') */
  tag?: string;
  /** Optional badge for the product */
  badge?: string;
  /** Detailed information for the product modal */
  details?: {
    longDescription?: string;
    features?: string[];
    images?: string[];
  };
};

/**
 * Represents a donation supporter.
 */
export type Supporter = {
  name: string;
  amount: string;
  message?: string;
  date: string;
};

/**
 * Represents a donation platform.
 */
export type DonationPlatform = {
  name: string;
  link: string;
  icon?: string;
  color?: string;
};

/**
 * Represents a stream platform.
 */
export type StreamPlatform = {
  name: string;
  link: string;
  icon?: string;
  status?: "Live" | "Offline" | "Scheduled";
};

/**
 * Represents a stream announcement or news.
 */
export type StreamNews = {
  title: string;
  date: string;
  summary: string;
  link?: string;
};

/**
 * Stream page configuration.
 */
export interface Stream extends BasePageConfig {
  platforms: StreamPlatform[];
  news: StreamNews[];
  featuredStream?: string; // e.g., Embed URL
}

/**
 * Store page configuration.
 * @description Configuration for the Store page, including metadata, navigation label, categories, and product list.
 */
export interface Store extends BasePageConfig {
  /** List of product categories */
  categories: string[];
  /** List of products in the store */
  products: Product[];
  /** Recent supporters for donation section */
  supporters?: Supporter[];
  /** List of donation platforms */
  donationPlatforms?: DonationPlatform[];
  /** Link to live stream */
  streamLink?: string;
  /** Link to request product or service */
  requestLink?: string;
  /** WhatsApp Business number for automation */
  whatsappNumber?: string;
}
/**
 * Represents a community news or announcement.
 */
export type CommunityNews = {
  title: string;
  date: string;
  summary: string;
  link?: string;
};

/**
 * Community page configuration.
 */
export interface Community extends BasePageConfig {
  /** Community-specific headline */
  headline: React.ReactNode;
  /** Community subline/description */
  subline: React.ReactNode;
  /** Discord or other community link */
  discordLink?: string;
  /** List of community news */
  news: CommunityNews[];
  /** Recent supporters for donation section */
  supporters?: Supporter[];
  /** List of donation platforms */
  donationPlatforms?: DonationPlatform[];
}
/**
 * Podcast platform configuration.
 */
export type PodcastPlatform = {
  name: string;
  link: string;
  icon?: string;
};

/**
 * Podcast page configuration.
 */
export interface Podcast extends BasePageConfig {
  /** Podcast-specific headline */
  headline: React.ReactNode;
  /** Podcast subline/description */
  subline: React.ReactNode;
  /** Available platforms for the podcast */
  platforms: PodcastPlatform[];
  /** Podcast categories */
  categories: string[];
}

/**
 * Writer category configuration.
 */
export type WriterCategory = "Novel" | "Short Story" | "Series" | string;

/**
 * Work of a writer.
 */
export type LiteratureWork = {
  title: string;
  category: WriterCategory;
  summary: string;
  link?: string;
  image?: string;
  isRecommended?: boolean;
};

/**
 * Writer page configuration.
 */
export interface Writer extends BasePageConfig {
  /** Writer-specific headline */
  headline: React.ReactNode;
  /** Writer subline/description */
  subline: React.ReactNode;
  /** List of literature works */
  works: LiteratureWork[];
}
/**
 * Tipe data untuk anggota tim yang terlibat dalam sebuah proyek atau postingan blog.
 */
export type Team = {
  name: string;      // Nama lengkap anggota tim
  role: string;      // Jabatan atau peran dalam proyek
  avatar: string;    // Path relatif ke gambar avatar (contoh: "/images/avatar.jpg")
  linkedIn: string;  // URL profil LinkedIn
};

/**
 * Tipe data metadata yang diekstrak dari frontmatter file MDX.
 */
export type Metadata = {
  title: string;          // Judul utama halaman/postingan
  subtitle?: string;      // Subjudul (opsional)
  publishedAt: string;    // Tanggal publikasi dalam format ISO (contoh: "2026-03-04")
  summary: string;        // Ringkasan singkat konten untuk SEO dan preview
  image?: string;         // URL gambar utama (opsional)
  images: string[];       // Daftar URL gambar tambahan
  tag?: string;           // Tag atau label kategori (opsional)
  team: Team[];           // Daftar anggota tim yang terlibat
  link?: string;          // URL tautan eksternal terkait (opsional)
  // Field Tambahan untuk Store & Stream
  price?: string;         // Harga produk (Store)
  category?: string;      // Kategori produk (Store)
  badge?: string;         // Badge produk (contoh: "New", "Best Seller") (Store)
  date?: string;          // Tanggal berita/update (Stream - jika berbeda dari publishedAt)
  isRecommended?: boolean; // Label rekomendasi untuk Writer
  slug?: string;
};
