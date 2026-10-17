/**
 * Per-product page content. Grounded in each product's live site and store
 * listing (crawled October 2026). FocusLens, DesignLock and Melody Flow are
 * earlier side projects and are intentionally left as they were.
 * No em dashes or en dashes anywhere; Indian English throughout.
 */

export type ProductFeature = { title: string; desc: string };
export type ProductFaq = { question: string; answer: string };
export type ProductStat = { value: string; label: string };
export type ProductPlatform = {
  name: string;
  status: "Live" | "By request" | "Coming soon" | "In testing";
  desc: string;
  href?: string;
};
export type ProductLink = { label: string; href: string };

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
  /** Overrides the primary CTA label, e.g. "Get it on Google Play". */
  ctaLabel?: string;
  /** Short pricing note shown in the At a glance card. */
  pricing?: string;
  /** schema.org Offer price and currency. */
  price?: { amount: string; currency: string };
  /** Headline numbers for the stat strip. */
  stats?: ProductStat[];
  /** Where the product runs (MyKavo). */
  platforms?: ProductPlatform[];
  /** What I built it with. */
  stack?: string[];
  /** My role and what was hard, for recruiters. */
  built?: string[];
  faqs?: ProductFaq[];
  links?: ProductLink[];
  /** Download / install URL for schema.org. */
  installUrl?: string;
};

