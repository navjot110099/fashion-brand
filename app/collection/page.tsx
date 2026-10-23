import type { Metadata } from "next";
import { CollectionHero } from "@/components/collection/CollectionHero";
import { ProductGrid } from "@/components/collection/ProductGrid";
import { Lookbook } from "@/components/collection/Lookbook";
import { ShopCta } from "@/components/collection/ShopCta";
import { unsplash } from "@/lib/utils";

const description =
  "Shop Nocturne, Maison Noir's Autumn–Winter 2026 collection: silk velvet dresses, satin gowns, Biella wool tailoring and leather goods — with materials, colours and the full lookbook.";

export const metadata: Metadata = {
  title: "Nocturne — Collection & Lookbook",
  description,
  alternates: { canonical: "/collection" },
  openGraph: {
    title: "Nocturne AW26 — Maison Noir",
    description,
    url: "/collection",
    images: [{ url: unsplash("1771072428365-f0f97d0d25b7", 1200, 630), width: 1200, height: 630, alt: "Nocturne lookbook — pinstripe suit against amber wood" }],
  },
};

export default function CollectionPage() {
  return (
    <>
      <CollectionHero />
      <ProductGrid />
      <Lookbook />
      <ShopCta />
    </>
  );
}
