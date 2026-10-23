import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Statement } from "@/components/home/Statement";
import { NewCollection } from "@/components/home/NewCollection";
import { FeaturedLooks } from "@/components/home/FeaturedLooks";
import { Philosophy } from "@/components/home/Philosophy";
import { Campaign } from "@/components/home/Campaign";
import { Journal } from "@/components/home/Journal";
import { Appointments } from "@/components/home/Appointments";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <NewCollection />
      <FeaturedLooks />
      <Philosophy />
      <Campaign />
      <Journal />
      <Appointments />
    </>
  );
}
