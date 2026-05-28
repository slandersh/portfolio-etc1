import WriterContent from "@/components/writer/WriterContent";
import { Column } from "@once-ui-system/core";
import { writer } from "@/resources";
import { baseURL } from "@/resources/once-ui.config";
import type { Metadata } from "next";
import { getPosts } from "@/utils/utils";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: writer.title,
    description: writer.description,
    openGraph: {
      title: writer.title,
      description: writer.description,
      url: `${baseURL}${writer.path}`,
      siteName: writer.title,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: writer.title,
      description: writer.description,
    },
  };
}

export default function WriterPage() {
  const allWorks = getPosts(["src", "app", "writer", "posts"]).map(post => ({
    title: post.metadata.title,
    category: post.metadata.category || "Novel",
    summary: post.metadata.summary,
    link: `/writer/${post.slug}`,
    isRecommended: post.metadata.tag === "Recommended" || !!post.metadata.isRecommended
  }));

  return (
    <Column fillWidth horizontal="center">
      <WriterContent allWorks={allWorks} />
    </Column>
  );
}
