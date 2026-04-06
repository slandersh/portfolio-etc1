"use client";

import { useState, useMemo, useEffect, type ChangeEvent, type MouseEvent } from "react";
import {
  Heading,
  Text,
  Column,
  Row,
  Media,
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
  Select,
  DateInput,
  Grid,
} from "@once-ui-system/core";
import { store, baseURL, person, about } from "@/resources";
import StoreSidebar from "@/components/store/StoreSidebar";
import type { Product } from "@/types";
import { detectCurrency, formatCurrency, formatPriceInput, getBudgetPlaceholder, getExchangeRate, type Currency } from "@/utils/currency";

interface StoreContentProps {
  products: Product[];
}

export default function StoreContent({ products }: StoreContentProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currency, setCurrency] = useState<Currency>("USD");
  
  // === State Permintaan Layanan ===
  const [serviceType, setServiceType] = useState("Web Development");
  const [projectTitle, setProjectTitle] = useState("");
  const [requestBudget, setRequestBudget] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);
  const [organization, setOrganization] = useState("");
  const [additionalLinks, setAdditionalLinks] = useState("");

  // Menangani pergantian mata uang dan mengkonversi nilai yang ada
  const handleCurrencyToggle = () => {
    const newCurrency: Currency = currency === "USD" ? "IDR" : "USD";
    const rate = getExchangeRate();

    // Konversi Anggaran Permintaan Layanan
    const budgetNum = Number.parseFloat(requestBudget.replace(/[^0-9.]/g, "").replace(/\./g, ""));
    if (!Number.isNaN(budgetNum) && budgetNum > 0) {
      const converted = newCurrency === "IDR" ? Math.round(budgetNum * rate) : Math.round(budgetNum / rate);
      setRequestBudget(converted.toString());
    }

    setCurrency(newCurrency);
  };

  const serviceOptions = [
    { label: "Web Development", value: "Web Development" },
    { label: "UI/UX Design", value: "UI/UX Design" },
    { label: "AI Solution", value: "AI Solution" },
    { label: "Consultation", value: "Consultation" },
    { label: "Other", value: "Other" },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product: Product) => {
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, products]);

  const handleCopyLink = (title: string) => {
    const url = `${typeof window !== "undefined" ? window.location.origin : ""}${store.path}?item=${encodeURIComponent(title)}`;
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrency(detectCurrency());
      const params = new URLSearchParams(window.location.search);
      const item = params.get("item");
      if (item) {
        // Cari di props products, bukan di store.products statis yang sudah kosong
        const product = products.find(p => p.title === item);
        if (product?.details) {
          setSelectedProduct(product);
        }
      }
    }
  }, [products]);

  return (
    <Column maxWidth="m" fillWidth gap="xl" paddingY="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={store.title}
        description={store.description}
        path={store.path}
        image={`/api/og/generate?title=${encodeURIComponent(store.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      
      <StoreSidebar 
        categories={store.categories} 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory}
        currency={currency}
        onCurrencyToggle={handleCurrencyToggle}
      />

      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center" gap="16">
          <RevealFx translateY="4">
            <Heading variant="display-strong-l" align="center" style={{ textAlign: "center", width: "100%" }}>{store.title}</Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2}>
            <Text variant="heading-default-xl" onBackground="neutral-weak" align="center">
              {store.description}
            </Text>
          </RevealFx>
        </Column>
        
        {activeCategory !== "Request" && (
          <RevealFx translateY="12" delay={0.4}>
            <Column fillWidth horizontal="center" marginTop="32" paddingX="m">
              <Row 
                maxWidth="s" 
                fillWidth 
                vertical="center" 
                gap="12"
                background="surface" 
                radius="full" 
                paddingX="20" 
                border="neutral-alpha-weak"
                style={{ 
                  height: "56px", 
                }}
              >
                <Icon name="search" size="s" onBackground="neutral-weak" />
                <input
                  id="search-products"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  style={{ 
                    border: "none", 
                    background: "transparent",
                    boxShadow: "none",
                    height: "100%",
                    flex: 1,
                    color: "inherit",
                    outline: "none",
                    fontFamily: "inherit",
                    fontSize: "1rem"
                  }}
                />
                {searchQuery && (
                  <IconButton
                    icon="close"
                    size="s"
                    variant="ghost"
                    onClick={() => setSearchQuery("")}
                  />
                )}
              </Row>
            </Column>
          </RevealFx>
        )}


      {/* Request Section */}
      {activeCategory === "Request" && (
        <RevealFx translateY="16" delay={0.5} fillWidth>
          <Column gap="24" fillWidth>
            <Card
              fillWidth
              padding="32"
              s={{ padding: "16" }}
              gap="32"
              background="surface"
              border="brand-alpha-strong"
              radius="l"
              style={{
                backdropFilter: "blur(12px)",
                borderWidth: "1px",
                borderStyle: "solid",
                boxShadow: "0 20px 40px rgba(var(--brand-rgb), 0.1)",
                maxWidth: "800px",
                margin: "0 auto",
                overflow: "hidden"
              }}
            >
              <Column gap="40" fillWidth>
                <Column gap="16" horizontal="center" style={{ textAlign: "center" }}>
                  <Tag variant="brand" size="l">Service Request</Tag>
                  <Heading variant="display-strong-xs">Custom Project or Service</Heading>
                  <Text variant="body-default-m" onBackground="neutral-weak">
                    Tell me about your project in detail. I'll review your requirements and get back to you shortly via your preferred channel.
                  </Text>
                  
                  <Row gap="24" wrap marginTop="8" horizontal="center">
                    <Row gap="8" vertical="center">
                      <Icon name="email" size="s" onBackground="brand-weak" />
                      <Text variant="body-default-s">Email Response</Text>
                    </Row>
                    <Row gap="8" vertical="center">
                      <Icon name="message" size="s" onBackground="brand-weak" />
                      <Text variant="body-default-s">WhatsApp Direct</Text>
                    </Row>
                  </Row>
                </Column>

                <Column 
                  gap="32" 
                  background="neutral-alpha-weak" 
                  padding="32" 
                  s={{ padding: "16" }}
                  radius="l" 
                  border="neutral-alpha-weak"
                  fillWidth
                >
                  <Column gap="24" fillWidth>
                    {/* Tipe Layanan & Organisasi */}
                    <Column gap="24" fillWidth>
                      <Select
                        id="service-type"
                        label="Service Type"
                        options={serviceOptions}
                        value={serviceType}
                        onSelect={(value) => setServiceType(value)}
                        fillWidth
                      />
                      <Input
                        id="request-org"
                        label="Organization / Company"
                        placeholder="Your Company Name"
                        value={organization}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setOrganization(e.target.value)}
                      />
                    </Column>

                    {/* Judul Proyek & Anggaran */}
                    <Column gap="24" fillWidth>
                      <Input
                        id="request-title"
                        label="Project Title"
                        placeholder="e.g., Custom Portfolio or Software Project"
                        value={projectTitle}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setProjectTitle(e.target.value)}
                      />
                      <Input
                        id="request-budget"
                        label="Estimated Budget"
                        placeholder={getBudgetPlaceholder(currency)}
                        prefix={currency === "IDR" ? "Rp" : "$"}
                        value={requestBudget}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const val = formatPriceInput(e.target.value, currency);
                          setRequestBudget(val);
                        }}
                      />
                    </Column>
                    
                    {/* Tenggat Waktu & Tautan Referensi */}
                    <Column gap="24" fillWidth>
                      <DateInput
                        id="request-deadline"
                        label="Project Deadline"
                        value={deadline}
                        onChange={(date) => setDeadline(date)}
                      />
                      <Input
                        id="request-links"
                        label="Relevant Links / References"
                        placeholder="Link to project info or inspiration"
                        value={additionalLinks}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setAdditionalLinks(e.target.value)}
                      />
                    </Column>
                    
                    {/* Detail Proyek - Area Teks Besar */}
                    <Textarea
                      id="request-details"
                      label="Project Details & Requirements"
                      placeholder="Please describe your requirements in detail..."
                      value={projectDetails}
                      rows={6}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setProjectDetails(e.target.value)}
                    />

                    <Column gap="12" fillWidth marginTop="16">
                      <Button
                        variant="primary"
                        size="l"
                        fillWidth
                        prefixIcon="share"
                        onClick={() => {
                           // Logika Kirim via Email
                           const subject = encodeURIComponent(`[${serviceType}] Request: ${projectTitle}`);
                           const body = encodeURIComponent(
                            `Service: ${serviceType}\nOrganization: ${organization}\nProject: ${projectTitle}\nBudget: ${formatCurrency(Number.parseFloat(requestBudget) || 0, currency)}\nDeadline: ${deadline?.toLocaleDateString() || "Not specified"}\nLinks: ${additionalLinks}\nDetails: ${projectDetails}`
                          );
                          const mailtoUrl = `mailto:${person.email}?subject=${subject}&body=${body}`;
                          
                          // Logika Kirim via WhatsApp
                          const whatsappText = encodeURIComponent(
                            `*New Service Request*\n\n*Service*: ${serviceType}\n*Org*: ${organization}\n*Project*: ${projectTitle}\n*Budget*: ${formatCurrency(Number.parseFloat(requestBudget) || 0, currency)}\n*Deadline*: ${deadline?.toLocaleDateString() || "Not specified"}\n*Details*: ${projectDetails}`
                          );
                          const whatsappUrl = `https://wa.me/${store.whatsappNumber}?text=${whatsappText}`;

                          // Buka keduanya: email langsung, WhatsApp setelah jeda singkat
                          window.location.href = mailtoUrl;
                          setTimeout(() => {
                            window.open(whatsappUrl, '_blank');
                          }, 500);
                        }}
                      >
                        Send via Both (Email & WhatsApp)
                      </Button>
                      <Row gap="16" fillWidth wrap s={{ direction: "column" }}>
                        <Button
                          variant="secondary"
                          size="l"
                          fillWidth
                          prefixIcon="email"
                          onClick={() => {
                            const subject = encodeURIComponent(`[${serviceType}] Request: ${projectTitle}`);
                            const body = encodeURIComponent(
                              `Service: ${serviceType}\nOrganization: ${organization}\nProject: ${projectTitle}\nBudget: ${formatCurrency(Number.parseFloat(requestBudget) || 0, currency)}\nDeadline: ${deadline?.toLocaleDateString() || "Not specified"}\nLinks: ${additionalLinks}\nDetails: ${projectDetails}`
                            );
                            window.location.href = `mailto:${person.email}?subject=${subject}&body=${body}`;
                          }}
                        >
                          Email Only
                        </Button>
                        <Button
                          variant="secondary"
                          size="l"
                          fillWidth
                          prefixIcon="message"
                          onClick={() => {
                            const text = encodeURIComponent(
                              `*New Service Request*\n\n*Service*: ${serviceType}\n*Org*: ${organization}\n*Project*: ${projectTitle}\n*Budget*: ${formatCurrency(Number.parseFloat(requestBudget) || 0, currency)}\n*Deadline*: ${deadline?.toLocaleDateString() || "Not specified"}\n*Details*: ${projectDetails}`
                            );
                            window.open(`https://wa.me/${store.whatsappNumber}?text=${text}`, '_blank');
                          }}
                        >
                          WhatsApp Only
                        </Button>
                      </Row>
                    </Column>
                  </Column>
                </Column>
              </Column>
            </Card>
          </Column>
        </RevealFx>
      )}

      {/* Grid Produk */}
      {activeCategory !== "Request" && (
        <Column fillWidth gap="l" marginTop="32">
          {filteredProducts.length > 0 ? (
            <Grid columns="3" s={{ columns: 1 }} m={{ columns: 2 }} gap="24" fillWidth>
              {filteredProducts.map((product, index) => (
                <RevealFx 
                  key={product.title} 
                  translateY="16" 
                  delay={index * 0.1}
                  fillWidth
                >
                  <Card 
                    fillWidth
                    padding="16"
                    gap="12"
                    style={{ 
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      cursor: product.details ? "pointer" : "default",
                    }}
                    className="product-card"
                    onClick={() => product.details && setSelectedProduct(product)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        if (product.details) setSelectedProduct(product);
                      }
                    }}
                    tabIndex={product.details ? 0 : -1}
                  >
                    {product.image && (
                      <div style={{ position: "relative", width: "100%" }}>
                        <Media
                          src={product.image}
                          alt={product.title}
                          aspectRatio="16/9"
                          radius="m"
                        />
                        {product.tag && (
                          <div style={{ position: "absolute", top: "12px", right: "12px" }}>
                            <Tag variant="brand" size="s">{product.tag}</Tag>
                          </div>
                        )}
                      </div>
                    )}
                    <Column gap="8" flex={1}>
                      <Row horizontal="between" vertical="center">
                        <Heading variant="heading-strong-m">{product.title}</Heading>
                        {product.badge && (
                          <Tag variant="neutral" size="s">{product.badge}</Tag>
                        )}
                      </Row>
                      <Text variant="body-default-s" onBackground="neutral-weak">
                        {product.description}
                      </Text>
                      <Row horizontal="between" vertical="center" style={{ marginTop: "auto", paddingTop: "12px" }}>
                        <Text variant="label-strong-m" onBackground="brand-weak">
                          {product.price && product.price !== "Free"
                            ? formatCurrency(Number.parseFloat(product.price.replace(/[^0-9.]/g, "")), currency)
                            : product.price || "Free"}
                        </Text>
                        <Row gap="8">
                          <Flex>
                            <IconButton
                              icon="share"
                              size="s"
                              variant="ghost"
                              onClick={(e: MouseEvent) => {
                                e.stopPropagation();
                                handleCopyLink(product.title);
                              }}
                            />
                          </Flex>
                          <Flex>
                            <Button
                              href={product.link}
                              variant="secondary"
                              size="s"
                              suffixIcon="arrowUpRight"
                              onClick={(e: MouseEvent) => e.stopPropagation()}
                            >
                              {product.category === "Affiliate" ? "View" : "Get"}
                            </Button>
                          </Flex>
                        </Row>
                      </Row>
                    </Column>
                  </Card>
                </RevealFx>
              ))}
            </Grid>
          ) : (
            <Column fillWidth horizontal="center" paddingY="64" gap="16">
              <Icon name="search" size="xl" onBackground="neutral-weak" />
              <Text variant="body-default-m" onBackground="neutral-weak">
                No products found matching your search.
              </Text>
              <Button variant="secondary" onClick={() => setSearchQuery("")}>
                Clear search
              </Button>
            </Column>
          )}
        </Column>
      )}
    </Column>

    {/* Modal Detail Produk */}
    {selectedProduct && (
      <Flex
        position="fixed"
        top="0"
        left="0"
        fillWidth
        fillHeight
        zIndex={10}
        horizontal="center"
        vertical="center"
        padding="l"
        style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(10px)" }}
        onClick={() => setSelectedProduct(null)}
        onKeyDown={(e) => {
          if (e.key === "Escape" || e.key === "Enter") {
            setSelectedProduct(null);
          }
        }}
        tabIndex={0}
      >
        <div 
          onClick={(e) => e.stopPropagation()} 
          onKeyDown={(e) => e.stopPropagation()}
          role="presentation"
          style={{ width: "100%", maxWidth: "1000px", display: "flex", justifyContent: "center", position: "relative" }}
        >
          <RevealFx translateY="24" fillWidth>
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <Card
                fillWidth
                padding="32"
                gap="32"
                background="surface"
                radius="l"
                style={{ maxHeight: "90vh", overflowY: "auto", position: "relative" }}
              >
              {/* Tombol Tutup Modal: posisi absolut sudut kanan atas */}
              <div style={{ position: "absolute", top: "16px", right: "16px", zIndex: 11 }}>
                <IconButton icon="close" variant="ghost" onClick={() => setSelectedProduct(null)} />
              </div>

              <Row gap="32" wrap vertical="start">
                <Column flex={6} gap="16">
                  <Media
                    src={selectedProduct.image || ""}
                    alt={selectedProduct.title}
                    aspectRatio="16/9"
                    radius="m"
                  />
                  {selectedProduct.details?.images && (
                    <Row gap="8" wrap>
                      {selectedProduct.details.images.map((img) => (
                        <div key={img} style={{ width: "calc(33.33% - 6px)" }}>
                          <Media 
                            src={img} 
                            alt={selectedProduct.title} 
                            aspectRatio="1/1" 
                            radius="s" 
                          />
                        </div>
                      ))}
                    </Row>
                  )}
                </Column>

                <Column flex={4} gap="24">
                  <Column gap="12">
                    <Column gap="4">
                      <Heading variant="display-strong-xs">{selectedProduct.title}</Heading>
                      <Row>
                        <Tag variant="neutral" size="s">{selectedProduct.category}</Tag>
                      </Row>
                    </Column>
                    <Text variant="heading-default-l" onBackground="brand-weak">
                      {selectedProduct.price && selectedProduct.price !== "Free"
                        ? formatCurrency(Number.parseFloat(selectedProduct.price.replace(/[^0-9.]/g, "")), currency)
                        : selectedProduct.price || "Free"}
                    </Text>
                  </Column>
                  
                  <Text variant="body-default-m" onBackground="neutral-weak">
                    {selectedProduct.details?.longDescription || selectedProduct.description}
                  </Text>

                  {selectedProduct.details?.features && (
                    <Column gap="12">
                      <Text variant="label-strong-m">Key Features</Text>
                      {selectedProduct.details.features.map((f) => (
                        <Row key={f} gap="12" vertical="center">
                          <Icon name="chevronRight" size="xs" onBackground="brand-weak" />
                          <Text variant="body-default-s">{f}</Text>
                        </Row>
                      ))}
                    </Column>
                  )}

                  <Row gap="16" marginTop="12">
                    <Flex fillWidth>
                      <Button
                        href={selectedProduct.link}
                        variant="primary"
                        fillWidth
                        size="l"
                        suffixIcon="arrowUpRight"
                      >
                        {selectedProduct.category === "Affiliate" ? "Purchase" : "Get It Now"}
                      </Button>
                    </Flex>
                    <Flex>
                      <IconButton
                        variant="secondary"
                        size="l"
                        onClick={() => handleCopyLink(selectedProduct.title)}
                        icon="share"
                      />
                    </Flex>
                  </Row>
                </Column>
              </Row>
            </Card>
          </div>
        </RevealFx>
        </div>
      </Flex>
    )}
  </Column>
);
}
