/**
 * Per-product page content. Grounded in each product's live site.
 * No em dashes or en dashes anywhere; Indian English throughout.
 */

export type ProductFeature = { title: string; desc: string };

export type ProductContent = {
  tagline: string;
  overview: string;
  features: ProductFeature[];
  whoFor: string;
  category: string;
  metaTitle: string;
  metaDescription: string;
  schemaType: "SoftwareApplication" | "WebApplication" | "MobileApplication";
  applicationCategory: string;
  platform: string;
};

export const productContent: Record<string, ProductContent> = {
  billzap: {
    tagline: "Bill with your voice, in your language, GST ready.",
    overview:
      "BillZap is a free GST billing app built for small businesses in India. Shop owners create GST-compliant invoices by speaking instead of typing, with the app handling tax, payment codes and sharing automatically. It is designed to work in everyday Indian languages and to keep running even without a network connection.",
    whoFor:
      "Small Indian business owners such as kirana stores, restaurants, hardware shops, salons, tailors, wholesalers and pharmacies who want fast billing without manual data entry.",
    category: "Android app",
    platform: "Android",
    schemaType: "MobileApplication",
    applicationCategory: "BusinessApplication",
    metaTitle: "BillZap GST Billing App for Indian Business | Dakshesh B",
    metaDescription:
      "BillZap is a free GST billing app for Indian small businesses. Create voice invoices in your own language, apply GST automatically and share bills on WhatsApp.",
    features: [
      { title: "Voice billing", desc: "Speak the order and BillZap turns it into a ready invoice in seconds, no typing needed." },
      { title: "Multilingual input", desc: "Works across several Indian languages including Hindi, Tamil, Telugu and Kannada, with mixed language support." },
      { title: "Automatic GST", desc: "Applies CGST, SGST and IGST with HSN code classification so every bill stays GST compliant." },
      { title: "UPI QR payments", desc: "Each invoice carries a scannable UPI code so customers can pay on the spot." },
      { title: "Offline and WhatsApp ready", desc: "Runs fully offline with local storage, and shares PDFs and payment links over WhatsApp in one tap." },
    ],
  },
  shrinkto: {
    tagline: "Compress JPG, PNG and WebP to an exact file size, in your browser.",
    overview:
      "Shrinkto is a free, browser-based image compressor for JPG, PNG and WebP. Instead of guessing with a quality slider, you set a target file size and the tool compresses to hit it. Everything runs locally in your browser, so your images are never uploaded to a server.",
    whoFor:
      "People who need an image to fit a strict size limit, such as exam and passport applicants, web developers optimising page weight, and anyone sharing files over WhatsApp, email or social media.",
    category: "Web app",
    platform: "Web",
    schemaType: "WebApplication",
    applicationCategory: "MultimediaApplication",
    metaTitle: "Shrinkto Image Compressor for JPG, PNG, WebP | Dakshesh B",
    metaDescription:
      "Shrinkto is a free browser based image compressor that shrinks JPG, PNG and WebP to an exact file size. It runs locally so your photos never leave your device.",
    features: [
      { title: "Exact size targeting", desc: "Type a target like 50 KB or 100 KB and a binary search converges on that file size automatically." },
      { title: "Local, private processing", desc: "Compression happens in your browser using the Canvas API and WebAssembly, so no uploads, servers or accounts are involved." },
      { title: "Batch compression", desc: "Drop multiple files at once and compress them together, with no daily limits or file caps." },
      { title: "Wide format support", desc: "Accepts JPG, PNG, WebP and more as input, and works across phones, tablets and desktops." },
      { title: "Built-in presets", desc: "Includes ready-made presets for Indian government exam uploads and passport photo specifications across many countries." },
    ],
  },
  "spacing-inspector": {
    tagline: "See margins and padding the moment you hover.",
    overview:
      "Spacing Inspector is a free Chrome extension that shows CSS spacing right on the page. Hover over any element and it reads the live margin and padding, then draws a colour coded overlay with exact pixel values for all four sides. You get the box model at a glance without opening developer tools.",
    whoFor:
      "Frontend developers and designers who need to check spacing and debug layouts quickly on real websites.",
    category: "Chrome extension",
    platform: "Chrome",
    schemaType: "WebApplication",
    applicationCategory: "DeveloperApplication",
    metaTitle: "Spacing Inspector Chrome Extension | Dakshesh B",
    metaDescription:
      "Spacing Inspector is a free Chrome extension that shows CSS margins and padding on hover, with colour coded overlays and exact pixel values for fast layout debugging.",
    features: [
      { title: "Hover to measure", desc: "Move your mouse over any element to instantly read its margin and padding in pixels." },
      { title: "Colour coded overlay", desc: "Margins show in one colour and padding in another, so the box model is easy to read at a glance." },
      { title: "Four side readings", desc: "Displays exact values for top, right, bottom and left for every element you inspect." },
      { title: "Works everywhere", desc: "Runs on any website with no setup, using the browser's native getComputedStyle API." },
      { title: "Responsive debugging", desc: "Measurements update live as you resize the browser, so you can check spacing across breakpoints." },
    ],
  },
  focuslens: {
    tagline: "See where your browsing time actually goes.",
    overview:
      "FocusLens is a free Chrome extension that automatically tracks how much time you spend on every website and groups those sites into categories like Productivity, AI, Social and Entertainment. It runs entirely on your device, with no server backend, so your browsing data stays local. A built-in Focus Mode blocks distracting sites, and daily goals with streaks help you build better habits.",
    whoFor:
      "Remote and hybrid workers, students and researchers, freelancers, and solo builders who want an honest, private picture of how they spend time online.",
    category: "Chrome extension",
    platform: "Chrome",
    schemaType: "WebApplication",
    applicationCategory: "DeveloperApplication",
    metaTitle: "FocusLens Chrome Productivity Tracker | Dakshesh B",
    metaDescription:
      "FocusLens is a free, privacy first Chrome extension that tracks website time, auto categorises sites, blocks distractions with Focus Mode, and sets daily goals.",
    features: [
      { title: "Automatic time tracking", desc: "Records time spent on every website with hourly breakdowns, and idle detection pauses tracking when you step away." },
      { title: "Smart categorisation", desc: "Auto groups sites into Productivity, AI, Social, Entertainment, News and Shopping, with support for custom categories." },
      { title: "Focus Mode", desc: "A one-click distraction blocker that redirects sites you choose to a motivational page so you can stay on task." },
      { title: "Goals and streaks", desc: "Set daily productive-time targets, track streaks, and watch your progress build over time." },
      { title: "Local-first with export", desc: "All data stays on your device, with day, week and all-time views plus JSON and CSV export." },
    ],
  },
  "eeat-analyser": {
    tagline: "Audit any page against Google E-E-A-T signals in one click.",
    overview:
      "EEAT Analyser is a free Chrome extension that audits a web page against Google's E-E-A-T framework, covering experience, expertise, authoritativeness and trust. It scores the page out of 100 across E-E-A-T, technical SEO, content, meta tags and social signals, then explains exactly what to fix. Each issue comes with a priority, an SEO impact rating and step by step instructions with code examples.",
    whoFor:
      "Content creators, SEO professionals, developers and business owners who want a clear E-E-A-T and on-page audit without leaving the browser.",
    category: "Chrome extension",
    platform: "Chrome",
    schemaType: "WebApplication",
    applicationCategory: "DeveloperApplication",
    metaTitle: "EEAT Analyser: Google E-E-A-T SEO Audit Tool | Dakshesh B",
    metaDescription:
      "EEAT Analyser is a free Chrome extension that audits any page against Google E-E-A-T signals, scores it out of 100, and gives step by step fixes for SEO.",
    features: [
      { title: "E-E-A-T scoring", desc: "Evaluates first-hand experience signals, author credentials, external citations, and security and transparency indicators." },
      { title: "Technical SEO audit", desc: "Checks HTTPS, canonical tags, viewport settings, language attributes and international SEO elements on the page." },
      { title: "Content and meta analysis", desc: "Measures word count, keyword density and heading hierarchy, and validates title, description, Open Graph and Twitter card data." },
      { title: "Actionable fixes", desc: "Surfaces each issue with a priority level, an SEO impact rating and step by step instructions that include code examples." },
      { title: "Exportable reports", desc: "Generates CSV, JSON and PDF reports with an analysis history so you can track progress over time." },
    ],
  },
  designlock: {
    tagline: "Build it once. Keep it perfect.",
    overview:
      "DesignLock is a free WordPress plugin that protects a site's design system after launch. It captures a baseline of your design tokens, colours, fonts, spacing, global styles and plugin versions, then scans against that baseline to catch any drift. When something changes, it tells you what changed, when, and how serious it is, so the site stays true to the original build.",
    whoFor:
      "Freelancers, agencies, care-plan developers and site owners who want to stop unintended design changes from creeping into a WordPress site after handover.",
    category: "WordPress plugin",
    platform: "WordPress",
    schemaType: "WebApplication",
    applicationCategory: "DeveloperApplication",
    metaTitle: "DesignLock WordPress Design Drift Plugin | Dakshesh B",
    metaDescription:
      "DesignLock is a free WordPress plugin that locks your design system, snapshots design tokens and detects drift so your site stays true to the original build.",
    features: [
      { title: "Design baseline snapshots", desc: "Captures a fingerprint of your colours, fonts, spacing tokens, global styles and plugin versions as the reference point." },
      { title: "Drift detection", desc: "Scans against the baseline and flags every change by severity, with details on what moved and where." },
      { title: "Design health score", desc: "A single score from 0 to 100 that tracks design system stability across recent scans at a glance." },
      { title: "Client lock mode", desc: "Freezes specific design tokens so clients can still publish and edit content without breaking the locked design." },
      { title: "Scan history and logs", desc: "Keeps timestamped records of every change for auditing, troubleshooting and clear client reporting." },
    ],
  },
  "melody-flow": {
    tagline: "A clean, offline music player for Android that respects your privacy.",
    overview:
      "Melody Flow is an offline music player for Android, built with Flutter and Dart. It plays your local library with no ads and no internet, and adds a 10-band equaliser, synced lyrics, gapless playback and a home-screen widget. The app collects no data, so your listening stays on your device.",
    whoFor:
      "Android listeners who keep their own music files and want an ad-free, offline player with no tracking.",
    category: "Android app",
    platform: "Android",
    schemaType: "MobileApplication",
    applicationCategory: "MultimediaApplication",
    metaTitle: "Melody Flow Offline Android Music Player | Dakshesh B",
    metaDescription:
      "Melody Flow is an offline music player for Android with a 10-band equaliser, synced lyrics, gapless playback and a home-screen widget. No ads, no tracking.",
    features: [
      { title: "10-band equaliser", desc: "Shape your sound with a 10-band equaliser and presets for bass boost, rock, jazz, classical, hip-hop and electronic." },
      { title: "Synced lyrics", desc: "Lyrics scroll in time with the track, with support for .lrc files alongside your music." },
      { title: "Gapless playback", desc: "Tracks flow into each other without a pause, plus a sleep timer and speed and pitch control." },
      { title: "Broad format support", desc: "Plays MP3, FLAC, WAV, AAC, OGG, M4A and OPUS files straight from your device." },
      { title: "Home-screen widget and themes", desc: "Control playback from a home-screen widget and pick light, dark, AMOLED or Material You themes." },
    ],
  },
  "image-size-inspector": {
    tagline: "Inspect any image size instantly, right from the page.",
    overview:
      "Image Size Inspector is a free Manifest V3 Chrome extension that reports image properties without opening developer tools. Right-click any image on any webpage and it shows the original dimensions, the rendered display size, the file size and the format in a clean popup. All processing happens locally in the browser, so no image data leaves the machine.",
    whoFor:
      "Web developers, designers and digital professionals who need quick image metadata without digging through browser developer tools.",
    category: "Chrome extension",
    platform: "Chrome",
    schemaType: "SoftwareApplication",
    applicationCategory: "DeveloperApplication",
    metaTitle: "Image Size Inspector, Chrome Image Tool | Dakshesh B",
    metaDescription:
      "Image Size Inspector is a free Chrome extension that reports image dimensions, file size and format with one right-click. Detects nine or more formats, all local.",
    features: [
      { title: "One-click inspection", desc: "Right-click any image and pick Inspect Image Size from the context menu to see its details in a popup." },
      { title: "Dimensions side by side", desc: "Shows the original image dimensions next to the rendered display size so layout mismatches are easy to spot." },
      { title: "File size analysis", desc: "Calculates file size using multiple fallback methods, including images served from a CDN." },
      { title: "Wide format detection", desc: "Recognises nine or more formats including JPEG, PNG, WebP, GIF, SVG, BMP, ICO, AVIF and TIFF." },
      { title: "Accessibility and colour tools", desc: "Surfaces alt text, title and ARIA labels for SEO and a11y audits, plus a colour picker and palette extraction." },
    ],
  },
};

export function getProductContent(slug: string): ProductContent | undefined {
  return productContent[slug];
}
