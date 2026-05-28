"use client";

import {
  Heading,
  Text,
  Column,
  Row,
  RevealFx,
  Card,
  Button,
  Flex,
  Schema,
  Tag,
  Icon,
  Grid,
} from "@once-ui-system/core";
import { podcast, baseURL, person, about } from "@/resources";
interface PodcastContentProps {
  allEpisodes: {
    title: string;
    date: string;
    summary: string;
    category: string;
    link: string;
  }[];
}

export default function PodcastContent({ allEpisodes }: PodcastContentProps) {
  return (
    <Column maxWidth="m" fillWidth gap="xl" paddingY="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={podcast.title}
        description={podcast.description}
        path={podcast.path}
        image={`/api/og/generate?title=${encodeURIComponent(podcast.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center" gap="16">
          <RevealFx translateY="4">
            <Heading variant="display-strong-l" style={{ textAlign: "center" }}>{podcast.headline}</Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2}>
            <Text variant="heading-default-xl" onBackground="neutral-weak" align="center">
              {podcast.subline}
            </Text>
          </RevealFx>
        </Column>
      </Column>

      <Row gap="32" wrap vertical="start" fillWidth>
        {/* Platforms Section */}
        <Column flex={6} gap="24">
          <RevealFx translateY="16" delay={0.4} fillWidth>
            <Card fillWidth padding="32" gap="24" background="surface" border="neutral-alpha-weak" radius="l">
               <Heading variant="heading-strong-l">Listen Everywhere</Heading>
               <Row gap="16" wrap>
                  {podcast.platforms.map((p) => (
                    <Card key={p.name} flex={1} padding="24" gap="16" background="neutral-alpha-weak" radius="m" style={{ minWidth: "200px" }}>
                       <Row horizontal="between" vertical="center">
                          <Icon name={p.icon || "globe"} size="m" onBackground="brand-weak" />
                          <Text variant="label-strong-m">{p.name}</Text>
                       </Row>
                       <Button href={p.link} variant="secondary" size="s" fillWidth suffixIcon="arrowUpRight">
                         Dengarkan
                       </Button>
                    </Card>
                  ))}
               </Row>
            </Card>
          </RevealFx>
        </Column>

        {/* Categories Section */}
        <Column flex={4} gap="24">
          <RevealFx translateY="16" delay={0.5} fillWidth>
            <Card fillWidth padding="32" gap="24" background="brand-alpha-weak" border="brand-alpha-medium" radius="l">
               <Heading variant="heading-strong-m">What we talk about</Heading>
               <Flex wrap gap="8">
                  {podcast.categories.map((cat) => (
                    <Tag key={cat} variant="brand" size="l">{cat}</Tag>
                  ))}
               </Flex>
               <Text variant="body-default-m" onBackground="neutral-weak">
                 Kami mengeksplorasi berbagai topik menarik setiap minggunya untuk memperluas wawasan Anda.
               </Text>
            </Card>
          </RevealFx>
        </Column>
      </Row>

      {/* Featured Episodes Sections */}
      <RevealFx translateY="24" delay={0.6} fillWidth>
        <Column gap="24">
          <Heading variant="heading-strong-l">Latest Episodes</Heading>
          <Grid columns="3" s={{ columns: 1 }} m={{ columns: 2 }} gap="24" fillWidth>
            {allEpisodes.length > 0 ? (
              allEpisodes.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((ep) => (
                <Card key={ep.title} flex={1} padding="24" gap="16" background="surface" border="neutral-alpha-weak" radius="m" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                   <Row horizontal="between" vertical="center">
                      <Tag variant="neutral" size="s">{ep.date}</Tag>
                      <Tag variant="brand" size="s">{ep.category}</Tag>
                   </Row>
                   <Text variant="heading-strong-s">{ep.title}</Text>
                   <Text variant="body-default-m" onBackground="neutral-weak" style={{ flexGrow: 1 }}>{ep.summary}</Text>
                   <Button href={ep.link} variant="secondary" size="s" fillWidth style={{ marginTop: "auto" }} suffixIcon="chevronRight">
                      Dengarkan Episode
                   </Button>
                </Card>
              ))
            ) : (
              <Card fillWidth padding="48" horizontal="center" align="center" gap="24" background="neutral-alpha-weak" radius="l" border="neutral-alpha-weak" style={{ gridColumn: "1 / -1" }}>
                 <Icon name="mic" size="l" onBackground="brand-weak" />
                 <Heading variant="heading-strong-l">Episodes coming soon</Heading>
                 <Text variant="body-default-xl" onBackground="neutral-weak">Stay tuned for the first episode launch!</Text>
              </Card>
            )}
          </Grid>
        </Column>
      </RevealFx>
    </Column>
  );
}
