import { Column, Heading, Meta, Schema, Text, RevealFx } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { Projects } from "@/components/work/Projects";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  return (
    <Column fillWidth horizontal="center" paddingTop="24">
      <Column maxWidth="m" fillWidth>
        <Schema
          as="webPage"
          baseURL={baseURL}
          path={work.path}
          title={work.title}
          description={work.description}
          image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
          author={{
            name: person.name,
            url: `${baseURL}${about.path}`,
            image: `${baseURL}${person.avatar}`,
          }}
        />
        <Column fillWidth horizontal="center" gap="m" marginBottom="l">
          <Column maxWidth="s" horizontal="center" align="center" gap="16">
            <RevealFx translateY="4" fillWidth>
              <Heading variant="display-strong-l" align="center" style={{ textAlign: "center", width: "100%" }}>{work.title}</Heading>
            </RevealFx>
            <RevealFx translateY="8" delay={0.2} fillWidth>
              <Text variant="heading-default-xl" onBackground="neutral-weak" align="center" style={{ textAlign: "center", width: "100%" }}>
                {work.description}
              </Text>
            </RevealFx>
          </Column>
        </Column>
        <Projects />
      </Column>
    </Column>
  );
}
