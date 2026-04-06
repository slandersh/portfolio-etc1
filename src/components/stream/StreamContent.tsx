"use client";

import { useState } from "react";
import {
  Heading,
  Text,
  Column,
  Row,
  Media,
  RevealFx,
  Card,
  Button,
  Tag,
  Icon,
  Flex,
} from "@once-ui-system/core";
import { stream, person, baseURL, about } from "@/resources";
import { Schema } from "@once-ui-system/core";
import type { StreamPlatform, Metadata } from "@/types";

interface StreamContentProps {
  platforms: StreamPlatform[];
  news: Metadata[];
  podcasts: Metadata[];
}

type TabType = "all" | "stream" | "podcast";

export default function StreamContent({ platforms, news, podcasts }: StreamContentProps) {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [activePlatform, setActivePlatform] = useState("All");

  const combinedNews = [...news, ...podcasts].sort((a, b) => 
    new Date(b.date || "").getTime() - new Date(a.date || "").getTime()
  );

  const filteredNews = activeTab === "all" 
    ? combinedNews 
    : activeTab === "stream" ? news : podcasts;

  const filteredPlatforms = platforms.filter((p: StreamPlatform) => 
    activePlatform === "All" || p.name === activePlatform
  );

  return (
    <Column maxWidth="m" fillWidth gap="xl" paddingY="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={stream.title}
        description={stream.description}
        path={stream.path}
        image={`/api/og/generate?title=${encodeURIComponent(stream.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center" gap="16">
          <RevealFx translateY="4">
            <Heading variant="display-strong-l">{stream.title}</Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2}>
            <Text variant="heading-default-xl" onBackground="neutral-weak" align="center">
              {stream.description}
            </Text>
          </RevealFx>
        </Column>

        <RevealFx translateY="12" delay={0.4} fillWidth>
          <Row gap="12" horizontal="center" wrap marginTop="24">
            {["All", ...platforms.map((p: StreamPlatform) => p.name)].map((plt) => (
              <Button
                key={plt}
                variant={activePlatform === plt ? "primary" : "secondary"}
                onClick={() => setActivePlatform(plt)}
                size="s"
              >
                {plt}
              </Button>
            ))}
          </Row>
        </RevealFx>
      </Column>

      {/* Featured Stream */}
      <RevealFx translateY="16" delay={0.3} fillWidth>
        <Card fillWidth background="surface" border="neutral-alpha-weak" radius="l" padding="0" style={{ overflow: "hidden" }}>
           {stream.featuredStream ? (
             <div style={{ position: "relative", paddingTop: "56.25%", width: "100%" }}>
               <iframe
                  title="Live Stream Player"
                  src={stream.featuredStream}
                  frameBorder="0"
                  allowFullScreen={true}
                  scrolling="no"
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
               />
             </div>
           ) : (
             <Media src="/images/projects/project-01/cover-01.jpg" aspectRatio="16/9" />
           )}
        </Card>
      </RevealFx>

      {/* Sub-categories Tabs */}
      <Row gap="12" horizontal="center" fillWidth marginTop="32">
         <Button variant={activeTab === "all" ? "primary" : "secondary"} size="s" onClick={() => setActiveTab("all")}>All</Button>
         <Button variant={activeTab === "stream" ? "primary" : "secondary"} size="s" onClick={() => setActiveTab("stream")}>Stream</Button>
         <Button variant={activeTab === "podcast" ? "primary" : "secondary"} size="s" onClick={() => setActiveTab("podcast")}>Podcast</Button>
      </Row>

      {activeTab !== "podcast" && (
        <RevealFx translateY="8" delay={0.4} fillWidth>
          <Column gap="16">
            <Heading variant="heading-strong-l">Stream Platforms</Heading>
            <Grid columns="3" s={{ columns: 1 }} m={{ columns: 2 }} gap="16" fillWidth>
               {filteredPlatforms.map((p: StreamPlatform) => (
                <Card 
                  key={p.name} 
                  padding="20" 
                  gap="12" 
                  background="neutral-alpha-weak" 
                  radius="m"
                >
                  <Flex direction="row" s={{ direction: "column" }} gap="24" fillWidth vertical="center">
                    <Row flex={1} horizontal="between" vertical="center" gap="16">
                      <Text variant="label-strong-l">{p.name}</Text>
                      <Tag variant={p.status === "Live" ? "brand" : "neutral"} size="s">
                        {p.status}
                      </Tag>
                    </Row>
                    <Button href={p.link} variant="secondary" size="s" suffixIcon="arrowUpRight" style={{ minWidth: "140px" }}>
                       Watch
                    </Button>
                  </Flex>
                </Card>
              ))}
            </Grid>
          </Column>
        </RevealFx>
      )}

      <RevealFx translateY="12" delay={0.5} fillWidth>
        <Column gap="24">
          <Heading variant="heading-strong-l">
            {activeTab === "all" ? "Latest News & Episodes" : activeTab === "stream" ? "Stream News" : "Podcast Episodes"}
          </Heading>
          <Column gap="16">
            {filteredNews.map((n) => (
              <Card key={n.title} padding="24" background="surface" border="neutral-alpha-weak" radius="m" fillWidth>
                 <Flex direction="row" s={{ direction: "column" }} gap="24" vertical="center" fillWidth>
                    <Column flex={2} gap="4">
                       <Tag variant="neutral" size="s" fillWidth>{n.date}</Tag>
                       {podcasts.some(p => p.title === n.title) && <Tag variant="brand" size="s" fillWidth>Podcast</Tag>}
                    </Column>
                    <Column flex={7} gap="4">
                       <Flex direction="column" gap="4">
                          <Text variant="heading-strong-s">{n.title}</Text>
                          <Text variant="body-default-m" onBackground="neutral-weak">{n.summary}</Text>
                       </Flex>
                    </Column>
                    <Button 
                      href={`/stream/${podcasts.some(p => p.title === n.title) ? 'podcast/' : 'posts/'}${n.slug}`} 
                      variant="secondary" 
                      size="s" 
                      suffixIcon="chevronRight" 
                      style={{ minWidth: "140px" }}
                    >
                       Read More
                    </Button>
                 </Flex>
              </Card>
            ))}
          </Column>
        </Column>
      </RevealFx>
    </Column>
  );
}

import { Grid } from "@once-ui-system/core";
