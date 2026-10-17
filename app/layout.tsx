import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SITE_URL, person } from "@/lib/site";
import { personSchema, websiteSchema, mykavoOrgSchema } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";
import SkipLink from "@/components/SkipLink";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import SmoothScroll from "@/components/SmoothScroll";
import Motion from "@/components/Motion";
import MobileDock from "@/components/MobileDock";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-3JWWGHRKZ2";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

const DEFAULT_TITLE =
  "Dakshesh B | Full-Stack Developer, Frontend Engineer and SEO Engineer in Bangalore";
const DEFAULT_DESCRIPTION =
  "Dakshesh B is a full-stack developer, frontend engineer and SEO engineer in Bangalore. Built MyKavo SaaS and BillZap (live on Google Play). Next.js, React, Node.js. Open to work.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: `${person.name} Portfolio`,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  authors: [{ name: person.name, url: SITE_URL }],
  creator: person.name,
  publisher: person.name,
  category: "technology",
  keywords: [
    "Dakshesh",
    "Dakshesh B",
    "Dakshesh B portfolio",
    "full stack developer Bangalore",
    "full stack developer Bengaluru",
    "frontend engineer Bangalore",
    "frontend developer Bangalore",
    "SEO engineer Bangalore",
    "technical SEO engineer Bangalore",
    "software developer Bangalore",
    "best software developer in Bangalore",
    "Next.js developer Bangalore",
    "React developer Bangalore",
    "hire full stack developer India",
    "MyKavo",
    "BillZap",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    types: {
      "text/plain": [
        { url: "/llms.txt", title: "LLM summary" },
        { url: "/llms-full.txt", title: "LLM full profile" },
      ],
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["en_US", "en_GB"],
    url: SITE_URL,
    siteName: person.name,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Dakshesh B | Full-Stack Developer in Bangalore",
    description: DEFAULT_DESCRIPTION,
  },
  other: {
    "geo.region": "IN-KA",
    "geo.placename": "Bengaluru",
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F8FA",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-IN"
      className={`${geist.variable} ${geistMono.variable} ${instrument.variable}`}
    >
      <body className="font-sans">
        <JsonLd schema={[personSchema(), websiteSchema(), mykavoOrgSchema()]} />
        <SkipLink />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileDock />
        <SmoothScroll />
        <Motion />

        {/* Google Analytics (GA4), after hydration and off the critical path. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { send_page_view: false });`}
        </Script>
        <Analytics />
      </body>
    </html>
  );
}
