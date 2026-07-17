import type { Config } from "tailwindcss";

/**
 * Palette: light, minimal, high-contrast with one electric-blue accent.
 * Inspired by clean SaaS marketing sites: warm off-white canvas, near-black
 * ink, a single confident accent, and a near-black surface for dark sections.
 * All body pairings meet WCAG AA (>= 4.5:1).
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#FAFAF7", // warm off-white page background
        surface: "#FFFFFF", // cards
        ink: {
          DEFAULT: "#0A0A0A", // primary text (near-black)
          muted: "#52525B", // secondary text (~8:1 on canvas)
          soft: "#6B6B72", // tertiary / meta (~5:1 on white)
        },
        line: "#E8E6E0", // warm hairline borders
        accent: {
          DEFAULT: "#1A53F0", // electric blue (~5.9:1 on white)
          hover: "#1342C4",
          soft: "#EEF3FF", // light blue tint background
          ring: "#BFD0FB",
        },
        night: {
          DEFAULT: "#0B0B0F", // dark section background
          soft: "#16161C", // dark cards
          line: "#26262E", // borders on dark
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        prose: "68ch",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(10,10,10,0.04), 0 10px 30px -18px rgba(10,10,10,0.16)",
        lift: "0 12px 40px -12px rgba(10,10,10,0.22)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
