import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SITE_URL, person } from "@/lib/site";
import { personSchema, websiteSchema } from "@/lib/jsonld";
import JsonLd from "@/components/JsonLd";
import SkipLink from "@/components/SkipLink";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Analytics from "@/components/Analytics";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-3JWWGHRKZ2";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Dakshesh B - Frontend Web Developer | React, Next.js, JavaScript",
    template: "%s",
  },
  description:
    "Frontend web developer building fast, accessible, high-performance interfaces with React, Next.js and JavaScript. Shipping production web products and tools end to end.",
  applicationName: `${person.name} Portfolio`,
  // Explicit, stable favicon set (no content-hash query strings) so Google's
  // favicon crawler has a clear, correctly sized raster to pick up. Order:
  // .ico for legacy, scalable SVG for modern browsers, then 48/96/192 PNGs.
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
  keywords: [
    "Dakshesh",
    "Dakshesh B",
    "Dakshesh Web Developer",
    "Dakshesh Frontend Developer",
    "Dakshesh Web Engineer",
    "Dakshesh Flutter Developer",
    "Dakshesh Full Stack Developer",
    "Dakshesh portfolio",
    "frontend web developer",
    "React developer",
    "Next.js developer",
    "remote frontend developer",
    "frontend developer for hire",
    "React developer remote",
    "Flutter developer",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["en_GB", "en_IN"],
    url: SITE_URL,
    siteName: person.name,
    title:
      "Dakshesh B - Frontend Web Developer | React, Next.js, JavaScript",
    description:
      "Frontend web developer building fast, accessible, high-performance interfaces with React, Next.js and JavaScript. Shipping production web products and tools end to end.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dakshesh B - Frontend Web Developer",
    description:
      "Frontend web developer building fast, accessible, high-performance interfaces and shipping production web products end to end.",
  },
};

export const viewport: Viewport = {
  themeColor: "#1A53F0",
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
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans">
        <JsonLd schema={[personSchema(), websiteSchema()]} />
        <SkipLink />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <BackToTop />

        {/* Google Analytics (GA4). Loaded after hydration so it stays off the
            critical path. Pageviews are sent by the Analytics tracker on every
            route change, so config disables the automatic one. */}
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
