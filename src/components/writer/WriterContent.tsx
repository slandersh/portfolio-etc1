"use client";

import { useState, useMemo } from "react";
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
  IconButton,
  Input,
  Grid,
} from "@once-ui-system/core";
import { writer, baseURL, person, about } from "@/resources";

interface WriterContentProps {
  allWorks: {
    title: string;
    category: string;
    summary: string;
    link: string;
    isRecommended: boolean;
  }[];
}

export default function WriterContent({ allWorks }: WriterContentProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => ["All", "Novel", "Short Story", "Series"], []);

  const filteredWorks = useMemo(() => {
    return allWorks.filter((work) => {
      const matchesCategory = activeCategory === "All" || work.category === activeCategory;
      const matchesSearch = work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            work.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allWorks, activeCategory, searchQuery]);

  const recommendedWorks = useMemo(() => {
    return allWorks.filter(work => work.isRecommended);
  }, [allWorks]);

  return (
    <Column maxWidth="m" fillWidth gap="xl" paddingY="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={writer.title}
        description={writer.description}
        path={writer.path}
        image={`/api/og/generate?title=${encodeURIComponent(writer.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center" gap="16">
          <RevealFx translateY="4">
            <Heading variant="display-strong-l" align="center" style={{ textAlign: "center", width: "100%" }}>{writer.headline}</Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2}>
            <Text variant="heading-default-xl" onBackground="neutral-weak" align="center">
              {writer.subline}
            </Text>
          </RevealFx>
        </Column>
      </Column>

      {/* Recommended Section */}
      {recommendedWorks.length > 0 && activeCategory === "All" && !searchQuery && (
        <RevealFx translateY="12" delay={0.3} fillWidth>
           <Column gap="24">
              <Row vertical="center" gap="12">
                 <Icon name="star" size="m" onBackground="brand-weak" />
                 <Heading variant="heading-strong-l">Recommended for you</Heading>
              </Row>
              <Grid columns="3" s={{ columns: 1 }} m={{ columns: 2 }} gap="24" fillWidth>
                 {recommendedWorks.map((work) => (
                    <Card key={work.title} flex={1} padding="32" gap="24" background="brand-alpha-weak" border="brand-alpha-medium" radius="l" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                       <Column gap="16" flex={1}>
                          <Row horizontal="between" vertical="center">
                             <Tag variant="brand" size="s">{work.category}</Tag>
                             <Icon name="favorite" size="s" onBackground="brand-weak" />
                          </Row>
                          <Heading variant="heading-strong-m">{work.title}</Heading>
                          <Text variant="body-default-l" onBackground="neutral-weak">{work.summary}</Text>
                          <Button href={work.link || "#"} variant="primary" size="s" fillWidth style={{ marginTop: "auto" }} suffixIcon="chevronRight">
                             Baca Sekarang
                          </Button>
                       </Column>
                    </Card>
                 ))}
              </Grid>
           </Column>
        </RevealFx>
      )}

      {/* Catalog Section */}
      <Column gap="32" fillWidth>
        <RevealFx translateY="16" delay={0.4} fillWidth>
           <Row horizontal="between" vertical="end" gap="24" wrap>
              <Column gap="12" flex={1} style={{ minWidth: "300px" }}>
                 <Text variant="label-strong-m">Search works</Text>
                 <Row
                    radius="m-4"
                    fillWidth
                    padding="4"
                    vertical="center"
                    background="surface"
                    border="neutral-alpha-weak"
                 >
                    <Icon name="search" size="s" marginLeft="12" onBackground="neutral-weak" />
                    <input
                        id="search-writer"
                        placeholder="Search by title or summary..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            border: "none",
                            background: "transparent",
                            boxShadow: "none",
                            height: "40px",
                            flex: 1,
                            padding: "0 12px",
                            outline: "none",
                            color: "inherit",
                            fontFamily: "inherit"
                        }}
                    />
                 </Row>
              </Column>
              <Row gap="8" wrap>
                 {categories.map((cat) => (
                    <Button
                       key={cat}
                       variant={activeCategory === cat ? "primary" : "secondary"}
                       onClick={() => setActiveCategory(cat)}
                       size="s"
                    >
                       {cat}
                    </Button>
                 ))}
              </Row>
           </Row>
        </RevealFx>

        <RevealFx translateY="24" delay={0.5} fillWidth>
           <Grid columns="3" s={{ columns: 1 }} m={{ columns: 2 }} gap="24" fillWidth>
              {filteredWorks.length > 0 ? (
                filteredWorks.map((work) => (
                  <Card 
                    key={work.title} 
                    flex={1} 
                    padding="32" 
                    gap="24" 
                    background="surface" 
                    border="neutral-alpha-weak" 
                    radius="l" 
                    style={{ height: "100%", display: "flex", flexDirection: "column" }}
                  >
                     <Row horizontal="between" vertical="center" fillWidth>
                        <Tag variant="neutral" size="s">{work.category}</Tag>
                        {work.isRecommended && (
                          <Row vertical="center" gap="4">
                            <Icon name="star" size="xs" onBackground="brand-weak" />
                            <Text variant="label-strong-s" onBackground="brand-weak">EDITOR'S PICK</Text>
                          </Row>
                        )}
                     </Row>
                     <Column gap="12" flex={1}>
                        <Heading variant="heading-strong-m">{work.title}</Heading>
                        <Text variant="body-default-m" onBackground="neutral-weak">{work.summary}</Text>
                     </Column>
                     <Button 
                        href={work.link || "#"} 
                        variant="primary" 
                        size="m" 
                        fillWidth 
                        style={{ marginTop: "auto" }} 
                        suffixIcon="chevronRight"
                     >
                        Baca Sekarang
                     </Button>
                  </Card>
                ))
              ) : (
                <Column fillWidth align="center" paddingY="64" gap="16" style={{ gridColumn: "1 / -1" }}>
                   <Icon name="search" size="l" onBackground="neutral-medium" />
                   <Text variant="body-default-xl" onBackground="neutral-weak">No works found matching your search.</Text>
                </Column>
              )}
           </Grid>
        </RevealFx>
      </Column>
    </Column>
  );
}
