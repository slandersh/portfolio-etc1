import PodcastContent from "@/components/podcast/PodcastContent";
import { podcast } from "@/resources";
import { baseURL } from "@/resources/once-ui.config";
import { Metadata } from "next";
import { getPosts } from "@/utils/utils";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: podcast.title,
    description: podcast.description,
    openGraph: {
      title: podcast.title,
      description: podcast.description,
      url: `${baseURL}${podcast.path}`,
      siteName: podcast.title,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: podcast.title,
      description: podcast.description,
    },
  };
}

export default function PodcastPage() {
  const allEpisodes = getPosts(["src", "app", "stream", "podcast", "posts"]).map(post => ({
    title: post.metadata.title,
    date: post.metadata.publishedAt,
    summary: post.metadata.summary,
    category: post.metadata.category || "General",
    link: `/stream/podcast/${post.slug}`
  }));

  return <PodcastContent allEpisodes={allEpisodes} />;
}
