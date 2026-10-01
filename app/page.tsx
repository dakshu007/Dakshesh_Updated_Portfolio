import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { profilePageSchema } from "@/lib/jsonld";
import ScrollAnimations from "@/components/ScrollAnimations";
import Hero from "@/components/Hero";
import LogoStrip from "@/components/LogoStrip";
import SaasSpotlight from "@/components/SaasSpotlight";
import ProductsStrip from "@/components/ProductsStrip";
import Work from "@/components/Work";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Metrics from "@/components/Metrics";
import Contact from "@/components/Contact";
import LiveResults from "@/components/LiveResults";
import Services from "@/components/Services";
import CtaBand from "@/components/CtaBand";
import { getAnalytics } from "@/lib/analytics";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const report = await getAnalytics();
  return (
    <>
      <JsonLd schema={profilePageSchema()} />
      <ScrollAnimations />
      <Hero report={report} />
      <LogoStrip />
      <LiveResults report={report} />
      <Services report={report} />
      <SaasSpotlight report={report} />
      <ProductsStrip report={report} />
      <Work report={report} />
      <About />
      <Skills />
      <Experience />
      <Metrics />
      <CtaBand />
      <Contact />
    </>
  );
}
