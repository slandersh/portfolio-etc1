import { Column } from "@once-ui-system/core";
import StreamContent from "@/components/stream/StreamContent";
import { getPosts } from "@/utils/utils";

export default function Stream() {
  const allNews = getPosts(["src", "app", "stream", "posts"]);

  const newsUpdates = allNews.map((n) => ({
    title: n.metadata.title,
    date: n.metadata.date || n.metadata.publishedAt,
    summary: n.metadata.summary,
  }));

  return (
    <Column fillWidth horizontal="center">
      <StreamContent newsUpdates={newsUpdates} />
    </Column>
  );
}
