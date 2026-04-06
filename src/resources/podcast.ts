import type { Podcast } from "@/types";

const podcast: Podcast = {
  path: "/stream/podcast",
  label: "Podcast",
  title: "Podcast & Stories",
  description: "Dengarkan cerita dan diskusi menarik seputar teknologi dan kreativitas.",
  headline: "Podcast & Stories",
  subline: "Membahas segala hal dari software engineering hingga gaya hidup kreatif.",
  platforms: [
    { name: "Spotify", link: "https://spotify.com", icon: "spotify" },
    { name: "YouTube", link: "https://youtube.com", icon: "youtube" },
    { name: "Apple Podcasts", link: "https://podcasts.apple.com", icon: "apple" }
  ],
  categories: ["Technology", "Creative Process", "Career", "Life Stories"]
};

export { podcast };
