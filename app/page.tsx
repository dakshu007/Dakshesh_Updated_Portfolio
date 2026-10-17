import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { profilePageSchema, productListSchema, faqSchema } from "@/lib/jsonld";
import { homeFaqs } from "@/lib/faq";
import Hero from "@/components/Hero";
import LogoStrip from "@/components/LogoStrip";
import ProductCarousel from "@/components/ProductCarousel";
import BillZapLive from "@/components/BillZapLive";
import Results from "@/components/Results";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Hire from "@/components/Hire";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd schema={[profilePageSchema(), productListSchema(), faqSchema(homeFaqs)]} />
      <Hero />
      <LogoStrip />
      <ProductCarousel />
      <BillZapLive />
      <Results />
      <Work />
      <Experience />
      <Skills />
      <Hire />
      <Faq
        title={
          <>
            Quick answers about <span className="serif-em text-gradient">Dakshesh B.</span>
          </>
        }
        items={homeFaqs}
      />
      <Contact />
    </>
  );
}
