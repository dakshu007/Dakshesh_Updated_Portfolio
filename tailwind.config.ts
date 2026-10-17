import type { Config } from "tailwindcss";

/**
 * Palette: light, premium, high-contrast. A cool off-white canvas, near-black
 * ink, one electric-blue accent with a violet partner for gradients, and a
 * near-black "night" surface for the few dark moments. Body pairings meet
 * WCAG AA (>= 4.5:1).
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "1920px",
      },
      colors: {
        canvas: "#F7F8FA", // cool off-white page background
        surface: "#FFFFFF", // cards
        ink: {
          DEFAULT: "#0A0B10", // primary text
          muted: "#4A4F5C", // secondary text (~8:1 on canvas)
          soft: "#646A78", // tertiary / meta (~5.3:1 on white)
        },
        line: "#E6E8EE", // hairline borders
        accent: {
          DEFAULT: "#2B4BF2", // electric blue (~6:1 on white)
          hover: "#1F3AD1",
          soft: "#EEF1FF",
          ring: "#C3CDFC",
        },
        violet: {
          DEFAULT: "#7B4DFF",
          soft: "#F3EEFF",
        },
        night: {
          DEFAULT: "#0A0B10",
          soft: "#14151C",
          line: "#262833",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist)", "system-ui", "sans-serif"],
        display: ["var(--font-geist)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        serif: ["var(--font-instrument)", "Georgia", "serif"],
      },
      maxWidth: {
        prose: "68ch",
        site: "100rem",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
        "4xl": "2.25rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(10,11,16,0.04), 0 12px 32px -18px rgba(10,11,16,0.18)",
        lift: "0 20px 50px -20px rgba(10,11,16,0.28)",
        glow: "0 18px 50px -12px rgba(43,75,242,0.45)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        shimmer: {
          from: { backgroundPosition: "0% 50%" },
          to: { backgroundPosition: "200% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseDot: {
          "0%": { boxShadow: "0 0 0 0 rgba(16,185,129,0.55)" },
          "70%": { boxShadow: "0 0 0 10px rgba(16,185,129,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(16,185,129,0)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        shimmer: "shimmer 6s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-dot": "pulseDot 2s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
