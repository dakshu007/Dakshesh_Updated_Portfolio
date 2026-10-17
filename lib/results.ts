/**
 * Verified growth numbers from Google Search Console and GA4, Nov 2025 to
 * Sep 2026, across every site Dakshesh B has built. Update here and every
 * page (home, /results, llms.txt) follows.
 */

export const RESULTS_PERIOD = "Nov 2025 to Sep 2026";
export const RESULTS_SOURCE = "Google Search Console and GA4";

export const resultTotals = [
  { label: "Google impressions", caption: "times my sites showed in search", value: 70233, display: "70,233" },
  { label: "Clicks from Google", caption: "people who chose my result", value: 1753, display: "1,753" },
  { label: "Visits from ChatGPT", caption: "AI assistants recommend my work", value: 2101, display: "2,101" },
  { label: "Real visitors", caption: "9,397 page views", value: 2665, display: "2,665" },
  { label: "Page 1 keywords", caption: "that bring clicks every month", value: 23, display: "23" },
  { label: "Countries reached", caption: "visitors from around the world", value: 130, display: "130" },
];

export const monthly = [
  { month: "Nov", label: "Nov 2025", impressions: 138, clicks: 23 },
  { month: "Dec", label: "Dec 2025", impressions: 632, clicks: 43 },
  { month: "Jan", label: "Jan 2026", impressions: 1638, clicks: 42 },
  { month: "Feb", label: "Feb 2026", impressions: 1916, clicks: 66 },
  { month: "Mar", label: "Mar 2026", impressions: 1759, clicks: 87 },
  { month: "Apr", label: "Apr 2026", impressions: 2099, clicks: 98 },
  { month: "May", label: "May 2026", impressions: 2606, clicks: 124 },
  { month: "Jun", label: "Jun 2026", impressions: 2849, clicks: 156 },
  { month: "Jul", label: "Jul 2026", impressions: 14019, clicks: 210 },
  { month: "Aug", label: "Aug 2026", impressions: 19534, clicks: 435 },
  { month: "Sep", label: "Sep 2026", impressions: 23043, clicks: 469 },
];

export const trafficSources = [
  { label: "ChatGPT and AI assistants", value: 2101, share: 43 },
  { label: "Direct and shared links", value: 1660, share: 34 },
  { label: "Google Search", value: 901, share: 18 },
  { label: "Referrals and other", value: 180, share: 4 },
  { label: "Bing and other search", value: 54, share: 1 },
];

export const TOTAL_SESSIONS = 4896;

export type Ranking = {
  query: string;
  position: number;
  site: string;
  clicks: number;
  nonBrand?: boolean;
};

export const rankings: Ranking[] = [
  { query: "shrinkto", position: 1, site: "Shrinkto", clicks: 325 },
  { query: "spacing inspector", position: 2, site: "Spacing Inspector", clicks: 30 },
  { query: "image size inspector", position: 2, site: "Image Size Inspector", clicks: 66 },
  { query: "mykavo", position: 2, site: "MyKavo", clicks: 58 },
  { query: "jp fitness kalapatti", position: 3, site: "JP Fitness", clicks: 12 },
  { query: "harsa designer boutique", position: 3, site: "Harsa Designer Boutique", clicks: 5 },
  { query: "jp fitness coimbatore", position: 3, site: "JP Fitness", clicks: 15 },
  { query: "size inspector", position: 3, site: "Image Size Inspector", clicks: 8 },
  { query: "billzap", position: 3, site: "dakshesh.co.in", clicks: 4, nonBrand: true },
  { query: "shrink to", position: 4, site: "Shrinkto", clicks: 44 },
  { query: "image size checker chrome extension", position: 4, site: "Image Size Inspector", clicks: 4, nonBrand: true },
  { query: "jp fitness", position: 5, site: "JP Fitness", clicks: 31 },
  { query: "gym fees in coimbatore", position: 5, site: "JP Fitness", clicks: 3, nonBrand: true },
  { query: "image size extension", position: 6, site: "Image Size Inspector", clicks: 13, nonBrand: true },
  { query: "jp gym near me", position: 7, site: "JP Fitness", clicks: 3, nonBrand: true },
  { query: "script detector", position: 7, site: "MyKavo", clicks: 7, nonBrand: true },
  { query: "gym near me", position: 7, site: "JP Fitness", clicks: 5, nonBrand: true },
  { query: "image inspector", position: 7, site: "Image Size Inspector", clicks: 32 },
  { query: "jp fitness gym", position: 7, site: "JP Fitness", clicks: 4 },
  { query: "image size extension chrome", position: 7, site: "Image Size Inspector", clicks: 7, nonBrand: true },
  { query: "dakshesh", position: 7, site: "dakshesh.co.in", clicks: 12 },
  { query: "image inspect", position: 8, site: "Image Size Inspector", clicks: 8 },
  { query: "image inspection tool", position: 9, site: "Image Size Inspector", clicks: 3 },
];