export const productContent: Record<string, ProductContent> = {
  mykavo: {
    tagline: "Know what changed. Fix what matters. On every platform you work on.",
    overview:
      "MyKavo is a website change and regression monitoring SaaS, and the largest product I have designed, built and run end to end. You pick the pages that matter on every website you manage, MyKavo approves a known-good baseline of each, re-checks them around the clock and tells you the moment one changes, with before and after proof. It checks eight change categories on every scan: availability, visual, SEO, content, links, scripts, performance and conversion. Detection is fully deterministic, so there is no AI guesswork, and alerts are grouped and ranked by severity so you only hear about what matters. One MyKavo account works across the web app, a WordPress plugin, a Chrome extension, an MCP server for AI assistants, deploy hooks for CI and an Android app.",
    whoFor:
      "Agencies managing client websites, developers who want post-deploy regression checks, SEO teams protecting rankings, WordPress and WooCommerce maintenance businesses, and e-commerce owners guarding their checkout and conversion elements.",
    category: "SaaS platform",
    platform: "Web, WordPress, Chrome, Android",
    schemaType: "WebApplication",
    applicationCategory: "BusinessApplication",
    ctaLabel: "Try MyKavo free",
    pricing: "Free, Pro $20/mo, Agency $79/mo",
    price: { amount: "0", currency: "USD" },
    stats: [
      { value: "25", label: "active users in 3 months" },
      { value: "36.6K", label: "Google impressions" },
      { value: "5", label: "platforms live today" },
      { value: "7 min", label: "average visit" },
    ],
    platforms: [
      { name: "Web app", status: "Live", desc: "The home base at mykavo.app: baselines, before and after diffs, Site Audit, Search Console and client reports.", href: "https://mykavo.app/" },
      { name: "WordPress plugin", status: "Live", desc: "Safe Updates checks after every plugin, theme and core update and names the update that broke something.", href: "https://wordpress.org/plugins/mykavo/" },
      { name: "Chrome extension", status: "Live", desc: "An instant on-page SEO check with 17 checks, run locally, and one-click Protect to start monitoring.", href: "https://mykavo.app/chrome-extension" },
      { name: "AI assistants (MCP)", status: "Live", desc: "Ask Claude, Cursor or any MCP client which site needs attention. Read-only, with a revocable key.", href: "https://mykavo.app/platforms" },
      { name: "Deploy pipelines", status: "Live", desc: "A deploy hook per website for GitHub Actions, Vercel or Netlify. Every release gets a fresh scan and a verdict.", href: "https://mykavo.app/docs/platform/deploy-checks" },
      { name: "Android app", status: "By request", desc: "Push alerts and your changes in your pocket, on the same account with two-factor sign-in.", href: "https://mykavo.app/android-app" },
      { name: "Shopify app", status: "Coming soon", desc: "Theme-change checks inside the Shopify admin. Built and waiting for App Store review.", href: "https://mykavo.app/shopify-app" },
    ],
    metaTitle: "MyKavo: Website Change Monitoring SaaS on Every Platform | Dakshesh B",
    metaDescription:
      "MyKavo, built by Dakshesh B, monitors websites for visual, SEO, content, link, script and performance changes. Live on web, WordPress, Chrome, AI assistants and CI. 25 active users in 3 months.",
    features: [
      { title: "Page-by-page baselines", desc: "Approve a known-good state of each page, then MyKavo compares every scan against it and lets you approve intentional changes as the new baseline." },
      { title: "Eight change categories", desc: "Availability, visual, SEO, content, links, scripts, performance and conversion, checked on every scan." },
      { title: "Deterministic detection", desc: "Previous versus current values, normalised DOM hashes and pixel comparison. No AI guesswork and no false alarms from dynamic content." },
      { title: "Severity-ranked alerts", desc: "One grouped alert per scan, from info to critical, by email, Slack, Discord, Microsoft Teams or signed webhooks." },
      { title: "Site Audit and Search Console", desc: "Crawl-based site audits with CSV export, plus a read-only Search Console sync that links traffic drops to detected changes." },
      { title: "Client reports and status pages", desc: "Live and PDF client reports, white-label on Agency, public status pages and uptime badges." },
    ],
    stack: [
      "Next.js App Router",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Node.js worker",
      "PostgreSQL (Supabase)",
      "Prisma",
      "pg-boss",
      "Playwright",
      "Better Auth",
      "Dodo Payments",
      "Cloudflare R2",
      "React Native (Expo)",
      "Chrome MV3",
      "WordPress (PHP)",
      "Vitest",
    ],
    built: [
      "A pnpm monorepo of 4 apps and 7 shared packages: a web app with 95 pages and 115 API routes, a Node.js worker, an Expo app and a Chrome extension.",
      "A Playwright scanner with SSRF-safe URL validation, DOM normalisation, pixel-level visual diffing, Lighthouse audits and a rules-based severity engine.",
      "A 50-model PostgreSQL schema with 45 migrations, and scans, schedulers and email sweeps as Postgres-backed background jobs.",
      "Auth with Google OAuth and TOTP 2FA, subscriptions with idempotent webhooks, and about 1,600 unit tests.",
    ],
    faqs: [
      { question: "How is MyKavo different from uptime monitoring?", answer: "Uptime tools tell you whether a page responds. MyKavo tells you what changed on it, visual, SEO, content, links, scripts, performance or conversion, and whether it matters. A page can be up and still be silently broken." },
      { question: "Which platforms is MyKavo available on?", answer: "MyKavo is live as a web app at mykavo.app, a WordPress plugin, a Chrome extension, an MCP server for AI assistants and deploy hooks for CI. The Android app is available by request and a Shopify app is coming soon. Every platform uses the same account." },
      { question: "Does MyKavo use AI to detect changes?", answer: "No. Detection is fully deterministic: previous versus current values, normalised DOM hashes and pixel comparison." },
      { question: "How much does MyKavo cost?", answer: "There is a free plan for one website. Pro is $20 per month and Agency is $79 per month, and every new account starts with a 14-day Pro trial on up to 3 websites with no card needed." },
      { question: "Who built MyKavo?", answer: "MyKavo was designed, built and is run end to end by Dakshesh B, a full-stack developer, frontend engineer and SEO engineer based in Bangalore." },
    ],
    links: [
      { label: "mykavo.app", href: "https://mykavo.app/" },
      { label: "All platforms", href: "https://mykavo.app/platforms" },
      { label: "Pricing", href: "https://mykavo.app/pricing" },
      { label: "WordPress plugin", href: "https://wordpress.org/plugins/mykavo/" },
      { label: "Chrome extension", href: "https://chromewebstore.google.com/detail/mykavo-seo-website-monito/mejgmahebmmcbhmjknnbnfkepopbglpg" },
    ],
  },
  "habit-tracker": {
    tagline: "Build habits that feel good to keep.",
    overview:
      "Habit Tracker is an Android app I designed and built to make showing up feel good. Each habit is an illustrated card you slide to complete, streaks forgive real life with automatic streak freezes, and runs, steps and sleep fill in on their own. It records GPS runs with a live map, tracks sleep from phone use without a watch, logs habits by voice in English and Hindi, and adds five home-screen widgets. It works offline first, with no account and no ads, and keeps every habit on your phone. It is in testing now and coming soon to Google Play.",
    whoFor:
      "Anyone who wants to build better daily habits without spreadsheets: people starting a fitness, reading, water or meditation routine, runners, and Hindi and English speakers who want a calm, private app.",
    category: "Android app",
    platform: "Android",
    schemaType: "MobileApplication",
    applicationCategory: "HealthApplication",
    ctaLabel: "See the app",
    pricing: "7 days free, then ₹59/mo, ₹399/yr or ₹999 lifetime",
    price: { amount: "59", currency: "INR" },
    stats: [
      { value: "22", label: "hand-drawn habit illustrations" },
      { value: "5", label: "home-screen widgets" },
      { value: "2", label: "languages, English and Hindi" },
      { value: "0", label: "ads, accounts or trackers" },
    ],
    platforms: [
      { name: "Android", status: "In testing", desc: "Closed testing now, coming soon to Google Play." },
      { name: "Health Connect", status: "Live", desc: "Steps, runs and sleep from your phone, Samsung Health, Google Fit, Fitbit or a watch." },
    ],
    metaTitle: "Habit Tracker Android App, Coming Soon to Google Play | Dakshesh B",
    metaDescription:
      "Habit Tracker by Dakshesh B: illustrated habit cards, slide to complete, forgiving streaks, GPS runs, sleep tracking and widgets. Offline, no ads. Coming soon to Google Play.",
    features: [
      { title: "Slide to complete", desc: "No tiny checkboxes. Each habit is an illustrated card you slide to finish, and completions are final, so they really count." },
      { title: "Streaks that forgive", desc: "Every 7-day streak earns a freeze that covers a missed day automatically, and rest days pause your streak." },
      { title: "GPS runs with a live map", desc: "Distance, pace and km splits, recorded even with the screen off and added to your running habit automatically." },
      { title: "Sleep without a watch", desc: "The time your screen stays off in your bedtime window becomes your sleep. Short glances at the clock do not count." },
      { title: "Voice logging", desc: "Say \"ran 5 km\" or \"do gilas paani\" and it is logged, in English and Hindi." },
      { title: "Insights and Year in Review", desc: "Patterns computed on your phone, a 365-day heatmap, a weekly review story, challenges with friends and monthly PDF reports." },
    ],
    stack: [
      "Android",
      "Health Connect",
      "GPS and OpenFreeMap",
      "Home-screen widgets",
      "On-device storage",
      "Speech recognition",
      "Google Play Billing",
      "Astro landing page",
    ],
    built: [
      "An offline-first architecture where habits, routes, sleep and moods never leave the phone.",
      "Sleep detection from screen on and off times inside a bedtime window, using only Android usage access.",
      "Five widgets, a Quick Settings tile and voice logging that understands English and Hindi.",
    ],
    faqs: [
      { question: "When is Habit Tracker coming to Google Play?", answer: "Habit Tracker is in testing now and will be published on Google Play soon. The landing page is live at habbit-track-daily.netlify.app." },
      { question: "Is Habit Tracker free?", answer: "You get 7 days of the full app free with no card. After that, Habit Tracker Pro is ₹59 per month, ₹399 per year or ₹999 once for lifetime, billed through Google Play." },
      { question: "Where is my data stored?", answer: "On your phone. There is no account, no ads and no third-party trackers. Routes, sleep and moods never leave your device unless you export a backup or share a card yourself." },
      { question: "How does sleep tracking work without a watch?", answer: "Set a bedtime window, for example 10 PM to 6 AM. The app counts the time your screen stayed off in that window as sleep." },
    ],
    links: [
      { label: "Landing page", href: "https://habbit-track-daily.netlify.app/" },
      { label: "Privacy policy", href: "https://habbit-track-daily.netlify.app/privacy" },
    ],
  },
  billzap: {
    tagline: "GST bills in 30 seconds, even with no signal. Now live on Google Play.",
    overview:
      "BillZap is a free GST billing and invoicing app for Android, made for small shops and traders in India, and it is now live on Google Play. It makes GST-compliant tax invoices with HSN codes and an automatic CGST, SGST or IGST split, prints a UPI QR code so the customer can pay on the spot, and shares the bill as a PDF on WhatsApp. It works fully offline, needs no sign-up, keeps every record on the phone and supports voice billing. I built the roughly 26,000-line Flutter app and its website end to end.",
    whoFor:
      "Small Indian business owners such as kirana stores, restaurants, hardware shops, salons, tailors, wholesalers and pharmacies who want fast, proper GST billing at the counter without internet or a subscription.",
    category: "Android app",
    platform: "Android",
    schemaType: "MobileApplication",
    applicationCategory: "FinanceApplication",
    ctaLabel: "Get it on Google Play",
    pricing: "Free forever, no sign-up",
    price: { amount: "0", currency: "INR" },
    installUrl: "https://play.google.com/store/apps/details?id=com.billzap.app",
    stats: [
      { value: "30s", label: "to a finished GST bill" },
      { value: "100%", label: "works without internet" },
      { value: "12", label: "Indian languages" },
      { value: "₹0", label: "forever, no trial" },
    ],
    metaTitle: "BillZap: Free GST Billing App, Live on Google Play | Dakshesh B",
    metaDescription:
      "BillZap is a free offline GST billing app for Indian shops, now live on Google Play. Invoice in 30 seconds, UPI QR on every bill, WhatsApp PDF share. Built by Dakshesh B.",
    features: [
      { title: "Offline GST invoices", desc: "Saved on the phone instantly with nothing waiting to sync, and no account, phone number or email needed." },
      { title: "Automatic CGST, SGST or IGST", desc: "Per-item GST at 0, 5, 12, 18, 28 or 40 percent, with the place of supply deciding the split and HSN/SAC codes on every line." },
      { title: "UPI QR on every unpaid bill", desc: "Customers scan and pay before they leave, and the money goes straight to your bank. BillZap is not in the middle of the payment." },
      { title: "WhatsApp PDF in two taps", desc: "Share the invoice as a PDF on WhatsApp, or print it on a WiFi or Bluetooth printer." },
      { title: "Voice billing", desc: "Speak the order, such as \"do kilo chini\", and BillZap turns it into a line item with HSN code and GST." },
      { title: "Reports and day close", desc: "GSTR-1 summary export (PDF and CSV), profit and loss, dues ledger with WhatsApp reminders, stock alerts and a daily cash close." },
    ],
    stack: [
      "Flutter",
      "Dart",
      "Riverpod",
      "go_router",
      "Hive",
      "PDF generation",
      "Speech to text",
      "local_auth",
      "Cloudflare Workers",
      "Neon PostgreSQL",
      "Playwright",
      "GitHub Actions",
    ],
    built: [
      "A roughly 26,000-line Flutter app that creates GST-compliant invoices fully offline, with no account or server.",
      "UPI QR codes, WhatsApp PDF sharing, WiFi and Bluetooth printing, voice billing and PIN or fingerprint app lock.",
      "The billzap.app website on Cloudflare Workers with a PostgreSQL-backed blog, JSON-LD and llms.txt, a Lighthouse performance score of 100 and a 500+ check Playwright suite on every deploy.",
    ],
    faqs: [
      { question: "Is BillZap available on Google Play?", answer: "Yes. BillZap is live on Google Play as a free download for Android at play.google.com/store/apps/details?id=com.billzap.app." },
      { question: "Is BillZap really free?", answer: "Yes. There is no paid tier, no expiring trial and no invoice limit." },
      { question: "Does BillZap work without internet?", answer: "Completely. Everything is stored on the phone, so you can bill with no signal and nothing is queued to sync." },
      { question: "How does the UPI QR work?", answer: "Set your UPI ID once and every unpaid invoice carries a QR code any UPI app can scan. The money goes straight to your bank." },
      { question: "Who built BillZap?", answer: "BillZap was designed and built end to end by Dakshesh B, a full-stack and Flutter developer based in Bangalore." },
    ],
    links: [
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.billzap.app" },
      { label: "billzap.app", href: "https://billzap.app/" },
    ],
  },
  shrinkto: {
    tagline: "Compress images to an exact size, privately in your browser.",
    overview:
      "Shrinkto is a free, privacy-first web app that compresses JPG, PNG, WebP and AVIF to an exact KB target entirely in the browser. Instead of guessing with a quality slider, you pick a size and a binary search on encoder quality, using WebAssembly codecs like MozJPEG, WebP and AVIF, lands within 5 percent of it. Nothing is uploaded, there is no signup and no limit. It also bundles a full in-browser PDF toolkit and a companion Chrome extension, ShrinkTo Pro. Today it has 100+ daily active users and ranks #1 on Google for its name.",
    whoFor:
      "People who need an image to fit a strict size limit, such as exam form and passport applicants, plus web developers optimising page weight and anyone sharing files on WhatsApp or email.",
    category: "Web app",
    platform: "Web, Chrome",
    schemaType: "WebApplication",
    applicationCategory: "MultimediaApplication",
    pricing: "Free and unlimited",
    price: { amount: "0", currency: "USD" },
    stats: [
      { value: "100+", label: "daily active users" },
      { value: "#1", label: "on Google for \"shrinkto\"" },
      { value: "2,082", label: "visits from ChatGPT" },
      { value: "5m 33s", label: "average visit" },
    ],
    metaTitle: "Shrinkto: Compress Images to an Exact KB Size | Dakshesh B",
    metaDescription:
      "Shrinkto by Dakshesh B compresses JPG, PNG, WebP and AVIF to an exact KB size in the browser with WebAssembly. No upload, no signup. 100+ daily active users.",
    features: [
      { title: "Exact size targeting", desc: "Pick 20 KB, 50 KB, 100 KB, 200 KB, 500 KB, 1 MB or a custom size and the output lands within 5 percent of it." },
      { title: "Private by design", desc: "Compression runs in your browser with WebAssembly codecs. Watch the Network tab stay empty." },
      { title: "Use-case presets", desc: "Exam form photo, signature, passport and visa, WhatsApp, email, website and Instagram presets." },
      { title: "Batch and ZIP", desc: "Drag, paste or browse many files, then download one at a time or as a ZIP. No daily cap or file size limit." },
      { title: "PDF toolkit", desc: "Merge, split, compress, organise, OCR and convert PDFs, all in the browser." },
      { title: "Chrome extension", desc: "ShrinkTo Pro adds right-click compression on any image, offline, with a one-time lifetime licence." },
    ],
    stack: ["Next.js", "WebAssembly", "MozJPEG", "WebP and AVIF codecs", "Web Workers", "Chrome MV3", "Technical SEO"],
    faqs: [
      { question: "Is Shrinkto really free?", answer: "Yes. There are no limits and no signup. It runs on your device, so there is no server cost to recover." },
      { question: "Are my images uploaded to a server?", answer: "No. Shrinkto compresses with WebAssembly codecs in your browser, so your files never leave your device." },
      { question: "How does compressing to an exact size work?", answer: "A binary search on encoder quality, downscaling only if needed, runs until the file is within 5 percent of your target." },
    ],
    links: [
      { label: "shrinkto.com", href: "https://shrinkto.com/" },
      { label: "ShrinkTo Pro for Chrome", href: "https://chromewebstore.google.com/detail/shrinkto-pro-image-compre/ockmaabodaeeopcajpdlhjhkgllddoia" },
    ],
  },
  "spacing-inspector": {
    tagline: "See every margin and every padding, the moment you hover.",
    overview:
      "Spacing Inspector is a free Chrome extension that visualises CSS margins in blue and padding in green directly on any webpage. Hover any element and it reads the real values through the browser's getComputedStyle API, the same source Chrome DevTools uses, then labels all four sides in pixels. No clicks, no panels and no tab switching. 850+ developers and designers use it, and it ranks #2 on Google for its name.",
    whoFor:
      "Frontend developers, UI designers and QA engineers who debug layouts, check responsive spacing and build pixel-perfect pages.",
    category: "Chrome extension",
    platform: "Chrome",
    schemaType: "WebApplication",
    applicationCategory: "DeveloperApplication",
    ctaLabel: "Add to Chrome",
    pricing: "Free forever",
    price: { amount: "0", currency: "USD" },
    installUrl: "https://chromewebstore.google.com/detail/spacing-inspector/ppnnhboeiefjhloholfbahddldadcjmk",
    stats: [
      { value: "850+", label: "users on Chrome" },
      { value: "#2", label: "on Google for \"spacing inspector\"" },
      { value: "3,474", label: "Google impressions" },
      { value: "4.3%", label: "click rate" },
    ],
    metaTitle: "Spacing Inspector Chrome Extension, 850+ Users | Dakshesh B",
    metaDescription:
      "Spacing Inspector by Dakshesh B shows CSS margin and padding on hover with colour-coded overlays and pixel labels on all four sides. Free, 850+ users.",
    features: [
      { title: "Hover to measure", desc: "Move your mouse over any element to instantly read its margin and padding in pixels." },
      { title: "Colour-coded overlay", desc: "Margins show in blue with dashed borders and padding in green, so the box model reads at a glance." },
      { title: "All four sides", desc: "Exact values for top, right, bottom and left for every element you inspect." },
      { title: "Real computed values", desc: "Reads getComputedStyle, the same source DevTools uses, so the numbers match what the browser renders." },
      { title: "Responsive ready", desc: "Measurements update live as you resize the browser, so you can check spacing across breakpoints." },
    ],
    stack: ["Chrome MV3", "Vanilla JavaScript", "getComputedStyle", "CSS overlays"],
    faqs: [
      { question: "Is Spacing Inspector free?", answer: "Yes. It is free forever with no account and no trial." },
      { question: "How do I use Spacing Inspector?", answer: "Install it from the Chrome Web Store, click the toolbar icon and hover any element on the page." },
    ],
    links: [
      { label: "Chrome Web Store", href: "https://chromewebstore.google.com/detail/spacing-inspector/ppnnhboeiefjhloholfbahddldadcjmk" },
      { label: "Website", href: "https://spacinginspector.netlify.app/" },
    ],
  },
  "eeat-analyser": {
    tagline: "Rank with proof. Audit E-E-A-T on any page.",
    overview:
      "EEAT Analyser is a free Chrome extension that audits any public page for Google's E-E-A-T signals: experience, expertise, authoritativeness and trust. Version 2.0 runs 70 weighted checks across nine categories, including helpful content, AI search readiness, technical SEO and spam-policy safety, then produces a ranked fix plan with copy-ready code. It runs entirely in the browser with no account. 350+ people use it and it is rated 5.0 on the Chrome Web Store.",
    whoFor:
      "SEO professionals, content teams, developers and site owners who want a clear E-E-A-T and AI search audit without leaving the browser.",
    category: "Chrome extension",
    platform: "Chrome",
    schemaType: "WebApplication",
    applicationCategory: "DeveloperApplication",
    pricing: "Free, no paid tier",
    price: { amount: "0", currency: "USD" },
    installUrl: "https://chromewebstore.google.com/detail/eeat-analyser-e-e-a-t-seo/ldhaoobdlocnaoknklohifccadobkpgj",
    stats: [
      { value: "350+", label: "users on Chrome" },
      { value: "5.0", label: "Chrome Web Store rating" },
      { value: "70", label: "weighted checks" },
      { value: "9", label: "audit categories" },
    ],
    metaTitle: "EEAT Analyser: Free E-E-A-T and AI Search Audit | Dakshesh B",
    metaDescription:
      "EEAT Analyser by Dakshesh B audits any page for Google E-E-A-T, AI search readiness and technical SEO with 70 checks and a ranked fix plan. Free, rated 5.0.",
    features: [
      { title: "E-E-A-T scoring", desc: "Per-pillar scores for experience, expertise, authoritativeness and trust, with trust weighted highest and YMYL topics flagged." },
      { title: "Ranked fix plan", desc: "Each fix shows the points it gains, plain-English steps, a link to Google's docs and code pre-filled with the page's own details." },
      { title: "AI search readiness", desc: "Checks robots.txt access for 14 search and AI crawlers, snippet controls, answer-first intros and llms.txt." },
      { title: "Live Core Web Vitals", desc: "LCP, CLS and TTFB read from the current tab, alongside a full technical SEO audit." },
      { title: "Bulk audits and trends", desc: "Audit up to 25 URLs at once, with a 12-run score trend per page in the dashboard." },
      { title: "Exports", desc: "PDF report, Markdown fix list, CSV and JSON." },
    ],
    stack: ["Chrome MV3", "TypeScript", "Next.js site", "JSON-LD parsing", "Core Web Vitals"],
    faqs: [
      { question: "Is EEAT Analyser free?", answer: "Yes. There is no account, trial or paid tier. All 70 checks, the fix plan, bulk audits and exports are included." },
      { question: "Will a high score guarantee better rankings?", answer: "No tool can promise rankings. E-E-A-T is not a single ranking factor, but the audit shows the signals Google's guidelines describe." },
      { question: "Is my data private?", answer: "Yes. It only downloads the audited page plus its robots.txt and llms.txt, and keeps history in Chrome local storage." },
    ],
    links: [
      { label: "Website", href: "https://eeatanalyser.netlify.app/" },
      { label: "Chrome Web Store", href: "https://chromewebstore.google.com/detail/eeat-analyser-e-e-a-t-seo/ldhaoobdlocnaoknklohifccadobkpgj" },
    ],
  },
  "image-size-inspector": {
    tagline: "Inspect any image size. Instantly.",
    overview:
      "Image Size Inspector is a free Manifest V3 Chrome extension. Right-click any image on any website to see its original and displayed dimensions, file size, format, colour profile, a five-colour palette and alt text in one clean card, plus a screen colour picker in the toolbar. All processing happens locally and it collects zero data. It is used by 1,200+ developers and designers, rated 5.0 on the Chrome Web Store, and ranks #2 on Google for its name.",
    whoFor:
      "Web developers, designers and SEO and performance folks who need quick image metadata, oversized image checks and alt text audits without digging through DevTools.",
    category: "Chrome extension",
    platform: "Chrome",
    schemaType: "SoftwareApplication",
    applicationCategory: "DeveloperApplication",
    pricing: "Free forever",
    price: { amount: "0", currency: "USD" },
    installUrl: "https://chromewebstore.google.com/detail/image-size-inspector/phoihlnjkbbigjgncmfjjodcbkinlihk",
    stats: [
      { value: "1,200+", label: "users on Chrome" },
      { value: "5.0", label: "Chrome Web Store rating" },
      { value: "16.2K", label: "Google impressions" },
      { value: "#2", label: "on Google for its name" },
    ],
    metaTitle: "Image Size Inspector Chrome Extension, 1,200+ Users | Dakshesh B",
    metaDescription:
      "Image Size Inspector by Dakshesh B shows any image's dimensions, file size, format, palette and alt text with one right-click. Free, rated 5.0, 1,200+ users.",
    features: [
      { title: "Original versus displayed size", desc: "Natural dimensions next to the rendered size, so oversized images that hurt LCP are easy to catch." },
      { title: "File size analyser", desc: "Exact KB and MB from the image bytes, with fallbacks for CDN-served and lazy-loaded images." },
      { title: "Alt text inspector", desc: "One-tap copy of alt text and ARIA labels, or a clear flag when alt text is missing." },
      { title: "Palette and colour picker", desc: "Five-colour palette extraction as HEX chips, plus a screen colour picker using the native EyeDropper API." },
      { title: "Nine formats", desc: "JPEG, PNG, WebP, AVIF, GIF, SVG, BMP, ICO and TIFF, with colour profile detection." },
      { title: "Zero data collected", desc: "No backend, no analytics and no telemetry. The inspector card is isolated in Shadow DOM and injected only on demand." },
    ],
    stack: ["Chrome MV3", "JavaScript", "Shadow DOM", "EyeDropper API", "Canvas API"],
    faqs: [
      { question: "Is Image Size Inspector free?", answer: "Yes. It is 100 percent free with no premium tier, and it will stay free." },
      { question: "What is the difference between original and displayed size?", answer: "Original is the real pixel size of the file, for example 2400 by 1500. Displayed is how large the browser renders it, for example 600 by 375. Oversized images slow pages down." },
      { question: "Which browsers does it support?", answer: "Chrome 108 and newer, plus Chromium browsers that use the Chrome Web Store such as Edge, Brave and Opera." },
    ],
    links: [
      { label: "Website", href: "https://imageinspect.netlify.app/" },
      { label: "Chrome Web Store", href: "https://chromewebstore.google.com/detail/image-size-inspector/phoihlnjkbbigjgncmfjjodcbkinlihk" },
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
};

export function getProductContent(slug: string): ProductContent | undefined {
  return productContent[slug];
}
