import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { profilePageSchema } from "@/lib/jsonld";
import ScrollAnimations from "@/components/ScrollAnimations";
import Hero from "@/components/Hero";
import LogoStrip from "@/components/LogoStrip";
import ProductsStrip from "@/components/ProductsStrip";
import Work from "@/components/Work";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Metrics from "@/components/Metrics";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd schema={profilePageSchema()} />
      <ScrollAnimations />
      <Hero />
      <LogoStrip />
      <ProductsStrip />
      <Work />
      <About />
      <Skills />
      <Experience />
      <Metrics />
      <Contact />
    </>
  );
}