export type SiteResult = {
  name: string;
  domain: string;
  href: string;
  kind: string;
  stats: { label: string; value: string }[];
  highlight: string;
};

export const siteResults: SiteResult[] = [
  {
    name: "Shrinkto",
    domain: "shrinkto.com",
    href: "/shrinkto",
    kind: "Product",
    stats: [
      { label: "Impressions", value: "1,451" },
      { label: "Clicks", value: "417" },
      { label: "Visitors", value: "2,098" },
    ],
    highlight: "#1 on Google for \"shrinkto\" and 2,082 visits from ChatGPT",
  },
  {
    name: "MyKavo",
    domain: "mykavo.app",
    href: "/mykavo",
    kind: "SaaS",
    stats: [
      { label: "Impressions", value: "36.6K" },
      { label: "Clicks", value: "175" },
      { label: "Visitors", value: "418" },
    ],
    highlight: "#2 on Google for \"mykavo\" and a 7 minute average visit",
  },
  {
    name: "Image Size Inspector",
    domain: "imageinspect.netlify.app",
    href: "/image-size-inspector",
    kind: "Chrome extension",
    stats: [
      { label: "Impressions", value: "16.2K" },
      { label: "Clicks", value: "648" },
      { label: "Click rate", value: "4.0%" },
    ],
    highlight: "#2 on Google for \"image size inspector\"",
  },
  {
    name: "JP Fitness",
    domain: "jpfitness.co.in",
    href: "/work/jp-fitness",
    kind: "Client website",
    stats: [
      { label: "Impressions", value: "7,877" },
      { label: "Clicks", value: "250" },
      { label: "Click rate", value: "3.2%" },
    ],
    highlight: "#3 on Google for \"jp fitness kalapatti\"",
  },
  {
    name: "Spacing Inspector",
    domain: "spacinginspector.netlify.app",
    href: "/spacing-inspector",
    kind: "Chrome extension",
    stats: [
      { label: "Impressions", value: "3,474" },
      { label: "Clicks", value: "149" },
      { label: "Click rate", value: "4.3%" },
    ],
    highlight: "#2 on Google for \"spacing inspector\"",
  },
  {
    name: "dakshesh.co.in",
    domain: "dakshesh.co.in",
    href: "/",
    kind: "Portfolio",
    stats: [
      { label: "Impressions", value: "3,930" },
      { label: "Clicks", value: "95" },
      { label: "Click rate", value: "2.4%" },
    ],
    highlight: "#3 on Google for \"billzap\"",
  },
  {
    name: "Harsa Designer Boutique",
    domain: "harshdesignerboutique.com",
    href: "/work/harsa-designer-boutique",
    kind: "Client website",
    stats: [
      { label: "Impressions", value: "733" },
      { label: "Clicks", value: "18" },
      { label: "Visitors", value: "149" },
    ],
    highlight: "#3 on Google for \"harsa designer boutique\"",
  },
];
