import { Meta } from "@once-ui-system/core";
import { store, baseURL } from "@/resources";
import StoreContent from "@/components/store/StoreContent";
import { getPosts } from "@/utils/utils";

export async function generateMetadata() {
  return Meta.generate({
    title: store.title,
    description: store.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(store.title)}`,
    path: store.path,
  });
}

export default function StorePage() {
  const allProducts = getPosts(["src", "app", "store", "products"]);

  const products = allProducts.map((p) => ({
    title: p.metadata.title,
    description: p.metadata.summary,
    price: p.metadata.price,
    category: p.metadata.category || "Other",
    link: p.metadata.link || "#",
    image: p.metadata.image || "",
    tag: p.metadata.tag || "",
    badge: p.metadata.badge || "",
    details: {
      longDescription: p.content,
      images: p.metadata.images,
    }
  }));

  return <StoreContent products={products} />;
}
