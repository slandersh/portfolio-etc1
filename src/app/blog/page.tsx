import { Column, Heading, Meta, Schema, Text, RevealFx } from "@once-ui-system/core";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { baseURL, blog, person, newsletter } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
    path: blog.path,
  });
}

export default function Blog() {
  return (
    <Column fillWidth horizontal="center" paddingTop="24">
      <Column maxWidth="m" fillWidth>
        <Schema
          as="blogPosting"
          baseURL={baseURL}
          title={blog.title}
          description={blog.description}
          path={blog.path}
          image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
          author={{
            name: person.name,
            url: `${baseURL}/blog`,
            image: `${baseURL}${person.avatar}`,
          }}
        />
        <Column fillWidth horizontal="center" gap="m" marginBottom="l">
          <Column maxWidth="s" horizontal="center" align="center" gap="16">
            <RevealFx translateY="4" fillWidth>
              <Heading variant="display-strong-l" align="center" style={{ textAlign: "center", width: "100%" }}>{blog.title}</Heading>
            </RevealFx>
            <RevealFx translateY="8" delay={0.2} fillWidth>
              <Text variant="heading-default-xl" onBackground="neutral-weak" align="center" style={{ textAlign: "center", width: "100%" }}>
                {blog.description}
              </Text>
            </RevealFx>
          </Column>
        </Column>
        <Column fillWidth flex={1} gap="40">
          <Posts range={[1, 1]} thumbnail />
          <Posts range={[2, 3]} columns="2" thumbnail direction="column" />
          <Mailchimp marginBottom="l" />
          <Heading as="h2" variant="heading-strong-xl" marginLeft="l">
            Earlier posts
          </Heading>
          <Posts range={[4]} columns="2" />
        </Column>
      </Column>
    </Column>
  );
}
