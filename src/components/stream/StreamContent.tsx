/**
 * @file StreamContent.tsx
 * @description Komponen halaman Stream yang menampilkan platform live stream dan berita terkini.
 *
 * Fitur utama:
 * - **Filter platform** — Tombol filter untuk menampilkan platform tertentu (atau semua)
 * - **Featured stream** (opsional) — Embed iframe live stream jika `stream.featuredStream` diisi.
 *   Jika kosong, tampilkan gambar placeholder.
 * - **Platform cards** — Kartu untuk setiap platform dengan statusnya (Live/Offline/Scheduled)
 * - **Sidebar berita** — Daftar berita/pengumuman stream terbaru
 * - **CTA Donasi** — Tombol yang diarahkan ke halaman Store bagian Donasi
 *
 * Cara mengkonfigurasi:
 * - Edit objek `stream` di `src/resources/content.tsx`
 * - Untuk embed stream langsung, isi `stream.featuredStream` dengan URL embed
 *   (contoh: URL embed YouTube live atau Twitch)
 * - Tambah platform baru di array `stream.platforms`
 * - Tambah pengumuman di array `stream.news`
 */
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
import type { StreamPlatform, StreamNews } from "@/types";

interface StreamContentProps {
  newsUpdates: StreamNews[];
}

export default function StreamContent({ newsUpdates }: StreamContentProps) {
  const [activePlatform, setActivePlatform] = useState("All");

  const filteredPlatforms = stream.platforms.filter((p: StreamPlatform) => 
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
            {["All", ...stream.platforms.map((p: StreamPlatform) => p.name)].map((plt) => (
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

      <Row gap="32" wrap vertical="start" fillWidth marginTop="32">
        {/* Area Utama Stream */}
        <Column flex={7} gap="24">
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

          <Column gap="16">
            <Heading variant="heading-strong-l">Stream Platforms</Heading>
            <Row gap="16" wrap>
              {filteredPlatforms.map((p: StreamPlatform) => (
                <Card 
                  key={p.name} 
                  flex={1} 
                  padding="20" 
                  gap="12" 
                  background="neutral-alpha-weak" 
                  radius="m"
                  style={{ minWidth: "200px" }}
                >
                  <Row horizontal="between" vertical="center">
                    <Text variant="label-strong-m">{p.name}</Text>
                    <Tag variant={p.status === "Live" ? "brand" : "neutral"} size="s">
                      {p.status}
                    </Tag>
                  </Row>
                  <Button href={p.link} variant="secondary" size="s" fillWidth suffixIcon="arrowUpRight">
                    Watch on {p.name}
                  </Button>
                </Card>
              ))}
            </Row>
          </Column>
        </Column>

        {/* Sidebar: Berita & Pengumuman */}
        <Column flex={3} gap="24">
          <Card fillWidth padding="24" gap="20" background="surface" border="neutral-alpha-weak" radius="l">
            <Heading variant="heading-strong-m">Stream News</Heading>
            <Column gap="16">
              {newsUpdates.map((n: StreamNews) => (
                <Column key={n.title} gap="8" paddingBottom="16" style={{ borderBottom: "1px solid var(--neutral-alpha-weak)" }}>
                  <Text variant="label-default-xs" onBackground="neutral-weak">{n.date}</Text>
                  <Text variant="label-strong-s">{n.title}</Text>
                  <Text variant="body-default-xs" onBackground="neutral-weak">{n.summary}</Text>
                </Column>
              ))}
            </Column>
          </Card>

          <Card fillWidth padding="24" gap="16" background="brand-alpha-weak" border="brand-alpha-medium" radius="l">
             <Heading variant="heading-strong-s">Support the Stream</Heading>
             <Text variant="body-default-xs">Your support helps me stay live and keep creating content!</Text>
             <Button href="/store?category=Donation" variant="primary" size="s" fillWidth prefixIcon="heart">
               Donate Now
             </Button>
          </Card>
        </Column>
      </Row>
    </Column>
  );
}
