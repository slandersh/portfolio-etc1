import { Column } from "@once-ui-system/core";
import StreamContent from "@/components/stream/StreamContent";
import { getPosts } from "@/utils/utils";
import { stream } from "@/resources";

export default function Stream() {
  const allNews = getPosts(["src", "app", "stream", "posts"]);
  const allPodcasts = getPosts(["src", "app", "stream", "podcast", "posts"]);

  const news = allNews.map((n) => ({
    ...n.metadata,
    slug: n.slug,
  }));

  const podcasts = allPodcasts.map((p) => ({
    ...p.metadata,
    slug: p.slug,
  }));

  return (
    <Column fillWidth horizontal="center">
      <StreamContent 
        platforms={stream.platforms} 
        news={news} 
        podcasts={podcasts} 
      />
    </Column>
  );
}
