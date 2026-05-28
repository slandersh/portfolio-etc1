"use client";

import React, { useState, useEffect, type ChangeEvent, type MouseEvent } from "react";
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
  Input,
  Tag,
  Icon,
  IconButton,
  Textarea,
  Grid,
} from "@once-ui-system/core";
import { community, baseURL, person, about } from "@/resources";
import { detectCurrency, formatCurrency, formatPriceInput, getExchangeRate, type Currency } from "@/utils/currency";

export default function CommunityContent() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [donationAmount, setDonationAmount] = useState("5");
  const [supporterName, setSupporterName] = useState("");
  const [supporterMessage, setSupporterMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrency(detectCurrency());
    }
  }, []);

  const handleCurrencyToggle = () => {
    const newCurrency: Currency = currency === "USD" ? "IDR" : "USD";
    const rate = getExchangeRate();

    const donationNum = Number.parseFloat(donationAmount) || 0;
    if (donationNum > 0) {
      const converted = newCurrency === "IDR" ? Math.round(donationNum * rate) : Math.round(donationNum / rate);
      setDonationAmount(converted.toString());
    }

    setCurrency(newCurrency);
  };

  return (
    <Column maxWidth="m" fillWidth gap="xl" paddingY="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={community.title}
        description={community.description}
        path={community.path}
        image={`/api/og/generate?title=${encodeURIComponent(community.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center" gap="16">
          <RevealFx translateY="4">
            <Heading variant="display-strong-l" align="center" style={{ textAlign: "center", width: "100%" }}>{community.headline}</Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2}>
            <Text variant="heading-default-xl" onBackground="neutral-weak" align="center">
              {community.subline}
            </Text>
          </RevealFx>
        </Column>

        <RevealFx translateY="12" delay={0.3} fillWidth>
          <Row gap="12" marginTop="24" horizontal="center" fillWidth>
               {community.discordLink && (
                 <Button
                    href={community.discordLink}
                    variant="secondary"
                    size="l"
                    prefixIcon="discord"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
                    }}
                 >
                    Join Discord
                 </Button>
               )}
            </Row>
          </RevealFx>
        </Column>

      {/* Leaderboard & Benefits Section */}
      <Row gap="32" wrap vertical="start" fillWidth>
        {/* Support Leaderboard */}
        <Column fillWidth gap="24">
          <RevealFx translateY="16" delay={0.4} fillWidth>
             <Card fillWidth padding="32" gap="32" background="surface" border="neutral-alpha-weak" radius="l">
                <Column gap="32" fillWidth>
                   <Row horizontal="between" vertical="end" wrap gap="24">
                      <Column gap="8">
                         <Heading variant="display-strong-xs">Support Leaderboard</Heading>
                         <Text variant="body-default-m" onBackground="neutral-weak">Orang-orang keren yang mendukung perjalanan kreatif ini.</Text>
                      </Column>
                      <Button variant="primary" size="s" prefixIcon="heart" onClick={() => setIsModalOpen(true)}>
                         Support Now
                      </Button>
                   </Row>
                   
                   <Grid columns="3" s={{ columns: 1 }} m={{ columns: 2 }} gap="16" fillWidth>
                      {community.supporters?.map((s) => (
                        <Row key={`${s.name}-${s.date}`} gap="16" vertical="center" background="neutral-alpha-weak" padding="16" radius="m" fillWidth>
                            <Flex 
                               width="40" 
                               height="40" 
                               align="center" 
                               horizontal="center" 
                               background="brand-alpha-weak" 
                               radius="full"
                            >
                               <Icon name="heart" size="xs" onBackground="brand-weak" />
                            </Flex>
                            <Column flex={1} gap="4">
                               <Text variant="label-strong-m">{s.name}</Text>
                               {s.message && (
                                 <Text variant="body-default-xs" onBackground="neutral-weak" style={{ 
                                   display: '-webkit-box', 
                                   WebkitLineClamp: 2, 
                                   WebkitBoxOrient: 'vertical', 
                                   overflow: 'hidden' 
                                 }}>{s.message}</Text>
                               )}
                               <Text variant="label-default-xs" onBackground="neutral-alpha-medium">{s.date}</Text>
                            </Column>
                            <Text variant="label-strong-s" onBackground="brand-weak">{s.amount}</Text>
                        </Row>
                      ))}
                   </Grid>
                </Column>
             </Card>
          </RevealFx>
        </Column>

        {/* Benefits Section */}
        <Column flex={4} gap="24">
          <RevealFx translateY="16" delay={0.5} fillWidth>
            <Card fillWidth padding="32" gap="24" background="brand-alpha-weak" border="brand-alpha-medium" radius="l">
               <Heading variant="heading-strong-m">Community Benefits</Heading>
               <Column gap="20">
                  <Row gap="16" vertical="start">
                     <Icon name="rocket" size="s" onBackground="brand-weak" />
                     <Column gap="4">
                        <Text variant="label-strong-m">Early Access</Text>
                        <Text variant="body-default-s" onBackground="neutral-weak">Akses eksklusif ke proyek baru sebelum rilis umum.</Text>
                     </Column>
                  </Row>
                  <Row gap="16" vertical="start">
                     <Icon name="discord" size="s" onBackground="brand-weak" />
                     <Column gap="4">
                        <Text variant="label-strong-m">Private Channels</Text>
                        <Text variant="body-default-s" onBackground="neutral-weak">Diskusi langsung dengan kreator di channel Discord khusus.</Text>
                     </Column>
                  </Row>
                  <Row gap="16" vertical="start">
                     <Icon name="star" size="s" onBackground="brand-weak" />
                     <Column gap="4">
                        <Text variant="label-strong-m">Exclusive Content</Text>
                        <Text variant="body-default-s" onBackground="neutral-weak">Materi belajar dan insight industri khusus untuk komunitas.</Text>
                     </Column>
                  </Row>
               </Column>
            </Card>
          </RevealFx>
        </Column>
      </Row>

      {/* News Section (Below) */}
      <RevealFx translateY="24" delay={0.6} fillWidth>
        <Column gap="24">
          <Heading variant="heading-strong-l">Latest Community News</Heading>
          <Row gap="24" wrap fillWidth>
            {community.news.map((n) => (
              <Card key={n.title} flex={1} padding="24" gap="16" background="surface" border="neutral-alpha-weak" radius="m" style={{ minWidth: "300px" }}>
                 <Row horizontal="between" vertical="center">
                    <Tag variant="neutral" size="s">{n.date}</Tag>
                    {n.link && <IconButton icon="arrowUpRight" size="s" variant="ghost" href={n.link} />}
                 </Row>
                 <Text variant="heading-strong-s">{n.title}</Text>
                 <Text variant="body-default-m" onBackground="neutral-weak">{n.summary}</Text>
              </Card>
            ))}
          </Row>
        </Column>
      </RevealFx>

      {/* Donation Modal (Pop-up) */}
      {isModalOpen && (
        <Flex
          as="div"
          position="fixed"
          top="0"
          left="0"
          zIndex={10}
          fillWidth
          fillHeight
          vertical="center"
          horizontal="center"
          background="neutral-alpha-strong"
          style={{ 
            backdropFilter: "blur(120px)",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            cursor: "pointer",
          }}
          onClick={() => setIsModalOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setIsModalOpen(false);
            }
          }}
        >
          <RevealFx translateY="16" fillWidth horizontal="center" speed="medium">
            <div 
              onClick={(e) => e.stopPropagation()} 
              onKeyDown={(e) => e.stopPropagation()} 
              style={{ 
                width: "min(36rem, 90vw)", 
                display: "flex", 
                justifyContent: "center" 
              }}
            >
              <Card
                fillWidth
                padding="32"
                gap="32"
                background="neutral-alpha-medium"
                border="neutral-alpha-weak"
                radius="l-4"
                style={{ 
                  boxShadow: "0 32px 128px rgba(0,0,0,0.5)",
                  backdropFilter: "blur(40px)",
                  backgroundColor: "rgba(107, 114, 128, 0.25)", // Model Glasses Gray-400 hint
                  border: "1px solid rgba(255, 255, 255, 0.1)"
                }}
              >
                <Column fillWidth gap="24">
                  <Row horizontal="between" vertical="center" fillWidth>
                    <Heading variant="heading-strong-m" onBackground="neutral-strong">Support the creator</Heading>
                    <Row gap="8">
                       <Button
                          onClick={handleCurrencyToggle}
                          variant="secondary"
                          size="s"
                          prefixIcon="chevronRight"
                       >
                          Switch to {currency === "USD" ? "IDR" : "USD"}
                       </Button>
                       <IconButton icon="close" size="s" variant="ghost" onClick={() => setIsModalOpen(false)} />
                    </Row>
                  </Row>
                  
                  <Column gap="20" fillWidth>
                    <Row gap="8" wrap>
                        {["5", "10", "25", "50"].map((val) => {
                          const usdVal = Number.parseInt(val);
                          const rate = getExchangeRate();
                          const amountInCurrency = currency === "IDR" ? usdVal * rate : usdVal;
                          const rawDonation = Number.parseFloat(donationAmount.replace(/[^0-9.]/g, "")) || 0;
                          const isActive = Math.round(rawDonation) === Math.round(amountInCurrency);

                          return (
                            <Button
                              key={val}
                              variant={isActive ? "primary" : "secondary"}
                              onClick={() => setDonationAmount(amountInCurrency.toString())}
                              size="s"
                            >
                              {formatCurrency(usdVal, currency)}
                            </Button>
                          );
                        })}
                    </Row>
                    
                    <Input
                      id="modal-amount"
                      label="Custom Amount"
                      prefix={currency === "IDR" ? "Rp" : "$"}
                      value={formatPriceInput(donationAmount, currency)}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const raw = e.target.value.replace(/[^0-9]/g, "");
                        setDonationAmount(raw);
                      }}
                    />
                    
                    <Input
                      id="modal-name"
                      label="Your Name"
                      placeholder="Anonymous"
                      value={supporterName}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setSupporterName(e.target.value)}
                    />
                    
                    <Textarea
                      id="modal-message"
                      label="Message"
                      placeholder="Optional message..."
                      value={supporterMessage}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setSupporterMessage(e.target.value)}
                    />

                    <Button
                      href={`https://ko-fi.com/mintgyaa?amount=${donationAmount}`}
                      variant="primary"
                      size="l"
                      fillWidth
                      prefixIcon="heart"
                    >
                      Support {formatCurrency(Number.parseFloat(donationAmount.replace(/[^0-9.]/g, "")) || 0, currency, false)}
                    </Button>

                    <Column gap="12">
                       <Text variant="label-strong-s" align="center">Or via platforms</Text>
                       <Row gap="8" wrap horizontal="center">
                          {community.donationPlatforms?.map((p) => (
                            <Button
                              key={p.name}
                              href={p.link}
                              variant="secondary"
                              size="s"
                              style={{ borderColor: p.color, color: p.color }}
                            >
                              {p.name}
                            </Button>
                          ))}
                       </Row>
                    </Column>
                  </Column>
                </Column>
              </Card>
            </div>
          </RevealFx>
        </Flex>
      )}
    </Column>
  );
}
